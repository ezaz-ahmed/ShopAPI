import { Schema, model, Document } from "mongoose"
import bcrypt from "bcrypt"
import config from 'config'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema: Schema = new Schema<IUser>({
  email: {
    type: String,
    requried: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    requried: true,
    trim: true,
  },
  password: {
    type: String,
    requried: true,
  }
}, {
  timestamps: true
})

userSchema.pre<IUser>("save", async function (next: (err?: Error) => void) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash

  return next()
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt
    .compare(candidatePassword, this.password)
    .catch(e => false)
}

const UserModel = model<IUser>("User", userSchema)

export default UserModel