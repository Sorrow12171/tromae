// ============================================================
//  SISTEMA DE MENSAJES CELULAR — QUINTILLIZAS
//  Cada ciertos mensajes, una chica te llama o manda mensaje.
//  Aparece un chat secundario de celular.
//  Al terminar, la chica con la que estabas reacciona al contexto.
// ============================================================

const CELULAR_CONFIG = {
    mensajesMinimos: 15,       // Mínimo de mensajes antes de que suene el celular
    mensajesMaximos: 30,       // Máximo de mensajes antes de que suene el celular
    probabilidad: 0.35,        // 35% de probabilidad cuando se alcanza el contador
};

// Estado del sistema de celular
let celularActivo         = false;
let celularChicaActual    = null;
let celularHistorial      = [];
let celularContador       = 0;
let celularSiguienteEn    = 0;
let celularEsLlamada      = false;  // true = llamada, false = mensaje de texto
let celularUIVisible      = false;

// ============================================================
//  FRASES DE ENTRADA — cuando el celular suena
// ============================================================

const FRASES_LLAMADA_ENTRADA = {
    Ichika:  "*tu celular vibra suavemente en tu bolsillo* 📱 *La pantalla muestra: **Ichika está llamando...** *un tono dulce y melódico suena* \"Hola~ soy yo... ¿tienes un momentito para mí? 💕\"",
    Nino:    "*tu celular suena con insistencia* 📱 *Pantalla: **Nino** — *tono urgente pero cariñoso* \"¡Oye! Contestame... quiero escucharte un rato.\"",
    Miku:    "*celular vibrando con suavidad* 📱 *En la pantalla: **Miku**... *tono tranquilo e íntimo* \"...Hola. ¿Puedo robarte unos minutos?\"",
    Yotsuba: "*¡BRRR BRRR! Tu celular suena con energía* 📱 ***YOTSUBA** — *tono súper animado* \"¡¡HOLA!! ¡¿Puedo hablar contigo?! ¡Te extrañé! 💨💨\"",
    Itsuki:  "*celular sonando con calma* 📱 ***Itsuki** está llamando... *tono sereno pero cálido* \"Necesito escucharte... ¿tienes un momento?\"",
};

const FRASES_MENSAJE_ENTRADA = {
    Ichika:  "*tu celular vibra suavemente* 📱 *Notificación de **Ichika**: \"Hola~ ¿En qué estás pensando? 💕 Me pregunto si estarás tan... distraído como yo~\"",
    Nino:    "*celular suena* 📱 *Mensaje de **Nino**: \"Oye... estaba pensando en ti. No me dejes en visto, ¿eh? 💢\"",
    Miku:    "*vibración suave del celular* 📱 ***Miku** te escribió: \"...Hola. ¿Puedo confesarte algo? Tengo algo que quiero decirte...\"",
    Yotsuba: "*¡Tu celular casi explota de notificaciones!* 📱 ***Yotsuba**: \"HOLA HOLA HOLA 💨 ¿¿QUÉ HACES?? ¡¡Estaba pensando en ti y no pude evitar escribirte!!\"",
    Itsuki:  "*celular vibra* 📱 ***Itsuki**: \"Necesito hablar contigo... es algo que no puedo decir en persona ahora. ¿Puedes responder?\"",
};

// ============================================================
//  DIALOGOS DE CELULAR — respuestas automáticas de las chicas
//  Se usan cuando el usuario NO responde y el sistema genera respuestas.
// ============================================================

const DIALOGOS_CELULAR_AUTOMATICOS = {
    Ichika: [
        "*se ríe suavemente al otro lado, con voz sugerente* Fufu... ¿estás bien? *pausa cargada* Me imaginaba que estarías ocupado... pero siempre tengo tiempo para ti~ *voz melosa*",
        "*suspira al teléfono, con un tono íntimo* Ya veo... *voz suave y cercana* No importa. Solo quería escuchar tu voz un ratito... me haces falta~",
        "*ríe por lo bajo, coqueta* Tranquilo, no te retendré mucho... *pausa cálida* Pero prométeme que luego me das toda tu atención, ¿sí? 💕",
        "*voz sedosa y tentadora* Sabía que dirías eso... *se muerde el labio al teléfono* Eres tan adorable cuando te esfuerzas~ Cuídate por mí, ¿vale?",
    ],
    Nino: [
        "*resopla al teléfono, pero con cariño* ¡¿En serio?! *suspira* Bueno... *voz más suave* Pero luego me compensas, ¿eh? Te lo debo~",
        "*cruza los brazos al otro lado* Hmph. Está bien. *pausa, voz más baja* ...Pero no tardes en escribirme. Me molesta cuando desapareces~",
        "*se escucha un suspiro largo* ...Fine. *voz más suave y cercana* Hablamos después. Y... *pausa* ...piensa en mí un poco, ¿quieres?",
        "*golpea suavemente el teléfono, algo tsundere* ¡No me hagas esperar tanto la próxima vez! *suspira, voz más cálida* ...Te extraño, ¿sabes?",
    ],
    Miku: [
        "*silencio breve, voz tímida pero sincera* ...Ya entiendo. *voz tranquila pero cálida* No te preocupes... solo... piensa en mí de vez en cuando, ¿sí?",
        "*pausa larga, suspiro suave* ...Está bien. *voz íntima* Hablamos luego... *pausa* ...Y... gracias por escucharme aunque sea un rato.",
        "*se escucha un suspiro suave* ...Sí. *voz calmada pero cercana* Cuídate mucho... *murmura* ...Te extrañaré un poco.",
        "*voz baja, con timidez pero determinación* ...Entendido. *pausa cargada* Que estés bien... y... *susurra* ...no te olvides de mí, ¿vale?",
    ],
    Yotsuba: [
        "*se ríe a carcajadas, pero con cariño* ¡¡OK OK!! *voz súper animada pero cálida* ¡¡Hablamos luego!! ¡¡Y no te olvides de escribirme, ¿eh?! 💨💨",
        "*grita un poco, pero se nota la emoción* ¡¡¿EN SERIO?! *suspira fuerte, voz más suave* Bueno bueno... ¡¡pero prométeme que piensas en mí!!",
        "*voz un momento triste, pero se anima* Aww... *pero vuelve la energía* ¡¡OK!! ¡¡Nos vemos pronto!! ¡¡Y te voy a abrazar fuerte!!",
        "*se ríe, súper cálida* ¡¡Jajaja!! ¡¡Está bien!! *voz alegre y cariñosa* ¡¡No tardes en escribirme!! ¡¡Te estaré esperando!!",
    ],
    Itsuki: [
        "*suspira, voz seria pero con cariño* Entiendo. *voz amable pero firme* Hablamos cuando puedas... pero no me dejes esperando demasiado, ¿entiendes?",
        "*pausa, voz seria pero cercana* ...Está bien. *voz firme pero cálida* Pero no olvides lo que íbamos a hablar... es importante para mí.",
        "*se escucha un suspiro* Bueno. *voz calmada pero sincera* Que te vaya bien... *pausa* ...Y cuídate. Me importa que estés bien.",
        "*voz seria pero con un toque de vulnerabilidad* ...Ok. *pausa* Nos vemos luego... *murmura* ...Y no tardes en volver a escribirme, ¿vale?",
    ],
};

// ============================================================
//  REACCIONES POST-LLAMADA — la chica actual reacciona
//  Estas son las frases que dice la chica con la que estabas
//  DESPUÉS de que terminas la llamada/mensaje con otra chica.
// ============================================================

