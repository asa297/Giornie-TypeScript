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
import { getRootOrganizationState, getOrganizationIsLoading } from '@app/store/modules/organization/selector'
import { createOrganization } from '@app/store/modules/organization/action'
import { OrganizationFormBody } from '@app/helpers/form-types/organization-form-type'

interface MatchParams {
  id: string
}

class OrgPage extends React.Component<OrgFormPageProps & RouteComponentProps<MatchParams>> {
  state = {
    docId: null,
  }

  componentDidMount() {
    const { params } = this.props.match

    if (!R.isEmpty(params)) {
      this.setState({ docId: params.id })
    }
  }

  render() {
    return (
      <MainLayout pageName="บริษัท">
        <Formik
          //   initialValues={isEditingForm ? generateFormData(Item) : initialValues}
          initialValues={{}}
          enableReinitialize={true}
          validationSchema={OrganizationSchema}
          onSubmit={async (values: OrganizationFormBody) => {
            if (!this.state.docId) this.props.createNewOrganization(values)
            // if (isEditingForm && values._id) await Update(values)
            // else if (!isEditingForm) await Insert(values)
            // else alert(`Server refuse your request.`)
            // goBack()
          }}
          render={(props: FormikProps<OrganizationFormBody>) => (
            <form onSubmit={props.handleSubmit}>
              <LabelField isRequired>ประเภทบริษัท</LabelField>
              <Field
                name="orgType"
                component={SelectInput}
                options={orgTypeData}
                value={props.values.orgType ? props.values.orgType.label : ''}
                onChange={id => props.setFieldValue('orgType', orgTypeData.find(v => v.id === id))}
              />

              <LabelField isRequired>ชื่อบริษัท</LabelField>
              <Field name="orgName" component={TextInput} value={props.values.orgName} onChange={props.handleChange} />

              <LabelField isRequired>ค่าคอมมิชชั่นสินค้า A</LabelField>
              <Field
                type="number"
                name="orgComA"
                component={TextInput}
                value={props.values.orgComA}
                onChange={props.handleChange}
              />

              <LabelField>ค่าคอมมิชชั่นสินค้า B</LabelField>
              <Field
                type="number"
                name="orgComB"
                component={TextInput}
                value={props.values.orgComB}
                onChange={props.handleChange}
              />

              <LabelField isRequired>รหัสบริษัท</LabelField>
              <Field
                label="รหัสบริษัท"
                name="orgCode"
                component={TextInput}
                value={props.values.orgCode}
                onChange={props.handleChange}
              />

              <FormActionContainer>
                <DeleteActionForm title="ยืนยันการลบรายการนี้" onConfirm={() => console.log('test')} />
                <SubmitActionForm loading={this.props.isSummiting} />
              </FormActionContainer>
            </form>
          )}
        />
      </MainLayout>
    )
  }
}

type OrgFormPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const organizationRootState = getRootOrganizationState(state)
  return {
    isSummiting: getOrganizationIsLoading(organizationRootState),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewOrganization: formBody => dispatch(createOrganization(formBody)),
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OrgPage)

const FormActionContainer = styled.div`
  display: flex;
`
