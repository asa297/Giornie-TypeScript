import React from 'react'
import { useState } from 'react'
import { push } from 'react-router-redux'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, Icon, Drawer, Menu } from 'antd'
import styled from 'styled-components'
import * as R from 'ramda'

import MenuImage from '@app/assets/icons/menu.png'
import { logout } from '@app/store/modules/auth/action'
import { getUserInfo, getRootAuthState } from '@app/store/modules/auth/selector'

import { reportMenu, mainMenu } from './menuContent'

interface HeaderPlatformIProps {
  pageName?: string
}

const SubMenu = Menu.SubMenu

const MenuItem: any = ({ name, type, ...rest }) => {
  return (
    <MenuItemWrapper {...rest}>
      {type && <DrawerMenuIcon type={type} />}
      <span> {name}</span>
    </MenuItemWrapper>
  )
}

const HeaderPlatform: React.SFC<HeaderPlatformIProps> = props => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(
    R.compose(
      getUserInfo,
      getRootAuthState,
    ),
  )

  const titleDrawer = `Hi, ${user ? user.name : 'Guest'}`

  return (
    <div>
      <HeaderContainer>
        <MainContainer>
          <MenuContainer onClick={() => setVisible(true)}>
            <MenuIcon src={MenuImage} />
          </MenuContainer>

          <LabelPage>{props.pageName ? props.pageName : ''}</LabelPage>
        </MainContainer>

        <UserNameContainer>
          <Tooltip placement="leftTop" title={user ? user.email : ''}>
            <UserNameLabel>{user ? user.email : ''}</UserNameLabel>
          </Tooltip>
        </UserNameContainer>
      </HeaderContainer>
      <DrawerWrapper
        visible={visible}
        onClose={() => setVisible(!visible)}
        closable={false}
        placement={'left'}
        title={titleDrawer}
      >
        <MenuWrapper
          mode="inline"
          onClick={page => {
            setVisible(false)

            if (page.key === '/logout') dispatch(logout())
            else dispatch(push(page.key))
          }}
        >
          <MenuItem name="Home" key="/" type="home" />

          {user && mainMenu.map(menu => <MenuItem name={menu.name} key={menu.path} type={menu.type} />)}
          {user && (
            <SubMenu
              key="sub1"
              title={
                <span>
                  <DrawerMenuIcon type="pie-chart" />
                  <span>Report</span>
                </span>
              }
            >
              {reportMenu.map(menu => (
                <MenuItem name={menu.name} key={menu.path} />
              ))}
            </SubMenu>
          )}

          {!user ? <MenuItem name="Login" key="/login" type="lock" /> : <MenuItem name="Logout" key="/logout" type="unlock" />}
        </MenuWrapper>
      </DrawerWrapper>
    </div>
  )
}

export { HeaderPlatform }

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  @media (min-width: 600px) {
    height: 64px;
  }
  height: 56px;
  background-color: #001529;
  color: rgba(255, 255, 255, 0.65);

  display: flex;
  align-items: center;
  z-index: 10;
`
const MenuContainer = styled.div`
  width: 50px;
  height: 100%;
  padding: 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 10px;

  cursor: pointer;
`

const MenuIcon = styled.img`
  width: 100%;
  cursor: pointer;
`

const MainContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
`

const UserNameContainer = styled.div`
  width: 10%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 600px) {
    display: none;
  }
  padding-right: 20px;
`

const UserNameLabel = styled.label`
  font-size: 14px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const LabelPage = styled.label`
  font-size: 20px;
  font-weight: 100;
`

const DrawerWrapper = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px;
  }

  z-index: 20;
`

const MenuWrapper = styled(Menu)`
  width: 100%;
`

const MenuItemWrapper = styled(Menu.Item)`
  display: flex;
  align-items: center;
`

const DrawerMenuIcon = styled(Icon)`
  font-size: 20px !important;
`
