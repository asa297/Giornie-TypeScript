import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'

const Option = Select.Option

const SelectInput: React.SFC<any> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  options,
  ...rest
}) => {
  const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0
  return (
    <React.Fragment>
      <SelectWrapper
        {...field}
        {...rest}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          options
            .find(item => item.id === option.props.value)
            .label.toString()
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        }
        isError={error}
      >
        {options.map(option => (
          <Option key={option.id} value={option.id} className="select-option-custom">
            <span>{option.label}</span>
          </Option>
        ))}
      </SelectWrapper>
      <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
    </React.Fragment>
  )
}

export { SelectInput }

const SelectWrapper = styled(Select)<{ isError: boolean }>`
  width: 100%;

  .ant-select-selection__rendered {
    margin: 0px;
    padding: 0px 20px;
    height: 70px;

    display: flex;
    align-items: center;
  }
  .ant-select-selection--single {
    height: 70px;
  }

  .ant-select-selection {
    border-color: ${props => (props.isError ? 'red' : '#d9d9d9')};
  }

  .ant-select-selection-selected-value {
    font-size: 20px;
  }

  .ant-select-search__field {
    font-size: 20px;
  }
`

const ErrorText = styled.div`
  color: red;
  font-size: 20px;
`
