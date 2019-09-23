import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '@app/page/home'
import LoginPage from '@app/page/login'

const Routing: React.SFC<any> = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  )
}

export { Routing }
