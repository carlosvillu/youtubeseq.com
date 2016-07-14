import VideoFactory from '../../factories/video'

export default class HTTPDataSource {

  static fromVideoToEntity ({video} = {}) {
    const {title, description, localized = {title, description}, thumbnails, channelId, channelTitle} = video.snippet
    const proto = {
      id: typeof video.id === 'string' ? video.id : video.id.videoId,
      title: title || localized.title,
      description: description || localized.description,
      thumbnails, channelTitle, channelId
    }
    return VideoFactory.videoEntity(proto)
  }

  constructor ({config, local, log} = {}) {
    this._config = config
    this._local = local
    this._log = log
  }

  video ({id} = {}) {
    return this._config.get('youtube')
      .videos.list({id, part: 'snippet'})
      .then(({result}) => {
        this._log('Searching by id %s', id)
        const entity = HTTPDataSource.fromVideoToEntity({video: result.items[0]})
        this._local.saveBy({field: 'id', proto: entity.toJSON()}).catch(console.error.bind(console))
        return entity
      })
  }

  searchBy ({title, channelId} = {}) {
    return this._config.get('youtube')
      .search.list({part: 'snippet', q: title, channelId})
      .then((response) => {
        let video = response.result.items.filter(({snippet}) => snippet.title === title)

        /**
         * Fallback, if there not exact match we all get the first result in the search
        * */
        video = video.length !== 0 ? video : response.result.items.filter((v, i) => i === 0)

        const [entity] = video.map((video) => HTTPDataSource.fromVideoToEntity({video}))
        this._log('Searched by title %s in channel %s => %o', title, channelId, entity)
        entity && this._local.saveBy({
          field: 'title',
          proto: Object.assign({}, entity.toJSON(), {title}) // Save by the title used in the search
        }).catch(console.error.bind(console))

        return entity
      })
  }

}
