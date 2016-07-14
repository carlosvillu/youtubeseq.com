import debug from 'debug'

const factoryLogger = ({prefix} = {}) => debug(`yt:${prefix}`)

export default factoryLogger
