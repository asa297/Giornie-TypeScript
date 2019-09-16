import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '@app/page/home'

const Routing: React.SFC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  )
}

export { Routing }
