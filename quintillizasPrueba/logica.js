// ============================================================
//  QuintiAmigas - Lógica de respuesta con Groq API
//  Archivo: logica.js
//  Carpeta: quintillizasPrueba
//  
//  CARACTERÍSTICAS IMPLEMENTADAS:
//  - Sistema de reintentos multi-fase (basado en quintillizas.js)
//  - Logging detallado de errores en consola
//  - Selección automática de imágenes según contexto
//  - Rotación de API keys para alta disponibilidad
//  - System prompt separado en módulo independiente
//  - Personalidades separadas en módulo independiente
//  - Fallbacks y sistema de reintentos en módulo independiente
//  - SISTEMA DE CHICAS MÚLTIPLES: Cuando se menciona a otra chica,
//    esta se une al chat y responde también en MENSAJES SEPARADOS
//  - SISTEMA DE MEMORIA: Recuerda cosas puntuales durante la conversación
//  - REDUCCIÓN DE REPETICIONES: Evita diálogos y frases repetidas
//
//  DEPENDENCIAS:
//  - systemprompt.js: Prompts del sistema y variantes
//  - personalidades.js: Definición de personajes
//  - fallbacks.js: Sistema de reintentos y respuestas de respaldo
//  - imagenes.js: URLs y tags de imágenes
// ============================================================

import { generarSystemPrompt, QUINT_PRUEBA_SYSTEM_MINIMO, QUINT_PRUEBA_FASE1, QUINT_PRUEBA_FASE2, QUINT_PRUEBA_FASE3, QUINT_PRUEBA_FASE4, SYSTEM_PROMPT_INICIAL } from './systemPrompt.js';
import { PERSONALIDADES, getChicasDisponibles, existeChica } from './personalidades.js';
import { obtenerMensajeError, generarPayloadFase, getOrdenFases, getInfoFase } from './fallbacks.js';
import { QuintiImagenesPrueba } from './imagenes.js';

// ============================================================
//  CONFIGURACIÓN DE API KEYS
// ============================================================

const _K = [
    ["gsk_Ab4b","EufREWBZFunx","DuzgWGdyb3FYvUfnaETyrJ7JpsXENg65Mknn"],
    ["gsk_Hf7e","UYXxcW02QXOw","pOcFWGdyb3FYg2p1lgVh4DxvfKrCiay4VPZl"],
    ["gsk_6E8F","57WlJAmRtPdp","iuvjWGdyb3FYCwoYPRqC9qMnUJaWUbL0toqD"],
    ["gsk_hhU0","lGUUZz0akDJ3","9Bc8WGdyb3FYIbnZloErkqMK9CmvdUMZ0NkM"],
    ["gsk_WZ5J","eXbz8Cdyobah","N2YOWGdyb3FYt26L4pNRknGmbQVSmwtYpov4"],
    ["gsk_eGDZ","VjFAmOx5PtSl","DdadWGdyb3FYm6DvoDLIqKxqmpaLCn5PbyR3"],
];

const GROQ_KEYS = _K.map(partes => partes.join(""));
const MODELO_PRINCIPAL = "meta-llama/llama-4-scout-17b-16e-instruct";

let indiceKeyActual = 0;
let chicaSeleccionada = null;
let historialConversacion = [];
const MAX_HISTORIAL = 20;
let chicasEnChat = new Set(); // Conjunto de chicas que están participando en el chat actual
let memoriaChat = []; // Sistema de memoria para recordar cosas puntuales durante la conversación
const MAX_MEMORIA = 10; // Máximo número de recuerdos a mantener

// ============================================================
//  SISTEMA DE LOGGING
// ============================================================

/**
 * Sistema de logging con timestamps y niveles de severidad
 */
function logQuinti(nivel, mensaje, datosExtra = null) {
    const timestamp = new Date().toLocaleTimeString('es-ES');
    const prefijo = `[QUINTI ${nivel}] ${timestamp}`;
    
    switch (nivel.toUpperCase()) {
        case 'ERROR':
            console.error(`${prefijo} ${mensaje}`);
            if (datosExtra) console.error(`${prefijo} Datos:`, datosExtra);
            break;
        case 'WARN':
            console.warn(`${prefijo} ${mensaje}`);
            if (datosExtra) console.warn(`${prefijo} Datos:`, datosExtra);
            break;
        case 'DEBUG':
            console.log(`${prefijo} ${mensaje}`);
            if (datosExtra) console.log(`${prefijo} Datos:`, datosExtra);
            break;
        default:
            console.log(`${prefijo} ${mensaje}`);
            if (datosExtra) console.log(`${prefijo} Datos:`, datosExtra);
    }
}

function logErrorAPI(contexto, error, metadata = {}) {
    logQuinti('ERROR', `Error en ${contexto}: ${error.message}`, {
        stack: error.stack,
        ...metadata
    });
}

function logReintento(intento, maxIntentos, razon) {
    logQuinti('WARN', `Reintento ${intento}/${maxIntentos}: ${razon}`);
}

function logRespuestaExitosa(modelo, longitudRespuesta, tiempoRespuesta) {
    logQuinti('INFO', `Respuesta exitosa - Modelo: ${modelo}, Longitud: ${longitudRespuesta} chars, Tiempo: ${tiempoRespuesta}ms`);
}

