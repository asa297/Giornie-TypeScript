import { Document, model, Model, Schema } from 'mongoose'

interface IGroupBody {
  group_code: String
  group_sticker_number: String
  group_remark?: String
  guide_name?: String
  org: {
    id: Schema.Types.ObjectId
    name: String
    type_id: Number
    type_name: String
    code: String
  }
  record_id_by: String
  record_name_by: String
  record_date: Date
  last_modify_by_id: String
  last_modify_by_name: String
  last_modify_date: Date
}

interface IGroup extends Document, IGroupBody {}

const GroupSchema: Schema = new Schema({
  group_code: String,
  group_sticker_number: String,
  group_remark: String,
  guide_name: String,
  org: {
    id: Schema.Types.ObjectId,
    name: String,
    type_id: Number,
    type_name: String,
    code: String,
  },
  record_id_by: String,
  record_name_by: String,
  record_date: Date,
  last_modify_by_id: String,
  last_modify_by_name: String,
  last_modify_date: Date,
})

const GroupModel: Model<IGroup> = model<IGroup>('Group', GroupSchema)

export { GroupModel, IGroupBody }
