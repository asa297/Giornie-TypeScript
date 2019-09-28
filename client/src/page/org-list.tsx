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
import { loadOrganizations } from '@app/store/modules/organization/action'
import { getRootOrganizationState, getOrganizationList } from '@app/store/modules/organization/selector'
import { WithLoading } from '@app/components/hoc/withLoading'
import { TableWrapper } from '@app/components/table/my-table'

const columns: ColumnProps<any>[] = [
  {
    title: 'ชื่อบริษัท',
    dataIndex: 'org_name',
    render: text => {
      return <div>{text}</div>
    },
  },
  {
    title: 'รหัสบริษัท',
    dataIndex: 'org_code',
    align: 'center',
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
    render: text => {
      return <div>{moment(text).format('DD/MM/YYYY HH:MM:SS')}</div>
    },
  },
]

class OrgListPage extends React.Component<OrgListPageProps & RouteComponentProps> {
  state = {
    done: false,
  }

  async componentDidMount() {
    await this.props.getOrgsFunction()
    this.setState({ done: true })
  }

  render() {
    return (
      <MainLayout pageName="รายการบริษัท">
        <WithLoading isLoading={!this.state.done}>
          <TableWrapper
            rowKey="_id"
            columns={columns}
            dataSource={this.props.organizationList}
            pagination={false}
            bordered
            onRow={(record, index) => {
              return {
                onClick: () => this.props.history.push(`/org/form/${record._id}`),
              }
            }}
          />
        </WithLoading>
      </MainLayout>
    )
  }
}

type OrgListPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const organizationRootState = getRootOrganizationState(state)
  const organizationList = getOrganizationList(organizationRootState)
  return {
    organizationList: R.values(organizationList),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrgsFunction: () => dispatch(loadOrganizations()),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OrgListPage)
