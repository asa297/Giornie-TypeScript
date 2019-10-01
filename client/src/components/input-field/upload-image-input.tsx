import React from 'react'
import { Upload, Icon } from 'antd'
import styled from 'styled-components'

const UploadImageInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  value,
  ...rest
}) => {
  const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0

  return (
    <React.Fragment>
      <UploadWrapper
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={(option: any) => {
          option.onSuccess('OK')
        }}
        // onChange={beforeUpload}
        {...rest}
      >
        {field.value ? (
          <ImageWrapper image={field.value} />
        ) : (
          <div>
            <Icon type={'plus'} />
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </UploadWrapper>
      <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
    </React.Fragment>
  )
}

export { UploadImageInput }

const UploadWrapper = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 100%;
  }

  &.ant-upload-picture-card-wrapper {
    height: 100%;
  }
`

const ImageWrapper = styled.img<{ image: string }>`
  width: 100%;
  height: 100%;
  background: url(${props => props.image}) no-repeat center;
  background-size: contain;
`

const ErrorText = styled.div`
  color: red;
  font-size: 20px;
`
