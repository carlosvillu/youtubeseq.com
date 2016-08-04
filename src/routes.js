import React from 'react'
import {Route, IndexRoute} from 'react-router'

const loadLayoutPage =
  (location, callback) =>
    require.ensure([], (require) => callback(null, require('./pages/LayoutPage.js').default), 'LayoutPage')

const loadHomePage =
  (location, callback) =>
    require.ensure([], (require) => callback(null, require('./pages/HomePage.js').default), 'HomePage')

const loadWatchPage =
  (location, callback) =>
    require.ensure([], (require) => callback(null, require('./pages/WatchPage.js').default), 'WatchPage')

export default (
  <Route>
    <Route path='/' getComponent={loadLayoutPage}>
      <IndexRoute getComponent={loadHomePage} />
      <Route path='watch' getComponent={loadWatchPage} />
    </Route>
  </Route>
)

