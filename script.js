// Elementos del DOM
const sermonForm = document.getElementById('sermon-form');
const previewBtn = document.getElementById('preview-btn');
const generatePdfBtn = document.getElementById('generate-pdf-btn');
const resetStylesBtn = document.getElementById('reset-styles-btn');

// Controles de estilo
const fontFamilySelect = document.getElementById('font-family');
const fontSizeSelect = document.getElementById('font-size');
const themeSelect = document.getElementById('theme');
const textColorInput = document.getElementById('text-color');
const backgroundColorInput = document.getElementById('background-color');
const lineHeightSelect = document.getElementById('line-height');

// Elementos de entrada
const sermonThemeInput = document.getElementById('sermon-theme');
const sermonTextInput = document.getElementById('sermon-text');
const sermonTitleInput = document.getElementById('sermon-title');
const sermonPurposeInput = document.getElementById('sermon-purpose');
const sermonIntroInput = document.getElementById('sermon-intro');
const sermonBodyInput = document.getElementById('sermon-body');
const sermonConclusionInput = document.getElementById('sermon-conclusion');

// Elementos de vista previa
const previewTitle = document.getElementById('preview-title');
const previewTheme = document.getElementById('preview-theme');
const previewText = document.getElementById('preview-text');
const previewPurpose = document.getElementById('preview-purpose');
const previewIntro = document.getElementById('preview-intro');
const previewBody = document.getElementById('preview-body');
const previewConclusion = document.getElementById('preview-conclusion');
const sermonPreview = document.getElementById('sermon-preview');

// AGREGAR ESTAS NUEVAS VARIABLES:
// Elementos para las nuevas funcionalidades
const templateSelect = document.getElementById('template-select');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');
const saveStatus = document.getElementById('save-status');
const totalWordsSpan = document.getElementById('total-words');

// Contadores de palabras individuales
const themeCount = document.getElementById('theme-count');
const textCount = document.getElementById('text-count');
const titleCount = document.getElementById('title-count');
const purposeCount = document.getElementById('purpose-count');
const introCount = document.getElementById('intro-count');
const bodyCount = document.getElementById('body-count');
const conclusionCount = document.getElementById('conclusion-count');

// Plantillas predefinidas
const templates = {
    evangelistic: {
        theme: "La Salvación en Cristo",
        text: "Juan 3:16",
        title: "El Amor de Dios que Salva",
        purpose: "Presentar el plan de salvación de Dios para toda la humanidad",
        intro: "Vivimos en un mundo lleno de incertidumbre, pero hay una certeza que permanece: el amor de Dios por nosotros.",
        body: "1. Dios nos ama (Juan 3:16a)\n2. Todos hemos pecado (Romanos 3:23)\n3. Cristo murió por nosotros (Romanos 5:8)\n4. Debemos creer y recibir (Juan 1:12)",
        conclusion: "Hoy tienes la oportunidad de recibir este regalo gratuito de salvación. No dejes pasar esta oportunidad."
    },
    teaching: {
        theme: "El Crecimiento Espiritual",
        text: "2 Pedro 3:18",
        title: "Creciendo en Gracia y Conocimiento",
        purpose: "Enseñar los principios fundamentales del crecimiento espiritual cristiano",
        intro: "Como cristianos, estamos llamados a crecer constantemente en nuestra fe y conocimiento de Dios.",
        body: "1. La importancia de la Palabra (2 Timoteo 3:16-17)\n2. El poder de la oración (1 Tesalonicenses 5:17)\n3. La comunión con otros creyentes (Hebreos 10:25)\n4. El servicio a otros (Gálatas 5:13)",
        conclusion: "El crecimiento espiritual es un proceso continuo que requiere dedicación y compromiso con Dios."
    },
    devotional: {
        theme: "La Paz de Dios",
        text: "Filipenses 4:6-7",
        title: "Encontrando Paz en Medio de la Tormenta",
        purpose: "Reflexionar sobre cómo encontrar la paz de Dios en tiempos difíciles",
        intro: "En los momentos de ansiedad y preocupación, Dios nos ofrece su paz que sobrepasa todo entendimiento.",
        body: "1. No se preocupen por nada (v.6a)\n2. Oren por todo (v.6b)\n3. Sean agradecidos (v.6c)\n4. Reciban la paz de Dios (v.7)",
        conclusion: "La paz de Dios está disponible para todos los que confían en Él y le entregan sus cargas."
    }
};

// Función para actualizar la vista previa
// REEMPLAZAR la función updatePreview existente con esta versión mejorada:
function updatePreview() {
    // Actualizar contenido
    previewTitle.textContent = sermonTitleInput.value || 'Título de la Predicación';
    previewTheme.textContent = 'Tema: ' + (sermonThemeInput.value || '');
    previewText.textContent = 'Texto Bíblico: ' + (sermonTextInput.value || '');
    previewPurpose.textContent = sermonPurposeInput.value || '';
    previewIntro.textContent = sermonIntroInput.value || '';
    previewBody.textContent = sermonBodyInput.value || '';
    previewConclusion.textContent = sermonConclusionInput.value || '';

    // Actualizar contadores de palabras
    updateWordCounts();

    // Desplazarse a la vista previa en dispositivos móviles
    if (window.innerWidth <= 768) {
        document.getElementById('preview-container').scrollIntoView({ behavior: 'smooth' });
    }
}

