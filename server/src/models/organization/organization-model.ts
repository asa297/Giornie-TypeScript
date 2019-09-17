import { Document, model, Model, Schema } from 'mongoose'

interface IOrganization extends Document {
  org_type_id: number
  org_type_name: string
  org_name: string
  org_com_A: number
  org_Com_B: number
  org_Code: string
  record_id_by: string
  record_name_by: string
  record_date: Date
  last_modify_by_id: string
  last_modify_by_name: string
  last_modify_date: Date
}

const OrganizationSchema: Schema = new Schema({
  org_type_id: Number,
  org_type_name: String,
  org_name: String,
  org_com_A: { type: Number, default: 0 },
  org_Com_B: { type: Number, default: 0 },
  org_Code: String,
  record_id_by: String,
  record_name_by: String,
  record_date: Date,
  last_modify_by_id: String,
  last_modify_by_name: String,
  last_modify_date: Date,
})

const OrganizationModel: Model<IOrganization> = model<IOrganization>('Organization', OrganizationSchema)

export { OrganizationModel }
