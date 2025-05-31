// ===== VARIABLES GLOBALES =====
// Elementos del DOM principales
const sermonForm = document.getElementById('sermon-form');
const sermonPreview = document.getElementById('sermon-preview');

// Controles de estilo
let fontFamilySelect, fontSizeSelect, themeSelect, textColorInput, backgroundColorInput, lineHeightSelect;

// Elementos de entrada del formulario
let sermonThemeInput, sermonTextInput, sermonTitleInput, sermonPurposeInput, sermonIntroInput, sermonBodyInput, sermonConclusionInput;

// Elementos de vista previa
let previewTitle, previewTheme, previewText, previewPurpose, previewIntro, previewBody, previewConclusion;

// Contadores de palabras
let themeCount, textCount, titleCount, purposeCount, introCount, bodyCount, conclusionCount;

// Variables para gestión de sermones
let sermonList = [];
let currentSermonId = null;
let autoSaveTimeout;

// Variables para funcionalidades avanzadas
let isDarkMode = localStorage.getItem('predicaPro_darkMode') === 'true';
let isLivePreview = true;
let currentTutorialStep = 0;
let notificationQueue = [];
let isShowingNotification = false;

// ===== PLANTILLAS PREDEFINIDAS =====
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

// ===== CONFIGURACIÓN DE TUTORIAL =====
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

// ===== FUNCIONES DE INICIALIZACIÓN =====
function initializeElements() {
    // Elementos de entrada del formulario
    sermonThemeInput = document.getElementById('sermon-theme');
    sermonTextInput = document.getElementById('sermon-text');
    sermonTitleInput = document.getElementById('sermon-title');
    sermonPurposeInput = document.getElementById('sermon-purpose');
    sermonIntroInput = document.getElementById('sermon-intro');
    sermonBodyInput = document.getElementById('sermon-body');
    sermonConclusionInput = document.getElementById('sermon-conclusion');

    // Elementos de vista previa
    previewTitle = document.getElementById('preview-title');
    previewTheme = document.getElementById('preview-theme');
    previewText = document.getElementById('preview-text');
    previewPurpose = document.getElementById('preview-purpose');
    previewIntro = document.getElementById('preview-intro');
    previewBody = document.getElementById('preview-body');
    previewConclusion = document.getElementById('preview-conclusion');

    // Controles de estilo
    fontFamilySelect = document.getElementById('font-family');
    fontSizeSelect = document.getElementById('font-size');
    themeSelect = document.getElementById('theme');
    textColorInput = document.getElementById('text-color');
    backgroundColorInput = document.getElementById('background-color');
    lineHeightSelect = document.getElementById('line-height');

    // Contadores de palabras
    themeCount = document.getElementById('theme-count');
    textCount = document.getElementById('text-count');
    titleCount = document.getElementById('title-count');
    purposeCount = document.getElementById('purpose-count');
    introCount = document.getElementById('intro-count');
    bodyCount = document.getElementById('body-count');
    conclusionCount = document.getElementById('conclusion-count');

    console.log('✅ Elementos inicializados correctamente');
}