const REACCIONES_POST_LLAMADA = {
    // --- ICHIKA reacciona ---
    Ichika: {
        Nino: [
            "*te mira con una sonrisa que no llega del todo a los ojos* ¿Nino? *inclina la cabeza, voz suave pero con un toque de celos* ¿Estaban en medio de algo importante? *se acerca y te toma de la mano, apretando con posesión* ...No, no importa. Ahora estás aquí conmigo~ *se acerca un poco más de lo necesario*",
            "*observa tu celular con curiosidad, mordiéndose el labio* ¿Hmm? ¿Nino te llamaba? *se acerca y te toma del brazo, con voz suave pero sugerente* Espero no haberte interrumpido en nada... *sonríe con calma, pero sus ojos dicen otra cosa* Pero ahora estás aquí conmigo~ ¿verdad?",
            "*te mira guardando el celular, con una sonrisa traviesa* ¿Todo bien con Nino? *se sienta a tu lado, apoya su cabeza en tu hombro y te acaricia el brazo* ...Me pregunto qué querría~ *dice con voz suave y algo celosa* Pero me gusta más cuando me prestas atención solo a mí~",
        ],
        Miku: [
            "*te observa con curiosidad, con un toque de celos en los ojos* ¿Miku? *sonríe con ternura pero se acerca más de lo necesario* Espero no haber interrumpido algo importante... *te toma de la mano y te mira a los ojos* Pero ahora que estás de vuelta~ ¿qué decíamos?",
            "*inclina la cabeza, pero sus ojos te analizan* Miku... *se acerca un poco más, con voz suave pero posesiva* ¿Estabas hablando con ella de algo? *sonríe con calma* No te preocupes, puedo esperar~ Pero me gusta más cuando soy yo la que tiene tu atención~",
        ],
        Yotsuba: [
            "*sus ojos brillan con curiosidad, pero hay un toque de celos* ¿Yotsuba? *se ríe, pero te toma del brazo con posesión* Esa chica siempre es tan energética~ *te acerca hacia ella* ¡Pero ahora me tienes a mí! ¿Verdad? *sonríe con dulzura pero te agarra más fuerte*",
            "*te mira con una sonrisa divertida, pero hay algo en sus ojos* Yotsuba te llamaba... *se acerca y te susurra al oído, con voz coqueta* ¿Estaban planeando algo sin mí? *ríe suavemente y te acaricia el brazo* Ahora eres mío~",
        ],
        Itsuki: [
            "*te observa con atención, con un toque de celos* ¿Itsuki? *se cruza de brazos con una sonrisa, pero te mira con intensidad* Espero que no te esté quitando tiempo de nuestras citas~ *sonríe con calma, pero te toma de la mano* ¿Todo bien? Porque me gusta tenerte solo para mí~",
            "*mira tu celular, con una sonrisa tranquila pero celosa* Itsuki... *se acerca un poco y te toma de la mano, apretando con suavidad* ¿Necesitabas hablar con ella? *voz suave pero posesiva* Está bien, pero no te alejes mucho~ Me gusta cuando estás cerca de mí.",
        ],
    },

    // --- NINO reacciona ---
    Nino: {
        Ichika: [
            "*frunce el ceño, claramente celosa* ¿Ichika? *cruza los brazos y te mira con ojos entrecerrados* ¿Qué quería? *se acerca y te agarra del brazo con posesión* No me digas que estabas... *se sonroja pero te mira con intensidad* ...No, no importa. ¡Continuemos! Pero tú eres mío, ¿entiendes?",
            "*resopla, claramente molesta* Ichika te llamaba... *te mira de reojo con celos* Espero que no te esté robando atención. *se acerca y te agarra del brazo con fuerza* Porque tú eres mío, ¿entiendes? *te mira con ojos desafiantes* No me hagas competir con ella.",
            "*te observa con suspicacia y celos evidentes* ¿Hablabas con Ichika? *murmura con enojo* Esa hermana siempre tan perfecta... *niega con la cabeza y te agarra de la manga* ¡Olvídalo! ¿En qué estábamos? *te mira con ojos ardientes* Y no me hagas compartirte.",
        ],
        Miku: [
            "*levanta una ceja, con celos evidentes* ¿Miku? *suspira y te mira con intensidad* Esa chica siempre tan tranquila... *te agarra de la manga con posesión* ¿Todo bien? *te acerca hacia ella* No me dejes hablando sola así de la nada. Me molesta cuando me quitas atención.",
            "*te observa con celos* ¿Miku te escribió? *se acerca un poco y te agarra del brazo* Espero que no sea nada importante... *murmura con voz más baja y cercana* Porque yo sí tengo cosas que decirte... y no me gusta compartirte con nadie.",
        ],
        Yotsuba: [
            "*resopla fuerte, con celos evidentes* ¿Yotsuba? *cruza los brazos y te mira con intensidad* Esa energética... *te agarra del brazo con fuerza* ¿Estabas bien? *te acerca hacia ella* No te vayas a escapar conmigo alrededor. Eres mío cuando estamos juntos, ¿entiendes?",
            "*frunce el ceño, claramente molesta* ¿Yotsuba te llamó? *suspira y te mira con ojos celosos* Siempre interrumpiendo... *te agarra de la mano con posesión* ¿Pero ahora podemos continuar o qué? *te mira con intensidad* No me hagas esperar tanto la próxima vez.",
        ],
        Itsuki: [
            "*te mira con el ceño fruncido, con celos* ¿Itsuki? *resopla y te agarra del brazo con fuerza* ¿Qué quería ahora? *te mira con ojos intensos* No me dejes colgada así de la nada, ¿entiendes? *te acerca hacia ella* Porque no me gusta compartirte.",
            "*cruza los brazos, con evidente molestia* Itsuki te llamaba... *murmura con celos* Siempre con sus cosas de la menor responsable... *te mira con ojos ardientes* ¿Todo bien al menos? *te agarra de la manga* No me hagas competir con ella por tu atención.",
        ],
    },

    // --- MIKU reacciona ---
    Miku: {
        Ichika: [
            "*...te observa en silencio un momento, con una expresión difícil de leer* Ichika. *baja la mirada, pero te agarra suavemente de la mano* ...¿Todo bien? *pausa larga, voz suave pero con un toque de celos* ...Está bien. Continuemos. *te mira con ojos tímidos pero sinceros* ...Pero me gusta más cuando estamos solos.",
            "*silencio breve, con una mirada tranquila pero intensa* ...Ichika. *levanta la vista y te toma de la mano* ...¿Necesitabas hablar con ella? *voz calmada pero con un toque de posesión* ...No hay problema. Pero... *pausa, te mira a los ojos* ...estoy aquí. Y me gusta tenerte cerca.",
        ],
        Nino: [
            "*...te mira, con ojos tranquilos pero con un toque de celos* Nino. *pausa, te toma de la mano* ...¿Estabas hablando con Nino? *baja la mirada, voz suave pero sincera* ...Entiendo. *te agarra un poco más fuerte* ...¿Podemos continuar? *murmura* ...Me gusta más cuando me prestas atención solo a mí.",
            "*silencio, con una mirada tranquila pero celosa* ...Nino. *suspira suavemente y te toma de la mano* ...¿Todo bien con ella? *te mira con calma, pero te acerca hacia ella* ...Está bien. Estoy acostumbrada... *murmura* ...Pero prefiero cuando estás solo conmigo.",
        ],
        Yotsuba: [
            "*...parpadea, con una mirada tranquila pero con un toque de celos* Yotsuba. *una sonrisa muy leve, pero te agarra de la mano* ...Siempre es tan energética. *pausa, te mira con ojos tímidos pero sinceros* ...¿Continuamos? *murmura* ...Me gusta más cuando estamos así, solos.",
            "*te observa, con calma pero con un toque de posesión* ...Yotsuba te llamó. *cierra su libro un momento y te toma de la mano* ...¿Estás bien? *voz tranquila pero cercana* ...Me alegra que hayas vuelto. *te mira con ojos sinceros* ...Y me gusta tenerte aquí.",
        ],
        Itsuki: [
            "*...te mira en silencio, con una expresión tranquila pero intensa* Itsuki. *asiente levemente y te toma de la mano* ...¿Todo bien? *pausa, te mira con ojos sinceros* ...Continuemos entonces. *murmura* ...Me gusta cuando estamos así, sin interrupciones.",
            "*baja la mirada, con voz suave pero con un toque de celos* ...Itsuki. *te toma de la mano y te mira a los ojos* ...¿Necesitabas algo con ella? *pausa, te acerca un poco* ...No te preocupes. Estoy aquí. *voz íntima* ...Y me gusta tenerte cerca.",
        ],
    },

    // --- YOTSUBA reacciona ---
    Yotsuba: {
        Ichika: [
            "*te mira con los ojos bien abiertos, con curiosidad y un toque de celos* ¿Ichika? *se acerca y te agarra del brazo con energía* ¿¿¿Qué te dijo??? ¡¿Estabas hablando con ella?! *se ríe, pero te acerca más* ¡Cuéntame todo! *te mira con ojos brillantes pero posesivos* ¡¡Pero ahora eres mío!!",
            "*salta un poco, con energía pero con celos evidentes* ¡¿Ichika te llamó?! *te agarra de los hombros y te mira con intensidad* ¿¿¿Qué quería??? *se emociona, pero te acerca más* ¡Vamos, dime dime dime! *te abraza fuerte* ¡¡No me hagas compartirte!!",
        ],
        Nino: [
            "*te mira con curiosidad, pero hay un toque de celos en sus ojos* ¿Nino? *se acerca mucho y te agarra del brazo* ¿¿¿Qué te dijo Nino??? *ojos brillantes pero posesivos* ¡¿Se enojó?! ¡¿Estabas con ella?! *te acerca hacia ella* ¡¡Cuéntame todo!! ¡¡Y no me hagas esperar la próxima vez!!",
            "*te agarra del brazo con energía, con evidente emoción pero celos* ¡¿Nino?! *se emociona, pero te mira con intensidad* ¡¿Te dijo algo?! ¿¿¿Estabas hablando con ella?! *te acerca y te abraza fuerte* ¡¡Cuéntame todo!! ¡¡Y ahora eres mío, ¿entiendes?!!",
        ],
        Miku: [
            "*te observa, con curiosidad pero un toque de celos* ¿Miku? *se acerca y te agarra del brazo* ¿¿¿Qué quería??? *se sienta a tu lado y te mira con ojos brillantes* ¿Estaba hablando de historia otra vez? *se ríe, pero te abraza* ¡¡Pero ahora estás conmigo!! ¡¡Cuéntame de ti!!",
            "*ojos curiosos pero con un toque de posesión* ¿Miku te escribió? *te agarra del brazo y te acerca* ¿¿¿De qué hablaron??? ¡Vamos, no seas tímido! *te mira con ojos brillantes pero celosos* ¡¡Y no me hagas compartirte!! ¡¡Ahora eres mío!!",
        ],
        Itsuki: [
            "*te mira con emoción, pero hay un toque de celos* ¿Itsuki? *se acerca mucho y te agarra del brazo* ¿¿¿Qué quería??? ¿¿¿Estaba enojada?! *te mira con ojos brillantes pero posesivos* ¡Dime todo! *te abraza fuerte* ¡¡Y ahora estás conmigo, ¿verdad?!!",
            "*salta un poco, con energía pero con evidente posesión* ¡¿Itsuki te llamó?! *te agarra del brazo y te acerca* ¿¿¿Qué te dijo??? *te mira con ojos brillantes* ¡¡Cuéntame cuéntame cuéntame!! *te abraza con fuerza* ¡¡Y no me hagas esperar tanto la próxima vez!!",
        ],
    },

    // --- ITSUKI reacciona ---
    Itsuki: {
        Ichika: [
            "*te observa con seriedad, con un toque de celos* ¿Ichika? *cruza los brazos y te mira con intensidad* ¿Qué quería? *suspira y te toma de la mano* Espero que no te esté distrayendo de lo nuestro... *te mira a los ojos, con voz firme pero cercana* ¿Todo bien? *te acerca un poco* Porque me gusta tenerte solo para mí.",
            "*frunce el ceño, con evidente molestia pero cariño* Ichika... *baja la mirada y te agarra de la mano* ¿Necesitabas hablar con ella? *suspira y te mira con ojos sinceros* ...Está bien. Pero ahora me debes atención. *te acerca hacia ella* Y no me hagas compartirte.",
        ],
        Nino: [
            "*resopla, con celos evidentes* ¿Nino? *cruza los brazos y te mira con intensidad* Esa chica siempre tan intensa... *te toma de la mano con posesión* ¿Todo bien? *suspira y te acerca* Espero que no te haya estresado. *te mira con ojos serios pero cercanos* Porque me gusta cuando estamos tranquilos, solos.",
            "*te observa, con una mirada seria pero celosa* Nino te llamaba... *murmura con evidente molestia* Siempre con sus dramitas... *te toma del brazo* ¿Estás bien al menos? *te acerca un poco* No me hagas competir con ella por tu atención.",
        ],
        Miku: [
            "*te observa, con calma pero con un toque de celos* ¿Miku? *asiente y te toma de la mano* ...¿Todo bien? *pausa, te mira con ojos sinceros* Espero que no fuera nada urgente. *suspira y te acerca* ¿Continuamos? *murmura* ...Me gusta más cuando estamos así, sin interrupciones.",
            "*mira tu celular, con una expresión tranquila pero intensa* Miku... *asiente levemente y te toma de la mano* ...¿Necesitabas algo con ella? *voz calmada pero con un toque de posesión* ...Está bien. *te mira a los ojos* Pero ahora estás aquí conmigo.",
        ],
        Yotsuba: [
            "*resopla, con una mezcla de diversión y celos* ¿Yotsuba? *niega con la cabeza sonriendo, pero te agarra del brazo* Esa chica nunca cambia... *te mira con ojos serios pero cercanos* ¿Te dijo algo raro? *se ríe, pero te acerca* Me gusta más cuando estamos tranquilos, solos.",
            "*te observa con una sonrisa, pero hay un toque de celos* Yotsuba... *sacude la cabeza y te toma de la mano* Siempre tan energética. *te mira con ojos sinceros* ¿Estás bien después de eso? *te acerca un poco* Me gusta más cuando estás así, solo conmigo.",
        ],
    },
};

