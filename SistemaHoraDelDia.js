// ============================================================
//  SISTEMA DE HORA DEL DÍA — QUINTILLIZAS
//  Cambia el fondo y contexto según la hora de tu PC
//  4 períodos: Mañana, Tarde, Atardecer, Noche
// ============================================================

// ============================================================
//  CONFIGURACIÓN — Períodos del día
// ============================================================

const HoraDelDia = {
    períodoActual: null,
    intervalId: null,

    // Períodos definidos por hora
    períodos: {
        madrugada: {
            id: "madrugada",
            nombre: "Madrugada",
            icono: "🌙",
            rango: "00:00 - 05:59",
            horas: [0, 1, 2, 3, 4, 5],
        },
        mañana: {
            id: "mañana",
            nombre: "Mañana",
            icono: "🌅",
            rango: "6:00 - 11:59",
            horas: [6, 7, 8, 9, 10, 11],
        },
        tarde: {
            id: "tarde",
            nombre: "Tarde",
            icono: "☀️",
            rango: "12:00 - 17:59",
            horas: [12, 13, 14, 15, 16, 17],
        },
        atardecer: {
            id: "atardecer",
            nombre: "Atardecer",
            icono: "🌆",
            rango: "18:00 - 20:59",
            horas: [18, 19, 20],
        },
        noche: {
            id: "noche",
            nombre: "Noche",
            icono: "🌙",
            rango: "21:00 - 23:59",
            horas: [21, 22, 23],
        },
    },

    // ============================================================
    //  GRADIENTES CSS — Fondos por período
    //  Puedes modificarlos aquí o en las imágenes de abajo
    // ============================================================
    gradientes: {
        madrugada: "linear-gradient(180deg, #0a0a1a 0%, #0d1025 30%, #111535 60%, #0a0a1a 100%)",
        mañana:    "linear-gradient(180deg, #1a1520 0%, #2a1f30 20%, #f5c77e 50%, #e8a050 70%, #d4853a 100%)",
        tarde:     "linear-gradient(180deg, #0a1525 0%, #1a3050 20%, #4a90d9 50%, #6ab0ff 70%, #8ac4f0 100%)",
        atardecer: "linear-gradient(180deg, #1a1020 0%, #2d1540 20%, #b84070 45%, #e87840 65%, #d4a030 85%, #c09030 100%)",
        noche:     "linear-gradient(180deg, #050510 0%, #0a0a20 30%, #0d1030 60%, #101535 80%, #0a0a1a 100%)",
    },

    // ============================================================
    //  IMÁGENES DE FONDO — Vacías por defecto
    //  Llena las URLs aquí y se usarán en vez de los gradientes
    //  Ejemplo: imagenes: { mañana: "URL_DE_TU_IMAGEN", ... }
    // ============================================================
    imagenes: {
        madrugada: "",  // ← Pon aquí la URL de tu imagen de madrugada
        mañana:    "",  // ← Pon aquí la URL de tu imagen de mañana
        tarde:     "",  // ← Pon aquí la URL de tu imagen de tarde
        atardecer: "",  // ← Pon aquí la URL de tu imagen de atardecer
        noche:     "",  // ← Pon aquí la URL de tu imagen de noche
    },

    // ============================================================
    //  ESTRELLAS (solo para noche/madrugada)
    // ============================================================
    conEstrellas: ["noche", "madrugada"],

    // ============================================================
    //  DETECTAR PERÍODO ACTUAL
    // ============================================================
    detectarPeríodo() {
        const hora = new Date().getHours();
        for (const [key, período] of Object.entries(this.períodos)) {
            if (período.horas.includes(hora)) {
                return key;
            }
        }
        return "noche"; // fallback
    },

    // ============================================================
    //  OBTENER DATOS DEL PERÍODO
    // ============================================================
    obtenerDatos(períodoId) {
        return this.períodos[períodoId] || this.períodos["noche"];
    },

    // ============================================================
    //  APLICAR FONDO AL CHAT
    // ============================================================
    aplicarFondo() {
        const período = this.detectarPeríodo();
        const datos = this.obtenerDatos(período);

        // Si cambió el período, aplicar cambios
        if (this.períodoActual !== período) {
            const períodoAnterior = this.períodoActual;
            this.períodoActual = período;

            // Aplicar gradiente o imagen de fondo
            this._aplicarFondoVisual(período);

            // Estrellas si aplica
            this._manejarEstrellas(período);

            // Actualizar indicador de hora en el header
            this._actualizarIndicadorHora(datos);

            // Notificar al usuario
            if (períodoAnterior) {
                this._notificarCambio(períodoAnterior, período, datos);
            }

            console.log(`[HORA DEL DÍA] Período cambiado a: ${datos.icono} ${datos.nombre} (${datos.rango})`);
        }
    },

    // ============================================================
    //  APLICAR FONDO VISUAL (gradiente o imagen)
    // ============================================================
    _aplicarFondoVisual(período) {
        const chat = document.getElementById("quint-chat-mensajes");
        const app = document.getElementById("quint-app");

        if (!chat && !app) return;

        // Primero verificar si hay una locación con imagen de fondo
        const loc = (typeof obtenerLocacionActual === "function") ? obtenerLocacionActual() : null;
        const imagenLoc = loc && loc.imagen && loc.imagen.trim() !== "" ? loc.imagen : null;

        const imagenUrl = this.imagenes[período];
        const gradiente = this.gradientes[período];

        // Prioridad: 1) Imagen de locación → 2) Imagen de período → 3) Gradiente
        if (imagenLoc) {
            // Imagen de la locación actual
            document.body.style.background = `url('${imagenLoc}') center/cover no-repeat fixed`;
            if (chat) chat.style.background = "#0a0f18";
        } else if (imagenUrl && imagenUrl.trim() !== "") {
            // Imagen del período de hora
            document.body.style.background = `url('${imagenUrl}') center/cover no-repeat fixed`;
            if (chat) chat.style.background = "#0a0f18";
        } else {
            // Gradiente del período de hora
            document.body.style.background = gradiente;
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.minHeight = "100vh";
            
            // El chat siempre tiene fondo oscuro fijo
            if (chat) {
                chat.style.background = "#0a0f18";
            }
        }
    },

    // ============================================================
    //  MANEJAR ESTRELLAS (noche/madrugada)
    // ============================================================
    _manejarEstrellas(período) {
        const container = document.getElementById("quint-chat-mensajes");
        if (!container) return;

        let estrellasContainer = document.getElementById("quint-estrellas");

        if (this.conEstrellas.includes(período)) {
            // Mostrar estrellas
            if (!estrellasContainer) {
                estrellasContainer = document.createElement("div");
                estrellasContainer.id = "quint-estrellas";
                estrellasContainer.innerHTML = Array(50).fill(0).map(() => 
                    `<span class="quint-estrella" style="
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        width: ${1 + Math.random() * 2}px;
                        height: ${1 + Math.random() * 2}px;
                        animation-delay: ${Math.random() * 3}s;
                        opacity: ${0.3 + Math.random() * 0.7};
                    "></span>`
                ).join("");
                container.appendChild(estrellasContainer);
            }
            estrellasContainer.style.display = "block";
        } else {
            if (estrellasContainer) {
                estrellasContainer.style.display = "none";
            }
        }
    },

    // ============================================================
    //  ACTUALIZAR INDICADOR DE HORA EN EL HEADER
    // ============================================================
    _actualizarIndicadorHora(datos) {
        let indicador = document.getElementById("quint-hora-indicador");

        if (!indicador) {
            const header = document.getElementById("quint-header-info");
            if (!header) return;

            indicador = document.createElement("div");
            indicador.id = "quint-hora-indicador";
            header.appendChild(indicador);
        }

        indicador.innerHTML = `${datos.icono} <span class="hora-nombre">${datos.nombre}</span>`;
        indicador.style.display = "flex";
    },

    // ============================================================
    //  NOTIFICAR CAMBIO DE PERÍODO
    // ============================================================
    _notificarCambio(anterior, nuevo, datos) {
        if (typeof quintAgregarSistema === "function") {
            const mensajes = {
                mañana:    "🌅 *Amanece... Los primeros rayos de sol entran por la ventana*",
                tarde:     "☀️ *El sol está en lo alto, es pleno día*",
                atardecer: "🌆 *El cielo se tiñe de naranja y púrpura... está atardeciendo*",
                noche:     "🌙 *La noche cae suavemente... las estrellas aparecen en el cielo*",
                madrugada: "🌙 *Es madrugada... todo está en silencio y oscuridad*",
            };
            quintAgregarSistema(mensajes[nuevo] || `[ Son las ${new Date().toLocaleTimeString("es-ES", {hour: "2-digit", minute: "2-digit"})} ]`);
        }
    },

    // ============================================================
    //  OBTENER CONTEXTO DE HORA PARA EL SYSTEM PROMPT
    // ============================================================
    obtenerContextoHora() {
        const período = this.detectarPeríodo();
        const datos = this.obtenerDatos(período);

        const contextos = {
            mañana: `\n\n🕐 MOMENTO DEL DÍA: Es de MAÑANA (${datos.rango}). Las chicas están recién levantándose o comenzando el día. El ambiente es fresco y luminoso.`,
            tarde: `\n\n🕐 MOMENTO DEL DÍA: Es la TARDE (${datos.rango}). El sol brilla fuerte. Las chicas están activas y con energía. Es el momento perfecto para actividades.`,
            atardecer: `\n\n🕐 MOMENTO DEL DÍA: Está ATARDECIENDO (${datos.rango}). El cielo tiene tonos naranjas y morados. El ambiente es más relajado y romántico.`,
            noche: `\n\n🕐 MOMENTO DEL DÍA: Es de NOCHE (${datos.rango}). Está oscuro afuera. El ambiente es íntimo y tranquilo. Las chicas están más relajadas o cariñosas.`,
            madrugada: `\n\n🕐 MOMENTO DEL DÍA: Es la MADRUGADA (${datos.rango}). Todo está oscuro y silencioso. Es muy tarde. Las chicas pueden estar somnolientas o en un momento íntimo.`,
        };

        return contextos[período] || "";
    },

    // ============================================================
    //  OBTENER SALUDO SEGÚN HORA
    // ============================================================
    obtenerSaludoHora() {
        const período = this.detectarPeríodo();
        const saludos = {
            mañana:    "Buenos días",
            tarde:     "Buenas tardes",
            atardecer: "Buenas tardes",
            noche:     "Buenas noches",
            madrugada: "Buenas noches",
        };
        return saludos[período] || "Hola";
    },

    // ============================================================
    //  INICIAR MONITOREO DE HORA
    //  Revisa cada minuto si cambió el período
    // ============================================================
    iniciar() {
        // Aplicar inmediatamente
        this.aplicarFondo();

        // Revisar cada minuto
        this.intervalId = setInterval(() => {
            this.aplicarFondo();
        }, 60000); // 60 segundos

        console.log(`[HORA DEL DÍA] Sistema iniciado. Período actual: ${this.períodoActual}`);
    },

    // ============================================================
    //  DETENER MONITOREO
    // ============================================================
    detener() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },
};

