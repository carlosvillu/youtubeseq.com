import React from 'react'
import {Route, IndexRoute} from 'react-router'

import LayoutPage from './pages/LayoutPage'
import HomePage from './pages/HomePage'
import WatchPage from './pages/WatchPage'

export default (
  <Route>
    <Route path='/' component={LayoutPage}>
      <IndexRoute component={HomePage} />
      <Route path='watch' component={WatchPage} />
    </Route>
  </Route>
)

