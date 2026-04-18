// ============================================================
//  NUEVAS FUNCIONES — QUINTILLIZAS NAKANO CHAT
//  1. Pantalla de selección de chica inicial
//  2. Sistema de memorias con slots (localStorage)
//  3. Menú de guardar memoria
// ============================================================

const MEMORY_SLOTS_KEY = "quint_memory_slots";
const MAX_MEMORY_SLOTS = 6;

// ============================================================
//  LOG ESTRUCTURADO
//  Guarda {tipo, nombre, imagen_tag, dialogo} por cada mensaje,
//  en paralelo al quintLogExport de texto plano.
//  Así al cargar una memoria sabemos exactamente qué imagen mostrar.
// ============================================================
let quintLogEstructurado = [];

// ============================================================
//  ESTADÍSTICAS — datos globales (declaradas antes del patch)
// ============================================================
let quintStatsData = {
    mensajesPorChica: {},
    mensajesPorLocacion: {},
    totalMensajes: 0,
};

function quintTrackMensaje(nombreChica) {
    if (!quintStatsData.mensajesPorChica[nombreChica]) {
        quintStatsData.mensajesPorChica[nombreChica] = 0;
    }
    quintStatsData.mensajesPorChica[nombreChica]++;
    quintStatsData.totalMensajes++;

    const loc = obtenerLocacionActual();
    if (loc) {
        const locNombre = loc.nombre;
        if (!quintStatsData.mensajesPorLocacion[locNombre]) {
            quintStatsData.mensajesPorLocacion[locNombre] = 0;
        }
        quintStatsData.mensajesPorLocacion[locNombre]++;
    }
}

// ============================================================
//  PATCH DE FUNCIONES
//  Envuelve quintAgregarChica y quintAgregarUsuario para que
//  también escriban en quintLogEstructurado.
//  Se llama UNA sola vez en cargarPaginaQuintillizas.
// ============================================================
let _memoryPatched = false;
function memoryPatchearFunciones() {
    if (_memoryPatched) return;
    _memoryPatched = true;

    const _origChica = window.quintAgregarChica;
    window.quintAgregarChica = function(nombre, imagen_tag, dialogo, imagenUrlDirecta) {
        _origChica(nombre, imagen_tag, dialogo, imagenUrlDirecta);
        quintLogEstructurado.push({ tipo: "chica", nombre, imagen_tag, dialogo, imagenUrl: imagenUrlDirecta || "" });
        quintTrackMensaje(nombre);
    };

    const _origUsuario = window.quintAgregarUsuario;
    window.quintAgregarUsuario = function(texto) {
        _origUsuario(texto);
        quintLogEstructurado.push({ tipo: "usuario", texto });
    };
}

// ============================================================
//  UTILIDADES DE MEMORIA
// ============================================================

function memoryGetSlots() {
    try {
        const raw = localStorage.getItem(MEMORY_SLOTS_KEY);
        return raw ? JSON.parse(raw) : Array(MAX_MEMORY_SLOTS).fill(null);
    } catch {
        return Array(MAX_MEMORY_SLOTS).fill(null);
    }
}

function memorySaveSlots(slots) {
    try {
        localStorage.setItem(MEMORY_SLOTS_KEY, JSON.stringify(slots));
    } catch (e) {
        console.error("[MEMORIA] Error guardando:", e);
        alert("Error al guardar: localStorage lleno o bloqueado.");
    }
}

// ============================================================
//  GUARDAR MEMORIA EN SLOT
// ============================================================

function memorySaveToSlot(slotIndex) {
    if (quintHistorial.length < 2) {
        alert("No hay conversación suficiente para guardar.");
        return;
    }

    const slots  = memoryGetSlots();
    const ahora  = new Date();
    const fechaStr = ahora.toLocaleDateString("es-ES", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });

    // Thumbnail: última imagen real usada en el log estructurado
    let thumbnail = null;
    const ultimaChica = [...quintLogEstructurado].reverse()
        .find(e => e.tipo === "chica" && e.nombre && CHICAS[e.nombre]);
    if (ultimaChica) {
        thumbnail = CHICAS[ultimaChica.nombre].imagenes[ultimaChica.imagen_tag] || null;
    }
    // Fallback: primera imagen de cualquier chica activa
    if (!thumbnail) {
        for (const nombre of quintChicasActivas) {
            const chica = CHICAS[nombre];
            if (chica) {
                const keys = Object.keys(chica.imagenes);
                if (keys.length > 0) { thumbnail = chica.imagenes[keys[0]]; break; }
            }
        }
    }

    // Resumen: últimas 3 entradas del log estructurado
    const resumen = quintLogEstructurado
        .filter(e => e.tipo === "chica" || e.tipo === "usuario")
        .slice(-3)
        .map(e => e.tipo === "usuario" ? `Tú: ${e.texto}` : `${e.nombre}: ${e.dialogo}`)
        .join(" / ")
        .slice(0, 100) || "Sin resumen";

    slots[slotIndex] = {
        fecha:           fechaStr,
        nombre:          quintNombreUsuario,
        chicas:          [...quintChicasActivas],
        chicaInicial:    [...quintChicasActivas][0],
        historial:       quintHistorial,
        log:             quintLogExport,
        logEstructurado: quintLogEstructurado,  // ← imagen_tag real guardado aquí
        resumenAcumulado: quintResumenAcumulado,
        hechosClave:     quintHechosClave,
        thumbnail,
        resumen
    };

    memorySaveSlots(slots);
    quintAgregarSistema(`[ Memoria guardada en slot ${slotIndex + 1} ]`);
    memoryCloseMenu();
}

// ============================================================
//  CARGAR MEMORIA DESDE SLOT
// ============================================================

