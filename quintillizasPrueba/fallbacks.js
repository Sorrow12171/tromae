// ============================================================
//  FALLBACKS - Quintillizas Prueba
//  Archivo: fallbacks.js
//  Descripción: Sistema de reintentos multi-fase y respuestas de respaldo
// ============================================================

import { QUINT_PRUEBA_SYSTEM_MINIMO, QUINT_PRUEBA_FASE1, QUINT_PRUEBA_FASE2, QUINT_PRUEBA_FASE3, QUINT_PRUEBA_FASE4 } from './systemprompt.js';

/**
 * Mensajes de error amigables para mostrar al usuario cuando todo falla
 */
const MENSAJES_ERROR = [
    "Ups, algo salió mal. ¡Intentemos de nuevo! 😅",
    "Parece que las chicas están tímidas hoy. Prueba otra vez~",
    "Hubo un pequeño problema técnico. ¡No te rindas! 💪",
    "Las quintillizas se confundieron un poco. ¿Lo intentamos de nuevo?"
];

/**
 * Respuestas de fallback local cuando todas las fases de reintento fallan
 */
const FALLBACKS_LOCALES = [
    "*se rasca la cabeza confundida* E-eh... Creo que me perdí un poco. ¿Me repites eso? *sonríe nerviosa*",
    "*frunce el ceño* ¡Oye! Algo falló por aquí... ¡Pero estoy bien! Prueba de nuevo~",
    "*inclina la cabeza curiosa* Hm... *tamborilea los dedos* Creo que me confundí. ¿Lo intentamos de nuevo?",
];

/**
 * Obtiene un mensaje de error aleatorio para mostrar al usuario
 * @param {boolean} esDebug - Si es true, incluye detalles técnicos del error
 * @param {Error} error - Objeto de error opcional para incluir detalles
 * @returns {string} - Mensaje formateado
 */
export function obtenerMensajeError(esDebug = false, error = null) {
    const mensajeBase = MENSAJES_ERROR[Math.floor(Math.random() * MENSAJES_ERROR.length)];
    
    if (esDebug && error) {
        return `${mensajeBase} (Debug: ${error.message})`;
    }
    
    return mensajeBase;
}

/**
 * Obtiene una respuesta de fallback local aleatoria
 * @returns {string} - Respuesta de fallback
 */
export function obtenerFallbackLocal() {
    return FALLBACKS_LOCALES[Math.floor(Math.random() * FALLBACKS_LOCALES.length)];
}

/**
 * Configuración del sistema de reintentos multi-fase
 * Cada fase tiene una estrategia diferente para recuperar la respuesta JSON
 */
export const CONFIG_REINTENTOS = {
    FASE1: {
        nombre: 'Corrección JSON',
        prompts: QUINT_PRUEBA_FASE1,
        descripcion: 'Reintentos con prompts de corrección JSON sobre historial completo'
    },
    FASE2: {
        nombre: 'Historial Reducido',
        prompts: QUINT_PRUEBA_FASE2,
        descripcion: 'Reintentos con historial reducido (últimos 4 mensajes)'
    },
    FASE3: {
        nombre: 'Contexto Mínimo',
        prompts: QUINT_PRUEBA_FASE3,
        systemPrompt: QUINT_PRUEBA_SYSTEM_MINIMO,
        descripcion: 'System prompt mínimo con contexto muy reducido'
    },
    FASE4: {
        nombre: 'Prompt Agresivo',
        prompts: QUINT_PRUEBA_FASE4,
        systemPrompt: QUINT_PRUEBA_SYSTEM_MINIMO,
        descripcion: 'Ejemplos concretos de JSON para copiar formato'
    }
};

/**
 * Genera el payload de mensajes para una fase específica de reintento
 * @param {string} fase - Nombre de la fase ('FASE1', 'FASE2', 'FASE3', 'FASE4')
 * @param {Array} historialPrevio - Historial de conversación previo
 * @param {string} mensajeOriginal - Mensaje original del usuario
 * @param {string} systemPrompt - System prompt a usar
 * @param {number} indicePrompt - Índice del prompt dentro de la fase
 * @returns {Array} - Array de mensajes para enviar a la API
 */
export function generarPayloadFase(fase, historialPrevio, mensajeOriginal, systemPrompt, indicePrompt) {
    const config = CONFIG_REINTENTOS[fase];
    if (!config) {
        throw new Error(`Fase desconocida: ${fase}`);
    }
    
    const promptSeleccionado = config.prompts[indicePrompt];
    
    switch (fase) {
        case 'FASE1':
            // FASE 1: Agrega prompt de corrección al historial existente
            return [
                { role: "system", content: systemPrompt },
                ...historialPrevio.slice(-20),
                { role: "user", content: mensajeOriginal },
                { role: "user", content: promptSeleccionado }
            ];
            
        case 'FASE2':
            // FASE 2: Historial reducido (últimos 4 mensajes) + prompt de corrección
            const ultimos4 = historialPrevio.slice(-4);
            return [
                { role: "system", content: systemPrompt },
                ...ultimos4,
                { role: "user", content: mensajeOriginal },
                { role: "user", content: promptSeleccionado }
            ];
            
        case 'FASE3':
            // FASE 3: Contexto mínimo con system prompt reducido
            const ultimoMsgUser = historialPrevio.filter(m => m.role === "user").slice(-1);
            return [
                { role: "system", content: config.systemPrompt },
                ...ultimoMsgUser,
                { role: "user", content: promptSeleccionado }
            ];
            
        case 'FASE4':
            // FASE 4: Prompt agresivo directo con ejemplos
            const ultimoMsg = historialPrevio.filter(m => m.role === "user").slice(-1);
            return [
                { role: "system", content: config.systemPrompt },
                ...ultimoMsg,
                { role: "user", content: promptSeleccionado }
            ];
            
        default:
            throw new Error(`Fase no implementada: ${fase}`);
    }
}

/**
 * Obtiene el orden secuencial de las fases de reintento
 * @returns {string[]} - Array con los nombres de las fases en orden de ejecución
 */
export function getOrdenFases() {
    return ['FASE1', 'FASE2', 'FASE3', 'FASE4'];
}

/**
 * Información detallada de cada fase para logging/debugging
 * @param {string} fase - Nombre de la fase
 * @returns {object} - Información de la fase
 */
export function getInfoFase(fase) {
    const config = CONFIG_REINTENTOS[fase];
    if (!config) {
        return null;
    }
    
    return {
        nombre: config.nombre,
        descripcion: config.descripcion,
        totalPrompts: config.prompts.length,
        usaSystemMinimo: !!config.systemPrompt
    };
}

// Exportación para compatibilidad con CommonJS (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MENSAJES_ERROR,
        FALLBACKS_LOCALES,
        obtenerMensajeError,
        obtenerFallbackLocal,
        CONFIG_REINTENTOS,
        generarPayloadFase,
        getOrdenFases,
        getInfoFase
    };
}