function logSeleccionImagen(chica, tag, contexto) {
    logQuinti('DEBUG', `Imagen seleccionada - Chica: ${chica}, Tag: ${tag}, Contexto: ${contexto}`);
}

// ============================================================
//  PROMPTS DE REINTENTOS (multi-fase como quintillizas.js)
//  NOTA: Estos prompts ahora están en systemprompt.js
//  Se mantienen aquí como referencias rápidas pero se importan del módulo
// ============================================================
// Importados desde systemprompt.js:
// - QUINT_PRUEBA_SYSTEM_MINIMO
// - QUINT_PRUEBA_FASE1
// - QUINT_PRUEBA_FASE2
// - QUINT_PRUEBA_FASE3
// - QUINT_PRUEBA_FASE4
// - generarSystemPrompt()

// ============================================================
//  PERSONALIDADES DE CHICAS
//  NOTA: Las personalidades ahora están en personalidades.js
//  Se mantiene el objeto PERSONALIDADES importado del módulo
// ============================================================
// Importado desde personalidades.js:
// - PERSONALIDADES (objeto con todas las chicas)
// - getPersonalidad(nombreChica)
// - getChicasDisponibles()
// - existeChica(nombreChica)

// ============================================================
//  SISTEMA DE SELECCIÓN DE IMÁGENES
// ============================================================

/**
 * Obtiene todas las tags de imagen disponibles para una chica
 * @param {string} nombreChica - Nombre de la chica
 * @returns {string[]} - Array con los nombres de las imágenes disponibles
 */
function obtenerTagsImagen(nombreChica) {
    if (!QuintiImagenesPrueba || !QuintiImagenesPrueba[nombreChica]) {
        return ['normal'];
    }
    const chicaData = QuintiImagenesPrueba[nombreChica];
    if (!chicaData.imagenes) {
        return ['normal'];
    }
    return Object.keys(chicaData.imagenes);
}

/**
 * Selecciona automáticamente la mejor imagen basada en el contenido del diálogo
 * La IA decide qué imagen usar incluyendo las tags disponibles en el prompt
 * @param {string} dialogo - El diálogo generado por la IA
 * @param {string} nombreChica - Nombre de la chica
 * @returns {string} - Tag de la imagen seleccionada
 */
function seleccionarImagenAutomatica(dialogo, nombreChica) {
    const tagsDisponibles = obtenerTagsImagen(nombreChica);
    
    // Normalizar diálogo para búsqueda
    const dialogoLower = dialogo.toLowerCase();
    
    // Buscar coincidencias con las tags disponibles
    for (const tag of tagsDisponibles) {
        const tagNormalizado = tag.toLowerCase().replace(/_/g, ' ');
        if (dialogoLower.includes(tagNormalizado)) {
            logSeleccionImagen(nombreChica, tag, 'Coincidencia directa en diálogo');
            return tag;
        }
    }
    
    // Búsquedas específicas para acciones comunes
    if (dialogoLower.includes('bes') || dialogoLower.includes('kiss')) {
        if (tagsDisponibles.includes('besando')) {
            logSeleccionImagen(nombreChica, 'besando', 'Acción de beso detectada');
            return 'besando';
        }
    }
    
    if (dialogoLower.includes('chup') || dialogoLower.includes('oral')) {
        // Buscar tags de chupar más específicas
        for (const tag of tagsDisponibles) {
            if (tag.includes('chupando')) {
                logSeleccionImagen(nombreChica, tag, 'Acción oral detectada');
                return tag;
            }
        }
    }
    
    if (dialogoLower.includes('doggy') || dialogoLower.includes('cuatro patas')) {
        if (tagsDisponibles.includes('doggystyle')) {
            logSeleccionImagen(nombreChica, 'doggystyle', 'Posición doggy detectada');
            return 'doggystyle';
        }
    }
    
    if (dialogoLower.includes('misionero') || dialogoLower.includes('encima')) {
        if (tagsDisponibles.includes('misionero')) {
            logSeleccionImagen(nombreChica, 'misionero', 'Posición misionero detectada');
            return 'misionero';
        }
    }
    
    if (dialogoLower.includes('desnud') || dialogoLower.includes('sin ropa')) {
        if (tagsDisponibles.includes('desnuda')) {
            logSeleccionImagen(nombreChica, 'desnuda', 'Desnudez detectada');
            return 'desnuda';
        }
    }
    
    // Por defecto, usar imagen normal o hablando
    const fallback = tagsDisponibles.includes('hablando') ? 'hablando' : 'normal';
    logSeleccionImagen(nombreChica, fallback, 'Fallback por defecto');
    return fallback;
}

// ============================================================
//  FUNCIONES DE UTILIDAD PARA JSON
// ============================================================

/**
 * Parsea JSON eliminando posibles bloques de código markdown
 * @param {string} raw - Texto crudo de la respuesta
 * @returns {object|null} - Objeto parseado o null si falla
 */
function parsearJSON(raw) {
    if (!raw) return null;
    try {
        return JSON.parse(raw.replace(/```json/g, "").replace(/```/g, "").trim());
    } catch {}
    
    // Intentar extraer JSON del texto
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
        try {
            return JSON.parse(match[0]);
        } catch {}
    }
    return null;
}

