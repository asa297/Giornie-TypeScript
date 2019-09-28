import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

const TextInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  ...rest
}) => {
  const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0
  return (
    <React.Fragment>
      <InputWrapper {...field} {...rest} error={error} />
      <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
    </React.Fragment>
  )
}

export { TextInput }

const InputWrapper = styled(Input)<{ error: boolean }>`
  &.ant-input {
    width: 100%;

    border: ${props => (props.error ? '1px solid red' : '1px solid #d9d9d9')};
    font-size: 20px;
    background-color: #f7f7f7;
    padding: 35px 20px;
  }
`

const ErrorText = styled.div`
  color: red;
  font-size: 20px;
`