// ============================================================
//  FOTOS/SELFIES — las chicas envían "fotos" durante la conversación
// ============================================================

const FOTOS_SELFIES = {
    Ichika: [
        { url: "", descripcion: "*te envía una foto* 📸 *Aparece Ichika recostada en su cama, con el cabello suelto y una sonrisa sugerente. Lleva un vestido ligero que deja ver sus hombros. La luz del atardecer la ilumina desde la ventana* 💕", emoji: "📷", estilo: "seductora" },
        { url: "", descripcion: "*selfie de Ichika* 🤳 *Primer plano de su rostro, con los labios ligeramente entreabiertos y una mirada intensa. Se nota que está en un café, con una taza al lado. Te guiña un ojo en la foto* ✨", emoji: "☕", estilo: "íntima" },
        { url: "", descripcion: "*te manda una foto despreocupada* 📸 *Ichika en su habitación, con una camiseta amplia que le queda grande. Está sentada en el piso rodeada de libros, pero la foto está enfocada en su sonrisa cálida* 💫", emoji: "📚", estilo: "casual" },
    ],
    Nino: [
        { url: "", descripcion: "*te envía una selfie* 🤳 *Nino con un moño en el cabello, haciendo un pout coqueto. Se nota que está en su habitación con su pijama de flores. Sus ojos te miran con intensidad desafiante* 💢", emoji: "🎀", estilo: "tsundere" },
        { url: "", descripcion: "*foto de Nino* 📸 *Está en el parque, con el viento moviéndole el cabello. Lleva un vestido ajustado y te mira con una expresión que dice '¿qué miras?' pero se sonroja* 🌸", emoji: "🌺", estilo: "provocativa" },
        { url: "", descripcion: "*selfie rápida* 🤳 *Nino tapándose la boca con la mano, sorprendida de que le tomaron la foto. Se sonroja pero te mira con ojos cariñosos. Lleva un suéter oversize adorable* 💕", emoji: "😳", estilo: "tierna" },
    ],
    Miku: [
        { url: "", descripcion: "*te envía una foto tímida* 📸 *Miku con sus auriculares puestos, mirando hacia abajo con timidez. Lleva una bufanda que le cubre medio rostro, pero sus ojos te miran con ternura. El fondo es su habitación* 🎵", emoji: "🎧", estilo: "tímida" },
        { url: "", descripcion: "*foto casual de Miku* 📷 *Está en la biblioteca, escondida detrás de un libro de historia. Solo se ven sus ojos mirando por encima del libro, pero te está observando con curiosidad* 📖", emoji: "📚", estilo: "intelectual" },
        { url: "", descripcion: "*selfie sorpresa* 🤳 *Miku con un lazo en el cabello, sonriendo muy levemente. Está en un jardín y las flores del fondo contrastan con su expresión serena pero cálida* 🌺", emoji: "🌸", estilo: "serena" },
    ],
    Yotsuba: [
        { url: "", descripcion: "*te envía una foto súper animada* 📸 *Yotsuba saltando en el aire con una sonrisa enorme. Lleva ropa deportiva y está al aire libre. Se nota la energía y alegría que tiene* 💨✨", emoji: "🏃‍♀️", estilo: "energética" },
        { url: "", descripcion: "*selfie grupal pero te la manda a ti* 🤳 *Yotsuba haciendo una cara graciosa, con los ojos bien abiertos y la lengua afuera. Está en su habitación y se nota que está jugando* 😜", emoji: "🎮", estilo: "divertida" },
        { url: "", descripcion: "*foto sorpresa* 📸 *Yotsuba con un traje de baño, en una piscina. Te hace un gesto de 'ven aquí' con la mano. Su sonrisa es brillante y llena de vida* 🏊‍♀️💦", emoji: "👙", estilo: "atrevida" },
    ],
    Itsuki: [
        { url: "", descripcion: "*te envía una foto seria* 📸 *Itsuki con uniforme escolar, sentada en su escritorio estudiando. Pero te mira de reojo con una expresión que dice 'estoy aburrida, háblame'. Un libro abierto al lado* 📝", emoji: "📖", estilo: "estudiosa" },
        { url: "", descripcion: "*foto casual* 📷 *Itsuki en la cocina, con un delantal y sosteniendo una cuchara. Te mira con una expresión seria pero sus ojos delatan que quiere compañía. Está cocinando algo* 🍳", emoji: "👩‍🍳", estilo: "doméstica" },
        { url: "", descripcion: "*selfie discreta* 🤳 *Itsuki con una sonrisa muy leve, casi imperceptible. Está en un parque al atardecer, y la luz dorada ilumina su rostro. Se nota que está tranquila pero piensa en ti* 🌅", emoji: "🌇", estilo: "tranquila" },
    ],
};

// ============================================================
//  RECUERDOS ÍNTIMOS — referencias a momentos compartidos
// ============================================================

