import React from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'antd'
import styled from 'styled-components'

interface withLoadingIProps {
  isError?: boolean
}

export const WithError: React.SFC<withLoadingIProps> = props => {
  if (props.isError)
    return (
      <Root>
        <Alert message="ข้อผิดพลาด" description="พบข้อผิดพลาดจากระบบ โปรดติดต่อผู้ดุแล" type="error" showIcon />
        <Link to="/">กลับสู่หน้าหลัก</Link>
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
  flex-direction: column;

  > a {
    margin-top: 20px;
  }
`
