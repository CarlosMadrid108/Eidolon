const socket = io()

//La lista se actualiza automáticamete luego de llevar a cabo el borrado o suma de un archivo por medio de los endpoints con postman.
//Los emits vienen desde productManager

// function render(data) {

//     const html = data.payload.map(elem => {
//         return (`
//             <div>
//             <div>
//             <strong>Product: ${elem.title}, </strong>
//             <strong>Price: ${elem.price}</strong>
//             <form action="/api/carts/65de1959bf90cca4f2f98877/product/${elem._id}" method="post">
//              <button name="add" value="agregar">Agregar al Carrito</button>
//             </form>
//             </div> 
//             </div>
//         `)
//     }).join(' ')

//     document.getElementById('caja').innerHTML = html
//     document.getElementById('pag').innerHTML = `<strong>Página: ${data.page}, </strong>`
// }


// //Render de todos los productos
// socket.on('list', (data) => {
//     render(data)
// })

// //Render cada vez que se añade, borra o actualiza
// socket.on('productos', (data) => {
//     render(data)
// })

function render() {
    const URLproductos = "http://localhost:8080/api/products/"
    fetch(URLproductos)
        .then((resultado) => resultado.json())
        .then((data) => {
            const listaProductos = data.payload;
            document.getElementById('pag').innerHTML = `<strong>Página: ${data.page}, </strong>`
            for (const prod of listaProductos) {
                document.getElementById('caja').innerHTML += `
            <div>
             <div>
           <strong>Product: ${prod.title}, </strong>
            <strong>Price: ${prod.price}</strong>
             <form action="/api/carts/${data.cart}/product/${prod._id}" method="post">
             <button name="add" value="agregar">Agregar al Carrito</button>
            </form>
            </div> 
             </div>
            `
            }
        })
        .catch((error) => console.log('error en la petición'. error))

}

render();
