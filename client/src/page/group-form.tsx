import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Field, Formik, FormikProps } from 'formik'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import * as R from 'ramda'

import { MainLayout } from '@app/components/layout/main-layout'
import { TextInput } from '@app/components/input-field/text-input'
import { SelectInput } from '@app/components/input-field/select-input'
import { LabelField } from '@app/components/label-field/label'
import { SubmitActionForm } from '@app/components/action-form/SubmitButton'
import { DeleteActionForm } from '@app/components/action-form/DeleteButton'
import { WithLoading } from '@app/components/hoc/withLoading'
import { WithError } from '@app/components/hoc/withError'
import { getRootGroupState, getGroupError, getGroupListById, getGroupIsLoading } from '@app/store/modules/group/selector'
import { createGroup, updateGroup, getGroup, deleteGroup, setGroupModuleError } from '@app/store/modules/group/action'
import { GroupSchema } from '@app/helpers/validators/group-validator'
import { GroupFormBody } from '@app/helpers/form-types/group-form-type'
import { loadOrganizationsSelection } from '@app/store/modules/organization/action'
import { getRootOrganizationState, getOrganizationOption } from '@app/store/modules/organization/selector'

interface MatchParams {
  id: string
}

class GroupPage extends React.Component<GroupFormPageProps & RouteComponentProps<MatchParams>> {
  form: Formik<{}>

  state = {
    done: false,
    docId: null,
    setFormDone: false,
    isDeleting: false,
  }

  async componentDidMount() {
    const { params } = this.props.match

    await this.props.loadOrganizationsSelection()

    if (!R.isEmpty(params)) {
      this.setState({ docId: params.id })
      const groupData = this.props.group(params.id)

      this.props.setGroupModuleError('getGroup')

      if (!groupData) {
        await this.props.getGroup(params.id)
      }
    }

    this.setState({ done: true })
  }

  componentDidUpdate() {
    const isEditMode = this.state.docId ? true : false
    const { groupError } = this.props
    const groupData = this.props.group(this.state.docId)

    if (groupError['createGroup']) {
      this.form.setFieldError('groupCode', groupError['createGroup'].toString())
    }

    if (isEditMode && groupData && !this.state.setFormDone) {
      this.form.setFieldValue('org', this.props.orgList.find(org => org.id === groupData.org.id))
      this.form.setFieldValue('groupCode', groupData.group_code)
      this.form.setFieldValue('groupStickerNumber', groupData.group_sticker_number)
      this.form.setFieldValue('guideName', groupData.guide_name)
      this.form.setFieldValue('groupRemark', groupData.group_remark)
      this.setState({ setFormDone: true })
    }
  }

  async handleDelete() {
    this.setState({ isDeleting: true })
    await this.props.deleteGroup(this.state.docId)
    this.props.history.push('/group')
    this.setState({ isDeleting: false })
  }

  render() {
    const isEditMode = this.state.docId ? true : false
    const groupData = this.props.group(this.state.docId)
    const isLoading = isEditMode ? (!groupData ? true : false) : !this.state.done
    const isLoadGroupError = this.props.groupError['getGroup'] ? true : false

    return (
      <MainLayout pageName="บริษัท">
        <WithError isError={isLoadGroupError}>
          <WithLoading isLoading={isLoading}>
            <Formik
              initialValues={null}
              validationSchema={GroupSchema}
              onSubmit={async (values: GroupFormBody) => {
                if (!this.state.docId) await this.props.createGroup(values)
                else await this.props.updateGroup(this.state.docId, values)
                this.props.history.push('/group')
              }}
              ref={el => (this.form = el)}
              render={(props: FormikProps<GroupFormBody>) => (
                <form onSubmit={props.handleSubmit}>
                  <LabelField isRequired>บริษัท</LabelField>
                  <Field
                    name="org"
                    component={SelectInput}
                    options={this.props.orgList}
                    value={props.values.org ? props.values.org.label : ''}
                    onChange={id => props.setFieldValue('org', this.props.orgList.find(org => org.id === id))}
                  />

                  <LabelField isRequired>รหัสกรุ๊ป</LabelField>
                  <Field name="groupCode" component={TextInput} value={props.values.groupCode} onChange={props.handleChange} />

                  <LabelField isRequired>หมายเลขสติกเกอร์</LabelField>
                  <Field name="groupStickerNumber" component={TextInput} value={props.values.groupStickerNumber} onChange={props.handleChange} />

                  <LabelField isRequired>ชื่อไกด์</LabelField>
                  <Field name="guideName" component={TextInput} value={props.values.guideName} onChange={props.handleChange} />

                  <LabelField>หมายเหตุ</LabelField>
                  <Field name="groupRemark" component={TextInput} value={props.values.groupRemark} onChange={props.handleChange} />

                  <FormActionContainer>
                    <DeleteActionForm title="ยืนยันการลบรายการนี้" loading={this.state.isDeleting} onConfirm={() => this.handleDelete()} />
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

type GroupFormPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const groupRootState = getRootGroupState(state)
  const organizationRootState = getRootOrganizationState(state)
  const groupError = getGroupError(groupRootState)
  const group = docId => getGroupListById(docId)(groupRootState)

  return {
    isSummiting: getGroupIsLoading(groupRootState),
    groupError,
    group,
    orgList: getOrganizationOption(organizationRootState),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGroup: formBody => dispatch(createGroup(formBody)),
    updateGroup: (docId, formBody) => dispatch(updateGroup(docId, formBody)),
    getGroup: docId => dispatch(getGroup(docId)),
    deleteGroup: docId => dispatch(deleteGroup(docId)),
    setGroupModuleError: key => dispatch(setGroupModuleError(key)),
    loadOrganizationsSelection: () => dispatch(loadOrganizationsSelection()),
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(GroupPage)

const FormActionContainer = styled.div`
  display: flex;

  margin-top: 20px;
`
