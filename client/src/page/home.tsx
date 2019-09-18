import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { login } from '@app/store/modules/auth/action'

class HomePage extends React.Component<HomePageProps> {
  render() {
    const { loginFunction } = this.props
    console.log(this.props)
    return (
      <div>
        test
        <button onClick={() => loginFunction('makejack4@gmail.com', '026936804')}>login</button>
      </div>
    )
  }
}

type HomePageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  return {
    au: 5,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginFunction: (email, password) => dispatch(login(email, password)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage)