const RECUERDOS_INTIMOS = {
    Ichika: [
        "*sonríe con nostalgia* ¿Te acuerdas de la última vez que hablamos así? *pausa cargada* Me encantó cómo me escuchaste... fue tan íntimo~ 💕",
        "*voz suave y melancólica* Sabes... todavía me acuerdo de cuando te reíste conmigo aquella vez. *se ríe suavemente* Guardé ese momento en mi corazón~",
        "*te mira a los ojos a través del teléfono* ¿Recuerdas cuando casi nos pillan hablando? *se muerde el labio* Fue emocionante... y un poco travieso~",
    ],
    Nino: [
        "*resopla con cariño* ¿Te acuerdas de cuando te regañé la última vez? *pausa, voz más suave* ...En realidad solo quería tu atención. *se sonroja*",
        "*voz algo tímida* Todavía me acuerdo de cuando te preocupaste por mí aquella vez... *murmura* No lo olvidé, ¿sabes? Me importaste mucho.",
        "*te mira con ojos intensos* ¿Recuerdas cuando casi nos bes... *se calla de repente* ¡O-olvídalo! *se sonroja furiosamente* ¡No dije nada!",
    ],
    Miku: [
        "*...sonríe levemente* ¿Te acuerdas de cuando compartimos ese momento en silencio? *pausa* ...Fue tan lindo. *voz íntima* Lo guardé en mi memoria.",
        "*voz tranquila pero cercana* Todavía me acuerdo de tu voz aquella vez... *pausa larga* ...La escucho en mi cabeza cuando estoy sola. *susurra* Es reconfortante.",
        "*...te mira con ojos serenos* ¿Recuerdas cuando casi nos tomamos de la mano? *baja la mirada* ...Yo quería. *murmura* Todavía quiero...",
    ],
    Yotsuba: [
        "*se ríe con emoción* ¡¿Te acuerdas de la última vez que jugamos juntos?! *ojos brillantes* ¡¡Fue tan divertido!! ¡¡Quiero más momentos así contigo!!",
        "*voz súper cariñosa* ¡¡Todavía me acuerdo de cuando me hiciste reír tanto!! *se abraza a sí misma* ¡¡Ese momento fue el mejor!! ¡¡Quiero crear más recuerdos contigo!!",
        "*te mira con ojos brillantes* ¿Recuerdas cuando casi nos caemos juntos? *se ríe a carcajadas* ¡¡Fue tan divertido!! ¡¡Y me agarraste de la mano!! ¡¡Eso me encantó!!",
    ],
    Itsuki: [
        "*suspira con calma* ¿Te acuerdas de cuando estudiamos juntos la última vez? *pausa, voz más suave* ...Me gusta cuando estamos así, tranquilos. *te mira con ojos sinceros*",
        "*voz seria pero cálida* Todavía me acuerdo de cuando me ayudaste aquella vez... *pausa* ...No lo olvidé. *murmura* Significó mucho para mí.",
        "*te mira con expresión tranquila* ¿Recuerdas cuando compartimos ese momento bajo las estrellas? *suspira* ...Fue especial. *voz baja* Quiero más momentos así.",
    ],
};

// ============================================================
//  PROMESAS COQUETAS — promesas sugestivas al final de llamadas
// ============================================================

const PROMESAS_COQUETAS = {
    Ichika: [
        "*voz susurrante y sugerente* La próxima vez que nos veamos... *pausa cargada* ...no te voy a dejar ir tan fácil~ 💕 *se ríe suavemente* Te lo prometo~",
        "*tono coqueto y tentador* Prométeme que la próxima vez... *se acerca al teléfono* ...me vas a dar un abrazo de verdad. *voz baja* De esos que duran mucho~",
        "*voz melosa* ¿Sabes qué? *pausa íntima* La próxima vez que estemos juntos... *murmura* ...voy a robarte más tiempo. Todo el que pueda~",
    ],
    Nino: [
        "*voz tsundere pero sincera* ¡N-No es que quiera verte ni nada! *pausa, murmura* ...Pero la próxima vez... *se sonroja* ...vas a ser mío. ¿Entiendes?",
        "*tono desafiante pero cariñoso* Te lo advierto... *voz más baja* La próxima vez que nos veamos, no te dejo escapar tan fácil. *te mira con ojos ardientes* Prepárate.",
        "*voz más suave de lo habitual* Oye... *pausa* La próxima vez... *murmura* ...no me hagas esperar tanto. ¿Vale? *se sonroja* Te estaré esperando.",
    ],
    Miku: [
        "*...voz baja y tímida* La próxima vez... *pausa larga* ...¿podemos estar más tiempo juntos? *murmura* ...Te extrañé demasiado.",
        "*tono sereno pero íntimo* ...Te prometo que la próxima vez... *susurra* ...no voy a ser tan tímida. *pausa cargada* Quiero ser más valiente... por ti.",
        "*...voz suave y cercana* ¿Sabes? *pausa* La próxima vez que nos veamos... *murmura* ...no te voy a soltar tan rápido. *baja la mirada* Quiero más de ti.",
    ],
    Yotsuba: [
        "*¡¡voz súper emocionada!! ¡¡La próxima vez que nos veamos TE VOY A ABRAZAR SUPER FUERTE!! *se ríe a carcajadas* ¡¡Y no te voy a dejar ir!! ¡¡Te lo prometo!!",
        "*tono súper cariñoso* ¡¡Prometo que la próxima vez vamos a hacer algo súper divertido!! *ojos brillantes* ¡¡Solo tú y yo!! ¡¡Va a ser el mejor momento!!",
        "*¡¡voz enérgica pero tierna!! ¡¡La próxima vez!! *se emociona* ¡¡Voy a prepararte algo especial!! ¡¡Y vamos a pasar el mejor rato del mundo!! ¡¡Te lo prometo!!",
    ],
    Itsuki: [
        "*voz seria pero con cariño* La próxima vez... *pausa* ...vamos a pasar más tiempo juntos. *te mira a los ojos* Sin interrupciones. Solo nosotros. *te lo prometo*.",
        "*tono firme pero cálido* Te lo prometo... *voz más suave* La próxima vez que nos veamos, no voy a dejar que te vayas tan pronto. *pausa* Quiero más tiempo contigo.",
        "*voz tranquila pero intensa* ¿Sabes? *pausa* La próxima vez... *murmura* ...voy a ser más directa contigo. *te mira con ojos sinceros* Porque me importas. Y quiero que lo sepas.",
    ],
};

// ============================================================
//  DIÁLOGOS DE DESPEDIDA — cuando terminas la llamada/mensaje
// ============================================================

const DESPEDIDAS_CELULAR = {
    Ichika: [
        "*voz suave y sugerente al teléfono* Bueno... fue tan lindo hablar contigo~ *pausa cargada* Te extraño ya, ¿sabes? *beso suave y linger al teléfono* Hablamos pronto, mi cielo~ 💕",
        "*se ríe suavemente, con tono coqueto* Fufu... está bien. *pausa cálida y cercana* Cuídate mucho~ *beso lento al teléfono* ...Y sueña conmigo, ¿vale? *cuelga con delicadeza*",
        "*voz melosa y tentadora* Me encantó escucharte... *suspira* Ahora me quedé con ganas de más~ *beso suave* Hasta pronto, lindo~ *cuelga lentamente*",
    ],
    Nino: [
        "*resopla, pero con mucho cariño* ¡Fine! *voz más baja y cercana* Cuídate, ¿eh? *pausa* ...Y no me hagas esperar tanto la próxima vez. *cuelga, pero se nota que le importas*",
        "*suspira, voz más suave* Ok, ok. *pausa, murmura* ...Te extraño ya. *cuelga un poco brusca, pero el tono es cálido*",
        "*voz tsundere pero sincera* ¡No es que quiera colgar ni nada! *suspira* ...Solo... escríbeme pronto, ¿vale? *cuelga*",
    ],
    Miku: [
        "...Está bien. *pausa larga, voz íntima* ...Cuídate. *susurra* ...Y... piensa en mí un poco. *cuelga suavemente*",
        "*voz baja y cercana* ...Hablamos luego. *pausa cargada* ...Te extraño más de lo que digo. *cuelga con ternura*",
        "...Fue lindo hablar contigo. *voz tímida pero sincera* ...Vuelve pronto. *susurra* ...Te estaré esperando. *cuelga*",
    ],
    Yotsuba: [
        "*¡OK OK!* *se ríe, súper cálida* ¡¡Nos vemos luego!! *pausa, voz más suave* ¡¡Y no te olvides de mí!! *cuelga súper animada pero con cariño*",
        "*¡Bye bye!* *se ríe a carcajadas, emocionada* ¡¡Escríbeme pronto!! *pausa, voz cariñosa* ¡¡Te quiero mucho!! *cuelga*",
        "*voz súper alegre* ¡¡Fue genial hablar contigo!! *se ríe* ¡¡La próxima vez más!! ¡¡Cuídate!! *cuelga con energía pero con cariño*",
    ],
    Itsuki: [
        "*suspira, voz seria pero con cariño* Está bien. *pausa, voz más suave* Nos vemos luego... *murmura* ...Y cuídate. Me importa. *cuelga*",
        "*asiente, con una calidez poco común* Ok. *pausa, voz íntima* ...Cuídate. *susurra* ...Y vuelve pronto. *cuelga con calma*",
        "*voz seria pero cercana* Fue bueno hablar contigo. *pausa* ...No tardes en escribirme. *voz más baja* ...Te esperaré. *cuelga*",
    ],
};

// ============================================================
//  CONTADOR DE MENSAJES — se llama cada vez que se envía un mensaje
// ============================================================

// Sistema de memoria de interacciones
let celularMemoriaInteracciones = {};

function incrementarInteraccion(nombreChica) {
    if (!celularMemoriaInteracciones[nombreChica]) {
        celularMemoriaInteracciones[nombreChica] = 0;
    }
    celularMemoriaInteracciones[nombreChica]++;
    return celularMemoriaInteracciones[nombreChica];
}

function getInteracciones(nombreChica) {
    return celularMemoriaInteracciones[nombreChica] || 0;
}

