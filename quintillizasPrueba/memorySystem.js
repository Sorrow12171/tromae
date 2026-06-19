// Sistema de Memorias - Guarda momentos especiales con imágenes
// Permite guardar memorias con nombre, imagen (URL directa, clipboard o subida desde PC)
// y editar nombre y foto de las memorias guardadas

const MemorySystem = {
    STORAGE_KEY: 'quinti_memories_list',
    MEMORY_PREFIX: 'quinti_memory_',
    
    /**
     * Inicializa el sistema de memorias
     */
    init() {
        this.loadMemoriesList();
        console.log('✅ Sistema de Memorias inicializado');
    },
    
    /**
     * Obtiene la lista de IDs de memorias guardadas
     * @returns {Array} Lista de IDs de memorias
     */
    loadMemoriesList() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },
    
    /**
     * Guarda la lista de IDs de memorias
     * @param {Array} memoryIds - Lista de IDs de memorias
     */
    saveMemoriesList(memoryIds) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(memoryIds));
    },
    
    /**
     * Genera una clave única para una memoria
     * @param {string} memoryId - ID de la memoria
     * @returns {string} Clave para localStorage
     */
    getMemoryKey(memoryId) {
        return `${this.MEMORY_PREFIX}${memoryId}`;
    },
    
    /**
     * Genera un ID único para una nueva memoria
     * @returns {string} ID único
     */
    generateMemoryId() {
        return `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    /**
     * Guarda una nueva memoria
     * @param {Object} memoryData - Datos de la memoria
     * @returns {Object|null} Memoria guardada o null si falló
     */
    saveMemory(memoryData) {
        try {
            const memoryId = this.generateMemoryId();
            
            const memory = {
                id: memoryId,
                nombre: memoryData.nombre || 'Memoria sin nombre',
                imagen: memoryData.imagen || null,
                descripcion: memoryData.descripcion || '',
                fechaCreacion: Date.now(),
                fechaModificacion: Date.now(),
                version: '1.0'
            };
            
            const serialized = JSON.stringify(memory);
            
            // Verificar tamaño
            if (serialized.length > 4 * 1024 * 1024) {
                console.warn('La memoria es demasiado grande para guardar.');
                alert('⚠️ La imagen es demasiado grande. Por favor usa una imagen más pequeña.');
                return null;
            }
            
            localStorage.setItem(memoryId, serialized);
            
            // Actualizar lista de memorias
            let memoriesList = this.loadMemoriesList();
            memoriesList.push(memoryId);
            this.saveMemoriesList(memoriesList);
            
            console.log(`✅ Memoria guardada: ${memoryId}`);
            return memory;
        } catch (error) {
            console.error('Error al guardar la memoria:', error);
            if (error.name === 'QuotaExceededError') {
                alert('❌ No hay espacio suficiente en el navegador para guardar esta memoria.');
            }
            return null;
        }
    },
    
    /**
     * Carga una memoria por ID
     * @param {string} memoryId - ID de la memoria
     * @returns {Object|null} Datos de la memoria o null si no existe
     */
    loadMemory(memoryId) {
        try {
            const stored = localStorage.getItem(memoryId);
            
            if (!stored) {
                console.log(`La memoria ${memoryId} no existe.`);
                return null;
            }
            
            return JSON.parse(stored);
        } catch (error) {
            console.error('Error al cargar la memoria:', error);
            return null;
        }
    },
    
    /**
     * Actualiza una memoria existente
     * @param {string} memoryId - ID de la memoria a actualizar
     * @param {Object} updates - Campos a actualizar
     * @returns {boolean} True si se actualizó exitosamente
     */
    updateMemory(memoryId, updates) {
        try {
            const memory = this.loadMemory(memoryId);
            
            if (!memory) {
                console.error(`No se encontró la memoria ${memoryId}`);
                return false;
            }
            
            // Actualizar campos permitidos
            if (updates.nombre !== undefined) {
                memory.nombre = updates.nombre;
            }
            if (updates.imagen !== undefined) {
                memory.imagen = updates.imagen;
            }
            if (updates.descripcion !== undefined) {
                memory.descripcion = updates.descripcion;
            }
            
            memory.fechaModificacion = Date.now();
            
            localStorage.setItem(memoryId, JSON.stringify(memory));
            
            console.log(`✅ Memoria actualizada: ${memoryId}`);
            return true;
        } catch (error) {
            console.error('Error al actualizar la memoria:', error);
            return false;
        }
    },
    
    /**
     * Elimina una memoria
     * @param {string} memoryId - ID de la memoria a eliminar
     * @returns {boolean} True si se eliminó exitosamente
     */
    deleteMemory(memoryId) {
        try {
            localStorage.removeItem(memoryId);
            
            // Actualizar lista de memorias
            let memoriesList = this.loadMemoriesList();
            memoriesList = memoriesList.filter(id => id !== memoryId);
            this.saveMemoriesList(memoriesList);
            
            console.log(`✅ Memoria eliminada: ${memoryId}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar la memoria:', error);
            return false;
        }
    },
    
    /**
     * Obtiene todas las memorias guardadas
     * @returns {Array} Lista de memorias
     */
    getAllMemories() {
        const memoriesList = this.loadMemoriesList();
        const memories = [];
        
        for (const memoryId of memoriesList) {
            const memory = this.loadMemory(memoryId);
            if (memory) {
                memories.push(memory);
            }
        }
        
        return memories.sort((a, b) => b.fechaCreacion - a.fechaCreacion);
    },
    
    /**
     * Renderiza el panel de memorias en el UI
     */
    renderMemoriesPanel() {
        const panel = document.getElementById('memoriesPanel');
        if (!panel) {
            console.warn('No se encontró el panel de memorias');
            return;
        }
        
        const memories = this.getAllMemories();
        
        if (memories.length === 0) {
            panel.innerHTML = `
                <div class="no-memories">
                    <p style="text-align: center; color: #C4B5FD; font-size: 16px;">
                        📭 No tienes memorias guardadas aún.<br>
                        ¡Guarda tu primer momento especial!
                    </p>
                </div>
            `;
            return;
        }
        
        let html = '<div class="memories-grid">';
        
        for (const memory of memories) {
            const fecha = new Date(memory.fechaCreacion).toLocaleString('es-ES');
            const imagenHTML = memory.imagen 
                ? `<img src="${memory.imagen}" alt="${memory.nombre}" class="memory-image">`
                : `<div class="memory-no-image">📷 Sin imagen</div>`;
            
            html += `
                <div class="memory-card" data-id="${memory.id}">
                    <div class="memory-header">
                        <h3 class="memory-title">${this.escapeHtml(memory.nombre)}</h3>
                        <button class="memory-delete-btn" onclick="MemorySystem.confirmDelete('${memory.id}')">×</button>
                    </div>
                    <div class="memory-content">
                        ${imagenHTML}
                        ${memory.descripcion ? `<p class="memory-description">${this.escapeHtml(memory.descripcion)}</p>` : ''}
                    </div>
                    <div class="memory-footer">
                        <span class="memory-date">${fecha}</span>
                        <div class="memory-actions">
                            <button class="memory-edit-btn" onclick="MemorySystem.showEditDialog('${memory.id}')">✏️ Editar</button>
                            <button class="memory-view-btn" onclick="MemorySystem.viewMemory('${memory.id}')">👁️ Ver</button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        panel.innerHTML = html;
    },
    
    /**
     * Escapa caracteres HTML para prevenir XSS
     * @param {string} text - Texto a escapar
     * @returns {string} Texto escapado
     */
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    /**
     * Muestra el diálogo para crear/editar memoria
     * @param {string|null} memoryId - ID de memoria a editar, o null para nueva
     */
    showEditDialog(memoryId = null) {
        const modal = document.getElementById('memoryEditModal');
        if (!modal) {
            console.error('No se encontró el modal de edición de memorias');
            return;
        }
        
        const titleEl = document.getElementById('memoryModalTitle');
        const nombreInput = document.getElementById('memoryNombreInput');
        const descripcionInput = document.getElementById('memoryDescripcionInput');
        const urlInput = document.getElementById('memoryUrlInput');
        const previewImg = document.getElementById('memoryPreviewImg');
        
        if (memoryId) {
            // Modo edición
            const memory = this.loadMemory(memoryId);
            if (!memory) {
                alert('❌ No se encontró la memoria');
                return;
            }
            
            if (titleEl) titleEl.textContent = '✏️ Editar Memoria';
            if (nombreInput) nombreInput.value = memory.nombre || '';
            if (descripcionInput) descripcionInput.value = memory.descripcion || '';
            if (urlInput) urlInput.value = memory.imagen || '';
            if (previewImg) {
                previewImg.src = memory.imagen || '';
                previewImg.style.display = memory.imagen ? 'block' : 'none';
            }
            
            // Guardar ID en el modal para saber que estamos editando
            modal.dataset.editingId = memoryId;
        } else {
            // Modo creación
            if (titleEl) titleEl.textContent = '➕ Nueva Memoria';
            if (nombreInput) nombreInput.value = '';
            if (descripcionInput) descripcionInput.value = '';
            if (urlInput) urlInput.value = '';
            if (previewImg) {
                previewImg.src = '';
                previewImg.style.display = 'none';
            }
            
            delete modal.dataset.editingId;
        }
        
        modal.style.display = 'flex';
    },
    
    /**
     * Cierra el modal de edición
     */
    closeEditModal() {
        const modal = document.getElementById('memoryEditModal');
        if (modal) {
            modal.style.display = 'none';
        }
    },
    
    /**
     * Guarda la memoria desde el formulario del modal
     */
    saveMemoryFromModal() {
        const modal = document.getElementById('memoryEditModal');
        const editingId = modal ? modal.dataset.editingId : null;
        
        const nombre = document.getElementById('memoryNombreInput')?.value || 'Memoria sin nombre';
        const descripcion = document.getElementById('memoryDescripcionInput')?.value || '';
        const urlImagen = document.getElementById('memoryUrlInput')?.value || '';
        
        if (editingId) {
            // Actualizar memoria existente
            const success = this.updateMemory(editingId, {
                nombre: nombre,
                descripcion: descripcion,
                imagen: urlImagen
            });
            
            if (success) {
                alert('✅ Memoria actualizada exitosamente');
                this.closeEditModal();
                this.renderMemoriesPanel();
            } else {
                alert('❌ Error al actualizar la memoria');
            }
        } else {
            // Crear nueva memoria
            const memory = this.saveMemory({
                nombre: nombre,
                descripcion: descripcion,
                imagen: urlImagen
            });
            
            if (memory) {
                alert('✅ Memoria guardada exitosamente');
                this.closeEditModal();
                this.renderMemoriesPanel();
            }
        }
    },
    
    /**
     * Confirma y elimina una memoria
     * @param {string} memoryId - ID de la memoria a eliminar
     */
    confirmDelete(memoryId) {
        const confirmed = confirm('¿Estás seguro de que quieres eliminar esta memoria?\n\nEsta acción no se puede deshacer.');
        if (confirmed) {
            const success = this.deleteMemory(memoryId);
            if (success) {
                alert('✅ Memoria eliminada exitosamente');
                this.renderMemoriesPanel();
            } else {
                alert('❌ Error al eliminar la memoria');
            }
        }
    },
    
    /**
     * Muestra una memoria en un modal de vista previa
     * @param {string} memoryId - ID de la memoria a ver
     */
    viewMemory(memoryId) {
        const memory = this.loadMemory(memoryId);
        if (!memory) {
            alert('❌ No se encontró la memoria');
            return;
        }
        
        const modal = document.getElementById('memoryViewModal');
        if (!modal) {
            console.error('No se encontró el modal de vista de memorias');
            return;
        }
        
        const titleEl = document.getElementById('memoryViewTitle');
        const imgEl = document.getElementById('memoryViewImg');
        const descEl = document.getElementById('memoryViewDesc');
        const dateEl = document.getElementById('memoryViewDate');
        
        if (titleEl) titleEl.textContent = memory.nombre;
        if (imgEl) {
            if (memory.imagen) {
                imgEl.src = memory.imagen;
                imgEl.style.display = 'block';
            } else {
                imgEl.style.display = 'none';
            }
        }
        if (descEl) {
            descEl.textContent = memory.descripcion || 'Sin descripción';
        }
        if (dateEl) {
            dateEl.textContent = new Date(memory.fechaCreacion).toLocaleString('es-ES');
        }
        
        modal.style.display = 'flex';
    },
    
    /**
     * Cierra el modal de vista de memoria
     */
    closeViewModal() {
        const modal = document.getElementById('memoryViewModal');
        if (modal) {
            modal.style.display = 'none';
        }
    },
    
    /**
     * Maneja la pegada de imagen desde el clipboard
     * @param {ClipboardEvent} event - Evento de pegado
     */
    handlePaste(event) {
        const items = event.clipboardData?.items;
        if (!items) return;
        
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                this.convertBlobToBase64(blob, (base64) => {
                    const previewImg = document.getElementById('memoryPreviewImg');
                    const urlInput = document.getElementById('memoryUrlInput');
                    
                    if (previewImg) {
                        previewImg.src = base64;
                        previewImg.style.display = 'block';
                    }
                    if (urlInput) {
                        urlInput.value = base64;
                    }
                    
                    alert('✅ Imagen pegada desde el portapapeles');
                });
                break;
            }
        }
    },
    
    /**
     * Maneja la subida de imagen desde archivo
     * @param {Event} event - Evento de cambio de input file
     */
    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Verificar tipo de archivo
        if (!file.type.startsWith('image/')) {
            alert('❌ Por favor selecciona un archivo de imagen válido');
            return;
        }
        
        // Verificar tamaño (máximo 2MB para evitar problemas con localStorage)
        if (file.size > 2 * 1024 * 1024) {
            alert('⚠️ La imagen es demasiado grande. Máximo 2MB.');
            return;
        }
        
        this.convertBlobToBase64(file, (base64) => {
            const previewImg = document.getElementById('memoryPreviewImg');
            const urlInput = document.getElementById('memoryUrlInput');
            
            if (previewImg) {
                previewImg.src = base64;
                previewImg.style.display = 'block';
            }
            if (urlInput) {
                urlInput.value = base64;
            }
            
            alert('✅ Imagen cargada exitosamente');
        });
    },
    
    /**
     * Convierte un Blob/File a Base64
     * @param {Blob} blob - Blob o File a convertir
     * @param {Function} callback - Callback con el resultado Base64
     */
    convertBlobToBase64(blob, callback) {
        const reader = new FileReader();
        reader.onload = () => {
            callback(reader.result);
        };
        reader.onerror = () => {
            console.error('Error al convertir imagen:', reader.error);
            alert('❌ Error al procesar la imagen');
        };
        reader.readAsDataURL(blob);
    },
    
    /**
     * Exporta todas las memorias a un archivo JSON
     */
    exportAllMemories() {
        const memories = this.getAllMemories();
        
        if (memories.length === 0) {
            alert('No hay memorias guardadas para exportar.');
            return;
        }
        
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            totalMemories: memories.length,
            memories: memories
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quinti_memories_backup_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert(`✅ ${memories.length} memorias exportadas exitosamente.`);
    },
    
    /**
     * Importa memorias desde un archivo JSON
     * @param {File} file - Archivo JSON a importar
     */
    importMemories(file) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const importData = JSON.parse(event.target.result);
                
                if (!importData.memories || !Array.isArray(importData.memories)) {
                    throw new Error('Formato de archivo inválido');
                }
                
                let importedCount = 0;
                
                for (const memoryData of importData.memories) {
                    // Generar nuevo ID para evitar conflictos
                    const newMemory = this.saveMemory({
                        nombre: memoryData.nombre,
                        imagen: memoryData.imagen,
                        descripcion: memoryData.descripcion
                    });
                    
                    if (newMemory) {
                        importedCount++;
                    }
                }
                
                this.renderMemoriesPanel();
                alert(`✅ Importación completada.\nImportadas: ${importedCount}`);
            } catch (error) {
                console.error('Error al importar:', error);
                alert('❌ Error al importar el archivo. Asegúrate de que sea un backup válido.');
            }
        };
        
        reader.readAsText(file);
    }
};

// Hacer el sistema accesible globalmente
window.MemorySystem = MemorySystem;

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MemorySystem.init());
} else {
    MemorySystem.init();
}
