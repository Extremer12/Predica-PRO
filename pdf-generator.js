// Importar jsPDF desde CDN (ya incluido en el HTML)
const { jsPDF } = window.jspdf;

// Función para generar PDF
// REEMPLAZAR la función generatePDF existente:
async function generatePDF() {
    // Primero asegurarse de que la vista previa esté actualizada
    updatePreview();
    
    // Obtener el elemento de vista previa
    const sermonPreview = document.getElementById('sermon-preview');
    
    // Obtener el título para el nombre del archivo
    const title = document.getElementById('sermon-title').value || 'Predicacion';
    const theme = document.getElementById('sermon-theme').value || '';
    
    // Crear nombre de archivo más descriptivo
    const fileName = `${title}${theme ? '_' + theme : ''}_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}`
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .replace(/_+/g, '_');
    
    try {
        // Mostrar indicador de carga
        const generateBtn = document.getElementById('generate-pdf-btn');
        const originalText = generateBtn.textContent;
        generateBtn.textContent = '📄 Generando PDF...';
        generateBtn.disabled = true;
        
        // Crear una instancia de jsPDF con mejor configuración
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });
        
        // Configurar márgenes
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        const contentWidth = pageWidth - (margin * 2);
        const contentHeight = pageHeight - (margin * 2);
        
        // Usar html2canvas con configuración optimizada
        const canvas = await html2canvas(sermonPreview, {
            scale: 3, // Mayor escala para mejor calidad
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            removeContainer: true,
            imageTimeout: 0,
            height: sermonPreview.scrollHeight,
            windowHeight: sermonPreview.scrollHeight
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        // Calcular dimensiones para el PDF
        const ratio = Math.min(contentWidth / imgWidth, contentHeight / imgHeight);
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;
        
        // Si el contenido cabe en una página
        if (scaledHeight <= contentHeight) {
            const x = (pageWidth - scaledWidth) / 2;
            const y = margin;
            pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);
        } else {
            // Dividir en múltiples páginas
            const pageCount = Math.ceil(scaledHeight / contentHeight);
            
            for (let i = 0; i < pageCount; i++) {
                if (i > 0) pdf.addPage();
                
                const x = (pageWidth - scaledWidth) / 2;
                const y = margin - (contentHeight * i);
                
                pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);
            }
        }
        
        // Agregar metadatos al PDF
        pdf.setProperties({
            title: title,
            subject: theme,
            author: 'Predica PRO',
            creator: 'Predica PRO - Creador de Predicaciones',
            producer: 'jsPDF'
        });
        
        // Guardar el PDF
        pdf.save(`${fileName}.pdf`);
        
        // Restaurar botón
        generateBtn.textContent = originalText;
        generateBtn.disabled = false;
        
        // Mostrar mensaje de éxito
        alert('¡PDF generado con éxito! 📄✅');
        
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        
        // Restaurar botón en caso de error
        const generateBtn = document.getElementById('generate-pdf-btn');
        generateBtn.textContent = '📄 Generar PDF';
        generateBtn.disabled = false;
        
        alert('❌ Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.');
    }
}

// Event listener para el botón de generar PDF
document.addEventListener('DOMContentLoaded', () => {
    const generatePdfBtn = document.getElementById('generate-pdf-btn');
    if (generatePdfBtn) {
        generatePdfBtn.addEventListener('click', generatePDF);
    }
});