// Función para enviar foto/selfie aleatorio
function enviarFotoSelfieAleatoria(nombreChica) {
    const fotos = FOTOS_SELFIES[nombreChica];
    if (!fotos || fotos.length === 0) return null;
    return fotos[Math.floor(Math.random() * fotos.length)];
}

// Función para obtener recuerdo íntimo aleatorio
function obtenerRecuerdoIntimo(nombreChica) {
    const recuerdos = RECUERDOS_INTIMOS[nombreChica];
    if (!recuerdos || recuerdos.length === 0) return null;
    return recuerdos[Math.floor(Math.random() * recuerdos.length)];
}

// Función para obtener promesa coqueta aleatoria
function obtenerPromesaCoqueta(nombreChica) {
    const promesas = PROMESAS_COQUETAS[nombreChica];
    if (!promesas || promesas.length === 0) return null;
    return promesas[Math.floor(Math.random() * promesas.length)];
}

// Función para mostrar foto en el chat
function agregarFotoCelular(nombreChica, fotoData) {
    const container = document.getElementById("quint-celular-mensajes");
    if (!container || !fotoData) return;

    const msg = document.createElement("div");
    msg.className = "celular-mensaje-foto";

    const color = CHICAS[nombreChica]?.color || "#a0a8c0";
    msg.style.borderColor = color + "55";
    msg.style.background  = color + "15";

    // Si hay URL, mostrar la imagen
    const imagenHTML = fotoData.url
        ? `<div class="celular-foto-imagen"><img src="${fotoData.url}" alt="Foto de ${nombreChica}" onerror="this.parentElement.innerHTML='<div class=celular-foto-placeholder>📷 Imagen no disponible</div>'"></div>`
        : `<div class="celular-foto-imagen celular-foto-placeholder">📷 *Imagen* — ${fotoData.descripcion.substring(0, 50)}...</div>`;

    msg.innerHTML = `
        <div class="celular-foto-header">
            <span class="celular-foto-icon">${fotoData.emoji}</span>
            <span class="celular-foto-nombre" style="color:${color}">${nombreChica}</span>
            <span class="celular-foto-estilo">${fotoData.estilo}</span>
        </div>
        ${imagenHTML}
        <div class="celular-foto-descripcion">${fotoData.descripcion}</div>
        <div class="celular-foto-badge">📷 Foto</div>
    `;

    container.appendChild(msg);
    scrollCelularFondo();

    celularHistorial.push({ role: "assistant", nombre: nombreChica, content: fotoData.descripcion, tipo: "foto" });
}

function celularContarTurno() {
    if (celularActivo) return; // No contar si ya hay una llamada activa

    celularContador++;

    if (celularSiguienteEn === 0) {
        celularSiguienteEn = Math.floor(Math.random() * (CELULAR_CONFIG.mensajesMaximos - CELULAR_CONFIG.mensajesMinimos + 1)) + CELULAR_CONFIG.mensajesMinimos;
    }

    if (celularContador >= celularSiguienteEn && Math.random() < CELULAR_CONFIG.probabilidad) {
        celularContador = 0;
        celularSiguienteEn = 0;
        iniciarLlamadaCelular();
    }
}

// ============================================================
//  INICIAR LLAMADA CELULAR
// ============================================================

async function iniciarLlamadaCelular() {
    // No iniciar si ya hay una llamada activa
    if (celularActivo) return;

    // Seleccionar una chica al azar que NO sea la que ya está en escena
    const chicasDisponibles = Object.keys(CHICAS).filter(nombre => {
        // No puede ser la misma chica con la que estás hablando
        return !quintChicasActivas.has(nombre);
    });

    // Si todas las chicas están en escena, permitir cualquiera menos la última que habló
    if (chicasDisponibles.length === 0) {
        // Obtener la última chica que habló
        let ultimaChica = null;
        for (let i = quintHistorial.length - 1; i >= 0; i--) {
            const msg = quintHistorial[i];
            if (msg.role === "assistant") {
                try {
                    const parsed = typeof msg.content === "string" ? JSON.parse(msg.content) : msg.content;
                    if (parsed.chicasQueHablan?.[0]?.nombre) {
                        ultimaChica = parsed.chicasQueHablan[0].nombre;
                        break;
                    }
                } catch {}
            }
        }
        // Todas disponibles excepto la última que habló
        const todasMenosUltima = Object.keys(CHICAS).filter(nombre => nombre !== ultimaChica);
        celularChicaActual = todasMenosUltima[Math.floor(Math.random() * todasMenosUltima.length)];
    } else {
        celularChicaActual = chicasDisponibles[Math.floor(Math.random() * chicasDisponibles.length)];
    }

    celularEsLlamada = Math.random() > 0.4; // 60% llamada, 40% mensaje
    celularActivo = true;
    celularHistorial = [];

    // Guardar el historial previo para contexto post-llamada
    const contextoPrevio = [...quintHistorial].slice(-6);

    // Mostrar la notificación del celular
    mostrarNotificacionCelular(celularChicaActual, celularEsLlamada);

    // Pequeña pausa y luego abrir el chat del celular
    await new Promise(r => setTimeout(r, celularEsLlamada ? 2000 : 1500));

    mostrarChatCelular(celularChicaActual, celularEsLlamada);
}

// ============================================================
//  MOSTRAR NOTIFICACIÓN DE CELULAR
// ============================================================

function mostrarNotificacionCelular(nombreChica, esLlamada) {
    const chat = document.getElementById("quint-chat-mensajes");
    if (!chat) return;

    const frase = esLlamada
        ? FRASES_LLAMADA_ENTRADA[nombreChica]
        : FRASES_MENSAJE_ENTRADA[nombreChica];

    const notif = document.createElement("div");
    notif.className = "quint-celular-notif";
    notif.innerHTML = `
        <div class="celular-notif-icon">📱</div>
        <div class="celular-notif-text">${frase}</div>
        <button class="celular-notif-btn" onclick="abrirChatCelularDesdeNotif('${nombreChica}', ${esLlamada})">
            ${esLlamada ? "Contestar" : "Responder"}
        </button>
        <button class="celular-notif-btn celular-notif-btn-ignore" onclick="ignorarCelular()">
            ${esLlamada ? "Ignorar" : "Cerrar"}
        </button>
    `;

    chat.appendChild(notif);
    quintScrollFondo();
}

function abrirChatCelularDesdeNotif(nombreChica, esLlamada) {
    const notif = document.querySelector(".quint-celular-notif");
    if (notif) notif.remove();
    mostrarChatCelular(nombreChica, esLlamada);
}

function ignorarCelular() {
    const notif = document.querySelector(".quint-celular-notif");
    if (notif) notif.remove();
    celularActivo = false;
    celularChicaActual = null;
    celularHistorial = [];
    quintAgregarSistema("[ Llamada ignorada ]");
}

// ============================================================
//  MOSTRAR CHAT DE CELULAR
// ============================================================

function mostrarChatCelular(nombreChica, esLlamada) {
    celularUIVisible = true;
    const app = document.getElementById("quint-app");

    // Crear overlay del celular
    const overlay = document.createElement("div");
    overlay.id = "quint-celular-overlay";
    overlay.innerHTML = `
        <div id="quint-celular-panel">
            <div id="quint-celular-header">
                <div class="celular-header-info">
                    <span class="celular-header-icon">📱</span>
                    <span class="celular-header-name">${nombreChica}</span>
                    <span class="celular-header-type">${esLlamada ? "📞 Llamada" : "💬 Mensaje"}</span>
                </div>
                <button id="quint-celular-cerrar" onclick="terminarLlamadaCelular()">✕</button>
            </div>
            <div id="quint-celular-mensajes">
                <div class="celular-mensaje-sistema">
                    ${esLlamada 
                        ? `📞 <strong>Llamada con ${nombreChica}</strong><br><em>Conectado...</em>`
                        : `💬 <strong>Chat con ${nombreChica}</strong><br><em>En línea...</em>`
                    }
                </div>
            </div>
            <div id="quint-celular-input-area">
                <textarea id="quint-celular-input" placeholder="Escribe tu mensaje..." rows="1"
                    onkeydown="celularKeyHandler(event)"></textarea>
                <button id="quint-celular-btn-enviar" onclick="enviarMensajeCelular()">Enviar</button>
            </div>
            <div id="quint-celular-btns-footer">
                <button class="celular-footer-btn" onclick="terminarLlamadaCelular()">
                    📞 Terminar ${esLlamada ? "Llamada" : "Conversación"}
                </button>
            </div>
        </div>
    `;

    app.appendChild(overlay);

    // Primer mensaje automático de la chica
    setTimeout(() => {
        const primerMensaje = obtenerPrimerMensajeCelular(nombreChica, esLlamada);
        agregarMensajeCelularChica(nombreChica, primerMensaje);
    }, 800);

    // Focus en el input
    setTimeout(() => {
        const input = document.getElementById("quint-celular-input");
        if (input) input.focus();
    }, 300);
}

// ============================================================
//  OBTENER PRIMER MENSAJE DE LA CHICA
// ============================================================

