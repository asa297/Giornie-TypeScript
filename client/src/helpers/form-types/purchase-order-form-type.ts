export interface PurchaseOrderFormBody {
  group: {
    id: number
    label: string
    value: any
  }
  seller: {
    id: number
    label: string
    value: any
  }

  discount?: number
  credit?: number
  creditCharge?: number

  subTotal: number
  grandTotalDiscount: number
  grandTotalCredit?: number
  grandTotalCreditCharge?: number
  grandTotal: number
  receiveCash: number
  changeCash: number
}
