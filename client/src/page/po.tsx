import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'

import { UserRoleEnum } from '@app/store/modules/auth/reducer'
import { withValidateRole } from '@app/components/hoc/withValidateRole'
import { joinSocket } from '@app/store/modules/purchase-order/action'
import { getRootPurchaseOrderState, getSocketSession } from '@app/store/modules/purchase-order/selector'
import { loadGroupsSelection } from '@app/store/modules/group/action'
import { loadSellersSelection } from '@app/store/modules/seller/action'

class POPage extends React.Component<POPageProps> {
  form: Formik<{}>

  async componentDidMount() {
    await this.props.joinSocket()
    await this.props.loadGroupsSelection()
    await this.props.loadSellersSelection()

    this.props.socketSession.emit('joinroom')
    this.props.socketSession.emit('openpo')
  }

  componentWillUnmount() {
    this.props.socketSession.disconnect()
  }

  render() {
    return (
      <div>
        PO<Link to="/">test</Link>
      </div>
    )
  }
}

type POPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const purchaseOrderRootState = getRootPurchaseOrderState(state)
  return {
    socketSession: getSocketSession(purchaseOrderRootState),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinSocket: () => dispatch(joinSocket()),
    loadGroupsSelection: () => dispatch(loadGroupsSelection()),
    loadSellersSelection: () => dispatch(loadSellersSelection()),
  }
}

export default compose(
  withValidateRole([UserRoleEnum.ADMIN, UserRoleEnum.ACCOUNT, UserRoleEnum.STAFF]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(POPage)
