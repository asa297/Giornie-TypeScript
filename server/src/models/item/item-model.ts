import { Document, model, Model, Schema } from 'mongoose'

interface IItem extends Document {
  item_code: string
  item_name: string
  item_factory: string
  item_color: string
  item_skin: string
  item_price: number
  item_qty_HO: number
  item_qty_Shop1: number
  item_remark: string
  item_type_id: number
  item_type_name: string
  item_image_url: string
  item_image_key: string

  record_id_by: string
  record_name_by: string
  record_date: Date
  last_modify_by_id: string
  last_modify_by_name: string
  last_modify_date: Date
}

const ItemSchema: Schema = new Schema({
  item_code: String,
  item_name: String,
  item_factory: String,
  item_color: String,
  item_skin: String,
  item_price: Number,
  item_qty_HO: { type: Number, default: 0 },
  item_qty_Shop1: { type: Number, default: 0 },
  item_remark: String,
  item_type_id: Number,
  item_type_name: String,
  item_image_url: String,
  item_image_key: String,

  record_id_by: String,
  record_name_by: String,
  record_date: Date,
  last_modify_by_id: String,
  last_modify_by_name: String,
  last_modify_date: Date,
})

const ItemModel: Model<IItem> = model<IItem>('Item', ItemSchema)

export { ItemModel }