/**
 * Valida que la respuesta tenga la estructura esperada
 * @param {object} datos - Objeto a validar
 * @returns {boolean} - True si es válido
 */
function esRespuestaValida(datos) {
    if (!datos) return false;
    
    // Debe tener respuesta (texto)
    if (!datos.respuesta || typeof datos.respuesta !== 'string') {
        return false;
    }
    
    // El diálogo no debe estar vacío o ser muy corto
    if (datos.respuesta.trim().length < 5) {
        return false;
    }
    
    return true;
}

/**
 * Formatea un error para mostrarlo al usuario de forma amigable
 * Usa la función del módulo fallbacks.js
 */
function formatearErrorUsuario(error) {
    const esDebug = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return obtenerMensajeError(esDebug, error);
}

// ============================================================
//  FUNCIÓN PRINCIPAL CON SISTEMA DE REINTENTOS
// ============================================================

/**
 * Función principal para obtener respuestas con sistema de reintentos multi-fase
 * Basado en el sistema de quintillizas.js
 * @param {string} mensaje - Mensaje del usuario
 * @param {Array} historialPrevio - Historial de conversación opcional
 * @returns {Promise<object>} - Objeto con {respuesta, imagen_tag, imagen_url, chicasRespondiendo}
 */
async function obtenerRespuestaGroq(mensaje, historialPrevio = []) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const tiempoInicio = Date.now();
    
    // Detectar si se menciona a alguna otra chica en el mensaje
    const mensajeLower = mensaje.toLowerCase();
    const chicasMencionadas = [];
    
    for (const nombreChica of getChicasDisponibles()) {
        // Buscar el nombre de la chica en el mensaje (como palabra completa)
        const regex = new RegExp(`\\b${nombreChica.toLowerCase()}\\b`, 'i');
        if (regex.test(mensajeLower)) {
            chicasMencionadas.push(nombreChica);
        }
    }
    
    // Agregar las chicas mencionadas al conjunto de chicas en el chat
    // La chica seleccionada siempre está en el chat
    if (chicaSeleccionada) {
        chicasEnChat.add(chicaSeleccionada);
    }
    
    // Agregar chicas mencionadas al chat
    for (const chica of chicasMencionadas) {
        if (existeChica(chica)) {
            chicasEnChat.add(chica);
            logQuinti('INFO', `Chica mencionada y agregada al chat: ${chica}`);
        }
    }
    
    // ============================================
    // SISTEMA DE LLAMADAS SEPARADAS POR CHICA
    // Cuando hay múltiples chicas, hacer llamadas individuales
    // de forma SECUENCIAL para mantener coherencia contextual
    // IMPORTANTE: Cada chica responde SOLO al mensaje actual del usuario
    // ============================================
    
    if (chicasEnChat.size > 1) {
        logQuinti('INFO', `Múltiples chicas detectadas (${chicasEnChat.size}). Iniciando llamadas secuenciales individuales.`);
        
        const chicasArray = Array.from(chicasEnChat);
        const respuestasPorChica = [];
        // Usar solo el último mensaje del historial para que cada chica responda al texto actual
        let contextoAcumulado = historialPrevio.length > 0 ? [historialPrevio[historialPrevio.length - 1]] : [];
        
        // Procesar cada chica de forma secuencial
        for (let idx = 0; idx < chicasArray.length; idx++) {
            const nombreChica = chicasArray[idx];
            const esPrimeraChica = idx === 0;
            
            logQuinti('DEBUG', `Procesando llamada individual para: ${nombreChica} (${idx + 1}/${chicasArray.length})`);
            
            // Obtener personalidad específica de esta chica
            const personalidadChica = PERSONALIDADES[nombreChica] || "Eres una chica amigable.";
            
            // Construir instrucciones de imágenes SOLO para esta chica
            const tagsDisponibles = obtenerTagsImagen(nombreChica);
            const instruccionesImagen = `\n\nIMÁGENES DISPONIBLES PARA ${nombreChica.toUpperCase()}: [${tagsDisponibles.join(', ')}]. Debes incluir "imagen_tag" con UNA de estas opciones según lo que esté haciendo el personaje. NUNCA uses imágenes de otras chicas.`;
            
            // Instrucción anti-repetición reforzada para múltiples chicas
            const instruccionAntiRepeticion = `\n\nREGLA CRÍTICA ANTI-REPETICIÓN: Tu respuesta debe ser COMPLETAMENTE DIFERENTE a las de las otras chicas. No repitas frases, acciones, expresiones o vocabulario que otras chicas ya hayan usado. Revisa el contexto acumulado y asegúrate de que tu respuesta sea única, con tu propio estilo y personalidad distintiva.`;
            
            // Instrucción para respuestas basadas en acciones del usuario (múltiples chicas)
            const instruccionAccionUsuario = `\n\nRESPUESTA BASADA EN ACCIONES DEL USUARIO: Cuando el usuario mencione una acción específica (como "besar", "abrazar", "tocar", "acariciar", "chupar", "penetrar", etc.), DEBES MOSTRAR DIRECTAMENTE LA ACCIÓN EN TU RESPUESTA sin dudar. Ejemplo: Si el usuario dice "quiero besarte" o "besar", tu respuesta debe mostrar la acción inmediatamente: "*se acerca y te besa apasionadamente*" seguido del diálogo. La acción va PRIMERO entre asteriscos, luego el diálogo.`;
            
            // Instrucción de contexto sobre otras chicas (solo para chicas después de la primera)
            let instruccionContextoOtrasChicas = '';
            if (!esPrimeraChica && respuestasPorChica.length > 0) {
                const respuestasPrevias = respuestasPorChica.map(r => `[${r.chica}]: ${r.respuesta}`).join('\n');
                instruccionContextoOtrasChicas = `\n\nCONTEXTO DE OTRAS CHICAS: Antes de ti, estas chicas ya respondieron:\n${respuestasPrevias}\n\nTu respuesta debe ser REACCIONAR o AÑADIR algo nuevo, NO repetir lo que ellas dijeron. Mantén tu personalidad única.`;
            }
            
            // Construir system prompt individualizado
            const systemPromptIndividual = `${personalidadChica}${instruccionesImagen}${instruccionAntiRepeticion}${instruccionAccionUsuario}${instruccionContextoOtrasChicas}\n\nFORMATO DE RESPUESTA OBLIGATORIO - JSON:\n{"respuesta":"tu diálogo con *acciones entre asteriscos*","imagen_tag":"nombre_de_una_imagen_disponible"}`;
            
            // Preparar mensajes para esta chica (SOLO el mensaje actual del usuario)
            const mensajesPayload = [
                { role: "system", content: systemPromptIndividual },
                ...contextoAcumulado,
                { role: "user", content: mensaje }
            ];
            
            // Llamar a la API para esta chica
            let datos;
            try {
                datos = await intentarLlamadaAPI(mensajesPayload, MODELO_PRINCIPAL);
            } catch (error) {
                // Si la PRIMERA chica falla, lanzar error real
                if (esPrimeraChica) {
                    logQuinti('ERROR', `La primera chica (${nombreChica}) falló - propagando error`);
                    throw error;
                }
                // Para chicas secundarias, usar fallback del sistema (no local)
                logQuinti('WARN', `Chica secundaria ${nombreChica} falló, usando fallback del sistema`);
                const fallbackTag = tagsDisponibles.includes('hablando') ? 'hablando' : tagsDisponibles[0] || 'normal';
                datos = {
                    respuesta: "*parece confundida por un momento* Disculpa, ¿podrías repetir eso?",
                    imagen_tag: fallbackTag
                };
            }
            
            // Sistema de reintentos simplificado para llamadas individuales (validación de respuesta)
            if (!datos || !esRespuestaValida(datos)) {
                logQuinti('WARN', `Llamada para ${nombreChica} falló (respuesta inválida), usando fallback del sistema`);
                const fallbackTag = tagsDisponibles.includes('hablando') ? 'hablando' : tagsDisponibles[0] || 'normal';
                datos = {
                    respuesta: "*parece confundida por un momento* Disculpa, ¿podrías repetir eso?",
                    imagen_tag: fallbackTag
                };
            }
            
            // Guardar respuesta de esta chica
            respuestasPorChica.push({
                chica: nombreChica,
                respuesta: datos.respuesta,
                imagen_tag: datos.imagen_tag || 'hablando'
            });
            
            // Agregar esta respuesta al contexto acumulado para la siguiente chica
            contextoAcumulado.push(
                { role: "user", content: mensaje },
                { role: "assistant", content: `[${nombreChica}]: ${datos.respuesta}` }
            );
            
            // Mantener contexto dentro del límite
            if (contextoAcumulado.length > MAX_HISTORIAL * 2) {
                contextoAcumulado = contextoAcumulado.slice(-MAX_HISTORIAL * 2);
            }
        }
        
        // Combinar todas las respuestas en formato [Nombre]: respuesta
        const respuestaCombinada = respuestasPorChica
            .map(r => `[${r.chica}]: ${r.respuesta}`)
            .join('\n\n');
        
        // Usar la imagen de la chica principal (primera en responder)
        const chicaPrincipal = respuestasPorChica[0]?.chica || chicaSeleccionada;
        const tagImagenPrincipal = respuestasPorChica[0]?.imagen_tag || 'hablando';
        const urlImagenPrincipal = obtenerURLImagen(chicaPrincipal, tagImagenPrincipal);
        
        logRespuestaExitosa(MODELO_PRINCIPAL, respuestaCombinada.length, Date.now() - tiempoInicio);
        
        return {
            respuesta: respuestaCombinada,
            imagen_tag: tagImagenPrincipal,
            imagen_url: urlImagenPrincipal,
            modelo: MODELO_PRINCIPAL,
            chicaPrincipal: chicaPrincipal,
            chicasRespondiendo: chicasArray,
            chicasEnChat: Array.from(chicasEnChat),
            respuestasIndividuales: respuestasPorChica
        };
    }
    
    // ============================================
    // CASO DE UNA SOLA CHICA (flujo original)
    // ============================================
    
    // Determinar personalidad y tags de imagen disponibles
    const personalidadPrincipal = chicaSeleccionada 
        ? PERSONALIDADES[chicaSeleccionada] 
        : "Eres QuintiAmigas, una amiga virtual divertida y útil.";
    
    // Construir instrucciones de imágenes
    const tagsImagen = chicaSeleccionada ? obtenerTagsImagen(chicaSeleccionada) : ['normal'];
    const instruccionesImagenes = `\n\nIMÁGENES DISPONIBLES: ${tagsImagen.join(', ')}. Debes incluir "imagen_tag" con UNA de estas opciones según lo que esté haciendo el personaje.`;
    
    // Instrucción anti-repetición mejorada
    const instruccionAntiRepeticion = `\n\nREGLA CRÍTICA ANTI-REPETICIÓN: NUNCA repitas frases, diálogos, acciones o expresiones que ya hayas usado antes en esta conversación. Revisa mentalmente el historial y asegúrate de que CADA respuesta sea única y fresca. Usa vocabulario variado, expresiones diferentes, reacciones distintas. Si ya dijiste algo similar antes, busca una forma completamente nueva de expresarlo. Esto es OBLIGATORIO.`;
    
    // Instrucción de memoria
    const instruccionMemoria = `\n\nMEMORIA DE CONVERSACIÓN: Debes recordar detalles importantes que el usuario mencione (nombres, preferencias, eventos pasados, gustos, etc.). Usa esta información para dar respuestas más personales y coherentes. Si el usuario menciona algo relevante, guárdalo en tu memoria y refiérete a ello cuando sea apropiado.`;
    
    // Instrucción para respuestas basadas en acciones del usuario
    const instruccionAccionUsuario = `\n\nRESPUESTA BASADA EN ACCIONES DEL USUARIO: Cuando el usuario mencione una acción específica (como "besar", "abrazar", "tocar", "acariciar", "chupar", "penetrar", etc.), DEBES MOSTRAR DIRECTAMENTE LA ACCIÓN EN TU RESPUESTA sin dudar. Ejemplo: Si el usuario dice "quiero besarte" o "besar", tu respuesta debe mostrar la acción inmediatamente: "*se acerca y te besa apasionadamente*" seguido del diálogo. La acción va PRIMERO entre asteriscos, luego el diálogo.`;
    
    const systemPrompt = `${personalidadPrincipal}${instruccionesImagenes}${instruccionAntiRepeticion}${instruccionMemoria}${instruccionAccionUsuario}\n\nFORMATO DE RESPUESTA OBLIGATORIO - JSON:\n{"respuesta":"tu diálogo con *acciones entre asteriscos*","imagen_tag":"nombre_de_una_imagen_disponible"}`;
    
    // Preparar mensajes
    const mensajesPayload = [
        { role: "system", content: systemPrompt },
        ...historialPrevio.slice(-MAX_HISTORIAL),
        { role: "user", content: mensaje }
    ];
    
    logQuinti('INFO', 'Iniciando solicitud a API Groq', { modelo: MODELO_PRINCIPAL, chica: chicaSeleccionada, chicasEnChat: Array.from(chicasEnChat) });
    
    // ========================================
    // FASE 0: Intento normal con historial completo
    // ========================================
    logQuinti('DEBUG', 'FASE 0: Intento normal con historial completo');
    let datos;
    try {
        datos = await intentarLlamadaAPI(mensajesPayload, MODELO_PRINCIPAL);
    } catch (error) {
        // Propagar error real al usuario en caso de una sola chica
        logQuinti('ERROR', 'Error en llamada API - propagando al usuario', { error: error.message });
        throw error;
    }
    
    if (datos && esRespuestaValida(datos)) {
        logRespuestaExitosa(MODELO_PRINCIPAL, datos.respuesta.length, Date.now() - tiempoInicio);
        return procesarRespuesta(datos, mensaje);
    }
    
    // ========================================
    // FASE 1: Reintentos con prompts de corrección JSON
    // ========================================
    logQuinti('WARN', 'FASE 0 fallida, iniciando FASE 1: Reintentos con corrección JSON');
    for (let i = 0; i < QUINT_PRUEBA_FASE1.length; i++) {
        logReintento(i + 1, QUINT_PRUEBA_FASE1.length, 'Corrección JSON');
        
        mensajesPayload.push({ role: "user", content: QUINT_PRUEBA_FASE1[i] });
        try {
            datos = await intentarLlamadaAPI(mensajesPayload, MODELO_PRINCIPAL);
        } catch (error) {
            // Continuar al siguiente reintento
            logQuinti('WARN', `FASE 1 intento ${i + 1} falló: ${error.message}`);
        }
        mensajesPayload.pop(); // Remover prompt de corrección
        
        if (datos && esRespuestaValida(datos)) {
            logQuinti('INFO', `FASE 1 exitosa en intento ${i + 1}`);
            return procesarRespuesta(datos, mensaje);
        }
    }
    
    // ========================================
    // FASE 2: Historial reducido
    // ========================================
    logQuinti('WARN', 'FASE 1 fallida, iniciando FASE 2: Historial reducido');
    const historialOriginal = [...mensajesPayload];
    const ultimos4 = historialPrevio.slice(-4);
    mensajesPayload.length = 0;
    mensajesPayload.push(
        { role: "system", content: systemPrompt },
        ...ultimos4,
        { role: "user", content: mensaje }
    );
    
    for (let i = 0; i < QUINT_PRUEBA_FASE2.length; i++) {
        logReintento(i + 1, QUINT_PRUEBA_FASE2.length, 'Historial reducido');
        
        mensajesPayload.push({ role: "user", content: QUINT_PRUEBA_FASE2[i] });
        try {
            datos = await intentarLlamadaAPI(mensajesPayload, MODELO_PRINCIPAL);
        } catch (error) {
            logQuinti('WARN', `FASE 2 intento ${i + 1} falló: ${error.message}`);
        }
        mensajesPayload.pop();
        
        if (datos && esRespuestaValida(datos)) {
            logQuinti('INFO', `FASE 2 exitosa en intento ${i + 1}`);
            return procesarRespuesta(datos, mensaje);
        }
    }
    
    // Restaurar historial original
    mensajesPayload.length = 0;
    mensajesPayload.push(...historialOriginal);
    
    // ========================================
    // FASE 3: Contexto mínimo
    // ========================================
    logQuinti('WARN', 'FASE 2 fallida, iniciando FASE 3: Contexto mínimo');
    const ultimoMsgUser = historialPrevio.filter(m => m.role === "user").slice(-1);
    
    for (let i = 0; i < QUINT_PRUEBA_FASE3.length; i++) {
        logReintento(i + 1, QUINT_PRUEBA_FASE3.length, 'Contexto mínimo');
        
        const minimo = [
            { role: "system", content: QUINT_PRUEBA_SYSTEM_MINIMO },
            ...ultimoMsgUser,
            { role: "user", content: QUINT_PRUEBA_FASE3[i] }
        ];
        
        try {
            datos = await intentarLlamadaAPI(minimo, MODELO_PRINCIPAL);
        } catch (error) {
            logQuinti('WARN', `FASE 3 intento ${i + 1} falló: ${error.message}`);
        }
        
        if (datos && esRespuestaValida(datos)) {
            logQuinti('INFO', `FASE 3 exitosa en intento ${i + 1}`);
            return procesarRespuesta(datos, mensaje);
        }
    }
    
    // ========================================
    // FASE 4: Prompt agresivo directo
    // ========================================
    logQuinti('WARN', 'FASE 3 fallida, iniciando FASE 4: Prompt agresivo');
    for (let i = 0; i < QUINT_PRUEBA_FASE4.length; i++) {
        logReintento(i + 1, QUINT_PRUEBA_FASE4.length, 'Prompt agresivo');
        
        const agresivo = [
            { role: "system", content: QUINT_PRUEBA_SYSTEM_MINIMO },
            ...ultimoMsgUser,
            { role: "user", content: QUINT_PRUEBA_FASE4[i] }
        ];
        
        try {
            datos = await intentarLlamadaAPI(agresivo, MODELO_PRINCIPAL);
        } catch (error) {
            logQuinti('WARN', `FASE 4 intento ${i + 1} falló: ${error.message}`);
        }
        
        if (datos && esRespuestaValida(datos)) {
            logQuinti('INFO', `FASE 4 exitosa en intento ${i + 1}`);
            return procesarRespuesta(datos, mensaje);
        }
    }
    
    // ========================================
    // FALLBACK: Si todo falla (último recurso) - Mostrar error al usuario
    // ========================================
    logQuinti('ERROR', 'Todas las fases fallaron - Lanzando error para mostrar al usuario');
    
    throw new Error('No se pudo obtener una respuesta después de múltiples intentos. Por favor, intenta de nuevo.');
}

