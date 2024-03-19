import { get } from "lodash";
import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { ISession } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
// import { verifyJwt, signJwt } from "../utils/jwt.utils"
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<ISession>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<ISession>,
  update: UpdateQuery<ISession>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  console.log({
    decoded,
    id: get(decoded, "session"),
  });

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  console.log({
    session,
  });

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  return accessToken;
}
