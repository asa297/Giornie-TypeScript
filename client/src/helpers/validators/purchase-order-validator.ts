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

  const creditValidators = FieldIsMoreThan(value.credit, value.subTotal - value.grandTotalDiscount, 'Credit must less than Subtotal include discount')
  if (creditValidators) {
    errors.credit = creditValidators
  }

  if (FieldIsPercentRange(value.creditCharge)) {
    errors.creditCharge = FieldIsPercentRange(value.creditCharge)
  }

  const grandTotalDiscountValidators = FieldIsMoreThan(value.grandTotalDiscount, value.subTotal, 'Discount total must less than Subtotal')
  if (grandTotalDiscountValidators) {
    errors.grandTotalDiscount = grandTotalDiscountValidators
  }

  const grandTotalCreditValidators = FieldIsMoreThan(value.grandTotalCredit, value.subTotal, 'Credit total must less than Subtotal')
  if (grandTotalCreditValidators) {
    errors.grandTotalCredit = grandTotalCreditValidators
  }

  if (FieldIsPositiveNumber(value.grandTotal)) {
    errors.grandTotal = FieldIsPositiveNumber(value.grandTotal)
  }

  if (FieldIsEmpty(value.receiveCash)) {
    errors.receiveCash = FieldIsEmpty(value.receiveCash)
  } else if (FieldIsLessThan(value.receiveCash, value.grandTotal, 'ReceiveCash total must more than Grandtotal')) {
    errors.receiveCash = FieldIsLessThan(value.receiveCash, value.grandTotal, 'ReceiveCash total must more than Grandtotal')
  }

  if (FieldIsPositiveNumber(value.changeCash)) {
    errors.changeCash = FieldIsPositiveNumber(value.changeCash)
  }

  return errors
}
