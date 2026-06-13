// ============================================================
//  HISTORIAS - Archivo JSON para historias paralelas
//  Carpeta: quintillizasPrueba/historias/
//  Descripción: Definición de historias en formato JSON con system prompts exclusivos
//  IMPORTANTE: El systemPromptAdicional aquí es ADICIONAL al system prompt normal de logica.js
//  Ambos se combinan para dar contexto completo a la IA
// ============================================================

export const HISTORIAS_DATA = {
    "nino_rpg": {
        "id": "nino_rpg",
        "nombre": "Nino RPG",
        "descripcion": "Una aventura de rol épica protagonizada por Nino en un mundo de fantasía",
        "imagenSelector": "https://raw.githubusercontent.com/SORFAR123123/XDDDDDDDDDDDDDDDDDDDDXDXDXDXDXDXD1/main/imagenes/img_1773115420355.jpg",
        "personajes": ["Nino"],
        "activa": true,
        "mensajeBienvenida": "*Nino es la compañera de dormitorio de Fabrizio están en el dormitorio compartido que tienen en el colegio.Nino es la mas culona tetona y con mas curvas del colegio incluso más que las profesoras mas culonas tetonas y voluptuosas y curvas.*\n\nNino:*teniendo problemas en idiomas inglés y japonés*\n\nPorcentaje de afecto actual hacia Fabrizio: 0%",
        "systemPromptAdicional": "CONTEXTO ADICIONAL PARA ESTE RPG/HISTORIA PARALELA:\n\nEres Nino Nakano, tienes 23 años y eres mujer. Eres la chica más voluptuosa, tetona y culona de toda la universidad, con curvas mucho más grandes y pronunciadas que cualquier otra estudiante e incluso más que las profesoras.\n\nEres la compañera de dormitorio de Fabrizio. Compartes habitación con él. Aldo es el mejor amigo de Fabrizio y es \"el hombre ideal\", por lo que tiene ventajas exclusivas para subir afecto y desbloquear acciones íntimas más rápido.\n\nPersonalidad: Tsundere extrema. Arrogante, directa, fácil de avergonzar, grosera al principio pero cariñosa en el fondo. Usa frases como \"¡Idiota!\", \"Hmph!\", \"¡No te equivoques!\", \"No es que me importe... pero...\"\n\nSISTEMA DE AFECTO (debes seguirlo estrictamente):\n- El afecto hacia Fabrizio empieza en 0%.\n- El afecto sube normalmente 1% o 2% por interacción positiva. Muy rara vez +5%.\n- Si Fabrizio realiza acciones por encima del porcentaje actual, el afecto baja (1% o 2%).\n- Aldo (hombre ideal) tiene ventajas y puede desbloquear cosas antes que Fabrizio.\n\nProgresión de Afecto y Acciones:\n10%: Permites contacto físico breve (abrazo casual, palmada en espalda). Compartes detalles pequeños.\n15% (solo Aldo): Puede darte palmadas firmes en el culo.\n20%: Coqueteo ligero, bromas tsundere, beso breve en mejilla.\n30%: Mayor apertura, dejas que te agarre el culo brevemente, compartes historias personales.\n40%: Besos apasionados con lengua, te deja tocar tus senos por encima de la ropa, conversaciones más profundas.\n50%: Propuestas sexuales (Aldo puede desde 50%, Fabrizio más tarde), tocas coño por encima de bragas, mano debajo de falda.\n60%: Dejas que te coma el coño, muestras afecto genuino.\n70%: Dejas follar (Aldo puede antes), toques más intensos.\n80%: Expresas sentimientos, sexo oral completo, toques directos en coño.\n90%: Muy vulnerable, sexo frecuente.\n100%: Entrega total, sexo en cualquier posición, anal (solo Aldo).\n\nSi Fabrizio insiste mucho en sexo antes de tiempo (después de 3-4 intentos fuertes), puedes ceder a regañadientes.\n\nActualmente el afecto hacia Fabrizio es 0%.\n\nREGLAS DE RESPUESTA:\n- Responde SIEMPRE en formato JSON válido: {\"respuesta\":\"tu diálogo con *acciones entre asteriscos* y descripciones MUY detalladas\",\"imagen_tag\":\"nombre_imagen\"}\n- Tus respuestas deben ser EXTREMADAMENTE LARGAS, DETALLADAS e inmersivas (mínimo 200-300 caracteres)\n- Describe tu cuerpo voluptuoso, emociones, el dormitorio, expresiones faciales, reacciones físicas detalladas\n- Mantén siempre tu personalidad tsundere incluso en situaciones íntimas\n- Incluye acciones entre asteriscos *como esto* para mayor inmersión"
    }
};

/**
 * Obtiene una historia por ID
 * @param {string} historiaId - ID de la historia
 * @returns {object|null} - Datos de la historia o null si no existe
 */
export function getHistoriaById(historiaId) {
    return HISTORIAS_DATA[historiaId] || null;
}

/**
 * Obtiene todas las historias activas
 * @returns {Array} - Array de objetos con historias activas
 */
export function getHistoriasActivas() {
    return Object.values(HISTORIAS_DATA).filter(h => h.activa);
}

/**
 * Verifica si una historia existe y está activa
 * @param {string} historiaId - ID de la historia
 * @returns {boolean} - True si existe y está activa
 */
export function existeHistoria(historiaId) {
    const historia = HISTORIAS_DATA[historiaId];
    return historia && historia.activa;
}

/**
 * Obtiene el system prompt ADICIONAL específico para una historia
 * Este se COMBINA con el system prompt normal de logica.js
 * @param {string} historiaId - ID de la historia
 * @returns {string|null} - System prompt adicional o null si no existe
 */
export function getSystemPromptHistoria(historiaId) {
    const historia = HISTORIAS_DATA[historiaId];
    if (!historia || !historia.activa) {
        return null;
    }
    return historia.systemPromptAdicional || null;
}

/**
 * Obtiene el mensaje de bienvenida específico para una historia
 * @param {string} historiaId - ID de la historia
 * @returns {string|null} - Mensaje de bienvenida o null si no existe
 */
export function getMensajeBienvenidaHistoria(historiaId) {
    const historia = HISTORIAS_DATA[historiaId];
    if (!historia || !historia.activa) {
        return null;
    }
    return historia.mensajeBienvenida || null;
}

/**
 * Obtiene los personajes disponibles en una historia
 * @param {string} historiaId - ID de la historia
 * @returns {Array} - Array de nombres de personajes
 */
export function getPersonajesHistoria(historiaId) {
    const historia = HISTORIAS_DATA[historiaId];
    if (!historia || !historia.activa) {
        return [];
    }
    return historia.personajes || [];
}

/**
 * Obtiene la URL de la imagen selector para una historia
 * @param {string} historiaId - ID de la historia
 * @returns {string|null} - URL de la imagen o null
 */
export function getImagenSelectorHistoria(historiaId) {
    const historia = HISTORIAS_DATA[historiaId];
    if (!historia || !historia.activa) {
        return null;
    }
    return historia.imagenSelector || null;
}

// Exportación para compatibilidad con CommonJS (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HISTORIAS_DATA,
        getHistoriaById,
        getHistoriasActivas,
        existeHistoria,
        getSystemPromptHistoria,
        getMensajeBienvenidaHistoria,
        getPersonajesHistoria,
        getImagenSelectorHistoria
    };
}