// Función para cambiar la fuente
function changeFont() {
    sermonPreview.style.fontFamily = fontFamilySelect.value;
}

// Función para cambiar el tamaño de fuente
function changeFontSize() {
    sermonPreview.style.fontSize = fontSizeSelect.value;
}

// Función para cambiar el color del texto
function changeTextColor() {
    sermonPreview.style.color = textColorInput.value;
}

// Función para cambiar el color de fondo
function changeBackgroundColor() {
    sermonPreview.style.backgroundColor = backgroundColorInput.value;
}

// Función para cambiar el espaciado de líneas
function changeLineHeight() {
    sermonPreview.style.lineHeight = lineHeightSelect.value;
}

// Función para cambiar el tema
function changeTheme() {
    // Eliminar clases de tema anteriores
    sermonPreview.classList.remove('dark', 'sepia', 'blue', 'green');
    
    // Aplicar nuevo tema
    if (themeSelect.value !== 'light') {
        sermonPreview.classList.add(themeSelect.value);
        
        // Forzar la aplicación de estilos según el tema seleccionado
        if (themeSelect.value === 'dark') {
            sermonPreview.style.backgroundColor = '#2c3e50';
            sermonPreview.style.color = '#ecf0f1';
        } else if (themeSelect.value === 'sepia') {
            sermonPreview.style.backgroundColor = '#f4f1e8';
            sermonPreview.style.color = '#5c4b37';
        } else if (themeSelect.value === 'blue') {
            sermonPreview.style.backgroundColor = '#e3f2fd';
            sermonPreview.style.color = '#0d47a1';
        } else if (themeSelect.value === 'green') {
            sermonPreview.style.backgroundColor = '#e8f5e8';
            sermonPreview.style.color = '#1b5e20';
        }
    } else {
        // Tema light (por defecto)
        sermonPreview.style.backgroundColor = '#ffffff';
        sermonPreview.style.color = '#333';
    }
}

// Función para restablecer estilos
function resetStyles() {
    // Restablecer controles a valores por defecto
    fontFamilySelect.value = 'Arial, sans-serif';
    fontSizeSelect.value = '16px';
    themeSelect.value = 'light';
    textColorInput.value = '#333333';
    backgroundColorInput.value = '#ffffff';
    lineHeightSelect.value = '1.6';
    
    // Aplicar estilos por defecto
    changeFont();
    changeFontSize();
    changeTheme();
    changeTextColor();
    changeBackgroundColor();
    changeLineHeight();
}

// AGREGAR ESTOS NUEVOS EVENT LISTENERS:
// Event listeners para las nuevas funcionalidades
if (templateSelect) templateSelect.addEventListener('change', applyTemplate);
if (saveBtn) saveBtn.addEventListener('click', saveSermon);
if (loadBtn) loadBtn.addEventListener('click', loadSermon);

// Event listeners para auto-guardado y conteo de palabras
const inputs = [sermonThemeInput, sermonTextInput, sermonTitleInput, sermonPurposeInput, sermonIntroInput, sermonBodyInput, sermonConclusionInput];
inputs.forEach(input => {
    if (input) {
        input.addEventListener('input', () => {
            updateWordCounts();
            autoSave();
        });
    }
});

// Event listeners para auto-guardado de estilos
const styleControls = [fontFamilySelect, fontSizeSelect, themeSelect, textColorInput, backgroundColorInput, lineHeightSelect];
styleControls.forEach(control => {
    if (control) {
        control.addEventListener('change', autoSave);
    }
});

previewBtn.addEventListener('click', updatePreview);
fontFamilySelect.addEventListener('change', changeFont);
fontSizeSelect.addEventListener('change', changeFontSize);
themeSelect.addEventListener('change', changeTheme);
textColorInput.addEventListener('change', changeTextColor);
backgroundColorInput.addEventListener('change', changeBackgroundColor);
lineHeightSelect.addEventListener('change', changeLineHeight);
resetStylesBtn.addEventListener('click', resetStyles);

// Actualizar vista previa en tiempo real (opcional)
sermonTitleInput.addEventListener('input', () => {
    previewTitle.textContent = sermonTitleInput.value || 'Título de la Predicación';
});

sermonThemeInput.addEventListener('input', () => {
    previewTheme.textContent = 'Tema: ' + (sermonThemeInput.value || '');
});

sermonTextInput.addEventListener('input', () => {
    previewText.textContent = 'Texto Bíblico: ' + (sermonTextInput.value || '');
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Establecer valores iniciales
    changeFont();
    changeFontSize();
    changeTheme();
    changeTextColor();
    changeBackgroundColor();
    changeLineHeight();
});