// Inicialización completa al cargar DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando Predica PRO...');
    
    // Inicializar elementos
    initializeElements();
    
    // Inicializar secciones colapsables
    initializeCollapsibleSections();
    
    // Inicializar funcionalidades básicas
    updatePreview();
    updateWordCounts();
    updateSermonsList();
    
    // Inicializar modo oscuro
    initializeDarkMode();
    
    // Inicializar atajos de teclado
    initializeKeyboardShortcuts();
    
    // Inicializar drag and drop
    initializeDragAndDrop();
    
    // Event listeners para botones del header
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        console.log('✅ Dark mode toggle inicializado');
    }
    
    const tutorialStart = document.getElementById('tutorial-start');
    if (tutorialStart) {
        tutorialStart.addEventListener('click', startTutorial);
        console.log('✅ Tutorial button inicializado');
    }
    
    const shortcutsHelp = document.getElementById('shortcuts-help');
    if (shortcutsHelp) {
        shortcutsHelp.addEventListener('click', showKeyboardShortcuts);
        console.log('✅ Shortcuts help inicializado');
    }
    
    // Event listeners para gestión de sermones
    const newSermonBtn = document.getElementById('new-sermon-btn');
    if (newSermonBtn) {
        newSermonBtn.addEventListener('click', createNewSermon);
        console.log('✅ New sermon button inicializado');
    }
    
    const deleteSermonBtn = document.getElementById('delete-sermon-btn');
    if (deleteSermonBtn) {
        deleteSermonBtn.addEventListener('click', () => {
            const sermonSelect = document.getElementById('sermon-list');
            if (sermonSelect && sermonSelect.value) {
                deleteSermon(sermonSelect.value);
            }
        });
        console.log('✅ Delete sermon button inicializado');
    }
    
    const sermonSelect = document.getElementById('sermon-list');
    if (sermonSelect) {
        sermonSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                loadSpecificSermon(e.target.value);
            }
        });
        console.log('✅ Sermon select inicializado');
    }
    
    // Event listeners para plantillas
    const templateSelect = document.getElementById('template-select');
    const applyTemplateBtn = document.getElementById('apply-template-btn');
    if (templateSelect && applyTemplateBtn) {
        applyTemplateBtn.addEventListener('click', applyTemplate);
        console.log('✅ Template system inicializado');
    }
    
    // Event listeners para controles de estilo
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', changeFont);
        console.log('✅ Font family control inicializado');
    }
    
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', changeFontSize);
        console.log('✅ Font size control inicializado');
    }
    
    if (textColorInput) {
        textColorInput.addEventListener('change', changeTextColor);
        console.log('✅ Text color control inicializado');
    }
    
    if (backgroundColorInput) {
        backgroundColorInput.addEventListener('change', changeBackgroundColor);
        console.log('✅ Background color control inicializado');
    }
    
    if (lineHeightSelect) {
        lineHeightSelect.addEventListener('change', changeLineHeight);
        console.log('✅ Line height control inicializado');
    }
    
    // Event listeners para formulario
    const inputs = [sermonThemeInput, sermonTextInput, sermonTitleInput, sermonPurposeInput, sermonIntroInput, sermonBodyInput, sermonConclusionInput];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                updateWordCounts();
                updatePreview();
                autoSave();
            });
        }
    });
    console.log('✅ Form inputs inicializados');
    
    // Event listeners para botones
    const previewBtn = document.getElementById('preview-btn');
    if (previewBtn) {
        previewBtn.addEventListener('click', updatePreview);
        console.log('✅ Preview button inicializado');
    }
    
    // Event listeners para tutorial
    const tutorialClose = document.getElementById('tutorial-close');
    const tutorialNext = document.getElementById('tutorial-next');
    const tutorialPrev = document.getElementById('tutorial-prev');
    const tutorialSkip = document.getElementById('tutorial-skip');

    if (tutorialClose) tutorialClose.addEventListener('click', closeTutorial);
    if (tutorialNext) {
        tutorialNext.addEventListener('click', () => {
            currentTutorialStep++;
            showTutorialStep();
        });
    }
    if (tutorialPrev) {
        tutorialPrev.addEventListener('click', () => {
            if (currentTutorialStep > 0) {
                currentTutorialStep--;
                showTutorialStep();
            }
        });
    }
    if (tutorialSkip) tutorialSkip.addEventListener('click', closeTutorial);

    // Event listeners para modales
    const closeShortcutsHelp = document.getElementById('close-shortcuts-help');
    if (closeShortcutsHelp) {
        closeShortcutsHelp.addEventListener('click', () => {
            const modal = document.getElementById('keyboard-shortcuts-help');
            if (modal) modal.style.display = 'none';
        });
    }

    const closeBibleModal = document.getElementById('close-bible-modal');
    if (closeBibleModal) {
        closeBibleModal.addEventListener('click', () => {
            const modal = document.getElementById('bible-search-modal');
            if (modal) modal.style.display = 'none';
        });
    }

    const bibleSearchBtn = document.getElementById('bible-search-btn');
    if (bibleSearchBtn) {
        bibleSearchBtn.addEventListener('click', () => {
            const query = document.getElementById('bible-search-input')?.value;
            if (query) {
                performBibleSearch(query);
            }
        });
    }
    
    // Aplicar estilos iniciales
    changeFont();
    changeFontSize();
    changeTheme();
    changeTextColor();
    changeBackgroundColor();
    changeLineHeight();
    
    // Mostrar tutorial si es la primera vez
    if (!localStorage.getItem('predicaPro_tutorialCompleted')) {
        setTimeout(startTutorial, 1000);
    }
    
    console.log('✅ Predica PRO inicializado completamente');
});

// ===== FUNCIONES CORREGIDAS =====

// Función para actualizar contadores de palabras
function updateWordCounts() {
    const countWords = (text) => {
        if (!text || text.trim() === '') return 0;
        return text.trim().split(/\s+/).length;
    };
    
    if (themeCount && sermonThemeInput) {
        const words = countWords(sermonThemeInput.value);
        themeCount.textContent = `${words} palabras`;
    }
    
    if (textCount && sermonTextInput) {
        const words = countWords(sermonTextInput.value);
        textCount.textContent = `${words} palabras`;
    }
    
    if (titleCount && sermonTitleInput) {
        const words = countWords(sermonTitleInput.value);
        titleCount.textContent = `${words} palabras`;
    }
    
    if (purposeCount && sermonPurposeInput) {
        const words = countWords(sermonPurposeInput.value);
        purposeCount.textContent = `${words} palabras`;
    }
    
    if (introCount && sermonIntroInput) {
        const words = countWords(sermonIntroInput.value);
        introCount.textContent = `${words} palabras`;
    }
    
    if (bodyCount && sermonBodyInput) {
        const words = countWords(sermonBodyInput.value);
        bodyCount.textContent = `${words} palabras`;
    }
    
    if (conclusionCount && sermonConclusionInput) {
        const words = countWords(sermonConclusionInput.value);
        conclusionCount.textContent = `${words} palabras`;
    }
}

