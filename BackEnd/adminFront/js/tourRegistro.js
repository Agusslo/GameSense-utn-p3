document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.driver === 'undefined') {
        console.error('Driver.js no está cargado. Asegúrate de que el script CDN esté correcto.');
        return;
    }

    const driver = window.driver.js.driver;
    const btnAyuda = document.getElementById('btn-ayuda'); // Obtener el nuevo boton de ayuda

    const driverObj = driver({
        showProgress: true,
        overlayColor: '#000000',
        overlayOpacity: 0.7,
        nextBtnText: 'Siguiente',
        prevBtnText: 'Anterior',
        doneBtnText: 'Finalizar',
        popoverOffset: 10,
        steps: [
            {
                element: '#registro-titulo',
                popover: {
                    title: '¡Bienvenido al registro de administrador!',
                    description: 'Aqui podrás crear una nueva cuenta de administrador para gestionar el sistema.',
                    side: 'bottom',
                    align: 'center'
                }
            },
            {
                element: '#correo',
                popover: {
                    title: 'Campo de Correo',
                    description: 'Introduce la direccion de correo electrónico del nuevo administrador. ¡Debe ser único!',
                    side: 'right',
                    align: 'start'
                }
            },
            {
                element: '#contrasena',
                popover: {
                    title: 'Campo de Contraseña',
                    description: 'Establece una contraseña segura para el administrador. Recuerda que debe ser facil de recordar pero dificil de adivinar.',
                    side: 'left',
                    align: 'start'
                }
            },
            {
                element: '#togglePassword',
                popover: {
                    title: 'Ver Contraseña',
                    description: 'Haz clic aquí para mostrar u ocultar la contraseña que estás escribiendo.',
                    side: 'right',
                    align: 'center'
                }
            },
            {
                element: '#btn-registrar',
                popover: {
                    title: 'Botón de Registro',
                    description: 'Una vez que hayas completado todos los campos, haz clic aquí para crear la cuenta de administrador.',
                    side: 'top',
                    align: 'center'
                }
            },
            {
                element: '#link-login',
                popover: {
                    title: 'Volver al Login',
                    description: 'Si ya tienes una cuenta o prefieres iniciar sesion, puedes volver a la página de login desde aquí.',
                    side: 'top',
                    align: 'center'
                }
            }
        ]
    });

    // Añadir el evento click al botón de ayuda
    if (btnAyuda) {
        btnAyuda.addEventListener('click', () => {
            driverObj.drive(); // Iniciar el tour cuando se haga clic en el boton
        });
    } else {
        console.error('El botón con ID "btn-ayuda" no se encontró en el DOM.');
    }
});