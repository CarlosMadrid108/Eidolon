const socket = io()

//La lista se actualiza automáticamete luego de llevar a cabo el borrado o suma de un archivo por medio de los endpoints con postman.
//Los emits vienen desde productManager

function render(data) {
    const html = data.map(elem => {
        return (`
            <div>
            <div>
            <strong>Product: ${elem.title}, </strong>
            <strong>Price: ${elem.price}</strong>
            </div> 
            </div>
        `)
    }).join(' ')

    document.getElementById('caja').innerHTML = html
}

//Render de todos los productos
socket.on('list', (data)=>{
    render(data)
})

//Render cada vez que se añade, borra o actualiza
socket.on('productos', (data) => {
    render(data)
})

