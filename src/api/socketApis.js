import GameSocketConnection from '../GameSocketConnection'

function socketConnect() {
  return GameSocketConnection.initializeConnection()
}

export {socketConnect}

