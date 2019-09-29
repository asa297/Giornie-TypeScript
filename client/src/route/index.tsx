import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '@app/page/home'
import LoginPage from '@app/page/login'
import OrgFormPage from '@app/page/org-form'
import OrgListPage from '@app/page/org-list'
import GroupFormPage from '@app/page/group-form'
import GroupListPage from '@app/page/group-list'

const Routing: React.SFC<any> = () => {
  return (
    <Switch>
      <Route exact path="/group/form/:id" component={GroupFormPage} />
      <Route exact path="/group/form" component={GroupFormPage} />
      <Route exact path="/group" component={GroupListPage} />

      <Route exact path="/org/form/:id" component={OrgFormPage} />
      <Route exact path="/org/form" component={OrgFormPage} />
      <Route exact path="/org" component={OrgListPage} />

      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  )
}

export { Routing }
