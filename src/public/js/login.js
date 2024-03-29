const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();

        const obj = {};

        const formData = new FormData(loginForm);

        formData.forEach((value, key) => obj[key] = value);

        const response = await fetch('/auth/login', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(obj),
        });

        const userSession = await response.json();
        console.log(userSession)

        if (userSession.payload.first_name) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Te damos la bienvenida ${userSession.payload.first_name}!!`,
                showConfirmButton: false,
                timer: 2000
            })
                .then(() => {
                    window.location.href = '/products';
                })
        } else {
            console.log(userSession);
        }

    } catch (error) {
        console.log('Error en la solicitud: ' + error);
    }
})