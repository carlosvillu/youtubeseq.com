import VideoFactory from './factories/video'

class YoutubeSeq {
  constructor () {
    this._map = {}
    this._map['video_from_id_use_case'] = VideoFactory.videoFromIdUseCase()
  }

  get (key) {
    return this._map[key] ? this._map[key]
                          : {execute: () => Promise.reject(`[YoutubeSeq#get] ${key} not defined`)}
  }
}

const youtubeseq = new YoutubeSeq()
export default youtubeseq
