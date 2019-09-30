import { fromJS } from 'immutable'

import { actionTypes } from '@app/store/modules/seller/type'

export interface ISeller {
  seller_name: String
  seller_code: String
  seller_com: Number
  seller_remark?: String
  last_modify_date: Date
}

export interface ISellerState {
  isLoading: boolean
  error?: {
    [key: string]: {
      message: string
    }
  }
  data: {
    list: {
      [id: string]: ISeller
    }
  }
}

const initState: ISellerState = {
  error: {},
  isLoading: false,
  data: {
    list: {},
  },
}

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionTypes.LOAD_SELLERS:
      return state.setIn(['data', 'list'], fromJS({}))

    case actionTypes.LOAD_SELLERS_SUCCESS:
    case actionTypes.GET_SELLER_SUCCESS:
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
    case actionTypes.SET_SELLER_MODULE_ERROR:
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
