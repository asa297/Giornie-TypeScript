import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import * as R from 'ramda'
import moment from 'moment'
import { ColumnProps } from 'antd/lib/table'
import { RouteComponentProps } from 'react-router-dom'
import { Avatar } from 'antd'

import { MainLayout } from '@app/components/layout/main-layout'
import { withValidateRole, UserRoleProps } from '@app/components/hoc/withValidateRole'
import { UserRoleEnum } from '@app/store/modules/auth/reducer'
import { WithLoading } from '@app/components/hoc/withLoading'
import { TableWrapper } from '@app/components/table/my-table'
import { SearchInput } from '@app/components/search-input/search.input'
import { ButtonNew } from '@app/components/button-new/button-new'
import { loadGroups } from '@app/store/modules/group/action'
import { getRootGroupState, getGroupList } from '@app/store/modules/group/selector'
import RussiaIcon from '@app/assets/icons/russia.png'
import ChinaIcon from '@app/assets/icons/china.png'

const columns: ColumnProps<any>[] = [
  {
    title: '',
    dataIndex: 'org.type_id',
    render: text => {
      return <Avatar src={text === 1 ? RussiaIcon : text === 2 ? ChinaIcon : null} />
    },
  },
  {
    title: 'ชื่อบริษัท',
    dataIndex: 'org.name',
    width: '20%',
    render: (text, record) => {
      return (
        <span>
          {record.org.name} ({record.org.code})
        </span>
      )
    },
  },
  {
    title: 'รหัสกรุ๊ป',
    dataIndex: 'group_code',
    align: 'center',
    width: '20%',
  },
  {
    title: 'สติกเกอร์กรุ๊ป',
    dataIndex: 'group_sticker_number',
    align: 'center',
  },
  {
    title: 'ชื่อไกด์',
    dataIndex: 'guide_name',
    align: 'center',
  },
  {
    title: 'หมายเหตุ',
    dataIndex: 'group_remark',
    width: '20%',
    align: 'center',
  },
  {
    title: 'วันที่แก้ไขล่าสุด',
    dataIndex: 'last_modify_date',
    align: 'center',
    width: '20%',
    render: text => {
      return <div>{moment(text).format('DD/MM/YYYY HH:MM:SS')}</div>
    },
  },
]

class GroupListPage extends React.Component<GroupListPageProps & RouteComponentProps & UserRoleProps> {
  state = {
    done: false,
    keyword: '',
  }

  async componentDidMount() {
    await this.props.loadGroups()
    this.setState({ done: true })
  }

  render() {
    return (
      <MainLayout pageName="รายการกรุ๊ป">
        <WithLoading isLoading={!this.state.done}>
          <SearchInput placeholder="ค้นหารายการกรุ๊ป" onChange={e => this.setState({ keyword: e.target.value })} />
          <TableWrapper
            rowKey="_id"
            columns={columns}
            dataSource={this.props.data(this.state.keyword)}
            pagination={false}
            bordered
            onRow={(record, index) => {
              return {
                onClick: () => this.props.history.push(`/group/form/${record._id}`),
              }
            }}
          />
          <ButtonNew onClick={() => this.props.history.push('/group/form')} />
        </WithLoading>
      </MainLayout>
    )
  }
}

type GroupListPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const groupRootState = getRootGroupState(state)
  const groupList = getGroupList(groupRootState)

  const data = key =>
    R.compose(
      R.filter((v: any) => v.group_code.includes(key) || v.guide_name.includes(key) || v.org.name.includes(key) || v.org.code.includes(key)),
      v => R.values(v),
    )(groupList)

  return {
    data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadGroups: () => dispatch(loadGroups()),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(GroupListPage)
