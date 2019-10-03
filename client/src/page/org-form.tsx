import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Field, Formik, FormikProps } from 'formik'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import * as R from 'ramda'

import { MainLayout } from '@app/components/layout/main-layout'
import { OrganizationSchema } from '@app/helpers/validators/org-validator'
import { TextInput } from '@app/components/input-field/text-input'
import { SelectInput } from '@app/components/input-field/select-input'
import { LabelField } from '@app/components/label-field/label'
import { SubmitActionForm } from '@app/components/action-form/SubmitButton'
import { DeleteActionForm } from '@app/components/action-form/DeleteButton'
import { orgTypeData } from '@app/static/org-static'
import {
  getRootOrganizationState,
  getOrganizationIsLoading,
  getOrganizationError,
  getOrganizationListById,
} from '@app/store/modules/organization/selector'
import {
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  setOrganizationModuleError,
} from '@app/store/modules/organization/action'
import { OrganizationFormBody } from '@app/helpers/form-types/organization-form-type'
import { WithLoading } from '@app/components/hoc/withLoading'
import { WithError } from '@app/components/hoc/withError'
import { withValidateRole, UserRoleProps } from '@app/components/hoc/withValidateRole'
import { UserRoleEnum } from '@app/store/modules/auth/reducer'
interface MatchParams {
  id: string
}

class OrgPage extends React.Component<OrgFormPageProps & RouteComponentProps<MatchParams> & UserRoleProps> {
  form: Formik<{}>

  state = {
    docId: null,
    setFormDone: false,
    isDeleting: false,
  }

  async componentDidMount() {
    const { params } = this.props.match

    if (!R.isEmpty(params)) {
      this.setState({ docId: params.id })
      const organizationData = this.props.organization(params.id)

      this.props.setOrganizationModuleError('getOrganization')

      if (!organizationData) {
        await this.props.getOrganization(params.id)
      }
    }
  }

  componentDidUpdate() {
    const isEditMode = this.state.docId ? true : false
    const { organizationError } = this.props
    const organizationData = this.props.organization(this.state.docId)

    if (organizationError['createOrganation']) {
      this.form.setFieldError('orgCode', organizationError['createOrganation'].toString())
    }

    if (isEditMode && organizationData && !this.state.setFormDone) {
      this.form.setFieldValue('orgType', orgTypeData.find(org => org.id === organizationData.org_type_id))
      this.form.setFieldValue('orgName', organizationData.org_name)
      this.form.setFieldValue('orgComA', organizationData.org_com_A)
      this.form.setFieldValue('orgComB', organizationData.org_com_B)
      this.form.setFieldValue('orgCode', organizationData.org_code)

      this.setState({ setFormDone: true })
    }
  }

  async handleDelete() {
    this.setState({ isDeleting: true })
    await this.props.deleteOrganization(this.state.docId)
    this.props.history.push('/org')
    this.setState({ isDeleting: false })
  }

  render() {
    const isEditMode = this.state.docId ? true : false
    const organizationData = this.props.organization(this.state.docId)
    const isLoading = isEditMode ? (!organizationData ? true : false) : false
    const isLoadOrgError = this.props.organizationError['getOrganization'] ? true : false

    return (
      <MainLayout pageName="บริษัท">
        <WithError isError={isLoadOrgError}>
          <WithLoading isLoading={isLoading}>
            <Formik
              initialValues={null}
              validationSchema={OrganizationSchema}
              onSubmit={async (values: OrganizationFormBody) => {
                if (!this.state.docId) await this.props.createOrganization(values)
                else await this.props.updateOrganization(this.state.docId, values)
                this.props.history.push('/org')
              }}
              ref={el => (this.form = el)}
              render={(props: FormikProps<OrganizationFormBody>) => (
                <form onSubmit={props.handleSubmit}>
                  <LabelField isRequired>ประเภทบริษัท</LabelField>
                  <Field
                    name="orgType"
                    component={SelectInput}
                    options={orgTypeData}
                    value={props.values.orgType ? props.values.orgType.label : ''}
                    onChange={id => props.setFieldValue('orgType', orgTypeData.find(org => org.id === id))}
                  />

                  <LabelField isRequired>ชื่อบริษัท</LabelField>
                  <Field name="orgName" component={TextInput} value={props.values.orgName} onChange={props.handleChange} />

                  <LabelField isRequired>ค่าคอมมิชชั่นสินค้า A</LabelField>
                  <Field type="number" name="orgComA" component={TextInput} value={props.values.orgComA} onChange={props.handleChange} />

                  <LabelField>ค่าคอมมิชชั่นสินค้า B</LabelField>
                  <Field type="number" name="orgComB" component={TextInput} value={props.values.orgComB} onChange={props.handleChange} />

                  <LabelField isRequired>รหัสบริษัท</LabelField>
                  <Field name="orgCode" component={TextInput} value={props.values.orgCode} onChange={props.handleChange} disabled={isEditMode} />

                  <FormActionContainer>
                    {isEditMode && (
                      <DeleteActionForm title="ยืนยันการลบรายการนี้" loading={this.state.isDeleting} onConfirm={() => this.handleDelete()} />
                    )}
                    <SubmitActionForm loading={this.props.isSummiting} />
                  </FormActionContainer>
                </form>
              )}
            />
          </WithLoading>
        </WithError>
      </MainLayout>
    )
  }
}

type OrgFormPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const organizationRootState = getRootOrganizationState(state)
  const organizationError = getOrganizationError(organizationRootState)
  const organization = docId => getOrganizationListById(docId)(organizationRootState)
  return {
    isSummiting: getOrganizationIsLoading(organizationRootState),
    organizationError,
    organization,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrganization: formBody => dispatch(createOrganization(formBody)),
    updateOrganization: (docId, formBody) => dispatch(updateOrganization(docId, formBody)),
    getOrganization: docId => dispatch(getOrganization(docId)),
    deleteOrganization: docId => dispatch(deleteOrganization(docId)),
    setOrganizationModuleError: key => dispatch(setOrganizationModuleError(key)),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OrgPage)

const FormActionContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 20px;
`
