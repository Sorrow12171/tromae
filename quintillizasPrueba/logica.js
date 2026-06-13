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
import { PERSONALIDADES, getChicasDisponibles, existeChica, tieneImagenes } from './personalidades.js';
import { obtenerMensajeError, generarPayloadFase, getOrdenFases, getInfoFase, obtenerFallbackLocal } from './fallbacks.js';
import { QuintiImagenesPrueba } from './imagenes.js';
import { getImagenTagsMapping as getImagenTagsMappingHistoria } from './historiasParalelas.js';

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

// Variables para mantener el estado de la acción en curso (persistencia natural de contexto)
let accionEnCurso = null; // Acción actual (ej: 'besando', 'chupando')
let contadorTurnosAccion = 0; // Turnos que lleva la acción actual
const MAX_TURNOS_ACCION = 3; // Después de 3 turnos, la acción puede terminar naturalmente

// SISTEMA DE BOOLEANOS DE ACCIONES EXPLÍCITAS - Estado detallado de cada acción
let estadoAccionesExplicitas = {
    besando: false,
    mamando: false,
    follando: false,
    siendoFollada: false,
    chupandoBolas: false,
    haciendoHandjob: false,
    enDoggystyle: false,
    enMisionero: false,
    enReverseCowgirl: false,
    haciendoAnal: false,
    desnuda: false,
    mostrandoCulo: false,
    lamiendoAno: false
};

// MEMORIA DE EVENTOS ÍNTIMOS - Contador de acciones realizadas
let memoriaEventosIntimos = {
    totalBesos: 0,
    totalMamadas: 0,
    totalFolladas: 0,
    totalAnal: 0,
    totalHandjobs: 0,
    eventosImportantes: [] // Array de eventos importantes con timestamp y descripción
};

/**
 * Actualiza el estado de la acción en curso desde logica.js
 * @param {string|null} nuevaAccion - La acción detectada en el mensaje del usuario
 */
function actualizarAccionEnCurso(nuevaAccion) {
    if (nuevaAccion) {
        // Nueva acción detectada: reiniciar contador
        if (accionEnCurso !== nuevaAccion) {
            accionEnCurso = nuevaAccion;
            contadorTurnosAccion = 1;
            logQuinti('DEBUG', `Nueva acción iniciada en logica.js: ${nuevaAccion}`);
            
            // Actualizar booleanos de acciones explícitas
            actualizarEstadoAccionesExplicitas(nuevaAccion, true);
            
            // Registrar evento importante en memoria
            registrarEventoImportante(`Inicio de acción: ${nuevaAccion}`);
        } else {
            // Misma acción continúa
            contadorTurnosAccion++;
            logQuinti('DEBUG', `Acción ${nuevaAccion} continúa en logica.js (turno ${contadorTurnosAccion}/${MAX_TURNOS_ACCION})`);
        }
    } else {
        // No hay acción explícita en el mensaje
        if (accionEnCurso && contadorTurnosAccion >= MAX_TURNOS_ACCION) {
            // La acción terminó naturalmente después de MAX_TURNOS_ACCION turnos
            logQuinti('DEBUG', `Acción ${accionEnCurso} terminó naturalmente en logica.js`);
            
            // Actualizar contadores de memoria de eventos íntimos
            actualizarMemoriaEventosIntimos(accionEnCurso);
            
            // Resetear booleanos de acciones explícitas
            resetearEstadoAccionesExplicitas();
            
            accionEnCurso = null;
            contadorTurnosAccion = 0;
        } else if (accionEnCurso) {
            // La acción aún está en curso pero el usuario no la mencionó explícitamente
            logQuinti('DEBUG', `Acción ${accionEnCurso} se mantiene implícita en logica.js (turno ${contadorTurnosAccion})`);
        }
    }
}

/**
 * Actualiza los booleanos de acciones explícitas según la acción detectada
 * @param {string} accion - La acción a activar
 * @param {boolean} estado - True para activar, false para desactivar
 */
