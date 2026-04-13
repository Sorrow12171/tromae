// ================================================
// SUPABASE SYNC - EVENTOS DIARIOS
// ================================================
const _EV_URL = 'https://lcspqpdjvdcbzhmcrhqi.supabase.co';
const _EV_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjc3BxcGRqdmRjYnpobWNyaHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5OTE1NjcsImV4cCI6MjA4ODU2NzU2N30.Lls-iTGdt90gtbi-mXXkYvB26u9Yt65DMOcskmVgx1Q';
const _EV_USER = 'user_qdhg1lunm_1772995224949';

async function _evGuardar(clave, valor) {
    try {
        await fetch(`${_EV_URL}/rest/v1/progreso`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': _EV_KEY,
                'Authorization': `Bearer ${_EV_KEY}`,
                'Prefer': 'resolution=merge-duplicates,return=minimal'
            },
            body: JSON.stringify({ user_id: _EV_USER, clave, valor: JSON.stringify(valor), actualizado_en: new Date().toISOString() })
        });
    } catch {}
}

async function _evCargar(clave) {
    try {
        const res = await fetch(`${_EV_URL}/rest/v1/progreso?user_id=eq.${_EV_USER}&clave=eq.${clave}&select=valor`, {
            headers: { 'apikey': _EV_KEY, 'Authorization': `Bearer ${_EV_KEY}` }
        });
        const data = await res.json();
        if (data && data.length > 0) return JSON.parse(data[0].valor);
        return null;
    } catch { return null; }
}

// Sincronizar eventos diarios al cargar la página
window._sincronizacionLista = false;

async function sincronizarEventosDiarios() {
    const claves = ['eventos_progreso', 'evento_diario_ultimo', 'evento_diario_actual', 'eventos_diarios_vistos', 'progreso_mazos_diario'];
    
    const [progreso, ultimo, actual, vistos, mazosData] = await Promise.all(claves.map(c => _evCargar(c)));
    
    const supabaseVacio = progreso === null && ultimo === null;
    
    if (supabaseVacio) {
        // Subir local a Supabase
        await Promise.all([
            _evGuardar('eventos_progreso', JSON.parse(localStorage.getItem('eventos_progreso') || 'null')),
            _evGuardar('evento_diario_ultimo', JSON.parse(localStorage.getItem('evento_diario_ultimo') || 'null')),
            _evGuardar('evento_diario_actual', JSON.parse(localStorage.getItem('evento_diario_actual') || 'null')),
            _evGuardar('eventos_diarios_vistos', JSON.parse(localStorage.getItem('eventos_diarios_vistos') || '[]')),
            _evGuardar('progreso_mazos_diario', JSON.parse(localStorage.getItem('progreso_mazos_diario') || '{}'))
        ]);
        console.log('☁️ Eventos diarios subidos a Supabase');
    } else {
        // Descargar de Supabase
        if (progreso !== null) localStorage.setItem('eventos_progreso', JSON.stringify(progreso));
        if (ultimo !== null) localStorage.setItem('evento_diario_ultimo', JSON.stringify(ultimo));
        if (actual !== null) localStorage.setItem('evento_diario_actual', JSON.stringify(actual));
        if (vistos !== null) localStorage.setItem('eventos_diarios_vistos', JSON.stringify(vistos));
        if (mazosData !== null) localStorage.setItem('progreso_mazos_diario', JSON.stringify(mazosData));
        console.log('☁️ Eventos diarios sincronizados desde Supabase');
    }
    
    // Marcar sincronización como lista
    window._sincronizacionLista = true;
    console.log('✅ Sincronización completada — eventos diarios pueden iniciarse');
}

// Ejecutar sync al cargar sin delay — el flag controla el flujo
sincronizarEventosDiarios().catch(e => {
    console.warn('⚠️ Error en sincronización, usando datos locales:', e);
    window._sincronizacionLista = true; // igual dejar pasar para no bloquear
});

// ================================================
// SISTEMA DE EVENTOS DIARIOS - VERSIÓN CORREGIDA
// Éxito inmediato, fracaso al día siguiente + Evento NTR de Uzaki
// VERSIÓN CORREGIDA - Arreglado texto undefined y eventos en PC
// ================================================

// ================================================
// EVENTO ESPECIAL NTR - MAMÁ DE UZAKI (SOLO 1)
// ================================================
const EVENTOS_NTR = [
    {
        id: 'ntr_uzaki_madre',
        titulo: '🔥 ¡LA MADRE DE UZAKI APARECIÓ!',
        descripcion: 'La madre de Uzaki te ha invitado a su casa "para tomar un té". Está sola, coqueta y muy insistente. Sabes que si aceptas, las quintillizas se enterarán y se pondrán furiosas. ¿Qué decides?',
        imagen: 'https://pbs.twimg.com/media/HClhFX_XgAA3V-O?format=jpg&name=small',
        video: '1_i7QBRnNr8fpMha22BM-T5i10H-Y0Vej',
        tipo: 'ntr',
        opciones: [
            {
                texto: '💔 Aceptar la invitación (NTR)',
                textoResultado: 'Has aceptado la invitación de la madre de Uzaki... Pasaron cosas que nunca debieron pasar. Las quintillizas se enteraron y su confianza en ti se ha roto por completo.',
                afinidadNino: -25,
                afinidadIchika: -25,
                afinidadMiku: -25,
                afinidadYotsuba: -25,
                afinidadItsuki: -25,
                dinero: 200,
                video: '1_i7QBRnNr8fpMha22BM-T5i10H-Y0Vej'
            },
            {
                texto: '💖 Rechazar y ser fiel a las quintillizas',
                textoResultado: 'Has rechazado cortésmente la invitación, demostrando tu lealtad a las quintillizas. Ellas se enteraron de tu fidelidad y te lo agradecen profundamente.',
                afinidadNino: 10,
                afinidadIchika: 10,
                afinidadMiku: 10,
                afinidadYotsuba: 10,
                afinidadItsuki: 10,
                dinero: 0,
                video: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS'
            }
        ]
    }
];

