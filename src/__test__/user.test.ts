import mongoose from "mongoose";
import supertest from "supertest";
import * as UserService from "../service/user.service";
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
        expect(body).toEqual({
          message: "Passwords do not match",
        });
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
        expect(body).toEqual({
          message: "User already exists",
        });
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
  });

  // User session create
  describe("create user session", () => {
    describe("given the valid email & password", () => {
      it("should return a signed access token & refresh token", async () => {
        const loginUserServiceMock = jest
          .spyOn(UserService, "validatePassword")
          // @ts-ignore
          .mockReturnValueOnce(sessionPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/sessions")
          .send({
            email: userInput.email,
            password: userInput.password,
          });

        expect(statusCode).toBe(200);
        expect(body).toEqual(sessionPayload);
        expect(loginUserServiceMock).toHaveBeenCalledWith({
          email: userInput.email,
          password: userInput.password,
        });
      });
    });

    describe("given the wrong email or password", () => {
      it("should return a 401 error", async () => {
        const loginUserServiceMock = jest
          .spyOn(UserService, "validatePassword")
          .mockRejectedValue(new Error("Invalid email or password"));

        const { statusCode, body } = await supertest(app)
          .post("/api/sessions")
          .send({
            email: userInput.email,
            password: "wrongpassword",
          });

        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Invalid email or password",
        });
        expect(loginUserServiceMock).toHaveBeenCalledWith({
          email: userInput.email,
          password: "wrongpassword",
        });
      });
    });
  });
});
