// ================================================
// BASE DE DATOS DE VOCABULARIO DE OPENINGS
// ================================================

const audiosVocabularioDatabase = {
    // ================================================
    // CONTENEDOR 1
    // ================================================
    
    // Sub-contenedor 1.1 (SHINGEKI NO KYOJIN - GUREN NO YUMIYA)
    'sub1_1': {
        // Mazo 1 - Vocabulario de la letra
        1: [
            { japones: '紅蓮', lectura: 'guren', opciones: ['Loto carmesí', 'Loto blanco', 'Flor', 'Rosa'], respuesta: 0 },
            { japones: '弓矢', lectura: 'yumiya', opciones: ['Arco y flecha', 'Espada', 'Lanza', 'Escudo'], respuesta: 0 },
            { japones: '叫ぶ', lectura: 'sakebu', opciones: ['Gritar', 'Susurrar', 'Cantar', 'Hablar'], respuesta: 0 },
            { japones: '自由', lectura: 'jiyuu', opciones: ['Libertad', 'Esclavitud', 'Paz', 'Guerra'], respuesta: 0 },
            { japones: '進撃', lectura: 'shingeki', opciones: ['Ataque', 'Defensa', 'Retirada', 'Estrategia'], respuesta: 0 },
            { japones: '巨人', lectura: 'kyojin', opciones: ['Titán', 'Humano', 'Monstruo', 'Ángel'], respuesta: 0 },
            { japones: '壁', lectura: 'kabe', opciones: ['Muro', 'Puerta', 'Camino', 'Cielo'], respuesta: 0 },
            { japones: '戦う', lectura: 'tatakau', opciones: ['Luchar', 'Huir', 'Negociar', 'Observar'], respuesta: 0 },
            { japones: '兵士', lectura: 'heishi', opciones: ['Soldado', 'Civil', 'Líder', 'Enemigo'], respuesta: 0 },
            { japones: '世界', lectura: 'sekai', opciones: ['Mundo', 'País', 'Ciudad', 'Pueblo'], respuesta: 0 }
        ],
        // Mazo 2 - Más vocabulario
        2: [
            { japones: '希望', lectura: 'kibou', opciones: ['Esperanza', 'Desesperación', 'Miedo', 'Valentía'], respuesta: 0 },
            { japones: '光', lectura: 'hikari', opciones: ['Luz', 'Oscuridad', 'Sonido', 'Color'], respuesta: 0 },
            { japones: '闇', lectura: 'yami', opciones: ['Oscuridad', 'Luz', 'Día', 'Noche'], respuesta: 0 },
            { japones: '未来', lectura: 'mirai', opciones: ['Futuro', 'Pasado', 'Presente', 'Ayer'], respuesta: 0 },
            { japones: '過去', lectura: 'kako', opciones: ['Pasado', 'Futuro', 'Ahora', 'Mañana'], respuesta: 0 },
            { japones: '命', lectura: 'inochi', opciones: ['Vida', 'Muerte', 'Alma', 'Cuerpo'], respuesta: 0 },
            { japones: '死', lectura: 'shi', opciones: ['Muerte', 'Vida', 'Nacimiento', 'Existencia'], respuesta: 0 },
            { japones: '翼', lectura: 'tsubasa', opciones: ['Alas', 'Patas', 'Manos', 'Ojos'], respuesta: 0 },
            { japones: '飛ぶ', lectura: 'tobu', opciones: ['Volar', 'Correr', 'Nadar', 'Saltar'], respuesta: 0 },
            { japones: '大地', lectura: 'daichi', opciones: ['Tierra', 'Cielo', 'Mar', 'Montaña'], respuesta: 0 }
        ],
        // Mazo 3-10 VACÍOS LISTOS PARA RELLENAR
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: []
    },

    // Sub-contenedor 1.2 (KIMETSU NO YAIBA - GURENGE)
    'sub1_2': {
        1: [
            { japones: '紅蓮', lectura: 'guren', opciones: ['Loto carmesí', 'Flor blanca', 'Rosa roja', 'Margarita'], respuesta: 0 },
            { japones: '華', lectura: 'hana', opciones: ['Flor', 'Hoja', 'Raíz', 'Tallo'], respuesta: 0 },
            { japones: '鬼', lectura: 'oni', opciones: ['Demonio', 'Ángel', 'Humano', 'Dios'], respuesta: 0 },
            { japones: '滅', lectura: 'metsu', opciones: ['Destrucción', 'Creación', 'Protección', 'Transformación'], respuesta: 0 },
            { japones: '刃', lectura: 'yaiba', opciones: ['Hoja de espada', 'Espada', 'Cuchillo', 'Lanza'], respuesta: 0 },
            { japones: '家族', lectura: 'kazoku', opciones: ['Familia', 'Amigos', 'Extraños', 'Enemigos'], respuesta: 0 },
            { japones: '守る', lectura: 'mamoru', opciones: ['Proteger', 'Atacar', 'Abandonar', 'Ignorar'], respuesta: 0 },
            { japones: '強い', lectura: 'tsuyoi', opciones: ['Fuerte', 'Débil', 'Rápido', 'Lento'], respuesta: 0 },
            { japones: '優しい', lectura: 'yasashii', opciones: ['Amable', 'Cruel', 'Indiferente', 'Enojado'], respuesta: 0 },
            { japones: '涙', lectura: 'namida', opciones: ['Lágrimas', 'Risa', 'Sonrisa', 'Grito'], respuesta: 0 }
        ],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: []
    },

    // Sub-contenedor 1.3 (NARUTO - SILHOUETTE)
    'sub1_3': {
        1: [
            { japones: '影', lectura: 'kage', opciones: ['Sombra', 'Luz', 'Reflejo', 'Imagen'], respuesta: 0 },
            { japones: '道', lectura: 'michi', opciones: ['Camino', 'Meta', 'Obstáculo', 'Destino'], respuesta: 0 },
            { japones: '友', lectura: 'tomo', opciones: ['Amigo', 'Enemigo', 'Extraño', 'Familiar'], respuesta: 0 },
            { japones: '夢', lectura: 'yume', opciones: ['Sueño', 'Realidad', 'Pesadilla', 'Fantasia'], respuesta: 0 },
            { japones: '忍者', lectura: 'ninja', opciones: ['Ninja', 'Samurai', 'Guerrero', 'Mago'], respuesta: 0 },
            { japones: '火影', lectura: 'hokage', opciones: ['Sombra de fuego', 'Sombra de agua', 'Sombra de viento', 'Sombra de tierra'], respuesta: 0 },
            { japones: '忍道', lectura: 'nindou', opciones: ['Camino ninja', 'Camino samurai', 'Camino guerrero', 'Camino pacífico'], respuesta: 0 },
            { japones: '信じる', lectura: 'shinjiru', opciones: ['Creer', 'Dudar', 'Negar', 'Olvidar'], respuesta: 0 },
            { japones: '約束', lectura: 'yakusoku', opciones: ['Promesa', 'Mentira', 'Amenaza', 'Sugerencia'], respuesta: 0 },
            { japones: '未来', lectura: 'mirai', opciones: ['Futuro', 'Pasado', 'Presente', 'Eterno'], respuesta: 0 }
        ],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: []
    },

    // ================================================
    // MÁS CONTENEDORES VACÍOS LISTOS PARA RELLENAR
    // ================================================
    
    'sub1_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    'sub1_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    
    'sub2_1': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    'sub2_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    'sub2_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    'sub2_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    'sub2_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },

    'sub3_1': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    'sub3_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    'sub3_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    'sub3_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] },
    'sub3_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] }
};

