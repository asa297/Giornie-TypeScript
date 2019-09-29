import { fromJS } from 'immutable'
import * as R from 'ramda'

import { IOrganizationState, IOrganizationSelection } from '@app/store/modules/organization/reducer'
import { MODULE_NAME } from '@app/store/modules/organization/type'
import { get } from '@app/store/modules/helpers/ramda'

export const getRootOrganizationState = state => state.getIn([MODULE_NAME], fromJS({})).toJS() as IOrganizationState
export const getOrganizationIsLoading = get<IOrganizationState['isLoading']>(`isLoading`)
export const getOrganizationError = get<IOrganizationState['error']>('error')
export const getOrganizationErrorText = (errorKey: string) => get<IOrganizationState['error']>(`error.${errorKey}`)

export const getOrganizationList = get<IOrganizationState['data']['list']>(`data.list`)
export const getOrganizationListById = (docId: string) => get<IOrganizationState['data']['list']['']>(`data.list.${docId}`)
export const getOrganizationSelectionList = get<IOrganizationState['data']['list_selection']>(`data.list_selection`)
export const getOrganizationOption = state => {
  const organizationSelectionList = getOrganizationSelectionList(state)
  const organizationOption = R.compose(
    R.map((v: IOrganizationSelection) => {
      return {
        id: v._id,
        label: `${v.org_name} (${v.org_code})`,
        value: {
          id: v._id,
          label: `${v.org_name} (${v.org_code})`,
        },
      }
    }),
    R.values,
  )(organizationSelectionList)

  return organizationOption
}
