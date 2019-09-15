import { fromJS } from 'immutable'

import { AuthState } from './reducer'

import { get } from '../helpers/ramda'
import { MODULE_NAME } from './type'

export const getExerciseState = state => state.getIn([MODULE_NAME], fromJS({})).toJS() as AuthState
export const getIsLoading = get(`isLoading`)
