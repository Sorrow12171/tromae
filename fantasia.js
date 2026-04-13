// ================================================
// RPG FANTASÍA - VERSIÓN MEJORADA
// Clases, habilidades, efectos de estado, combos, drops
// ================================================

class FantasiaRPG {
    constructor() {
        console.log("🎮 Inicializando FantasiaRPG...");
        
        this.detectarYResetearDatosCorruptos();
        
        this.jugador = this.cargarJugador() || null; // null = mostrar selección de clase
        this.pisos = this.inicializarPisos();
        this.pisoActual = this.cargarPisoActual() || 1;
        this.enemigoActual = null;
        this.indiceEnemigoActual = 0;

        this.sincronizarDesdeSupabase();
        this.enCombate = false;
        this.mensajesCombate = [];
        this.spriteBossActual = 'normal';
        this.bossDerrotado = null;
        this.pocionUsadaEsteCombate = false;
        this.esperandoRecompensas = false;
        
        // Sistema de combo
        this.comboActual = 0;
        this.turnosSinDaño = 0;
        
        // Efectos de estado
        this.efectosJugador = { veneno: 0, escudo: 0, furia: 0, regeneracion: 0 };
        this.efectosEnemigo = { veneno: 0, aturdido: 0, debilitado: 0 };
        
        this.noviaActual = null;
        this.noviaEnRecompensas = null;
        
        this.videosNovias = {
            ichika: {
                mamada: "1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe",
                doggy: "1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K",
                montar: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS",
                imagen: "https://pbs.twimg.com/media/G7qfcGRWkAAV74w?format=png&name=small"
            },
            nino: {
                mamada: "1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl",
                doggy: "1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe",
                montar: "1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K",
                imagen: "https://pbs.twimg.com/media/G7qfpGZXAAAib4A?format=png&name=small"
            },
            miku: {
                mamada: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS",
                doggy: "1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl",
                montar: "1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe",
                imagen: "https://pbs.twimg.com/media/G7qfrrKWsAAv6ZT?format=png&name=small"
            },
            yotsuba: {
                mamada: "1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K",
                doggy: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS",
                montar: "1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl",
                imagen: "https://pbs.twimg.com/media/G7qfupkXUAAX0aS?format=png&name=small"
            },
            itsuki: {
                mamada: "1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe",
                doggy: "1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K",
                montar: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS",
                imagen: "https://pbs.twimg.com/media/G7qfxnsX0AIbJK1?format=png&name=small"
            }
        };
        
        console.log("✅ FantasiaRPG inicializado");
    }

    // ====================
    // SISTEMA DE CLASES
    // ====================

    obtenerClases() {
        return {
            guerrero: {
                nombre: "⚔️ Guerrero",
                descripcion: "Alto daño físico y vida. Resiste golpes duros.",
                color: "#FF6B6B",
                emoji: "⚔️",
                stats: { fuerza: 8, resistencia: 8, velocidad: 4, inteligencia: 3, carisma: 5 },
                vida: 130,
                energia: 40,
                habilidades: ["golpe_brutal", "escudo_acero", "furia_berserker"]
            },
            mago: {
                nombre: "✨ Mago",
                descripcion: "Daño mágico devastador. Controla el campo con efectos.",
                color: "#8A5AF7",
                emoji: "✨",
                stats: { fuerza: 3, resistencia: 4, velocidad: 5, inteligencia: 10, carisma: 6 },
                vida: 90,
                energia: 70,
                habilidades: ["bola_fuego", "veneno_arcano", "tormenta_magica"]
            },
            picaro: {
                nombre: "🗡️ Pícaro",
                descripcion: "Velocidad y veneno. Gran probabilidad de crítico.",
                color: "#4CAF50",
                emoji: "🗡️",
                stats: { fuerza: 6, resistencia: 5, velocidad: 10, inteligencia: 5, carisma: 6 },
                vida: 100,
                energia: 55,
                habilidades: ["golpe_critico", "envenenar", "golpe_doble"]
            }
        };
    }

    obtenerHabilidades() {
        return {
            // GUERRERO
            golpe_brutal: {
                nombre: "💢 Golpe Brutal",
                descripcion: "Daño masivo físico. Más fuerte con combo activo.",
                costoEnergia: 20,
                clase: "guerrero",
                color: "#FF6B6B",
                ejecutar: (jugador, enemigo) => {
                    const combo = this.comboActual;
                    const bonus = 1 + (combo * 0.2);
                    let daño = Math.floor((20 + Math.random() * 15 + jugador.stats.fuerza * 1.5) * bonus);
                    daño = Math.max(1, daño - enemigo.defensa);
                    enemigo.vidaActual -= daño;
                    const msg = combo > 0 ? `💢 GOLPE BRUTAL x${combo+1} COMBO! ${daño} daño!` : `💢 Golpe Brutal! ${daño} daño!`;
                    return { daño, mensaje: msg };
                }
            },
            escudo_acero: {
                nombre: "🛡️ Escudo de Acero",
                descripcion: "Bloquea los próximos 2 ataques enemigos.",
                costoEnergia: 15,
                clase: "guerrero",
                color: "#9E9E9E",
                ejecutar: (jugador, enemigo) => {
                    this.efectosJugador.escudo = 2;
                    return { daño: 0, mensaje: `🛡️ ¡Escudo activado! Próximos 2 ataques bloqueados.` };
                }
            },
            furia_berserker: {
                nombre: "🔥 Furia Berserker",
                descripcion: "Entra en furia: +50% daño por 3 turnos. Pierde 10 HP.",
                costoEnergia: 10,
                clase: "guerrero",
                color: "#FF9800",
                ejecutar: (jugador, enemigo) => {
                    this.efectosJugador.furia = 3;
                    jugador.vida = Math.max(1, jugador.vida - 10);
                    return { daño: 0, mensaje: `🔥 ¡FURIA BERSERKER! +50% daño por 3 turnos. -10 HP` };
                }
            },
            // MAGO
            bola_fuego: {
                nombre: "🔥 Bola de Fuego",
                descripcion: "Daño mágico alto que ignora defensa.",
                costoEnergia: 25,
                clase: "mago",
                color: "#FF5722",
                ejecutar: (jugador, enemigo) => {
                    let daño = Math.floor(30 + Math.random() * 20 + jugador.stats.inteligencia * 2);
                    // Ignora defensa
                    enemigo.vidaActual -= daño;
                    return { daño, mensaje: `🔥 ¡Bola de Fuego! ${daño} daño mágico (ignora defensa)!` };
                }
            },
            veneno_arcano: {
                nombre: "☠️ Veneno Arcano",
                descripcion: "Envenena al enemigo por 4 turnos.",
                costoEnergia: 20,
                clase: "mago",
                color: "#4CAF50",
                ejecutar: (jugador, enemigo) => {
                    this.efectosEnemigo.veneno = 4;
                    const dañoVeneno = Math.floor(5 + jugador.stats.inteligencia * 0.5);
                    this.efectosEnemigo.dañoVeneno = dañoVeneno;
                    return { daño: 0, mensaje: `☠️ ¡Veneno Arcano! Enemigo pierde ${dañoVeneno} HP/turno por 4 turnos.` };
                }
            },
            tormenta_magica: {
                nombre: "⚡ Tormenta Mágica",
                descripcion: "Golpea 3 veces seguidas con daño mágico.",
                costoEnergia: 35,
                clase: "mago",
                color: "#5864F5",
                ejecutar: (jugador, enemigo) => {
                    let totalDaño = 0;
                    for (let i = 0; i < 3; i++) {
                        const d = Math.floor(10 + Math.random() * 10 + jugador.stats.inteligencia);
                        totalDaño += d;
                        enemigo.vidaActual -= d;
                    }
                    return { daño: totalDaño, mensaje: `⚡ ¡TORMENTA MÁGICA! 3 golpes = ${totalDaño} daño total!` };
                }
            },
            // PICARO
            golpe_critico: {
                nombre: "🎯 Golpe Crítico",
                descripcion: "Alta probabilidad de crítico (x2.5 daño).",
                costoEnergia: 15,
                clase: "picaro",
                color: "#FFD700",
                ejecutar: (jugador, enemigo) => {
                    const critChance = 40 + jugador.stats.velocidad * 2;
                    const esCrit = Math.random() * 100 < critChance;
                    let daño = Math.floor(12 + Math.random() * 10 + jugador.stats.fuerza);
                    daño = Math.max(1, daño - enemigo.defensa);
                    if (esCrit) daño = Math.floor(daño * 2.5);
                    enemigo.vidaActual -= daño;
                    return { daño, mensaje: esCrit ? `🎯 ¡¡CRÍTICO!! ${daño} daño!` : `🎯 Golpe certero. ${daño} daño.` };
                }
            },
            envenenar: {
                nombre: "🐍 Envenenar",
                descripcion: "Veneno rápido + aturde al enemigo 1 turno.",
                costoEnergia: 20,
                clase: "picaro",
                color: "#8BC34A",
                ejecutar: (jugador, enemigo) => {
                    this.efectosEnemigo.veneno = 3;
                    this.efectosEnemigo.dañoVeneno = 8;
                    this.efectosEnemigo.aturdido = 1;
                    return { daño: 0, mensaje: `🐍 ¡Envenenado y aturdido! Enemigo pierde turno.` };
                }
            },
            golpe_doble: {
                nombre: "⚡ Golpe Doble",
                descripcion: "Ataca dos veces rápido.",
                costoEnergia: 18,
                clase: "picaro",
                color: "#00BCD4",
                ejecutar: (jugador, enemigo) => {
                    let d1 = Math.floor(8 + Math.random() * 8 + jugador.stats.fuerza * 0.8);
                    let d2 = Math.floor(8 + Math.random() * 8 + jugador.stats.fuerza * 0.8);
                    d1 = Math.max(1, d1 - enemigo.defensa);
                    d2 = Math.max(1, d2 - enemigo.defensa);
                    enemigo.vidaActual -= (d1 + d2);
                    return { daño: d1 + d2, mensaje: `⚡ ¡GOLPE DOBLE! ${d1} + ${d2} = ${d1+d2} daño!` };
                }
            }
        };
    }

    // ====================
    // DETECCIÓN DE DATOS CORRUPTOS
    // ====================

    detectarYResetearDatosCorruptos() {
        try {
            const testJugador = localStorage.getItem('fantasia_jugador');
            if (testJugador) {
                const parsed = JSON.parse(testJugador);
                if (!parsed.stats || !parsed.inventario || !parsed.stats.fuerza) {
                    console.warn("⚠️ Datos corruptos detectados, reseteando...");
                    this.limpiarLocalStorage();
                }
            }
        } catch (e) {
            console.warn("⚠️ Error al leer datos, reseteando...");
            this.limpiarLocalStorage();
        }
    }

