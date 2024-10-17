const chatSocket = (io) => {
    let messages = []
    io.on('connection', socket => {
        console.log('Nuevo cliente conectado')
    
        socket.on('message', data => {
            // console.log(data)
            messages.push(data)
            io.emit('messageLogs', messages)
        })
    })
}

module.exports = {
    chatSocket
}

