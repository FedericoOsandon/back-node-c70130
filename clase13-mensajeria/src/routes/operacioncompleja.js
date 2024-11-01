process.on('message', message => {
    console.log('mensaje recibido: ',message)
    let result = 0
    for (let i = 0; i < 9e9; i++) {
        result += i
        
    }
    console.log('resultado: ',result)
    process.send(result)
})