function memoryLoadSlot(slotIndex) {
    const slots = memoryGetSlots();
    const slot  = slots[slotIndex];
    if (!slot) return;

    if (!confirm(`¿Cargar memoria del slot ${slotIndex + 1}?\nSe reemplazará la conversación actual.`)) return;

    // 1. Restaurar estado interno (instantáneo, no toca DOM)
    quintHistorial       = slot.historial       || [];
    quintLogExport       = slot.log             || [];
    quintLogEstructurado = slot.logEstructurado || [];
    quintNombreUsuario   = slot.nombre          || "Tú";
    quintResumenAcumulado = slot.resumenAcumulado || "";
    quintHechosClave     = slot.hechosClave     || [];
    quintResumenPendiente = false;
    quintChicasActivas   = new Set(slot.chicas  || ["Yotsuba"]);

    // 2. Limpiar DOM y cerrar panel
    const chat = document.getElementById("quint-chat-mensajes");
    if (chat) chat.innerHTML = "";
    memoryClosePanel();

    // 3. Cabecera informativa
    quintAgregarSistema(`[ Memoria cargada — ${slot.fecha} ]`);
    quintAgregarSistema(`[ Usuario: ${slot.nombre} | Chicas: ${slot.chicas.join(", ")} ]`);

    // 4. Elegir fuente de datos para el preview visual
    const PREVIEW_LINES    = 6;
    const usarEstructurado = Array.isArray(slot.logEstructurado) && slot.logEstructurado.length > 0;
    let preview = [];

    if (usarEstructurado) {
        // Slot nuevo: tenemos imagen_tag real para cada mensaje
        const mostrables = slot.logEstructurado.filter(e => e.tipo === "chica" || e.tipo === "usuario");
        if (mostrables.length > PREVIEW_LINES) {
            quintAgregarSistema(`[ ... ${mostrables.length - PREVIEW_LINES} mensajes anteriores omitidos ... ]`);
        }
        preview = mostrables.slice(-PREVIEW_LINES);

    } else {
        // Slot viejo (solo texto plano) — compatibilidad hacia atrás
        const mostrables = (slot.log || []).filter(l => {
            const t = l.trim();
            return t && !t.startsWith("[");
        });
        if (mostrables.length > PREVIEW_LINES) {
            quintAgregarSistema(`[ ... ${mostrables.length - PREVIEW_LINES} mensajes anteriores omitidos ... ]`);
        }
        preview = mostrables.slice(-PREVIEW_LINES).map(l => {
            const t   = l.trim();
            const sep = t.indexOf(":");
            const nom = sep > -1 ? t.slice(0, sep).trim() : "";
            const dia = sep > -1 ? t.slice(sep + 1).trim() : t;
            if (t.startsWith("Tu:")) return { tipo: "usuario", texto: t.slice(3).trim() };
            if (CHICAS[nom]) {
                const imgKeys = Object.keys(CHICAS[nom].imagenes);
                const imgTag  = imgKeys.find(k => k.toLowerCase().includes("hablando")) || imgKeys[0] || "Hablando";
                return { tipo: "chica", nombre: nom, imagen_tag: imgTag, dialogo: dia };
            }
            return { tipo: "sistema", texto: t };
        });
    }

    // 5. Renderizar el preview frame a frame (sin congelar el hilo)
    let i = 0;
    function renderNext() {
        if (i >= preview.length) {
            quintActualizarBadges();
            quintAgregarSistema("[ Continúa la conversación... ]");
            const inp = document.getElementById("quint-input");
            if (inp) inp.focus();
            return;
        }

        const e = preview[i];

        if (e.tipo === "usuario") {
            // Llamar la original directamente para no duplicar en logEstructurado
            quintAgregarUsuario(e.texto);

        } else if (e.tipo === "chica") {
            quintChicasActivas.add(e.nombre);
            // Verificar que el imagen_tag sigue existiendo (puede que hayan cambiado URLs)
            let imgTag = e.imagen_tag;
            if (CHICAS[e.nombre] && !CHICAS[e.nombre].imagenes[imgTag]) {
                const imgKeys = Object.keys(CHICAS[e.nombre].imagenes);
                imgTag = imgKeys.find(k => k.toLowerCase().includes("hablando")) || imgKeys[0] || "Hablando";
            }
            quintAgregarChica(e.nombre, imgTag, e.dialogo, e.imagenUrl || undefined);

        } else if (e.tipo === "sistema") {
            quintAgregarSistema(e.texto);
        }

        i++;
        requestAnimationFrame(renderNext);
    }

    requestAnimationFrame(renderNext);
}

// ============================================================
//  BORRAR SLOT
// ============================================================

function memoryDeleteSlot(slotIndex) {
    if (!confirm(`¿Borrar la memoria del slot ${slotIndex + 1}?`)) return;
    const slots = memoryGetSlots();
    slots[slotIndex] = null;
    memorySaveSlots(slots);
    memoryRenderPanel();
}

// ============================================================
//  PANEL DE MEMORIAS
// ============================================================

function memoryOpenPanel() {
    const existing = document.getElementById("quint-memory-panel");
    if (existing) { memoryClosePanel(); return; }
    const app   = document.getElementById("quint-app");
    const panel = document.createElement("div");
    panel.id = "quint-memory-panel";
    app.appendChild(panel);
    memoryRenderPanel();
}

function memoryClosePanel() {
    const panel = document.getElementById("quint-memory-panel");
    if (panel) panel.remove();
}

function memoryRenderPanel() {
    const panel = document.getElementById("quint-memory-panel");
    if (!panel) return;
    const slots = memoryGetSlots();
    panel.innerHTML = `
        <div class="qm-panel-header">
            <span class="qm-panel-title">Memorias guardadas</span>
            <button class="qm-close-btn" onclick="memoryClosePanel()">✕</button>
        </div>
        <div class="qm-slots-grid">
            ${slots.map((slot, i) => slot ? `
                <div class="qm-slot qm-slot-used">
                    ${slot.thumbnail
                        ? `<img class="qm-slot-thumb" src="${slot.thumbnail}" alt="">`
                        : `<div class="qm-slot-thumb qm-slot-thumb-empty">♡</div>`}
                    <div class="qm-slot-info">
                        <div class="qm-slot-fecha">${slot.fecha}</div>
                        <div class="qm-slot-nombre">${slot.nombre} — ${slot.chicas.join(", ")}</div>
                        <div class="qm-slot-resumen">${slot.resumen}</div>
                    </div>
                    <div class="qm-slot-btns">
                        <button class="qm-btn-load" onclick="memoryLoadSlot(${i})">Cargar</button>
                        <button class="qm-btn-del"  onclick="memoryDeleteSlot(${i})">✕</button>
                    </div>
                </div>
            ` : `
                <div class="qm-slot qm-slot-empty">
                    <div class="qm-slot-empty-label">Slot ${i + 1} vacío</div>
                </div>
            `).join("")}
        </div>
    `;
}

// ============================================================
//  MENÚ GUARDAR
// ============================================================

function memoryOpenSaveMenu() {
    if (quintHistorial.length < 2) {
        alert("No hay conversación suficiente para guardar.");
        return;
    }
    const existing = document.getElementById("quint-save-menu");
    if (existing) { existing.remove(); return; }

    const slots = memoryGetSlots();
    const app   = document.getElementById("quint-app");
    const menu  = document.createElement("div");
    menu.id = "quint-save-menu";
    menu.innerHTML = `
        <div class="qsm-header">
            <span>Guardar memoria en...</span>
            <button class="qm-close-btn" onclick="memoryCloseMenu()">✕</button>
        </div>
        <div class="qsm-slots">
            ${slots.map((slot, i) => `
                <button class="qsm-slot-btn ${slot ? "qsm-occupied" : "qsm-empty"}" onclick="memorySaveToSlot(${i})">
                    <span class="qsm-slot-num">Slot ${i + 1}</span>
                    ${slot
                        ? `<span class="qsm-slot-detail">${slot.fecha} — ${slot.nombre}</span>`
                        : `<span class="qsm-slot-detail">Vacío</span>`}
                </button>
            `).join("")}
        </div>
    `;
    app.appendChild(menu);
}

