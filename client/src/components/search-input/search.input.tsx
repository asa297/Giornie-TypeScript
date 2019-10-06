import React from 'react'
import { Input as AntdInput, Icon } from 'antd'
import styled from 'styled-components'
import { InputProps } from 'antd/lib/input'
import { SearchProps } from 'antd/lib/input/Search'

const Search = AntdInput.Search

interface SearchInputIProps {
  searching?: boolean
  errorText?: string
}

export const SearchInput: React.SFC<InputProps & SearchProps & SearchInputIProps> = props => {
  return (
    <React.Fragment>
      <Input {...props} />
      {props.searching && <Icon type="loading" style={{ fontSize: '20px' }} />}
      {props.errorText && <ErrorText>{props.errorText}</ErrorText>}
    </React.Fragment>
  )
}

const Input = styled(Search)`
  > input {
    font-size: 20px;
    background-color: #f7f7f7;
    padding: 35px 20px;
  }

  i > * {
    font-size: 20px;
  }
`

const ErrorText = styled.div`
  color: red;
  font-size: 20px;
`
