// QuintiAmigas - Lógica de respuesta con Groq API
// Archivo: logica.js
// Carpeta: quintillizasPrueba

/**
 * Función principal para obtener respuestas de la API de Groq
 * @param {string} mensaje - El mensaje del usuario
 * @param {string} apiKey - La clave de API de Groq
 * @param {string} modelo - El modelo a utilizar (ej: "llama-3.1-8b-instant")
 * @returns {Promise<string>} - La respuesta generada por la IA
 */
async function obtenerRespuestaGroq(mensaje, apiKey, modelo = "llama-3.1-8b-instant") {
    try {
        const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: modelo,
                messages: [
                    { 
                        role: "user", 
                        content: mensaje 
                    }
                ],
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        if (!resp.ok) {
            throw new Error(`Error en la API: ${resp.status} - ${resp.statusText}`);
        }

        const data = await resp.json();
        const respuesta = data?.choices?.[0]?.message?.content?.trim();
        
        if (respuesta) {
            console.log("[QuintiAmigas] Respuesta obtenida correctamente");
            return respuesta;
        } else {
            throw new Error("La API no devolvió contenido válido");
        }

    } catch (error) {
        console.error("[QuintiAmigas] Error al obtener respuesta:", error.message);
        throw error;
    }
}

/**
 * Función para manejar conversación con historial
 * @param {Array} mensajes - Array de objetos {role, content}
 * @param {string} apiKey - La clave de API de Groq
 * @param {string} modelo - El modelo a utilizar
 * @returns {Promise<string>} - La respuesta generada por la IA
 */
async function conversarConHistorial(mensajes, apiKey, modelo = "llama-3.1-8b-instant") {
    try {
        const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: modelo,
                messages: mensajes,
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        if (!resp.ok) {
            throw new Error(`Error en la API: ${resp.status} - ${resp.statusText}`);
        }

        const data = await resp.json();
        const respuesta = data?.choices?.[0]?.message?.content?.trim();
        
        if (respuesta) {
            console.log("[QuintiAmigas] Conversación procesada correctamente");
            return respuesta;
        } else {
            throw new Error("La API no devolvió contenido válido");
        }

    } catch (error) {
        console.error("[QuintiAmigas] Error en la conversación:", error.message);
        throw error;
    }
}

// Exportar funciones para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        obtenerRespuestaGroq,
        conversarConHistorial
    };
}
