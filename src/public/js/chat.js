const socket = io()

const render = (data) => {
    const html = data.map(elem => {
        return (`
        
        <div>
        <strong>Correo: ${elem.user}, Mensaje: ${elem.message}</strong>
        </div> 
        
    `)

    })
    document.getElementById('chat_caja').innerHTML = html
}

const addMessage = () => {
    const msg = {
        user: document.getElementById('mail').value,
        message: document.getElementById('text').value
    }
    socket.emit('new-message', msg)
    return false
}

socket.on('mensajes', (data) => {
    render(data)
    let box = document.getElementById('chat_caja')
    box.scrollTop = box.scrollHeight
})

socket.on('chatLoad', (data) => {
    render(data)
    let box = document.getElementById('chat_caja')
    box.scrollTop = box.scrollHeight
})