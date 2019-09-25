import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { MainLayout } from '@app/components/layout/main-layout'
import { withValidateRole } from '@app/components/hoc/withValidateRole'
import { UserRoleEnum } from '@app/store/modules/auth/reducer'
import { getOrganations } from '@app/store/modules/organization/action'
import { getRootOrganizationState, getOrganizationList } from '@app/store/modules/organization/selector'

class OrgListPage extends React.Component<OrgListPageProps> {
  state = {
    done: false,
  }

  async componentDidMount() {
    try {
      await this.props.getOrgsFunction()
      this.setState({ done: true })
    } catch (error) {}
  }

  render() {
    return <MainLayout pageName="รายการบริษัท">{this.state.done && JSON.stringify(this.props.organizationList)}</MainLayout>
  }
}

type OrgListPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const organizationRootState = getRootOrganizationState(state)
  const organizationList = getOrganizationList(organizationRootState)
  return {
    organizationList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrgsFunction: () => dispatch(getOrganations()),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OrgListPage)
