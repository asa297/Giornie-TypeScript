import React from 'react'
import styled from 'styled-components'
import { Button, Popconfirm } from 'antd'

interface DeleteActionFormIProps {
  title: string
  loading: boolean
  onConfirm: () => void
}

const DeleteActionForm: React.SFC<DeleteActionFormIProps> = props => {
  return (
    <Popconfirm title={props.title} onConfirm={props.onConfirm}>
      <DeleteButton icon="delete" loading={props.loading}>
        Delete
      </DeleteButton>
    </Popconfirm>
  )
}

export { DeleteActionForm }

const DeleteButton = styled(Button)`
  width: 100%;
  height: 100%;
  background-color: red !important;
  border-color: transparent !important;
  color: white !important;

  font-size: 20px;

  padding: 10px 10px;

  border-radius: 0px !important;
`
