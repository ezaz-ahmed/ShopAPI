import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";
import logger from "../utils/logger";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    let token: string;
    if (typeof refreshToken === "string") {
      token = refreshToken;
    } else if (Array.isArray(refreshToken) && refreshToken.length > 0) {
      token = refreshToken[0];
    } else {
      return next();
    }

    const newAccessToken = await reIssueAccessToken({ refreshToken: token });

    if (!newAccessToken) {
      return next();
    }

    res.setHeader("x-access-token", newAccessToken);
    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;
    return next();
  }
};

export default requireUser;
