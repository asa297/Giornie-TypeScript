import { fromJS } from 'immutable'

import { actionTypes } from '@app/store/modules/item/type'

export interface IItem {
  item_type: {
    item_type_id: Number
    item_type_name: String
  }
  item_code: String
  item_name: String
  item_factory?: String
  item_color?: String
  item_skin?: String
  item_price: Number
  item_qty_HO?: Number
  item_qty_Shop1?: Number
  item_remark: String
  item_image_url: String

  last_modify_date: Date
}

export interface IItemState {
  isLoading: boolean
  error?: {
    [key: string]: {
      message: string
    }
  }
  data: {
    list: {
      [id: string]: IItem
    }
  }
}

const initState: IItemState = {
  error: {},
  isLoading: false,
  data: {
    list: {},
  },
}

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionTypes.LOAD_ITEMS:
      return state.setIn(['data', 'list'], fromJS({}))

    case actionTypes.LOAD_ITEMS_SUCCESS:
    case actionTypes.GET_ITEM_SUCCESS:
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
    case actionTypes.SET_ITEM_MODULE_ERROR:
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
