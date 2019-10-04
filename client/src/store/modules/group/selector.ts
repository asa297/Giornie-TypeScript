import { fromJS } from 'immutable'
import * as R from 'ramda'

import { IGroupState, IGroupSelection } from '@app/store/modules/group/reducer'
import { MODULE_NAME } from '@app/store/modules/group/type'
import { get } from '@app/store/modules/helpers/ramda'

export const getRootGroupState = state => state.getIn([MODULE_NAME], fromJS({})).toJS() as IGroupState
export const getGroupIsLoading = get<IGroupState['isLoading']>(`isLoading`)
export const getGroupError = get<IGroupState['error']>('error')
export const getGroupErrorText = (errorKey: string) => get<IGroupState['error']>(`error.${errorKey}`)

export const getGroupList = get<IGroupState['data']['list']>(`data.list`)
export const getGroupListById = (docId: string) => get<IGroupState['data']['list']['']>(`data.list.${docId}`)
export const getGroupSelectionList = get<IGroupState['data']['list_selection']>(`data.list_selection`)
export const getGroupOption = state => {
  const groupSelectionList = getGroupSelectionList(state)
  const groupOption = R.compose(
    R.map((v: IGroupSelection) => {
      return {
        id: v._id,
        label: `${v.group_code} (${v.guide_name})`,
        value: {
          id: v._id,
          label: `${v.group_code} (${v.guide_name})`,
        },
      }
    }),
    R.values,
  )(groupSelectionList)

  return groupOption
}
