import React from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'

interface withLoadingIProps {
  isLoading?: boolean
}

export const WithLoading: React.SFC<withLoadingIProps> = props => {
  if (props.isLoading)
    return (
      <Root>
        <Icon type="loading" style={{ fontSize: '70px' }}></Icon>
      </Root>
    )
  return <React.Fragment>{props.children}</React.Fragment>
}

const Root = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`
