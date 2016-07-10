import 'babel-polyfill'
import 'isomorphic-fetch'

import React from 'react'
import reactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import routes from './routes'

import Provider from './components/Provider'

import YoutubeSeq from './domain'

// import './index.scss'

reactDOM.render(
  <Provider domain={YoutubeSeq}>
    <Router routes={routes} history={browserHistory} />
  </ Provider>
  , document.getElementById('root')
)

