// ================================================
// SISTEMA PORTUGUÉS — Alfabeto y Fonética
// Todo en un solo archivo: datos + interfaz + quiz
// Uso: portuguesSistema.cargarPagina()
// ================================================

const portuguesSistema = (() => {

    // ─────────────────────────────────────────────
    // DATOS
    // ─────────────────────────────────────────────

    const MAZOS = [
        {
            id: 1,
            titulo: "Mazo 1 — Vocales Orales",
            letras: "A E I O U",
            cartas: [
                { portugues: "A a", pronunciacion: "/a/", como: "como 'a' en 'agua'", ejemplo: "água", traduccion: "agua", opciones: ["/a/ como en 'agua'", "/e/ como en 'era'", "/i/ como en 'isla'", "/o/ como en 'oso'"], respuesta: 0 },
                { portugues: "E e", pronunciacion: "/e/i/", como: "suena como 'e' o 'i'", ejemplo: "escola", traduccion: "escuela", opciones: ["/e/i variable", "/a/ como en 'agua'", "/o/ como en 'oso'", "/u/ como en 'uva'"], respuesta: 0 },
                { portugues: "I i", pronunciacion: "/i/", como: "como 'i' en 'isla'", ejemplo: "igreja", traduccion: "iglesia", opciones: ["/i/ como en 'isla'", "/e/ como en 'era'", "/a/ como en 'agua'", "/o/ como en 'oso'"], respuesta: 0 },
                { portugues: "O o", pronunciacion: "/o/u/", como: "suena como 'o' o 'u'", ejemplo: "olho", traduccion: "ojo", opciones: ["/o/u variable", "/a/ como en 'agua'", "/e/ como en 'era'", "/i/ como en 'isla'"], respuesta: 0 },
                { portugues: "U u", pronunciacion: "/u/", como: "como 'u' en 'uva'", ejemplo: "uva", traduccion: "uva", opciones: ["/u/ como en 'uva'", "/o/ como en 'oso'", "/i/ como en 'isla'", "/a/ como en 'agua'"], respuesta: 0 }
            ]
        },
        {
            id: 2,
            titulo: "Mazo 2 — Vocales Nasales",
            letras: "Ã Õ Â Ê Ô",
            cartas: [
                { portugues: "Ã ã", pronunciacion: "/ã/", como: "'a' nasal (como 'an' francés)", ejemplo: "pão", traduccion: "pan", opciones: ["/a/ nasal", "/a/ normal", "/e/ nasal", "/o/ nasal"], respuesta: 0 },
                { portugues: "Õ õ", pronunciacion: "/õ/", como: "'o' nasal", ejemplo: "corações", traduccion: "corazones", opciones: ["/o/ nasal", "/o/ normal", "/a/ nasal", "/e/ nasal"], respuesta: 0 },
                { portugues: "Â â", pronunciacion: "/â/", como: "'a' cerrada/tona", ejemplo: "câmara", traduccion: "cámara", opciones: ["/a/ cerrada", "/a/ abierta", "/e/ cerrada", "/o/ cerrada"], respuesta: 0 },
                { portugues: "Ê ê", pronunciacion: "/ê/", como: "'e' cerrada (no diptonga)", ejemplo: "três", traduccion: "tres", opciones: ["/e/ cerrada", "/e/ abierta", "/i/ corta", "/a/ abierta"], respuesta: 0 },
                { portugues: "Ô ô", pronunciacion: "/ô/", como: "'o' cerrada", ejemplo: "avô", traduccion: "abuelo", opciones: ["/o/ cerrada", "/o/ abierta", "/u/ corta", "/a/ abierta"], respuesta: 0 }
            ]
        },
        {
            id: 3,
            titulo: "Mazo 3 — Consonantes Especiales",
            letras: "Ç NH LH RR SS",
            cartas: [
                { portugues: "Ç ç", pronunciacion: "/s/", como: "'s' como en 'sol' (cedilla)", ejemplo: "coração", traduccion: "corazón", opciones: ["/s/ como en 'sol'", "/k/ como en 'kilo'", "/z/ sonora", "/ch/ española"], respuesta: 0 },
                { portugues: "NH nh", pronunciacion: "/ñ/", como: "'ñ' como en 'español'", ejemplo: "manhã", traduccion: "mañana", opciones: ["/ñ/ como en español", "/n/ normal", "/ng/ inglesa", "/ny/ catalana"], respuesta: 0 },
                { portugues: "LH lh", pronunciacion: "/ʎ/", como: "'lli' en 'millón' o 'gl' italiana", ejemplo: "filho", traduccion: "hijo", opciones: ["/lli/ como en 'millón'", "/l/ normal", "/ly/ combinada", "/lh/ inglesa"], respuesta: 0 },
                { portugues: "RR rr", pronunciacion: "/ʁ/", como: "'j' francesa o 'h' aspirada fuerte", ejemplo: "carro", traduccion: "coche", opciones: ["/ʁ/ como 'j' fuerte", "/r/ suave", "/rr/ italiana", "/d/ suave"], respuesta: 0 },
                { portugues: "SS ss", pronunciacion: "/s/", como: "'s' como en 'sol'", ejemplo: "passar", traduccion: "pasar", opciones: ["/s/ como en 'sol'", "/z/ sonora", "/sh/ inglesa", "/s/ doble larga"], respuesta: 0 }
            ]
        },
        {
            id: 4,
            titulo: "Mazo 4 — Consonantes (A-N)",
            letras: "B C D F G H J L M N",
            cartas: [
                { portugues: "B b", pronunciacion: "/b/", como: "'b' como en 'boca'", ejemplo: "bom", traduccion: "bueno", opciones: ["/b/ como en 'boca'", "/v/ como en 'vaso'", "/p/ como en 'pan'", "/d/ como en 'dado'"], respuesta: 0 },
                { portugues: "C c", pronunciacion: "/k/s/", como: "'k' antes de a/o/u, 's' antes de e/i", ejemplo: "casa / céu", traduccion: "casa / cielo", opciones: ["/k/ o /s/ según vocal", "/s/ siempre", "/k/ siempre", "/z/ sonora"], respuesta: 0 },
                { portugues: "D d", pronunciacion: "/d/yi/", como: "'d' o 'yi' antes de e/i (Brasil)", ejemplo: "dia", traduccion: "día", opciones: ["/d/ o 'yi' (Brasil)", "/t/ como en 'taza'", "/b/ como en 'boca'", "/n/ como en 'nada'"], respuesta: 0 },
                { portugues: "F f", pronunciacion: "/f/", como: "'f' como en 'foca'", ejemplo: "fácil", traduccion: "fácil", opciones: ["/f/ como en 'foca'", "/v/ como en 'vaso'", "/p/ como en 'pan'", "/ph/ aspirada"], respuesta: 0 },
                { portugues: "G g", pronunciacion: "/g/yi/", como: "'g' o 'yi' antes de e/i", ejemplo: "gato / gente", traduccion: "gato / gente", opciones: ["/g/ o 'yi' según vocal", "/g/ siempre", "/j/ española", "/h/ aspirada"], respuesta: 0 },
                { portugues: "H h", pronunciacion: "(muda)", como: "no suena al inicio de palabra", ejemplo: "hora", traduccion: "hora", opciones: ["muda (no suena)", "/h/ aspirada inglesa", "/j/ española", "/ch/ suave"], respuesta: 0 },
                { portugues: "J j", pronunciacion: "/y/", como: "'y' fuerte como 'je' francés", ejemplo: "janela", traduccion: "ventana", opciones: ["/y/ fuerte como 'je' francés", "/j/ española", "/h/ aspirada", "/g/ suave"], respuesta: 0 },
                { portugues: "L l", pronunciacion: "/l/u/", como: "'l' o 'u' al final de sílaba", ejemplo: "sol", traduccion: "sol", opciones: ["/l/ o 'u' al final", "/l/ siempre clara", "/r/ suave", "/n/ nasal"], respuesta: 0 },
                { portugues: "M m", pronunciacion: "/m/", como: "'m' como en 'mamá' (también nasaliza)", ejemplo: "mãe", traduccion: "madre", opciones: ["/m/ como en 'mamá'", "/n/ como en 'nada'", "/b/ como en 'boca'", "/p/ como en 'pan'"], respuesta: 0 },
                { portugues: "N n", pronunciacion: "/n/", como: "'n' como en 'nada' (también nasaliza)", ejemplo: "não", traduccion: "no", opciones: ["/n/ como en 'nada'", "/m/ como en 'mamá'", "/l/ como en 'luna'", "/r/ suave"], respuesta: 0 }
            ]
        },
        {
            id: 5,
            titulo: "Mazo 5 — Consonantes (P-Z)",
            letras: "P Q R S T V X Z",
            cartas: [
                { portugues: "P p", pronunciacion: "/p/", como: "'p' como en 'pan'", ejemplo: "pão", traduccion: "pan", opciones: ["/p/ como en 'pan'", "/b/ como en 'boca'", "/ph/ aspirada", "/f/ como en 'foca'"], respuesta: 0 },
                { portugues: "Q q", pronunciacion: "/k/", como: "'k' siempre seguido de u", ejemplo: "queijo", traduccion: "queso", opciones: ["/k/ siempre con u", "/ku/ combinado", "/kw/ inglesa", "/q/ árabe"], respuesta: 0 },
                { portugues: "R r", pronunciacion: "/ʁ/h/", como: "'j' francesa al inicio, 'r' suave entre vocales", ejemplo: "rato", traduccion: "ratón", opciones: ["/ʁ/ como 'j' francesa", "/r/ suave española", "/rr/ vibrante", "/d/ suave"], respuesta: 0 },
                { portugues: "S s", pronunciacion: "/s/z/ʃ/", como: "'s', 'z' o 'sh' según posición", ejemplo: "sim / casa", traduccion: "sí / casa", opciones: ["/s/, /z/ o /sh/ según posición", "/s/ siempre", "/z/ siempre", "/x/ griega"], respuesta: 0 },
                { portugues: "T t", pronunciacion: "/t/tʃi/", como: "'t' o 'tchi' antes de e/i (Brasil)", ejemplo: "tchau", traduccion: "adiós", opciones: ["/t/ o 'tchi' (Brasil)", "/d/ como en 'dado'", "/th/ inglesa", "/tch/ francesa"], respuesta: 0 },
                { portugues: "V v", pronunciacion: "/v/", como: "'v' labiodental (diferente de 'b')", ejemplo: "vida", traduccion: "vida", opciones: ["/v/ labiodental", "/b/ como en 'boca'", "/w/ inglesa", "/f/ como en 'foca'"], respuesta: 0 },
                { portugues: "X x", pronunciacion: "/ʃ/s/z/", como: "'sh', 's', 'z' o 'ks'", ejemplo: "xícara", traduccion: "taza", opciones: ["/sh/, /s/, /z/ o /ks/", "/ks/ siempre", "/x/ griega", "/z/ sonora"], respuesta: 0 },
                { portugues: "Z z", pronunciacion: "/z/ʒ/", como: "'z' sonora o 'zh' como 'je' francés", ejemplo: "zero", traduccion: "cero", opciones: ["/z/ o /zh/ francesa", "/s/ como en 'sol'", "/x/ griega", "/dz/ italiana"], respuesta: 0 }
            ]
        },
        {
            id: 6,
            titulo: "Mazo 6 — Dígrafos Nasales",
            letras: "AM EM IM OM UM ÃO",
            cartas: [
                { portugues: "AM am", pronunciacion: "/ɐ̃w̃/", como: "'an' nasal (al final de palabra)", ejemplo: "bem", traduccion: "bien", opciones: ["/an/ nasal final", "/am/ claro", "/a/ normal", "/en/ nasal"], respuesta: 0 },
                { portugues: "EM em", pronunciacion: "/ẽj̃/", como: "'en' nasal con semivocal", ejemplo: "tempo", traduccion: "tiempo", opciones: ["/en/ nasal con semivocal", "/em/ claro", "/in/ nasal", "/on/ nasal"], respuesta: 0 },
                { portugues: "IM im", pronunciacion: "/ĩ/", como: "'in' nasal", ejemplo: "sim", traduccion: "sí", opciones: ["/in/ nasal", "/im/ claro", "/in/ normal", "/en/ nasal"], respuesta: 0 },
                { portugues: "OM om", pronunciacion: "/õw̃/", como: "'on' nasal", ejemplo: "bom", traduccion: "bueno", opciones: ["/on/ nasal", "/om/ claro", "/un/ nasal", "/an/ nasal"], respuesta: 0 },
                { portugues: "UM um", pronunciacion: "/ũ/", como: "'un' nasal", ejemplo: "um", traduccion: "uno", opciones: ["/un/ nasal", "/um/ claro", "/un/ normal", "/on/ nasal"], respuesta: 0 },
                { portugues: "ÃO ão", pronunciacion: "/ɐ̃w̃/", como: "'an' + 'w' nasal (sonido único portugués)", ejemplo: "pão", traduccion: "pan", opciones: ["/an/ + /w/ nasal", "/ao/ claro", "/a/ + /o/ separados", "/na/ + /o/"], respuesta: 0 },
                { portugues: "QU qu", pronunciacion: "/k/", como: "'k' antes de e/i (la u no suena)", ejemplo: "quente", traduccion: "caliente", opciones: ["/k/ (u muda)", "/kw/ inglesa", "/ku/ combinado", "/qu/ latina"], respuesta: 0 },
                { portugues: "GU gu", pronunciacion: "/g/", como: "'g' antes de e/i (la u no suena)", ejemplo: "guerra", traduccion: "guerra", opciones: ["/g/ (u muda)", "/gw/ inglesa", "/gu/ claro", "/gü/ diéresis"], respuesta: 0 }
            ]
        },
        {
            id: 7,
            titulo: "Mazo 7 — Palabras Básicas",
            letras: "Olá Obrigado Sim Não Tchau",
            cartas: [
                { portugues: "Olá", pronunciacion: "/olá/", como: "saludo: ¡Hola!", ejemplo: "Olá, tudo bem?", traduccion: "Hola, ¿todo bien?", opciones: ["¡Hola!", "¡Adiós!", "¡Gracias!", "¡Por favor!"], respuesta: 0 },
                { portugues: "Obrigado/a", pronunciacion: "/obligadu/a/", como: "gracias (hombre/mujer)", ejemplo: "Muito obrigado!", traduccion: "¡Muchas gracias!", opciones: ["¡Gracias! (gendered)", "¡Hola!", "¡Adiós!", "¡De nada!"], respuesta: 0 },
                { portugues: "Sim", pronunciacion: "/sĩ/", como: "afirmación: Sí (nasal)", ejemplo: "Sim, por favor", traduccion: "Sí, por favor", opciones: ["Sí", "No", "Tal vez", "OK"], respuesta: 0 },
                { portugues: "Não", pronunciacion: "/nɐ̃w̃/", como: "negación: No (nasal)", ejemplo: "Não, obrigado", traduccion: "No, gracias", opciones: ["No", "Sí", "Quizás", "Nunca"], respuesta: 0 },
                { portugues: "Tchau", pronunciacion: "/tʃaw/", como: "despedida informal: ¡Adiós!", ejemplo: "Tchau, até amanhã!", traduccion: "¡Adiós, hasta mañana!", opciones: ["¡Adiós! (informal)", "¡Hola!", "¡Buenas noches!", "¡Bienvenido!"], respuesta: 0 },
                { portugues: "Bom dia", pronunciacion: "/bõw día/", como: "saludo de mañana", ejemplo: "Bom dia, tudo bem?", traduccion: "¡Buenos días!", opciones: ["¡Buenos días!", "¡Buenas tardes!", "¡Buenas noches!", "¡Hola!"], respuesta: 0 }
            ]
        },
        {
            id: 8,
            titulo: "Mazo 8 — Frases Útiles",
            letras: "Como vai? Eu não entendo Por favor",
            cartas: [
                { portugues: "Como vai?", pronunciacion: "/comu vai?/", como: "¿Cómo estás? / ¿Cómo va?", ejemplo: "Olá, como vai?", traduccion: "Hola, ¿cómo estás?", opciones: ["¿Cómo estás?/¿Cómo va?", "¿Qué hora es?", "¿Cómo te llamas?", "¿Dónde vives?"], respuesta: 0 },
                { portugues: "Eu não entendo", pronunciacion: "/eu nɐ̃w̃ entẽdu/", como: "No entiendo", ejemplo: "Desculpe, eu não entendo", traduccion: "Disculpe, no entiendo", opciones: ["No entiendo", "Entiendo", "No sé", "Lo siento"], respuesta: 0 },
                { portugues: "Por favor", pronunciacion: "/por favor/", como: "por favor (cortesía)", ejemplo: "Um café, por favor", traduccion: "Un café, por favor", opciones: ["Por favor", "Gracias", "De nada", "Hola"], respuesta: 0 },
                { portugues: "De nada", pronunciacion: "/dʒi nada/", como: "de nada (respuesta a gracias)", ejemplo: "Obrigado! — De nada", traduccion: "¡Gracias! — De nada", opciones: ["De nada", "Gracias", "Hola", "Adiós"], respuesta: 0 },
                { portugues: "Desculpe", pronunciacion: "/descúlpi/", como: "perdón / disculpe", ejemplo: "Desculpe, onde é o banheiro?", traduccion: "Disculpe, ¿dónde está el baño?", opciones: ["Perdón/Discupe", "Gracias", "Hola", "Bienvenido"], respuesta: 0 },
                { portugues: "Muito", pronunciacion: "/mũitu/", como: "mucho / muy", ejemplo: "Muito bom!", traduccion: "¡Muy bueno!", opciones: ["Mucho/Muy", "Poco", "Nada", "Más"], respuesta: 0 },
                { portugues: "Bem", pronunciacion: "/bẽj̃/", como: "bien (nasal)", ejemplo: "Estou bem", traduccion: "Estoy bien", opciones: ["Bien", "Mal", "Regular", "Muy"], respuesta: 0 },
                { portugues: "Mal", pronunciacion: "/maw/", como: "mal", ejemplo: "Estou mal", traduccion: "Estoy mal", opciones: ["Mal", "Bien", "Regular", "Muy"], respuesta: 0 },
                { portugues: "Onde?", pronunciacion: "/õdʒi?/", como: "¿Dónde?", ejemplo: "Onde você mora?", traduccion: "¿Dónde vives?", opciones: ["¿Dónde?", "¿Qué?", "¿Cuándo?", "¿Quién?"], respuesta: 0 },
                { portugues: "Aqui", pronunciacion: "/akí/", como: "aquí", ejemplo: "Estou aqui", traduccion: "Estoy aquí", opciones: ["Aquí", "Allí", "Donde", "Lejos"], respuesta: 0 }
            ]
        }
    ];

    // ─────────────────────────────────────────────
    // ESTADO
    // ─────────────────────────────────────────────

    let cartasActuales = [];
    let indiceActual = 0;
    let aciertos = 0;
    let errores = 0;
    let esperando = false;
    let mazoActualId = null;
    const progreso = JSON.parse(localStorage.getItem('portugues_progreso') || '{}');

    // ─────────────────────────────────────────────
    // ESTILOS
    // ─────────────────────────────────────────────

    function inyectarEstilos() {
        if (document.getElementById('portugues-styles')) return;
        const style = document.createElement('style');
        style.id = 'portugues-styles';
        style.textContent = `
            .portugues-wrap { max-width: 700px; margin: 0 auto; padding: 20px; font-family: inherit; }
            .portugues-titulo { text-align: center; color: #2ECC71; font-size: 1.8rem; margin-bottom: 8px; }
            .portugues-sub { text-align: center; opacity: 0.7; margin-bottom: 30px; }
            .portugues-mazos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; margin-bottom: 30px; }
            .portugues-mazo-card {
                background: rgba(255,255,255,0.05);
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 15px;
                padding: 18px 12px;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .portugues-mazo-card:hover { border-color: #2ECC71; background: rgba(46,204,113,0.15); transform: translateY(-3px); }
            .portugues-mazo-card.completado { border-color: #4CAF50; background: rgba(76,175,80,0.1); }
            .portugues-mazo-letras { font-size: 1.4rem; letter-spacing: 3px; margin-bottom: 6px; color: #FFD166; }
            .portugues-mazo-nombre { font-size: 0.8rem; opacity: 0.7; }
            .portugues-badge { display: inline-block; margin-top: 8px; font-size: 0.75rem; padding: 3px 10px; border-radius: 99px; background: rgba(76,175,80,0.2); color: #4CAF50; }

            .portugues-barra-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: 25px; }
            .portugues-barra-bg { flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
            .portugues-barra-fill { height: 100%; background: linear-gradient(135deg, #2ECC71, #27AE60); border-radius: 3px; transition: width 0.3s ease; }
            .portugues-barra-txt { font-size: 0.85rem; opacity: 0.7; min-width: 50px; text-align: right; }

            .portugues-carta {
                background: rgba(255,255,255,0.05);
                border: 2px solid rgba(46,204,113,0.3);
                border-radius: 20px;
                padding: 30px 20px;
                text-align: center;
                margin-bottom: 25px;
            }
            .portugues-letra-grande { font-size: 90px; line-height: 1; margin-bottom: 10px; }
            .portugues-letra-info { font-size: 0.85rem; opacity: 0.6; }

            .portugues-opciones { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
            .portugues-opcion {
                padding: 15px; background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.15);
                border-radius: 12px; color: #fff; cursor: pointer; font-size: 0.95rem; transition: all 0.2s;
            }
            .portugues-opcion:hover { background: rgba(255,255,255,0.15); }
            .portugues-opcion.correcta { background: rgba(46,204,113,0.4); border-color: #2ECC71; }
            .portugues-opcion.incorrecta { background: rgba(244,67,54,0.4); border-color: #f44336; }
            .portugues-opcion.deshabilitada { pointer-events: none; opacity: 0.5; }

            .portugues-feedback { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center; display: none; }
            .portugues-feedback.visible { display: block; }
            .portugues-feedback-pron { font-size: 1.2rem; font-weight: bold; margin-bottom: 8px; color: #FFD166; }
            .portugues-feedback-ej { opacity: 0.8; font-size: 0.9rem; }

            .portugues-btn-sig {
                display: none; width: 100%; padding: 15px;
                background: linear-gradient(135deg, #2ECC71, #27AE60);
                border: none; border-radius: 12px; color: #fff;
                font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-top: 20px;
                transition: all 0.2s;
            }
            .portugues-btn-sig.visible { display: block; }
            .portugues-btn-sig:hover { transform: translateY(-2px); }

            .portugues-btn-cancelar {
                display: block; width: 100%; padding: 12px; margin-top: 12px;
                background: transparent; border: 1px solid rgba(255,255,255,0.2);
                border-radius: 12px; color: rgba(255,255,255,0.6);
                cursor: pointer; font-size: 0.9rem; transition: all 0.2s;
            }
            .portugues-btn-cancelar:hover { background: rgba(255,255,255,0.05); }

            .portugues-resultado { text-align: center; padding: 40px 20px; }
            .portugues-resultado-emoji { font-size: 60px; margin-bottom: 15px; }
            .portugues-resultado-titulo { font-size: 1.6rem; font-weight: bold; color: #2ECC71; margin-bottom: 8px; }
            .portugues-stats { display: flex; gap: 15px; justify-content: center; margin: 20px 0; }
            .portugues-stat { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px 25px; text-align: center; }
            .portugues-stat-num { font-size: 1.8rem; font-weight: bold; color: #FFD166; }
            .portugues-stat-label { font-size: 0.8rem; opacity: 0.7; margin-top: 4px; }
            .portugues-btn-menu {
                display: inline-block; padding: 12px 30px; margin-top: 10px;
                background: linear-gradient(135deg, #2ECC71, #27AE60);
                border: none; border-radius: 12px; color: white;
                font-size: 1rem; font-weight: bold; cursor: pointer;
                transition: all 0.2s;
            }
            .portugues-btn-menu:hover { transform: translateY(-2px); }
        `;
        document.head.appendChild(style);
    }

    // ─────────────────────────────────────────────
    // PANTALLAS
    // ─────────────────────────────────────────────

    function cargarPagina() {
        inyectarEstilos();
        const section = document.getElementById('manga-section');
        section.style.display = 'block';
        section.innerHTML = renderMenu();
    }

    function renderMenu() {
        const cards = MAZOS.map(m => {
            const hecho = progreso[m.id];
            return `
                <div class="portugues-mazo-card ${hecho ? 'completado' : ''}" onclick="portuguesSistema._iniciarMazo(${m.id})">
                    <div class="portugues-mazo-letras">${m.letras.split(' ').slice(0,4).join(' ')}</div>
                    <div class="portugues-mazo-nombre">${m.titulo}</div>
                    ${hecho ? '<span class="portugues-badge">✓ Completado</span>' : ''}
                </div>
            `;
        }).join('');

        return `
            <div class="portugues-wrap">
                <h2 class="portugues-titulo">🇵🇹🇧🇷 Portugués</h2>
                <p class="portugues-sub">Alfabeto, fonética y vocabulario básico — elige un mazo para practicar</p>
                <div class="portugues-mazos-grid">${cards}</div>
            </div>
        `;
    }

    function _iniciarMazo(id) {
        const mazo = MAZOS.find(m => m.id === id);
        if (!mazo) return;
        mazoActualId = id;
        cartasActuales = [...mazo.cartas].sort(() => Math.random() - 0.5);
        indiceActual = 0;
        aciertos = 0;
        errores = 0;
        esperando = false;
        _renderQuiz();
    }

    function _renderQuiz() {
        const section = document.getElementById('manga-section');
        section.innerHTML = `<div class="portugues-wrap" id="portugues-quiz-wrap"></div>`;
        _mostrarCarta();
    }

    function _mostrarCarta() {
        const carta = cartasActuales[indiceActual];
        const total = cartasActuales.length;
        const pct = Math.round((indiceActual / total) * 100);

        document.getElementById('portugues-quiz-wrap').innerHTML = `
            <div class="portugues-barra-wrap">
                <div class="portugues-barra-bg"><div class="portugues-barra-fill" style="width:${pct}%"></div></div>
                <div class="portugues-barra-txt">${indiceActual} / ${total}</div>
            </div>

            <div class="portugues-carta">
                <div class="portugues-letra-grande">${carta.portugues}</div>
                <div class="portugues-letra-info">Letra o palabra portuguesa</div>
            </div>

            <div class="portugues-opciones" id="portugues-opciones">
                ${carta.opciones.map((op, i) => `
                    <button class="portugues-opcion" onclick="portuguesSistema._verificar(${i})">${op}</button>
                `).join('')}
            </div>

            <div class="portugues-feedback" id="portugues-feedback">
                <div class="portugues-feedback-pron" id="portugues-fb-pron"></div>
                <div class="portugues-feedback-ej" id="portugues-fb-ej"></div>
            </div>

            <button class="portugues-btn-sig" id="portugues-btn-sig" onclick="portuguesSistema._siguiente()">
                ${indiceActual + 1 < total ? 'Siguiente letra ➡️' : 'Ver resultados 🏁'}
            </button>

            <button class="portugues-btn-cancelar" onclick="portuguesSistema._volverMenu()">Cancelar quiz</button>
        `;
        esperando = false;
    }

    function _verificar(sel) {
        if (esperando) return;
        esperando = true;

        const carta = cartasActuales[indiceActual];
        const correcta = sel === carta.respuesta;

        document.querySelectorAll('.portugues-opcion').forEach((btn, i) => {
            if (i === carta.respuesta) btn.classList.add('correcta');
            else if (i === sel && !correcta) btn.classList.add('incorrecta');
            btn.disabled = true;
        });

        const fb = document.getElementById('portugues-feedback');
        document.getElementById('portugues-fb-pron').textContent =
            (correcta ? '✅ ¡Correcto! — ' : '❌ Incorrecto — ') + carta.portugues + '  ' + carta.pronunciacion;
        document.getElementById('portugues-fb-ej').textContent =
            carta.como + ' — Ej: ' + carta.ejemplo + ' (' + carta.traduccion + ')';
        fb.classList.add('visible');

        if (correcta) aciertos++; else errores++;

        document.getElementById('portugues-btn-sig').classList.add('visible');

        // Auto-advance después de 1 segundo si respondió correctamente
        if (correcta) {
            setTimeout(() => {
                _siguiente();
            }, 1000);
        }
    }

    function _siguiente() {
        indiceActual++;
        if (indiceActual < cartasActuales.length) {
            _mostrarCarta();
        } else {
            _mostrarResultado();
        }
    }

    function _mostrarResultado() {
        const total = cartasActuales.length;
        const pct = Math.round((aciertos / total) * 100);

        progreso[mazoActualId] = pct >= 70;
        try { localStorage.setItem('portugues_progreso', JSON.stringify(progreso)); } catch(e) {}

        let emoji, titulo;
        if (pct === 100)     { emoji = '🌟'; titulo = '¡Perfecto!'; }
        else if (pct >= 70)  { emoji = '✅'; titulo = '¡Buen trabajo!'; }
        else                 { emoji = '🔄'; titulo = 'Sigue practicando'; }

        document.getElementById('portugues-quiz-wrap').innerHTML = `
            <div class="portugues-resultado">
                <div class="portugues-resultado-emoji">${emoji}</div>
                <div class="portugues-resultado-titulo">${titulo}</div>
                <div class="portugues-stats">
                    <div class="portugues-stat"><div class="portugues-stat-num">${aciertos}</div><div class="portugues-stat-label">Correctas</div></div>
                    <div class="portugues-stat"><div class="portugues-stat-num">${errores}</div><div class="portugues-stat-label">Errores</div></div>
                    <div class="portugues-stat"><div class="portugues-stat-num">${pct}%</div><div class="portugues-stat-label">Precisión</div></div>
                </div>
                <button class="portugues-btn-menu" onclick="portuguesSistema._iniciarMazo(${mazoActualId})">🔄 Repetir mazo</button>
                <button class="portugues-btn-menu" onclick="portuguesSistema.cargarPagina()">📋 Volver al menú</button>
            </div>
        `;
    }

    function _volverMenu() {
        cargarPagina();
    }

    // ─────────────────────────────────────────────
    // API PÚBLICA
    // ─────────────────────────────────────────────

    return {
        cargarPagina,
        _iniciarMazo,
        _verificar,
        _siguiente,
        _volverMenu
    };

})();

// ─────────────────────────────────────────────
// FUNCIÓN GLOBAL — se llama desde el index.html
// ─────────────────────────────────────────────

function cargarPaginaPortugues() {
    if (typeof ocultarHeader === 'function') ocultarHeader();
    if (typeof modoActual !== 'undefined') modoActual = 'portugues';

    portuguesSistema.cargarPagina();

    if (typeof crearBotonVolver === 'function' && typeof volverAlInicio === 'function') {
        const mangaSection = document.getElementById('manga-section');
        const botonVolver = crearBotonVolver(volverAlInicio);
        mangaSection.insertBefore(botonVolver, mangaSection.firstChild);
    }
}
