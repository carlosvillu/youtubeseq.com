import UseCase from '../UseCase'

export default class SequenceToVideosUseCase extends UseCase {
  constructor ({repository} = {}) {
    super({repository})
    this._repository = repository
  }

  execute ({video} = {}) {
    return new Promise((resolve, reject) => {
      if (video === undefined) { return reject(new Error('[SequenceToVideosUseCase#execute] video is mandatory')) }
      resolve(this._repository.sequenceFor({video}))
    })
  }
}
