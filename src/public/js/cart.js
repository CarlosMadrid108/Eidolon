const socket = io()

function render(data) {

        const prods = data.products

    const html = prods.map(elem => {
        return (`
            <div>
            <div>
            <strong>Title: ${elem.product.title}</strong>
            <strong>Quantity: ${elem.quantity}</strong>
            </div> 
            </div>
        `)
    }).join(' ')

    document.getElementById('carro').innerHTML = html
}

socket.on('carrito', (data) => {
    render(data)
})