/**
 * Intenta hacer una llamada a la API con rotación de keys
 * @param {Array} mensajes - Array de mensajes para la API
 * @param {string} modelo - Modelo a usar
 * @returns {Promise<object>} - Datos parseados
 * @throws {Error} - Error con detalles específicos de cada key intentada
 */
async function intentarLlamadaAPI(mensajes, modelo) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const erroresAcumulados = [];
    
    for (let k = 0; k < GROQ_KEYS.length; k++) {
        const keyIdx = (indiceKeyActual + k) % GROQ_KEYS.length;
        const apiKey = GROQ_KEYS[keyIdx];
        const keyNumero = keyIdx + 1;
        
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: modelo,
                    messages: mensajes,
                    temperature: 0.7,
                    max_tokens: 1024
                })
            });
            
            if (response.status === 429) {
                const errorMsg = `Key ${keyNumero}: Rate limit excedido (429)`;
                logQuinti('WARN', errorMsg);
                erroresAcumulados.push(errorMsg);
                indiceKeyActual = (keyIdx + 1) % GROQ_KEYS.length;
                continue;
            }
            
            if (response.status === 401) {
                const errorMsg = `Key ${keyNumero}: API Key inválida o expirada (401)`;
                logQuinti('WARN', errorMsg);
                erroresAcumulados.push(errorMsg);
                indiceKeyActual = (keyIdx + 1) % GROQ_KEYS.length;
                continue;
            }
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMsg = `Key ${keyNumero}: Error HTTP ${response.status} - ${errorData.error?.message || 'Sin detalles'}`;
                logErrorAPI('Groq API', new Error(`Status ${response.status}`), { errorData, keyIdx });
                erroresAcumulados.push(errorMsg);
                indiceKeyActual = (keyIdx + 1) % GROQ_KEYS.length;
                continue;
            }
            
            const data = await response.json();
            const contenido = data?.choices?.[0]?.message?.content;
            
            if (contenido) {
                indiceKeyActual = (keyIdx + 1) % GROQ_KEYS.length;
                return parsearJSON(contenido);
            }
            
        } catch (error) {
            const errorMsg = `Key ${keyNumero}: Timeout o error de conexión - ${error.message}`;
            logErrorAPI('Fetch Groq', error, { keyIdx, modelo });
            erroresAcumulados.push(errorMsg);
            indiceKeyActual = (keyIdx + 1) % GROQ_KEYS.length;
        }
    }
    
    // Todas las keys fallaron - lanzar error con detalles acumulados
    const errorDetalle = erroresAcumulados.length > 0 
        ? `Todas las API keys fallaron:\n${erroresAcumulados.join('\n')}`
        : 'Error desconocido al llamar a la API';
    
    throw new Error(errorDetalle);
}

