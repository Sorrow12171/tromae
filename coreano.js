// ================================================
// SISTEMA COREANO — Alfabeto Hangul (한글)
// Todo en un solo archivo: datos + interfaz + quiz
// Uso: coreanoSistema.cargarPagina()
// ================================================

const coreanoSistema = (() => {

    // ─────────────────────────────────────────────
    // DATOS
    // ─────────────────────────────────────────────

    const MAZOS = [
        {
            id: 1,
            titulo: "Mazo 1 — Consonantes Básicas",
            letras: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ",
            cartas: [
                { coreano: "ㄱ", pronunciacion: "/g/k/", como: "como 'g/k' en 'gato'", ejemplo: "가방", traduccion: "bolso", opciones: ["/g/k como en 'gato'", "/n como en 'nada'", "/d/t como en 'dato'", "/r/l como en 'rato'"], respuesta: 0 },
                { coreano: "ㄴ", pronunciacion: "/n/", como: "como 'n' en 'nada'", ejemplo: "나비", traduccion: "mariposa", opciones: ["/m como en 'mamá'", "/n como en 'nada'", "/g/k como en 'gato'", "/b/p como en 'boca'"], respuesta: 1 },
                { coreano: "ㄷ", pronunciacion: "/d/t/", como: "como 'd/t' en 'dato'", ejemplo: "doori", traduccion: "puerta", opciones: ["/d/t como en 'dato'", "/g/k como en 'gato'", "/n como en 'nada'", "/s como en 'sol'"], respuesta: 0 },
                { coreano: "ㄹ", pronunciacion: "/r/l/", como: "entre 'r' y 'l'", ejemplo: "라마", traduccion: "lama", opciones: ["/r/l vibrante", "/d/t como en 'dato'", "/m como en 'mamá'", "/b/p como en 'boca'"], respuesta: 0 },
                { coreano: "ㅁ", pronunciacion: "/m/", como: "como 'm' en 'mamá'", ejemplo: "모자", traduccion: "sombrero", opciones: ["/m como en 'mamá'", "/n como en 'nada'", "/b/p como en 'boca'", "/r/l vibrante"], respuesta: 0 },
                { coreano: "ㅂ", pronunciacion: "/b/p/", como: "como 'b/p' en 'boca'", ejemplo: "바다", traduccion: "mar", opciones: ["/b/p como en 'boca'", "/m como en 'mamá'", "/g/k como en 'gato'", "/s como en 'sol'"], respuesta: 0 },
                { coreano: "ㅅ", pronunciacion: "/s/", como: "como 's' en 'sol'", ejemplo: "사람", traduccion: "persona", opciones: ["/s como en 'sol'", "/j/ch como en 'chico'", "/g/k como en 'gato'", "/h como en 'hola'"], respuesta: 0 },
                { coreano: "ㅇ", pronunciacion: "/ng/", como: "silenciosa al inicio, 'ng' al final", ejemplo: "아이", traduccion: "niño", opciones: ["/silenciosa/ng", "/m como en 'mamá'", "/n como en 'nada'", "/r/l vibrante"], respuesta: 0 },
                { coreano: "ㅈ", pronunciacion: "/j/ch/", como: "como 'j/ch' en 'chico'", ejemplo: "차", traduccion: "té/coche", opciones: ["/j/ch como en 'chico'", "/s como en 'sol'", "/g/k como en 'gato'", "/t como en 'taza'"], respuesta: 0 },
                { coreano: "ㅊ", pronunciacion: "/ch/", como: "'ch' aspirada fuerte", ejemplo: "책", traduccion: "libro", opciones: ["/ch aspirada fuerte", "/j suave", "/s como en 'sol'", "/k como en 'kilo'"], respuesta: 0 }
            ]
        },
        {
            id: 2,
            titulo: "Mazo 2 — Consonantes Aspiradas y Dobles",
            letras: "ㅋ ㅌ ㅍ ㅎ ㄲ ㄸ ㅃ ㅆ ㅉ",
            cartas: [
                { coreano: "ㅋ", pronunciacion: "/kʰ/", como: "'k' muy aspirada", ejemplo: "코", traduccion: "nariz", opciones: ["/k aspirada fuerte", "/g suave", "/h como en 'hola'", "/t como en 'taza'"], respuesta: 0 },
                { coreano: "ㅌ", pronunciacion: "/tʰ/", como: "'t' muy aspirada", ejemplo: "타요", traduccion: "quemarse", opciones: ["/t aspirada fuerte", "/d suave", "/n como en 'nada'", "/l como en 'luna'"], respuesta: 0 },
                { coreano: "ㅍ", pronunciacion: "/pʰ/", como: "'p' muy aspirada", ejemplo: "포도", traduccion: "uvas", opciones: ["/p aspirada fuerte", "/b suave", "/m como en 'mamá'", "/f como en 'foca'"], respuesta: 0 },
                { coreano: "ㅎ", pronunciacion: "/h/", como: "como 'h' inglesa suave", ejemplo: "하나", traduccion: "uno", opciones: ["/h suave inglesa", "/g/k como en 'gato'", "/n como en 'nada'", "/ng final"], respuesta: 0 },
                { coreano: "ㄲ", pronunciacion: "/kk/", como: "'k' tensa/doble", ejemplo: "끼다", traduccion: "meter", opciones: ["/kk tensa/doble", "/k simple", "/g suave", "/h aspirada"], respuesta: 0 },
                { coreano: "ㄸ", pronunciacion: "/tt/", como: "'t' tensa/doble", ejemplo: "뜨겁다", traduccion: "caliente", opciones: ["/tt tensa/doble", "/t simple", "/d suave", "/n como en 'nada'"], respuesta: 0 },
                { coreano: "ㅃ", pronunciacion: "/pp/", como: "'p' tensa/doble", ejemplo: "쁘다", traduccion: "ser bonito", opciones: ["/pp tensa/doble", "/p simple", "/b suave", "/m como en 'mamá'"], respuesta: 0 },
                { coreano: "ㅆ", pronunciacion: "/ss/", como: "'s' tensa/doble", ejemplo: "쓰다", traduccion: "escribir", opciones: ["/ss tensa/doble", "/s simple", "/j/ch", "/ch aspirada"], respuesta: 0 },
                { coreano: "ㅉ", pronunciacion: "/jj/", como: "'j' tensa/doble", ejemplo: "짜다", traduccion: "ser salado", opciones: ["/jj tensa/doble", "/j suave", "/ch aspirada", "/s como en 'sol'"], respuesta: 0 }
            ]
        },
        {
            id: 3,
            titulo: "Mazo 3 — Vocales Básicas",
            letras: "ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ",
            cartas: [
                { coreano: "ㅏ", pronunciacion: "/a/", como: "'a' abierta y clara", ejemplo: "아빠", traduccion: "papá", opciones: ["/a como en 'agua'", "/ya como en 'yate'", "/eo cerrada", "/o como en 'oso'"], respuesta: 0 },
                { coreano: "ㅑ", pronunciacion: "/ya/", como: "'ya' en 'yate'", ejemplo: "야구", traduccion: "béisbol", opciones: ["/ya como en 'yate'", "/a como en 'agua'", "/yo como en 'yogur'", "/ye como en 'yeso'"], respuesta: 0 },
                { coreano: "ㅓ", pronunciacion: "/eo/", como: "'o' pero más abierta", ejemplo: "어머니", traduccion: "madre", opciones: ["/eo como 'o' abierta", "/a como en 'agua'", "/o como en 'oso'", "/u como en 'uva'"], respuesta: 0 },
                { coreano: "ㅕ", pronunciacion: "/yeo/", como: "'yeo' combinado", ejemplo: "여자", traduccion: "mujer", opciones: ["/yeo combinado", "/ya como en 'yate'", "/yo como en 'yogur'", "/yu como en 'yuca'"], respuesta: 0 },
                { coreano: "ㅗ", pronunciacion: "/o/", como: "'o' redondeada", ejemplo: "오이", traduccion: "pepino", opciones: ["/o como en 'oso'", "/a como en 'agua'", "/eo abierta", "/u como en 'uva'"], respuesta: 0 },
                { coreano: "ㅛ", pronunciacion: "/yo/", como: "'yo' en 'yogur'", ejemplo: "요리", traduccion: "cocina", opciones: ["/yo como en 'yogur'", "/o como en 'oso'", "/yu como en 'yuca'", "/ya como en 'yate'"], respuesta: 0 },
                { coreano: "ㅜ", pronunciacion: "/u/", como: "'u' redondeada", ejemplo: "우유", traduccion: "leche", opciones: ["/u como en 'uva'", "/o como en 'oso'", "/woo inglés", "/eu coreana"], respuesta: 0 },
                { coreano: "ㅠ", pronunciacion: "/yu/", como: "'yu' en 'yuca'", ejemplo: "유럽", traduccion: "Europa", opciones: ["/yu como en 'yuca'", "/u como en 'uva'", "/yo como en 'yogur'", "/i como en 'isla'"], respuesta: 0 },
                { coreano: "ㅡ", pronunciacion: "/eu/", como: "'u' sin redondear labios", ejemplo: "음식", traduccion: "comida", opciones: ["/eu sin redondear", "/u redondeada", "/i como en 'isla'", "/a como en 'agua'"], respuesta: 0 },
                { coreano: "ㅣ", pronunciacion: "/i/", como: "'i' en 'isla'", ejemplo: "이", traduccion: "diente", opciones: ["/i como en 'isla'", "/eu coreana", "/e como en 'era'", "/a como en 'agua'"], respuesta: 0 }
            ]
        },
        {
            id: 4,
            titulo: "Mazo 4 — Vocales Compuestas",
            letras: "ㅐ ㅒ ㅔ ㅖ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ",
            cartas: [
                { coreano: "ㅐ", pronunciacion: "/ae/", como: "'e' abierta, casi 'a-e'", ejemplo: "아이", traduccion: "niño", opciones: ["/ae como 'e' abierta", "/e como en 'era'", "/a como en 'agua'", "/ya como en 'yate'"], respuesta: 0 },
                { coreano: "ㅒ", pronunciacion: "/yae/", como: "'yae' combinado", ejemplo: "얘기", traduccion: "conversación", opciones: ["/yae combinado", "/ae como 'e' abierta", "/ye como en 'yeso'", "/ya como en 'yate'"], respuesta: 0 },
                { coreano: "ㅔ", pronunciacion: "/e/", como: "'e' cerrada", ejemplo: "메뉴", traduccion: "menú", opciones: ["/e como en 'era'", "/ae abierta", "/i como en 'isla'", "/a como en 'agua'"], respuesta: 0 },
                { coreano: "ㅖ", pronunciacion: "/ye/", como: "'ye' en 'yeso'", ejemplo: "예의", traduccion: "cortesía", opciones: ["/ye como en 'yeso'", "/e como en 'era'", "/yae combinado", "/ya como en 'yate'"], respuesta: 0 },
                { coreano: "ㅘ", pronunciacion: "/wa/", como: "'wa' en 'water'", ejemplo: "왜", traduccion: "por qué", opciones: ["/wa como en 'water'", "/wae combinado", "/ae abierta", "/oe francés"], respuesta: 0 },
                { coreano: "ㅙ", pronunciacion: "/wae/", como: "'wae' combinado", ejemplo: "괜찮아", traduccion: "está bien", opciones: ["/wae combinado", "/wa como en 'water'", "/ae abierta", "/we inglés"], respuesta: 0 },
                { coreano: "ㅚ", pronunciacion: "/we/", como: "'we' o 'oe'", ejemplo: "외국", traduccion: "extranjero", opciones: ["/we o 'oe'", "/oe francés", "/e como en 'era'", "/ae abierta"], respuesta: 0 },
                { coreano: "ㅝ", pronunciacion: "/weo/", como: "'weo' combinado", ejemplo: "원", traduccion: "won (moneda)", opciones: ["/weo combinado", "/wo inglés", "/eo abierta", "/u como en 'uva'"], respuesta: 0 },
                { coreano: "ㅞ", pronunciacion: "/we/", como: "'we' en 'wet'", ejemplo: "웨이터", traduccion: "camarero", opciones: ["/we como en 'wet'", "/weo combinado", "/e como en 'era'", "/wa como en 'water'"], respuesta: 0 },
                { coreano: "ㅟ", pronunciacion: "/wi/", como: "'wi' combinado", ejemplo: "위치", traduccion: "ubicación", opciones: ["/wi combinado", "/we como en 'wet'", "/ui coreano", "/i como en 'isla'"], respuesta: 0 },
                { coreano: "ㅢ", pronunciacion: "/ui/", como: "'eu-i' combinado", ejemplo: "의사", traduccion: "doctor", opciones: ["/ui como 'eu-i'", "/i como en 'isla'", "/ui francés", "/e como en 'era'"], respuesta: 0 }
            ]
        },
        {
            id: 5,
            titulo: "Mazo 5 — Palabras Básicas",
            letras: "한글 한국 안녕 감사 사랑",
            cartas: [
                { coreano: "한글", pronunciacion: "/hangeul/", como: "Hangul = alfabeto coreano", ejemplo: "한글을 배워요", traduccion: "Aprender Hangul", opciones: ["Hangul (alfabeto)", "Corea (país)", "Idioma coreano", "Libro de texto"], respuesta: 0 },
                { coreano: "한국", pronunciacion: "/hanguk/", como: "Hanguk = Corea", ejemplo: "한국 사람", traduccion: "Persona coreana", opciones: ["Corea (Hanguk)", "China", "Japón", "Asia"], respuesta: 0 },
                { coreano: "안녕하세요", pronunciacion: "/annyeonghaseyo/", como: "Saludo formal: ¡Hola!", ejemplo: "안녕하세요!", traduccion: "¡Hola! (formal)", opciones: ["¡Hola! (formal)", "¡Adiós!", "¡Gracias!", "¡Lo siento!"], respuesta: 0 },
                { coreano: "감사합니다", pronunciacion: "/gamsahamnida/", como: "Gracias formal", ejemplo: "감사합니다!", traduccion: "¡Gracias! (formal)", opciones: ["¡Gracias! (formal)", "¡Hola!", "¡Adiós!", "¡De nada!"], respuesta: 0 },
                { coreano: "네", pronunciacion: "/ne/", como: "Afirmación: Sí", ejemplo: "네, 좋아요", traduccion: "Sí, está bien", opciones: ["Sí", "No", "Tal vez", "OK"], respuesta: 0 },
                { coreano: "아니요", pronunciacion: "/aniyo/", como: "Negación: No", ejemplo: "아니요, 괜찮아요", traduccion: "No, está bien", opciones: ["No", "Sí", "Quizás", "Nunca"], respuesta: 0 },
                { coreano: "죄송합니다", pronunciacion: "/joesonghamnida/", como: "Disculpa formal", ejemplo: "죄송합니다!", traduccion: "¡Lo siento! (formal)", opciones: ["¡Lo siento! (formal)", "¡Gracias!", "¡Hola!", "¡Bienvenido!"], respuesta: 0 },
                { coreano: "물", pronunciacion: "/mul/", como: "Mul = agua", ejemplo: "물 주세요", traduccion: "Agua, por favor", opciones: ["Agua", "Fuego", "Tierra", "Aire"], respuesta: 0 },
                { coreano: "밥", pronunciacion: "/bap/", como: "Bap = arroz/comida", ejemplo: "밥 먹어요", traduccion: "Comer arroz", opciones: ["Arroz/Comida", "Agua", "Carne", "Pan"], respuesta: 0 },
                { coreano: "사랑", pronunciacion: "/sarang/", como: "Sarang = amor", ejemplo: "사랑해요", traduccion: "Te quiero", opciones: ["Amor", "Amigo", "Familia", "Paz"], respuesta: 0 }
            ]
        },
        {
            id: 6,
            titulo: "Mazo 6 — Números y Expresiones",
            letras: "하나 둘 셋 일 이 삼",
            cartas: [
                { coreano: "하나", pronunciacion: "/hana/", como: "Uno (1) - nativo coreano", ejemplo: "하나, 둘, 셋", traduccion: "Uno, dos, tres", opciones: ["Uno (1) - nativo", "Dos (2)", "Tres (3)", "Cuatro (4)"], respuesta: 0 },
                { coreano: "둘", pronunciacion: "/dul/", como: "Dos (2) - nativo coreano", ejemplo: "둘, 셋, 넷", traduccion: "Dos, tres, cuatro", opciones: ["Dos (2) - nativo", "Uno (1)", "Tres (3)", "Cinco (5)"], respuesta: 0 },
                { coreano: "셋", pronunciacion: "/set/", como: "Tres (3) - nativo coreano", ejemplo: "하나, 둘, 셋!", traduccion: "¡Uno, dos, tres!", opciones: ["Tres (3) - nativo", "Dos (2)", "Cuatro (4)", "Seis (6)"], respuesta: 0 },
                { coreano: "일", pronunciacion: "/il/", como: "Uno (1) - sino-coreano", ejemplo: "일, 이, 삼", traduccion: "Uno, dos, tres (Sino)", opciones: ["Uno (1) - Sino", "Dos (2)", "Diez (10)", "Cien (100)"], respuesta: 0 },
                { coreano: "이", pronunciacion: "/i/", como: "Dos (2) - sino-coreano", ejemplo: "이, 삼, 사", traduccion: "Dos, tres, cuatro (Sino)", opciones: ["Dos (2) - Sino", "Uno (1)", "Tres (3)", "Veinte (20)"], respuesta: 0 },
                { coreano: "삼", pronunciacion: "/sam/", como: "Tres (3) - sino-coreano", ejemplo: "일, 이, 삼", traduccion: "Uno, dos, tres (Sino)", opciones: ["Tres (3) - Sino", "Dos (2)", "Cuatro (4)", "Treinta (30)"], respuesta: 0 },
                { coreano: "고마워요", pronunciacion: "/gomawoyo/", como: "Gracias informal", ejemplo: "고마워요!", traduccion: "¡Gracias! (informal)", opciones: ["¡Gracias! (informal)", "¡Hola!", "¡Adiós!", "¡Perdón!"], respuesta: 0 },
                { coreano: "잘 가요", pronunciacion: "/jal gayo/", como: "Adiós informal", ejemplo: "잘 가요!", traduccion: "¡Adiós! (informal)", opciones: ["¡Adiós! (informal)", "¡Hola!", "¡Buenas noches!", "¡Bienvenido!"], respuesta: 0 },
                { coreano: "안녕히 가세요", pronunciacion: "/annyeonghi gaseyo/", como: "Adiós formal", ejemplo: "안녕히 가세요!", traduccion: "¡Adiós! (formal)", opciones: ["¡Adiós! (formal)", "¡Hola!", "¡Gracias!", "¡Buenos días!"], respuesta: 0 },
                { coreano: "네, 알겠어요", pronunciacion: "/ne, algess-eoyo/", como: "Sí, entiendo", ejemplo: "네, 알겠어요", traduccion: "Sí, entiendo", opciones: ["Sí, entiendo", "No sé", "Tal vez", "No entiendo"], respuesta: 0 }
            ]
        }
    ];

    // ─────────────────────────────────────────────
    // ESTADO
    // ─────────────────────────────────────────────

    let mazoActualId = null;
    let cartasActuales = [];
    let indiceActual = 0;
    let aciertos = 0;
    let errores = 0;
    let esperando = false;
    let progreso = JSON.parse(localStorage.getItem('coreanoProgreso') || '{}');

    function guardarProgreso() {
        localStorage.setItem('coreanoProgreso', JSON.stringify(progreso));
    }

    // ─────────────────────────────────────────────
    // ESTILOS
    // ─────────────────────────────────────────────

    function inyectarEstilos() {
        if (document.getElementById('coreano-styles')) return;

        const style = document.createElement('style');
        style.id = 'coreano-styles';
        style.textContent = `
            .coreano-wrap { max-width: 800px; margin: 0 auto; padding: 30px 20px; color: #fff; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
            .coreano-titulo { text-align: center; font-size: 2rem; font-weight: bold; margin-bottom: 8px; background: linear-gradient(135deg, #003399, #CC0000); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .coreano-sub { text-align: center; opacity: 0.7; margin-bottom: 30px; font-size: 0.95rem; }
            
            .coreano-mazos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; margin-top: 20px; }
            .coreano-mazo-card { background: rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.1); }
            .coreano-mazo-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.12); }
            .coreano-mazo-card.completado { border-color: #4CAF50; background: rgba(76,175,80,0.15); }
            .coreano-mazo-letras { font-size: 1.4rem; font-weight: bold; margin-bottom: 8px; letter-spacing: 4px; }
            .coreano-mazo-nombre { font-size: 0.95rem; opacity: 0.9; }
            .coreano-badge { display: inline-block; background: #4CAF50; color: #fff; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; margin-top: 8px; }
            
            .coreano-carta { background: rgba(255,255,255,0.1); border-radius: 20px; padding: 40px 20px; text-align: center; margin: 20px 0; }
            .coreano-letra-grande { font-size: 5rem; font-weight: bold; margin-bottom: 10px; }
            .coreano-letra-info { opacity: 0.6; font-size: 0.85rem; }
            
            .coreano-opciones { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
            .coreano-opcion { padding: 15px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; color: #fff; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; }
            .coreano-opcion:hover { background: rgba(255,255,255,0.15); }
            .coreano-opcion.correcta { background: rgba(76,175,80,0.4); border-color: #4CAF50; }
            .coreano-opcion.incorrecta { background: rgba(244,67,54,0.4); border-color: #f44336; }
            .coreano-opcion.deshabilitada { pointer-events: none; opacity: 0.5; }
            
            .coreano-feedback { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center; display: none; }
            .coreano-feedback.visible { display: block; }
            .coreano-feedback-pron { font-size: 1.2rem; font-weight: bold; margin-bottom: 8px; color: #FFD166; }
            .coreano-feedback-ej { opacity: 0.8; font-size: 0.9rem; }
            
            .coreano-barra-wrap { margin: 20px 0; }
            .coreano-barra-bg { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
            .coreano-barra-fill { height: 100%; background: linear-gradient(90deg, #003399, #CC0000); transition: width 0.3s; }
            .coreano-barra-txt { text-align: center; margin-top: 6px; opacity: 0.7; font-size: 0.85rem; }
            
            .coreano-btn-siguiente { display: block; width: 100%; padding: 15px; background: linear-gradient(135deg, #003399, #CC0000); border: none; border-radius: 12px; color: #fff; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-top: 20px; transition: all 0.2s; }
            .coreano-btn-siguiente:hover { transform: translateY(-2px); }
            
            .coreano-resultado { text-align: center; padding: 40px 20px; }
            .coreano-resultado-emoji { font-size: 60px; margin-bottom: 15px; }
            .coreano-resultado-titulo { font-size: 1.6rem; font-weight: bold; margin-bottom: 8px; }
            .coreano-stats { display: flex; gap: 15px; justify-content: center; margin: 20px 0; }
            .coreano-stat { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px 25px; text-align: center; }
            .coreano-stat-num { font-size: 1.8rem; font-weight: bold; color: #FFD166; }
            .coreano-stat-label { font-size: 0.8rem; opacity: 0.7; margin-top: 4px; }
            .coreano-btn-menu { display: inline-block; padding: 12px 30px; margin-top: 10px; background: linear-gradient(135deg, #003399, #CC0000); border: none; border-radius: 12px; color: #fff; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s; }
            .coreano-btn-menu:hover { transform: translateY(-2px); }
            
            .coreano-btn-volver { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #fff; cursor: pointer; margin-bottom: 20px; font-size: 0.9rem; transition: all 0.2s; }
            .coreano-btn-volver:hover { background: rgba(255,255,255,0.15); }
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
                <div class="coreano-mazo-card ${hecho ? 'completado' : ''}" onclick="coreanoSistema._iniciarMazo(${m.id})">
                    <div class="coreano-mazo-letras">${m.letras.split(' ').slice(0,4).join(' ')}</div>
                    <div class="coreano-mazo-nombre">${m.titulo}</div>
                    ${hecho ? '<span class="coreano-badge">✓ Completado</span>' : ''}
                </div>
            `;
        }).join('');

        return `
            <div class="coreano-wrap">
                <button class="coreano-btn-volver" onclick="volverAlInicio()">← Volver</button>
                <h2 class="coreano-titulo">🇰🇷 Alfabeto Coreano (한글)</h2>
                <p class="coreano-sub">14 consonantes + 10 vocales — elige un mazo para practicar</p>
                <div class="coreano-mazos-grid">${cards}</div>
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
        section.innerHTML = `<div class="coreano-wrap" id="coreano-quiz-wrap"></div>`;
        _mostrarCarta();
    }

    function _mostrarCarta() {
        const carta = cartasActuales[indiceActual];
        const total = cartasActuales.length;
        const pct = Math.round((indiceActual / total) * 100);

        document.getElementById('coreano-quiz-wrap').innerHTML = `
            <div class="coreano-barra-wrap">
                <div class="coreano-barra-bg"><div class="coreano-barra-fill" style="width:${pct}%"></div></div>
                <div class="coreano-barra-txt">${indiceActual} / ${total}</div>
            </div>

            <div class="coreano-carta">
                <div class="coreano-letra-grande">${carta.coreano}</div>
                <div class="coreano-letra-info">Carácter coreano</div>
            </div>

            <div class="coreano-opciones" id="coreano-opciones">
                ${carta.opciones.map((op, i) => `
                    <button class="coreano-opcion" onclick="coreanoSistema._verificar(${i})">${op}</button>
                `).join('')}
            </div>

            <div class="coreano-feedback" id="coreano-feedback">
                <div class="coreano-feedback-pron" id="coreano-fb-pron"></div>
                <div class="coreano-feedback-ej" id="coreano-fb-ej"></div>
            </div>

            <button class="coreano-btn-siguiente" id="coreano-btn-sig" style="display:none" onclick="coreanoSistema._siguiente()">Siguiente →</button>
        `;
    }

    function _verificar(indice) {
        if (esperando) return;
        esperando = true;

        const carta = cartasActuales[indiceActual];
        const correcta = indice === carta.respuesta;
        const opciones = document.querySelectorAll('.coreano-opcion');

        opciones.forEach((op, i) => {
            op.classList.add('deshabilitada');
            if (i === carta.respuesta) op.classList.add('correcta');
            if (i === indice && !correcta) op.classList.add('incorrecta');
        });

        if (correcta) {
            aciertos++;
        } else {
            errores++;
        }

        document.getElementById('coreano-fb-pron').textContent = `Pronunciación: ${carta.pronunciacion}`;
        document.getElementById('coreano-fb-ej').textContent = `Ejemplo: ${carta.ejemplo} — ${carta.traduccion}`;
        document.getElementById('coreano-feedback').classList.add('visible');
        document.getElementById('coreano-btn-sig').style.display = 'block';

        // Auto-advance después de 1 segundo si respondió correctamente
        if (correcta) {
            setTimeout(() => {
                _siguiente();
            }, 1000);
        }
    }

    function _siguiente() {
        indiceActual++;
        esperando = false;

        if (indiceActual >= cartasActuales.length) {
            _mostrarResultado();
        } else {
            _mostrarCarta();
        }
    }

    function _mostrarResultado() {
        const section = document.getElementById('manga-section');
        const total = cartasActuales.length;
        const pct = Math.round((aciertos / total) * 100);
        const emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪';

        progreso[mazoActualId] = true;
        guardarProgreso();

        const mazo = MAZOS.find(m => m.id === mazoActualId);

        section.innerHTML = `
            <div class="coreano-wrap">
                <div class="coreano-resultado">
                    <div class="coreano-resultado-emoji">${emoji}</div>
                    <div class="coreano-resultado-titulo">¡Mazo completado!</div>
                    <p style="opacity:0.7">${mazo.titulo}</p>
                    
                    <div class="coreano-stats">
                        <div class="coreano-stat">
                            <div class="coreano-stat-num">${aciertos}</div>
                            <div class="coreano-stat-label">Aciertos</div>
                        </div>
                        <div class="coreano-stat">
                            <div class="coreano-stat-num">${errores}</div>
                            <div class="coreano-stat-label">Errores</div>
                        </div>
                        <div class="coreano-stat">
                            <div class="coreano-stat-num">${pct}%</div>
                            <div class="coreano-stat-label">Precisión</div>
                        </div>
                    </div>
                    
                    <button class="coreano-btn-menu" onclick="coreanoSistema._iniciarMazo(${mazoActualId})">🔄 Repetir mazo</button>
                    <button class="coreano-btn-menu" onclick="coreanoSistema.cargarPagina()" style="margin-left:10px">📋 Volver al menú</button>
                </div>
            </div>
        `;
    }

    // ─────────────────────────────────────────────
    // API PÚBLICA
    // ─────────────────────────────────────────────

    return {
        cargarPagina,
        _iniciarMazo,
        _verificar,
        _siguiente
    };

})();

// ─────────────────────────────────────────────
// FUNCIÓN GLOBAL — se llama desde el index.html
// ─────────────────────────────────────────────

function cargarPaginaCoreano() {
    if (typeof ocultarHeader === 'function') ocultarHeader();
    if (typeof modoActual !== 'undefined') modoActual = 'coreano';

    coreanoSistema.cargarPagina();

    if (typeof crearBotonVolver === 'function' && typeof volverAlInicio === 'function') {
        const mangaSection = document.getElementById('manga-section');
        const botonVolver = crearBotonVolver(volverAlInicio);
        mangaSection.insertBefore(botonVolver, mangaSection.firstChild);
    }
}
