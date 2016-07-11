import VideoFactory from '../../factories/video'

export default class HTTPDataSource {
  constructor ({config, local} = {}) {
    this._config = config
    this._local = local
  }

  video ({id} = {}) {
    return this._config.get('youtube')
      .videos.list({id, part: 'snippet'})
      .then(({result}) => {
        const video = result.items[0]
        const {localized, thumbnails} = video.snippet
        const proto = {
          id: video.id,
          title: localized.title,
          description: localized.description,
          thumbnails
        }
        this._local.save({proto}).catch(console.error.bind(console))
        return VideoFactory.videoEntity(proto)
      })
  }
}
