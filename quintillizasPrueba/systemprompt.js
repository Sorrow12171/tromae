// ============================================================
//  SYSTEM PROMPTS - Quintillizas Prueba
//  Archivo: systemprompt.js
//  Descripción: Define el system prompt base y variantes para reintentos
// ============================================================

/**
 * System prompt mínimo usado en fases avanzadas de reintento (FASE 3 y 4)
 * Este prompt debe ser corto y directo para maximizar chances de respuesta JSON
 */
export const QUINT_PRUEBA_SYSTEM_MINIMO = `Eres una chica de roleplay interactivo. Responde SOLO con JSON válido.
Formato: {"respuesta":"tu respuesta con *acciones*","imagen_tag":"nombre_imagen"}`;

/**
 * FASE 1: Prompts de corrección JSON
 * Se usan cuando la respuesta inicial no es JSON válido
 * Se agregan al historial existente como mensajes adicionales del usuario
 */
export const QUINT_PRUEBA_FASE1 = [
    "Responde SOLO con JSON valido. Sin texto fuera del JSON. Empieza con { y termina con }",
    'SOLO JSON. Formato: {"respuesta":"tu respuesta aqui con *acciones entre asteriscos*","imagen_tag":"nombre_de_imagen"}',
    "Tu respuesta anterior no fue JSON valido. Intenta de nuevo. SOLO el JSON, nada mas.",
    "JSON VALIDO UNICAMENTE. Empieza con { — no con texto, no con explicaciones.",
];

/**
 * FASE 2: Prompts con historial reducido
 * Similar a FASE 1 pero se usa con un historial más corto (últimos 4 mensajes)
 */
export const QUINT_PRUEBA_FASE2 = [
    'Responde en JSON. {"respuesta":"respuesta aqui con *acciones*","imagen_tag":"nombre_imagen"}',
    "SOLO JSON valido. Sin markdown. Sin texto extra. Empieza con {",
    "Por favor responde unicamente con el JSON solicitado. Nada de texto adicional.",
    "JSON. Solo JSON. Empieza con { termina con }",
];

/**
 * FASE 3: Prompts de contexto mínimo
 * Mensajes muy cortos para intentar obtener respuesta con mínimo contexto
 */
export const QUINT_PRUEBA_FASE3 = ["responde", "continua", "ok"];

/**
 * FASE 4: Prompts agresivos directos
 * Ejemplos concretos de JSON para que el modelo copie el formato
 */
export const QUINT_PRUEBA_FASE4 = [
    'JSON solo: {"respuesta":"tu respuesta","imagen_tag":"normal"}',
    '{"respuesta":"Hola, ¿cómo estás? *sonríe amablemente*","imagen_tag":"hablando"}',
];

/**
 * Genera el system prompt completo para el intento inicial
 * @param {string} personalidad - Descripción de la personalidad de la chica
 * @param {string[]} tagsImagen - Array con los tags de imágenes disponibles
 * @returns {string} - System prompt completo
 */
export function generarSystemPrompt(personalidad, tagsImagen = []) {
    const instruccionImagen = tagsImagen.length > 0
        ? `\nIMÁGENES DISPONIBLES: ${tagsImagen.join(', ')}. Debes incluir "imagen_tag" con UNA de estas opciones según lo que esté haciendo el personaje.`
        : '';
    
    return `${personalidad}${instruccionImagen}\n\nFORMATO DE RESPUESTA OBLIGATORIO - JSON:\n{"respuesta":"tu diálogo con *acciones entre asteriscos*","imagen_tag":"nombre_de_una_imagen_disponible"}`;
}

// Exportación para compatibilidad con CommonJS (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        QUINT_PRUEBA_SYSTEM_MINIMO,
        QUINT_PRUEBA_FASE1,
        QUINT_PRUEBA_FASE2,
        QUINT_PRUEBA_FASE3,
        QUINT_PRUEBA_FASE4,
        generarSystemPrompt
    };
}
