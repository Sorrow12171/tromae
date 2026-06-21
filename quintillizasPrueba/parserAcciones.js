// ============================================================
//  PARSER DE ACCIONES - Quintillizas Prueba
//  Archivo: parserAcciones.js
//  Descripción: Detecta acciones en el texto de la IA y divide
//               el mensaje para insertar imágenes en el lugar correcto
// ============================================================

/**
 * Lista de tags de acciones sexuales/explícitas que deben mostrar imagen
 * @type {string[]}
 */
const TAGS_ACCIONES_EXPLICITAS = [
    'besando',
    'chupando_solo_la_punta_del_pene',
    'chupando_solo_la_mitad_del_pene',
    'chupando_todo_el_pene',
    'chupando_todo_el_pene_mano_en_su_cabeza_empujandola',
    'chupando_bolas',
    'chupando_bola_izquierda',
    'chupando_bola_derecha',
    'doggystyle',
    'misionero',
    'desnuda',
    'standfuck_follando_de_pie',
    'follando_en_la_ventana',
    'handjob_paja',
    'reverse_cowgirl',
    'reverse_cowgirl_le_estiro_el_ano',
    'sidefuck',
    'anal',
    'anal_cumming',
    'ichika_licking_anus',
    'nino_licking_anus',
    'miku_licking_anus',
    'follando_en_el_aire',
    'me_corro_en_su_boca_de_ichika',
    'me_corro_en_su_boca_de_nino',
    'me_corro_en_su_boca_de_miku',
    'manos_alrededor_del_cuello',
    'laminedo_pene',
    'mostrando_culo_tanga_negra'
];

/**
 * Patrones para detectar acciones en el texto
 * Cada patrón tiene asociado un tag de imagen
 * @type {Array<{patron: RegExp, tag: string}>}
 */
const PATRONES_ACCIONES = [
    { patron: /\*[^*]*(?:bes[ao]|kiss)[^*]*\*/gi, tag: 'besando' },
    { patron: /\*[^*]*(?:chup[ao]|mam[ao]|oral|felaci)[^*]*\*/gi, tag: 'chupando_todo_el_pene' },
    { patron: /\*[^*]*(?:punta|cabeza del pene)[^*]*\*/gi, tag: 'chupando_solo_la_punta_del_pene' },
    { patron: /\*[^*]*(?:mitad|medio pene)[^*]*\*/gi, tag: 'chupando_solo_la_mitad_del_pene' },
    { patron: /\*[^*]*(?:bola[s]?|testículo[s]?|escroto)[^*]*\*/gi, tag: 'chupando_bolas' },
    { patron: /\*[^*]*(?:doggy|cuatro patas|por detrás)[^*]*\*/gi, tag: 'doggystyle' },
    { patron: /\*[^*]*(?:misioner[o]?|encima|cara a cara)[^*]*\*/gi, tag: 'misionero' },
    { patron: /\*[^*]*(?:desnud[ao]|sin ropa|quit[ao] la ropa|desvistiendo)[^*]*\*/gi, tag: 'desnuda' },
    { patron: /\*[^*]*(?:anal|culo|ano|trasero)[^*]*\*/gi, tag: 'anal' },
    { patron: /\*[^*]*(?:paja|handjob|masturb[ao])[^*]*\*/gi, tag: 'handjob_paja' },
    { patron: /\*[^*]*(?:cowgirl|a caballo|encima suya)[^*]*\*/gi, tag: 'reverse_cowgirl' },
    { patron: /\*[^*]*(?:sidefuck|de lado)[^*]*\*/gi, tag: 'sidefuck' },
    { patron: /\*[^*]*(?:de pie|parad[ao]|stand)[^*]*\*/gi, tag: 'standfuck_follando_de_pie' },
    { patron: /\*[^*]*(?:ventana|cristal|vidrio)[^*]*\*/gi, tag: 'follando_en_la_ventana' },
    { patron: /\*[^*]*(?:en el aire|levantad[ao]|suspendid[ao])[^*]*\*/gi, tag: 'follando_en_el_aire' },
    { patron: /\*[^*]*(?:lam[ei]ndo|lame|anilingus|culo|ano)[^*]*\*/gi, tag: 'ichika_licking_anus' },
    { patron: /\*[^*]*(?:cuello|garganta)[^*]*\*/gi, tag: 'manos_alrededor_del_cuello' },
    { patron: /\*[^*]*(?:corrida|eyacul[ao]|se viene|orgasmo)[^*]*\*/gi, tag: 'me_corro_en_su_boca_de_ichika' }
];

