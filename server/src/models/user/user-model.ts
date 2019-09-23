import { Document, model, Model, Schema } from 'mongoose'

interface IUser extends Document {
  email: String
  name: String
  role: Number
  role_description: String
}

const UserSchema: Schema = new Schema({
  email: String,
  name: String,
  role: Number,
  role_description: String,
})

const UserModel: Model<IUser> = model<IUser>('User', UserSchema)

export { UserModel, IUser }
