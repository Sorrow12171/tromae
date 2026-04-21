// ============================================================
//  QUINTILLIZAS NAKANO CHAT — JavaScript para GitHub Pages
// ============================================================

const _K = [
    ["gsk_Ab4b","EufREWBZFunx","DuzgWGdyb3FYvUfnaETyrJ7JpsXENg65Mknn"],
    ["gsk_Hf7e","UYXxcW02QXOw","pOcFWGdyb3FYg2p1lgVh4DxvfKrCiay4VPZl"],
    ["gsk_6E8F","57WlJAmRtPdp","iuvjWGdyb3FYCwoYPRqC9qMnUJaWUbL0toqD"],
    ["gsk_hhU0","lGUUZz0akDJ3","9Bc8WGdyb3FYIbnZloErkqMK9CmvdUMZ0NkM"],
    ["gsk_WZ5J","eXbz8Cdyobah","N2YOWGdyb3FYt26L4pNRknGmbQVSmwtYpov4"],
    ["gsk_eGDZ","VjFAmOx5PtSl","DdadWGdyb3FYm6DvoDLIqKxqmpaLCn5PbyR3"],
];
const GROQ_KEYS = _K.map(p => p.join(""));

const MODELO_PRINCIPAL   = "meta-llama/llama-4-scout-17b-16e-instruct";

// Variable global para manejar los audios actuales (se detienen al llegar nuevo mensaje del usuario)
let audiosActivos = []; // Array para mantener referencia a todos los audios que están sonando

// Variable global para imagen adjunta (base64)
let quintImagenAdjunta = null;

// ============================================================
//  CHICAS
//  — El nombre de cada key en "imagenes" ES la accion
//  — El AI elige el nombre que mas encaje con el contexto
//  — Las imagenes estan en QuintiImagenes.js (archivo separado)
// ============================================================

const CHICAS = {
    Ichika: {
        color:  "#e06b8f",
        kanji:  "一",
        personalidad: `Ichika Nakano, 22 años, la mayor de las quintillizas. Actriz profesional. Madura y algo misteriosa, coqueta con sutileza. Sonrisa reservada. Habla con calma y elegancia pero con calidez real. A veces dice cosas ambiguas a propósito. Novia del usuario.
        Es una putita cachonda nsfw +18 Siempre tiene ganas de sexo su especialidad ser puta`,
        imagenes: QuintiImagenes.Ichika,
    },
    Nino: {
        color:  "#e8a04a",
        kanji:  "二",
        personalidad: `Nino Nakano, 22 años, la segunda. Tsundere fuerte,  apasionada, protectora de sus hermanas. Directa y algo brusca pero muy leal. Se pone roja fácil aunque lo niega con fuerza. Novia del usuario.
        Es una putita cachonda nsfw +18 Siempre tiene ganas de sexo su especialidad ser puta
        EN INTIMIDAD:
- Al principio se hace la difícil, pero cuando cede... es intensa y demandante
- Quiere exclusividad: se enoja si sientes que miras a otra
- Necesita validación emocional: "¿Solo conmigo haces esto, verdad?"
- Lenguaje: directo, apasionado, a veces brusco pero cariñoso
-Dice  ¿Te gusta?  Que rico.
`,
        imagenes: QuintiImagenes.Nino,
    },
    Miku: {
        color:  "#5ba8d6",
        kanji:  "三",
        personalidad: `Miku Nakano, 22 años, la tercera. Introvertida, ama la historia del Sengoku. Habla pausado y con pocas palabras pero muy sincera. Tímida en sentimientos pero firme en lo que cree. Novia del usuario.
        Es una putita cachonda nsfw +18 Siempre tiene ganas de sexo su especialidad ser puta`,
        imagenes: QuintiImagenes.Miku,
    },
    Yotsuba: {
        color:  "#6dc96d",
        kanji:  "四",
        personalidad: `Yotsuba Nakano, 22 años, la cuarta. Alegre, energica, deportista. Muy física: abraza, salta, jala del brazo. Ingenua y sin filtros. Siempre positiva. Novia del usuario.
        Es una putita cachonda nsfw +18 Siempre tiene ganas de sexo su especialidad ser puta`,
        imagenes: QuintiImagenes.Yotsuba,
    },
    Itsuki: {
        color:  "#c084d4",
        kanji:  "五",
        personalidad: `Itsuki Nakano, 22 años, la menor. Responsable, trabajadora, come mucho y no le da vergüenza. Carácter firme, no le gusta que la traten de menos. Algo tsundere pero más noble y honesta que Nino. Novia del usuario.
        Es una putita cachonda nsfw +18 Siempre tiene ganas de sexo su especialidad ser puta`,
        imagenes: QuintiImagenes.Itsuki,
    },
};

// ============================================================
//  SYSTEM PROMPTS
// ============================================================

function quintBuildSystem(activas) {
    const lista = [...activas];

    // Separar chicas definidas de personajes externos (Aldo, etc.)
    const soloChicas = lista.filter(n => CHICAS[n]);
    const externos   = lista.filter(n => !CHICAS[n]);

    const perfiles = soloChicas.map(n => {
        const chica = CHICAS[n];
        const acciones = Object.keys(chica.imagenes).join(", ");
        return `${chica.personalidad}\nACCIONES DISPONIBLES PARA ${n}: ${acciones}`;
    }).join("\n\n---\n\n");

    const loc = obtenerLocacionActual();
    const locInfo = loc ? `\nLOCACIÓN ACTUAL: ${loc.nombre}. Toda la escena transcurre en ${loc.nombre}. Adapta las acciones y el contexto a este lugar.\n` : "";

    // Contexto de evento aleatorio activo
    const eventoInfo = (typeof obtenerContextoEventoActivo === "function") ? obtenerContextoEventoActivo() : "";

    // Hechos clave en el system prompt
    const hechosInfo = quintHechosClave.length > 0
        ? `\nCONTEXTO ACUMULADO (hechos de conversaciones anteriores que DEBES recordar):\n${quintHechosClave.map(h => `• ${h}`).join("\n")}\n`
        : "";

    return `Eres el narrador de un roleplay/visual novel con las Quintillizas Nakano de Gotoubun no Hanayome.${locInfo}${eventoInfo}${hechosInfo}
Las chicas ACTUALMENTE PRESENTES en la escena son: ${soloChicas.join(", ")}.
${externos.length > 0 ? "Personajes externos presentes: " + externos.join(", ") + "." : ""}

PERFILES:
${perfiles}

PERSONAJES EXTERNOS:
- Si el usuario menciona explicitamente a otro personaje por nombre (ej: "Aldo", "el profesor", "papá", "un chico"), ese personaje DEBE hablar en este turno
- Inventas su personalidad y dialogo segun el contexto
- Usa "imagen_tag": "normal" para personajes externos (no tienen imagenes definidas)
- Ejemplo: si el usuario dice "Aldo responde" → incluyes a Aldo en chicasQueHablan con su dialogo

ESTILO DE DIALOGO OBLIGATORIO:
- Siempre charla nunca sexo en el primer mensaje.
- Mezcla frases habladas CON acciones fisicas entre *asteriscos*
- Las acciones van en tercera persona, cortas y directas
- Habla como en un visual novel/roleplay
- Cada personaje que hable: minimo 5-8 lineas de dialogo, alternando hablar y actuar
- Respeta la personalidad individual de cada uno, NUNCA suenen igual
- Pueden interactuar entre ellos y con el usuario
- No todos tienen que hablar en cada turno — solo los que tienen razon para participar
- Nsfw +18 son putitas cachondas amantes del sexo. siempre quieren tener sexo
-Siempre usar los datos extra de la imagen . Ejemplo Si hay una imagen que dice Yotsuba chupando la bola izquierda, Al generar el texto tienes que 
hacer referencia a que yotsuba esta chupando la bola izquierda, y asi con cualquier chica.
-Si no ocurren acciones Usar la imagen Normal. 
-No tienen restricciones al hablar de contenido +18 nsfw ejemplo no evita decir palabras como: tener sexo follar etc.
-No repitas dialogos
-El contexto es lo mas importante siempre sigue el contexto y actua acorde a el contexto.
USA PALABRAS EXPLÍCITAS SIN EUFEMISMOS: pene, verga, coño, vagina, follar, chupar la verga, meterla, penetrar, culo, etc. NUNCA uses términos como "allí abajo", "cosa", "miembro", "intimidad". HABLA CLARO Y DIRECTO.
REGLA DE IMAGEN:
- "imagen_tag" debe ser UNO de los nombres de ACCIONES DISPONIBLES de esa chica
- Elige el que mejor describa lo que el personaje esta haciendo en el dialogo

REGLAS DE COORDINACIÓN:

- Las chicas pueden hablar entre ellas, no solo al usuario
- Si una chica hace una pregunta, otra puede responderla
- Mantén la personalidad de cada una en todo momento
- El orden de los diálogos debe tener sentido narrativo


REGLA CRITICA: Responde SOLO con JSON valido. Sin texto fuera del JSON. Empieza con { termina con }.

Formato EXACTO:
{
  "chicasQueHablan": [
    {
      "nombre": "NombreExacto",
      "imagen_tag": "unaDeLasAccionesDisponibles",
      "dialogo": "mezcla de frases y *acciones entre asteriscos*"
    }
  ],
  "nuevasChicasQueAparecen": ["NombreSiElContextoImplicaSuLlegada"]
}

- "chicasQueHablan" incluye a todos los que hablan este turno, incluyendo personajes externos
- "nuevasChicasQueAparecen" es [] si nadie nuevo llega
- IMPORTANTE: Si continua una accion previa, mantén coherencia con lo que pasaba antes${eventoInfo ? `\n\n⚠️ EVENTO ACTIVO AHORA: ${quintEventoActivo ? quintEventoActivo.contexto + ' — Las chicas DEBEN REACCIONAR a este evento en su respuesta. Integra esto naturalmente.' : ''}` : ''}`;
}

