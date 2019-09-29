import { fromJS } from 'immutable'

import { actionTypes } from '@app/store/modules/organization/type'

export interface IOrganization {
  _id: string
  org_type_id: number
  org_type_name: string
  org_name: string
  org_com_A: number
  org_com_B: number
  org_code: string
  last_modify_date: Date
}

export interface IOrganizationSelection {
  _id: string
  org_name: string
  org_code: string
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
    list_selection: {
      [id: string]: IOrganizationSelection
    }
  }
}

const initState: IOrganizationState = {
  error: {},
  isLoading: false,
  data: {
    list: {},
    list_selection: {},
  },
}

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionTypes.LOAD_ORGANIZATIONS:
      return state.setIn(['data', 'list'], fromJS({}))
    case actionTypes.LOAD_ORGANIZATIONS_SELECTION:
      return state.setIn(['data', 'list_selection'], fromJS({}))
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
    case actionTypes.LOAD_ORGANIZATIONS_SELECTION_SUCCESS:
      return state.updateIn(['data', 'list_selection'], list => {
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
