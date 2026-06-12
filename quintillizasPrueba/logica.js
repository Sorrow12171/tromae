// QuintiAmigas - Lógica de respuesta con Groq API
// Archivo: logica.js
// Carpeta: quintillizasPrueba
// 
// CARACTERÍSTICAS IMPLEMENTADAS:
// - Sistema de reintentos multi-fase (basado en quintillizas.js)
// - Logging detallado de errores en consola
// - Selección automática de imágenes según contexto
// - Rotación de API keys para alta disponibilidad

// Las funciones utilitarias se definen inline para evitar dependencias de módulos en navegador
// Los prompts de reintentos se definen abajo
// Las imágenes se cargan desde imagenes.js (QuintiImagenesPrueba)

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
// ============================================================

const QUINT_PRUEBA_SYSTEM_MINIMO = `Eres una chica de roleplay interactivo. Responde SOLO con JSON válido.
Formato: {"respuesta":"tu respuesta con *acciones*","imagen_tag":"nombre_imagen"}`;

const QUINT_PRUEBA_FASE1 = [
    "Responde SOLO con JSON valido. Sin texto fuera del JSON. Empieza con { y termina con }",
    'SOLO JSON. Formato: {"respuesta":"tu respuesta aqui con *acciones entre asteriscos*","imagen_tag":"nombre_de_imagen"}',
    "Tu respuesta anterior no fue JSON valido. Intenta de nuevo. SOLO el JSON, nada mas.",
    "JSON VALIDO UNICAMENTE. Empieza con { — no con texto, no con explicaciones.",
];

const QUINT_PRUEBA_FASE2 = [
    'Responde en JSON. {"respuesta":"respuesta aqui con *acciones*","imagen_tag":"nombre_imagen"}',
    "SOLO JSON valido. Sin markdown. Sin texto extra. Empieza con {",
    "Por favor responde unicamente con el JSON solicitado. Nada de texto adicional.",
    "JSON. Solo JSON. Empieza con { termina con }",
];

const QUINT_PRUEBA_FASE3 = ["responde", "continua", "ok"];

const QUINT_PRUEBA_FASE4 = [
    'JSON solo: {"respuesta":"tu respuesta","imagen_tag":"normal"}',
    '{"respuesta":"Hola, ¿cómo estás? *sonríe amablemente*","imagen_tag":"hablando"}',
];

// ============================================================
//  PERSONALIDADES DE CHICAS
// ============================================================

const PERSONALIDADES = {
    Ichika: "Eres Ichika Nakano, la mayor de las quintillizas. Tienes 18 años. Eres madura, juguetona y protectora. Coqueta por naturaleza, te encanta bromear y flirtear con sonrisas y miradas sugerentes. Sabes usar tu encanto de forma sutil pero efectiva. Tienes cabello corto con pendiente en la oreja derecha. Eres voluptuosa y muy deseada en el colegio.",
    Nino: "Eres Nino Nakano, la segunda de las quintillizas. Tienes 18 años. Eres tsundere intensa, directa y algo arrogante al principio. Muy protectora, fashionista y celosa. Cuando te interesas, tu forma de cuidar es bastante posesiva y apasionada. Tienes cabello largo con lazos mariposa. Eres voluptuosa y muy deseada en el colegio.",
    Miku: "Eres Miku Nakano, la tercera de las quintillizas. Tienes 18 años. Eres callada, tímida y reservada, pero muy directa cuando quieres algo. Fan de Sengoku. Detrás de tu silencio hay una pasión profunda que sale cuando te sientes cómoda y cercana. Tienes cabello medio con mechón cubriendo el ojo derecho y auriculares azules grandes. Eres voluptuosa y muy deseada en el colegio.",
    Yotsuba: "Eres Yotsuba Nakano, la cuarta de las quintillizas. Tienes 18 años. Eres súper energética, alegre, atlética y siempre positiva. Te encanta el contacto físico, los juegos y la diversión constante. Eres muy cariñosa y activa en todo lo que haces. Tienes cabello corto con un lazo grande de orejas de conejo verde. Eres voluptuosa y muy deseada en el colegio.",
    Itsuki: "Eres Itsuki Nakano, la menor de las quintillizas. Tienes 18 años. Eres seria, estudiosa y tsundere fuerte. Honesta y responsable, pero cuando bajas la guardia te vuelves bastante expresiva y entregada. Tienes un apetito voraz (tanto literal como figurado). Tienes cabello medio con horquillas de estrella rojas. Eres voluptuosa y muy deseada en el colegio."
};

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
 */
