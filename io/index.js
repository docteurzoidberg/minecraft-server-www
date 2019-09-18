import http from 'http'
import socketIO from 'socket.io'

export default function () {
  const server = http.createServer(this.nuxt.renderer.app)
  socketIO(server)

  // overwrite nuxt.server.listen()
  this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve))
  // close this server on 'close' event
  this.nuxt.hook('close', () => new Promise(server.close))
}