// ================================================
// FUNCIONES DE ACCESO
// ================================================

// Función para obtener vocabulario de audios
function obtenerVocabularioAudio(contenedor, subcontenedor, mazo) {
    const key = `sub${contenedor}_${subcontenedor}`;
    if (audiosVocabularioDatabase[key] && audiosVocabularioDatabase[key][mazo]) {
        return audiosVocabularioDatabase[key][mazo];
    }
    return []; // Retorna array vacío si no existe
}

// Función para verificar si existe vocabulario
function existeVocabularioAudio(contenedor, subcontenedor, mazo) {
    const vocabulario = obtenerVocabularioAudio(contenedor, subcontenedor, mazo);
    return vocabulario && vocabulario.length > 0;
}

// Función para agregar nuevo vocabulario
function agregarVocabularioAudio(contenedor, subcontenedor, mazo, nuevasPalabras) {
    const key = `sub${contenedor}_${subcontenedor}`;
    
    if (!audiosVocabularioDatabase[key]) {
        audiosVocabularioDatabase[key] = {};
    }
    
    if (!audiosVocabularioDatabase[key][mazo]) {
        audiosVocabularioDatabase[key][mazo] = [];
    }
    
    audiosVocabularioDatabase[key][mazo] = audiosVocabularioDatabase[key][mazo].concat(nuevasPalabras);
    return true;
}