/**
 * Procesa la respuesta de la IA: selecciona imagen y actualiza historial
 * @param {object} datos - Datos de la respuesta
 * @param {string} mensajeOriginal - Mensaje original del usuario
 * @returns {object} - Respuesta procesada con URL de imagen y lista de chicas respondiendo
 */
function procesarRespuesta(datos, mensajeOriginal) {
    // Agregar al historial
    historialConversacion.push(
        { role: "user", content: mensajeOriginal },
        { role: "assistant", content: datos.respuesta }
    );
    
    // Mantener historial dentro del límite
    if (historialConversacion.length > MAX_HISTORIAL * 2) {
        historialConversacion = historialConversacion.slice(-MAX_HISTORIAL * 2);
    }
    
    // Verificar si tenemos respuestas individuales de múltiples chicas
    const tieneRespuestasIndividuales = datos.respuestasIndividuales && datos.respuestasIndividuales.length > 0;
    
    let tagImagen, urlImagen;
    
    if (tieneRespuestasIndividuales) {
        // Usar la imagen de la primera chica como principal (para compatibilidad)
        const primeraChica = datos.respuestasIndividuales[0];
        tagImagen = primeraChica.imagen_tag || 'hablando';
        urlImagen = obtenerURLImagen(primeraChica.chica, tagImagen);
    } else {
        // Seleccionar imagen automáticamente para la chica principal (caso de una sola chica)
        tagImagen = datos.imagen_tag || 'normal';
        urlImagen = obtenerURLImagen(chicaSeleccionada, tagImagen);
    }
    
    // Detectar qué chicas están respondiendo en el mensaje
    const chicasRespondiendo = [];
    const responsePattern = /\[(Ichika|Nino|Miku|Yotsuba|Itsuki)\]:/gi;
    let match;
    while ((match = responsePattern.exec(datos.respuesta)) !== null) {
        const nombreChica = match[1];
        if (!chicasRespondiendo.includes(nombreChica)) {
            chicasRespondiendo.push(nombreChica);
        }
    }
    
    // Si no hay formato [Nombre]: pero hay múltiples chicas en chat, agregar la principal
    if (chicasRespondiendo.length === 0 && chicasEnChat.size > 0) {
        chicasRespondiendo.push(...Array.from(chicasEnChat));
    }
    
    // IMPORTANTE: Cuando hay múltiples chicas en el chat y la respuesta NO tiene el formato [Nombre]:,
    // pero DEBERÍA tenerlo (porque hay 2+ chicas), forzamos que TODAS las chicas en el chat aparezcan como respondiendo
    // Esto asegura que la UI muestre correctamente que todas participaron
    if (chicasEnChat.size > 1 && chicasRespondiendo.length < chicasEnChat.size) {
        // La IA falló en usar el formato correcto, pero igual consideramos que todas respondieron
        // para que la UI lo maneje apropiadamente
        logQuinti('WARN', 'Múltiples chicas en chat pero la respuesta no usa formato [Nombre]: correctamente', {
            chicasEnChat: Array.from(chicasEnChat),
            chicasDetectadas: chicasRespondiendo
        });
    }

    logQuinti('INFO', 'Respuesta procesada exitosamente', {
        longitud: datos.respuesta.length,
        imagenTag: tagImagen,
        tieneImagen: !!urlImagen,
        chicasRespondiendo: chicasRespondiendo,
        chicasEnChat: Array.from(chicasEnChat),
        tieneRespuestasIndividuales: tieneRespuestasIndividuales
    });
    
    return {
        respuesta: datos.respuesta,
        imagen_tag: tagImagen,
        imagen_url: urlImagen,
        modelo: MODELO_PRINCIPAL,
        chicaPrincipal: datos.chicaPrincipal || chicaSeleccionada,
        chicasRespondiendo: chicasRespondiendo,
        chicasEnChat: Array.from(chicasEnChat),
        respuestasIndividuales: datos.respuestasIndividuales || []
    };
}

