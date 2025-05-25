// Importar jsPDF desde CDN (ya incluido en el HTML)
const { jsPDF } = window.jspdf;

// Función para generar PDF
async function generatePDF() {
    // Primero asegurarse de que la vista previa esté actualizada
    updatePreview();
    
    // Obtener el elemento de vista previa
    const sermonPreview = document.getElementById('sermon-preview');
    
    // Crear una instancia de jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Obtener el título para el nombre del archivo
    const title = document.getElementById('sermon-title').value || 'Predicacion';
    
    try {
        // Usar html2canvas para convertir el HTML a una imagen
        const canvas = await html2canvas(sermonPreview, {
            scale: 2, // Mayor escala para mejor calidad
            useCORS: true,
            logging: false
        });
        
        // Obtener dimensiones del canvas y PDF
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        // Calcular la escala para ajustar el contenido al PDF
        const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
        const scaledWidth = canvasWidth * ratio;
        const scaledHeight = canvasHeight * ratio;
        
        // Centrar en la página
        const x = (pdfWidth - scaledWidth) / 2;
        const y = 10; // Margen superior
        
        // Añadir la imagen al PDF
        pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);
        
        // Si el contenido es más largo que una página, añadir más páginas
        if (scaledHeight > pdfHeight - 20) { // 20mm de margen total
            const pageCount = Math.ceil(scaledHeight / (pdfHeight - 20));
            
            for (let i = 1; i < pageCount; i++) {
                pdf.addPage();
                pdf.addImage(
                    imgData, 
                    'JPEG', 
                    x, 
                    y - (pdfHeight - 20) * i, 
                    scaledWidth, 
                    scaledHeight
                );
            }
        }
        
        // Guardar el PDF
        pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
        
        // Mostrar mensaje de éxito
        alert('¡PDF generado con éxito!');
        
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        alert('Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.');
    }
}

// Event listener para el botón de generar PDF
document.addEventListener('DOMContentLoaded', () => {
    const generatePdfBtn = document.getElementById('generate-pdf-btn');
    if (generatePdfBtn) {
        generatePdfBtn.addEventListener('click', generatePDF);
    }
});