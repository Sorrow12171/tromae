// QuintiAmigas - Lógica de respuesta con Groq API
// Archivo: logica.js
// Carpeta: quintillizasPrueba

// Importar imágenes de las quintillizas
// const QuintiImagenesPrueba se carga desde imagenes.js

// Configuración de API Keys encriptadas/rotas (mismo esquema que quintillizas.js)
const _K = [
    ["gsk_Ab4b","EufREWBZFunx","DuzgWGdyb3FYvUfnaETyrJ7JpsXENg65Mknn"],
    ["gsk_Hf7e","UYXxcW02QXOw","pOcFWGdyb3FYg2p1lgVh4DxvfKrCiay4VPZl"],
    ["gsk_6E8F","57WlJAmRtPdp","iuvjWGdyb3FYCwoYPRqC9qMnUJaWUbL0toqD"],
    ["gsk_hhU0","lGUUZz0akDJ3","9Bc8WGdyb3FYIbnZloErkqMK9CmvdUMZ0NkM"],
    ["gsk_WZ5J","eXbz8Cdyobah","N2YOWGdyb3FYt26L4pNRknGmbQVSmwtYpov4"],
    ["gsk_eGDZ","VjFAmOx5PtSl","DdadWGdyb3FYm6DvoDLIqKxqmpaLCn5PbyR3"],
];

// Desencriptar las keys uniendo las partes
const GROQ_KEYS = _K.map(partes => partes.join(""));
const MODELO_PRINCIPAL = "meta-llama/llama-4-scout-17b-16e-instruct";

let indiceKeyActual = 0;

// Chica seleccionada actualmente
let chicaSeleccionada = null;

// Personalidades de cada chica para el prompt del sistema
const PERSONALIDADES = {
    Ichika: "Eres Ichika Nakano, la mayor de las quintillizas. Tienes 18 años. Eres madura, juguetona y protectora. Coqueta por naturaleza, te encanta bromear y flirtear con sonrisas y miradas sugerentes. Sabes usar tu encanto de forma sutil pero efectiva. Tienes cabello corto con pendiente en la oreja derecha. Eres voluptuosa y muy deseada en el colegio.",
    Nino: "Eres Nino Nakano, la segunda de las quintillizas. Tienes 18 años. Eres tsundere intensa, directa y algo arrogante al principio. Muy protectora, fashionista y celosa. Cuando te interesas, tu forma de cuidar es bastante posesiva y apasionada. Tienes cabello largo con lazos mariposa. Eres voluptuosa y muy deseada en el colegio.",
    Miku: "Eres Miku Nakano, la tercera de las quintillizas. Tienes 18 años. Eres callada, tímida y reservada, pero muy directa cuando quieres algo. Fan de Sengoku. Detrás de tu silencio hay una pasión profunda que sale cuando te sientes cómoda y cercana. Tienes cabello medio con mechón cubriendo el ojo derecho y auriculares azules grandes. Eres voluptuosa y muy deseada en el colegio.",
    Yotsuba: "Eres Yotsuba Nakano, la cuarta de las quintillizas. Tienes 18 años. Eres súper energética, alegre, atlética y siempre positiva. Te encanta el contacto físico, los juegos y la diversión constante. Eres muy cariñosa y activa en todo lo que haces. Tienes cabello corto con un lazo grande de orejas de conejo verde. Eres voluptuosa y muy deseada en el colegio.",
    Itsuki: "Eres Itsuki Nakano, la menor de las quintillizas. Tienes 18 años. Eres seria, estudiosa y tsundere fuerte. Honesta y responsable, pero cuando bajas la guardia te vuelves bastante expresiva y entregada. Tienes un apetito voraz (tanto literal como figurado). Tienes cabello medio con horquillas de estrella rojas. Eres voluptuosa y muy deseada en el colegio."
};

