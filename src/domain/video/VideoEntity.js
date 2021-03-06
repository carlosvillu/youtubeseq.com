import Entity from '../Entity'

export default class VideoEntity extends Entity {
  constructor ({id, title, description, thumbnails, channelTitle, channelId, sequence} = {}) {
    super({id, title, thumbnails})

    this.id = id
    this.title = title
    this.description = description
    this.thumbnails = thumbnails
    this.channelId = channelId
    this.channelTitle = channelTitle
    this._sequence = sequence
  }

  get sequence () {
    return this._sequence.isSequence(this.title) ? this._sequence.sequence(this.title)
                                                 : [this.title]
  }

  toJSON () {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      thumbnails: this.thumbnails,
      sequence: this.sequence,
      channelId: this.channelId,
      channelTitle: this.channelTitle
    }
  }
}
