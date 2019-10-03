import { Document, model, Model, Schema } from 'mongoose'

interface IItemBody {
  item_type: {
    item_type_id: Number
    item_type_name: String
  }
  item_code: String
  item_name: String
  item_factory?: String
  item_color?: String
  item_skin?: String
  item_price: Number
  item_qty_HO?: Number
  item_qty_Shop1?: Number
  item_remark?: String
  item_image_url?: String
  item_image_key?: String

  record_id_by: String
  record_name_by: String
  record_date: Date
  last_modify_by_id: String
  last_modify_by_name: String
  last_modify_date: Date
}
interface IItem extends Document, IItemBody {}

const ItemSchema: Schema = new Schema({
  item_type: {
    item_type_id: Number,
    item_type_name: String,
  },
  item_code: String,
  item_name: String,
  item_factory: String,
  item_color: String,
  item_skin: String,
  item_price: Number,
  item_qty_HO: { type: Number, default: 0 },
  item_qty_Shop1: { type: Number, default: 0 },
  item_remark: String,
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

export { ItemModel, IItemBody }