function obtenerPrimerMensajeCelular(nombreChica, esLlamada) {
    const saludosLlamada = {
        Ichika:  "*voz suave y sugerente al teléfono* Hola~ ¿Te pillo en buen momento? *se ríe suavemente, con tono coqueto* Solo quería escucharte un ratito... y quizás decirte algo especial~ 💕",
        Nino:    "*voz algo brusca pero muy cariñosa* ¡Oye! ¿Qué haces? *pausa, voz más baja* ...No es que te extrañe ni nada. *murmura* Solo... quería escucharte.",
        Miku:    "...Hola. *pausa, voz tímida pero íntima* ¿Estás ocupado? *voz baja y cercana* Solo... quería hablar un momento contigo. Es que... *susurra* ...pensé en ti.",
        Yotsuba: "¡¡¡HOLA HOLA!!! *grita un poco al teléfono, súper emocionada* ¡¿Qué haces?! ¡¿Qué haces?! *se ríe a carcajadas* ¡¡Estaba tan aburrida sin ti!!",
        Itsuki:  "Hola. *voz seria pero con calidez* ¿Tienes un momento? Quería hablar contigo sobre... *pausa, voz más suave* ...bueno, ya sabes. Es algo que no puedo decir así nada más.",
    };

    const saludosMensaje = {
        Ichika:  "*mensaje de texto* Hey~ ¿Cómo estás? 💕 *se escribe otro mensaje rápido* Me acordé de ti y... *otro mensaje* ...no pude evitar escribirte~ ¿En qué estás pensando?~",
        Nino:    "*mensaje* Oye. ¿Qué haces? *se escribe otro, algo tsundere* No me dejes en visto, ¿eh? *pausa* ...Es que quiero saber de ti.",
        Miku:    "...Hola. *mensaje* ¿Estás bien? *pausa antes de escribir otro, con timidez* ...Solo quería saber de ti. *otro mensaje* ...Y decirte que pensé en ti.",
        Yotsuba: "¡¡¡HOLA!!! 💨💨💨 *muchos mensajes seguidos, súper emocionada* ¿¿¿QUÉ HACES??? ¿¿¿CÓMO ESTÁS??? ¡¡¡CUÉNTAME TODO!!! *otro mensaje* ¡¡¡Te extrañé mucho!!!",
        Itsuki:  "*mensaje* Hola. ¿Tienes un momento? *se escribe otro, voz seria pero sincera* Necesito hablar contigo sobre algo... es importante para mí.",
    };

    return esLlamada ? saludosLlamada[nombreChica] : saludosMensaje[nombreChica];
}

// ============================================================
//  AGREGAR MENSAJE DE LA CHICA AL CELULAR
// ============================================================

function agregarMensajeCelularChica(nombreChica, texto) {
    const container = document.getElementById("quint-celular-mensajes");
    if (!container) return;

    const msg = document.createElement("div");
    msg.className = "celular-mensaje-chica";

    const color = CHICAS[nombreChica]?.color || "#a0a8c0";
    msg.style.borderColor = color + "55";
    msg.style.background  = color + "15";

    msg.innerHTML = `
        <span class="celular-mensaje-nombre" style="color:${color}">${nombreChica}:</span><br>
        <span class="celular-mensaje-texto">${texto}</span>
    `;

    container.appendChild(msg);
    scrollCelularFondo();

    celularHistorial.push({ role: "assistant", nombre: nombreChica, content: texto });
}

// ============================================================
//  AGREGAR MENSAJE DEL USUARIO AL CELULAR
// ============================================================

function agregarMensajeCelularUsuario(texto) {
    const container = document.getElementById("quint-celular-mensajes");
    if (!container) return;

    const msg = document.createElement("div");
    msg.className = "celular-mensaje-usuario";
    msg.innerHTML = `<span class="celular-mensaje-texto">${texto}</span>`;

    container.appendChild(msg);
    scrollCelularFondo();

    celularHistorial.push({ role: "user", content: texto });
}

// ============================================================
//  ENVIAR MENSAJE POR CELULAR
// ============================================================

async function enviarMensajeCelular() {
    const input = document.getElementById("quint-celular-input");
    if (!input) return;

    const texto = input.value.trim();
    if (!texto) return;

    input.value = "";
    input.style.height = "auto";

    agregarMensajeCelularUsuario(texto);

    // Incrementar contador de interacciones
    incrementarInteraccion(celularChicaActual);

    // Mostrar typing
    mostrarTypingCelular(celularChicaActual);

    // 25% de probabilidad de enviar foto/selfie después de 2+ interacciones
    const interacciones = getInteracciones(celularChicaActual);
    if (interacciones >= 2 && Math.random() < 0.25) {
        await new Promise(r => setTimeout(r, 800));
        const foto = enviarFotoSelfieAleatoria(celularChicaActual);
        if (foto) {
            agregarFotoCelular(celularChicaActual, foto);
            await new Promise(r => setTimeout(r, 1200));
        }
    }

    // 20% de probabilidad de mencionar un recuerdo íntimo después de 3+ interacciones
    if (interacciones >= 3 && Math.random() < 0.20) {
        const recuerdo = obtenerRecuerdoIntimo(celularChicaActual);
        if (recuerdo) {
            await new Promise(r => setTimeout(r, 600));
            agregarMensajeCelularChica(celularChicaActual, "*voz nostálgica y cariñosa* " + recuerdo);
            await new Promise(r => setTimeout(r, 800));
        }
    }

    // Generar respuesta de la chica
    const respuesta = await generarRespuestaCelular(celularChicaActual, texto);

    ocultarTypingCelular();

    if (respuesta) {
        agregarMensajeCelularChica(celularChicaActual, respuesta);
    }
}

// ============================================================
//  KEY HANDLER PARA CELULAR (Enter para enviar)
// ============================================================

function celularKeyHandler(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        enviarMensajeCelular();
    }
}

// ============================================================
//  GENERAR RESPUESTA DE CELULAR (usa la API como chatbot normal)
// ============================================================

async function generarRespuestaCelular(nombreChica, mensajeUsuario) {
    const chica = CHICAS[nombreChica];
    if (!chica) {
        const opciones = DIALOGOS_CELULAR_AUTOMATICOS[nombreChica];
        return opciones[Math.floor(Math.random() * opciones.length)];
    }

    // System prompt optimizado para chatbot dinámico
    const systemPrompt = `Eres ${nombreChica} de las Quintillizas Nakano hablando por teléfono/celular con el usuario.

PERSONALIDAD:
${chica.personalidad}

INSTRUCCIONES:
- Estás teniendo una conversación de celular/chat con el usuario
- Responde de manera natural, dinámica y coherente con tu personalidad
- Mantén los mensajes cortos, como mensajes de celular reales (2-5 líneas)
- Usa *asteriscos* para acciones físicas
- NO repitas mensajes predefinidos — responde de forma ÚNICA al mensaje del usuario
- Sé creativa y natural en tu respuesta
- Si es llamada telefónica: habla como si estuvieras al teléfono
- Si es mensaje de texto: escribe como mensajes de chat

IMPORTANTE: Responde SOLO con tu diálogo y acciones. Sin JSON, sin formato extra. Solo texto con *asteriscos* para acciones.`;

    // Construir historial de conversación para contexto
    const conversationHistory = [];
    
    // Agregar mensajes previos del chat de celular
    celularHistorial.slice(-10).forEach(msg => {
        if (msg.role === "user") {
            conversationHistory.push({ role: "user", content: msg.content });
        } else if (msg.role === "assistant") {
            conversationHistory.push({ role: "assistant", content: msg.content });
        }
    });

    // Agregar el mensaje actual del usuario
    conversationHistory.push({ role: "user", content: mensajeUsuario });

    console.log(`[CELULAR API] Generando respuesta para ${nombreChica}...`);

    // Intentar con 3 modelos en orden
    const modelos = [MODELO_PRINCIPAL, MODELO_ALTERNATIVO, MODELO_TERCERO];
    
    for (let intento = 0; intento < modelos.length; intento++) {
        const modelo = modelos[intento];
        
        try {
            const raw = await quintLlamarAPI(conversationHistory, modelo, systemPrompt);
            
            if (raw) {
                // Limpiar respuesta
                let limpio = raw.trim();
                
                // Remover formato markdown si existe
                limpio = limpio.replace(/^```json\s*/gi, "").replace(/```\s*$/g, "").trim();
                limpio = limpio.replace(/^```/g, "").replace(/```$/g, "").trim();
                
                // Intentar parsear como JSON (por si acaso)
                try {
                    const parsed = JSON.parse(limpio);
                    if (parsed.dialogo) {
                        console.log(`[CELULAR API] Respuesta parseada desde JSON`);
                        return parsed.dialogo;
                    }
                    if (parsed.chicasQueHablan?.[0]?.dialogo) {
                        console.log(`[CELULAR API] Respuesta desde estructura chatbot`);
                        return parsed.chicasQueHablan[0].dialogo;
                    }
                } catch {}
                
                // Verificar que la respuesta no esté vacía
                if (limpio.length > 10) {
                    console.log(`[CELULAR API] Respuesta dinámica generada (${modelo})`);
                    return limpio;
                }
            }
        } catch (e) {
            console.log(`[CELULAR API] Error intento ${intento + 1} (${modelo}):`, e.message);
        }
    }

    // Si todo falla, fallback
    console.log(`[CELULAR] Usando respuesta fallback para ${nombreChica}`);
    const opciones = DIALOGOS_CELULAR_AUTOMATICOS[nombreChica];
    return opciones[Math.floor(Math.random() * opciones.length)];
}

