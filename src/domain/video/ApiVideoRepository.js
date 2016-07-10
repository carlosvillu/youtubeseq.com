import VideoRepository from './VideoRepository'

export default class ApiVideoRepository extends VideoRepository {
  constructor ({fetcher}) {
    super({fetcher})
    this._fetcher = fetcher
  }

}
