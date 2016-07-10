import { Component, PropTypes, Children } from 'react'

export default class Provider extends Component {
  getChildContext () {
    return { domain: this.domain }
  }

  constructor (props, context) {
    super(props, context)
    this.domain = props.domain
  }

  render () {
    return Children.only(this.props.children)
  }
}

if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    const { domain } = this
    const { domain: nextDomain } = nextProps

    if (domain !== nextDomain) {
      console.warn('<Provider> does not support changing `domain` on the fly.')
    }
  }
}

Provider.propTypes = {
  domain: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

Provider.childContextTypes = {
  domain: PropTypes.object
}

