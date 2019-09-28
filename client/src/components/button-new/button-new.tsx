import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

interface ButtonNewIProps {
  hide?: boolean
  onClick: () => void
}

export const ButtonNew: React.SFC<ButtonNewIProps> = props => {
  return (
    <Root hide={props.hide}>
      <ButtonWrapper icon="plus" onClick={props.onClick} />
    </Root>
  )
}

const Root = styled.div<{ hide?: boolean }>`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: ${props => (props.hide ? 'none' : 'block')};
`

const ButtonWrapper = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  color: white;
  font-size: 26px;
  background-color: #004e32;
  border-color: white;

  :hover,
  :active,
  :focus {
    color: white;
    background-color: #004e32;
    border-color: white;

    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  }
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);

  border: 0;
`