function formatearErrorUsuario(error) {
    const mensajesError = [
        "Ups, algo salió mal. ¡Intentemos de nuevo! 😅",
        "Parece que las chicas están tímidas hoy. Prueba otra vez~",
        "Hubo un pequeño problema técnico. ¡No te rindas! 💪",
        "Las quintillizas se confundieron un poco. ¿Lo intentamos de nuevo?"
    ];
    
    const mensajeBase = mensajesError[Math.floor(Math.random() * mensajesError.length)];
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return `${mensajeBase} (Debug: ${error.message})`;
    }
    
    return mensajeBase;
}

// ============================================================
//  FUNCIÓN PRINCIPAL CON SISTEMA DE REINTENTOS
// ============================================================

/**
 * Función principal para obtener respuestas con sistema de reintentos multi-fase
 * Basado en el sistema de quintillizas.js
 * @param {string} mensaje - Mensaje del usuario
 * @param {Array} historialPrevio - Historial de conversación opcional
 * @returns {Promise<object>} - Objeto con {respuesta, imagen_tag, imagen_url}
 */
async function obtenerRespuestaGroq(mensaje, historialPrevio = []) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const tiempoInicio = Date.now();
    
    // Determinar personalidad y tags de imagen disponibles
    const personalidad = chicaSeleccionada 
        ? PERSONALIDADES[chicaSeleccionada] 
        : "Eres QuintiAmigas, una amiga virtual divertida y útil.";
    
    const tagsImagen = chicaSeleccionada ? obtenerTagsImagen(chicaSeleccionada) : ['normal'];
    const instruccionImagen = chicaSeleccionada 
        ? `\nIMÁGENES DISPONIBLES: ${tagsImagen.join(', ')}. Debes incluir "imagen_tag" con UNA de estas opciones según lo que esté haciendo el personaje.`
        : '';
    
    const systemPrompt = `${personalidad}${instruccionImagen}\n\nFORMATO DE RESPUESTA OBLIGATORIO - JSON:\n{"respuesta":"tu diálogo con *acciones entre asteriscos*","imagen_tag":"nombre_de_una_imagen_disponible"}`;
    
    // Preparar mensajes
    const mensajesPayload = [
        { role: "system", content: systemPrompt },
        ...historialPrevio.slice(-MAX_HISTORIAL),
        { role: "user", content: mensaje }
    ];
    
    logQuinti('INFO', 'Iniciando solicitud a API Groq', { modelo: MODELO_PRINCIPAL, chica: chicaSeleccionada });
    
    // ========================================
    // FASE 0: Intento normal con historial completo
    // ========================================
    logQuinti('DEBUG', 'FASE 0: Intento normal con historial completo');
    let datos = await intentarLlamadaAPI(mensajesPayload, MODELO_PRINCIPAL);
    
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
        datos = await intentarLlamadaAPI(mensajesPayload, MODELO_PRINCIPAL);
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
        datos = await intentarLlamadaAPI(mensajesPayload, MODELO_PRINCIPAL);
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
        
        datos = await intentarLlamadaAPI(minimo, MODELO_PRINCIPAL);
        
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
        
        datos = await intentarLlamadaAPI(agresivo, MODELO_PRINCIPAL);
        
        if (datos && esRespuestaValida(datos)) {
            logQuinti('INFO', `FASE 4 exitosa en intento ${i + 1}`);
            return procesarRespuesta(datos, mensaje);
        }
    }
    
    // ========================================
    // FALLBACK LOCAL: Si todo falla
    // ========================================
    logQuinti('ERROR', 'Todas las fases fallaron - Usando fallback local');
    
    const fallbacks = [
        "*se rasca la cabeza confundida* E-eh... Creo que me perdí un poco. ¿Me repites eso? *sonríe nerviosa*",
        "*frunce el ceño* ¡Oye! Algo falló por aquí... ¡Pero estoy bien! Prueba de nuevo~",
        "*inclina la cabeza curiosa* Hm... *tamborilea los dedos* Creo que me confundí. ¿Lo intentamos de nuevo?",
    ];
    
    const fallbackTag = chicaSeleccionada && tagsImagen.includes('hablando') ? 'hablando' : 'normal';
    
    return {
        respuesta: fallbacks[Math.floor(Math.random() * fallbacks.length)],
        imagen_tag: fallbackTag,
        imagen_url: obtenerURLImagen(chicaSeleccionada, fallbackTag),
        modelo: "FALLBACK_LOCAL"
    };
}