// AGREGAR ESTAS FUNCIONES FALTANTES DESPUÉS DE LAS PLANTILLAS:

// Función para aplicar plantilla seleccionada
function applyTemplate() {
    const selectedTemplate = templateSelect.value;
    if (selectedTemplate && templates[selectedTemplate]) {
        const template = templates[selectedTemplate];
        
        sermonThemeInput.value = template.theme;
        sermonTextInput.value = template.text;
        sermonTitleInput.value = template.title;
        sermonPurposeInput.value = template.purpose;
        sermonIntroInput.value = template.intro;
        sermonBodyInput.value = template.body;
        sermonConclusionInput.value = template.conclusion;
        
        // Actualizar vista previa
        updatePreview();
        
        // Mostrar mensaje de confirmación
        showSaveStatus('Plantilla aplicada', 'success');
    }
}

// Función para contar palabras en un texto
function countWords(text) {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
}

// Función para actualizar contadores de palabras
function updateWordCounts() {
    const themeWords = countWords(sermonThemeInput.value);
    const textWords = countWords(sermonTextInput.value);
    const titleWords = countWords(sermonTitleInput.value);
    const purposeWords = countWords(sermonPurposeInput.value);
    const introWords = countWords(sermonIntroInput.value);
    const bodyWords = countWords(sermonBodyInput.value);
    const conclusionWords = countWords(sermonConclusionInput.value);
    
    const totalWords = themeWords + textWords + titleWords + purposeWords + introWords + bodyWords + conclusionWords;
    
    // Actualizar contador total
    if (totalWordsSpan) {
        totalWordsSpan.textContent = `Palabras totales: ${totalWords}`;
    }
    
    // Actualizar contadores individuales si existen
    if (themeCount) themeCount.textContent = `${themeWords} palabras`;
    if (textCount) textCount.textContent = `${textWords} palabras`;
    if (titleCount) titleCount.textContent = `${titleWords} palabras`;
    if (purposeCount) purposeCount.textContent = `${purposeWords} palabras`;
    if (introCount) introCount.textContent = `${introWords} palabras`;
    if (bodyCount) bodyCount.textContent = `${bodyWords} palabras`;
    if (conclusionCount) conclusionCount.textContent = `${conclusionWords} palabras`;
}

// Función para mostrar estado de guardado
function showSaveStatus(message, type = 'success') {
    if (saveStatus) {
        saveStatus.textContent = message;
        saveStatus.className = `save-status ${type}`;
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            saveStatus.textContent = '✅ Guardado';
            saveStatus.className = 'save-status';
        }, 3000);
    }
}

// Función para guardar predicación en localStorage
// Agregar después de las variables existentes
let sermonList = [];
let currentSermonId = null;

