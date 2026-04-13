// ================================================
// SISTEMA RUSO — Alfabeto Cirílico
// Todo en un solo archivo: datos + interfaz + quiz
// Uso: rusoSistema.cargarPagina()
// ================================================

const rusoSistema = (() => {

    // ─────────────────────────────────────────────
    // DATOS
    // ─────────────────────────────────────────────

    const MAZOS = [
        {
            id: 1,
            titulo: "Mazo 1 — А до И",
            letras: "А Б В Г Д Е Ё Ж З И",
            cartas: [
                { ruso: "А а", pronunciacion: "/a/", como: "como 'a' en 'agua'", ejemplo: "аист", traduccion: "cigüeña", opciones: ["/a/ como en 'agua'", "/o/ como en 'oso'", "/e/ como en 'era'", "/i/ como en 'isla'"], respuesta: 0 },
                { ruso: "Б б", pronunciacion: "/b/", como: "como 'b' en 'boca'", ejemplo: "банк", traduccion: "banco", opciones: ["/p/ como en 'pan'", "/b/ como en 'boca'", "/v/ como en 'vaso'", "/d/ como en 'dado'"], respuesta: 1 },
                { ruso: "В в", pronunciacion: "/v/", como: "como 'v' en 'vaso'", ejemplo: "вода", traduccion: "agua", opciones: ["/b/ como en 'boca'", "/f/ como en 'foca'", "/v/ como en 'vaso'", "/w/ inglés"], respuesta: 2 },
                { ruso: "Г г", pronunciacion: "/g/", como: "como 'g' en 'gato'", ejemplo: "год", traduccion: "año", opciones: ["/j/ como en 'jota'", "/k/ como en 'kilo'", "/h/ inglés", "/g/ como en 'gato'"], respuesta: 3 },
                { ruso: "Д д", pronunciacion: "/d/", como: "como 'd' en 'dado'", ejemplo: "дом", traduccion: "casa", opciones: ["/d/ como en 'dado'", "/t/ como en 'taza'", "/n/ como en 'noche'", "/l/ como en 'luna'"], respuesta: 0 },
                { ruso: "Е е", pronunciacion: "/ye/", como: "como 'ye' en 'yeso'", ejemplo: "ест", traduccion: "come", opciones: ["/e/ como en 'era'", "/i/ como en 'isla'", "/ye/ como en 'yeso'", "/yo/ como en 'yogur'"], respuesta: 2 },
                { ruso: "Ё ё", pronunciacion: "/yo/", como: "como 'yo' en 'yogur'", ejemplo: "ёж", traduccion: "erizo", opciones: ["/ye/ como en 'yeso'", "/yo/ como en 'yogur'", "/o/ como en 'oso'", "/yu/ como en 'yuca'"], respuesta: 1 },
                { ruso: "Ж ж", pronunciacion: "/zh/", como: "'j' francesa de 'jour', suave y sonora", ejemplo: "жук", traduccion: "escarabajo", opciones: ["/sh/ inglés 'show'", "/ch/ como en 'chico'", "/zh/ 'j' francesa de 'jour'", "/s/ como en 'sol'"], respuesta: 2 },
                { ruso: "З з", pronunciacion: "/z/", como: "'z' sonora, parecida a 'ds'", ejemplo: "зима", traduccion: "invierno", opciones: ["/s/ como en 'sol'", "/ts/ como en 'pizza'", "/z/ sonora parecida a 'ds'", "/zh/ francesa"], respuesta: 2 },
                { ruso: "И и", pronunciacion: "/i/", como: "como 'i' en 'isla'", ejemplo: "имя", traduccion: "nombre", opciones: ["/i/ como en 'isla'", "/y/ como en 'yoyo'", "/e/ como en 'era'", "/a/ como en 'agua'"], respuesta: 0 }
            ]
        },
        {
            id: 2,
            titulo: "Mazo 2 — Й до Т",
            letras: "Й К Л М Н О П Р С Т",
            cartas: [
                { ruso: "Й й", pronunciacion: "/y/", como: "como 'y' en 'yoyo', muy breve", ejemplo: "йод", traduccion: "yodo", opciones: ["/i/ como en 'isla'", "/y/ breve como en 'yoyo'", "/ye/ como en 'yeso'", "/j/ como en 'jota'"], respuesta: 1 },
                { ruso: "К к", pronunciacion: "/k/", como: "como 'k' en 'kilo'", ejemplo: "кот", traduccion: "gato", opciones: ["/g/ como en 'gato'", "/h/ inglés", "/k/ como en 'kilo'", "/c/ como en 'casa'"], respuesta: 2 },
                { ruso: "Л л", pronunciacion: "/l/", como: "como 'l' en 'luna'", ejemplo: "лук", traduccion: "cebolla", opciones: ["/r/ vibrante", "/l/ como en 'luna'", "/n/ como en 'noche'", "/m/ como en 'mamá'"], respuesta: 1 },
                { ruso: "М м", pronunciacion: "/m/", como: "como 'm' en 'mamá'", ejemplo: "мама", traduccion: "mamá", opciones: ["/n/ como en 'noche'", "/m/ como en 'mamá'", "/b/ como en 'boca'", "/p/ como en 'pan'"], respuesta: 1 },
                { ruso: "Н н", pronunciacion: "/n/", como: "como 'n' en 'noche'", ejemplo: "нос", traduccion: "nariz", opciones: ["/m/ como en 'mamá'", "/n/ como en 'noche'", "/l/ como en 'luna'", "/r/ vibrante"], respuesta: 1 },
                { ruso: "О о", pronunciacion: "/o/", como: "como 'o' en 'oso'", ejemplo: "окно", traduccion: "ventana", opciones: ["/a/ como en 'agua'", "/u/ como en 'uva'", "/e/ como en 'era'", "/o/ como en 'oso'"], respuesta: 3 },
                { ruso: "П п", pronunciacion: "/p/", como: "como 'p' en 'pan'", ejemplo: "парк", traduccion: "parque", opciones: ["/b/ como en 'boca'", "/p/ como en 'pan'", "/t/ como en 'taza'", "/f/ como en 'foca'"], respuesta: 1 },
                { ruso: "Р р", pronunciacion: "/r/", como: "vibrante fuerte, como 'rr'", ejemplo: "рот", traduccion: "boca", opciones: ["/l/ como en 'luna'", "/r/ suave como en 'cara'", "/r/ vibrante como 'rr'", "/n/ como en 'noche'"], respuesta: 2 },
                { ruso: "С с", pronunciacion: "/s/", como: "como 's' en 'sol'", ejemplo: "сон", traduccion: "sueño", opciones: ["/s/ como en 'sol'", "/z/ sonora", "/sh/ inglés 'show'", "/ts/ como en 'pizza'"], respuesta: 0 },
                { ruso: "Т т", pronunciacion: "/t/", como: "como 't' en 'taza'", ejemplo: "том", traduccion: "tomo", opciones: ["/d/ como en 'dado'", "/t/ como en 'taza'", "/ts/ como en 'pizza'", "/k/ como en 'kilo'"], respuesta: 1 }
            ]
        },
        {
            id: 3,
            titulo: "Mazo 3 — У до Я",
            letras: "У Ф Х Ц Ч Ш Щ Э Ю Я",
            cartas: [
                { ruso: "У у", pronunciacion: "/u/", como: "como 'u' en 'uva'", ejemplo: "ум", traduccion: "inteligencia", opciones: ["/o/ como en 'oso'", "/u/ como en 'uva'", "/yu/ como en 'yuca'", "/a/ como en 'agua'"], respuesta: 1 },
                { ruso: "Ф ф", pronunciacion: "/f/", como: "como 'f' en 'foca'", ejemplo: "факт", traduccion: "hecho", opciones: ["/v/ como en 'vaso'", "/p/ como en 'pan'", "/f/ como en 'foca'", "/b/ como en 'boca'"], respuesta: 2 },
                { ruso: "Х х", pronunciacion: "/j/", como: "como 'j' española pero más suave", ejemplo: "хлеб", traduccion: "pan", opciones: ["/k/ como en 'kilo'", "/g/ como en 'gato'", "/h/ fuerte aspirada", "/j/ suave como 'j' española"], respuesta: 3 },
                { ruso: "Ц ц", pronunciacion: "/ts/", como: "como 'ts' en 'pizza'", ejemplo: "цирк", traduccion: "circo", opciones: ["/s/ como en 'sol'", "/ts/ como en 'pizza'", "/ch/ como en 'chico'", "/z/ sonora"], respuesta: 1 },
                { ruso: "Ч ч", pronunciacion: "/ch/", como: "como 'ch' en 'chico'", ejemplo: "час", traduccion: "hora", opciones: ["/sh/ inglés 'show'", "/ts/ como en 'pizza'", "/ch/ como en 'chico'", "/zh/ francesa"], respuesta: 2 },
                { ruso: "Ш ш", pronunciacion: "/sh/", como: "como 'sh' en inglés 'show'", ejemplo: "шар", traduccion: "globo", opciones: ["/s/ como en 'sol'", "/ch/ como en 'chico'", "/zh/ francesa", "/sh/ inglés 'show'"], respuesta: 3 },
                { ruso: "Щ щ", pronunciacion: "/shch/", como: "'sh' larga y suave", ejemplo: "щека", traduccion: "mejilla", opciones: ["/sh/ normal", "/shch/ 'sh' larga y suave", "/ch/ como en 'chico'", "/s/ como en 'sol'"], respuesta: 1 },
                { ruso: "Э э", pronunciacion: "/e/", como: "como 'e' en 'era', sin diptongo", ejemplo: "эхо", traduccion: "eco", opciones: ["/a/ como en 'agua'", "/ye/ como en 'yeso'", "/e/ pura como en 'era'", "/i/ como en 'isla'"], respuesta: 2 },
                { ruso: "Ю ю", pronunciacion: "/yu/", como: "como 'yu' en 'yuca'", ejemplo: "юг", traduccion: "sur", opciones: ["/u/ como en 'uva'", "/yo/ como en 'yogur'", "/ye/ como en 'yeso'", "/yu/ como en 'yuca'"], respuesta: 3 },
                { ruso: "Я я", pronunciacion: "/ya/", como: "como 'ya' en 'yate'", ejemplo: "яблоко", traduccion: "manzana", opciones: ["/ya/ como en 'yate'", "/a/ como en 'agua'", "/ye/ como en 'yeso'", "/yo/ como en 'yogur'"], respuesta: 0 }
            ]
        },
        {
            id: 4,
            titulo: "Mazo 4 — Signos especiales",
            letras: "Ъ Ы Ь",
            cartas: [
                { ruso: "Ъ ъ", pronunciacion: "(signo duro)", como: "sin sonido, endurece la vocal siguiente", ejemplo: "объект", traduccion: "objeto", opciones: ["Suaviza la consonante anterior", "Sin sonido, endurece la vocal siguiente", "Sonido /o/ como en 'oso'", "Sonido /b/ como en 'boca'"], respuesta: 1 },
                { ruso: "Ы ы", pronunciacion: "/y'/", como: "'i' pronunciada en la parte trasera de la boca", ejemplo: "мы", traduccion: "nosotros", opciones: ["/i/ normal como en 'isla'", "/u/ como en 'uva'", "/y'/ 'i' pronunciada atrás", "/e/ como en 'era'"], respuesta: 2 },
                { ruso: "Ь ь", pronunciacion: "(signo blando)", como: "sin sonido, suaviza la consonante anterior", ejemplo: "день", traduccion: "día", opciones: ["Suaviza la consonante anterior", "Sin sonido, endurece la vocal siguiente", "Sonido /l/ como en 'luna'", "Sonido /y/ como en 'yoyo'"], respuesta: 0 }
            ]
        },
        {
            id: 5,
            titulo: "Mazo 5 — Repaso difíciles",
            letras: "Ж З Й Х Ц Ч Ш Щ Ы Э",
            cartas: [
                { ruso: "Ж ж", pronunciacion: "/zh/", como: "'j' francesa de 'jour'", ejemplo: "жук", traduccion: "escarabajo", opciones: ["/sh/ inglés 'show'", "/ch/ como en 'chico'", "/zh/ 'j' francesa de 'jour'", "/s/ como en 'sol'"], respuesta: 2 },
                { ruso: "З з", pronunciacion: "/z/", como: "'z' sonora, parecida a 'ds'", ejemplo: "зима", traduccion: "invierno", opciones: ["/s/ como en 'sol'", "/z/ sonora parecida a 'ds'", "/ts/ como en 'pizza'", "/zh/ francesa"], respuesta: 1 },
                { ruso: "Й й", pronunciacion: "/y/", como: "como 'y' en 'yoyo', muy breve", ejemplo: "йод", traduccion: "yodo", opciones: ["/i/ como en 'isla'", "/ye/ como en 'yeso'", "/y/ breve como en 'yoyo'", "/j/ como en 'jota'"], respuesta: 2 },
                { ruso: "Х х", pronunciacion: "/j/", como: "como 'j' española pero más suave", ejemplo: "хлеб", traduccion: "pan", opciones: ["/k/ como en 'kilo'", "/j/ suave como 'j' española", "/g/ como en 'gato'", "/h/ fuerte aspirada"], respuesta: 1 },
                { ruso: "Ц ц", pronunciacion: "/ts/", como: "como 'ts' en 'pizza'", ejemplo: "цирк", traduccion: "circo", opciones: ["/ch/ como en 'chico'", "/s/ como en 'sol'", "/ts/ como en 'pizza'", "/z/ sonora"], respuesta: 2 },
                { ruso: "Ч ч", pronunciacion: "/ch/", como: "como 'ch' en 'chico'", ejemplo: "час", traduccion: "hora", opciones: ["/sh/ inglés 'show'", "/ts/ como en 'pizza'", "/zh/ francesa", "/ch/ como en 'chico'"], respuesta: 3 },
                { ruso: "Ш ш", pronunciacion: "/sh/", como: "como 'sh' en inglés 'show'", ejemplo: "шар", traduccion: "globo", opciones: ["/s/ como en 'sol'", "/zh/ francesa", "/sh/ inglés 'show'", "/ch/ como en 'chico'"], respuesta: 2 },
                { ruso: "Щ щ", pronunciacion: "/shch/", como: "'sh' larga y suave", ejemplo: "щека", traduccion: "mejilla", opciones: ["/shch/ 'sh' larga y suave", "/sh/ normal", "/ch/ como en 'chico'", "/s/ como en 'sol'"], respuesta: 0 },
                { ruso: "Ы ы", pronunciacion: "/y'/", como: "'i' pronunciada en la parte trasera de la boca", ejemplo: "мы", traduccion: "nosotros", opciones: ["/u/ como en 'uva'", "/i/ normal como en 'isla'", "/e/ como en 'era'", "/y'/ 'i' pronunciada atrás"], respuesta: 3 },
                { ruso: "Э э", pronunciacion: "/e/", como: "como 'e' en 'era', sin diptongo", ejemplo: "эхо", traduccion: "eco", opciones: ["/ye/ como en 'yeso'", "/e/ pura como en 'era'", "/i/ como en 'isla'", "/a/ como en 'agua'"], respuesta: 1 }
            ]
        },
        {
            id: 6,
            titulo: "Mazo 6 — Frases útiles y expresiones",
            letras: "Хорошо Плохо Спасибо Почему",
            cartas: [
                { ruso: "Хорошо", pronunciacion: "/jarashó/", como: "¡Bien! / ¡De acuerdo!", ejemplo: "Всё хорошо", traduccion: "Todo está bien", opciones: ["¡Bien! / ¡De acuerdo!", "Mal", "Tal vez", "No sé"], respuesta: 0 },
                { ruso: "Плохо", pronunciacion: "/plója/", como: "Mal", ejemplo: "Мне плохо", traduccion: "Me siento mal", opciones: ["Mal", "Bien", "Regular", "Excelente"], respuesta: 0 },
                { ruso: "Нормально", pronunciacion: "/normalna/", como: "Normal / Está bien", ejemplo: "Всё нормально", traduccion: "Todo normal", opciones: ["Normal / Está bien", "Mal", "Muy bien", "Terrible"], respuesta: 0 },
                { ruso: "Отлично", pronunciacion: "/atlíchna/", como: "¡Excelente! / ¡Genial!", ejemplo: "Отличная работа!", traduccion: "¡Excelente trabajo!", opciones: ["¡Excelente! / ¡Genial!", "Mal", "Regular", "Horrible"], respuesta: 0 },
                { ruso: "Пожалуйста", pronunciacion: "/pazhálusta/", como: "Por favor / De nada", ejemplo: "Пожалуйста, помогите", traduccion: "Por favor, ayude", opciones: ["Por favor / De nada", "Gracias", "Hola", "Adiós"], respuesta: 0 },
                { ruso: "Извините", pronunciacion: "/izviníti/", como: "Perdón / Disculpe (formal)", ejemplo: "Извините, пожалуйста", traduccion: "Disculpe, por favor", opciones: ["Perdón / Disculpe (formal)", "Gracias", "Hola", "Bienvenido"], respuesta: 0 },
                { ruso: "Что?", pronunciacion: "/shto?/", como: "¿Qué?", ejemplo: "Что это?", traduccion: "¿Qué es esto?", opciones: ["¿Qué?", "¿Dónde?", "¿Cuándo?", "¿Quién?"], respuesta: 0 },
                { ruso: "Где?", pronunciacion: "/gdyé?/", como: "¿Dónde?", ejemplo: "Где ты?", traduccion: "¿Dónde estás?", opciones: ["¿Dónde?", "¿Qué?", "¿Cuándo?", "¿Por qué?"], respuesta: 0 },
                { ruso: "Когда?", pronunciacion: "/kagdá?/", como: "¿Cuándo?", ejemplo: "Когда придёшь?", traduccion: "¿Cuándo vendrás?", opciones: ["¿Cuándo?", "¿Dónde?", "¿Qué?", "¿Cómo?"], respuesta: 0 },
                { ruso: "Почему?", pronunciacion: "/pachimú?/", como: "¿Por qué?", ejemplo: "Почему нет?", traduccion: "¿Por qué no?", opciones: ["¿Por qué?", "¿Dónde?", "¿Cuándo?", "¿Quién?"], respuesta: 0 },
                { ruso: "Как?", pronunciacion: "/kak?/", como: "¿Cómo?", ejemplo: "Как дела?", traduccion: "¿Cómo estás?", opciones: ["¿Cómo?", "¿Qué?", "¿Dónde?", "¿Por qué?"], respuesta: 0 },
                { ruso: "Кто?", pronunciacion: "/kto?/", como: "¿Quién?", ejemplo: "Кто это?", traduccion: "¿Quién es esto?", opciones: ["¿Quién?", "¿Qué?", "¿Dónde?", "¿Cuándo?"], respuesta: 0 },
                { ruso: "Я не понимаю", pronunciacion: "/ya ni panimáyu/", como: "No entiendo", ejemplo: "Извините, я не понимаю", traduccion: "Disculpe, no entiendo", opciones: ["No entiendo", "Entiendo", "No sé", "Lo siento"], respuesta: 0 },
                { ruso: "Я понимаю", pronunciacion: "/ya panimáyu/", como: "Entiendo", ejemplo: "Да, я понимаю", traduccion: "Sí, entiendo", opciones: ["Entiendo", "No entiendo", "Tal vez", "No sé"], respuesta: 0 },
                { ruso: "Я не знаю", pronunciacion: "/ya ni znáyu/", como: "No sé", ejemplo: "Я не знаю, извините", traduccion: "No sé, disculpe", opciones: ["No sé", "Sé", "Tal vez", "Lo siento"], respuesta: 0 },
                { ruso: "Добро пожаловать!", pronunciacion: "/dabró zhalávat!/", como: "¡Bienvenido!", ejemplo: "Добро пожаловать в Россию!", traduccion: "¡Bienvenido a Rusia!", opciones: ["¡Bienvenido!", "Adiós", "Gracias", "Hola"], respuesta: 0 },
                { ruso: "Удачи!", pronunciacion: "/udáchi/", como: "¡Buena suerte!", ejemplo: "Удачи тебе!", traduccion: "¡Buena suerte para ti!", opciones: ["¡Buena suerte!", "Adiós", "Gracias", "Hola"], respuesta: 0 },
                { ruso: "Помогите!", pronunciacion: "/pamagíti!/", como: "¡Ayuda! / ¡Socorro!", ejemplo: "Помогите, пожалуйста!", traduccion: "¡Ayuda, por favor!", opciones: ["¡Ayuda! / ¡Socorro!", "¡Gracias!", "¡Hola!", "¡Adiós!"], respuesta: 0 },
                { ruso: "Меня зовут...", pronunciacion: "/minya zavút.../", como: "Me llamo...", ejemplo: "Меня зовут Иван", traduccion: "Me llamo Iván", opciones: ["Me llamo...", "Tengo... años", "Soy de...", "Quiero..."], respuesta: 0 },
                { ruso: "Очень приятно", pronunciacion: "/óchin priyátna/", como: "Mucho gusto", ejemplo: "Очень приятно познакомиться", traduccion: "Mucho gusto en conocerle", opciones: ["Mucho gusto", "Lo siento", "Gracias", "Adiós"], respuesta: 0 }
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
    const progreso = JSON.parse(localStorage.getItem('ruso_progreso') || '{}');

    // ─────────────────────────────────────────────
    // ESTILOS
    // ─────────────────────────────────────────────

    function inyectarEstilos() {
        if (document.getElementById('ruso-styles')) return;
        const style = document.createElement('style');
        style.id = 'ruso-styles';
        style.textContent = `
            .ruso-wrap { max-width: 700px; margin: 0 auto; padding: 20px; font-family: inherit; }
            .ruso-titulo { text-align: center; color: #FFD166; font-size: 1.8rem; margin-bottom: 8px; }
            .ruso-sub { text-align: center; opacity: 0.7; margin-bottom: 30px; }
            .ruso-mazos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; margin-bottom: 30px; }
            .ruso-mazo-card {
                background: rgba(255,255,255,0.05);
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 15px;
                padding: 18px 12px;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .ruso-mazo-card:hover { border-color: #8A5AF7; background: rgba(138,90,247,0.15); transform: translateY(-3px); }
            .ruso-mazo-card.completado { border-color: #4CAF50; background: rgba(76,175,80,0.1); }
            .ruso-mazo-letras { font-size: 1.4rem; letter-spacing: 3px; margin-bottom: 6px; color: #FFD166; }
            .ruso-mazo-nombre { font-size: 0.8rem; opacity: 0.7; }
            .ruso-badge { display: inline-block; margin-top: 8px; font-size: 0.75rem; padding: 3px 10px; border-radius: 99px; background: rgba(76,175,80,0.2); color: #4CAF50; }

            .ruso-barra-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: 25px; }
            .ruso-barra-bg { flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
            .ruso-barra-fill { height: 100%; background: linear-gradient(135deg, #8A5AF7, #5864F5); border-radius: 3px; transition: width 0.3s ease; }
            .ruso-barra-txt { font-size: 0.85rem; opacity: 0.7; min-width: 50px; text-align: right; }

            .ruso-carta {
                background: rgba(255,255,255,0.05);
                border: 2px solid rgba(138,90,247,0.3);
                border-radius: 20px;
                padding: 30px 20px;
                text-align: center;
                margin-bottom: 25px;
            }
            .ruso-letra-grande { font-size: 90px; line-height: 1; margin-bottom: 10px; }
            .ruso-letra-info { font-size: 0.85rem; opacity: 0.6; }

            .ruso-opciones { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
            .ruso-opcion {
                background: rgba(255,255,255,0.05);
                border: 2px solid rgba(255,255,255,0.15);
                border-radius: 12px;
                padding: 14px 10px;
                font-size: 0.95rem;
                color: inherit;
                cursor: pointer;
                transition: all 0.15s;
                text-align: center;
                line-height: 1.3;
            }
            .ruso-opcion:hover:not(:disabled) { border-color: #8A5AF7; background: rgba(138,90,247,0.15); }
            .ruso-opcion.correcta { border-color: #4CAF50 !important; background: rgba(76,175,80,0.2) !important; color: #4CAF50; }
            .ruso-opcion.incorrecta { border-color: #FF6B6B !important; background: rgba(255,107,107,0.2) !important; color: #FF6B6B; }
            .ruso-opcion:disabled { cursor: default; }

            .ruso-feedback {
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                padding: 15px;
                text-align: center;
                margin-bottom: 15px;
                display: none;
            }
            .ruso-feedback.visible { display: block; }
            .ruso-feedback-pron { font-size: 1.1rem; font-weight: bold; margin-bottom: 4px; }
            .ruso-feedback-ej { font-size: 0.9rem; opacity: 0.8; }

            .ruso-btn-sig {
                display: none;
                width: 100%;
                padding: 14px;
                background: linear-gradient(135deg, #8A5AF7, #5864F5);
                border: none;
                border-radius: 12px;
                color: white;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                margin-bottom: 10px;
                transition: all 0.2s;
            }
            .ruso-btn-sig.visible { display: block; }
            .ruso-btn-sig:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(138,90,247,0.4); }

            .ruso-btn-cancelar {
                display: block; width: 100%; padding: 10px;
                background: transparent; border: 1px solid rgba(255,255,255,0.15);
                border-radius: 12px; color: inherit; opacity: 0.6;
                cursor: pointer; font-size: 0.9rem; transition: all 0.2s;
            }
            .ruso-btn-cancelar:hover { opacity: 1; background: rgba(255,255,255,0.05); }

            .ruso-resultado { text-align: center; padding: 40px 20px; }
            .ruso-resultado-emoji { font-size: 60px; margin-bottom: 15px; }
            .ruso-resultado-titulo { font-size: 1.6rem; font-weight: bold; color: #FFD166; margin-bottom: 8px; }
            .ruso-stats { display: flex; gap: 15px; justify-content: center; margin: 20px 0; }
            .ruso-stat { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px 25px; text-align: center; }
            .ruso-stat-num { font-size: 1.8rem; font-weight: bold; color: #FFD166; }
            .ruso-stat-label { font-size: 0.8rem; opacity: 0.7; margin-top: 4px; }
            .ruso-btn-menu {
                display: inline-block; padding: 12px 30px; margin-top: 10px;
                background: linear-gradient(135deg, #8A5AF7, #5864F5);
                border: none; border-radius: 12px; color: white;
                font-size: 1rem; font-weight: bold; cursor: pointer;
                transition: all 0.2s;
            }
            .ruso-btn-menu:hover { transform: translateY(-2px); }
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
                <div class="ruso-mazo-card ${hecho ? 'completado' : ''}" onclick="rusoSistema._iniciarMazo(${m.id})">
                    <div class="ruso-mazo-letras">${m.letras.split(' ').slice(0,4).join(' ')}</div>
                    <div class="ruso-mazo-nombre">${m.titulo}</div>
                    ${hecho ? '<span class="ruso-badge">✓ Completado</span>' : ''}
                </div>
            `;
        }).join('');

        return `
            <div class="ruso-wrap">
                <h2 class="ruso-titulo">🇷🇺 Alfabeto Ruso</h2>
                <p class="ruso-sub">33 letras cirílicas — elige un mazo para practicar</p>
                <div class="ruso-mazos-grid">${cards}</div>
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
        section.innerHTML = `<div class="ruso-wrap" id="ruso-quiz-wrap"></div>`;
        _mostrarCarta();
    }

    function _mostrarCarta() {
        const carta = cartasActuales[indiceActual];
        const total = cartasActuales.length;
        const pct = Math.round((indiceActual / total) * 100);

        document.getElementById('ruso-quiz-wrap').innerHTML = `
            <div class="ruso-barra-wrap">
                <div class="ruso-barra-bg"><div class="ruso-barra-fill" style="width:${pct}%"></div></div>
                <div class="ruso-barra-txt">${indiceActual} / ${total}</div>
            </div>

            <div class="ruso-carta">
                <div class="ruso-letra-grande">${carta.ruso}</div>
                <div class="ruso-letra-info">Mayúscula + minúscula</div>
            </div>

            <div class="ruso-opciones" id="ruso-opciones">
                ${carta.opciones.map((op, i) => `
                    <button class="ruso-opcion" onclick="rusoSistema._verificar(${i})">${op}</button>
                `).join('')}
            </div>

            <div class="ruso-feedback" id="ruso-feedback">
                <div class="ruso-feedback-pron" id="ruso-fb-pron"></div>
                <div class="ruso-feedback-ej" id="ruso-fb-ej"></div>
            </div>

            <button class="ruso-btn-sig" id="ruso-btn-sig" onclick="rusoSistema._siguiente()">
                ${indiceActual + 1 < total ? 'Siguiente letra ➡️' : 'Ver resultados 🏁'}
            </button>

            <button class="ruso-btn-cancelar" onclick="rusoSistema._volverMenu()">Cancelar quiz</button>
        `;
        esperando = false;
    }

    function _verificar(sel) {
        if (esperando) return;
        esperando = true;

        const carta = cartasActuales[indiceActual];
        const correcta = sel === carta.respuesta;

        document.querySelectorAll('.ruso-opcion').forEach((btn, i) => {
            if (i === carta.respuesta) btn.classList.add('correcta');
            else if (i === sel && !correcta) btn.classList.add('incorrecta');
            btn.disabled = true;
        });

        const fb = document.getElementById('ruso-feedback');
        document.getElementById('ruso-fb-pron').textContent =
            (correcta ? '✅ ¡Correcto! — ' : '❌ Incorrecto — ') + carta.ruso + '  ' + carta.pronunciacion;
        document.getElementById('ruso-fb-ej').textContent =
            carta.como + ' — Ej: ' + carta.ejemplo + ' (' + carta.traduccion + ')';
        fb.classList.add('visible');

        if (correcta) aciertos++; else errores++;

        document.getElementById('ruso-btn-sig').classList.add('visible');

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
        try { localStorage.setItem('ruso_progreso', JSON.stringify(progreso)); } catch(e) {}

        let emoji, titulo;
        if (pct === 100)     { emoji = '🌟'; titulo = '¡Perfecto!'; }
        else if (pct >= 70)  { emoji = '✅'; titulo = '¡Buen trabajo!'; }
        else                 { emoji = '🔄'; titulo = 'Sigue practicando'; }

        document.getElementById('ruso-quiz-wrap').innerHTML = `
            <div class="ruso-resultado">
                <div class="ruso-resultado-emoji">${emoji}</div>
                <div class="ruso-resultado-titulo">${titulo}</div>
                <div class="ruso-stats">
                    <div class="ruso-stat"><div class="ruso-stat-num">${aciertos}</div><div class="ruso-stat-label">Correctas</div></div>
                    <div class="ruso-stat"><div class="ruso-stat-num">${errores}</div><div class="ruso-stat-label">Errores</div></div>
                    <div class="ruso-stat"><div class="ruso-stat-num">${pct}%</div><div class="ruso-stat-label">Precisión</div></div>
                </div>
                <button class="ruso-btn-menu" onclick="rusoSistema._volverMenu()">Elegir otro mazo</button>
            </div>
        `;
    }

    function _volverMenu() {
        document.getElementById('manga-section').innerHTML = renderMenu();
    }

    // ─────────────────────────────────────────────
    // API PÚBLICA
    // ─────────────────────────────────────────────

    return { cargarPagina, _iniciarMazo, _verificar, _siguiente, _volverMenu };

})();

// ─────────────────────────────────────────────
// FUNCIÓN GLOBAL — se llama desde el index.html
// ─────────────────────────────────────────────

function cargarPaginaRuso() {
    if (typeof ocultarHeader === 'function') ocultarHeader();
    if (typeof modoActual !== 'undefined') modoActual = 'ruso';

    rusoSistema.cargarPagina();

    if (typeof crearBotonVolver === 'function' && typeof volverAlInicio === 'function') {
        const mangaSection = document.getElementById('manga-section');
        const botonVolver = crearBotonVolver(volverAlInicio);
        mangaSection.insertBefore(botonVolver, mangaSection.firstChild);
    }
}