/**
 * Palabras clave para detectar acciones en texto narrativo (no entre asteriscos)
 * @type {Array<{palabras: string[], tag: string}>}
 */
const PALABRAS_CLAVE_ACCIONES = [
    { palabras: ['beso', 'besa', 'besando', 'besar', 'besé'], tag: 'besando' },
    { palabras: ['chupa', 'chupando', 'mama', 'mamando', 'felación', 'oral'], tag: 'chupando_todo_el_pene' },
    { palabras: ['punta', 'cabeza del pene', 'glans'], tag: 'chupando_solo_la_punta_del_pene' },
    { palabras: ['mitad', 'medio pene'], tag: 'chupando_solo_la_mitad_del_pene' },
    { palabras: ['bola', 'bolas', 'testículos', 'escroto'], tag: 'chupando_bolas' },
    { palabras: ['doggy', 'cuatro patas', 'por detrás'], tag: 'doggystyle' },
    { palabras: ['misionero', 'encima', 'cara a cara'], tag: 'misionero' },
    { palabras: ['desnuda', 'sin ropa', 'desviste'], tag: 'desnuda' },
    { palabras: ['anal', 'culo', 'ano'], tag: 'anal' },
    { palabras: ['paja', 'handjob', 'masturba'], tag: 'handjob_paja' },
    { palabras: ['cowgirl', 'a caballo'], tag: 'reverse_cowgirl' },
    { palabras: ['de lado', 'sidefuck'], tag: 'sidefuck' },
    { palabras: ['de pie', 'parada', 'stand'], tag: 'standfuck_follando_de_pie' },
    { palabras: ['ventana', 'cristal'], tag: 'follando_en_la_ventana' },
    { palabras: ['en el aire', 'levantada'], tag: 'follando_en_el_aire' },
    { palabras: ['lamiendo', 'lame', 'anilingus'], tag: 'ichika_licking_anus' },
    { palabras: ['cuello', 'garganta'], tag: 'manos_alrededor_del_cuello' }
];

/**
 * Detecta si un fragmento de texto contiene una acción específica
 * @param {string} texto - Fragmento de texto a analizar
 * @returns {string|null} - Tag de la acción detectada o null si no hay acción
 */
export function detectarAccionEnTexto(texto) {
    if (!texto) return null;
    
    const textoLower = texto.toLowerCase();
    
    // Primero buscar patrones entre asteriscos (acciones narrativas)
    for (const { patron, tag } of PATRONES_ACCIONES) {
        patron.lastIndex = 0; // Resetear lastIndex para regex global
        if (patron.test(texto)) {
            return tag;
        }
    }
    
    // Luego buscar palabras clave en texto normal
    for (const { palabras, tag } of PALABRAS_CLAVE_ACCIONES) {
        for (const palabra of palabras) {
            if (textoLower.includes(palabra.toLowerCase())) {
                return tag;
            }
        }
    }
    
    return null;
}

/**
 * Divide un mensaje en segmentos de texto e imágenes basados en las acciones descritas
 * @param {string} mensaje - Mensaje completo de la IA
 * @param {string} chicaNombre - Nombre de la chica que responde
 * @param {Object} imagenesChica - Objeto con las imágenes disponibles de la chica
 * @returns {Array<{tipo: 'texto'|'imagen', contenido: string, tag?: string}>} - Array de segmentos
 */
