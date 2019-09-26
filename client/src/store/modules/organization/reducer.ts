import { fromJS } from 'immutable'

import { actionTypes } from '@app/store/modules/organization/type'

export interface IOrganization {
  org_type_id: number
  org_type_name: string
  org_name: string
  org_com_A: number
  org_com_B: number
  org_code: string
  record_id_by: string
  record_name_by: string
  record_date: Date
  last_modify_by_id: string
  last_modify_by_name: string
  last_modify_date: Date
}

export interface IOrganizationState {
  isLoading: boolean
  error?: {
    [key: string]: {
      message: string
    }
  }
  data: {
    list: {
      [id: string]: IOrganization
    }
  }
}

const initState: IOrganizationState = {
  error: {},
  isLoading: false,
  data: {
    list: {},
  },
}

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionTypes.LOAD_ORGANIZATIONS:
      return state.setIn(['data', 'list'], fromJS({}))
    case actionTypes.LOAD_ORGANIZATIONS_SUCCESS:
    case actionTypes.GET_ORGANIZATION_SUCCESS:
      return state.updateIn(['data', 'list'], list => {
        const _list = list.toJS()
        const { orgData } = action.payload

        orgData.forEach(element => {
          _list[element._id] = element
        })

        return fromJS(_list)
      })
    case actionTypes.IS_LOADING:
      return state.setIn(['isLoading'], fromJS(action.payload.isLoading))
    case actionTypes.SET_ORGANIZATION_MODULE_ERROR:
      return state.updateIn(['error'], (errorState: any) => {
        const newItemsJS = errorState.toJS()

        const { key, error } = action.payload

        if (error) newItemsJS[key] = error
        else delete newItemsJS[key]

        return fromJS({ ...newItemsJS })
      })
    default:
      return state
  }
}