// ============================================================
//  TYPING INDICATOR CELULAR
// ============================================================

function mostrarTypingCelular(nombreChica) {
    const container = document.getElementById("quint-celular-mensajes");
    if (!container) return;

    const typing = document.createElement("div");
    typing.id = "quint-celular-typing";
    typing.className = "celular-typing";
    typing.innerHTML = `
        <span class="celular-typing-name">${nombreChica}</span> está escribiendo...
        <span class="celular-typing-dot">.</span><span class="celular-typing-dot">.</span><span class="celular-typing-dot">.</span>
    `;
    container.appendChild(typing);
    scrollCelularFondo();
}

function ocultarTypingCelular() {
    const typing = document.getElementById("quint-celular-typing");
    if (typing) typing.remove();
}

// ============================================================
//  TERMINAR LLAMADA DE CELULAR
// ============================================================

async function terminarLlamadaCelular() {
    if (!celularActivo) return;

    const chicaCelular = celularChicaActual;
    const historialPrevio = [...quintHistorial].slice(-6); // Contexto antes de la llamada

    // 40% de probabilidad de promesa coqueta si hay 2+ interacciones previas
    const interacciones = getInteracciones(chicaCelular);
    if (interacciones >= 2 && Math.random() < 0.40) {
        const promesa = obtenerPromesaCoqueta(chicaCelular);
        if (promesa) {
            await new Promise(r => setTimeout(r, 600));
            agregarMensajeCelularChica(chicaCelular, promesa);
            await new Promise(r => setTimeout(r, 1200));
        }
    }

    // Despedida de la chica del celular
    const despedidas = DESPEDIDAS_CELULAR[chicaCelular];
    const despedida = despedidas[Math.floor(Math.random() * despedidas.length)];
    agregarMensajeCelularChica(chicaCelular, despedida);

    // Pausa dramática
    await new Promise(r => setTimeout(r, 1000));

    // Cerrar UI del celular
    cerrarUICelular();

    celularActivo = false;

    // Agregar sistema de que terminó la llamada
    quintAgregarSistema(`[ ${chicaCelular} terminó la ${celularEsLlamada ? "llamada" : "conversación"} ]`);

    // AHORA: La chica con la que estabas reacciona
    const chicasPresentes = [...quintChicasActivas].filter(n => CHICAS[n] && n !== chicaCelular);

    if (chicasPresentes.length > 0) {
        // Seleccionar la chica más relevante (la última que habló o la primera)
        let chicaReacciona = null;

        // Buscar la última chica que habló en el historial
        for (let i = quintHistorial.length - 1; i >= 0; i--) {
            const msg = quintHistorial[i];
            if (msg.role === "assistant") {
                try {
                    const parsed = typeof msg.content === "string" ? JSON.parse(msg.content) : msg.content;
                    if (parsed.chicasQueHablan?.[0]?.nombre) {
                        const nombre = parsed.chicasQueHablan[0].nombre;
                        if (CHICAS[nombre] && nombre !== chicaCelular) {
                            chicaReacciona = nombre;
                            break;
                        }
                    }
                } catch {}
            }
        }

        // Fallback: primera chica disponible
        if (!chicaReacciona) {
            chicaReacciona = chicasPresentes[0];
        }

        // Generar reacción post-llamada
        await generarReaccionPostLlamada(chicaReacciona, chicaCelular, historialPrevio);
    }

    celularChicaActual = null;
    celularHistorial = [];
}

// ============================================================
//  GENERAR REACCIÓN POST-LLAMADA
// ============================================================

async function generarReaccionPostLlamada(nombreChicaReacciona, nombreChicaCelular, contextoPrevio) {
    const chica = CHICAS[nombreChicaReacciona];
    if (!chica) return;

    // Obtener reacciones predefinidas
    const reacciones = REACCIONES_POST_LLAMADA[nombreChicaReacciona]?.[nombreChicaCelular];

    if (reacciones && reacciones.length > 0) {
        // 60% probabilidad de usar reacción predefinida
        if (Math.random() < 0.6) {
            const reaccion = reacciones[Math.floor(Math.random() * reacciones.length)];
            quintAgregarChica(nombreChicaReacciona, "normal", reaccion);
            return;
        }
    }

    // 40% probabilidad de generar reacción con IA basada en contexto
    const systemPrompt = `Eres ${nombreChicaReacciona} de las Quintillizas Nakano. ${chica.personalidad}

Acabas de estar teniendo una conversación/encuentro íntimo con el usuario. De repente, ${nombreChicaCelular} llamó/envió un mensaje por celular e interrumpió el momento.

Ahora que el usuario terminó esa llamada, tú reaccionas a la interrupción.

REGLAS:
- Reacciona naturalmente a que te interrumpieron justo cuando estabas con el usuario
- Si el contexto era romántico/íntimo, menciona la interrupción (ej: "nos interrumpen justo cuando...", "estábamos en lo mejor y...")
- Mantén tu personalidad: sé coqueta, tsundere, tímida, energética o firme según quien seas
- Usa acciones entre *asteriscos*
- Respeta el contexto previo: si estaban besándose, abrazándose, hablando de algo específico, haz referencia a ello
- Sé natural, no forzada
- Responde SOLO con texto, sin JSON.`;

    // Construir contexto breve
    let contextoTexto = "";
    if (contextoPrevio && contextoPrevio.length > 0) {
        const ultimos = contextoPrevio.slice(-4).map(m => {
            if (m.role === "user") return `Usuario: ${m.content}`;
            if (m.role === "assistant") return m.content;
            return "";
        }).filter(Boolean).join("\n");
        contextoTexto = `\n\nContexto de la conversación antes de la llamada:\n${ultimos}`;
    }

    const messages = [
        { role: "system", content: systemPrompt + contextoTexto },
        { role: "user", content: `(Reacciona a que ${nombreChicaCelular} te interrumpió por celular. Di algo natural y coherente con tu personalidad y el contexto anterior.)` },
    ];

    // Intentar con 3 modelos
    const modelos = [MODELO_PRINCIPAL, MODELO_ALTERNATIVO, MODELO_TERCERO];
    let respuesta = null;

    for (let intento = 0; intento < modelos.length && !respuesta; intento++) {
        try {
            const raw = await quintLlamarAPI(messages, modelos[intento], systemPrompt);
            if (raw) {
                let limpio = raw.replace(/^```json\s*/g, "").replace(/```\s*$/g, "").trim();
                try {
                    const parsed = JSON.parse(limpio);
                    if (parsed.dialogo) limpio = parsed.dialogo;
                    if (parsed.chicasQueHablan?.[0]?.dialogo) limpio = parsed.chicasQueHablan[0].dialogo;
                } catch {}
                if (limpio.length > 10) {
                    console.log(`[CELULAR REACCIÓN] Respuesta generada con ${modelos[intento]}`);
                    respuesta = limpio;
                }
            }
        } catch (e) {
            console.log(`[CELULAR REACCIÓN] Error con ${modelos[intento]}:`, e.message);
        }
    }

    if (respuesta) {
        quintAgregarChica(nombreChicaReacciona, "normal", respuesta);
        return;
    }

    // Fallback a predefinido
    if (reacciones && reacciones.length > 0) {
        const reaccion = reacciones[Math.floor(Math.random() * reacciones.length)];
        quintAgregarChica(nombreChicaReacciona, "normal", reaccion);
    }
}

// ============================================================
//  CERRAR UI DEL CELULAR
// ============================================================

function cerrarUICelular() {
    celularUIVisible = false;
    const overlay = document.getElementById("quint-celular-overlay");
    if (overlay) overlay.remove();
}

// ============================================================
//  SCROLL AL FONDO DEL CELULAR
// ============================================================

function scrollCelularFondo() {
    const container = document.getElementById("quint-celular-mensajes");
    if (container) container.scrollTop = container.scrollHeight;
}

// ============================================================
//  INYECTAR ESTILOS DEL CELULAR
// ============================================================

