// PWA Installation functionality
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

// Escuchar el evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir que Chrome 67 y anteriores muestren automáticamente el prompt
    e.preventDefault();
    // Guardar el evento para que pueda ser activado más tarde
    deferredPrompt = e;
    // Mostrar el botón de instalación
    installBtn.style.display = 'block';
});

// Manejar el click del botón de instalación
installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Mostrar el prompt de instalación
        deferredPrompt.prompt();
        // Esperar a que el usuario responda al prompt
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('Usuario aceptó la instalación');
        } else {
            console.log('Usuario rechazó la instalación');
        }
        
        // Limpiar el prompt guardado
        deferredPrompt = null;
        // Ocultar el botón
        installBtn.style.display = 'none';
    }
});

// Escuchar cuando la app es instalada
window.addEventListener('appinstalled', (evt) => {
    console.log('App instalada exitosamente');
    installBtn.style.display = 'none';
});

// Registrar Service Worker (opcional para funcionalidad offline)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registrado: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW falló al registrarse: ', registrationError);
            });
    });
}

// Detectar si la app está siendo ejecutada como PWA
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
}

// Ajustar estilos si es PWA
if (isPWA()) {
    document.body.classList.add('pwa-mode');
    // Ocultar el botón de instalación si ya está instalada
    installBtn.style.display = 'none';
}