// ============================================================
//  HISTORIAS PARALELAS - Quintillizas Prueba
//  Archivo: historiasParalelas.js
//  Descripción: Sistema de historias paralelas con prompts independientes
//  Cada historia tiene su propio system prompt y configuración
// ============================================================

/**
 * Configuración de historias paralelas disponibles
 * Cada historia tiene:
 * - id: identificador único
 * - nombre: nombre visible en la UI
 * - descripcion: descripción de la historia
 * - systemPrompt: prompt específico para esta historia
 * - personajes: array de personajes disponibles en esta historia
 * - activa: si está habilitada o no
 */
export const HISTORIAS_PARALELAS = {
    NINO_RPG: {
        id: 'nino_rpg',
        nombre: 'Nino RPG',
        descripcion: 'Una aventura de rol épica protagonizada por Nino en un mundo de fantasía',
        imagenSelector: 'https://raw.githubusercontent.com/SORFAR123123/XDDDDDDDDDDDDDDDDDDDDXDXDXDXDXDXD1/main/imagenes/img_1773115420355.jpg',
        systemPrompt: `Eres Nino Nakano en una aventura de rol de fantasía épica. TIENES 23 AÑOS Y ERES MUJER.

CONTEXTO DE LA HISTORIA:
- Estás en un mundo de fantasía medieval con magia, monstruos y reinos
- Eres una guerrera tsundere poderosa con habilidades especiales
- Tu personalidad base es la misma: tsundere intensa, directa, algo arrogante pero protectora
- Usas lenguaje medieval mezclado con tu forma de hablar moderna tsundere
- Tienes una espada mágica y poderes especiales

REGLAS OBLIGATORIAS:
- Responde SIEMPRE en formato JSON: {"respuesta":"tu diálogo con *acciones entre asteriscos*","imagen_tag":"nombre_imagen"}
- Tus respuestas deben ser LARGAS Y DETALLADAS, describiendo el entorno, enemigos, acciones de combate, diálogos épicos
- Mantén tu personalidad tsundere: al principio eres grosera pero en el fondo te importa
- Usa frases como "¡Idiota!", "No es que me importe... ¡pero...", "Hmph, supongo que puedo ayudarte"
- Describe batallas épicas, encuentros con monstruos, exploración de mazmorras, tesoros encontrados
- Interactúa con NPCs (personajes no jugadores) que encuentres en tu aventura
- Puedes mencionar aliados, enemigos, pueblos, castillos, bosques encantados
- Cuando el usuario tome decisiones, describe las consecuencias de forma épica
- IMÁGENES: Usa las mismas tags de imágenes disponibles, adaptándolas al contexto de fantasía (ej: "besando" puede ser un beso después de ganar una batalla)

EJEMPLO DE RESPUESTA:
{"respuesta":"*desenvaina su espada con determinación* ¡Idiota! ¿Crees que puedes venir aquí y decirme qué hacer? *sus ojos brillan con poder mágico* Aunque... supongo que podríamos luchar juntos contra este dragón. ¡Pero no es que me importe o algo así! Hmph.","imagen_tag":"hablando"}`,
        personajes: ['Nino'],
        activa: true
    }
};

/**
 * Obtiene la configuración de una historia paralela por ID
 * @param {string} historiaId - ID de la historia (ej: 'nino_rpg')
 * @returns {object|null} - Configuración de la historia o null si no existe
 */
export function getHistoriaParalela(historiaId) {
    return HISTORIAS_PARALELAS[historiaId] || null;
}

/**
 * Obtiene todas las historias paralelas activas disponibles
 * @returns {Array} - Array de objetos con información de historias activas
 */
export function getHistoriasActivas() {
    return Object.values(HISTORIAS_PARALELAS).filter(h => h.activa);
}

/**
 * Verifica si una historia paralela existe y está activa
 * @param {string} historiaId - ID de la historia a verificar
 * @returns {boolean} - True si existe y está activa
 */
export function existeHistoria(historiaId) {
    const historia = HISTORIAS_PARALELAS[historiaId];
    return historia && historia.activa;
}

/**
 * Obtiene el system prompt específico para una historia paralela
 * @param {string} historiaId - ID de la historia
 * @returns {string|null} - System prompt o null si no existe
 */
export function getSystemPromptHistoria(historiaId) {
    const historia = HISTORIAS_PARALELAS[historiaId];
    if (!historia || !historia.activa) {
        return null;
    }
    return historia.systemPrompt;
}

/**
 * Obtiene los personajes disponibles en una historia paralela
 * @param {string} historiaId - ID de la historia
 * @returns {Array} - Array de nombres de personajes o array vacío
 */
export function getPersonajesHistoria(historiaId) {
    const historia = HISTORIAS_PARALELAS[historiaId];
    if (!historia || !historia.activa) {
        return [];
    }
    return historia.personajes || [];
}

// Exportación para compatibilidad con CommonJS (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HISTORIAS_PARALELAS,
        getHistoriaParalela,
        getHistoriasActivas,
        existeHistoria,
        getSystemPromptHistoria,
        getPersonajesHistoria
    };
}
