import { fromJS } from 'immutable'

import { actionTypes } from '@app/store/modules/group/type'

export interface IGroup {
  group_code: string
  group_sticker_number: string
  group_remark: string
  guide_name: string
  org: {
    id: string
    name: string
    type_id: number
    type_name: string
    code: string
  }
  last_modify_date: Date
}

export interface IGroupSelection {
  _id: string
  group_code: string
  group_sticker_number: string
  guide_name: string
  org: {
    id: string
    name: string
    type_id: number
    type_name: string
    code: string
  }
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
    list_selection: {
      [id: string]: IGroupSelection
    }
  }
}

const initState: IGroupState = {
  error: {},
  isLoading: false,
  data: {
    list: {},
    list_selection: {},
  },
}

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionTypes.LOAD_GROUPS:
      return state.setIn(['data', 'list'], fromJS({}))
    case actionTypes.LOAD_GROUPS_SELECTION:
      return state.setIn(['data', 'list_selection'], fromJS({}))
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
    case actionTypes.LOAD_GROUPS_SELECTION_SUCCESS:
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
