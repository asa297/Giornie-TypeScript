import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import numeral from 'numeral'

import { IPurchaseOrderItem } from '@app/store/modules/item/reducer'

interface PurchaseOrderFormListITemIProps {
  itemList: Array<IPurchaseOrderItem>
  onChangeQualtityItem: (itemId: string, qualtity: number) => void
  error?: any
}

export const PurchaseOrderFormListITem: React.SFC<PurchaseOrderFormListITemIProps> = props => {
  return (
    <React.Fragment>
      <ColumnContainer>
        <ActionColumnStyle />
        <ItemColumnStyle header>สินค้า</ItemColumnStyle>
        <UnitPriceColumnStyle header>ราคาต่อหน่วย</UnitPriceColumnStyle>
        <QtyColumnStyle header>จำนวน</QtyColumnStyle>
        <TotalColumnStyle header>ยอดรวม</TotalColumnStyle>
      </ColumnContainer>

      <div>
        {props.itemList.map(item => {
          return (
            <ListCard key={item._id}>
              <ActionDataContainer>
                <IconContainer>
                  <ButtonWrapper type="primary" icon="plus" color="green" onClick={() => props.onChangeQualtityItem(item._id, item.qualtity + 1)} />
                </IconContainer>
                <IconContainer>
                  <ButtonWrapper type="primary" icon="minus" color="red" onClick={() => props.onChangeQualtityItem(item._id, item.qualtity - 1)} />
                </IconContainer>
              </ActionDataContainer>
              <ItemColumnStyle>
                {item.item_code} ({item.item_name})
              </ItemColumnStyle>
              <UnitPriceColumnStyle>{numeral(item.item_price).format('0,0.00')}</UnitPriceColumnStyle>
              <QtyColumnStyle>{item.qualtity}</QtyColumnStyle>

              <TotalColumnStyle>{numeral(item.item_price * item.qualtity).format('0,0.00')}</TotalColumnStyle>
            </ListCard>
          )
        })}

        {props.error && <ErrorText>{props.error}</ErrorText>}
      </div>
    </React.Fragment>
  )
}

const ColumnContainer = styled.div`
  display: flex;
  font-size: 20px;
  padding: 10px 0;
`

const ListCard = styled.div`
  background: rgba(220, 250, 250, 0.65);
  font-size: 20px;
  display: flex;
  border-bottom: 1px solid #dcdcdc;
  align-items: center;
  padding: 10px 0;
`

const ActionColumnStyle = styled.div`
  @media (max-width: ${p => p.theme.breakpoints.xs.max}) {
    width: 25%;
  }
  @media (min-width: ${p => p.theme.breakpoints.lg.min}) {
    width: 5%;
  }
  width: 10%;
  padding: 0 5px;
`

const ActionDataContainer = styled(ActionColumnStyle)`
  display: flex;
`

const ItemColumnStyle = styled.div<{ header?: boolean }>`
  @media (max-width: ${p => p.theme.breakpoints.xs.max}) {
    width: 30%;
  }

  width: 50%;

  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.header && 'font-weight : bold;'}
`

const UnitPriceColumnStyle = styled.div<{ header?: boolean }>`
  @media (max-width: ${p => p.theme.breakpoints.xs.max}) {
    width: 15%;
  }

  width: 10%;

  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.header && 'font-weight : bold;'}
`

const QtyColumnStyle = styled.div<{ header?: boolean }>`
  @media (max-width: ${p => p.theme.breakpoints.xs.max}) {
    width: 20%;
  }

  width: 15%;

  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.header && 'font-weight : bold;'}
`

const TotalColumnStyle = styled.div<{ header?: boolean }>`
  @media (max-width: ${p => p.theme.breakpoints.xs.max}) {
    width: 15%;
  }
  width: 10%;

  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.header && 'font-weight : bold;'}
`

const IconContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ButtonWrapper = styled(Button)`
  background-color: ${props => props.color};
  border: none;

  :hover,
  :focus,
  :active {
    background-color: ${props => props.color};
    border: none;
  }
`

const ErrorText = styled.div`
  color: red;
  font-size: 20px;
`
