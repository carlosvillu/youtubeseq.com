import React from 'react'
import {Route, IndexRoute} from 'react-router'

import LayoutPage from './pages/LayoutPage'
import WatchPage from './pages/WatchPage'

export default (
  <Route>
    <Route path='/' component={LayoutPage}>
      <IndexRoute component={WatchPage} />
      <Route path='/watch' component={WatchPage} />
    </Route>
  </Route>
)