// Función para inicializar secciones colapsables
function initializeCollapsibleSections() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const targetContent = document.getElementById(targetId);
            const toggle = this.querySelector('.section-toggle');
            
            if (targetContent) {
                const isActive = targetContent.classList.contains('active');
                
                // Cerrar todas las secciones
                document.querySelectorAll('.section-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.querySelectorAll('.section-toggle').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Si no estaba activa, abrirla
                if (!isActive) {
                    targetContent.classList.add('active');
                    if (toggle) {
                        toggle.classList.add('active');
                    }
                    
                    // Scroll suave a la sección
                    setTimeout(() => {
                        header.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 200);
                    
                    // Actualizar estadísticas si es la sección de estadísticas
                    if (targetId === 'statistics-content') {
                        updateAdvancedStatistics();
                    }
                }
            }
        });
    });
    
    console.log('✅ Secciones colapsables inicializadas');
}

// Funciones básicas que faltan
function updatePreview() {
    if (!previewTitle || !sermonTitleInput) return;
    
    previewTitle.textContent = sermonTitleInput.value || 'Título de la Predicación';
    previewTheme.textContent = 'Tema: ' + (sermonThemeInput.value || '');
    previewText.textContent = 'Texto Bíblico: ' + (sermonTextInput.value || '');
    previewPurpose.textContent = sermonPurposeInput.value || '';
    previewIntro.textContent = sermonIntroInput.value || '';
    previewBody.textContent = sermonBodyInput.value || '';
    previewConclusion.textContent = sermonConclusionInput.value || '';
    
    console.log('📖 Vista previa actualizada');
}

function changeFont() {
    if (fontFamilySelect && sermonPreview) {
        sermonPreview.style.fontFamily = fontFamilySelect.value;
    }
}

function changeFontSize() {
    if (fontSizeSelect && sermonPreview) {
        sermonPreview.style.fontSize = fontSizeSelect.value;
    }
}

function changeTextColor() {
    if (textColorInput && sermonPreview) {
        sermonPreview.style.color = textColorInput.value;
    }
}

function changeBackgroundColor() {
    if (backgroundColorInput && sermonPreview) {
        sermonPreview.style.backgroundColor = backgroundColorInput.value;
    }
}

function changeLineHeight() {
    if (lineHeightSelect && sermonPreview) {
        sermonPreview.style.lineHeight = lineHeightSelect.value;
    }
}

function changeTheme() {
    if (themeSelect && sermonPreview) {
        sermonPreview.classList.remove('dark', 'sepia', 'blue', 'green');
        if (themeSelect.value !== 'light') {
            sermonPreview.classList.add(themeSelect.value);
        }
    }
}

function resetStyles() {
    if (fontFamilySelect) fontFamilySelect.value = 'Arial, sans-serif';
    if (fontSizeSelect) fontSizeSelect.value = '16px';
    if (textColorInput) textColorInput.value = '#333333';
    if (backgroundColorInput) backgroundColorInput.value = '#ffffff';
    if (lineHeightSelect) lineHeightSelect.value = '1.6';
    
    changeFont();
    changeFontSize();
    changeTextColor();
    changeBackgroundColor();
    changeLineHeight();
    
    showEnhancedNotification('🔄 Estilos restablecidos', 'success');
}

// Función para gestión de sermones corregida
function createNewSermon() {
    const inputs = [sermonThemeInput, sermonTextInput, sermonTitleInput, sermonPurposeInput, sermonIntroInput, sermonBodyInput, sermonConclusionInput];
    inputs.forEach(input => {
        if (input) input.value = '';
    });
    
    currentSermonId = null;
    updatePreview();
    updateWordCounts();
    resetStyles();
    
    showEnhancedNotification('📄 Nuevo sermón creado', 'success');
}

function updateSermonsList() {
    const sermonSelect = document.getElementById('sermon-list');
    if (!sermonSelect) return;
    
    try {
        const savedSermons = JSON.parse(localStorage.getItem('predicaPro_sermons') || '[]');
        sermonSelect.innerHTML = '<option value="">-- Seleccionar sermón --</option>';
        
        savedSermons.forEach(sermon => {
            const option = document.createElement('option');
            option.value = sermon.id;
            option.textContent = `${sermon.title || sermon.theme || 'Sin título'} (${new Date(sermon.dateModified || Date.now()).toLocaleDateString()})`;
            sermonSelect.appendChild(option);
        });
        
        console.log(`📚 Lista de sermones actualizada: ${savedSermons.length} sermones`);
    } catch (error) {
        console.error('Error al cargar lista de sermones:', error);
    }
}

function applyTemplate() {
    const templateSelect = document.getElementById('template-select');
    if (!templateSelect || !templateSelect.value) return;
    
    const template = templates[templateSelect.value];
    if (!template) return;
    
    if (sermonThemeInput) sermonThemeInput.value = template.theme;
    if (sermonTextInput) sermonTextInput.value = template.text;
    if (sermonTitleInput) sermonTitleInput.value = template.title;
    if (sermonPurposeInput) sermonPurposeInput.value = template.purpose;
    if (sermonIntroInput) sermonIntroInput.value = template.intro;
    if (sermonBodyInput) sermonBodyInput.value = template.body;
    if (sermonConclusionInput) sermonConclusionInput.value = template.conclusion;
    
    updatePreview();
    updateWordCounts();
    
    showEnhancedNotification(`✅ Plantilla "${templateSelect.value}" aplicada`, 'success');
}

