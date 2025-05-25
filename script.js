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

// Función para actualizar la vista previa
function updatePreview() {
    // Actualizar contenido
    previewTitle.textContent = sermonTitleInput.value || 'Título de la Predicación';
    previewTheme.textContent = 'Tema: ' + (sermonThemeInput.value || '');
    previewText.textContent = 'Texto Bíblico: ' + (sermonTextInput.value || '');
    previewPurpose.textContent = sermonPurposeInput.value || '';
    previewIntro.textContent = sermonIntroInput.value || '';
    previewBody.textContent = sermonBodyInput.value || '';
    previewConclusion.textContent = sermonConclusionInput.value || '';

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
    document.body.classList.remove('dark-theme', 'sepia-theme', 'blue-theme', 'green-theme');
    
    // Aplicar nuevo tema
    if (themeSelect.value !== 'light') {
        document.body.classList.add(themeSelect.value + '-theme');
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

// Event listeners
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