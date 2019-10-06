import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Formik, Field, FormikProps } from 'formik'
import { Collapse } from 'antd'

import { UserRoleEnum } from '@app/store/modules/auth/reducer'
import { withValidateRole, UserRoleProps } from '@app/components/hoc/withValidateRole'
import { joinSocket } from '@app/store/modules/purchase-order/action'
import { getRootPurchaseOrderState, getSocketSession } from '@app/store/modules/purchase-order/selector'
import { loadGroupsSelection } from '@app/store/modules/group/action'
import { loadSellersSelection } from '@app/store/modules/seller/action'
import { getRootGroupState, getGroupOption } from '@app/store/modules/group/selector'
import { getRootSellerState, getSellerOption } from '@app/store/modules/seller/selector'
import { WithLoading } from '@app/components/hoc/withLoading'
import { MainLayout } from '@app/components/layout/main-layout'
import { PurchaseOrderSchema } from '@app/helpers/validators/purchase-order-validator'
import { LabelField } from '@app/components/label-field/label'
import { SelectInput } from '@app/components/input-field/select-input'

import { PurchaseOrderFormBody } from '@app/helpers/form-types/purchase-order-form-type'
import { SearchInput } from '@app/components/search-input/search.input'
import { TextInput } from '@app/components/input-field/text-input'
import { clearPOItems, searchItem } from '@app/store/modules/item/action'
import { getRootItemState, getItemErrorText } from '@app/store/modules/item/selector'

class POPage extends React.Component<POPageProps & UserRoleProps> {
  state = {
    done: false,
    searching: false,
  }

  form: Formik<{}>

  async componentDidMount() {
    await this.props.joinSocket()
    await this.props.loadGroupsSelection()
    await this.props.loadSellersSelection()
    this.props.clearPOItems()

    this.props.socketSession.emit('joinroom')
    this.props.socketSession.emit('openpo')

    this.setState({ done: true })
  }

  componentWillUnmount() {
    this.props.socketSession.disconnect()
  }

  async handleItemSearch(itemCode: string) {
    try {
      this.setState({ searching: true })
      await this.props.searchItem(itemCode)
    } catch (error) {
    } finally {
      this.setState({ searching: false })
    }
  }

