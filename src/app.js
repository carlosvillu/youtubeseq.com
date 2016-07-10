import 'babel-polyfill'
import 'isomorphic-fetch'

import React from 'react'
import reactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import routes from './routes'

import Provider from './components/Provider'
import YoutubeSeq from './domain'

// import './index.scss'

window.OnLoadCallback = () => {
  window.GOOGLE_API_KEY = 'AIzaSyAGE8yr4NQe-n_Cqswuwm-1fW88h3CBMbk'
  window.gapi.client.setApiKey(window.GOOGLE_API_KEY)
  window.gapi.client.load('youtube', 'v3').then(() => {
    reactDOM.render(
      <Provider domain={YoutubeSeq.config('youtube', window.gapi.client.youtube)}>
        <Router routes={routes} history={browserHistory} />
      </ Provider>
      , document.getElementById('root')
    )
  })
}
