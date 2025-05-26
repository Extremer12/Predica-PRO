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
function saveSermon() {
    const sermonData = {
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
        timestamp: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('predicaPro_sermon', JSON.stringify(sermonData));
        showSaveStatus('💾 Guardado exitosamente', 'success');
    } catch (error) {
        console.error('Error al guardar:', error);
        showSaveStatus('❌ Error al guardar', 'error');
    }
}

// Función para cargar predicación desde localStorage
function loadSermon() {
    try {
        const savedData = localStorage.getItem('predicaPro_sermon');
        if (savedData) {
            const sermonData = JSON.parse(savedData);
            
            // Cargar contenido
            sermonThemeInput.value = sermonData.theme || '';
            sermonTextInput.value = sermonData.text || '';
            sermonTitleInput.value = sermonData.title || '';
            sermonPurposeInput.value = sermonData.purpose || '';
            sermonIntroInput.value = sermonData.intro || '';
            sermonBodyInput.value = sermonData.body || '';
            sermonConclusionInput.value = sermonData.conclusion || '';
            
            // Cargar estilos si existen
            if (sermonData.styles) {
                fontFamilySelect.value = sermonData.styles.fontFamily || 'Arial, sans-serif';
                fontSizeSelect.value = sermonData.styles.fontSize || '16px';
                themeSelect.value = sermonData.styles.theme || 'light';
                textColorInput.value = sermonData.styles.textColor || '#333333';
                backgroundColorInput.value = sermonData.styles.backgroundColor || '#ffffff';
                lineHeightSelect.value = sermonData.styles.lineHeight || '1.6';
                
                // Aplicar estilos
                changeFont();
                changeFontSize();
                changeTheme();
                changeTextColor();
                changeBackgroundColor();
                changeLineHeight();
            }
            
            // Actualizar vista previa
            updatePreview();
            
            showSaveStatus('📂 Cargado exitosamente', 'success');
        } else {
            showSaveStatus('❌ No hay datos guardados', 'error');
        }
    } catch (error) {
        console.error('Error al cargar:', error);
        showSaveStatus('❌ Error al cargar', 'error');
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