export function dividirMensajeConAcciones(mensaje, chicaNombre, imagenesChica) {
    if (!mensaje || !chicaNombre || !imagenesChica) {
        return [{ tipo: 'texto', contenido: mensaje }];
    }
    
    const segmentos = [];
    const tagsDisponibles = Object.keys(imagenesChica.imagenes || {});
    
    // Dividir el mensaje por asteriscos (acciones narrativas)
    // El formato es: texto *acción* texto *acción* texto
    const partes = mensaje.split(/(\*[^\*]+\*)/g);
    
    let bufferTexto = '';
    
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        if (!parte) continue;
        
        // Es una acción entre asteriscos
        if (parte.startsWith('*') && parte.endsWith('*')) {
            // Primero agregar el buffer de texto acumulado si existe
            if (bufferTexto.trim()) {
                segmentos.push({ tipo: 'texto', contenido: bufferTexto.trim() });
                bufferTexto = '';
            }
            
            // Detectar qué acción se describe
            const accionDetectada = detectarAccionEnTexto(parte);
            
            // Verificar si la chica tiene imagen para esta acción
            if (accionDetectada && tagsDisponibles.includes(accionDetectada)) {
                segmentos.push({ 
                    tipo: 'imagen', 
                    tag: accionDetectada,
                    contenido: parte // Mantener la descripción de la acción
                });
            } else {
                // Si no hay imagen específica, tratar como texto normal
                bufferTexto += parte + ' ';
            }
        } else {
            // Es texto normal, acumular en el buffer
            bufferTexto += parte + ' ';
        }
    }
    
    // Agregar el último buffer de texto si existe
    if (bufferTexto.trim()) {
        segmentos.push({ tipo: 'texto', contenido: bufferTexto.trim() });
    }
    
    // Si no se detectaron acciones, devolver el mensaje original como un solo segmento
    if (segmentos.length === 0) {
        return [{ tipo: 'texto', contenido: mensaje }];
    }
    
    // Optimización: Si hay segmentos consecutivos del mismo tipo, combinarlos
    const segmentosOptimizados = [];
    for (const segmento of segmentos) {
        const ultimo = segmentosOptimizados[segmentosOptimizados.length - 1];
        if (ultimo && ultimo.tipo === segmento.tipo && segmento.tipo === 'texto') {
            ultimo.contenido += ' ' + segmento.contenido;
        } else {
            segmentosOptimizados.push(segmento);
        }
    }
    
    return segmentosOptimizados;
}

/**
 * Procesa un mensaje para extraer secuencias de texto-imagen-texto
 * Este es el método principal que debe usarse desde chat.html
 * @param {string} mensaje - Mensaje de la IA
 * @param {string} chicaNombre - Nombre de la chica
 * @param {Object} quintiImagenes - Objeto QuintiImagenesPrueba
 * @returns {Array<{texto: string, imagenURL?: string, imagenTag?: string}>} - Secuencia para mostrar
 */
export function procesarMensajeParaUI(mensaje, chicaNombre, quintiImagenes) {
    if (!mensaje || !chicaNombre || !quintiImagenes || !quintiImagenes[chicaNombre]) {
        return [{ texto: mensaje }];
    }
    
    const infoChica = quintiImagenes[chicaNombre];
    const segmentos = dividirMensajeConAcciones(mensaje, chicaNombre, infoChica);
    const resultado = [];
    
    for (const segmento of segmentos) {
        if (segmento.tipo === 'texto') {
            // Si ya hay un elemento en resultado y es de solo texto, combinar
            const ultimo = resultado[resultado.length - 1];
            if (ultimo && !ultimo.imagenURL) {
                ultimo.texto += ' ' + segmento.contenido;
            } else {
                resultado.push({ texto: segmento.contenido });
            }
        } else if (segmento.tipo === 'imagen') {
            // Obtener URL de la imagen
            const urlImagen = infoChica.imagenes?.[segmento.tag] || infoChica.imagenSelector;
            if (urlImagen) {
                resultado.push({
                    texto: segmento.contenido, // La descripción de la acción entre asteriscos
                    imagenURL: urlImagen,
                    imagenTag: segmento.tag
                });
            }
        }
    }
    
    // Si no se procesó nada, devolver el mensaje original
    if (resultado.length === 0) {
        return [{ texto: mensaje }];
    }
    
    return resultado;
}

/**
 * Versión simplificada para detectar si un mensaje contiene múltiples acciones
 * Útil para decidir si se debe usar el parser completo
 * @param {string} mensaje - Mensaje a verificar
 * @returns {boolean} - True si hay múltiples acciones detectadas
 */
