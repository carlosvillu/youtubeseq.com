import VideoRepository from './VideoRepository'

export default class YTApiVideoRepository extends VideoRepository {
  constructor ({config}) {
    super({config})
    this._config = config
    this._yt = this._config.get('youtube')
  }

  video ({id}) {
    console.log(this._yt)
    return this._yt.videos.list({id, part: 'snippet'})
  }

}
