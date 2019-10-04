import { fromJS } from 'immutable'
import * as R from 'ramda'

import { ISellerState, ISellerSelection } from '@app/store/modules/seller/reducer'
import { MODULE_NAME } from '@app/store/modules/seller/type'
import { get } from '@app/store/modules/helpers/ramda'

export const getRootSellerState = state => state.getIn([MODULE_NAME], fromJS({})).toJS() as ISellerState
export const getSellerIsLoading = get<ISellerState['isLoading']>(`isLoading`)
export const getSellerError = get<ISellerState['error']>('error')
export const getSellerErrorText = (errorKey: string) => get<ISellerState['error']>(`error.${errorKey}`)

export const getSellerList = get<ISellerState['data']['list']>(`data.list`)
export const getSellerListById = (docId: string) => get<ISellerState['data']['list']['']>(`data.list.${docId}`)
export const getSellerSelectionList = get<ISellerState['data']['list_selection']>(`data.list_selection`)
export const getSellerOption = state => {
  const groupSelectionList = getSellerSelectionList(state)
  const groupOption = R.compose(
    R.map((v: ISellerSelection) => {
      return {
        id: v._id,
        label: `${v.seller_name} (${v.seller_code})`,
        value: {
          id: v._id,
          label: `${v.seller_name} (${v.seller_code})`,
        },
      }
    }),
    R.values,
  )(groupSelectionList)

  return groupOption
}
