import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Field, Formik, FormikProps } from 'formik'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import * as R from 'ramda'

import { MainLayout } from '@app/components/layout/main-layout'
import { TextInput } from '@app/components/input-field/text-input'
import { LabelField } from '@app/components/label-field/label'
import { SubmitActionForm } from '@app/components/action-form/SubmitButton'
import { DeleteActionForm } from '@app/components/action-form/DeleteButton'
import { WithLoading } from '@app/components/hoc/withLoading'
import { WithError } from '@app/components/hoc/withError'
import { withValidateRole } from '@app/components/hoc/withValidateRole'
import { UserRoleEnum } from '@app/store/modules/auth/reducer'
import { getRootSellerState, getSellerError, getSellerListById, getSellerIsLoading } from '@app/store/modules/seller/selector'
import { createSeller, updateSeller, getSeller, deleteSeller, setSellerModuleError } from '@app/store/modules/seller/action'
import { SellerSchema } from '@app/helpers/validators/seller-validator'
import { SellerFormBody } from '@app/helpers/form-types/seller-form-type'
interface MatchParams {
  id: string
}

class SellerPage extends React.Component<SellerFormPageProps & RouteComponentProps<MatchParams>> {
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
      const sellerData = this.props.seller(params.id)

      this.props.setSellerModuleError('getSeller')

      if (!sellerData) {
        await this.props.getSeller(params.id)
      }
    }
  }

  componentDidUpdate() {
    const isEditMode = this.state.docId ? true : false
    const { sellerError } = this.props
    const sellerData = this.props.seller(this.state.docId)

    if (sellerError['createSeller']) {
      this.form.setFieldError('orgCode', sellerError['createSeller'].toString())
    }

    if (isEditMode && sellerData && !this.state.setFormDone) {
      this.form.setFieldValue('sellerName', sellerData.seller_name)
      this.form.setFieldValue('sellerCode', sellerData.seller_code)
      this.form.setFieldValue('sellerCom', sellerData.seller_com)
      this.form.setFieldValue('sellerRemark', sellerData.seller_remark)

      this.setState({ setFormDone: true })
    }
  }

  async handleDelete() {
    this.setState({ isDeleting: true })
    await this.props.deleteSeller(this.state.docId)
    this.props.history.push('/seller')
    this.setState({ isDeleting: false })
  }

  render() {
    const isEditMode = this.state.docId ? true : false
    const sellerData = this.props.seller(this.state.docId)
    const isLoading = isEditMode ? (!sellerData ? true : false) : false
    const isLoadOrgError = this.props.sellerError['getSeller'] ? true : false

    return (
      <MainLayout pageName="คนขาย">
        <WithError isError={isLoadOrgError}>
          <WithLoading isLoading={isLoading}>
            <Formik
              initialValues={null}
              validationSchema={SellerSchema}
              onSubmit={async (values: SellerFormBody) => {
                if (!this.state.docId) await this.props.createSeller(values)
                else await this.props.updateSeller(this.state.docId, values)
                this.props.history.push('/seller')
              }}
              ref={el => (this.form = el)}
              render={(props: FormikProps<SellerFormBody>) => (
                <form onSubmit={props.handleSubmit}>
                  <LabelField isRequired>ชื่อพนักงานขาย</LabelField>
                  <Field name="sellerName" component={TextInput} value={props.values.sellerName} onChange={props.handleChange} />

                  <LabelField isRequired>รหัสพนักงานขาย</LabelField>
                  <Field name="sellerCode" component={TextInput} value={props.values.sellerCode} onChange={props.handleChange} />

                  <LabelField isRequired>ค่านํ้าพนักงานขาย</LabelField>
                  <Field type="number" name="sellerCom" component={TextInput} value={props.values.sellerCom} onChange={props.handleChange} />

                  <LabelField>หมายเหตุ</LabelField>
                  <Field name="sellerRemark" component={TextInput} value={props.values.sellerRemark} onChange={props.handleChange} />

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

type SellerFormPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const sellerRootState = getRootSellerState(state)
  const sellerError = getSellerError(sellerRootState)
  const seller = docId => getSellerListById(docId)(sellerRootState)
  return {
    isSummiting: getSellerIsLoading(sellerRootState),
    sellerError,
    seller,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSeller: formBody => dispatch(createSeller(formBody)),
    updateSeller: (docId, formBody) => dispatch(updateSeller(docId, formBody)),
    getSeller: docId => dispatch(getSeller(docId)),
    deleteSeller: docId => dispatch(deleteSeller(docId)),
    setSellerModuleError: key => dispatch(setSellerModuleError(key)),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SellerPage)

const FormActionContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 20px;
`
