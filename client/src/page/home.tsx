import React from 'react'
import { Button } from 'antd'

import { MainLayout } from '@app/components/layout/main-layout'

class HomePage extends React.Component<any> {
  render() {
    return (
      <MainLayout>
        <Button type="primary">test</Button>
      </MainLayout>
    )
  }
}

export default HomePage
