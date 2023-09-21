const socket = io();

const addProd = document.getElementById('addProduct');

addProd.addEventListener('submit', async (e) => {
    e.preventDefault();

    const obj = {};

    const products = new FormData(addProd);

    products.forEach((value, key) => (obj[key] = value));

    try {
        const response = await fetch('/products', {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(obj),
        });

        const newProduct = await response.json();

        if (newProduct.status === 'success') {
            socket.emit('addProd', obj);
        } else {
            socket.emit('errAddProd', newProduct.message);
        }
    } catch (error) {
        console.log(error);
    }


    addProd.reset();
})

socket.on('newProduct', data => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se acaba de ingresar el producto ${data} `,
        showConfirmButton: false,
        timer: 2000
    })
})

socket.on('errAdd', data => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${data}`,
    })
})

