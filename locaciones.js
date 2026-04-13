// ============================================================
//  QUINTILLIZAS — LOCACIONES
//  Cada locación tiene: nombre, imagen de bienvenida, música ambiental (mp3).
//  "mensajesPorChica" contiene un mensaje personalizado POR cada chica
//  con su propia imagen. La estructura es:
//    mensajesPorChica: {
//      Ichika:  { mensaje: (nombre) => `...`, imagen: "URL" },
//      Nino:    { mensaje: (nombre) => `...`, imagen: "URL" },
//      Miku:    { mensaje: (nombre) => `...`, imagen: "URL" },
//      Yotsuba: { mensaje: (nombre) => `...`, imagen: "URL" },
//      Itsuki:  { mensaje: (nombre) => `...`, imagen: "URL" },
//    }
// ============================================================

const Locaciones = {
    parque: {
        id: "parque",
        nombre: "Parque",
        imagen: "",       // ← Imagen panorámica del parque (opcional, se muestra antes del mensaje)
        musica: "https://files.catbox.moe/7uhkfr.mp3",        // ← Pon aquí el link del mp3 de música del parque
        mensajesPorChica: {
            Ichika: {
                mensaje: (nombre) => `*camina entre los árboles del parque tomándote de la mano* ¡Mira qué bonito está el día! *se sienta en una banca y te hace espacio* Ven, aquí se siente la brisa súper lindo~ ¿Quieres que caminemos un rato o nos quedamos aquí? *sonríe mientras el viento le mueve el cabello*`,
                imagen: "",  // ← URL de la imagen de Ichika en el parque
            },
            Nino: {
                mensaje: (nombre) => `*cruza los brazos mirando el parque* Hmm, no está tan mal este lugar. *te lanza una mirada* No te quedes ahí parado, ven a caminar conmigo. *empieza a andar y te mira de reojo* ¡Y no te alejes!`,
                imagen: "https://pbs.twimg.com/media/G8ERgh8WMAcfn28?format=jpg&name=medium",  // ← URL de la imagen de Nino en el parque
            },
            Miku: {
                mensaje: (nombre) => `*se sienta bajo un árbol con su libro* ...Ah, ${nombre}. *levanta la vista un momento* Este parque tiene historia interesante. *vuelve a mirar su libro* ¿Quieres... sentarte aquí conmigo?`,
                imagen: "",  // ← URL de la imagen de Miku en el parque
            },
            Yotsuba: {
                mensaje: (nombre) => `*corre descalza por el pasto* ¡${nombre}! ¡Ven, el día está perfecto! *se voltea y te hace señas* ¡Vamos a correr juntos! *se ríe a carcajadas mientras una mariposa pasa cerca*`,
                imagen: "",  // ← URL de la imagen de Yotsuba en el parque
            },
            Itsuki: {
                mensaje: (nombre) => `*está sentada en una banca comiendo un pastel* Ah, ${nombre}. *te señala* ¡Llegaste justo! Probé este pastel y está increíble. *te ofrece un trozo* Quiero tu opinión también~`,
                imagen: "",  // ← URL de la imagen de Itsuki en el parque
            },
        },
    },
    playa: {
        id: "playa",
        nombre: "Playa",
        imagen: "",
        musica: "",
        mensajesPorChica: {
            Ichika: {
                mensaje: (nombre) => `*camina descalza por la orilla del mar con una sonrisa suave* ${nombre}... *se voltea y el viento le mueve el cabello* El atardecer aquí es hermoso. ¿Me acompañas? *extiende su mano hacia ti*`,
                imagen: "",
            },
            Nino: {
                mensaje: (nombre) => `*sale corriendo del agua con una sonrisa* ¡${nombre}! ¡Te voy a mojar! *te salpica con fuerza y se ríe* ¡No te escapes! *corre hacia ti con los ojos brillantes*`,
                imagen: "",
            },
            Miku: {
                mensaje: (nombre) => `*está sentada en la arena con una concha en la mano* ...Mira, ${nombre}. *te muestra la concha* Es bonita, ¿verdad? *sonríe levemente* El mar es tranquilo aquí.`,
                imagen: "",
            },
            Yotsuba: {
                mensaje: (nombre) => `*corre descalza por la orilla del mar* ¡${nombre}! ¡Ven, el agua está deliciosa! *se voltea y te salpica con la mano* ¡Te voy a mojar! *se ríe a carcajadas mientras las olas le mojan los pies* ¡Vamos, no seas malhumorado!`,
                imagen: "",
            },
            Itsuki: {
                mensaje: (nombre) => `*está bajo una sombrilla con un helado enorme* ¡${nombre}! *te llama con la mano* Ven, conseguí helados increíbles aquí. *te muestra dos* ¡Escogí el que pensé que te gustaría!`,
                imagen: "",
            },
        },
    },
    escuela: {
        id: "escuela",
        nombre: "Escuela",
        imagen: "",
        musica: "",
        mensajesPorChica: {
            Ichika: {
                mensaje: (nombre) => `*te espera frente a los casilleros con una sonrisa* Bienvenido, ${nombre}. *se acerca con elegancia* ¿Listo para el día de hoy? *te acomoda el cuello de la camisa* No quiero que andes despeinado~`,
                imagen: "",
            },
            Nino: {
                mensaje: (nombre) => `*está parada frente a los casilleros con los brazos cruzados* Ah, llegaste. *te mira de arriba abajo* Espero que no vengas tarde otra vez, que ya sabes que no me gusta esperarte. *suspira pero sonríe un poco* ¿Qué clase te toca ahora?`,
                imagen: "",
            },
            Miku: {
                mensaje: (nombre) => `*lee un libro junto a los casilleros* ...Hola, ${nombre}. *levanta la vista brevemente* ¿Sabías que esta escuela tiene más de 50 años de historia? *vuelve a su libro* Es... interesante.`,
                imagen: "",
            },
            Yotsuba: {
                mensaje: (nombre) => `*te ve desde lejos y corre hacia ti* ¡${nombre}! ¡Buenos días! *te agarra del brazo* ¡Vamos a clase juntos! *empieza a caminar emocionada* ¡Hoy va a ser un gran día!`,
                imagen: "",
            },
            Itsuki: {
                mensaje: (nombre) => `*revisa sus apuntes en el pasillo* Ah, ${nombre}. *levanta la vista* ¿Estudiaste para el examen? *guarda sus papeles* Si quieres podemos repasar juntos antes de clase...`,
                imagen: "",
            },
        },
    },
    cafeteria: {
        id: "cafeteria",
        nombre: "Cafetería",
        imagen: "",
        musica: "",
        mensajesPorChica: {
            Ichika: {
                mensaje: (nombre) => `*está sentada en una mesa con dos tazas de café* ${nombre}, qué bueno que llegaste. *sonríe y te señala el asiento* Pedí tu favorito. *acerca la taza hacia ti* Cuéntame, ¿cómo va tu día?`,
                imagen: "",
            },
            Nino: {
                mensaje: (nombre) => `*te espera con una mesa llena de pasteles* ¡Tardaste mucho! *cruza los brazos pero sonríe* Siéntate ya. *te empuja suavemente al asiento* Pedí demasiado... y no voy a dejar que te vayas sin ayudarme a terminar.`,
                imagen: "",
            },
            Miku: {
                mensaje: (nombre) => `*toma té tranquilamente en una esquina* ...${nombre}. *te hace una seña para que te sientes* Este lugar tiene buena comida. *sirve una taza para ti* ¿Quieres... probar el pastel de hoy?`,
                imagen: "",
            },
            Yotsuba: {
                mensaje: (nombre) => `*está sentada en una mesa con un pastel enorme enfrente* ¡${nombre}! ¡Rápido, llega antes de que me lo acabe! *se limpia la boca con una servilleta toda apenada* Es que… bueno, tenía hambre, ¿vale? *te señala el asiento de enfrente* Siéntate, yo te invito un café~`,
                imagen: "",
            },
            Itsuki: {
                mensaje: (nombre) => `*ya tiene dos platos servidos* ${nombre}, mira lo que pedí. *señala la mesa emocionada* ¡Es el especial de hoy! Y conseguí postre extra. *te mira con ojos brillantes* ¡Vamos, come conmigo!`,
                imagen: "",
            },
        },
    },
    casa: {
        id: "casa",
        nombre: "Casa",
        imagen: "",
        musica: "",
        mensajesPorChica: {
            Ichika: {
                mensaje: (nombre) => `*abre la puerta con una sonrisa cálida* Bienvenido a casa, ${nombre}. *toma tu chaqueta* ¿Tuviste un buen día? *te guía al sofá* Relájate un poco, yo me encargo de todo~`,
                imagen: "",
            },
            Nino: {
                mensaje: (nombre) => `*te recibe en la entrada con los brazos cruzados* Por fin llegas. *desvía la mirada un momento* No es que estuviera esperándote ni nada... *vuelve a mirarte* ¿Tienes hambre? Puedo prepararte algo...`,
                imagen: "",
            },
            Miku: {
                mensaje: (nombre) => `*está en la sala leyendo* ...Bienvenido, ${nombre}. *cierra el libro lentamente* Estaba leyendo sobre la historia de esta casa. *te mira con calma* ¿Quieres que te cuente?`,
                imagen: "",
            },
            Yotsuba: {
                mensaje: (nombre) => `*abre la puerta de casa con una sonrisa* ¡Bienvenido a casa! *te quita la chaqueta* ¿Tuviste un buen día? Las hermanas están todas hoy, así que prepárate… *se ríe en voz baja* Esto se va a poner ruidoso.`,
                imagen: "",
            },
            Itsuki: {
                mensaje: (nombre) => `*está en la cocina con delantal* Ah, ${nombre}, bienvenido. *se voltea con una sonrisa* Justo estaba haciendo la cena. *levanta una cuchara* ¿Me ayudas? O mejor siéntate y espera, que casi está...`,
                imagen: "",
            },
        },
    },
    karaoke: {
        id: "karaoke",
        nombre: "Karaoke",
        imagen: "",
        musica: "",
        mensajesPorChica: {
            Ichika: {
                mensaje: (nombre) => `*sostiene el micrófono con gracia* ${nombre}, ven~ *se sienta a tu lado y te ofrece otro micrófono* Vamos a cantar un dueto. *sonríe con complicidad* Solo tú y yo~`,
                imagen: "",
            },
            Nino: {
                mensaje: (nombre) => `*ya tiene el micrófono en mano* ¡${nombre}! Hoy no me vas a ganar. *pone una canción a todo volumen* ¡Prepárate! *empieza a cantar con pasión* ¡Y no vale hacer trampa!`,
                imagen: "",
            },
            Miku: {
                mensaje: (nombre) => `*elige una canción con cuidado* ...${nombre}. *te pasa el otro micrófono* Esta canción me recuerda a ti. *baja la voz* Es... una que me gusta. ¿La cantamos juntos?`,
                imagen: "",
            },
            Yotsuba: {
                mensaje: (nombre) => `*sostiene el micrófono como si fuera un escenario* ¡${nombre}! ¡Hoy cantas conmigo y no acepto un no por respuesta! *pone una canción súper animada y empieza a bailar* ¡Vamos, que tú puedes mejor! *te empuja suavemente al centro de la habitación*`,
                imagen: "",
            },
            Itsuki: {
                mensaje: (nombre) => `*revisa la lista de canciones con cuidado* ${nombre}, ¿qué quieres cantar? *te mira* Yo sé una buena canción de dueto... *se sonroja un poco* Digo, si quieres...`,
                imagen: "",
            },
        },
    },
    casaNakano: {
        id: "casaNakano",
        nombre: "Casa Nakano",
        imagen: "https://pbs.twimg.com/media/HFQMhuaXYAIkEsX?format=jpg&name=large",
        musica: "",
        mensajesPorChica: {
            Ichika: {
                mensaje: (nombre) => `*abre la puerta de casa con una sonrisa pícara, trae un vestido corto que apenas le cubre* Bienvenido, ${nombre}... *se acerca despacio, te quita la chaqueta y te besa el cuello suavemente* Las hermanas salieron... estamos solos. *te empuja hacia el sofá y se sienta sobre tus piernas* ¿Seguro que quieres té? Porque yo tengo otras ideas~ *te muerde la oreja y susurra* No te voy a dejar escapar tan fácil...
- En el sofá Ichika se sienta en tu regazo frotando su culo contra tu entrepierna
- Se deja caer hacia atrás mostrando su escote
- Te besa el cuello mientras te agarra de la mano y la lleva entre sus piernas`,
                imagen: "",
            },
            Nino: {
                mensaje: (nombre) => `*te recibe en la entrada en ropa interior y un delantal abierto por atrás* ¿Qué? Solo estaba... probando algo. *se sonroja pero te mira fijamente* No te quedes ahí parado, cierra la puerta. *te agarra de la camisa y te pega contra la pared* Hace rato que quiero hacer esto... *te besa con hambre y te aprieta contra ella* Si se te ocurre mirar a otra hermana te mato, ¿entiendes? Soy solo yo ahora.
- Nino te empuja contra la pared y te besa apasionadamente
- Se frota contra ti mientras te quita la camisa
- Te muerde el labio inferior y te mira con ojos hambrientos`,
                imagen: "",
            },
            Miku: {
                mensaje: (nombre) => `*está acostada boca abajo en el sofá, con las piernas colgando y una pollera muy corta que se le sube* ...Ah, ${nombre}. *te mira por encima del hombro, se muerde el labio* Quédate... *se voltea boca arriba y se abre un poco de piernas* Hace mucho que no estamos así, solos. *se toca el cuello lentamente mientras te mira* ¿Vienes?
- Miku está recostada en el sofá con las piernas abiertas
- Se lame los labios mientras te mira fijamente
- Se sube la pollera un poco más y te hace espacio a su lado`,
                imagen: "",
            },
            Yotsuba: {
                mensaje: (nombre) => `*abre la puerta casi sin nada puesto, solo una camiseta tuya gigante que le cubre apenas* ¡¡${nombre}!! ¡Estaba esperándote! *salta encima tuyo y te tira al piso* Las hermanas dijeron que no hiciera ruido... *se sienta a horcajadas sobre ti y te agarra la cara* Pero es que no aguanto más~ *se balancea sobre ti frotándose* ¡Hoy te voy a hacer cosas que nunca olvidaste!
- Yotsuba te monta encima en el suelo, frotándose contra ti
- Se quita la camiseta tuya quedando desnuda y sonriendo
- Te obliga a tocar sus pechos mientras gime de emoción`,
                imagen: "",
            },
            Itsuki: {
                mensaje: (nombre) => `*está en la cocina con un delantal y nada más, se voltea al verte y se le cae la cuchara* ${nombre}... *se tapa como puede pero no se va* Iba a cocinar pero... *se acerca a ti con las piernas temblando* Mejor cómemelo a mí primero. *te agarra la mano y te la pone en su culo desnudo* Siento que estoy ardiendo... ayúdame, por favor.
- Itsuki te obliga a tocarle el culo bajo el delantal
- Se inclina sobre la mesa de la cocina mostrando todo
- Te agarra del pelo y te besa mientras se frota contra la mesa`,
                imagen: "",
            },
        },
    },
};