// Función para mostrar tutorial corregida
function showTutorialStep() {
    const overlay = document.getElementById('tutorial-overlay');
    const title = document.getElementById('tutorial-title');
    const text = document.getElementById('tutorial-text');
    const progress = document.getElementById('tutorial-progress');
    
    if (!overlay || currentTutorialStep >= tutorialSteps.length) {
        closeTutorial();
        return;
    }
    
    const step = tutorialSteps[currentTutorialStep];
    
    if (title) title.textContent = step.title;
    if (text) text.textContent = step.text;
    if (progress) progress.textContent = `${currentTutorialStep + 1} / ${tutorialSteps.length}`;
    
    overlay.style.display = 'flex';
}

function closeTutorial() {
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        localStorage.setItem('predicaPro_tutorialCompleted', 'true');
    }
}

function showKeyboardShortcuts() {
    const modal = document.getElementById('keyboard-shortcuts-help');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Función de inicialización de atajos de teclado corregida
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            autoSave();
        }
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            createNewSermon();
        }
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
        if (e.key === 'F1') {
            e.preventDefault();
            startTutorial();
        }
        if (e.key === 'Escape') {
            closeTutorial();
            // Cerrar también otros modales
            const keyboardHelp = document.getElementById('keyboard-shortcuts-help');
            const bibleModal = document.getElementById('bible-search-modal');
            if (keyboardHelp) keyboardHelp.style.display = 'none';
            if (bibleModal) bibleModal.style.display = 'none';
        }
    });
}

// Función para modo oscuro corregida
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('predicaPro_darkMode', isDarkMode);
    
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
        darkModeBtn.title = isDarkMode ? 'Modo claro' : 'Modo oscuro';
    }
    
    showEnhancedNotification(isDarkMode ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado', 'success');
}

function initializeDarkMode() {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
        darkModeBtn.title = isDarkMode ? 'Modo claro' : 'Modo oscuro';
    }
}

// ===== FUNCIONALIDAD DE SECCIONES COLAPSABLES =====

// Inicializar secciones colapsables
function initializeCollapsibleSections() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const toggle = this.querySelector('.section-toggle');
            const section = this.parentElement;
            
            // Toggle de la sección actual
            const isActive = targetContent.classList.contains('active');
            
            if (isActive) {
                // Cerrar sección
                targetContent.classList.remove('active');
                toggle.classList.remove('active');
                section.classList.remove('active');
                toggle.textContent = '▶';
            } else {
                // Abrir sección
                targetContent.classList.add('active');
                toggle.classList.add('active');
                section.classList.add('active');
                toggle.textContent = '▼';
                
                // Scroll suave hacia la sección
                setTimeout(() => {
                    section.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 200);
            }
            
            // Actualizar estadísticas si es la sección de estadísticas
            if (targetId === 'statistics-content' && !isActive) {
                updateAdvancedStatistics();
            }
        });
    });
}

// Función para actualizar estadísticas avanzadas
function updateAdvancedStatistics() {
    const totalWords = countTotalWords();
    const readingTime = Math.ceil(totalWords / 200); // 200 palabras por minuto promedio
    const progress = calculateProgress();
    
    // Actualizar UI con animaciones
    animateNumber('total-words-stat', totalWords);
    animateNumber('reading-time-stat', readingTime);
    animateNumber('progress-stat', progress, '%');
}

function countTotalWords() {
    const inputs = [
        sermonThemeInput, sermonTextInput, sermonTitleInput,
        sermonPurposeInput, sermonIntroInput, sermonBodyInput, sermonConclusionInput
    ];
    
    return inputs.reduce((total, input) => {
        return total + countWords(input?.value || '');
    }, 0);
}

function calculateProgress() {
    const inputs = [
        sermonThemeInput, sermonTextInput, sermonTitleInput,
        sermonPurposeInput, sermonIntroInput, sermonBodyInput, sermonConclusionInput
    ];
    
    const completedFields = inputs.filter(input => input?.value?.trim()).length;
    return Math.round((completedFields / inputs.length) * 100);
}

