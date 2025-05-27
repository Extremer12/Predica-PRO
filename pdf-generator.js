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

// Función para exportar a TXT
function exportToTXT() {
    const title = document.getElementById('sermon-title').value || 'Predicación';
    const theme = document.getElementById('sermon-theme').value || '';
    const text = document.getElementById('sermon-text').value || '';
    const purpose = document.getElementById('sermon-purpose').value || '';
    const intro = document.getElementById('sermon-intro').value || '';
    const body = document.getElementById('sermon-body').value || '';
    const conclusion = document.getElementById('sermon-conclusion').value || '';
    
    const content = `${title}\n${'='.repeat(title.length)}\n\nTema: ${theme}\nTexto Bíblico: ${text}\n\nPropósito:\n${purpose}\n\nIntroducción:\n${intro}\n\nCuerpo de la Predicación:\n${body}\n\nConclusión:\n${conclusion}\n\n---\nGenerado con Predica PRO\n${new Date().toLocaleDateString('es-ES')}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Función para exportar a HTML
function exportToHTML() {
    const title = document.getElementById('sermon-title').value || 'Predicación';
    const theme = document.getElementById('sermon-theme').value || '';
    const text = document.getElementById('sermon-text').value || '';
    const purpose = document.getElementById('sermon-purpose').value || '';
    const intro = document.getElementById('sermon-intro').value || '';
    const body = document.getElementById('sermon-body').value || '';
    const conclusion = document.getElementById('sermon-conclusion').value || '';
    
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1 { color: #3f51b5; border-bottom: 2px solid #3f51b5; padding-bottom: 10px; }
        h2 { color: #666; margin-top: 30px; }
        .meta { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .section { margin: 20px 0; }
        .footer { margin-top: 40px; text-align: center; color: #999; font-size: 0.9em; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <div class="meta">
        <strong>Tema:</strong> ${theme}<br>
        <strong>Texto Bíblico:</strong> ${text}
    </div>
    
    <div class="section">
        <h2>Propósito</h2>
        <p>${purpose.replace(/\n/g, '<br>')}</p>
    </div>
    
    <div class="section">
        <h2>Introducción</h2>
        <p>${intro.replace(/\n/g, '<br>')}</p>
    </div>
    
    <div class="section">
        <h2>Cuerpo de la Predicación</h2>
        <p>${body.replace(/\n/g, '<br>')}</p>
    </div>
    
    <div class="section">
        <h2>Conclusión</h2>
        <p>${conclusion.replace(/\n/g, '<br>')}</p>
    </div>
    
    <div class="footer">
        Generado con Predica PRO - ${new Date().toLocaleDateString('es-ES')}
    </div>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


// Función mejorada para generar PDF con mejor calidad
async function generateAdvancedPDF() {
    try {
        updatePreview();
        
        const sermonPreview = document.getElementById('sermon-preview');
        const title = document.getElementById('sermon-title').value || 'Predicacion';
        const theme = document.getElementById('sermon-theme').value || '';
        
        const fileName = `${title}${theme ? '_' + theme : ''}_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}`
            .replace(/[^a-zA-Z0-9_-]/g, '_')
            .replace(/_+/g, '_');
        
        // Mostrar progreso
        showEnhancedNotification('📄 Generando PDF avanzado...', 'info', 8000);
        
        const generateBtn = document.getElementById('generate-pdf-btn');
        const originalText = generateBtn.textContent;
        generateBtn.textContent = '📄 Generando...';
        generateBtn.disabled = true;
        
        // Configuración mejorada para html2canvas
        const canvas = await html2canvas(sermonPreview, {
            scale: 4, // Mayor calidad
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            removeContainer: true,
            imageTimeout: 0,
            allowTaint: false,
            foreignObjectRendering: true,
            width: sermonPreview.scrollWidth,
            height: sermonPreview.scrollHeight
        });
        
        // Crear PDF con configuración optimizada
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true,
            precision: 16
        });
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const contentWidth = pageWidth - (margin * 2);
        const contentHeight = pageHeight - (margin * 2);
        
        // Calcular dimensiones manteniendo proporción
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Si la imagen es más alta que una página, dividir en múltiples páginas
        if (imgHeight > contentHeight) {
            const totalPages = Math.ceil(imgHeight / contentHeight);
            
            for (let i = 0; i < totalPages; i++) {
                if (i > 0) pdf.addPage();
                
                const yOffset = -(i * contentHeight);
                pdf.addImage(
                    canvas.toDataURL('image/jpeg', 0.95),
                    'JPEG',
                    margin,
                    margin + yOffset,
                    imgWidth,
                    imgHeight
                );
            }
        } else {
            pdf.addImage(
                canvas.toDataURL('image/jpeg', 0.95),
                'JPEG',
                margin,
                margin,
                imgWidth,
                imgHeight
            );
        }
        
        // Agregar metadatos
        pdf.setProperties({
            title: title,
            subject: theme,
            author: 'Predica PRO',
            creator: 'Predica PRO - Creador de Predicaciones',
            producer: 'Predica PRO'
        });
        
        // Guardar PDF
        pdf.save(`${fileName}.pdf`);
        
        showEnhancedNotification('✅ PDF generado exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al generar PDF:', error);
        showEnhancedNotification('❌ Error al generar PDF', 'error');
    } finally {
        const generateBtn = document.getElementById('generate-pdf-btn');
        generateBtn.textContent = '📄 Generar PDF';
        generateBtn.disabled = false;
    }
}