function memoryCloseMenu() {
    const menu = document.getElementById("quint-save-menu");
    if (menu) menu.remove();
}

// ============================================================
//  ESTILOS
// ============================================================

function memoryInjectStyles() {
    if (document.getElementById("quint-memory-styles")) return;
    const style = document.createElement("style");
    style.id = "quint-memory-styles";
    style.textContent = `
        #quint-memory-panel {
            position:absolute; top:60px; right:0;
            width:min(480px,95%); max-height:calc(100% - 120px);
            overflow-y:auto; background:#0d1526;
            border:1px solid #1f2d45; border-radius:12px;
            z-index:200; padding:0;
            box-shadow:0 8px 32px rgba(0,0,0,0.5);
            animation:qmFadeIn 0.18s ease;
        }
        .qm-panel-header {
            display:flex; align-items:center; justify-content:space-between;
            padding:12px 16px; border-bottom:1px solid #1f2d45;
        }
        .qm-panel-title { color:#8ab0ff; font-size:14px; font-weight:bold; font-family:Georgia,serif; }
        .qm-close-btn { background:none; border:none; color:#3a5a90; cursor:pointer; font-size:16px; padding:0 4px; transition:color 0.2s; }
        .qm-close-btn:hover { color:#ff7b7b; }
        .qm-slots-grid { display:flex; flex-direction:column; gap:1px; padding:8px; }
        .qm-slot { border-radius:10px; border:1px solid #1f2d45; padding:10px 12px; transition:background 0.2s; }
        .qm-slot-used { display:flex; align-items:center; gap:10px; background:#0a0f18; cursor:default; }
        .qm-slot-used:hover { background:#111c30; }
        .qm-slot-thumb { width:52px; height:52px; border-radius:8px; object-fit:cover; flex-shrink:0; border:1px solid #1f2d45; }
        .qm-slot-thumb-empty { display:flex; align-items:center; justify-content:center; background:#162240; color:#3a5a90; font-size:18px; width:52px; height:52px; flex-shrink:0; border-radius:8px; }
        .qm-slot-info { flex:1; min-width:0; }
        .qm-slot-fecha  { color:#3a5a90; font-size:11px; font-family:Arial,sans-serif; }
        .qm-slot-nombre { color:#8ab0ff; font-size:12px; font-weight:bold; font-family:Georgia,serif; margin:2px 0; }
        .qm-slot-resumen { color:#5a7aaa; font-size:11px; font-family:Arial,sans-serif; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .qm-slot-btns { display:flex; flex-direction:column; gap:4px; flex-shrink:0; }
        .qm-btn-load { background:#1f3a70; color:#8ab0ff; border:1px solid #2a4a80; border-radius:6px; padding:4px 10px; cursor:pointer; font-size:11px; font-family:Arial,sans-serif; transition:background 0.2s; }
        .qm-btn-load:hover { background:#2a4a90; }
        .qm-btn-del { background:none; border:1px solid #4a1a1a; color:#ff7b7b; border-radius:6px; padding:4px 8px; cursor:pointer; font-size:11px; transition:background 0.2s; }
        .qm-btn-del:hover { background:#3a1010; }
        .qm-slot-empty { display:flex; align-items:center; justify-content:center; background:#080e1c; min-height:44px; }
        .qm-slot-empty-label { color:#2a3a55; font-size:12px; font-family:Arial,sans-serif; }

        #quint-save-menu {
            position:absolute; bottom:70px; right:16px;
            width:min(320px,90%); background:#0d1526;
            border:1px solid #1f2d45; border-radius:12px;
            z-index:200; padding:0;
            box-shadow:0 8px 32px rgba(0,0,0,0.5);
            animation:qmFadeIn 0.18s ease;
        }
        .qsm-header { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-bottom:1px solid #1f2d45; color:#8ab0ff; font-size:13px; font-family:Georgia,serif; }
        .qsm-slots { display:flex; flex-direction:column; gap:2px; padding:8px; }
        .qsm-slot-btn { display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border-radius:8px; cursor:pointer; border:1px solid #1f2d45; font-family:Arial,sans-serif; transition:background 0.2s; text-align:left; }
        .qsm-empty { background:#080e1c; color:#3a5a90; }
        .qsm-empty:hover { background:#0d1a2e; }
        .qsm-occupied { background:#0a1220; color:#8ab0ff; border-color:#2a3a60; }
        .qsm-occupied:hover { background:#111c30; }
        .qsm-slot-num { font-size:12px; font-weight:bold; }
        .qsm-slot-detail { font-size:11px; color:#3a5a90; }
        .qsm-occupied .qsm-slot-detail { color:#5a7aaa; }

        @keyframes qmFadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        #quint-header-btns .quint-btn-memory {
            background:#0d1526; color:#c8a0ff; border:1px solid #3a2a60;
            padding:6px 12px; border-radius:8px; cursor:pointer; font-size:12px; transition:background 0.2s;
        }
        #quint-header-btns .quint-btn-memory:hover { background:#1e1040; }

        /* SELECTOR DE CHICA */
        #quint-chica-overlay {
            position:absolute; inset:0; z-index:110; background:#0a0f18;
            display:flex; align-items:center; justify-content:flex-start;
            flex-direction:column; padding:24px 20px; border-radius:16px; overflow-y:auto;
        }
        #quint-chica-titulo { color:#8ab0ff; font-size:18px; font-weight:bold; font-family:Georgia,serif; margin-bottom:4px; text-align:center; }
        #quint-chica-sub    { color:#3a5a90; font-size:12px; font-family:Georgia,serif; margin-bottom:20px; text-align:center; }
        #quint-chica-grid   { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:12px; width:100%; max-width:520px; }
        .quint-chica-card {
            background:#0d1526; border:2px solid #1f2d45; border-radius:12px;
            padding:14px 10px; display:flex; flex-direction:column; align-items:center;
            gap:8px; cursor:pointer;
            transition:border-color 0.25s, background 0.25s, transform 0.15s;
            user-select:none;
        }
        .quint-chica-card:hover { background:#111c30; transform:translateY(-2px); }
        .quint-chica-card.seleccionada {
            border-color:var(--card-color); background:#141e38;
            box-shadow:0 0 12px color-mix(in srgb, var(--card-color) 30%, transparent);
        }
        .quint-chica-card-kanji  { font-size:26px; font-family:"Noto Serif JP",serif; }
        .quint-chica-card-nombre { font-size:13px; font-family:Georgia,serif; font-weight:bold; }
        .quint-chica-card-desc   { font-size:10px; color:#3a5a90; font-family:Arial,sans-serif; text-align:center; line-height:1.4; }
        /* Botón de Historias */
        #quint-chica-btn-historias {
            background:linear-gradient(135deg,#5a3a70,#7a5aaf);
            color:#e0c0ff; border:none; padding:11px 32px; border-radius:10px; cursor:pointer;
            font-family:Georgia,serif; font-size:15px; font-weight:bold;
            transition:all 0.2s; width:100%; max-width:260px;
        }
        #quint-chica-btn-historias:hover { transform:scale(1.04); box-shadow:0 0 12px rgba(120,80,255,0.3); }
        
        /* Botón Continuar */
        #quint-chica-btn-continuar {
            background:linear-gradient(135deg,#1f3a70,#3a6adf);
            color:#c0d8ff; border:none; padding:11px 32px; border-radius:10px; cursor:pointer;
            font-family:Georgia,serif; font-size:15px; font-weight:bold;
            transition:all 0.2s; width:100%; max-width:260px;
        }
        #quint-chica-btn-continuar:hover { transform:scale(1.04); box-shadow:0 0 12px rgba(80,120,255,0.3); }
        #quint-chica-btn-continuar:disabled { opacity:0.4; cursor:not-allowed; transform:none; }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  SELECTOR DE CHICA INICIAL
// ============================================================

const CHICA_DESCRIPCIONES = {
    Ichika:  "Mayor. Actriz. Misteriosa y elegante.",
    Nino:    "Segunda. Cocinera. Directa y leal.",
    Miku:    "Tercera. Historiadora. Tranquila y sincera.",
    Yotsuba: "Cuarta. Deportista. Alegre y sin filtros.",
    Itsuki:  "Menor. Trabajadora. Firme y honesta.",
    Reze:    "Personaje especial.",
};

let quintChicaSeleccionadaInicial = null;
let quintEscenarioSeleccionado = null;

function quintMostrarSelectorChica() {
    const app     = document.getElementById("quint-app");
    const overlay = document.createElement("div");
    overlay.id    = "quint-chica-overlay";
    const nombres = Object.keys(CHICAS);
    overlay.innerHTML = `
        <div id="quint-chica-titulo">¿Con quién empezar? ♡</div>
        <div id="quint-chica-sub">Puedes llamar a las demás durante la conversación</div>
        <div id="quint-chica-grid">
            ${nombres.map(nombre => {
                const chica = CHICAS[nombre];
                const desc  = CHICA_DESCRIPCIONES[nombre] || "";
                return `
                    <div class="quint-chica-card" id="quint-card-${nombre}"
                        style="--card-color:${chica.color};"
                        onclick="quintSeleccionarChicaInicial('${nombre}')">
                        <span class="quint-chica-card-kanji" style="color:${chica.color}">${chica.kanji}</span>
                        <span class="quint-chica-card-nombre" style="color:${chica.color}">${nombre}</span>
                        <span class="quint-chica-card-desc">${desc}</span>
                    </div>
                `;
            }).join("")}
        </div>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:16px; align-items:center;">
            <button id="quint-chica-btn-historias" onclick="quintMostrarSelectorHistorias()">
                📖 Historias / Escenarios
            </button>
            <button id="quint-chica-btn-continuar" disabled onclick="quintConfirmarChicaInicial()">
                Comenzar ♡
            </button>
        </div>
    `;
    app.style.position = "relative";
    app.appendChild(overlay);
}

function quintSeleccionarChicaInicial(nombre) {
    Object.keys(CHICAS).forEach(n => {
        const c = document.getElementById(`quint-card-${n}`);
        if (c) c.classList.remove("seleccionada");
    });
    const card = document.getElementById(`quint-card-${nombre}`);
    if (card) card.classList.add("seleccionada");
    quintChicaSeleccionadaInicial = nombre;
    const btn = document.getElementById("quint-chica-btn-continuar");
    if (btn) btn.disabled = false;
}

function quintConfirmarChicaInicial() {
    if (!quintChicaSeleccionadaInicial) return;
    // Quitar selector de chica
    const overlay = document.getElementById("quint-chica-overlay");
    if (overlay) overlay.remove();

    quintChicasActivas = new Set([quintChicaSeleccionadaInicial]);

    // Iniciar sistema de celular
    if (typeof celularIniciar === "function") celularIniciar();
    if (typeof celularPatchearQuintEnviar === "function") celularPatchearQuintEnviar();

    // Iniciar timer de eventos aleatorios
    if (typeof quintIniciarTimerEventos === "function") quintIniciarTimerEventos();

    // Si hay escenario seleccionado, usar su contexto especial
    if (quintEscenarioSeleccionado) {
        quintIniciarConEscenario(quintEscenarioSeleccionado);
    } else {
        // Mostrar selector de locación ANTES del chat
        quintMostrarSelectorLocacion();
    }
}

// ============================================================
//  SELECTOR DE HISTORIAS / ESCENARIOS
// ============================================================

function quintMostrarSelectorHistorias() {
    const app = document.getElementById("quint-app");
    const overlayExistente = document.getElementById("quint-historias-overlay");
    if (overlayExistente) overlayExistente.remove();
    
    const overlay = document.createElement("div");
    overlay.id = "quint-historias-overlay";
    
    // Mostrar TODOS los escenarios sin filtrar por chica
    // Así funciona como el chatbot normal: todas las chicas pueden aparecer
    const escenarios = obtenerListaEscenarios();
    
    const htmlEscenarios = escenarios.map(esc => `
        <div class="quint-escenario-card" onclick="quintSeleccionarEscenario('${esc.id}')">
            ${esc.imagen ? `<img src="${esc.imagen}" alt="${esc.nombre}" class="quint-escenario-imagen">` : ''}
            <div class="quint-escenario-nombre">${esc.nombre}</div>
            <div class="quint-escenario-chica">👤 ${esc.chica}</div>
            <div class="quint-escenario-desc">${esc.descripcion}</div>
            <div class="quint-escenario-locacion">📍 ${esc.locacion}</div>
        </div>
    `).join("");
    
    overlay.innerHTML = `
        <div id="quint-historias-box">
            <div id="quint-historias-titulo">📖 Historias / Escenarios</div>
            <div id="quint-historias-sub">
                Elige una historia para comenzar — Todas las chicas están disponibles
            </div>
            <div id="quint-historias-grid">
                ${htmlEscenarios || '<div class="quint-sin-escenarios">No hay escenarios disponibles aún.</div>'}
            </div>
            <button id="quint-historias-btn-volver" onclick="quintCerrarSelectorHistorias()">
                ← Volver
            </button>
        </div>
        <style>
            #quint-historias-overlay {
                position:absolute; inset:0; z-index:150;
                background:#0a0f18ee;
                display:flex; align-items:center; justify-content:center;
                border-radius:16px;
            }
            #quint-historias-box {
                display:flex; flex-direction:column; align-items:center;
                gap:16px; padding:32px 24px; max-width:600px; width:90%;
                max-height:80vh; overflow-y:auto;
                background:#101d35; border:1px solid #1f2d45;
                border-radius:16px;
            }
            #quint-historias-titulo {
                color:#8ab0ff; font-size:20px; font-weight:bold;
                font-family:'Georgia',serif; text-align:center;
            }
            #quint-historias-sub {
                color:#3a5a90; font-size:14px;
                font-family:'Georgia',serif; text-align:center; margin-top:-8px;
            }
            #quint-historias-grid {
                display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                gap:12px; width:100%; margin-top:8px;
            }
            .quint-escenario-card {
                display:flex; flex-direction:column; gap:6px;
                padding:16px 12px; background:#1a2d50;
                border:1px solid #2a3f60; border-radius:12px;
                cursor:pointer; transition:all 0.2s;
            }
            .quint-escenario-card:hover {
                background:#254070; border-color:#3a5a90;
                transform:scale(1.03); box-shadow:0 0 16px rgba(80,120,255,0.25);
            }
            .quint-escenario-imagen {
                width:100%; height:140px; object-fit:cover;
                border-radius:8px; margin-bottom:4px;
                border:1px solid #2a3f60;
            }
            .quint-escenario-nombre {
                color:#c0d8ff; font-size:14px; font-weight:bold;
                font-family:'Georgia',serif;
            }
            .quint-escenario-chica {
                color:#8ab0ff; font-size:12px;
            }
            .quint-escenario-desc {
                color:#6a8fc7; font-size:11px; line-height:1.3;
            }
            .quint-escenario-locacion {
                color:#5a7fb7; font-size:11px; font-style:italic;
            }
            .quint-sin-escenarios {
                grid-column: 1/-1; text-align:center;
                color:#4a6fa5; font-size:14px; padding:20px;
            }
            #quint-historias-btn-volver {
                margin-top:8px; padding:10px 24px;
                background:#1a2d50; color:#8ab0ff;
                border:1px solid #3a5a90; border-radius:8px;
                cursor:pointer; font-size:14px;
                font-family:'Georgia',serif;
                transition:all 0.2s;
            }
            #quint-historias-btn-volver:hover {
                background:#254070; transform:scale(1.05);
            }
        </style>
    `;
    
    app.appendChild(overlay);
}

function quintSeleccionarEscenario(id) {
    const escenario = obtenerEscenarioPorId(id);
    if (!escenario) return;
    
    quintEscenarioSeleccionado = escenario;
    // Establecer la chica del escenario como inicial para que aparezca primero
    quintChicaSeleccionadaInicial = escenario.chica;
    
    // Cerrar selector de historias
    quintCerrarSelectorHistorias();
    
    // Confirmar selección e iniciar
    quintConfirmarChicaInicial();
}

function quintCerrarSelectorHistorias() {
    const overlay = document.getElementById("quint-historias-overlay");
    if (overlay) overlay.remove();
}

function quintIniciarConEscenario(escenario) {
    const nombre = quintNombreUsuario;
    const loc = establecerLocacion(escenario.locacion);
    const locNombre = loc ? loc.nombre : escenario.locacion;
    
    // Remover overlay de locación si existe
    const overlayLoc = document.getElementById("quint-locacion-overlay");
    if (overlayLoc) overlayLoc.remove();
    
    quintAgregarSistema(`[ 📖 Historia: ${escenario.nombre} ]`);
    quintAgregarSistema(`[ 👤 Personaje principal: ${escenario.chica} ]`);
    quintAgregarSistema(`[ 📍 Locación: ${locNombre} ]`);
    quintAgregarSistema(`[ 💡 Puedes mencionar a otras chicas y ellas aparecerán, igual que en el chat normal ]`);
    
    // Mostrar imagen panorámica de la locación si existe
    if (loc && loc.imagen) {
        quintInsertarImagenLocacion(loc.imagen);
    }
    
    // Buscar el tag de imagen correcto
    const chica = CHICAS[escenario.chica];
    let imgTag = escenario.imagenTag || "Hablando";
    if (chica && !Object.keys(chica.imagenes).includes(imgTag)) {
        imgTag = Object.keys(chica.imagenes)[0] || "Hablando";
    }
    
    quintAgregarChica(escenario.chica, imgTag, escenario.mensajeInicio);
    
    // Agregar contexto al historial - AHORA PERMITIENDO OTRAS CHICAS
    quintHistorial.push({ 
        role: "user", 
        content: `(El nombre del usuario es ${nombre}. ${escenario.contexto} La chica inicial es ${escenario.chica}, pero el usuario puede mencionar a otras hermanas Nakano y ellas aparecerán. Todas las quintillizas existen en este mundo.)` 
    });
    quintHistorial.push({ 
        role: "assistant", 
        content: JSON.stringify({ 
            chicasQueHablan: [{ 
                nombre: escenario.chica, 
                imagen_tag: imgTag, 
                dialogo: escenario.mensajeInicio 
            }], 
            nuevasChicasQueAparecen: [] 
        }) 
    });
    quintLogExport.push(`[ Historia: ${escenario.nombre} — inicio con ${escenario.chica} — todas las chicas pueden aparecer ]`);
    
    // Reproducir música de la locación
    reproducirMusicaLocacion();
    
    setTimeout(() => { 
        const i = document.getElementById("quint-input"); 
        if (i) i.focus(); 
    }, 100);
}

// ============================================================
//  BIENVENIDAS PERSONALIZADAS
// ============================================================

const BIENVENIDAS = {
    Ichika:  (n) => `*te observa desde el otro lado del cuarto con una sonrisa suave* Ah, ${n}... *se acerca lentamente* Llegaste. *inclina la cabeza ligeramente* ¿Qué planes tienes para hoy?`,
    Nino:    (n) => `*cruza los brazos y desvía la mirada* H-hm. ${n}. *resopla* Ya era hora. *te lanza una mirada de lado* ¿Qué quieres? Y no esperes que te lo ponga fácil.`,
    Miku:    (n) => `*levanta la vista de su libro lentamente* ...${n}. *cierra el libro con suavidad* Hola. *pausa breve* Me alegra que hayas venido.`,
    Yotsuba: (n) => `¡¡${n}!! *salta hacia ti y te agarra del brazo* ¡Ya llegaste! *gira emocionada* ¿Qué hacemos hoy?! ¡Dime, dime, dime!`,
    Itsuki:  (n) => `*levanta la vista con expresión seria* Ah, ${n}. *baja el lápiz* Justo llegabas. *leve pausa* ¿Tenías algo en mente? Habla, que escucho.`,
    Reze:    (n) => `*te mira fijamente con una sonrisa enigmática* ${n}... *se acerca sin prisa* Te estaba esperando. ¿Empezamos?`,
};

function quintBienvenidaConChica(nombreChica) {
    const nombre  = quintNombreUsuario;
    const chica   = CHICAS[nombreChica];
    const fn      = BIENVENIDAS[nombreChica];
    const loc     = obtenerLocacionActual();
    const locNombre = loc ? loc.nombre : "";

    // Intentar mensaje personalizado de la chica en esta locación
    let texto;
    let imagenChica = "";
    const msgLoc = obtenerMensajeChicaEnLocacion(nombreChica, nombre);
    if (msgLoc) {
        texto = msgLoc.mensaje;
        imagenChica = msgLoc.imagen || "";
    } else {
        texto = fn ? fn(nombre) : `*sonríe* Hola, ${nombre}. ¿Cómo estás?`;
    }

    const imgKeys = Object.keys(chica.imagenes);
    let imgTag = imgKeys.find(k => k.toLowerCase().includes("hablando")) || imgKeys[0] || "Hablando";

    // Si la chica tiene imagen específica para esta locación, buscar el tag
    if (imagenChica && CHICAS[nombreChica]) {
        for (const [key, url] of Object.entries(CHICAS[nombreChica].imagenes)) {
            if (url === imagenChica) { imgTag = key; break; }
        }
    }

    quintAgregarSistema(`[ Quintillizas Nakano — Empieza con ${nombreChica} ]`);
    quintAgregarSistema(`[ 📍 Locación: ${locNombre || "Sin locación"} ]`);
    quintAgregarSistema("[ Menciona a las demás hermanas para que aparezcan ]");

    // Mostrar imagen panorámica de la locación si existe
    if (loc && loc.imagen) {
        quintInsertarImagenLocacion(loc.imagen);
    }

    quintAgregarChica(nombreChica, imgTag, texto, imagenChica || undefined);

    const locContext = loc ? `Están en ${locNombre}. ` : "";
    quintHistorial.push({ role: "user", content: `(El nombre del usuario es ${nombre}. ${locContext}La chica presente ahora es ${nombreChica}.)` });
    quintHistorial.push({ role: "assistant", content: JSON.stringify({ chicasQueHablan: [{ nombre: nombreChica, imagen_tag: imgTag, dialogo: texto }], nuevasChicasQueAparecen: [] }) });
    quintLogExport.push(`[ Quintillizas Nakano — inicio con ${nombreChica} ]`);

    // Reproducir música de la locación
    reproducirMusicaLocacion();
}

// ============================================================
//  cargarPaginaQuintillizas — versión completa
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
                    <button class="quint-btn-top quint-btn-memory" onclick="memoryOpenPanel()">♡ Memorias</button>
                    <button class="quint-btn-top quint-btn-memory" onclick="memoryOpenSaveMenu()">💾 Guardar</button>
                    <button class="quint-btn-top" onclick="quintImportar()">📂 Importar</button>
                    <button class="quint-btn-top" onclick="quintExportar()">💾 Exportar</button>
                    <button class="quint-btn-top" id="quint-music-btn" onclick="quintToggleMusica()" title="Música ambiental">🎵 Música</button>
                    <button class="quint-btn-top" id="quint-stats-btn" onclick="quintMostrarEstadisticas()" title="Estadísticas">📊 Stats</button>
                    <button class="quint-btn-top" onclick="quintBorrarUltimo()">↩ Borrar</button>
                    <button class="quint-btn-top" onclick="quintToggleDebugAPI()" title="Ver qué se envía a la API">🔍 Debug API</button>
                    <button class="quint-btn-top quint-btn-danger" onclick="quintLimpiar()">🗑 Limpiar</button>
                </div>
            </div>

            <!-- DEBUG PANEL -->
            <div id="quint-debug-panel" style="display:none;">
                <div class="quint-debug-header">
                    <span>🔍 Payload enviado a la API</span>
                    <button onclick="quintToggleDebugAPI()">✕</button>
                </div>
                <div id="quint-debug-content"></div>
            </div>

            <div id="quint-chat-mensajes"></div>

            <div id="quint-ayuda">
                💡 Las hermanas aparecen cuando las mencionas. ♡ Memorias guarda slots con imágenes correctas.
            </div>

            <div id="quint-input-area">
                <textarea id="quint-input" placeholder="Escríbeles a las Nakano... ♡" rows="1"
                    onkeydown="quintKeyHandler(event)"
                    oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'"
                ></textarea>
                <button id="quint-btn-enviar" onclick="quintEnviar()">Enviar ♡</button>
            </div>
        </div>

        <style>
            #quint-app { display:flex; flex-direction:column; height:calc(100vh - 80px); max-width:860px; margin:20px auto; background:transparent !important; border-radius:16px; overflow:hidden; box-shadow:0 0 40px rgba(90,120,200,0.15); border:1px solid #1f2d45; font-family:'Georgia',serif; position:relative; }
            #quint-header { display:flex; align-items:center; justify-content:space-between; background:#0d1526; padding:12px 20px; border-bottom:1px solid #1f2d45; flex-shrink:0; gap:10px; flex-wrap:wrap; }
            #quint-header-info { display:flex; align-items:center; gap:12px; }
            #quint-avatar { width:44px; height:44px; background:linear-gradient(135deg,#1f3a70,#4a6adf); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; color:#c0d0ff; flex-shrink:0; font-family:'Noto Serif JP',serif; }
            #quint-header-nombre { color:#8ab0ff; font-size:16px; font-weight:bold; }
            #quint-header-sub    { color:#3a5a90; font-size:11px; margin-top:2px; }
            #quint-badges { display:flex; gap:6px; flex-wrap:wrap; }
            .quint-badge { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; border:2px solid; cursor:default; transition:all 0.35s ease; font-weight:700; font-family:'Noto Serif JP',serif; }
            #quint-header-btns { display:flex; gap:6px; flex-wrap:wrap; }
            .quint-btn-top { background:#0d1526; color:#8ab0ff; border:1px solid #1f2d45; padding:6px 12px; border-radius:8px; cursor:pointer; font-size:12px; transition:background 0.2s; font-family:Arial,sans-serif; }
            .quint-btn-top:hover { background:#162240; }
            .quint-btn-danger { color:#ff7b7b !important; border-color:#6e2e2e !important; }
            .quint-btn-danger:hover { background:#3a1010 !important; }
            #quint-debug-panel { background:#0d1526; border-bottom:1px solid #1f2d45; max-height:300px; overflow-y:auto; flex-shrink:0; }
            .quint-debug-header { display:flex; justify-content:space-between; align-items:center; padding:8px 14px; background:#162240; color:#8ab0ff; font-size:12px; font-weight:bold; font-family:Arial,sans-serif; position:sticky; top:0; z-index:10; }
            .quint-debug-header button { background:none; border:none; color:#ff7b7b; font-size:16px; cursor:pointer; padding:0 4px; }
            #quint-debug-content { padding:10px 14px; }
            .quint-debug-section { margin-bottom:10px; }
            .quint-debug-label { color:#3a5a90; font-size:10px; text-transform:uppercase; letter-spacing:1px; font-family:Arial,sans-serif; margin-bottom:4px; display:block; }
            .quint-debug-box { background:#0a0f18; border:1px solid #1f2d45; border-radius:6px; padding:8px 10px; color:#c0d8ff; font-size:11px; font-family:'Courier New',monospace; white-space:pre-wrap; word-break:break-word; max-height:150px; overflow-y:auto; line-height:1.5; }
            .quint-debug-box::-webkit-scrollbar { width:4px; }
            .quint-debug-box::-webkit-scrollbar-track { background:#0a0f18; }
            .quint-debug-box::-webkit-scrollbar-thumb { background:#1f2d45; border-radius:2px; }
            .quint-debug-stat { color:#7a8ba0; font-size:11px; font-family:Arial,sans-serif; margin:2px 0; }
            .quint-debug-stat span { color:#8ab0ff; }
            #quint-chat-mensajes { flex:1; overflow-y:auto; padding:18px 16px; display:flex; flex-direction:column; gap:10px; scrollbar-width:thin; scrollbar-color:#1f2d45 #0a0f18; }
            #quint-chat-mensajes::-webkit-scrollbar { width:6px; }
            #quint-chat-mensajes::-webkit-scrollbar-track { background:#0a0f18; }
            #quint-chat-mensajes::-webkit-scrollbar-thumb { background:#1f2d45; border-radius:3px; }
            .quint-burbuja { max-width:78%; padding:11px 15px; border-radius:16px; line-height:1.65; font-size:14px; word-break:break-word; animation:quintFadeIn 0.22s ease; }
            @keyframes quintFadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
            .quint-chica-burbuja { border:1px solid; align-self:flex-start; border-bottom-left-radius:4px; }
            .quint-usuario { background:linear-gradient(135deg,#1a2a4a,#1c3060); border:1px solid #2a4080; align-self:flex-end; border-bottom-right-radius:4px; color:#c0d8ff; }
            .quint-sistema { text-align:center; color:#3a5a90; font-size:11px; font-style:italic; font-family:Arial,sans-serif; }
            .quint-nombre-chica { font-weight:bold; font-size:12px; font-family:Georgia,serif; }
            .quint-nombre-usuario { color:#7aaeff; font-weight:bold; font-size:12px; }
            .quint-texto  { color:#e8e8f0; }
            .quint-accion { font-style:italic; }
            .quint-img-wrapper { margin-top:10px; border-radius:10px; overflow:hidden; max-width:320px; border:1px solid rgba(255,255,255,0.08); }
            .quint-img { width:100%; display:block; }
            .quint-typing { background:#0d1526; border:1px solid #1f2d45; border-radius:16px; border-bottom-left-radius:4px; padding:10px 14px; align-self:flex-start; max-width:160px; animation:quintFadeIn 0.2s ease; }
            .quint-dot { display:inline-block; width:7px; height:7px; background:#3a5a90; border-radius:50%; margin:0 2px; animation:quintDot 1.2s infinite; }
            .quint-dot:nth-child(2){animation-delay:0.0s} .quint-dot:nth-child(3){animation-delay:0.2s} .quint-dot:nth-child(4){animation-delay:0.4s}
            @keyframes quintDot { 0%,80%,100%{transform:scale(0.7);opacity:0.3} 40%{transform:scale(1.1);opacity:1} }
            #quint-ayuda { background:#080e1c; color:#3a5a90; font-size:11px; font-family:Arial,sans-serif; padding:6px 16px; border-top:1px solid #151f35; flex-shrink:0; }
            #quint-input-area { display:flex; gap:10px; padding:12px 16px; background:#0d1526; border-top:1px solid #1f2d45; flex-shrink:0; align-items:flex-end; }
            #quint-input { flex:1; background:#101d35; color:#e8e8f0; border:1px solid #1f2d45; border-radius:10px; padding:9px 13px; font-family:'Georgia',serif; font-size:14px; resize:none; outline:none; min-height:40px; max-height:120px; line-height:1.5; transition:border-color 0.2s; }
            #quint-input:focus { border-color:#3a5a90; }
            #quint-input::placeholder { color:#3a5a90; }
            #quint-btn-enviar { background:linear-gradient(135deg,#1f3a70,#3a6adf); color:#c0d8ff; border:none; padding:9px 18px; border-radius:10px; cursor:pointer; font-family:'Georgia',serif; font-size:14px; font-weight:bold; transition:all 0.2s; white-space:nowrap; align-self:flex-end; }
            #quint-btn-enviar:hover { transform:scale(1.04); }
            #quint-btn-enviar:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
            @media(max-width:600px) { #quint-app{height:calc(100vh - 60px);border-radius:0;} .quint-burbuja{max-width:92%;} #quint-header-btns{display:flex;flex-wrap:wrap;gap:4px;} #quint-header-btns .quint-btn-top{font-size:10px;padding:4px 8px;} .quint-img-wrapper{max-width:100%;} }

            /* ESTADÍSTICAS */
            #quint-stats-overlay { position:absolute; inset:0; z-index:250; background:rgba(10,15,24,0.92); display:flex; align-items:center; justify-content:center; border-radius:16px; }
            #quint-stats-box { background:#0d1526; border:1px solid #1f2d45; border-radius:14px; width:min(480px,92%); max-height:80vh; overflow-y:auto; box-shadow:0 8px 40px rgba(0,0,0,0.6); animation:qstatFadeIn 0.2s ease; }
            .qstat-header { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; border-bottom:1px solid #1f2d45; }
            .qstat-header > span { color:#8ab0ff; font-size:15px; font-weight:bold; font-family:Georgia,serif; }
            .qstat-content { padding:16px; }
            .qstat-section { margin-bottom:4px; }
            .qstat-section-title { color:#5a7aaa; font-size:12px; font-weight:bold; font-family:Arial,sans-serif; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px; }
            .qstat-highlight { background:#111d35; border:1px solid #1f2d45; border-radius:8px; padding:8px 12px; color:#c0d8ff; font-size:12px; font-family:Georgia,serif; margin-bottom:10px; }
            .qstat-empty { color:#2a3a55; font-size:12px; font-family:Arial,sans-serif; text-align:center; padding:12px 0; }
            .qstat-row { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
            .qstat-label { width:64px; font-size:11px; font-weight:bold; font-family:Arial,sans-serif; text-align:right; flex-shrink:0; }
            .qstat-bar-bg { flex:1; height:14px; background:#0a0f18; border-radius:7px; overflow:hidden; border:1px solid #151f35; }
            .qstat-bar { height:100%; border-radius:7px; transition:width 0.4s ease; min-width:2px; }
            .qstat-count { width:72px; font-size:11px; color:#8ab0ff; font-family:Arial,sans-serif; flex-shrink:0; }
            .qstat-count small { color:#3a5a90; }
            .qstat-divider { height:1px; background:#1f2d45; margin:12px 0; }
            .qstat-total { text-align:center; color:#c0d8ff; font-size:14px; font-family:Georgia,serif; padding:8px 0; }
            @keyframes qstatFadeIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }

            /* NOTIFICACIÓN DE EVENTO ALEATORIO */
            .quint-evento-notif {
                display:flex; align-items:center; gap:8px;
                align-self:center; padding:8px 16px;
                background:linear-gradient(135deg,#1a1040,#2a1050);
                border:1px solid #4a2080; border-radius:20px;
                animation:quintEventoIn 0.3s ease;
                transition:opacity 0.4s, transform 0.4s;
                max-width:80%;
            }
            .quint-evento-icon { font-size:16px; }
            .quint-evento-text { color:#c8a0ff; font-size:12px; font-family:Georgia,serif; font-style:italic; }
            @keyframes quintEventoIn { from{opacity:0;transform:translateY(-8px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        </style>
    `;

    // Reset completo
    quintHistorial       = [];
    quintLogExport       = [];
    quintLogEstructurado = [];
    quintResumenAcumulado = "";
    quintHechosClave     = [];
    quintResumenPendiente = false;
    quintChicasActivas   = new Set();
    quintChicaSeleccionadaInicial = null;
    quintEscenarioSeleccionado = null;
    _memoryPatched = false;   // permitir re-parchear en nueva sesión

    memoryInjectStyles();
    memoryPatchearFunciones();
    quintPedirNombre();
}