function animateNumber(elementId, targetValue, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = parseInt(element.textContent) || 0;
    const duration = 1000; // 1 segundo
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para suavizar la animación
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (targetValue - startValue) * easeOut);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = targetValue + suffix;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Función para aplicar plantilla (actualizada)
function applyTemplate() {
    const templateSelect = document.getElementById('template-select');
    if (!templateSelect || !templateSelect.value) return;

    const selectedTemplate = templateSelect.value;
    const template = templates[selectedTemplate];
    
    if (!template) return;

    if (hasUnsavedChanges() && !confirm('¿Aplicar plantilla? Los cambios actuales se perderán.')) {
        return;
    }

    // Aplicar datos de la plantilla
    if (sermonThemeInput) sermonThemeInput.value = template.theme;
    if (sermonTextInput) sermonTextInput.value = template.text;
    if (sermonTitleInput) sermonTitleInput.value = template.title;
    if (sermonPurposeInput) sermonPurposeInput.value = template.purpose;
    if (sermonIntroInput) sermonIntroInput.value = template.intro;
    if (sermonBodyInput) sermonBodyInput.value = template.body;
    if (sermonConclusionInput) sermonConclusionInput.value = template.conclusion;

    updatePreview();
    showEnhancedNotification(`✨ Plantilla "${selectedTemplate}" aplicada exitosamente`, 'success');
    autoSave();
}

// Función para detectar cambios no guardados
function hasUnsavedChanges() {
    const inputs = [sermonThemeInput, sermonTextInput, sermonTitleInput, sermonPurposeInput, sermonIntroInput, sermonBodyInput, sermonConclusionInput];
    return inputs.some(input => input?.value?.trim());
}

// Actualizar la función updateWordCounts existente
function updateWordCounts() {
    const themeWords = countWords(sermonThemeInput?.value || '');
    const textWords = countWords(sermonTextInput?.value || '');
    const titleWords = countWords(sermonTitleInput?.value || '');
    const purposeWords = countWords(sermonPurposeInput?.value || '');
    const introWords = countWords(sermonIntroInput?.value || '');
    const bodyWords = countWords(sermonBodyInput?.value || '');
    const conclusionWords = countWords(sermonConclusionInput?.value || '');
    
    const totalWords = themeWords + textWords + titleWords + purposeWords + introWords + bodyWords + conclusionWords;
    
    // Actualizar contador total existente
    if (totalWordsSpan) {
        totalWordsSpan.textContent = `Palabras totales: ${totalWords}`;
    }
    
    // Actualizar estadísticas avanzadas si la sección está abierta
    const statsContent = document.getElementById('statistics-content');
    if (statsContent && statsContent.classList.contains('active')) {
        updateAdvancedStatistics();
    }
    
    // Actualizar contadores individuales (código existente)
    if (themeCount) themeCount.textContent = `${themeWords} palabras`;
    if (textCount) textCount.textContent = `${textWords} palabras`;
    if (titleCount) titleCount.textContent = `${titleWords} palabras`;
    if (purposeCount) purposeCount.textContent = `${purposeWords} palabras`;
    if (introCount) introCount.textContent = `${introWords} palabras`;
    if (bodyCount) bodyCount.textContent = `${bodyWords} palabras`;
    if (conclusionCount) conclusionCount.textContent = `${conclusionWords} palabras`;
}

// AGREGAR AL FINAL DEL ARCHIVO EXISTENTE:

// ===== FUNCIONALIDAD DE PERSONALIZACIÓN MEJORADA =====

// Función para inicializar la personalización mejorada
function initializeEnhancedPersonalization() {
    // Event listeners para cambios en tiempo real
    const fontFamily = document.getElementById('font-family');
    const fontSize = document.getElementById('font-size');
    const lineHeight = document.getElementById('line-height');
    const textColor = document.getElementById('text-color');
    const backgroundColor = document.getElementById('background-color');
    
    // Tipografía
    if (fontFamily) {
        fontFamily.addEventListener('change', () => {
            if (isLivePreview) changeFont();
            updateColorPreview();
        });
    }
    
    if (fontSize) {
        fontSize.addEventListener('change', () => {
            if (isLivePreview) changeFontSize();
            updateColorPreview();
        });
    }
    
    // Espaciado con slider
    if (lineHeight) {
        lineHeight.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('line-height-value').textContent = value;
            document.getElementById('line-height-display').textContent = value;
            
            if (isLivePreview) {
                sermonPreview.style.lineHeight = value;
            }
        });
    }
    
    // Colores
    if (textColor) {
        textColor.addEventListener('input', (e) => {
            updateColorPreview('text-color-preview', e.target.value);
            if (isLivePreview) changeTextColor();
        });
    }
    
    if (backgroundColor) {
        backgroundColor.addEventListener('input', (e) => {
            updateColorPreview('background-color-preview', e.target.value);
            if (isLivePreview) changeBackgroundColor();
        });
    }
    
    // Temas
    initializeThemeSelector();
    
    // Botones de acción
    const resetBtn = document.getElementById('reset-styles-btn');
    const applyBtn = document.getElementById('apply-styles-btn');
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetStylesWithAnimation);
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', applyStylesWithFeedback);
    }
    
    // Inicializar valores
    updateColorPreviews();
}

// Función para actualizar previews de colores
function updateColorPreviews() {
    const textColorInput = document.getElementById('text-color');
    const backgroundColorInput = document.getElementById('background-color');
    
    if (textColorInput) {
        updateColorPreview('text-color-preview', textColorInput.value);
    }
    
    if (backgroundColorInput) {
        updateColorPreview('background-color-preview', backgroundColorInput.value);
    }
}

