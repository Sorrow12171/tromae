// ================================================
// ALFABETO COREANO (HANGUL/한글) - QUIZ DE APRENDIZAJE
// ================================================

const alfabetoCoreano = {
    // Consonantes básicas
    1: [
        { coreano: 'ㄱ', nombre: 'Giyeok', pronunciacion: 'g/k', ejemplo: '가방 (gabung) - bolso', opciones: ['g/k', 'n', 'd/t', 'r/l'], respuesta: 0 },
        { coreano: 'ㄴ', nombre: 'Nieun', pronunciacion: 'n', ejemplo: '나비 (nabi) - mariposa', opciones: ['n', 'g/k', 'm', 'b/p'], respuesta: 0 },
        { coreano: 'ㄷ', nombre: 'Digeut', pronunciacion: 'd/t', ejemplo: 'ドア (doori) - puerta', opciones: ['d/t', 'g/k', 'n', 's'], respuesta: 0 },
        { coreano: 'ㄹ', nombre: 'Rieul', pronunciacion: 'r/l', ejemplo: '라마 (rama) - lama', opciones: ['r/l', 'd/t', 'm', 'b/p'], respuesta: 0 },
        { coreano: 'ㅁ', nombre: 'Mieum', pronunciacion: 'm', ejemplo: '모자 (moja) - sombrero', opciones: ['m', 'n', 'b/p', 'r/l'], respuesta: 0 },
        { coreano: 'ㅂ', nombre: 'Bieup', pronunciacion: 'b/p', ejemplo: '바다 (bada) - mar', opciones: ['b/p', 'm', 'g/k', 's'], respuesta: 0 },
        { coreano: 'ㅅ', nombre: 'Siot', pronunciacion: 's', ejemplo: '사람 (saram) - persona', opciones: ['s', 'j/ch', 'g/k', 'h'], respuesta: 0 },
        { coreano: 'ㅇ', nombre: 'Ieung', pronunciacion: 'silenciosa/ng', ejemplo: '아이 (ai) - niño', opciones: ['silenciosa/ng', 'm', 'n', 'r/l'], respuesta: 0 },
        { coreano: 'ㅈ', nombre: 'Jieut', pronunciacion: 'j/ch', ejemplo: '차 (cha) - té/coche', opciones: ['j/ch', 's', 'g/k', 't'], respuesta: 0 },
        { coreano: 'ㅊ', nombre: 'Chieut', pronunciacion: 'ch', ejemplo: '책 (chaek) - libro', opciones: ['ch (aspirada)', 'j', 's', 'k'], respuesta: 0 }
    ],

    // Consonantes aspiradas y dobles
    2: [
        { coreano: 'ㅋ', nombre: 'Khieuk', pronunciacion: 'k (aspirada)', ejemplo: '코 (ko) - nariz', opciones: ['k (como k fuerte)', 'g', 'h', 't'], respuesta: 0 },
        { coreano: 'ㅌ', nombre: 'Thieut', pronunciacion: 't (aspirada)', ejemplo: '타요 (tayo) - quemarse', opciones: ['t (como t fuerte)', 'd', 'n', 'l'], respuesta: 0 },
        { coreano: 'ㅍ', nombre: 'Phieup', pronunciacion: 'p (aspirada)', ejemplo: '포도 (podo) - uvas', opciones: ['p (como p fuerte)', 'b', 'm', 'f'], respuesta: 0 },
        { coreano: 'ㅎ', nombre: 'Hieuh', pronunciacion: 'h', ejemplo: '하나 (hana) - uno', opciones: ['h', 'g/k', 'n', 'ng'], respuesta: 0 },
        { coreano: 'ㄲ', nombre: 'Ssanggiyeok', pronunciacion: 'kk (doble)', ejemplo: '끼다 (kkida) - meter', opciones: ['kk (g/k tensa)', 'k', 'g', 'h'], respuesta: 0 },
        { coreano: 'ㄸ', nombre: 'Ssangdigeut', pronunciacion: 'tt (doble)', ejemplo: '뜨겁다 (ttugeopda) - caliente', opciones: ['tt (d/t tensa)', 't', 'd', 'n'], respuesta: 0 },
        { coreano: 'ㅃ', nombre: 'Ssangbieup', pronunciacion: 'pp (doble)', ejemplo: '쁘다 (ppeuda) - ser bonito', opciones: ['pp (b/p tensa)', 'p', 'b', 'm'], respuesta: 0 },
        { coreano: 'ㅆ', nombre: 'Ssangsiot', pronunciacion: 'ss (doble)', ejemplo: '쓰다 (sseuda) - escribir', opciones: ['ss (s tensa)', 's', 'j', 'ch'], respuesta: 0 },
        { coreano: 'ㅉ', nombre: 'Ssangjieut', pronunciacion: 'jj (doble)', ejemplo: '짜다 (jjada) - ser salado', opciones: ['jj (j/ch tensa)', 'j', 'ch', 's'], respuesta: 0 }
    ],

    // Vocales básicas
    3: [
        { coreano: 'ㅏ', nombre: 'A', pronunciacion: 'a', ejemplo: '아빠 (appa) - papá', opciones: ['a', 'ya', 'eo', 'o'], respuesta: 0 },
        { coreano: 'ㅑ', nombre: 'Ya', pronunciacion: 'ya', ejemplo: '야구 (yagu) - béisbol', opciones: ['ya', 'a', 'yo', 'ye'], respuesta: 0 },
        { coreano: 'ㅓ', nombre: 'Eo', pronunciacion: 'eo (o abierta)', ejemplo: '어머니 (eomeoni) - madre', opciones: ['eo (como o pero abierta)', 'a', 'o', 'u'], respuesta: 0 },
        { coreano: 'ㅕ', nombre: 'Yeo', pronunciacion: 'yeo', ejemplo: '여자 (yeoja) - mujer', opciones: ['yeo', 'ya', 'yo', 'yu'], respuesta: 0 },
        { coreano: 'ㅗ', nombre: 'O', pronunciacion: 'o', ejemplo: '오이 (oi) - pepino', opciones: ['o', 'a', 'eo', 'u'], respuesta: 0 },
        { coreano: 'ㅛ', nombre: 'Yo', pronunciacion: 'yo', ejemplo: '요리 (yori) - cocina', opciones: ['yo', 'o', 'yu', 'ya'], respuesta: 0 },
        { coreano: 'ㅜ', nombre: 'U', pronunciacion: 'u', ejemplo: '우유 (uyu) - leche', opciones: ['u', 'o', 'woo', 'eu'], respuesta: 0 },
        { coreano: 'ㅠ', nombre: 'Yu', pronunciacion: 'yu', ejemplo: '유럽 (yureop) - Europa', opciones: ['yu', 'u', 'yo', 'i'], respuesta: 0 },
        { coreano: 'ㅡ', nombre: 'Eu', pronunciacion: 'eu (u cerrada)', ejemplo: '음식 (eumsik) - comida', opciones: ['eu (como u sin redondear)', 'u', 'i', 'a'], respuesta: 0 },
        { coreano: 'ㅣ', nombre: 'I', pronunciacion: 'i', ejemplo: '이 (i) - diente', opciones: ['i', 'eu', 'e', 'a'], respuesta: 0 }
    ],

    // Vocales compuestas
    4: [
        { coreano: 'ㅐ', nombre: 'Ae', pronunciacion: 'ae (e abierta)', ejemplo: '아이 (ai) - niño', opciones: ['ae (como e abierta)', 'e', 'a', 'ya'], respuesta: 0 },
        { coreano: 'ㅒ', nombre: 'Yae', pronunciacion: 'yae', ejemplo: '얘기 (yaegi) - conversación', opciones: ['yae', 'ae', 'ye', 'ya'], respuesta: 0 },
        { coreano: 'ㅔ', nombre: 'E', pronunciacion: 'e', ejemplo: '메뉴 (menyu) - menú', opciones: ['e', 'ae', 'i', 'a'], respuesta: 0 },
        { coreano: 'ㅖ', nombre: 'Ye', pronunciacion: 'ye', ejemplo: '예의 (yeui) - cortesía', opciones: ['ye', 'e', 'yae', 'ya'], respuesta: 0 },
        { coreano: 'ㅘ', nombre: 'Wa', pronunciacion: 'wa', ejemplo: '왜 (wae) - por qué', opciones: ['wa', 'wae', 'ae', 'oe'], respuesta: 0 },
        { coreano: 'ㅙ', nombre: 'Wae', pronunciacion: 'wae', ejemplo: '괜찮아 (gwaenchana) - está bien', opciones: ['wae', 'wa', 'ae', 'we'], respuesta: 0 },
        { coreano: 'ㅚ', nombre: 'OE', pronunciacion: 'we/oe', ejemplo: '외국 (oeguk) - país extranjero', opciones: ['we/oe', 'oe', 'e', 'ae'], respuesta: 0 },
        { coreano: 'ㅝ', nombre: 'Weo', pronunciacion: 'weo', ejemplo: '원 (won) - won (moneda)', opciones: ['weo', 'wo', 'eo', 'u'], respuesta: 0 },
        { coreano: 'ㅞ', nombre: 'We', pronunciacion: 'we', ejemplo: '웨이터 (weiteo) - camarero', opciones: ['we', 'weo', 'e', 'wa'], respuesta: 0 },
        { coreano: 'ㅟ', nombre: 'Wi', pronunciacion: 'wi', ejemplo: '위치 (wichi) - ubicación', opciones: ['wi', 'we', 'ui', 'i'], respuesta: 0 },
        { coreano: 'ㅢ', nombre: 'Ui', pronunciacion: 'ui/eu-i', ejemplo: '의사 (uisa) - doctor', opciones: ['ui (eu-i)', 'i', 'ui', 'e'], respuesta: 0 }
    ],

    // Sílabas y palabras básicas para practicar
    5: [
        { coreano: '한글', nombre: 'Sustantivo', pronunciacion: 'hangeul', ejemplo: 'El alfabeto coreano', opciones: ['Hangul (alfabeto)', 'Corea', 'Idioma', 'Libro'], respuesta: 0 },
        { coreano: '한국', nombre: 'Sustantivo', pronunciacion: 'hanguk', ejemplo: 'Corea (del Sur)', opciones: ['Corea (Hanguk)', 'China', 'Japón', 'Asia'], respuesta: 0 },
        { coreano: '안녕하세요', nombre: 'Saludo', pronunciacion: 'annyeonghaseyo', ejemplo: '¡Hola! (formal)', opciones: ['Hola (formal)', 'Adiós', 'Gracias', 'Lo siento'], respuesta: 0 },
        { coreano: '감사합니다', nombre: 'Agradecimiento', pronunciacion: 'gamsahamnida', ejemplo: 'Gracias (formal)', opciones: ['Gracias (formal)', 'Hola', 'Adiós', 'De nada'], respuesta: 0 },
        { coreano: '네', nombre: 'Afirmación', pronunciacion: 'ne', ejemplo: 'Sí', opciones: ['Sí', 'No', 'Tal vez', 'OK'], respuesta: 0 },
        { coreano: '아니요', nombre: 'Negación', pronunciacion: 'aniyo', ejemplo: 'No', opciones: ['No', 'Sí', 'Quizás', 'Nunca'], respuesta: 0 },
        { coreano: '죄송합니다', nombre: 'Disculpa', pronunciacion: 'joesonghamnida', ejemplo: 'Lo siento (formal)', opciones: ['Lo siento (formal)', 'Gracias', 'Hola', 'Bienvenido'], respuesta: 0 },
        { coreano: '물', nombre: 'Sustantivo', pronunciacion: 'mul', ejemplo: '물 (mul) - agua', opciones: ['Agua', 'Fuego', 'Tierra', 'Aire'], respuesta: 0 },
        { coreano: '밥', nombre: 'Sustantivo', pronunciacion: 'bap', ejemplo: '밥 (bap) - arroz/comida', opciones: ['Arroz/Comida', 'Agua', 'Carne', 'Pan'], respuesta: 0 },
        { coreano: '사랑', nombre: 'Sustantivo', pronunciacion: 'sarang', ejemplo: '사랑 (sarang) - amor', opciones: ['Amor', 'Amigo', 'Familia', 'Paz'], respuesta: 0 }
    ],

    // Números y expresiones útiles
    6: [
        { coreano: '하나', nombre: 'Número', pronunciacion: 'hana', ejemplo: 'Uno (1) - nativo coreano', opciones: ['Uno (1)', 'Dos (2)', 'Tres (3)', 'Cuatro (4)'], respuesta: 0 },
        { coreano: '둘', nombre: 'Número', pronunciacion: 'dul', ejemplo: 'Dos (2) - nativo coreano', opciones: ['Dos (2)', 'Uno (1)', 'Tres (3)', 'Cinco (5)'], respuesta: 0 },
        { coreano: '셋', nombre: 'Número', pronunciacion: 'set', ejemplo: 'Tres (3) - nativo coreano', opciones: ['Tres (3)', 'Dos (2)', 'Cuatro (4)', 'Seis (6)'], respuesta: 0 },
        { coreano: '일', nombre: 'Número', pronunciacion: 'il', ejemplo: 'Uno (1) - sino-coreano', opciones: ['Uno (1)', 'Dos (2)', 'Diez (10)', 'Cien (100)'], respuesta: 0 },
        { coreano: '이', nombre: 'Número', pronunciacion: 'i', ejemplo: 'Dos (2) - sino-coreano', opciones: ['Dos (2)', 'Uno (1)', 'Tres (3)', 'Veinte (20)'], respuesta: 0 },
        { coreano: '삼', nombre: 'Número', pronunciacion: 'sam', ejemplo: 'Tres (3) - sino-coreano', opciones: ['Tres (3)', 'Dos (2)', 'Cuatro (4)', 'Treinta (30)'], respuesta: 0 },
        { coreano: '고마워요', nombre: 'Agradecimiento', pronunciacion: 'gomawoyo', ejemplo: 'Gracias (informal)', opciones: ['Gracias (informal)', 'Hola', 'Adiós', 'Perdón'], respuesta: 0 },
        { coreano: '잘 가요', nombre: 'Despedida', pronunciacion: 'jal gayo', ejemplo: 'Adiós (qué te vaya bien)', opciones: ['Adiós (informal)', 'Hola', 'Buenas noches', 'Bienvenido'], respuesta: 0 },
        { coreano: '안녕히 가세요', nombre: 'Despedida', pronunciacion: 'annyeonghi gaseyo', ejemplo: 'Adiós (formal, se va el otro)', opciones: ['Adiós (formal)', 'Hola', 'Gracias', 'Buenos días'], respuesta: 0 },
        { coreano: '네, 알겠어요', nombre: 'Confirmación', pronunciacion: 'ne, algess-eoyo', ejemplo: 'Sí, entiendo', opciones: ['Sí, entiendo', 'No sé', 'Tal vez', 'No entiendo'], respuesta: 0 }
    ]
};

// Función para obtener letras del alfabeto
function obtenerLetrasCoreano(mazo) {
    return alfabetoCoreano[mazo] || [];
}

// Función para contar mazos disponibles
function contarMazosCoreanoDisponibles() {
    return Object.keys(alfabetoCoreano).length;
}

// Función para obtener el nombre del mazo
function obtenerNombreMazoCoreano(mazo) {
    const nombres = {
        1: 'Consonantes Básicas',
        2: 'Consonantes Aspiradas y Dobles',
        3: 'Vocales Básicas',
        4: 'Vocales Compuestas',
        5: 'Palabras Básicas',
        6: 'Números y Expresiones Útiles'
    };
    return nombres[mazo] || `Mazo ${mazo}`;
}
