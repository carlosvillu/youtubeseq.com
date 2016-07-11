import VideoRepository from '../VideoRepository'

export default class YTApiVideoRepository extends VideoRepository {
  constructor ({hTTPDataSource, localDataSource}) {
    super({hTTPDataSource, localDataSource})

    this._hTTPDataSource = hTTPDataSource
    this._localDataSource = localDataSource
  }

  video ({id}) {
    return this._localDataSource.video({id})
            .then((video) => video || this._hTTPDataSource.video({id}))
  }
}
