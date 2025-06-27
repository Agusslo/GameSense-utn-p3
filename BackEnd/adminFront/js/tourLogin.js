// ./js/tourLogin.js

document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que Driver.js esté cargado antes de usarlo
    if (typeof window.driver === 'undefined') {
        console.error('Driver.js no está cargado. Asegúrate de que el script CDN esté correcto.');
        return;
    }

    const driver = window.driver.js.driver;
    const btnAyudaLogin = document.getElementById('btn-ayuda-login'); // Obtener el botón de ayuda del login

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
                element: '#login-titulo',
                popover: {
                    title: '¡Bienvenido al Login de Administrador!',
                    description: 'Aquí puedes iniciar sesión para acceder al panel de administración.',
                    side: 'bottom',
                    align: 'center'
                }
            },
            {
                element: '#correo',
                popover: {
                    title: 'Campo de Correo',
                    description: 'Ingresa tu correo electrónico de administrador.',
                    side: 'right',
                    align: 'start'
                }
            },
            {
                element: '#contrasena',
                popover: {
                    title: 'Campo de Contraseña',
                    description: 'Ingresa tu contraseña de administrador aquí.',
                    side: 'left',
                    align: 'start'
                }
            },
            {
                element: '#togglePassword',
                popover: {
                    title: 'Ver Contraseña',
                    description: 'Haz clic para mostrar u ocultar tu contraseña mientras la escribes.',
                    side: 'right',
                    align: 'center'
                }
            },
            {
                element: '#btn-ingresar',
                popover: {
                    title: 'Botón de Ingresar',
                    description: 'Una vez que hayas completado tus credenciales, haz clic aquí para iniciar sesión.',
                    side: 'top',
                    align: 'center'
                }
            },
            {
                element: '#btn-autocompletar',
                popover: {
                    title: 'Autocompletar Credenciales',
                    description: 'Haz clic aquí para autocompletar los campos de correo y contraseña con datos de prueba.',
                    side: 'top',
                    align: 'center'
                }
            },
            {
                element: '#link-registro',
                popover: {
                    title: '¿No tenés cuenta?',
                    description: 'Si aún no eres administrador, puedes registrarte desde este enlace.',
                    side: 'top',
                    align: 'center'
                }
            }
        ]
    });

    // Añadir el evento click al botón de ayuda del login
    if (btnAyudaLogin) {
        btnAyudaLogin.addEventListener('click', () => {
            driverObj.drive(); // Iniciar el tour cuando se haga clic en el botón
        });
    } else {
        console.error('El botón con ID "btn-ayuda-login" no se encontró en el DOM.');
    }
});