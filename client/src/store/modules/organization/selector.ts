import { fromJS } from 'immutable'

import { IOrganizationState } from '@app/store/modules/organization/reducer'
import { MODULE_NAME } from '@app/store/modules/organization/type'
import { get } from '@app/store/modules/helpers/ramda'

export const getRootOrganizationState = state => state.getIn([MODULE_NAME], fromJS({})).toJS() as IOrganizationState
export const getOrganizationIsLoading = get<IOrganizationState['isLoading']>(`isLoading`)
export const getOrganizationError = get<IOrganizationState['error']>('error')
export const getOrganizationErrorText = (errorKey: string) => get<IOrganizationState['error']>(`error.${errorKey}`)

export const getOrganizationList = get<IOrganizationState['data']['list']>(`data.list`)
