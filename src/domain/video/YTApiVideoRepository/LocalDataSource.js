import VideoFactory from '../../factories/video'

export default class LocalDataSource {
  static videoKeyFor ({field, value} = {}) {
    switch (field) {
      case 'id':
        return `videoId#${value}`
      case 'title':
        return `videoTitle#${value}`
      default:
        throw new Error('[LocalDataSource.videoKeyFor] field is mandatory')
    }
  }

  constructor ({local, log}) {
    this._local = local
    this._log = log
  }

  searchBy (query = {}) { // query = {id, field}
    const [field] = Object.keys(query).filter((field) => !!query[field])
    this._log('Searching by %s => %s', field, query[field])
    return this._local.getItem(LocalDataSource.videoKeyFor({field, value: query[field]}))
            .then((proto) => proto && VideoFactory.videoEntity(proto))
  }

  saveBy ({field, proto} = {}) {
    this._log('Saving by %s %s => %o', field, proto.title, proto)
    return this._local.setItem(LocalDataSource.videoKeyFor({field, value: proto[`${field}`]}), proto)
  }

}