// ============================================================
//  INTEGRACIÓN CON QUINTILLIZAS — PATCH DEL SYSTEM PROMPT
// ============================================================

function horaPatchearSystemPrompt() {
    if (window._horaPatched) return;
    window._horaPatched = true;

    // Guardar referencia original
    const _origBuildSystem = window.quintBuildSystem;

    // Sobrescribir para incluir contexto de hora
    window.quintBuildSystem = function(activas) {
        const systemOriginal = _origBuildSystem(activas);
        const contextoHora = HoraDelDia.obtenerContextoHora();

        return systemOriginal + contextoHora;
    };

    console.log("[HORA DEL DÍA] System prompt parcheado correctamente.");
}

// ============================================================
//  INTEGRACIÓN CON SELECTOR DE CHICA
//  Iniciar el sistema de hora cuando se confirma la chica
// ============================================================

function horaPatchearConfirmacion() {
    if (window._horaConfirmPatched) return;
    window._horaConfirmPatched = true;

    const _origConfirmar = window.quintConfirmarChicaInicial;

    if (_origConfirmar) {
        window.quintConfirmarChicaInicial = function() {
            _origConfirmar();
            // Iniciar sistema de hora después de confirmar chica
            setTimeout(() => {
                HoraDelDia.iniciar();
                horaPatchearSystemPrompt();
            }, 500);
        };
    }
}

