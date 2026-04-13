// ================================================
// RPG COMPLETO: LAS QUINTILLIZAS NAKANO - CON TODAS LAS COMBINACIONES GRUPALES
// + INTEGRACIÓN CON RPG FANTASÍA (BONUS POR STATS)
// + FUNCIONES GLOBALES PARA ACCEDER A LA NOVIA SELECCIONADA
// + NUEVA FUNCIÓN: modificarAfinidad() PARA EVENTOS DIARIOS
// ================================================

class QuintillizasRPG {
    constructor() {
        this.personajeSeleccionado = this.cargarPersonajeSeleccionado() || null;
        this.datosPersonajes = this.cargarDatosPersonajes() || this.inicializarDatosPersonajes();
        this.condones = this.cargarCondones() || 0;
        this.condones001 = this.cargarCondones001() || 0;
        this.ultimaInteraccion = null;
        this.momentosGrupales = this.inicializarMomentosGrupales();
        
        // Exponer funciones globalmente al iniciar
        this.exponerFuncionesGlobales();

        // Sincronizar con Supabase (con delay para no interferir con la carga)
        setTimeout(() => this.sincronizarDesdeSupabase(), 3000);
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

        const [personaje, datos, condones, condones001, dormitorio] = await Promise.all([
            cargar('rpg_personaje_seleccionado'),
            cargar('rpg_datos_personajes'),
            cargar('rpg_condones'),
            cargar('rpg_condones001'),
            cargar('dormitorio_datos')
        ]);

        const supabaseVacio = personaje === null && datos === null;

        if (supabaseVacio) {
            await Promise.all([
                this.supabaseGuardar('rpg_personaje_seleccionado', this.personajeSeleccionado),
                this.supabaseGuardar('rpg_datos_personajes', this.datosPersonajes),
                this.supabaseGuardar('rpg_condones', this.condones),
                this.supabaseGuardar('rpg_condones001', this.condones001),
                this.supabaseGuardar('dormitorio_datos', this._dormitorio || null)
            ]);
            console.log('☁️ RPG subido a Supabase');
        } else {
            if (personaje !== null) { this.personajeSeleccionado = personaje; localStorage.setItem('rpg_personaje_seleccionado', personaje); }
            if (datos !== null) { this.datosPersonajes = datos; localStorage.setItem('rpg_datos_personajes', JSON.stringify(datos)); }
            if (condones !== null) { this.condones = condones; localStorage.setItem('rpg_condones', condones.toString()); }
            if (condones001 !== null) { this.condones001 = condones001; localStorage.setItem('rpg_condones001', condones001.toString()); }
            if (dormitorio !== null) { this._dormitorio = dormitorio; localStorage.setItem('dormitorio_datos', JSON.stringify(dormitorio)); }
            console.log('☁️ RPG sincronizado desde Supabase');
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

    // ====================
    // EXPONER FUNCIONES GLOBALES
    // ====================

    exponerFuncionesGlobales() {
        // Funciones para Fantasía
        window.obtenerNoviaSeleccionada = () => {
            if (this.personajeSeleccionado && this.datosPersonajes[this.personajeSeleccionado]) {
                const personaje = this.datosPersonajes[this.personajeSeleccionado];
                return {
                    id: this.personajeSeleccionado,
                    nombre: personaje.nombre,
                    nombreCorto: personaje.nombre.split(' ')[0],
                    imagen: personaje.imagen,
                    color: personaje.color,
                    nivel: personaje.nivel,
                    afinidad: personaje.afinidad
                };
            }
            return null;
        };

        window.obtenerVideoNovia = (accion) => {
            if (!this.personajeSeleccionado) return null;
            
            const noviaId = this.personajeSeleccionado;
            const novia = this.datosPersonajes[noviaId];
            const momentos = novia.momentosIntimos;
            
            if (accion === 'mamada') {
                const momento = momentos.find(m => m.id.includes('mamada'));
                return momento ? momento.videoId : null;
            } else if (accion === 'doggy') {
                const momento = momentos.find(m => m.id.includes('duro') || m.id.includes('penetracion'));
                return momento ? momento.videoId : null;
            } else if (accion === 'montar') {
                const momento = momentos.find(m => m.id.includes('correrse') || m.id.includes('corrida'));
                return momento ? momento.videoId : null;
            }
            
            return null;
        };

        window.obtenerDatosNovia = () => {
            if (!this.personajeSeleccionado) return null;
            return this.datosPersonajes[this.personajeSeleccionado] || null;
        };

        console.log("💖 Funciones de novia expuestas globalmente para Fantasía");
    }

    // ====================
    // INICIALIZACIÓN DE PERSONAJES
    // ====================

    inicializarDatosPersonajes() {
        return {
            'ichika': {
                nombre: 'Ichika Nakano',
                color: '#FF6B8B',
                imagen: 'https://pbs.twimg.com/media/G7qfcGRWkAAV74w?format=png&name=small',
                nivel: 1,
                exp: 0,
                expNecesaria: 1000,
                estadoAnimo: 'neutral',
                afinidad: 0,
                descripcion: 'La hermana mayor, responsable y coqueta. Le gusta cuidar a los demás.',
                dificultad: 'media',
                probabilidadBase: 40,
                videosDisponibles: [],
                nivelRequeridoParaIntimos: 3,
                actividadesEspeciales: [
                    { id: 'cafe_romantico', nombre: '☕ Café Romántico', costo: 500, videoId: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe', afinidad: 25, exp: 80, descripcion: 'Tómate un café íntimo con Ichika' },
                    { id: 'estudio_juntos', nombre: '📚 Estudio Juntos', costo: 300, videoId: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K', afinidad: 20, exp: 60, descripcion: 'Estudia con Ichika después de clases' },
                    { id: 'paseo_noche', nombre: '🌙 Paseo Nocturno', costo: 800, videoId: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS', afinidad: 30, exp: 100, descripcion: 'Un romántico paseo bajo las estrellas' }
                ],
                momentosIntimos: [
                    {
                        id: 'caricia_intima',
                        nombre: '👐 Caricia Íntima',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
                        afinidad: 20,
                        exp: 80,
                        descripcion: 'Una caricia en sus partes más íntimas',
                        probabilidadBase: 5,
                        nivelRequerido: 2
                    },
                    {
                        id: 'mamada',
                        nombre: '😮 Mamada Apasionada',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
                        afinidad: 50,
                        exp: 200,
                        descripcion: 'Una mamada profunda y apasionada',
                        probabilidadBase: 0,
                        nivelRequerido: 3
                    },
                    {
                        id: 'sexo_oral',
                        nombre: '👅 Sexo Oral Intenso',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
                        afinidad: 40,
                        exp: 150,
                        descripcion: 'Sexo oral hasta que se corra en tu boca',
                        probabilidadBase: 0,
                        nivelRequerido: 4
                    },
                    {
                        id: 'sexo_duro',
                        nombre: '💪 Sexo Duro',
                        condonesRequeridos: 2,
                        condones001Requeridos: 0,
                        videoId: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
                        afinidad: 80,
                        exp: 300,
                        descripcion: 'Dale duro hasta que grite tu nombre',
                        probabilidadBase: 0,
                        nivelRequerido: 5
                    },
                    {
                        id: 'correrse_dentro',
                        nombre: '💦 Correrse Dentro',
                        condonesRequeridos: 3,
                        condones001Requeridos: 1,
                        videoId: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
                        afinidad: 100,
                        exp: 500,
                        descripcion: 'El momento final, correrse dentro de ella',
                        probabilidadBase: 0,
                        nivelRequerido: 6
                    }
                ]
            },
            'nino': {
                nombre: 'Nino Nakano',
                color: '#FFB347',
                imagen: 'https://pbs.twimg.com/media/G7qfpGZXAAAib4A?format=png&name=small',
                nivel: 1,
                exp: 0,
                expNecesaria: 1200,
                estadoAnimo: 'tsundere',
                afinidad: -50,
                descripcion: 'Tsundere clásica, difícil de conquistar. Cocina increíblemente bien.',
                dificultad: 'alta',
                probabilidadBase: 20,
                videosDisponibles: [],
                nivelRequeridoParaIntimos: 4,
                actividadesEspeciales: [
                    { id: 'clases_cocina', nombre: '👩‍🍳 Clases de Cocina', costo: 600, videoId: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl', afinidad: 40, exp: 90, descripcion: 'Aprende a cocinar con Nino' },
                    { id: 'pelicula_hogar', nombre: '🎬 Película en Casa', costo: 400, videoId: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe', afinidad: 25, exp: 70, descripcion: 'Ve una película romántica en el sofá' },
                    { id: 'concierto', nombre: '🎵 Concierto Juntos', costo: 1000, videoId: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K', afinidad: 50, exp: 120, descripcion: 'Llévala a ver su banda favorita' }
                ],
                momentosIntimos: [
                    {
                        id: 'mamada_tsundere',
                        nombre: '😤 Mamada Tsundere',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
                        afinidad: 60,
                        exp: 250,
                        descripcion: 'Una mamada a regañadientes pero intensa',
                        probabilidadBase: 0,
                        nivelRequerido: 4
                    },
                    {
                        id: 'sexo_duro_tsundere',
                        nombre: '💢 Sexo Duro Tsundere',
                        condonesRequeridos: 2,
                        condones001Requeridos: 0,
                        videoId: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
                        afinidad: 90,
                        exp: 400,
                        descripcion: 'Dale duro mientras dice "no es que me guste"',
                        probabilidadBase: 0,
                        nivelRequerido: 6
                    },
                    {
                        id: 'corrida_cara',
                        nombre: '💦 Corrida en la Cara',
                        condonesRequeridos: 1,
                        condones001Requeridos: 1,
                        videoId: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
                        afinidad: 120,
                        exp: 600,
                        descripcion: 'Correrse en su cara mientras te mira con odio',
                        probabilidadBase: 0,
                        nivelRequerido: 7
                    }
                ]
            },
            'miku': {
                nombre: 'Miku Nakano',
                color: '#6A5ACD',
                imagen: 'https://pbs.twimg.com/media/G7qfrrKWsAAv6ZT?format=png&name=small',
                nivel: 1,
                exp: 0,
                expNecesaria: 800,
                estadoAnimo: 'tímida',
                afinidad: 10,
                descripcion: 'Tímida y reservada, le gusta la historia japonesa y los audífonos.',
                dificultad: 'media-baja',
                probabilidadBase: 50,
                videosDisponibles: [],
                nivelRequeridoParaIntimos: 2,
                actividadesEspeciales: [
                    { id: 'visita_templo', nombre: '⛩️ Visita al Templo', costo: 250, videoId: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS', afinidad: 15, exp: 50, descripcion: 'Visita un templo histórico con Miku' },
                    { id: 'biblioteca', nombre: '📖 Tarde en Biblioteca', costo: 200, videoId: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl', afinidad: 10, exp: 40, descripcion: 'Estudia historia en la biblioteca' },
                    { id: 'concierto_tradicional', nombre: '🎶 Concierto Tradicional', costo: 600, videoId: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe', afinidad: 35, exp: 95, descripcion: 'Asiste a un concierto de música tradicional' }
                ],
                momentosIntimos: [
                    {
                        id: 'mamada_timida',
                        nombre: '😳 Mamada Tímida',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
                        afinidad: 40,
                        exp: 180,
                        descripcion: 'Una mamada suave y llena de timidez',
                        probabilidadBase: 5,
                        nivelRequerido: 2
                    },
                    {
                        id: 'sexo_lento',
                        nombre: '🐌 Sexo Lento',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
                        afinidad: 60,
                        exp: 250,
                        descripcion: 'Sexo lento y romántico',
                        probabilidadBase: 0,
                        nivelRequerido: 3
                    },
                    {
                        id: 'correrse_dentro_miku',
                        nombre: '💕 Correrse Dentro',
                        condonesRequeridos: 2,
                        condones001Requeridos: 1,
                        videoId: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
                        afinidad: 80,
                        exp: 350,
                        descripcion: 'Correrse dentro mientras te abraza',
                        probabilidadBase: 0,
                        nivelRequerido: 5
                    }
                ]
            },
            'yotsuba': {
                nombre: 'Yotsuba Nakano',
                color: '#4CAF50',
                imagen: 'https://pbs.twimg.com/media/G7qfupkXUAAX0aS?format=png&name=small',
                nivel: 1,
                exp: 0,
                expNecesaria: 700,
                estadoAnimo: 'energica',
                afinidad: 30,
                descripcion: 'La más enérgica y deportista. Siempre lista para ayudar.',
                dificultad: 'baja',
                probabilidadBase: 60,
                videosDisponibles: [],
                nivelRequeridoParaIntimos: 2,
                actividadesEspeciales: [
                    { id: 'partido_futbol', nombre: '⚽ Partido de Fútbol', costo: 300, videoId: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K', afinidad: 20, exp: 60, descripcion: 'Juega un partido de fútbol con Yotsuba' },
                    { id: 'voluntariado', nombre: '🤝 Día de Voluntariado', costo: 150, videoId: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS', afinidad: 15, exp: 45, descripcion: 'Ayuda a otros junto a Yotsuba' },
                    { id: 'carrera_atletismo', nombre: '🏃‍♀️ Carrera de Atletismo', costo: 500, videoId: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl', afinidad: 30, exp: 85, descripcion: 'Participa en una carrera juntos' }
                ],
                momentosIntimos: [
                    {
                        id: 'mamada_energica',
                        nombre: '💪 Mamada Energética',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
                        afinidad: 45,
                        exp: 200,
                        descripcion: 'Una mamada llena de energía y entusiasmo',
                        probabilidadBase: 10,
                        nivelRequerido: 2
                    },
                    {
                        id: 'sexo_rapido',
                        nombre: '⚡ Sexo Rápido',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
                        afinidad: 70,
                        exp: 300,
                        descripcion: 'Sexo rápido y apasionado',
                        probabilidadBase: 0,
                        nivelRequerido: 3
                    },
                    {
                        id: 'doble_penetracion',
                        nombre: '👯‍♀️ Doble Penetración',
                        condonesRequeridos: 2,
                        condones001Requeridos: 1,
                        videoId: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
                        afinidad: 100,
                        exp: 500,
                        descripcion: 'Doble penetración con otra hermana (fantasía)',
                        probabilidadBase: 0,
                        nivelRequerido: 6
                    }
                ]
            },
            'itsuki': {
                nombre: 'Itsuki Nakano',
                color: '#FFD166',
                imagen: 'https://pbs.twimg.com/media/G7qfxnsX0AIbJK1?format=png&name=small',
                nivel: 1,
                exp: 0,
                expNecesaria: 900,
                estadoAnimo: 'glotona',
                afinidad: 15,
                descripcion: 'La más glotona, le encanta comer. Es estudiosa y honesta.',
                dificultad: 'baja',
                probabilidadBase: 55,
                videosDisponibles: [],
                nivelRequeridoParaIntimos: 3,
                actividadesEspeciales: [
                    { id: 'buffet_ilimitado', nombre: '🍣 Buffet Ilimitado', costo: 800, videoId: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe', afinidad: 40, exp: 100, descripcion: 'Llévala a un buffet de sushi' },
                    { id: 'cocina_postres', nombre: '🍰 Clase de Postres', costo: 400, videoId: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K', afinidad: 25, exp: 75, descripcion: 'Aprende a hacer postres con Itsuki' },
                    { id: 'picnic_parque', nombre: '🧺 Picnic en el Parque', costo: 350, videoId: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS', afinidad: 20, exp: 65, descripcion: 'Un picnic con mucha comida' }
                ],
                momentosIntimos: [
                    {
                        id: 'mamada_con_sabor',
                        nombre: '🍓 Mamada con Sabor',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
                        afinidad: 50,
                        exp: 220,
                        descripcion: 'Una mamada que sabe a fresas',
                        probabilidadBase: 5,
                        nivelRequerido: 3
                    },
                    {
                        id: 'sexo_gloton',
                        nombre: '🍔 Sexo Glotón',
                        condonesRequeridos: 1,
                        condones001Requeridos: 0,
                        videoId: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
                        afinidad: 65,
                        exp: 280,
                        descripcion: 'Sexo mientras come algo dulce',
                        probabilidadBase: 0,
                        nivelRequerido: 4
                    },
                    {
                        id: 'correrse_boca',
                        nombre: '👄 Correrse en la Boca',
                        condonesRequeridos: 1,
                        condones001Requeridos: 1,
                        videoId: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
                        afinidad: 90,
                        exp: 400,
                        descripcion: 'Correrse en su boca y que se lo trague',
                        probabilidadBase: 0,
                        nivelRequerido: 6
                    }
                ]
            }
        };
    }

    // ====================
    // TODAS LAS COMBINACIONES GRUPALES DEFINIDAS
    // ====================

    inicializarMomentosGrupales() {
        return {
            duo: [
                {
                    id: 'duo_nino_ichika',
                    nombre: '👯‍♀️ Dúo Tsundere-Mayor',
                    tituloCompleto: 'Nino e Ichika: Dúo de Hermanas',
                    descripcion: 'Nino a regañadientes e Ichika con coquetería te complacen juntas',
                    imagen: 'URL_IMAGEN_DUO_NINO_ICHIKA',
                    videoId: 'ID_VIDEO_DUO_NINO_ICHIKA',
                    integrantes: ['nino', 'ichika'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                },
                {
                    id: 'duo_nino_miku',
                    nombre: '👯‍♀️ Dúo Tsundere-Tímida',
                    tituloCompleto: 'Nino y Miku: Contrastes',
                    descripcion: 'La actitud tsundere de Nino combinada con la timidez de Miku',
                    imagen: 'URL_IMAGEN_DUO_NINO_MIKU',
                    videoId: 'ID_VIDEO_DUO_NINO_MIKU',
                    integrantes: ['nino', 'miku'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                },
                {
                    id: 'duo_nino_yotsuba',
                    nombre: '👯‍♀️ Dúo Tsundere-Energía',
                    tituloCompleto: 'Nino y Yotsuba: Fuego y Energía',
                    descripcion: 'Nino con su actitud y Yotsuba con su energía inagotable',
                    imagen: 'URL_IMAGEN_DUO_NINO_YOTSUBA',
                    videoId: 'ID_VIDEO_DUO_NINO_YOTSUBA',
                    integrantes: ['nino', 'yotsuba'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                },
                {
                    id: 'duo_nino_itsuki',
                    nombre: '👯‍♀️ Dúo Tsundere-Glotona',
                    tituloCompleto: 'Nino e Itsuki: Sabores Contrastantes',
                    descripcion: 'La cocina de Nino y el apetito de Itsuki se combinan',
                    imagen: 'URL_IMAGEN_DUO_NINO_ITSUKI',
                    videoId: 'ID_VIDEO_DUO_NINO_ITSUKI',
                    integrantes: ['nino', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                },
                {
                    id: 'duo_ichika_miku',
                    nombre: '👯‍♀️ Dúo Mayor-Tímida',
                    tituloCompleto: 'Ichika y Miku: Protección y Timidez',
                    descripcion: 'Ichika cuida de Miku mientras ambas te complacen',
                    imagen: 'URL_IMAGEN_DUO_ICHIKA_MIKU',
                    videoId: 'ID_VIDEO_DUO_ICHIKA_MIKU',
                    integrantes: ['ichika', 'miku'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                },
                {
                    id: 'duo_ichika_yotsuba',
                    nombre: '👯‍♀️ Dúo Coqueta-Energía',
                    tituloCompleto: 'Ichika y Yotsuba: Carisma y Vitalidad',
                    descripcion: 'La coquetería de Ichika con la energía de Yotsuba',
                    imagen: 'URL_IMAGEN_DUO_ICHIKA_YOTSUBA',
                    videoId: 'ID_VIDEO_DUO_ICHIKA_YOTSUBA',
                    integrantes: ['ichika', 'yotsuba'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                },
                {
                    id: 'duo_ichika_itsuki',
                    nombre: '👯‍♀️ Dúo Mayor-Glotona',
                    tituloCompleto: 'Ichika e Itsuki: Las Mayores',
                    descripcion: 'Las dos hermanas mayores unen fuerzas',
                    imagen: 'URL_IMAGEN_DUO_ICHIKA_ITSUKI',
                    videoId: 'ID_VIDEO_DUO_ICHIKA_ITSUKI',
                    integrantes: ['ichika', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                },
                {
                    id: 'duo_miku_yotsuba',
                    nombre: '👯‍♀️ Dúo Tímida-Energía',
                    tituloCompleto: 'Miku y Yotsuba: Opuestos',
                    descripcion: 'La timidez de Miku se desvanece con Yotsuba',
                    imagen: 'URL_IMAGEN_DUO_MIKU_YOTSUBA',
                    videoId: 'ID_VIDEO_DUO_MIKU_YOTSUBA',
                    integrantes: ['miku', 'yotsuba'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                },
                {
                    id: 'duo_miku_itsuki',
                    nombre: '👯‍♀️ Dúo Tímida-Glotona',
                    tituloCompleto: 'Miku e Itsuki: Dulzura',
                    descripcion: 'Miku tímida e Itsuki glotona, combinación adorable',
                    imagen: 'URL_IMAGEN_DUO_MIKU_ITSUKI',
                    videoId: 'ID_VIDEO_DUO_MIKU_ITSUKI',
                    integrantes: ['miku', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                },
                {
                    id: 'duo_yotsuba_itsuki',
                    nombre: '👯‍♀️ Dúo Energía-Glotona',
                    tituloCompleto: 'Yotsuba e Itsuki: Diversión',
                    descripcion: 'La energía de Yotsuba con el amor por la comida de Itsuki',
                    imagen: 'URL_IMAGEN_DUO_YOTSUBA_ITSUKI',
                    videoId: 'ID_VIDEO_DUO_YOTSUBA_ITSUKI',
                    integrantes: ['yotsuba', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 100,
                    nivelRequerido: 5,
                    condones001Requeridos: 2,
                    afinidadGanada: 200,
                    expGanada: 500,
                    recompensa: 150
                }
            ],
            trio: [
                {
                    id: 'trio_nino_ichika_miku',
                    nombre: '👯‍♀️👯‍♀️ Trío Tsundere-Mayor-Tímida',
                    tituloCompleto: 'Nino, Ichika y Miku: Diversidad',
                    descripcion: 'Tres personalidades distintas para una experiencia única',
                    imagen: 'URL_IMAGEN_TRIO_NINO_ICHIKA_MIKU',
                    videoId: 'ID_VIDEO_TRIO_NINO_ICHIKA_MIKU',
                    integrantes: ['nino', 'ichika', 'miku'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                },
                {
                    id: 'trio_nino_ichika_yotsuba',
                    nombre: '👯‍♀️👯‍♀️ Trío Tsundere-Mayor-Energía',
                    tituloCompleto: 'Nino, Ichika y Yotsuba: Explosión',
                    descripcion: 'Tres hermanas llenas de energía y actitud',
                    imagen: 'URL_IMAGEN_TRIO_NINO_ICHIKA_YOTSUBA',
                    videoId: 'ID_VIDEO_TRIO_NINO_ICHIKA_YOTSUBA',
                    integrantes: ['nino', 'ichika', 'yotsuba'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                },
                {
                    id: 'trio_nino_ichika_itsuki',
                    nombre: '👯‍♀️👯‍♀️ Trío Tsundere-Mayor-Glotona',
                    tituloCompleto: 'Nino, Ichika e Itsuki: Las Mayores',
                    descripcion: 'Las tres hermanas mayores te complacen',
                    imagen: 'URL_IMAGEN_TRIO_NINO_ICHIKA_ITSUKI',
                    videoId: 'ID_VIDEO_TRIO_NINO_ICHIKA_ITSUKI',
                    integrantes: ['nino', 'ichika', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                },
                {
                    id: 'trio_nino_miku_yotsuba',
                    nombre: '👯‍♀️👯‍♀️ Trío Tsundere-Tímida-Energía',
                    tituloCompleto: 'Nino, Miku y Yotsuba: Contraste',
                    descripcion: 'La actitud de Nino, la timidez de Miku y la energía de Yotsuba',
                    imagen: 'URL_IMAGEN_TRIO_NINO_MIKU_YOTSUBA',
                    videoId: 'ID_VIDEO_TRIO_NINO_MIKU_YOTSUBA',
                    integrantes: ['nino', 'miku', 'yotsuba'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                },
                {
                    id: 'trio_nino_miku_itsuki',
                    nombre: '👯‍♀️👯‍♀️ Trío Tsundere-Tímida-Glotona',
                    tituloCompleto: 'Nino, Miku e Itsuki: Sabores',
                    descripcion: 'Tres sabores distintos en una sola experiencia',
                    imagen: 'URL_IMAGEN_TRIO_NINO_MIKU_ITSUKI',
                    videoId: 'ID_VIDEO_TRIO_NINO_MIKU_ITSUKI',
                    integrantes: ['nino', 'miku', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                },
                {
                    id: 'trio_nino_yotsuba_itsuki',
                    nombre: '👯‍♀️👯‍♀️ Trío Tsundere-Energía-Glotona',
                    tituloCompleto: 'Nino, Yotsuba e Itsuki: Dinamismo',
                    descripcion: 'Energía y actitud combinadas',
                    imagen: 'URL_IMAGEN_TRIO_NINO_YOTSUBA_ITSUKI',
                    videoId: 'ID_VIDEO_TRIO_NINO_YOTSUBA_ITSUKI',
                    integrantes: ['nino', 'yotsuba', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                },
                {
                    id: 'trio_ichika_miku_yotsuba',
                    nombre: '👯‍♀️👯‍♀️ Trío Mayor-Tímida-Energía',
                    tituloCompleto: 'Ichika, Miku y Yotsuba: Armonía',
                    descripcion: 'Ichika lidera mientras Miku y Yotsuba siguen',
                    imagen: 'URL_IMAGEN_TRIO_ICHIKA_MIKU_YOTSUBA',
                    videoId: 'ID_VIDEO_TRIO_ICHIKA_MIKU_YOTSUBA',
                    integrantes: ['ichika', 'miku', 'yotsuba'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                },
                {
                    id: 'trio_ichika_miku_itsuki',
                    nombre: '👯‍♀️👯‍♀️ Trío Mayor-Tímida-Glotona',
                    tituloCompleto: 'Ichika, Miku e Itsuki: Dulzura',
                    descripcion: 'Tres hermanas con personalidades suaves',
                    imagen: 'URL_IMAGEN_TRIO_ICHIKA_MIKU_ITSUKI',
                    videoId: 'ID_VIDEO_TRIO_ICHIKA_MIKU_ITSUKI',
                    integrantes: ['ichika', 'miku', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                },
                {
                    id: 'trio_ichika_yotsuba_itsuki',
                    nombre: '👯‍♀️👯‍♀️ Trío Mayor-Energía-Glotona',
                    tituloCompleto: 'Ichika, Yotsuba e Itsuki: Vitalidad',
                    descripcion: 'Carisma, energía y apetito en un trío',
                    imagen: 'URL_IMAGEN_TRIO_ICHIKA_YOTSUBA_ITSUKI',
                    videoId: 'ID_VIDEO_TRIO_ICHIKA_YOTSUBA_ITSUKI',
                    integrantes: ['ichika', 'yotsuba', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                },
                {
                    id: 'trio_miku_yotsuba_itsuki',
                    nombre: '👯‍♀️👯‍♀️ Trío Tímida-Energía-Glotona',
                    tituloCompleto: 'Miku, Yotsuba e Itsuki: Juventud',
                    descripcion: 'Las tres hermanas menores en un trío explosivo',
                    imagen: 'URL_IMAGEN_TRIO_MIKU_YOTSUBA_ITSUKI',
                    videoId: 'ID_VIDEO_TRIO_MIKU_YOTSUBA_ITSUKI',
                    integrantes: ['miku', 'yotsuba', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 150,
                    nivelRequerido: 7,
                    condones001Requeridos: 3,
                    afinidadGanada: 300,
                    expGanada: 800,
                    recompensa: 250
                }
            ],
            cuarteto: [
                {
                    id: 'cuarteto_sin_ichika',
                    nombre: '👯‍♀️👯‍♀️👯‍♀️ Cuarteto sin Ichika',
                    tituloCompleto: 'Nino, Miku, Yotsuba e Itsuki',
                    descripcion: 'Las cuatro hermanas menores te complacen',
                    imagen: 'URL_IMAGEN_CUARTETO_SIN_ICHIKA',
                    videoId: 'ID_VIDEO_CUARTETO_SIN_ICHIKA',
                    integrantes: ['nino', 'miku', 'yotsuba', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 175,
                    nivelRequerido: 9,
                    condones001Requeridos: 4,
                    afinidadGanada: 400,
                    expGanada: 1200,
                    recompensa: 400
                },
                {
                    id: 'cuarteto_sin_nino',
                    nombre: '👯‍♀️👯‍♀️👯‍♀️ Cuarteto sin Nino',
                    tituloCompleto: 'Ichika, Miku, Yotsuba e Itsuki',
                    descripcion: 'Cuatro hermanas sin la tsundere',
                    imagen: 'URL_IMAGEN_CUARTETO_SIN_NINO',
                    videoId: 'ID_VIDEO_CUARTETO_SIN_NINO',
                    integrantes: ['ichika', 'miku', 'yotsuba', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 175,
                    nivelRequerido: 9,
                    condones001Requeridos: 4,
                    afinidadGanada: 400,
                    expGanada: 1200,
                    recompensa: 400
                },
                {
                    id: 'cuarteto_sin_miku',
                    nombre: '👯‍♀️👯‍♀️👯‍♀️ Cuarteto sin Miku',
                    tituloCompleto: 'Ichika, Nino, Yotsuba e Itsuki',
                    descripcion: 'Cuatro hermanas sin la tímida',
                    imagen: 'URL_IMAGEN_CUARTETO_SIN_MIKU',
                    videoId: 'ID_VIDEO_CUARTETO_SIN_MIKU',
                    integrantes: ['ichika', 'nino', 'yotsuba', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 175,
                    nivelRequerido: 9,
                    condones001Requeridos: 4,
                    afinidadGanada: 400,
                    expGanada: 1200,
                    recompensa: 400
                },
                {
                    id: 'cuarteto_sin_yotsuba',
                    nombre: '👯‍♀️👯‍♀️👯‍♀️ Cuarteto sin Yotsuba',
                    tituloCompleto: 'Ichika, Nino, Miku e Itsuki',
                    descripcion: 'Cuatro hermanas sin la energética',
                    imagen: 'URL_IMAGEN_CUARTETO_SIN_YOTSUBA',
                    videoId: 'ID_VIDEO_CUARTETO_SIN_YOTSUBA',
                    integrantes: ['ichika', 'nino', 'miku', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 175,
                    nivelRequerido: 9,
                    condones001Requeridos: 4,
                    afinidadGanada: 400,
                    expGanada: 1200,
                    recompensa: 400
                },
                {
                    id: 'cuarteto_sin_itsuki',
                    nombre: '👯‍♀️👯‍♀️👯‍♀️ Cuarteto sin Itsuki',
                    tituloCompleto: 'Ichika, Nino, Miku y Yotsuba',
                    descripcion: 'Cuatro hermanas sin la glotona',
                    imagen: 'URL_IMAGEN_CUARTETO_SIN_ITSUKI',
                    videoId: 'ID_VIDEO_CUARTETO_SIN_ITSUKI',
                    integrantes: ['ichika', 'nino', 'miku', 'yotsuba'],
                    tipo: 'mamada',
                    afinidadRequerida: 175,
                    nivelRequerido: 9,
                    condones001Requeridos: 4,
                    afinidadGanada: 400,
                    expGanada: 1200,
                    recompensa: 400
                }
            ],
            quinteto: [
                {
                    id: 'quinteto_todas',
                    nombre: '👯‍♀️👯‍♀️👯‍♀️👯‍♀️👯‍♀️ QUINTETO: LAS 5 HERMANAS',
                    tituloCompleto: 'Las Cinco Nakano: El Momento Supremo',
                    descripcion: '¡El momento más especial! Las cinco hermanas te complacen simultáneamente en una experiencia inolvidable',
                    imagen: 'URL_IMAGEN_QUINTETO_TODAS',
                    videoId: 'ID_VIDEO_QUINTETO_TODAS',
                    integrantes: ['ichika', 'nino', 'miku', 'yotsuba', 'itsuki'],
                    tipo: 'mamada',
                    afinidadRequerida: 200,
                    nivelRequerido: 10,
                    condones001Requeridos: 5,
                    afinidadGanada: 500,
                    expGanada: 2000,
                    recompensa: 1000
                }
            ]
        };
    }

    // ====================
    // SISTEMA DE EXP Y NIVELES
    // ====================

    agregarEXP(personajeId, cantidad) {
        if (!this.personajeSeleccionado || this.personajeSeleccionado !== personajeId) {
            console.log(`⚠️ No se puede añadir EXP: Personaje ${personajeId} no coincide con seleccionado ${this.personajeSeleccionado}`);
            return false;
        }

        const personaje = this.datosPersonajes[personajeId];
        personaje.exp += cantidad;

        console.log(`🎮 ${personaje.nombre} +${cantidad} EXP (Total: ${personaje.exp}/${personaje.expNecesaria})`);

        if (personaje.exp >= personaje.expNecesaria) {
            this.subirNivel(personajeId);
        }

        this.guardarDatosPersonajes();
        return true;
    }

    subirNivel(personajeId) {
        const personaje = this.datosPersonajes[personajeId];
        personaje.nivel += 1;
        personaje.exp = personaje.exp - personaje.expNecesaria;
        personaje.expNecesaria = Math.round(personaje.expNecesaria * 1.8);

        console.log(`🎉 ¡${personaje.nombre} subió al nivel ${personaje.nivel}!`);
        if (window.innerWidth >= 768) {
            this.mostrarNotificacion(`🎉 ${personaje.nombre} nivel ${personaje.nivel}! (Necesitas ${personaje.expNecesaria} EXP para el siguiente)`);
        }

        this.desbloquearVideo(personajeId);
        this.guardarDatosPersonajes();
    }

    desbloquearVideo(personajeId) {
        const personaje = this.datosPersonajes[personajeId];
        const nivel = personaje.nivel;

        const videosPorNivel = {
            2: { id: 'presentacion', nombre: 'Presentación', videoId: this.obtenerVideoIdPorNivel(personajeId, 2) },
            4: { id: 'conversacion_1', nombre: 'Conversación', videoId: this.obtenerVideoIdPorNivel(personajeId, 4) },
            6: { id: 'paseo', nombre: 'Primer Paseo', videoId: this.obtenerVideoIdPorNivel(personajeId, 6) },
            8: { id: 'confesion', nombre: 'Confesión', videoId: this.obtenerVideoIdPorNivel(personajeId, 8) },
            10: { id: 'primer_beso', nombre: 'Primer Beso', videoId: this.obtenerVideoIdPorNivel(personajeId, 10) }
        };

        if (videosPorNivel[nivel] && !personaje.videosDisponibles.some(v => v.id === videosPorNivel[nivel].id)) {
            personaje.videosDisponibles.push(videosPorNivel[nivel]);
            console.log(`🎥 Video desbloqueado: ${videosPorNivel[nivel].nombre} (Nivel ${nivel})`);
            this.mostrarNotificacion(`🎬 ¡Video desbloqueado! ${videosPorNivel[nivel].nombre}`);
        }
    }

    obtenerVideoIdPorNivel(personajeId, nivel) {
        const videos = {
            'ichika': ['1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe', '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K', '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS', '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl', '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe'],
            'nino': ['1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K', '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS', '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl', '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe', '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K'],
            'miku': ['1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS', '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl', '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe', '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K', '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS'],
            'yotsuba': ['1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl', '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe', '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K', '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS', '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl'],
            'itsuki': ['1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe', '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K', '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS', '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl', '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe']
        };

        const indice = Math.floor((nivel / 2) - 1);
        return videos[personajeId][indice] || videos[personajeId][0];
    }

    // ====================
    // SISTEMA DE PROBABILIDADES (CORREGIDO + BONUS FANTASÍA)
    // ====================

    calcularProbabilidadMomento(personaje, momento, usarCondonEspecial = false) {
        const MAX_AFINIDAD = 200;
        const MAX_NIVEL = 10;
        const MAX_EXITO_BASE = 80;
        const MAX_EXITO_CON_CONDON = 100;

        const usarLimiteEspecial = usarCondonEspecial || momento.condones001Requeridos > 0;
        const limiteMaximo = usarLimiteEspecial ? MAX_EXITO_CON_CONDON : MAX_EXITO_BASE;

        let probabilidad = Math.min(momento.probabilidadBase, 10);

        let afinidadEfectiva = Math.max(personaje.afinidad, 0);
        afinidadEfectiva = Math.min(afinidadEfectiva, MAX_AFINIDAD);

        const porcentajeAfinidad = (afinidadEfectiva / MAX_AFINIDAD) * 40;
        probabilidad += porcentajeAfinidad;

        const nivelNormalizado = Math.min(personaje.nivel, MAX_NIVEL);
        const porcentajeNivel = (nivelNormalizado / MAX_NIVEL) * 30;
        probabilidad += porcentajeNivel;

        if (usarLimiteEspecial) {
            probabilidad += 20;
        }

        const ajustesEstado = {
            'feliz': 15, 'neutral': 0, 'triste': -25, 'enojada': -40,
            'tsundere': -30, 'tímida': -15, 'energica': 10, 'glotona': 12
        };

        probabilidad += ajustesEstado[personaje.estadoAnimo] || 0;
        
        // ===== INTEGRACIÓN CON RPG FANTASÍA =====
        if (typeof fantasiaRPG !== 'undefined' && this.personajeSeleccionado) {
            const bonus = fantasiaRPG.calcularBonusParaHermana(this.personajeSeleccionado);
            probabilidad += bonus;
            
            if (bonus > 0) {
                console.log(`✨ Bonus RPG Fantasía: +${bonus.toFixed(1)}% para ${personaje.nombre}`);
            }
        }
        // ========================================

        probabilidad = Math.max(1, probabilidad);
        probabilidad = Math.min(probabilidad, limiteMaximo);

        return Math.round(probabilidad);
    }

    // ====================
    // SISTEMA DE MOMENTOS ÍNTIMOS
    // ====================

    intentarMomentoIntimo(personajeId, momentoId) {
        const personaje = this.datosPersonajes[personajeId];
        const momento = personaje.momentosIntimos.find(m => m.id === momentoId);

        if (!momento) {
            this.mostrarNotificacion('❌ Momento íntimo no encontrado');
            return false;
        }

        if (personaje.nivel < (momento.nivelRequerido || 1)) {
            this.mostrarNotificacion(`❌ Necesitas nivel ${momento.nivelRequerido} para este momento íntimo`);
            return false;
        }

        if (this.condones < momento.condonesRequeridos) {
            this.mostrarNotificacion(`❌ Necesitas ${momento.condonesRequeridos} condones normales`);
            return false;
        }

        if (this.condones001 < momento.condones001Requeridos) {
            this.mostrarNotificacion(`❌ Necesitas ${momento.condones001Requeridos} condones 0.01`);
            return false;
        }

        let usarCondonEspecial = false;
        if (this.condones001 > 0 && momento.condones001Requeridos === 0) {
            const mensaje = `💎 ¿Quieres usar un CONDÓN 0.01?\n\n` +
                           `• +20% probabilidad de éxito\n` +
                           `• +80% afinidad obtenida\n` +
                           `• Puede superar el límite del 80% (hasta 100%)\n` +
                           `• Se sentirá MÁS RICO para ${personaje.nombre.split(' ')[0]}\n\n` +
                           `Tienes: ${this.condones001} condones 0.01 disponibles`;

            usarCondonEspecial = confirm(mensaje);
        }

        const probabilidadReal = this.calcularProbabilidadMomento(personaje, momento, usarCondonEspecial);

        if (usarCondonEspecial) {
            this.mostrarNotificacion(`💎 Condón 0.01 activado! Éxito: ${probabilidadReal}% (Máximo: 100%)`);
        }

        console.log(`🎯 Probabilidad final para ${momento.nombre}: ${probabilidadReal}%`);
        const exito = Math.random() * 100 < probabilidadReal;

        if (exito) {
            this.condones -= momento.condonesRequeridos;
            if (usarCondonEspecial || momento.condones001Requeridos > 0) {
                this.condones001 -= (usarCondonEspecial ? 1 : momento.condones001Requeridos);
            }
            this.guardarCondones();
            this.guardarCondones001();

            let afinidadGanada = momento.afinidad;
            let expGanada = momento.exp;

            if (usarCondonEspecial || momento.condones001Requeridos > 0) {
                afinidadGanada = Math.round(afinidadGanada * 1.8);
                expGanada = Math.round(expGanada * 1.5);
                this.mostrarNotificacion(`💎 ¡CONDÓN 0.01! +80% afinidad, +50% EXP, +20% éxito`);

                const mensajesRico = [
                    `💖 ${personaje.nombre.split(' ')[0]} gime más fuerte con el condón 0.01`,
                    `✨ ${personaje.nombre.split(' ')[0]} siente cada movimiento intensificado`,
                    `🔥 La sensación es tan buena que ${personaje.nombre.split(' ')[0]} tiembla`,
                    `🎇 El condón 0.01 hace que ${personaje.nombre.split(' ')[0]} llegue al orgasmo más rápido`
                ];
                const mensajeAleatorio = mensajesRico[Math.floor(Math.random() * mensajesRico.length)];
                this.mostrarNotificacion(mensajeAleatorio);
            }

            this.agregarEXP(personajeId, expGanada);
            personaje.afinidad = Math.min(personaje.afinidad + afinidadGanada, 200);
            personaje.estadoAnimo = 'feliz';

            console.log(`✅ ¡${momento.nombre} exitoso con ${personaje.nombre}!`);
            this.mostrarNotificacion(`💖 ¡${momento.nombre} exitoso! +${afinidadGanada} afinidad, +${expGanada} EXP`);

            this.cargarVideoMomentoIntimo(personajeId, momento);
            return true;
        } else {
            this.condones -= momento.condonesRequeridos;
            if (usarCondonEspecial || momento.condones001Requeridos > 0) {
                this.condones001 -= (usarCondonEspecial ? 1 : momento.condones001Requeridos);
            }
            this.guardarCondones();
            this.guardarCondones001();

            personaje.estadoAnimo = 'enojada';
            const perdidaAfinidad = Math.floor(momento.afinidad / 3);
            personaje.afinidad = Math.max(personaje.afinidad - perdidaAfinidad, -100);

            console.log(`❌ ${momento.nombre} falló con ${personaje.nombre}`);
            this.mostrarNotificacion(`😠 ${momento.nombre} falló. ${personaje.nombre} se enojó. Pérdida de afinidad.`);

            this.actualizarVistaConPersonaje();
            return false;
        }
    }

    // ====================
    // NUEVA FUNCIÓN PARA INTENTAR MOMENTO GRUPAL
    // ====================

    intentarMomentoGrupal(tipo, id) {
        const momento = this.momentosGrupales[tipo].find(m => m.id === id);
        if (!momento) return false;

        for (const integranteId of momento.integrantes) {
            const personaje = this.datosPersonajes[integranteId];
            if (personaje.nivel < momento.nivelRequerido) {
                this.mostrarNotificacion(`❌ ${personaje.nombre} necesita nivel ${momento.nivelRequerido}`);
                return false;
            }
            if (personaje.afinidad < momento.afinidadRequerida) {
                this.mostrarNotificacion(`❌ ${personaje.nombre} necesita ${momento.afinidadRequerida} de afinidad`);
                return false;
            }
        }

        if (this.condones001 < momento.condones001Requeridos) {
            this.mostrarNotificacion(`❌ Necesitas ${momento.condones001Requeridos} condones 0.01 (1 por cada chica)`);
            return false;
        }

        this.condones001 -= momento.condones001Requeridos;
        this.guardarCondones001();

        for (const integranteId of momento.integrantes) {
            const personaje = this.datosPersonajes[integranteId];
            personaje.afinidad = Math.min(personaje.afinidad + momento.afinidadGanada / momento.integrantes.length, 200);
            personaje.estadoAnimo = 'feliz';
            if (integranteId === this.personajeSeleccionado) {
                this.agregarEXP(integranteId, momento.expGanada / momento.integrantes.length);
            }
        }

        this.guardarDatosPersonajes();

        this.mostrarNotificacion(`🎉 ¡${momento.nombre} exitoso! +${momento.afinidadGanada} afinidad total, +${momento.expGanada} EXP`);
        this.mostrarReproductorVideo({
            driveId: momento.videoId,
            titulo: momento.tituloCompleto,
            duracion: '5:00',
            esExplicito: true
        }, { nombre: 'Las Quintillizas', color: '#FF1493', imagen: momento.imagen });

        return true;
    }

    // ====================
    // FUNCIÓN PARA ACTUALIZAR BONUS DE FANTASÍA
    // ====================

    actualizarBonusFantasia() {
        if (this.personajeSeleccionado && typeof fantasiaRPG !== 'undefined') {
            const bonus = fantasiaRPG.calcularBonusParaHermana(this.personajeSeleccionado);
            this.mostrarNotificacion(`✨ Bonus actual de stats: +${bonus.toFixed(1)}%`);
            return bonus;
        }
        return 0;
    }

    // ====================
    // FUNCIONES DE UI - PÁGINA PRINCIPAL
    // ====================

    cargarPaginaPrincipal() {
        return `
            <div style="max-width: 1400px; margin: 0 auto; padding: 20px;">
                <h1 style="text-align: center; color: #FF1493; margin-bottom: 10px; font-size: 3rem;">
                    🎮 RPG QUINTILLIZAS NAKANO - SISTEMA DIFICULTOSO
                </h1>
                <p style="text-align: center; opacity: 0.8; margin-bottom: 40px; font-size: 1.2rem;">
                    Conquista a las 5 hermanas. Gana dinero estudiando, gasta en conquistarlas. <strong>¡Es difícil!</strong>
                </p>

                <!-- BOTÓN RPG FANTASÍA -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <button class="card-button" onclick="cargarPaginaFantasiaRPG()"
                            style="background: linear-gradient(135deg, gold, #8A5AF7); padding: 20px 50px; font-size: 1.5rem; border-radius: 50px; animation: pulse 2s infinite;">
                        ⚔️ RPG FANTASÍA - COMBATE POR PISOS ⚔️
                    </button>
                    <p style="margin-top: 10px; opacity: 0.8;">
                        Gana piedras, sube stats y obtén bonus de hasta +10% en momentos íntimos
                    </p>
                </div>

                <div style="text-align: center; margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
                    <button class="card-button" onclick="quintillizasRPG.iniciarFlujoGrupal()"
                            style="background: linear-gradient(135deg, #FF1493, #8A5AF7); padding: 20px 50px; font-size: 1.5rem; border-radius: 50px; animation: pulse 2s infinite; width: 100%; max-width: 500px;">
                        👯‍♀️ MOMENTOS ESPECIALES EN GRUPO 👯‍♀️
                    </button>
                    <p style="opacity: 0.8; margin-top: -5px;">¡Dúos con hotel o dormitorio! Requieren nivel 8+ y 2 condones 0.01</p>
                    <button class="card-button" onclick="quintillizasRPG.mostrarUIDormitorio()"
                            style="background: linear-gradient(135deg, #4a1a6a, #8A2BE2); padding: 15px 40px; font-size: 1.1rem; border-radius: 50px; width: 100%; max-width: 500px;">
                        🛏️ MI DORMITORIO — Nivel: ${['Sin decorar','Básico','Romántico','Lujoso'][this._dormitorioNivel()]}
                    </button>
                </div>

                <div style="background: rgba(255, 20, 147, 0.1); border-radius: 20px; padding: 25px; margin-bottom: 40px; border: 2px solid #FF1493;">
                    <h3 style="color: #FFD166; margin-bottom: 15px;">📊 ESTADO ACTUAL</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div>
                            <div style="color: #FF69B4; font-size: 0.9rem;">👤 Personaje Seleccionado</div>
                            <div style="font-size: 1.3rem; font-weight: bold;">
                                ${this.personajeSeleccionado ? this.datosPersonajes[this.personajeSeleccionado].nombre : 'NINGUNO'}
                            </div>
                        </div>
                        <div>
                            <div style="color: #FF69B4; font-size: 0.9rem;">💰 Dinero Disponible</div>
                            <div style="font-size: 1.3rem; font-weight: bold; color: #FFD166;">
                                S/. ${sistemaEconomia.obtenerDinero().toFixed(2)}
                            </div>
                        </div>
                        <div>
                            <div style="color: #FF69B4; font-size: 0.9rem;">🛒 Condones Normales</div>
                            <div style="font-size: 1.3rem; font-weight: bold; color: #4CAF50;">
                                ${this.condones} unidades
                            </div>
                        </div>
                        <div>
                            <div style="color: #FF69B4; font-size: 0.9rem;">💎 Condones 0.01</div>
                            <div style="font-size: 1.3rem; font-weight: bold; color: #5864F5;">
                                ${this.condones001} unidades
                            </div>
                        </div>
                        ${typeof fantasiaRPG !== 'undefined' && this.personajeSeleccionado ? `
                        <div>
                            <div style="color: gold; font-size: 0.9rem;">⚔️ Bonus Fantasía</div>
                            <div style="font-size: 1.3rem; font-weight: bold; color: gold;">
                                +${fantasiaRPG.calcularBonusParaHermana(this.personajeSeleccionado).toFixed(1)}%
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <h2 style="text-align: center; color: #FFD166; margin-bottom: 30px;">💖 SELECCIONA UNA HERMANA</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; margin-bottom: 50px;">
                    ${this.crearCardsPersonajes()}
                </div>

                <div style="background: linear-gradient(135deg, rgba(88, 100, 245, 0.1), rgba(138, 90, 247, 0.1)); border-radius: 20px; padding: 25px; margin-bottom: 40px; border: 2px solid #5864F5;">
                    <h3 style="color: #5864F5; margin-bottom: 20px;">🛍️ TIENDA DE CONDONES</h3>
                    <p style="opacity: 0.8; margin-bottom: 20px;">
                        <strong>Condones Normales (S/.50):</strong> Para momentos íntimos básicos<br>
                        <strong>Condones 0.01 (S/.200):</strong> ¡ESPECIAL! +20% éxito, +80% afinidad, hasta 100% de éxito
                    </p>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                        <div style="background: rgba(76, 175, 80, 0.1); border-radius: 15px; padding: 20px; border: 2px solid #4CAF50;">
                            <h4 style="color: #4CAF50; margin-bottom: 15px;">🛒 Condones Normales</h4>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                <button class="card-button" onclick="comprarCondonesRPG(1)" style="background: linear-gradient(135deg, #4CAF50, #2E7D32);">1 Condón - S/.50</button>
                                <button class="card-button" onclick="comprarCondonesRPG(5)" style="background: linear-gradient(135deg, #4CAF50, #2E7D32);">5 Condones - S/.250</button>
                                <button class="card-button" onclick="comprarCondonesRPG(10)" style="background: linear-gradient(135deg, #4CAF50, #2E7D32);">10 Condones - S/.500</button>
                            </div>
                        </div>
                        <div style="background: rgba(88, 100, 245, 0.1); border-radius: 15px; padding: 20px; border: 2px solid #5864F5;">
                            <h4 style="color: #5864F5; margin-bottom: 15px;">💎 Condones 0.01 ESPECIALES</h4>
                            <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 15px;">
                                <strong>¡EFECTOS ESPECIALES!</strong><br>• +20% probabilidad de éxito<br>• +80% afinidad obtenida<br>• Puede superar límite 80% (hasta 100%)<br>• ¡Se siente MÁS RICO para ellas!<br>• <strong>¡NECESARIOS PARA MOMENTOS GRUPALES!</strong>
                            </p>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                <button class="card-button" onclick="comprarCondones001RPG(1)" style="background: linear-gradient(135deg, #5864F5, #8A5AF7);">1 Condón 0.01 - S/.200</button>
                                <button class="card-button" onclick="comprarCondones001RPG(3)" style="background: linear-gradient(135deg, #5864F5, #8A5AF7);">3 Condones 0.01 - S/.600</button>
                                <button class="card-button" onclick="comprarCondones001RPG(5)" style="background: linear-gradient(135deg, #5864F5, #8A5AF7);">5 Condones 0.01 - S/.1000</button>
                                <button class="card-button" onclick="comprarCondones001RPG(10)" style="background: linear-gradient(135deg, #5864F5, #8A5AF7);">10 Condones 0.01 - S/.2000</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="background: rgba(255, 209, 102, 0.1); border-radius: 20px; padding: 25px; border-left: 5px solid #FFD166;">
                    <h4 style="color: #FFD166; margin-bottom: 15px;">📖 SISTEMA CORREGIDO - ¡AHORA SÍ FUNCIONA!</h4>
                    <ol style="padding-left: 20px; opacity: 0.8;">
                        <li><strong>Éxito máximo:</strong> 80% sin condón | 100% con condón 0.01</li>
                        <li><strong>Afinidad (0-200):</strong> Contribuye 40% máximo (solo con 200 puntos)</li>
                        <li><strong>Nivel (1-10):</strong> Contribuye 30% máximo (solo nivel 10)</li>
                        <li><strong>Condón 0.01:</strong> +20% éxito, +80% afinidad obtenida</li>
                        <li><strong>Estado de ánimo:</strong> Afecta de -40% a +15%</li>
                        <li><strong>Probabilidad base:</strong> Solo algunos momentos (0-10%)</li>
                        <li><strong style="color: gold;">NUEVO - RPG FANTASÍA:</strong> Hasta +10% bonus según tus stats</li>
                        <li><strong style="color: #FF1493;">MOMENTOS GRUPALES:</strong> 100% de éxito si cumples requisitos, requieren condones 0.01 (1 por chica)</li>
                    </ol>
                    <p style="margin-top: 15px; color: #4CAF50; font-weight: bold;">
                        ✅ ¡CORRECTO! Solo se llega al 80% con afinidad 200 y nivel 10 + bonus de stats
                    </p>
                </div>
            </div>
        `;
    }

    crearCardsPersonajes() {
        const personajesIds = ['ichika', 'nino', 'miku', 'yotsuba', 'itsuki'];

        return personajesIds.map(id => {
            const personaje = this.datosPersonajes[id];
            const esSeleccionado = this.personajeSeleccionado === id;

            // Calcular la probabilidad base para un momento típico (ejemplo)
            const momentoEjemplo = personaje.momentosIntimos[0];
            const probSinCondon = momentoEjemplo ? this.calcularProbabilidadMomento(personaje, momentoEjemplo, false) : 0;
            const probConCondon = momentoEjemplo ? this.calcularProbabilidadMomento(personaje, momentoEjemplo, true) : 0;
            
            // Bonus de fantasía
            const bonusFantasia = typeof fantasiaRPG !== 'undefined' ? fantasiaRPG.calcularBonusParaHermana(id) : 0;

            return `
                <div class="personaje-card"
                     style="border: 2px solid ${personaje.color}; ${esSeleccionado ? 'border-width: 4px; box-shadow: 0 0 20px ' + personaje.color + '50;' : ''}; background: rgba(255,255,255,0.05); border-radius: 15px; padding: 20px; cursor: pointer; transition: all 0.3s ease;"
                     onclick="seleccionarPersonajeRPG('${id}')">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <div style="position: relative;">
                            <img src="${personaje.imagen}"
                                 alt="${personaje.nombre}"
                                 style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 3px solid ${personaje.color};">
                            ${esSeleccionado ?
                                `<div style="position: absolute; top: -5px; right: -5px; background: ${personaje.color}; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; border: 2px solid white;">✓</div>`
                                : ''}
                        </div>
                        <div>
                            <h3 style="color: ${personaje.color}; margin: 0;">${personaje.nombre}</h3>
                            <p style="opacity: 0.7; margin: 5px 0 0 0; font-size: 0.9rem;">Nivel ${personaje.nivel} • ${personaje.dificultad.toUpperCase()}</p>
                        </div>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 5px; overflow: hidden;">
                            <div style="background: ${personaje.color}; width: ${(personaje.exp / personaje.expNecesaria) * 100}%; height: 100%;"></div>
                        </div>
                        <p style="font-size: 0.9rem; margin-top: 5px; color: ${personaje.color};">${personaje.exp}/${personaje.expNecesaria} EXP</p>
                    </div>

                    <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 15px;">${personaje.descripcion}</p>

                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; opacity: 0.7;">
                        <div>💝 ${personaje.afinidad >= 0 ? '+' : ''}${personaje.afinidad}/200</div>
                        <div>${this.obtenerEmojiEstado(personaje.estadoAnimo)} ${personaje.estadoAnimo.toUpperCase()}</div>
                    </div>

                    <!-- Mostrar fórmula de probabilidad -->
                    <div style="background: rgba(255, 20, 147, 0.15); border-radius: 8px; padding: 10px; margin: 10px 0; font-size: 0.85rem; border: 1px dashed ${personaje.color};">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>🎯 Prob. Actual (ejemplo):</span>
                            <span style="color: ${probSinCondon > 70 ? '#4CAF50' : '#FFD166'}; font-weight: bold;">${probSinCondon}%</span>
                        </div>
                        <div style="font-size: 0.75rem; opacity: 0.8; line-height: 1.4;">
                            📊 Fórmula: Base (${momentoEjemplo ? momentoEjemplo.probabilidadBase : 0}%) +
                            Afinidad (${Math.round(Math.min(Math.max(personaje.afinidad, 0), 200) / 200 * 40)}%) +
                            Nivel (${Math.round(personaje.nivel / 10 * 30)}%) +
                            Estado (${this.obtenerAjusteEstadoTexto(personaje.estadoAnimo)})
                            = ${probSinCondon}%
                            <br>💎 Con condón 0.01: <strong style="color:#5864F5;">${probConCondon}%</strong> (hasta 100%)
                            ${bonusFantasia > 0 ? `
                            <br><span style="color: gold;">✨ Bonus Fantasía: +${bonusFantasia.toFixed(1)}%</span>
                            ` : ''}
                        </div>
                    </div>

                    <div style="background: rgba(255, 20, 147, 0.1); padding: 8px; border-radius: 8px; margin-top: 10px; text-align: center;">
                        <span style="font-size: 0.8rem; color: #FF1493;">🔞 Nivel ${personaje.nivelRequeridoParaIntimos}+ para íntimos</span>
                    </div>

                    ${esSeleccionado ?
                        `<div style="background: ${personaje.color}; color: white; padding: 8px; border-radius: 10px; margin-top: 10px; text-align: center; font-weight: bold;">✅ SELECCIONADA</div>`
                        : ''}
                </div>
            `;
        }).join('');
    }

    // ====================
    // PANTALLA MOMENTOS GRUPALES — NUEVO FLUJO
    // ====================

    cargarPantallaMomentosGrupales() {
        this.iniciarFlujoGrupal();
    }

    // ====================
    // SISTEMA DORMITORIO
    // ====================

    _dormitorioInicializar() {
        if (this._dormitorio) return;
        try {
            const d = localStorage.getItem('dormitorio_datos');
            this._dormitorio = d ? JSON.parse(d) : {
                items: { velas: false, flores: false, almohadasAmor: false, lucesLED: false, champagne: false, alfombra: false, cortinas: false, espejo: false }
            };
        } catch { 
            this._dormitorio = { items: { velas: false, flores: false, almohadasAmor: false, lucesLED: false, champagne: false, alfombra: false, cortinas: false, espejo: false } };
        }
    }

    _dormitorioGuardar() {
        localStorage.setItem('dormitorio_datos', JSON.stringify(this._dormitorio));
        this.supabaseGuardar('dormitorio_datos', this._dormitorio);
    }

    _dormitorioNivel() {
        this._dormitorioInicializar();
        const cant = Object.values(this._dormitorio.items).filter(Boolean).length;
        if (cant >= 6) return 3;
        if (cant >= 3) return 2;
        if (cant >= 1) return 1;
        return 0;
    }

    dormitorioComprarItem(itemKey) {
        this._dormitorioInicializar();
        const precios = {
            velas: { precio: 200, nombre: '🕯️ Velas románticas' },
            flores: { precio: 350, nombre: '🌸 Flores y pétalos' },
            almohadasAmor: { precio: 250, nombre: '💕 Almohadas de amor' },
            lucesLED: { precio: 500, nombre: '✨ Luces LED' },
            champagne: { precio: 600, nombre: '🍾 Champagne' },
            alfombra: { precio: 400, nombre: '🟥 Alfombra de piel' },
            cortinas: { precio: 450, nombre: '🪟 Cortinas de terciopelo' },
            espejo: { precio: 800, nombre: '🪞 Espejo de cuerpo entero' }
        };
        const item = precios[itemKey];
        if (!item) return;
        if (this._dormitorio.items[itemKey]) { this.mostrarNotificacion('❌ Ya tienes ese item'); return; }
        if (!sistemaEconomia || sistemaEconomia.obtenerDinero() < item.precio) { this.mostrarNotificacion('❌ No tienes suficientes soles'); return; }
        sistemaEconomia.agregarDinero(-item.precio);
        this._dormitorio.items[itemKey] = true;
        this._dormitorioGuardar();
        this.mostrarNotificacion(`✅ ${item.nombre} comprado!`);
        this.mostrarUIDormitorio();
    }

    mostrarUIDormitorio() {
        this._dormitorioInicializar();
        const items = this._dormitorio.items;
        const nivel = this._dormitorioNivel();
        const nivelNombre = ['Sin decorar 😅', 'Básico 🕯️', 'Romántico 🌸', 'Lujoso ✨'][nivel];

        const catalogo = [
            { key: 'velas',         nombre: '🕯️ Velas románticas',       precio: 200, desc: 'Luz cálida y ambiente íntimo' },
            { key: 'flores',        nombre: '🌸 Flores y pétalos',        precio: 350, desc: 'Pétalos de rosa esparcidos' },
            { key: 'almohadasAmor', nombre: '💕 Almohadas de amor',       precio: 250, desc: 'Almohadas con corazones bordados' },
            { key: 'lucesLED',      nombre: '✨ Luces LED',               precio: 500, desc: 'Luces de colores en el techo' },
            { key: 'champagne',     nombre: '🍾 Champagne',               precio: 600, desc: 'Botella de champagne fría' },
            { key: 'alfombra',      nombre: '🟥 Alfombra de piel',        precio: 400, desc: 'Alfombra suave y cálida' },
            { key: 'cortinas',      nombre: '🪟 Cortinas de terciopelo',  precio: 450, desc: 'Cortinas opacas y elegantes' },
            { key: 'espejo',        nombre: '🪞 Espejo de cuerpo entero', precio: 800, desc: 'Espejo grande con marco dorado' },
        ];

        const itemsHTML = catalogo.map(it => {
            const comprado = items[it.key];
            return `
                <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:15px;
                            border:2px solid ${comprado ? '#4CAF50' : 'rgba(255,255,255,0.1)'};
                            display:flex;justify-content:space-between;align-items:center;gap:10px;">
                    <div>
                        <div style="font-weight:bold;">${it.nombre}</div>
                        <div style="font-size:0.8rem;opacity:0.6;">${it.desc}</div>
                    </div>
                    ${comprado
                        ? `<div style="color:#4CAF50;font-weight:bold;white-space:nowrap;">✅ Comprado</div>`
                        : `<button class="card-button" onclick="quintillizasRPG.dormitorioComprarItem('${it.key}')"
                                   style="background:linear-gradient(135deg,#FF1493,#8A5AF7);padding:8px 15px;white-space:nowrap;font-size:0.85rem;">
                               ${it.precio} 💰
                           </button>`}
                </div>`;
        }).join('');

        // Preview visual con overlays
        const previewItems = [
            items.lucesLED ? `<div style="position:absolute;top:0;left:0;width:100%;height:6px;background:repeating-linear-gradient(90deg,#FF69B4 0,#FF69B4 8px,transparent 8px,transparent 16px);"></div>` : '',
            items.velas ? `<span style="position:absolute;bottom:48px;left:15px;font-size:1.3rem;">🕯️</span><span style="position:absolute;bottom:48px;right:15px;font-size:1.3rem;">🕯️</span>` : '',
            items.flores ? `<span style="position:absolute;bottom:32px;left:50%;transform:translateX(-50%);font-size:1rem;">🌸🌹🌸</span>` : '',
            items.champagne ? `<span style="position:absolute;top:10px;right:10px;font-size:1.2rem;">🍾</span>` : '',
            items.almohadasAmor ? `<span style="position:absolute;bottom:58px;left:50%;transform:translateX(-50%);font-size:0.9rem;">💕💕</span>` : '',
            items.espejo ? `<span style="position:absolute;top:10px;left:10px;font-size:1.2rem;">🪞</span>` : '',
        ].join('');

        const mangaSection = document.getElementById('manga-section');
        if (!mangaSection) return;
        mangaSection.innerHTML = `
            <div style="max-width:900px;margin:0 auto;padding:20px;">
                <h1 style="text-align:center;color:#FF1493;margin-bottom:5px;">🛏️ MI DORMITORIO</h1>
                <p style="text-align:center;color:#FFD166;margin-bottom:25px;">Nivel: ${nivelNombre}</p>

                <div style="position:relative;width:100%;height:180px;border-radius:20px;overflow:hidden;
                            background-image:url('https://pbs.twimg.com/media/HC_g7mxboAAPgzW?format=jpg&name=medium');
                            background-size:cover;background-position:center;
                            border:2px solid ${nivel >= 2 ? '#FF1493' : 'rgba(255,255,255,0.1)'};margin-bottom:25px;">
                    <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.35);border-radius:18px;"></div>
                    ${previewItems}
                    <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);
                                width:180px;height:70px;background:#2a1a40;border-radius:10px 10px 0 0;border-top:10px solid #4a2a60;"></div>
                    <div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);
                                width:164px;height:30px;background:#e8d5f5;border-radius:6px 6px 0 0;"></div>
                    ${nivel === 0 ? `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-60%);text-align:center;opacity:0.4;font-size:0.8rem;">Decora tu dormitorio para usarlo</div>` : ''}
                </div>

                <div style="background:rgba(255,20,147,0.1);border:1px solid rgba(255,20,147,0.3);border-radius:12px;padding:15px;margin-bottom:20px;text-align:center;">
                    <p style="font-size:0.9rem;">Para momentos grupales necesitas <strong style="color:#FF1493;">nivel Romántico o superior</strong></p>
                    <div style="display:flex;justify-content:center;gap:15px;margin-top:10px;font-size:0.85rem;flex-wrap:wrap;">
                        <span style="${nivel >= 1 ? 'color:#4CAF50' : 'opacity:0.4'}">1️⃣ Básico (1 item)</span>
                        <span style="${nivel >= 2 ? 'color:#FF1493' : 'opacity:0.4'}">2️⃣ Romántico (3 items) ✅</span>
                        <span style="${nivel >= 3 ? 'color:gold' : 'opacity:0.4'}">3️⃣ Lujoso (6 items)</span>
                    </div>
                </div>

                <h3 style="color:#FFD166;margin-bottom:15px;">🛒 Comprar Items</h3>
                <div style="display:grid;gap:10px;margin-bottom:25px;">${itemsHTML}</div>

                <button class="card-button" onclick="quintillizasRPG.volverAPaginaPrincipal()"
                        style="width:100%;background:linear-gradient(135deg,#5864F5,#8A5AF7);padding:15px;">↩️ Volver al RPG</button>
            </div>`;
    }

    // ====================
    // FLUJO GRUPAL COMPLETO
    // ====================

    _modalFlujo(contenido) {
        this._cerrarModalFlujo();
        const overlay = document.createElement('div');
        overlay.id = 'flujo-modal';
        overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.92);display:flex;justify-content:center;align-items:center;z-index:10000;padding:20px;`;
        overlay.innerHTML = `<div style="background:linear-gradient(135deg,#1a1a2e,#16213e);border:2px solid #FF1493;border-radius:25px;padding:30px;max-width:500px;width:100%;max-height:90vh;overflow-y:auto;">${contenido}</div>`;
        document.body.appendChild(overlay);
    }

    _cerrarModalFlujo() {
        const m = document.getElementById('flujo-modal');
        if (m) m.remove();
    }

    iniciarFlujoGrupal() {
        if (!this.personajeSeleccionado) {
            this._modalFlujo(`<div style="text-align:center;"><p>❌ No tienes ninguna chica seleccionada.</p><button class="card-button" onclick="quintillizasRPG._cerrarModalFlujo()" style="margin-top:15px;background:linear-gradient(135deg,#666,#333);padding:10px 25px;">Cerrar</button></div>`);
            return;
        }

        const noviaId = this.personajeSeleccionado;
        const novia = this.datosPersonajes[noviaId];
        const NIVEL_REQ = 8;

        const RECHAZOS = {
            ichika: ["Ichika te mira con una sonrisa forzada... 'Lo siento, creo que no nos conocemos tan bien todavía...' 💔", "Ichika se sonroja y voltea la vista. 'Eso es... demasiado pronto, ¿no crees?' 😳"],
            nino:   ["Nino te lanza una mirada asesina. '¿QUÉEEEE?! ¿Estás LOCO?! ¡NI EN SUEÑOS, IDIOTA!' 😡", "Nino te avienta el cojín a la cara. '¡PERVERTIDO! ¡Largo de aquí!' 💢"],
            miku:   ["Miku baja la mirada, sus auriculares temblando. 'Y-yo... todavía no... disculpa...' 🎧", "Miku se esconde detrás de sus auriculares. 'N-no es que no quiera... aún no...' 😶"],
            yotsuba:["Yotsuba ríe nerviosamente. '¡Ehh! ¡Eso es mucho muy rápido! ¡Gana más puntos conmigo!' 🏃", "Yotsuba agita los brazos. '¡Todavía no llegamos a ese nivel! ¡Sigue intentando!' 😅"],
            itsuki: ["Itsuki frunce el ceño con dignidad. 'Eso requiere más confianza. Aún no la has ganado.' 😤", "Itsuki cruza los brazos. '¿Me tomas por alguien fácil? Esfuérzate mucho más.' 🍰"]
        };

        if (novia.nivel < NIVEL_REQ) {
            const rechazo = RECHAZOS[noviaId][Math.floor(Math.random() * 2)];
            this._modalFlujo(`
                <div style="text-align:center;">
                    <img src="${novia.imagen}" style="width:100px;height:100px;border-radius:50%;border:3px solid ${novia.color};object-fit:cover;margin-bottom:15px;">
                    <h2 style="color:${novia.color};margin-bottom:15px;">😤 RECHAZADO</h2>
                    <p style="font-size:1rem;line-height:1.6;">${rechazo}</p>
                    <p style="margin-top:15px;opacity:0.6;font-size:0.85rem;">Nivel actual: ${novia.nivel}/${NIVEL_REQ} ⭐</p>
                    <button class="card-button" onclick="quintillizasRPG._cerrarModalFlujo()" style="margin-top:20px;background:linear-gradient(135deg,#FF6B6B,#FF1493);padding:12px 30px;">Entendido 😢</button>
                </div>`);
            return;
        }

        // Elegir segunda chica
        const chicasHTML = Object.entries(this.datosPersonajes)
            .filter(([id]) => id !== noviaId)
            .map(([id, p]) => {
                const ok = p.nivel >= NIVEL_REQ;
                return `
                    <div onclick="${ok ? `quintillizasRPG._elegirSegundaChica('${noviaId}','${id}')` : ''}"
                         style="text-align:center;padding:15px;border-radius:15px;border:2px solid ${ok ? p.color : '#444'};
                                background:${ok ? p.color + '22' : 'rgba(0,0,0,0.3)'};cursor:${ok ? 'pointer' : 'not-allowed'};
                                opacity:${ok ? 1 : 0.4};transition:transform 0.2s;"
                         ${ok ? `onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"` : ''}>
                        <img src="${p.imagen}" style="width:65px;height:65px;border-radius:50%;border:2px solid ${p.color};object-fit:cover;margin-bottom:8px;">
                        <div style="color:${p.color};font-weight:bold;font-size:0.85rem;">${p.nombre.split(' ')[0]}</div>
                        <div style="font-size:0.75rem;margin-top:4px;opacity:0.8;">${ok ? `✅ Nivel ${p.nivel}` : `🔒 Nivel ${p.nivel}/${NIVEL_REQ}`}</div>
                    </div>`;
            }).join('');

        this._modalFlujo(`
            <div style="text-align:center;">
                <h2 style="color:#FF1493;margin-bottom:8px;">💕 MOMENTO DÚO</h2>
                <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:15px;">
                    <img src="${novia.imagen}" style="width:45px;height:45px;border-radius:50%;border:2px solid ${novia.color};object-fit:cover;">
                    <span style="color:${novia.color};font-weight:bold;">${novia.nombre.split(' ')[0]}</span>
                    <span>+ ¿Quién más?</span>
                </div>
                <p style="opacity:0.6;margin-bottom:15px;font-size:0.85rem;">Elige tu segunda compañera (necesitas nivel 8+)</p>
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:15px;">${chicasHTML}</div>
                <button class="card-button" onclick="quintillizasRPG._cerrarModalFlujo()" style="background:linear-gradient(135deg,#666,#333);padding:10px 25px;">Cancelar</button>
            </div>`);
    }

    _elegirSegundaChica(noviaId, segundaId) {
        if (this.condones001 < 2) {
            const novia = this.datosPersonajes[noviaId];
            const segunda = this.datosPersonajes[segundaId];
            this._modalFlujo(`
                <div style="text-align:center;">
                    <h2 style="color:#5864F5;margin-bottom:15px;">💎 FALTAN CONDONES 0.01</h2>
                    <div style="display:flex;justify-content:center;gap:15px;margin-bottom:20px;">
                        <img src="${novia.imagen}" style="width:60px;height:60px;border-radius:50%;border:2px solid ${novia.color};object-fit:cover;">
                        <img src="${segunda.imagen}" style="width:60px;height:60px;border-radius:50%;border:2px solid ${segunda.color};object-fit:cover;">
                    </div>
                    <p>Necesitas <strong style="color:#5864F5;">2 condones 0.01</strong></p>
                    <p style="opacity:0.6;margin-top:8px;">Tienes: ${this.condones001}/2</p>
                    <button class="card-button" onclick="quintillizasRPG._cerrarModalFlujo()" style="margin-top:20px;background:linear-gradient(135deg,#5864F5,#8A5AF7);padding:12px 30px;">Entendido</button>
                </div>`);
            return;
        }
        this._votacionLugar(noviaId, segundaId);
    }

    _votacionLugar(noviaId, segundaId) {
        const novia = this.datosPersonajes[noviaId];
        const segunda = this.datosPersonajes[segundaId];
        const VOTOS = {
            ichika: { hotel: "Ichika sonríe coqueta. '¿Un hotel? Me parece romántico~ 🏨'", dorm: "Ichika te mira curiosa. '¿Tu dormitorio? Suena... íntimo~' 😏" },
            nino:   { hotel: "Nino resopla. 'Si vas a invitarme, que sea a algo decente. Hotel.' 💅", dorm: "Nino entrecierra los ojos. '¿Tu cuarto? Más vale que esté presentable, idiota.' 😤" },
            miku:   { hotel: "Miku susurra tímidamente. 'Un... hotel sería bien... más privado...' 🎧", dorm: "Miku se sonroja mucho. 'T-tu dormitorio... como quieras...' 😶" },
            yotsuba:{ hotel: "Yotsuba salta emocionada. '¡HOTEL! ¡Nunca he estado en uno de noche! ¡Vamos!' 🏃", dorm: "Yotsuba sonríe. '¡Tu cuarto está bien! ¡Más cómodo y sin gastar!' 😊" },
            itsuki: { hotel: "Itsuki asiente con elegancia. 'Un hotel es lo mínimo esperado.' 🍰", dorm: "Itsuki te evalúa. 'Tu dormitorio... aceptable, si está bien decorado.' 😒" }
        };
        const prefHotel = { ichika: 0.7, nino: 0.8, miku: 0.5, yotsuba: 0.4, itsuki: 0.7 };
        const lugar = Math.random() < ((prefHotel[noviaId] + prefHotel[segundaId]) / 2) ? 'hotel' : 'dormitorio';

        this._modalFlujo(`
            <div style="text-align:center;">
                <h2 style="color:#FFD166;margin-bottom:20px;">🗳️ ¿DÓNDE VAMOS?</h2>
                <div style="display:flex;justify-content:center;gap:15px;margin-bottom:20px;flex-wrap:wrap;">
                    <div style="background:${novia.color}22;border:2px solid ${novia.color};border-radius:15px;padding:15px;max-width:190px;">
                        <img src="${novia.imagen}" style="width:45px;height:45px;border-radius:50%;border:2px solid ${novia.color};object-fit:cover;margin-bottom:8px;">
                        <p style="font-size:0.82rem;line-height:1.4;">${VOTOS[noviaId][lugar]}</p>
                    </div>
                    <div style="background:${segunda.color}22;border:2px solid ${segunda.color};border-radius:15px;padding:15px;max-width:190px;">
                        <img src="${segunda.imagen}" style="width:45px;height:45px;border-radius:50%;border:2px solid ${segunda.color};object-fit:cover;margin-bottom:8px;">
                        <p style="font-size:0.82rem;line-height:1.4;">${VOTOS[segundaId][lugar]}</p>
                    </div>
                </div>
                <p style="color:#FFD166;font-size:1.1rem;margin-bottom:20px;">¡Acordaron ir a: <strong>${lugar === 'hotel' ? '🏨 Hotel' : '🛏️ Tu Dormitorio'}</strong>!</p>
                <button class="card-button" onclick="quintillizasRPG.${lugar === 'hotel' ? `_seleccionHotel('${noviaId}','${segundaId}')` : `_verificarDormitorio('${noviaId}','${segundaId}')`}"
                        style="background:linear-gradient(135deg,#FF1493,#8A5AF7);padding:15px 35px;">¡Vamos! ${lugar === 'hotel' ? '🏨' : '🛏️'}</button>
                <br><button class="card-button" onclick="quintillizasRPG._cerrarModalFlujo()" style="margin-top:10px;background:linear-gradient(135deg,#666,#333);padding:10px 25px;">Cancelar</button>
            </div>`);
    }

    _seleccionHotel(noviaId, segundaId) {
        const hoteles = [
            { id: 'barato',  nombre: '🏚️ Hotel Económico',    precio: 50,  color: '#9E9E9E', reaccion: '😬 "¿En serio nos trajiste aquí...?"',      img: 'URL_HOTEL_BARATO' },
            { id: 'mediano', nombre: '🏨 Hotel Estándar',      precio: 150, color: '#4CAF50', reaccion: '😊 "Está bastante bien~"',                   img: 'URL_HOTEL_MEDIANO' },
            { id: 'lujoso',  nombre: '👑 Suite Presidencial',  precio: 400, color: '#FFD700', reaccion: '🤩 "¡¡Es INCREÍBLE!!"',                       img: 'URL_HOTEL_LUJOSO' }
        ];
        const dinero = sistemaEconomia ? sistemaEconomia.dinero : 0;
        const hotelesHTML = hoteles.map(h => {
            const ok = dinero >= h.precio;
            return `
                <div onclick="${ok ? `quintillizasRPG._elegirHotel('${noviaId}','${segundaId}','${h.id}')` : ''}"
                     style="border-radius:15px;border:2px solid ${ok ? h.color : '#444'};background:${ok ? h.color + '22' : 'rgba(0,0,0,0.3)'};
                            padding:18px;cursor:${ok ? 'pointer' : 'not-allowed'};opacity:${ok ? 1 : 0.5};transition:transform 0.2s;text-align:center;"
                     ${ok ? `onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'"` : ''}>
                    <h3 style="color:${h.color};margin-bottom:6px;">${h.nombre}</h3>
                    <div style="font-size:1.2rem;font-weight:bold;color:${ok ? h.color : '#666'};">${h.precio} 💰</div>
                    ${!ok ? `<div style="font-size:0.75rem;color:#FF6B6B;margin-top:4px;">Te faltan ${h.precio - dinero} soles</div>` : ''}
                </div>`;
        }).join('');

        this._modalFlujo(`
            <div style="text-align:center;">
                <h2 style="color:#FFD166;margin-bottom:8px;">🏨 ELIGE EL HOTEL</h2>
                <p style="opacity:0.6;margin-bottom:15px;font-size:0.85rem;">Saldo: ${dinero.toFixed(2)} 💰</p>
                <div style="display:grid;gap:12px;margin-bottom:15px;">${hotelesHTML}</div>
                <button class="card-button" onclick="quintillizasRPG._cerrarModalFlujo()" style="background:linear-gradient(135deg,#666,#333);padding:10px 25px;">Cancelar</button>
            </div>`);
    }

    _elegirHotel(noviaId, segundaId, hotelId) {
        const hoteles = {
            barato:  { nombre: '🏚️ Hotel Económico',   precio: 50,  img: 'URL_HOTEL_BARATO',  reaccion: '😬 Las chicas se miran incómodas... "¿En serio nos trajiste aquí?"' },
            mediano: { nombre: '🏨 Hotel Estándar',     precio: 150, img: 'URL_HOTEL_MEDIANO', reaccion: '😊 Las chicas asienten satisfechas. "Está bastante bien~"' },
            lujoso:  { nombre: '👑 Suite Presidencial', precio: 400, img: 'URL_HOTEL_LUJOSO',  reaccion: '🤩 Las chicas quedan boquiabiertas. "¡¡Es increíble!!"' }
        };
        const hotel = hoteles[hotelId];
        if (sistemaEconomia) sistemaEconomia.agregarDinero(-hotel.precio);
        this._mostrarEscenario(noviaId, segundaId, hotel.img, hotel.nombre, hotel.reaccion);
    }

    _verificarDormitorio(noviaId, segundaId) {
        this._dormitorioInicializar();
        const novia = this.datosPersonajes[noviaId];
        const segunda = this.datosPersonajes[segundaId];
        if (this._dormitorioNivel() < 2) {
            const rechazos = [
                `${novia.nombre.split(' ')[0]} arruga la nariz. "¿ESTO es tu cuarto?! ¡IDIOTA PROBETÓN! ¡Esfuérzate más!" 😤`,
                `${segunda.nombre.split(' ')[0]} mira alrededor incómoda. "Necesitas... decorarlo más antes de invitarnos..." 😅`,
                `Ambas se miran. "${novia.nombre.split(' ')[0]}: '¿Hablas en serio?' ${segunda.nombre.split(' ')[0]}: 'Necesita más trabajo...' " 💢`
            ];
            this._modalFlujo(`
                <div style="text-align:center;">
                    <div style="font-size:3rem;margin-bottom:15px;">😤</div>
                    <h2 style="color:#FF6B6B;margin-bottom:15px;">DORMITORIO INSUFICIENTE</h2>
                    <p style="font-size:0.95rem;line-height:1.6;margin-bottom:15px;">${rechazos[Math.floor(Math.random()*3)]}</p>
                    <p style="opacity:0.6;font-size:0.85rem;margin-bottom:20px;">Nivel: ${this._dormitorioNivel()}/3 — Necesitas nivel 2 (romántico)</p>
                    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                        <button class="card-button" onclick="quintillizasRPG._cerrarModalFlujo();quintillizasRPG.mostrarUIDormitorio()" style="background:linear-gradient(135deg,#FF1493,#8A5AF7);padding:12px 20px;">🛏️ Decorar Dormitorio</button>
                        <button class="card-button" onclick="quintillizasRPG._cerrarModalFlujo()" style="background:linear-gradient(135deg,#666,#333);padding:12px 20px;">Cancelar</button>
                    </div>
                </div>`);
            return;
        }
        const nivelNombre = ['','básico','romántico','lujoso'][this._dormitorioNivel()];
        const reaccion = this._dormitorioNivel() >= 3
            ? '🤩 "¡Tu cuarto es increíble! ¡Pusiste mucho esfuerzo~!" 💕'
            : '😊 "Mmm... está bastante romántico aquí..." 🌸';
        this._mostrarEscenario(noviaId, segundaId, 'URL_DORMITORIO', `🛏️ Tu Dormitorio (${nivelNombre})`, reaccion);
    }

    _mostrarEscenario(noviaId, segundaId, imgFondo, lugarNombre, reaccion) {
        this._cerrarModalFlujo();
        const novia = this.datosPersonajes[noviaId];
        const segunda = this.datosPersonajes[segundaId];
        const acciones = [
            { id: 'doble_mamada',  nombre: '😮 Doble Mamada',     desc: 'Las dos te complacen juntas',      color: '#FF1493', dark: '#8A1060' },
            { id: 'doble_paizuri', nombre: '🌸 Doble Paizuri',    desc: 'Las dos usan sus encantos',        color: '#FF69B4', dark: '#C7508A' },
            { id: 'doble_sexo',    nombre: '🔥 Sexo en Grupo',    desc: 'La experiencia completa',          color: '#FF4500', dark: '#A02500' },
            { id: 'beso_trio',     nombre: '💋 Beso de las Tres', desc: 'Un momento único e íntimo',        color: '#E91E63', dark: '#880E4F' },
        ];
        const accionesHTML = acciones.map(a =>
            `<button class="card-button" onclick="quintillizasRPG._ejecutarAccion('${noviaId}','${segundaId}','${a.id}')"
                     style="background:linear-gradient(135deg,${a.color},${a.dark});padding:14px;text-align:left;">
                 <div style="font-weight:bold;">${a.nombre}</div>
                 <div style="font-size:0.8rem;opacity:0.8;margin-top:3px;">${a.desc}</div>
             </button>`
        ).join('');

        const DORMITORIO_IMG = 'https://pbs.twimg.com/media/HC_g7mxboAAPgzW?format=jpg&name=medium';
        const esDormitorio = imgFondo === 'URL_DORMITORIO';
        const imgFondoFinal = esDormitorio ? DORMITORIO_IMG : imgFondo;
        const tieneImg = imgFondoFinal && !imgFondoFinal.startsWith('URL_');
        const estiloFondo = tieneImg
            ? `background-image:url('${imgFondoFinal}');background-size:cover;background-position:center;`
            : `background:linear-gradient(135deg,#1a0a2e,#2a1040);`;

        // Overlays de items del dormitorio
        let itemsOverlay = '';
        if (esDormitorio) {
            this._dormitorioInicializar();
            const it = this._dormitorio.items;
            if (it.lucesLED) itemsOverlay += `<div style="position:absolute;top:0;left:0;width:100%;height:8px;background:repeating-linear-gradient(90deg,#FF69B4 0,#FF69B4 10px,transparent 10px,transparent 20px);z-index:1;"></div>`;
            if (it.velas) itemsOverlay += `<div style="position:absolute;bottom:80px;left:30px;font-size:2rem;z-index:1;">🕯️</div><div style="position:absolute;bottom:80px;right:30px;font-size:2rem;z-index:1;">🕯️</div>`;
            if (it.flores) itemsOverlay += `<div style="position:absolute;bottom:60px;left:50%;transform:translateX(-50%);font-size:1.5rem;z-index:1;">🌸🌹🌷🌹🌸</div>`;
            if (it.champagne) itemsOverlay += `<div style="position:absolute;top:20px;right:20px;font-size:2rem;z-index:1;">🍾</div>`;
            if (it.almohadasAmor) itemsOverlay += `<div style="position:absolute;bottom:130px;left:50%;transform:translateX(-50%);font-size:1.2rem;z-index:1;">💕 💕</div>`;
        }

        const overlay = document.createElement('div');
        overlay.id = 'escenario-grupal';
        overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;${estiloFondo}display:flex;flex-direction:column;`;
        overlay.innerHTML = `
            ${itemsOverlay}
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.55);"></div>
            <div style="position:relative;z-index:2;display:flex;flex-direction:column;height:100%;padding:20px;max-width:680px;margin:0 auto;width:100%;">
                <div style="text-align:center;margin-bottom:15px;">
                    <h2 style="color:gold;font-size:1.3rem;">${lugarNombre}</h2>
                    <p style="opacity:0.8;font-size:0.9rem;font-style:italic;">${reaccion}</p>
                </div>
                <div style="display:flex;justify-content:center;gap:20px;margin-bottom:20px;">
                    <div style="text-align:center;">
                        <img src="${novia.imagen}" style="width:75px;height:75px;border-radius:50%;border:3px solid ${novia.color};object-fit:cover;">
                        <div style="color:${novia.color};font-weight:bold;margin-top:5px;font-size:0.9rem;">${novia.nombre.split(' ')[0]}</div>
                    </div>
                    <div style="display:flex;align-items:center;font-size:1.5rem;">💕</div>
                    <div style="text-align:center;">
                        <img src="${segunda.imagen}" style="width:75px;height:75px;border-radius:50%;border:3px solid ${segunda.color};object-fit:cover;">
                        <div style="color:${segunda.color};font-weight:bold;margin-top:5px;font-size:0.9rem;">${segunda.nombre.split(' ')[0]}</div>
                    </div>
                </div>
                <div style="flex:1;overflow-y:auto;">
                    <p style="text-align:center;opacity:0.6;font-size:0.85rem;margin-bottom:12px;">¿Qué harán las tres?</p>
                    <div style="display:grid;gap:10px;">${accionesHTML}</div>
                </div>
                <button class="card-button" onclick="document.getElementById('escenario-grupal').remove()" style="margin-top:15px;background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.3);padding:12px;">↩️ Salir</button>
            </div>`;
        document.body.appendChild(overlay);
    }

    _ejecutarAccion(noviaId, segundaId, accionId) {
        this.condones001 -= 2;
        this.guardarCondones001();

        const expGanada = 300;
        const afinGanada = 80;
        this.agregarEXP(noviaId, expGanada);
        this.agregarEXP(segundaId, expGanada);
        this.datosPersonajes[noviaId].afinidad = Math.min(200, this.datosPersonajes[noviaId].afinidad + afinGanada);
        this.datosPersonajes[segundaId].afinidad = Math.min(200, this.datosPersonajes[segundaId].afinidad + afinGanada);
        this.guardarDatosPersonajes();

        // Buscar video
        const duoKey = [noviaId, segundaId].sort().join('_');
        let videoId = null, videoNombre = accionId;
        for (const duo of this.momentosGrupales.duo || []) {
            if (duo.integrantes.slice().sort().join('_') === duoKey) { videoId = duo.videoId; videoNombre = duo.nombre; break; }
        }

        const escenario = document.getElementById('escenario-grupal');
        if (escenario) escenario.remove();

        if (!videoId || videoId.startsWith('ID_VIDEO')) {
            this._modalFlujo(`
                <div style="text-align:center;padding:20px;">
                    <div style="font-size:3rem;margin-bottom:15px;">🎬</div>
                    <h2 style="color:#FF1493;margin-bottom:15px;">¡Momento Completado!</h2>
                    <p style="opacity:0.8;margin-bottom:10px;">+${expGanada} EXP y +${afinGanada} afinidad para ambas 💕</p>
                    <p style="opacity:0.5;font-size:0.85rem;margin-bottom:20px;">(Video no configurado aún)</p>
                    <button class="card-button" onclick="quintillizasRPG._cerrarModalFlujo()" style="background:linear-gradient(135deg,#FF1493,#8A5AF7);padding:12px 30px;">¡Genial! 💕</button>
                </div>`);
            return;
        }

        const novia = this.datosPersonajes[noviaId];
        const segunda = this.datosPersonajes[segundaId];
        const ovVideo = document.createElement('div');
        ovVideo.id = 'video-grupal';
        ovVideo.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.98);z-index:10001;display:flex;justify-content:center;align-items:center;`;
        ovVideo.innerHTML = `
            <div style="max-width:900px;width:95%;background:#1a1a2e;border-radius:25px;padding:20px;border:3px solid #FF1493;">
                <div style="display:flex;justify-content:center;gap:15px;margin-bottom:15px;">
                    <img src="${novia.imagen}" style="width:55px;height:55px;border-radius:50%;border:2px solid ${novia.color};object-fit:cover;">
                    <img src="${segunda.imagen}" style="width:55px;height:55px;border-radius:50%;border:2px solid ${segunda.color};object-fit:cover;">
                </div>
                <h2 style="text-align:center;color:#FF1493;margin-bottom:15px;">🎬 ${videoNombre}</h2>
                <div style="position:relative;padding-bottom:56.25%;height:0;border-radius:12px;overflow:hidden;">
                    <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;"
                            src="https://drive.google.com/file/d/${videoId}/preview"
                            frameborder="0" allow="autoplay;encrypted-media" allowfullscreen></iframe>
                </div>
                <div style="text-align:center;margin-top:15px;">
                    <button class="card-button" onclick="document.getElementById('video-grupal').remove()"
                            style="background:linear-gradient(135deg,#FF1493,#8A5AF7);padding:12px 30px;">↩️ Cerrar</button>
                </div>
            </div>`;
        document.body.appendChild(ovVideo);
    }

    crearCardsMomentosGrupales(tipo) {
        return this.momentosGrupales[tipo].map(momento => {
            const cumpleNivel = momento.integrantes.every(id =>
                this.datosPersonajes[id].nivel >= momento.nivelRequerido
            );

            const cumpleAfinidad = momento.integrantes.every(id =>
                this.datosPersonajes[id].afinidad >= momento.afinidadRequerida
            );

            const tieneCondones = this.condones001 >= momento.condones001Requeridos;
            const puedeIntentar = cumpleNivel && cumpleAfinidad && tieneCondones;

            const nombres = momento.integrantes.map(id => this.datosPersonajes[id].nombre.split(' ')[0]);

            // Calcular probabilidad grupal (es 100% si cumples requisitos)
            const probGrupal = (cumpleNivel && cumpleAfinidad) ? 100 : 0;

            // Desglose de requisitos para la fórmula
            const requisitos = momento.integrantes.map(id => {
                const p = this.datosPersonajes[id];
                return `${p.nombre.split(' ')[0]}: Nvl ${p.nivel}/${momento.nivelRequerido} | Afin ${p.afinidad}/${momento.afinidadRequerida}`;
            }).join('<br>');

            return `
                <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 20px;
                          border: 2px solid ${cumpleNivel && cumpleAfinidad ? '#4CAF50' : '#FF6B6B'};
                          ${puedeIntentar ? 'box-shadow: 0 0 20px #5864F5;' : ''}">

                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <img src="${momento.imagen}"
                             alt="${momento.nombre}"
                             style="width: 60px; height: 60px; border-radius: 10px; object-fit: cover; border: 2px solid #FF1493;"
                             onerror="this.src='https://via.placeholder.com/60x60/FF1493/FFFFFF?text=${nombres[0].charAt(0)}+${nombres[1]?.charAt(0) || ''}'">
                        <div>
                            <h3 style="color: #FFD166; margin: 0 0 5px 0;">${momento.nombre}</h3>
                            <p style="font-size: 0.9rem; opacity: 0.8; margin: 0;">${nombres.join(' • ')}</p>
                        </div>
                    </div>

                    <p style="font-size: 0.95rem; margin-bottom: 15px; min-height: 50px;">${momento.descripcion}</p>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; font-size: 0.9rem;">
                        <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; text-align: center;">
                            <span style="color: #5864F5;">🎯 Nivel ${momento.nivelRequerido}</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; text-align: center;">
                            <span style="color: #4CAF50;">💝 ${momento.afinidadRequerida}</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; text-align: center;">
                            <span style="color: #5864F5;">💎 ${momento.condones001Requeridos}</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; text-align: center;">
                            <span style="color: #FFD166;">💰 ${momento.recompensa}</span>
                        </div>
                    </div>

                    <!-- Mostrar fórmula y probabilidad grupal -->
                    <div style="background: rgba(88, 100, 245, 0.15); border-radius: 8px; padding: 12px; margin: 15px 0; font-size: 0.9rem; border: 1px dashed #5864F5;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-weight: bold;">🎲 Probabilidad Grupal:</span>
                            <span style="color: ${probGrupal === 100 ? '#4CAF50' : '#FF6B6B'}; font-weight: bold; font-size: 1.2rem;">${probGrupal}%</span>
                        </div>
                        <div style="font-size: 0.8rem; opacity: 0.9; line-height: 1.5;">
                            <strong>📊 Fórmula:</strong> La probabilidad es 100% si TODAS las integrantes cumplen:
                            <ul style="margin-top: 5px; padding-left: 20px;">
                                <li><strong>Nivel ≥ ${momento.nivelRequerido}</strong> (actual: ${momento.integrantes.map(id => this.datosPersonajes[id].nivel).join('/')})</li>
                                <li><strong>Afinidad ≥ ${momento.afinidadRequerida}</strong> (actual: ${momento.integrantes.map(id => this.datosPersonajes[id].afinidad).join('/')})</li>
                                <li><strong>Condones 0.01: ${momento.condones001Requeridos}</strong> (tienes: ${this.condones001})</li>
                            </ul>
                            <details style="margin-top:5px;">
                                <summary style="cursor:pointer;">Ver detalles por hermana</summary>
                                <p style="margin-top:5px;">${requisitos.replace(/\|/g, '<br>')}</p>
                            </details>
                        </div>
                    </div>

                    <div style="background: rgba(76, 175, 80, 0.1); padding: 10px; border-radius: 8px; margin-bottom: 15px;">
                        <p style="margin: 0; font-size: 0.9rem; color: #4CAF50; text-align: center;">
                            +${momento.afinidadGanada} afinidad total • +${momento.expGanada} EXP
                        </p>
                    </div>

                    <button class="card-button"
                            onclick="quintillizasRPG.intentarMomentoGrupal('${tipo}', '${momento.id}')"
                            style="width: 100%; padding: 15px; background: ${puedeIntentar ? 'linear-gradient(135deg, #5864F5, #8A5AF7)' : 'rgba(255,255,255,0.1)'};"
                            ${!puedeIntentar ? 'disabled' : ''}>
                        ${!cumpleNivel ? '❌ NIVEL INSUFICIENTE' :
                          !cumpleAfinidad ? '❌ AFINIDAD INSUFICIENTE' :
                          !tieneCondones ? `❌ FALTAN ${momento.condones001Requeridos - this.condones001} CONDONES 0.01` :
                          '💎 INICIAR MOMENTO GRUPAL'}
                    </button>
                </div>
            `;
        }).join('');
    }

    // ====================
    // FUNCIONES DE NAVEGACIÓN Y UI
    // ====================

    volverAPaginaPrincipal() {
        const mangaSection = document.getElementById('manga-section');
        mangaSection.innerHTML = this.cargarPaginaPrincipal();

        const botonVolver = document.createElement('button');
        botonVolver.className = 'btn-atras-especifico';
        botonVolver.innerHTML = '← Volver al Inicio';
        botonVolver.onclick = () => volverAlInicio();
        mangaSection.insertBefore(botonVolver, mangaSection.firstChild);
    }

    seleccionarPersonajeUI(personajeId) {
        this.personajeSeleccionado = personajeId;
        this.guardarPersonajeSeleccionado();
        
        // Actualizar la novia en Fantasía si existe
        if (typeof fantasiaRPG !== 'undefined') {
            fantasiaRPG.actualizarNoviaActual();
            console.log("💖 Novia actualizada en Fantasía desde RPG");
        }

        const personaje = this.datosPersonajes[personajeId];
        this.mostrarNotificacion(`💖 Seleccionaste a ${personaje.nombre} (Nivel ${personaje.nivel}, Afinidad ${personaje.afinidad})`);

        this.actualizarVistaConPersonaje();
    }

    actualizarVistaConPersonaje() {
        const mangaSection = document.getElementById('manga-section');
        if (!mangaSection) return;

        mangaSection.innerHTML = '';

        const botonVolver = document.createElement('button');
        botonVolver.className = 'btn-atras-especifico';
        botonVolver.innerHTML = '← Volver al RPG Principal';
        botonVolver.style.margin = '20px';
        botonVolver.onclick = () => {
            mangaSection.innerHTML = this.cargarPaginaPrincipal();
            const botonInicio = crearBotonVolver(volverAlInicio);
            mangaSection.insertBefore(botonInicio, mangaSection.firstChild);
        };
        mangaSection.appendChild(botonVolver);

        const personajeDiv = document.createElement('div');
        personajeDiv.innerHTML = this.crearUIPersonaje();
        mangaSection.appendChild(personajeDiv);
    }

    crearUIPersonaje() {
        if (!this.personajeSeleccionado) return '<p>Selecciona un personaje primero</p>';

        const personaje = this.datosPersonajes[this.personajeSeleccionado];
        const dinero = sistemaEconomia.obtenerDinero();

        const maxAfinidad = 200;
        const maxNivel = 10;
        const porcentajeAfinidad = Math.min((personaje.afinidad / maxAfinidad) * 100, 100);
        const porcentajeNivel = Math.min((personaje.nivel / maxNivel) * 100, 100);

        const contribucionAfinidad = (Math.min(Math.max(personaje.afinidad, 0), maxAfinidad) / maxAfinidad) * 40;
        const contribucionNivel = (personaje.nivel / maxNivel) * 30;
        const contribucionTotal = contribucionAfinidad + contribucionNivel;
        
        const bonusFantasia = typeof fantasiaRPG !== 'undefined' ? 
            fantasiaRPG.calcularBonusParaHermana(this.personajeSeleccionado) : 0;

        return `
            <div style="max-width: 1000px; margin: 0 auto; padding: 20px;">
                <div style="background: ${personaje.color}20; border-radius: 20px; padding: 30px; margin-bottom: 30px; border: 3px solid ${personaje.color};">
                    <div style="display: flex; align-items: center; gap: 25px; flex-wrap: wrap;">
                        <div style="position: relative;">
                            <img src="${personaje.imagen}"
                                 alt="${personaje.nombre}"
                                 style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 5px solid ${personaje.color};">
                            <div style="position: absolute; bottom: -10px; right: -10px; background: ${personaje.color}; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 1.2rem; border: 3px solid white;">
                                Nivel ${personaje.nivel}
                            </div>
                        </div>
                        <div style="flex: 1;">
                            <h1 style="color: ${personaje.color}; margin: 0 0 10px 0; font-size: 2.5rem;">
                                ${personaje.nombre}
                            </h1>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                                <div>
                                    <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">AFINIDAD</div>
                                    <div style="font-size: 2rem; font-weight: bold; color: ${personaje.afinidad >= 0 ? '#4CAF50' : '#FF6B6B'}">
                                        ${personaje.afinidad >= 0 ? '+' : ''}${personaje.afinidad}/200
                                    </div>
                                    <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; margin-top: 5px; overflow: hidden;">
                                        <div style="background: #4CAF50; width: ${porcentajeAfinidad}%; height: 100%;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">ESTADO</div>
                                    <div style="font-size: 1.5rem; font-weight: bold; text-transform: uppercase;">
                                        ${this.obtenerEmojiEstado(personaje.estadoAnimo)} ${personaje.estadoAnimo}
                                    </div>
                                </div>
                                <div>
                                    <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">NIVEL</div>
                                    <div style="font-size: 1.5rem; font-weight: bold; color: #FF1493;">
                                        ${personaje.nivel}/10
                                    </div>
                                    <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; margin-top: 5px; overflow: hidden;">
                                        <div style="background: #FF1493; width: ${porcentajeNivel}%; height: 100%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 25px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: ${personaje.color}; font-weight: bold;">PROGRESO HACIA NIVEL ${personaje.nivel + 1}</span>
                            <span style="color: ${personaje.color};">${personaje.exp}/${personaje.expNecesaria} EXP</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); height: 15px; border-radius: 10px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, ${personaje.color}, ${this.oscurecerColor(personaje.color)});
                                      width: ${(personaje.exp / personaje.expNecesaria) * 100}%; height: 100%;"></div>
                        </div>
                    </div>
                </div>

                ${typeof fantasiaRPG !== 'undefined' ? `
                <div style="background: rgba(255, 215, 0, 0.1); border-radius: 15px; padding: 20px; margin-bottom: 30px; border: 2px solid gold;">
                    <h3 style="color: gold; margin-bottom: 15px; text-align: center;">✨ BONUS RPG FANTASÍA</h3>
                    <div style="display: flex; justify-content: space-around; align-items: center;">
                        <div style="text-align: center;">
                            <div style="font-size: 2.5rem; font-weight: bold; color: gold;">+${bonusFantasia.toFixed(1)}%</div>
                            <div style="opacity: 0.8;">en todos los momentos</div>
                        </div>
                        <div>
                            <button class="card-button" onclick="cargarPaginaFantasiaRPG()" 
                                    style="background: linear-gradient(135deg, gold, #8A5AF7); padding: 15px 30px;">
                                ⚔️ IR A RPG FANTASÍA
                            </button>
                        </div>
                    </div>
                    <p style="text-align: center; font-size: 0.9rem; opacity: 0.7; margin-top: 15px;">
                        Máximo 10% - Mejora stats en el modo Fantasía
                    </p>
                </div>
                ` : ''}

                <div style="background: rgba(255, 20, 147, 0.1); border-radius: 15px; padding: 25px; margin-bottom: 30px; border: 2px solid #FF1493;">
                    <h3 style="color: #FF1493; margin-bottom: 20px;">💖 MOMENTOS ÍNTIMOS</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 15px;">
                        ${personaje.momentosIntimos.map(momento => {
                            const probSin = this.calcularProbabilidadMomento(personaje, momento, false);
                            const probCon = this.calcularProbabilidadMomento(personaje, momento, true);
                            const puedeNivel = personaje.nivel >= (momento.nivelRequerido || 1);
                            return `
                            <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px;">
                                <h4 style="color: ${personaje.color}; margin: 0 0 10px 0;">${momento.nombre}</h4>
                                <p style="font-size: 0.9rem; margin-bottom: 10px;">${momento.descripcion}</p>
                                <div style="font-size: 0.85rem; margin-bottom: 8px;">
                                    <span>🎁 Da: +${momento.afinidad} afinidad, +${momento.exp} EXP</span>
                                    ${momento.condones001Requeridos > 0 ? '<br><span style="color:#5864F5;">💎 Requiere condón 0.01</span>' : ''}
                                </div>
                                <!-- Mostrar fórmula y probabilidad -->
                                <div style="background: rgba(255,20,147,0.1); border-radius: 5px; padding: 8px; margin-bottom: 8px; font-size:0.8rem;">
                                    <div>🎯 <strong>Probabilidad:</strong> <span style="color:${probSin > 70 ? '#4CAF50' : '#FFD166'}">${probSin}%</span></div>
                                    <div style="opacity:0.8;">📊 Base ${momento.probabilidadBase}% + Afin ${Math.round(Math.min(Math.max(personaje.afinidad,0),200)/200*40)}% + Nvl ${Math.round(personaje.nivel/10*30)}% + Estado ${this.obtenerAjusteEstadoTexto(personaje.estadoAnimo)}</div>
                                    <div>💎 Con 0.01: <span style="color:#5864F5;">${probCon}%</span></div>
                                    ${bonusFantasia > 0 ? `
                                    <div style="color: gold;">✨ Bonus Fantasía: +${bonusFantasia.toFixed(1)}%</div>
                                    ` : ''}
                                </div>
                                <p style="font-size: 0.9rem;">🎯 Nivel ${momento.nivelRequerido || 1}+</p>
                                <button class="card-button" onclick="intentarMomentoIntimoRPG('${this.personajeSeleccionado}', '${momento.id}')"
                                        style="width: 100%; padding: 10px; font-size: 0.9rem; margin-top: 10px;"
                                        ${!puedeNivel ? 'disabled' : ''}>
                                    INTENTAR
                                </button>
                            </div>
                        `}).join('')}
                    </div>
                </div>

                <div style="background: rgba(255, 209, 102, 0.1); border-radius: 15px; padding: 25px; border: 2px solid #FFD166;">
                    <h3 style="color: #FFD166; margin-bottom: 20px;">✨ ACTIVIDADES ESPECIALES</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 15px;">
                        ${personaje.actividadesEspeciales.map(actividad => `
                            <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px;">
                                <h4 style="color: #FFD166; margin: 0 0 10px 0;">${actividad.nombre}</h4>
                                <p style="font-size: 0.9rem; margin-bottom: 10px;">${actividad.descripcion}</p>
                                <div style="font-size: 0.9rem; margin-bottom: 5px;">
                                    <span>💰 S/.${actividad.costo}</span><br>
                                    <span style="color:#4CAF50;">💝 +${actividad.afinidad} afinidad</span><br>
                                    <span style="color:#FF1493;">✨ +${actividad.exp} EXP</span>
                                </div>
                                <button class="card-button" onclick="comprarActividadRPG('${this.personajeSeleccionado}', '${actividad.id}')"
                                        style="width: 100%; padding: 10px; font-size: 0.9rem; margin-top: 10px;"
                                        ${dinero < actividad.costo ? 'disabled' : ''}>
                                    COMPRAR
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // ====================
    // FUNCIONES DE ACTIVIDADES
    // ====================

    comprarActividad(personajeId, actividadId) {
        const personaje = this.datosPersonajes[personajeId];
        const actividad = personaje.actividadesEspeciales.find(a => a.id === actividadId);

        if (!actividad) {
            this.mostrarNotificacion('❌ Actividad no encontrada');
            return false;
        }

        const dineroActual = sistemaEconomia.obtenerDinero();
        if (dineroActual < actividad.costo) {
            this.mostrarNotificacion('❌ Dinero insuficiente');
            return false;
        }

        sistemaEconomia.agregarDinero(-actividad.costo);

        personaje.afinidad = Math.min(personaje.afinidad + actividad.afinidad, 200);
        this.agregarEXP(personajeId, actividad.exp);
        personaje.estadoAnimo = 'feliz';

        console.log(`🎉 Actividad ${actividad.nombre} comprada para ${personaje.nombre}`);
        this.mostrarNotificacion(`💝 ${personaje.nombre} muy feliz! +${actividad.afinidad} afinidad, +${actividad.exp} EXP`);

        this.cargarVideoActividad(personajeId, actividadId);
        return true;
    }

    cargarVideoActividad(personajeId, actividadId) {
        const personaje = this.datosPersonajes[personajeId];
        const actividad = personaje.actividadesEspeciales.find(a => a.id === actividadId);

        if (!actividad || !actividad.videoId) {
            this.mostrarNotificacion('❌ Video no disponible');
            return;
        }

        this.mostrarReproductorVideo({
            driveId: actividad.videoId,
            titulo: actividad.nombre,
            duracion: '3:00',
            esExplicito: false
        }, personaje);
    }

    cargarVideoNivel(personajeId, nivel) {
        const personaje = this.datosPersonajes[personajeId];
        const videoId = this.obtenerVideoIdPorNivel(personajeId, nivel);

        this.mostrarReproductorVideo({
            driveId: videoId,
            titulo: `Video Nivel ${nivel}`,
            duracion: '2:30',
            esExplicito: false
        }, personaje);
    }

    cargarVideoMomentoIntimo(personajeId, momento) {
        const personaje = this.datosPersonajes[personajeId];

        this.mostrarReproductorVideo({
            driveId: momento.videoId,
            titulo: `${momento.nombre} - ${personaje.nombre}`,
            duracion: '3:00',
            esExplicito: true
        }, personaje);
    }

    // ====================
    // FUNCIONES DE CONDONES
    // ====================

    comprarCondones(cantidad) {
        const costoPorCondon = 50;
        const costoTotal = cantidad * costoPorCondon;

        const dineroActual = sistemaEconomia.obtenerDinero();
        if (dineroActual < costoTotal) {
            this.mostrarNotificacion('❌ Dinero insuficiente');
            return false;
        }

        sistemaEconomia.agregarDinero(-costoTotal);

        this.condones += cantidad;
        this.guardarCondones();

        console.log(`🛒 Comprados ${cantidad} condones normales por S/.${costoTotal}`);
        this.mostrarNotificacion(`🛍️ +${cantidad} condones normales comprados`);

        if (this.personajeSeleccionado) {
            this.actualizarVistaConPersonaje();
        }

        return true;
    }

    comprarCondones001(cantidad) {
        const costoPorCondon = 200;
        const costoTotal = cantidad * costoPorCondon;

        const dineroActual = sistemaEconomia.obtenerDinero();
        if (dineroActual < costoTotal) {
            this.mostrarNotificacion('❌ Dinero insuficiente');
            return false;
        }

        sistemaEconomia.agregarDinero(-costoTotal);

        this.condones001 += cantidad;
        this.guardarCondones001();

        console.log(`💎 Comprados ${cantidad} condones 0.01 por S/.${costoTotal}`);
        this.mostrarNotificacion(`💎 +${cantidad} condones 0.01 comprados (+20% éxito, +80% afinidad, límite 100%)`);

        if (this.personajeSeleccionado) {
            this.actualizarVistaConPersonaje();
        }

        return true;
    }

    // ====================
    // REPRODUCTOR DE VIDEOS
    // ====================

    mostrarReproductorVideo(video, personaje) {
        const advertencia = video.esExplicito ?
            `<div style="background: rgba(255, 20, 147, 0.2); padding: 15px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #FF1493;">
                <p style="color: #FF1493; font-weight: bold; text-align: center;">
                    ⚠️ CONTENIDO EXPLÍCITO +18 ⚠️
                </p>
            </div>` : '';

        const html = `
            <div class="reproductor-container" style="max-width: 800px; margin: 0 auto; padding: 30px;">
                ${advertencia}

                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="${personaje.imagen}"
                         alt="${personaje.nombre}"
                         style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 4px solid ${personaje.color}; margin-bottom: 15px;">
                    <h2 style="color: ${personaje.color}; margin-bottom: 10px;">
                        🎬 ${video.titulo} - ${personaje.nombre}
                    </h2>
                    <p style="opacity: 0.8; margin-bottom: 10px;">
                        Nivel de ${personaje.nombre.split(' ')[0]}: ${personaje.nivel} • Duración: ${video.duracion}
                    </p>
                </div>

                <div class="video-wrapper" style="margin: 30px 0;">
                    <iframe
                        id="rpg-video-iframe"
                        src="https://drive.google.com/file/d/${video.driveId}/preview"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        style="width: 100%; height: 400px; border-radius: 15px; border: 3px solid ${personaje.color};"
                    ></iframe>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <button class="card-button" onclick="quintillizasRPG.volverAPersonaje()"
                            style="background: linear-gradient(135deg, ${personaje.color}, ${this.oscurecerColor(personaje.color)}); padding: 15px 30px; border: none; border-radius: 10px; color: white; cursor: pointer; font-weight: bold; font-size: 1.1rem;">
                        ↩️ Volver a ${personaje.nombre.split(' ')[0]}
                    </button>
                </div>
            </div>
        `;

        const mangaSection = document.getElementById('manga-section');
        mangaSection.innerHTML = html;

        const botonVolver = document.createElement('button');
        botonVolver.className = 'btn-atras-especifico';
        botonVolver.innerHTML = '← Volver al RPG';
        botonVolver.style.margin = '20px';
        botonVolver.onclick = () => this.actualizarVistaConPersonaje();
        mangaSection.insertBefore(botonVolver, mangaSection.firstChild);
    }

    volverAPersonaje() {
        this.actualizarVistaConPersonaje();
    }

    // ====================
    // UTILIDADES
    // ====================

    obtenerEmojiEstado(estado) {
        const emojis = {
            'feliz': '😊', 'neutral': '😐', 'triste': '😢', 'enojada': '😠',
            'tsundere': '😤', 'tímida': '😳', 'energica': '💪', 'glotona': '🍔'
        };
        return emojis[estado] || '😐';
    }

    obtenerAjusteEstadoTexto(estado) {
        const ajustes = {
            'feliz': '+15%', 'neutral': '0%', 'triste': '-25%', 'enojada': '-40%',
            'tsundere': '-30%', 'tímida': '-15%', 'energica': '+10%', 'glotona': '+12%'
        };
        return ajustes[estado] || '0%';
    }

    oscurecerColor(color) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        const darkR = Math.max(0, r - 50);
        const darkG = Math.max(0, g - 50);
        const darkB = Math.max(0, b - 50);

        return `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;
    }

    mostrarNotificacion(mensaje) {
        const notif = document.createElement('div');
        notif.className = 'notificacion-dinero';
        notif.textContent = mensaje;
        notif.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #FF1493, #FF69B4);
            color: white;
            padding: 12px 25px;
            border-radius: 50px;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0,0,0,0.4);
            z-index: 1001;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2s forwards;
            font-size: 1.1rem;
            border: 2px solid white;
        `;

        document.body.appendChild(notif);

        setTimeout(() => {
            if (notif.parentNode) {
                notif.parentNode.removeChild(notif);
            }
        }, 2500);
    }

    // ====================
    // NUEVA FUNCIÓN: MODIFICAR AFINIDAD DIRECTAMENTE (PARA EVENTOS)
    // ====================

    modificarAfinidad(personajeId, cantidad) {
        if (!this.datosPersonajes[personajeId]) {
            console.error(`Personaje ${personajeId} no encontrado`);
            return false;
        }
        
        const personaje = this.datosPersonajes[personajeId];
        const afinidadAnterior = personaje.afinidad;
        personaje.afinidad = Math.max(-100, Math.min(200, personaje.afinidad + cantidad));
        
        console.log(`💖 Evento: ${personaje.nombre} afinidad ${afinidadAnterior} → ${personaje.afinidad} (${cantidad > 0 ? '+' : ''}${cantidad})`);
        
        this.guardarDatosPersonajes();
        
        // Actualizar vista si es el personaje seleccionado
        if (this.personajeSeleccionado === personajeId) {
            this.actualizarVistaConPersonaje();
        }
        
        // Mostrar notificación visual
        this.mostrarNotificacion(`💖 ${personaje.nombre.split(' ')[0]}: ${cantidad > 0 ? '+' : ''}${cantidad} afinidad`);
        
        return true;
    }

    // ====================
    // LOCAL STORAGE
    // ====================

    guardarPersonajeSeleccionado() {
        try {
            localStorage.setItem('rpg_personaje_seleccionado', this.personajeSeleccionado);
            this.supabaseGuardar('rpg_personaje_seleccionado', this.personajeSeleccionado);
        } catch (e) {
            console.warn('No se pudo guardar personaje seleccionado:', e);
        }
    }

    cargarPersonajeSeleccionado() {
        try {
            return localStorage.getItem('rpg_personaje_seleccionado');
        } catch (e) {
            console.warn('No se pudo cargar personaje seleccionado:', e);
            return null;
        }
    }

    guardarDatosPersonajes() {
        try {
            localStorage.setItem('rpg_datos_personajes', JSON.stringify(this.datosPersonajes));
            this.supabaseGuardar('rpg_datos_personajes', this.datosPersonajes);
        } catch (e) {
            console.warn('No se pudo guardar datos personajes:', e);
        }
    }

    cargarDatosPersonajes() {
        try {
            const datos = localStorage.getItem('rpg_datos_personajes');
            return datos ? JSON.parse(datos) : null;
        } catch (e) {
            console.warn('No se pudo cargar datos personajes:', e);
            return null;
        }
    }

    guardarCondones() {
        try {
            localStorage.setItem('rpg_condones', this.condones.toString());
            this.supabaseGuardar('rpg_condones', this.condones);
        } catch (e) {
            console.warn('No se pudo guardar condones:', e);
        }
    }

    cargarCondones() {
        try {
            const condones = localStorage.getItem('rpg_condones');
            return condones ? parseInt(condones) : 0;
        } catch (e) {
            console.warn('No se pudo cargar condones:', e);
            return 0;
        }
    }

    guardarCondones001() {
        try {
            localStorage.setItem('rpg_condones001', this.condones001.toString());
            this.supabaseGuardar('rpg_condones001', this.condones001);
        } catch (e) {
            console.warn('No se pudo guardar condones001:', e);
        }
    }

    cargarCondones001() {
        try {
            const condones = localStorage.getItem('rpg_condones001');
            return condones ? parseInt(condones) : 0;
        } catch (e) {
            console.warn('No se pudo cargar condones001:', e);
            return 0;
        }
    }

    seleccionarTipoCondon(tipo) {
        console.log(`Tipo de condón seleccionado: ${tipo}`);
        return tipo;
    }

    // ====================
    // INICIALIZACIÓN
    // ====================

    inicializar() {
        console.log('🎮 RPG Quintillizas - Sistema dificultoso con momentos grupales inicializado');

        window.seleccionarPersonajeRPG = (personajeId) => this.seleccionarPersonajeUI(personajeId);
        window.intentarMomentoIntimoRPG = (personajeId, momentoId) => this.intentarMomentoIntimo(personajeId, momentoId);
        window.comprarActividadRPG = (personajeId, actividadId) => this.comprarActividad(personajeId, actividadId);
        window.comprarCondonesRPG = (cantidad) => this.comprarCondones(cantidad);
        window.comprarCondones001RPG = (cantidad) => this.comprarCondones001(cantidad);
        window.cargarVideoNivel = (personajeId, nivel) => this.cargarVideoNivel(personajeId, nivel);
        window.seleccionarTipoCondon = (tipo) => this.seleccionarTipoCondon(tipo);

        window.cargarMomentosGrupales = () => this.cargarPantallaMomentosGrupales();
        window.abrirDormitorio = () => this.mostrarUIDormitorio();
        window.iniciarFlujoGrupal = () => this.iniciarFlujoGrupal();
    }
}

// ================================================
// INTEGRACIÓN CON SISTEMA DE MAZOS
// ================================================

const agregarDineroOriginal = sistemaEconomia.agregarDinero;

sistemaEconomia.agregarDinero = function(cantidad) {
    const resultado = agregarDineroOriginal.call(this, cantidad);

    if (cantidad > 0 && window.quintillizasRPG && window.quintillizasRPG.personajeSeleccionado) {
        const expPorSoles = 10;
        const expGanada = Math.round(cantidad * expPorSoles);

        window.quintillizasRPG.agregarEXP(
            window.quintillizasRPG.personajeSeleccionado,
            expGanada
        );

        console.log(`🎮 RPG: +${expGanada} EXP para ${window.quintillizasRPG.datosPersonajes[window.quintillizasRPG.personajeSeleccionado].nombre}`);
    }

    return resultado;
};

// ================================================
// INSTANCIA GLOBAL DEL RPG
// ================================================

const quintillizasRPG = new QuintillizasRPG();

console.log("💖 RPG Quintillizas cargado correctamente");
console.log("📦 Funciones disponibles: obtenerNoviaSeleccionada(), obtenerVideoNovia(accion), obtenerDatosNovia()");

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function() {
    quintillizasRPG.inicializar();
    console.log('🎮 RPG Quintillizas - Sistema CORREGIDO con MOMENTOS GRUPALES activado');
    console.log('✅ Límites fijos: Afinidad 0-200 | Nivel 1-10');
    console.log('✅ Éxito máximo: 80% sin condón (solo con afinidad 200 y nivel 10)');
    console.log('✅ Condón 0.01: +20% éxito, +80% afinidad, límite 100%');
    console.log('✅ MOMENTOS GRUPALES: 10 dúos, 10 tríos, 5 cuartetos, 1 quinteto');
    console.log('✅ Requisitos grupales: Condones 0.01 = número de chicas');
    
    if (typeof fantasiaRPG !== 'undefined') {
        console.log('✨ INTEGRACIÓN CON RPG FANTASÍA: Bonus por stats activado');
    }
});
