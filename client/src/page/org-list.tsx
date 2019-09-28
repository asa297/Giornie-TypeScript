import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Table } from 'react-virtualized'

import { MainLayout } from '@app/components/layout/main-layout'
import { withValidateRole } from '@app/components/hoc/withValidateRole'
import { UserRoleEnum } from '@app/store/modules/auth/reducer'
import { loadOrganizations } from '@app/store/modules/organization/action'
import { getRootOrganizationState, getOrganizationList } from '@app/store/modules/organization/selector'
import { WithLoading } from '@app/components/hoc/withLoading'

class OrgListPage extends React.Component<OrgListPageProps> {
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
          {/* <Table
                ref="Table"
                disableHeader={disableHeader}
                headerClassName={styles.headerColumn}
                headerHeight={headerHeight}
                height={height}
                noRowsRenderer={this._noRowsRenderer}
                overscanRowCount={overscanRowCount}
                rowClassName={this._rowClassName}
                rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                rowGetter={rowGetter}
                rowCount={rowCount}
                scrollToIndex={scrollToIndex}
                sort={this._sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                width={width}>
                {!hideIndexRow && (
                  <Column
                    label="Index"
                    cellDataGetter={({rowData}) => rowData.index}
                    dataKey="index"
                    disableSort={!this._isSortEnabled()}
                    width={60}
                  />
                )}
                <Column
                  dataKey="name"
                  disableSort={!this._isSortEnabled()}
                  headerRenderer={this._headerRenderer}
                  width={90}
                />
                <Column
                  width={210}
                  disableSort
                  label="The description label is really long so that it will be truncated"
                  dataKey="random"
                  className={styles.exampleColumn}
                  cellRenderer={({cellData}) => cellData}
                  flexGrow={1}
                />
              </Table> */}
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
