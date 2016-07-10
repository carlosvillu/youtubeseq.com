import UseCase from '../UseCase'

export default class VideoFromIdUseCase extends UseCase {
  constructor ({repository}) {
    super({repository})
    this._respository = repository
  }

  execute ({id}) {
    return new Promise((resolve, reject) => {
      if (!id) { reject(Error('[VideoFromIdUseCase#execute] id is mandatory')) }
      resolve(this._respository.video({id}))
    })
  }
}