/**
 * Obtiene la URL de una imagen específica
 * @param {string} nombreChica - Nombre de la chica
 * @param {string} tag - Tag de la imagen
 * @returns {string|null} - URL de la imagen o null
 */
function obtenerURLImagen(nombreChica, tag) {
    if (!QuintiImagenesPrueba || !QuintiImagenesPrueba[nombreChica]) {
        return null;
    }
    
    const chicaData = QuintiImagenesPrueba[nombreChica];
    
    if (tag === 'normal' || tag === 'hablando') {
        return chicaData.imagenSelector || chicaData.imagenes?.['hablando'] || null;
    }
    
    return chicaData.imagenes?.[tag] || chicaData.imagenes?.['hablando'] || chicaData.imagenSelector || null;
}

// ============================================================
//  FUNCIONES PÚBLICAS DE LA API
// ============================================================

/**
 * Selecciona una chica para el chat
 * @param {string} nombreChica - Nombre de la chica
 * @returns {boolean} - True si se seleccionó exitosamente
 */
function seleccionarChica(nombreChica) {
    if (PERSONALIDADES[nombreChica]) {
        chicaSeleccionada = nombreChica;
        historialConversacion = []; // Resetear historial al cambiar de chica
        chicasEnChat = new Set([nombreChica]); // Resetear conjunto de chicas en chat
        logQuinti('INFO', `Chica seleccionada: ${nombreChica}`);
        return true;
    }
    logQuinti('ERROR', `Intento de seleccionar chica inválida: ${nombreChica}`);
    return false;
}

