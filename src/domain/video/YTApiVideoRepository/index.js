import VideoRepository from '../VideoRepository'

export default class YTApiVideoRepository extends VideoRepository {
  constructor ({hTTPDataSource, localDataSource, log} = {}) {
    super({hTTPDataSource, localDataSource, log})

    this._hTTPDataSource = hTTPDataSource
    this._localDataSource = localDataSource
    this._log = log
  }

  video ({id} = {}) {
    return this._localDataSource.searchBy({id})
            .then((video) => video || this._hTTPDataSource.video({id}))
  }

  sequenceFor ({video} = {}) {
    this._log('Sequence for video "%s" => %j', video.title, video.sequence)
    return Promise.all(video.sequence.map(title => this._localDataSource.searchBy({title})))
      .then((videos) => {
        return videos.filter(v => v).length === video.sequence.length ? videos : Promise.all(video.sequence.map(title => {
          this._log('Failing cache for "%s"', title)
          return this._hTTPDataSource.searchBy({title, channelId: video.channelId})
        }))
      })
  }
}
