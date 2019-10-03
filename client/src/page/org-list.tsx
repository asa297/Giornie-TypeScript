import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import * as R from 'ramda'
import moment from 'moment'
import { ColumnProps } from 'antd/lib/table'
import { RouteComponentProps } from 'react-router-dom'

import { MainLayout } from '@app/components/layout/main-layout'
import { withValidateRole, UserRoleProps } from '@app/components/hoc/withValidateRole'
import { UserRoleEnum } from '@app/store/modules/auth/reducer'
import { loadOrganizations } from '@app/store/modules/organization/action'
import { getRootOrganizationState, getOrganizationList } from '@app/store/modules/organization/selector'
import { WithLoading } from '@app/components/hoc/withLoading'
import { TableWrapper } from '@app/components/table/my-table'
import { SearchInput } from '@app/components/search-input/search.input'
import { ButtonNew } from '@app/components/button-new/button-new'

const columns: ColumnProps<any>[] = [
  {
    title: 'ชื่อบริษัท',
    dataIndex: 'org_name',
    width: '20%',
    render: text => {
      return <div>{text}</div>
    },
  },
  {
    title: 'รหัสบริษัท',
    dataIndex: 'org_code',
    align: 'center',
    width: '20%',
  },
  {
    title: 'คอมมิชชั่นสินค้า A (%)',
    dataIndex: 'org_com_A',
    align: 'right',
    width: 200,
    render: text => {
      return <span>{text}%</span>
    },
  },
  {
    title: 'คอมมิชชั่นสินค้า B (%)',
    dataIndex: 'org_com_B',
    align: 'right',
    width: 200,
    render: text => {
      return <span>{text}%</span>
    },
  },
  {
    title: 'วันที่แก้ไขล่าสุด',
    dataIndex: 'last_modify_date',
    align: 'center',
    width: '30%',
    render: text => {
      return <div>{moment(text).format('DD/MM/YYYY HH:MM:SS')}</div>
    },
  },
]

class OrgListPage extends React.Component<OrgListPageProps & RouteComponentProps & UserRoleProps> {
  state = {
    done: false,
    keyword: '',
  }

  async componentDidMount() {
    await this.props.loadOrganizations()
    this.setState({ done: true })
  }

  render() {
    return (
      <MainLayout pageName="รายการบริษัท">
        <WithLoading isLoading={!this.state.done}>
          <SearchInput placeholder="ค้นหารายการบริษัท" onChange={e => this.setState({ keyword: e.target.value })} />
          <TableWrapper
            rowKey="_id"
            columns={columns}
            dataSource={this.props.data(this.state.keyword)}
            pagination={false}
            bordered
            onRow={(record, index) => {
              return {
                onClick: () => this.props.history.push(`/org/form/${record._id}`),
              }
            }}
          />
          <ButtonNew onClick={() => this.props.history.push('/org/form')} />
        </WithLoading>
      </MainLayout>
    )
  }
}

type OrgListPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const organizationRootState = getRootOrganizationState(state)
  const organizationList = getOrganizationList(organizationRootState)

  const data = key =>
    R.compose(
      R.filter((v: any) => v.org_name.includes(key) || v.org_code.includes(key)),
      v => R.values(v),
    )(organizationList)

  return {
    data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrganizations: () => dispatch(loadOrganizations()),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OrgListPage)