// Función para generar ID único
function generateSermonId() {
    return 'sermon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Función para guardar múltiples sermones
function saveMultipleSermons() {
    const sermonData = {
        id: currentSermonId || generateSermonId(),
        name: sermonTitleInput.value || 'Sermón sin título',
        theme: sermonThemeInput.value,
        text: sermonTextInput.value,
        title: sermonTitleInput.value,
        purpose: sermonPurposeInput.value,
        intro: sermonIntroInput.value,
        body: sermonBodyInput.value,
        conclusion: sermonConclusionInput.value,
        styles: {
            fontFamily: fontFamilySelect.value,
            fontSize: fontSizeSelect.value,
            theme: themeSelect.value,
            textColor: textColorInput.value,
            backgroundColor: backgroundColorInput.value,
            lineHeight: lineHeightSelect.value
        },
        timestamp: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };
    
    try {
        // Cargar sermones existentes
        const savedSermons = JSON.parse(localStorage.getItem('predicaPro_sermons') || '[]');
        
        // Buscar si ya existe el sermón
        const existingIndex = savedSermons.findIndex(s => s.id === sermonData.id);
        
        if (existingIndex >= 0) {
            // Actualizar sermón existente
            savedSermons[existingIndex] = sermonData;
        } else {
            // Agregar nuevo sermón
            savedSermons.push(sermonData);
            currentSermonId = sermonData.id;
        }
        
        localStorage.setItem('predicaPro_sermons', JSON.stringify(savedSermons));
        updateSermonsList();
        showSaveStatus('💾 Sermón guardado exitosamente', 'success');
    } catch (error) {
        console.error('Error al guardar sermón:', error);
        showSaveStatus('❌ Error al guardar sermón', 'error');
    }
}

// Función para cargar lista de sermones
function updateSermonsList() {
    const sermonSelect = document.getElementById('sermon-list');
    if (!sermonSelect) return;
    
    try {
        const savedSermons = JSON.parse(localStorage.getItem('predicaPro_sermons') || '[]');
        sermonSelect.innerHTML = '<option value="">-- Seleccionar sermón --</option>';
        
        savedSermons.forEach(sermon => {
            const option = document.createElement('option');
            option.value = sermon.id;
            option.textContent = `${sermon.name} (${new Date(sermon.timestamp).toLocaleDateString()})`;
            sermonSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar lista de sermones:', error);
    }
}

// Función para cargar sermón específico
function loadSpecificSermon(sermonId) {
    try {
        const savedSermons = JSON.parse(localStorage.getItem('predicaPro_sermons') || '[]');
        const sermon = savedSermons.find(s => s.id === sermonId);
        
        if (sermon) {
            currentSermonId = sermon.id;
            
            // Cargar contenido
            sermonThemeInput.value = sermon.theme || '';
            sermonTextInput.value = sermon.text || '';
            sermonTitleInput.value = sermon.title || '';
            sermonPurposeInput.value = sermon.purpose || '';
            sermonIntroInput.value = sermon.intro || '';
            sermonBodyInput.value = sermon.body || '';
            sermonConclusionInput.value = sermon.conclusion || '';
            
            // Cargar estilos
            if (sermon.styles) {
                fontFamilySelect.value = sermon.styles.fontFamily || 'Arial, sans-serif';
                fontSizeSelect.value = sermon.styles.fontSize || '16px';
                themeSelect.value = sermon.styles.theme || 'light';
                textColorInput.value = sermon.styles.textColor || '#333333';
                backgroundColorInput.value = sermon.styles.backgroundColor || '#ffffff';
                lineHeightSelect.value = sermon.styles.lineHeight || '1.6';
                
                // Aplicar estilos
                changeFont();
                changeFontSize();
                changeTheme();
                changeTextColor();
                changeBackgroundColor();
                changeLineHeight();
            }
            
            updatePreview();
            showSaveStatus('📂 Sermón cargado exitosamente', 'success');
        }
    } catch (error) {
        console.error('Error al cargar sermón:', error);
        showSaveStatus('❌ Error al cargar sermón', 'error');
    }
}

// Función para crear nuevo sermón
function createNewSermon() {
    currentSermonId = null;
    
    // Limpiar formulario
    sermonThemeInput.value = '';
    sermonTextInput.value = '';
    sermonTitleInput.value = '';
    sermonPurposeInput.value = '';
    sermonIntroInput.value = '';
    sermonBodyInput.value = '';
    sermonConclusionInput.value = '';
    
    // Restablecer estilos
    resetStyles();
    updatePreview();
    
    showSaveStatus('📄 Nuevo sermón creado', 'success');
}

// Función para eliminar sermón
function deleteSermon(sermonId) {
    if (confirm('¿Estás seguro de que quieres eliminar este sermón?')) {
        try {
            const savedSermons = JSON.parse(localStorage.getItem('predicaPro_sermons') || '[]');
            const filteredSermons = savedSermons.filter(s => s.id !== sermonId);
            
            localStorage.setItem('predicaPro_sermons', JSON.stringify(filteredSermons));
            updateSermonsList();
            
            if (currentSermonId === sermonId) {
                createNewSermon();
            }
            
            showSaveStatus('🗑️ Sermón eliminado', 'success');
        } catch (error) {
            console.error('Error al eliminar sermón:', error);
            showSaveStatus('❌ Error al eliminar sermón', 'error');
        }
    }
}

// Función de auto-guardado
let autoSaveTimeout;
function autoSave() {
    // Cancelar timeout anterior si existe
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    
    // Establecer nuevo timeout para auto-guardar después de 2 segundos de inactividad
    autoSaveTimeout = setTimeout(() => {
        saveSermon();
    }, 2000);
}

// Función para importar sermón desde archivo
function importSermon() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.txt';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                let sermonData;
                
                if (file.name.endsWith('.json')) {
                    sermonData = JSON.parse(e.target.result);
                } else if (file.name.endsWith('.txt')) {
                    // Parsear archivo TXT simple
                    const content = e.target.result;
                    const lines = content.split('\n');
                    sermonData = {
                        title: lines[0] || 'Sermón importado',
                        theme: '',
                        text: '',
                        purpose: '',
                        intro: '',
                        body: content,
                        conclusion: ''
                    };
                }
                
                // Cargar datos importados
                if (sermonData) {
                    sermonTitleInput.value = sermonData.title || '';
                    sermonThemeInput.value = sermonData.theme || '';
                    sermonTextInput.value = sermonData.text || '';
                    sermonPurposeInput.value = sermonData.purpose || '';
                    sermonIntroInput.value = sermonData.intro || '';
                    sermonBodyInput.value = sermonData.body || '';
                    sermonConclusionInput.value = sermonData.conclusion || '';
                    
                    updatePreview();
                    showSaveStatus('📥 Sermón importado exitosamente', 'success');
                }
            } catch (error) {
                console.error('Error al importar sermón:', error);
                showSaveStatus('❌ Error al importar sermón', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Función para buscar versículos bíblicos
async function searchBibleVerse(query) {
    try {
        // Usando API gratuita de Bible API
        const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=rvr1960`);
        
        if (!response.ok) {
            throw new Error('Error en la búsqueda');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al buscar versículo:', error);
        return null;
    }
}

// Función para mostrar resultados de búsqueda bíblica
function showBibleSearchResults(results) {
    const modal = document.getElementById('bible-search-modal');
    const resultsContainer = document.getElementById('bible-results');
    
    if (results && results.text) {
        resultsContainer.innerHTML = `
            <div class="bible-result">
                <h4>${results.reference}</h4>
                <p>${results.text}</p>
                <button onclick="insertBibleVerse('${results.reference}', '${results.text.replace(/'/g, "\\'")}')">Insertar versículo</button>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = '<p>No se encontraron resultados. Intenta con otra búsqueda.</p>';
    }
    
    modal.style.display = 'block';
}

// Función para insertar versículo en el texto bíblico
function insertBibleVerse(reference, text) {
    sermonTextInput.value = reference;
    
    // Agregar el texto del versículo al propósito si está vacío
    if (!sermonPurposeInput.value.trim()) {
        sermonPurposeInput.value = `Reflexionar sobre: "${text}"`;
    }
    
    updatePreview();
    closeBibleSearchModal();
    showSaveStatus('📖 Versículo insertado', 'success');
}

// Función para cerrar modal de búsqueda bíblica
function closeBibleSearchModal() {
    document.getElementById('bible-search-modal').style.display = 'none';
}


// Variables para el temporizador
let timerInterval = null;
let timerSeconds = 0;
let isTimerRunning = false;

// Función para formatear tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Función para iniciar/pausar temporizador
function toggleTimer() {
    const timerBtn = document.getElementById('timer-toggle'); // Cambiar 'timer-btn' por 'timer-toggle'
    const timerDisplay = document.getElementById('timer-display');
    
    if (isTimerRunning) {
        // Pausar temporizador
        clearInterval(timerInterval);
        timerBtn.textContent = '▶️ Continuar';
        isTimerRunning = false;
    } else {
        // Iniciar temporizador
        timerInterval = setInterval(() => {
            timerSeconds++;
            timerDisplay.textContent = formatTime(timerSeconds);
        }, 1000);
        timerBtn.textContent = '⏸️ Pausar';
        isTimerRunning = true;
    }
}

// Función para reiniciar temporizador
function resetTimer() {
    clearInterval(timerInterval);
    timerSeconds = 0;
    isTimerRunning = false;
    
    document.getElementById('timer-display').textContent = '00:00';
    document.getElementById('timer-toggle').textContent = '▶️ Iniciar'; // Cambiar 'timer-btn' por 'timer-toggle'
}

// Función para establecer tiempo objetivo
function setTargetTime() {
    const minutes = parseInt(prompt('¿Cuántos minutos quieres que dure tu predicación?', '20'));
    if (minutes && minutes > 0) {
        const targetSeconds = minutes * 60;
        localStorage.setItem('predicaPro_targetTime', targetSeconds);
        
        // Mostrar tiempo objetivo
        document.getElementById('target-time').textContent = `Objetivo: ${formatTime(targetSeconds)}`;
        showSaveStatus(`⏰ Tiempo objetivo: ${minutes} minutos`, 'success');
    }
}

// Función para guardar predicación en localStorage
function saveSermon() {
    // Usar la función existente saveMultipleSermons
    saveMultipleSermons();
}

// Función para cargar predicación desde localStorage
function loadSermon() {
    // Mostrar la lista de sermones para seleccionar
    const sermonSelect = document.getElementById('sermon-list');
    if (sermonSelect && sermonSelect.value) {
        loadSpecificSermon(sermonSelect.value);
    } else {
        // Si no hay sermón seleccionado, mostrar mensaje
        showSaveStatus('⚠️ Selecciona un sermón para cargar', 'warning');
    }
}

// ... existing code ...

// ===== NUEVAS FUNCIONALIDADES DE UX =====

// Variables para modo oscuro
let isDarkMode = localStorage.getItem('predicaPro_darkMode') === 'true';

// Variables para tutorial
let currentTutorialStep = 0;
const tutorialSteps = [
    {
        title: "🎓 Tutorial - Paso 1",
        text: "Bienvenido a Predica PRO. Aquí puedes gestionar múltiples sermones.",
        target: ".sermon-management",
        position: "bottom"
    },
    {
        title: "📝 Tutorial - Paso 2", 
        text: "Usa las plantillas predefinidas para comenzar rápidamente.",
        target: "#template-select",
        position: "bottom"
    },
    {
        title: "💾 Tutorial - Paso 3",
        text: "Guarda y exporta tus sermones en múltiples formatos.",
        target: ".save-export-controls",
        position: "top"
    },
    {
        title: "📖 Tutorial - Paso 4",
        text: "Busca versículos bíblicos directamente desde la aplicación.",
        target: ".bible-search",
        position: "top"
    },
    {
        title: "⏱️ Tutorial - Paso 5",
        text: "Usa el temporizador para controlar la duración de tu predicación.",
        target: ".sermon-timer",
        position: "top"
    },
    {
        title: "🎨 Tutorial - Paso 6",
        text: "Personaliza el estilo y apariencia de tus sermones.",
        target: ".style-controls",
        position: "top"
    }
];

// Variables para notificaciones
let notificationQueue = [];
let isShowingNotification = false;

// Variables para atajos de teclado
const keyboardShortcuts = {
    'Ctrl+S': saveSermon,
    'Ctrl+N': createNewSermon,
    'Ctrl+O': () => document.getElementById('sermon-list').focus(),
    'Ctrl+P': updatePreview,
    'Ctrl+D': toggleDarkMode,
    'F1': startTutorial,
    'Escape': closeAllModals
};

// ===== FUNCIONES DE MODO OSCURO =====
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('predicaPro_darkMode', isDarkMode);
    
    const darkModeBtn = document.getElementById('dark-mode-btn');
    if (darkModeBtn) {
        darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
        darkModeBtn.title = isDarkMode ? 'Modo claro' : 'Modo oscuro';
    }
    
    showEnhancedNotification(isDarkMode ? 'Modo oscuro activado' : 'Modo claro activado', 'success');
}

function initializeDarkMode() {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    const darkModeBtn = document.getElementById('dark-mode-toggle'); // Cambiar 'dark-mode-btn' por 'dark-mode-toggle'
    if (darkModeBtn) {
        darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
        darkModeBtn.title = isDarkMode ? 'Modo claro' : 'Modo oscuro';
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }
}

// ===== FUNCIONES DE TUTORIAL =====
function startTutorial() {
    currentTutorialStep = 0;
    showTutorialStep();
}

function showTutorialStep() {
    const overlay = document.getElementById('tutorial-overlay');
    const title = document.getElementById('tutorial-title');
    const text = document.getElementById('tutorial-text');
    const progress = document.getElementById('tutorial-progress');
    const prevBtn = document.getElementById('tutorial-prev');
    const nextBtn = document.getElementById('tutorial-next');
    
    if (currentTutorialStep >= tutorialSteps.length) {
        closeTutorial();
        return;
    }
    
    const step = tutorialSteps[currentTutorialStep];
    
    title.textContent = step.title;
    text.textContent = step.text;
    progress.textContent = `${currentTutorialStep + 1} / ${tutorialSteps.length}`;
    
    prevBtn.style.display = currentTutorialStep > 0 ? 'inline-block' : 'none';
    nextBtn.textContent = currentTutorialStep === tutorialSteps.length - 1 ? 'Finalizar' : 'Siguiente ➡️';
    
    // Resaltar elemento objetivo
    highlightTutorialTarget(step.target);
    
    overlay.style.display = 'flex';
}

function highlightTutorialTarget(selector) {
    // Remover highlight anterior
    document.querySelectorAll('.tutorial-highlight-active').forEach(el => {
        el.classList.remove('tutorial-highlight-active');
    });
    
    // Agregar highlight al nuevo elemento
    const target = document.querySelector(selector);
    if (target) {
        target.classList.add('tutorial-highlight-active');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function nextTutorialStep() {
    currentTutorialStep++;
    showTutorialStep();
}

function prevTutorialStep() {
    if (currentTutorialStep > 0) {
        currentTutorialStep--;
        showTutorialStep();
    }
}

function closeTutorial() {
    document.getElementById('tutorial-overlay').style.display = 'none';
    document.querySelectorAll('.tutorial-highlight-active').forEach(el => {
        el.classList.remove('tutorial-highlight-active');
    });
    localStorage.setItem('predicaPro_tutorialCompleted', 'true');
}

function skipTutorial() {
    closeTutorial();
    showEnhancedNotification('Tutorial omitido. Puedes reiniciarlo desde el menú de ayuda.', 'info');
}

// ===== FUNCIONES DE NOTIFICACIONES MEJORADAS =====
function showEnhancedNotification(message, type = 'info', duration = 4000) {
    const notification = {
        id: Date.now(),
        message,
        type,
        duration
    };
    
    notificationQueue.push(notification);
    
    if (!isShowingNotification) {
        processNotificationQueue();
    }
}

function processNotificationQueue() {
    if (notificationQueue.length === 0) {
        isShowingNotification = false;
        return;
    }
    
    isShowingNotification = true;
    const notification = notificationQueue.shift();
    
    const container = document.getElementById('notification-container');
    const notificationEl = document.createElement('div');
    notificationEl.className = `notification ${notification.type}`;
    notificationEl.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(notification.type)}</span>
            <span class="notification-message">${notification.message}</span>
            <button class="notification-close" onclick="closeNotification(this)">✖️</button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    container.appendChild(notificationEl);
    
    // Animar entrada
    setTimeout(() => notificationEl.classList.add('show'), 100);
    
    // Auto-cerrar
    setTimeout(() => {
        closeNotification(notificationEl.querySelector('.notification-close'));
    }, notification.duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}

function closeNotification(closeBtn) {
    const notification = closeBtn.closest('.notification');
    notification.classList.remove('show');
    
    setTimeout(() => {
        notification.remove();
        processNotificationQueue();
    }, 300);
}

// ===== FUNCIONES DE ATAJOS DE TECLADO =====
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const key = [];
        if (e.ctrlKey) key.push('Ctrl');
        if (e.altKey) key.push('Alt');
        if (e.shiftKey) key.push('Shift');
        key.push(e.key);
        
        const shortcut = key.join('+');
        
        if (keyboardShortcuts[shortcut]) {
            e.preventDefault();
            keyboardShortcuts[shortcut]();
        }
        
        // Mostrar ayuda con F1
        if (e.key === 'F1') {
            e.preventDefault();
            showKeyboardShortcuts();
        }
        
        // Cerrar modales con Escape
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function showKeyboardShortcuts() {
    const modal = document.getElementById('keyboard-shortcuts-help');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    closeTutorial();
}

// ===== FUNCIONES DE DRAG AND DROP =====
function initializeDragAndDrop() {
    const dropZone = document.getElementById('drop-zone');
    const body = document.body;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        body.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        body.addEventListener(eventName, () => {
            dropZone.style.display = 'flex';
            dropZone.classList.add('drag-over');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        body.addEventListener(eventName, () => {
            dropZone.style.display = 'none';
            dropZone.classList.remove('drag-over');
        }, false);
    });
    
    body.addEventListener('drop', handleDrop, false);
}

function handleDrop(e) {
    const files = e.dataTransfer.files;
    
    if (files.length > 0) {
        const file = files[0];
        
        if (file.type === 'application/json' || file.name.endsWith('.json')) {
            importSermonFromFile(file);
        } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            importTextFromFile(file);
        } else {
            showEnhancedNotification('Tipo de archivo no soportado. Usa archivos .json o .txt', 'error');
        }
    }
}

function importSermonFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const sermonData = JSON.parse(e.target.result);
            loadSermonData(sermonData);
            showEnhancedNotification('📥 Sermón importado exitosamente', 'success');
        } catch (error) {
            showEnhancedNotification('❌ Error al importar archivo JSON', 'error');
        }
    };
    reader.readAsText(file);
}

function importTextFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        sermonBodyInput.value = content;
        updatePreview();
        showEnhancedNotification('📄 Texto importado al cuerpo del sermón', 'success');
    };
    reader.readAsText(file);
}

// ===== FUNCIONES DE EXPORTACIÓN MEJORADAS =====
function exportToTXT() {
    const content = generateSermonText();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sermonTitleInput.value || 'sermon'}.txt`;
    a.click();
    
    URL.revokeObjectURL(url);
    showEnhancedNotification('📄 Sermón exportado como TXT', 'success');
}

function exportToHTML() {
    const content = generateSermonHTML();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sermonTitleInput.value || 'sermon'}.html`;
    a.click();
    
    URL.revokeObjectURL(url);
    showEnhancedNotification('🌐 Sermón exportado como HTML', 'success');
}

function exportToDOCX() {
    // Para DOCX necesitarías una librería como docx.js
    showEnhancedNotification('🚧 Exportación a DOCX próximamente disponible', 'info');
}

function generateSermonText() {
    return `
TÍTULO: ${sermonTitleInput.value}
TEMA: ${sermonThemeInput.value}
TEXTO BÍBLICO: ${sermonTextInput.value}

PROPÓSITO:
${sermonPurposeInput.value}

INTRODUCCIÓN:
${sermonIntroInput.value}

CUERPO:
${sermonBodyInput.value}

CONCLUSIÓN:
${sermonConclusionInput.value}

---
Generado con Predica PRO
`;
}

