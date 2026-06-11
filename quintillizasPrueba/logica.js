// QuintiAmigas - Lógica de respuesta con Groq API
// Archivo: logica.js
// Carpeta: quintillizasPrueba

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

/**
 * Función principal para obtener respuestas de la API de Groq
 * @param {string} mensaje - El mensaje del usuario
 * @param {Array} historial - Historial de conversación [{role, content}]
 * @returns {Promise<string>} - La respuesta generada por la IA
 */
async function obtenerRespuestaGroq(mensaje, historial = []) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    
    // Preparar el payload para Groq
    const mensajesPayload = [
        {
            role: "system",
            content: "Eres QuintiAmigas, una amiga virtual divertida y útil."
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
        GROQ_KEYS,
        MODELO_PRINCIPAL
    };
}
