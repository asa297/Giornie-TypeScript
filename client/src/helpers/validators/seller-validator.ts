import * as Yup from 'yup'

export const SellerSchema = Yup.object().shape({
  sellerName: Yup.string().required('Required'),
  sellerCode: Yup.string().required('Required'),
  sellerCom: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.')
    .required('Required'),
})