    limpiarLocalStorage() {
        localStorage.removeItem('fantasia_jugador');
        localStorage.removeItem('fantasia_pisos');
        localStorage.removeItem('fantasia_pisoActual');
        console.log("🧹 LocalStorage limpiado");
    }

    // ====================
    // FUNCIONES DE NOVIA
    // ====================

    actualizarNoviaActual() {
        this.noviaActual = null;
        
        if (window.quintillizasRPG) {
            const rpg = window.quintillizasRPG;
            if (rpg.personajeSeleccionado && rpg.datosPersonajes && rpg.datosPersonajes[rpg.personajeSeleccionado]) {
                const personaje = rpg.datosPersonajes[rpg.personajeSeleccionado];
                this.noviaActual = {
                    id: rpg.personajeSeleccionado,
                    nombre: personaje.nombre,
                    nombreCorto: personaje.nombre.split(' ')[0],
                    imagen: personaje.imagen,
                    color: personaje.color,
                    nivel: personaje.nivel ?? 1,
                    afinidad: personaje.afinidad ?? 0
                };
            }
        }
        
        if (!this.noviaActual && window.obtenerNoviaSeleccionada) {
            const data = window.obtenerNoviaSeleccionada();
            if (data) {
                this.noviaActual = {
                    id: data.id,
                    nombre: data.nombre,
                    nombreCorto: data.nombre.split(' ')[0],
                    imagen: data.imagen,
                    color: data.color || '#FF1493',
                    nivel: data.nivel ?? 1,
                    afinidad: data.afinidad ?? 0
                };
            }
        }

        // Si RPG aún no cargó, reintentar en 1 segundo
        if (!this.noviaActual) {
            setTimeout(() => {
                this.actualizarNoviaActual();
                if (this.noviaActual && !this.enCombate) this.actualizarUI();
            }, 1000);
        }
        
        return this.noviaActual;
    }

    // ====================
    // INICIALIZACIÓN
    // ====================

    inicializarJugador(clase = 'guerrero') {
        const clases = this.obtenerClases();
        const claseData = clases[clase];
        
        return {
            clase: clase,
            claseNombre: claseData.nombre,
            claseColor: claseData.color,
            claseEmoji: claseData.emoji,
            habilidades: claseData.habilidades,
            
            nivel: 1,
            exp: 0,
            expMaxima: 100,
            
            stats: { ...claseData.stats },
            
            vida: claseData.vida,
            vidaMaxima: claseData.vida,
            energia: claseData.energia,
            energiaMaxima: claseData.energia,
            
            piedras: 10,
            
            inventario: {
                pocionVidaPequena: 3,
                pocionVidaGrande: 1,
                pocionEnergia: 2,
                revivirAuto: 0,
                granada: 0,
                escudoTemporal: 0,
                elixirFuria: 0
            },
            
            enemigosDerrotados: 0,
            bossesDerrotados: 0,
            pisosCompletados: 0,
            criticos: 0,
            dañoTotalHecho: 0
        };
    }