function updateColorPreview(previewId, color) {
    const preview = document.getElementById(previewId);
    if (preview) {
        preview.textContent = color.toUpperCase();
        preview.style.borderColor = color;
        
        // Agregar un pequeño indicador visual
        if (previewId === 'text-color-preview') {
            preview.style.color = color;
        } else {
            preview.style.background = `linear-gradient(135deg, ${color}, ${color}95)`;
        }
    }
}

// Función para inicializar selector de temas
function initializeThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    const themeInput = document.getElementById('theme');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remover clase active de todas las opciones
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Agregar clase active a la opción seleccionada
            option.classList.add('active');
            
            // Actualizar valor del input oculto
            const selectedTheme = option.getAttribute('data-theme');
            if (themeInput) {
                themeInput.value = selectedTheme;
            }
            
            // Aplicar tema si está en modo preview
            if (isLivePreview) {
                applyTheme(selectedTheme);
            }
            
            // Mostrar feedback visual
            showThemeChangeFeedback(selectedTheme);
        });
    });
}

// Función para aplicar tema
function applyTheme(themeName) {
    // Eliminar clases de tema anteriores
    sermonPreview.classList.remove('dark', 'sepia', 'blue', 'green');
    
    // Aplicar nuevo tema
    if (themeName !== 'light') {
        sermonPreview.classList.add(themeName);
        
        // Forzar la aplicación de estilos según el tema seleccionado
        switch (themeName) {
            case 'dark':
                sermonPreview.style.backgroundColor = '#2c3e50';
                sermonPreview.style.color = '#ecf0f1';
                break;
            case 'sepia':
                sermonPreview.style.backgroundColor = '#f4f1e8';
                sermonPreview.style.color = '#5c4b37';
                break;
            case 'blue':
                sermonPreview.style.backgroundColor = '#e3f2fd';
                sermonPreview.style.color = '#0d47a1';
                break;
            case 'green':
                sermonPreview.style.backgroundColor = '#e8f5e8';
                sermonPreview.style.color = '#1b5e20';
                break;
        }
    } else {
        // Tema light (por defecto)
        sermonPreview.style.backgroundColor = '#ffffff';
        sermonPreview.style.color = '#333';
    }
}

// Función para mostrar feedback de cambio de tema
function showThemeChangeFeedback(themeName) {
    const themeNames = {
        light: 'Claro',
        dark: 'Oscuro',
        sepia: 'Sepia',
        blue: 'Azul',
        green: 'Verde'
    };
    
    showEnhancedNotification(`🎨 Tema "${themeNames[themeName]}" aplicado`, 'success', 2000);
}

// Función para restablecer estilos con animación
function resetStylesWithAnimation() {
    // Mostrar confirmación
    if (!confirm('¿Restablecer todos los estilos a los valores por defecto?')) {
        return;
    }
    
    // Animación de reset
    const personalizationContent = document.querySelector('.personalization-content');
    if (personalizationContent) {
        personalizationContent.style.opacity = '0.5';
        personalizationContent.style.transform = 'scale(0.98)';
    }
    
    setTimeout(() => {
        // Restablecer valores
        document.getElementById('font-family').value = 'Arial, sans-serif';
        document.getElementById('font-size').value = '16px';
        document.getElementById('line-height').value = '1.6';
        document.getElementById('text-color').value = '#333333';
        document.getElementById('background-color').value = '#ffffff';
        document.getElementById('theme').value = 'light';
        
        // Actualizar displays
        document.getElementById('line-height-value').textContent = '1.6';
        document.getElementById('line-height-display').textContent = '1.6';
        
        // Resetear tema visual
        document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
        document.querySelector('.theme-option[data-theme="light"]').classList.add('active');
        
        // Aplicar estilos por defecto
        changeFont();
        changeFontSize();
        applyTheme('light');
        changeTextColor();
        changeBackgroundColor();
        sermonPreview.style.lineHeight = '1.6';
        
        // Actualizar previews de colores
        updateColorPreviews();
        
        // Restaurar animación
        if (personalizationContent) {
            personalizationContent.style.opacity = '1';
            personalizationContent.style.transform = 'scale(1)';
        }
        
        showEnhancedNotification('🔄 Estilos restablecidos a valores por defecto', 'success');
    }, 300);
}

// Función para aplicar estilos con feedback
function applyStylesWithFeedback() {
    // Aplicar todos los estilos
    changeFont();
    changeFontSize();
    changeTextColor();
    changeBackgroundColor();
    
    const lineHeightValue = document.getElementById('line-height').value;
    sermonPreview.style.lineHeight = lineHeightValue;
    
    const selectedTheme = document.getElementById('theme').value;
    applyTheme(selectedTheme);
    
    // Guardar estilos
    autoSave();
    
    // Feedback visual
    const applyBtn = document.getElementById('apply-styles-btn');
    if (applyBtn) {
        const originalText = applyBtn.innerHTML;
        applyBtn.innerHTML = '✅ Aplicado';
        applyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            applyBtn.innerHTML = originalText;
            applyBtn.style.background = '';
        }, 2000);
    }
    
    showEnhancedNotification('✨ Estilos aplicados exitosamente', 'success');
}