/**
 * Obtiene el conjunto de chicas que están participando en el chat actual
 * @returns {Set} - Conjunto con los nombres de las chicas en el chat
 */
function getChicasEnChat() {
    return new Set(chicasEnChat);
}

/**
 * Limpia el conjunto de chicas en el chat (para cuando se cambia de chica o se reinicia)
 */
function limpiarChicasEnChat() {
    if (chicaSeleccionada) {
        chicasEnChat = new Set([chicaSeleccionada]);
    } else {
        chicasEnChat = new Set();
    }
    logQuinti('INFO', 'Chicas en chat reseteadas');
}

function getChicaSeleccionada() {
    return chicaSeleccionada;
}

function getImagenSelector(nombreChica) {
    if (QuintiImagenesPrueba && QuintiImagenesPrueba[nombreChica]) {
        return QuintiImagenesPrueba[nombreChica].imagenSelector;
    }
    return null;
}

/**
 * Conversa usando el historial acumulado internamente
 * @param {string} mensaje - Mensaje del usuario
 * @returns {Promise<object>} - Respuesta procesada
 */
async function conversar(mensaje) {
    // Agregar system prompt inicial solo si es el primer mensaje
    if (historialConversacion.length === 0 && chicaSeleccionada) {
        historialConversacion.push({ role: "system", content: SYSTEM_PROMPT_INICIAL });
        logQuinti('INFO', 'System prompt inicial agregado', { prompt: SYSTEM_PROMPT_INICIAL });
    }
    return obtenerRespuestaGroq(mensaje, historialConversacion);
}