// ============================================================
//  SOBRESCRITURAS
// ============================================================

function quintConfirmarNombre() {
    const inp    = document.getElementById("quint-nombre-input");
    const nombre = inp ? inp.value.trim() : "";
    quintNombreUsuario = nombre || "Tú";
    const overlay = document.getElementById("quint-nombre-overlay");
    if (overlay) overlay.remove();
    quintMostrarSelectorChica();
}

function quintLimpiar() {
    if (!confirm("¿Limpiar toda la conversación?")) return;
    quintHistorial       = [];
    quintLogExport       = [];
    quintLogEstructurado = [];
    quintResumenAcumulado = "";
    quintHechosClave     = [];
    quintResumenPendiente = false;
    quintChicasActivas   = new Set();
    quintStatsData       = { mensajesPorChica: {}, mensajesPorLocacion: {}, totalMensajes: 0 };
    quintMusicaActivada  = false;
    quintEventoActivo    = null;
    if (typeof quintIniciarTimerEventos === "function") quintIniciarTimerEventos();
    document.getElementById("quint-chat-mensajes").innerHTML = "";
    quintActualizarBadges();
    establecerLocacion(null);
    detenerMusicaLocacion();
    const musicBtn = document.getElementById("quint-music-btn");
    if (musicBtn) { musicBtn.textContent = "🎵 Música"; musicBtn.style.borderColor = ""; musicBtn.style.color = ""; }
    quintMostrarSelectorChica();
}

