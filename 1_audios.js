// ================================================
// BASE DE DATOS DE AUDIOS MP3 (OPENINGS)
// ================================================

const audiosDatabase = {
    // ================================================
    // CONTENEDOR 1 - OPENINGS SHONEN
    // ================================================
    
    // Sub-contenedor 1.1
    '1_1': {
        titulo: "🎌 Shingeki no Kyojin - Opening 1",
        driveId: "1tS-gKr6bf4MY5Yrw7zRvP2uP_zq9rsLl", // REEMPLAZA con ID real MP3
        descripcion: "Opening 1: 'Guren no Yumiya' by Linked Horizon",
        duracion: "1:30",
        artista: "Linked Horizon",
        anime: "Shingeki no Kyojin",
        temporada: 1,
        año: 2013
    },
    
    // Sub-contenedor 1.2
    '1_2': {
        titulo: "🐉 Kimetsu no Yaiba - Opening 1",
        driveId: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS", // REEMPLAZA con ID real MP3
        descripcion: "Opening 1: 'Gurenge' by LiSA",
        duracion: "1:35",
        artista: "LiSA",
        anime: "Kimetsu no Yaiba",
        temporada: 1,
        año: 2019
    },
    
    // Sub-contenedor 1.3
    '1_3': {
        titulo: "⚡ Naruto Shippuden - Opening 16",
        driveId: "1X6qhQxLNemXus_5WjLlMIWOAsHsJSsRS", // REEMPLAZA con ID real MP3
        descripcion: "Opening 16: 'Silhouette' by KANA-BOON",
        duracion: "1:40",
        artista: "KANA-BOON",
        anime: "Naruto Shippuden",
        temporada: 20,
        año: 2014
    },
    
    // Sub-contenedor 1.4
    '1_4': {
        titulo: "🏴‍☠️ One Piece - Opening 14",
        driveId: "", // VACÍO - LISTO PARA RELLENAR
        descripcion: "Opening 14: 'Fight Together' by Namie Amuro",
        duracion: "1:45",
        artista: "Namie Amuro",
        anime: "One Piece",
        temporada: 14,
        año: 2011
    },
    
    // Sub-contenedor 1.5
    '1_5': {
        titulo: "💀 Jujutsu Kaisen - Opening 1",
        driveId: "", // VACÍO - LISTO PARA RELLENAR
        descripcion: "Opening 1: 'Kaikai Kitan' by Eve",
        duracion: "1:30",
        artista: "Eve",
        anime: "Jujutsu Kaisen",
        temporada: 1,
        año: 2020
    },
    
    // ================================================
    // CONTENEDOR 2 - OPENINGS SHOJO/DRAMA
    // ================================================
    
    // Sub-contenedor 2.1
    '2_1': {
        titulo: "🎓 Haikyuu!! - Opening 1",
        driveId: "", // VACÍO - LISTO PARA RELLENAR
        descripcion: "Opening 1: 'Imagination' by SPYAIR",
        duracion: "1:35",
        artista: "SPYAIR",
        anime: "Haikyuu!!",
        temporada: 1,
        año: 2014
    },
    
    // Sub-contenedor 2.2
    '2_2': {
        titulo: "📔 Death Note - Opening 1",
        driveId: "", // VACÍO - LISTO PARA RELLENAR
        descripcion: "Opening 1: 'the WORLD' by Nightmare",
        duracion: "1:30",
        artista: "Nightmare",
        anime: "Death Note",
        temporada: 1,
        año: 2006
    },
    
    // Sub-contenedor 2.3
    '2_3': {
        titulo: "🔮 Fullmetal Alchemist - Opening 1",
        driveId: "", // VACÍO - LISTO PARA RELLENAR
        descripcion: "Opening 1: 'Again' by YUI",
        duracion: "1:40",
        artista: "YUI",
        anime: "Fullmetal Alchemist",
        temporada: 1,
        año: 2009
    },
    
    // ================================================
    // CONTENEDOR 3 - VACÍO LISTO PARA RELLENAR
    // ================================================
    
    '3_1': {
        titulo: "🎵 Tokyo Revengers - Opening 1",
        driveId: "", // VACÍO - LISTO PARA RELLENAR
        descripcion: "Agrega tus propios openings favoritos",
        duracion: "1:30",
        artista: "",
        anime: "Tokyo Revengers",
        temporada: 1,
        año: 2021
    }
};

// ================================================
// FUNCIONES DE ACCESO PARA AUDIOS
// ================================================

function obtenerAudio(contenedor, subcontenedor) {
    const key = `${contenedor}_${subcontenedor}`;
    return audiosDatabase[key] || null;
}

function obtenerTodosAudios() {
    return audiosDatabase;
}

function existeAudio(contenedor, subcontenedor) {
    const key = `${contenedor}_${subcontenedor}`;
    return audiosDatabase[key] && audiosDatabase[key].driveId !== "";
}

function obtenerContenedoresAudiosDisponibles() {
    const contenedores = {};
    
    Object.keys(audiosDatabase).forEach(key => {
        const [contenedor, subcontenedor] = key.split('_');
        if (!contenedores[contenedor]) {
            contenedores[contenedor] = [];
        }
        if (audiosDatabase[key].driveId !== "") {
            contenedores[contenedor].push(subcontenedor);
        }
    });
    
    return contenedores;
}
