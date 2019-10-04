import { fromJS } from 'immutable'

import { actionTypes } from '@app/store/modules/item/type'

export interface IItem {
  item_type: {
    item_type_id: number
    item_type_name: string
  }
  item_code: string
  item_name: string
  item_factory?: string
  item_color?: string
  item_skin?: string
  item_price: number
  item_qty_HO?: number
  item_qty_Shop1?: number
  item_remark: string
  item_image_key: string
  item_image_url: string

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
