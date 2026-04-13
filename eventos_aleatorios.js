// ============================================================
//  EVENTOS ALEATORIOS — QUINTILLIZAS NAKANO CHAT
//  Eventos que pueden ocurr durante la conversación.
//  Cada evento tiene un nombre y una descripción que se inyecta
//  en el contexto del AI para que responda acorde.
// ============================================================

const EventosAleatorios = [
    
    {
        id: "fotografo",
        nombre: "Un fotógrafo aparece",
        contexto: "Un fotógrafo callejero acaba de aparecer y quiere tomarles una foto juntos. Se acerca con su cámara sonriendo pidiendo que posen.",
    },
    {
        id: "lluvia",
        nombre: "Empieza a llover",
        contexto: "De repente empieza a llover. Las gotas caen sin warning y necesitan buscar refugio rápido.",
    },
    {
        id: "heladero",
        nombre: "Pasa el heladero",
        contexto: "El carrito del heladero pasa cerca tocando su musiquita. El sonido es alegre y tentador.",
    },
    {
        id: "mariposa",
        nombre: "Una mariposa se posa",
        contexto: "Una mariposa de colores brillantes se posa justo en el hombro de uno de ustedes. Es un momento mágico y tranquilo.",
    },
    {
        id: "musica_calle",
        nombre: "Música callejera",
        contexto: "Un músico callejero empieza a tocar una canción romántica muy bonita cerca de donde están. La música llena el ambiente.",
    },
    {
        id: "arcoiris",
        nombre: "Aparece un arcoíris",
        contexto: "Después de una breve llovizna, aparece un arcoíris enorme y hermoso en el cielo. Todos lo miran impresionados.",
    },
    
    {
        id: "flores",
        nombre: "Puesto de flores",
        contexto: "Hay un puesto de flores hermosas cerca. Los colores y aromas son increíbles.",
    },
    {
        id: "estrella",
        nombre: "Estrella fugaz",
        contexto: "Una estrella fugaz cruza el cielo rápidamente. Fue un momento breve pero mágico que apenas alcanzaron a ver.",
    },
    {
        id: "vendedor",
        nombre: "Vendedor ambulante",
        contexto: "Un vendedor ambulante se acerca ofreciendo comida deliciosa de la zona. El olor es irresistible.",
    },
    
    {
        id: "atardecer",
        nombre: "Atardecer espectacular",
        contexto: "El atardecer se pone increíblemente hermoso ahora mismo. El cielo está lleno de colores naranjas, rosas y morados. Es un momento muy romántico.",
    },
    
    
];

// ============================================================
//  ESTADO DE EVENTOS ALEATORIOS
// ============================================================

let quintEventoActivo = null;  // El evento que está ocurriendo ahora
let quintEventoTimer  = null;  // El timer para el próximo evento

/**
 * Lanza un evento aleatorio. Se llama periódicamente durante la conversación.
 */
function quintDispararEventoAleatorio() {
    // Elegir evento al azar
    const evento = EventosAleatorios[Math.floor(Math.random() * EventosAleatorios.length)];
    quintEventoActivo = evento;

    console.log(`[EVENTO] ${evento.nombre}`);

    // Mostrar notificación en el chat
    quintMostrarNotificacionEvento(evento.nombre);

    // El evento dura hasta la próxima respuesta del AI, que lo incorporará en su contexto
    // Después se limpia
    return evento;
}

/**
 * Muestra una notificación visual del evento en el chat.
 * Se queda visible permanentemente hasta que se limpie.
 */
function quintMostrarNotificacionEvento(nombreEvento) {
    // Quitar notificación previa si existe
    const prev = document.getElementById("quint-evento-activo");
    if (prev) prev.remove();

    const chat = document.getElementById("quint-chat-mensajes");
    if (!chat) return;

    const notif = document.createElement("div");
    notif.id = "quint-evento-activo";
    notif.className = "quint-evento-notif";
    notif.innerHTML = `<span class="quint-evento-icon">✨</span> <span class="quint-evento-text">${nombreEvento}</span>`;
    chat.appendChild(notif);

    // Scroll al fondo
    if (typeof quintScrollFondo === "function") quintScrollFondo();
}

/**
 * Retorna el contexto del evento activo para inyectar en el system prompt.
 */
function obtenerContextoEventoActivo() {
    if (!quintEventoActivo) return "";
    return `\nEVENTO ACTUAL EN CURSO: ${quintEventoActivo.contexto}\nLas chicas deben REACCIONAR a este evento en su respuesta. Es algo que está pasando AHORA MISMO.`;
}

/**
 * Limpia el evento activo después de que el AI respondió.
 */
function limpiarEventoActivo() {
    quintEventoActivo = null;
}

/**
 * Inicia el timer de eventos aleatorios.
 * Probabilidades progresivas para que no sean muy seguidos:
 * — Mínimo 6 mensajes sin evento
 * — Después del mensaje 6, probabilidad baja (15%)
 * — Después del mensaje 10, probabilidad media (35%)
 * — Después del mensaje 15, probabilidad alta (60%)
 * — Después del mensaje 20, evento garantizado
 */
let quintContadorEventos = 0;
let quintMinimoMensajes = 6;  // Sin eventos antes de esto

function quintIniciarTimerEventos() {
    quintContadorEventos = 0;
    quintMinimoMensajes = 6;
}

function quintContarTurnoEvento() {
    quintContadorEventos++;

    // Antes del mínimo, nunca dispara
    if (quintContadorEventos < quintMinimoMensajes) return;

    // Probabilidades progresivas
    const mensajesDesdeMinimo = quintContadorEventos - quintMinimoMensajes;
    let probabilidad = 0;

    if (mensajesDesdeMinimo < 5) {
        // Mensajes 6-10: 15% de probabilidad
        probabilidad = 0.15;
    } else if (mensajesDesdeMinimo < 10) {
        // Mensajes 11-15: 35% de probabilidad
        probabilidad = 0.35;
    } else if (mensajesDesdeMinimo < 15) {
        // Mensajes 16-20: 60% de probabilidad
        probabilidad = 0.60;
    } else {
        // Después de 20 mensajes: evento garantizado y reset
        quintDispararEventoAleatorio();
        quintContadorEventos = 0;
        return;
    }

    // Tirar el dado
    if (Math.random() < probabilidad) {
        quintDispararEventoAleatorio();
        quintContadorEventos = 0;
    }
}
