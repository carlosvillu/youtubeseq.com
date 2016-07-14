import sequence from 'sequence-titles'

import config from '../config'
import factoryLogger from '../logger'

import VideoFromIdUseCase from '../video/VideoFromIdUseCase'
import SequenceToVideosUseCase from '../video/SequenceToVideosUseCase'

import YTApiVideoRepository from '../video/YTApiVideoRepository'
import HTTPDataSource from '../video/YTApiVideoRepository/HTTPDataSource'
import LocalDataSource from '../video/YTApiVideoRepository/LocalDataSource'

import VideoEntity from '../video/VideoEntity'

export default class VideoFactory {
  static videoFromIdUseCase () {
    return new VideoFromIdUseCase({repository: VideoFactory.yTApiVideoRepository()})
  }

  static sequenceToVideosUseCase () {
    return new SequenceToVideosUseCase({repository: VideoFactory.yTApiVideoRepository()})
  }

  static yTApiVideoRepository () {
    return new YTApiVideoRepository({
      hTTPDataSource: VideoFactory.hTTPDataSource(),
      localDataSource: VideoFactory.localDataSource(),
      log: factoryLogger({prefix: YTApiVideoRepository.name})
    })
  }

  static hTTPDataSource () {
    return new HTTPDataSource({
      config,
      local: VideoFactory.localDataSource(),
      log: factoryLogger({prefix: HTTPDataSource.name})
    })
  }

  static localDataSource () {
    return new LocalDataSource({
      local: window.localforage,
      log: factoryLogger({prefix: LocalDataSource.name})
    })
  }

  static videoEntity ({id, title, description, thumbnails, channelTitle, channelId} = {}) {
    return new VideoEntity({id, title, description, thumbnails, sequence, channelTitle, channelId})
  }
}
