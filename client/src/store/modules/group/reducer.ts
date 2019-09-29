import { fromJS } from 'immutable'

import { actionTypes } from '@app/store/modules/group/type'

export interface IGroup {
  group_code: String
  group_sticker_number: String
  group_remark: String
  guide_name: String
  org: {
    id: String
    name: String
    type_id: Number
    type_name: String
    code: String
  }
  record_id_by: String
  record_name_by: String
  record_date: Date
  last_modify_by_id: String
  last_modify_by_name: String
  last_modify_date: Date
}

export interface IGroupState {
  isLoading: boolean
  error?: {
    [key: string]: {
      message: string
    }
  }
  data: {
    list: {
      [id: string]: IGroup
    }
  }
}

const initState: IGroupState = {
  error: {},
  isLoading: false,
  data: {
    list: {},
  },
}

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionTypes.LOAD_GROUPS:
      return state.setIn(['data', 'list'], fromJS({}))
    case actionTypes.LOAD_GROUPS_SUCCESS:
    case actionTypes.GET_GROUP_SUCCESS:
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
    case actionTypes.SET_GROUP_MODULE_ERROR:
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
