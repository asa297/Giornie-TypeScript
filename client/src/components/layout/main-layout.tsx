import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'

import { HeaderPlatform } from '@app/components/header/index'

interface LayoutIProps {
  pageName?: string
}

export const MainLayout: React.SFC<LayoutIProps> = props => {
  return (
    <React.Fragment>
      <Container>
        <HeaderPlatform pageName={props.pageName} />
        <Root>{props.children}</Root>
      </Container>
    </React.Fragment>
  )
}

const Container = styled(Layout)`
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: #f2f2f2;
`

const Root = styled(Layout)`
  width: 100%;

  margin: auto;
  max-width: 1440px;

  height: calc(100vh - 60px);
`