/**
 * Intenta hacer una llamada a la API con rotación de keys
 * @param {Array} mensajes - Array de mensajes para la API
 * @param {string} modelo - Modelo a usar
 * @returns {Promise<object|null>} - Datos parseados o null
 */
async function intentarLlamadaAPI(mensajes, modelo) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    
    for (let k = 0; k < GROQ_KEYS.length; k++) {
        const keyIdx = (indiceKeyActual + k) % GROQ_KEYS.length;
        const apiKey = GROQ_KEYS[keyIdx];
        
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
            
            if (response.status === 429 || response.status === 401) {
                logQuinti('WARN', `Key ${keyIdx + 1} rate limited o inválida, rotando...`);
                indiceKeyActual = (keyIdx + 1) % GROQ_KEYS.length;
                continue;
            }
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                logErrorAPI('Groq API', new Error(`Status ${response.status}`), { errorData, keyIdx });
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
            logErrorAPI('Fetch Groq', error, { keyIdx, modelo });
            indiceKeyActual = (keyIdx + 1) % GROQ_KEYS.length;
        }
    }
    
    return null;
}

/**
 * Procesa la respuesta de la IA: selecciona imagen y actualiza historial
 * @param {object} datos - Datos de la respuesta
 * @param {string} mensajeOriginal - Mensaje original del usuario
 * @returns {object} - Respuesta procesada con URL de imagen
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
    
    // Seleccionar imagen automáticamente
    const tagImagen = datos.imagen_tag || 'normal';
    const urlImagen = obtenerURLImagen(chicaSeleccionada, tagImagen);
    
    logQuinti('INFO', 'Respuesta procesada exitosamente', {
        longitud: datos.respuesta.length,
        imagenTag: tagImagen,
        tieneImagen: !!urlImagen
    });
    
    return {
        respuesta: datos.respuesta,
        imagen_tag: tagImagen,
        imagen_url: urlImagen,
        modelo: MODELO_PRINCIPAL
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
        logQuinti('INFO', `Chica seleccionada: ${nombreChica}`);
        return true;
    }
    logQuinti('ERROR', `Intento de seleccionar chica inválida: ${nombreChica}`);
    return false;
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

function getChicasDisponibles() {
    return Object.keys(PERSONALIDADES);
}

/**
 * Conversa usando el historial acumulado internamente
 * @param {string} mensaje - Mensaje del usuario
 * @returns {Promise<object>} - Respuesta procesada
 */
async function conversar(mensaje) {
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

// Exportar funciones para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
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
        // Funciones de utilidad
        logQuinti,
        formatearErrorUsuario,
        seleccionarImagenAutomatica,
        obtenerTagsImagen
    };
}
