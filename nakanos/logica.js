// ============================================================
//  Nakanos - Lógica de respuesta con Groq API (Versión Minimalista)
//  Archivo: logica.js
//  Carpeta: nakanos
//  
//  CARACTERÍSTICAS IMPLEMENTADAS:
//  - Sistema de API de Groq con rotación de keys
//  - Sistema de reintentos multi-fase
//  - Logging detallado de errores en consola
//  - Selección automática de imágenes según contexto
//  - System prompt separado en módulo independiente
//  - Personalidades separadas en módulo independiente
//  - Fallbacks y sistema de reintentos en módulo independiente
//
//  DEPENDENCIAS:
//  - systemPrompt.js: Prompts del sistema y variantes
//  - personalidades.js: Definición de personajes
//  - fallbacks.js: Sistema de reintentos y respuestas de respaldo
//  - imagenes.js: URLs y tags de imágenes
// ============================================================

import { QUINT_PRUEBA_SYSTEM_MINIMO, QUINT_PRUEBA_FASE1, QUINT_PRUEBA_FASE2, QUINT_PRUEBA_FASE3, QUINT_PRUEBA_FASE4 } from './systemPrompt.js';
import { PERSONALIDADES, getChicasDisponibles, existeChica } from './personalidades.js';
import { obtenerMensajeError, generarPayloadFase, getOrdenFases, obtenerFallbackLocal } from './fallbacks.js';
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
    ["gsk_UHXG","5P9bK5R89hid","YaRuWGdyb3FYJszztcUJt14qYDE4jekb486Q"],
    ["gsk_4gde","xolSNg07yo0W","QdfdWGdyb3FYpEtpBMbAy468Z4poTaZq9Ebm"],
    ["gsk_MIlZ","XtHbwn7MILGj","kEB7WGdyb3FYTqqcD3n2dBfX9f9hRGCp0QaP"],
    ["gsk_bIeI","gAZ9guyQaloQ","e9fOWGdyb3FYI3b0ML6OkllrTtywXadkJ8cM"],
];
const GROQ_KEYS = _K.map(partes => partes.join(""));
const MODELO_PRINCIPAL = "openai/gpt-oss-120b";

let indiceKeyActual = 0;
let chicaSeleccionada = null;
let historialConversacion = [];
const MAX_HISTORIAL = 20;

// ============================================================
//  LOGGING Y UTILIDADES
// ============================================================

/**
 * Función de logging para depuración
 */
function logQuinti(nivel, mensaje, datos = {}) {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = {
        'INFO': 'ℹ️',
        'WARN': '⚠️',
        'ERROR': '❌',
        'DEBUG': '🔍',
        'API': '🌐'
    }[nivel] || '•';
    
    console.log(`${emoji} [${timestamp}] ${nivel}: ${mensaje}`);
    if (Object.keys(datos).length > 0) {
        console.log('   Datos:', datos);
    }
}

/**
 * Formatea errores de la API para mostrar al usuario
 */
function formatearErrorUsuario(error) {
    if (!error) return "Error desconocido";
    
    const mensajesError = [
        "Ups, algo salió mal. ¡Intentemos de nuevo! 😅",
        "Parece que las chicas están tímidas hoy. Prueba otra vez~",
        "Hubo un pequeño problema técnico. ¡No te rindas! 💪"
    ];
    
    if (error.message?.includes('Rate limit')) {
        return "⚠️ Límite de requests alcanzado. Espera unos segundos~";
    }
    if (error.message?.includes('API Key')) {
        return "⚠️ Error de autenticación. Verifica las keys.";
    }
    
    return mensajesError[Math.floor(Math.random() * mensajesError.length)];
}

// ============================================================
//  SISTEMA DE IMÁGENES
// ============================================================

/**
 * Obtiene los tags de imagen disponibles para una chica
 */
function obtenerTagsImagen(nombreChica) {
    if (!QuintiImagenesPrueba[nombreChica]) {
        return ['hablando'];
    }
    return Object.keys(QuintiImagenesPrueba[nombreChica].imagenes);
}

