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

socket.on('chatLoad', (data) => {
    render(data)
    let box = document.getElementById('chat_caja')
    box.scrollTop = box.scrollHeight
})