import { Document, model, Model, Schema } from 'mongoose'

interface IUser extends Document {
  username: string
  age: number
  friends: string[]
  data: any[]
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  friends: [String],
  data: [Schema.Types.Mixed],
})

const UserModel: Model<IUser> = model<IUser>('User', UserSchema)

export { UserModel }
