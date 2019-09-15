import { actionTypes } from './type'

export const login = ({ email, password }) => ({
  type: actionTypes.LOGIN,
  payload: { email, password },
})

export const logout = () => ({
  type: actionTypes.LOGOUT,
})
