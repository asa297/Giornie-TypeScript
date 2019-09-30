import { Document, model, Model, Schema } from 'mongoose'

interface ISellerBody {
  seller_name: String
  seller_code: String
  seller_com: Number
  seller_remark?: String
  record_id_by: String
  record_name_by: String
  record_date: Date
  last_modify_by_id: String
  last_modify_by_name: String
  last_modify_date: Date
}

interface ISeller extends Document, ISellerBody {}

const SellerSchema: Schema = new Schema({
  seller_name: String,
  seller_code: String,
  seller_com: { type: Number, default: 0 },
  seller_remark: String,
  record_id_by: String,
  record_name_by: String,
  record_date: Date,
  last_modify_by_id: String,
  last_modify_by_name: String,
  last_modify_date: Date,
})

const SellerModel: Model<ISeller> = model<ISeller>('Seller', SellerSchema)

export { SellerModel, ISellerBody }