/**
 * Selecciona automáticamente una imagen basada en el contexto
 */
function seleccionarImagenAutomatica(respuesta, nombreChica) {
    const respuestaLower = respuesta.toLowerCase();
    const tagsDisponibles = obtenerTagsImagen(nombreChica);
    
    // Mapeo básico de palabras clave a tags
    const mapeoAcciones = {
        'besando': ['besando'],
        'chupando': ['chupando_solo_la_punta_del_pene', 'chupando_solo_la_mitad_del_pene', 'chupando_todo_el_pene'],
        'mamando': ['chupando_todo_el_pene'],
        'follando': ['misionero', 'doggystyle', 'reverse_cowgirl'],
        'culo': ['mostrando_culo_tanga_negra', 'doggystyle'],
        'tetas': ['mostrando_tetas', 'chupando_tetas_de_ichika'],
        'desnuda': ['desnuda'],
        'anal': ['follando_anal', 'anal_cumming']
    };
    
    for (const [palabraClave, tags] of Object.entries(mapeoAcciones)) {
        if (respuestaLower.includes(palabraClave)) {
            const tagEncontrado = tags.find(tag => tagsDisponibles.includes(tag));
            if (tagEncontrado) {
                logQuinti('DEBUG', `Tag encontrado para "${palabraClave}": ${tagEncontrado}`);
                return tagEncontrado;
            }
        }
    }
    
    // Tag por defecto
    return tagsDisponibles.includes('hablando') ? 'hablando' : tagsDisponibles[0];
}

/**
 * Obtiene la URL de una imagen específica
 */
function obtenerURLImagen(nombreChica, tag) {
    if (!QuintiImagenesPrueba[nombreChica]) {
        return null;
    }
    const imagenData = QuintiImagenesPrueba[nombreChica].imagenes[tag];
    return imagenData ? imagenData.url : null;
}

/**
 * Obtiene el selector de imagen principal de una chica
 */
function getImagenSelector(nombreChica) {
    return QuintiImagenesPrueba[nombreChica]?.imagenSelector || '';
}

// ============================================================
//  GESTIÓN DE CHICAS
// ============================================================

/**
 * Selecciona una chica específica
 */
function seleccionarChica(nombre) {
    if (existeChica(nombre)) {
        chicaSeleccionada = nombre;
        logQuinti('INFO', `Chica seleccionada: ${nombre}`);
        return true;
    }
    logQuinti('WARN', `Chica no encontrada: ${nombre}`);
    return false;
}

/**
 * Obtiene la chica seleccionada actualmente
 */
function getChicaSeleccionada() {
    return chicaSeleccionada;
}

// ============================================================
//  SISTEMA DE REINTENTOS MULTI-FASE
// ============================================================

/**
 * Intenta hacer una llamada a la API con reintentos automáticos
 */
async function intentarLlamadaAPI(mensajes, modelo, forzarJSON = false) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    
    for (let intento = 0; intento < GROQ_KEYS.length; intento++) {
        const keyIndex = (indiceKeyActual + intento) % GROQ_KEYS.length;
        const apiKey = GROQ_KEYS[keyIndex];
        
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
                    temperature: forzarJSON ? 0.3 : 0.7,
                    max_tokens: 1000
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            indiceKeyActual = keyIndex; // Guardar key exitosa para próximo uso
            
            if (!data.choices || !data.choices[0]?.message?.content) {
                throw new Error("Respuesta vacía de la API");
            }
            
            return data;
            
        } catch (error) {
            logQuinti('ERROR', `Intento ${intento + 1} falló con key ${keyIndex}`, { error: error.message });
            
            if (intento === GROQ_KEYS.length - 1) {
                throw error; // Último intento fallido, lanzar error
            }
        }
    }
}

/**
 * Parsea JSON de forma segura
 */
