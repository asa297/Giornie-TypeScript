module.exports = (io: SocketIO.Server) => {
  io.on('connection', client => {
    let userSocket = client.handshake.query.userSocket

    client.on('joinroom', () => {
      console.log('test', userSocket)
      client.join(userSocket)
    })

    client.on('openpo', () => {
      io.to(userSocket).emit('openpo', {})
    })

    client.on('disconnect', () => {
      io.to(userSocket).emit('closepo', {})
    })

    client.on('sendItem', item => {
      io.to(userSocket).emit('sendItem', item)
    })

    client.on('dc', data => {
      io.to(userSocket).emit('dc', data)
    })

    client.on('credit', data => {
      io.to(userSocket).emit('credit', data)
    })

    client.on('creditcharge', data => {
      io.to(userSocket).emit('creditcharge', data)
    })

    client.on('submitpo', data => {
      io.to(userSocket).emit('submitpo', data)
    })
  })
}
