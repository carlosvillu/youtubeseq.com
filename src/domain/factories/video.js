import config from '../config'

import VideoFromIdUseCase from '../video/VideoFromIdUseCase'

import YTApiVideoRepository from '../video/YTApiVideoRepository'

export default class VideoFactory {
  static videoFromIdUseCase () {
    return new VideoFromIdUseCase({repository: VideoFactory.yTApiVideoRepository()})
  }

  static yTApiVideoRepository () {
    return new YTApiVideoRepository({config})
  }
}