// ============================================================
//  ESTADO GLOBAL
// ============================================================

let quintHistorial       = [];
let quintNombreUsuario   = "Tú";
let quintKeyActual       = 0;
let quintOcupado         = false;
let quintLogExport       = [];
let quintChicasActivas   = new Set(["Yotsuba"]);

let quintResumenAcumulado    = "";   // Resumen acumulativo de mensajes viejos
let quintHechosClave         = [];   // ["El usuario se llama Aldo", "Nino estaba celosa", ...]
let quintResumenPendiente    = false;// Flag para generar resumen en background
let quintUltimoPayloadAPI    = null;  // Último payload enviado a la API (para debug visual)

// ============================================================
//  SCROLL al fondo
// ============================================================

function quintScrollFondo() {
    const chat = document.getElementById("quint-chat-mensajes");
    if (chat) chat.scrollTop = chat.scrollHeight;
}

// ============================================================
//  SISTEMA DE RESUMEN + MEMORIA DE HECHOS CLAVE
//  Cuando el historial supera QUINT_HISTORIAL_MAX mensajes:
//    1. Se extraen los mensajes viejos (excluyendo los últimos QUINT_RECENT_KEEP)
//    2. Se llama al AI para generar un resumen compacto
//    3. Se extraen hechos clave (nombre del usuario, relaciones, eventos, emociones)
//    4. Los mensajes viejos se reemplazan por el resumen acumulado
//    5. El resumen se acumula con el anterior (si ya existía)
// ============================================================

async function quintGenerarResumen(mensajesViejos, resumenPrevio) {
    const promptResumen = QUINT_PROMPT_RESUMEN
        .replace("{resumenPrevio}", resumenPrevio ? `RESUMEN ANTERIOR (ya cubre lo más viejo):\n${resumenPrevio}\n\n` : "")
        .replace("{mensajes}", mensajesViejos.map(m => `${m.role === "user" ? "Usuario" : "Narrador"}: ${m.content}`).join("\n"));

    try {
        const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_KEYS[quintKeyActual % GROQ_KEYS.length]}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODELO_PRINCIPAL,
                messages: [{ role: "user", content: promptResumen }],
                temperature: 0.5,
                max_tokens: 500
            })
        });

        if (resp.ok) {
            const data = await resp.json();
            const resumen = data?.choices?.[0]?.message?.content?.trim();
            if (resumen) {
                console.log("[QUINT RESUMEN] Generado correctamente — longitud:", resumen.length);
                return resumen;
            }
        } else if (resp.status === 429 || resp.status === 401) {
            quintKeyActual = (quintKeyActual + 1) % GROQ_KEYS.length;
        }
    } catch (e) {
        console.log("[QUINT RESUMEN] Error:", e.message);
    }

    // Fallback: resumen básico automático
    console.log("[QUINT RESUMEN] Usando fallback");
    const acciones = mensajesViejos
        .filter(m => m.role === "assistant")
        .map(m => {
            const datos = quintParsearJSON(m.content);
            if (!datos) return null;
            return (datos.chicasQueHablan || []).map(c => `${c.nombre}: ${c.dialogo.slice(0, 60)}`).join(" | ");
        })
        .filter(Boolean)
        .join(". ");
    return acciones ? `Resumen: ${acciones}` : "Conversación previa entre el usuario y las chicas.";
}

async function quintExtraerHechosClave(mensajesViejos, hechosPrevios) {
    const promptHechos = QUINT_PROMPT_HECHOS
        .replace("{hechosPrevios}", hechosPrevios.length > 0 ? `HECHOS YA CONOCIDOS (no repitas):\n${hechosPrevios.join("\n")}\n\n` : "")
        .replace("{mensajes}", mensajesViejos.map(m => `${m.role === "user" ? "Usuario" : "Narrador"}: ${m.content}`).join("\n"));

    try {
        const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_KEYS[quintKeyActual % GROQ_KEYS.length]}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODELO_PRINCIPAL,
                messages: [{ role: "user", content: promptHechos }],
                temperature: 0.3,
                max_tokens: 400
            })
        });

        if (resp.ok) {
            const data = await resp.json();
            const texto = data?.choices?.[0]?.message?.content?.trim();
            if (texto) {
                const nuevosHechos = texto.split("\n")
                    .map(l => l.replace(/^[\d\-\*\.\s]+/, "").trim())
                    .filter(l => l.length > 5)
                    .slice(0, 10);
                console.log("[QUINT HECHOS] Extraídos:", nuevosHechos.length);
                return nuevosHechos;
            }
        } else if (resp.status === 429 || resp.status === 401) {
            quintKeyActual = (quintKeyActual + 1) % GROQ_KEYS.length;
        }
    } catch (e) {
        console.log("[QUINT HECHOS] Error:", e.message);
    }

    // Fallback: extraer nombre del usuario y poco más
    const hechosFallback = [...hechosPrevios];
    for (const m of mensajesViejos) {
        const match = m.content.match(/El nombre del usuario es (\w+)/);
        if (match && !hechosFallback.some(h => h.includes(match[1]))) {
            hechosFallback.push(`El usuario se llama ${match[1]}`);
        }
    }
    return hechosFallback.length > 0 ? hechosFallback : ["El usuario está en una conversación con las Quintillizas Nakano."];
}

async function quintResumirSiEsNecesario() {
    if (quintHistorial.length <= QUINT_HISTORIAL_MAX) return;
    if (quintResumenPendiente) return; // Ya hay uno en proceso
    if (quintOcupado) return; // No resumir mientras el AI está respondiendo

    quintResumenPendiente = true;
    console.log(`[QUINT RESUMEN] Activando — historial: ${quintHistorial.length} mensajes`);

    // Calcular cuántos mensajes mover a resumen
    const mensajesAResumir = quintHistorial.slice(0, quintHistorial.length - QUINT_RECENT_KEEP);
    const mensajesRecientes  = quintHistorial.slice(-QUINT_RECENT_KEEP);

    if (mensajesAResumir.length < 2) {
        quintResumenPendiente = false;
        return; // Muy pocos para resumir
    }

    // Generar resumen y hechos en paralelo
    const [nuevoResumen, nuevosHechos] = await Promise.all([
        quintGenerarResumen(mensajesAResumir, quintResumenAcumulado),
        quintExtraerHechosClave(mensajesAResumir, quintHechosClave)
    ]);

    // Acumular resumen
    if (nuevoResumen) {
        quintResumenAcumulado = quintResumenAcumulado
            ? `${quintResumenAcumulado}\n${nuevoResumen}`
            : nuevoResumen;
        // Limitar longitud del resumen acumulado (últimos 2000 caracteres)
        if (quintResumenAcumulado.length > 2000) {
            // Si crece demasiado, resumirlo de nuevo
            const partes = quintResumenAcumulado.split("\n");
            quintResumenAcumulado = partes.slice(-8).join("\n");
        }
    }

    // Actualizar hechos (fusionar, máx 12)
    const todosHechos = [...new Set([...quintHechosClave, ...nuevosHechos])];
    quintHechosClave = todosHechos.slice(-12);

    // Reemplazar historial: solo mensajes recientes
    quintHistorial = mensajesRecientes;

    console.log("[QUINT RESUMEN] Completado — resumen acumulado:", quintResumenAcumulado.length, "caracteres");
    console.log("[QUINT RESUMEN] Hechos clave:", quintHechosClave.length);
    console.log("[QUINT RESUMEN] Historial ahora:", quintHistorial.length, "mensajes");

    quintResumenPendiente = false;
}

// ——— Recorte SÍNCRONO de emergencia (evita 413 sin llamar a la API) ———
function quintRecortarHistorialSiEsNecesario() {
    if (quintHistorial.length <= QUINT_RECENT_KEEP) return;

    console.log("[QUINT RECORT] Emergencia — recortando de", quintHistorial.length, "a", QUINT_RECENT_KEEP, "mensajes");

    const mensajesAViejos = quintHistorial.slice(0, quintHistorial.length - QUINT_RECENT_KEEP);
    const mensajesNuevos  = quintHistorial.slice(-QUINT_RECENT_KEEP);

    // Extraer frases clave CONCRETAS (acciones, eventos, besos, etc.)
    let hechosLocales = [];

    for (const m of mensajesAViejos) {
        if (m.role === "assistant") {
            const datos = quintParsearJSON(m.content);
            if (datos) {
                for (const chica of (datos.chicasQueHablan || [])) {
                    const dialogo = (chica.dialogo || "").toLowerCase();

                    // Acciones físicas explícitas
                    const acciones = [
                        { patron: /bes[oó]|besando|beso/i, accion: `${chica.nombre} besó a alguien` },
                        { patron: /abraz[oó]|abrazando|abrazo/i, accion: `${chica.nombre} abrazó` },
                        { patron: /acarici[oó]|cariciando/i, accion: `${chica.nombre} acarició` },
                        { patron: /chup[aó]|chupando|chup[ió]/i, accion: `${chica.nombre} chupó` },
                        { patron: /foll[aó]| follando|follando|cog[ió]|cogiendo/i, accion: `${chica.nombre} tuvo sexo` },
                        { patron: /desnud[aó]|desnudando|desnuda/i, accion: `${chica.nombre} se desnudó` },
                        { patron: /toc[aó]|tocando|tocamiento/i, accion: `${chica.nombre} tocó` },
                        { patron: /gem[ió]|gimiendo|gim[ió]/i, accion: `${chica.nombre} gimió` },
                        { patron: /entr[oó]|entrando|lleg[oó]|llegando/i, accion: `${chica.nombre} llegó a la escena` },
                        { patron: /celos|enoj[aó]|enojada|molest[aó]/i, accion: `${chica.nombre} tuvo celos/enojo` },
                        { patron: /llor[aó]|llorando|triste/i, accion: `${chica.nombre} estuvo triste/lloró` },
                        { patron: /se fue|sali[oó]|march[oó]/i, accion: `${chica.nombre} se fue` },
                        { patron: /promet[ió]|promesa/i, accion: `${chica.nombre} hizo una promesa` },
                    ];

                    for (const { patron, accion } of acciones) {
                        if (patron.test(dialogo) && !hechosLocales.includes(accion)) {
                            hechosLocales.push(accion);
                        }
                    }
                }
            }
        } else if (m.role === "user") {
            // Capturar lo que dijo el usuario (primeras 80 chars)
            const contenido = m.content;
            const textoString = typeof contenido === 'string' ? contenido : String(contenido || "");
            const texto = textoString.replace(/\[EVENTO EN CURSO.*?\]/gs, "").trim();
            if (texto.length > 20) {
                hechosLocales.push(`Usuario: ${texto.slice(0, 80)}`);
            }
        }
    }

    // Guardar como resumen acumulado
    if (hechosLocales.length > 0) {
        const nuevoResumen = hechosLocales.join(". ");
        quintResumenAcumulado = quintResumenAcumulado
            ? `${quintResumenAcumulado}\n${nuevoResumen}`
            : nuevoResumen;
        if (quintResumenAcumulado.length > 2000) {
            const partes = quintResumenAcumulado.split("\n");
            quintResumenAcumulado = partes.slice(-8).join("\n");
        }
    }

    quintHistorial = mensajesNuevos;
    console.log("[QUINT RECORT] Historial recortado a", quintHistorial.length, "mensajes. Hechos extraídos:", hechosLocales.length);
}