function generateSermonHTML() {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${sermonTitleInput.value}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #3f51b5; }
        h2 { color: #666; margin-top: 30px; }
        .meta { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>${sermonTitleInput.value}</h1>
    <div class="meta">
        <strong>Tema:</strong> ${sermonThemeInput.value}<br>
        <strong>Texto Bíblico:</strong> ${sermonTextInput.value}
    </div>
    
    <h2>Propósito</h2>
    <p>${sermonPurposeInput.value.replace(/\n/g, '<br>')}</p>
    
    <h2>Introducción</h2>
    <p>${sermonIntroInput.value.replace(/\n/g, '<br>')}</p>
    
    <h2>Cuerpo</h2>
    <p>${sermonBodyInput.value.replace(/\n/g, '<br>')}</p>
    
    <h2>Conclusión</h2>
    <p>${sermonConclusionInput.value.replace(/\n/g, '<br>')}</p>
    
    <footer style="margin-top: 50px; text-align: center; color: #999;">
        <small>Generado con Predica PRO</small>
    </footer>
</body>
</html>
`;
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar funcionalidades existentes
    changeFont();
    changeFontSize();
    changeTheme();
    changeTextColor();
    changeBackgroundColor();
    changeLineHeight();
    updateSermonsList();
    updateWordCounts();
    
    // Inicializar nuevas funcionalidades
    initializeDarkMode();
    initializeKeyboardShortcuts();
    initializeDragAndDrop();
    
    // Mostrar tutorial si es la primera vez
    if (!localStorage.getItem('predicaPro_tutorialCompleted')) {
        setTimeout(startTutorial, 1000);
    }
    
    // Event listeners para nuevas funcionalidades
    const tutorialBtn = document.getElementById('tutorial-start');
    if (tutorialBtn) tutorialBtn.addEventListener('click', startTutorial);
    
    const tutorialClose = document.getElementById('tutorial-close');
    if (tutorialClose) tutorialClose.addEventListener('click', closeTutorial);
    
    const tutorialNext = document.getElementById('tutorial-next');
    if (tutorialNext) tutorialNext.addEventListener('click', nextTutorialStep);
    
    const tutorialPrev = document.getElementById('tutorial-prev');
    if (tutorialPrev) tutorialPrev.addEventListener('click', prevTutorialStep);
    
    const tutorialSkip = document.getElementById('tutorial-skip');
    if (tutorialSkip) tutorialSkip.addEventListener('click', skipTutorial);
    
    const closeBibleModalBtn = document.getElementById('close-bible-modal');
    if (closeBibleModalBtn) {
        closeBibleModalBtn.addEventListener('click', closeBibleSearchModal);
    }
    
    // Event listeners para atajos de teclado
    const shortcutsHelpBtn = document.getElementById('shortcuts-help');
    if (shortcutsHelpBtn) shortcutsHelpBtn.addEventListener('click', showKeyboardShortcuts);
    
    const closeShortcutsBtn = document.getElementById('close-shortcuts-help');
    if (closeShortcutsBtn) closeShortcutsBtn.addEventListener('click', () => {
        document.getElementById('keyboard-shortcuts-help').style.display = 'none';
    });
    
    // Event listeners para exportación
    const exportTxtBtn = document.getElementById('export-txt-btn');
    if (exportTxtBtn) exportTxtBtn.addEventListener('click', exportToTXT);
    
    const exportHtmlBtn = document.getElementById('export-html-btn');
    if (exportHtmlBtn) exportHtmlBtn.addEventListener('click', exportToHTML);
    
    const exportDocxBtn = document.getElementById('export-docx-btn');
    if (exportDocxBtn) exportDocxBtn.addEventListener('click', exportToDOCX);
    
    // Event listeners para gestión de sermones
    const newSermonBtn = document.getElementById('new-sermon-btn');
    if (newSermonBtn) newSermonBtn.addEventListener('click', createNewSermon);
    
    const deleteSermonBtn = document.getElementById('delete-sermon-btn');
    if (deleteSermonBtn) deleteSermonBtn.addEventListener('click', () => {
        const sermonSelect = document.getElementById('sermon-list');
        if (sermonSelect && sermonSelect.value) {
            deleteSermon(sermonSelect.value);
        }
    });
    
    const sermonSelect = document.getElementById('sermon-list');
    if (sermonSelect) {
        sermonSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                loadSpecificSermon(e.target.value);
            }
        });
    }
    
    // Event listeners para búsqueda bíblica
    const bibleSearchBtn = document.getElementById('bible-search-btn');
    if (bibleSearchBtn) {
        bibleSearchBtn.addEventListener('click', async () => {
            const query = document.getElementById('bible-search-input').value;
            if (query.trim()) {
                const results = await searchBibleVerse(query);
                showBibleSearchResults(results);
            }
        });
    }
    
    const bibleSearchInput = document.getElementById('bible-search-input');
    if (bibleSearchInput) {
        bibleSearchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value;
                if (query.trim()) {
                    const results = await searchBibleVerse(query);
                    showBibleSearchResults(results);
                }
            }
        });
    }
    
    // Event listeners para temporizador
    const timerBtn = document.getElementById('timer-toggle');
    if (timerBtn) timerBtn.addEventListener('click', toggleTimer);
    
    const resetTimerBtn = document.getElementById('timer-reset');
    if (resetTimerBtn) resetTimerBtn.addEventListener('click', resetTimer);
    
    const setTargetBtn = document.getElementById('target-time');
    if (setTargetBtn) setTargetBtn.addEventListener('click', setTargetTime);
    
    // Cargar tiempo objetivo guardado
    const savedTargetTime = localStorage.getItem('predicaPro_targetTime');
    if (savedTargetTime) {
        document.getElementById('target-time').textContent = `Objetivo: ${formatTime(parseInt(savedTargetTime))}`;
    }
});

