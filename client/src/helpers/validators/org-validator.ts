import * as Yup from 'yup'

export const OrganizationSchema = Yup.object().shape({
  orgType: Yup.object().required('Required'),
  orgName: Yup.string().required('Required'),
  orgComA: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.')
    .required('Required'),
  orgComB: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.'),
  orgCode: Yup.string().required('Required'),
})