  render() {
    return (
      <MainLayout pageName="ใบเสนอขาย">
        <WithLoading isLoading={!this.state.done}>
          <Formik
            initialValues={{
              group: null,
              seller: null,
              subTotal: 0,
              grandTotalDiscount: 0,
              grandTotal: 0,
              receiveCash: 0,
              changeCash: 0,
            }}
            validate={PurchaseOrderSchema}
            onSubmit={values => {}}
            ref={el => (this.form = el)}
            render={(props: FormikProps<PurchaseOrderFormBody>) => (
              <form onSubmit={props.handleSubmit}>
                <CollapseWrapper defaultActiveKey={['1']}>
                  <Collapse.Panel header="ส่วนที่ 1 : รายละเอียดเบื้องต้น" key="1">
                    <LabelField isRequired>กรุ๊ป</LabelField>
                    <Field
                      name="group"
                      component={SelectInput}
                      options={this.props.groupOptions}
                      value={props.values.group ? props.values.group.label : ''}
                      onChange={id => props.setFieldValue('group', this.props.groupOptions.find(group => group.id === id))}
                    />

                    <LabelField isRequired>พนักงานขาย</LabelField>
                    <Field
                      name="seller"
                      component={SelectInput}
                      options={this.props.sellerOptions}
                      value={props.values.seller ? props.values.seller.label : ''}
                      onChange={id => props.setFieldValue('seller', this.props.sellerOptions.find(seller => seller.id === id))}
                    />
                  </Collapse.Panel>
                  <Collapse.Panel header="ส่วนที่ 2 : รายการสินค้า" key="2">
                    <SearchInput
                      placeholder="ค้นหารายการสินค้า"
                      onSearch={itemCode => this.handleItemSearch(itemCode)}
                      disabled={this.state.searching}
                      searching={this.state.searching}
                      errorText={this.props.itemErrorText('searchItem') ? this.props.itemErrorText('searchItem').toString() : null}
                    />
                  </Collapse.Panel>
                  <Collapse.Panel header="ส่วนที่ 3 : รายละเอียดการชำระเงิน" key="3">
                    <LabelField>ส่วนลด</LabelField>
                    <Field name="discount" type="number" component={TextInput} value={props.values.discount} onChange={props.handleChange} />
                    <LabelField>ชำระเป็นเครดิต</LabelField>
                    <Field name="credit" type="number" component={TextInput} value={props.values.credit} onChange={props.handleChange} />
                    {props.values.credit && (
                      <React.Fragment>
                        <LabelField>ชาร์์จเครดิต</LabelField>
                        <Field
                          name="creditCharge"
                          type="number"
                          component={TextInput}
                          value={props.values.creditCharge}
                          onChange={props.handleChange}
                        />
                      </React.Fragment>
                    )}
                  </Collapse.Panel>
                  <Collapse.Panel header="ส่วนที่ 4 : สรุปรายการขาย" key="4">
                    <LabelField>ยอดรวม</LabelField>
                    <Field name="subTotal" type="number" component={TextInput} value={props.values.subTotal} onChange={props.handleChange} disabled />
                    <LabelField>ส่วนลด</LabelField>
                    <Field
                      name="grandTotalDiscount"
                      type="number"
                      component={TextInput}
                      value={props.values.grandTotalDiscount}
                      onChange={props.handleChange}
                      disabled
                    />
                    {props.values.credit && (
                      <React.Fragment>
                        <LabelField>จำนวนชำระเครดิต</LabelField>
                        <Field
                          name="grandTotalCredit"
                          type="number"
                          component={TextInput}
                          value={props.values.grandTotalCredit}
                          onChange={props.handleChange}
                          disabled
                        />
                      </React.Fragment>
                    )}
                    {props.values.credit && (
                      <React.Fragment>
                        <LabelField>จำนวนชาร์จเครดิต</LabelField>
                        <Field
                          name="grandTotalCreditCharge"
                          type="number"
                          component={TextInput}
                          value={props.values.grandTotalCreditCharge}
                          onChange={props.handleChange}
                          disabled
                        />
                      </React.Fragment>
                    )}
                    <LabelField>ยอดที่ต้องชำระ</LabelField>
                    <Field
                      name="grandTotal"
                      type="number"
                      component={TextInput}
                      value={props.values.grandTotal}
                      onChange={props.handleChange}
                      disabled
                    />
                    <LabelField isRequired>ยอดรับเงิน</LabelField>
                    <Field name="receiveCash" type="number" component={TextInput} value={props.values.receiveCash} onChange={props.handleChange} />
                    <LabelField>ยอดเงินทอน</LabelField>
                    <Field
                      name="changeCash"
                      type="number"
                      component={TextInput}
                      value={props.values.changeCash}
                      onChange={props.handleChange}
                      disabled
                    />
                  </Collapse.Panel>
                </CollapseWrapper>
              </form>
            )}
          />
        </WithLoading>
      </MainLayout>
    )
  }
}

type POPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const purchaseOrderRootState = getRootPurchaseOrderState(state)
  const groupRootState = getRootGroupState(state)
  const sellerRootState = getRootSellerState(state)
  const itemRootState = getRootItemState(state)
  return {
    socketSession: getSocketSession(purchaseOrderRootState),
    groupOptions: getGroupOption(groupRootState),
    sellerOptions: getSellerOption(sellerRootState),
    itemErrorText: (errorKey: string) => getItemErrorText(errorKey)(itemRootState),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinSocket: () => dispatch(joinSocket()),
    loadGroupsSelection: () => dispatch(loadGroupsSelection()),
    loadSellersSelection: () => dispatch(loadSellersSelection()),
    clearPOItems: () => dispatch(clearPOItems()),
    searchItem: (itemCode: string) => dispatch(searchItem(itemCode)),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT, UserRoleEnum.STAFF]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(POPage)

const CollapseWrapper = styled(Collapse)`
  .ant-collapse-header {
    font-size: 20px;
    font-weight: bold;
    color: #646464 !important;
    padding: 25px 16px !important;
  }
`
