export interface ItemFormBody {
  item_image: string
  item_type: {
    id: number
    label: string
    value: any
  }
  item_code: string
  item_name: string
  item_factory?: string
  item_color?: string
  item_skin?: string
  item_price: number
  item_remark?: string

  item_image_url?: string
  item_image_key?: string
}
