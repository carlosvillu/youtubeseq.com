import React from 'react'

import Theatre from '../components/Theatre'

class WatchPage extends React.Component {
  constructor (props, ctxt) {
    super(props, ctxt)

    const {domain, factoryLogger} = ctxt
    this._log = factoryLogger({prefix: WatchPage.name})
    this._domain = domain
    this.state = {title: false, sequence: false}
  }

  componentDidMount () {
    const {v} = this.props.location.query
    this._log('Searching video for id %s', v)
    this._domain.get('video_from_id_use_case')
      .execute({id: v})
      .then(video => {
        this.setState({title: video.title})
        this._log('Searching sequence for video %s', video.title)
        return this._domain.get('sequence_to_videos_use_case').execute({video})
      })
      .then(sequence => {
        this._log('Sequence for %s => %o', this.state.title, sequence)
        this.setState({sequence})
      })
  }

  render () {
    const {title, sequence} = this.state
    const {v} = this.props.location.query
    return (
      <div className='WatchPage'>
        <h1>{title || `Buscando video: ${v}`}</h1>
        {sequence && <Theatre videos={sequence} />}
      </div>
    )
  }
}
WatchPage.displayName = 'WatchPage'
WatchPage.contextTypes = {
  domain: React.PropTypes.object,
  factoryLogger: React.PropTypes.func
}
export default WatchPage

