import React from 'react'

import YoutubePlayer from 'react-youtube-player'

const AUTOPLAY = 1
const VIDEOS_IDS_SEP = ','

const Theatre = ({videos}, {factoryLogger}) => {
  const log = factoryLogger({prefix: 'Theatre'})
  log('creating Theatre with titles %j', videos.map(v => v.title))
  return (
    <div className='Theatre'>
      <YoutubePlayer
        configuration={{
          autoplay: AUTOPLAY,
          playlist: videos.map(video => video.id).join(VIDEOS_IDS_SEP)
        }} />
    </div>
  )
}

Theatre.displayName = 'Theatre'
Theatre.contextTypes = {
  domain: React.PropTypes.object,
  factoryLogger: React.PropTypes.func
}
export default Theatre
