import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Field, Formik, FormikProps } from 'formik'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import * as R from 'ramda'
import { UploadFile } from 'antd/lib/upload/interface'
import { message } from 'antd'

import { MainLayout } from '@app/components/layout/main-layout'
import { TextInput } from '@app/components/input-field/text-input'
import { LabelField } from '@app/components/label-field/label'
import { SubmitActionForm } from '@app/components/action-form/SubmitButton'
import { DeleteActionForm } from '@app/components/action-form/DeleteButton'
import { WithLoading } from '@app/components/hoc/withLoading'
import { WithError } from '@app/components/hoc/withError'
import { withValidateRole, UserRoleProps } from '@app/components/hoc/withValidateRole'
import { UserRoleEnum } from '@app/store/modules/auth/reducer'
import { getRootItemState, getItemError, getItemListById, getItemIsLoading } from '@app/store/modules/item/selector'
import { createItem, updateItem, getItem, deleteItem, setItemModuleError } from '@app/store/modules/item/action'
import { ItemFormBody } from '@app/helpers/form-types/item-form-type'
import { SelectInput } from '@app/components/input-field/select-input'
import { itemTypeData } from '@app/static/item-static'
import { ItemSchema } from '@app/helpers/validators/item-validator'
import { UploadImageInput } from '@app/components/input-field/upload-image-input'
import { checkImageType, checkFileSize, getBase64Image } from '@app/helpers/image'

interface MatchParams {
  id: string
}

class ItemPage extends React.Component<ItemFormPageProps & RouteComponentProps<MatchParams> & UserRoleProps> {
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
      const itemData = this.props.item(params.id)

      this.props.setItemModuleError('getItem')

      if (!itemData) {
        await this.props.getItem(params.id)
      }
    }
  }

  componentDidUpdate() {
    const isEditMode = this.state.docId ? true : false
    const { itemError } = this.props
    const itemData = this.props.item(this.state.docId)

    if (itemError['createItem']) {
      this.form.setFieldError('item_code', itemError['createItem'].toString())
    }

    if (isEditMode && itemData && !this.state.setFormDone) {
      this.form.setFieldValue('item_image', itemData.item_image_url)
      this.form.setFieldValue('item_type', itemTypeData.find(type => type.id === itemData.item_type.item_type_id))
      this.form.setFieldValue('item_name', itemData.item_name)
      this.form.setFieldValue('item_code', itemData.item_code)
      this.form.setFieldValue('item_factory', itemData.item_factory)
      this.form.setFieldValue('item_color', itemData.item_color)
      this.form.setFieldValue('item_skin', itemData.item_skin)
      this.form.setFieldValue('item_price', itemData.item_price)
      this.form.setFieldValue('item_remark', itemData.item_remark)

      this.setState({ setFormDone: true })
    }
  }

  async handleDelete() {
    this.setState({ isDeleting: true })
    await this.props.deleteItem(this.state.docId)
    this.props.history.push('/item')
    this.setState({ isDeleting: false })
  }

  async handleChangeImage(file: UploadFile) {
    const checkImage = await checkImageType(file.originFileObj as File)
    const checkImageSize = checkFileSize(file.originFileObj as File, 2 * 1024 * 1024)

    if (!checkImage.isImage) {
      message.error('กรุณาอัพโหลดรูปเท่านั้น')
    } else if (!checkImageSize) {
      message.error('ขนาดรูปไม่เกิน 2 MB')
    } else {
      const imageBase64 = await getBase64Image(file.originFileObj as File)

      this.form.setFieldValue('item_image', imageBase64)
      this.form.setFieldValue('item_file', file.originFileObj as File)
    }
  }

  render() {
    const isEditMode = this.state.docId ? true : false
    const itemData = this.props.item(this.state.docId)
    const isLoading = isEditMode ? (!itemData ? true : false) : false
    const isLoadItemError = this.props.itemError['getItem'] ? true : false

    return (
      <MainLayout pageName="สินค้า">
        <WithError isError={isLoadItemError}>
          <WithLoading isLoading={isLoading}>
            <Formik
              initialValues={null}
              validationSchema={ItemSchema}
              onSubmit={async (values: ItemFormBody) => {
                if (!this.state.docId) await this.props.createItem(values)
                else await this.props.updateItem(this.state.docId, values)
                this.props.history.push('/item')
              }}
              ref={el => (this.form = el)}
              render={(props: FormikProps<ItemFormBody>) => (
                <form onSubmit={props.handleSubmit}>
                  <UploadWrapper>
                    <Field
                      name="item_image"
                      component={UploadImageInput}
                      value={props.values.item_image}
                      onChange={({ file }) => this.handleChangeImage(file)}
                    />
                  </UploadWrapper>

                  <LabelField isRequired>ประเภทสินค้า</LabelField>
                  <Field
                    name="item_type"
                    component={SelectInput}
                    options={itemTypeData}
                    value={props.values.item_type ? props.values.item_type.label : ''}
                    onChange={id => props.setFieldValue('item_type', itemTypeData.find(type => type.id === id))}
                  />

                  <LabelField isRequired>ชื่อสินค้า</LabelField>
                  <Field name="item_name" component={TextInput} value={props.values.item_name} onChange={props.handleChange} />

                  <LabelField isRequired>รหัสสินค้า</LabelField>
                  <Field name="item_code" component={TextInput} value={props.values.item_code} onChange={props.handleChange} disabled={isEditMode} />

                  <LabelField>โรงงาน</LabelField>
                  <Field name="item_factory" component={TextInput} value={props.values.item_factory} onChange={props.handleChange} />

                  <LabelField>สี/ลาย</LabelField>
                  <Field name="item_color" component={TextInput} value={props.values.item_color} onChange={props.handleChange} />

                  <LabelField>ประเภทหนัง</LabelField>
                  <Field name="item_skin" component={TextInput} value={props.values.item_skin} onChange={props.handleChange} />

                  <LabelField isRequired>ราคา</LabelField>
                  <Field type="number" name="item_price" component={TextInput} value={props.values.item_price} onChange={props.handleChange} />

                  <LabelField>หมายเหตุ</LabelField>
                  <Field name="item_remark" component={TextInput} value={props.values.item_remark} onChange={props.handleChange} />

                  <FormActionContainer>
                    {isEditMode && this.props.userRole !== UserRoleEnum.STAFF && (
                      <DeleteActionForm title="ยืนยันการลบรายการนี้" loading={this.state.isDeleting} onConfirm={() => this.handleDelete()} />
                    )}
                    {this.props.userRole !== UserRoleEnum.STAFF && <SubmitActionForm loading={this.props.isSummiting} />}
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

type ItemFormPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const itemRootState = getRootItemState(state)
  const itemError = getItemError(itemRootState)
  const item = docId => getItemListById(docId)(itemRootState)
  return {
    isSummiting: getItemIsLoading(itemRootState),
    itemError,
    item,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createItem: formBody => dispatch(createItem(formBody)),
    updateItem: (docId, formBody) => dispatch(updateItem(docId, formBody)),
    getItem: docId => dispatch(getItem(docId)),
    deleteItem: docId => dispatch(deleteItem(docId)),
    setItemModuleError: key => dispatch(setItemModuleError(key)),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT, UserRoleEnum.STAFF]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ItemPage)

const FormActionContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 20px;
`

const UploadWrapper = styled.div`
  @media (max-width: 992px) {
    height: 250px;
    width: 100%;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    height: 350px;
  }
  margin: auto;
  width: 50%;
  height: 400px;

  margin-bottom: 50px;
`