// ============================================================
//  INYECTAR ESTILOS DE ESTRELLAS E INDICADOR DE HORA
// ============================================================

function horaInjectStyles() {
    if (document.getElementById("quint-hora-styles")) return;

    const style = document.createElement("style");
    style.id = "quint-hora-styles";
    style.textContent = `
        /* INDICADOR DE HORA EN HEADER */
        #quint-hora-indicador {
            display: flex; align-items: center; gap: 4px;
            color: #8ab0ff; font-size: 11px; font-family: Georgia, serif;
            margin-top: 2px; opacity: 0.8;
        }
        .hora-nombre { font-weight: bold; }

        /* ESTRELLAS */
        #quint-estrellas {
            position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
        }
        .quint-estrella {
            position: absolute; background: #fff; border-radius: 50%;
            animation: quintTwinkle 2s ease-in-out infinite;
            box-shadow: 0 0 2px rgba(255,255,255,0.5);
        }
        @keyframes quintTwinkle {
            0%, 100% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
        }

        /* CHAT - fondo fijo para legibilidad */
        #quint-chat-mensajes {
            transition: background 1s ease;
        }

        /* MENSAJES DE EVENTO DE HORA */
        .quint-evento-hora {
            text-align: center; padding: 8px 16px;
            color: #8ab0ff; font-size: 12px; font-style: italic;
            font-family: Georgia, serif; animation: horaFadeIn 0.5s ease;
        }
        @keyframes horaFadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  AUTO-INICIALIZACIÓN (si se carga antes de quintillizas)
// ============================================================

horaInjectStyles();

// Intentar parchear cuando quintillizas.js esté listo
const horaCheckInterval = setInterval(() => {
    if (typeof window.quintBuildSystem === "function" && typeof window.quintConfirmarChicaInicial === "function") {
        horaPatchearSystemPrompt();
        horaPatchearConfirmacion();
        clearInterval(horaCheckInterval);
    }
}, 500);

// Timeout de seguridad: dejar de intentar después de 10 segundos
setTimeout(() => {
    clearInterval(horaCheckInterval);
}, 10000);
