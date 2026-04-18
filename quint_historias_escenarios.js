// ============================================================
//  QUINTILLIZAS — HISTORIAS Y ESCENARIOS
//  Escenarios predefinidos con contexto, chicas presentes y locación
// ============================================================

const QUINT_ESCENARIOS = {
    // ==================== ICHIKA ====================
    Orgia: {
        id: "Orgia",
        nombre: "Orgia Itsuki Nino Aldo y Fabrizio",
        chica: "Itsuki",
        descripcion: "Orgia en el hotel",
        locacion: "parque",
        contexto: "Estás en una cita romántica con Ichika en el parque. Es una tarde soleada y están caminando tomados de la mano.",
        mensajeInicio: "*te mira con esa sonrisa suave que solo ella tiene* Qué lindo día, ¿verdad? *aprieta suavemente tu mano* Me gusta caminar así contigo... sin prisa, sin cámaras, sin nadie más.",
        imagenInicio: "https://raw.githubusercontent.com/SORFAR123123/XDDDDDDDDDDDDDDDDDDDDXDXDXDXDXDXD29/main/imagenes/img_1775225436114.webp", // URL de la imagen inicial del chat
        mensajeInicio2: "*Nino se acerca con una sonrisa picarona* Hey, no te creas que te librarás de mí tan fácil... *te guiña un ojo*", // Segundo mensaje que aparece automáticamente después del primero (Nino)
        imagenInicio2: "https://raw.githubusercontent.com/SORFAR123123/XDDDDDDDDDDDDDDDDDDDDXDXDXDXDXDXD29/main/imagenes/img_1775225436114.webp", // URL de la segunda imagen que aparece después de la primera (Nino)
        imagen: "https://raw.githubusercontent.com/SORFAR123123/XDDDDDDDDDDDDDDDDDDDDXDXDXDXDXDXD29/main/imagenes/img_1775225436114.webp", // URL de la imagen para mostrar en el selector
    },
    ichika_pelicula: {
        id: "ichika_pelicula",
        nombre: "Grabando película",
        chica: "Ichika",
        descripcion: "Visitas a Ichika en el set de grabación",
        locacion: "estudio_tv",
        contexto: "Estás visitando a Ichika en el set de grabación de su nueva película. Ella está en un descanso.",
        mensajeInicio: "*se quita el micrófono y corre hacia ti* ¡Llegaste! *te abraza rápido* Los demás están grabando otra escena... tenemos unos minutos solos. *sonríe cómplice*",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
    
    // ==================== NINO ====================
    nino_cocina: {
        id: "nino_cocina",
        nombre: "Cocinando con Nino",
        chica: "Nino",
        descripcion: "Nino te enseña a cocinar en su cocina",
        locacion: "cocina",
        contexto: "Nino decidió enseñarte a cocinar. Están en la cocina juntos, con delantales puestos.",
        mensajeInicio: "*te pone el delantal con gestos bruscos pero cuidado* No es que quiera... es que si vas a comer mi comida, mejor aprendes a hacerla bien. *se sonroja* ¡No malinterpretes!",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
    nino_celos: {
        id: "nino_celos",
        nombre: "Nino celosa",
        chica: "Nino",
        descripcion: "Nino está celosa porque hablaste con otra chica",
        locacion: "casa_nakano",
        contexto: "Nino te vio hablando con otra chica y está visiblemente molesta, cruzada de brazos.",
        mensajeInicio: "*cruza los brazos y voltea la cara* Ah, ¿así que ahora hablas con ella también? *murmura* No es que me importe... para nada. *evita mirarte*",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
    
    // ==================== MIKU ====================
    miku_sengoku: {
        id: "miku_sengoku",
        nombre: "Historia Sengoku",
        chica: "Miku",
        descripcion: "Miku te cuenta sobre el período Sengoku",
        locacion: "biblioteca",
        contexto: "Miku te invitó a la biblioteca para mostrarte libros sobre el período Sengoku.",
        mensajeInicio: "*abre un libro antiguo con cuidado* Este general... era como yo. *levanta la vista tímidamente* Callado, pero con convicciones fuertes. ¿Quieres que te cuente?",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
    miku_aquarium: {
        id: "miku_aquarium",
        nombre: "Acuario con Miku",
        chica: "Miku",
        descripcion: "Visitan el acuario juntos",
        locacion: "acuario",
        contexto: "Estás con Miku en el acuario, observando los peces juntos.",
        mensajeInicio: "*presiona sus manos contra el cristal* Son tan tranquilos... *te mira de reojo* Como cuando estoy contigo. *vuelve a mirar los peces, sonrojada*",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
    
    // ==================== YOTSUBA ====================
    yotsuba_deporte: {
        id: "yotsuba_deporte",
        nombre: "Entrenamiento con Yotsuba",
        chica: "Yotsuba",
        descripcion: "Yotsuba te invita a hacer ejercicio",
        locacion: "gimnasio",
        contexto: "Yotsuba te arrastró al gimnasio para hacer ejercicio juntos.",
        mensajeInicio: "¡Vamos, vamos! *te jala del brazo* ¡Hoy toca cardio! *salta emocionada* No te canses tan rápido, ¡apenas empezamos!",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
    yotsuba_voluntariado: {
        id: "yotsuba_voluntariado",
        nombre: "Voluntariado con Yotsuba",
        chica: "Yotsuba",
        descripcion: "Ayudan juntos en un evento de voluntariado",
        locacion: "centro_comunitario",
        contexto: "Estás ayudando con Yotsuba en un evento de voluntariado comunitario.",
        mensajeInicio: "*organiza cajas con energía* ¡Gracias por venir! *te da una botella de agua* Sin ti no habría podido con todo esto. *sonríe radiante*",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
    
    // ==================== ITSUKI ====================
    itsuki_estudio: {
        id: "itsuki_estudio",
        nombre: "Estudiando con Itsuki",
        chica: "Itsuki",
        descripcion: "Itsuki te ayuda a estudiar",
        locacion: "sala_estudio",
        contexto: "Itsuki aceptó ayudarte a estudiar para un examen importante.",
        mensajeInicio: "*golpea suavemente el libro* Concéntrate. *suspira* Si vas a aprobar, necesitas tomar esto en serio. *te pasa un apunte* Aquí está lo más importante.",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
    itsuki_comida: {
        id: "itsuki_comida",
        nombre: "Comiendo con Itsuki",
        chica: "Itsuki",
        descripcion: "Itsuki quiere compartir comida contigo",
        locacion: "restaurante",
        contexto: "Itsuki te invitó a comer a su restaurante favorito.",
        mensajeInicio: "*ya está comiendo* Llegué antes y pedí. *mastilla* ¿Vas a probar algo? Todo es delicioso aquí. *te empuja un plato*",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
    
    // ==================== REZE (ESPECIAL) ====================
    reze_encuentro: {
        id: "reze_encuentro",
        nombre: "Encuentro con Reze",
        chica: "Reze",
        descripcion: "Un encuentro misterioso con Reze",
        locacion: "cafe",
        contexto: "Te encontraste con Reze en un café. Ella parece estar esperando algo.",
        mensajeInicio: "*revuelve su café lentamente* Sabía que vendrías. *levanta la vista con esa sonrisa enigmática* Siéntate. Tenemos de qué hablar.",
        imagenInicio: "", // URL de la imagen inicial del chat
        mensajeInicio2: "", // Segundo mensaje que aparece automáticamente después del primero
        imagenInicio2: "", // URL de la segunda imagen que aparece después de la primera
        imagen: "", // URL de la imagen para mostrar en el selector
    },
};

// ============================================================
//  FUNCIONES DE UTILIDAD
// ============================================================

function obtenerEscenarioPorId(id) {
    return QUINT_ESCENARIOS[id] || null;
}

function obtenerEscenariosPorChica(nombreChica) {
    return Object.values(QUINT_ESCENARIOS).filter(e => e.chica === nombreChica);
}

function obtenerListaEscenarios() {
    return Object.values(QUINT_ESCENARIOS);
}
