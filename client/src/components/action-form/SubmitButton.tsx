import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

interface SubmitActionFormIProps {
  loading: boolean
}

const SubmitActionForm: React.SFC<SubmitActionFormIProps> = props => {
  return (
    <SubmitButton icon={props.loading ? 'loading' : 'save'} disabled={props.loading}>
      {!props.loading ? 'Submit' : 'Submitting'}
    </SubmitButton>
  )
}

export { SubmitActionForm }

const SubmitButton = styled(Button)`
  width: 100%;
  height: 100%;
  background-color: #009688 !important;
  border-color: transparent !important;
  color: white !important;

  font-size: 20px;

  padding: 10px 10px;

  border-radius: 0px !important;
  opacity: ${props => (props.disabled ? 0.8 : 1)};
  .ant-btn[disabled] {
    border-color: transparent;
  }
`
