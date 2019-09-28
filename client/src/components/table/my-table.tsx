import React from 'react'
import { Table as AntdTable } from 'antd'
import { TableProps } from 'antd/lib/table'
import styled from 'styled-components'

export const TableWrapper: React.SFC<TableProps<any>> = props => {
  return <Table {...props} />
}

const Table = styled(AntdTable)`
  .ant-table-body {
    overflow-x: auto;
    height: 100%;
  }

  &.ant-table-wrapper {
    overflow-y: auto;
  }

  .ant-table-tbody > tr {
    :hover {
      cursor: pointer;
    }
  }
`
