import sequence from 'sequence-titles'
import localforage from 'localforage'

import config from '../config'

import VideoFromIdUseCase from '../video/VideoFromIdUseCase'

import YTApiVideoRepository from '../video/YTApiVideoRepository'
import HTTPDataSource from '../video/YTApiVideoRepository/HTTPDataSource'
import LocalDataSource from '../video/YTApiVideoRepository/LocalDataSource'

import VideoEntity from '../video/VideoEntity'

export default class VideoFactory {
  static videoFromIdUseCase () {
    return new VideoFromIdUseCase({repository: VideoFactory.yTApiVideoRepository()})
  }

  static yTApiVideoRepository () {
    return new YTApiVideoRepository({
      hTTPDataSource: VideoFactory.hTTPDataSource(),
      localDataSource: VideoFactory.localDataSource()
    })
  }

  static hTTPDataSource () {
    return new HTTPDataSource({config, local: VideoFactory.localDataSource()})
  }

  static localDataSource () {
    return new LocalDataSource({local: localforage})
  }

  static videoEntity ({id, title, description, thumbnails} = {}) {
    return new VideoEntity({id, title, description, thumbnails, sequence})
  }
}
