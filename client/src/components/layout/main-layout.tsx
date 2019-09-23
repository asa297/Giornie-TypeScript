import React from 'react'
import styled from 'styled-components'

import { HeaderPlatform } from '@app/components/header/index'

interface LayoutIProps {
  pageName?: string
}

export const MainLayout: React.SFC<LayoutIProps> = props => {
  return (
    <React.Fragment>
      <Container>
        <HeaderPlatform pageName={props.pageName} />
        {props.children}
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: #f2f2f2;

  width: 100%;
  min-height: calc(100vh - 240px - 50px);
`
