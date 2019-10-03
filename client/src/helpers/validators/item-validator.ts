import * as Yup from 'yup'

export const ItemSchema = Yup.object().shape({
  item_type: Yup.object().required('Required'),
  item_code: Yup.string().required('Required'),
  item_name: Yup.string().required('Required'),
  item_price: Yup.number()
    .typeError('Number Only')
    .min(0, 'number must more than 0.')
    .required('Required'),
})