    inicializarPisos() {
        return {
            1: {
                nombre: "🌳 Bosque Encantado",
                desbloqueado: true,
                completado: false,
                jefe: "Rias Gremory",
                enemigos: [
                    { id: "slime", nombre: "Slime Verde", imagen: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=SLIME", vida: 25, fuerza: 4, defensa: 1, exp: 5, piedras: 1, drops: ["pocionVidaPequena"] },
                    { id: "goblin", nombre: "Goblin", imagen: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=GOBLIN", vida: 35, fuerza: 6, defensa: 2, exp: 8, piedras: 1, drops: ["pocionVidaPequena", "pocionEnergia"] },
                    { id: "lobo", nombre: "Lobo", imagen: "https://via.placeholder.com/150x150/795548/FFFFFF?text=LOBO", vida: 45, fuerza: 8, defensa: 3, exp: 12, piedras: 2, drops: ["pocionVidaGrande"] }
                ],
                boss: {
                    id: "rias", nombre: "🔥 Rias Gremory",
                    imagen: "https://pbs.twimg.com/media/HBE4XBQakAEjLjq?format=jpg&name=medium",
                    imagenAtacando: "https://pbs.twimg.com/media/HBE4c2sXEAAuow7?format=png&name=small",
                    imagenDerrotado: "https://pbs.twimg.com/media/HBE3hojWQAAMSRN?format=jpg&name=medium",
                    vida: 120, fuerza: 15, defensa: 5, exp: 50, piedras: 5,
                    habilidadEspecial: { nombre: "Poder Demoníaco", chance: 20, daño: 25 },
                    videos: { mamada: "1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe", doggy: "1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K", montar: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS" }
                }
            },
            2: {
                nombre: "🔥 Volcán de Fuego",
                desbloqueado: false,
                completado: false,
                jefe: "Erza Scarlet",
                enemigos: [
                    { id: "elemental", nombre: "Elemental de Fuego", imagen: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=ELEMENTAL", vida: 40, fuerza: 9, defensa: 3, exp: 15, piedras: 2, drops: ["pocionEnergia"] },
                    { id: "salamandra", nombre: "Salamandra", imagen: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=SALAMANDRA", vida: 55, fuerza: 12, defensa: 4, exp: 20, piedras: 2, drops: ["pocionVidaPequena", "granada"] },
                    { id: "demonio", nombre: "Demonio Menor", imagen: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=DEMONIO", vida: 70, fuerza: 15, defensa: 5, exp: 25, piedras: 3, drops: ["pocionVidaGrande"] }
                ],
                boss: {
                    id: "erza", nombre: "⚔️ Erza Scarlet",
                    imagen: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=ERZA",
                    imagenAtacando: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=ERZA+ATK",
                    imagenDerrotado: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=ERZA+DEF",
                    vida: 180, fuerza: 22, defensa: 8, exp: 80, piedras: 10,
                    habilidadEspecial: { nombre: "Espada Titania", chance: 25, daño: 35 },
                    videos: { mamada: "1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl", doggy: "1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe", montar: "1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K" }
                }
            },
            3: {
                nombre: "❄️ Templo Helado",
                desbloqueado: false,
                completado: false,
                jefe: "Esdeath",
                enemigos: [
                    { id: "fantasma", nombre: "Fantasma", imagen: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=FANTASMA", vida: 50, fuerza: 11, defensa: 4, exp: 22, piedras: 3, drops: ["pocionEnergia", "escudoTemporal"] },
                    { id: "yeti", nombre: "Yeti", imagen: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=YETI", vida: 75, fuerza: 16, defensa: 7, exp: 30, piedras: 3, drops: ["pocionVidaGrande"] },
                    { id: "golem", nombre: "Golem de Hielo", imagen: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=GOLEM", vida: 95, fuerza: 20, defensa: 10, exp: 35, piedras: 4, drops: ["granada", "pocionVidaGrande"] }
                ],
                boss: {
                    id: "esdeath", nombre: "❄️ Esdeath",
                    imagen: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=ESDEATH",
                    imagenAtacando: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=ESDEATH+ATK",
                    imagenDerrotado: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=ESDEATH+DEF",
                    vida: 250, fuerza: 30, defensa: 12, exp: 120, piedras: 15,
                    habilidadEspecial: { nombre: "Tormenta de Hielo", chance: 30, daño: 45 },
                    videos: { mamada: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS", doggy: "1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl", montar: "1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe" }
                }
            },
            4: {
                nombre: "⚡ Ciudad Prohibida",
                desbloqueado: false,
                completado: false,
                jefe: "Yor Forger",
                enemigos: [
                    { id: "samurai", nombre: "Samurai", imagen: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=SAMURAI", vida: 65, fuerza: 18, defensa: 8, exp: 35, piedras: 4, drops: ["pocionVidaGrande", "elixirFuria"] },
                    { id: "ninja", nombre: "Ninja", imagen: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=NINJA", vida: 55, fuerza: 22, defensa: 5, exp: 40, piedras: 4, drops: ["escudoTemporal"] },
                    { id: "oni", nombre: "Oni", imagen: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=ONI", vida: 90, fuerza: 25, defensa: 10, exp: 45, piedras: 5, drops: ["granada", "elixirFuria"] }
                ],
                boss: {
                    id: "yor", nombre: "🗡️ Yor Forger",
                    imagen: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=YOR",
                    imagenAtacando: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=YOR+ATK",
                    imagenDerrotado: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=YOR+DEF",
                    vida: 320, fuerza: 38, defensa: 15, exp: 160, piedras: 20,
                    habilidadEspecial: { nombre: "Asesina Letal", chance: 30, daño: 60 },
                    videos: { mamada: "1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K", doggy: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS", montar: "1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl" }
                }
            },
            5: {
                nombre: "🌌 Castillo Celestial",
                desbloqueado: false,
                completado: false,
                jefe: "Makima",
                enemigos: [
                    { id: "angel", nombre: "Ángel", imagen: "https://via.placeholder.com/150x150/FFC107/000000?text=ANGEL", vida: 80, fuerza: 22, defensa: 10, exp: 50, piedras: 5, drops: ["escudoTemporal", "pocionVidaGrande"] },
                    { id: "caballero", nombre: "Caballero Celestial", imagen: "https://via.placeholder.com/150x150/FFC107/000000?text=CABALLERO", vida: 100, fuerza: 28, defensa: 15, exp: 60, piedras: 5, drops: ["elixirFuria"] },
                    { id: "mago_sup", nombre: "Mago Supremo", imagen: "https://via.placeholder.com/150x150/FFC107/000000?text=MAGO", vida: 70, fuerza: 35, defensa: 8, exp: 70, piedras: 6, drops: ["granada", "escudoTemporal"] }
                ],
                boss: {
                    id: "makima", nombre: "👁️ Makima",
                    imagen: "https://via.placeholder.com/150x150/FFEB3B/000000?text=MAKIMA",
                    imagenAtacando: "https://via.placeholder.com/150x150/FFEB3B/000000?text=MAKIMA+ATK",
                    imagenDerrotado: "https://via.placeholder.com/150x150/FFEB3B/000000?text=MAKIMA+DEF",
                    vida: 500, fuerza: 50, defensa: 20, exp: 300, piedras: 50,
                    habilidadEspecial: { nombre: "Control Mental", chance: 35, daño: 80 },
                    videos: { mamada: "1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe", doggy: "1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K", montar: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS" }
                }
            }
        };
    }

    // ====================
    // SISTEMA DE ATAQUES
    // ====================

    atacar(tipo = 'basico') {
        if (!this.enCombate) return;
        
        let daño = 0;
        let costoEnergia = 0;
        let mensaje = "";
        let esCritico = false;
        
        const furyBonus = this.efectosJugador.furia > 0 ? 1.5 : 1;
        
        switch(tipo) {
            case 'basico':
                daño = 5 + Math.floor(Math.random() * 6) + Math.floor(this.jugador.stats.fuerza / 2);
                // Chance de critico basico para picaro
                if (this.jugador.clase === 'picaro' && Math.random() < 0.15) {
                    daño = Math.floor(daño * 2);
                    esCritico = true;
                }
                daño = Math.floor(daño * furyBonus);
                costoEnergia = 0;
                mensaje = esCritico ? `🎯 ¡CRÍTICO! Ataque básico!` : `⚔️ Ataque básico!`;
                break;
                
            case 'fuerte':
                if (this.jugador.energia < 15) {
                    this.agregarMensaje("❌ No tienes suficiente energía (necesitas 15 EN)");
                    return;
                }
                daño = 15 + Math.floor(Math.random() * 10) + this.jugador.stats.fuerza;
                daño = Math.floor(daño * furyBonus);
                costoEnergia = 15;
                mensaje = `💥 ATAQUE FUERTE!`;
                break;
                
            case 'magico':
                if (this.jugador.energia < 25) {
                    this.agregarMensaje("❌ No tienes suficiente energía (necesitas 25 EN)");
                    return;
                }
                daño = 25 + Math.floor(Math.random() * 15) + Math.floor(this.jugador.stats.inteligencia * 1.5);
                costoEnergia = 25;
                mensaje = `✨ ATAQUE MÁGICO!`;
                break;
        }
        
        this.jugador.energia -= costoEnergia;
        daño = Math.max(1, daño - this.enemigoActual.defensa);
        
        this.enemigoActual.vidaActual -= daño;
        this.jugador.dañoTotalHecho = (this.jugador.dañoTotalHecho || 0) + daño;
        if (esCritico) this.jugador.criticos = (this.jugador.criticos || 0) + 1;
        
        // Actualizar combo
        this.comboActual++;
        if (this.comboActual > 1) {
            this.agregarMensaje(`${mensaje} ${daño} daño! 🔥 COMBO x${this.comboActual}`);
        } else {
            this.agregarMensaje(`${mensaje} ${daño} daño a ${this.enemigoActual.nombre}`);
        }
        
        if (this.esBossActual() && this.spriteBossActual !== 'derrotado') {
            this.spriteBossActual = 'atacando';
            setTimeout(() => { 
                if (this.spriteBossActual !== 'derrotado') this.spriteBossActual = 'normal'; 
                this.actualizarUI(); 
            }, 500);
        }
        
        if (this.enemigoActual.vidaActual <= 0) {
            this.enemigoDerrotado();
            return;
        }
        
        setTimeout(() => this.turnoEnemigo(), 1000);
        this.actualizarUI();
    }

    usarHabilidad(habilidadId) {
        if (!this.enCombate) return;
        
        const habilidades = this.obtenerHabilidades();
        const hab = habilidades[habilidadId];
        
        if (!hab) return;
        
        if (this.jugador.energia < hab.costoEnergia) {
            this.agregarMensaje(`❌ Necesitas ${hab.costoEnergia} EN para ${hab.nombre}`);
            this.actualizarUI();
            return;
        }
        
        this.jugador.energia -= hab.costoEnergia;
        
        const resultado = hab.ejecutar(this.jugador, this.enemigoActual);
        this.agregarMensaje(resultado.mensaje);
        
        if (resultado.daño > 0) {
            this.jugador.dañoTotalHecho = (this.jugador.dañoTotalHecho || 0) + resultado.daño;
            this.comboActual++;
        }
        
        if (this.enemigoActual.vidaActual <= 0) {
            this.enemigoDerrotado();
            return;
        }
        
        if (this.efectosEnemigo.aturdido > 0) {
            this.agregarMensaje(`😵 Enemigo aturdido, pierde su turno!`);
            this.efectosEnemigo.aturdido--;
            this.actualizarUI();
        } else {
            setTimeout(() => this.turnoEnemigo(), 1000);
        }
        
        this.actualizarUI();
    }

    turnoEnemigo() {
        if (!this.enCombate) return;
        
        if (this.enemigoActual.vidaActual <= 0) {
            this.enemigoDerrotado();
            return;
        }
        
        // Recuperar energía
        const energiaAnterior = this.jugador.energia;
        this.jugador.energia = Math.min(this.jugador.energia + 6, this.jugador.energiaMaxima);
        if (this.jugador.energia > energiaAnterior) {
            this.agregarMensaje(`⚡ Energía +${this.jugador.energia - energiaAnterior} (${this.jugador.energia}/${this.jugador.energiaMaxima})`);
        }
        
        // Aplicar efectos de estado del jugador
        if (this.efectosJugador.furia > 0) {
            this.efectosJugador.furia--;
            if (this.efectosJugador.furia === 0) this.agregarMensaje(`🔥 Furia terminó.`);
        }
        if (this.efectosJugador.regeneracion > 0) {
            const regen = 8;
            this.jugador.vida = Math.min(this.jugador.vida + regen, this.jugador.vidaMaxima);
            this.efectosJugador.regeneracion--;
            this.agregarMensaje(`💚 Regeneración: +${regen} HP`);
        }
        
        // Aplicar veneno al enemigo
        if (this.efectosEnemigo.veneno > 0) {
            const dañoV = this.efectosEnemigo.dañoVeneno || 5;
            this.enemigoActual.vidaActual -= dañoV;
            this.efectosEnemigo.veneno--;
            this.agregarMensaje(`☠️ Veneno: ${this.enemigoActual.nombre} pierde ${dañoV} HP (${this.efectosEnemigo.veneno} turnos restantes)`);
            if (this.enemigoActual.vidaActual <= 0) {
                this.enemigoDerrotado();
                return;
            }
        }
        
        // Habilidad especial del boss
        if (this.esBossActual() && this.enemigoActual.habilidadEspecial) {
            const hab = this.enemigoActual.habilidadEspecial;
            if (Math.random() * 100 < hab.chance) {
                let dañoBoss = hab.daño + Math.floor(Math.random() * 10);
                if (this.efectosJugador.escudo > 0) {
                    this.efectosJugador.escudo--;
                    this.agregarMensaje(`🛡️ ¡BLOQUEADO! ${hab.nombre} del boss fue bloqueado por tu escudo!`);
                } else {
                    this.jugador.vida -= dañoBoss;
                    this.comboActual = 0;
                    this.agregarMensaje(`💀 ¡${hab.nombre}! ${dañoBoss} daño masivo! Combo roto.`);
                }
                this.actualizarUI();
                if (this.jugador.vida <= 0) {
                    this.jugador.vida = 0;
                    setTimeout(() => this.muerteJugador(), 1500);
                    return;
                }
                setTimeout(() => this.actualizarUI(), 800);
                return;
            }
        }
        
        // Ataque normal enemigo
        let dañoEnemigo = this.enemigoActual.fuerza + Math.floor(Math.random() * 5);
        
        if (this.efectosJugador.escudo > 0) {
            this.efectosJugador.escudo--;
            this.agregarMensaje(`🛡️ ¡Ataque bloqueado por el escudo! (${this.efectosJugador.escudo} usos restantes)`);
        } else {
            // Debilitado reduce daño enemigo
            if (this.efectosEnemigo.debilitado > 0) {
                dañoEnemigo = Math.floor(dañoEnemigo * 0.6);
                this.efectosEnemigo.debilitado--;
            }
            dañoEnemigo = Math.max(1, dañoEnemigo - 2);
            this.jugador.vida -= dañoEnemigo;
            this.comboActual = 0; // romper combo al recibir daño
            this.agregarMensaje(`💢 ${this.enemigoActual.nombre} te ataca! ${dañoEnemigo} daño`);
        }
        
        if (this.esBossActual() && this.spriteBossActual !== 'derrotado') {
            this.spriteBossActual = 'atacando';
            setTimeout(() => { 
                if (this.spriteBossActual !== 'derrotado') this.spriteBossActual = 'normal'; 
                this.actualizarUI(); 
            }, 500);
        }
        
        if (this.jugador.vida <= 0) {
            this.jugador.vida = 0;
            
            // Intentar revivir auto
            if (this.jugador.inventario.revivirAuto > 0) {
                this.jugador.inventario.revivirAuto--;
                this.jugador.vida = Math.floor(this.jugador.vidaMaxima * 0.3);
                this.agregarMensaje(`✨ ¡Revivir Auto activado! Renaces con ${this.jugador.vida} HP!`);
                this.actualizarUI();
                return;
            }
            
            this.agregarMensaje("💀 Has muerto...");
            this.actualizarUI();
            setTimeout(() => this.muerteJugador(), 2000);
            return;
        }
        
        this.actualizarUI();
    }

    // ====================
    // ENTRAR AL PISO
    // ====================

    entrarAlPiso(pisoNumero) {
        if (!this.pisos[pisoNumero].desbloqueado) {
            this.mostrarNotificacion("❌ Este piso no está desbloqueado");
            return false;
        }

        this.pisoActual = pisoNumero;
        this.indiceEnemigoActual = 0;
        this.enCombate = true;
        this.pocionUsadaEsteCombate = false;
        this.spriteBossActual = 'normal';
        this.comboActual = 0;
        this.efectosJugador = { veneno: 0, escudo: 0, furia: 0, regeneracion: 0 };
        this.efectosEnemigo = { veneno: 0, aturdido: 0, debilitado: 0 };
        
        this.jugador.vida = this.jugador.vidaMaxima;
        this.jugador.energia = this.jugador.energiaMaxima;
        
        this.enemigoActual = JSON.parse(JSON.stringify(this.pisos[pisoNumero].enemigos[0]));
        this.enemigoActual.vidaActual = this.enemigoActual.vida;
        
        this.mensajesCombate = [];
        this.agregarMensaje(`⚔️ Entraste al ${this.pisos[pisoNumero].nombre}`);
        this.agregarMensaje(`🐉 Enemigo: ${this.enemigoActual.nombre}`);
        
        this.guardarTodo();
        this.actualizarUI();
    }

    // ====================
    // ENEMIGO DERROTADO
    // ====================

    enemigoDerrotado() {
        const esBoss = this.esBossActual();
        
        this.jugador.piedras += this.enemigoActual.piedras;
        this.jugador.exp += this.enemigoActual.exp;
        this.jugador.enemigosDerrotados++;
        
        this.agregarMensaje(`🎉 ${this.enemigoActual.nombre} derrotado!`);
        this.agregarMensaje(`💎 +${this.enemigoActual.piedras} piedras | ⭐ +${this.enemigoActual.exp} EXP`);
        
        // Sistema de drops
        if (!esBoss && this.enemigoActual.drops && this.enemigoActual.drops.length > 0) {
            const chanceDrop = 35 + this.jugador.stats.carisma;
            if (Math.random() * 100 < chanceDrop) {
                const drop = this.enemigoActual.drops[Math.floor(Math.random() * this.enemigoActual.drops.length)];
                this.jugador.inventario[drop]++;
                const nombres = {
                    pocionVidaPequena: "💊 Poción Pequeña",
                    pocionVidaGrande: "❤️ Poción Grande",
                    pocionEnergia: "⚡ Poción Energía",
                    granada: "💣 Granada",
                    escudoTemporal: "🛡️ Escudo Temporal",
                    elixirFuria: "🔥 Elixir de Furia"
                };
                this.agregarMensaje(`🎁 ¡DROP! Obtuviste: ${nombres[drop] || drop}`);
            }
        }
        
        if (esBoss) {
            this.spriteBossActual = 'derrotado';
            this.bossDerrotado = this.enemigoActual;
            this.jugador.bossesDerrotados++;
            this.pisos[this.pisoActual].completado = true;
            
            if (this.pisos[this.pisoActual + 1]) {
                this.pisos[this.pisoActual + 1].desbloqueado = true;
            }
            
            this.agregarMensaje("⏳ Mostrando recompensas en 5 segundos...");
            this.actualizarUI();
            
            setTimeout(() => this.mostrarRecompensasBoss(), 5000);
            
        } else {
            this.indiceEnemigoActual++;
            this.efectosEnemigo = { veneno: 0, aturdido: 0, debilitado: 0 };
            
            if (this.indiceEnemigoActual < this.pisos[this.pisoActual].enemigos.length) {
                this.enemigoActual = JSON.parse(JSON.stringify(this.pisos[this.pisoActual].enemigos[this.indiceEnemigoActual]));
                this.enemigoActual.vidaActual = this.enemigoActual.vida;
                this.agregarMensaje(`➡️ Siguiente: ${this.enemigoActual.nombre}`);
                setTimeout(() => this.actualizarUI(), 1500);
            } else {
                this.enemigoActual = JSON.parse(JSON.stringify(this.pisos[this.pisoActual].boss));
                this.enemigoActual.vidaActual = this.enemigoActual.vida;
                this.spriteBossActual = 'normal';
                this.agregarMensaje(`🔥 ¡¡BOSS APARECE!! ${this.enemigoActual.nombre}`);
                setTimeout(() => this.actualizarUI(), 1500);
            }
        }
        
        this.verificarSubidaNivel();
        this.guardarTodo();
        this.actualizarUI();
    }

    muerteJugador() {
        this.enCombate = false;
        this.bossDerrotado = null;
        this.jugador.vida = this.jugador.vidaMaxima;
        this.jugador.energia = this.jugador.energiaMaxima;
        this.comboActual = 0;
        this.guardarTodo();
        this.mostrarNotificacion("💀 Has muerto... Volviendo al menú");
        setTimeout(() => this.actualizarUI(), 1000);
    }

    // ====================
    // CONSUMIBLES
    // ====================

    usarConsumible(tipo) {
        if (!this.enCombate) return;
        
        switch(tipo) {
            case 'pocionVidaPequena':
                if (this.jugador.inventario.pocionVidaPequena > 0) {
                    this.jugador.vida = Math.min(this.jugador.vida + 30, this.jugador.vidaMaxima);
                    this.jugador.inventario.pocionVidaPequena--;
                    this.agregarMensaje("💊 Poción pequeña: +30 HP");
                    this.guardarTodo(); this.actualizarUI();
                    setTimeout(() => this.turnoEnemigo(), 1000);
                }
                break;
            case 'pocionVidaGrande':
                if (this.jugador.inventario.pocionVidaGrande > 0) {
                    this.jugador.vida = Math.min(this.jugador.vida + 60, this.jugador.vidaMaxima);
                    this.jugador.inventario.pocionVidaGrande--;
                    this.agregarMensaje("❤️ Poción grande: +60 HP");
                    this.guardarTodo(); this.actualizarUI();
                    setTimeout(() => this.turnoEnemigo(), 1000);
                }
                break;
            case 'pocionEnergia':
                if (this.jugador.inventario.pocionEnergia > 0) {
                    this.jugador.energia = Math.min(this.jugador.energia + 25, this.jugador.energiaMaxima);
                    this.jugador.inventario.pocionEnergia--;
                    this.agregarMensaje("⚡ Poción energía: +25 EN");
                    this.guardarTodo(); this.actualizarUI();
                }
                break;
            case 'granada':
                if (this.jugador.inventario.granada > 0) {
                    const dañoGranada = 35 + Math.floor(Math.random() * 20);
                    this.enemigoActual.vidaActual -= dañoGranada;
                    this.jugador.inventario.granada--;
                    this.agregarMensaje(`💣 ¡GRANADA! ${dañoGranada} daño explosivo!`);
                    this.guardarTodo(); this.actualizarUI();
                    if (this.enemigoActual.vidaActual <= 0) { this.enemigoDerrotado(); return; }
                    setTimeout(() => this.turnoEnemigo(), 1000);
                }
                break;
            case 'escudoTemporal':
                if (this.jugador.inventario.escudoTemporal > 0) {
                    this.efectosJugador.escudo = 3;
                    this.jugador.inventario.escudoTemporal--;
                    this.agregarMensaje("🛡️ ¡Escudo Temporal! Próximos 3 ataques bloqueados.");
                    this.guardarTodo(); this.actualizarUI();
                }
                break;
            case 'elixirFuria':
                if (this.jugador.inventario.elixirFuria > 0) {
                    this.efectosJugador.furia = 4;
                    this.jugador.inventario.elixirFuria--;
                    this.agregarMensaje("🔥 ¡Elixir de Furia! +50% daño por 4 turnos.");
                    this.guardarTodo(); this.actualizarUI();
                }
                break;
        }
    }

    // Mantener compatibilidad con nombre viejo
    usarPocion(tipo) {
        this.usarConsumible(tipo);
    }

    huir() {
        if (!this.enCombate) return;
        
        const probabilidad = 50 + this.jugador.stats.velocidad * 2;
        const exito = Math.random() * 100 < probabilidad;
        
        if (exito) {
            this.agregarMensaje("🏃‍♂️ Lograste huir!");
            this.enCombate = false;
            this.comboActual = 0;
            this.guardarTodo();
            setTimeout(() => this.actualizarUI(), 1500);
        } else {
            this.agregarMensaje("❌ No pudiste huir!");
            setTimeout(() => this.turnoEnemigo(), 1000);
        }
        
        this.actualizarUI();
    }

    rendirse() {
        if (!this.enCombate) return;
        
        if (confirm("¿Seguro que quieres rendirte?")) {
            this.agregarMensaje("🏳️ Te has rendido...");
            this.enCombate = false;
            this.comboActual = 0;
            this.guardarTodo();
            setTimeout(() => this.actualizarUI(), 1500);
            this.actualizarUI();
        }
    }

    // ====================
    // RECOMPENSAS DE BOSS
    // ====================

    mostrarRecompensasBoss() {
        if (!this.bossDerrotado) return;
        
        this.noviaEnRecompensas = null;
        this.actualizarNoviaActual();
        
        let noviaId = null;
        let noviaNombre = "NINGUNA";
        let noviaImagen = "https://via.placeholder.com/100x100/FF1493/FFFFFF?text=NOVIA";
        let noviaColor = "#FF1493";
        
        if (this.noviaActual) {
            this.noviaEnRecompensas = {
                id: this.noviaActual.id,
                nombre: this.noviaActual.nombreCorto,
                imagen: this.noviaActual.imagen,
                color: this.noviaActual.color || '#FF1493'
            };
            noviaId = this.noviaActual.id;
            noviaNombre = this.noviaActual.nombreCorto;
            noviaImagen = this.noviaActual.imagen;
            noviaColor = this.noviaActual.color || '#FF1493';
        }
        
        const bossNombre = this.bossDerrotado.nombre;
        
        const html = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); display: flex; justify-content: center; align-items: center; z-index: 10000;">
                <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border: 3px solid gold; border-radius: 30px; padding: 30px; max-width: 900px; width: 90%; max-height: 90vh; overflow-y: auto;">
                    <h1 style="text-align: center; color: gold; margin-bottom: 20px;">🎉 VICTORIA CONTRA EL BOSS!</h1>
                    <p style="text-align: center; color: white; margin-bottom: 30px;">${bossNombre} ha sido derrotado</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                        <div style="background: rgba(255, 20, 147, 0.2); border: 2px solid ${noviaColor}; border-radius: 20px; padding: 20px; text-align: center;">
                            <h2 style="color: ${noviaColor}; margin-bottom: 15px;">💖 REINO DE ${noviaNombre.toUpperCase()}</h2>
                            <img src="${noviaImagen}" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid ${noviaColor}; margin-bottom: 15px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/100x100/FF1493/FFFFFF?text=NOVIA'">
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <button class="card-button" onclick="fantasiaRPG.verVideoRecompensaNoviaGuardada('mamada')" style="background: linear-gradient(135deg, ${noviaColor}, #FF6B6B); padding: 12px;">😮 Mamada de ${noviaNombre}</button>
                                <button class="card-button" onclick="fantasiaRPG.verVideoRecompensaNoviaGuardada('doggy')" style="background: linear-gradient(135deg, ${noviaColor}, #FF6B6B); padding: 12px;">🐕 Doggy con ${noviaNombre}</button>
                                <button class="card-button" onclick="fantasiaRPG.verVideoRecompensaNoviaGuardada('montar')" style="background: linear-gradient(135deg, ${noviaColor}, #FF6B6B); padding: 12px;">👆 ${noviaNombre} te monta</button>
                            </div>
                        </div>
                        <div style="background: rgba(255, 215, 0, 0.2); border: 2px solid gold; border-radius: 20px; padding: 20px; text-align: center;">
                            <h2 style="color: gold; margin-bottom: 15px;">🔥 REINO DE ${bossNombre.toUpperCase()}</h2>
                            <img src="${this.bossDerrotado.imagen || 'https://via.placeholder.com/100x100/gold/000000?text=BOSS'}" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid gold; margin-bottom: 15px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/100x100/gold/000000?text=BOSS'">
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <button class="card-button" onclick="fantasiaRPG.verVideoRecompensaBoss('mamada')" style="background: linear-gradient(135deg, gold, #FF9800); padding: 12px;">😮 Mamada de ${bossNombre}</button>
                                <button class="card-button" onclick="fantasiaRPG.verVideoRecompensaBoss('doggy')" style="background: linear-gradient(135deg, gold, #FF9800); padding: 12px;">🐕 Doggy con ${bossNombre}</button>
                                <button class="card-button" onclick="fantasiaRPG.verVideoRecompensaBoss('montar')" style="background: linear-gradient(135deg, gold, #FF9800); padding: 12px;">👆 Montar a ${bossNombre}</button>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <button class="card-button" onclick="fantasiaRPG.cerrarRecompensas()" style="background: linear-gradient(135deg, #4CAF50, #2E7D32); padding: 15px 40px; font-size: 1.1rem;">↩️ VOLVER AL MENÚ</button>
                    </div>
                </div>
            </div>
        `;
        
        const overlay = document.createElement('div');
        overlay.id = 'recompensas-overlay';
        overlay.innerHTML = html;
        document.body.appendChild(overlay);
    }

    verVideoRecompensaNoviaGuardada(accion) {
        if (!this.noviaEnRecompensas) { alert("❌ No hay novia guardada"); return; }
        const noviaId = this.noviaEnRecompensas.id;
        if (!this.videosNovias[noviaId]) { alert(`❌ No hay videos para esta novia`); return; }
        const videoId = this.videosNovias[noviaId][accion];
        if (!videoId) { alert(`❌ Video no disponible`); return; }
        const titulo = `${this.noviaEnRecompensas.nombre} - ${accion}`;
        const imagen = this.noviaEnRecompensas.imagen;
        const overlay = document.getElementById('recompensas-overlay');
        if (overlay) overlay.remove();
        this.mostrarVideo(videoId, titulo, imagen, 'novia');
    }

    verVideoRecompensaBoss(accion) {
        if (!this.bossDerrotado) return;
        const videoId = this.bossDerrotado.videos[accion];
        if (!videoId || videoId.startsWith("ID_VIDEO")) { alert("❌ Video no disponible"); return; }
        const titulo = `${this.bossDerrotado.nombre} - ${accion}`;
        const imagen = this.bossDerrotado.imagen;
        const overlay = document.getElementById('recompensas-overlay');
        if (overlay) overlay.remove();
        this.mostrarVideo(videoId, titulo, imagen, 'boss');
    }

    cerrarRecompensas() {
        const overlay = document.getElementById('recompensas-overlay');
        if (overlay) overlay.remove();
        this.bossDerrotado = null;
        this.noviaEnRecompensas = null;
        this.spriteBossActual = 'normal';
        this.actualizarUI();
    }

    mostrarVideo(videoId, titulo, imagen, tipo) {
        const color = tipo === 'novia' ? '#FF1493' : 'gold';
        const html = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.98); z-index: 10001; display: flex; justify-content: center; align-items: center;">
                <div style="max-width: 900px; width: 95%; background: #1a1a2e; border-radius: 30px; padding: 20px; border: 3px solid ${color};">
                    <div style="text-align: center; margin-bottom: 15px;">
                        <img src="${imagen}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid ${color}; margin-bottom: 10px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/80x80/FF1493/FFFFFF?text=IMG'">
                        <h2 style="color: ${color};">🎬 ${titulo}</h2>
                    </div>
                    <div style="margin: 15px 0; border-radius: 15px; overflow: hidden; position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://drive.google.com/file/d/${videoId}/preview" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                    <div style="text-align: center; margin-top: 15px;">
                        <button class="card-button" onclick="fantasiaRPG.cerrarVideo()" style="background: linear-gradient(135deg, ${color}, ${color === 'gold' ? '#FF9800' : '#FF6B6B'}); padding: 12px 30px;">↩️ Cerrar Video</button>
                    </div>
                </div>
            </div>
        `;
        const overlay = document.createElement('div');
        overlay.id = 'video-overlay';
        overlay.innerHTML = html;
        document.body.appendChild(overlay);
    }

    cerrarVideo() {
        const overlay = document.getElementById('video-overlay');
        if (overlay) overlay.remove();
        this.mostrarRecompensasBoss();
    }

    // ====================
    // TIENDA
    // ====================

    comprarStat(stat) {
        const costo = 10;
        if (this.jugador.piedras < costo) { this.mostrarNotificacion("❌ No tienes suficientes piedras"); return; }
        if (this.jugador.stats[stat] >= 100) { this.mostrarNotificacion("❌ Ya llegaste al máximo (100)"); return; }
        this.jugador.piedras -= costo;
        this.jugador.stats[stat]++;
        this.mostrarNotificacion(`✅ ${stat} +1 (ahora ${this.jugador.stats[stat]})`);
        this.guardarTodo();
        this.cargarUITienda();
    }

    comprarConsumible(tipo) {
        const precios = {
            pocionVidaPequena: 3,
            pocionVidaGrande: 8,
            pocionEnergia: 5,
            revivirAuto: 15,
            granada: 12,
            escudoTemporal: 10,
            elixirFuria: 18
        };
        const costo = precios[tipo];
        if (this.jugador.piedras < costo) { this.mostrarNotificacion("❌ No tienes suficientes piedras"); return; }
        this.jugador.piedras -= costo;
        this.jugador.inventario[tipo]++;
        this.mostrarNotificacion(`✅ Compraste 1 item`);
        this.guardarTodo();
        this.cargarUITienda();
    }

    // ====================
    // UTILIDADES
    // ====================

    esBossActual() {
        return this.indiceEnemigoActual >= this.pisos[this.pisoActual].enemigos.length;
    }

    agregarMensaje(mensaje) {
        this.mensajesCombate.push(mensaje);
        if (this.mensajesCombate.length > 8) this.mensajesCombate.shift();
    }

    verificarSubidaNivel() {
        while (this.jugador.exp >= this.jugador.expMaxima) {
            this.jugador.nivel++;
            this.jugador.exp -= this.jugador.expMaxima;
            this.jugador.expMaxima = Math.floor(this.jugador.expMaxima * 1.5);
            
            this.jugador.stats.fuerza += 1;
            this.jugador.stats.resistencia += 1;
            this.jugador.stats.velocidad += 1;
            this.jugador.stats.inteligencia += 1;
            this.jugador.stats.carisma += 1;
            
            this.jugador.vidaMaxima += 10;
            this.jugador.vida = this.jugador.vidaMaxima;
            this.jugador.energiaMaxima += 5;
            this.jugador.energia = this.jugador.energiaMaxima;
            
            this.agregarMensaje(`🎉 ¡SUBISTE AL NIVEL ${this.jugador.nivel}!`);
            this.mostrarNotificacion(`🎉 ¡Nivel ${this.jugador.nivel}!`);
        }
    }

    calcularBonusParaHermana(hermanaId) {
        if (!this.jugador || !this.jugador.stats) return 0;
        const stats = this.jugador.stats;
        // Base 5% + 0.5% por cada punto de stat (stat base=5 da 7.5%, stat 10 da 10%, max 20%)
        switch(hermanaId) {
            case 'ichika': return Math.min(5 + stats.fuerza * 0.5, 20);
            case 'nino': return Math.min(5 + stats.resistencia * 0.5, 20);
            case 'yotsuba': return Math.min(5 + stats.velocidad * 0.5, 20);
            case 'miku': return Math.min(5 + stats.inteligencia * 0.5, 20);
            case 'itsuki': return Math.min(5 + stats.carisma * 0.5, 20);
            default: return 0;
        }
    }

    // ====================
    // INTERFAZ DE USUARIO
    // ====================

    cargarUI() {
        // Si no hay jugador, mostrar selección de clase
        if (!this.jugador) {
            return this.cargarUISeleccionClase();
        }
        return this.cargarUIMenuPrincipal();
    }

    cargarUISeleccionClase() {
        const clases = this.obtenerClases();
        
        const clasesHTML = Object.entries(clases).map(([id, clase]) => `
            <div style="background: rgba(0,0,0,0.3); border: 2px solid ${clase.color}; border-radius: 20px; padding: 25px; text-align: center; cursor: pointer; transition: transform 0.2s;"
                 onclick="fantasiaRPG.elegirClase('${id}')"
                 onmouseover="this.style.transform='scale(1.05)'" 
                 onmouseout="this.style.transform='scale(1)'">
                <div style="font-size: 3rem; margin-bottom: 10px;">${clase.emoji}</div>
                <h3 style="color: ${clase.color}; margin-bottom: 10px;">${clase.nombre}</h3>
                <p style="opacity: 0.8; font-size: 0.9rem; margin-bottom: 15px;">${clase.descripcion}</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 0.85rem; text-align: left;">
                    <span>💪 Fuerza: ${clase.stats.fuerza}</span>
                    <span>🔋 Resistencia: ${clase.stats.resistencia}</span>
                    <span>⚡ Velocidad: ${clase.stats.velocidad}</span>
                    <span>🧠 Inteligencia: ${clase.stats.inteligencia}</span>
                </div>
                <div style="margin-top: 15px; font-size: 0.85rem; opacity: 0.7;">
                    ❤️ ${clase.vida} HP | ⚡ ${clase.energia} EN
                </div>
                <div style="margin-top: 10px; font-size: 0.8rem; color: ${clase.color};">
                    Habilidades: ${clase.habilidades.length} especiales
                </div>
            </div>
        `).join('');
        
        return `
            <div style="max-width: 900px; margin: 0 auto; padding: 20px;">
                <h1 style="text-align: center; color: gold; margin-bottom: 10px;">⚔️ RPG FANTASÍA</h1>
                <p style="text-align: center; opacity: 0.8; margin-bottom: 40px;">Elige tu clase para comenzar la aventura</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    ${clasesHTML}
                </div>
            </div>
        `;
    }

    elegirClase(claseId) {
        this.jugador = this.inicializarJugador(claseId);
        this.guardarTodo();
        this.mostrarNotificacion(`✅ Clase elegida: ${this.jugador.claseNombre}`);
        this.actualizarUI();
    }

    cargarUIMenuPrincipal() {
        this.enCombate = false;
        this.actualizarNoviaActual();
        
        const pisosHTML = Object.entries(this.pisos).map(([num, piso]) => {
            const estado = piso.completado ? '✅ COMPLETADO' : (piso.desbloqueado ? '▶️ DISPONIBLE' : '🔒 BLOQUEADO');
            const color = piso.completado ? '#4CAF50' : (piso.desbloqueado ? '#FFD166' : '#666');
            return `
                <div style="background: rgba(0,0,0,0.3); border: 2px solid ${color}; border-radius: 15px; padding: 20px; margin-bottom: 15px; cursor: ${piso.desbloqueado ? 'pointer' : 'not-allowed'}; opacity: ${piso.desbloqueado ? 1 : 0.5};"
                     onclick="${piso.desbloqueado ? `fantasiaRPG.entrarAlPiso(${num})` : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 style="color: ${color}; margin: 0;">${piso.nombre}</h3>
                            <p style="margin: 5px 0 0 0; opacity: 0.8;">Jefe: ${piso.jefe}</p>
                        </div>
                        <div style="font-size: 1.5rem;">${estado}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        const expPorcentaje = (this.jugador.exp / this.jugador.expMaxima) * 100;
        const claseColor = this.jugador.claseColor || '#FF1493';
        
        let noviaHTML = '';
        if (this.noviaActual) {
            noviaHTML = `
                <div style="background: ${this.noviaActual.color}20; border-radius: 20px; padding: 20px; margin-bottom: 30px; border: 3px solid ${this.noviaActual.color}; display: flex; align-items: center; gap: 20px;">
                    <img src="${this.noviaActual.imagen}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid ${this.noviaActual.color}; object-fit: cover;" onerror="this.src='https://via.placeholder.com/80x80/FF1493/FFFFFF?text=NOVIA'">
                    <div style="flex: 1;">
                        <h3 style="color: ${this.noviaActual.color}; margin: 0 0 10px 0;">💖 ${this.noviaActual.nombre.toUpperCase()}</h3>
                        <div style="display: flex; gap: 20px; font-size: 0.9rem;">
                            <div>Nivel: ${this.noviaActual.nivel != null ? this.noviaActual.nivel : '?'}</div>
                            <div>Afinidad: ${this.noviaActual.afinidad != null ? this.noviaActual.afinidad : '?'}/200</div>
                            <div>Bonus: +${this.calcularBonusParaHermana(this.noviaActual.id).toFixed(1)}%</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Efectos de estado activos en el header
        const efectosHTML = (this.efectosJugador.furia > 0 || this.efectosJugador.escudo > 0) ? `
            <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 15px; flex-wrap: wrap;">
                ${this.efectosJugador.furia > 0 ? `<span style="background: rgba(255,152,0,0.3); border: 1px solid #FF9800; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">🔥 Furia ${this.efectosJugador.furia}</span>` : ''}
                ${this.efectosJugador.escudo > 0 ? `<span style="background: rgba(158,158,158,0.3); border: 1px solid #9E9E9E; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">🛡️ Escudo ${this.efectosJugador.escudo}</span>` : ''}
            </div>
        ` : '';
        
        const html = `
            <div style="max-width: 1000px; margin: 0 auto; padding: 20px;">
                <h1 style="text-align: center; color: gold; margin-bottom: 5px;">⚔️ RPG FANTASÍA</h1>
                <p style="text-align: center; color: ${claseColor}; margin-bottom: 20px;">${this.jugador.claseNombre || ''}</p>
                
                ${noviaHTML}
                
                <div style="background: linear-gradient(135deg, ${claseColor}88, #1a1a2e); border-radius: 20px; padding: 25px; margin-bottom: 30px; border: 2px solid ${claseColor};">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px; color: white; text-align: center;">
                        <div><div style="font-size: 0.9rem; opacity: 0.8;">NIVEL</div><div style="font-size: 2rem; font-weight: bold;">${this.jugador.nivel}</div></div>
                        <div><div style="font-size: 0.9rem; opacity: 0.8;">❤️ VIDA</div><div style="font-size: 1.5rem; font-weight: bold;">${this.jugador.vida}/${this.jugador.vidaMaxima}</div></div>
                        <div><div style="font-size: 0.9rem; opacity: 0.8;">⚡ ENERGÍA</div><div style="font-size: 1.5rem; font-weight: bold;">${this.jugador.energia}/${this.jugador.energiaMaxima}</div></div>
                        <div><div style="font-size: 0.9rem; opacity: 0.8;">💎 PIEDRAS</div><div style="font-size: 2rem; font-weight: bold;">${this.jugador.piedras}</div></div>
                    </div>
                    <div style="margin-top: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>EXPERIENCIA</span><span>${this.jugador.exp}/${this.jugador.expMaxima}</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.2); height: 12px; border-radius: 10px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #FFD166, #FF9800); width: ${expPorcentaje}%; height: 100%;"></div>
                        </div>
                    </div>
                    <div style="margin-top: 15px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; font-size: 0.85rem; opacity: 0.9;">
                        <span>💪${this.jugador.stats.fuerza}</span>
                        <span>🔋${this.jugador.stats.resistencia}</span>
                        <span>⚡${this.jugador.stats.velocidad}</span>
                        <span>🧠${this.jugador.stats.inteligencia}</span>
                        <span>😎${this.jugador.stats.carisma}</span>
                        <span>💀${this.jugador.enemigosDerrotados || 0} derrotados</span>
                    </div>
                </div>
                
                ${efectosHTML}
                
                <h2 style="color: #FFD166; margin-bottom: 20px;">🏰 SELECCIONA UN PISO</h2>
                ${pisosHTML}
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
                    <button class="card-button" onclick="fantasiaRPG.cargarUITienda()" style="background: linear-gradient(135deg, #5864F5, #8A5AF7); padding: 20px;">💎 TIENDA Y STATS</button>
                    <button class="card-button" onclick="volverAlInicio()" style="background: linear-gradient(135deg, #FF6B6B, #FF1493); padding: 20px;">↩️ VOLVER</button>
                </div>
                
                <div style="text-align: center;">
                    <button class="card-button" onclick="fantasiaRPG.resetearTodo()" style="background: linear-gradient(135deg, #666, #333); padding: 10px;">🔄 Resetear progreso</button>
                </div>
            </div>
        `;
        
        const mangaSection = document.getElementById('manga-section');
        if (mangaSection) mangaSection.innerHTML = html;
        return html;
    }

    cargarUICombate() {
        if (!this.enCombate || !this.enemigoActual) return this.cargarUIMenuPrincipal();
        
        const esBoss = this.esBossActual();
        let imagenEnemigo = this.enemigoActual.imagen;
        if (esBoss) {
            if (this.spriteBossActual === 'atacando' && this.enemigoActual.imagenAtacando) imagenEnemigo = this.enemigoActual.imagenAtacando;
            else if (this.spriteBossActual === 'derrotado' && this.enemigoActual.imagenDerrotado) imagenEnemigo = this.enemigoActual.imagenDerrotado;
        }
        
        const pvj = (this.jugador.vida / this.jugador.vidaMaxima) * 100;
        const pve = (this.enemigoActual.vidaActual / this.enemigoActual.vida) * 100;
        const pen = (this.jugador.energia / this.jugador.energiaMaxima) * 100;
        const claseColor = this.jugador.claseColor || '#FF1493';
        
        // Efectos activos
        const efectosActivosHTML = `
            <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 10px; min-height: 30px;">
                ${this.efectosJugador.furia > 0 ? `<span style="background: rgba(255,152,0,0.4); border: 1px solid #FF9800; padding: 3px 10px; border-radius: 15px; font-size: 0.8rem;">🔥Furia ${this.efectosJugador.furia}</span>` : ''}
                ${this.efectosJugador.escudo > 0 ? `<span style="background: rgba(158,158,158,0.4); border: 1px solid #9E9E9E; padding: 3px 10px; border-radius: 15px; font-size: 0.8rem;">🛡️Escudo ${this.efectosJugador.escudo}</span>` : ''}
                ${this.efectosJugador.regeneracion > 0 ? `<span style="background: rgba(76,175,80,0.4); border: 1px solid #4CAF50; padding: 3px 10px; border-radius: 15px; font-size: 0.8rem;">💚Regen ${this.efectosJugador.regeneracion}</span>` : ''}
                ${this.efectosEnemigo.veneno > 0 ? `<span style="background: rgba(76,175,80,0.3); border: 1px solid #4CAF50; padding: 3px 10px; border-radius: 15px; font-size: 0.8rem;">☠️Veneno ${this.efectosEnemigo.veneno}</span>` : ''}
                ${this.efectosEnemigo.aturdido > 0 ? `<span style="background: rgba(255,235,59,0.3); border: 1px solid #FFEB3B; padding: 3px 10px; border-radius: 15px; font-size: 0.8rem;">😵Aturdido ${this.efectosEnemigo.aturdido}</span>` : ''}
                ${this.comboActual > 1 ? `<span style="background: rgba(255,215,0,0.4); border: 1px solid gold; padding: 3px 10px; border-radius: 15px; font-size: 0.8rem; animation: pulse 0.5s infinite;">🔥COMBO x${this.comboActual}</span>` : ''}
            </div>
        `;
        
        // Habilidades del jugador
        const habilidades = this.obtenerHabilidades();
        const habHTML = (this.jugador.habilidades || []).map(habId => {
            const hab = habilidades[habId];
            if (!hab) return '';
            const puedeUsar = this.jugador.energia >= hab.costoEnergia;
            return `
                <button class="card-button" onclick="fantasiaRPG.usarHabilidad('${habId}')"
                        ${!puedeUsar ? 'disabled' : ''}
                        style="background: linear-gradient(135deg, ${hab.color}, #333); padding: 10px; font-size: 0.85rem; ${!puedeUsar ? 'opacity:0.4;' : ''}">
                    ${hab.nombre}<br><span style="font-size: 0.75rem; opacity: 0.8;">${hab.costoEnergia} EN</span>
                </button>
            `;
        }).join('');
        
        return `
            <div style="max-width: 1000px; margin: 0 auto; padding: 20px;">
                <h2 style="text-align: center; color: ${esBoss ? 'gold' : '#FFD166'}; margin-bottom: 5px;">
                    ${esBoss ? '🔥 BOSS FINAL 🔥' : this.pisos[this.pisoActual].nombre}
                </h2>
                <p style="text-align: center; margin-bottom: 15px; font-size: 0.9rem; opacity: 0.7;">
                    Enemigo ${this.indiceEnemigoActual + 1}/${this.pisos[this.pisoActual].enemigos.length + 1}
                </p>
                
                ${efectosActivosHTML}
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 20px;">
                    <div style="text-align: center;">
                        <div style="background: rgba(88,100,245,0.2); border: 3px solid ${claseColor}; border-radius: 20px; padding: 20px;">
                            <div style="font-size: 3rem; margin-bottom: 8px;">${this.jugador.claseEmoji || '⚔️'}</div>
                            <h3 style="color: ${claseColor}; margin-bottom: 10px;">Héroe (${this.jugador.claseNombre || ''})</h3>
                            <div style="margin-bottom: 8px;">
                                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 3px;"><span style="color:#FF6B6B;">❤️ ${this.jugador.vida}/${this.jugador.vidaMaxima}</span></div>
                                <div style="background: rgba(255,255,255,0.1); height: 12px; border-radius: 10px; overflow: hidden;">
                                    <div style="background: linear-gradient(135deg, #FF6B6B, #FF1493); width: ${pvj}%; height: 100%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 3px;"><span style="color:#FFD700;">⚡ ${this.jugador.energia}/${this.jugador.energiaMaxima}</span></div>
                                <div style="background: rgba(255,255,255,0.1); height: 12px; border-radius: 10px; overflow: hidden;">
                                    <div style="background: linear-gradient(135deg, #FFD700, #FF9800); width: ${pen}%; height: 100%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="background: rgba(255,107,107,0.2); border: 3px solid ${esBoss ? 'gold' : '#FF6B6B'}; border-radius: 20px; padding: 20px;">
                            <img src="${imagenEnemigo}" style="width: 120px; height: 120px; border-radius: 50%; border: 3px solid ${esBoss ? 'gold' : '#FF6B6B'}; margin-bottom: 8px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/120x120/FF6B6B/FFFFFF?text=ENEMIGO'">
                            <h3 style="color: ${esBoss ? 'gold' : '#FF6B6B'}; margin-bottom: 10px;">${this.enemigoActual.nombre}</h3>
                            <div style="background: rgba(255,255,255,0.1); height: 12px; border-radius: 10px; overflow: hidden;">
                                <div style="background: linear-gradient(135deg, ${esBoss ? 'gold' : '#FF6B6B'}, #FF1493); width: ${pve}%; height: 100%; transition: width 0.3s;"></div>
                            </div>
                            <div style="font-size: 0.85rem; margin-top: 5px; opacity: 0.8;">${this.enemigoActual.vidaActual}/${this.enemigoActual.vida} HP</div>
                            ${esBoss && this.enemigoActual.habilidadEspecial ? `<div style="font-size: 0.75rem; color: gold; margin-top: 5px; opacity: 0.7;">⚡ ${this.enemigoActual.habilidadEspecial.nombre} (${this.enemigoActual.habilidadEspecial.chance}%)</div>` : ''}
                            ${esBoss && this.spriteBossActual === 'derrotado' ? '<p style="color: gold; margin-top: 8px; font-weight: bold;">💀 DERROTADO</p>' : ''}
                        </div>
                    </div>
                </div>
                
                <div style="background: rgba(0,0,0,0.5); border-radius: 15px; padding: 15px; margin-bottom: 20px; max-height: 130px; overflow-y: auto;">
                    ${this.mensajesCombate.length > 0 ? 
                        this.mensajesCombate.map(m => `<div style="margin-bottom: 4px; padding: 3px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.9rem;">${m}</div>`).join('') 
                        : '<div style="text-align: center; opacity: 0.5;">El combate comienza...</div>'}
                </div>
                
                ${this.spriteBossActual !== 'derrotado' ? `
                <!-- ATAQUES BÁSICOS -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px;">
                    <button class="card-button" onclick="fantasiaRPG.atacar('basico')" style="background: linear-gradient(135deg, #FF6B6B, #FF1493); padding: 12px; font-size: 0.9rem;">
                        ⚔️ Básico<br><span style="font-size: 0.75rem; opacity: 0.8;">0 EN</span>
                    </button>
                    <button class="card-button" onclick="fantasiaRPG.atacar('fuerte')" style="background: linear-gradient(135deg, #FF9800, #F44336); padding: 12px; font-size: 0.9rem; ${this.jugador.energia < 15 ? 'opacity:0.4;' : ''}" ${this.jugador.energia < 15 ? 'disabled' : ''}>
                        💥 Fuerte<br><span style="font-size: 0.75rem; opacity: 0.8;">15 EN</span>
                    </button>
                    <button class="card-button" onclick="fantasiaRPG.atacar('magico')" style="background: linear-gradient(135deg, #8A5AF7, #5864F5); padding: 12px; font-size: 0.9rem; ${this.jugador.energia < 25 ? 'opacity:0.4;' : ''}" ${this.jugador.energia < 25 ? 'disabled' : ''}>
                        ✨ Mágico<br><span style="font-size: 0.75rem; opacity: 0.8;">25 EN</span>
                    </button>
                </div>
                
                <!-- HABILIDADES DE CLASE -->
                ${habHTML ? `
                <div style="margin-bottom: 12px;">
                    <p style="font-size: 0.8rem; opacity: 0.6; margin-bottom: 8px; text-align: center;">— Habilidades de ${this.jugador.claseNombre} —</p>
                    <div style="display: grid; grid-template-columns: repeat(${(this.jugador.habilidades || []).length}, 1fr); gap: 10px;">
                        ${habHTML}
                    </div>
                </div>
                ` : ''}
                
                <!-- CONSUMIBLES Y ACCIONES -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                    <button class="card-button" onclick="fantasiaRPG.mostrarMenuPociones()" style="background: linear-gradient(135deg, #4CAF50, #2E7D32); padding: 12px; font-size: 0.9rem;">💊 Items</button>
                    <button class="card-button" onclick="fantasiaRPG.huir()" style="background: linear-gradient(135deg, #5864F5, #8A5AF7); padding: 12px; font-size: 0.9rem;">🏃 Huir</button>
                    <button class="card-button" onclick="fantasiaRPG.rendirse()" style="background: linear-gradient(135deg, #666, #333); padding: 12px; font-size: 0.9rem;">🏳️ Rendirse</button>
                </div>
                ` : `
                <div style="text-align: center; padding: 30px; background: rgba(255,215,0,0.1); border-radius: 15px;">
                    <p style="color: gold; font-size: 1.2rem;">⏳ Preparando recompensas...</p>
                </div>
                `}
                
                <!-- INVENTARIO RÁPIDO -->
                <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 12px; margin-top: 12px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; font-size: 0.85rem;">
                    <span>💊${this.jugador.inventario.pocionVidaPequena}</span>
                    <span>❤️${this.jugador.inventario.pocionVidaGrande}</span>
                    <span>⚡${this.jugador.inventario.pocionEnergia}</span>
                    <span>💣${this.jugador.inventario.granada || 0}</span>
                    <span>🛡️${this.jugador.inventario.escudoTemporal || 0}</span>
                    <span>🔥${this.jugador.inventario.elixirFuria || 0}</span>
                    <span>✨${this.jugador.inventario.revivirAuto}</span>
                </div>
            </div>
        `;
    }

    mostrarMenuPociones() {
        if (!this.enCombate) return;
        
        const items = [
            { key: 'pocionVidaPequena', label: '💊 Poción Pequeña (+30 HP)', color: '#4CAF50', cant: this.jugador.inventario.pocionVidaPequena },
            { key: 'pocionVidaGrande', label: '❤️ Poción Grande (+60 HP)', color: '#FF6B6B', cant: this.jugador.inventario.pocionVidaGrande },
            { key: 'pocionEnergia', label: '⚡ Poción Energía (+25 EN)', color: '#FFD700', cant: this.jugador.inventario.pocionEnergia },
            { key: 'granada', label: '💣 Granada (35-55 daño)', color: '#FF9800', cant: this.jugador.inventario.granada || 0 },
            { key: 'escudoTemporal', label: '🛡️ Escudo Temporal (3 turnos)', color: '#9E9E9E', cant: this.jugador.inventario.escudoTemporal || 0 },
            { key: 'elixirFuria', label: '🔥 Elixir de Furia (+50% daño 4t)', color: '#FF5722', cant: this.jugador.inventario.elixirFuria || 0 },
        ];
        
        const itemsHTML = items.map(item => `
            <button class="card-button" onclick="fantasiaRPG.usarConsumible('${item.key}'); fantasiaRPG.cerrarMenuPociones()" 
                    ${item.cant === 0 ? 'disabled' : ''}
                    style="background: linear-gradient(135deg, ${item.color}, #333); padding: 12px; ${item.cant === 0 ? 'opacity:0.4;' : ''}">
                ${item.label} [${item.cant}]
            </button>
        `).join('');
        
        const html = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); display: flex; justify-content: center; align-items: center; z-index: 1000;">
                <div style="background: #1a1a2e; border: 3px solid #4CAF50; border-radius: 30px; padding: 30px; max-width: 500px; width: 90%;">
                    <h2 style="text-align: center; color: #4CAF50; margin-bottom: 25px;">🎒 INVENTARIO</h2>
                    <div style="display: grid; gap: 12px;">${itemsHTML}</div>
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="card-button" onclick="fantasiaRPG.cerrarMenuPociones()" style="background: linear-gradient(135deg, #666, #333); padding: 10px 30px;">↩️ CANCELAR</button>
                    </div>
                </div>
            </div>
        `;
        
        const overlay = document.createElement('div');
        overlay.id = 'pociones-overlay';
        overlay.innerHTML = html;
        document.body.appendChild(overlay);
    }

    cerrarMenuPociones() {
        const overlay = document.getElementById('pociones-overlay');
        if (overlay) overlay.remove();
    }

    cargarUITienda() {
        const stats = this.jugador.stats;
        const claseColor = this.jugador.claseColor || '#FF1493';
        
        const statsHTML = Object.entries({
            fuerza:       { icono: '💪', nombre: 'Fuerza',                  hermana: 'Ichika',  hermanaId: 'ichika',  color: '#FF6B6B' },
            resistencia:  { icono: '🔋', nombre: 'Resistencia',             hermana: 'Nino',    hermanaId: 'nino',    color: '#FFD166' },
            velocidad:    { icono: '⚡', nombre: 'Velocidad',               hermana: 'Yotsuba', hermanaId: 'yotsuba', color: '#4CAF50' },
            inteligencia: { icono: '🧠', nombre: 'Inteligencia',            hermana: 'Miku',    hermanaId: 'miku',    color: '#5864F5' },
            carisma:      { icono: '😎', nombre: 'Carisma (mejora drops)', hermana: 'Itsuki',  hermanaId: 'itsuki',  color: 'gold'    }
        }).map(([key, data]) => {
            const bonusActual  = this.calcularBonusParaHermana(data.hermanaId).toFixed(1);
            // Simular el bonus con +1 en ese stat
            const statsFuturo = { ...this.jugador.stats, [key]: this.jugador.stats[key] + 1 };
            const jugadorTemp = { stats: statsFuturo };
            const bonusFuturo = (() => {
                switch(data.hermanaId) {
                    case 'ichika':  return Math.min(5 + statsFuturo.fuerza * 0.5, 20);
                    case 'nino':    return Math.min(5 + statsFuturo.resistencia * 0.5, 20);
                    case 'yotsuba': return Math.min(5 + statsFuturo.velocidad * 0.5, 20);
                    case 'miku':    return Math.min(5 + statsFuturo.inteligencia * 0.5, 20);
                    case 'itsuki':  return Math.min(5 + statsFuturo.carisma * 0.5, 20);
                    default: return 0;
                }
            })().toFixed(1);
            const mejora = (bonusFuturo - bonusActual).toFixed(1);
            return `
            <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-bottom: 12px; border-left: 4px solid ${data.color};">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <span>${data.icono}</span> <strong style="color: ${data.color};">${data.nombre}</strong>
                        <div style="font-size: 0.8rem; opacity: 0.7;">
                            Bonus ${data.hermana}: <span style="color:${data.color};">${bonusActual}%</span>
                            → <span style="color:#4CAF50;">+${mejora}% por nivel</span>
                        </div>
                    </div>
                    <div style="font-size: 1.8rem; font-weight: bold;">${stats[key]}</div>
                    <button class="card-button" onclick="fantasiaRPG.comprarStat('${key}')" style="background: linear-gradient(135deg, ${data.color}, #333); padding: 8px 16px;">+1 (10💎)</button>
                </div>
            </div>
        `}).join('');
        
        const consumibles = [
            { key: 'pocionVidaPequena', label: '💊 Poción Pequeña', desc: '+30 HP', precio: 3, color: '#4CAF50' },
            { key: 'pocionVidaGrande', label: '❤️ Poción Grande', desc: '+60 HP', precio: 8, color: '#FF6B6B' },
            { key: 'pocionEnergia', label: '⚡ Poción Energía', desc: '+25 EN', precio: 5, color: '#FFD700' },
            { key: 'revivirAuto', label: '✨ Revivir Auto', desc: '1 uso automático', precio: 15, color: '#8A5AF7' },
            { key: 'granada', label: '💣 Granada', desc: '35-55 daño directo', precio: 12, color: '#FF9800' },
            { key: 'escudoTemporal', label: '🛡️ Escudo Temporal', desc: 'Bloquea 3 ataques', precio: 10, color: '#9E9E9E' },
            { key: 'elixirFuria', label: '🔥 Elixir de Furia', desc: '+50% daño x4 turnos', precio: 18, color: '#FF5722' },
        ];
        
        const consumiblesHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
                ${consumibles.map(c => `
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; text-align: center; border: 1px solid ${c.color}44;">
                        <h4 style="color: ${c.color}; margin-bottom: 5px;">${c.label}</h4>
                        <p style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 10px;">${c.desc}</p>
                        <button class="card-button" onclick="fantasiaRPG.comprarConsumible('${c.key}')" style="background: linear-gradient(135deg, ${c.color}, #333); width: 100%; padding: 8px;">
                            ${c.precio}💎 (${this.jugador.inventario[c.key] || 0})
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
        
        const html = `
            <div style="max-width: 1000px; margin: 0 auto; padding: 20px;">
                <h1 style="text-align: center; color: gold; margin-bottom: 5px;">💎 TIENDA</h1>
                <p style="text-align: center; margin-bottom: 30px;">Piedras: ${this.jugador.piedras} 💎</p>
                
                <div style="background: linear-gradient(135deg, ${claseColor}44, #1a1a2e); border-radius: 20px; padding: 25px; margin-bottom: 25px; border: 1px solid ${claseColor};">
                    <h3 style="color: white; margin-bottom: 20px;">📊 MEJORA STATS (10💎 = +1)</h3>
                    ${statsHTML}
                </div>
                
                <div style="background: linear-gradient(135deg, #4CAF5044, #1a1a2e); border-radius: 20px; padding: 25px; margin-bottom: 25px; border: 1px solid #4CAF5066;">
                    <h3 style="color: white; margin-bottom: 20px;">🎒 CONSUMIBLES</h3>
                    ${consumiblesHTML}
                </div>
                
                <div style="text-align: center;">
                    <button class="card-button" onclick="fantasiaRPG.cargarUIMenuPrincipal()" style="background: linear-gradient(135deg, #5864F5, #8A5AF7); padding: 15px 40px;">↩️ VOLVER AL MENÚ</button>
                </div>
            </div>
        `;
        
        const mangaSection = document.getElementById('manga-section');
        if (mangaSection) mangaSection.innerHTML = html;
    }

    actualizarUI() {
        const mangaSection = document.getElementById('manga-section');
        if (!mangaSection) return;
        
        if (!this.jugador) {
            mangaSection.innerHTML = this.cargarUISeleccionClase();
        } else if (this.enCombate) {
            mangaSection.innerHTML = this.cargarUICombate();
        } else {
            this.cargarUIMenuPrincipal();
        }
    }

    resetearTodo() {
        if (confirm("¿Seguro? Perderás todo tu progreso en Fantasía")) {
            this.limpiarLocalStorage();
            this.jugador = null;
            this.pisos = this.inicializarPisos();
            this.pisoActual = 1;
            this.enCombate = false;
            this.comboActual = 0;
            this.noviaActual = null;
            this.noviaEnRecompensas = null;
            this.guardarTodo();
            this.actualizarUI();
            this.mostrarNotificacion("✅ Progreso reseteado");
        }
    }

    mostrarNotificacion(mensaje) {
        const notif = document.createElement('div');
        notif.textContent = mensaje;
        notif.style.cssText = `
            position: fixed; top: 100px; right: 20px;
            background: linear-gradient(135deg, gold, #FF1493);
            color: white; padding: 15px 25px; border-radius: 50px;
            font-weight: bold; z-index: 10000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2s forwards;
            border: 2px solid white; box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        `;
        document.body.appendChild(notif);
        setTimeout(() => { if (notif.parentNode) notif.remove(); }, 2500);
    }

    // ====================
    // SUPABASE SYNC
    // ====================

    async sincronizarDesdeSupabase() {
        const USER_ID = 'user_qdhg1lunm_1772995224949';
        const URL = 'https://lcspqpdjvdcbzhmcrhqi.supabase.co';
        const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjc3BxcGRqdmRjYnpobWNyaHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5OTE1NjcsImV4cCI6MjA4ODU2NzU2N30.Lls-iTGdt90gtbi-mXXkYvB26u9Yt65DMOcskmVgx1Q';

        const cargar = async (clave) => {
            try {
                const res = await fetch(`${URL}/rest/v1/progreso?user_id=eq.${USER_ID}&clave=eq.${clave}&select=valor`, {
                    headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
                });
                const data = await res.json();
                if (data && data.length > 0) return JSON.parse(data[0].valor);
                return null;
            } catch { return null; }
        };

        const [jugador, pisos, piso] = await Promise.all([
            cargar('fantasia_jugador'),
            cargar('fantasia_pisos'),
            cargar('fantasia_pisoActual')
        ]);

        const supabaseVacio = jugador === null && pisos === null;

        if (supabaseVacio) {
            await Promise.all([
                this.supabaseGuardar('fantasia_jugador', this.jugador),
                this.supabaseGuardar('fantasia_pisos', this.pisos),
                this.supabaseGuardar('fantasia_pisoActual', this.pisoActual)
            ]);
            console.log('✅ Fantasia subida a Supabase');
        } else {
            if (jugador !== null) { this.jugador = jugador; localStorage.setItem('fantasia_jugador', JSON.stringify(jugador)); }
            if (pisos !== null) { this.pisos = pisos; localStorage.setItem('fantasia_pisos', JSON.stringify(pisos)); }
            if (piso !== null) { this.pisoActual = piso; localStorage.setItem('fantasia_pisoActual', piso.toString()); }
            console.log('✅ Fantasia sincronizada desde Supabase');
        }
    }

    async supabaseGuardar(clave, valor) {
        const USER_ID = 'user_qdhg1lunm_1772995224949';
        const URL = 'https://lcspqpdjvdcbzhmcrhqi.supabase.co';
        const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjc3BxcGRqdmRjYnpobWNyaHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5OTE1NjcsImV4cCI6MjA4ODU2NzU2N30.Lls-iTGdt90gtbi-mXXkYvB26u9Yt65DMOcskmVgx1Q';
        try {
            await fetch(`${URL}/rest/v1/progreso`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': KEY,
                    'Authorization': `Bearer ${KEY}`,
                    'Prefer': 'resolution=merge-duplicates,return=minimal'
                },
                body: JSON.stringify({ user_id: USER_ID, clave, valor: JSON.stringify(valor), actualizado_en: new Date().toISOString() })
            });
        } catch {}
    }

    guardarTodo() {
        try {
            localStorage.setItem('fantasia_jugador', JSON.stringify(this.jugador));
            localStorage.setItem('fantasia_pisos', JSON.stringify(this.pisos));
            localStorage.setItem('fantasia_pisoActual', this.pisoActual.toString());
            this.supabaseGuardar('fantasia_jugador', this.jugador);
            this.supabaseGuardar('fantasia_pisos', this.pisos);
            this.supabaseGuardar('fantasia_pisoActual', this.pisoActual);
        } catch (e) {
            console.warn('Error guardando:', e);
        }
    }

    cargarJugador() {
        try {
            const jugador = localStorage.getItem('fantasia_jugador');
            if (jugador) return JSON.parse(jugador);
        } catch (e) {}
        return null;
    }

    cargarPisoActual() {
        try {
            const piso = localStorage.getItem('fantasia_pisoActual');
            return piso ? parseInt(piso) : 1;
        } catch (e) { return 1; }
    }
}

// ================================================
// INSTANCIA GLOBAL
// ================================================

const fantasiaRPG = new FantasiaRPG();
window.fantasiaRPG = fantasiaRPG;

console.log("✅ RPG Fantasía MEJORADO cargado");
