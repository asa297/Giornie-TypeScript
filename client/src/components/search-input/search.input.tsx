import React from 'react'
import { Input as AntdInput } from 'antd'
import styled from 'styled-components'
import { InputProps } from 'antd/lib/input'

const Search = AntdInput.Search

export const SearchInput: React.SFC<InputProps> = props => {
  return <Input {...props} />
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