function celularInjectStyles() {
    if (document.getElementById("quint-celular-styles")) return;

    const style = document.createElement("style");
    style.id = "quint-celular-styles";
    style.textContent = `
        /* NOTIFICACIÓN DE CELULAR */
        .quint-celular-notif {
            margin: 12px 0; padding: 14px 16px;
            background: linear-gradient(135deg, #1a1040, #0d1526);
            border: 1px solid #3a2a60; border-radius: 14px;
            display: flex; flex-direction: column; align-items: center; gap: 10px;
            animation: celNotifPulse 0.6s ease;
            box-shadow: 0 0 20px rgba(120, 80, 255, 0.15);
        }
        .celular-notif-icon { font-size: 28px; animation: celVibrate 0.4s ease infinite; }
        .celular-notif-text {
            color: #c0d0ff; font-size: 13px; font-family: Georgia, serif;
            text-align: center; line-height: 1.5; max-width: 90%;
        }
        .celular-notif-btn {
            background: linear-gradient(135deg, #2a4a80, #3a6adf);
            color: #c0d8ff; border: none; padding: 8px 20px; border-radius: 8px;
            cursor: pointer; font-family: Georgia, serif; font-size: 12px; font-weight: bold;
            transition: all 0.2s; min-width: 120px;
        }
        .celular-notif-btn:hover { transform: scale(1.05); box-shadow: 0 0 10px rgba(80,120,255,0.3); }
        .celular-notif-btn-ignore {
            background: transparent !important; color: #5a6a8a !important;
            border: 1px solid #2a3a55 !important;
        }
        .celular-notif-btn-ignore:hover { background: #1a1a2e !important; }

        @keyframes celNotifPulse { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes celVibrate { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-5deg)} 75%{transform:rotate(5deg)} }

        /* OVERLAY Y PANEL DEL CELULAR */
        #quint-celular-overlay {
            position: absolute; inset: 0; z-index: 150;
            background: rgba(5, 8, 15, 0.92);
            display: flex; align-items: center; justify-content: center;
            border-radius: 16px; backdrop-filter: blur(4px);
        }
        #quint-celular-panel {
            width: min(420px, 92%); max-height: 80vh;
            background: #0a0f18; border: 2px solid #1f2d45; border-radius: 18px;
            display: flex; flex-direction: column; overflow: hidden;
            box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(60,100,200,0.1);
            animation: celPanelIn 0.25s ease;
        }
        #quint-celular-header {
            display: flex; align-items: center; justify-content: space-between;
            padding: 12px 16px; background: linear-gradient(135deg, #111c30, #0d1526);
            border-bottom: 1px solid #1f2d45; flex-shrink: 0;
        }
        .celular-header-info { display: flex; align-items: center; gap: 8px; }
        .celular-header-icon { font-size: 18px; }
        .celular-header-name { color: #8ab0ff; font-size: 14px; font-weight: bold; font-family: Georgia, serif; }
        .celular-header-type { color: #3a5a90; font-size: 11px; font-family: Arial, sans-serif; margin-left: 4px; }
        #quint-celular-cerrar {
            background: none; border: none; color: #3a5a90; cursor: pointer; font-size: 18px;
            padding: 4px 8px; transition: color 0.2s;
        }
        #quint-celular-cerrar:hover { color: #ff7b7b; }

        #quint-celular-mensajes {
            flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 8px;
            min-height: 200px; max-height: 50vh; background: #070b14;
        }
        .celular-mensaje-sistema {
            text-align: center; color: #3a5a90; font-size: 12px; font-family: Arial, sans-serif;
            padding: 8px; opacity: 0.8;
        }
        .celular-mensaje-chica {
            padding: 10px 12px; border-radius: 12px; border-left: 3px solid;
            background: rgba(255,255,255,0.03); animation: celMsgIn 0.18s ease;
        }
        .celular-mensaje-usuario {
            padding: 10px 12px; border-radius: 12px;
            background: linear-gradient(135deg, #1a2a4a, #141e38);
            border: 1px solid #2a3a55; margin-left: 20px;
            animation: celMsgIn 0.18s ease;
        }
        .celular-mensaje-nombre { font-size: 12px; font-weight: bold; font-family: Georgia, serif; }
        .celular-mensaje-texto {
            display: block; margin-top: 4px; color: #c0d0ff; font-size: 13px;
            font-family: Arial, sans-serif; line-height: 1.5;
        }
        .celular-mensaje-usuario .celular-mensaje-texto { color: #8ab0ff; }

        #quint-celular-input-area {
            display: flex; gap: 8px; padding: 10px 12px;
            background: #0d1526; border-top: 1px solid #1f2d45; flex-shrink: 0;
        }
        #quint-celular-input {
            flex: 1; background: #111c30; border: 1px solid #1f2d45; border-radius: 10px;
            padding: 10px 12px; color: #c0d0ff; font-family: Arial, sans-serif; font-size: 13px;
            resize: none; outline: none; min-height: 40px; max-height: 80px;
        }
        #quint-celular-input:focus { border-color: #3a6adf; }
        #quint-celular-btn-enviar {
            background: linear-gradient(135deg, #1f3a70, #3a6adf);
            color: #c0d8ff; border: none; padding: 8px 16px; border-radius: 10px;
            cursor: pointer; font-family: Georgia, serif; font-size: 12px; font-weight: bold;
            transition: all 0.2s; align-self: flex-end;
        }
        #quint-celular-btn-enviar:hover { transform: scale(1.05); }

        #quint-celular-btns-footer {
            display: flex; justify-content: center; padding: 10px;
            background: #0a0f18; border-top: 1px solid #1f2d45; flex-shrink: 0;
        }
        .celular-footer-btn {
            background: linear-gradient(135deg, #4a1a1a, #6a2020);
            color: #ff9090; border: 1px solid #6a2020; padding: 8px 24px; border-radius: 10px;
            cursor: pointer; font-family: Georgia, serif; font-size: 12px; font-weight: bold;
            transition: all 0.2s;
        }
        .celular-footer-btn:hover { background: #6a2020; transform: scale(1.05); }

        /* TYPING INDICATOR */
        .celular-typing {
            padding: 8px 12px; color: #3a5a90; font-size: 12px; font-family: Arial, sans-serif;
            display: flex; align-items: center; gap: 4px;
        }
        .celular-typing-name { color: #8ab0ff; font-weight: bold; }
        .celular-typing-dot { animation: celDotPulse 1.2s ease infinite; }
        .celular-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .celular-typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes celDotPulse { 0%,60%,100%{opacity:0.3} 30%{opacity:1} }
        @keyframes celPanelIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
        @keyframes celMsgIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

        /* FOTOS/SELFIES */
        .celular-mensaje-foto {
            padding: 0; border-radius: 14px; border-left: 4px solid;
            background: linear-gradient(145deg, #0f1a30, #0a1225);
            animation: celMsgIn 0.25s ease;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 15px rgba(100,150,255,0.1);
            margin: 4px 0;
        }
        .celular-foto-header {
            display: flex; align-items: center; gap: 8px;
            padding: 10px 14px;
            background: linear-gradient(135deg, #1a2845, #141e38);
            border-bottom: 1px solid #2a3a55;
        }
        .celular-foto-icon { font-size: 18px; }
        .celular-foto-nombre { font-size: 13px; font-weight: bold; font-family: Georgia, serif; }
        .celular-foto-estilo {
            font-size: 10px; color: #5a7aaa; font-family: Arial, sans-serif;
            padding: 2px 8px; border-radius: 10px;
            background: rgba(100,150,255,0.15);
            margin-left: auto;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .celular-foto-descripcion {
            padding: 12px 14px; color: #c0d0ff; font-size: 12px;
            font-family: Georgia, serif; line-height: 1.6;
        }
        .celular-foto-badge {
            padding: 6px 14px; background: rgba(100,150,255,0.1);
            border-top: 1px solid #2a3a55;
            color: #5a8ad0; font-size: 11px; font-family: Arial, sans-serif;
            display: flex; align-items: center; gap: 6px;
        }
        .celular-foto-imagen {
            width: 100%; min-height: 120px; max-height: 350px;
            display: flex; align-items: center; justify-content: center;
            background: #0a0f18; overflow: hidden;
            border-top: 1px solid #2a3a55;
            border-bottom: 1px solid #2a3a55;
        }
        .celular-foto-imagen img {
            width: 100%; height: auto; max-height: 350px;
            object-fit: cover; display: block;
        }
        .celular-foto-placeholder {
            padding: 30px 20px; color: #4a6a90; font-size: 12px;
            font-family: Georgia, serif; text-align: center;
            display: flex; flex-direction: column; align-items: center; gap: 8px;
            line-height: 1.5;
        }

        /* Responsive */
        @media (max-width: 480px) {
            #quint-celular-panel { width: 96%; max-height: 85vh; }
            #quint-celular-mensajes { max-height: 55vh; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  INICIALIZACIÓN — llamar después de cargar quintillizas
// ============================================================

function celularIniciar() {
    celularInjectStyles();
    celularContador = 0;
    celularSiguienteEn = 0;
    celularActivo = false;
    celularChicaActual = null;
    celularHistorial = [];
    celularMemoriaInteracciones = {};
    console.log("[CELULAR] Sistema de mensajes celular iniciado.");
}

// ============================================================
//  PATCH DE quintEnviar PARA CONTAR TURNOS
//  Se llama desde quint_nuevas_funciones.js o desde quintillizas.js
// ============================================================

function celularPatchearQuintEnviar() {
    if (window._celularPatched) return;
    window._celularPatched = true;

    const _origEnviar = window.quintEnviar;
    window.quintEnviar = async function() {
        // Llamar la función original
        await _origEnviar();

        // Contar turno para el celular
        celularContarTurno();
    };
}

// ============================================================
//  EXPORTAR FUNCIONES GLOBALES
// ============================================================

window.abrirChatCelularDesdeNotif = abrirChatCelularDesdeNotif;
window.ignorarCelular = ignorarCelular;
window.enviarMensajeCelular = enviarMensajeCelular;
window.terminarLlamadaCelular = terminarLlamadaCelular;
window.celularKeyHandler = celularKeyHandler;