// Función para toggle de preview en vivo
function toggleLivePreview() {
    isLivePreview = !isLivePreview;
    const indicator = document.querySelector('.live-preview-indicator');
    
    if (indicator) {
        if (isLivePreview) {
            indicator.textContent = '⚡ Vista Previa en Vivo';
            indicator.style.background = 'rgba(102, 187, 106, 0.9)';
        } else {
            indicator.textContent = '⏸️ Vista Previa Pausada';
            indicator.style.background = 'rgba(156, 163, 175, 0.9)';
        }
    }
    
    showEnhancedNotification(
        isLivePreview ? 'Vista previa en vivo activada' : 'Vista previa en vivo pausada', 
        'info'
    );
}

// Agregar al evento DOMContentLoaded existente:
document.addEventListener('DOMContentLoaded', () => {
    // ... código existente ...
    
    // Inicializar personalización mejorada
    initializeEnhancedPersonalization();
    
    // Event listener para toggle de live preview (opcional)
    const livePreviewIndicator = document.querySelector('.live-preview-indicator');
    if (livePreviewIndicator) {
        livePreviewIndicator.addEventListener('click', toggleLivePreview);
        livePreviewIndicator.style.cursor = 'pointer';
        livePreviewIndicator.title = 'Click para pausar/reanudar vista previa en vivo';
    }
    
    // Event listeners para tutorial
    const tutorialClose = document.getElementById('tutorial-close');
    const tutorialNext = document.getElementById('tutorial-next');
    const tutorialPrev = document.getElementById('tutorial-prev');
    const tutorialSkip = document.getElementById('tutorial-skip');

    if (tutorialClose) {
        tutorialClose.addEventListener('click', closeTutorial);
    }

    if (tutorialNext) {
        tutorialNext.addEventListener('click', () => {
            currentTutorialStep++;
            showTutorialStep();
        });
    }

    if (tutorialPrev) {
        tutorialPrev.addEventListener('click', () => {
            if (currentTutorialStep > 0) {
                currentTutorialStep--;
                showTutorialStep();
            }
        });
    }

    if (tutorialSkip) {
        tutorialSkip.addEventListener('click', closeTutorial);
    }

    // Event listener para cerrar atajos de teclado
    const closeShortcutsHelp = document.getElementById('close-shortcuts-help');
    if (closeShortcutsHelp) {
        closeShortcutsHelp.addEventListener('click', () => {
            const modal = document.getElementById('keyboard-shortcuts-help');
            if (modal) modal.style.display = 'none';
        });
    }

    // Event listeners para modales de búsqueda bíblica
    const closeBibleModal = document.getElementById('close-bible-modal');
    if (closeBibleModal) {
        closeBibleModal.addEventListener('click', () => {
            const modal = document.getElementById('bible-search-modal');
            if (modal) modal.style.display = 'none';
        });
    }

    const bibleSearchBtn = document.getElementById('bible-search-btn');
    if (bibleSearchBtn) {
        bibleSearchBtn.addEventListener('click', () => {
            const query = document.getElementById('bible-search-input')?.value;
            if (query) {
                performBibleSearch(query);
            }
        });
    }
});

// Función de búsqueda bíblica (simulada)
function performBibleSearch(query) {
    const modal = document.getElementById('bible-search-modal');
    const results = document.getElementById('bible-search-results');
    
    if (!modal || !results) return;
    
    // Simulación de resultados
    results.innerHTML = `
        <div class="bible-result">
            <h4>${query}</h4>
            <p>Búsqueda simulada para: "${query}"</p>
            <p><em>Esta función requiere conexión a una API bíblica para funcionar completamente.</em></p>
            <button onclick="insertBibleText('${query}')">📝 Insertar en Texto Bíblico</button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function insertBibleText(text) {
    if (sermonTextInput) {
        sermonTextInput.value = text;
        updatePreview();
        updateWordCounts();
        autoSave();
    }
    
    const modal = document.getElementById('bible-search-modal');
    if (modal) modal.style.display = 'none';
    
    showEnhancedNotification('📖 Texto bíblico insertado', 'success');
}

// ===== FUNCIONES FALTANTES =====

// Función countWords que se usa en updateWordCounts
function countWords(text) {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
}

// Variables faltantes
let totalWordsSpan = null; // Esta variable se menciona pero no se define

// Función showEnhancedNotification que se usa en varias partes
function showEnhancedNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const notificationId = Date.now();
    notification.innerHTML = `
        <div class="notification-header">
            <span class="notification-title">${message}</span>
            <button class="notification-close" onclick="closeNotification(${notificationId})">✖</button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    notification.setAttribute('data-id', notificationId);
    container.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        closeNotification(notificationId);
    }, duration);
}

