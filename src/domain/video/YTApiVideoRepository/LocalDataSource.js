import VideoFactory from '../../factories/video'

export default class LocalDataSource {
  static videoKeyFor ({id} = {}) {
    return `video#${id}`
  }

  constructor ({local}) {
    this._local = local
  }

  video ({id} = {}) {
    return this._local.getItem(LocalDataSource.videoKeyFor({id}))
            .then((proto) => proto && VideoFactory.videoEntity(proto))
  }

  save ({proto}) {
    return this._local.setItem(LocalDataSource.videoKeyFor({id: proto.id}), proto)
  }
}
