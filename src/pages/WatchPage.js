import React from 'react'

const WatchPage = ({location}, {domain}) => {
  domain.get('video_from_id_use_case').execute({id: location.query.v})
    .then((video) => {
      console.log(JSON.stringify(video, null, 2))
      console.log(video.sequence)
    })
    .catch(console.error.bind(console))

  return (
    <h1>Watch Page!!!!!!</h1>
  )
}

WatchPage.display = 'WatchPage'
WatchPage.contextTypes = {
  domain: React.PropTypes.object
}
export default WatchPage

