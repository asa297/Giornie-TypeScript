import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '@app/page/home'
import LoginPage from '@app/page/login'
import OrgFormPage from '@app/page/org-form'

const Routing: React.SFC<any> = () => {
  return (
    <Switch>
      <Route exact path="/form/org" component={OrgFormPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  )
}

export { Routing }
