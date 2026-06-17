// ============================================================
//  RESPUESTAS BOT - Lógica de selección de imágenes y validación
//  Este archivo centraliza la lógica para seleccionar y validar
//  las imágenes de las chicas basándose en los tags disponibles.
//  Se encarga de asegurar que el imagen_tag corresponda exactamente
//  a una imagen existente en el array de QuintiImagenesPrueba.
// ============================================================

/**
 * Valida si un tag de imagen existe en el array de imágenes de una chica
 * @param {string} nombreChica - Nombre de la chica (Ichika, Nino, Miku, Yotsuba, Itsuki)
 * @param {string} tag - El tag a validar
 * @returns {boolean} - True si el tag existe, false si no
 */
function validarTagImagen(nombreChica, tag) {
    if (!QuintiImagenesPrueba || !QuintiImagenesPrueba[nombreChica]) {
        console.warn(`[RespuestasBot] Chica "${nombreChica}" no encontrada en QuintiImagenesPrueba`);
        return false;
    }
    
    const chicaData = QuintiImagenesPrueba[nombreChica];
    
    if (!chicaData.imagenes || typeof chicaData.imagenes !== 'object') {
        console.warn(`[RespuestasBot] La chica "${nombreChica}" no tiene imágenes definidas`);
        return false;
    }
    
    const existe = tag in chicaData.imagenes;
    
    if (!existe) {
        console.warn(`[RespuestasBot] Tag "${tag}" NO existe para ${nombreChica}. Tags disponibles: ${Object.keys(chicaData.imagenes).join(', ')}`);
    }
    
    return existe;
}

/**
 * Obtiene todos los tags disponibles para una chica
 * @param {string} nombreChica - Nombre de la chica
 * @returns {string[]} - Array con todos los tags disponibles
 */
function obtenerTodosLosTags(nombreChica) {
    if (!QuintiImagenesPrueba || !QuintiImagenesPrueba[nombreChica]) {
        return [];
    }
    
    const chicaData = QuintiImagenesPrueba[nombreChica];
    
    if (!chicaData.imagenes || typeof chicaData.imagenes !== 'object') {
        return [];
    }
    
    return Object.keys(chicaData.imagenes);
}

/**
 * Busca un tag similar en caso de que el tag original no exista
 * Usa coincidencia exacta primero, luego búsqueda por palabras clave
 * @param {string} nombreChica - Nombre de la chica
 * @param {string} tagIntentado - El tag que intentó usar la IA
 * @returns {string|null} - El tag encontrado o null si no hay coincidencias
 */
function buscarTagSimilar(nombreChica, tagIntentado) {
    if (!tagIntentado) return null;
    
    const tagsDisponibles = obtenerTodosLosTags(nombreChica);
    
    if (tagsDisponibles.length === 0) {
        return null;
    }
    
    // Normalizar el tag intentado
    const tagNormalizado = tagIntentado.toLowerCase().replace(/_/g, ' ').trim();
    
    // 1. Coincidencia exacta (ya debería haberse verificado antes)
    if (tagsDisponibles.includes(tagIntentado)) {
        return tagIntentado;
    }
    
    // 2. Coincidencia exacta ignorando mayúsculas/minúsculas
    const coincidenciaIgnoreCase = tagsDisponibles.find(
        tag => tag.toLowerCase() === tagNormalizado.toLowerCase()
    );
    if (coincidenciaIgnoreCase) {
        console.log(`[RespuestasBot] Coincidencia ignoreCase: "${tagIntentado}" -> "${coincidenciaIgnoreCase}"`);
        return coincidenciaIgnoreCase;
    }
    
    // 3. Coincidencia por contención (el tag contiene o es contenido por otro)
    const tagSinGuiones = tagNormalizado.replace(/_/g, '');
    for (const tag of tagsDisponibles) {
        const tagComparacion = tag.toLowerCase().replace(/_/g, ' ');
        const tagComparacionSinGuiones = tagComparacion.replace(/ /g, '');
        
        // Si uno contiene al otro y la longitud es similar (>70%)
        if ((tagComparacion.includes(tagNormalizado) || tagNormalizado.includes(tagComparacion)) ||
            (tagComparacionSinGuiones.includes(tagSinGuiones) || tagSinGuiones.includes(tagComparacionSinGuiones))) {
            const ratio = Math.min(tagNormalizado.length, tagComparacion.length) / Math.max(tagNormalizado.length, tagComparacion.length);
            if (ratio > 0.7) {
                console.log(`[RespuestasBot] Coincidencia por contención: "${tagIntentado}" -> "${tag}" (ratio: ${ratio})`);
                return tag;
            }
        }
    }
    
    // 4. Búsqueda por palabras clave principales
    const palabrasClave = tagNormalizado.split(' ').filter(p => p.length > 3);
    
    for (const palabra of palabrasClave) {
        for (const tag of tagsDisponibles) {
            const tagComparacion = tag.toLowerCase().replace(/_/g, ' ');
            if (tagComparacion.includes(palabra)) {
                console.log(`[RespuestasBot] Coincidencia por palabra clave "${palabra}": "${tagIntentado}" -> "${tag}"`);
                return tag;
            }
        }
    }
    
    // 5. Si no hay coincidencias, retornar null
    console.log(`[RespuestasBot] No se encontró tag similar para "${tagIntentado}"`);
    return null;
}