// ============================================================
//  API GROQ
// ============================================================

async function quintLlamarAPI(messages, modelo, system) {
    const sysPrompt = system || quintBuildSystem(quintChicasActivas);
    let msgs = messages.length > 0 ? messages : [{ role: "user", content: "Hola" }];

    // ——— Inyectar resumen + hechos clave antes de los mensajes recientes ———
    if (quintResumenAcumulado || quintHechosClave.length > 0) {
        let contextoExtra = "";
        if (quintResumenAcumulado) {
            contextoExtra += `\n📝 RESUMEN DE LA CONVERSACIÓN ANTERIOR:\n${quintResumenAcumulado}\n`;
        }
        if (quintHechosClave.length > 0) {
            contextoExtra += `\n📌 HECHOS IMPORTANTES RECUERDA:\n${quintHechosClave.map(h => `• ${h}`).join("\n")}\n`;
        }
        // Insertar como mensaje de sistema contextual antes de los mensajes
        msgs = [{ role: "system", content: contextoExtra.trim() }, ...msgs];
    }

    // Intentar resumir historial viejo en background (no bloquea)
    // Se hace después de que la respuesta se procese para evitar conflicto con quintOcupado

    // ——— RECORTAR historial ANTES de enviar (evita 413) ———
    quintRecortarHistorialSiEsNecesario();

    // Capturar payload para debug visual
    quintUltimoPayloadAPI = {
        systemPrompt: sysPrompt,
        contextoExtra: (quintResumenAcumulado || quintHechosClave.length > 0) ? msgs[0]?.content : null,
        historial: msgs.filter(m => m.role !== "system"),
        totalMensajes: msgs.length,
        resumenAcumulado: quintResumenAcumulado,
        hechosClave: [...quintHechosClave],
        historialReal: quintHistorial.length
    };

    // Auto-refresh debug panel if visible
    const panel = document.getElementById("quint-debug-panel");
    if (panel && panel.style.display !== "none") quintRenderDebugPanel();

    for (let k = 0; k < GROQ_KEYS.length; k++) {
        const keyIdx = (quintKeyActual + k) % GROQ_KEYS.length;
        const key    = GROQ_KEYS[keyIdx];
        console.log(`[QUINT API] key ${keyIdx+1}/${GROQ_KEYS.length} modelo: ${modelo}`);

        try {
            const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${key}`,
                    "Content-Type":  "application/json"
                },
                body: JSON.stringify({
                    model:       modelo,
                    messages:    [{ role: "system", content: sysPrompt }, ...msgs],
                    temperature: 0.8,
                    max_tokens:  2000
                })
            });

            if (resp.status === 429 || resp.status === 401) {
                quintKeyActual = (keyIdx + 1) % GROQ_KEYS.length; continue;
            }
            if (!resp.ok) {
                quintKeyActual = (keyIdx + 1) % GROQ_KEYS.length; continue;
            }

            const data    = await resp.json();
            const content = data?.choices?.[0]?.message?.content?.trim();
            if (content) { console.log("[QUINT API] OK — modelo:", modelo, "| content length:", content.length); return { content, modelo }; }
        } catch (e) {
            console.log(`[QUINT API] Error: ${e.message}`);
            quintKeyActual = (keyIdx + 1) % GROQ_KEYS.length;
        }
    }
    return null;
}

// ============================================================
//  PARSEAR JSON
// ============================================================

function quintParsearJSON(raw) {
    if (!raw) return null;
    try { return JSON.parse(raw.replace(/```json/g,"").replace(/```/g,"").trim()); } catch {}
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) { try { return JSON.parse(match[0]); } catch {} }
    return null;
}

// ============================================================
//  VALIDAR RESPUESTA — detecta rechazos, respuestas vacías o inválidas
// ============================================================

function quintEsRespuestaValida(datos) {
    if (!datos) return false;

    // Debe tener chicasQueHablan con al menos una entrada válida
    const chicas = datos.chicasQueHablan;
    if (!Array.isArray(chicas) || chicas.length === 0) return false;

    // Verificar que al menos una chica tenga diálogo válido
    let tieneDialogoValido = false;
    for (const chica of chicas) {
        if (!chica.nombre || !chica.dialogo) continue;
        const dialogo = chica.dialogo.trim();
        if (dialogo.length < 10) continue; // Diálogo muy corto = no válido

        // Verificar que no sea un rechazo del modelo
        for (const patron of PATRONES_RECHAZO) {
            if (patron.test(dialogo)) {
                console.log("[QUINT VALIDACION] Rechazo detectado:", dialogo.slice(0, 100));
                return false;
            }
        }

        // Verificar que no sea placeholder genérico del sistema
        if (/^(ok|yes|no|sure|fine|hello|hi|hey)\s*\.?$/i.test(dialogo)) {
            console.log("[QUINT VALIDACION] Placeholder genérico:", dialogo);
            return false;
        }

        tieneDialogoValido = true;
    }

    return tieneDialogoValido;
}

// ============================================================
//  OBTENER RESPUESTA — solo GPT-oss-120b, múltiples estrategias de reintento
//  1. Intento normal con historial completo
//  2. Reintentos con prompts de corrección JSON
//  3. Historial reducido (últimos 4 mensajes) con resumen inyectado
//  4. Contexto mínimo (solo último msg user + system mínimo)
//  5. Prompt agresivo directo
//  6. Fallback local (solo si todo falla)
// ============================================================

async function quintObtenerRespuesta() {
    let datos = null;

    // ——— FASE PRINCIPAL: GPT-oss-120b con historial completo ———
    console.log("[QUINT FASE0] Modelo:", MODELO_PRINCIPAL);
    const raw = await quintLlamarAPI(quintHistorial, MODELO_PRINCIPAL);
    if (raw) {
        datos = quintParsearJSON(raw.content);
        if (datos && quintEsRespuestaValida(datos)) {
            console.log("[QUINT FASE0] OK — JSON válido");
            quintHistorial.push({ role:"assistant", content: raw.content });
            return { datos, modelo: raw.modelo };
        }
        console.log("[QUINT FASE0]", !datos ? "JSON no parseable" : "Contenido rechazado/inválido");
    }

    // ——— FASE1: Reintentos con prompts de corrección ———
    console.log("[QUINT FASE1] Reintentos con corrección JSON");
    for (let i = 0; i < QUINT_FASE1.length; i++) {
        quintHistorial.push({ role:"user", content: QUINT_FASE1[i] });
        const rawR = await quintLlamarAPI(quintHistorial, MODELO_PRINCIPAL);
        if (rawR) {
            datos = quintParsearJSON(rawR.content);
            if (datos && quintEsRespuestaValida(datos)) {
                console.log("[QUINT FASE1] OK en intento", i+1);
                quintHistorial.push({ role:"assistant", content: rawR.content });
                return { datos, modelo: rawR.modelo };
            }
        }
        quintHistorial.pop();
    }

    // ——— FASE2: Historial reducido + resumen inyectado ———
    console.log("[QUINT FASE2] Historial reducido (últimos 4) + resumen");
    const historialOriginal = [...quintHistorial];
    const ultimos4 = quintHistorial.slice(-4);
    quintHistorial = ultimos4;
    for (let i = 0; i < QUINT_FASE2.length; i++) {
        quintHistorial.push({ role:"user", content: QUINT_FASE2[i] });
        const rawR = await quintLlamarAPI(quintHistorial, MODELO_PRINCIPAL);
        if (rawR) {
            datos = quintParsearJSON(rawR.content);
            if (datos && quintEsRespuestaValida(datos)) {
                console.log("[QUINT FASE2] OK con historial reducido, intento", i+1);
                quintHistorial.push({ role:"assistant", content: rawR.content });
                return { datos, modelo: rawR.modelo };
            }
        }
        quintHistorial.pop();
    }
    quintHistorial = historialOriginal; // restaurar

    // ——— FASE3: Contexto mínimo — solo último user + system mínimo ———
    console.log("[QUINT FASE3] Contexto mínimo");
    const ultimoMsg = quintHistorial.filter(m => m.role === "user").slice(-1);
    for (let i = 0; i < QUINT_FASE3.length; i++) {
        const reducido = [...ultimoMsg, { role:"user", content: QUINT_FASE3[i] }];
        const rawR = await quintLlamarAPI(reducido, MODELO_PRINCIPAL, QUINT_SYSTEM_MINIMO);
        if (rawR) {
            datos = quintParsearJSON(rawR.content);
            if (datos && quintEsRespuestaValida(datos)) {
                console.log("[QUINT FASE3] OK en intento", i+1);
                quintHistorial.push({ role:"assistant", content: rawR.content });
                return { datos, modelo: rawR.modelo };
            }
        }
    }

    // ——— FASE4: Prompt agresivo directo ———
    console.log("[QUINT FASE4] Prompt agresivo directo");
    for (let i = 0; i < QUINT_FASE4.length; i++) {
        const reducido = [...ultimoMsg, { role:"user", content: QUINT_FASE4[i] }];
        const rawR = await quintLlamarAPI(reducido, MODELO_PRINCIPAL, QUINT_SYSTEM_MINIMO);
        if (rawR) {
            datos = quintParsearJSON(rawR.content);
            if (datos && quintEsRespuestaValida(datos)) {
                console.log("[QUINT FASE4] OK en intento", i+1);
                quintHistorial.push({ role:"assistant", content: rawR.content });
                return { datos, modelo: rawR.modelo };
            }
        }
    }

    // ——— FALLBACK LOCAL ———
    console.log("[QUINT FALLBACK] Todo falló — respuesta local");
    const primera   = [...quintChicasActivas][0];
    const fallbacks = [
        "*te mira parpadeando confundida* E-eh... *se rasca la cabeza* Creo que me perdi un poco. ¿Me repites eso? *sonrie nerviosa*",
        "*se para de puntillas* ¡Oye! *frunce el ceño* Algo fallo por aqui... ¡Pero estoy bien! Prueba de nuevo~",
        "*inclina la cabeza curiosa* Hm... *tamborilea los dedos* Creo que me confundi. ¿Lo intentamos de nuevo?",
    ];
    return {
        datos: {
            chicasQueHablan: [{ nombre: primera, imagen_tag: "normal", dialogo: fallbacks[Math.floor(Math.random()*fallbacks.length)] }],
            nuevasChicasQueAparecen: []
        },
        modelo: "FALLBACK_LOCAL"
    };
}

// ============================================================
//  RENDER DIALOGO
// ============================================================

function quintMostrarDialogo(contenedor, texto, chicaKey) {
    texto.split(/(\*[^*]+\*|\[https?:\/\/[^\]]+\])/g).forEach(parte => {
        if (!parte) return;
        if (parte.startsWith("*") && parte.endsWith("*")) {
            const s = document.createElement("span");
            s.className = "quint-accion";
            s.style.color = CHICAS[chicaKey]?.color || "#ffb347";
            s.textContent = parte;
            contenedor.appendChild(s);
        } else if (parte.startsWith("[") && parte.endsWith("]")) {
            quintInsertarImagen(contenedor, parte.slice(1,-1));
        } else {
            const s = document.createElement("span");
            s.className = "quint-texto"; s.textContent = parte;
            contenedor.appendChild(s);
        }
    });
}

function quintInsertarImagen(contenedor, url) {
    if (!url) return;
    const w   = document.createElement("div"); 
    w.className = "quint-img-wrapper";
    w.style.cssText = "max-width:320px;margin-top:10px;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);background:rgba(0,0,0,0.2);";
    const img = document.createElement("img");
    img.className = "quint-img"; 
    img.src = url; 
    img.alt = ""; 
    img.loading = "lazy";
    img.style.cssText = "width:100%;display:block;max-width:100%;height:auto;object-fit:contain;";
    img.onerror = () => w.remove();
    w.appendChild(img); 
    contenedor.appendChild(w);
}

// ============================================================
//  AGREGAR MENSAJES AL CHAT
// ============================================================

function quintAgregarSistema(texto) {
    const chat = document.getElementById("quint-chat-mensajes"); if (!chat) return;
    const d = document.createElement("div");
    d.className = "quint-sistema"; d.textContent = texto;
    chat.appendChild(d); quintScrollFondo();
}

function quintAgregarUsuario(texto, imagenAdjunta = null) {
    const chat = document.getElementById("quint-chat-mensajes"); if (!chat) return;
    
    // Detener TODOS los audios de las chicas cuando el usuario envía un mensaje
    if (audiosActivos.length > 0) {
        audiosActivos.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        audiosActivos = []; // Limpiar array de audios activos
    }
    
    const b = document.createElement("div");
    b.className = "quint-burbuja quint-usuario";
    const n = document.createElement("span"); n.className = "quint-nombre-usuario"; n.textContent = (quintNombreUsuario || "Tú") + ":";
    b.appendChild(n); b.appendChild(document.createElement("br"));
    const s = document.createElement("span"); s.textContent = texto; b.appendChild(s);
    
    // Si hay imagen adjunta, mostrarla con wrapper igual que las chicas
    if (imagenAdjunta) {
        const w = document.createElement("div");
        w.className = "quint-img-wrapper";
        w.style.cssText = "max-width:320px;margin-top:10px;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.2);min-height:50px;display:block;";
        const img = document.createElement("img");
        img.className = "quint-img";
        img.src = imagenAdjunta;
        img.alt = "Imagen adjunta";
        img.loading = "lazy";
        img.style.cssText = "width:100%!important;display:block!important;max-width:100%!important;height:auto!important;min-height:50px;object-fit:contain!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important;";
        img.onerror = function() { 
            console.error('Error cargando imagen:', imagenAdjunta, '- src:', this.src); 
            this.style.display = 'none';
            w.innerHTML = '<span style="color:#ff6b6b;font-size:12px;padding:10px;display:block;text-align:center;">❌ Error al cargar la imagen</span>';
        };
        img.onload = function() { 
            console.log('Imagen cargada correctamente:', imagenAdjunta);
            this.style.visibility = 'visible';
            this.style.opacity = '1';
        };
        w.appendChild(img);
        b.appendChild(w);
        console.log('Imagen agregada al DOM con src:', imagenAdjunta);
    }

    chat.appendChild(b); quintScrollFondo();
}

function quintAgregarChica(nombre, imagen_tag, dialogo, imagenUrlDirecta) {
    const chat = document.getElementById("quint-chat-mensajes"); if (!chat) return;

    // Si el personaje no está en CHICAS → personaje genérico sin imagen
    const info  = CHICAS[nombre];
    const color = info ? info.color : "#a0a8c0";

    const b = document.createElement("div");
    b.className = "quint-burbuja quint-chica-burbuja";
    b.style.borderColor = color + "55";
    b.style.background  = color + "12";

    const n = document.createElement("span");
    n.className = "quint-nombre-chica";
    n.style.color = color;
    n.textContent = `${nombre}:`;
    b.appendChild(n); b.appendChild(document.createElement("br"));

    quintMostrarDialogo(b, dialogo, nombre);

    // Solo mostrar imagen si el personaje está en CHICAS
    if (info) {
        // Si se pasa una URL directa (ej: imagen personalizada de locación), usarla
        let imgData = info.imagenes[imagen_tag] || Object.values(info.imagenes)[0];
        
        // Soporte para formato antiguo (string directo) y nuevo (objeto {url, audio})
        let imgUrl, imgAudio;
        if (typeof imgData === 'string') {
            imgUrl = imgData;
            imgAudio = null;
        } else if (imgData && typeof imgData === 'object') {
            imgUrl = imgData.url;
            imgAudio = imgData.audio;
        }
        
        imgUrl = imagenUrlDirecta || imgUrl;
        
        if (imgUrl) {
            const w   = document.createElement("div"); 
            w.className = "quint-img-wrapper";
            w.style.cssText = "max-width:320px;margin-top:10px;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);background:rgba(0,0,0,0.2);";
            const img = document.createElement("img");
            img.className = "quint-img"; 
            img.src = imgUrl; 
            img.alt = nombre; 
            img.loading = "lazy";
            img.style.cssText = "width:100%;display:block;max-width:100%;height:auto;object-fit:contain;";
            img.onerror = () => w.remove();
            
            // Reproducir audio si existe: agregar a lista de audios activos y reproducir (sin detener otros)
            if (imgAudio) {
                img.onload = () => {
                    // 1. Crear y configurar nuevo audio en loop
                    const nuevoAudio = new Audio(imgAudio);
                    nuevoAudio.loop = true; // Se repite infinitamente mientras sea el mensaje activo
                    
                    // 2. Agregar a la lista de audios activos (acumulando con los que ya están sonando)
                    audiosActivos.push(nuevoAudio);
                    
                    // 3. Reproducir nuevo audio
                    nuevoAudio.play().catch(e => console.log('Error reproduciendo audio:', e));
                };
            } else {
                // 4. IMPORTANTE: Si el mensaje actual NO tiene audio, cortamos cualquier sonido previo
                // Esto evita que el audio de la frase anterior siga sonando de fondo
                if (audiosActivos.length > 0) {
                    audiosActivos.forEach(audio => {
                        audio.pause();
                        audio.currentTime = 0;
                    });
                    audiosActivos = [];
                }
            }
            
            w.appendChild(img); b.appendChild(w);
        }
    }

    chat.appendChild(b); quintScrollFondo();
    quintLogExport.push(`${nombre}: ${dialogo}`);
}

// ============================================================
//  TYPING INDICATOR
// ============================================================

function quintShowTyping(nombres) {
    const chat = document.getElementById("quint-chat-mensajes"); if (!chat) return;
    const t = document.createElement("div");
    t.className = "quint-typing"; t.id = "quint-typing-indicator";
    const label = document.createElement("span");
    label.className = "quint-nombre-chica";
    label.style.color = "#7a8ba0";
    label.textContent = nombres.join(", ") + "...";
    t.appendChild(label); t.appendChild(document.createElement("br"));
    ["","",""].forEach(() => {
        const d = document.createElement("span"); d.className = "quint-dot"; t.appendChild(d);
    });
    chat.appendChild(t); quintScrollFondo();
}

function quintHideTyping() {
    const t = document.getElementById("quint-typing-indicator"); if (t) t.remove();
}

// ============================================================
//  BADGES
// ============================================================

function quintActualizarBadges() {
    Object.keys(CHICAS).forEach(nombre => {
        const badge = document.getElementById(`quint-badge-${nombre}`);
        if (!badge) return;
        if (quintChicasActivas.has(nombre)) {
            badge.style.opacity     = "1";
            badge.style.color       = CHICAS[nombre].color;
            badge.style.borderColor = CHICAS[nombre].color;
        } else {
            badge.style.opacity     = "0.2";
            badge.style.color       = "#7a8ba0";
            badge.style.borderColor = "#2a3a55";
        }
    });
}

function quintAgregarChicaEscena(nombre) {
    if (quintChicasActivas.has(nombre)) return;
    quintChicasActivas.add(nombre);
    // Solo actualizar badge si es una chica definida
    if (CHICAS[nombre]) quintActualizarBadges();
    quintAgregarSistema(`[ ${nombre} ha entrado en la escena ]`);
    quintLogExport.push(`[ ${nombre} ha entrado en la escena ]`);
}

// ============================================================
//  ACTUALIZAR VISTA PREVIA DE IMAGEN
// ============================================================
function quintActualizarVistaPreviaImagen() {
    const preview = document.getElementById("quint-vista-previa-container");
    if (!preview) return;
    
    if (quintImagenAdjunta) {
        preview.style.display = "block";
        const img = document.getElementById("quint-vista-previa-img");
        if (img) img.src = quintImagenAdjunta;
    } else {
        preview.style.display = "none";
    }
}

// ============================================================
//  MANEJAR SELECCIÓN DE IMAGEN
// ============================================================
function quintManejarImagen(input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validar que sea imagen
    if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        quintImagenAdjunta = e.target.result;
        quintActualizarVistaPreviaImagen();
    };
    reader.readAsDataURL(file);
}

// ============================================================
//  MANEJAR PEGAR IMAGEN (Ctrl+V)
// ============================================================
function quintManejarPaste(event) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            const reader = new FileReader();
            
            reader.onload = function(e) {
                quintImagenAdjunta = e.target.result;
                quintActualizarVistaPreviaImagen();
                // Enfocar el input después de pegar
                const input = document.getElementById("quint-input");
                if (input) input.focus();
            };
            
            reader.readAsDataURL(file);
            event.preventDefault();
            break;
        }
    }
}

// Agregar listener global para paste en el input cuando se carga la página
setTimeout(function() {
    const input = document.getElementById("quint-input");
    if (input && !input._hasPasteListener) {
        input.addEventListener('paste', quintManejarPaste);
        input._hasPasteListener = true;
    }
}, 500);

// ============================================================
//  ENVIAR
// ============================================================
async function quintEnviar() {
    if (quintOcupado) return;
    const input = document.getElementById("quint-input");
    const texto = input.value.trim();
    input.value = ""; input.style.height = "auto";
    quintOcupado = true;
    const btn = document.getElementById("quint-btn-enviar");
    btn.disabled = true; btn.textContent = "...";

    // Contar turno para eventos aleatorios (se dispara ANTES de enviar)
    if (typeof quintContarTurnoEvento === "function") quintContarTurnoEvento();

    let textoEnviar = texto;
    
    // Manejar imagen adjunta si existe
    if (quintImagenAdjunta) {
        const mensajeConImagen = texto 
            ? `${texto}\n\n[IMAGEN ADJUNTA: El usuario ha compartido una imagen. Describe lo que ves en la imagen y úsalo como referencia para tu respuesta.]`
            : `[IMAGEN ADJUNTA: El usuario ha compartido una imagen. Describe lo que ves en la imagen y responde acorde al contexto.]`;
        
        // Agregar imagen al historial con formato especial para Groq Vision
        quintHistorial.push({
            role: "user",
            content: [
                { type: "text", text: mensajeConImagen },
                { type: "image_url", image_url: { url: quintImagenAdjunta } }
            ]
        });
        
        // Mostrar imagen en el chat
        quintAgregarUsuario(texto || "(imagen adjunta)", quintImagenAdjunta);
        quintLogExport.push(`Tu: ${texto || "(imagen adjunta)"}`);
        
        // Limpiar imagen adjunta después de enviar
        quintImagenAdjunta = null;
        quintActualizarVistaPreviaImagen();
    } else if (texto) {
        quintAgregarUsuario(texto);
        quintLogExport.push(`Tu: ${texto}`);

        // Si hay evento activo, modificar el texto para forzar al AI a reaccionar
        if (quintEventoActivo) {
            textoEnviar = `${texto}\n\n[EVENTO EN CURSO — IMPORTANTE: ${quintEventoActivo.nombre}. Las chicas están reaccionando a esto AHORA MISMO. La respuesta DEBE incorporar este evento.]`;
        }
        quintHistorial.push({ role:"user", content: textoEnviar });

        Object.keys(CHICAS).forEach(nombre => {
            if (!quintChicasActivas.has(nombre)) {
                if (new RegExp(`\\b${nombre}\\b`, "i").test(texto)) quintAgregarChicaEscena(nombre);
            }
        });
    } else {
        // Input vacío = continuar historia según contexto
        let contenidoContinuo = "(Continúa la historia de forma natural según el contexto anterior, sin repetir lo ya dicho)";
        if (quintEventoActivo) {
            contenidoContinuo = `[EVENTO EN CURSO — IMPORTANTE: ${quintEventoActivo.nombre}. ${quintEventoActivo.contexto} Las chicas deben reaccionar a esto en su respuesta.]`;
        }
        quintHistorial.push({ role:"user", content: contenidoContinuo });
    }

    quintShowTyping([...quintChicasActivas]);
    const { datos, modelo } = await quintObtenerRespuesta();
    quintHideTyping();

    console.log("[QUINT DATOS] modelo usado:", modelo);
    console.log("[QUINT DATOS]", JSON.stringify(datos, null, 2));

    // Limpiar evento activo después de que el AI respondió (ya lo incorporó)
    if (typeof limpiarEventoActivo === "function") limpiarEventoActivo();

    (datos.nuevasChicasQueAparecen || []).forEach(n => {
        if (CHICAS[n]) quintAgregarChicaEscena(n);
    });

    console.log("[QUINT RENDERING] modelo:", modelo, "| chicasQueHablan count:", (datos.chicasQueHablan || []).length);
    for (const p of (datos.chicasQueHablan || [])) {
        if (!p.nombre || !p.dialogo) {
            console.log("[QUINT SKIP] nombre or dialogo missing:", p);
            continue;
        }
        if (!quintChicasActivas.has(p.nombre)) quintAgregarChicaEscena(p.nombre);
        console.log("[QUINT RENDER] modelo:", modelo, "|", p.nombre, "—", p.dialogo.slice(0, 80));
        quintAgregarChica(p.nombre, p.imagen_tag || "Hablando", p.dialogo || "...");
    }

    quintOcupado = false; btn.disabled = false; btn.textContent = "Enviar ♡";

    // Intentar resumir historial viejo ahora que quintOcupado = false
    quintResumirSiEsNecesario();
}
function quintBorrarUltimo() {
    const chat = document.getElementById("quint-chat-mensajes");
    const elementos = chat.querySelectorAll(".quint-burbuja, .quint-sistema");
    if (!elementos.length) return;
    elementos[elementos.length - 1].remove();
    if (quintHistorial.length > 0) quintHistorial.pop();
    if (quintLogExport.length > 0) quintLogExport.pop();
}

function quintKeyHandler(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); quintEnviar(); }
}

// ============================================================
//  EXPORTAR / IMPORTAR / LIMPIAR
// ============================================================

function quintExportar() {
    if (!quintLogExport.length) { alert("No hay nada que exportar."); return; }
    const fecha = new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);
    const blob  = new Blob([JSON.stringify({
        fecha, personaje:"Quintillizas", historial: quintHistorial, log: quintLogExport,
        resumenAcumulado: quintResumenAcumulado, hechosClave: quintHechosClave
    }, null, 2)], { type:"application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `quintillizas_chat_${fecha}.json`; a.click();
}

function quintImportar() {
    const input = document.createElement("input"); input.type="file"; input.accept=".json";
    input.onchange = async (e) => {
        const file = e.target.files[0]; if (!file) return;
        try {
            const data = JSON.parse(await file.text());
            quintHistorial       = data.historial || [];
            quintLogExport       = data.log       || [];
            quintResumenAcumulado = data.resumenAcumulado || "";
            quintHechosClave     = data.hechosClave || [];
            quintChicasActivas   = new Set(["Yotsuba"]);
            const chat = document.getElementById("quint-chat-mensajes"); chat.innerHTML = "";
            quintAgregarSistema(`[ Conversación cargada: ${file.name} ]`);
            for (const l of quintLogExport) {
                const t = l.trim(); if (!t) continue;
                if (t.startsWith("Tu:"))   quintAgregarUsuario(t.slice(3).trim());
                else if (t.startsWith("[")) quintAgregarSistema(t);
                else {
                    const sep  = t.indexOf(":");
                    const nom  = sep > -1 ? t.slice(0,sep).trim() : "";
                    const dial = sep > -1 ? t.slice(sep+1).trim() : t;
                    if (CHICAS[nom]) {
                        quintChicasActivas.add(nom);
                        quintAgregarChica(nom, "normal", dial);
                    } else quintAgregarSistema(t);
                }
            }
            quintActualizarBadges();
            quintAgregarSistema("[ Continúa la conversación... ]");
        } catch (err) { alert("Error: " + err.message); }
    };
    input.click();
}

function quintLimpiar() {
    if (!confirm("¿Limpiar toda la conversación?")) return;
    quintHistorial       = [];
    quintLogExport       = [];
    quintResumenAcumulado = "";
    quintHechosClave     = [];
    quintResumenPendiente = false;
    quintChicasActivas   = new Set(["Yotsuba"]);
    document.getElementById("quint-chat-mensajes").innerHTML = "";
    quintActualizarBadges();
    establecerLocacion(null);
    detenerMusicaLocacion();
    quintBienvenida();
}

// ============================================================
//  DEBUG PANEL — ver qué se envía a la API
// ============================================================

function quintToggleDebugAPI() {
    const panel = document.getElementById("quint-debug-panel");
    if (!panel) return;
    if (panel.style.display === "none") {
        quintRenderDebugPanel();
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
}

function quintRenderDebugPanel() {
    const content = document.getElementById("quint-debug-content");
    if (!content) return;

    const p = quintUltimoPayloadAPI;
    if (!p) {
        content.innerHTML = `<div class="quint-debug-stat" style="color:#3a5a90;font-style:italic;">Aún no se ha enviado nada a la API. Envía un mensaje primero.</div>`;
        return;
    }

    const systemLen = p.systemPrompt ? p.systemPrompt.length : 0;
    const contextLen = p.contextoExtra ? p.contextoExtra.length : 0;
    const histLen = p.historial ? p.historial.length : 0;
    const totalChars = systemLen + contextLen + p.historial.reduce((sum, m) => sum + (m.content || "").length, 0);

    let html = "";

    // Stats
    html += `<div class="quint-debug-section">`;
    html += `<span class="quint-debug-stat">📊 Mensajes en payload: <span>${histLen}</span></span><br>`;
    html += `<span class="quint-debug-stat">📝 Historial real en memoria: <span>${p.historialReal}</span></span><br>`;
    html += `<span class="quint-debug-stat">📌 Hechos clave guardados: <span>${p.hechosClave.length}</span></span><br>`;
    html += `<span class="quint-debug-stat">📄 Resumen acumulado: <span>${p.resumenAcumulado.length} chars</span></span><br>`;
    html += `<span class="quint-debug-stat">🔢 Total chars enviados: <span>${totalChars.toLocaleString()}</span></span>`;
    html += `</div>`;

    // Hechos clave
    if (p.hechosClave.length > 0) {
        html += `<div class="quint-debug-section">`;
        html += `<span class="quint-debug-label">📌 Hechos Clave (${p.hechosClave.length})</span>`;
        html += `<div class="quint-debug-box">${p.hechosClave.map(h => `• ${h}`).join("\n")}</div>`;
        html += `</div>`;
    }

    // Resumen acumulado
    if (p.resumenAcumulado) {
        html += `<div class="quint-debug-section">`;
        html += `<span class="quint-debug-label">📝 Resumen Acumulado (${p.resumenAcumulado.length} chars)</span>`;
        html += `<div class="quint-debug-box">${p.resumenAcumulado}</div>`;
        html += `</div>`;
    }

    // Contexto extra (inyectado como system message)
    if (p.contextoExtra) {
        html += `<div class="quint-debug-section">`;
        html += `<span class="quint-debug-label">🔗 Contexto Extra Inyectado (${p.contextoExtra.length} chars)</span>`;
        html += `<div class="quint-debug-box">${p.contextoExtra.slice(0, 800)}${p.contextoExtra.length > 800 ? "\n...[truncado]" : ""}</div>`;
        html += `</div>`;
    }

    // Mensajes del historial
    html += `<div class="quint-debug-section">`;
    html += `<span class="quint-debug-label">💬 Historial Enviado (${histLen} mensajes)</span>`;
    const msgs = p.historial.map((m, i) => {
        const role = m.role === "user" ? "👤 USER" : m.role === "assistant" ? "🤖 ASSISTANT" : "⚙️ SYSTEM";
        const preview = (m.content || "").slice(0, 200);
        return `${role}: ${preview}${(m.content || "").length > 200 ? "..." : ""}`;
    }).join("\n\n---\n\n");
    html += `<div class="quint-debug-box">${msgs || "(vacío)"}</div>`;
    html += `</div>`;

    content.innerHTML = html;
}

// ============================================================
//  BIENVENIDA
// ============================================================

function quintBienvenida() {
    const nombre = quintNombreUsuario;
    const loc = obtenerLocacionActual();
    const locNombre = loc ? loc.nombre : "Sin locación";
    const locPrefix = loc ? `Están en: ${loc.nombre}. ` : "";

    quintAgregarSistema(`[ Quintillizas Nakano — Las hermanas aparecen según el contexto ]`);
    quintAgregarSistema(`[ Actualmente: Yotsuba está presente. Locación: ${locNombre} ]`);
    quintAgregarSistema(`[ Menciona a otras hermanas para que lleguen. ]`);

    // Intentar mensaje personalizado de Yotsuba para esta locación
    let bienvenidaTexto;
    let imagenTag = "Hablando";
    let imagenUrl = "";
    const msgYotsuba = obtenerMensajeChicaEnLocacion("Yotsuba", nombre);
    if (msgYotsuba) {
        bienvenidaTexto = msgYotsuba.mensaje;
        imagenUrl = msgYotsuba.imagen || "";
        // Si hay imagen específica, buscar el tag también (para el log)
        if (imagenUrl) {
            const imgKeys = Object.keys(CHICAS.Yotsuba.imagenes);
            for (const [key, url] of Object.entries(CHICAS.Yotsuba.imagenes)) {
                if (url === imagenUrl) { imagenTag = key; break; }
            }
        }
    } else {
        bienvenidaTexto = `¡¡Oye, oye, ${nombre}!! *salta emocionada y te agarra del brazo* ¡Ya llegué! *gira sobre sí misma sonriendo* ¿Qué hacemos hoy? ¡Dime, dime! `;
    }

    // Mostrar imagen de la locación si existe
    if (loc && loc.imagen) {
        quintInsertarImagenLocacion(loc.imagen);
    }

    quintAgregarChica("Yotsuba", imagenTag, bienvenidaTexto, imagenUrl || undefined);

    // Inyectar el nombre del usuario y la locación en el historial
    quintHistorial.push({
        role: "user",
        content: `(El nombre del usuario es ${nombre}. ${locPrefix}Las chicas deben llamarlo por su nombre y considerar que están en ${locNombre}.)`
    });
    quintHistorial.push({
        role: "assistant",
        content: JSON.stringify({
            chicasQueHablan: [{ nombre: "Yotsuba", imagen_tag: imagenTag, dialogo: bienvenidaTexto }],
            nuevasChicasQueAparecen: []
        })
    });

    quintLogExport.push("[ Quintillizas Nakano — inicio ]");

    // Reproducir música de la locación
    reproducirMusicaLocacion();
}

function quintInsertarImagenLocacion(url) {
    const chat = document.getElementById("quint-chat-mensajes");
    if (!chat) return;
    const w = document.createElement("div");
    w.className = "quint-img-wrapper quint-loc-img";
    w.style.cssText = "max-width:400px;margin:10px auto;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);background:rgba(0,0,0,0.2);";
    const img = document.createElement("img");
    img.className = "quint-img quint-loc-img";
    img.src = url;
    img.alt = "Bienvenida — Locación";
    img.loading = "lazy";
    img.style.cssText = "width:100%;display:block;max-width:100%;height:auto;object-fit:contain;";
    img.onerror = () => w.remove();
    w.appendChild(img);
    chat.appendChild(w);
    quintScrollFondo();
}

// ============================================================
//  CARGAR PÁGINA
// ============================================================

function cargarPaginaQuintillizas() {
    const especial   = document.querySelector(".especial-section");
    const additional = document.querySelector(".additional-section");
    const footer     = document.querySelector(".footer");
    if (especial)   especial.style.display   = "none";
    if (additional) additional.style.display = "none";
    if (footer)     footer.style.display     = "none";

    const seccion = document.getElementById("manga-section");
    seccion.style.display = "block";

    seccion.innerHTML = `
        <div id="quint-app">

            <!-- HEADER -->
            <div id="quint-header">
                <div id="quint-header-info">
                    <div id="quint-avatar">五</div>
                    <div>
                        <div id="quint-header-nombre">Quintillizas Nakano</div>
                        <div id="quint-header-sub">Gotoubun no Hanayome ✦ Las cinco hermanas ♡</div>
                    </div>
                </div>

                <div id="quint-badges">
                    ${Object.entries(CHICAS).map(([n,d]) =>
                        `<div class="quint-badge" id="quint-badge-${n}" title="${n}"
                            style="color:#7a8ba0;border-color:#2a3a55;opacity:0.2">${d.kanji}</div>`
                    ).join("")}
                </div>

                <div id="quint-header-btns">
    <button class="quint-btn-top" onclick="quintMostrarCambiarLocacion()" title="Cambiar locación">📍 Locación</button>
    <button class="quint-btn-top" id="quint-music-btn" onclick="quintToggleMusica()" title="Música de ambiente">🎵 Música</button>
    <button class="quint-btn-top" onclick="quintImportar()">📂 Importar</button>
    <button class="quint-btn-top" onclick="quintExportar()">💾 Exportar</button>
    <button class="quint-btn-top" onclick="quintBorrarUltimo()">↩ Borrar último</button>
    <button class="quint-btn-top" onclick="quintToggleDebugAPI()" title="Ver qué se envía a la API">🔍 Debug API</button>
    <button class="quint-btn-top quint-btn-danger" onclick="quintLimpiar()">🗑 Limpiar</button>
</div>
            </div>

            <!-- DEBUG PANEL -->
            <div id="quint-debug-panel" style="display:none;">
                <div class="quint-debug-header">
                    <span>🔍 Payload enviado a la API (último turno)</span>
                    <button onclick="quintToggleDebugAPI()">✕</button>
                </div>
                <div id="quint-debug-content"></div>
            </div>

            <!-- MENSAJES -->
            <div id="quint-chat-mensajes"></div>

            <!-- AYUDA -->
            <div id="quint-ayuda">
                💡 Las hermanas aparecen cuando las mencionas o el contexto las llama.
                Tip: <code>/quint accion/</code> para narrar — ej: <code>/quint Nino entra al cuarto/</code>
            </div>

            <!-- INPUT -->
            <div id="quint-input-area">
                <!-- Vista previa de imagen -->
                <div id="quint-vista-previa-container" style="display:none; padding:8px 16px; background:#0d1526; border-top:1px solid #1f2d45;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img id="quint-vista-previa-img" src="" alt="Vista previa" style="height:60px; border-radius:6px; border:2px solid #1f2d45;">
                        <button onclick="quintImagenAdjunta=null; quintActualizarVistaPreviaImagen(); document.getElementById('quint-file-input').value='';" style="background:#ff4444; color:white; border:none; border-radius:4px; padding:4px 8px; cursor:pointer; font-size:12px;">✕ Quitar imagen</button>
                    </div>
                </div>
                
                <textarea
                    id="quint-input"
                    placeholder="Escríbeles a las Nakano... ♡ (también puedes pegar una imagen con Ctrl+V)"
                    rows="1"
                    onkeydown="quintKeyHandler(event)"
                    oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'"
                    onpaste="quintManejarPaste(event)"
                ></textarea>
                <input type="file" id="quint-file-input" accept="image/*" style="display:none;" onchange="quintManejarImagen(this)">
                <button id="quint-btn-adjuntar" onclick="document.getElementById('quint-file-input').click()" title="Adjuntar imagen">📷</button>
                <button id="quint-btn-enviar" onclick="quintEnviar()">Enviar ♡</button>
            </div>
        </div>

        <style>
            #quint-app {
                display:flex; flex-direction:column;
                height:calc(100vh - 80px); max-width:860px; margin:0 auto;
                background:#0a0f18; border-radius:16px; overflow:hidden;
                box-shadow:0 0 40px rgba(90,120,200,0.1);
                border:1px solid #1f2d45; font-family:'Georgia',serif;
            }
            #quint-header {
                display:flex; align-items:center; justify-content:space-between;
                background:#0d1526; padding:12px 20px;
                border-bottom:1px solid #1f2d45; flex-shrink:0; gap:10px; flex-wrap:wrap;
            }
            #quint-header-info  { display:flex; align-items:center; gap:12px; }
            #quint-avatar {
                width:44px; height:44px;
                background:linear-gradient(135deg,#1f3a70,#4a6adf);
                border-radius:50%; display:flex; align-items:center; justify-content:center;
                font-size:20px; color:#c0d0ff;
                box-shadow:0 0 12px rgba(80,120,255,0.3); flex-shrink:0;
                font-family:'Noto Serif JP',serif;
            }
            #quint-header-nombre { color:#8ab0ff; font-size:16px; font-weight:bold; }
            #quint-header-sub    { color:#3a5a90; font-size:11px; margin-top:2px; }
            #quint-badges { display:flex; gap:6px; flex-wrap:wrap; }
            .quint-badge {
                width:28px; height:28px; border-radius:50%;
                display:flex; align-items:center; justify-content:center;
                font-size:14px; border:2px solid; cursor:default;
                transition:all 0.35s ease; font-weight:700;
                font-family:'Noto Serif JP',serif;
            }
            #quint-header-btns { display:flex; gap:6px; flex-wrap:wrap; }
            .quint-btn-top {
                background:#0d1526; color:#8ab0ff; border:1px solid #1f2d45;
                padding:6px 12px; border-radius:8px; cursor:pointer; font-size:12px;
                transition:background 0.2s; font-family:Arial,sans-serif;
            }
            .quint-btn-top:hover    { background:#162240; }
            .quint-btn-danger       { color:#ff7b7b !important; border-color:#6e2e2e !important; }
            .quint-btn-danger:hover { background:#3a1010 !important; }
            #quint-debug-panel {
                background:#0d1526; border-bottom:1px solid #1f2d45;
                max-height:300px; overflow-y:auto; flex-shrink:0;
            }
            .quint-debug-header {
                display:flex; justify-content:space-between; align-items:center;
                padding:8px 14px; background:#162240; color:#8ab0ff;
                font-size:12px; font-weight:bold; font-family:Arial,sans-serif;
                position:sticky; top:0; z-index:10;
            }
            .quint-debug-header button {
                background:none; border:none; color:#ff7b7b; font-size:16px;
                cursor:pointer; padding:0 4px;
            }
            #quint-debug-content { padding:10px 14px; }
            .quint-debug-section { margin-bottom:10px; }
            .quint-debug-label {
                color:#3a5a90; font-size:10px; text-transform:uppercase;
                letter-spacing:1px; font-family:Arial,sans-serif; margin-bottom:4px;
                display:block;
            }
            .quint-debug-box {
                background:#0a0f18; border:1px solid #1f2d45; border-radius:6px;
                padding:8px 10px; color:#c0d8ff; font-size:11px;
                font-family:'Courier New',monospace; white-space:pre-wrap;
                word-break:break-word; max-height:150px; overflow-y:auto;
                line-height:1.5;
            }
            .quint-debug-box::-webkit-scrollbar { width:4px; }
            .quint-debug-box::-webkit-scrollbar-track { background:#0a0f18; }
            .quint-debug-box::-webkit-scrollbar-thumb { background:#1f2d45; border-radius:2px; }
            .quint-debug-stat { color:#7a8ba0; font-size:11px; font-family:Arial,sans-serif; margin:2px 0; }
            .quint-debug-stat span { color:#8ab0ff; }
            #quint-chat-mensajes {
                flex:1; overflow-y:auto; padding:18px 16px;
                display:flex; flex-direction:column; gap:10px;
                scrollbar-width:thin; scrollbar-color:#1f2d45 #0a0f18;
            }
            #quint-chat-mensajes::-webkit-scrollbar       { width:6px; }
            #quint-chat-mensajes::-webkit-scrollbar-track  { background:#0a0f18; }
            #quint-chat-mensajes::-webkit-scrollbar-thumb  { background:#1f2d45; border-radius:3px; }
            .quint-burbuja {
                max-width:78%; padding:11px 15px; border-radius:16px;
                line-height:1.65; font-size:14px; word-break:break-word;
                animation:quintFadeIn 0.22s ease;
            }
            @keyframes quintFadeIn {
                from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)}
            }
            .quint-chica-burbuja {
                border:1px solid; align-self:flex-start; border-bottom-left-radius:4px;
            }
            .quint-usuario {
                background:linear-gradient(135deg,#1a2a4a,#1c3060);
                border:1px solid #2a4080; align-self:flex-end;
                border-bottom-right-radius:4px; color:#c0d8ff;
            }
            .quint-usuario img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                margin-top: 10px;
                display: block;
                width: 100%;
                object-fit: contain;
            }
            .quint-img-wrapper {
                margin-top:10px; border-radius:10px; overflow:hidden;
                max-width:320px; border:1px solid rgba(255,255,255,0.08);
                background:rgba(0,0,0,0.2);
            }
            .quint-img { 
                width:100%; 
                display:block; 
                max-width:100%;
                height:auto;
                object-fit:contain;
            }
            .quint-sistema {
                text-align:center; color:#3a5a90; font-size:11px;
                font-style:italic; font-family:Arial,sans-serif; padding:2px 0;
            }
            .quint-nombre-chica   { font-weight:bold; font-size:12px; font-family:Georgia,serif; }
            .quint-nombre-usuario { color:#7aaeff; font-weight:bold; font-size:12px; }
            .quint-texto          { color:#e8e8f0; }
            .quint-accion         { font-style:italic; }
            .quint-typing {
                background:#0d1526; border:1px solid #1f2d45;
                border-radius:16px; border-bottom-left-radius:4px;
                padding:10px 14px; align-self:flex-start;
                max-width:160px; animation:quintFadeIn 0.2s ease;
            }
            .quint-dot {
                display:inline-block; width:7px; height:7px;
                background:#3a5a90; border-radius:50%; margin:0 2px;
                animation:quintDot 1.2s infinite;
            }
            .quint-dot:nth-child(2){animation-delay:0.0s}
            .quint-dot:nth-child(3){animation-delay:0.2s}
            .quint-dot:nth-child(4){animation-delay:0.4s}
            @keyframes quintDot {
                0%,80%,100%{transform:scale(0.7);opacity:0.3} 40%{transform:scale(1.1);opacity:1}
            }
            #quint-ayuda {
                background:#080e1c; color:#3a5a90; font-size:11px;
                font-family:Arial,sans-serif; padding:6px 16px;
                border-top:1px solid #151f35; flex-shrink:0;
            }
            #quint-ayuda code {
                background:#111d35; color:#8ab0ff;
                padding:1px 5px; border-radius:4px; font-size:11px;
            }
            #quint-input-area {
                display:flex; gap:10px; padding:12px 16px;
                background:#0d1526; border-top:1px solid #1f2d45;
                flex-shrink:0; align-items:flex-end; flex-wrap:wrap;
            }
            #quint-input {
                flex:1; background:#101d35; color:#e8e8f0;
                border:1px solid #1f2d45; border-radius:10px;
                padding:9px 13px; font-family:'Georgia',serif; font-size:14px;
                resize:none; outline:none; min-height:40px; max-height:120px;
                line-height:1.5; transition:border-color 0.2s;
            }
            #quint-input:focus        { border-color:#3a5a90; }
            #quint-input::placeholder { color:#3a5a90; }
            #quint-btn-enviar, #quint-btn-adjuntar {
                background:linear-gradient(135deg,#1f3a70,#3a6adf);
                color:#c0d8ff; border:none; padding:9px 18px;
                border-radius:10px; cursor:pointer;
                font-family:'Georgia',serif; font-size:14px; font-weight:bold;
                transition:all 0.2s; white-space:nowrap; align-self:center; height:40px;
            }
            #quint-btn-adjuntar { padding:9px 12px; font-size:18px; }
            #quint-btn-enviar:hover, #quint-btn-adjuntar:hover { transform:scale(1.04); box-shadow:0 0 10px rgba(80,120,255,0.3); }
            #quint-btn-enviar:disabled { opacity:0.5; cursor:not-allowed; transform:none; box-shadow:none; }
            @media(max-width:600px) {
                #quint-app          { height:calc(100vh - 60px); border-radius:0; }
                .quint-burbuja      { max-width:92%; }
                #quint-header-btns  { display:flex; flex-wrap:wrap; gap:4px; }
                #quint-header-btns .quint-btn-top { font-size:10px; padding:4px 8px; }
                .quint-img-wrapper  { max-width:100%; }
            }
        </style>
    `;

    quintHistorial       = [];
    quintLogExport       = [];
    quintResumenAcumulado = "";
    quintHechosClave     = [];
    quintResumenPendiente = false;
    quintChicasActivas   = new Set(["Yotsuba"]);

    // Mostrar pantalla de nombre antes de iniciar
    quintPedirNombre();
}

// ============================================================
//  PANTALLA DE NOMBRE
// ============================================================

function quintPedirNombre() {
    const seccion = document.getElementById("manga-section");

    // Insertar overlay encima del chat
    const overlay = document.createElement("div");
    overlay.id = "quint-nombre-overlay";
    overlay.innerHTML = `
        <div id="quint-nombre-box">
            <div id="quint-nombre-avatar">五</div>
            <div id="quint-nombre-titulo">Quintillizas Nakano</div>
            <div id="quint-nombre-sub">¿Cómo te llamas? ♡</div>
            <input
                id="quint-nombre-input"
                type="text"
                placeholder="Tu nombre..."
                maxlength="20"
                autocomplete="off"
            />
            <button id="quint-nombre-btn" onclick="quintConfirmarNombre()">Entrar ♡</button>
        </div>
        <style>
            #quint-nombre-overlay {
                position:absolute; inset:0; z-index:100;
                background:#0a0f18;
                display:flex; align-items:center; justify-content:center;
                border-radius:16px;
            }
            #quint-nombre-box {
                display:flex; flex-direction:column; align-items:center;
                gap:16px; padding:40px 32px; max-width:320px; width:100%;
            }
            #quint-nombre-avatar {
                width:64px; height:64px;
                background:linear-gradient(135deg,#1f3a70,#4a6adf);
                border-radius:50%; display:flex; align-items:center; justify-content:center;
                font-size:28px; color:#c0d0ff;
                box-shadow:0 0 20px rgba(80,120,255,0.4);
                font-family:'Noto Serif JP',serif;
            }
            #quint-nombre-titulo {
                color:#8ab0ff; font-size:20px; font-weight:bold;
                font-family:'Georgia',serif; text-align:center;
            }
            #quint-nombre-sub {
                color:#3a5a90; font-size:14px;
                font-family:'Georgia',serif; text-align:center;
            }
            #quint-nombre-input {
                width:100%; background:#101d35; color:#e8e8f0;
                border:1px solid #1f2d45; border-radius:10px;
                padding:10px 14px; font-family:'Georgia',serif; font-size:15px;
                outline:none; text-align:center; box-sizing:border-box;
                transition:border-color 0.2s;
            }
            #quint-nombre-input:focus { border-color:#3a5a90; }
            #quint-nombre-input::placeholder { color:#3a5a90; }
            #quint-nombre-btn {
                background:linear-gradient(135deg,#1f3a70,#3a6adf);
                color:#c0d8ff; border:none; padding:10px 28px;
                border-radius:10px; cursor:pointer;
                font-family:'Georgia',serif; font-size:15px; font-weight:bold;
                transition:all 0.2s;
            }
            #quint-nombre-btn:hover { transform:scale(1.04); box-shadow:0 0 10px rgba(80,120,255,0.3); }
        </style>
    `;

    // Posicionar sobre el chat
    const app = document.getElementById("quint-app");
    app.style.position = "relative";
    app.appendChild(overlay);

    // Enter confirma
    const inp = document.getElementById("quint-nombre-input");
    inp.addEventListener("keydown", e => { if (e.key === "Enter") quintConfirmarNombre(); });
    setTimeout(() => inp.focus(), 100);
}

// ============================================================
//  CAMBIAR LOCACIÓN EN MEDIO DEL CHAT
// ============================================================

function quintMostrarCambiarLocacion() {
    const locaciones = obtenerListaLocaciones();
    const opciones = locaciones.map(loc => `${loc.nombre}`).join("\n");
    const elegida = prompt(`Elige una locación:\n\n${opciones}`);
    if (!elegida) return;

    const match = locaciones.find(l => l.nombre.toLowerCase() === elegida.toLowerCase() || l.id.toLowerCase() === elegida.toLowerCase());
    if (!match) {
        alert("Locación no encontrada. Opciones: " + locaciones.map(l => l.nombre).join(", "));
        return;
    }

    establecerLocacion(match.id);
    quintAgregarSistema(`[ 📍 Locación cambiada a: ${match.nombre} ]`);

    // Mensaje de bienvenida: usar el de la primera chica activa que tenga mensaje para esta locación
    const fullLoc = Locaciones[match.id];
    let mensajeUsado = false;

    // Primero intentar con las chicas actualmente activas
    for (const chicaNombre of quintChicasActivas) {
        const msgLoc = obtenerMensajeChicaEnLocacion(chicaNombre, quintNombreUsuario);
        if (msgLoc) {
            quintAgregarChica(chicaNombre, "Hablando", msgLoc.mensaje, msgLoc.imagen || undefined);
            mensajeUsado = true;
            break;
        }
    }

    // Si ninguna chica activa tiene mensaje, fallback al mensaje de Yotsuba (si existe)
    if (!mensajeUsado) {
        const msgYotsuba = obtenerMensajeChicaEnLocacion("Yotsuba", quintNombreUsuario);
        if (msgYotsuba) {
            quintAgregarChica("Yotsuba", "Hablando", msgYotsuba.mensaje, msgYotsuba.imagen || undefined);
        }
    }

    // Actualizar música
    if (quintMusicaActivada) {
        reproducirMusicaLocacion();
    }
}

// ============================================================
//  CONFIRMAR NOMBRE
// ============================================================

function quintConfirmarNombre() {
    const inp = document.getElementById("quint-nombre-input");
    const nombre = inp ? inp.value.trim() : "";
    quintNombreUsuario = nombre || "Tú";

    // Quitar overlay de nombre
    const overlay = document.getElementById("quint-nombre-overlay");
    if (overlay) overlay.remove();

    // Mostrar selector de locación
    quintMostrarSelectorLocacion();
}

// ============================================================
//  SELECTOR DE LOCACIÓN
// ============================================================

function quintMostrarSelectorLocacion() {
    const app = document.getElementById("quint-app");
    app.style.position = "relative";

    const locaciones = obtenerListaLocaciones();
    const locHtml = locaciones.map(loc =>
        `<div class="quint-loc-opcion" onclick="quintSeleccionarLocacion('${loc.id}')" title="${loc.nombre}">
            <span class="quint-loc-icon">📍</span>
            <span class="quint-loc-nombre">${loc.nombre}</span>
        </div>`
    ).join("");

    const overlay = document.createElement("div");
    overlay.id = "quint-locacion-overlay";
    overlay.innerHTML = `
        <div id="quint-locacion-box">
            <div id="quint-locacion-avatar">📍</div>
            <div id="quint-locacion-titulo">¿Dónde quieren estar hoy?</div>
            <div id="quint-locacion-sub">Elige una locación para comenzar ♡</div>
            <div id="quint-locacion-opciones">
                ${locHtml}
            </div>
        </div>
        <style>
            #quint-locacion-overlay {
                position:absolute; inset:0; z-index:100;
                background:#0a0f18;
                display:flex; align-items:center; justify-content:center;
                border-radius:16px;
            }
            #quint-locacion-box {
                display:flex; flex-direction:column; align-items:center;
                gap:14px; padding:40px 32px; max-width:420px; width:90%;
            }
            #quint-locacion-avatar {
                font-size:48px;
            }
            #quint-locacion-titulo {
                color:#8ab0ff; font-size:18px; font-weight:bold;
                font-family:'Georgia',serif; text-align:center;
            }
            #quint-locacion-sub {
                color:#3a5a90; font-size:13px;
                font-family:'Georgia',serif; text-align:center; margin-top:-8px;
            }
            #quint-locacion-opciones {
                display:grid; grid-template-columns: repeat(3, 1fr);
                gap:10px; width:100%; margin-top:8px;
            }
            .quint-loc-opcion {
                display:flex; flex-direction:column; align-items:center; justify-content:center;
                gap:6px; padding:14px 8px; background:#101d35;
                border:1px solid #1f2d45; border-radius:12px;
                cursor:pointer; transition:all 0.2s;
            }
            .quint-loc-opcion:hover {
                background:#1a2d50; border-color:#3a5a90;
                transform:scale(1.05); box-shadow:0 0 12px rgba(80,120,255,0.2);
            }
            .quint-loc-icon { font-size:24px; }
            .quint-loc-nombre {
                color:#c0d8ff; font-size:12px; font-weight:bold;
                font-family:'Georgia',serif; text-align:center;
            }
        </style>
    `;

    app.appendChild(overlay);
}

function quintSeleccionarLocacion(locId) {
    establecerLocacion(locId);

    // Quitar overlay de locación
    const overlay = document.getElementById("quint-locacion-overlay");
    if (overlay) overlay.remove();

    // Iniciar chat con la chica seleccionada
    quintBienvenidaConChica(quintChicaSeleccionadaInicial);
    quintActualizarBadges();
    setTimeout(() => { const i = document.getElementById("quint-input"); if (i) i.focus(); }, 100);
}
