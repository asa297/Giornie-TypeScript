import React from 'react'
import { connect } from 'react-redux'

import { Routing } from '@app/route/index'
import { initialAuth } from '@app/store/modules/auth/action'
import { getAuthIsAuthenticated, getRootAuthState, getAuthIsInitializing } from '@app/store/modules/auth/selector'

class App extends React.PureComponent<AppProps> {
  componentDidMount() {
    const { initAuthFunction } = this.props
    initAuthFunction()
  }

  render() {
    const { isAuthenticated, isInitializing } = this.props

    if (isAuthenticated && !isInitializing) {
      return <Routing />
    } else {
      return <div>Loading</div>
    }
  }
}

type AppProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const authRootState = getRootAuthState(state)
  const isAuthenticated = getAuthIsAuthenticated(authRootState)
  const isInitializing = getAuthIsInitializing(authRootState)

  return {
    isAuthenticated,
    isInitializing,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    initAuthFunction: () => dispatch(initialAuth()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
