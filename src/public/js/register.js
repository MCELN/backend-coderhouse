const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();

        const obj = {};

        const formData = new FormData(registerForm);

        formData.forEach((value, key) => obj[key] = value);

        const response = await fetch('/auth/register', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(obj),
        });

        const newUser = await response.json();

        if (newUser.status === 'success') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Te damos la bienvenida ${newUser.payload.first_name}!!`,
                showConfirmButton: false,
                timer: 2000
            })
                .then(() => {
                    window.location.href = '/login';
                });

        } else {
            console.log(newUser);
        };

    } catch (error) {
        console.log(`Error: ${error}`);
    };
});