console.log('chat.js')

const socket = io()
let user
let chatbox = document.querySelector('#chatbox')

Swal.fire({
    title: 'Identifícate',
    input: 'text',
    text: 'Ingrese el usuario para identificarse en el chat',
    inputValidator: value => {
        return !value && '¡Necesitas escribir un nombre de usuario para continuar!'
    },
    allowOutsideClick: false 
}).then(result => {
    user = result.value
    // console.log(user)
})

chatbox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatbox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatbox.value })
            chatbox.value = ''
        }
    }
})

socket.on('messageLogs', data => {
    // console.log('mensajes para todos',data)
    let log = document.querySelector('#messageLogs')
    let messages = ''
    data.forEach( message => {
          messages = messages + `${message.user} dice: ${message.message}<br>`
    })
    log.innerHTML = messages
})