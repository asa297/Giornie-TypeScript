import { Document, model, Model, Schema } from 'mongoose'

interface IOrganizationBody {
  org_type_id: Number
  org_type_name: String
  org_name: String
  org_com_A: { type: Number; default: 0 }
  org_com_B: { type: Number; default: 0 }
  org_code: String
  record_id_by: String
  record_name_by: String
  record_date: Date
  last_modify_by_id: String
  last_modify_by_name: String
  last_modify_date: Date
}
interface IOrganization extends Document, IOrganizationBody {}

const OrganizationSchema: Schema = new Schema({
  org_type_id: Number,
  org_type_name: String,
  org_name: String,
  org_com_A: { type: Number, default: 0 },
  org_com_B: { type: Number, default: 0 },
  org_code: String,
  record_id_by: String,
  record_name_by: String,
  record_date: Date,
  last_modify_by_id: String,
  last_modify_by_name: String,
  last_modify_date: Date,
})

const OrganizationModel: Model<IOrganization> = model<IOrganization>('Organization', OrganizationSchema)

export { OrganizationModel, IOrganizationBody }
