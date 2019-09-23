import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { login } from '@app/store/modules/auth/action'
import { MainLayout } from '@app/components/layout/main-layout'

class HomePage extends React.Component<HomePageProps> {
  render() {
    const { loginFunction } = this.props
    return (
      <MainLayout>
        <Button type="primary">test</Button>
        <button onClick={() => loginFunction('makejack4@gmail.com', '026936804')}>login</button>
      </MainLayout>
    )
  }
}

type HomePageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  return {}
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
