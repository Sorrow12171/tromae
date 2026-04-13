// ================================================
// ALFABETO PORTUGUÉS - QUIZ DE APRENDIZAJE
// ================================================

const alfabetoPortugues = {
    // Vocales orales
    1: [
        { portugues: 'A a', nombre: 'A', pronunciacion: 'a', ejemplo: 'Abacaxi (abacaxi) - piña', opciones: ['a', 'e', 'i', 'o'], respuesta: 0 },
        { portugues: 'E e', nombre: 'E', pronunciacion: 'e/i', ejemplo: 'Escola (escola) - escuela', opciones: ['e/i', 'a', 'o', 'u'], respuesta: 0 },
        { portugues: 'I i', nombre: 'I', pronunciacion: 'i', ejemplo: 'Igreja (igreya) - iglesia', opciones: ['i', 'e', 'a', 'o'], respuesta: 0 },
        { portugues: 'O o', nombre: 'O', pronunciacion: 'o/u', ejemplo: 'Olho (olhu) - ojo', opciones: ['o/u', 'a', 'e', 'i'], respuesta: 0 },
        { portugues: 'U u', nombre: 'U', pronunciacion: 'u', ejemplo: 'Unha (uña) - uña', opciones: ['u', 'o', 'i', 'a'], respuesta: 0 }
    ],

    // Vocales nasales
    2: [
        { portugues: 'Ã ã', nombre: 'A tilde', pronunciacion: 'an nasal', ejemplo: 'Pão (pan) - pan', opciones: ['an (nasal)', 'a', 'en', 'on'], respuesta: 0 },
        { portugues: 'Õ õ', nombre: 'O tilde', pronunciacion: 'on nasal', ejemplo: 'Corções (corçons) - pantalones cortos', opciones: ['on (nasal)', 'o', 'en', 'an'], respuesta: 0 },
        { portugues: 'Â â', nombre: 'A circunflejo', pronunciacion: 'a cerrada', ejemplo: 'Câmara (cámara) - cámara', opciones: ['a cerrada', 'a abierta', 'e', 'o'], respuesta: 0 },
        { portugues: 'Ê ê', nombre: 'E circunflejo', pronunciacion: 'e cerrada', ejemplo: 'Três (tres) - tres', opciones: ['e cerrada', 'e abierta', 'i', 'a'], respuesta: 0 },
        { portugues: 'Ô ô', nombre: 'O circunflejo', pronunciacion: 'o cerrada', ejemplo: 'Avô (avó) - abuelo', opciones: ['o cerrada', 'o abierta', 'u', 'a'], respuesta: 0 }
    ],

    // Consonantes especiales
    3: [
        { portugues: 'Ç ç', nombre: 'C cedilha', pronunciacion: 's', ejemplo: 'Coração (corazón) - corazón', opciones: ['s', 'k', 'z', 'ch'], respuesta: 0 },
        { portugues: 'NH nh', nombre: 'Enhe', pronunciacion: 'ñ', ejemplo: 'Manhã (mañá) - mañana', opciones: ['ñ', 'n', 'nh (inglés)', 'ny'], respuesta: 0 },
        { portugues: 'LH lh', nombre: 'Ele agá', pronunciacion: 'lli', ejemplo: 'Filho (filhu) - hijo', opciones: ['lli', 'l', 'ly', 'lh'], respuesta: 0 },
        { portugues: 'RR rr', nombre: 'Erre doble', pronunciacion: 'r fuerte/g', ejemplo: 'Carro (carro/jarro) - coche', opciones: ['r fuerte/g', 'r suave', 'rr (inglés)', 'd'], respuesta: 0 },
        { portugues: 'SS ss', nombre: 'Esse doble', pronunciacion: 's', ejemplo: 'Passar (pasar) - pasar', opciones: ['s', 'z', 'sh', 'ss'], respuesta: 0 }
    ],

    // Consonantes comunes
    4: [
        { portugues: 'B b', nombre: 'Be', pronunciacion: 'b', ejemplo: 'Bom (bon) - bueno', opciones: ['b', 'v', 'p', 'd'], respuesta: 0 },
        { portugues: 'C c', nombre: 'Ce', pronunciacion: 'k/s', ejemplo: 'Casa (casa) / Céu (seu) - casa/cielo', opciones: ['k/s', 'b', 'd', 'g'], respuesta: 0 },
        { portugues: 'D d', nombre: 'De', pronunciacion: 'd/yi', ejemplo: 'Dia (día/yía) - día', opciones: ['d/yi', 't', 'b', 'n'], respuesta: 0 },
        { portugues: 'F f', nombre: 'Efe', pronunciacion: 'f', ejemplo: 'Fácil (fásil) - fácil', opciones: ['f', 'v', 'p', 'ph'], respuesta: 0 },
        { portugues: 'G g', nombre: 'Ge', pronunciacion: 'g/yi', ejemplo: 'Gato (gato) / Gente (yente) - gato/gente', opciones: ['g/yi', 'k', 'h', 'j'], respuesta: 0 },
        { portugues: 'H h', nombre: 'Agá', pronunciacion: 'muda (no suena)', ejemplo: 'Hora (ora) - hora', opciones: ['muda (no suena)', 'h aspirada', 'j', 'ch'], respuesta: 0 },
        { portugues: 'J j', nombre: 'Jota', pronunciacion: 'y/sh', ejemplo: 'Janela (yanéla) - ventana', opciones: ['y/sh', 'j (español)', 'h', 'g'], respuesta: 0 },
        { portugues: 'L l', nombre: 'Ele', pronunciacion: 'l/u', ejemplo: 'Sol (so) - sol', opciones: ['l/u', 'l', 'r', 'n'], respuesta: 0 },
        { portugues: 'M m', nombre: 'Eme', pronunciacion: 'm', ejemplo: 'Mãe (mãi) - madre', opciones: ['m', 'n', 'b', 'p'], respuesta: 0 },
        { portugues: 'N n', nombre: 'Ene', pronunciacion: 'n', ejemplo: 'Não (nan) - no', opciones: ['n', 'm', 'l', 'r'], respuesta: 0 }
    ],

    // Más consonantes
    5: [
        { portugues: 'P p', nombre: 'Pe', pronunciacion: 'p', ejemplo: 'Pão (pan) - pan', opciones: ['p', 'b', 'ph', 'f'], respuesta: 0 },
        { portugues: 'Q q', nombre: 'Qu', pronunciacion: 'k', ejemplo: 'Queijo (keiyu) - queso', opciones: ['k', 'ku', 'kw', 'q'], respuesta: 0 },
        { portugues: 'R r', nombre: 'Erre', pronunciacion: 'r/h', ejemplo: 'Rato (jatu/rato) - ratón', opciones: ['r/h', 'rr', 'd', 'l'], respuesta: 0 },
        { portugues: 'S s', nombre: 'Esse', pronunciacion: 's/z/sh', ejemplo: 'Sim (sin) / Casa (caza)', opciones: ['s/z/sh', 'z siempre', 'x', 'ch'], respuesta: 0 },
        { portugues: 'T t', nombre: 'Te', pronunciacion: 't/tchi', ejemplo: 'Tchau (chau/tchiau) - adiós', opciones: ['t/tchi', 'd', 'th', 'tch'], respuesta: 0 },
        { portugues: 'V v', nombre: 'Ve', pronunciacion: 'v', ejemplo: 'Vida (vida) - vida', opciones: ['v', 'b', 'w', 'f'], respuesta: 0 },
        { portugues: 'X x', nombre: 'Xis', pronunciacion: 'sh/ch/s/z', ejemplo: 'Xícara (shícara) - taza', opciones: ['sh/ch/s/z', 'ks', 'x', 'z'], respuesta: 0 },
        { portugues: 'Z z', nombre: 'Ze', pronunciacion: 'z/zh/sh', ejemplo: 'Zero (zero/yeiro) - cero', opciones: ['z/zh/sh', 's', 'x', 'dz'], respuesta: 0 }
    ],

    // Dígrafos y combinaciones nasales
    6: [
        { portugues: 'AM am', nombre: 'A nasal', pronunciacion: 'an nasal', ejemplo: 'Cama (cama/cama nasal) - cama', opciones: ['an nasal', 'am', 'a', 'en'], respuesta: 0 },
        { portugues: 'EM em', nombre: 'E nasal', pronunciacion: 'en nasal', ejemplo: 'Tempo (tempu/tenpu) - tiempo', opciones: ['en nasal', 'em', 'in', 'on'], respuesta: 0 },
        { portugues: 'IM im', nombre: 'I nasal', pronunciacion: 'in nasal', ejemplo: 'Sim (sin) - sí', opciones: ['in nasal', 'im', 'in', 'en'], respuesta: 0 },
        { portugues: 'OM om', nombre: 'O nasal', pronunciacion: 'on nasal', ejemplo: 'Bom (bon) - bueno', opciones: ['on nasal', 'om', 'un', 'an'], respuesta: 0 },
        { portugues: 'UM um', nombre: 'U nasal', pronunciacion: 'un nasal', ejemplo: 'Um (un) - uno', opciones: ['un nasal', 'um', 'un', 'on'], respuesta: 0 },
        { portugues: 'ÃO ão', nombre: 'Atilde + O', pronunciacion: 'an + on nasal', ejemplo: 'Pão (pan) - pan', opciones: ['an + on nasal', 'ao', 'a + o', 'na + o'], respuesta: 0 },
        { portugues: 'QU qu', nombre: 'Cu', pronunciacion: 'k (antes de e/i)', ejemplo: 'Quente (kenti) - caliente', opciones: ['k (antes de e/i)', 'kw', 'ku', 'qu'], respuesta: 0 },
        { portugues: 'GU gu', nombre: 'Gu', pronunciacion: 'g (antes de e/i)', ejemplo: 'Guerra (guéra) - guerra', opciones: ['g (antes de e/i)', 'gw', 'gu', 'gü'], respuesta: 0 }
    ],

    // Palabras básicas para practicar
    7: [
        { portugues: 'Olá', nombre: 'Saludo', pronunciacion: 'olá', ejemplo: '¡Hola!', opciones: ['Hola', 'Adiós', 'Gracias', 'Por favor'], respuesta: 0 },
        { portugues: 'Obrigado/a', nombre: 'Agradecimiento', pronunciacion: 'obligadu/a', ejemplo: 'Gracias (hombre/mujer)', opciones: ['Gracias', 'Hola', 'Adiós', 'Sí'], respuesta: 0 },
        { portugues: 'Sim', nombre: 'Afirmación', pronunciacion: 'sin', ejemplo: 'Sí', opciones: ['Sí', 'No', 'Tal vez', 'Nunca'], respuesta: 0 },
        { portugues: 'Não', nombre: 'Negación', pronunciacion: 'nan', ejemplo: 'No', opciones: ['No', 'Sí', 'Tal vez', 'Siempre'], respuesta: 0 },
        { portugues: 'Tchau', nombre: 'Despedida', pronunciacion: 'chau', ejemplo: '¡Adiós!', opciones: ['Adiós', 'Hola', 'Gracias', 'Bienvenido'], respuesta: 0 },
        { portugues: 'Bom dia', nombre: 'Saludo mañana', pronunciacion: 'bon día', ejemplo: '¡Buenos días!', opciones: ['Buenos días', 'Buenas tardes', 'Buenas noches', 'Hola'], respuesta: 0 }
    ],

    // Frases útiles
    8: [
        { portugues: 'Como vai?', nombre: 'Pregunta', pronunciacion: 'comu vai?', ejemplo: '¿Cómo estás?', opciones: ['¿Cómo estás?', '¿Qué hora es?', '¿Cómo te llamas?', '¿Dónde vives?'], respuesta: 0 },
        { portugues: 'Eu não entendo', nombre: 'Incomprensión', pronunciacion: 'eu nan entendeu', ejemplo: 'No entiendo', opciones: ['No entiendo', 'Entiendo', 'No sé', 'Lo siento'], respuesta: 0 },
        { portugues: 'Por favor', nombre: 'Cortesía', pronunciacion: 'por favor', ejemplo: 'Por favor', opciones: ['Por favor', 'Gracias', 'De nada', 'Hola'], respuesta: 0 },
        { portugues: 'De nada', nombre: 'Respuesta', pronunciacion: 'chi nada', ejemplo: 'De nada', opciones: ['De nada', 'Gracias', 'Hola', 'Adiós'], respuesta: 0 },
        { portugues: 'Desculpe', nombre: 'Disculpa', pronunciacion: 'descúlpi', ejemplo: 'Perdón / Disculpe', opciones: ['Perdón / Disculpe', 'Gracias', 'Hola', 'Bienvenido'], respuesta: 0 },
        { portugues: 'Muito', nombre: 'Adverbio', pronunciacion: 'muitu', ejemplo: 'Mucho / Muy', opciones: ['Mucho / Muy', 'Poco', 'Nada', 'Más'], respuesta: 0 },
        { portugues: 'Bem', nombre: 'Adverbio', pronunciacion: 'ben', ejemplo: 'Bien', opciones: ['Bien', 'Mal', 'Regular', 'Muy'], respuesta: 0 },
        { portugues: 'Mal', nombre: 'Adverbio', pronunciacion: 'mau', ejemplo: 'Mal', opciones: ['Mal', 'Bien', 'Regular', 'Muy'], respuesta: 0 },
        { portugues: 'Aqui', nombre: 'Adverbio de lugar', pronunciacion: 'aquí', ejemplo: 'Aquí', opciones: ['Aquí', 'Allí', 'Donde', 'Lejos'], respuesta: 0 },
        { portugues: 'Onde?', nombre: 'Pregunta', pronunciacion: 'ondi?', ejemplo: '¿Dónde?', opciones: ['¿Dónde?', '¿Qué?', '¿Cuándo?', '¿Quién?'], respuesta: 0 }
    ]
};

// Función para obtener letras del alfabeto
function obtenerLetrasPortugues(mazo) {
    return alfabetoPortugues[mazo] || [];
}

// Función para contar mazos disponibles
function contarMazosPortuguesDisponibles() {
    return Object.keys(alfabetoPortugues).length;
}

// Función para obtener el nombre del mazo
function obtenerNombreMazoPortugues(mazo) {
    const nombres = {
        1: 'Vocales Orales',
        2: 'Vocales Nasales',
        3: 'Consonantes Especiales',
        4: 'Consonantes Comunes (A-N)',
        5: 'Consonantes Comunes (P-Z)',
        6: 'Dígrafos y Combinaciones Nasales',
        7: 'Palabras Básicas',
        8: 'Frases Útiles'
    };
    return nombres[mazo] || `Mazo ${mazo}`;
}
