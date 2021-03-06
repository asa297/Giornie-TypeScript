export const MODULE_NAME = 'ORGANIZATION_MODULE'

export const actionTypes = {
  LOAD_ORGANIZATIONS: `${MODULE_NAME}/LOAD_ORGANIZATIONS`,
  LOAD_ORGANIZATIONS_SUCCESS: `${MODULE_NAME}/LOAD_ORGANIZATIONS_SUCCESS`,
  LOAD_ORGANIZATIONS_FAILURE: `${MODULE_NAME}/LOAD_ORGANIZATIONS_FAILURE`,

  GET_ORGANIZATION: `${MODULE_NAME}/GET_ORGANIZATION`,
  GET_ORGANIZATION_SUCCESS: `${MODULE_NAME}/GET_ORGANIZATION_SUCCESS`,
  GET_ORGANIZATION_FAILURE: `${MODULE_NAME}/GET_ORGANIZATION_FAILURE`,

  UPDATE_ORGANIZATION: `${MODULE_NAME}/UPDATE_ORGANIZATION`,
  UPDATE_ORGANIZATION_SUCCESS: `${MODULE_NAME}/UPDATE_ORGANIZATION_SUCCESS`,
  UPDATE_ORGANIZATION_FAILURE: `${MODULE_NAME}/UPDATE_ORGANIZATION_FAILURE`,

  CREATE_ORGANIZATION: `${MODULE_NAME}/CREATE_ORGANIZATION`,
  CREATE_ORGANIZATION_SUCCESS: `${MODULE_NAME}/CREATE_ORGANIZATION_SUCCESS`,
  CREATE_ORGANIZATION_FAILURE: `${MODULE_NAME}/CREATE_ORGANIZATION_FAILURE`,

  DELETE_ORGANIZATION: `${MODULE_NAME}/DELETE_ORGANIZATION`,
  DELETE_ORGANIZATION_SUCCESS: `${MODULE_NAME}/DELETE_ORGANIZATION_SUCCESS`,
  DELETE_ORGANIZATION_FAILURE: `${MODULE_NAME}/DELETE_ORGANIZATION_FAILURE`,

  LOAD_ORGANIZATIONS_SELECTION: `${MODULE_NAME}/LOAD_ORGANIZATIONS_SELECTION`,
  LOAD_ORGANIZATIONS_SELECTION_SUCCESS: `${MODULE_NAME}/LOAD_ORGANIZATIONS_SELECTION_SUCCESS`,
  LOAD_ORGANIZATIONS_SELECTION_FAILURE: `${MODULE_NAME}/LOAD_ORGANIZATIONS_SELECTION_FAILURE`,

  IS_LOADING: `${MODULE_NAME}/IS_LOADING`,
  SET_ORGANIZATION_MODULE_ERROR: `${MODULE_NAME}/SET_ORGANIZATION_MODULE_ERROR`,
}
