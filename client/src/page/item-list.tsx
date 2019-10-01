import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import * as R from 'ramda'
import moment from 'moment'
import { ColumnProps } from 'antd/lib/table'
import { RouteComponentProps } from 'react-router-dom'

import { MainLayout } from '@app/components/layout/main-layout'
import { withValidateRole } from '@app/components/hoc/withValidateRole'
import { UserRoleEnum } from '@app/store/modules/auth/reducer'
import { WithLoading } from '@app/components/hoc/withLoading'
import { TableWrapper } from '@app/components/table/my-table'
import { SearchInput } from '@app/components/search-input/search.input'
import { ButtonNew } from '@app/components/button-new/button-new'
import { getRootSellerState, getSellerList } from '@app/store/modules/seller/selector'
import { loadSellers } from '@app/store/modules/seller/action'
import { getRootItemState, getItemList } from '@app/store/modules/item/selector'
import { loadItems } from '@app/store/modules/item/action'

const columns: ColumnProps<any>[] = [
  {
    title: 'ชื่อพนักงานขาย',
    dataIndex: 'seller_name',
    width: '20%',
    render: text => {
      return <div>{text}</div>
    },
  },
  {
    title: 'รหัสพนักงานขาย',
    dataIndex: 'seller_code',
    align: 'center',
    width: '20%',
  },
  {
    title: 'ค่านํ้าพนักงานขาย (%)',
    dataIndex: 'seller_com',
    align: 'right',
    width: 200,
    render: text => {
      return <span>{text}%</span>
    },
  },
  {
    title: 'หมายเหตุ',
    dataIndex: 'seller_remark',
    align: 'center',
    width: '20%',
  },
  {
    title: 'วันที่แก้ไขล่าสุด',
    dataIndex: 'last_modify_date',
    align: 'center',
    width: '25%',
    render: text => {
      return <div>{moment(text).format('DD/MM/YYYY HH:MM:SS')}</div>
    },
  },
]

class ItemListPage extends React.Component<ItemListPageProps & RouteComponentProps> {
  state = {
    done: false,
    keyword: '',
  }

  async componentDidMount() {
    await this.props.loadItems()
    this.setState({ done: true })
  }

  render() {
    return (
      <MainLayout pageName="รายการสินค้า">
        <WithLoading isLoading={!this.state.done}>
          <SearchInput placeholder="ค้นหารายการสินค้า" onChange={e => this.setState({ keyword: e.target.value })} />
          <TableWrapper
            rowKey="_id"
            columns={columns}
            dataSource={this.props.data(this.state.keyword)}
            pagination={false}
            bordered
            onRow={(record, index) => {
              return {
                onClick: () => this.props.history.push(`/item/form/${record._id}`),
              }
            }}
          />
          <ButtonNew onClick={() => this.props.history.push('/item/form')} />
        </WithLoading>
      </MainLayout>
    )
  }
}

type ItemListPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const itemRootState = getRootItemState(state)
  const itemList = getItemList(itemRootState)

  const data = key =>
    R.compose(
      R.filter((v: any) => v.seller_name.includes(key) || v.seller_code.includes(key)),
      v => R.values(v),
    )(itemList)

  return {
    data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadItems: () => dispatch(loadItems()),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ItemListPage)