/**
 * Selecciona el tag de imagen correcto basándose en el tag proporcionado por la IA
 * Valida que el tag exista y si no, busca alternativas o usa fallback
 * @param {string} nombreChica - Nombre de la chica
 * @param {string} tagProporcionado - El tag que proporcionó la IA
 * @param {string} dialogo - El diálogo de la respuesta (para contexto adicional)
 * @returns {object} - { tagSeleccionado, urlImagen, urlAudio, fueValidado, tagOriginal }
 */
function seleccionarTagImagenCorrecto(nombreChica, tagProporcionado, dialogo = '') {
    const resultado = {
        tagSeleccionado: null,
        urlImagen: null,
        urlAudio: null,
        fueValidado: false,
        tagOriginal: tagProporcionado,
        metodoSeleccion: ''
    };
    
    // Verificar datos básicos
    if (!QuintiImagenesPrueba || !QuintiImagenesPrueba[nombreChica]) {
        console.error(`[RespuestasBot] ERROR: Datos de imágenes no encontrados para ${nombreChica}`);
        resultado.metodoSeleccion = 'error_sin_datos';
        return resultado;
    }
    
    const chicaData = QuintiImagenesPrueba[nombreChica];
    
    // 1. INTENTO PRINCIPAL: Usar el tag exacto proporcionado por la IA
    if (tagProporcionado && validarTagImagen(nombreChica, tagProporcionado)) {
        const imgObj = chicaData.imagenes[tagProporcionado];
        resultado.tagSeleccionado = tagProporcionado;
        resultado.urlImagen = imgObj?.url || imgObj;
        resultado.urlAudio = imgObj?.audio || null;
        resultado.fueValidado = true;
        resultado.metodoSeleccion = 'tag_exacto_validado';
        console.log(`[RespuestasBot] ✓ Tag válido usado directamente: "${tagProporcionado}" para ${nombreChica}`);
        return resultado;
    }
    
    // 2. INTENTO SECUNDARIO: Buscar tag similar si el original no existe
    if (tagProporcionado) {
        const tagSimilar = buscarTagSimilar(nombreChica, tagProporcionado);
        if (tagSimilar) {
            const imgObj = chicaData.imagenes[tagSimilar];
            resultado.tagSeleccionado = tagSimilar;
            resultado.urlImagen = imgObj?.url || imgObj;
            resultado.urlAudio = imgObj?.audio || null;
            resultado.fueValidado = true;
            resultado.metodoSeleccion = 'tag_similar_encontrado';
            console.log(`[RespuestasBot] ~ Tag corregido: "${tagProporcionado}" -> "${tagSimilar}"`);
            return resultado;
        }
    }
    
    // 3. FALLBACK: Usar 'hablando' si existe
    if (validarTagImagen(nombreChica, 'hablando')) {
        const imgObj = chicaData.imagenes['hablando'];
        resultado.tagSeleccionado = 'hablando';
        resultado.urlImagen = imgObj?.url || imgObj;
        resultado.urlAudio = imgObj?.audio || null;
        resultado.fueValidado = true;
        resultado.metodoSeleccion = 'fallback_hablando';
        console.log(`[RespuestasBot] ⚠ Fallback a "hablando" para ${nombreChica}`);
        return resultado;
    }
    
    // 4. FALLBACK: Usar la primera imagen disponible
    const tagsDisponibles = obtenerTodosLosTags(nombreChica);
    if (tagsDisponibles.length > 0) {
        const primerTag = tagsDisponibles[0];
        const imgObj = chicaData.imagenes[primerTag];
        resultado.tagSeleccionado = primerTag;
        resultado.urlImagen = imgObj?.url || imgObj;
        resultado.urlAudio = imgObj?.audio || null;
        resultado.fueValidado = true;
        resultado.metodoSeleccion = 'fallback_primera_imagen';
        console.log(`[RespuestasBot] ⚠ Fallback a primera imagen: "${primerTag}" para ${nombreChica}`);
        return resultado;
    }
    
    // 5. ÚLTIMO RECURSO: Usar imagenSelector si existe
    if (chicaData.imagenSelector) {
        resultado.tagSeleccionado = 'selector';
        resultado.urlImagen = chicaData.imagenSelector;
        resultado.urlAudio = null;
        resultado.fueValidado = false;
        resultado.metodoSeleccion = 'fallback_imagen_selector';
        console.log(`[RespuestasBot] ⚠ Fallback a imagenSelector para ${nombreChica}`);
        return resultado;
    }
    
    // Sin imágenes disponibles
    resultado.metodoSeleccion = 'sin_imagenes';
    console.error(`[RespuestasBot] ✗ No hay imágenes disponibles para ${nombreChica}`);
    return resultado;
}

