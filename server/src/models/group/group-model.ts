import { Document, model, Model, Schema } from 'mongoose'

interface IGroup extends Document {
  group_code: string
  group_sticker_number: string
  group_remark: string
  guide_name: string
  org: {
    id: Schema.Types.ObjectId
    name: string
    type_id: number
    type_name: string
    code: string
  }
  record_id_by: string
  record_name_by: string
  record_date: Date
  last_modify_by_id: string
  last_modify_by_name: string
  last_modify_date: Date
}

const GroupSchema: Schema = new Schema({
  group_code: String,
  group_sticker_number: String,
  group_remark: String,
  guide_name: String,
  org: {
    id: { type: Schema.Types.ObjectId, ref: 'Organization' },
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

export { GroupModel }
