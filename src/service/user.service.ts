import { Document } from "mongoose"
import UserModel, { IUser } from "../models/user.model"

export async function createUser(input: Document<IUser>) {
  try {
    return await UserModel.create(input)
  } catch (error: any) {
    throw new Error(error)
  }
}