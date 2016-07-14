import config from './config'
import VideoFactory from './factories/video'

class YoutubeSeq {
  constructor () {
    this._config = config
    this._map = {}
    this._map['video_from_id_use_case'] = VideoFactory.videoFromIdUseCase()
    this._map['sequence_to_videos_use_case'] = VideoFactory.sequenceToVideosUseCase()
  }

  get (key) {
    return this._map[key] ? this._map[key]
                          : {execute: () => Promise.reject(`[YoutubeSeq#get] ${key} not defined`)}
  }

  config (key, value) {
    this._config.set(key, value)
    return this
  }
}

const youtubeseq = new YoutubeSeq()
export default youtubeseq
