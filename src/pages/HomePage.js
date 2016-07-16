/* eslint-disable no-return-assign */
import React from 'react'

const ID_PARSER_REG_EXP = /v=(\w+)/

class HomePage extends React.Component {
  render () {
    return (
      <div className='HomePage'>
        <h1 className='HomePage-title'>Create a new sequence</h1>
        <form>
          <input ref={c => this._input = c} type='text' placeholder='https://www.youtube.com/watch?v=4vr8Aao0Mfo' />
          <button onClick={this.handleClick.bind(this)}>Create sequence</button>
        </form>
      </div>
    )
  }

  handleClick (evt) {
    evt.preventDefault()

    // https://gist.github.com/jlong/2428561
    const parser = document.createElement('a')
    parser.href = this._input.value

    const [, id] = parser.search.split(ID_PARSER_REG_EXP)
    this.props.history.push(`/watch?v=${id}`)
  }
}

HomePage.displaName = 'HomePage'
export default HomePage
