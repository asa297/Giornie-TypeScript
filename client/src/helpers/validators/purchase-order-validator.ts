import { FieldIsEmpty, FieldIsPercentRange, FieldIsMoreThan, FieldIsPositiveNumber, FieldIsLessThan } from '@app/helpers/validators/validator'
import { PurchaseOrderFormBody } from '@app/helpers/form-types/purchase-order-form-type'

export const PurchaseOrderSchema = (value: PurchaseOrderFormBody) => {
  let errors: any = {}

  if (FieldIsEmpty(value.group)) {
    errors.group = FieldIsEmpty(value.group)
  }

  if (FieldIsEmpty(value.seller)) {
    errors.seller = FieldIsEmpty(value.seller)
  }

  if (FieldIsPercentRange(value.discount)) {
    errors.discount = FieldIsPercentRange(value.discount)
  }

  const creditValidators = FieldIsMoreThan(value.credit, value.subTotal - value.grandTotalDiscount, 'จำนวนชำระเป็นเครดิตต้องน้อยกว่ายอดรวม')
  if (creditValidators) {
    errors.credit = creditValidators
  }

  if (FieldIsPercentRange(value.creditCharge)) {
    errors.creditCharge = FieldIsPercentRange(value.creditCharge)
  }

  const grandTotalDiscountValidators = FieldIsMoreThan(value.grandTotalDiscount, value.subTotal, 'จำนวนส่วนลดต้องน้อยกว่าจำนวนยอดรวม')
  if (grandTotalDiscountValidators) {
    errors.grandTotalDiscount = grandTotalDiscountValidators
  }

  const grandTotalCreditValidators = FieldIsMoreThan(value.grandTotalCredit, value.subTotal, 'จำนวนวนเครดิตต้องน้อยกว่าจำนวนยอดรวม')
  if (grandTotalCreditValidators) {
    errors.grandTotalCredit = grandTotalCreditValidators
  }

  if (FieldIsPositiveNumber(value.grandTotal)) {
    errors.grandTotal = FieldIsPositiveNumber(value.grandTotal)
  }

  if (FieldIsEmpty(value.receiveCash)) {
    errors.receiveCash = FieldIsEmpty(value.receiveCash)
  } else if (FieldIsLessThan(value.receiveCash, value.grandTotal)) {
    errors.receiveCash = FieldIsLessThan(value.receiveCash, value.grandTotal, 'จำนวนเเงินที่รับต้องมากกว่าจำนวนยอดที่ต้องชำระ')
  }

  if (FieldIsPositiveNumber(value.changeCash)) {
    errors.changeCash = FieldIsPositiveNumber(value.changeCash)
  }

  return errors
}
