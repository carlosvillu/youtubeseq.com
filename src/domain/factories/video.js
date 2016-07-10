import VideoFromIdUseCase from '../video/VideoFromIdUseCase'

import ApiVideoRepository from '../video/ApiVideoRepository'

export default class VideoFactory {
  static videoFromIdUseCase () {
    return new VideoFromIdUseCase({repository: VideoFactory.apiVideoRepository()})
  }

  static apiVideoRepository () {
    return new ApiVideoRepository({fetcher: global.fetch})
  }
}