// ============================================================
//  MÚSICA TOGGLE
// ============================================================

function quintToggleMusica() {
    quintMusicaActivada = !quintMusicaActivada;
    const btn = document.getElementById("quint-music-btn");
    if (!btn) return;

    if (quintMusicaActivada) {
        reproducirMusicaLocacion();
        btn.textContent = "🎵 ON";
        btn.style.borderColor = "#4a90ff";
        btn.style.color = "#4a90ff";
    } else {
        detenerMusicaLocacion();
        btn.textContent = "🎵 Música";
        btn.style.borderColor = "";
        btn.style.color = "";
    }
}

// ============================================================
//  ESTADÍSTICAS — Mostrar panel
// ============================================================

function quintMostrarEstadisticas() {
    const stats = quintStatsData;
    const chicas = Object.entries(stats.mensajesPorChica).sort((a, b) => b[1] - a[1]);
    const locaciones = Object.entries(stats.mensajesPorLocacion).sort((a, b) => b[1] - a[1]);
    const total = stats.totalMensajes || 1;

    const chicaTop = chicas.length > 0 ? chicas[0] : null;
    const locTop = locaciones.length > 0 ? locaciones[0] : null;

    const coloresChicas = {
        Ichika: "#e06b8f",
        Nino: "#e8a04a",
        Miku: "#5ba8d6",
        Yotsuba: "#6dc96d",
        Itsuki: "#c084d4",
    };

    const barrasChicas = chicas.map(([nombre, count]) => {
        const pct = Math.round((count / total) * 100);
        const color = coloresChicas[nombre] || "#8ab0ff";
        return `
            <div class="qstat-row">
                <span class="qstat-label" style="color:${color}">${nombre}</span>
                <div class="qstat-bar-bg">
                    <div class="qstat-bar" style="width:${pct}%;background:${color}"></div>
                </div>
                <span class="qstat-count">${count} <small>(${pct}%)</small></span>
            </div>`;
    }).join("");

    const barrasLocs = locaciones.map(([nombre, count]) => {
        const pct = Math.round((count / total) * 100);
        return `
            <div class="qstat-row">
                <span class="qstat-label">📍 ${nombre}</span>
                <div class="qstat-bar-bg">
                    <div class="qstat-bar" style="width:${pct}%;background:#4a90ff"></div>
                </div>
                <span class="qstat-count">${count} <small>(${pct}%)</small></span>
            </div>`;
    }).join("");

    const existing = document.getElementById("quint-stats-overlay");
    if (existing) { existing.remove(); return; }

    const app = document.getElementById("quint-app");
    const overlay = document.createElement("div");
    overlay.id = "quint-stats-overlay";
    overlay.innerHTML = `
        <div id="quint-stats-box">
            <div class="qstat-header">
                <span>📊 Estadísticas</span>
                <button class="qm-close-btn" onclick="quintCerrarEstadisticas()">✕</button>
            </div>
            <div class="qstat-content">
                <div class="qstat-section">
                    <div class="qstat-section-title">Mensajes por Chica</div>
                    ${chicaTop ? `<div class="qstat-highlight">💬 La que más habla: <strong style="color:${coloresChicas[chicaTop[0]] || '#8ab0ff'}">${chicaTop[0]}</strong> (${chicaTop[1]} mensajes)</div>` : '<div class="qstat-empty">Sin datos aún</div>'}
                    ${barrasChicas || '<div class="qstat-empty">Sin mensajes aún</div>'}
                </div>
                <div class="qstat-divider"></div>
                <div class="qstat-section">
                    <div class="qstat-section-title">Mensajes por Locación</div>
                    ${locTop ? `<div class="qstat-highlight">📍 Lugar favorito: <strong style="color:#4a90ff">${locTop[0]}</strong> (${locTop[1]} mensajes)</div>` : '<div class="qstat-empty">Sin datos aún</div>'}
                    ${barrasLocs || '<div class="qstat-empty">Sin mensajes aún</div>'}
                </div>
                <div class="qstat-divider"></div>
                <div class="qstat-section">
                    <div class="qstat-section-title">Total</div>
                    <div class="qstat-total">${total} mensajes en total</div>
                </div>
            </div>
        </div>
    `;

    app.style.position = "relative";
    app.appendChild(overlay);
}

function quintCerrarEstadisticas() {
    const overlay = document.getElementById("quint-stats-overlay");
    if (overlay) overlay.remove();
}
