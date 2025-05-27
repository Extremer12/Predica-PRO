// PWA Installation functionality
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

// Mostrar el botón de instalación por defecto
installBtn.style.display = 'block';

// Escuchar el evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir que Chrome 67 y anteriores muestren automáticamente el prompt
    e.preventDefault();
    // Guardar el evento para que pueda ser activado más tarde
    deferredPrompt = e;
    // Mostrar el botón de instalación (ya está visible por defecto)
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
    } else {
        // Si no hay prompt disponible, mostrar un mensaje al usuario
        alert('Esta aplicación ya está instalada o tu navegador no permite instalar aplicaciones web.');
    }
});

// Escuchar cuando la app es instalada
window.addEventListener('appinstalled', (evt) => {
    console.log('App instalada exitosamente');
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
}


// Funcionalidades PWA mejoradas
function initializePWAFeatures() {
    // Detectar si está instalada como PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.body.classList.add('pwa-installed');
        showEnhancedNotification('📱 Aplicación ejecutándose como PWA', 'success');
    }
    
    // Detectar cambios de conectividad
    window.addEventListener('online', () => {
        showEnhancedNotification('🌐 Conexión restaurada', 'success');
    });
    
    window.addEventListener('offline', () => {
        showEnhancedNotification('📴 Sin conexión - Modo offline activado', 'warning');
    });
    
    // Manejar actualizaciones de la aplicación
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            showEnhancedNotification('🔄 Aplicación actualizada - Recarga para ver cambios', 'info');
        });
    }
}

// Función para compartir sermón
function shareSermon() {
    const title = document.getElementById('sermon-title').value || 'Mi Sermón';
    const theme = document.getElementById('sermon-theme').value || '';
    
    if (navigator.share) {
        navigator.share({
            title: `${title} - Predica PRO`,
            text: `${theme ? 'Tema: ' + theme : 'Sermón creado con Predica PRO'}`,
            url: window.location.href
        }).then(() => {
            showEnhancedNotification('📤 Sermón compartido', 'success');
        }).catch(() => {
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showEnhancedNotification('📋 Enlace copiado al portapapeles', 'success');
    }).catch(() => {
        showEnhancedNotification('❌ No se pudo compartir', 'error');
    });
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', initializePWAFeatures);