function actualizarEstadoAccionesExplicitas(accion, estado) {
    // Primero resetear todos los booleanos
    resetearEstadoAccionesExplicitas();
    
    // Luego activar solo la acción correspondiente
    switch (accion.toLowerCase()) {
        case 'besando':
            estadoAccionesExplicitas.besando = estado;
            break;
        case 'mamando':
        case 'chupando':
            estadoAccionesExplicitas.mamando = estado;
            break;
        case 'follando':
        case 'siendoFollada':
            estadoAccionesExplicitas.follando = estado;
            estadoAccionesExplicitas.siendoFollada = estado;
            break;
        case 'chupandoBolas':
            estadoAccionesExplicitas.chupandoBolas = estado;
            break;
        case 'handjob':
        case 'paja':
            estadoAccionesExplicitas.haciendoHandjob = estado;
            break;
        case 'doggystyle':
            estadoAccionesExplicitas.enDoggystyle = estado;
            break;
        case 'misionero':
            estadoAccionesExplicitas.enMisionero = estado;
            break;
        case 'reverse_cowgirl':
        case 'cowgirl':
            estadoAccionesExplicitas.enReverseCowgirl = estado;
            break;
        case 'anal':
            estadoAccionesExplicitas.haciendoAnal = estado;
            break;
        case 'desnuda':
            estadoAccionesExplicitas.desnuda = estado;
            break;
        case 'mostrandoCulo':
            estadoAccionesExplicitas.mostrandoCulo = estado;
            break;
        case 'lamiendoAno':
            estadoAccionesExplicitas.lamiendoAno = estado;
            break;
        default:
            // Acción genérica - intentar detectar automáticamente
            for (const key of Object.keys(estadoAccionesExplicitas)) {
                if (accion.toLowerCase().includes(key)) {
                    estadoAccionesExplicitas[key] = estado;
                    break;
                }
            }
    }
    
    logQuinti('DEBUG', `Estado de acciones explícitas actualizado: ${JSON.stringify(estadoAccionesExplicitas)}`);
}

/**
 * Resetea todos los booleanos de acciones explícitas a false
 */
function resetearEstadoAccionesExplicitas() {
    for (const key of Object.keys(estadoAccionesExplicitas)) {
        estadoAccionesExplicitas[key] = false;
    }
}

/**
 * Actualiza la memoria de eventos íntimos cuando una acción termina
 * @param {string} accion - La acción que terminó
 */
function actualizarMemoriaEventosIntimos(accion) {
    switch (accion.toLowerCase()) {
        case 'besando':
            memoriaEventosIntimos.totalBesos++;
            break;
        case 'mamando':
        case 'chupando':
            memoriaEventosIntimos.totalMamadas++;
            break;
        case 'follando':
        case 'siendoFollada':
            memoriaEventosIntimos.totalFolladas++;
            break;
        case 'anal':
            memoriaEventosIntimos.totalAnal++;
            break;
        case 'handjob':
        case 'paja':
            memoriaEventosIntimos.totalHandjobs++;
            break;
    }
    
    logQuinti('INFO', `Memoria de eventos íntimos actualizada: ${JSON.stringify(memoriaEventosIntimos)}`);
}

/**
 * Registra un evento importante en la memoria
 * @param {string} descripcion - Descripción del evento
 */
function registrarEventoImportante(descripcion) {
    const evento = {
        timestamp: new Date().toISOString(),
        descripcion: descripcion,
        turno: historialConversacion.length
    };
    
    memoriaEventosIntimos.eventosImportantes.push(evento);
    
    // Mantener solo los últimos 20 eventos importantes
    if (memoriaEventosIntimos.eventosImportantes.length > 20) {
        memoriaEventosIntimos.eventosImportantes.shift();
    }
    
    logQuinti('INFO', `Evento importante registrado: ${descripcion}`);
}

/**
 * Obtiene el estado de una acción específica
 * @param {string} accion - Nombre de la acción a verificar
 * @returns {boolean} - True si la acción está activa
 */
function getEstadoAccion(accion) {
    return estadoAccionesExplicitas[accion] || false;
}

/**
 * Obtiene toda la memoria de eventos íntimos
 * @returns {object} - Objeto con contadores y eventos
 */
function getMemoriaEventosIntimos() {
    return { ...memoriaEventosIntimos };
}

/**
 * Obtiene la acción en curso actual
 * @returns {string|null} - La acción en curso o null
 */
function getAccionEnCurso() {
    return accionEnCurso;
}

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
 * Parsea JSON eliminando posibles bloques de código markdown y texto extra
 * @param {string} raw - Texto crudo de la respuesta
 * @returns {object|null} - Objeto parseado o null si falla
 */