function closeNotification(notificationId) {
    const notification = document.querySelector(`[data-id="${notificationId}"]`);
    if (notification) {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Función de autoguardado
function autoSave() {
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    
    autoSaveTimeout = setTimeout(() => {
        const sermonData = {
            id: currentSermonId || generateId(),
            theme: sermonThemeInput?.value || '',
            text: sermonTextInput?.value || '',
            title: sermonTitleInput?.value || '',
            purpose: sermonPurposeInput?.value || '',
            intro: sermonIntroInput?.value || '',
            body: sermonBodyInput?.value || '',
            conclusion: sermonConclusionInput?.value || '',
            dateModified: new Date().toISOString()
        };
        
        try {
            let savedSermons = JSON.parse(localStorage.getItem('predicaPro_sermons') || '[]');
            const existingIndex = savedSermons.findIndex(s => s.id === sermonData.id);
            
            if (existingIndex !== -1) {
                savedSermons[existingIndex] = sermonData;
            } else {
                savedSermons.push(sermonData);
                currentSermonId = sermonData.id;
            }
            
            localStorage.setItem('predicaPro_sermons', JSON.stringify(savedSermons));
            updateSermonsList();
            
        } catch (error) {
            console.error('Error en autoguardado:', error);
        }
    }, 2000);
}

function generateId() {
    return 'sermon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Función para cargar sermón específico
function loadSpecificSermon(sermonId) {
    try {
        const savedSermons = JSON.parse(localStorage.getItem('predicaPro_sermons') || '[]');
        const sermon = savedSermons.find(s => s.id === sermonId);
        
        if (sermon) {
            if (sermonThemeInput) sermonThemeInput.value = sermon.theme || '';
            if (sermonTextInput) sermonTextInput.value = sermon.text || '';
            if (sermonTitleInput) sermonTitleInput.value = sermon.title || '';
            if (sermonPurposeInput) sermonPurposeInput.value = sermon.purpose || '';
            if (sermonIntroInput) sermonIntroInput.value = sermon.intro || '';
            if (sermonBodyInput) sermonBodyInput.value = sermon.body || '';
            if (sermonConclusionInput) sermonConclusionInput.value = sermon.conclusion || '';
            
            currentSermonId = sermonId;
            updatePreview();
            updateWordCounts();
            
            showEnhancedNotification('📂 Sermón cargado exitosamente', 'success');
        }
    } catch (error) {
        console.error('Error cargando sermón:', error);
        showEnhancedNotification('❌ Error al cargar el sermón', 'error');
    }
}

// Función para eliminar sermón
function deleteSermon(sermonId) {
    if (!confirm('¿Estás seguro de que quieres eliminar este sermón?')) {
        return;
    }
    
    try {
        let savedSermons = JSON.parse(localStorage.getItem('predicaPro_sermons') || '[]');
        savedSermons = savedSermons.filter(s => s.id !== sermonId);
        
        localStorage.setItem('predicaPro_sermons', JSON.stringify(savedSermons));
        updateSermonsList();
        
        if (currentSermonId === sermonId) {
            createNewSermon();
        }
        
        showEnhancedNotification('🗑️ Sermón eliminado exitosamente', 'success');
    } catch (error) {
        console.error('Error eliminando sermón:', error);
        showEnhancedNotification('❌ Error al eliminar el sermón', 'error');
    }
}

// Función para inicializar drag and drop
function initializeDragAndDrop() {
    const dropZone = document.getElementById('drop-zone');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        document.addEventListener(eventName, () => {
            if (dropZone) dropZone.style.display = 'flex';
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        document.addEventListener(eventName, () => {
            if (dropZone) dropZone.style.display = 'none';
        }, false);
    });
    
    document.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            handleFileImport(files[0]);
        }
    }
    
    function handleFileImport(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                if (file.name.endsWith('.json')) {
                    const data = JSON.parse(e.target.result);
                    if (data.theme || data.title) {
                        loadSermonData(data);
                        showEnhancedNotification('📥 Archivo importado exitosamente', 'success');
                    }
                } else if (file.name.endsWith('.txt')) {
                    // Importar como texto simple al cuerpo
                    if (sermonBodyInput) {
                        sermonBodyInput.value = e.target.result;
                        updatePreview();
                        updateWordCounts();
                        showEnhancedNotification('📥 Texto importado exitosamente', 'success');
                    }
                }
            } catch (error) {
                showEnhancedNotification('❌ Error al importar archivo', 'error');
                console.error('Error importing file:', error);
            }
        };
        
        if (file.name.endsWith('.json') || file.name.endsWith('.txt')) {
            reader.readAsText(file);
        } else {
            showEnhancedNotification('❌ Formato de archivo no soportado', 'error');
        }
    }
    
    function loadSermonData(data) {
        if (sermonThemeInput) sermonThemeInput.value = data.theme || '';
        if (sermonTextInput) sermonTextInput.value = data.text || '';
        if (sermonTitleInput) sermonTitleInput.value = data.title || '';
        if (sermonPurposeInput) sermonPurposeInput.value = data.purpose || '';
        if (sermonIntroInput) sermonIntroInput.value = data.intro || '';
        if (sermonBodyInput) sermonBodyInput.value = data.body || '';
        if (sermonConclusionInput) sermonConclusionInput.value = data.conclusion || '';
        
        updatePreview();
        updateWordCounts();
        autoSave();
    }
}

