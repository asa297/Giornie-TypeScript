import React from 'react'
import styled from 'styled-components'

interface LabelFieldIProps {
  isRequired?: boolean
}

const LabelField: React.SFC<LabelFieldIProps> = props => {
  return (
    <React.Fragment>
      <LabelText>{props.children}</LabelText>
      <LabelRequired isRequired={props.isRequired}>*</LabelRequired>
    </React.Fragment>
  )
}

export { LabelField }

const LabelText = styled.label`
  font-size: 20px;
  color: #646464;
`

const LabelRequired = styled.label<{ isRequired: boolean }>`
  visibility: ${p => (p.isRequired ? 'visible' : 'hidden')};
  font-size: 20px;
  color: red;
`