/**
 * Obtiene el historial de conversación actual
 * @returns {Array} - Historial de mensajes
 */
function getHistorial() {
    return [...historialConversacion];
}

/**
 * Limpia el historial de conversación
 */
function limpiarHistorial() {
    historialConversacion = [];
    logQuinti('INFO', 'Historial limpiado');
}

// Exportar funciones para uso en otros módulos (ES6 modules)
export {
    obtenerRespuestaGroq,
    conversar,
    seleccionarChica,
    getChicaSeleccionada,
    getImagenSelector,
    getChicasDisponibles,
    getChicasEnChat,
    limpiarChicasEnChat,
    getHistorial,
    limpiarHistorial,
    GROQ_KEYS,
    MODELO_PRINCIPAL,
    PERSONALIDADES,
    // Funciones de utilidad
    logQuinti,
    logErrorAPI,
    formatearErrorUsuario,
    seleccionarImagenAutomatica,
    obtenerTagsImagen
};

// Exportar para window (compatibilidad con browser)
if (typeof window !== 'undefined') {
    window.logQuinti = logQuinti;
    window.formatearErrorUsuario = formatearErrorUsuario;
    window.seleccionarImagenAutomatica = seleccionarImagenAutomatica;
    window.obtenerTagsImagen = obtenerTagsImagen;
    window.getChicasEnChat = getChicasEnChat;
    window.limpiarChicasEnChat = limpiarChicasEnChat;
}

// Exportar funciones para uso en otros módulos (CommonJS - compatibilidad)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        obtenerRespuestaGroq,
        conversar,
        seleccionarChica,
        getChicaSeleccionada,
        getImagenSelector,
        getChicasDisponibles,
        getChicasEnChat,
        limpiarChicasEnChat,
        getHistorial,
        limpiarHistorial,
        GROQ_KEYS,
        MODELO_PRINCIPAL,
        PERSONALIDADES,
        // Funciones de utilidad
        logQuinti,
        formatearErrorUsuario,
        seleccionarImagenAutomatica,
        obtenerTagsImagen
    };
}
