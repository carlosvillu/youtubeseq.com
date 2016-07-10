import React from 'react'
import {Route, IndexRoute} from 'react-router'

// import LayoutPage from './pages/LayoutPage'
// import WatchPage from './pages/WatchPage'

const loadLayoutPage =
  (location, callback) =>
    // callback(null, LayoutPage)
    require.ensure([], (require) => callback(null, require('./pages/LayoutPage.js').default), 'LayoutPage')

const loadWatchPage =
  (location, callback) =>
    // callback(null, WatchPage)
    require.ensure([], (require) => callback(null, require('./pages/WatchPage.js').default), 'WatchPage')

export default (
  <Route>
    <Route path='/' getComponent={loadLayoutPage}>
      <IndexRoute getComponent={loadWatchPage} />
      <Route path='/watch' getComponent={loadWatchPage} />
    </Route>
  </Route>
)