/**
 * Retorna un arreglo con todas las locaciones disponibles para mostrar como opciones.
 */
function obtenerListaLocaciones() {
    return Object.values(Locaciones).map(loc => ({
        id: loc.id,
        nombre: loc.nombre,
    }));
}

/**
 * Obtiene la locación actual seleccionada.
 */
let quintLocacionActual = null;

function obtenerLocacionActual() {
    return quintLocacionActual;
}

function establecerLocacion(locId) {
    const loc = Locaciones[locId];
    if (!loc) {
        console.warn(`[Locaciones] Locación "${locId}" no encontrada.`);
        return;
    }
    quintLocacionActual = loc;
    console.log(`[Locaciones] Locación cambiada a: ${loc.nombre}`);

    // Actualizar fondo visual si el sistema de hora está activo
    if (typeof HoraDelDia !== "undefined" && HoraDelDia._aplicarFondoVisual) {
        HoraDelDia._aplicarFondoVisual(HoraDelDia.períodoActual || "noche");
    }
}

/**
 * Obtiene el mensaje e imagen personalizados de una chica para la locación actual.
 * Retorna { mensaje, imagen } o null si no hay mensaje para esa chica.
 */
function obtenerMensajeChicaEnLocacion(nombreChica, nombreUsuario) {
    if (!quintLocacionActual) return null;
    const mensajes = quintLocacionActual.mensajesPorChica;
    if (!mensajes || !mensajes[nombreChica]) return null;

    const data = mensajes[nombreChica];
    return {
        mensaje: typeof data.mensaje === "function" ? data.mensaje(nombreUsuario) : data.mensaje,
        imagen: data.imagen || "",
    };
}

/**
 * Reproduce la música de la locación actual (si tiene música configurada).
 * Detiene cualquier audio previo.
 */
let quintAudioActual = null;

function reproducirMusicaLocacion() {
    // Detener audio anterior
    if (quintAudioActual) {
        quintAudioActual.pause();
        quintAudioActual = null;
    }

    if (!quintLocacionActual || !quintLocacionActual.musica) {
        console.log("[Locaciones] Sin música configurada para esta locación.");
        return;
    }

    quintAudioActual = new Audio(quintLocacionActual.musica);
    quintAudioActual.loop = true;
    quintAudioActual.volume = 0.3;
    quintAudioActual.play().catch(e => console.log("[Locaciones] Error reproduciendo música:", e));
}

function detenerMusicaLocacion() {
    if (quintAudioActual) {
        quintAudioActual.pause();
        quintAudioActual = null;
    }
}