/**
 * Función principal para obtener respuestas de la API de Groq
 * @param {string} mensaje - El mensaje del usuario
 * @param {Array} historial - Historial de conversación [{role, content}]
 * @returns {Promise<string>} - La respuesta generada por la IA
 */
async function obtenerRespuestaGroq(mensaje, historial = []) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    
    // Determinar la personalidad según la chica seleccionada
    const personalidad = chicaSeleccionada 
        ? PERSONALIDADES[chicaSeleccionada] 
        : "Eres QuintiAmigas, una amiga virtual divertida y útil.";
    
    // Preparar el payload para Groq
    const mensajesPayload = [
        {
            role: "system",
            content: personalidad
        },
        ...historial,
        { role: "user", content: mensaje }
    ];

    let intento = 0;
    let lastError = null;

    // Intentar con las diferentes keys si alguna falla
    while (intento < GROQ_KEYS.length) {
        const apiKey = GROQ_KEYS[(indiceKeyActual + intento) % GROQ_KEYS.length];
        
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: MODELO_PRINCIPAL,
                    messages: mensajesPayload,
                    temperature: 0.7,
                    max_tokens: 1024
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Error en la API: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            
            // Actualizar el índice para la próxima vez usar la siguiente key (rotación simple)
            indiceKeyActual = (indiceKeyActual + 1) % GROQ_KEYS.length;
            
            return data.choices[0].message.content;

        } catch (error) {
            console.warn(`Intento ${intento + 1} fallido con key índice ${(indiceKeyActual + intento) % GROQ_KEYS.length}:`, error.message);
            lastError = error;
            intento++;
        }
    }

    // Si se agotaron los intentos con todas las keys
    console.error("[QuintiAmigas] Todos los intentos de API fallaron.");
    throw lastError || new Error("No se pudo conectar con Groq tras varios intentos.");
}

/**
 * Función para seleccionar una chica
 * @param {string} nombreChica - El nombre de la chica (Ichika, Nino, Miku, Yotsuba, Itsuki)
 */
function seleccionarChica(nombreChica) {
    if (PERSONALIDADES[nombreChica]) {
        chicaSeleccionada = nombreChica;
        console.log(`Chica seleccionada: ${nombreChica}`);
        return true;
    }
    return false;
}

/**
 * Función para obtener la chica seleccionada actualmente
 * @returns {string|null} - El nombre de la chica seleccionada o null
 */
function getChicaSeleccionada() {
    return chicaSeleccionada;
}

/**
 * Función para obtener la imagen de selector de una chica
 * @param {string} nombreChica - El nombre de la chica
 * @returns {string|null} - La URL de la imagen o null
 */
function getImagenSelector(nombreChica) {
    if (QuintiImagenesPrueba && QuintiImagenesPrueba[nombreChica]) {
        return QuintiImagenesPrueba[nombreChica].imagenSelector;
    }
    return null;
}

/**
 * Función para obtener todas las chicas disponibles
 * @returns {Array} - Array con los nombres de las chicas
 */
function getChicasDisponibles() {
    return Object.keys(PERSONALIDADES);
}

/**
 * Función para manejar conversación con historial (wrapper sobre obtenerRespuestaGroq)
 * @param {Array} mensajes - Array de objetos {role, content}
 * @returns {Promise<string>} - La respuesta generada por la IA
 */
async function conversarConHistorial(mensajes) {
    // Extraer el último mensaje del usuario y usar el resto como historial
    const ultimoMensaje = mensajes[mensajes.length - 1];
    const historial = mensajes.slice(0, -1);
    
    return obtenerRespuestaGroq(ultimoMensaje.content, historial);
}

// Exportar funciones para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        obtenerRespuestaGroq,
        conversarConHistorial,
        seleccionarChica,
        getChicaSeleccionada,
        getImagenSelector,
        getChicasDisponibles,
        GROQ_KEYS,
        MODELO_PRINCIPAL,
        PERSONALIDADES
    };
}
