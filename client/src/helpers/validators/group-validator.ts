import * as Yup from 'yup'

export const GroupSchema = Yup.object().shape({
  org: Yup.object().required('Required'),
  groupCode: Yup.string().required('Required'),
  groupStickerNumber: Yup.number()
    .typeError('Number Only')
    .required('Required'),
  guideName: Yup.string().required('Required'),
})
