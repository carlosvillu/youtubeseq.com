import Repository from '../Repository'
export default class VideoRepository extends Repository {
  video () {
    throw new Error('[VideoRepository#video] must be implemented')
  }

  sequenceFor () {
    throw new Error('[VideoRepository#videos] must be implemented')
  }
}