// Lista de 10 eventos con requisitos y consecuencias
const EVENTOS_DIARIOS = [
    { // Evento 1 - Solo Nino
        id: 'nino_ex',
        titulo: '😤 ¡EL EX DE NINO APARECIÓ!',
        descripcion: 'Mientras estudiabas en la cafetería, ves a Nino hablando acaloradamente con un chico. ¡Es su ex! Te mira y te hace una seña para que te acerques. Necesitas demostrarle que eres mejor que él completando 10 MAZOS AL 100% hoy.',
        imagen: 'https://pbs.twimg.com/media/HCqW0x2XsAAIPnI?format=jpg&name=small',
        video: '1t6zRSCEM3XC6HUQlKH8w8uZPcymXUJ_F',
        personajes: ['nino'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
        videoFracaso: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
        textoExito: '¡Completaste los 10 mazos justo a tiempo! Te acercaste a Nino y su ex, y con confianza le demostraste que eres mucho mejor que él. Nino se sonroja y te toma del brazo, mientras el ex se retira humillado. ¡Has ganado su confianza!',
        textoFracaso: 'No pudiste completar los mazos a tiempo... Cuando llegaste a la cafetería, Nino ya se había ido con su ex. Más tarde la encuentras llorando en el parque. "¿Por qué no viniste?" te dice entre lágrimas. La relación con Nino se ha enfriado.',
        afinidadExito: 15,
        afinidadFracaso: -30,
        dineroRecompensa: 50
    },
    { // Evento 2 - Solo Ichika
        id: 'ichika_trabajo',
        titulo: '💼 ¡ICHIKA ESTÁ AGOTADA!',
        descripcion: 'Ichika está agotada por el trabajo y necesita que la ayudes a estudiar para un examen importante. Si no completas 10 MAZOS AL 100% hoy, perderá el año.',
        imagen: 'https://pbs.twimg.com/media/HCqdUZ2W8AA1Kg0?format=jpg&name=small',
        video: '1oM9dXtvoBiUXqtIPlYhlO7SisP0SnPAj',
        personajes: ['ichika'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
        videoFracaso: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
        textoExito: 'Estudiaste con Ichika toda la noche y lograron repasar todos los temas. Al día siguiente, Ichika pasa el examen con nota sobresaliente. "¡No lo habría logrado sin ti!" te abraza emocionada. Su gratitud hacia ti ha crecido enormemente.',
        textoFracaso: 'Ichika esperó tu ayuda toda la noche, pero nunca llegaste. Al día siguiente, suspende el examen. La encuentras cabizbaja a la salida del colegio. "Creí que podía contar contigo..." dice con tristeza. La confianza de Ichika se ha debilitado.',
        afinidadExito: 10,
        afinidadFracaso: -25,
        dineroRecompensa: 40
    },
    { // Evento 3 - Solo Miku
        id: 'miku_concierto',
        titulo: '🎶 ¡MIKU PERDIÓ LAS ENTRADAS!',
        descripcion: 'Miku tiene un concierto de música tradicional hoy, pero perdió las entradas. Necesita que la ayudes a buscarlas. Completa 10 MAZOS AL 100% hoy. ¡No la dejes plantada!',
        imagen: 'https://pbs.twimg.com/media/G7qfrrKWsAAv6ZT?format=png&name=small',
        video: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
        personajes: ['miku'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
        videoFracaso: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
        textoExito: 'Buscaron juntos por todas partes y finalmente encontraron las entradas detrás de la biblioteca. Llegaron justo a tiempo al concierto. Miku te toma de la mano durante la presentación. "Gracias por no rendirte", susurra emocionada.',
        textoFracaso: 'Miku te esperó horas en la entrada del colegio, pero nunca apareciste. Perdió el concierto que tanto esperaba. Días después, apenas te dirige la palabra. Su amor por la música ahora le recuerda tu decepción.',
        afinidadExito: 12,
        afinidadFracaso: -28,
        dineroRecompensa: 45
    },
    { // Evento 4 - Solo Yotsuba
        id: 'yotsuba_carrera',
        titulo: '🏃‍♀️ ¡YOTSUBA NECESITA APOYO!',
        descripcion: 'Yotsuba tiene una carrera importante mañana y está nerviosa. Quiere que estudien juntos para calmarse. Completa 10 MAZOS AL 100% hoy para demostrarle que puedes con todo.',
        imagen: 'https://pbs.twimg.com/media/G7qfupkXUAAX0aS?format=png&name=small',
        video: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
        personajes: ['yotsuba'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
        videoFracaso: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
        textoExito: 'Pasaron la tarde estudiando y riendo. Yotsuba se olvidó de sus nervios gracias a ti. Al día siguiente, gana la carrera y corre a abrazarte. "¡Lo logramos! ¡Eres mi amuleto de la suerte!" exclama con su eterna sonrisa.',
        textoFracaso: 'Yotsuba te esperó en la biblioteca toda la tarde, pero nunca llegaste. Al día siguiente, corre la carrera distraída, buscándote entre el público, y termina última. "Pensé que vendrías..." dice sin mirarte a los ojos.',
        afinidadExito: 8,
        afinidadFracaso: -20,
        dineroRecompensa: 30
    },
    { // Evento 5 - Solo Itsuki
        id: 'itsuki_buffet',
        titulo: '🍣 ¡ITSUKI QUIERE BUFFET LIBRE!',
        descripcion: 'Itsuki quiere ir a un buffet libre pero le da vergüenza ir sola. Prometiste acompañarla si completas 10 MAZOS AL 100% hoy. ¡No la decepciones!',
        imagen: 'https://pbs.twimg.com/media/G7qfxnsX0AIbJK1?format=png&name=small',
        video: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
        personajes: ['itsuki'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
        videoFracaso: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
        textoExito: 'Itsuki está feliz porque al fin puede comer todo lo que quiere sin sentirse juzgada. "¡Eres el mejor acompañante!" dice con la boca llena. Pasan una tarde divertida probando todos los platillos. Su confianza en ti crece.',
        textoFracaso: 'Itsuki fue sola al buffet, pero se sintió incómoda y se fue a los 20 minutos. Te envía un mensaje: "No importa, ya estoy acostumbrada a que me fallen..." Su voz transmite una tristeza que te llega al alma.',
        afinidadExito: 10,
        afinidadFracaso: -25,
        dineroRecompensa: 40
    },
    { // Evento 6 - Dúo Nino e Ichika
        id: 'duo_nino_ichika_discusion',
        titulo: '👯‍♀️ ¡NINO E ICHIKA DISCUTEN!',
        descripcion: 'Nino e Ichika están discutiendo por quién cocinará hoy. Tienes que mediar para que se reconcilien. Demuestra tu habilidad completando 10 MAZOS AL 100% hoy.',
        imagen: 'https://pbs.twimg.com/media/G7qfcGRWkAAV74w?format=png&name=small',
        video: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
        personajes: ['nino', 'ichika'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
        videoFracaso: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
        textoExito: 'Lograste mediar en la discusión y proponer que cocinen juntas. Terminan haciendo una cena deliciosa entre risas. Ambas te agradecen por separado: "Eres el único que sabe calmarlas". La armonía vuelve a casa.',
        textoFracaso: 'La discusión escaló y terminaron sin hablarse. La cena fue un desastre y tú eres el centro de la discordia. "Si hubieras hecho algo..." te reclama Nino. Ichika solo niega con la cabeza. El ambiente es tenso.',
        afinidadExito: 12,
        afinidadFracaso: -20,
        dineroRecompensa: 60
    },
    { // Evento 7 - Dúo Miku y Yotsuba
        id: 'duo_miku_yotsuba_estudio',
        titulo: '📚 ¡MIKU Y YOTSUBA NECESITAN AYUDA!',
        descripcion: 'Miku no entiende historia y Yotsuba quiere ayudarle pero no sabe cómo. Completa 10 MAZOS AL 100% hoy para darles material de estudio.',
        imagen: 'https://pbs.twimg.com/media/G7qfrrKWsAAv6ZT?format=png&name=small',
        video: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
        personajes: ['miku', 'yotsuba'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
        videoFracaso: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
        textoExito: 'Creas un resumen perfecto que Miku entiende a la perfección. Yotsuba aprende tanto que termina ayudando a otras compañeras. "¡Eres un genio!" te dicen al unísono. Su admiración por ti no tiene límites.',
        textoFracaso: 'Sin tu ayuda, Miku se confunde aún más y Yotsuba termina frustrada. Suspenden el examen y te miran con decepción. "Creíamos que podíamos contar contigo", murmura Yotsuba. La confianza se resquebraja.',
        afinidadExito: 10,
        afinidadFracaso: -18,
        dineroRecompensa: 50
    },
    { // Evento 8 - Trío (Nino, Miku, Itsuki)
        id: 'trio_examen',
        titulo: '📝 ¡EXAMEN SORPRESA!',
        descripcion: 'Las profesoras anunciaron un examen sorpresa. Nino, Miku e Itsuki entran en pánico. Necesitan que las ayudes a repasar completando 10 MAZOS AL 100% hoy.',
        imagen: 'https://pbs.twimg.com/media/G7qfxnsX0AIbJK1?format=png&name=small',
        video: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
        personajes: ['nino', 'miku', 'itsuki'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
        videoFracaso: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
        textoExito: 'Hiciste una maratón de estudio con las tres. Aunque agotador, todas pasaron el examen. "¡Eres nuestro salvador!" gritan emocionadas. Ese día, las tres compiten por tu atención, creando un ambiente divertido.',
        textoFracaso: 'Ninguna pudo prepararse bien. Suspenden el examen y te culpan en silencio. "Para eso no sirves", murmura Nino. Miku evita tu mirada e Itsuki solo come en silencio. La distancia crece.',
        afinidadExito: 15,
        afinidadFracaso: -25,
        dineroRecompensa: 80
    },
    { // Evento 9 - Cuarteto (Ichika, Nino, Miku, Yotsuba)
        id: 'cuarteto_festival',
        titulo: '🎪 ¡FESTIVAL ESCOLAR!',
        descripcion: 'El festival escolar está cerca y 4 de las hermanas necesitan ayuda para preparar el stand. Completa 10 MAZOS AL 100% hoy para que todo salga perfecto.',
        imagen: 'https://pbs.twimg.com/media/G7qfcGRWkAAV74w?format=png&name=small',
        video: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
        personajes: ['ichika', 'nino', 'miku', 'yotsuba'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS',
        videoFracaso: '1-wYJYTaw0ZOKQy8BBPR7Fmhlzs0IVx9K',
        textoExito: 'El stand es un éxito rotundo. Las cuatro hermanas te sonríen orgullosas. "No podríamos haberlo hecho sin ti", dice Ichika. Yotsuba te abraza, Miku te regala un dibujo y Nino, sonrojada, te da las gracias. Es el mejor día.',
        textoFracaso: 'El stand es un desastre. Las colas son largas, la comida se quema y los clientes se quejan. Las hermanas están estresadas y frustradas. "Para qué prometiste si no ibas a ayudar", te reclama Nino. El festival es un recuerdo amargo.',
        afinidadExito: 18,
        afinidadFracaso: -30,
        dineroRecompensa: 100
    },
    { // Evento 10 - QUINTETO (TODAS)
        id: 'quinteto_viaje',
        titulo: '👯‍♀️👯‍♀️👯‍♀️👯‍♀️👯‍♀️ ¡VIAJE DE HERMANAS!',
        descripcion: '¡Las 5 hermanas quieren hacer un viaje juntas! Te invitaron, pero debes demostrar que eres responsable completando 10 MAZOS AL 100% hoy.',
        imagen: 'https://pbs.twimg.com/media/G7qfpGZXAAAib4A?format=png&name=small',
        video: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
        personajes: ['ichika', 'nino', 'miku', 'yotsuba', 'itsuki'],
        tipoRequisito: 'mazos_completados',
        cantidadRequerida: 10,
        videoExito: '1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl',
        videoFracaso: '1aPPqNHRq-Twvdp-TnQ0FkyYLuksmr2qe',
        textoExito: 'El viaje es inolvidable. Las cinco hermanas compiten por sentarse a tu lado, por compartir habitación contigo, por hacerte probar sus comidas favoritas. "Eres parte de la familia ahora", dice Itsuki. Es el sueño hecho realidad.',
        textoFracaso: 'El viaje se cancela porque "alguien no cumplió su parte". Las hermanas hacen el viaje sin ti y, aunque se divierten, tu nombre no se menciona. Regresan con fotos donde siempre falta alguien: tú. La exclusión duele más que cualquier reclamo.',
        afinidadExito: 25,
        afinidadFracaso: -40,
        dineroRecompensa: 150
    }
];

// ================================================
// SISTEMA DE PROGRESO DE EVENTOS DIARIOS
// ================================================

const SistemaProgresoEventos = {
    inicializarContadores: function() {
        if (!localStorage.getItem('eventos_progreso')) {
            const progresoInicial = {
                totalEventos: EVENTOS_DIARIOS.length + EVENTOS_NTR.length,
                eventosCompletados: 0,
                eventosFallidos: 0,
                ultimaSemana: this.obtenerNumeroSemana(),
                ultimoEventoFecha: null,
                historial: []
            };
            localStorage.setItem('eventos_progreso', JSON.stringify(progresoInicial));
        }
        return JSON.parse(localStorage.getItem('eventos_progreso'));
    },

    obtenerNumeroSemana: function() {
        const fecha = new Date();
        const inicioAño = new Date(fecha.getFullYear(), 0, 1);
        const dias = Math.floor((fecha - inicioAño) / (24 * 60 * 60 * 1000));
        return Math.ceil((dias + inicioAño.getDay() + 1) / 7);
    },

    registrarResultado: function(eventoId, exito) {
        const progreso = this.inicializarContadores();
        
        const semanaActual = this.obtenerNumeroSemana();
        if (semanaActual !== progreso.ultimaSemana) {
            progreso.eventosCompletados = 0;
            progreso.eventosFallidos = 0;
            progreso.ultimaSemana = semanaActual;
            progreso.historial = [];
        }

        if (exito) {
            progreso.eventosCompletados++;
        } else {
            progreso.eventosFallidos++;
        }

        progreso.ultimoEventoFecha = new Date().toISOString();

        progreso.historial.unshift({
            id: eventoId,
            fecha: new Date().toISOString(),
            exito: exito
        });
        
        if (progreso.historial.length > 10) {
            progreso.historial.pop();
        }

        localStorage.setItem('eventos_progreso', JSON.stringify(progreso));
        _evGuardar('eventos_progreso', progreso);
        return progreso;
    },

    obtenerEstadisticas: function() {
        return this.inicializarContadores();
    },

    obtenerPorcentajeSemanal: function() {
        const progreso = this.obtenerEstadisticas();
        const totalEventosSemana = 7;
        const totalCompletados = progreso.eventosCompletados;
        
        return {
            completados: totalCompletados,
            total: totalEventosSemana,
            porcentaje: Math.min(100, Math.round((totalCompletados / totalEventosSemana) * 100))
        };
    },

    obtenerRacha: function() {
        const progreso = this.obtenerEstadisticas();
        let racha = 0;
        
        for (let i = 0; i < progreso.historial.length; i++) {
            if (progreso.historial[i].exito) {
                racha++;
            } else {
                break;
            }
        }
        
        return racha;
    },

    crearContadorMazosHoy: function() {
        // Lee el evento actual y los mazos completados hoy
        const eventoActual = (() => {
            try { return JSON.parse(localStorage.getItem('evento_diario_actual') || 'null'); } catch(e) { return null; }
        })();
        const ultimoEvento = (() => {
            try { return JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}'); } catch(e) { return {}; }
        })();

        // Si no hay evento activo, no mostrar nada
        if (!eventoActual) return '';

        // Si es evento NTR, mostrar mensaje especial
        if (eventoActual.tipo === 'ntr') {
            return `
                <div style="
                    background: rgba(255, 50, 50, 0.12);
                    border: 2px solid #FF4444;
                    border-radius: 15px;
                    padding: 14px 16px;
                    margin-bottom: 16px;
                    text-align: center;
                ">
                    <div style="font-size: 1.3rem; margin-bottom: 6px;">🔥</div>
                    <div style="color: #FF4444; font-weight: bold; font-size: 0.95rem; margin-bottom: 4px;">
                        EVENTO NTR ACTIVO
                    </div>
                    <div style="color: rgba(255,255,255,0.7); font-size: 0.82rem;">
                        Este evento no requiere mazos.<br>Tomá una decisión cuando aparezca el modal.
                    </div>
                </div>
            `;
        }

        // Solo mostrar contador si el evento requiere mazos
        if (eventoActual.tipoRequisito !== 'mazos_completados') {
            return '';
        }

        const fechaHoy = (() => {
            const f = new Date();
            return `${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,'0')}-${String(f.getDate()).padStart(2,'0')}`;
        })();

        // Estado del evento: completado o fallido
        const eventoCompletado = ultimoEvento.requisitoCumplido === true;
        const eventoFallido = ultimoEvento.fechaFracaso && ultimoEvento.fechaFracaso === fechaHoy;

        const mazosHoy = (() => {
            try {
                const pd = JSON.parse(localStorage.getItem('progreso_mazos_diario') || '{}');
                return parseInt(pd[fechaHoy]) || 0;
            } catch(e) { return 0; }
        })();

        const requerido = eventoActual.cantidadRequerida || 10;
        const faltan = Math.max(0, requerido - mazosHoy);
        const porcentajeMazos = Math.min(100, Math.round((mazosHoy / requerido) * 100));
        const completado = eventoCompletado || mazosHoy >= requerido;

        // Generar iconitos de mazos (cuadraditos llenos/vacíos)
        let iconosMazos = '';
        for (let i = 0; i < requerido; i++) {
            const lleno = i < mazosHoy;
            iconosMazos += `<div style="
                width: 18px;
                height: 18px;
                border-radius: 4px;
                background: ${lleno ? 'linear-gradient(135deg, #FF1493, #8A5AF7)' : 'rgba(255,255,255,0.1)'};
                border: 1.5px solid ${lleno ? '#FF1493' : 'rgba(255,255,255,0.25)'};
                box-shadow: ${lleno ? '0 0 6px rgba(255,20,147,0.6)' : 'none'};
                transition: all 0.3s;
            "></div>`;
        }

        const borderColor = eventoCompletado ? '#4CAF50' : eventoFallido ? '#F44336' : '#FFD166';
        const bgColor = eventoCompletado ? 'rgba(76,175,80,0.15)' : eventoFallido ? 'rgba(244,67,54,0.12)' : 'rgba(255,165,0,0.1)';

        return `
                <div style="
                    background: ${bgColor};
                    border: 2px solid ${borderColor};
                    border-radius: 15px;
                    padding: 14px 16px;
                    margin-bottom: 16px;
                ">
                    <div style="
                        color: white;
                        font-weight: bold;
                        font-size: 0.9rem;
                        margin-bottom: 10px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid rgba(255,255,255,0.15);
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    ">
                        ${eventoActual.titulo || '📅 Evento del día'}
                    </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 6px;">
                    <span style="color: #FFD166; font-weight: bold; font-size: 0.9rem;">
                        🃏 Mazos hoy:
                    </span>
                    <span style="font-weight: bold; font-size: 1.1rem; color: ${eventoCompletado ? '#4CAF50' : eventoFallido ? '#F44336' : (mazosHoy >= requerido * 0.7 ? '#FFD166' : '#FF6B6B')};">
                        ${eventoCompletado ? '✅ ¡COMPLETADO!' : eventoFallido ? '❌ No completado' : `${mazosHoy} / ${requerido}`}
                    </span>
                </div>

                ${!eventoCompletado && !eventoFallido ? `
                <div style="
                    background: rgba(0,0,0,0.3);
                    height: 18px;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 1.5px solid rgba(255,209,102,0.4);
                    margin-bottom: 10px;
                ">
                    <div style="
                        background: linear-gradient(90deg, #FF1493, #8A5AF7);
                        width: ${porcentajeMazos}%;
                        height: 100%;
                        transition: width 0.5s ease;
                        border-radius: 10px;
                    "></div>
                </div>
                <div style="text-align: center; color: #FF6B6B; font-size: 0.85rem; font-weight: bold; margin-bottom: 10px;">
                    ⏳ Faltan <span style="font-size: 1.1rem; color: #FFD166;">${faltan}</span> mazo${faltan !== 1 ? 's' : ''} para completar el evento
                </div>
                ` : ''}

                <div style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
                    ${iconosMazos}
                </div>
            </div>
        `;
    },

    crearBarraProgreso: function() {
        const stats = this.obtenerPorcentajeSemanal();
        const racha = this.obtenerRacha();
        const progreso = this.obtenerEstadisticas();
        
        const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const hoy = new Date().getDay();
        const hoyIndex = hoy === 0 ? 6 : hoy - 1;
        
        let diasHTML = '';
        for (let i = 0; i < 7; i++) {
            let estado = 'pendiente';
            let color = '#2a2a3a';
            
            if (i < progreso.eventosCompletados) {
                estado = 'completado';
                color = '#4CAF50';
            } else if (i < progreso.eventosCompletados + progreso.eventosFallidos) {
                estado = 'fallido';
                color = '#F44336';
            }
            
            const esHoy = i === hoyIndex;
            
            diasHTML += `
                <div style="text-align: center;">
                    <div style="
                        width: 35px;
                        height: 35px;
                        background: ${color};
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        border: ${esHoy ? '3px solid #FFD166' : '2px solid rgba(255,255,255,0.2)'};
                        margin: 0 auto;
                        color: white;
                        box-shadow: ${esHoy ? '0 0 15px #FFD166' : 'none'};
                    ">
                        ${i + 1}
                    </div>
                    <div style="font-size: 0.7rem; margin-top: 5px; opacity: 0.7;">
                        ${diasSemana[i]}
                    </div>
                </div>
            `;
        }

        return `
            <div id="eventos-progreso-barra" style="
                background: linear-gradient(135deg, rgba(255, 20, 147, 0.15), rgba(138, 90, 247, 0.15));
                border-radius: 20px;
                padding: 20px;
                margin: 20px auto;
                max-width: 800px;
                border: 2px solid #FF1493;
                box-shadow: 0 0 20px rgba(255, 20, 147, 0.3);
                position: relative;
                backdrop-filter: blur(10px);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                    <h3 style="color: #FFD166; margin: 0; font-size: 1.2rem;">
                        📅 EVENTOS DIARIOS
                    </h3>
                    <div style="
                        background: rgba(255, 20, 147, 0.3);
                        padding: 5px 15px;
                        border-radius: 50px;
                        font-weight: bold;
                        color: #FFD166;
                        border: 2px solid #FF1493;
                        font-size: 0.9rem;
                    ">
                        🔥 Racha: ${racha} día${racha !== 1 ? 's' : ''}
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="color: #FFD166; font-weight: bold; font-size: 0.9rem;">
                            Progreso semanal:
                        </span>
                        <span style="color: #FF1493; font-weight: bold; font-size: 0.9rem;">
                            ${stats.completados}/${stats.total} eventos
                        </span>
                    </div>
                    
                    <div style="
                        background: rgba(0, 0, 0, 0.3);
                        height: 25px;
                        border-radius: 15px;
                        overflow: hidden;
                        position: relative;
                        border: 2px solid #FF1493;
                    ">
                        <div style="
                            background: linear-gradient(90deg, #FF1493, #8A5AF7);
                            width: ${stats.porcentaje}%;
                            height: 100%;
                            transition: width 0.5s ease;
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;
                            padding-right: 10px;
                            color: white;
                            font-weight: bold;
                            font-size: 0.9rem;
                            white-space: nowrap;
                        ">
                            ${stats.porcentaje}%
                        </div>
                    </div>
                </div>
                
                ${this.crearContadorMazosHoy()}
                
                <div style="
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 5px;
                    margin: 15px 0;
                ">
                    ${diasHTML}
                </div>
                
                <div style="
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    flex-wrap: wrap;
                ">
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <div style="width: 15px; height: 15px; background: #4CAF50; border-radius: 50%;"></div>
                        <span style="font-size: 0.8rem; opacity: 0.8;">Completado</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <div style="width: 15px; height: 15px; background: #F44336; border-radius: 50%;"></div>
                        <span style="font-size: 0.8rem; opacity: 0.8;">Fallido</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <div style="width: 15px; height: 15px; background: #2a2a3a; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);"></div>
                        <span style="font-size: 0.8rem; opacity: 0.8;">Pendiente</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <div style="width: 15px; height: 15px; background: transparent; border-radius: 50%; border: 3px solid #FFD166;"></div>
                        <span style="font-size: 0.8rem; opacity: 0.8;">Hoy</span>
                    </div>
                </div>
            </div>
        `;
    },

    mostrarEnContenedor: function(contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        if (contenedor) {
            contenedor.innerHTML = this.crearBarraProgreso();
        }
    }
};

// ================================================
// FUNCIONES AUXILIARES PARA TOGGLE DE LA BARRA
// ================================================
function obtenerEstadoVisibilidadBarra() {
    const estado = localStorage.getItem('eventos_progreso_visible');
    return estado === null ? true : estado === 'true';
}

function guardarEstadoVisibilidadBarra(visible) {
    localStorage.setItem('eventos_progreso_visible', visible);
}

// ================================================
// SISTEMA DE EVENTOS DIARIOS (VERSIÓN CORREGIDA)
// ================================================
const EventosDiarios = {
    obtenerFechaActual: function() {
        const fecha = new Date();
        return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
    },

    obtenerMazosCompletadosHoy: function() {
        const fechaHoy = this.obtenerFechaActual();
        
        try {
            const progresoDiario = JSON.parse(localStorage.getItem('progreso_mazos_diario') || '{}');
            
            if (!progresoDiario[fechaHoy]) {
                return 0;
            }
            
            const mazosHoy = parseInt(progresoDiario[fechaHoy]) || 0;
            console.log(`📊 Mazos completados HOY (${fechaHoy}): ${mazosHoy}`);
            return mazosHoy;
            
        } catch (e) {
            console.error('Error al obtener mazos de hoy:', e);
            return 0;
        }
    },

    verificarEventoHoy: function() {
        const ultimoEvento = localStorage.getItem('evento_diario_ultimo');
        if (!ultimoEvento) return true;
        
        try {
            const ultimoEventoData = JSON.parse(ultimoEvento);
            const fechaHoy = this.obtenerFechaActual();
            
            return ultimoEventoData.fecha !== fechaHoy;
        } catch (e) {
            return true;
        }
    },

    seleccionarEventoAleatorio: function() {
        const esEventoNTR = Math.random() < 0.3;
        
        const listaEventos = esEventoNTR ? EVENTOS_NTR : EVENTOS_DIARIOS;
        
        if (listaEventos.length === 0) {
            console.warn(`⚠️ No hay eventos ${esEventoNTR ? 'NTR' : 'normales'}. Usando la otra lista.`);
            const listaFallback = esEventoNTR ? EVENTOS_DIARIOS : EVENTOS_NTR;
            if (listaFallback.length === 0) {
                console.error('❌ No hay eventos de ningún tipo configurados');
                return EVENTOS_DIARIOS[0];
            }
            return this.seleccionarDeLista(listaFallback);
        }
        
        console.log(`📅 Seleccionando evento ${esEventoNTR ? 'NTR' : 'normal'}...`);
        return this.seleccionarDeLista(listaEventos);
    },

    seleccionarDeLista: function(listaEventos) {
        const eventosVistos = JSON.parse(localStorage.getItem('eventos_diarios_vistos') || '[]');
        
        let eventosDisponibles = listaEventos.filter(e => !eventosVistos.includes(e.id));
        
        if (eventosDisponibles.length === 0) {
            localStorage.removeItem('eventos_diarios_vistos');
            eventosDisponibles = listaEventos;
        }
        
        const indice = Math.floor(Math.random() * eventosDisponibles.length);
        const evento = eventosDisponibles[indice];
        
        const nuevosVistos = JSON.parse(localStorage.getItem('eventos_diarios_vistos') || '[]');
        nuevosVistos.push(evento.id);
        localStorage.setItem('eventos_diarios_vistos', JSON.stringify(nuevosVistos));
        
        return evento;
    },

    guardarEventoHoy: function(evento) {
        const eventoData = {
            fecha: this.obtenerFechaActual(),
            evento: evento,
            requisitoCumplido: false,
            resultadoExitoMostrado: false,
            resultadoFracasoMostrado: false,
            fechaFracaso: null
        };
        
        localStorage.setItem('evento_diario_ultimo', JSON.stringify(eventoData));
        localStorage.setItem('evento_diario_actual', JSON.stringify(evento));
        _evGuardar('evento_diario_ultimo', eventoData);
        _evGuardar('evento_diario_actual', evento);
    },

    obtenerEventoHoy: function() {
        const eventoGuardado = localStorage.getItem('evento_diario_actual');
        return eventoGuardado ? JSON.parse(eventoGuardado) : null;
    },

    marcarRequisitoCumplido: function() {
        const ultimoEvento = JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}');
        const fechaHoy = this.obtenerFechaActual();
        const evento = this.obtenerEventoHoy();
        
        if (ultimoEvento.fecha === fechaHoy && !ultimoEvento.requisitoCumplido && evento && evento.tipo !== 'ntr') {
            // BUGFIX: guardar ambos flags ANTES del setTimeout para evitar que
            // iniciarEventoDiario vuelva a mostrar la ventana si el usuario está AFK
            ultimoEvento.requisitoCumplido = true;
            ultimoEvento.resultadoExitoMostrado = true;
            localStorage.setItem('evento_diario_ultimo', JSON.stringify(ultimoEvento));
            _evGuardar('evento_diario_ultimo', ultimoEvento);
            
            console.log('✅ Requisito del evento cumplido HOY - Mostrando éxito inmediato');
            
            setTimeout(() => {
                this.mostrarResultadoEvento(evento, true);
            }, 500);
            
            this.mostrarNotificacionEvento('✅ ¡Requisito cumplido!', '#4CAF50');
        }
    },

    marcarEventoFallido: function() {
        const ultimoEvento = JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}');
        const fechaHoy = this.obtenerFechaActual();
        const evento = this.obtenerEventoHoy();
        
        if (ultimoEvento.fecha === fechaHoy && !ultimoEvento.requisitoCumplido && evento && evento.tipo !== 'ntr') {
            ultimoEvento.fechaFracaso = fechaHoy;
            ultimoEvento.resultadoFracasoMostrado = false;
            localStorage.setItem('evento_diario_ultimo', JSON.stringify(ultimoEvento));
            
            console.log('❌ Evento fallido HOY - Se mostrará mañana');
        }
    },

    eventoExitoso: function() {
        const ultimoEvento = JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}');
        return ultimoEvento.requisitoCumplido === true;
    },

    eventoFallido: function() {
        const ultimoEvento = JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}');
        const fechaHoy = this.obtenerFechaActual();
        
        return !ultimoEvento.requisitoCumplido && ultimoEvento.fecha === fechaHoy;
    },

    debeMostrarFracasoAyer: function() {
        const ultimoEvento = JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}');
        const fechaHoy = this.obtenerFechaActual();
        
        return ultimoEvento.fechaFracaso && 
               ultimoEvento.fechaFracaso !== fechaHoy && 
               !ultimoEvento.resultadoFracasoMostrado;
    },

    obtenerEventoAyer: function() {
        return this.obtenerEventoHoy();
    },

    verificarRequisito: function(evento) {
        if (evento.tipo === 'ntr') return false;
        
        if (evento.tipoRequisito === 'mazos_completados') {
            const mazosHoy = this.obtenerMazosCompletadosHoy();
            console.log('📊 Verificando requisito HOY:', {
                mazosHoy: mazosHoy,
                requerido: evento.cantidadRequerida,
                resultado: mazosHoy >= evento.cantidadRequerida
            });
            return mazosHoy >= evento.cantidadRequerida;
        }
        return false;
    },

    aplicarConsecuencias: function(evento, exito) {
        console.log('🎯 Aplicando consecuencias del evento:', evento.id, 'Éxito:', exito);
        
        if (typeof quintillizasRPG === 'undefined') {
            console.error('❌ quintillizasRPG no está definido');
            this.mostrarNotificacionEvento('❌ Error: RPG no disponible', '#F44336');
            return false;
        }
        if (typeof sistemaEconomia === 'undefined') {
            console.error('❌ sistemaEconomia no está definido');
            this.mostrarNotificacionEvento('❌ Error: Economía no disponible', '#F44336');
            return false;
        }

        evento.personajes.forEach(personajeId => {
            if (quintillizasRPG.datosPersonajes && quintillizasRPG.datosPersonajes[personajeId]) {
                const afinidadActual = quintillizasRPG.datosPersonajes[personajeId].afinidad;
                const cambio = exito ? evento.afinidadExito : evento.afinidadFracaso;
                const nuevaAfinidad = Math.max(-100, Math.min(200, afinidadActual + cambio));
                
                quintillizasRPG.datosPersonajes[personajeId].afinidad = nuevaAfinidad;
                console.log(`✅ Evento: ${personajeId} afinidad ${cambio > 0 ? '+' : ''}${cambio} → ${nuevaAfinidad}`);
                
                this.mostrarNotificacionEvento(
                    `💖 ${personajeId}: ${cambio > 0 ? '+' : ''}${cambio} afinidad`,
                    cambio > 0 ? '#4CAF50' : '#F44336'
                );
            }
        });

        if (exito && evento.dineroRecompensa > 0) {
            sistemaEconomia.agregarDinero(evento.dineroRecompensa);
            console.log(`💰 +${evento.dineroRecompensa} soles por evento`);
            this.mostrarNotificacionEvento(`💰 +${evento.dineroRecompensa} soles`, '#FFD166');
            
            if (typeof actualizarContadorDineroInicio === 'function') {
                actualizarContadorDineroInicio();
            }
        }

        if (quintillizasRPG.guardarDatosPersonajes) {
            quintillizasRPG.guardarDatosPersonajes();
        }
        
        SistemaProgresoEventos.registrarResultado(evento.id, exito);
        
        return true;
    },

    procesarOpcionNTR: function(eventoId, opcionIndex) {
        const evento = EVENTOS_NTR.find(e => e.id === eventoId);
        if (!evento) return;
        
        const opcion = evento.opciones[opcionIndex];
        const esOpcionFiel = opcionIndex === 1;
        
        if (typeof quintillizasRPG !== 'undefined' && quintillizasRPG.datosPersonajes) {
            if (quintillizasRPG.datosPersonajes.nino) {
                quintillizasRPG.datosPersonajes.nino.afinidad += opcion.afinidadNino || 0;
                this.mostrarNotificacionEvento(
                    `👩 Nino: ${opcion.afinidadNino > 0 ? '+' : ''}${opcion.afinidadNino || 0} afinidad`,
                    opcion.afinidadNino > 0 ? '#4CAF50' : '#F44336'
                );
            }
            if (quintillizasRPG.datosPersonajes.ichika) {
                quintillizasRPG.datosPersonajes.ichika.afinidad += opcion.afinidadIchika || 0;
                this.mostrarNotificacionEvento(
                    `👩 Ichika: ${opcion.afinidadIchika > 0 ? '+' : ''}${opcion.afinidadIchika || 0} afinidad`,
                    opcion.afinidadIchika > 0 ? '#4CAF50' : '#F44336'
                );
            }
            if (quintillizasRPG.datosPersonajes.miku) {
                quintillizasRPG.datosPersonajes.miku.afinidad += opcion.afinidadMiku || 0;
                this.mostrarNotificacionEvento(
                    `👩 Miku: ${opcion.afinidadMiku > 0 ? '+' : ''}${opcion.afinidadMiku || 0} afinidad`,
                    opcion.afinidadMiku > 0 ? '#4CAF50' : '#F44336'
                );
            }
            if (quintillizasRPG.datosPersonajes.yotsuba) {
                quintillizasRPG.datosPersonajes.yotsuba.afinidad += opcion.afinidadYotsuba || 0;
                this.mostrarNotificacionEvento(
                    `👩 Yotsuba: ${opcion.afinidadYotsuba > 0 ? '+' : ''}${opcion.afinidadYotsuba || 0} afinidad`,
                    opcion.afinidadYotsuba > 0 ? '#4CAF50' : '#F44336'
                );
            }
            if (quintillizasRPG.datosPersonajes.itsuki) {
                quintillizasRPG.datosPersonajes.itsuki.afinidad += opcion.afinidadItsuki || 0;
                this.mostrarNotificacionEvento(
                    `👩 Itsuki: ${opcion.afinidadItsuki > 0 ? '+' : ''}${opcion.afinidadItsuki || 0} afinidad`,
                    opcion.afinidadItsuki > 0 ? '#4CAF50' : '#F44336'
                );
            }
            
            quintillizasRPG.guardarDatosPersonajes();
        }
        
        if (opcion.dinero > 0 && typeof sistemaEconomia !== 'undefined') {
            sistemaEconomia.agregarDinero(opcion.dinero);
            this.mostrarNotificacionEvento(`💰 +${opcion.dinero} soles`, '#FFD166');
            if (typeof actualizarContadorDineroInicio === 'function') {
                actualizarContadorDineroInicio();
            }
        }
        
        this.cerrarModalEvento();
        
        this.mostrarResultadoNTR(evento, opcion, esOpcionFiel);
        
        SistemaProgresoEventos.registrarResultado(evento.id, esOpcionFiel);
    },

    mostrarNotificacionEvento: function(mensaje, color = '#FF1493') {
        const notif = document.createElement('div');
        notif.textContent = mensaje;
        notif.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${color};
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0,0,0,0.4);
            z-index: 10000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2s forwards;
            font-size: 1rem;
            border: 2px solid white;
        `;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 2500);
    },

    mostrarModalEvento: function(evento) {
        const overlay = document.createElement('div');
        overlay.id = 'evento-modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.5s ease;
            padding: 20px;
            box-sizing: border-box;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            width: 100%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border-radius: 20px;
            padding: 25px;
            border: 3px solid #FF1493;
            box-shadow: 0 0 30px rgba(255, 20, 147, 0.5);
            position: relative;
            animation: zoomIn 0.5s ease;
            margin: auto;
        `;

        const esNTR = evento.tipo === 'ntr' && evento.opciones && evento.opciones.length > 0;

        const nombresPersonajes = evento.personajes ? evento.personajes.map(p => {
            const nombres = {
                'ichika': 'Ichika', 'nino': 'Nino', 'miku': 'Miku', 
                'yotsuba': 'Yotsuba', 'itsuki': 'Itsuki'
            };
            return nombres[p] || p;
        }).join(' • ') : '';

        let botonesHTML = '';
        if (esNTR) {
            botonesHTML = `
                <div style="display: flex; gap: 20px; justify-content: center; margin: 30px 0; flex-wrap: wrap;">
                    <button onclick="EventosDiarios.procesarOpcionNTR('${evento.id}', 0)" style="
                        background: linear-gradient(135deg, #F44336, #FF9800);
                        color: white;
                        font-size: clamp(1rem, 4vw, 1.3rem);
                        padding: 15px 25px;
                        border: none;
                        border-radius: 50px;
                        cursor: pointer;
                        font-weight: bold;
                        border: 3px solid white;
                        box-shadow: 0 0 20px #F44336;
                        transition: all 0.3s;
                        min-width: 250px;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        ${evento.opciones[0].texto}
                    </button>
                    
                    <button onclick="EventosDiarios.procesarOpcionNTR('${evento.id}', 1)" style="
                        background: linear-gradient(135deg, #4CAF50, #2196F3);
                        color: white;
                        font-size: clamp(1rem, 4vw, 1.3rem);
                        padding: 15px 25px;
                        border: none;
                        border-radius: 50px;
                        cursor: pointer;
                        font-weight: bold;
                        border: 3px solid white;
                        box-shadow: 0 0 20px #4CAF50;
                        transition: all 0.3s;
                        min-width: 250px;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        ${evento.opciones[1].texto}
                    </button>
                </div>
                
                <p style="color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-top: 10px;">
                    ⚠️ Tu decisión afectará tu relación con las 5 hermanas
                </p>
            `;
        } else {
            botonesHTML = `
                <button onclick="EventosDiarios.cerrarModalEvento()" style="
                    background: linear-gradient(135deg, #FF1493, #8A5AF7);
                    color: white;
                    font-size: clamp(1rem, 4vw, 1.5rem);
                    padding: 12px 30px;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: bold;
                    margin: 10px 0;
                    border: 2px solid white;
                    box-shadow: 0 0 15px #FF1493;
                    transition: all 0.3s;
                    width: auto;
                    min-width: 200px;
                    max-width: 90%;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    ¡ENTENDIDO, LO HARÉ!
                </button>
                <p style="color: rgba(255,255,255,0.5); font-size: 0.8rem; margin-top: 15px; padding: 0 10px;">
                    ⚡ Si completas el requisito HOY, verás el video de ÉXITO inmediatamente<br>
                    ❌ Si NO lo completas, verás el video de FRACASO mañana
                </p>
            `;
        }

        modal.innerHTML = `
            <div style="text-align: center; position: relative;">
                <button onclick="EventosDiarios.cerrarModalEvento()" style="
                    position: sticky;
                    top: 0;
                    float: right;
                    background: linear-gradient(135deg, #FF1493, #8A5AF7);
                    border: none;
                    color: white;
                    font-size: 24px;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    border: 2px solid white;
                    margin-bottom: 10px;
                    z-index: 10;
                " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    ✕
                </button>

                <h1 style="
                    color: #FFD166;
                    font-size: clamp(1.5rem, 5vw, 2.5rem);
                    margin-bottom: 15px;
                    text-shadow: 0 0 10px #FF1493;
                    padding-right: 45px;
                ">📅 ¡EVENTO DIARIO!</h1>

                <h2 style="
                    color: #FF1493;
                    font-size: clamp(1.2rem, 4vw, 2rem);
                    margin: 15px 0;
                    text-transform: uppercase;
                    word-break: break-word;
                ">${evento.titulo}</h2>

                <p style="
                    color: white;
                    font-size: clamp(0.9rem, 3vw, 1.2rem);
                    line-height: 1.5;
                    margin: 15px 0 25px 0;
                    padding: 0 10px;
                    max-width: 700px;
                    margin-left: auto;
                    margin-right: auto;
                ">${evento.descripcion}</p>

                ${evento.imagen ? `
                    <div style="
                        width: 100%;
                        max-width: 400px;
                        margin: 10px auto;
                        border-radius: 15px;
                        overflow: hidden;
                        border: 4px solid #FF1493;
                        box-shadow: 0 0 25px #FF1493;
                        background: #000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <img src="${evento.imagen}" alt="${evento.titulo}" style="
                            width: 100%;
                            height: auto;
                            display: block;
                            background-color: #000;
                        ">
                    </div>
                ` : ''}

                ${evento.video ? `
                    <div style="
                        width: 100%;
                        max-width: 560px;
                        margin: 20px auto;
                        border-radius: 15px;
                        overflow: hidden;
                        border: 4px solid #FF1493;
                        box-shadow: 0 0 25px #FF1493;
                        background: #000;
                    ">
                        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                            <iframe
                                src="https://drive.google.com/file/d/${evento.video}/preview"
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                                frameborder="0"
                                allow="autoplay; encrypted-media"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                ` : ''}

                ${evento.personajes ? `
                    <div style="
                        background: rgba(255, 20, 147, 0.2);
                        padding: 10px 20px;
                        border-radius: 50px;
                        display: inline-block;
                        margin: 10px auto;
                        font-size: clamp(0.9rem, 3vw, 1.3rem);
                        border: 2px solid #FF1493;
                        max-width: 90%;
                        word-break: break-word;
                    ">
                        👥 ${nombresPersonajes}
                    </div>
                ` : ''}

                ${!esNTR ? `
                    <div style="
                        background: linear-gradient(135deg, #5864F5, #8A5AF7);
                        padding: 15px;
                        border-radius: 15px;
                        margin: 20px 0;
                        font-size: clamp(1rem, 4vw, 1.5rem);
                        border: 3px solid white;
                    ">
                        🎯 REQUISITO: Completa ${evento.cantidadRequerida} MAZOS AL 100% hoy
                    </div>
                ` : ''}

                ${!esNTR ? `
                    <div style="
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 15px;
                        margin: 20px 0;
                    ">
                        <div style="
                            background: rgba(76, 175, 80, 0.2);
                            border: 3px solid #4CAF50;
                            border-radius: 15px;
                            padding: 15px;
                        ">
                            <h3 style="color: #4CAF50; font-size: clamp(1.2rem, 4vw, 1.8rem); margin-bottom: 10px;">✅ ÉXITO</h3>
                            ${evento.personajes.map(p => {
                                const nombre = p.charAt(0).toUpperCase() + p.slice(1);
                                return `<div style="color: white; font-size: clamp(0.9rem, 3vw, 1.2rem); margin: 5px 0;">${nombre}: +${evento.afinidadExito} afinidad</div>`;
                            }).join('')}
                            <div style="color: #FFD166; font-size: clamp(1rem, 3.5vw, 1.3rem); margin-top: 10px;">💰 +${evento.dineroRecompensa} soles</div>
                        </div>

                        <div style="
                            background: rgba(244, 67, 54, 0.2);
                            border: 3px solid #F44336;
                            border-radius: 15px;
                            padding: 15px;
                        ">
                            <h3 style="color: #F44336; font-size: clamp(1.2rem, 4vw, 1.8rem); margin-bottom: 10px;">❌ FRACASO</h3>
                            ${evento.personajes.map(p => {
                                const nombre = p.charAt(0).toUpperCase() + p.slice(1);
                                return `<div style="color: white; font-size: clamp(0.9rem, 3vw, 1.2rem); margin: 5px 0;">${nombre}: ${evento.afinidadFracaso} afinidad</div>`;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                ${botonesHTML}
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        if (!document.getElementById('evento-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'evento-modal-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @media (max-width: 480px) {
                    #evento-modal-overlay > div {
                        padding: 15px !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },

    cerrarModalEvento: function() {
        const overlay = document.getElementById('evento-modal-overlay');
        if (overlay) {
            overlay.remove();
        }
    },

    // ================================================
    // VERSIÓN CORREGIDA - Mostrar resultado con texto personalizado
    // ================================================
    mostrarResultadoEvento: function(evento, exito) {
        // Verificar que evento existe
        if (!evento) {
            console.error('❌ Error: evento es undefined en mostrarResultadoEvento');
            return;
        }
        
        const videoId = exito ? evento.videoExito : evento.videoFracaso;
        // CORREGIDO: Asegurar que el texto existe
        const textoPersonalizado = exito ? (evento.textoExito || '¡Has completado el evento con éxito!') : (evento.textoFracaso || 'No has podido completar el evento...');
        
        const overlay = document.createElement('div');
        overlay.id = 'evento-resultado-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.5s ease;
            padding: 20px;
            box-sizing: border-box;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            width: 100%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border-radius: 20px;
            padding: 25px;
            border: 4px solid ${exito ? '#4CAF50' : '#F44336'};
            box-shadow: 0 0 40px ${exito ? '#4CAF50' : '#F44336'};
            position: relative;
        `;

        const cambiosHTML = evento.personajes ? evento.personajes.map(p => {
            const nombre = p.charAt(0).toUpperCase() + p.slice(1);
            const cambio = exito ? evento.afinidadExito : evento.afinidadFracaso;
            return `<div style="color: white; font-size: clamp(0.9rem, 3vw, 1.2rem);">${nombre}: ${cambio > 0 ? '+' : ''}${cambio}</div>`;
        }).join('') : '';

        modal.innerHTML = `
            <div style="text-align: center; position: relative;">
                <button onclick="EventosDiarios.cerrarResultadoEvento()" style="
                    position: sticky;
                    top: 0;
                    float: right;
                    background: linear-gradient(135deg, ${exito ? '#4CAF50' : '#F44336'}, #8A5AF7);
                    border: none;
                    color: white;
                    font-size: 24px;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    border: 2px solid white;
                    margin-bottom: 10px;
                    z-index: 10;
                " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    ✕
                </button>

                <h1 style="
                    color: ${exito ? '#4CAF50' : '#F44336'};
                    font-size: clamp(1.8rem, 6vw, 3rem);
                    margin-bottom: 15px;
                    padding-right: 45px;
                ">${exito ? '✅ ¡EVENTO SUPERADO!' : '❌ EVENTO FALLIDO'}</h1>

                <h2 style="color: #FFD166; font-size: clamp(1.2rem, 4vw, 2rem); margin-bottom: 20px; word-break: break-word;">
                    ${evento.titulo || 'Evento'}
                </h2>

                <!-- TEXTO PERSONALIZADO - CORREGIDO -->
                <div style="
                    background: rgba(255, 255, 255, 0.1);
                    border-left: 4px solid ${exito ? '#4CAF50' : '#F44336'};
                    border-radius: 10px;
                    padding: 15px 20px;
                    margin: 15px 0 25px 0;
                    text-align: left;
                ">
                    <p style="color: white; font-size: clamp(1rem, 3.5vw, 1.2rem); line-height: 1.6; margin: 0; font-style: italic;">
                        "${textoPersonalizado}"
                    </p>
                </div>

                ${videoId ? `
                    <div style="
                        margin: 20px 0;
                        border: 3px solid ${exito ? '#4CAF50' : '#F44336'};
                        border-radius: 15px;
                        overflow: hidden;
                        background: black;
                    ">
                        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                            <iframe
                                src="https://drive.google.com/file/d/${videoId}/preview"
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                                frameborder="0"
                                allow="autoplay; encrypted-media"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                ` : ''}

                <div style="
                    background: rgba(0,0,0,0.5);
                    border-radius: 15px;
                    padding: 15px;
                    margin: 20px 0;
                ">
                    <h3 style="color: #FFD166; font-size: clamp(1.1rem, 4vw, 1.5rem); margin-bottom: 15px;">📊 CONSECUENCIAS</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        ${cambiosHTML ? `<div><h4 style="color: #FF1493; font-size: clamp(0.9rem, 3vw, 1.1rem);">💖 Afinidad</h4>${cambiosHTML}</div>` : ''}
                        ${exito && evento.dineroRecompensa > 0 ? `
                            <div>
                                <h4 style="color: #FFD166; font-size: clamp(0.9rem, 3vw, 1.1rem);">💰 Dinero</h4>
                                <div style="color: white; font-size: clamp(1.2rem, 4vw, 1.5rem);">+${evento.dineroRecompensa}</div>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <button onclick="EventosDiarios.cerrarResultadoEvento()" style="
                    background: linear-gradient(135deg, ${exito ? '#4CAF50' : '#F44336'}, #8A5AF7);
                    color: white;
                    font-size: clamp(1rem, 4vw, 1.3rem);
                    padding: 12px 30px;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: bold;
                    border: 2px solid white;
                    margin: 10px 0;
                    min-width: 200px;
                    max-width: 90%;
                ">
                    ↩️ VOLVER AL INICIO
                </button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    },

    mostrarResultadoNTR: function(evento, opcion, esOpcionFiel) {
        const overlay = document.createElement('div');
        overlay.id = 'evento-resultado-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.5s ease;
            padding: 20px;
            box-sizing: border-box;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            width: 100%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border-radius: 20px;
            padding: 25px;
            border: 4px solid ${esOpcionFiel ? '#4CAF50' : '#F44336'};
            box-shadow: 0 0 40px ${esOpcionFiel ? '#4CAF50' : '#F44336'};
            position: relative;
        `;

        const cambiosHTML = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 10px;">
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                    <span style="color: #FFD166;">Nino:</span> 
                    <span style="color: ${opcion.afinidadNino > 0 ? '#4CAF50' : '#F44336'}; font-weight: bold;">
                        ${opcion.afinidadNino > 0 ? '+' : ''}${opcion.afinidadNino || 0}
                    </span>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                    <span style="color: #FFD166;">Ichika:</span> 
                    <span style="color: ${opcion.afinidadIchika > 0 ? '#4CAF50' : '#F44336'}; font-weight: bold;">
                        ${opcion.afinidadIchika > 0 ? '+' : ''}${opcion.afinidadIchika || 0}
                    </span>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                    <span style="color: #FFD166;">Miku:</span> 
                    <span style="color: ${opcion.afinidadMiku > 0 ? '#4CAF50' : '#F44336'}; font-weight: bold;">
                        ${opcion.afinidadMiku > 0 ? '+' : ''}${opcion.afinidadMiku || 0}
                    </span>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                    <span style="color: #FFD166;">Yotsuba:</span> 
                    <span style="color: ${opcion.afinidadYotsuba > 0 ? '#4CAF50' : '#F44336'}; font-weight: bold;">
                        ${opcion.afinidadYotsuba > 0 ? '+' : ''}${opcion.afinidadYotsuba || 0}
                    </span>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                    <span style="color: #FFD166;">Itsuki:</span> 
                    <span style="color: ${opcion.afinidadItsuki > 0 ? '#4CAF50' : '#F44336'}; font-weight: bold;">
                        ${opcion.afinidadItsuki > 0 ? '+' : ''}${opcion.afinidadItsuki || 0}
                    </span>
                </div>
                ${opcion.dinero > 0 ? `
                    <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; grid-column: span 2;">
                        <span style="color: #FFD166;">Dinero:</span> 
                        <span style="color: #4CAF50; font-weight: bold;">+${opcion.dinero} soles</span>
                    </div>
                ` : ''}
            </div>
        `;

        modal.innerHTML = `
            <div style="text-align: center; position: relative;">
                <button onclick="EventosDiarios.cerrarResultadoEvento()" style="
                    position: sticky;
                    top: 0;
                    float: right;
                    background: linear-gradient(135deg, ${esOpcionFiel ? '#4CAF50' : '#F44336'}, #8A5AF7);
                    border: none;
                    color: white;
                    font-size: 24px;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    border: 2px solid white;
                    margin-bottom: 10px;
                    z-index: 10;
                " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    ✕
                </button>

                <h1 style="
                    color: ${esOpcionFiel ? '#4CAF50' : '#F44336'};
                    font-size: clamp(1.8rem, 6vw, 3rem);
                    margin-bottom: 15px;
                    padding-right: 45px;
                ">${esOpcionFiel ? '✅ ¡DECISIÓN CORRECTA!' : '❌ NTR ACTIVADO'}</h1>

                <h2 style="color: #FFD166; font-size: clamp(1.2rem, 4vw, 2rem); margin-bottom: 20px; word-break: break-word;">
                    ${evento.titulo}
                </h2>

                <!-- TEXTO PERSONALIZADO DEL RESULTADO -->
                <div style="
                    background: rgba(255, 255, 255, 0.1);
                    border-left: 4px solid ${esOpcionFiel ? '#4CAF50' : '#F44336'};
                    border-radius: 10px;
                    padding: 15px 20px;
                    margin: 15px 0 25px 0;
                    text-align: left;
                ">
                    <p style="color: white; font-size: clamp(1rem, 3.5vw, 1.2rem); line-height: 1.6; margin: 0; font-style: italic;">
                        "${opcion.textoResultado || ''}"
                    </p>
                </div>

                <div style="
                    margin: 20px 0;
                    border: 3px solid ${esOpcionFiel ? '#4CAF50' : '#F44336'};
                    border-radius: 15px;
                    overflow: hidden;
                    background: black;
                ">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe
                            src="https://drive.google.com/file/d/${opcion.video}/preview"
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                            frameborder="0"
                            allow="autoplay; encrypted-media"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>

                <div style="
                    background: rgba(0,0,0,0.5);
                    border-radius: 15px;
                    padding: 15px;
                    margin: 20px 0;
                ">
                    <h3 style="color: #FFD166; font-size: clamp(1.1rem, 4vw, 1.5rem); margin-bottom: 15px;">📊 CONSECUENCIAS</h3>
                    ${cambiosHTML}
                </div>

                <button onclick="EventosDiarios.cerrarResultadoEvento()" style="
                    background: linear-gradient(135deg, ${esOpcionFiel ? '#4CAF50' : '#F44336'}, #8A5AF7);
                    color: white;
                    font-size: clamp(1rem, 4vw, 1.3rem);
                    padding: 12px 30px;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: bold;
                    border: 2px solid white;
                    margin: 10px 0;
                    min-width: 200px;
                    max-width: 90%;
                ">
                    ↩️ VOLVER AL INICIO
                </button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    },

    // ================================================
    // VERSIÓN CORREGIDA - cerrarResultadoEvento con creación de nuevo evento
    // ================================================
    cerrarResultadoEvento: function() {
        const overlay = document.getElementById('evento-resultado-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Actualizar barra de progreso
        this.actualizarBarraProgreso();
        
        // CORREGIDO: Verificar si debemos mostrar un nuevo evento
        setTimeout(() => {
            this.verificarYMostrarNuevoEvento();
        }, 500);
    },

    // ================================================
    // NUEVA FUNCIÓN - Verificar y mostrar nuevo evento después de cerrar resultado
    // ================================================
    verificarYMostrarNuevoEvento: function() {
        const ultimoEvento = JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}');
        const fechaHoy = this.obtenerFechaActual();
        
        // Si el resultado que se acaba de cerrar es de HOY (éxito o fracaso ya procesado),
        // no volver a mostrar nada — el evento del día ya terminó
        if (ultimoEvento.fecha === fechaHoy && 
            (ultimoEvento.requisitoCumplido || ultimoEvento.resultadoFracasoMostrado)) {
            console.log('📅 Evento de hoy ya procesado — no se muestra nada más');
            return;
        }
        
        // Si el evento que acabamos de cerrar es de un día anterior (fracaso)
        // y no hay evento para hoy, crear uno nuevo
        if (ultimoEvento.fecha !== fechaHoy || !ultimoEvento.fecha) {
            console.log('📅 Creando nuevo evento después de cerrar resultado...');
            const nuevoEvento = this.seleccionarEventoAleatorio();
            this.guardarEventoHoy(nuevoEvento);
            
            setTimeout(() => {
                this.mostrarModalEvento(nuevoEvento);
            }, 500);
        }
    },

    mostrarUltimoResultado: function() {
        const ultimoEvento = JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}');
        const evento = this.obtenerEventoHoy();
        
        if (evento && ultimoEvento.resultadoExitoMostrado) {
            this.mostrarResultadoEvento(evento, true);
        } else if (evento && ultimoEvento.resultadoFracasoMostrado) {
            this.mostrarResultadoEvento(evento, false);
        } else if (evento && ultimoEvento.requisitoCumplido && !ultimoEvento.resultadoExitoMostrado) {
            this.mostrarResultadoEvento(evento, true);
            ultimoEvento.resultadoExitoMostrado = true;
            localStorage.setItem('evento_diario_ultimo', JSON.stringify(ultimoEvento));
        } else if (evento && !ultimoEvento.requisitoCumplido && ultimoEvento.fechaFracaso) {
            this.mostrarResultadoEvento(evento, false);
            ultimoEvento.resultadoFracasoMostrado = true;
            localStorage.setItem('evento_diario_ultimo', JSON.stringify(ultimoEvento));
        } else {
            this.mostrarNotificacionEvento('No hay resultados pendientes.', '#FF9800');
        }
    },

    verificarProgresoEvento: function() {
        const ultimoEvento = JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}');
        const eventoActual = this.obtenerEventoHoy();
        const fechaHoy = this.obtenerFechaActual();
        
        if (ultimoEvento.fecha === fechaHoy && 
            !ultimoEvento.requisitoCumplido && 
            eventoActual && 
            eventoActual.tipo !== 'ntr') {
            
            const mazosHoy = this.obtenerMazosCompletadosHoy();
            
            if (mazosHoy >= eventoActual.cantidadRequerida) {
                this.marcarRequisitoCumplido();
            }
        }
        
        this.verificarFinDelDia();
    },

    // ================================================
    // VERSIÓN CORREGIDA - iniciarEventoDiario con mejor manejo de estados
    // ================================================
    iniciarEventoDiario: function() {
        console.log('📅 Iniciando sistema de eventos diarios...');
        
        const ultimoEventoStr = localStorage.getItem('evento_diario_ultimo');
        const fechaHoy = this.obtenerFechaActual();
        
        // Limpiar cualquier overlay residual
        this.limpiarOverlays();
        
        if (!ultimoEventoStr) {
            // Primera vez
            console.log('🎲 Primera vez - Creando nuevo evento...');
            const evento = this.seleccionarEventoAleatorio();
            this.guardarEventoHoy(evento);
            
            setTimeout(() => {
                this.mostrarModalEvento(evento);
            }, 500);
            return;
        }
        
        try {
            const ultimoEvento = JSON.parse(ultimoEventoStr);
            const eventoGuardado = this.obtenerEventoHoy();
            
            // CASO 1: Mostrar fracaso de ayer
            if (this.debeMostrarFracasoAyer()) {
                console.log('🎬 Mostrando video de FRACASO del día anterior...');
                
                if (eventoGuardado) {
                    this.mostrarResultadoEvento(eventoGuardado, false);
                    
                    ultimoEvento.resultadoFracasoMostrado = true;
                    localStorage.setItem('evento_diario_ultimo', JSON.stringify(ultimoEvento));
                    
                    // IMPORTANTE: No crear nuevo evento aquí, se creará al cerrar
                }
                return;
            }
            
            // CASO 2: Mostrar éxito pendiente de hoy
            if (ultimoEvento.fecha === fechaHoy && 
                ultimoEvento.requisitoCumplido && 
                !ultimoEvento.resultadoExitoMostrado && 
                eventoGuardado) {
                
                console.log('🎬 Mostrando video de ÉXITO pendiente de hoy...');
                this.mostrarResultadoEvento(eventoGuardado, true);
                
                ultimoEvento.resultadoExitoMostrado = true;
                localStorage.setItem('evento_diario_ultimo', JSON.stringify(ultimoEvento));
                return;
            }
            
            // CASO 3: Día nuevo
            if (ultimoEvento.fecha !== fechaHoy) {
                console.log('🎲 Día nuevo - Verificando evento anterior...');
                
                const eventoAnterior = eventoGuardado;
                
                // Si el evento anterior no fue exitoso y no es NTR, marcar para mostrar fracaso
                if (!ultimoEvento.requisitoCumplido && eventoAnterior && eventoAnterior.tipo !== 'ntr' && !ultimoEvento.resultadoFracasoMostrado) {
                    console.log('📝 Marcando evento anterior como fallido para mostrar hoy');
                    ultimoEvento.fechaFracaso = ultimoEvento.fecha;
                    ultimoEvento.resultadoFracasoMostrado = false;
                    localStorage.setItem('evento_diario_ultimo', JSON.stringify(ultimoEvento));
                    
                    // Mostrar el fracaso ahora
                    setTimeout(() => {
                        this.mostrarResultadoEvento(eventoAnterior, false);
                        ultimoEvento.resultadoFracasoMostrado = true;
                        localStorage.setItem('evento_diario_ultimo', JSON.stringify(ultimoEvento));
                    }, 500);
                } else {
                    // Si no hay fracaso que mostrar, crear nuevo evento directamente
                    console.log('🎲 Creando nuevo evento para hoy...');
                    const nuevoEvento = this.seleccionarEventoAleatorio();
                    this.guardarEventoHoy(nuevoEvento);
                    
                    setTimeout(() => {
                        this.mostrarModalEvento(nuevoEvento);
                    }, 500);
                }
                return;
            }
            
            // CASO 4: Mismo día, evento ya mostrado
            console.log('📅 Ya hay evento para hoy - verificando si debemos mostrarlo');
            
            // Verificar si el evento de hoy ya se mostró
            const eventoHoyMostrado = localStorage.getItem('evento_hoy_mostrado') === fechaHoy;
            
            if (!eventoHoyMostrado && eventoGuardado) {
                console.log('🎬 Mostrando evento de hoy (no mostrado aún)');
                this.mostrarModalEvento(eventoGuardado);
                localStorage.setItem('evento_hoy_mostrado', fechaHoy);
            }
            
            this.actualizarBarraProgreso();
            
        } catch (e) {
            console.error('Error al procesar evento:', e);
            // En caso de error, reiniciar
            localStorage.removeItem('evento_diario_ultimo');
            localStorage.removeItem('evento_diario_actual');
            this.iniciarEventoDiario();
        }
    },

    // Limpiar overlays residuales
    limpiarOverlays: function() {
        const overlays = [
            'evento-modal-overlay',
            'evento-resultado-overlay'
        ];
        
        overlays.forEach(id => {
            const overlay = document.getElementById(id);
            if (overlay) {
                overlay.remove();
            }
        });
    },

    crearContenedorProgreso: function() {
        if (document.getElementById('eventos-progreso-container')) {
            return;
        }

        const contenedor = document.createElement('div');
        contenedor.id = 'eventos-progreso-container';
        contenedor.style.cssText = `
            position: fixed;
            bottom: 75px;
            right: 20px;
            z-index: 1000;
            width: 350px;
            max-width: calc(100vw - 40px);
            transition: all 0.3s ease;
        `;

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'toggle-progreso-btn';
        toggleBtn.innerHTML = '📅';
        toggleBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: linear-gradient(135deg, #FF1493, #8A5AF7);
            border: 2px solid white;
            color: white;
            font-size: 1.3rem;
            cursor: pointer;
            box-shadow: 0 0 15px rgba(255,20,147,0.5);
            z-index: 1002;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        `;
        toggleBtn.onmouseover = () => toggleBtn.style.transform = 'scale(1.1)';
        toggleBtn.onmouseout = () => toggleBtn.style.transform = 'scale(1)';
        toggleBtn.onclick = () => this.alternarVisibilidadBarra();

        const contenido = document.createElement('div');
        contenido.id = 'progreso-contenido';
        contenido.style.transition = 'opacity 0.3s ease';

        const visible = obtenerEstadoVisibilidadBarra();
        contenido.style.display = visible ? 'block' : 'none';
        // El botón siempre se ve, solo cambia el emoji

        contenedor.appendChild(toggleBtn);
        contenedor.appendChild(contenido);
        document.body.appendChild(contenedor);

        this.actualizarBarraProgreso();
    },

    alternarVisibilidadBarra: function() {
        const contenido = document.getElementById('progreso-contenido');
        if (!contenido) return;

        const visible = contenido.style.display !== 'none';
        const nuevaVisibilidad = !visible;
        contenido.style.display = nuevaVisibilidad ? 'block' : 'none';
        guardarEstadoVisibilidadBarra(nuevaVisibilidad);
    },

    actualizarBarraProgreso: function() {
        const contenido = document.getElementById('progreso-contenido');
        if (contenido) {
            contenido.innerHTML = SistemaProgresoEventos.crearBarraProgreso();
        }
    },

    verificarFinDelDia: function() {
        const ultimoEvento = JSON.parse(localStorage.getItem('evento_diario_ultimo') || '{}');
        const fechaHoy = this.obtenerFechaActual();
        const ahora = new Date();
        const hora = ahora.getHours();
        
        if (hora >= 23 || hora < 3) {
            if (ultimoEvento.fecha === fechaHoy && !ultimoEvento.requisitoCumplido && !ultimoEvento.fechaFracaso) {
                this.marcarEventoFallido();
            }
        }
    },

    inicializar: function() {
        this.crearContenedorProgreso();

        const intentarInicio = () => {
            const sincLista = window._sincronizacionLista === true;
            const depListas = typeof sistemaEconomia !== 'undefined' && typeof quintillizasRPG !== 'undefined';

            if (sincLista && depListas) {
                console.log('🚀 Todo listo — iniciando eventos diarios');
                this.iniciarEventoDiario();
                setInterval(() => this.verificarProgresoEvento(), 60000);
            } else {
                if (!sincLista) console.warn('⏳ Esperando sincronización con Supabase...');
                if (!depListas) console.warn('⏳ Esperando dependencias RPG/Economía...');
                setTimeout(intentarInicio, 500);
            }
        };

        // Arrancar inmediatamente, reintenta cada 500ms hasta que todo esté listo
        intentarInicio();
    }

















};

// ================================================
// CHECKER DE PROGRESO PARA EVENTOS DIARIOS
// ================================================

const EventosChecker = {
    verificarProgresoEvento: function() {
        if (typeof EventosDiarios !== 'undefined' && typeof sistemaEconomia !== 'undefined') {
            EventosDiarios.verificarProgresoEvento();
        }
    },
    
    registrarMazoDiario: function() {
        try {
            const f = new Date();
            const fecha = `${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,'0')}-${String(f.getDate()).padStart(2,'0')}`;
            const pd = JSON.parse(localStorage.getItem('progreso_mazos_diario') || '{}');
            pd[fecha] = (parseInt(pd[fecha]) || 0) + 1;
            localStorage.setItem('progreso_mazos_diario', JSON.stringify(pd));
            _evGuardar('progreso_mazos_diario', pd);
            console.log(`🃏 Mazo registrado: ${pd[fecha]} mazos hoy (${fecha})`);
        } catch(e) {
            console.error('Error registrando mazo diario:', e);
        }
    },

    inicializar: function() {
        if (typeof sistemaEconomia !== 'undefined' && sistemaEconomia.actualizarProgreso) {
            const originalActualizarProgreso = sistemaEconomia.actualizarProgreso;
            sistemaEconomia.actualizarProgreso = function(contenedor, sub, mazo, porcentaje) {
                originalActualizarProgreso.call(this, contenedor, sub, mazo, porcentaje);
                
                if (porcentaje === 100) {
                    EventosChecker.registrarMazoDiario();
                    EventosChecker.verificarProgresoEvento();
                    if (typeof EventosDiarios !== 'undefined' && EventosDiarios.actualizarBarraProgreso) {
                        setTimeout(() => EventosDiarios.actualizarBarraProgreso(), 100);
                    }
                }
            };
            console.log('✅ EventosChecker inicializado correctamente');
        } else {
            console.warn('⚠️ No se pudo inicializar EventosChecker: sistemaEconomia no disponible');
        }
    }
};

// Inicializar eventos y checker al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    EventosDiarios.inicializar();
    
    setTimeout(() => {
        EventosChecker.inicializar();
    }, 2000);
});

// Exponer globalmente
window.EventosDiarios = EventosDiarios;
window.SistemaProgresoEventos = SistemaProgresoEventos;
window.EventosChecker = EventosChecker;