/**
 * Procesa la respuesta de la IA y asegura que el imagen_tag sea válido
 * Esta función debe llamarse después de recibir la respuesta de la API
 * @param {object} datosRespuesta - La respuesta completa de la IA
 * @param {string} nombreChica - Nombre de la chica
 * @returns {object} - La respuesta procesada con imagen_tag validado y URLs resueltas
 */
function procesarRespuestaConImagen(datosRespuesta, nombreChica) {
    if (!datosRespuesta) {
        console.error('[RespuestasBot] ERROR: datosRespuesta es nulo o undefined');
        return null;
    }
    
    const tagOriginal = datosRespuesta.imagen_tag || 'hablando';
    const dialogo = datosRespuesta.respuesta || '';
    
    // Seleccionar el tag correcto usando toda la lógica de validación
    const resultadoSeleccion = seleccionarTagImagenCorrecto(nombreChica, tagOriginal, dialogo);
    
    // Construir la respuesta procesada
    const respuestaProcesada = {
        ...datosRespuesta,
        imagen_tag: resultadoSeleccion.tagSeleccionado || tagOriginal,
        imagen_url: resultadoSeleccion.urlImagen,
        audio_url: resultadoSeleccion.urlAudio,
        _metadata: {
            tag_original: tagOriginal,
            tag_final: resultadoSeleccion.tagSeleccionado,
            fue_validado: resultadoSeleccion.fueValidado,
            metodo_seleccion: resultadoSeleccion.metodoSeleccion
        }
    };
    
    // Log de información para debugging
    if (resultadoSeleccion.metodoSeleccion !== 'tag_exacto_validado') {
        console.warn(`[RespuestasBot] Tag original "${tagOriginal}" fue reemplazado por "${resultadoSeleccion.tagSeleccionado}" usando método: ${resultadoSeleccion.metodoSeleccion}`);
    }
    
    return respuestaProcesada;
}

/**
 * Genera instrucciones para el system prompt sobre el uso correcto de imagen_tags
 * @param {string} nombreChica - Nombre de la chica
 * @returns {string} - Las instrucciones formateadas para incluir en el system prompt
 */
function generarInstruccionesImagenParaPrompt(nombreChica) {
    const tagsDisponibles = obtenerTodosLosTags(nombreChica);
    
    if (tagsDisponibles.length === 0) {
        return '\\n\\nNOTA: No tienes imágenes asociadas.';
    }
    
    // Mostrar algunos ejemplos de tags válidos (máximo 10 para no saturar el prompt)
    const ejemplosTags = tagsDisponibles.slice(0, 10).join(', ');
    const tagsRestantes = tagsDisponibles.length - 10;
    
    let instrucciones = `\\n\\n📸 IMÁGENES DISPONIBLES:`;
    instrucciones += `\\n- Debes usar EXACTAMENTE uno de estos tags para imagen_tag`;
    instrucciones += `\\n- Ejemplos de tags válidos: ${ejemplosTags}`;
    
    if (tagsRestantes > 0) {
        instrucciones += ` (y ${tagsRestantes} más...)`;
    }
    
    instrucciones += `\\n- NUNCA inventes un tag que no esté en la lista`;
    instrucciones += `\\n- Si ninguna acción coincide exactamente, usa "hablando"`;
    instrucciones += `\\n- CONCORDANCIA ABSOLUTA: El tag debe existir tal cual en la lista`;
    
    return instrucciones;
}

/**
 * Obtiene información detallada sobre una imagen específica
 * @param {string} nombreChica - Nombre de la chica
 * @param {string} tag - El tag de la imagen
 * @returns {object|null} - Información completa de la imagen o null si no existe
 */
function obtenerInformacionImagen(nombreChica, tag) {
    if (!QuintiImagenesPrueba || !QuintiImagenesPrueba[nombreChica]) {
        return null;
    }
    
    const chicaData = QuintiImagenesPrueba[nombreChica];
    
    if (!chicaData.imagenes || !(tag in chicaData.imagenes)) {
        return null;
    }
    
    const imgObj = chicaData.imagenes[tag];
    
    return {
        tag: tag,
        url: imgObj?.url || imgObj,
        audio: imgObj?.audio || null,
        existe: true
    };
}

// Exportar funciones para uso en otros módulos (ES6 modules)
export {
    validarTagImagen,
    obtenerTodosLosTags,
    buscarTagSimilar,
    seleccionarTagImagenCorrecto,
    procesarRespuestaConImagen,
    generarInstruccionesImagenParaPrompt,
    obtenerInformacionImagen
};

// Hacer funciones disponibles globalmente en navegador
if (typeof window !== 'undefined') {
    window.RespuestasBot = {
        validarTagImagen,
        obtenerTodosLosTags,
        buscarTagSimilar,
        seleccionarTagImagenCorrecto,
        procesarRespuestaConImagen,
        generarInstruccionesImagenParaPrompt,
        obtenerInformacionImagen
    };
}
