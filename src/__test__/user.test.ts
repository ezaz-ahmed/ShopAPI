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

const user = {
  email: "johndoe@example.com",
  name: "John Doe",
  password: "password123",
  confirmPassword: "password123",
};

describe("user", () => {
  // User Registration
  describe("user registration", () => {
    describe("given the username & password valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockReturnValueOnce(userPayload);

        const {} = await supertest(app).post("/api/users");
      });
    });

    describe("given the password do not match", () => {
      it("should return a 400", () => {});
    });

    describe("given the user service throws", () => {
      it("should return a 409 error", () => {});
    });
  });

  // User session create
  describe("create user session", () => {
    describe("given the user name & password valid", () => {
      it("should return a signed access token & refresh token", () => {});
    });
  });
});
