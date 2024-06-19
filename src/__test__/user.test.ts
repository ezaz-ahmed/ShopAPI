import mongoose from "mongoose";
import supertest from "supertest";
import * as UserService from "../service/user.service";
import * as SessionController from "../controller/session.controler"
import createServer from "../utils/server";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: "johndoe@example.com",
  name: "John Doe",
};

const userInput = {
  email: "johndoe@example.com",
  name: "John Doe",
  password: "password123",
  confirmPassword: "password123",
};

const sessionPayload = {
  accessToken: "someAccessToken",
  refreshToken: "someRefreshToken",
};

describe("user", () => {
  // User Registration
  describe("user registration", () => {
    describe("given the valid username & password", () => {
      it("should create a new user & return", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the passwords do not match", () => {
      it("should return a 400 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send({ ...userInput, confirmPassword: "password456" });

        expect(statusCode).toBe(400);
        expect(body).toEqual([
          {
            code: "custom",
            message: "Password doesn't match",
            path: ["body", "confirmPassword"]
          }
        ]);
        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given the user service rejects the input", () => {
      it("should return a 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValue(new Error("User already exists"));

        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(409);
        expect(body).toEqual({});
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
  });
});
