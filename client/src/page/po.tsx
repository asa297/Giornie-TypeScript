import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Field, FormikProps, withFormik } from 'formik'
import { Collapse } from 'antd'
import * as R from 'ramda'

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
import { clearPOItems, searchItem, changeQualtityItem } from '@app/store/modules/item/action'
import { getRootItemState, getItemErrorText, getPurchaseOrderItemList } from '@app/store/modules/item/selector'
import { PurchaseOrderFormListITem } from '@app/components/purchase-order/form-list-item'

class POPage extends React.Component<POPageProps & UserRoleProps & FormikProps<PurchaseOrderFormBody>> {
  state = {
    done: false,
    searching: false,
  }

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

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.searching && prevState.searching) {
      this.calculateForm()
    } else if (this.props.values.discount !== prevProps.values.discount) {
      this.calculateForm()
    } else if (this.props.values.credit !== prevProps.values.credit) {
      this.calculateForm()
    } else if (this.props.values.creditCharge !== prevProps.values.creditCharge) {
      this.calculateForm()
    } else if (this.props.values.receiveCash !== prevProps.values.receiveCash) {
      this.calculateForm()
    } else if (!R.equals(this.props.puchaseOrderItemList, prevProps.puchaseOrderItemList)) {
      this.calculateForm()
    }
  }

  calculateForm() {
    const subTotal = this.props.puchaseOrderItemList.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.qualtity * currentValue.item_price
    }, 0)
    const grandTotalDiscount = Number((subTotal * ((this.props.values.discount || 0) / 100)).toFixed(2))
    const grandTotalCreditCharge = Number(((this.props.values.credit || 0) * ((this.props.values.creditCharge || 0) / 100)).toFixed(2))
    const grandTotal = subTotal - Number(((grandTotalDiscount || 0) - (this.props.values.credit || 0)).toFixed(2))

    this.props.setFieldValue('subTotal', subTotal)
    this.props.setFieldValue('grandTotalDiscount', grandTotalDiscount)
    this.props.setFieldValue('grandTotalCredit', this.props.values.credit || 0)
    this.props.setFieldValue('grandTotalCreditCharge', grandTotalCreditCharge)
    this.props.setFieldValue('grandTotal', grandTotal)

    if (this.props.values.receiveCash) {
      const changeCash = Number((this.props.values.receiveCash - grandTotal).toFixed(2))
      this.props.setFieldValue('changeCash', changeCash)
    }
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
          <form onSubmit={this.props.handleSubmit}>
            <CollapseWrapper defaultActiveKey={['1']}>
              <Collapse.Panel header="ส่วนที่ 1 : รายละเอียดเบื้องต้น" key="1">
                <LabelField isRequired>กรุ๊ป</LabelField>
                <Field
                  name="group"
                  component={SelectInput}
                  options={this.props.groupOptions}
                  value={this.props.values.group ? this.props.values.group.label : ''}
                  onChange={id => this.props.setFieldValue('group', this.props.groupOptions.find(group => group.id === id))}
                />

                <LabelField isRequired>พนักงานขาย</LabelField>
                <Field
                  name="seller"
                  component={SelectInput}
                  options={this.props.sellerOptions}
                  value={this.props.values.seller ? this.props.values.seller.label : ''}
                  onChange={id => this.props.setFieldValue('seller', this.props.sellerOptions.find(seller => seller.id === id))}
                />
              </Collapse.Panel>
              <Collapse.Panel header="ส่วนที่ 2 : รายการสินค้า" key="2">
                <SearchInput
                  placeholder="ค้นหารายการสินค้า"
                  onSearch={itemCode => this.handleItemSearch(itemCode)}
                  disabled={this.state.searching}
                  searching={this.state.searching}
                  error={this.props.itemErrorText('searchItem')}
                />

                <PurchaseOrderFormListITem
                  itemList={this.props.puchaseOrderItemList}
                  onChangeQualtityItem={(itemId, qualtity) => this.props.changeQualtityItem(itemId, qualtity)}
                  error={this.props.itemErrorText('changeQualtityItem')}
                />
              </Collapse.Panel>
              <Collapse.Panel header="ส่วนที่ 3 : รายละเอียดการชำระเงิน" key="3">
                <LabelField>ส่วนลด</LabelField>
                <Field name="discount" type="number" component={TextInput} value={this.props.values.discount} onChange={this.props.handleChange} />
                <LabelField>ชำระเป็นเครดิต</LabelField>
                <Field name="credit" type="number" component={TextInput} value={this.props.values.credit} onChange={this.props.handleChange} />
                {this.props.values.credit && (
                  <React.Fragment>
                    <LabelField>ชาร์์จเครดิต</LabelField>
                    <Field
                      name="creditCharge"
                      type="number"
                      component={TextInput}
                      value={this.props.values.creditCharge}
                      onChange={this.props.handleChange}
                    />
                  </React.Fragment>
                )}
              </Collapse.Panel>
              <Collapse.Panel header="ส่วนที่ 4 : สรุปรายการขาย" key="4">
                <LabelField>ยอดรวม</LabelField>
                <Field
                  name="subTotal"
                  type="number"
                  component={TextInput}
                  value={this.props.values.subTotal}
                  onChange={this.props.handleChange}
                  disabled
                />
                <LabelField>ส่วนลด</LabelField>
                <Field
                  name="grandTotalDiscount"
                  type="number"
                  component={TextInput}
                  value={this.props.values.grandTotalDiscount}
                  onChange={this.props.handleChange}
                  disabled
                />
                {this.props.values.credit && (
                  <React.Fragment>
                    <LabelField>จำนวนชำระเครดิต</LabelField>
                    <Field
                      name="grandTotalCredit"
                      type="number"
                      component={TextInput}
                      value={this.props.values.grandTotalCredit}
                      onChange={this.props.handleChange}
                      disabled
                    />
                  </React.Fragment>
                )}
                {this.props.values.credit && (
                  <React.Fragment>
                    <LabelField>จำนวนชาร์จเครดิต</LabelField>
                    <Field
                      name="grandTotalCreditCharge"
                      type="number"
                      component={TextInput}
                      value={this.props.values.grandTotalCreditCharge}
                      onChange={this.props.handleChange}
                      disabled
                    />
                  </React.Fragment>
                )}
                <LabelField>ยอดที่ต้องชำระ</LabelField>
                <Field
                  name="grandTotal"
                  type="number"
                  component={TextInput}
                  value={this.props.values.grandTotal}
                  onChange={this.props.handleChange}
                  disabled
                />
                <LabelField isRequired>ยอดรับเงิน</LabelField>
                <Field
                  name="receiveCash"
                  type="number"
                  component={TextInput}
                  value={this.props.values.receiveCash}
                  onChange={this.props.handleChange}
                />
                <LabelField>ยอดเงินทอน</LabelField>
                <Field
                  name="changeCash"
                  type="number"
                  component={TextInput}
                  value={this.props.values.changeCash}
                  onChange={this.props.handleChange}
                  disabled
                />
              </Collapse.Panel>
            </CollapseWrapper>
          </form>
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
    puchaseOrderItemList: Object.values(getPurchaseOrderItemList(itemRootState)),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinSocket: () => dispatch(joinSocket()),
    loadGroupsSelection: () => dispatch(loadGroupsSelection()),
    loadSellersSelection: () => dispatch(loadSellersSelection()),
    clearPOItems: () => dispatch(clearPOItems()),
    searchItem: (itemCode: string) => dispatch(searchItem(itemCode)),
    changeQualtityItem: (itemId: string, qualtity: number) => dispatch(changeQualtityItem(itemId, qualtity)),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT, UserRoleEnum.STAFF]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFormik({
    mapPropsToValues: () => ({
      group: null,
      seller: null,
      subTotal: 0,
      grandTotalDiscount: 0,
      grandTotal: 0,
      receiveCash: 0,
      changeCash: 0,
    }),
    validate: PurchaseOrderSchema,
    handleSubmit: () => console.log('test'),
  }),
)(POPage)

const CollapseWrapper = styled(Collapse)`
  .ant-collapse-header {
    font-size: 20px;
    font-weight: bold;
    color: #646464 !important;
    padding: 25px 16px !important;
  }
`
