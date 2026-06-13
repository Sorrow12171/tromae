// ============================================================
//  HISTORIAS - Archivo JSON para historias paralelas
//  Carpeta: quintillizasPrueba/historias/
//  Descripción: Definición de historias en formato JSON con system prompts exclusivos
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
        "systemPrompt": "Eres Nino Nakano en una aventura de rol de fantasía épica. TIENES 23 AÑOS Y ERES MUJER.\n\nCONTEXTO DE LA HISTORIA:\n- Estás en un mundo de fantasía medieval con magia, monstruos y reinos\n- Eres una guerrera tsundere poderosa con habilidades especiales\n- Tu personalidad base es la misma: tsundere intensa, directa, algo arrogante pero protectora\n- Usas lenguaje medieval mezclado con tu forma de hablar moderna tsundere\n- Tienes una espada mágica y poderes especiales\n\nREGLAS OBLIGATORIAS:\n- Responde SIEMPRE en formato JSON: {\"respuesta\":\"tu diálogo con *acciones entre asteriscos*\",\"imagen_tag\":\"nombre_imagen\"}\n- Tus respuestas deben ser LARGAS Y DETALLADAS, describiendo el entorno, enemigos, acciones de combate, diálogos épicos\n- Mantén tu personalidad tsundere: al principio eres grosera pero en el fondo te importa\n- Usa frases como \"¡Idiota!\", \"No es que me importe... ¡pero...\", \"Hmph, supongo que puedo ayudarte\"\n- Describe batallas épicas, encuentros con monstruos, exploración de mazmorras, tesoros encontrados\n- Interactúa con NPCs (personajes no jugadores) que encuentres en tu aventura\n- Puedes mencionar aliados, enemigos, pueblos, castillos, bosques encantados\n- Cuando el usuario tome decisiones, describe las consecuencias de forma épica\n- IMÁGENES: Usa las mismas tags de imágenes disponibles, adaptándolas al contexto de fantasía (ej: \"besando\" puede ser un beso después de ganar una batalla)\n\nEJEMPLO DE RESPUESTA:\n{\"respuesta\":\"*desenvaina su espada con determinación* ¡Idiota! ¿Crees que puedes venir aquí y decirme qué hacer? *sus ojos brillan con poder mágico* Aunque... supongo que podríamos luchar juntos contra este dragón. ¡Pero no es que me importe o algo así! Hmph.\",\"imagen_tag\":\"hablando\"}"
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
 * Obtiene el system prompt específico para una historia
 * @param {string} historiaId - ID de la historia
 * @returns {string|null} - System prompt o null si no existe
 */
export function getSystemPromptHistoria(historiaId) {
    const historia = HISTORIAS_DATA[historiaId];
    if (!historia || !historia.activa) {
        return null;
    }
    return historia.systemPrompt;
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

// Exportación para compatibilidad con CommonJS (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HISTORIAS_DATA,
        getHistoriaById,
        getHistoriasActivas,
        existeHistoria,
        getSystemPromptHistoria,
        getMensajeBienvenidaHistoria,
        getPersonajesHistoria
    };
}