function parsearJSON(texto) {
    try {
        // Intentar parseo directo
        return JSON.parse(texto);
    } catch {
        try {
            // Buscar JSON dentro del texto
            const match = texto.match(/\{[\s\S]*\}/);
            if (match) {
                return JSON.parse(match[0]);
            }
        } catch {
            // Intentar con comillas simples convertidas a dobles
            try {
                const textoLimpio = texto.replace(/'/g, '"');
                return JSON.parse(textoLimpio);
            } catch {
                return null;
            }
        }
    }
    return null;
}

/**
 * Valida que la respuesta tenga el formato correcto
 */
function esRespuestaValida(datos) {
    if (!datos || !datos.respuesta || !datos.imagen_tag) {
        return false;
    }
    return true;
}

/**
 * Obtiene la respuesta de Groq con sistema de reintentos
 */
async function obtenerRespuestaGroq(mensaje, historialPrevio = []) {
    const tiempoInicio = Date.now();
    
    // Determinar system prompt según la chica seleccionada
    let personalidadBase = "";
    if (chicaSeleccionada && PERSONALIDADES[chicaSeleccionada]) {
        personalidadBase = PERSONALIDADES[chicaSeleccionada];
    } else {
        personalidadBase = "Eres una chica amigable y divertida.";
    }
    
    // Obtener tags de imagen disponibles
    const tagsDisponibles = chicaSeleccionada ? obtenerTagsImagen(chicaSeleccionada) : ['hablando'];
    
    // Construir system prompt
    const systemPrompt = `${personalidadBase}

FORMATO JSON OBLIGATORIO - Respondé únicamente en formato JSON válido. RESPONDE SOLO CON JSON, SIN TEXTO ANTES NI DESPUÉS:
{"respuesta":"tu diálogo con *acciones entre asteriscos*","imagen_tag":"una_imagen_disponible"}

IMÁGENES DISPONIBLES: [${tagsDisponibles.join(', ')}]
Debes incluir "imagen_tag" con UNA de estas opciones según lo que esté pasando.`;

    // Preparar mensajes iniciales
    const mensajesBase = [
        { role: "system", content: systemPrompt },
        ...historialPrevio.slice(-MAX_HISTORIAL),
        { role: "user", content: mensaje }
    ];
    
    logQuinti('API', `Iniciando llamada a Groq para: ${chicaSeleccionada || 'sin seleccionar'}`);
    
    try {
        // Intento inicial
        let datos = await intentarLlamadaAPI(mensajesBase, MODELO_PRINCIPAL);
        
        // Parsear contenido
        const contenido = datos.choices[0].message.content.trim();
        let respuestaParseada = parsearJSON(contenido);
        
        // SISTEMA DE REINTENTOS MULTI-FASE
        if (!respuestaParseada || !esRespuestaValida(respuestaParseada)) {
            logQuinti('WARN', `Respuesta inválida, iniciando sistema de reintentos`, { 
                contenido: contenido.substring(0, 100) 
            });
            
            const fases = getOrdenFases();
            
            for (const fase of fases) {
                logQuinti('INFO', `Intentando ${fase}`);
                
                const promptsFase = fase === 'FASE1' ? QUINT_PRUEBA_FASE1 :
                                   fase === 'FASE2' ? QUINT_PRUEBA_FASE2 :
                                   fase === 'FASE3' ? QUINT_PRUEBA_FASE3 :
                                   QUINT_PRUEBA_FASE4;
                
                for (let i = 0; i < promptsFase.length; i++) {
                    const payloadRetry = generarPayloadFase(
                        fase,
                        historialPrevio,
                        mensaje,
                        systemPrompt,
                        i
                    );
                    
                    try {
                        datos = await intentarLlamadaAPI(payloadRetry, MODELO_PRINCIPAL, true);
                        const contenidoRetry = datos.choices[0].message.content.trim();
                        respuestaParseada = parsearJSON(contenidoRetry);
                        
                        if (respuestaParseada && esRespuestaValida(respuestaParseada)) {
                            logQuinti('INFO', `✅ ${fase} exitosa en intento ${i + 1}`);
                            break;
                        }
                    } catch (error) {
                        logQuinti('ERROR', `Error en ${fase} intento ${i + 1}`, { error: error.message });
                    }
                }
                
                if (respuestaParseada && esRespuestaValida(respuestaParseada)) {
                    break;
                }
            }
        }
        
        // Si todo falla, usar fallback local
        if (!respuestaParseada || !esRespuestaValida(respuestaParseada)) {
            logQuinti('ERROR', `Todos los reintentos fallaron, usando fallback local`);
            respuestaParseada = {
                respuesta: obtenerFallbackLocal(),
                imagen_tag: tagsDisponibles.includes('hablando') ? 'hablando' : tagsDisponibles[0]
            };
        }
        
        // Validar y corregir imagen_tag si es necesario
        if (!tagsDisponibles.includes(respuestaParseada.imagen_tag)) {
            logQuinti('WARN', `Tag "${respuestaParseada.imagen_tag}" no existe, usando default`);
            respuestaParseada.imagen_tag = seleccionarImagenAutomatica(
                respuestaParseada.respuesta,
                chicaSeleccionada || 'Ichika'
            );
        }
        
        // Agregar al historial
        historialConversacion.push(
            { role: "user", content: mensaje },
            { role: "assistant", content: respuestaParseada.respuesta }
        );
        
        // Mantener historial dentro del límite
        if (historialConversacion.length > MAX_HISTORIAL * 2) {
            historialConversacion = historialConversacion.slice(-MAX_HISTORIAL * 2);
        }
        
        const tiempoTranscurrido = Date.now() - tiempoInicio;
        logQuinti('INFO', `Respuesta obtenida en ${tiempoTranscurrido}ms`, {
            chica: chicaSeleccionada,
            tag: respuestaParseada.imagen_tag
        });
        
        return {
            exito: true,
            respuesta: respuestaParseada.respuesta,
            imagen_tag: respuestaParseada.imagen_tag,
            imagen_url: obtenerURLImagen(chicaSeleccionada, respuestaParseada.imagen_tag),
            chica: chicaSeleccionada
        };
        
    } catch (error) {
        logQuinti('ERROR', `Error en obtenerRespuestaGroq`, { error: error.message });
        
        return {
            exito: false,
            error: formatearErrorUsuario(error),
            respuesta: obtenerFallbackLocal(),
            imagen_tag: tagsDisponibles.includes('hablando') ? 'hablando' : tagsDisponibles[0],
            imagen_url: obtenerURLImagen(chicaSeleccionada, 'hablando'),
            chica: chicaSeleccionada
        };
    }
}

// ============================================================
//  FUNCIÓN PRINCIPAL DE CONVERSACIÓN
// ============================================================

/**
 * Procesa un mensaje del usuario y devuelve la respuesta
 */
async function conversar(mensaje) {
    if (!chicaSeleccionada) {
        return {
            exito: false,
            error: "No hay chica seleccionada. Usa seleccionarChica() primero.",
            respuesta: "Por favor selecciona una chica primero~",
            imagen_tag: 'hablando'
        };
    }
    
    const resultado = await obtenerRespuestaGroq(mensaje, historialConversacion);
    return resultado;
}

// ============================================================
//  GESTIÓN DEL HISTORIAL
// ============================================================

/**
 * Obtiene el historial de conversación
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

// ============================================================
//  EXPORTACIONES
// ============================================================

export {
    obtenerRespuestaGroq,
    conversar,
    seleccionarChica,
    getChicaSeleccionada,
    getImagenSelector,
    getChicasDisponibles,
    getHistorial,
    limpiarHistorial,
    GROQ_KEYS,
    MODELO_PRINCIPAL,
    PERSONALIDADES,
    // Utilidades
    logQuinti,
    formatearErrorUsuario,
    seleccionarImagenAutomatica,
    obtenerTagsImagen,
    obtenerURLImagen,
    parsearJSON
};

// Exportar para window (compatibilidad con browser)
if (typeof window !== 'undefined') {
    window.logQuinti = logQuinti;
    window.formatearErrorUsuario = formatearErrorUsuario;
    window.seleccionarImagenAutomatica = seleccionarImagenAutomatica;
    window.obtenerTagsImagen = obtenerTagsImagen;
    window.obtenerURLImagen = obtenerURLImagen;
    window.limpiarHistorialConversacion = limpiarHistorial;
}