export function tieneMultiplesAcciones(mensaje) {
    if (!mensaje) return false;
    
    // Contar cuántas acciones entre asteriscos hay
    const accionesEntreAsteriscos = mensaje.match(/\*[^\*]+\*/g);
    if (!accionesEntreAsteriscos || accionesEntreAsteriscos.length < 2) {
        return false;
    }
    
    // Verificar si al menos 2 de esas acciones son acciones explícitas diferentes
    const accionesDetectadas = new Set();
    for (const accion of accionesEntreAsteriscos) {
        const tag = detectarAccionEnTexto(accion);
        if (tag) {
            accionesDetectadas.add(tag);
        }
    }
    
    return accionesDetectadas.size >= 2;
}

/**
 * Extrae la última pregunta de un mensaje (para manejar respuestas cortas como "si"/"no")
 * @param {string} mensaje - Último mensaje de la chica
 * @returns {string|null} - La pregunta encontrada o null
 */
export function extraerUltimaPregunta(mensaje) {
    if (!mensaje) return null;
    
    // Buscar patrones de pregunta
    const patronesPregunta = [
        /([¿?].*?[?!])/g,  // Entre signos de interrogación
        /(\w+\s+qué\s+\w+[?!])/gi,  // preguntas con "qué"
        /(\w+\s+cómo\s+\w+[?!])/gi,  // preguntas con "cómo"
        /(\w+\s+cuándo\s+\w+[?!])/gi,  // preguntas con "cuándo"
        /(\w+\s+dónde\s+\w+[?!])/gi,  // preguntas con "dónde"
        /(\w+\s+por\s+qué\s+\w+[?!])/gi,  // preguntas con "por qué"
        /(\w+\s+quieres?\s+\w+[?!])/gi,  // preguntas con "quieres"
        /(\w+\s+puedes?\s+\w+[?!])/gi,  // preguntas con "puedes"
        /(\w+\s+te\s+gusta[rn]?\s+\w+[?!])/gi,  // preguntas con "te gusta"
        /(\w+\s+vas\s+a\s+\w+[?!])/gi,  // preguntas con "vas a"
    ];
    
    // Encontrar todas las preguntas en el mensaje
    const preguntas = [];
    for (const patron of patronesPregunta) {
        patron.lastIndex = 0;
        let match;
        while ((match = patron.exec(mensaje)) !== null) {
            preguntas.push(match[0]);
        }
    }
    
    // Devolver la última pregunta encontrada
    return preguntas.length > 0 ? preguntas[preguntas.length - 1] : null;
}

/**
 * Determina si una respuesta corta ("si", "no", etc.) es respuesta a una pregunta anterior
 * @param {string} respuestaUsuario - Respuesta del usuario (ej: "si", "no")
 * @param {string} ultimoMensajeChica - Último mensaje de la chica
 * @returns {{esRespuestaCorta: boolean, preguntaAnterior?: string, interpretacion?: string}}
 */
export function interpretarRespuestaCorta(respuestaUsuario, ultimoMensajeChica) {
    const respuestasCortas = ['si', 'sí', 'no', 'obvio', 'claro', 'tal vez', 'quizás', 'puede ser', 'seguro', 'y'];
    
    const respuestaLower = respuestaUsuario.toLowerCase().trim();
    
    if (!respuestasCortas.includes(respuestaLower)) {
        return { esRespuestaCorta: false };
    }
    
    const preguntaAnterior = extraerUltimaPregunta(ultimoMensajeChica);
    
    if (preguntaAnterior) {
        let interpretacion = '';
        
        if (['si', 'sí', 'obvio', 'claro', 'seguro'].includes(respuestaLower)) {
            interpretacion = `Sí, ${preguntaAnterior}`;
        } else if (respuestaLower === 'no') {
            interpretacion = `No, ${preguntaAnterior}`;
        } else if (['tal vez', 'quizás', 'puede ser'].includes(respuestaLower)) {
            interpretacion = `Tal vez, ${preguntaAnterior}`;
        }
        
        return {
            esRespuestaCorta: true,
            preguntaAnterior,
            interpretacion
        };
    }
    
    return {
        esRespuestaCorta: true,
        interpretacion: respuestaUsuario
    };
}

// Exportaciones para compatibilidad
export default {
    detectarAccionEnTexto,
    dividirMensajeConAcciones,
    procesarMensajeParaUI,
    tieneMultiplesAcciones,
    extraerUltimaPregunta,
    interpretarRespuestaCorta,
    TAGS_ACCIONES_EXPLICITAS,
    PATRONES_ACCIONES
};