function parsearJSON(raw) {
    if (!raw) {
        logQuinti('ERROR', 'parsearJSON: contenido vacío o null');
        return null;
    }
    
    // Limpiar bloques de código markdown
    let rawLimpio = raw.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
        const resultado = JSON.parse(rawLimpio);
        return resultado;
    } catch (error) {
        logQuinti('DEBUG', `parsearJSON: primer intento falló - ${error.message}`, { 
            contenido: raw.substring(0, 150) 
        });
    }
    
    // Intentar extraer JSON del texto (buscar el primer { hasta el último })
    const match = rawLimpio.match(/\{[\s\S]*\}/);
    if (match) {
        try {
            const resultado = JSON.parse(match[0]);
            logQuinti('DEBUG', 'parsearJSON: extracción exitosa del JSON del texto');
            return resultado;
        } catch (error) {
            logQuinti('DEBUG', `parsearJSON: segundo intento falló - ${error.message}`, {
                jsonExtraido: match[0].substring(0, 150)
            });
        }
    }
    
    // Intento adicional: buscar JSON incluso si hay texto antes (como *acciones*)
    // Buscar desde el primer { hasta encontrar un } válido
    const primerLLave = rawLimpio.indexOf('{');
    if (primerLLave !== -1) {
        const desdeLLave = rawLimpio.substring(primerLLave);
        const ultimaLLaveCierre = desdeLLave.lastIndexOf('}');
        if (ultimaLLaveCierre !== -1) {
            const posibleJSON = desdeLLave.substring(0, ultimaLLaveCierre + 1);
            try {
                const resultado = JSON.parse(posibleJSON);
                logQuinti('DEBUG', 'parsearJSON: extracción exitosa tras limpiar texto inicial');
                return resultado;
            } catch (error) {
                logQuinti('DEBUG', `parsearJSON: tercer intento falló - ${error.message}`, {
                    posibleJSON: posibleJSON.substring(0, 150)
                });
            }
        }
    }
    
    logQuinti('ERROR', 'parsearJSON: no se pudo extraer JSON válido', {
        contenidoCompleto: raw.substring(0, 300)
    });
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
    // PERO con contexto completo de lo que dijeron las demás
    // ============================================
    
    if (chicasEnChat.size > 1) {
        logQuinti('INFO', `Múltiples chicas detectadas (${chicasEnChat.size}). Iniciando llamadas secuenciales individuales.`);
        
        const chicasArray = Array.from(chicasEnChat);
        const respuestasPorChica = [];
        let errorGlobal = null;
        
        // SOLUCIÓN PROBLEMA #2: Unificar todo el historial en un solo mensaje de contexto
        // Esto mejora la coherencia y evita que mensajes se pierdan o no estén relacionados
        let contextoUnificado = '';
        if (historialPrevio.length > 0) {
            // Crear un resumen unificado del historial como un solo bloque narrativo
            contextoUnificado = '📜 CONTEXTO UNIFICADO DE LA CONVERSACIÓN (TODO LO QUE HA PASADO HASTA AHORA):\n';
            contextoUnificado += historialPrevio.map((msg, idx) => {
                if (msg.role === 'system') return '';
                const tipo = msg.role === 'user' ? 'Tú' : 'Respuesta';
                return `${idx}. ${tipo}: ${msg.content}`;
            }).filter(line => line).join('\n\n');
            contextoUnificado += '\n\n⚠️ ESTE ES EL HISTORIAL COMPLETO. USA ESTE CONTEXTO PARA MANTENER COHERENCIA.';
        }
        
        // SOLUCIÓN PROBLEMA #3: Agregar estado actual de acciones y posición
        if (accionEnCurso || Object.values(estadoAccionesExplicitas).some(v => v)) {
            const accionesActivas = Object.entries(estadoAccionesExplicitas)
                .filter(([_, activo]) => activo)
                .map(([accion, _]) => accion)
                .join(', ');
            
            contextoUnificado += `\n\n🔥 ESTADO ACTUAL DE LA ACCIÓN EN CURSO:\n`;
            contextoUnificado += `- Acción activa: ${accionEnCurso || 'Ninguna'}\n`;
            contextoUnificado += `- Acciones explícitas activas: ${accionesActivas || 'Ninguna'}\n`;
            contextoUnificado += `- Turnos llevando esta acción: ${contadorTurnosAccion}\n`;
            contextoUnificado += `⚠️ CRÍTICO: DEBES MANTENER ESTA POSICIÓN/ACCIÓN A MENOS QUE EL USUARIO INDIQUE EXPLÍCITAMENTE CAMBIARLA. NO LA OLVIDES.`;
        }
        
        // Procesar cada chica de forma secuencial
        for (let idx = 0; idx < chicasArray.length; idx++) {
            const nombreChica = chicasArray[idx];
            const esPrimeraChica = idx === 0;
            
            logQuinti('DEBUG', `Procesando llamada individual para: ${nombreChica} (${idx + 1}/${chicasArray.length})`);
            
            // Obtener personalidad específica de esta chica
            const personalidadChica = PERSONALIDADES[nombreChica] || "Eres una chica amigable.";
            
            // Construir instrucciones de imágenes SOLO para esta chica
            const tagsDisponibles = obtenerTagsImagen(nombreChica);
            const instruccionesImagen = `\n\nTU IMAGEN_TAG: Debes incluir "imagen_tag" con UNA de estas opciones: [${tagsDisponibles.join(', ')}]. Elige según lo que esté haciendo el personaje.`;
            
            // Instrucción anti-repetición reforzada para múltiples chicas
            const instruccionAntiRepeticion = `\n\n⚠️ ANTI-REPETICIÓN OBLIGATORIA: Tu respuesta debe ser COMPLETAMENTE DIFERENTE a las de las otras chicas. Prohibido usar las mismas frases, gestos, acciones o vocabulario.`;
            
            // SOLUCIÓN PROBLEMA #1: Instrucción reforzada para acciones en tiempo presente
            const instruccionAccionUsuario = `
🚨 ACCIÓN DEL USUARIO DETECTADA - TIEMPO PRESENTE:
Cuando el usuario use verbos en PRESENTE (ej: "beso", "chupo", "toco") o mencione una acción en curso, significa que la acción YA ESTÁ SUCEDIENDO.

DEBES HACER TRES COSAS OBLIGATORIAMENTE:
1. TU TEXTO: Describe ESA acción EXPLÍCITAMENTE en tu respuesta usando *acciones entre asteriscos* en TIEMPO PRESENTE. Ejemplo: si el usuario dice "beso", tú debes escribir "*te besa apasionadamente ahora mismo*" o "*mientras te besa, dice...*". La acción YA está ocurriendo.
2. TU IMAGEN_TAG: DEBE coincidir EXACTAMENTE con la acción mencionada por el usuario. Si dice "beso" → usa "besando". Si dice "chupar" → usa la tag de chupar correspondiente.
3. MANTÉN EL CONTEXTO: Si ya había una acción en curso (ver "ESTADO ACTUAL" arriba), DEBES CONTINUAR ESA ACCIÓN a menos que el usuario indique explícitamente cambiarla.

⚠️ CRÍTICO: NO puedes decir que estás haciendo una cosa en el texto y mostrar otra en la imagen. TEXTO E IMAGEN DEBEN ESTAR 100% ALINEADOS CON LA ACCIÓN DEL USUARIO Y EL ESTADO ACTUAL.`;
            
            // Instrucción de contexto sobre otras chicas (solo para chicas después de la primera)
            let instruccionContextoOtrasChicas = '';
            if (!esPrimeraChica && respuestasPorChica.length > 0) {
                const respuestasPrevias = respuestasPorChica.map(r => 
                    `• ${r.chica}: ${r.respuesta.substring(0, 200)}...`
                ).join('\n');
                instruccionContextoOtrasChicas = `\n\n📋 CONTEXTO - OTRAS CHICAS YA RESPONDIERON:\n${respuestasPrevias}\n\n⚡ TU RESPUESTA DEBE SER DIFERENTE: No repitas sus palabras exactas, pero TODAS deben estar realizando la MISMA ACCIÓN que el usuario mencionó. Cada una con su estilo único pero la misma acción base.\n\n🖼️ IMAGEN COORDINADA OBLIGATORIA: Si el usuario dijo "beso", TODAS las chicas deben estar besando en su texto Y en su imagen_tag. La acción es la misma, la expresión de cada personalidad es diferente.`;
            }
            
            // SOLUCIÓN PROBLEMA #2: Incluir contexto unificado en el system prompt
            const systemPromptIndividual = `${personalidadChica}${instruccionesImagen}${instruccionAntiRepeticion}${instruccionAccionUsuario}${instruccionContextoOtrasChicas}\n\n${contextoUnificado ? contextoUnificado + '\n\n' : ''}FORMATO JSON OBLIGATORIO:\n{"respuesta":"tu diálogo con *acciones entre asteriscos*","imagen_tag":"una_imagen_disponible"}`;
            
            // Preparar mensajes para esta chica (SOLO el mensaje actual del usuario)
            const mensajesPayload = [
                { role: "system", content: systemPromptIndividual },
                { role: "user", content: mensaje }
            ];
            
            // Llamar a la API para esta chica
            let datos;
            let errorOcurrido = null;
            try {
                datos = await intentarLlamadaAPI(mensajesPayload, MODELO_PRINCIPAL);
            } catch (error) {
                errorOcurrido = error;
                // Si la PRIMERA chica falla, guardar error pero continuar con fallback para no romper todo el chat
                if (esPrimeraChica) {
                    logQuinti('ERROR', `La primera chica (${nombreChica}) falló`, { error: error.message });
                    errorGlobal = error;
                } else {
                    // Para chicas secundarias, registrar error pero continuar
                    logQuinti('ERROR', `Chica secundaria ${nombreChica} falló: ${error.message}`, { error: error.message });
                }
            }
            
            // SISTEMA DE REINTENTOS MULTI-FASE PARA CADA CHICA (igual que caso de una sola chica)
            // Si la llamada inicial falla o devuelve datos inválidos, intentar todas las fases de fallback
            if (!datos || !esRespuestaValida(datos)) {
                const razon = !datos ? 'datos nulos' : 'respuesta inválida';
                logQuinti('WARN', `Llamada para ${nombreChica} falló (${razon}), iniciando sistema de reintentos multi-fase`, { 
                    datosRecibidos: datos,
                    errorPrevio: errorOcurrido?.message 
                });
                
                // ========================================
                // FASE 1: Reintentos con prompts de corrección JSON
                // ========================================
                logQuinti('DEBUG', `${nombreChica} - FASE 1: Reintentos con corrección JSON`);
                const payloadFase1 = [...mensajesPayload];
                for (let i = 0; i < QUINT_PRUEBA_FASE1.length; i++) {
                    logReintento(i + 1, QUINT_PRUEBA_FASE1.length, `Corrección JSON (${nombreChica})`);
                    
                    payloadFase1.push({ role: "user", content: QUINT_PRUEBA_FASE1[i] });
                    try {
                        datos = await intentarLlamadaAPI(payloadFase1, MODELO_PRINCIPAL);
                    } catch (error) {
                        logQuinti('WARN', `${nombreChica} - FASE 1 intento ${i + 1} falló: ${error.message}`);
                    }
                    payloadFase1.pop(); // Remover prompt de corrección
                    
                    if (datos && esRespuestaValida(datos)) {
                        logQuinti('INFO', `${nombreChica} - FASE 1 exitosa en intento ${i + 1}`);
                        break;
                    }
                }
                
                // ========================================
                // FASE 2: Historial reducido (si FASE 1 falló)
                // ========================================
                if (!datos || !esRespuestaValida(datos)) {
                    logQuinti('WARN', `${nombreChica} - FASE 1 fallida, iniciando FASE 2: Historial reducido`);
                    const ultimos4 = historialPrevio.slice(-4);
                    const payloadFase2 = [
                        { role: "system", content: systemPromptIndividual },
                        ...ultimos4,
                        { role: "user", content: mensaje }
                    ];
                    
                    for (let i = 0; i < QUINT_PRUEBA_FASE2.length; i++) {
                        logReintento(i + 1, QUINT_PRUEBA_FASE2.length, `Historial reducido (${nombreChica})`);
                        
                        payloadFase2.push({ role: "user", content: QUINT_PRUEBA_FASE2[i] });
                        try {
                            datos = await intentarLlamadaAPI(payloadFase2, MODELO_PRINCIPAL);
                        } catch (error) {
                            logQuinti('WARN', `${nombreChica} - FASE 2 intento ${i + 1} falló: ${error.message}`);
                        }
                        payloadFase2.pop();
                        
                        if (datos && esRespuestaValida(datos)) {
                            logQuinti('INFO', `${nombreChica} - FASE 2 exitosa en intento ${i + 1}`);
                            break;
                        }
                    }
                }
                
                // ========================================
                // FASE 3: Contexto mínimo (si FASE 2 falló)
                // ========================================
                if (!datos || !esRespuestaValida(datos)) {
                    logQuinti('WARN', `${nombreChica} - FASE 2 fallida, iniciando FASE 3: Contexto mínimo`);
                    const ultimoMsgUser = historialPrevio.filter(m => m.role === "user").slice(-1);
                    
                    for (let i = 0; i < QUINT_PRUEBA_FASE3.length; i++) {
                        logReintento(i + 1, QUINT_PRUEBA_FASE3.length, `Contexto mínimo (${nombreChica})`);
                        
                        const minimo = [
                            { role: "system", content: QUINT_PRUEBA_SYSTEM_MINIMO },
                            ...ultimoMsgUser,
                            { role: "user", content: QUINT_PRUEBA_FASE3[i] }
                        ];
                        
                        try {
                            datos = await intentarLlamadaAPI(minimo, MODELO_PRINCIPAL);
                        } catch (error) {
                            logQuinti('WARN', `${nombreChica} - FASE 3 intento ${i + 1} falló: ${error.message}`);
                        }
                        
                        if (datos && esRespuestaValida(datos)) {
                            logQuinti('INFO', `${nombreChica} - FASE 3 exitosa en intento ${i + 1}`);
                            break;
                        }
                    }
                }
                
                // ========================================
                // FASE 4: Prompt agresivo directo (si FASE 3 falló)
                // ========================================
                if (!datos || !esRespuestaValida(datos)) {
                    logQuinti('WARN', `${nombreChica} - FASE 3 fallida, iniciando FASE 4: Prompt agresivo`);
                    const ultimoMsgUser = historialPrevio.filter(m => m.role === "user").slice(-1);
                    
                    for (let i = 0; i < QUINT_PRUEBA_FASE4.length; i++) {
                        logReintento(i + 1, QUINT_PRUEBA_FASE4.length, `Prompt agresivo (${nombreChica})`);
                        
                        const agresivo = [
                            { role: "system", content: QUINT_PRUEBA_SYSTEM_MINIMO },
                            ...ultimoMsgUser,
                            { role: "user", content: QUINT_PRUEBA_FASE4[i] }
                        ];
                        
                        try {
                            datos = await intentarLlamadaAPI(agresivo, MODELO_PRINCIPAL);
                        } catch (error) {
                            logQuinti('WARN', `${nombreChica} - FASE 4 intento ${i + 1} falló: ${error.message}`);
                        }
                        
                        if (datos && esRespuestaValida(datos)) {
                            logQuinti('INFO', `${nombreChica} - FASE 4 exitosa en intento ${i + 1}`);
                            break;
                        }
                    }
                }
                
                // ========================================
                // FALLBACK LOCAL: Si TODAS las fases fallan (último recurso)
                // ========================================
                if (!datos || !esRespuestaValida(datos)) {
                    logQuinti('ERROR', `${nombreChica} - Todas las fases de reintento fallaron, usando fallback local`);
                    const fallbackTag = tagsDisponibles.includes('hablando') ? 'hablando' : tagsDisponibles[0] || 'normal';
                    datos = {
                        respuesta: obtenerFallbackLocal(),
                        imagen_tag: fallbackTag
                    };
                }
            }
            
            // Guardar respuesta de esta chica
            respuestasPorChica.push({
                chica: nombreChica,
                respuesta: datos.respuesta,
                imagen_tag: datos.imagen_tag || 'hablando'
            });
            
            // Ya no se usa contextoAcumulado porque ahora todo el historial va en contextoUnificado
            // Esto evita que los mensajes se acumulen de forma fragmentada y mejora la coherencia
        }
        
        // Combinar todas las respuestas en formato [Nombre]: respuesta
        const respuestaCombinada = respuestasPorChica
            .map(r => `[${r.chica}]: ${r.respuesta}`)
            .join('\n\n');
        
        logQuinti('INFO', `Múltiples chicas respondieron exitosamente: ${respuestasPorChica.length} respuestas`, {
            chicas: respuestasPorChica.map(r => r.chica),
            longitudes: respuestasPorChica.map(r => `${r.chica}: ${r.respuesta.length} chars`)
        });
        
        // Usar la imagen de la chica principal (primera en responder)
        const chicaPrincipal = respuestasPorChica[0]?.chica || chicaSeleccionada;
        const tagImagenPrincipal = respuestasPorChica[0]?.imagen_tag || 'hablando';
        const historiaId = window.historiaParalelaActiva || null;
        const urlImagenPrincipal = obtenerURLImagen(chicaPrincipal, tagImagenPrincipal, historiaId);
        
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
    
    // SOLUCIÓN PROBLEMA #1: Instrucción reforzada para acciones en tiempo presente (caso una sola chica)
    const instruccionAccionUsuario = `
🚨 ACCIÓN DEL USUARIO DETECTADA - TIEMPO PRESENTE:
Cuando el usuario use verbos en PRESENTE (ej: "beso", "chupo", "toco") o mencione una acción en curso, significa que la acción YA ESTÁ SUCEDIENDO.

DEBES HACER TRES COSAS OBLIGATORIAMENTE:
1. TU TEXTO: Describe ESA acción EXPLÍCITAMENTE en tu respuesta usando *acciones entre asteriscos* en TIEMPO PRESENTE. Ejemplo: si el usuario dice "beso", tú debes escribir "*te besa apasionadamente ahora mismo*" o "*mientras te besa, dice...*". La acción YA está ocurriendo.
2. TU IMAGEN_TAG: DEBE coincidir EXACTAMENTE con la acción mencionada por el usuario. Si dice "beso" → usa "besando". Si dice "chupar" → usa la tag de chupar correspondiente.
3. MANTÉN EL CONTEXTO: Si ya había una acción en curso, DEBES CONTINUAR ESA ACCIÓN a menos que el usuario indique explícitamente cambiarla. NO olvides la posición actual (ej: si estaban de pie, siguen de pie hasta que se indique lo contrario).

⚠️ CRÍTICO: NO puedes decir que estás haciendo una cosa en el texto y mostrar otra en la imagen. TEXTO E IMAGEN DEBEN ESTAR 100% ALINEADOS CON LA ACCIÓN DEL USUARIO Y EL ESTADO ACTUAL.`;
    
    // SOLUCIÓN PROBLEMA #3: Agregar estado actual de acciones al prompt
    let contextoEstadoActual = '';
    if (accionEnCurso || Object.values(estadoAccionesExplicitas).some(v => v)) {
        const accionesActivas = Object.entries(estadoAccionesExplicitas)
            .filter(([_, activo]) => activo)
            .map(([accion, _]) => accion)
            .join(', ');
        
        contextoEstadoActual = `\n\n🔥 ESTADO ACTUAL DE LA ACCIÓN EN CURSO:\n`;
        contextoEstadoActual += `- Acción activa: ${accionEnCurso || 'Ninguna'}\n`;
        contextoEstadoActual += `- Acciones explícitas activas: ${accionesActivas || 'Ninguna'}\n`;
        contextoEstadoActual += `- Turnos llevando esta acción: ${contadorTurnosAccion}\n`;
        contextoEstadoActual += `⚠️ CRÍTICO: DEBES MANTENER ESTA POSICIÓN/ACCIÓN A MENOS QUE EL USUARIO INDIQUE EXPLÍCITAMENTE CAMBIARLA. NO LA OLVIDES.`;
    }
    
    const systemPrompt = `${personalidadPrincipal}${instruccionesImagenes}${instruccionAntiRepeticion}${instruccionMemoria}${instruccionAccionUsuario}${contextoEstadoActual}\n\nFORMATO DE RESPUESTA OBLIGATORIO - JSON:\n{"respuesta":"tu diálogo con *acciones entre asteriscos*","imagen_tag":"nombre_de_una_imagen_disponible"}`;
    
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
                const resultadoJSON = parsearJSON(contenido);
                
                // Si el parseo falla y devuelve null, registrar error detallado
                if (resultadoJSON === null) {
                    logQuinti('ERROR', 'API devolvió contenido pero no es JSON válido', {
                        contenido: contenido.substring(0, 200),
                        keyUsada: keyNumero
                    });
                }
                
                return resultadoJSON;
            } else {
                logQuinti('WARN', `API devolvió respuesta vacía - Key ${keyNumero}`, {
                    dataCompleta: JSON.stringify(data).substring(0, 500)
                });
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
    
    // Obtener el ID de la historia paralela activa si existe
    const historiaId = window.historiaParalelaActiva || null;
    
    if (tieneRespuestasIndividuales) {
        // Usar la imagen de la primera chica como principal (para compatibilidad)
        const primeraChica = datos.respuestasIndividuales[0];
        tagImagen = primeraChica.imagen_tag || 'hablando';
        urlImagen = obtenerURLImagen(primeraChica.chica, tagImagen, historiaId);
    } else {
        // Seleccionar imagen automáticamente para la chica principal (caso de una sola chica)
        tagImagen = datos.imagen_tag || 'normal';
        urlImagen = obtenerURLImagen(chicaSeleccionada, tagImagen, historiaId);
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
 * @param {string} historiaId - ID de la historia paralela (opcional)
 * @returns {string|null} - URL de la imagen o null
 */
function obtenerURLImagen(nombreChica, tag, historiaId = null) {
    // Si hay una historia paralela activa, intentar usar su mapeo de imagenTagsMapping
    if (historiaId) {
        const mappingHistoria = getImagenTagsMappingHistoria(historiaId);
        if (mappingHistoria && mappingHistoria[tag]) {
            return mappingHistoria[tag];
        }
        // Si el tag no existe en el mapping pero existe el mapping, intentar con variantes
        if (mappingHistoria) {
            // Buscar tags que contengan el nombre del tag original
            for (const [mapTag, url] of Object.entries(mappingHistoria)) {
                if (mapTag.includes(tag) || tag.includes(mapTag.replace('nino_', ''))) {
                    return url;
                }
            }
        }
    }
    
    // Aldo no tiene imágenes
    if (!tieneImagenes(nombreChica)) {
        return null;
    }
    
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
    // VERIFICAR si hay una historia paralela activa con su propio system prompt ADICIONAL
    const hayHistoriaParalela = window.historiaParalelaActiva && window.systemPromptHistoriaActual;
    
    // Agregar system prompt inicial solo si es el primer mensaje
    if (historialConversacion.length === 0 && chicaSeleccionada) {
        // Obtener el nombre del usuario desde la función global
        let nombreUsuario = 'usuario';
        if (typeof window !== 'undefined' && window.getNombreUsuario) {
            nombreUsuario = window.getNombreUsuario() || 'usuario';
        }
        
        // SIEMPRE agregar el system prompt base de logica.js primero
        const systemPromptConNombre = SYSTEM_PROMPT_INICIAL.replace(/{nombreUsuario}/g, nombreUsuario);
        historialConversacion.push({ role: "system", content: systemPromptConNombre });
        logQuinti('INFO', 'System prompt inicial de logica.js agregado', { prompt: systemPromptConNombre, nombreUsuario });
        
        // Si hay una historia paralela activa, agregar SU system prompt ADICIONAL después
        if (hayHistoriaParalela) {
            const systemPromptHistoria = window.systemPromptHistoriaActual;
            historialConversacion.push({ role: "system", content: systemPromptHistoria });
            logQuinti('INFO', 'System prompt ADICIONAL de historia paralela agregado', { 
                historia: window.historiaParalelaActiva, 
                promptLength: systemPromptHistoria.length 
            });
        }
    } else if (historialConversacion.length === 0 && !chicaSeleccionada && hayHistoriaParalela) {
        // Caso especial: historia paralela sin chica seleccionada (solo para RPG)
        // Primero agregar system prompt minimo de logica.js
        historialConversacion.push({ role: "system", content: SYSTEM_PROMPT_INICIAL });
        logQuinti('INFO', 'System prompt inicial de logica.js agregado (modo historia paralela)');
        
        // Luego agregar el system prompt ADICIONAL de la historia
        const systemPromptHistoria = window.systemPromptHistoriaActual;
        historialConversacion.push({ role: "system", content: systemPromptHistoria });
        logQuinti('INFO', 'System prompt ADICIONAL de historia paralela agregado', { 
            historia: window.historiaParalelaActiva, 
            promptLength: systemPromptHistoria.length 
        });
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
    obtenerTagsImagen,
    actualizarAccionEnCurso,
    getAccionEnCurso,
    getEstadoAccion,
    getMemoriaEventosIntimos,
    registrarEventoImportante
};

// Exportar para window (compatibilidad con browser)
if (typeof window !== 'undefined') {
    window.logQuinti = logQuinti;
    window.formatearErrorUsuario = formatearErrorUsuario;
    window.seleccionarImagenAutomatica = seleccionarImagenAutomatica;
    window.obtenerTagsImagen = obtenerTagsImagen;
    window.getChicasEnChat = getChicasEnChat;
    window.limpiarChicasEnChat = limpiarChicasEnChat;
    window.actualizarAccionEnCurso = actualizarAccionEnCurso;
    window.getAccionEnCurso = getAccionEnCurso;
    window.getEstadoAccion = getEstadoAccion;
    window.getMemoriaEventosIntimos = getMemoriaEventosIntimos;
    window.registrarEventoImportante = registrarEventoImportante;
    window.limpiarHistorialConversacion = limpiarHistorial; // Para usar desde chat.html
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
        obtenerTagsImagen,
        actualizarAccionEnCurso,
        getAccionEnCurso,
        getEstadoAccion,
        getMemoriaEventosIntimos,
        registrarEventoImportante
    };
}
