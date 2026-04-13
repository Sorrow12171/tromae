// ================================================
// BASE DE DATOS DE VOCABULARIO CON MAZOS DIFÍCILES
// ================================================

const vocabularioDatabase = {
    // ================================================
    // CONTENEDOR 1
    // ================================================
    
    // Sub-contenedor 1.1
    'sub1_1': {
        // MAZOS NORMALES
        1: [
            { japones: '今はちょうど', lectura: 'ima wa choudo', opciones: ['Justo ahora', 'Ya terminó', 'Hace mucho', 'Más tarde'], respuesta: 0 },
            { japones: '芸能', lectura: 'geinou', opciones: ['Entretenimiento', 'Deporte', 'Política', 'Academia'], respuesta: 0 },
            { japones: '活動', lectura: 'katsudou', opciones: ['Actividad', 'Descanso', 'Pausa', 'Inactividad'], respuesta: 0 },
            { japones: '時期', lectura: 'jikan', opciones: ['Período/Época', 'Lugar', 'Persona', 'Razón'], respuesta: 0 },
            { japones: 'せっかく 来れたのに', lectura: 'sekkaku korareta noni', opciones: ['Aunque vine con dificultad...', 'Porque fue fácil venir', 'Ya que no pude venir', 'Como no tenía planes'], respuesta: 0 },
            { japones: '水の泡', lectura: 'mizu no awa', opciones: ['En vano/Agua pasada', 'Gran éxito', 'Sorpresa', 'Ceremonia'], respuesta: 0 },
            { japones: 'そうなったら', lectura: 'sou nattara', opciones: ['Si eso sucede', 'Antes de que suceda', 'Aunque no suceda', 'Porque sucedió'], respuesta: 0 },
            { japones: 'すればいい', lectura: 'sureba ii', opciones: ['Deberías hacer (sugerencia)', 'No deberías hacer', 'Es imposible hacer', 'Es obligatorio hacer'], respuesta: 0 },
            { japones: '未来の明るい', lectura: 'mirai no akarui', opciones: ['Con un futuro brillante', 'Con un futuro oscuro', 'Sin futuro', 'Con un futuro incierto'], respuesta: 0 },
            { japones: '元女優が', lectura: 'moto joyuu ga', opciones: ['Una ex actriz', 'Una actriz principiante', 'Una actriz famosa', 'Una directora'], respuesta: 0 }
        ],
        
        2: [
            { japones: '引退になって', lectura: 'intai ni natte', opciones: ['Haberse retirado', 'Haberse unido', 'Haberse graduado', 'Haberse mudado'], respuesta: 0 },
            { japones: 'しまいに', lectura: 'shimai ni', opciones: ['Al final/ Finalmente', 'Al principio', 'De repente', 'Raramente'], respuesta: 0 },
            { japones: '業界', lectura: 'gyoukai', opciones: ['Industria/Rubio', 'País', 'Escuela', 'Familia'], respuesta: 0 },
            { japones: '華麗', lectura: 'karei', opciones: ['Elegante/Espléndido', 'Simple', 'Ordinario', 'Feo'], respuesta: 0 },
            { japones: 'これはいける', lectura: 'kore wa ikeru', opciones: ['Esto puede funcionar/Es prometedor', 'Esto es imposible', 'Esto es peligroso', 'Esto es aburrido'], respuesta: 0 },
            { japones: '初出演', lectura: 'hatsu shutsuen', opciones: ['Primera aparición', 'Última aparición', 'Aparición especial', 'Aparición casual'], respuesta: 0 },
            { japones: '元芸能人', lectura: 'moto geinoujin', opciones: ['Ex celebridad', 'Nueva celebridad', 'Periodista', 'Fan'], respuesta: 0 },
            { japones: '世にも珍しい', lectura: 'yo ni mo mezurashii', opciones: ['Extraño en el mundo/Inaudito', 'Muy común', 'Muy aburrido', 'Muy caro'], respuesta: 0 },
            { japones: '話題になる', lectura: 'wadai ni naru', opciones: ['Convertirse en tema de conversación', 'Ser olvidado', 'Ser criticado', 'Ser ignorado'], respuesta: 0 },
            { japones: '革命', lectura: 'kakumei', opciones: ['Revolución', 'Evolución', 'Tradición', 'Estancamiento'], respuesta: 0 }
        ],
        
        3: [
            { japones: '起こせる', lectura: 'okoseru', opciones: ['Poder causar/Lograr', 'Poder prevenir', 'Poder olvidar', 'Poder ignorar'], respuesta: 0 },
            { japones: '活躍さえ', lectura: 'katsuyaku sae', opciones: ['Incluso la actividad exitosa', 'Fracaso constante', 'Primer intento', 'Sin esfuerzo'], respuesta: 0 },
            { japones: '調理学校', lectura: 'chouri gakkou', opciones: ['Escuela de cocina', 'Escuela de arte', 'Escuela de negocios', 'Escuela de idiomas'], respuesta: 0 },
            { japones: 'きつい', lectura: 'kitsui', opciones: ['Difícil/Duro', 'Fácil', 'Relajado', 'Lento'], respuesta: 0 },
            { japones: '他の道を', lectura: 'hoka no michi wo', opciones: ['Otro camino', 'El mismo camino', 'Un atajo', 'Un callejón sin salida'], respuesta: 0 },
            { japones: '毎日', lectura: 'mainichi', opciones: ['Todos los días', 'Rara vez', 'A veces', 'Nunca'], respuesta: 0 },
            { japones: '試作', lectura: 'shisaku', opciones: ['Prototipo/Prueba de fabricación', 'Producto final', 'Venta', 'Consumo'], respuesta: 0 },
            { japones: 'お菓子', lectura: 'okashi', opciones: ['Dulces/Golosinas', 'Plato principal', 'Bebida', 'Sopa'], respuesta: 0 },
            { japones: 'お腹', lectura: 'onaka', opciones: ['Estómago', 'Cabeza', 'Mano', 'Corazón'], respuesta: 0 },
            { japones: '試食', lectura: 'shishoku', opciones: ['Degustación', 'Cocción', 'Compra', 'Desperdicio'], respuesta: 0 }
        ],
        
        4: [
            { japones: '将来', lectura: 'shourai', opciones: ['Futuro', 'Pasado', 'Presente', 'Ayer'], respuesta: 0 },
            { japones: '喫茶店', lectura: 'kissaten', opciones: ['Cafetería', 'Hospital', 'Tienda', 'Estación'], respuesta: 0 },
            { japones: '写真', lectura: 'shashin', opciones: ['Fotografía', 'Pintura', 'Escultura', 'Película'], respuesta: 0 },
            { japones: '写っている', lectura: 'utsu tte iru', opciones: ['Estar salido (en una foto)', 'Estar escondido', 'Estar borrado', 'Estar pintado'], respuesta: 0 },
            { japones: '報酬', lectura: 'houshuu', opciones: ['Recompensa/Pago', 'Castigo', 'Regalo', 'Deuda'], respuesta: 0 },
            { japones: '今後', lectura: 'kongo', opciones: ['De ahora en adelante', 'Hasta ahora', 'Recientemente', 'En el pasado lejano'], respuesta: 0 },
            { japones: '食レポ', lectura: 'shoku repo', opciones: ['Reportaje gastronómico', 'Reportaje deportivo', 'Reportaje político', 'Crítica literaria'], respuesta: 0 },
            { japones: '代わって', lectura: 'kawatte', opciones: ['En lugar de/Como sustituto', 'Junto con', 'En contra de', 'A pesar de'], respuesta: 0 },
            { japones: '真剣に', lectura: 'shinken ni', opciones: ['En serio', 'En broma', 'Despreocupadamente', 'Tristemente'], respuesta: 0 },
            { japones: '大食い系', lectura: 'oogui kei', opciones: ['Tipo comedor abundante', 'Tipo que come poco', 'Vegetariano', 'Gourmet'], respuesta: 0 }
        ],
        
        5: [
            { japones: '企画', lectura: 'kikaku', opciones: ['Plan/Proyecto', 'Accidente', 'Rutina', 'Error'], respuesta: 0 },
            { japones: 'いい加減', lectura: 'ii kagen', opciones: ['Ya basta/De una vez', 'Con cuidado', 'Por primera vez', 'Sin prisa'], respuesta: 0 },
            { japones: '傳説', lectura: 'densetsu', opciones: ['Leyenda', 'Historia real', 'Noticia', 'Chisme'], respuesta: 0 },
            { japones: 'もんかな', lectura: 'mon ka na', opciones: ['¿De verdad? (coloquial, duda)', '¡Claro que sí!', 'Absolutamente no', 'Tal vez'], respuesta: 0 },
            { japones: '今夜', lectura: 'kon\'ya', opciones: ['Esta noche', 'Esta mañana', 'Ayer', 'Mañana'], respuesta: 0 },
            { japones: '完璧', lectura: 'kanpeki', opciones: ['Perfección', 'Desastre', 'Normalidad', 'Mediocridad'], respuesta: 0 },
            { japones: '任務', lectura: 'ninmu', opciones: ['Misión/Tarea', 'Juego', 'Vacación', 'Sueño'], respuesta: 0 },
            { japones: '遂行', lectura: 'suikou', opciones: ['Cumplimiento', 'Abandono', 'Retraso', 'Planificación'], respuesta: 0 },
            { japones: '初体験と', lectura: 'hatsu taiken to', opciones: ['Con la primera experiencia', 'Con la última experiencia', 'Sin experiencia', 'Con mucha experiencia'], respuesta: 0 },
            { japones: 'いうことで', lectura: 'iu koto de', opciones: ['Así que... / Por lo tanto', 'Sin embargo', 'Además', 'Por ejemplo'], respuesta: 0 }
        ],
        
        6: [
            { japones: '最終日', lectura: 'saishuu bi', opciones: ['Día final', 'Primer día', 'Día festivo', 'Día ordinario'], respuesta: 0 },
            { japones: '両等分', lectura: 'ryoutou bun', opciones: ['División en dos partes iguales', 'División desigual', 'Unificación', 'Multiplicación'], respuesta: 0 }
        ],
        
        // ====================
        // MAZOS DIFÍCILES ESPECIALES - Subcontenedor 1.1
        // ====================
        
        'D1': [
            { japones: '難解な表現', lectura: 'nankai na hyougen', opciones: ['Expresión difícil', 'Expresión fácil', 'Expresión común', 'Expresión informal'], respuesta: 0 },
            { japones: '微妙なニュアンス', lectura: 'bimyou na nyuansu', opciones: ['Matiz sutil', 'Significado claro', 'Expresión directa', 'Palabra simple'], respuesta: 0 },
            { japones: '慣用句', lectura: 'kanyouku', opciones: ['Modismo', 'Palabra simple', 'Verbo compuesto', 'Adjetivo básico'], respuesta: 0 },
            { japones: '比喩的表現', lectura: 'hiyuteki hyougen', opciones: ['Expresión metafórica', 'Expresión literal', 'Expresión técnica', 'Expresión coloquial'], respuesta: 0 },
            { japones: '故事成語', lectura: 'koji seigo', opciones: ['Proverbio chino', 'Palabra moderna', 'Expresión juvenil', 'Término técnico'], respuesta: 0 },
            { japones: '四字熟語', lectura: 'yoji jukugo', opciones: ['Palabra de cuatro caracteres', 'Palabra de dos caracteres', 'Expresión extranjera', 'Término científico'], respuesta: 0 },
            { japones: '古典的表現', lectura: 'kotenteki hyougen', opciones: ['Expresión clásica', 'Expresión moderna', 'Jerga juvenil', 'Término de internet'], respuesta: 0 },
            { japones: '文語表現', lectura: 'bun-go hyougen', opciones: ['Lenguaje literario', 'Lenguaje hablado', 'Jerga', 'Dialecto'], respuesta: 0 },
            { japones: '抽象的表現', lectura: 'chuushouteki hyougen', opciones: ['Expresión abstracta', 'Expresión concreta', 'Descripción detallada', 'Instrucción clara'], respuesta: 0 },
            { japones: '複合動詞', lectura: 'fukugou doushi', opciones: ['Verbo compuesto', 'Verbo simple', 'Sustantivo', 'Adjetivo'], respuesta: 0 }
        ],
        
        'D2': [
            { japones: '擬態語', lectura: 'gitaigo', opciones: ['Palabra mimética (estado)', 'Onomatopeya (sonido)', 'Sustantivo', 'Verbo'], respuesta: 0 },
            { japones: '擬音語', lectura: 'giongo', opciones: ['Onomatopeya (sonido)', 'Palabra mimética (estado)', 'Adjetivo', 'Adverbio'], respuesta: 0 },
            { japones: '助詞の特殊用法', lectura: 'joshi no tokushu youhou', opciones: ['Uso especial de partículas', 'Uso básico de verbos', 'Conjugación simple', 'Orden de palabras básico'], respuesta: 0 },
            { japones: '尊敬語の複雑形', lectura: 'sonkeigo no fukuzatsukei', opciones: ['Forma compleja de lenguaje honorífico', 'Lenguaje casual', 'Lenguaje simple', 'Dialecto regional'], respuesta: 0 },
            { japones: '謙譲語の特殊形', lectura: 'kenjougo no tokushukei', opciones: ['Forma especial de lenguaje humilde', 'Lenguaje arrogante', 'Lenguaje neutral', 'Jerga juvenil'], respuesta: 0 },
            { japones: '丁寧語の変化形', lectura: 'teineigo no henkakei', opciones: ['Variante de lenguaje formal', 'Lenguaje informal', 'Lenguaje directo', 'Dialecto'], respuesta: 0 },
            { japones: '古語', lectura: 'kogo', opciones: ['Lenguaje antiguo', 'Lenguaje moderno', 'Lenguaje de internet', 'Jerga'], respuesta: 0 },
            { japones: '漢文調表現', lectura: 'kanbunchou hyougen', opciones: ['Estilo de chino clásico', 'Estilo moderno', 'Estilo coloquial', 'Estilo técnico'], respuesta: 0 },
            { japones: '和製漢語', lectura: 'wasei kango', opciones: ['Palabras chinas creadas en Japón', 'Palabras extranjeras', 'Palabras nativas japonesas', 'Neologismos'], respuesta: 0 },
            { japones: '難読漢字', lectura: 'nandoku kanji', opciones: ['Kanji de lectura difícil', 'Kanji básico', 'Hiragana', 'Katakana'], respuesta: 0 }
        ]
    },

    // Sub-contenedor 1.2
    'sub1_2': {
        // MAZOS NORMALES
        1: [
            { japones: 'よかった', lectura: 'yokatta', opciones: ['Fue bueno/estuvo bien/se sintió bien', 'Fue terrible', 'Fue aburrido', 'Fue sorprendente'], respuesta: 0 },
            { japones: '久々', lectura: 'hisabisa', opciones: ['Después de mucho tiempo', 'Todos los días', 'Por primera vez', 'Por última vez'], respuesta: 0 },
            { japones: 'いくら', lectura: 'ikura', opciones: ['Por mucho que', 'Por poco que', 'A pesar de que', 'Debido a que'], respuesta: 0 },
            { japones: '羽', lectura: 'hane', opciones: ['Ala(s) (en expresión idiomática)', 'Pata(s)', 'Mano(s)', 'Cabeza'], respuesta: 0 },
            { japones: '伸ばせた', lectura: 'nobaseta', opciones: ['Pude estirar/pude extender', 'No pude hacerlo', 'Pude contraer', 'Pude doblar'], respuesta: 0 },
            { japones: '来れば', lectura: 'kureba', opciones: ['Si hubieran venido (condicional)', 'Cuando vendrán', 'Aunque vinieron', 'Porque vinieron'], respuesta: 0 },
            { japones: '子たち', lectura: 'kotachi', opciones: ['Niñas', 'Niños', 'Hombres', 'Mujeres'], respuesta: 0 },
            { japones: '見切りつけても', lectura: 'mikiritsukete mo', opciones: ['Aunque corte lazos', 'Aunque me reúna', 'Aunque ayude', 'Aunque espere'], respuesta: 0 },
            { japones: '祝福する', lectura: 'shukufuku suru', opciones: ['Bendecir', 'Maldir', 'Criticar', 'Ignorar'], respuesta: 0 },
            { japones: 'と言っても', lectura: 'to itte mo', opciones: ['Aunque diga', 'Porque digo', 'Si digo', 'Mientras digo'], respuesta: 0 }
        ],
        
        2: [
            { japones: '早々に', lectura: 'sōsō ni', opciones: ['Rápidamente', 'Lentamente', 'Cuidadosamente', 'Accidentalmente'], respuesta: 0 },
            { japones: '受け入れていく', lectura: 'ukeirete iku', opciones: ['Aceptar gradualmente', 'Rechazar por completo', 'Ignorar sistemáticamente', 'Cambiar constantemente'], respuesta: 0 },
            { japones: '今頃', lectura: 'imagoro', opciones: ['Ahora mismo/a estas alturas', 'Hace mucho tiempo', 'Más tarde', 'Temprano'], respuesta: 0 },
            { japones: '卒業旅行', lectura: 'sotsugyō ryokō', opciones: ['Viaje de graduación', 'Viaje de negocios', 'Viaje de placer', 'Viaje familiar'], respuesta: 0 },
            { japones: '踏ん切りついてない', lectura: 'fun kiritsuite nai', opciones: ['No has podido decidirte', 'Ya decidiste', 'Estás reconsiderando', 'Cambiaste de opinión'], respuesta: 0 },
            { japones: 'あったりまえ', lectura: 'attarimae', opciones: ['Obvio/por supuesto', 'Increíble', 'Dudoso', 'Imposible'], respuesta: 0 },
            { japones: 'こうして', lectura: 'kō shite', opciones: ['De esta manera', 'De otra manera', 'Por casualidad', 'Intencionalmente'], respuesta: 0 },
            { japones: '傷', lectura: 'kizu', opciones: ['Herida', 'Cicatriz', 'Cura', 'Medicamento'], respuesta: 0 },
            { japones: '言い出しっぺ', lectura: 'iidashippe', opciones: ['La que lo propuso', 'La que se opuso', 'La que dudó', 'La que ignoró'], respuesta: 0 },
            { japones: 'くせに', lectura: 'kuse ni', opciones: ['A pesar de eso', 'Debido a eso', 'Además de eso', 'Antes de eso'], respuesta: 0 }
        ],
        
        3: [
            { japones: '仕方ない', lectura: 'shikata nai', opciones: ['No se puede evitar', 'Es fácil', 'Es posible', 'Es necesario'], respuesta: 0 },
            { japones: '結構', lectura: 'kekkō', opciones: ['Bastante', 'Poco', 'Nada', 'Demasiado'], respuesta: 0 },
            { japones: '悪い', lectura: 'warui', opciones: ['Malo', 'Bueno', 'Regular', 'Excelente'], respuesta: 0 },
            { japones: '薬', lectura: 'kusuri', opciones: ['Medicina', 'Veneno', 'Alimento', 'Bebida'], respuesta: 0 },
            { japones: '盛ったり', lectura: 'morittari', opciones: ['Ponerle (en la bebida)', 'Quitarle', 'Mezclar', 'Servir'], respuesta: 0 },
            { japones: 'キツイ', lectura: 'kitsui', opciones: ['Duro/difícil', 'Fácil', 'Suave', 'Ligero'], respuesta: 0 },
            { japones: '辛気臭い', lectura: 'shinkusai', opciones: ['Deprimente', 'Alegre', 'Emocionante', 'Relajante'], respuesta: 0 },
            { japones: 'エンジョイ', lectura: 'enjoi', opciones: ['Disfrutar', 'Sufrir', 'Ignorar', 'Temer'], respuesta: 0 }
        ],
        
        4: [
            { japones: '女優', lectura: 'joyū', opciones: ['Actriz', 'Actor', 'Modelo', 'Cantante'], respuesta: 0 },
            { japones: '良ければ', lectura: 'yokereba', opciones: ['Si no le molesta / si está bien', 'Si no le gusta', 'Si le molesta', 'Si está mal'], respuesta: 0 },
            { japones: '混ぜて', lectura: 'mazete', opciones: ['Mezclar / unir', 'Separar', 'Dividir', 'Seleccionar'], respuesta: 0 },
            { japones: 'なれる', lectura: 'nareru', opciones: ['Poder convertirse', 'Perderse', 'Olvidarse', 'Renunciar'], respuesta: 0 },
            { japones: '寂しかった', lectura: 'sabishikatta', opciones: ['Estábamos solas', 'Estábamos felices', 'Estábamos ocupadas', 'Estábamos enojadas'], respuesta: 0 },
            { japones: '歓迎', lectura: 'kangei', opciones: ['Bienvenidos', 'Despedida', 'Prohibición', 'Advertencia'], respuesta: 0 },
            { japones: '言う通り', lectura: 'iu tōri', opciones: ['Tal como dice', 'Contrario a lo que dice', 'Más de lo que dice', 'Menos de lo que dice'], respuesta: 0 },
            { japones: '済む', lectura: 'sumu', opciones: ['Terminar / salir con la suya', 'Comenzar', 'Continuar', 'Cancelar'], respuesta: 0 },
            { japones: '塞ぐ', lectura: 'fusagu', opciones: ['Tapar / cerrar', 'Abrir', 'Limpiar', 'Romper'], respuesta: 0 },
            { japones: '喉奥', lectura: 'nodo oku', opciones: ['Fondo de la garganta', 'Parte delantera', 'Lateral', 'Exterior'], respuesta: 0 }
        ],
        
        5: [
            { japones: '容赦', lectura: 'yōsha', opciones: ['Piedad / misericordia', 'Crueldad', 'Indiferencia', 'Justicia'], respuesta: 0 },
            { japones: 'つっこんで', lectura: 'tsukkonde', opciones: ['Metiendo / empujando adentro', 'Sacando', 'Rozando', 'Observando'], respuesta: 0 },
            { japones: '響いて', lectura: 'hibiite', opciones: ['Resonando / vibrando', 'Silenciando', 'Deteniendo', 'Atenuando'], respuesta: 0 },
            { japones: '苦しい', lectura: 'kurushii', opciones: ['Doloroso / agobiante', 'Placentero', 'Neutro', 'Emocionante'], respuesta: 0 },
            { japones: 'きかない', lectura: 'kikanai', opciones: ['No escucha / no obedece', 'Escucha bien', 'Responde rápido', 'Siempre acepta'], respuesta: 0 },
            { japones: '飲み込め', lectura: 'nomikome', opciones: ['Trágatelo / ingírelo', 'Escúpelo', 'Guárdalo', 'Compartelo'], respuesta: 0 },
            { japones: 'お詫び', lectura: 'owabi', opciones: ['Disculpa / compensación', 'Agradecimiento', 'Demanda', 'Elogio'], respuesta: 0 },
            { japones: '拒絶', lectura: 'kyūzetsu', opciones: ['Rechazo / rechazar', 'Aceptación', 'Consideración', 'Negociación'], respuesta: 0 },
            { japones: '奴', lectura: 'yatsu', opciones: ['Tipo / cabrón (despectivo)', 'Amigo', 'Jefe', 'Desconocido'], respuesta: 0 },
            { japones: '感じて', lectura: 'kanjite', opciones: ['Sintiendo / excitándome', 'Ignorando', 'Negando', 'Olvidando'], respuesta: 0 }
        ],
        
        6: [
            { japones: 'とろけた', lectura: 'toroketa', opciones: ['Derretida / embobada', 'Tensa', 'Enojada', 'Indiferente'], respuesta: 0 },
            { japones: 'しちゃって', lectura: 'shichatte', opciones: ['Terminé haciendo (arrepentimiento casual)', 'Planeé hacer', 'Evité hacer', 'Olvidé hacer'], respuesta: 0 },
            { japones: '軽イキ', lectura: 'karu iki', opciones: ['Orgasmo ligero / corrida suave', 'Orgasmo intenso', 'Sin orgasmo', 'Dolor'], respuesta: 0 },
            { japones: '触って', lectura: 'sawatte', opciones: ['Tocando', 'Evitando', 'Mirando', 'Escuchando'], respuesta: 0 },
            { japones: '重っ', lectura: 'omo', opciones: ['Pesado (abreviado, énfasis)', 'Ligero', 'Suave', 'Rápido'], respuesta: 0 },
            { japones: 'ふに', lectura: 'funi', opciones: ['Blandito', 'Duro', 'Caliente', 'Frío'], respuesta: 0 },
            { japones: 'すべすべ', lectura: 'subesube', opciones: ['Suave / sedoso', 'Áspero', 'Rugoso', 'Húmedo'], respuesta: 0 },
            { japones: 'コリコリ', lectura: 'korikori', opciones: ['Duro / crujiente (textura)', 'Blando', 'Elástico', 'Gelatinoso'], respuesta: 0 },
            { japones: '乳首', lectura: 'chikubi', opciones: ['Pezón', 'Pecho', 'Estómago', 'Espalda'], respuesta: 0 },
            { japones: 'いじめ', lectura: 'ijime', opciones: ['Jugar / torturar / molestar', 'Cuidar', 'Proteger', 'Ignorar'], respuesta: 0 }
        ],
        
        7: [
            { japones: '硬く', lectura: 'kataku', opciones: ['Duro', 'Blando', 'Flexible', 'Frágil'], respuesta: 0 },
            { japones: '洪水', lectura: 'kōzui', opciones: ['Inundación / flood', 'Sequía', 'Lluvia ligera', 'Viento'], respuesta: 0 },
            { japones: '頂こう', lectura: 'itadakō', opciones: ['Recibir / probar (humilde)', 'Rechazar', 'Ofrecer', 'Compartir'], respuesta: 0 },
            { japones: '許さ', lectura: 'yurusa', opciones: ['Perdonar', 'Castigar', 'Ignorar', 'Recordar'], respuesta: 0 },
            { japones: '放し', lectura: 'hanashi', opciones: ['Soltar / dejar', 'Agarar', 'Esconder', 'Mover'], respuesta: 0 },
            { japones: '強気', lectura: 'tsuyoki', opciones: ['Altiva / valiente', 'Tímida', 'Indecisa', 'Sumisa'], respuesta: 0 },
            { japones: '拒否', lectura: 'kyohi', opciones: ['Negar / rechazar', 'Aceptar', 'Considerar', 'Posponer'], respuesta: 0 },
            { japones: '割に', lectura: 'wari ni', opciones: ['A pesar de / para', 'Debido a', 'Además de', 'En vez de'], respuesta: 0 },
            { japones: '締め付けて', lectura: 'shimetsukete', opciones: ['Apretando / estrangulando', 'Soltando', 'Acariciando', 'Golpeando'], respuesta: 0 },
            { japones: 'きゅうきゅうきゅう', lectura: 'kyū kyū kyū', opciones: ['Onomatopeya de apretar fuerte', 'Sonido suave', 'Silencio', 'Grito'], respuesta: 0 }
        ],
        
        8: [
            { japones: '融け', lectura: 'toke', opciones: ['Derretir', 'Congelar', 'Evaporar', 'Solidificar'], respuesta: 0 },
            { japones: '徹底的', lectura: 'tetteiteki', opciones: ['Exhaustivamente / a fondo', 'Superficialmente', 'Parcialmente', 'Ocasionalmente'], respuesta: 0 },
            { japones: '開拓', lectura: 'kaitaku', opciones: ['Desarrollar / abrir terreno', 'Abandonar', 'Destruir', 'Conservar'], respuesta: 0 },
            { japones: '犯された', lectura: 'okasareta', opciones: ['Fui violada / forzada', 'Consentí', 'Resistí', 'Ignoré'], respuesta: 0 },
            { japones: '野郎', lectura: 'yarō', opciones: ['Cabrón / tipo', 'Caballero', 'Amigo', 'Extraño'], respuesta: 0 },
            { japones: 'ひだひだ', lectura: 'hida hida', opciones: ['Pliegues / rugosidades', 'Superficie lisa', 'Cavidad', 'Protuberancia'], respuesta: 0 },
            { japones: '吸いついて', lectura: 'kuitsuite', opciones: ['Chupando / succionando', 'Soplando', 'Mordiendo', 'Lamiendo'], respuesta: 0 },
            { japones: '抜き', lectura: 'nuki', opciones: ['Sacar / retirar', 'Insertar', 'Mantener', 'Rotar'], respuesta: 0 },
            { japones: 'なさい', lectura: 'nasai', opciones: ['Haz (imperativo formal)', 'No hagas', 'Quizás hagas', 'Deja de hacer'], respuesta: 0 },
            { japones: '弱点', lectura: 'jakuten', opciones: ['Punto débil', 'Fortaleza', 'Neutralidad', 'Ventaja'], respuesta: 0 }
        ],
        
        9: [
            { japones: '感度', lectura: 'kando', opciones: ['Sensibilidad', 'Insensibilidad', 'Resistencia', 'Dureza'], respuesta: 0 },
            { japones: '良すぎ', lectura: 'yosugi', opciones: ['Demasiado buena', 'Muy mala', 'Normal', 'Insuficiente'], respuesta: 0 },
            { japones: '表情', lectura: 'hyōjō', opciones: ['Expresión / cara', 'Voz', 'Postura', 'Movimiento'], respuesta: 0 },
            { japones: '圧倒', lectura: 'attō', opciones: ['Abrumada / dominada', 'Liberada', 'Indiferente', 'Resistente'], respuesta: 0 },
            { japones: '腰', lectura: 'koshi', opciones: ['Caderas', 'Hombros', 'Rodillas', 'Codos'], respuesta: 0 },
            { japones: 'つぷれっ', lectura: 'tsupure', opciones: ['Onomatopeya de sonido húmedo', 'Sonido seco', 'Silencio', 'Crujido'], respuesta: 0 },
            { japones: '犯し', lectura: 'okashi', opciones: ['Violar / forzar', 'Consentir', 'Respetar', 'Ignorar'], respuesta: 0 },
            { japones: '尽くして', lectura: 'tsukushite', opciones: ['Hasta el final / completamente', 'A medias', 'Superficialmente', 'Nunca'], respuesta: 0 },
            { japones: '喘が', lectura: 'aega', opciones: ['Jadear / gemir alto', 'Respirar tranquilo', 'Contener la respiración', 'Silbar'], respuesta: 0 },
            { japones: 'もし', lectura: 'moshi', opciones: ['Si', 'Cuando', 'Aunque', 'Porque'], respuesta: 0 }
        ],
        
        10: [
            { japones: 'イったら', lectura: 'ittara', opciones: ['Si te corres', 'Si te detienes', 'Si comienzas', 'Si esperas'], respuesta: 0 },
            { japones: '安心して', lectura: 'anshin shite', opciones: ['Tranquilízate', 'Preocúpate', 'Alerta', 'Escapa'], respuesta: 0 },
            { japones: 'なければ', lectura: 'nakereba', opciones: ['Si no', 'Si sí', 'Aunque', 'Porque'], respuesta: 0 },
            { japones: '抜く', lectura: 'nuku', opciones: ['Sacar', 'Meter', 'Girar', 'Presionar'], respuesta: 0 },
            { japones: 'それとも', lectura: 'soretomo', opciones: ['O / ¿o es que...?', 'Y también', 'Pero', 'Por lo tanto'], respuesta: 0 },
            { japones: '怖気づい', lectura: 'okinizui', opciones: ['Acobardarse / asustarse', 'Envalentonarse', 'Relajarse', 'Sorprenderse'], respuesta: 0 },
            { japones: 'だった', lectura: 'datta', opciones: ['Eras', 'Eres', 'Serás', 'Fui'], respuesta: 0 },
            { japones: 'のに', lectura: 'noni', opciones: ['Aunque / y sin embargo', 'Porque', 'Si', 'Mientras'], respuesta: 0 },
            { japones: 'やってみなさいよ', lectura: 'yatte minasai yo', opciones: ['Inténtalo / hazlo', 'No lo hagas', 'Espera', 'Pregunta'], respuesta: 0 },
            { japones: '燃えて', lectura: 'moete', opciones: ['Encendiéndose / ardiendo', 'Apagándose', 'Enfriándose', 'Humededeciéndose'], respuesta: 0 }
        ],
        
        11: [
            { japones: 'せいぜい', lectura: 'seizei', opciones: ['Todo lo que puedas / al máximo', 'Mínimamente', 'Normalmente', 'Excesivamente'], respuesta: 0 },
            { japones: '無様', lectura: 'busamu', opciones: ['Patético / vergonzoso', 'Honroso', 'Normal', 'Desconocido'], respuesta: 0 },
            { japones: '振って', lectura: 'futte', opciones: ['Moviendo / embistiendo', 'Deteniendo', 'Suavizando', 'Dirigiendo'], respuesta: 0 },
            { japones: 'ビクビク', lectura: 'bikubiku', opciones: ['Temblar / convulsionar', 'Estar quieto', 'Relajarse', 'Saltar'], respuesta: 0 },
            { japones: '痙攣', lectura: 'keikan', opciones: ['Espasmo / convulsión', 'Relajación', 'Calma', 'Rigidez'], respuesta: 0 },
            { japones: 'させて', lectura: 'sasete', opciones: ['Haciendo que...', 'Impidiendo que...', 'Permitiendo que...', 'Observando que...'], respuesta: 0 },
            { japones: 'やかましい', lectura: 'yakamashii', opciones: ['Ruidoso / escandaloso', 'Silencioso', 'Tranquilo', 'Monótono'], respuesta: 0 },
            { japones: '喘ぎ声', lectura: 'aegi goe', opciones: ['Voz de jadeos / gemidos', 'Voz tranquila', 'Gritos', 'Silencio'], respuesta: 0 },
            { japones: '出ちゃって', lectura: 'dechatte', opciones: ['Terminando saliendo (involuntario)', 'Conteniendo', 'Evitando', 'Retrasando'], respuesta: 0 },
            { japones: '気に入って', lectura: 'ki ni itte', opciones: ['Gustar / encantar', 'Disgustar', 'Ignorar', 'Criticar'], respuesta: 0 }
        ],
        
        12: [
            { japones: '気持ちよくなんか', lectura: 'kimochi yoku nanka', opciones: ['Placentero / cómodo', 'Desagradable', 'Doloroso', 'Indiferente'], respuesta: 0 },
            { japones: '説得力', lectura: 'settokuryoku', opciones: ['Credibilidad / poder de convicción', 'Incredulidad', 'Debilidad', 'Indiferencia'], respuesta: 0 },
            { japones: 'しっかり', lectura: 'shikkari', opciones: ['Bien / a fondo / seguro', 'Débilmente', 'Superficialmente', 'Inseguramente'], respuesta: 0 },
            { japones: '孕んで', lectura: 'harande', opciones: ['Quedar embarazada', 'Evitar embarazo', 'Abortar', 'Dar a luz'], respuesta: 0 },
            { japones: '一発', lectura: 'ippatsu', opciones: ['Una vez / una corrida', 'Muchas veces', 'Nunca', 'Rápidamente'], respuesta: 0 },
            { japones: 'とりあえず', lectura: 'toriaezu', opciones: ['Por ahora / de momento', 'Definitivamente', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: 'びちびち', lectura: 'bichi bichi', opciones: ['Onomatopeya de salpicar / pulsar', 'Silencio', 'Sonido seco', 'Crujido'], respuesta: 0 },
            { japones: '締め付け', lectura: 'shime tsuke', opciones: ['Apretón / estrangulamiento', 'Soltura', 'Liberación', 'Expansión'], respuesta: 0 },
            { japones: 'ゆるして', lectura: 'yurushite', opciones: ['Perdona / déjame', 'Castiga', 'Ignora', 'Detén'], respuesta: 0 },
            { japones: 'バッキバキ', lectura: 'bakki baki', opciones: ['Onomatopeya de erección súper dura', 'Flácido', 'Suave', 'Flexible'], respuesta: 0 }
        ],
        
        13: [
            { japones: 'さっきから', lectura: 'sakki kara', opciones: ['Desde hace rato', 'Recién ahora', 'Más tarde', 'Nunca'], respuesta: 0 },
            { japones: '部屋', lectura: 'heya', opciones: ['Habitación', 'Cocina', 'Baño', 'Jardín'], respuesta: 0 },
            { japones: '助けて', lectura: 'tasukete', opciones: ['¡Ayúdame!', '¡Déjame!', '¡Ignórame!', '¡Detente!'], respuesta: 0 }
        ],
        
        14: [
            { japones: '抱いて', lectura: 'daite', opciones: ['Abrazar / Follar', 'Empujar', 'Ignorar', 'Observar'], respuesta: 0 },
            { japones: '比べ物', lectura: 'kurabemono', opciones: ['Comparación', 'Superioridad', 'Inferioridad', 'Igualdad'], respuesta: 0 },
            { japones: 'ならん', lectura: 'naran', opciones: ['No hay / No se compara', 'Sí hay', 'Tal vez', 'Definitivamente'], respuesta: 0 },
            { japones: 'くらい', lectura: 'kurai', opciones: ['Tanto / Al grado de', 'Poco', 'Nada', 'Demasiado'], respuesta: 0 },
            { japones: '名器', lectura: 'meiki', opciones: ['Vagina legendaria / Perfecta', 'Normal', 'Pequeña', 'Cerrada'], respuesta: 0 },
            { japones: '堕とされ', lectura: 'otosare', opciones: ['Ser corrompida / Caer (pasivo)', 'Resistir', 'Escapar', 'Ignorar'], respuesta: 0 },
            { japones: 'ちゃった', lectura: 'chatta', opciones: ['Terminé (involuntario)', 'Planeé', 'Evité', 'Olvidé'], respuesta: 0 },
            { japones: '潰して', lectura: 'tsubushite', opciones: ['Destrozar / Aplastar', 'Construir', 'Reparar', 'Proteger'], respuesta: 0 },
            { japones: '頭飛んじゃうんだぁ', lectura: 'atama tonjan daa', opciones: ['La cabeza va a volar', 'Estoy tranquilo', 'No entiendo', 'Me duele'], respuesta: 0 },
            { japones: 'いやな', lectura: 'iya na', opciones: ['Desagradable / Malas', 'Agradable', 'Neutral', 'Excelente'], respuesta: 0 }
        ],
        
        15: [
            { japones: 'さっきの奴のより', lectura: 'sakki no yatsu no yori', opciones: ['Más que el de hace un rato', 'Menos que el anterior', 'Igual que siempre', 'Totalmente diferente'], respuesta: 0 },
            { japones: '一回り', lectura: 'hitomawari', opciones: ['Un tamaño / Un círculo', 'La mitad', 'El doble', 'Minúsculo'], respuesta: 0 },
            { japones: '大きい', lectura: 'ōkii', opciones: ['Grande', 'Pequeño', 'Mediano', 'Enorme'], respuesta: 0 },
            { japones: '素直', lectura: 'sunao', opciones: ['Honesta / Sincera', 'Mentirosa', 'Tímida', 'Agresiva'], respuesta: 0 },
            { japones: '遠慮', lectura: 'enryo', opciones: ['Reserva / Cortesía', 'Atrevimiento', 'Indiferencia', 'Insistencia'], respuesta: 0 },
            { japones: '尋常', lectura: 'jinjō', opciones: ['Normal / Ordinario', 'Extraordinario', 'Raro', 'Típico'], respuesta: 0 },
            { japones: '臭い', lectura: 'kusai', opciones: ['Olor / Huele a', 'Inodoro', 'Fragante', 'Dulce'], respuesta: 0 },
            { japones: 'オス', lectura: 'osu', opciones: ['Macho / Varón (animal)', 'Hembra', 'Joven', 'Adulto'], respuesta: 0 },
            { japones: '考え', lectura: 'kangae', opciones: ['Pensar', 'Olvidar', 'Ignorar', 'Recordar'], respuesta: 0 },
            { japones: '堕ち', lectura: 'ochi', opciones: ['Caída / Corrupción', 'Elevación', 'Pureza', 'Inocencia'], respuesta: 0 }
        ],
        
        16: [
            { japones: '偉い', lectura: 'erai', opciones: ['Grande / Obediente / Buena', 'Mala', 'Pequena', 'Desobediente'], respuesta: 0 },
            { japones: 'ご褒美上げないと', lectura: 'gohōbi agenai to', opciones: ['Si no te doy una recompensa', 'Te castigaré', 'Te ignoraré', 'Te felicitaré'], respuesta: 0 },
            { japones: '花嫁', lectura: 'hanayome', opciones: ['Novia / Esposa', 'Novio', 'Amante', 'Amiga'], respuesta: 0 },
            { japones: '穴', lectura: 'ana', opciones: ['Agujero', 'Montaña', 'Puerta', 'Ventana'], respuesta: 0 },
            { japones: '使わせてもらお', lectura: 'tsukawasete moraō', opciones: ['Déjame usarlo', 'No lo uses', 'Guárdalo', 'Destrúyelo'], respuesta: 0 },
            { japones: '抜群', lectura: 'batsugun', opciones: ['Excelente / Perfecto', 'Pésimo', 'Normal', 'Mediocre'], respuesta: 0 },
            { japones: '女優', lectura: 'joyū', opciones: ['Actriz', 'Actor', 'Modelo', 'Cantante'], respuesta: 0 },
            { japones: 'こりゃ', lectura: 'korya', opciones: ['Esto es (slang)', 'Eso es', 'Aquello es', 'No es'], respuesta: 0 },
            { japones: 'つっても', lectura: 'tsutte mo', opciones: ['Aunque lo diga / Incluso diciendo', 'Porque lo digo', 'Si lo digo', 'Mientras lo digo'], respuesta: 0 },
            { japones: '喘げ', lectura: 'aegue', opciones: ['¡Gime! / ¡Jadea! (imperativo)', '¡Silencio!', '¡Habla!', '¡Canta!'], respuesta: 0 }
        ],
        
        17: [
            { japones: '淫乱', lectura: 'inran', opciones: ['Pervertida / Lasciva', 'Inocente', 'Modesta', 'Seria'], respuesta: 0 },
            { japones: '遊ばせてもーらおっと', lectura: 'asobasete mōraotto', opciones: ['Déjame jugar contigo', 'No juegues', 'Vete', 'Espera'], respuesta: 0 },
            { japones: '酷え', lectura: 'hidoe', opciones: ['Horrible / Brutal (slang)', 'Suave', 'Normal', 'Agradable'], respuesta: 0 },
            { japones: '最奥', lectura: 'saio', opciones: ['Lo más profundo', 'La superficie', 'El exterior', 'El borde'], respuesta: 0 },
            { japones: '屁', lectura: 'he', opciones: ['Pedo', 'Suspiro', 'Grito', 'Risa'], respuesta: 0 },
            { japones: '噴き出して', lectura: 'fukidashite', opciones: ['Salpicando / Erupcionando', 'Conteniendo', 'Absorbiendo', 'Secando'], respuesta: 0 },
            { japones: '出して', lectura: 'dashite', opciones: ['Sacar / Emitir', 'Guardar', 'Esconder', 'Tapar'], respuesta: 0 },
            { japones: '音', lectura: 'oto', opciones: ['Sonido', 'Silencio', 'Luz', 'Olor'], respuesta: 0 },
            { japones: 'お掃除', lectura: 'o-sōji', opciones: ['Limpieza (fellatio post-sexo)', 'Suciedad', 'Desorden', 'Construcción'], respuesta: 0 },
            { japones: '量', lectura: 'ryō', opciones: ['Cantidad / Volumen', 'Calidad', 'Peso', 'Tamaño'], respuesta: 0 }
        ],
        
        18: [
            { japones: 'えっぐ', lectura: 'eggu', opciones: ['Loca / Exagerada (slang)', 'Normal', 'Tranquila', 'Aburrida'], respuesta: 0 },
            { japones: 'おめーら', lectura: 'omēra', opciones: ['Vosotros (vulgar)', 'Ustedes (formal)', 'Ellos', 'Nosotros'], respuesta: 0 },
            { japones: 'モノ', lectura: 'mono', opciones: ['Cosa / Nivel / Calidad', 'Persona', 'Lugar', 'Tiempo'], respuesta: 0 },
            { japones: 'ちげぇ', lectura: 'chigē', opciones: ['Diferente (slang)', 'Igual', 'Similar', 'Opuesto'], respuesta: 0 },
            { japones: 'ぶっかけ', lectura: 'bukkake', opciones: ['Bukkake / Eyacular sobre', 'Absorber', 'Limpiar', 'Evitar'], respuesta: 0 },
            { japones: '過ぎて', lectura: 'sugite', opciones: ['Demasiado', 'Poco', 'Justo', 'Nada'], respuesta: 0 },
            { japones: '精子', lectura: 'seishi', opciones: ['Semen', 'Orina', 'Sudor', 'Sangre'], respuesta: 0 },
            { japones: 'フォンデュ', lectura: 'fondeyu', opciones: ['Fondue', 'Sopa', 'Ensalada', 'Postre'], respuesta: 0 },
            { japones: 'みたい', lectura: 'mitai', opciones: ['Como / Parece', 'Diferente', 'Igual', 'Opuesto'], respuesta: 0 },
            { japones: '相変わらず', lectura: 'aikawarazu', opciones: ['Como siempre', 'Diferente', 'Nuevo', 'Cambiado'], respuesta: 0 }
        ],
        
        19: [
            { japones: '無尽蔵', lectura: 'mujinzō', opciones: ['Inagotable / Infinito', 'Limitado', 'Escaso', 'Terminado'], respuesta: 0 },
            { japones: '何発', lectura: 'nan-patsu', opciones: ['Cuántas veces', 'Una vez', 'Muchas veces', 'Nunca'], respuesta: 0 },
            { japones: 'シバク', lectura: 'shibaku', opciones: ['Dar una paliza / Golpear', 'Acariciar', 'Ignorar', 'Proteger'], respuesta: 0 },
            { japones: 'ごぽ', lectura: 'gopo', opciones: ['(onomatopeya de fluido espeso saliendo o burbuja)', 'Silencio', 'Crujido', 'Chasquido'], respuesta: 0 },
            { japones: '幸せ', lectura: 'shiawase', opciones: ['Felices', 'Tristes', 'Enojadas', 'Asustadas'], respuesta: 0 },
            { japones: '私たち', lectura: 'watashitachi', opciones: ['Nosotras', 'Ellas', 'Ustedes', 'Vosotras'], respuesta: 0 },
            { japones: 'お嫁さん', lectura: 'oyomesan', opciones: ['Novia / Esposa', 'Novio', 'Amante', 'Hermana'], respuesta: 0 },
            { japones: 'チンボ様がいて', lectura: 'chinbo-sama ga ite', opciones: ['Hay un pene honorable', 'No hay nada', 'Hay una vagina', 'Hay un juguete'], respuesta: 0 },
            { japones: '子宮', lectura: 'shikyū', opciones: ['Útero', 'Ovario', 'Vagina', 'Pene'], respuesta: 0 },
            { japones: 'トクントクン', lectura: 'tokun tokun', opciones: ['(onomatopeya de latidos fuertes o palpitaciones)', 'Silencio', 'Sonido suave', 'Grito'], respuesta: 0 }
        ],
        
        20: [
            { japones: '来る', lectura: 'kuru', opciones: ['Venir', 'Ir', 'Quedarse', 'Esperar'], respuesta: 0 },
            { japones: 'ズボズボ', lectura: 'zubo zubo', opciones: ['(onomatopeya de penetración profunda y repetida)', 'Suavemente', 'Rápidamente', 'Lentamente'], respuesta: 0 },
            { japones: 'おねだり', lectura: 'onedari', opciones: ['Súplica / Pedir (sexualmente)', 'Rechazar', 'Ofrecer', 'Ignorar'], respuesta: 0 },
            { japones: '雄々しい', lectura: 'ooshii', opciones: ['Viril / Majestuoso / Macho', 'Femenino', 'Débil', 'Tímido'], respuesta: 0 },
            { japones: '弱々', lectura: 'yowayowa', opciones: ['Débil / Frágil', 'Fuerte', 'Resistente', 'Sólido'], respuesta: 0 },
            { japones: 'ずぼずぼ', lectura: 'zubo zubo', opciones: ['(onomatopeya de penetración profunda y repetida)', 'Superficialmente', 'Secamente', 'Suavemente'], respuesta: 0 },
            { japones: 'ください', lectura: 'kudasai', opciones: ['Por favor (formal)', 'No', 'Gracias', 'Adiós'], respuesta: 0 },
            { japones: 'ザー汁', lectura: 'zā jiru', opciones: ['Semen espeso (slang)', 'Agua', 'Jugo', 'Sangre'], respuesta: 0 },
            { japones: 'ぶち込んで', lectura: 'buchikonde', opciones: ['Meter a la fuerza / Inyectar', 'Sacar', 'Tocar', 'Lamer'], respuesta: 0 },
            { japones: '孕ませて', lectura: 'haramasete', opciones: ['Hacer embarazar', 'Evitar embarazo', 'Abortar', 'Dar a luz'], respuesta: 0 }
        ],
        
        21: [
            { japones: 'みちみち', lectura: 'michi michi', opciones: ['(onomatopeya de estirarse, llenarse al límite, rebosar)', 'Vacío', 'Medio lleno', 'Cerrado'], respuesta: 0 },
            { japones: '広げ', lectura: 'hiroge', opciones: ['Abrir / Ensanchar', 'Cerrar', 'Reducir', 'Tapar'], respuesta: 0 },
            { japones: '赤ちゃん', lectura: 'akachan', opciones: ['Bebé', 'Adulto', 'Anciano', 'Adolescente'], respuesta: 0 },
            { japones: '部屋', lectura: 'heya', opciones: ['Habitación (útero)', 'Cocina', 'Baño', 'Jardín'], respuesta: 0 },
            { japones: '叩き', lectura: 'tataki', opciones: ['Golpeando / Martilleando', 'Acariciando', 'Limpiando', 'Construyendo'], respuesta: 0 },
            { japones: '壊され', lectura: 'kowasare', opciones: ['Ser destruido (pasivo)', 'Construido', 'Reparado', 'Protegido'], respuesta: 0 },
            { japones: 'はげし', lectura: 'hageshi', opciones: ['Intenso / Violento', 'Suave', 'Lento', 'Tranquilo'], respuesta: 0 },
            { japones: '旦那様', lectura: 'danna-sama', opciones: ['Esposo / Señor (honorífico)', 'Amante', 'Extraño', 'Jefe'], respuesta: 0 },
            { japones: '頭', lectura: 'atama', opciones: ['Cabeza / Mente', 'Corazón', 'Estómago', 'Mano'], respuesta: 0 },
            { japones: 'とぶ', lectura: 'tobu', opciones: ['Volar', 'Caer', 'Gatear', 'Nadar'], respuesta: 0 }
        ],
        
        22: [
            { japones: '押し返さ', lectura: 'oshikaesa', opciones: ['Empujado de vuelta', 'Empujado hacia adelante', 'Detenido', 'Ignorado'], respuesta: 0 },
            { japones: 'れて', lectura: 'rete', opciones: ['Siendo (pasivo)', 'Haciendo', 'Viendo', 'Oyendo'], respuesta: 0 },
            { japones: '姉妹', lectura: 'shimai', opciones: ['Hermanas', 'Hermanos', 'Primas', 'Amigas'], respuesta: 0 },
            { japones: '揃って', lectura: 'sorotte', opciones: ['Juntas', 'Separadas', 'Solas', 'Alternando'], respuesta: 0 },
            { japones: '確実', lectura: 'kakujitsu', opciones: ['Sin falta / Seguramente', 'Quizás', 'Nunca', 'Raramente'], respuesta: 0 },
            { japones: '孕ませ', lectura: 'haramase', opciones: ['Hacer embarazar', 'Evitar embarazo', 'Abortar', 'Dar a luz'], respuesta: 0 },
            { japones: '一番', lectura: 'ichiban', opciones: ['Lo más / El número uno', 'El peor', 'El último', 'El promedio'], respuesta: 0 },
            { japones: '休ませなさいよ', lectura: 'yasumasenasai yo', opciones: ['Déjame descansar', 'Sigue trabajando', 'Apúrate', 'Espera'], respuesta: 0 },
            { japones: 'ぶちまけろ', lectura: 'buchimakero', opciones: ['Derrama / Inyecta a la fuerza (imperativo)', 'Contén', 'Limpia', 'Guarda'], respuesta: 0 },
            { japones: 'オナホ', lectura: 'onaho', opciones: ['Onahole (juguete sexual)', 'Vibrador', 'Condón', 'Lubricante'], respuesta: 0 }
        ],
        
        23: [
            { japones: '姉妹', lectura: 'shimai', opciones: ['Hermanas', 'Hermanos', 'Primas', 'Amigas'], respuesta: 0 },
            { japones: '中出し', lectura: 'nakadashi', opciones: ['Creampie', 'Coitus interruptus', 'Sexo anal', 'Masturbación'], respuesta: 0 },
            { japones: 'しすぎて', lectura: 'shisugite', opciones: ['Demasiado / En exceso', 'Poco', 'Justo', 'Nada'], respuesta: 0 },
            { japones: '子', lectura: 'ko', opciones: ['Hijo / Bebé', 'Padre', 'Madre', 'Abuelo'], respuesta: 0 },
            { japones: '汗', lectura: 'ase', opciones: ['Sudor', 'Sangre', 'Lágrimas', 'Saliva'], respuesta: 0 },
            { japones: '噴きだして', lectura: 'fukidashite', opciones: ['Disparando / Saliendo a chorros', 'Conteniendo', 'Absorbiendo', 'Secando'], respuesta: 0 },
            { japones: '風呂', lectura: 'furo', opciones: ['Baño', 'Cocina', 'Dormitorio', 'Sala'], respuesta: 0 },
            { japones: '入ったら', lectura: 'haittara', opciones: ['Cuando entremos', 'Cuando salgamos', 'Si no entramos', 'Aunque entremos'], respuesta: 0 },
            { japones: '輪姦', lectura: 'rinkan', opciones: ['Violación en grupo / Gangbang', 'Sexo consensuado', 'Masturbación', 'Abstinencia'], respuesta: 0 },
            { japones: '覚悟', lectura: 'kakugo', opciones: ['Prepárense / Resígnense', 'Relájense', 'Huyan', 'Ignoren'], respuesta: 0 }
        ],
        
        // ====================
        // MAZOS DIFÍCILES ESPECIALES - Subcontenedor 1.2
        // ====================
        
        'D1': [
            { japones: '婉曲表現', lectura: 'enkyoku hyougen', opciones: ['Expresión indirecta', 'Expresión directa', 'Expresión clara', 'Orden directa'], respuesta: 0 },
            { japones: '二重否定', lectura: 'nijuu hitei', opciones: ['Doble negación', 'Afirmación simple', 'Negación simple', 'Pregunta retórica'], respuesta: 0 },
            { japones: '倒置法', lectura: 'touchi hou', opciones: ['Inversión del orden de palabras', 'Orden normal', 'Repetición', 'Elipsis'], respuesta: 0 },
            { japones: '省略表現', lectura: 'shouryaku hyougen', opciones: ['Expresión abreviada', 'Expresión completa', 'Expresión formal', 'Expresión detallada'], respuesta: 0 },
            { japones: '間接話法', lectura: 'kansetsu wahou', opciones: ['Estilo indirecto', 'Estilo directo', 'Estilo formal', 'Estilo coloquial'], respuesta: 0 },
            { japones: '体言止め', lectura: 'taigandome', opciones: ['Terminación con sustantivo', 'Terminación con verbo', 'Terminación con partícula', 'Frase incompleta'], respuesta: 0 },
            { japones: '枕詞', lectura: 'makura kotoba', opciones: ['Palabra prefijada (en poesía)', 'Sustantivo simple', 'Verbo auxiliar', 'Partícula final'], respuesta: 0 },
            { japones: '掛詞', lectura: 'kake kotoba', opciones: ['Juego de palabras/palabra con doble sentido', 'Palabra simple', 'Sinónimo', 'Antónimo'], respuesta: 0 },
            { japones: '縁語', lectura: 'engo', opciones: ['Palabras relacionadas temáticamente', 'Palabras sin relación', 'Sinónimos', 'Antónimos'], respuesta: 0 },
            { japones: '序詞', lectura: 'jo kotoba', opciones: ['Prefacio poético', 'Conclusión', 'Cuerpo principal', 'Título'], respuesta: 0 }
        ],
        
        'D2': [
            { japones: '和歌の修辞法', lectura: 'waka no shuujihou', opciones: ['Recursos retóricos del waka', 'Lenguaje cotidiano', 'Lenguaje técnico', 'Jerga moderna'], respuesta: 0 },
            { japones: '俳句の季語', lectura: 'haiku no kigo', opciones: ['Palabra de estación en haiku', 'Palabra neutral', 'Palabra técnica', 'Neologismo'], respuesta: 0 },
            { japones: '連歌', lectura: 'renga', opciones: ['Poema encadenado', 'Haiku individual', 'Tanka individual', 'Poema moderno'], respuesta: 0 },
            { japones: '歌枕', lectura: 'utamakura', opciones: ['Lugar famoso en poesía', 'Lugar común', 'Lugar histórico', 'Lugar ficticio'], respuesta: 0 },
            { japones: '本歌取り', lectura: 'honkadori', opciones: ['Alusión a un poema clásico', 'Creación original', 'Traducción', 'Parodia'], respuesta: 0 },
            { japones: '古今伝授', lectura: 'kokindenju', opciones: ['Transmisión secreta de poesía', 'Enseñanza pública', 'Autoaprendizaje', 'Traducción'], respuesta: 0 },
            { japones: '幽玄', lectura: 'yuugen', opciones: ['Profundidad misteriosa (estética)', 'Simplicidad', 'Claridad', 'Directo'], respuesta: 0 },
            { japones: 'わび', lectura: 'wabi', opciones: ['Belleza en la simplicidad', 'Lujo', 'Ostentación', 'Modernidad'], respuesta: 0 },
            { japones: 'さび', lectura: 'sabi', opciones: ['Belleza del desgaste/pasado', 'Novedad', 'Brillo', 'Colorido'], respuesta: 0 },
            { japones: '不易流行', lectura: 'fueki ryuukou', opciones: ['Lo eterno y lo contemporáneo (estética)', 'Tradicionalismo', 'Modernismo', 'Eclecticismo'], respuesta: 0 }
        ]
    },
    
    /// Sub-contenedor 1.3
'sub1_3': {
    // MAZOS NORMALES
    1: [
        { japones: '付き合ってん', lectura: 'tsukiatte n', opciones: ['Están saliendo', 'Están peleando', 'Están trabajando', 'Están estudiando'], respuesta: 0 },
        { japones: 'なんだかんだで', lectura: 'nandakanda de', opciones: ['Al fin y al cabo', 'De repente', 'Por casualidad', 'De ninguna manera'], respuesta: 0 },
        { japones: '絡んでる', lectura: 'karande ru', opciones: ['Se meten / Interactúan (contracción)', 'Se ignoran', 'Se evitan', 'Se ayudan'], respuesta: 0 },
        { japones: '態度', lectura: 'taido', opciones: ['Actitud', 'Habilidad', 'Conocimiento', 'Experiencia'], respuesta: 0 },
        { japones: '仮に', lectura: 'kari ni', opciones: ['Aunque / Suponiendo que', 'Definitivamente', 'Raramente', 'Normalmente'], respuesta: 0 },
        { japones: '様子', lectura: 'yōsu', opciones: ['Apariencia / Actitud', 'Edad', 'Altura', 'Peso'], respuesta: 0 },
        { japones: 'うまく', lectura: 'umaku', opciones: ['Bien', 'Mal', 'Rápido', 'Lento'], respuesta: 0 },
        { japones: 'いってねー', lectura: 'itte nē', opciones: ['No va', 'Va bien', 'Es fácil', 'Es difícil'], respuesta: 0 },
        { japones: 'よ', lectura: 'yo', opciones: ['¿Sabes? (partícula enfática)', '¿Entiendes?', '¿Verdad?', '¿No?'], respuesta: 0 },
        { japones: '昼休み', lectura: 'hiruyasumi', opciones: ['Hora del almuerzo / Recreo', 'Hora de trabajo', 'Hora de estudio', 'Hora de dormir'], respuesta: 0 }
    ],
    
    2: [
        { japones: '流石に', lectura: 'sasuga ni', opciones: ['Lógico / Claro', 'Sorprendentemente', 'Por casualidad', 'Raramente'], respuesta: 0 },
        { japones: '足', lectura: 'ashi', opciones: ['Piernas', 'Brazos', 'Cabeza', 'Mano'], respuesta: 0 },
        { japones: 'どけて', lectura: 'dokete', opciones: ['Quita / Aparta (imperativo)', 'Pon', 'Dale', 'Espera'], respuesta: 0 },
        { japones: 'おい少し落ち', lectura: 'oi sukoshi ochi', opciones: ['Oye cálmate un poco', 'Oye apúrate', 'Oye espera', 'Oye ven aquí'], respuesta: 0 },
        { japones: '赤ちゃんデデちゃう', lectura: 'akachan dedechau', opciones: ['Se hace bebé (onomatopeya)', 'Llora fuerte', 'Se ríe', 'Duerme'], respuesta: 0 },
        { japones: '一度', lectura: 'ichido', opciones: ['Una vez', 'Dos veces', 'Muchas veces', 'Nunca'], respuesta: 0 },
        { japones: '練習', lectura: 'renshū', opciones: ['Practicar', 'Estudiar', 'Trabajar', 'Descansar'], respuesta: 0 },
        { japones: '経験豊富', lectura: 'keiken hōfu', opciones: ['Experimentada', 'Principiante', 'Inexperta', 'Intermedia'], respuesta: 0 },
        { japones: 'リード', lectura: 'rīdo', opciones: ['Liderar / Guiar', 'Seguir', 'Observar', 'Esperar'], respuesta: 0 },
        { japones: '安心', lectura: 'anshin', opciones: ['Tranquilidad', 'Ansiedad', 'Miedo', 'Emoción'], respuesta: 0 }
    ],
    
    3: [
        { japones: '甘い', lectura: 'amai', opciones: ['Ingenuo / Dulce', 'Salado', 'Amargo', 'Ácido'], respuesta: 0 },
        { japones: 'キステク', lectura: 'kisu teku', opciones: ['Técnica de beso', 'Técnica de hablar', 'Técnica de baile', 'Técnica de canto'], respuesta: 0 },
        { japones: '悩殺', lectura: 'nōsatsu', opciones: ['Seducir fatalmente', 'Ignorar', 'Rechazar', 'Asustar'], respuesta: 0 },
        { japones: 'みたら', lectura: 'mitara', opciones: ['Si pruebo', 'Si veo', 'Si escucho', 'Si huelo'], respuesta: 0 },
        { japones: '3秒', lectura: 'sanbyō', opciones: ['3 segundos', '3 minutos', '3 horas', '3 días'], respuesta: 0 },
        { japones: '堕ちた', lectura: 'ochita', opciones: ['Cayó / Se rindió', 'Resistió', 'Ganó', 'Huyó'], respuesta: 0 },
        { japones: '並べて', lectura: 'narabete', opciones: ['Alineando / Poniendo en fila', 'Separando', 'Mezclando', 'Escondiendo'], respuesta: 0 },
        { japones: '五つ子', lectura: 'itsutsugo', opciones: ['Quintillizas', 'Gemelas', 'Trillizas', 'Cuatrillizas'], respuesta: 0 },
        { japones: '犯す', lectura: 'okasu', opciones: ['Violar / Agredir sexualmente', 'Proteger', 'Respetar', 'Ignorar'], respuesta: 0 },
        { japones: 'スポズポ', lectura: 'supozupo', opciones: ['Entrando y saliendo (onomatopeya de pistoneo)', 'Estático', 'Girando', 'Vibrando'], respuesta: 0 }
    ],
    
    4: [
        { japones: 'しやすく', lectura: 'shiyasuku', opciones: ['Fácil de hacer', 'Difícil de hacer', 'Imposible de hacer', 'Peligroso de hacer'], respuesta: 0 },
        { japones: 'しといて', lectura: 'shitoite', opciones: ['Prepárate (imperativo)', 'Espera', 'Olvida', 'Cancela'], respuesta: 0 },
        { japones: '手に入ったら', lectura: 'te ni hairattara', opciones: ['Si lo consigo', 'Si lo pierdo', 'Si lo rompo', 'Si lo regalo'], respuesta: 0 },
        { japones: '見せちゃう', lectura: 'misechau', opciones: ['Se lo muestre (contracción de てしまう)', 'Se lo escondo', 'Se lo doy', 'Se lo quito'], respuesta: 0 },
        { japones: '変態', lectura: 'hentai', opciones: ['Pervertido', 'Normal', 'Inocente', 'Tímido'], respuesta: 0 },
        { japones: 'たまんねぇ', lectura: 'tamannē', opciones: ['Increíble / Insoportable', 'Aburrido', 'Normal', 'Desagradable'], respuesta: 0 },
        { japones: 'オホ声', lectura: 'oho-goe', opciones: ['Voz oho (gemido gutural bajo y porcino)', 'Voz aguda', 'Voz tranquila', 'Voz cantarina'], respuesta: 0 },
        { japones: '鳴く', lectura: 'naku', opciones: ['Gemir / "Cantar" (metáfora animal)', 'Callar', 'Hablar', 'Gritar'], respuesta: 0 },
        { japones: '絶対', lectura: 'zettai', opciones: ['Absolutamente', 'Quizás', 'Nunca', 'Raramente'], respuesta: 0 },
        { japones: '気', lectura: 'ki', opciones: ['Carácter / Espíritu', 'Cuerpo', 'Mente', 'Alma'], respuesta: 0 }
    ],
    
    5: [
        { japones: '強い', lectura: 'tsuyoi', opciones: ['Fuerte', 'Débil', 'Normal', 'Variable'], respuesta: 0 },
        { japones: 'ほど', lectura: 'hodo', opciones: ['Cuanto más', 'Cuanto menos', 'Igual', 'Diferente'], respuesta: 0 },
        { japones: '激しく', lectura: 'hageshiku', opciones: ['Intensamente / Con fuerza', 'Suavemente', 'Lentamente', 'Rápidamente'], respuesta: 0 },
        { japones: '突く', lectura: 'tsuku', opciones: ['Embestir / Follar', 'Acariciar', 'Tocar', 'Observar'], respuesta: 0 },
        { japones: '情けない', lectura: 'nasakenai', opciones: ['Patético / Lamentable', 'Admirable', 'Normal', 'Felicidad'], respuesta: 0 },
        { japones: 'ひくひく', lectura: 'hiku hiku', opciones: ['Palpitando / Contrayéndose', 'Inmóvil', 'Relajado', 'Rígido'], respuesta: 0 },
        { japones: 'してて', lectura: 'shitete', opciones: ['Está (forma te continua)', 'No está', 'Estaba', 'Estará'], respuesta: 0 },
        { japones: '後', lectura: 'ato', opciones: ['Después', 'Antes', 'Durante', 'Mientras'], respuesta: 0 },
        { japones: '挿れて', lectura: 'irete', opciones: ['Meticndo', 'Sacando', 'Tocando', 'Lamiendo'], respuesta: 0 },
        { japones: '開発', lectura: 'kaihatsu', opciones: ['Desarrollar (entrenar el ano)', 'Destruir', 'Ignorar', 'Proteger'], respuesta: 0 }
    ],
    
    6: [
        { japones: '楽しみ', lectura: 'tanoshimi', opciones: ['Disfrute / Anticipación', 'Miedo', 'Aburrimiento', 'Indiferencia'], respuesta: 0 },
        { japones: 'ご自慢', lectura: 'go-jiman', opciones: ['De la que alardeas', 'De la que te avergüenzas', 'Normal', 'Común'], respuesta: 0 },
        { japones: '演技力', lectura: 'engiryoku', opciones: ['Habilidad actoral', 'Habilidad deportiva', 'Habilidad musical', 'Habilidad artística'], respuesta: 0 },
        { japones: '上', lectura: 'ue', opciones: ['Arriba', 'Abajo', 'Derecha', 'Izquierda'], respuesta: 0 },
        { japones: '下', lectura: 'shita', opciones: ['Abajo', 'Arriba', 'Centro', 'Lateral'], respuesta: 0 },
        { japones: '大人しく', lectura: 'otonashiku', opciones: ['Callada / Quieta', 'Ruidosa', 'Activa', 'Nerviosa'], respuesta: 0 },
        { japones: 'させて', lectura: 'sasete', opciones: ['Hacer que', 'Impedir que', 'Dejar que', 'Ver que'], respuesta: 0 },
        { japones: 'みろ', lectura: 'miro', opciones: ['Intenta (imperativo rudo)', 'No intentes', 'Espera', 'Olvídalo'], respuesta: 0 },
        { japones: '髪型', lectura: 'kamigata', opciones: ['Peinado', 'Rostro', 'Cuerpo', 'Ropa'], respuesta: 0 },
        { japones: '統一', lectura: 'tōitsu', opciones: ['Unificar', 'Separar', 'Dividir', 'Mezclar'], respuesta: 0 }
    ],
    
    7: [
        { japones: '見分け', lectura: 'miwake', opciones: ['Distinguir', 'Confundir', 'Ignorar', 'Unir'], respuesta: 0 },
        { japones: 'つかない', lectura: 'tsukanai', opciones: ['No se puede', 'Se puede', 'Quizás', 'Fácilmente'], respuesta: 0 },
        { japones: '歴戦', lectura: 'rekisen', opciones: ['Veterano de muchas batallas', 'Novato', 'Intermedio', 'Inactivo'], respuesta: 0 },
        { japones: 'ヤリチン', lectura: 'yarichin', opciones: ['Putero / Follador experimentado', 'Virgen', 'Casual', 'Abstinente'], respuesta: 0 },
        { japones: '当たってる', lectura: 'atatteru', opciones: ['Acertando', 'Fallando', 'Dudando', 'Ignorando'], respuesta: 0 },
        { japones: '髪', lectura: 'kami', opciones: ['Pelo', 'Piel', 'Uñas', 'Ojos'], respuesta: 0 },
        { japones: '長さ', lectura: 'nagasa', opciones: ['Longitud', 'Anchura', 'Altura', 'Profundidad'], respuesta: 0 },
        { japones: '2択', lectura: 'nitaku', opciones: ['Dos opciones', 'Tres opciones', 'Muchas opciones', 'Sin opciones'], respuesta: 0 },
        { japones: '突っ込んで', lectura: 'tsukkonde', opciones: ['Meticndo / Embistiendo', 'Sacando', 'Tocando', 'Observando'], respuesta: 0 },
        { japones: '30秒', lectura: 'sanjū-byō', opciones: ['30 segundos', '30 minutos', '30 horas', '30 días'], respuesta: 0 }
    ],
    
    8: [
        { japones: 'ビショビショ', lectura: 'bishobisho', opciones: ['Empapado / Chorreando', 'Seco', 'Húmedo', 'Pegajoso'], respuesta: 0 },
        { japones: '雑魚', lectura: 'zako', opciones: ['Débil / Perdedor', 'Fuerte / Ganador', 'Intermedio', 'Experto'], respuesta: 0 },
        { japones: 'かなぁ', lectura: 'kanā', opciones: ['¿Será que...? (duda suave)', '¡Definitivamente!', 'No sé', 'Tal vez'], respuesta: 0 },
        { japones: 'アレ', lectura: 'are', opciones: ['Eso / Aquello', 'Esto', 'Aquello lejano', 'Nada'], respuesta: 0 },
        { japones: '露出度', lectura: 'roshutsudo', opciones: ['Nivel de exposición', 'Nivel de cobertura', 'Nivel de calidad', 'Nivel de precio'], respuesta: 0 },
        { japones: '抜いて', lectura: 'nuite', opciones: ['Pajearme / Correrme', 'Contenerme', 'Ignorar', 'Disfrutar'], respuesta: 0 },
        { japones: '全裸', lectura: 'zenra', opciones: ['Desnudez total', 'Parcialmente vestido', 'Completamente vestido', 'En ropa interior'], respuesta: 0 },
        { japones: '変わんない', lectura: 'kawannai', opciones: ['No difiere (contracción casual)', 'Difiere mucho', 'Es igual', 'Cambia'], respuesta: 0 },
        { japones: '隣', lectura: 'tonari', opciones: ['Al lado / Vecino', 'Lejos', 'Frente', 'Detrás'], respuesta: 0 },
        { japones: '趣味', lectura: 'shumi', opciones: ['Fetiche / Gusto', 'Obligación', 'Trabajo', 'Estudio'], respuesta: 0 }
    ],
    
    9: [
        { japones: '後ろ', lectura: 'ushiro', opciones: ['Detrás', 'Delante', 'Lado', 'Arriba'], respuesta: 0 },
        { japones: 'なんて', lectura: 'nante', opciones: ['Cosas como / ¡Vaya!', 'Nada especial', 'Algo normal', 'Algo aburrido'], respuesta: 0 },
        { japones: '丸出し', lectura: 'marudashi', opciones: ['Totalmente expuesto', 'Parcialmente tapado', 'Completamente tapado', 'Semi-expuesto'], respuesta: 0 },
        { japones: 'ぶちこみ', lectura: 'buchikomi', opciones: ['Meter a saco / Embutir', 'Sacar suavemente', 'Tocar ligeramente', 'Evitar'], respuesta: 0 },
        { japones: 'ナンパ', lectura: 'nanpa', opciones: ['Ligar / Abordar', 'Ignorar', 'Evitar', 'Rechazar'], respuesta: 0 },
        { japones: '速攻', lectura: 'sokkō', opciones: ['Al instante', 'Lentamente', 'Después', 'Nunca'], respuesta: 0 },
        { japones: 'まくって', lectura: 'makutte', opciones: ['A saco / Sin parar', 'Suavemente', 'Intermitentemente', 'Nunca'], respuesta: 0 },
        { japones: 'やん', lectura: 'yan', opciones: ['Haría (contracción)', 'No haría', 'Quizás haría', 'Nunca haría'], respuesta: 0 },
        { japones: '紐', lectura: 'himo', opciones: ['Hilos / Cordones', 'Botones', 'Cremalleras', 'Hebillas'], respuesta: 0 },
        { japones: 'しか', lectura: 'shika', opciones: ['Solo', 'También', 'Además', 'Incluso'], respuesta: 0 }
    ],
    
    10: [
        { japones: '逆に', lectura: 'gyaku ni', opciones: ['Al contrario', 'Igualmente', 'Similarmente', 'Paralelamente'], respuesta: 0 },
        { japones: '堂々', lectura: 'dōdō', opciones: ['Con naturalidad / Audazmente', 'Tímidamente', 'Nerviosamente', 'Secretamente'], respuesta: 0 },
        { japones: '目立たない', lectura: 'medatanai', opciones: ['No destacar', 'Destacar mucho', 'Ser normal', 'Ser invisible'], respuesta: 0 },
        { japones: '必死', lectura: 'hisshi', opciones: ['Desesperadamente', 'Tranquilamente', 'Indiferentemente', 'Felizmente'], respuesta: 0 },
        { japones: 'プルンプルン', lectura: 'purunpurun', opciones: ['Temblorosas / Jugosas', 'Firmes', 'Flácidas', 'Secas'], respuesta: 0 },
        { japones: 'ニップルシール', lectura: 'nippuru shīru', opciones: ['Pezoneras / Pasties', 'Sujetador', 'Top', 'Bikini'], respuesta: 0 },
        { japones: 'はがして', lectura: 'hagashite', opciones: ['Arrancando', 'Pegando', 'Cubriendo', 'Dibujando'], respuesta: 0 },
        { japones: 'むしゃぶりつき', lectura: 'mushaburitsuki', opciones: ['Chupar con avidez', 'Lamer suavemente', 'Morder ligeramente', 'Tocar'], respuesta: 0 },
        { japones: '映画', lectura: 'eiga', opciones: ['Película', 'Serie', 'Documental', 'Animación'], respuesta: 0 },
        { japones: 'でてた', lectura: 'deteta', opciones: ['Salió (pasado casual)', 'No salió', 'Quizás salió', 'Saldrá'], respuesta: 0 }
    ],
    
    11: [
        { japones: 'てことは', lectura: 'te koto wa', opciones: ['Entonces / Eso significa', 'Pero', 'Aunque', 'Porque'], respuesta: 0 },
        { japones: '撮影', lectura: 'satsuei', opciones: ['Rodaje', 'Fotografía', 'Pintura', 'Escultura'], respuesta: 0 },
        { japones: '格好', lectura: 'kakkō', opciones: ['Atuendo / Apariencia', 'Personalidad', 'Habilidad', 'Conocimiento'], respuesta: 0 },
        { japones: '男優', lectura: 'danyū', opciones: ['Actor (porno masculino)', 'Actriz', 'Director', 'Productor'], respuesta: 0 },
        { japones: 'ふりケツ', lectura: 'furi ketsu', opciones: ['Culazo (que se mueve mucho)', 'Culo plano', 'Culo normal', 'Culo pequeño'], respuesta: 0 },
        { japones: '好き放題', lectura: 'suki hōdai', opciones: ['A discreción / Lo que quiera', 'Con límites', 'Con permiso', 'Con restricciones'], respuesta: 0 },
        { japones: '随分', lectura: 'zuibun', opciones: ['Bastante / Considerablemente', 'Poco', 'Nada', 'Demasiado'], respuesta: 0 },
        { japones: 'ぶっとんだ', lectura: 'buttonda', opciones: ['Loco / Extravagante', 'Normal', 'Aburrido', 'Serio'], respuesta: 0 },
        { japones: 'してる', lectura: 'shiteru', opciones: ['Está llevando', 'No está', 'Estaba', 'Estará'], respuesta: 0 },
        { japones: '左', lectura: 'hidari', opciones: ['Izquierdo', 'Derecho', 'Central', 'Lateral'], respuesta: 0 }
    ],
    
    12: [
        { japones: '絆創膏', lectura: 'bansōkō', opciones: ['Apósito / Tirita', 'Vendaje', 'Yeso', 'Pomada'], respuesta: 0 },
        { japones: 'はがれ', lectura: 'hagare', opciones: ['Despegarse', 'Pegarse', 'Quedarse', 'Romper'], respuesta: 0 },
        { japones: 'かけてる', lectura: 'kaketeru', opciones: ['A punto de', 'Lejos de', 'Después de', 'Antes de'], respuesta: 0 },
        { japones: 'ぷっくり', lectura: 'pukkuri', opciones: ['Hinchado / Gordito', 'Delgado', 'Plano', 'Hueco'], respuesta: 0 },
        { japones: 'スク水', lectura: 'suku mizu', opciones: ['School swimsuit (bañador escolar)', 'Uniforme escolar', 'Ropa casual', 'Ropa deportiva'], respuesta: 0 },
        { japones: '部分', lectura: 'bubun', opciones: ['Partes', 'Todo', 'Nada', 'Algo'], respuesta: 0 },
        { japones: '開けて', lectura: 'akete', opciones: ['Haciendo', 'Cerrando', 'Tapando', 'Ocultando'], respuesta: 0 },
        { japones: '貼る', lectura: 'haru', opciones: ['Pegar', 'Quitar', 'Romper', 'Dibujar'], respuesta: 0 },
        { japones: '天才', lectura: 'tensai', opciones: ['Genio', 'Tonto', 'Normal', 'Inteligente'], respuesta: 0 },
        { japones: '発想', lectura: 'hassō', opciones: ['Idea / Concepto', 'Realidad', 'Hecho', 'Teoría'], respuesta: 0 }
    ],
    
    13: [
        { japones: 'もじもじ', lectura: 'mojimoji', opciones: ['Retorcerse / Inquietarse', 'Quedarse quieto', 'Relajarse', 'Dormir'], respuesta: 0 },
        { japones: '恥ずかしがってる', lectura: 'hazukashigatteru', opciones: ['Estar avergonzada', 'Estar orgullosa', 'Estar feliz', 'Estar enojada'], respuesta: 0 },
        { japones: 'たまんね~', lectura: 'tamannē', opciones: ['Irresistible / Insoportable de bueno', 'Aburrido', 'Normal', 'Desagradable'], respuesta: 0 },
        { japones: '割れ目', lectura: 'wareme', opciones: ['Raja / Hendidura', 'Superficie lisa', 'Protuberancia', 'Hueco'], respuesta: 0 },
        { japones: 'ふんどし', lectura: 'fundoshi', opciones: ['Fundoshi (tanga tradicional)', 'Calzoncillo', 'Boxer', 'Suspensorio'], respuesta: 0 },
        { japones: '目立つ', lectura: 'medatsu', opciones: ['Destacar', 'Pasar desapercibido', 'Esconderse', 'Camuflarse'], respuesta: 0 },
        { japones: 'なるべく', lectura: 'narubeku', opciones: ['Lo máximo posible', 'Lo mínimo posible', 'Normalmente', 'Nunca'], respuesta: 0 },
        { japones: '視線', lectura: 'shisen', opciones: ['Miradas', 'Voces', 'Toques', 'Sonidos'], respuesta: 0 },
        { japones: 'いかない', lectura: 'ikanai', opciones: ['No vayan', 'Vayan', 'Quizás vayan', 'Nunca vayan'], respuesta: 0 },
        { japones: 'ように', lectura: 'yō ni', opciones: ['Para que', 'Aunque', 'Porque', 'Si'], respuesta: 0 }
    ],
    
    14: [
        { japones: '生地', lectura: 'kiji', opciones: ['Tela / Tejido', 'Plástico', 'Metal', 'Madera'], respuesta: 0 },
        { japones: '薄い', lectura: 'usui', opciones: ['Fina', 'Gruesa', 'Dura', 'Suave'], respuesta: 0 },
        { japones: 'せい', lectura: 'sei', opciones: ['Culpa / Por', 'Mérito', 'Accidente', 'Destino'], respuesta: 0 },
        { japones: 'めっちゃ', lectura: 'meccha', opciones: ['Un montón / Súper', 'Poco', 'Nada', 'Algo'], respuesta: 0 },
        { japones: '透けて', lectura: 'sukete', opciones: ['Transparentándose', 'Opacándose', 'Cubriéndose', 'Ocultándose'], respuesta: 0 },
        { japones: '祭', lectura: 'matsuri', opciones: ['Festival (matsuri japonés)', 'Ceremonia', 'Reunión', 'Concierto'], respuesta: 0 },
        { japones: '純粋', lectura: 'junsui', opciones: ['Pura', 'Corrupta', 'Mixta', 'Falsa'], respuesta: 0 },
        { japones: '元気っ娘', lectura: 'genki-kko', opciones: ['Chica enérgica', 'Chica tímida', 'Chica seria', 'Chica triste'], respuesta: 0 },
        { japones: '着てる', lectura: 'kiteru', opciones: ['Llevando', 'Quitándose', 'Comprando', 'Lavando'], respuesta: 0 },
        { japones: '興奮', lectura: 'kōfun', opciones: ['Excitación', 'Aburrimiento', 'Calma', 'Sueño'], respuesta: 0 }
    ],
    
    15: [
        { japones: 'やたら', lectura: 'yatara', opciones: ['Excesivamente / Súper', 'Moderadamente', 'Poco', 'Nada'], respuesta: 0 },
        { japones: '調教', lectura: 'chōkyō', opciones: ['Entrenar / Domar (BDSM)', 'Liberar', 'Ignorar', 'Proteger'], respuesta: 0 },
        { japones: '生きられない', lectura: 'ikirarenai', opciones: ['No pueda vivir', 'Pueda vivir', 'Quiera vivir', 'Prefiera vivir'], respuesta: 0 },
        { japones: 'なし', lectura: 'nashi', opciones: ['Sin', 'Con', 'Con mucho', 'Con poco'], respuesta: 0 },
        { japones: 'やべぇ', lectura: 'yabē', opciones: ['Loca / Peligrosa', 'Normal', 'Aburrida', 'Segura'], respuesta: 0 },
        { japones: '綺麗', lectura: 'kirei', opciones: ['Bonito / Limpio', 'Feo / Sucio', 'Normal', 'Extraño'], respuesta: 0 },
        { japones: 'おかしい', lectura: 'okashii', opciones: ['Loco / Extraño', 'Normal', 'Aburrido', 'Serio'], respuesta: 0 },
        { japones: 'まったく', lectura: 'mattaku', opciones: ['Para nada', 'Totalmente', 'Parcialmente', 'A medias'], respuesta: 0 },
        { japones: '黒ずんで', lectura: 'kurozunde', opciones: ['Oscurecidos / Pigmentados', 'Aclarados', 'Blancos', 'Rojos'], respuesta: 0 },
        { japones: '上玉', lectura: 'jōtama', opciones: ['Joya / Chica de primera', 'Chica normal', 'Chica fea', 'Chica promedio'], respuesta: 0 }
    ],
    
    16: [
        { japones: 'なかなか', lectura: 'nakanaka', opciones: ['Fácilmente / Todos los días', 'Raramente', 'Nunca', 'A veces'], respuesta: 0 },
        { japones: 'いねえ', lectura: 'inē', opciones: ['No hay (contracción casual)', 'Hay', 'Habrá', 'Hubo'], respuesta: 0 },
        { japones: '逮捕', lectura: 'taiho', opciones: ['Arrestar', 'Liberar', 'Interrogar', 'Ignorar'], respuesta: 0 },
        { japones: '草むら', lectura: 'kusamura', opciones: ['Matorral / Hierba alta', 'Camino', 'Edificio', 'Playa'], respuesta: 0 },
        { japones: '連れ込んで', lectura: 'tsurekonde', opciones: ['Arrastrando / Llevando', 'Soltando', 'Dejando', 'Expulsando'], respuesta: 0 },
        { japones: 'ぶち犯して', lectura: 'buchi okashite', opciones: ['Violar a saco', 'Respetar', 'Ignorar', 'Proteger'], respuesta: 0 }
    ],
    
    // ====================
    // MAZOS DIFÍCILES ESPECIALES - Subcontenedor 1.3
    // ====================
 
        
        // ====================
        // MAZOS DIFÍCILES ESPECIALES - Subcontenedor 1.3
        // ====================
        
        'D1': [
            { japones: '話し言葉の縮約形', lectura: 'hanashikotoba no shukuyakukei', opciones: ['Formas contraídas del lenguaje hablado', 'Formas formales', 'Formas literarias', 'Formas arcaicas'], respuesta: 0 },
            { japones: '終助詞の微妙な用法', lectura: 'shuujoshi no bimyou na youhou', opciones: ['Usos sutiles de partículas finales', 'Usos básicos', 'Usos incorrectos', 'Usos formales'], respuesta: 0 },
            { japones: '若者言葉の変化', lectura: 'wakamonokotoba no henka', opciones: ['Cambios en el lenguaje juvenil', 'Lenguaje tradicional', 'Lenguaje formal', 'Dialectos regionales'], respuesta: 0 },
            { japones: '会話の省略パターン', lectura: 'kaiwa no shouryaku patān', opciones: ['Patrones de omisión en conversación', 'Expresiones completas', 'Lenguaje escrito', 'Discurso formal'], respuesta: 0 },
            { japones: '間投詞の感情表現', lectura: 'kantoushi no kanjou hyougen', opciones: ['Expresión emocional con interjecciones', 'Expresión neutral', 'Expresión formal', 'Expresión técnica'], respuesta: 0 },
            { japones: '語気のニュアンス', lectura: 'goki no nyuansu', opciones: ['Matices en el tono de voz', 'Significado literal', 'Gramática formal', 'Vocabulario básico'], respuesta: 0 },
            { japones: '相槌のバリエーション', lectura: 'aizuchi no bariēshon', opciones: ['Variaciones en respuestas de conversación', 'Respuestas simples', 'Silencio', 'Preguntas'], respuesta: 0 },
            { japones: '婉曲な断り表現', lectura: 'enkyoku na kotowari hyougen', opciones: ['Expresiones indirectas de rechazo', 'Rechazos directos', 'Aceptaciones', 'Peticiones'], respuesta: 0 },
            { japones: 'ぼかし表現', lectura: 'bokashi hyougen', opciones: ['Expresiones vagas o evasivas', 'Expresiones claras', 'Afirmaciones directas', 'Órdenes'], respuesta: 0 },
            { japones: '日本語のポライトネス理論', lectura: 'nihongo no poraitonesu riron', opciones: ['Teoría de la cortesía en japonés', 'Gramática básica', 'Vocabulario simple', 'Pronunciación'], respuesta: 0 }
        ]
    },
    // Sub-contenedor 1.4
    'sub1_4': {
        // MAZO 1
        1: [
            { japones: '授業', lectura: 'jugyō', opciones: ['Clases', 'Trabajo', 'Deporte', 'Descanso'], respuesta: 0 },
            { japones: '補修', lectura: 'hoshū', opciones: ['Clases de recuperación', 'Clases normales', 'Exámenes', 'Vacaciones'], respuesta: 0 },
            { japones: '槍崎', lectura: 'Yabuki', opciones: ['Yabuki (apellido)', 'Suzuki', 'Tanaka', 'Yamada'], respuesta: 0 },
            { japones: '赤点', lectura: 'akaten', opciones: ['Nota roja / Suspenso', 'Nota perfecta', 'Nota media', 'Aprobado'], respuesta: 0 },
            { japones: '取っちまってなぁ', lectura: 'tottchimattenā', opciones: ['Me he llevado (un suspenso)', 'He aprobado', 'He mejorado', 'He abandonado'], respuesta: 0 },
            { japones: '担当', lectura: 'tantō', opciones: ['Encargarse / Responsable', 'Observar', 'Ignorar', 'Evitar'], respuesta: 0 },
            { japones: 'しか', lectura: 'shika', opciones: ['Solo / Únicamente', 'También', 'Incluso', 'Especialmente'], respuesta: 0 },
            { japones: '迷惑', lectura: 'meiwaku', opciones: ['Molestias', 'Ayuda', 'Soporte', 'Placer'], respuesta: 0 },
            { japones: 'かけらんないわよ', lectura: 'kakerannai wayo', opciones: ['No puedo causar (molestias)', 'Voy a ayudar', 'No me importa', 'Es mi deber'], respuesta: 0 },
            { japones: '負担', lectura: 'futan', opciones: ['Carga / Peso', 'Alivio', 'Ayuda', 'Soporte'], respuesta: 0 }
        ],
        
        // MAZO 2
        2: [
            { japones: '増やし', lectura: 'fuyashi', opciones: ['Aumentando', 'Disminuyendo', 'Manteniendo', 'Eliminando'], respuesta: 0 },
            { japones: 'たくなかたから', lectura: 'takunakatakara', opciones: ['Como no querías', 'Porque querías', 'Aunque no querías', 'Si querías'], respuesta: 0 },
            { japones: '無駄話', lectura: 'mudabanashi', opciones: ['Charla inútil', 'Conversación seria', 'Debate', 'Conferencia'], respuesta: 0 },
            { japones: '顔出すから', lectura: 'kao dasu kara', opciones: ['Porque apareces', 'Porque te escondes', 'Porque te callas', 'Porque te vas'], respuesta: 0 },
            { japones: '入念', lectura: 'nyūnen', opciones: ['Cuidadoso / Meticuloso', 'Descuidado', 'Rápido', 'Superficial'], respuesta: 0 },
            { japones: 'すっかり', lectura: 'sukkari', opciones: ['Completamente', 'Parcialmente', 'Ligeramente', 'Nada'], respuesta: 0 },
            { japones: 'コツ', lectura: 'kotsu', opciones: ['Truco / Técnica', 'Error', 'Suerte', 'Azar'], respuesta: 0 },
            { japones: '専用', lectura: 'sen\'yō', opciones: ['Exclusivo / Dedicado', 'Compartido', 'Público', 'General'], respuesta: 0 },
            { japones: 'ヌイ', lectura: 'nui', opciones: ['Saliendo / Corriéndose', 'Entrando', 'Esperando', 'Deteniendo'], respuesta: 0 },
            { japones: 'スリン', lectura: 'surin', opciones: ['Deslizamiento húmedo', 'Sonido seco', 'Silencio', 'Grito'], respuesta: 0 }
        ],
        
        // MAZO 3
        3: [
            { japones: 'どうせ', lectura: 'dōse', opciones: ['De todos modos', 'Por casualidad', 'Especialmente', 'Raramente'], respuesta: 0 },
            { japones: '溜め', lectura: 'tame', opciones: ['Acumulando', 'Gastando', 'Perdiendo', 'Distribuyendo'], respuesta: 0 },
            { japones: '数ヶ月', lectura: 'sūkagetsu', opciones: ['Varios meses', 'Un mes', 'Un año', 'Una semana'], respuesta: 0 },
            { japones: '根本', lectura: 'nehon', opciones: ['Base / Raíz (del pene)', 'Punta', 'Mitad', 'Extremo'], respuesta: 0 },
            { japones: '特に', lectura: 'toku ni', opciones: ['Especialmente', 'Generalmente', 'Raramente', 'Nunca'], respuesta: 0 },
            { japones: 'くっせえ', lectura: 'kusse', opciones: ['Apesta (vulgar)', 'Huele bien', 'Es inodoro', 'Es fragante'], respuesta: 0 },
            { japones: '臭い', lectura: 'kusai', opciones: ['Huele mal', 'Huele bien', 'No huele', 'Es aromático'], respuesta: 0 },
            { japones: '徹底的', lectura: 'tetteiteki', opciones: ['A fondo / Completamente', 'Superficialmente', 'Parcialmente', 'Ligeramente'], respuesta: 0 },
            { japones: '快感', lectura: 'kaikan', opciones: ['Placer', 'Dolor', 'Molestia', 'Indiferencia'], respuesta: 0 },
            { japones: '覚えさせられた', lectura: 'oboesaserareta', opciones: ['Me hicieron recordar', 'Olvidé', 'Ignoré', 'Descubrí'], respuesta: 0 }
        ],
        
        // MAZO 4
        4: [
            { japones: '奉仕', lectura: 'hōshi', opciones: ['Servicio / Servir sexualmente', 'Rechazo', 'Indiferencia', 'Dominio'], respuesta: 0 },
            { japones: '抵抗', lectura: 'teikō', opciones: ['Resistencia', 'Sumisión', 'Aceptación', 'Cooperación'], respuesta: 0 },
            { japones: '一々', lectura: 'ichiichi', opciones: ['Cada vez / Siempre', 'Nunca', 'Raramente', 'Ocasionalmente'], respuesta: 0 },
            { japones: 'うっさい', lectura: 'ussai', opciones: ['Pesado / Ruidoso', 'Silencioso', 'Amable', 'Tranquilo'], respuesta: 0 },
            { japones: '仕込', lectura: 'shikomi', opciones: ['Entrenando / Enseñando', 'Olvidando', 'Ignorando', 'Abandonando'], respuesta: 0 },
            { japones: 'さらに', lectura: 'sarani', opciones: ['Aún más', 'Menos', 'Igual', 'Diferente'], respuesta: 0 },
            { japones: '丸わかり', lectura: 'maruwakari', opciones: ['Clarísimo / Evidente', 'Oculto', 'Confuso', 'Ambiguo'], respuesta: 0 },
            { japones: 'うつ', lectura: 'utsu', opciones: ['Succión profunda', 'Ligero roce', 'Toque seco', 'Presión ligera'], respuesta: 0 },
            { japones: '認め', lectura: 'mitome', opciones: ['Admitiendo', 'Negando', 'Ignorando', 'Dudando'], respuesta: 0 },
            { japones: 'じゅるる', lectura: 'jururu', opciones: ['Succión intensa y babosa', 'Sonido seco', 'Silencio', 'Chasquido'], respuesta: 0 }
        ],
        
        // MAZO 5
        5: [
            { japones: 'ちゃぱい', lectura: 'chapai', opciones: ['Sonido húmedo o chapoteo', 'Sonido seco', 'Crujido', 'Silencio'], respuesta: 0 },
            { japones: 'しゃぶってる', lectura: 'shabutteru', opciones: ['Está chupando', 'Está mordiendo', 'Está lamiendo', 'Está tocando'], respuesta: 0 },
            { japones: 'にも', lectura: 'ni mo', opciones: ['Ni siquiera', 'También', 'Especialmente', 'Solamente'], respuesta: 0 },
            { japones: '沸き', lectura: 'waki', opciones: ['Hirviendo / Surgiendo', 'Enfriándose', 'Estancándose', 'Evaporándose'], respuesta: 0 },
            { japones: '物覚え', lectura: 'monoboé', opciones: ['Memoria / Capacidad de aprendizaje', 'Olvido', 'Ignorancia', 'Descuido'], respuesta: 0 },
            { japones: '嬉しい', lectura: 'ureshii', opciones: ['Feliz / Contento', 'Triste', 'Enojado', 'Asustado'], respuesta: 0 },
            { japones: '復活', lectura: 'fukkatsu', opciones: ['Resucitada / Erección recuperada', 'Debilitada', 'Perdida', 'Agotada'], respuesta: 0 },
            { japones: '真面目', lectura: 'majime', opciones: ['En serio / Seriamente', 'En broma', 'Despreocupadamente', 'Flojamente'], respuesta: 0 },
            { japones: 'と', lectura: 'to', opciones: ['Si no', 'Si', 'Aunque', 'Porque'], respuesta: 0 },
            { japones: '恵ん', lectura: 'megun', opciones: ['Otorgando / Graciando', 'Negando', 'Quitando', 'Escondiendo'], respuesta: 0 }
        ],
        
        // MAZO 6
        6: [
            { japones: 'それにしても', lectura: 'sorenishitemo', opciones: ['Aun así / De todos modos', 'Por eso', 'Además', 'Sin embargo'], respuesta: 0 },
            { japones: '汚い', lectura: 'kitanai', opciones: ['Sucio', 'Limpio', 'Purificado', 'Inmaculado'], respuesta: 0 },
            { japones: 'たっぷり', lectura: 'tappuri', opciones: ['Un montón', 'Poco', 'Nada', 'Justo'], respuesta: 0 },
            { japones: '気合', lectura: 'kiai', opciones: ['Ganas / Entusiasmo', 'Desánimo', 'Indiferencia', 'Miedo'], respuesta: 0 },
            { japones: '入れ', lectura: 'ire', opciones: ['Poniendo', 'Sacando', 'Moviendo', 'Girando'], respuesta: 0 },
            { japones: 'しごけ', lectura: 'shigoke', opciones: ['Masturba (imperativo rudo)', 'Para', 'Suaviza', 'Acaricia'], respuesta: 0 },
            { japones: '一発目', lectura: 'ippatsume', opciones: ['La primera corrida', 'La última', 'La intermedia', 'Ninguna'], respuesta: 0 },
            { japones: '揉ん', lectura: 'mon', opciones: ['Amasando', 'Estirando', 'Presionando', 'Tocando'], respuesta: 0 },
            { japones: 'くる', lectura: 'kuru', opciones: ['Venir / Hacer', 'Ir', 'Quedarse', 'Esperar'], respuesta: 0 },
            { japones: '具合', lectura: 'guai', opciones: ['Estado / Condición', 'Apariencia', 'Tamaño', 'Forma'], respuesta: 0 }
        ],
        
        // MAZO 7
        7: [
            { japones: '出来', lectura: 'deki', opciones: ['Estar listo', 'No estar', 'Empezar', 'Terminar'], respuesta: 0 },
            { japones: '感謝', lectura: 'kansha', opciones: ['Gratitud', 'Queja', 'Crítica', 'Indiferencia'], respuesta: 0 },
            { japones: '切ら', lectura: 'kira', opciones: ['Acabándose', 'Empezando', 'Conteniendo', 'Reteniendo'], respuesta: 0 },
            { japones: 'ガン', lectura: 'gan', opciones: ['Fuerte / A tope', 'Suavemente', 'Lentamente', 'Rápidamente'], respuesta: 0 },
            { japones: '突き', lectura: 'tsuki', opciones: ['Embestida / Penetración', 'Retirada', 'Pausa', 'Caricia'], respuesta: 0 },
            { japones: 'ばっかり', lectura: 'bakkari', opciones: ['Solo / Nada más', 'También', 'Además', 'Incluso'], respuesta: 0 },
            { japones: 'いらない', lectura: 'iranai', opciones: ['No necesito', 'Quiero', 'Deseo', 'Necesito'], respuesta: 0 },
            { japones: 'ちょうだい', lectura: 'chōdai', opciones: ['Dámelo (súplica femenina)', 'Tómalo', 'Guárdalo', 'Tíralo'], respuesta: 0 },
            { japones: '一度', lectura: 'ichido', opciones: ['Una vez más', 'Por última vez', 'Por primera vez', 'Nunca'], respuesta: 0 },
            { japones: '訊く', lectura: 'kiku', opciones: ['Preguntar', 'Responder', 'Ignorar', 'Evitar'], respuesta: 0 }
        ],
        
        // MAZO 8
        8: [
            { japones: '正直', lectura: 'shōjiki', opciones: ['Honestamente', 'Mintiendo', 'Exagerando', 'Ocultando'], respuesta: 0 },
            { japones: 'ご褒美', lectura: 'gohōbi', opciones: ['Recompensa', 'Castigo', 'Crítica', 'Ignorancia'], respuesta: 0 },
            { japones: 'キツキツ', lectura: 'kitsukitsu', opciones: ['Súper apretado', 'Muy flojo', 'Justo', 'Amplio'], respuesta: 0 },
            { japones: '違って', lectura: 'chigatte', opciones: ['A diferencia de', 'Igual que', 'Similar a', 'Parecido a'], respuesta: 0 },
            { japones: 'ねっとり', lectura: 'nettori', opciones: ['Pegajoso / Viscoso', 'Seco', 'Ligero', 'Acuoso'], respuesta: 0 },
            { japones: '絡み', lectura: 'karami', opciones: ['Enredándose', 'Desenredándose', 'Separándose', 'Alineándose'], respuesta: 0 },
            { japones: '来やがる', lectura: 'kiyagaru', opciones: ['Viene (grosero)', 'Se va', 'Espera', 'Se detiene'], respuesta: 0 },
            { japones: 'ついて', lectura: 'tsuite', opciones: ['Acerca de', 'Lejos de', 'Junto con', 'Separado de'], respuesta: 0 },
            { japones: 'クセ', lectura: 'kuse', opciones: ['A pesar de', 'Debido a', 'Gracias a', 'Por culpa de'], respuesta: 0 },
            { japones: '教え子', lectura: 'oshiego', opciones: ['Alumnas', 'Profesoras', 'Compañeras', 'Amigas'], respuesta: 0 }
        ],
        
        // MAZO 9
        9: [
            { japones: 'お待ちかね', lectura: 'omachikane', opciones: ['Tan esperado', 'Inesperado', 'Olvidado', 'Temido'], respuesta: 0 },
            { japones: 'きゅうけ', lectura: 'kyūkei', opciones: ['Descanso / Parar', 'Continuar', 'Acelerar', 'Empezar'], respuesta: 0 },
            { japones: '出ねぇ', lectura: 'denē', opciones: ['No sale', 'Sale', 'Podría salir', 'Salió'], respuesta: 0 },
            { japones: '駄目', lectura: 'dame', opciones: ['No puede ser / Imposible', 'Está bien', 'Es posible', 'Es fácil'], respuesta: 0 },
            { japones: '条件', lectura: 'jōken', opciones: ['Condiciones', 'Ofertas', 'Promesas', 'Amenazas'], respuesta: 0 },
            { japones: '避妊', lectura: 'hinin', opciones: ['Anticoncepción', 'Fertilización', 'Embarazo', 'Parto'], respuesta: 0 },
            { japones: 'こじゃないと思うがな', lectura: 'kojanai to omou ga na', opciones: ['No creo que sea tan malo', 'Es terrible', 'Es excelente', 'Es normal'], respuesta: 0 },
            { japones: '金', lectura: 'kane', opciones: ['Dinero', 'Amor', 'Tiempo', 'Esfuerzo'], respuesta: 0 },
            { japones: '大金', lectura: 'taikin', opciones: ['Gran cantidad de dinero', 'Poco dinero', 'Deuda', 'Ahorro'], respuesta: 0 },
            { japones: 'あれば', lectura: 'areba', opciones: ['Si hay', 'Si no hay', 'Aunque haya', 'Porque hay'], respuesta: 0 }
        ],
        
        // MAZO 10
        10: [
            { japones: '済む', lectura: 'sumu', opciones: ['Terminar', 'Empezar', 'Continuar', 'Posponer'], respuesta: 0 },
            { japones: 'かけ', lectura: 'kake', opciones: ['Causando', 'Evitando', 'Ignorando', 'Deteniendo'], respuesta: 0 },
            { japones: 'でもこのお金に手を出したらぽいっ', lectura: 'demo kono okane ni te o dashitarapoi', opciones: ['Si tocas este dinero, estás acabado', 'Este dinero es seguro', 'Puedes usar este dinero', 'Este dinero es tuyo'], respuesta: 0 },
            { japones: '絡ませろ', lectura: 'karamase ro', opciones: ['Enreda / Entrelaza', 'Separa', 'Suelta', 'Alinea'], respuesta: 0 },
            { japones: '響く', lectura: 'hibiku', opciones: ['Resonar / Vibrar', 'Silenciar', 'Atenuar', 'Detener'], respuesta: 0 },
            { japones: 'ベロキス', lectura: 'berokisu', opciones: ['Beso con lengua', 'Beso en la mejilla', 'Abrazo', 'Caricia'], respuesta: 0 },
            { japones: '出来て', lectura: 'dekite', opciones: ['Estar listo', 'No estar', 'Empezar', 'Terminar'], respuesta: 0 },
            { japones: 'するなら', lectura: 'suru nara', opciones: ['Si vamos a hacerlo', 'Si no hacemos', 'Aunque hagamos', 'Porque hacemos'], respuesta: 0 },
            { japones: '終わらせて', lectura: 'owarasete', opciones: ['Termina / Haz que termine', 'Continúa', 'Empieza', 'Pausa'], respuesta: 0 },
            { japones: '美味そ', lectura: 'umiso', opciones: ['Parece delicioso', 'Parece asqueroso', 'Parece normal', 'Parece amargo'], respuesta: 0 }
        ],
        
        // MAZO 11
        11: [
            { japones: 'ガキ', lectura: 'gaki', opciones: ['Cría / Niña (despectivo)', 'Adulto', 'Anciano', 'Adolescente'], respuesta: 0 },
            { japones: 'の癖に', lectura: 'no kuse ni', opciones: ['A pesar de / Para ser', 'Debido a', 'Gracias a', 'Por culpa de'], respuesta: 0 },
            { japones: 'メスの', lectura: 'mesu no', opciones: ['De hembra', 'De macho', 'De neutro', 'De ambos'], respuesta: 0 },
            { japones: 'プンプン', lectura: 'punpun', opciones: ['Olor fuerte', 'Sin olor', 'Olor dulce', 'Olor suave'], respuesta: 0 },
            { japones: 'しやがる', lectura: 'shiyagaru', opciones: ['Hace (grosero)', 'No hace', 'Podría hacer', 'Deja de hacer'], respuesta: 0 },
            { japones: 'うんまっ', lectura: 'unma', opciones: ['Delicioso (coloquial)', 'Asqueroso', 'Normal', 'Amargo'], respuesta: 0 },
            { japones: '把握しとかんとな', lectura: 'haaku shitokan to na', opciones: ['Tengo que comprobar / entender', 'Puedo ignorar', 'Debo olvidar', 'Voy a evitar'], respuesta: 0 },
            { japones: 'だいぶ', lectura: 'daibu', opciones: ['Bastante / Considerablemente', 'Poco', 'Nada', 'Demasiado'], respuesta: 0 },
            { japones: 'ほぐれてきた', lectura: 'hogurete kita', opciones: ['Se ha aflojado / relajado', 'Se ha tensado', 'Se ha roto', 'Se ha endurecido'], respuesta: 0 },
            { japones: 'お待ちかねの', lectura: 'omachikane no', opciones: ['El tan esperado', 'El inesperado', 'El olvidado', 'El temido'], respuesta: 0 }
        ],
        
        // MAZO 12
        12: [
            { japones: '初', lectura: 'hatsu', opciones: ['Primera / Inicial', 'Última', 'Intermedia', 'Repetida'], respuesta: 0 },
            { japones: '見とけ', lectura: 'mitoke', opciones: ['Mira (imperativo coloquial)', 'No mires', 'Cierra los ojos', 'Ignora'], respuesta: 0 },
            { japones: 'イキやがった', lectura: 'iki yagatta', opciones: ['Se corrió (grosero)', 'No se corrió', 'Está por correrse', 'Evitó correrse'], respuesta: 0 },
            { japones: '一番最初に', lectura: 'ichiban saisho ni', opciones: ['El primero de todos', 'El último', 'Uno más', 'Ninguno'], respuesta: 0 },
            { japones: '筈だった', lectura: 'hazu datta', opciones: ['Debía haber', 'No debía', 'Podría haber', 'Nunca habría'], respuesta: 0 },
            { japones: 'ところに', lectura: 'tokoro ni', opciones: ['En el lugar / momento', 'Lejos de', 'Antes de', 'Después de'], respuesta: 0 },
            { japones: '取られちゃった', lectura: 'torarechatta', opciones: ['Me lo han quitado', 'Lo conseguí', 'Lo guardé', 'Lo perdí'], respuesta: 0 },
            { japones: '嫌いな', lectura: 'kirai na', opciones: ['Que odio', 'Que amo', 'Que tolero', 'Que ignoro'], respuesta: 0 },
            { japones: '嬉しそうに', lectura: 'ureshiso ni', opciones: ['Con cara de felicidad', 'Tristemente', 'Enojadamente', 'Asustadamente'], respuesta: 0 },
            { japones: '何度も何度も', lectura: 'nando mo nando mo', opciones: ['Muchas veces', 'Una vez', 'Pocas veces', 'Nunca'], respuesta: 0 }
        ],
        
        // MAZO 13
        13: [
            { japones: '出入りしてくる', lectura: 'deiri shite kuru', opciones: ['Entra y sale', 'Se queda quieto', 'Solo entra', 'Solo sale'], respuesta: 0 },
            { japones: '処女マン', lectura: 'shojoman', opciones: ['Coño virgen (vulgar)', 'Coño experimentado', 'Pene virgen', 'Pene experimentado'], respuesta: 0 },
            { japones: 'しっかり', lectura: 'shikkari', opciones: ['Firmemente / Bien', 'Débilmente', 'Superficialmente', 'Inseguramente'], respuesta: 0 },
            { japones: '感覚を', lectura: 'kankaku o', opciones: ['La sensación', 'El pensamiento', 'La memoria', 'La visión'], respuesta: 0 },
            { japones: '覚えるんだぞ', lectura: 'oboeru n da zo', opciones: ['Grábate / Recuerda', 'Olvida', 'Ignora', 'Cuestiona'], respuesta: 0 },
            { japones: 'これから先', lectura: 'korekara saki', opciones: ['De ahora en adelante', 'Hasta ahora', 'En el pasado', 'Solo ahora'], respuesta: 0 },
            { japones: '他の男と', lectura: 'hoka no otoko to', opciones: ['Con otros hombres', 'Sola', 'Con mujeres', 'Con amigos'], respuesta: 0 },
            { japones: 'ヤっても', lectura: 'yatte mo', opciones: ['Aunque folles', 'Si no follas', 'Porque follas', 'Mientras follas'], respuesta: 0 },
            { japones: '俺との', lectura: 'ore to no', opciones: ['Conmigo', 'Con él', 'Con ellos', 'Con nadie'], respuesta: 0 },
            { japones: 'セックスの方が', lectura: 'sekkusu no hō ga', opciones: ['El sexo (comparativo)', 'El amor', 'La amistad', 'El trabajo'], respuesta: 0 }
        ],
        
        // MAZO 14
        14: [
            { japones: '気持ち良かった', lectura: 'kimochi yokatta', opciones: ['Fue mejor / Más placentero', 'Fue peor', 'Fue igual', 'Fue doloroso'], respuesta: 0 },
            { japones: '思い出すように', lectura: 'omoidasu yō ni', opciones: ['Para que recuerdes', 'Para que olvides', 'Para que ignores', 'Para que cuestiones'], respuesta: 0 },
            { japones: '仕込んでやる', lectura: 'shikonde yaru', opciones: ['Te lo voy a grabar / enseñar', 'Te lo voy a olvidar', 'Te lo voy a ocultar', 'Te lo voy a prohibir'], respuesta: 0 },
            { japones: '会ったら', lectura: 'attara', opciones: ['Si me encuentro', 'Si no me encuentro', 'Aunque me encuentre', 'Porque me encuentro'], respuesta: 0 },
            { japones: 'いいんだろう', lectura: 'ii n darō', opciones: ['Estará bien / Podré', 'No estará bien', 'Será terrible', 'Será imposible'], respuesta: 0 },
            { japones: '溜めすぎて', lectura: 'tamesugite', opciones: ['Por guardármelo demasiado', 'Por no guardar nada', 'Por compartirlo', 'Por gastarlo'], respuesta: 0 },
            { japones: 'アガってきた', lectura: 'aga kite kita', opciones: ['Está subiendo / Excitándose', 'Está bajando', 'Está estable', 'Está desapareciendo'], respuesta: 0 },
            { japones: 'だめだ', lectura: 'dame da', opciones: ['No aguanto', 'Aguanto', 'Podría aguantar', 'Nunca aguanto'], respuesta: 0 },
            { japones: '一週間ぶりの', lectura: 'isshūkan buri no', opciones: ['Después de una semana', 'Después de un día', 'Después de un mes', 'Por primera vez'], respuesta: 0 },
            { japones: 'なっげぇ', lectura: 'naggee', opciones: ['Larga (coloquial)', 'Corta', 'Media', 'Infinita'], respuesta: 0 }
        ],
        
        // MAZO 15
        15: [
            { japones: '類の出る', lectura: 'rui no deru', opciones: ['Sale más (del mismo tipo)', 'Sale menos', 'No sale nada', 'Sale diferente'], respuesta: 0 },
            { japones: '後', lectura: 'ato', opciones: ['Después', 'Antes', 'Durante', 'Mientras'], respuesta: 0 },
            { japones: '愛情', lectura: 'aijō', opciones: ['Cariño / Amor', 'Odio', 'Indiferencia', 'Respeto'], respuesta: 0 },
            { japones: '込め', lectura: 'kome', opciones: ['Poniendo', 'Sacando', 'Moviendo', 'Girando'], respuesta: 0 },
            { japones: 'むずむず', lectura: 'muzumuzu', opciones: ['Picor o insatisfacción', 'Satisfacción', 'Calma', 'Dolor'], respuesta: 0 },
            { japones: '物足りな', lectura: 'monotarina', opciones: ['Insatisfactoria', 'Satisfactoria', 'Excesiva', 'Perfecta'], respuesta: 0 },
            { japones: '出来', lectura: 'deki', opciones: ['Poder hacer', 'No poder', 'Deber hacer', 'Evitar hacer'], respuesta: 0 },
            { japones: '続き', lectura: 'tsuzuki', opciones: ['Continuación', 'Final', 'Inicio', 'Interrupción'], respuesta: 0 },
            { japones: 'ブチ', lectura: 'buchi', opciones: ['Brutalmente', 'Suavemente', 'Lentamente', 'Rápidamente'], respuesta: 0 },
            { japones: '我ながら', lectura: 'warenagara', opciones: ['Aunque lo diga yo mismo', 'Aunque lo diga otro', 'Porque lo digo yo', 'Si lo digo yo'], respuesta: 0 }
        ]
    },

  // Sub-contenedor 1.5 (COMPLETAMENTE REEMPLAZADO)
'sub1_5': {
    // MAZO 1
    1: [
        { japones: 'お家賃', lectura: 'o-yachin', opciones: ['Alquiler (de casa) / Renta', 'Comprar', 'Regalar', 'Destruir'], respuesta: 0 },
        { japones: '払えなかったら', lectura: 'haraenakattara', opciones: ['Si no pudiera pagar', 'Si pagara', 'Si regalara', 'Si olvidara'], respuesta: 0 },
        { japones: '強制退去', lectura: 'kyōsei taikyo', opciones: ['Desalojo forzoso / Expulsión', 'Bienvenida', 'Invitación', 'Permiso'], respuesta: 0 },
        { japones: 'マンション', lectura: 'manshon', opciones: ['Apartamento / Condominio', 'Casa independiente', 'Tienda', 'Oficina'], respuesta: 0 },
        { japones: 'ケーキ屋', lectura: 'kēki-ya', opciones: ['Pastelería / Tienda de pasteles', 'Restaurante', 'Supermercado', 'Librería'], respuesta: 0 },
        { japones: 'バイト', lectura: 'baito', opciones: ['Trabajo de medio tiempo / Part-time', 'Trabajo fijo', 'Desempleo', 'Vacaciones'], respuesta: 0 },
        { japones: 'だけでは', lectura: 'dake de wa', opciones: ['Solo con… (no es suficiente)', 'Junto con', 'Sin', 'A pesar de'], respuesta: 0 },
        { japones: '生活費', lectura: 'seikatsu-hi', opciones: ['Gastos de vida / Costo de vida', 'Dinero extra', 'Ahorros', 'Deudas'], respuesta: 0 },
        { japones: '足りず', lectura: 'tarizu', opciones: ['No alcanza / Es insuficiente', 'Sobrado', 'Justo', 'Demasiado'], respuesta: 0 },
        { japones: '仕方なく', lectura: 'shikata naku', opciones: ['No tener más remedio / A regañadientes', 'Voluntariamente', 'Fácilmente', 'Felizmente'], respuesta: 0 }
    ],
    
    // MAZO 2
    2: [
        { japones: '簡単に', lectura: 'kantan ni', opciones: ['Fácilmente', 'Difícilmente', 'Rápidamente', 'Lentamente'], respuesta: 0 },
        { japones: '稼げると', lectura: 'kasegeru to', opciones: ['Que se puede ganar (dinero)', 'Que se pierde', 'Que se regala', 'Que se ahorra'], respuesta: 0 },
        { japones: '話題の', lectura: 'wadai no', opciones: ['Que está de moda / Que es tema', 'Desconocido', 'Aburrido', 'Antiguo'], respuesta: 0 },
        { japones: 'パパ活', lectura: 'papa-katsu', opciones: ['Papa-katsu (citas remuneradas con hombres mayores)', 'Trabajo de oficina', 'Estudio', 'Voluntariado'], respuesta: 0 },
        { japones: '始めてみた', lectura: 'hajimete mita', opciones: ['Probé empezando / Me animé a empezar', 'Renuncié', 'Evité', 'Olvidé'], respuesta: 0 },
        { japones: '以外', lectura: 'igai', opciones: ['Excepto / Aparte de', 'Incluyendo', 'Solo', 'Especialmente'], respuesta: 0 },
        { japones: '遊んだり', lectura: 'asondari', opciones: ['Salir a divertirse / Pasar el rato', 'Trabajar', 'Estudiar', 'Descansar'], respuesta: 0 },
        { japones: '食事する', lectura: 'shokuji suru', opciones: ['Comer / Tener una comida', 'Ayunar', 'Cocinar', 'Comprar'], respuesta: 0 },
        { japones: 'なんて', lectura: 'nante', opciones: ['Algo como… (expresa menosprecio/sorpresa)', 'Nada especial', 'Algo importante', 'Algo normal'], respuesta: 0 },
        { japones: 'やっぱり', lectura: 'yappari', opciones: ['Al final / Después de todo', 'Al principio', 'Nunca', 'Siempre'], respuesta: 0 }
    ],
    
    // MAZO 3
    3: [
        { japones: '気が引ける', lectura: 'ki ga hikeru', opciones: ['Sentirse reacio / Dar cosa / Tener reparos', 'Sentirse seguro', 'Estar feliz', 'Ser valiente'], respuesta: 0 },
        { japones: '相手', lectura: 'aite', opciones: ['La otra persona / La pareja', 'Solo', 'Amigo', 'Enemigo'], respuesta: 0 },
        { japones: '悪い', lectura: 'warui', opciones: ['Malo / Sentir culpa', 'Bueno', 'Neutral', 'Excelente'], respuesta: 0 },
        { japones: 'やっぱり', lectura: 'yappari', opciones: ['Después de todo / Al final', 'Por primera vez', 'Nunca', 'A veces'], respuesta: 0 },
        { japones: '帰ろう', lectura: 'kaerō', opciones: ['Volvamos / Regresemos (volitivo)', 'Quedémonos', 'Vayamos', 'Corramos'], respuesta: 0 },
        { japones: '体育教師', lectura: 'taiiku kyōshi', opciones: ['Profesor de educación física', 'Profesor de matemáticas', 'Estudiante', 'Director'], respuesta: 0 },
        { japones: '槍崎', lectura: 'Yarisaki', opciones: ['Yarisaki (apellido)', 'Suzuki', 'Tanaka', 'Yamada'], respuesta: 0 },
        { japones: '友達', lectura: 'tomodachi', opciones: ['Amigo', 'Enemigo', 'Desconocido', 'Familiar'], respuesta: 0 },
        { japones: '待ち合わせ', lectura: 'machiawase', opciones: ['Cita / Quedar / Esperar para encontrarse', 'Separación', 'Discusión', 'Olvido'], respuesta: 0 },
        { japones: 'やけに', lectura: 'yake ni', opciones: ['Excesivamente / Demasiado', 'Poco', 'Normalmente', 'Nada'], respuesta: 0 }
    ],
    
    // MAZO 4
    4: [
        { japones: '私達', lectura: 'watashitachi', opciones: ['Nosotras', 'Ellas', 'Ustedes', 'Vosotras'], respuesta: 0 },
        { japones: '姉妹', lectura: 'shimai', opciones: ['Hermanas', 'Hermanos', 'Primas', 'Amigas'], respuesta: 0 },
        { japones: '馴れ馴れしい', lectura: 'narenare shii', opciones: ['Demasiado familiar / Confianzudo', 'Tímido', 'Respetuoso', 'Distante'], respuesta: 0 },
        { japones: 'のよね', lectura: 'no yo ne', opciones: ['¿Verdad? (femenino, buscando acuerdo)', 'No', 'Tal vez', 'Siempre'], respuesta: 0 },
        { japones: 'マジで', lectura: 'maji de', opciones: ['De verdad / En serio', 'En broma', 'Quizás', 'Nunca'], respuesta: 0 },
        { japones: 'キモい', lectura: 'kimoi', opciones: ['Asqueroso / Repulsivo (coloquial fuerte)', 'Atractivo', 'Normal', 'Interesante'], respuesta: 0 },
        { japones: '奇遇', lectura: 'kigū', opciones: ['Casualidad / Coincidencia', 'Planificado', 'Evitable', 'Frecuente'], respuesta: 0 },
        { japones: '待ち合わせ', lectura: 'machiawase', opciones: ['Cita / Quedar', 'Despedida', 'Pelea', 'Ignorar'], respuesta: 0 },
        { japones: 'してる', lectura: 'shiteru', opciones: ['Estoy haciendo (contraído)', 'No estoy haciendo', 'Voy a hacer', 'Hice'], respuesta: 0 },
        { japones: '今', lectura: 'ima', opciones: ['Ahora', 'Ayer', 'Mañana', 'Nunca'], respuesta: 0 }
    ],
    
    // MAZO 5
    5: [
        { japones: '到着した', lectura: 'tōchaku shita', opciones: ['He llegado', 'Me fui', 'Me perdí', 'Esperé'], respuesta: 0 },
        { japones: '場所', lectura: 'basho', opciones: ['Lugar', 'Tiempo', 'Persona', 'Razón'], respuesta: 0 },
        { japones: '駅前', lectura: 'ekimae', opciones: ['Frente a la estación', 'Detrás de la estación', 'Dentro de la estación', 'Lejos de la estación'], respuesta: 0 },
        { japones: 'ビル', lectura: 'biru', opciones: ['Edificio', 'Casa', 'Parque', 'Río'], respuesta: 0 },
        { japones: 'の', lectura: 'no', opciones: ['Partícula posesiva', 'Partícula de sujeto', 'Partícula de objeto', 'Partícula de dirección'], respuesta: 0 },
        { japones: '下', lectura: 'shita', opciones: ['Debajo', 'Encima', 'Al lado', 'Dentro'], respuesta: 0 },
        { japones: 'に', lectura: 'ni', opciones: ['En', 'Desde', 'Hacia', 'Con'], respuesta: 0 },
        { japones: 'います', lectura: 'imasu', opciones: ['Estoy (formal)', 'No estoy', 'Estaba', 'Estaré'], respuesta: 0 },
        { japones: '特徴', lectura: 'tokuchō', opciones: ['Características', 'Defectos', 'Ventajas', 'Desventajas'], respuesta: 0 },
        { japones: 'ピンク', lectura: 'pinku', opciones: ['Rosa (color)', 'Azul', 'Verde', 'Amarillo'], respuesta: 0 }
    ],
    
    // MAZO 6
    6: [
        { japones: 'の', lectura: 'no', opciones: ['Partícula posesiva', 'Partícula de tema', 'Partícula de objeto', 'Partícula de lugar'], respuesta: 0 },
        { japones: '髪', lectura: 'kami', opciones: ['Pelo / Cabello', 'Piel', 'Ojos', 'Manos'], respuesta: 0 },
        { japones: 'リボン', lectura: 'ribon', opciones: ['Lazo / Moño', 'Sombrero', 'Collar', 'Pulsera'], respuesta: 0 },
        { japones: 'を', lectura: 'o', opciones: ['Partícula de objeto', 'Partícula de sujeto', 'Partícula de lugar', 'Partícula de posesión'], respuesta: 0 },
        { japones: 'ふたつ', lectura: 'futatsu', opciones: ['Dos', 'Uno', 'Tres', 'Muchos'], respuesta: 0 },
        { japones: '頭', lectura: 'atama', opciones: ['Cabeza', 'Mano', 'Pie', 'Corazón'], respuesta: 0 },
        { japones: 'に', lectura: 'ni', opciones: ['En', 'Desde', 'Hacia', 'Con'], respuesta: 0 },
        { japones: '付けてます', lectura: 'tsukete masu', opciones: ['Lleva puesto / Tiene puesto (formal)', 'No lleva', 'Se quitó', 'Perdió'], respuesta: 0 },
        { japones: 'ピンク髪', lectura: 'pinku-gami', opciones: ['Pelo rosa', 'Pelo negro', 'Pelo rubio', 'Pelo castaño'], respuesta: 0 },
        { japones: '付けた', lectura: 'tsuketa', opciones: ['Puesto / Con', 'Sin', 'Quitado', 'Perdido'], respuesta: 0 }
    ],
    
    // MAZO 7
    7: [
        { japones: '女子学生', lectura: 'joshi gakusei', opciones: ['Estudiante femenina / Chica estudiante', 'Estudiante masculino', 'Profesora', 'Directora'], respuesta: 0 },
        { japones: 'まさか', lectura: 'masaka', opciones: ['No me digas / Imposible que', 'Claro que sí', 'Tal vez', 'Nunca'], respuesta: 0 },
        { japones: '相手', lectura: 'aite', opciones: ['La otra persona / La pareja', 'Solo', 'Grupo', 'Nadie'], respuesta: 0 },
        { japones: 'パパ', lectura: 'papa', opciones: ['Papi (en contexto de papa-katsu)', 'Mamá', 'Hermano', 'Amigo'], respuesta: 0 },
        { japones: 'って', lectura: 'tte', opciones: ['Que… (cita informal)', 'Porque', 'Aunque', 'Si'], respuesta: 0 },
        { japones: '移動', lectura: 'idō', opciones: ['Moverse / Cambiar de lugar', 'Quedarse', 'Esperar', 'Dormir'], respuesta: 0 },
        { japones: 'するか', lectura: 'suru ka', opciones: ['¿Lo hago? / ¿Me muevo?', 'No lo hago', 'Lo haré', 'Lo hice'], respuesta: 0 },
        { japones: 'ご休意', lectura: 'go-kyūi', opciones: ['Descanso / Relax (término de hotel de amor)', 'Trabajo', 'Estudio', 'Ejercicio'], respuesta: 0 },
        { japones: '¥3000', lectura: 'sanzen en', opciones: ['3000 yenes', '1000 yenes', '5000 yenes', '10000 yenes'], respuesta: 0 },
        { japones: '土曜日', lectura: 'doyōbi', opciones: ['Sábado', 'Domingo', 'Lunes', 'Viernes'], respuesta: 0 }
    ],
    
    // MAZO 8
    8: [
        { japones: '18:00', lectura: 'jūhachi-ji', opciones: ['18:00', '12:00', '00:00', '06:00'], respuesta: 0 },
        { japones: 'まで', lectura: 'made', opciones: ['Hasta', 'Desde', 'Durante', 'Antes'], respuesta: 0 },
        { japones: 'ご入室', lectura: 'go-nyūshitsu', opciones: ['Ingreso / Entrada a la habitación', 'Salida', 'Limpieza', 'Reserva'], respuesta: 0 },
        { japones: 'ご宿泊', lectura: 'go-shukuhaku', opciones: ['Hospedaje / Pernoctar', 'Visita diurna', 'Comida', 'Reunión'], respuesta: 0 },
        { japones: '最大', lectura: 'saidai', opciones: ['Máximo', 'Mínimo', 'Promedio', 'Igual'], respuesta: 0 },
        { japones: '24時間', lectura: 'nijūyo-jikan', opciones: ['24 horas', '12 horas', '48 horas', '1 hora'], respuesta: 0 },
        { japones: '¥8000', lectura: 'hassen en', opciones: ['8000 yenes', '3000 yenes', '10000 yenes', '5000 yenes'], respuesta: 0 },
        { japones: '黙っていて', lectura: 'damatte ite', opciones: ['Guarda silencio / No digas nada', 'Habla', 'Grita', 'Canta'], respuesta: 0 },
        { japones: 'くれる', lectura: 'kureru', opciones: ['¿Me harás el favor?', '¿Te haré el favor?', '¿Nos harás el favor?', '¿Le harás el favor?'], respuesta: 0 },
        { japones: '金', lectura: 'kane', opciones: ['Dinero', 'Amor', 'Tiempo', 'Esfuerzo'], respuesta: 0 }
    ],
    
    // MAZO 9
    9: [
        { japones: 'ちゃんと', lectura: 'chanto', opciones: ['Correctamente / Bien', 'Mal', 'A medias', 'Nunca'], respuesta: 0 },
        { japones: '払ってやる', lectura: 'haratte yaru', opciones: ['Te pagaré (arrogante/masculino)', 'No te pagaré', 'Te prestaré', 'Te robaré'], respuesta: 0 },
        { japones: '態度', lectura: 'taido', opciones: ['Actitud', 'Habilidad', 'Conocimiento', 'Experiencia'], respuesta: 0 },
        { japones: '次第', lectura: 'shidai', opciones: ['Depende de', 'Independiente de', 'A pesar de', 'Gracias a'], respuesta: 0 },
        { japones: 'だがな', lectura: 'da ga na', opciones: ['Aunque… (casual masculino)', 'Porque', 'Si', 'Mientras'], respuesta: 0 },
        { japones: '早く', lectura: 'hayaku', opciones: ['Rápido / Pronto', 'Lento', 'Tarde', 'Nunca'], respuesta: 0 },
        { japones: 'しろ', lectura: 'shiro', opciones: ['Hazlo (imperativo rudo)', 'No lo hagas', 'Espera', 'Detente'], respuesta: 0 },
        { japones: '言うこと', lectura: 'iu koto', opciones: ['Lo que digo / Órdenes', 'Lo que pienso', 'Lo que siento', 'Lo que veo'], respuesta: 0 },
        { japones: '聞かなきゃ', lectura: 'kikanakya', opciones: ['Si no escuchas / Si no obedeces (contraído)', 'Si escuchas', 'Si obedeces', 'Si ignoras'], respuesta: 0 },
        { japones: '嫌われちゃう', lectura: 'kiraware chau', opciones: ['Te van a odiar / Acabarás siendo odiada', 'Te amarán', 'Te ignorarán', 'Te admirarán'], respuesta: 0 }
    ],
    
    // MAZO 10
    10: [
        { japones: '指示', lectura: 'shiji', opciones: ['Instrucciones / Órdenes', 'Sugerencias', 'Preguntas', 'Críticas'], respuesta: 0 },
        { japones: '通りに', lectura: 'tōri ni', opciones: ['Tal como / Según', 'Contrario a', 'Mejor que', 'Peor que'], respuesta: 0 },
        { japones: 'しゃぶる', lectura: 'shaburu', opciones: ['Chupar / Hacer una felación (vulgar)', 'Morder', 'Lamer', 'Tocar'], respuesta: 0 },
        { japones: '亀頭', lectura: 'kitō', opciones: ['Glande / Cabeza del pene', 'Testículos', 'Pene completo', 'Vagina'], respuesta: 0 },
        { japones: '吸い付いて', lectura: 'suitsuite', opciones: ['Pegarse / Succionar (te-forma)', 'Separarse', 'Empujar', 'Ignorar'], respuesta: 0 },
        { japones: '丹念に', lectura: 'tannen ni', opciones: ['Con cuidado / Minuciosamente', 'Descuidado', 'Rápidamente', 'Superficialmente'], respuesta: 0 },
        { japones: '意識', lectura: 'ishiki', opciones: ['Conciencia / Ser consciente', 'Inconsciente', 'Despistado', 'Dormido'], respuesta: 0 },
        { japones: '丁寧に', lectura: 'teinei ni', opciones: ['Cortésmente / Con cuidado', 'Groseramente', 'Rápidamente', 'Flojamente'], respuesta: 0 },
        { japones: 'しながら', lectura: 'shinagara', opciones: ['Mientras', 'Antes', 'Después', 'En vez de'], respuesta: 0 },
        { japones: '舌', lectura: 'shita', opciones: ['Lengua', 'Labios', 'Dientes', 'Garganta'], respuesta: 0 }
    ],
    
    // MAZO 11
    11: [
        { japones: '絡ませろ', lectura: 'karamasero', opciones: ['Envuelve / Enreda (imperativo)', 'Separa', 'Suelta', 'Ignora'], respuesta: 0 },
        { japones: '一日', lectura: 'ichinichi', opciones: ['Un día', 'Una semana', 'Un mes', 'Un año'], respuesta: 0 },
        { japones: '熟成された', lectura: 'jukusei sareta', opciones: ['Madurado / Fermentado', 'Crudo', 'Fresco', 'Podrido'], respuesta: 0 },
        { japones: '味', lectura: 'aji', opciones: ['Sabor', 'Olor', 'Textura', 'Color'], respuesta: 0 },
        { japones: '全く', lectura: 'mattaku', opciones: ['Completamente / Totalmente', 'Parcialmente', 'Nada', 'Un poco'], respuesta: 0 },
        { japones: '美味そうに', lectura: 'oishisō ni', opciones: ['Como si fuera delicioso', 'Como si fuera asqueroso', 'Como si fuera normal', 'Como si fuera amargo'], respuesta: 0 },
        { japones: '咥えやがって', lectura: 'kue yagatte', opciones: ['Lo estás metiendo en la boca (despectivo)', 'Lo escupes', 'Lo ignoras', 'Lo guardas'], respuesta: 0 },
        { japones: 'くち', lectura: 'kuchi', opciones: ['Boca', 'Nariz', 'Oídos', 'Ojos'], respuesta: 0 },
        { japones: 'アゴ', lectura: 'ago', opciones: ['Mandíbula', 'Mejilla', 'Frente', 'Mentón'], respuesta: 0 },
        { japones: '外れそう', lectura: 'hazuresō', opciones: ['Parece que se va a desencajar', 'Firmemente puesto', 'Roto', 'Perdido'], respuesta: 0 }
    ],
    
    // MAZO 12
    12: [
        { japones: '太くて', lectura: 'futokute', opciones: ['Grueso y…', 'Delgado y', 'Largo y', 'Corto y'], respuesta: 0 },
        { japones: '熱い', lectura: 'atsui', opciones: ['Caliente', 'Frío', 'Tibio', 'Helado'], respuesta: 0 },
        { japones: '美味しい', lectura: 'oishii', opciones: ['Delicioso', 'Asqueroso', 'Normal', 'Amargo'], respuesta: 0 },
        { japones: 'わけ無いでしょ', lectura: 'wake nai desho', opciones: ['No hay forma / Imposible que sea', 'Es posible', 'Seguro que sí', 'Quizás'], respuesta: 0 },
        { japones: '苦くて', lectura: 'nigakute', opciones: ['Amargo y…', 'Dulce y', 'Salado y', 'Ácido y'], respuesta: 0 },
        { japones: 'しょっぱくて', lectura: 'shoppakute', opciones: ['Salado y…', 'Dulce y', 'Amargo y', 'Picante y'], respuesta: 0 },
        { japones: 'いやらしい', lectura: 'iyarashii', opciones: ['Pervertido / Lascivo', 'Inocente', 'Normal', 'Elegante'], respuesta: 0 },
        { japones: '最低', lectura: 'saitei', opciones: ['Lo peor / Asqueroso', 'Lo mejor', 'Normal', 'Excelente'], respuesta: 0 },
        { japones: '味', lectura: 'aji', opciones: ['Sabor', 'Olor', 'Textura', 'Apariencia'], respuesta: 0 },
        { japones: 'むせ返るような', lectura: 'musekaeru yō na', opciones: ['Abrumador / Sofocante', 'Suave', 'Ligero', 'Fresco'], respuesta: 0 }
    ],
    
    // MAZO 13
    13: [
        { japones: '雄', lectura: 'osu', opciones: ['Macho (animal)', 'Hembra', 'Joven', 'Adulto'], respuesta: 0 },
        { japones: '臭い', lectura: 'kusai', opciones: ['Olor / Hedor', 'Fragante', 'Inodoro', 'Dulce'], respuesta: 0 },
        { japones: '口いっぱいに', lectura: 'kuchi ippai ni', opciones: ['Por toda la boca', 'Un poco', 'Nada', 'Solo en la lengua'], respuesta: 0 },
        { japones: '染み付いてくる', lectura: 'shimitsuite kuru', opciones: ['Se impregna / Penetra', 'Se evapora', 'Desaparece', 'Se diluye'], respuesta: 0 },
        { japones: 'つうか', lectura: 'tsūka', opciones: ['En serio / Hablando de… (coloquial)', 'De broma', 'De verdad', 'Quizás'], respuesta: 0 },
        { japones: '初めて', lectura: 'hajimete', opciones: ['Primera vez', 'Última vez', 'Muchas veces', 'Nunca'], respuesta: 0 },
        { japones: '才能', lectura: 'sainō', opciones: ['Talento', 'Defecto', 'Suerte', 'Esfuerzo'], respuesta: 0 },
        { japones: '奉仕', lectura: 'hōshi', opciones: ['Servicio / Complacer (sexual en contexto)', 'Rechazo', 'Ignorancia', 'Indiferencia'], respuesta: 0 },
        { japones: 'し始めて', lectura: 'shi hajimete', opciones: ['Empecé a hacer (te-forma)', 'Terminé de hacer', 'Dejé de hacer', 'Olvidé hacer'], respuesta: 0 },
        { japones: '数分', lectura: 'sūfun', opciones: ['Unos minutos / Varios minutos', 'Unas horas', 'Unos segundos', 'Un día'], respuesta: 0 }
    ],
    
    // MAZO 14
    14: [
        { japones: '慣れてきた', lectura: 'narete kita', opciones: ['Me estoy acostumbrando (progresivo)', 'Me desacostumbro', 'Odio', 'Ignoro'], respuesta: 0 },
        { japones: '始めて', lectura: 'hajimete', opciones: ['Primera vez', 'Última vez', 'Siempre', 'Nunca'], respuesta: 0 },
        { japones: '窄めて', lectura: 'tsumamete', opciones: ['Estrechando / Apretando (te-forma)', 'Abriendo', 'Relajando', 'Ignorando'], respuesta: 0 },
        { japones: '頬張り', lectura: 'hoobari', opciones: ['Llenar las mejillas / Meter en la boca', 'Vaciar la boca', 'Escupir', 'Masticar'], respuesta: 0 },
        { japones: 'そのまま', lectura: 'sono mama', opciones: ['Tal como estás / Así mismo', 'Cambiando', 'Mejorando', 'Empeorando'], respuesta: 0 },
        { japones: '絡ませながら', lectura: 'karamase nagara', opciones: ['Mientras envuelves / Enredas', 'Mientras separas', 'Mientras ignoras', 'Mientras sueltas'], respuesta: 0 },
        { japones: '上下に', lectura: 'jōge ni', opciones: ['Arriba y abajo', 'Izquierda y derecha', 'Adentro y afuera', 'Delante y detrás'], respuesta: 0 },
        { japones: 'ピストン運動', lectura: 'pisuton undō', opciones: ['Movimiento de pistón (vaivén sexual)', 'Movimiento circular', 'Movimiento estático', 'Movimiento rápido'], respuesta: 0 },
        { japones: '先端', lectura: 'sentan', opciones: ['Punta / Extremo (del pene)', 'Base', 'Medio', 'Todo'], respuesta: 0 },
        { japones: '亀頭', lectura: 'kitō', opciones: ['Glande / Cabeza del pene', 'Testículos', 'Semen', 'Precum'], respuesta: 0 }
    ],
    
    // MAZO 15
    15: [
        { japones: '舐めあげる', lectura: 'nameageru', opciones: ['Lamer hacia arriba / Recorrer lamiendo', 'Morder', 'Chupar', 'Tocar'], respuesta: 0 },
        { japones: '良い', lectura: 'yoi / ii', opciones: ['Bien / Genial', 'Mal', 'Normal', 'Aburrido'], respuesta: 0 },
        { japones: '飲めっ', lectura: 'nome!', opciones: ['¡Traga! (imperativo rudo)', '¡Escupe!', '¡Guarda!', '¡Tira!'], respuesta: 0 },
        { japones: '全部', lectura: 'zenbu', opciones: ['Todo', 'Nada', 'Algo', 'Poco'], respuesta: 0 },
        { japones: 'これで', lectura: 'kore de', opciones: ['Con esto', 'Sin esto', 'A pesar de esto', 'Antes de esto'], respuesta: 0 },
        { japones: '良く', lectura: 'yoku', opciones: ['Bien / Muy bien', 'Mal', 'Regular', 'Terrible'], respuesta: 0 },
        { japones: '上手に', lectura: 'jōzu ni', opciones: ['Hábilmente / Bien', 'Torpemente', 'Normalmente', 'Rápidamente'], respuesta: 0 },
        { japones: '出来た', lectura: 'dekita', opciones: ['Pudo hacer / Logró', 'Falló', 'Intentó', 'Renunció'], respuesta: 0 },
        { japones: 'ちゃんと', lectura: 'chanto', opciones: ['Correctamente / Como corresponde', 'Mal', 'A medias', 'Sin esfuerzo'], respuesta: 0 },
        { japones: 'ご褒美', lectura: 'go-hōbi', opciones: ['Recompensa / Premio', 'Castigo', 'Crítica', 'Ignorancia'], respuesta: 0 }
    ],
    
    // MAZO 16
    16: [
        { japones: 'やらん', lectura: 'yaran', opciones: ['Tengo que dar (forma contraída de yaranai to)', 'No daré', 'Quizás dé', 'Olvidé dar'], respuesta: 0 },
        { japones: 'むせ返る', lectura: 'musekaeru', opciones: ['Abrumador / Sofocante (olor fuerte)', 'Suave', 'Ligero', 'Agradable'], respuesta: 0 },
        { japones: 'メス', lectura: 'mesu', opciones: ['Hembra (animal/sexual, despectivo)', 'Macho', 'Neutro', 'Joven'], respuesta: 0 },
        { japones: '匂い', lectura: 'nioi', opciones: ['Olor / Aroma', 'Sabor', 'Textura', 'Sonido'], respuesta: 0 },
        { japones: 'どれどれ', lectura: 'dore dore', opciones: ['A ver / Déjame ver (curiosidad casual)', 'No mires', 'Ignora', 'Olvida'], respuesta: 0 },
        { japones: '美味そう', lectura: 'oishisō', opciones: ['Parece delicioso', 'Parece asqueroso', 'Parece normal', 'Parece amargo'], respuesta: 0 },
        { japones: '中身', lectura: 'nakami', opciones: ['Interior / Por dentro', 'Exterior', 'Superficie', 'Borde'], respuesta: 0 },
        { japones: '具合', lectura: 'guai', opciones: ['Estado / Condición', 'Tamaño', 'Forma', 'Color'], respuesta: 0 },
        { japones: '肉厚', lectura: 'nikatsu', opciones: ['Carnoso / Grueso (de carne)', 'Delgado', 'Flojo', 'Duro'], respuesta: 0 },
        { japones: '良い', lectura: 'yoi', opciones: ['Bueno / Excelente', 'Malo', 'Regular', 'Terrible'], respuesta: 0 }
    ],
    
    // MAZO 17
    17: [
        { japones: '膣穴', lectura: 'chitsuketsu', opciones: ['Agujero vaginal / Vagina', 'Ano', 'Clítoris', 'Pene'], respuesta: 0 },
        { japones: 'アソコ', lectura: 'asoko', opciones: ['Allá abajo / Mis partes íntimas (eufemismo)', 'Allá arriba', 'El estómago', 'La cabeza'], respuesta: 0 },
        { japones: '舐められちゃってる', lectura: 'namerare chatte ru', opciones: ['Me están lamiendo (pasivo + te-forma)', 'Estoy lamiendo', 'Dejé de lamer', 'Ignoré'], respuesta: 0 },
        { japones: '何コレ', lectura: 'nani kore', opciones: ['¿Qué es esto?', 'No sé qué es', 'Es normal', 'Es aburrido'], respuesta: 0 },
        { japones: 'おまんこ', lectura: 'omanko', opciones: ['Coño / Vagina (vulgar)', 'Pene', 'Pecho', 'Trasero'], respuesta: 0 },
        { japones: '舐められるの', lectura: 'namerareru no', opciones: ['Que me lamen / Ser lamida', 'Que yo lama', 'Que ignore', 'Que rechace'], respuesta: 0 },
        { japones: '気持ちいい♡', lectura: 'kimochi ii', opciones: ['Se siente bien / Placentero', 'Duele', 'Es molesto', 'Es indiferente'], respuesta: 0 },
        { japones: '一瞬', lectura: 'isshun', opciones: ['En un instante / En un segundo', 'En una hora', 'En un día', 'Nunca'], respuesta: 0 },
        { japones: 'で', lectura: 'de', opciones: ['En / Con', 'Sin', 'A pesar de', 'Por'], respuesta: 0 },
        { japones: 'イキやがった', lectura: 'iki yagatta', opciones: ['Te corriste (despectivo + pasado)', 'No te corriste', 'Estás por correrte', 'Evitaste correrte'], respuesta: 0 }
    ],
    
    // MAZO 18
    18: [
        { japones: 'それじゃあ', lectura: 'sore jaa', opciones: ['Entonces / Pues', 'Sin embargo', 'Además', 'Por ejemplo'], respuesta: 0 },
        { japones: '今から', lectura: 'ima kara', opciones: ['A partir de ahora / Ahora mismo', 'Desde ayer', 'Más tarde', 'Nunca'], respuesta: 0 },
        { japones: '俺', lectura: 'ore', opciones: ['Yo (masculino rudo)', 'Tú', 'Él', 'Nosotros'], respuesta: 0 },
        { japones: 'ハメてやる', lectura: 'hamete yaru', opciones: ['Te voy a meter / Penetrar (arrogante)', 'Te voy a dejar', 'Te voy a ignorar', 'Te voy a ayudar'], respuesta: 0 },
        { japones: '感謝', lectura: 'kansha', opciones: ['Agradecimiento', 'Queja', 'Crítica', 'Indiferencia'], respuesta: 0 },
        { japones: 'しろ', lectura: 'shiro', opciones: ['Hazlo / Agradécemelo (imperativo)', 'No lo hagas', 'Espera', 'Olvida'], respuesta: 0 },
        { japones: '入ってくる', lectura: 'haitte kuru', opciones: ['Está entrando', 'Está saliendo', 'Está quieto', 'Está girando'], respuesta: 0 },
        { japones: '以外', lectura: 'igai', opciones: ['Excepto / Aparte de', 'Incluyendo', 'Solo', 'Especialmente'], respuesta: 0 },
        { japones: 'のに', lectura: 'no ni', opciones: ['A pesar de que', 'Porque', 'Si', 'Mientras'], respuesta: 0 },
        { japones: '締め付け', lectura: 'shime tsuke', opciones: ['Apretado / Constricción', 'Flojo', 'Suave', 'Amplio'], respuesta: 0 }
    ],
    
    // MAZO 19
    19: [
        { japones: '中イキしたな', lectura: 'nakadashi shita na', opciones: ['Eyaculaste dentro, ¿verdad?', 'Eyaculaste fuera', 'No eyaculaste', 'Evitaste eyacular'], respuesta: 0 },
        { japones: 'アクメ', lectura: 'akume', opciones: ['Orgasmo / Clímax (término erótico)', 'Inicio', 'Pausa', 'Frustración'], respuesta: 0 },
        { japones: '3時間後', lectura: 'san-jikan-go', opciones: ['3 horas después', '3 horas antes', '3 minutos después', '3 días después'], respuesta: 0 },
        { japones: '限る', lectura: 'kagiru', opciones: ['Limitarse a / Ser lo mejor', 'Ser lo peor', 'Ser normal', 'Ser igual'], respuesta: 0 },
        { japones: '生', lectura: 'nama', opciones: ['Crudo / Sin condón (en contexto sexual)', 'Con condón', 'Cocinado', 'Protegido'], respuesta: 0 },
        { japones: '外', lectura: 'soto', opciones: ['Afuera / Exterior', 'Adentro', 'Al lado', 'Encima'], respuesta: 0 },
        { japones: '出してやる', lectura: 'dashite yaru', opciones: ['Lo sacaré / Eyacularé afuera (arrogante)', 'Lo guardaré', 'Lo retendré', 'Lo evitaré'], respuesta: 0 },
        { japones: '次女', lectura: 'jijo', opciones: ['Segunda hija (en quintillizas: Nino)', 'Primera hija', 'Tercera hija', 'Última hija'], respuesta: 0 },
        { japones: '名器', lectura: 'meiki', opciones: ['Vagina de primera clase / "Famosa" (término erótico)', 'Vagina normal', 'Vagina estrecha', 'Vagina ancha'], respuesta: 0 },
        { japones: 'さすが', lectura: 'sasuga', opciones: ['Como era de esperarse / Típico de', 'Sorprendentemente', 'Normalmente', 'Raramente'], respuesta: 0 }
    ],
    
    // MAZO 20
    20: [
        { japones: '中野', lectura: 'Nakano', opciones: ['Nakano (apellido)', 'Suzuki', 'Tanaka', 'Yamada'], respuesta: 0 },
        { japones: '五姉妹', lectura: 'go-shimai', opciones: ['Quintillizas / Cinco hermanas', 'Trillizas', 'Cuatrillizas', 'Gemelas'], respuesta: 0 },
        { japones: '侮れん', lectura: 'anadoren', opciones: ['No subestimar / No despreciar (forma contraída)', 'Subestimar', 'Despreciar', 'Ignorar'], respuesta: 0 },
        { japones: '早速', lectura: 'sassoku', opciones: ['De inmediato / Enseguida', 'Más tarde', 'Nunca', 'Después'], respuesta: 0 },
        { japones: 'してくれる', lectura: 'shite kureru', opciones: ['¿Me harás el favor?', '¿Te haré el favor?', '¿Nos harás el favor?', '¿Le harás el favor?'], respuesta: 0 },
        { japones: '為に', lectura: 'tame ni', opciones: ['Con el fin de', 'Sin propósito', 'Por accidente', 'A pesar de'], respuesta: 0 },
        { japones: '一週間', lectura: 'isshūkan', opciones: ['Una semana', 'Un día', 'Un mes', 'Un año'], respuesta: 0 },
        { japones: 'たっぷり', lectura: 'tappuri', opciones: ['Abundantemente / Bien cargado', 'Escasamente', 'Justo', 'Demasiado'], respuesta: 0 },
        { japones: '溜め込みました', lectura: 'tamekomimashita', opciones: ['He acumulado (pasado formal)', 'He gastado', 'He perdido', 'He distribuido'], respuesta: 0 },
        { japones: '槍崎', lectura: 'Yarisaki', opciones: ['Yarisaki (apellido del profesor)', 'Nakano', 'Suzuki', 'Tanaka'], respuesta: 0 }
    ],
    
    // MAZO 21
    21: [
        { japones: '仕込んだ', lectura: 'shiikonda', opciones: ['Entrenó / Preparó (en sentido sexual)', 'Ignoró', 'Abandonó', 'Olvidó'], respuesta: 0 },
        { japones: '極上', lectura: 'gokujō', opciones: ['De primera clase / Supremo', 'De mala calidad', 'Normal', 'Mediocre'], respuesta: 0 },
        { japones: '堪能', lectura: 'tannō', opciones: ['Disfrutar a fondo / Saborear', 'Sufrir', 'Ignorar', 'Rechazar'], respuesta: 0 },
        { japones: 'させていただきます', lectura: 'sasete itadakimasu', opciones: ['Voy a permitirme (formal humilde)', 'Voy a prohibirme', 'Voy a ignorar', 'Voy a rechazar'], respuesta: 0 },
        { japones: 'なんとなんと', lectura: 'nan to nanto', opciones: ['Qué sorpresa / Vaya vaya', 'Nada especial', 'Obviamente', 'Desafortunadamente'], respuesta: 0 },
        { japones: '自ら', lectura: 'mizukara', opciones: ['Por sí sola / Voluntariamente', 'Forzadamente', 'Accidentalmente', 'Involuntariamente'], respuesta: 0 },
        { japones: '進んで', lectura: 'susunde', opciones: ['Avanzando / Lanzándose', 'Retrocediendo', 'Esperando', 'Evitando'], respuesta: 0 },
        { japones: 'キンタマ', lectura: 'kintama', opciones: ['Huevos / Testículos (vulgar)', 'Pene', 'Vagina', 'Pecho'], respuesta: 0 },
        { japones: 'しゃぶりつく', lectura: 'shaburitsuku', opciones: ['Chupar con avidez / Aferrarse chupando', 'Lamer suavemente', 'Morder', 'Ignorar'], respuesta: 0 },
        { japones: '教育', lectura: 'kyōiku', opciones: ['Educación', 'Ignorancia', 'Abandono', 'Corrupción'], respuesta: 0 }
    ],
    
    // MAZO 22
    22: [
        { japones: 'しっかり', lectura: 'shikkari', opciones: ['Firmemente / Bien', 'Débilmente', 'Superficialmente', 'Inseguramente'], respuesta: 0 },
        { japones: '行き届いて', lectura: 'yukitodoite', opciones: ['Ha llegado / Ha sido impartida', 'Ha fallado', 'Ha sido ignorada', 'Ha sido rechazada'], respuesta: 0 },
        { japones: '証拠', lectura: 'shōko', opciones: ['Prueba / Evidencia', 'Mentira', 'Excusa', 'Negación'], respuesta: 0 },
        { japones: 'いやはや', lectura: 'iyahaya', opciones: ['Vaya vaya / En serio', 'No importa', 'Obviamente', 'Desafortunadamente'], respuesta: 0 },
        { japones: '槍崎先生', lectura: 'Yarisaki-sensei', opciones: ['Profesor Yarisaki', 'Profesor Suzuki', 'Profesor Tanaka', 'Profesor Yamada'], respuesta: 0 },
        { japones: '素晴らしい', lectura: 'subarashii', opciones: ['Magnífico / Maravilloso', 'Terrible', 'Normal', 'Aburrido'], respuesta: 0 },
        { japones: '教育指導', lectura: 'kyōiku shidō', opciones: ['Guía educativa (irónico por entrenamiento sexual)', 'Abandono educativo', 'Ignorancia', 'Corrupción'], respuesta: 0 },
        { japones: 'には', lectura: 'ni wa', opciones: ['Ante / Hacia', 'Desde', 'Con', 'Sin'], respuesta: 0 },
        { japones: '頭が下がります', lectura: 'atama ga sagarimasu', opciones: ['Inclino la cabeza (en respeto/irónico)', 'Levanto la cabeza', 'Niego con la cabeza', 'Giro la cabeza'], respuesta: 0 },
        { japones: '教頭先生', lectura: 'kyōtō-sensei', opciones: ['Subdirector / Vicedirector (del colegio)', 'Director', 'Profesor', 'Estudiante'], respuesta: 0 }
    ],
    
    // MAZO 23
    23: [
        { japones: '我々', lectura: 'wareware', opciones: ['Nosotros (formal)', 'Ellos', 'Ustedes', 'Vosotros'], respuesta: 0 },
        { japones: '待っている', lectura: 'matte iru', opciones: ['Estamos esperando', 'Estamos ignorando', 'Estamos yendo', 'Estamos dejando'], respuesta: 0 },
        { japones: '一発', lectura: 'ippatsu', opciones: ['Una vez / Un disparo', 'Muchas veces', 'Nunca', 'Siempre'], respuesta: 0 },
        { japones: '射精', lectura: 'shasei', opciones: ['Eyaculación', 'Excitarse', 'Calmarse', 'Detenerse'], respuesta: 0 },
        { japones: '代わって', lectura: 'kawatte', opciones: ['Cambia / Pásanos el turno', 'Quédate', 'Ignora', 'Rechaza'], respuesta: 0 },
        { japones: '下さい', lectura: 'kudasai', opciones: ['Por favor (formal)', 'No', 'Gracias', 'Adiós'], respuesta: 0 },
        { japones: 'わかっています', lectura: 'wakatte imasu', opciones: ['Lo entiendo / Lo sé', 'No entiendo', 'No sé', 'Me confunde'], respuesta: 0 },
        { japones: 'とも', lectura: 'tomo', opciones: ['Por supuesto / Claro que sí', 'De ninguna manera', 'Quizás', 'Nunca'], respuesta: 0 },
        { japones: '表情', lectura: 'hyōjō', opciones: ['Expresión (facial)', 'Voz', 'Postura', 'Movimiento'], respuesta: 0 },
        { japones: 'ソソります', lectura: 'sosorimasu', opciones: ['Es provocadora / Excita', 'Es aburrida', 'Es indiferente', 'Es repulsiva'], respuesta: 0 }
    ],
    
    // MAZO 24
    24: [
        { japones: '会場限定', lectura: 'kaijō gentei', opciones: ['Exclusivo del evento / Venue-limited', 'Disponible en todas partes', 'En línea', 'En tiendas'], respuesta: 0 },
        { japones: '鍋屋敷', lectura: 'Nabe Yashiki', opciones: ['(Título o círculo del doujinshi)', 'Editorial comercial', 'Tienda', 'Biblioteca'], respuesta: 0 },
        { japones: '思わず', lectura: 'omowazu', opciones: ['Sin querer / Involuntariamente', 'Intencionalmente', 'Con esfuerzo', 'Con planeación'], respuesta: 0 },
        { japones: '我慢汁', lectura: 'gaman-jiru', opciones: ['Líquido preseminal / Precum', 'Semen', 'Orina', 'Sudor'], respuesta: 0 },
        { japones: '溢れてしまいました', lectura: 'afurete shimaimashita', opciones: ['Se ha desbordado', 'Se ha contenido', 'Se ha secado', 'Se ha evaporado'], respuesta: 0 },
        { japones: 'カウパー', lectura: 'kaupā', opciones: ['Precum / Líquido preseminal (abreviado)', 'Semen completo', 'Orina', 'Saliva'], respuesta: 0 },
        { japones: '舌', lectura: 'shita', opciones: ['Lengua', 'Labios', 'Dientes', 'Garganta'], respuesta: 0 },
        { japones: '舐め取り', lectura: 'nametori', opciones: ['Limpiar lamiendo / Lamer y tragar', 'Escupir', 'Ignorar', 'Limpiar con paño'], respuesta: 0 },
        { japones: 'なさい', lectura: 'nasai', opciones: ['Hazlo (imperativo suave/formal)', 'No lo hagas', 'Espera', 'Olvídalo'], respuesta: 0 }
    ],
    
    
    'D1': [
        { japones: '強制退去', lectura: 'kyōsei taikyo', opciones: ['Desalojo forzoso / Expulsión', 'Invitación voluntaria', 'Permiso de entrada', 'Contrato de alquiler'], respuesta: 0 },
        { japones: '生活費', lectura: 'seikatsu-hi', opciones: ['Gastos de vida / Costo de vida', 'Ingresos extras', 'Ahorros personales', 'Deudas pendientes'], respuesta: 0 },
        { japones: '稼げると', lectura: 'kasegeru to', opciones: ['Que se puede ganar (dinero)', 'Que se puede perder', 'Que se debe ahorrar', 'Que se debe invertir'], respuesta: 0 },
        { japones: '話題の', lectura: 'wadai no', opciones: ['Que está de moda / Que es tema', 'Que está olvidado', 'Que es secreto', 'Que es impopular'], respuesta: 0 },
        { japones: '馴れ馴れしい', lectura: 'narenare shii', opciones: ['Demasiado familiar / Confianzudo', 'Excesivamente tímido', 'Profesionalmente distante', 'Cortésmente reservado'], respuesta: 0 },
        { japones: '奇遇', lectura: 'kigū', opciones: ['Casualidad / Coincidencia', 'Encuentro planeado', 'Cita programada', 'Evitación intencional'], respuesta: 0 },
        { japones: '到着した', lectura: 'tōchaku shita', opciones: ['He llegado', 'Me he ido', 'Me he perdido', 'Me he retrasado'], respuesta: 0 },
        { japones: '特徴', lectura: 'tokuchō', opciones: ['Características distintivas', 'Defectos notables', 'Ventajas competitivas', 'Similitudes comunes'], respuesta: 0 },
        { japones: '移動', lectura: 'idō', opciones: ['Moverse / Cambiar de lugar', 'Permanecer quieto', 'Establecerse fijo', 'Anclarse en sitio'], respuesta: 0 },
        { japones: 'ご休意', lectura: 'go-kyūi', opciones: ['Descanso / Relax (término de hotel de amor)', 'Trabajo intenso', 'Actividad física', 'Reunión formal'], respuesta: 0 }
    ],
    
    'D2': [
        { japones: 'ご宿泊', lectura: 'go-shukuhaku', opciones: ['Hospedaje / Pernoctar', 'Visita diurna', 'Reunión breve', 'Salida inmediata'], respuesta: 0 },
        { japones: '最大', lectura: 'saidai', opciones: ['Máximo', 'Mínimo indispensable', 'Promedio estándar', 'Límite inferior'], respuesta: 0 },
        { japones: 'ご入室', lectura: 'go-nyūshitsu', opciones: ['Ingreso / Entrada a la habitación', 'Salida del cuarto', 'Limpieza del espacio', 'Reserva cancelada'], respuesta: 0 },
        { japones: '黙っていて', lectura: 'damatte ite', opciones: ['Guarda silencio / No digas nada', 'Habla libremente', 'Expresa opiniones', 'Discute abiertamente'], respuesta: 0 },
        { japones: '次第', lectura: 'shidai', opciones: ['Depende de / Según', 'Independiente de', 'Contrario a', 'Similar a'], respuesta: 0 },
        { japones: '指示', lectura: 'shiji', opciones: ['Instrucciones / Órdenes', 'Sugerencias opcionales', 'Peticiones informales', 'Consultas dudosas'], respuesta: 0 },
        { japones: '亀頭', lectura: 'kitō', opciones: ['Glande / Cabeza del pene', 'Cuerpo del pene', 'Testículos completos', 'Precum líquido'], respuesta: 0 },
        { japones: '意識', lectura: 'ishiki', opciones: ['Conciencia / Ser consciente', 'Estado inconsciente', 'Despiste temporal', 'Sueño profundo'], respuesta: 0 },
        { japones: '丁寧に', lectura: 'teinei ni', opciones: ['Cortésmente / Con cuidado', 'Descuidada y rápidamente', 'Groseramente', 'Indiferentemente'], respuesta: 0 },
        { japones: '熟成された', lectura: 'jukusei sareta', opciones: ['Madurado / Fermentado', 'Crudo y fresco', 'Podrido y viejo', 'Inmaduro y verde'], respuesta: 0 }
    ],
    
    'D3': [
        { japones: '咥えやがって', lectura: 'kue yagatte', opciones: ['Lo estás metiendo en la boca (despectivo)', 'Lo estás escupiendo', 'Lo estás ignorando', 'Lo estás guardando'], respuesta: 0 },
        { japones: '雄', lectura: 'osu', opciones: ['Macho (animal)', 'Hembra adulta', 'Cría joven', 'Animal neutro'], respuesta: 0 },
        { japones: '染み付いてくる', lectura: 'shimitsuite kuru', opciones: ['Se impregna / Penetra profundamente', 'Se evapora rápidamente', 'Se queda superficial', 'Desaparece completamente'], respuesta: 0 },
        { japones: '窄めて', lectura: 'tsumamete', opciones: ['Estrechando / Apretando (te-forma)', 'Abriendo ampliamente', 'Relajando suavemente', 'Dejando igual'], respuesta: 0 },
        { japones: '頬張り', lectura: 'hoobari', opciones: ['Llenar las mejillas / Meter en la boca', 'Vaciar la boca', 'Masticar lento', 'Escupir contenido'], respuesta: 0 },
        { japones: '上下に', lectura: 'jōge ni', opciones: ['Arriba y abajo', 'Izquierda y derecha', 'Adentro y afuera', 'Delante y detrás'], respuesta: 0 },
        { japones: 'むせ返る', lectura: 'musekaeru', opciones: ['Abrumador / Sofocante (olor fuerte)', 'Aroma suave', 'Falta de olor', 'Fragancia ligera'], respuesta: 0 },
        { japones: '膣穴', lectura: 'chitsuketsu', opciones: ['Agujero vaginal / Vagina', 'Entrada anal', 'Abertura uretral', 'Cavidad bucal'], respuesta: 0 },
        { japones: 'アクメ', lectura: 'akume', opciones: ['Orgasmo / Clímax (término erótico)', 'Inicio de la excitación', 'Punto de frustración', 'Estado de calma'], respuesta: 0 },
        { japones: '限る', lectura: 'kagiru', opciones: ['Limitarse a / Ser lo mejor', 'Ser lo peor opción', 'Ser promedio normal', 'Ser igual que otros'], respuesta: 0 }
    ],
    
    'D4': [
        { japones: '次女', lectura: 'jijo', opciones: ['Segunda hija (en quintillizas: Nino)', 'Primogénita', 'Hija menor', 'Hija única'], respuesta: 0 },
        { japones: '名器', lectura: 'meiki', opciones: ['Vagina de primera clase / "Famosa" (término erótico)', 'Vagina común', 'Vagina estrecha', 'Vagina inexperta'], respuesta: 0 },
        { japones: '侮れん', lectura: 'anadoren', opciones: ['No subestimar / No despreciar (forma contraída)', 'Subestimar fácilmente', 'Sobreestimar erróneamente', 'Ignorar completamente'], respuesta: 0 },
        { japones: '溜め込みました', lectura: 'tamekomimashita', opciones: ['He acumulado (pasado formal)', 'He derrochado', 'He distribuido', 'He perdido'], respuesta: 0 },
        { japones: '仕込んだ', lectura: 'shiikonda', opciones: ['Entrenó / Preparó (en sentido sexual)', 'Descuidó el entrenamiento', 'Olvidó enseñar', 'Abandonó la preparación'], respuesta: 0 },
        { japones: '極上', lectura: 'gokujō', opciones: ['De primera clase / Supremo', 'De calidad inferior', 'Promedio normal', 'Defectuoso'], respuesta: 0 },
        { japones: '進んで', lectura: 'susunde', opciones: ['Avanzando / Lanzándose', 'Retrocediendo con miedo', 'Quedándose quieto', 'Evitando participar'], respuesta: 0 },
        { japones: '教育', lectura: 'kyōiku', opciones: ['Educación / Enseñanza', 'Ignorancia voluntaria', 'Malentendido', 'Desinformación'], respuesta: 0 },
        { japones: '行き届いて', lectura: 'yukitodoite', opciones: ['Ha llegado / Ha sido impartida completamente', 'Ha fallado en llegar', 'Ha sido parcial', 'Ha sido rechazada'], respuesta: 0 },
        { japones: '証拠', lectura: 'shōko', opciones: ['Prueba / Evidencia concreta', 'Mentira fabricada', 'Excusa pobre', 'Negación vacía'], respuesta: 0 }
    ],
    
    'D5': [
        { japones: '教育指導', lectura: 'kyōiku shidō', opciones: ['Guía educativa (irónico por entrenamiento sexual)', 'Abandono educativo', 'Mal consejo', 'Falta de dirección'], respuesta: 0 },
        { japones: '教頭先生', lectura: 'kyōtō-sensei', opciones: ['Subdirector / Vicedirector (del colegio)', 'Director principal', 'Profesor ordinario', 'Estudiante avanzado'], respuesta: 0 },
        { japones: '会場限定', lectura: 'kaijō gentei', opciones: ['Exclusivo del evento / Venue-limited', 'Disponible en todo lugar', 'Versión en línea', 'Edición general'], respuesta: 0 },
        { japones: '鍋屋敷', lectura: 'Nabe Yashiki', opciones: ['(Título o círculo del doujinshi)', 'Editorial comercial grande', 'Tienda minorista', 'Biblioteca pública'], respuesta: 0 },
        { japones: '舐め取り', lectura: 'nametori', opciones: ['Limpiar lamiendo / Lamer y tragar', 'Escupir despreciativamente', 'Ignorar el fluido', 'Limpiar con toalla'], respuesta: 0 }
    ]
},
        // Sub-contenedor 1.6 (ACTUALIZADO)
    'sub1_6': {
        // MAZO 1
        1: [
            { japones: '必ず', lectura: 'kanarazu', opciones: ['Definitivamente, sin falta', 'Quizás', 'Nunca', 'A veces'], respuesta: 0 },
            { japones: '助けて', lectura: 'tasukete', opciones: ['Ayudar / Rescatar (forma -te)', 'Ignorar', 'Criticar', 'Observar'], respuesta: 0 },
            { japones: 'お待たせしました', lectura: 'omatase shimashita', opciones: ['Hice esperar / Disculpe la espera', 'Llegué temprano', 'No esperé', 'Me fui'], respuesta: 0 },
            { japones: '正解', lectura: 'seikai', opciones: ['Respuesta correcta, acierto', 'Respuesta incorrecta', 'Pregunta', 'Duda'], respuesta: 0 },
            { japones: '抜いたら', lectura: 'nukitara', opciones: ['Si aflojas / Si quitas (condicional de 抜く)', 'Si metes', 'Si guardas', 'Si rompes'], respuesta: 0 },
            { japones: '動画', lectura: 'dōga', opciones: ['Video', 'Foto', 'Audio', 'Texto'], respuesta: 0 },
            { japones: 'ネット', lectura: 'netto', opciones: ['Internet', 'Teléfono', 'Televisión', 'Radio'], respuesta: 0 },
            { japones: 'に', lectura: 'ni', opciones: ['A / En', 'Desde', 'Con', 'Sin'], respuesta: 0 },
            { japones: '流す', lectura: 'nagasu', opciones: ['Hacer fluir / Subir / Filtrar', 'Guardar', 'Borrar', 'Comprimir'], respuesta: 0 },
            { japones: '返事', lectura: 'henji', opciones: ['Respuesta / Contestación', 'Pregunta', 'Silencio', 'Ignorancia'], respuesta: 0 }
        ],
        
        // MAZO 2
        2: [
            { japones: '個人撮影', lectura: 'kojin satsuei', opciones: ['Sesión de fotos/vídeo personal / Grabación privada', 'Transmisión en vivo', 'Película profesional', 'Fotografía pública'], respuesta: 0 },
            { japones: '約束', lectura: 'yakusoku', opciones: ['Promesa', 'Mentira', 'Olvido', 'Rechazo'], respuesta: 0 },
            { japones: '捲らないで', lectura: 'mekuranai de', opciones: ['No levantes / No subas (negativo -te de 捲る)', 'Sube', 'Baja', 'Guarda'], respuesta: 0 },
            { japones: '慣れてる', lectura: 'nareteru', opciones: ['Estás acostumbrada (contraído de 慣れている)', 'Eres nueva', 'Te confundes', 'Te aburres'], respuesta: 0 },
            { japones: '裸', lectura: 'hadaka', opciones: ['Desnuda / Desnudez', 'Vestida', 'Semi-vestida', 'Disfrazada'], respuesta: 0 },
            { japones: '経験', lectura: 'keiken', opciones: ['Experiencia', 'Ignorancia', 'Teoría', 'Imaginación'], respuesta: 0 },
            { japones: '観る', lectura: 'miru', opciones: ['Ver / Mirar (a veces usado para "ver" en contexto erótico)', 'Escuchar', 'Tocar', 'Oler'], respuesta: 0 },
            { japones: '安心', lectura: 'anshin', opciones: ['Tranquilizar / Estar tranquilo', 'Preocuparse', 'Asustarse', 'Enojarse'], respuesta: 0 },
            { japones: 'お世話に', lectura: 'osewa ni', opciones: ['Favores / Cuidado', 'Negligencia', 'Abandono', 'Indiferencia'], respuesta: 0 },
            { japones: '撮影', lectura: 'satsuei', opciones: ['Filmación / Grabación / Shooting', 'Escritura', 'Pintura', 'Escultura'], respuesta: 0 }
        ],
        
        // MAZO 3
        3: [
            { japones: '年上', lectura: 'toshiue', opciones: ['Mayor (de edad)', 'Más joven', 'Misma edad', 'Anciano'], respuesta: 0 },
            { japones: '半勃ち', lectura: 'hanbochi', opciones: ['Medio erecto / Semi-erección', 'Completamente erecto', 'Flácido', 'Excitado'], respuesta: 0 },
            { japones: '役者', lectura: 'yakusha', opciones: ['Actor / Actriz', 'Director', 'Productor', 'Espectador'], respuesta: 0 },
            { japones: '魂', lectura: 'tamashii', opciones: ['Alma / Espíritu', 'Cuerpo', 'Mente', 'Corazón'], respuesta: 0 },
            { japones: '火', lectura: 'hi', opciones: ['Fuego', 'Agua', 'Aire', 'Tierra'], respuesta: 0 },
            { japones: '付いた', lectura: 'tsuita', opciones: ['Se prendió (pasado de 付く)', 'Se apagó', 'Se rompió', 'Se perdió'], respuesta: 0 },
            { japones: '変身', lectura: 'henshin', opciones: ['Transformación', 'Estancamiento', 'Regresión', 'Desaparición'], respuesta: 0 },
            { japones: '一瞬', lectura: 'isshun', opciones: ['En un instante', 'Para siempre', 'Lentamente', 'Nunca'], respuesta: 0 },
            { japones: '生徒', lectura: 'seito', opciones: ['Alumna / Estudiante', 'Profesora', 'Directora', 'Graduada'], respuesta: 0 },
            { japones: '女優', lectura: 'joyū', opciones: ['Actriz', 'Actor', 'Modelo', 'Cantante'], respuesta: 0 }
        ],
        
        // MAZO 4
        4: [
            { japones: 'ポテンシャル', lectura: 'potensharu', opciones: ['Potencial', 'Limitación', 'Realidad', 'Fracaso'], respuesta: 0 },
            { japones: '失礼', lectura: 'shitsurei', opciones: ['Con permiso / Disculpa (al empezar acción)', 'Grosería', 'Elogio', 'Indiferencia'], respuesta: 0 },
            { japones: '見ていて', lectura: 'mite ite', opciones: ['Estén mirando (forma -te continua)', 'Ignoren', 'Cierren los ojos', 'Váyanse'], respuesta: 0 },
            { japones: '濃厚', lectura: 'nōkō', opciones: ['Profundo / Intenso', 'Débil', 'Superficial', 'Ligero'], respuesta: 0 },
            { japones: '共', lectura: 'domo / tomo', opciones: ['(Despectivo plural)', 'Individual', 'Respetuoso', 'Formal'], respuesta: 0 },
            { japones: '固く', lectura: 'kataku', opciones: ['Duro / Rígido', 'Blando', 'Flexible', 'Frágil'], respuesta: 0 },
            { japones: '嬉しい', lectura: 'ureshii', opciones: ['Feliz / Contenta', 'Triste', 'Enojada', 'Asustada'], respuesta: 0 },
            { japones: 'オナ禁', lectura: 'onakin', opciones: ['Abstinencia de masturbación', 'Masturbación frecuente', 'Sexo regular', 'Celibato'], respuesta: 0 },
            { japones: 'キク', lectura: 'kiku', opciones: ['Hace efecto / Funciona', 'Falla', 'No sirve', 'Empeora'], respuesta: 0 },
            { japones: '精液', lectura: 'seieki', opciones: ['Semen', 'Orina', 'Sudor', 'Saliva'], respuesta: 0 }
        ],
        
        // MAZO 5
        5: [
            { japones: 'どんどん', lectura: 'dondon', opciones: ['Cada vez más / Rápidamente', 'Lentamente', 'Decreciendo', 'Estancado'], respuesta: 0 },
            { japones: '湧いてくる', lectura: 'waite kuru', opciones: ['Brota / Surge', 'Desaparece', 'Se estanca', 'Se evapora'], respuesta: 0 },
            { japones: '溶ける', lectura: 'tokeru', opciones: ['Se derrite / Se funde', 'Se solidifica', 'Se evapora', 'Se congela'], respuesta: 0 },
            { japones: '終わって', lectura: 'owatte', opciones: ['Aunque termine (forma -te)', 'Aunque empiece', 'Mientras continúe', 'Antes de empezar'], respuesta: 0 },
            { japones: '離すなよ', lectura: 'hanasu na yo', opciones: ['No sueltes / No separes', 'Suelta', 'Acerca', 'Ignora'], respuesta: 0 },
            { japones: 'セリフ', lectura: 'serifu', opciones: ['Líneas / Diálogo (de guion o actuación)', 'Acción', 'Expresión', 'Silencio'], respuesta: 0 },
            { japones: '覚えた', lectura: 'oboeta', opciones: ['Memorizaste / Aprendiste (pasado)', 'Olvidaste', 'Ignoraste', 'Confundiste'], respuesta: 0 },
            { japones: 'お仕置き', lectura: 'oshioki', opciones: ['Castigo / Punishment', 'Premio', 'Ignorancia', 'Perdón'], respuesta: 0 },
            { japones: '仕方ねぇ', lectura: 'shikata nē', opciones: ['No hay remedio (coloquial grosero)', 'Hay solución', 'Es fácil', 'Es opcional'], respuesta: 0 },
            { japones: '生徒', lectura: 'seito', opciones: ['Alumna', 'Profesora', 'Directora', 'Visitante'], respuesta: 0 }
        ],
        
        // MAZO 6
        6: [
            { japones: '徹底的に', lectura: 'tetteiteki ni', opciones: ['A fondo / Completamente', 'Superficialmente', 'Parcialmente', 'Ligeramente'], respuesta: 0 },
            { japones: '教育', lectura: 'kyōiku', opciones: ['Educar / Disciplinar', 'Ignorar', 'Corromper', 'Liberar'], respuesta: 0 },
            { japones: 'あげたかった', lectura: 'agetakatta', opciones: ['Quería dar', 'Quería recibir', 'Quería negar', 'Quería guardar'], respuesta: 0 },
            { japones: '夢中', lectura: 'muchū', opciones: ['Obsesionadas', 'Indiferentes', 'Aburridas', 'Resistentes'], respuesta: 0 },
            { japones: '程', lectura: 'hodo', opciones: ['Tanto / Al punto', 'Poco', 'Nada', 'Demasiado'], respuesta: 0 },
            { japones: '年上', lectura: 'toshiue', opciones: ['Mayor de edad', 'Menor de edad', 'Misma edad', 'Anciana'], respuesta: 0 },
            { japones: '捧げちゃう', lectura: 'sasagechau', opciones: ['Voy a dedicar / Entregar', 'Voy a negar', 'Voy a guardar', 'Voy a romper'], respuesta: 0 },
            { japones: '長女', lectura: 'chōjo', opciones: ['Hija mayor', 'Hija menor', 'Hija única', 'Hija adoptiva'], respuesta: 0 },
            { japones: 'として', lectura: 'to shite', opciones: ['Como', 'A pesar de', 'Debido a', 'Además de'], respuesta: 0 },
            { japones: 'それだけは', lectura: 'sore dake wa', opciones: ['Al menos eso', 'Todo menos eso', 'Nada de eso', 'Además de eso'], respuesta: 0 }
        ],
        
        // MAZO 7
        7: [
            { japones: '確かめな', lectura: 'tashikame na', opciones: ['Tengo que confirmar (imperativo incompleto)', 'Puedo ignorar', 'Debo olvidar', 'Voy a negar'], respuesta: 0 },
            { japones: '処女', lectura: 'shojo', opciones: ['Virgen', 'Experimentada', 'Casada', 'Divorciada'], respuesta: 0 },
            { japones: 'くせに', lectura: 'kuseni', opciones: ['A pesar de / Aunque', 'Debido a', 'Gracias a', 'Además de'], respuesta: 0 },
            { japones: '簡単に', lectura: 'kantan ni', opciones: ['Fácilmente', 'Difícilmente', 'Imposible', 'Complicadamente'], respuesta: 0 },
            { japones: '咥えこみ', lectura: 'kuekomi', opciones: ['Tragar / Meter en la boca (de 咥え込む)', 'Escupir', 'Guardar', 'Ignorar'], respuesta: 0 },
            { japones: 'やがって', lectura: 'yagatte', opciones: ['(Partícula de desprecio/insulto)', '(Partícula de respeto)', '(Partícula neutral)', '(Partícula de cariño)'], respuesta: 0 },
            { japones: 'エロガキ', lectura: 'erogaki', opciones: ['Mocosa pervertida / Niña sucia', 'Niña inocente', 'Mujer adulta', 'Anciana'], respuesta: 0 },
            { japones: '子宮', lectura: 'shikyū', opciones: ['Útero', 'Ovario', 'Vagina', 'Pene'], respuesta: 0 },
            { japones: '潰れちゃう', lectura: 'tsuburechau', opciones: ['Va a ser aplastado / Destruido', 'Va a ser construido', 'Va a ser protegido', 'Va a ser ignorado'], respuesta: 0 },
            { japones: '馴染んだ', lectura: 'najinda', opciones: ['Se ha acostumbrado / Se ha adaptado', 'Se ha resistido', 'Se ha alejado', 'Se ha confundido'], respuesta: 0 }
        ],
        
        // MAZO 8
        8: [
            { japones: '集中', lectura: 'shūchū', opciones: ['Concentrar', 'Distraer', 'Ignorar', 'Dividir'], respuesta: 0 },
            { japones: '快楽', lectura: 'kairaku', opciones: ['Placer', 'Dolor', 'Aburrimiento', 'Indiferencia'], respuesta: 0 },
            { japones: '叩き込んで', lectura: 'tataikikonde', opciones: ['Embestir/Grabar fuerte (de 叩き込む)', 'Sacar suavemente', 'Ignorar', 'Acariciar'], respuesta: 0 },
            { japones: '奥', lectura: 'oku', opciones: ['Fondo / Profundidad', 'Superficie', 'Entrada', 'Borde'], respuesta: 0 },
            { japones: 'グリグリ', lectura: 'guriguri', opciones: ['Remover / Girar fuerte (onomatopeya)', 'Suavemente', 'Lentamente', 'Estático'], respuesta: 0 },
            { japones: 'かき混ぜ', lectura: 'kakimaze', opciones: ['Revolver / Mezclar', 'Separar', 'Ordenar', 'Limpiar'], respuesta: 0 },
            { japones: '毎回', lectura: 'maikai', opciones: ['Cada vez', 'Una vez', 'Nunca', 'Rara vez'], respuesta: 0 },
            { japones: 'コレ', lectura: 'kore', opciones: ['Esto', 'Eso', 'Aquello', 'Nada'], respuesta: 0 },
            { japones: 'おねだり', lectura: 'onedari', opciones: ['Suplica / Pide mimos', 'Rechaza', 'Ignora', 'Ofrece'], respuesta: 0 },
            { japones: '上ってきた', lectura: 'nobotte kita', opciones: ['Está subiendo / Viniendo', 'Está bajando', 'Está estancado', 'Desapareció'], respuesta: 0 }
        ],
        
        // MAZO 9
        9: [
            { japones: '記念すべき', lectura: 'kinen subeki', opciones: ['Memorable', 'Olvidable', 'Normal', 'Aburrido'], respuesta: 0 },
            { japones: '締まる', lectura: 'shimaru', opciones: ['Apretarse / Contraerse / Cerrarse', 'Aflojarse', 'Abirse', 'Relajarse'], respuesta: 0 },
            { japones: '抜いた', lectura: 'nuita', opciones: ['Sacaste / Hiciste eyacular', 'Mantuviste', 'Contuviste', 'Ignoraste'], respuesta: 0 },
            { japones: 'ずっと', lectura: 'zutto', opciones: ['Siempre', 'Nunca', 'A veces', 'Raramente'], respuesta: 0 },
            { japones: 'だった', lectura: 'datta', opciones: ['Fui', 'Soy', 'Seré', 'Era'], respuesta: 0 },
            { japones: '何度も', lectura: 'nando mo', opciones: ['Muchas veces', 'Una vez', 'Pocas veces', 'Nunca'], respuesta: 0 },
            { japones: 'オカズ', lectura: 'okazu', opciones: ['Material (para masturbarse)', 'Comida', 'Bebida', 'Juguete'], respuesta: 0 },
            { japones: '好き放題', lectura: 'suki hōdai', opciones: ['A voluntad / Lo que quiera', 'Con límites', 'Con restricciones', 'Con permiso'], respuesta: 0 },
            { japones: '教師', lectura: 'kyōshi', opciones: ['Profesor', 'Estudiante', 'Director', 'Padre'], respuesta: 0 },
            { japones: '※援交プレイ', lectura: '※en kō purei', opciones: ['※Juego de compensated dating / enjo kōsai roleplay', '※Juego de estudiantes', '※Juego de oficina', '※Juego familiar'], respuesta: 0 }
        ],
        
        // MAZO 10
        10: [
            { japones: '仕込まれた', lectura: 'shikomareta', opciones: ['Te enseñaron / Te entrenaron (pasivo)', 'Te ignoraron', 'Te abandonaron', 'Te castigaron'], respuesta: 0 },
            { japones: '体位', lectura: 'taii', opciones: ['Posición (sexual)', 'Postura', 'Movimiento', 'Expresión'], respuesta: 0 },
            { japones: '教えてもらい', lectura: 'oshiete morai', opciones: ['Me enseñaron / Recibí enseñanza (favor)', 'Enseñé yo', 'Ignoré', 'Olvidé'], respuesta: 0 },
            { japones: '羨ましい', lectura: 'urayamashii', opciones: ['Envidiable', 'Despreciable', 'Normal', 'Indiferente'], respuesta: 0 },
            { japones: 'こうやって', lectura: 'kō yatte', opciones: ['Así / De esta forma', 'De otra forma', 'Sin método', 'Accidentalmente'], respuesta: 0 },
            { japones: 'ヌポヌポ', lectura: 'nupo nupo', opciones: ['¡nupo nupo! (onomatopeya de penetración húmeda)', 'Silencio', 'Sonido seco', 'Grito'], respuesta: 0 },
            { japones: '特濃', lectura: 'tokunō', opciones: ['Super concentrado / Espeso', 'Diluido', 'Ligero', 'Acuoso'], respuesta: 0 },
            { japones: '未成年', lectura: 'miseinen', opciones: ['Menor de edad', 'Mayor de edad', 'Anciano', 'Adulto joven'], respuesta: 0 },
            { japones: '幸せな', lectura: 'shiawase na', opciones: ['Feliz', 'Triste', 'Enojada', 'Asustada'], respuesta: 0 },
            { japones: '脈打ってる', lectura: 'myaku utte ru', opciones: ['Está palpitando', 'Está quieto', 'Está débil', 'Está detenido'], respuesta: 0 }
        ],
        
        // MAZO 11
        11: [
            { japones: 'ぴったり', lectura: 'pittari', opciones: ['Perfectamente / Ajustado', 'Flojo', 'Grande', 'Incomodo'], respuesta: 0 },
            { japones: '押し付けて', lectura: 'oshitsukete', opciones: ['Presionando', 'Soltando', 'Acariciando', 'Ignorando'], respuesta: 0 },
            { japones: '精液', lectura: 'seieki', opciones: ['Semen', 'Orina', 'Sudor', 'Saliva'], respuesta: 0 },
            { japones: '動画', lectura: 'dōga', opciones: ['Video', 'Foto', 'Audio', 'Texto'], respuesta: 0 },
            { japones: '楽しんで', lectura: 'tanoshinde', opciones: ['Disfrutando (forma -te)', 'Sufriendo', 'Aburriéndose', 'Ignorando'], respuesta: 0 },
            { japones: 'くれたら', lectura: 'kuretara', opciones: ['Si me lo haces (condicional)', 'Si no me lo haces', 'Aunque me lo hagas', 'Porque me lo haces'], respuesta: 0 },
            { japones: 'こういう', lectura: 'kō iu', opciones: ['Este tipo de', 'Otro tipo de', 'Ningún tipo de', 'Todos los tipos de'], respuesta: 0 },
            { japones: '悪趣味', lectura: 'akushumi', opciones: ['Mal gusto / De mal gusto', 'Buen gusto', 'Gusto normal', 'Sin gusto'], respuesta: 0 },
            { japones: '怒る', lectura: 'okoru', opciones: ['Enojarse', 'Alegrarse', 'Tranquilizarse', 'Sorprenderse'], respuesta: 0 },
            { japones: '方', lectura: 'hō', opciones: ['Forma / Lado', 'Todo', 'Nada', 'Centro'], respuesta: 0 }
        ],
        
        // MAZO 12
        12: [
            { japones: '寝取ってる', lectura: 'netotteru', opciones: ['Está robando / Netorare (contraído)', 'Está siendo fiel', 'Está solo', 'Está ignorando'], respuesta: 0 },
            { japones: '感', lectura: 'kan', opciones: ['Sensación / Feeling', 'Realidad', 'Imaginación', 'Pensamiento'], respuesta: 0 },
            { japones: '増す', lectura: 'masu', opciones: ['Aumenta', 'Disminuye', 'Mantiene', 'Desaparece'], respuesta: 0 },
            { japones: 'どうせ', lectura: 'dōse', opciones: ['De todos modos / Al final', 'Por primera vez', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: 'してくれないん', lectura: 'shite kurenain', opciones: ['No lo haces por mí (forma contraída)', 'Lo haces por mí', 'Podrías hacerlo', 'Deberías hacerlo'], respuesta: 0 },
            { japones: '全く', lectura: 'mattaku', opciones: ['En serio / Totalmente', 'Parcialmente', 'Nada', 'Un poco'], respuesta: 0 },
            { japones: '呼ばれても', lectura: 'yobaretemo', opciones: ['Aunque las llames', 'Si las llamas', 'Porque las llamas', 'Mientras las llames'], respuesta: 0 },
            { japones: '遠慮なく', lectura: 'enryo naku', opciones: ['Sin reservas / Sin dudar', 'Con timidez', 'Con miedo', 'Con respeto'], respuesta: 0 },
            { japones: '陸上部', lectura: 'rikujō-bu', opciones: ['Club de atletismo / Pista y campo', 'Club de natación', 'Club de fútbol', 'Club de música'], respuesta: 0 },
            { japones: '手伝い', lectura: 'tetsudai', opciones: ['Ayuda / Asistencia', 'Obstaculización', 'Ignorancia', 'Crítica'], respuesta: 0 }
        ],
        
        // MAZO 13
        13: [
            { japones: '遅れて', lectura: 'okurete', opciones: ['Me atrasé (forma -te)', 'Llegué temprano', 'Llegué a tiempo', 'No llegué'], respuesta: 0 },
            { japones: '呼び出して', lectura: 'yobidashite', opciones: ['Llamar / Convocar (forma -te)', 'Ignorar', 'Despedir', 'Rechazar'], respuesta: 0 },
            { japones: '悪かった', lectura: 'warukatta', opciones: ['Fue malo / Perdón (pasado casual)', 'Fue bueno', 'Fue normal', 'Fue excelente'], respuesta: 0 },
            { japones: '話たい', lectura: 'hanashitai', opciones: ['Quiero hablar (forma -tai)', 'No quiero hablar', 'Debo hablar', 'Puedo hablar'], respuesta: 0 },
            { japones: '事', lectura: 'koto', opciones: ['Cosa / Asunto', 'Persona', 'Lugar', 'Tiempo'], respuesta: 0 },
            { japones: '頼み', lectura: 'tanomi', opciones: ['Favor / Petición', 'Rechazo', 'Orden', 'Crítica'], respuesta: 0 }
        ],
        
        // ====================
        // MAZOS DIFÍCILES ESPECIALES - Subcontenedor 1.6
        // ====================
        
        'D1': [
            { japones: '個人撮影', lectura: 'kojin satsuei', opciones: ['Sesión de fotos/vídeo personal / Grabación privada', 'Transmisión pública', 'Película comercial', 'Fotografía de estudio'], respuesta: 0 },
            { japones: '濃厚', lectura: 'nōkō', opciones: ['Profundo / Intenso', 'Superficial / Débil', 'Común / Normal', 'Aburrido / Soso'], respuesta: 0 },
            { japones: '徹底的に', lectura: 'tetteiteki ni', opciones: ['A fondo / Completamente', 'Parcialmente / A medias', 'Rápidamente / Superficial', 'Nunca / Jamás'], respuesta: 0 },
            { japones: '記念すべき', lectura: 'kinen subeki', opciones: ['Memorable / Digno de recordar', 'Olvidable / Sin importancia', 'Común / Ordinario', 'Aburrido / Monótono'], respuesta: 0 },
            { japones: '特濃', lectura: 'tokunō', opciones: ['Super concentrado / Espeso', 'Diluido / Acuoso', 'Normal / Regular', 'Ligero / Suave'], respuesta: 0 },
            { japones: '悪趣味', lectura: 'akushumi', opciones: ['Mal gusto / De mal gusto', 'Buen gusto / Elegante', 'Gusto neutro / Normal', 'Sin gusto definido'], respuesta: 0 },
            { japones: '寝取ってる', lectura: 'netotteru', opciones: ['Está robando / Netorare (contraído)', 'Está siendo fiel / Leal', 'Está solo / Sin pareja', 'Está ignorando / Evitando'], respuesta: 0 },
            { japones: '遠慮なく', lectura: 'enryo naku', opciones: ['Sin reservas / Sin dudar', 'Con timidez / Reserva', 'Con miedo / Temor', 'Con respeto / Formalidad'], respuesta: 0 },
            { japones: '※援交プレイ', lectura: '※en kō purei', opciones: ['※Juego de compensated dating / enjo kōsai roleplay', '※Juego de citas normales', '※Juego de amigos', '※Juego de familia'], respuesta: 0 }
        ]
    },
        // Sub-contenedor 1.7 (ACTUALIZADO CON TUS PALABRAS)
    'sub1_7': {
        // MAZO 1
        1: [
            { japones: '補習', lectura: 'hoshū', opciones: ['clase de refuerzo / tutoría', 'clase normal', 'examen', 'vacaciones'], respuesta: 0 },
            { japones: '帰って', lectura: 'kaette', opciones: ['volver (forma -te)', 'irse', 'quedarse', 'dormir'], respuesta: 0 },
            { japones: 'いつもの', lectura: 'itsumo no', opciones: ['lo de siempre / lo habitual', 'algo nuevo', 'algo raro', 'algo especial'], respuesta: 0 },
            { japones: 'アレ', lectura: 'are', opciones: ['eso / aquello (eufemismo para algo secreto)', 'esto', 'algo', 'nada'], respuesta: 0 },
            { japones: '頼む', lectura: 'tanomu', opciones: ['por favor / te pido', 'rechazo', 'ignoro', 'acepto'], respuesta: 0 },
            { japones: 'やってんだ', lectura: 'yatten da', opciones: ['estoy haciendo (contraído coloquial)', 'no hago', 'voy a hacer', 'hice'], respuesta: 0 },
            { japones: '一週間', lectura: 'isshūkan', opciones: ['una semana', 'un día', 'un mes', 'un año'], respuesta: 0 },
            { japones: '溜めてきた', lectura: 'tamete kita', opciones: ['he estado acumulando (semen)', 'he estado gastando', 'he estado perdiendo', 'he estado ignorando'], respuesta: 0 },
            { japones: '付き合って', lectura: 'tsukiatte', opciones: ['acompañar / aguantar', 'ignorar', 'rechazar', 'ayudar'], respuesta: 0 },
            { japones: 'だが', lectura: 'daga', opciones: ['pero', 'y', 'porque', 'entonces'], respuesta: 0 }
        ],
        
        // MAZO 2
        2: [
            { japones: '生ぬるい', lectura: 'namanurui', opciones: ['tibia / poco intensa', 'muy caliente', 'fría', 'perfecta'], respuesta: 0 },
            { japones: 'いつまでたっても', lectura: 'itsu made tatte mo', opciones: ['no importa cuánto tiempo pase', 'solo por un momento', 'nunca', 'rápidamente'], respuesta: 0 },
            { japones: '調子に乗る', lectura: 'chōshi ni noru', opciones: ['ponerse arrogante / envalentonarse', 'ser humilde', 'ser tímido', 'ser indiferente'], respuesta: 0 },
            { japones: '夢中で', lectura: 'muchū de', opciones: ['con pasión / obsesivamente', 'sin interés', 'con pereza', 'con miedo'], respuesta: 0 },
            { japones: '昇ってきた', lectura: 'nobotte kita', opciones: ['está subiendo / viniendo (el semen)', 'está bajando', 'está quieto', 'se fue'], respuesta: 0 },
            { japones: '窄めて', lectura: 'sebamete', opciones: ['estrecha / aprieta', 'abre', 'relaja', 'ignora'], respuesta: 0 },
            { japones: '熟成', lectura: 'jukusei', opciones: ['madurado / fermentado', 'crudo', 'fresco', 'podrido'], respuesta: 0 },
            { japones: '味わえ', lectura: 'ajiwae', opciones: ['prueba / saborea (imperativo rudo)', 'escúpelo', 'guárdalo', 'ignóralo'], respuesta: 0 },
            { japones: '離さねえ', lectura: 'hanasanee', opciones: ['no suelta (negativo coloquial)', 'suelta', 'aprieta', 'ignora'], respuesta: 0 },
            { japones: '一週間ぶり', lectura: 'isshūkan buri', opciones: ['después de una semana', 'por primera vez', 'nunca', 'siempre'], respuesta: 0 }
        ],
        
        // MAZO 3
        3: [
            { japones: '帰らせねぇ', lectura: 'kaerasenē', opciones: ['no te dejo ir (negativo coloquial)', 'te dejo ir', 'te espero', 'te ignoro'], respuesta: 0 },
            { japones: 'たっぷり', lectura: 'tappuri', opciones: ['un montón / abundantemente', 'poco', 'nada', 'justo'], respuesta: 0 },
            { japones: '数週間', lectura: 'sū shūkan', opciones: ['unas semanas / varios semanas', 'unos días', 'unos meses', 'unos años'], respuesta: 0 },
            { japones: '前', lectura: 'mae', opciones: ['antes / hace', 'después', 'durante', 'nunca'], respuesta: 0 },
            { japones: '家', lectura: 'ie', opciones: ['casa', 'escuela', 'trabajo', 'parque'], respuesta: 0 },
            { japones: '出して', lectura: 'dashite', opciones: ['saliendo / dejando (forma -te)', 'entrando', 'guardando', 'escondiendo'], respuesta: 0 },
            { japones: 'パン屋', lectura: 'pan\'ya', opciones: ['panadería', 'carnicería', 'frutería', 'supermercado'], respuesta: 0 },
            { japones: '生活費', lectura: 'seikatsuhi', opciones: ['gastos de vida / manutención', 'ahorros', 'deudas', 'ingresos'], respuesta: 0 },
            { japones: '足りず', lectura: 'tarizu', opciones: ['no alcanza / insuficiente', 'sobra', 'es justo', 'es demasiado'], respuesta: 0 },
            { japones: 'どうしたものかと', lectura: 'dō shita mono ka to', opciones: ['qué hacer / cómo resolverlo', 'no hay problema', 'es fácil', 'no importa'], respuesta: 0 }
        ],
        
        // MAZO 4
        4: [
            { japones: '困っていた', lectura: 'komatte ita', opciones: ['estaba preocupada / en apuros (pasado continuo)', 'estaba feliz', 'estaba tranquila', 'estaba enojada'], respuesta: 0 },
            { japones: '持ち掛けられた', lectura: 'mochikakerareta', opciones: ['me fue ofrecida / me propusieron (pasivo)', 'rechacé', 'ignoré', 'sugerí'], respuesta: 0 },
            { japones: '聞きつけた', lectura: 'kikitsuketa', opciones: ['se enteró / oyó hablar', 'ignoró', 'olvidó', 'escondió'], respuesta: 0 },
            { japones: '要求', lectura: 'yōkyū', opciones: ['exigencia / demanda', 'ofrecimiento', 'rechazo', 'pregunta'], respuesta: 0 },
            { japones: 'お父さん', lectura: 'otōsan', opciones: ['papá', 'mamá', 'hermano', 'amigo'], respuesta: 0 },
            { japones: '頼れない', lectura: 'tanorenai', opciones: ['no puedo depender', 'puedo depender', 'debo depender', 'quiero depender'], respuesta: 0 },
            { japones: '減らしたい', lectura: 'herashitai', opciones: ['quiero reducir', 'quiero aumentar', 'quiero mantener', 'quiero eliminar'], respuesta: 0 },
            { japones: '焦っていた', lectura: 'asette ita', opciones: ['estaba desesperada / ansiosa', 'estaba calmada', 'estaba feliz', 'estaba aburrida'], respuesta: 0 },
            { japones: '万円', lectura: 'man en', opciones: ['decenas de miles de yenes (cantidad grande)', 'pocos yenes', 'centavos', 'dólares'], respuesta: 0 },
            { japones: '卒業', lectura: 'sotsugyō', opciones: ['graduación', 'ingreso', 'abandono', 'suspensión'], respuesta: 0 }
        ],
        
        // MAZO 5
        5: [
            { japones: '期限付き', lectura: 'kigen tsuki', opciones: ['con límite de tiempo / temporal', 'permanente', 'indefinido', 'cancelable'], respuesta: 0 },
            { japones: '普通の', lectura: 'futsū no', opciones: ['normal / ordinario', 'extraordinario', 'raro', 'especial'], respuesta: 0 },
            { japones: '何倍も', lectura: 'nanbai mo', opciones: ['varias veces más', 'igual', 'menos', 'nada'], respuesta: 0 },
            { japones: '金銭', lectura: 'kinsen', opciones: ['dinero / suma de dinero', 'amor', 'tiempo', 'esfuerzo'], respuesta: 0 },
            { japones: '提示され', lectura: 'teiji sare', opciones: ['me fue ofrecido / me propusieron (pasivo)', 'rechacé', 'ignoré', 'pedí'], respuesta: 0 },
            { japones: 'シたり', lectura: 'shitari', opciones: ['hacer (eufemismo deformado de する)', 'decir', 'ver', 'escuchar'], respuesta: 0 },
            { japones: '性奴隷', lectura: 'sei dorei', opciones: ['esclava sexual', 'empleada', 'estudiante', 'ama de casa'], respuesta: 0 },
            { japones: '日', lectura: 'hi', opciones: ['día', 'noche', 'semana', 'mes'], respuesta: 0 },
            { japones: '追う', lectura: 'ou', opciones: ['seguir / perseguir', 'huir', 'ignorar', 'esperar'], respuesta: 0 },
            { japones: 'ごとに', lectura: 'goto ni', opciones: ['cada / día a día', 'nunca', 'a veces', 'siempre'], respuesta: 0 }
        ],
        
        // MAZO 6
        6: [
            { japones: 'エスカレート', lectura: 'esukareeto', opciones: ['escalar / intensificar', 'disminuir', 'mantener', 'detener'], respuesta: 0 },
            { japones: '一度', lectura: 'ichido', opciones: ['una vez', 'muchas veces', 'nunca', 'siempre'], respuesta: 0 },
            { japones: '止めよう', lectura: 'yameyō', opciones: ['parar / detener', 'continuar', 'empezar', 'ignorar'], respuesta: 0 },
            { japones: 'バラす', lectura: 'barasu', opciones: ['revelar / contar', 'esconder', 'guardar', 'olvidar'], respuesta: 0 },
            { japones: '脅された', lectura: 'odosareta', opciones: ['fui amenazada (pasivo)', 'fui elogiada', 'fui ignorada', 'fui ayudada'], respuesta: 0 },
            { japones: 'いいなり', lectura: 'ii nari', opciones: ['obedecer / ser marioneta', 'rebelarse', 'ignorar', 'dirigir'], respuesta: 0 },
            { japones: '選択肢', lectura: 'sentakushi', opciones: ['opciones / alternativas', 'obligación', 'prohibición', 'sorpresa'], respuesta: 0 },
            { japones: '無くなっていた', lectura: 'nakunatte ita', opciones: ['no quedaba / desapareció (pasado continuo)', 'sobraba', 'estaba igual', 'aumentaba'], respuesta: 0 },
            { japones: '色々な', lectura: 'iroiro na', opciones: ['muchas / varias / diferentes', 'pocas', 'iguales', 'ninguna'], respuesta: 0 },
            { japones: '絶頂', lectura: 'zecchō', opciones: ['clímax / orgasmo', 'inicio', 'pausa', 'final'], respuesta: 0 }
        ],
        
        // MAZO 7
        7: [
            { japones: 'こうやって', lectura: 'kō yatte', opciones: ['así / de esta forma', 'de otra forma', 'sin método', 'accidentalmente'], respuesta: 0 },
            { japones: 'すぐに', lectura: 'sugu ni', opciones: ['inmediatamente', 'después', 'nunca', 'lentamente'], respuesta: 0 },
            { japones: '覚えた', lectura: 'oboeta', opciones: ['aprendí / memoricé', 'olvidé', 'ignoré', 'confundí'], respuesta: 0 },
            { japones: '一体', lectura: 'ittai', opciones: ['qué demonios / exactamente', 'probablemente', 'quizás', 'nunca'], respuesta: 0 },
            { japones: 'つもり', lectura: 'tsumori', opciones: ['intención / pretensión', 'accidente', 'obligación', 'suerte'], respuesta: 0 },
            { japones: 'まには', lectura: 'ma ni wa', opciones: ['de vez en cuando', 'siempre', 'nunca', 'rara vez'], respuesta: 0 },
            { japones: '丸見え', lectura: 'marumie', opciones: ['completamente visible / al descubierto', 'escondido', 'parcialmente visible', 'tapado'], respuesta: 0 },
            { japones: '素直に', lectura: 'sunao ni', opciones: ['honestamente / fácilmente', 'con dificultad', 'con mentiras', 'con resistencia'], respuesta: 0 },
            { japones: '受け入れている', lectura: 'ukeirete iru', opciones: ['estoy aceptando', 'estoy rechazando', 'estoy ignorando', 'estoy dudando'], respuesta: 0 },
            { japones: 'イヤになる', lectura: 'iya ni naru', opciones: ['me odio / me disgusta', 'me encanta', 'me da igual', 'me sorprende'], respuesta: 0 }
        ],
        
        // MAZO 8
        8: [
            { japones: '自分', lectura: 'jibun', opciones: ['yo misma', 'otra persona', 'todos', 'nadie'], respuesta: 0 },
            { japones: '正直', lectura: 'shōjiki', opciones: ['honestamente', 'mintiendo', 'exagerando', 'ocultando'], respuesta: 0 },
            { japones: '裸', lectura: 'hadaka', opciones: ['desnuda', 'vestida', 'semi-vestida', 'disfrazada'], respuesta: 0 },
            { japones: '非日常', lectura: 'hijōjō', opciones: ['no cotidiano / fuera de lo normal', 'rutinario', 'aburrido', 'común'], respuesta: 0 },
            { japones: '期待して', lectura: 'kitai shite', opciones: ['esperando / anticipando', 'temiedo', 'ignorando', 'rechazando'], respuesta: 0 },
            { japones: '事実', lectura: 'jijitsu', opciones: ['hecho / realidad', 'mentira', 'suposición', 'fantasía'], respuesta: 0 },
            { japones: '知らない', lectura: 'shiranai', opciones: ['no sé / no conozco', 'sé bien', 'recuerdo', 'olvidé'], respuesta: 0 },
            { japones: '強がってんだ', lectura: 'tsuyogatten da', opciones: ['fingiendo fuerte / haciéndose la dura', 'siendo débil', 'siendo honesta', 'siendo tímida'], respuesta: 0 },
            { japones: '来やがった', lectura: 'kiyagatta', opciones: ['viniste (insulto coloquial)', 'te fuiste', 'esperaste', 'ignoraste'], respuesta: 0 },
            { japones: '見透かされてる', lectura: 'misukasarete ru', opciones: ['se ve a través / te han calado', 'te están elogiando', 'te están ignorando', 'te están ayudando'], respuesta: 0 }
        ],
        
        // MAZO 9
        9: [
            { japones: '期待', lectura: 'kitai', opciones: ['expectativa / espera', 'desilusión', 'sorpresa', 'indiferencia'], respuesta: 0 },
            { japones: 'しまくって', lectura: 'shimakutte', opciones: ['esperando mucho / con ansias', 'evitando', 'ignorando', 'temiedo'], respuesta: 0 },
            { japones: 'お預け', lectura: 'oazuke', opciones: ['en espera / privado', 'inmediato', 'cancelado', 'permitido'], respuesta: 0 },
            { japones: 'ご褒美', lectura: 'gohōbi', opciones: ['recompensa', 'castigo', 'crítica', 'ignorancia'], respuesta: 0 },
            { japones: '責任持って', lectura: 'sekinin motte', opciones: ['hacerme responsable', 'evadir responsabilidad', 'ignorar', 'culpar a otro'], respuesta: 0 },
            { japones: '面倒', lectura: 'mendō', opciones: ['cuidado / atención', 'abandono', 'negligencia', 'indiferencia'], respuesta: 0 },
            { japones: 'みないと', lectura: 'minai to', opciones: ['tengo que cuidar', 'puedo ignorar', 'debo evitar', 'quiero abandonar'], respuesta: 0 },
            { japones: '今夜', lectura: 'konya', opciones: ['esta noche', 'esta mañana', 'mañana', 'ayer'], respuesta: 0 },
            { japones: '一晩中', lectura: 'ippanchū', opciones: ['toda la noche', 'un rato', 'un momento', 'nunca'], respuesta: 0 },
            { japones: '覚悟', lectura: 'kakugo', opciones: ['prepárate / asume', 'relájate', 'huye', 'ignora'], respuesta: 0 }
        ],
        
        // MAZO 10
        10: [
            { japones: '芯', lectura: 'shin', opciones: ['núcleo / firmeza', 'superficie', 'debilidad', 'flexibilidad'], respuesta: 0 },
            { japones: '入った', lectura: 'haitta', opciones: ['entró / está firme', 'salió', 'se dobló', 'se rompió'], respuesta: 0 },
            { japones: 'フェラテク', lectura: 'feratekku', opciones: ['técnica de felación', 'técnica de beso', 'técnica de abrazo', 'técnica de masaje'], respuesta: 0 },
            { japones: '勃起させた', lectura: 'bokki saseta', opciones: ['hice erecto', 'hice flácido', 'ignoré', 'detuve'], respuesta: 0 },
            { japones: '言っておく', lectura: 'itte oku', opciones: ['te lo digo de una vez', 'me lo guardo', 'lo niego', 'lo olvido'], respuesta: 0 },
            { japones: '熱くて', lectura: 'atsukute', opciones: ['caliente', 'frío', 'tibio', 'helado'], respuesta: 0 },
            { japones: '硬い', lectura: 'katai', opciones: ['duro', 'blando', 'flexible', 'quebradizo'], respuesta: 0 },
            { japones: '付ける', lectura: 'tsukeru', opciones: ['poner / usar', 'quitar', 'perder', 'ignorar'], respuesta: 0 },
            { japones: '欲しく', lectura: 'hoshiku', opciones: ['quiero / deseo', 'rechazo', 'ignoro', 'temgo miedo'], respuesta: 0 },
            { japones: '従順で', lectura: 'jūjun de', opciones: ['sumisa / obediente', 'rebelde', 'indiferente', 'dominante'], respuesta: 0 }
        ],
        
        // MAZO 11
        11: [
            { japones: '求めていた', lectura: 'motomete ita', opciones: ['estaba buscando', 'estaba evitando', 'estaba ignorando', 'estaba rechazando'], respuesta: 0 },
            { japones: '関係', lectura: 'kankei', opciones: ['relación', 'separación', 'indiferencia', 'oposición'], respuesta: 0 },
            { japones: '今月分', lectura: 'kongetsu bun', opciones: ['este mes', 'el mes pasado', 'el próximo mes', 'todos los meses'], respuesta: 0 },
            { japones: '払わん', lectura: 'harawan', opciones: ['no pagaré', 'pagaré', 'debo pagar', 'pagué'], respuesta: 0 },
            { japones: '安心しろ', lectura: 'anshin shiro', opciones: ['tranquila / no te preocupes', 'preocúpate', 'alerta', 'huye'], respuesta: 0 },
            { japones: 'ビルくらいは', lectura: 'biru kurai wa', opciones: ['al menos el edificio', 'todo el edificio', 'nada del edificio', 'solo el edificio'], respuesta: 0 },
            { japones: '支給してやる', lectura: 'shikyū shite yaru', opciones: ['te daré / te proporcionaré', 'te quitaré', 'te negaré', 'te ignoraré'], respuesta: 0 },
            { japones: '断ったら', lectura: 'kotowattara', opciones: ['si rechazo', 'si acepto', 'si ignoro', 'si dudo'], respuesta: 0 },
            { japones: '生活', lectura: 'seikatsu', opciones: ['vida / modo de vida', 'muerte', 'sueño', 'trabajo'], respuesta: 0 },
            { japones: 'ボツ', lectura: 'botsu', opciones: ['¡no! / cancelado (efecto o rechazo)', '¡sí! / aprobado', 'tal vez', 'espera'], respuesta: 0 }
        ],
        
        // MAZO 12
        12: [
            { japones: '無しじゃ', lectura: 'nashi ja', opciones: ['sin él', 'con él', 'a pesar de él', 'gracias a él'], respuesta: 0 },
            { japones: '捨てないで', lectura: 'sutenai de', opciones: ['no me abandones', 'abándoname', 'ignórame', 'ayúdame'], respuesta: 0 },
            { japones: 'こんだけ', lectura: 'kon dake', opciones: ['con tanto / tanto así', 'con poco', 'con nada', 'con exactitud'], respuesta: 0 },
            { japones: '濡れてりゃ', lectura: 'nureterya', opciones: ['estás mojada (contraído coloquial)', 'estás seca', 'estás limpia', 'estás sucia'], respuesta: 0 },
            { japones: 'すんなり', lectura: 'sunnari', opciones: ['sin problemas / fácilmente', 'con dificultad', 'con fuerza', 'nunca'], respuesta: 0 },
            { japones: '入りそう', lectura: 'hairisō', opciones: ['parece que entrará', 'no entrará', 'ya entró', 'salió'], respuesta: 0 },
            { japones: '飲み込み', lectura: 'nomikomi', opciones: ['se tragó / absorbió', 'escupió', 'guardó', 'ignoró'], respuesta: 0 },
            { japones: 'あったけぇ', lectura: 'attakē', opciones: ['está caliente (deformado cute)', 'está frío', 'está tibio', 'está helado'], respuesta: 0 },
            { japones: '隙間なく', lectura: 'sukima naku', opciones: ['sin espacios', 'con espacios', 'parcialmente', 'completamente'], respuesta: 0 },
            { japones: '押し広げられてる', lectura: 'oshihirogerarete ru', opciones: ['está siendo abierto / expandido', 'está cerrado', 'está igual', 'está encogido'], respuesta: 0 }
        ],
        
        // MAZO 13
        13: [
            { japones: '惚れてん', lectura: 'horeten', opciones: ['está enamorada (contraído coloquial)', 'odia', 'ignora', 'temne'], respuesta: 0 },
            { japones: '食わねぇ', lectura: 'kuwanē', opciones: ['no se la come / no la folla (coloquial rudo)', 'se la come', 'la ignora', 'la ayuda'], respuesta: 0 },
            { japones: 'もったいねぇ', lectura: 'mottainē', opciones: ['qué desperdicio / lástima', 'qué suerte', 'qué normal', 'qué raro'], respuesta: 0 },
            { japones: 'おかげで', lectura: 'okage de', opciones: ['gracias a', 'por culpa de', 'a pesar de', 'además de'], respuesta: 0 },
            { japones: '隠してんだ', lectura: 'kakushiten da', opciones: ['¿te estás escondiendo? (contraído)', 'te estás mostrando', 'te estás yendo', 'te estás quedando'], respuesta: 0 },
            { japones: '建前', lectura: 'tatemae', opciones: ['excusa / pretexto', 'verdad', 'mentira', 'duda'], respuesta: 0 },
            { japones: '本当は', lectura: 'hontō wa', opciones: ['en realidad', 'en apariencia', 'nunca', 'siempre'], respuesta: 0 },
            { japones: '欲しい', lectura: 'hoshii', opciones: ['quieres', 'no quieres', 'dudas', 'ignoras'], respuesta: 0 },
            { japones: 'どハマリ', lectura: 'do hamari', opciones: ['adicción extrema / obsesión', 'desinterés', 'indiferencia', 'repulsión'], respuesta: 0 },
            { japones: '甘め', lectura: 'amame', opciones: ['dulce / cremoso (referencia a semen)', 'amargo', 'salado', 'ácido'], respuesta: 0 }
        ],
        
        // MAZO 14
        14: [
            { japones: '受け止めろ', lectura: 'uketomero', opciones: ['recíbelo (imperativo rudo)', 'recházalo', 'ignóralo', 'tíralo'], respuesta: 0 },
            { japones: '限る', lectura: 'kagiru', opciones: ['es lo mejor / solo eso vale', 'es lo peor', 'es igual', 'es diferente'], respuesta: 0 },
            { japones: 'へばってる', lectura: 'hebatteru', opciones: ['jadeando / agotada', 'descansada', 'energética', 'dormida'], respuesta: 0 },
            { japones: '暇', lectura: 'hima', opciones: ['tiempo / oportunidad', 'ocupación', 'urgencia', 'pereza'], respuesta: 0 },
            { japones: '金玉', lectura: 'kintama', opciones: ['huevos / testículos', 'pene', 'vagina', 'pecho'], respuesta: 0 },
            { japones: 'からっぽ', lectura: 'karappo', opciones: ['vacío / completamente vacío', 'lleno', 'medio lleno', 'desbordando'], respuesta: 0 },
            { japones: '帰らせない', lectura: 'kaerasenai', opciones: ['no te dejo ir', 'te dejo ir', 'te ayudo a ir', 'te obligo a ir'], respuesta: 0 }
        ],
        
        // ====================
        // MAZOS DIFÍCILES ESPECIALES - Subcontenedor 1.7
        // ====================
        
        'D1': [
            { japones: '隙間なく', lectura: 'sukima naku', opciones: ['sin espacios', 'con espacios', 'parcialmente', 'completamente'], respuesta: 0 },
        
        ]
    },
    // Sub-contenedor 1.8
    'sub1_8': {
        // MAZO 1
        1: [
            { japones: '高校卒業後', lectura: 'kōkō sotsugyō-go', opciones: ['Después de graduarme de preparatoria', 'Antes de entrar a preparatoria', 'Durante la preparatoria', 'En lugar de la preparatoria'], respuesta: 0 },
            { japones: '進路', lectura: 'shinro', opciones: ['Camino futuro / Ruta profesional', 'Camino pasado', 'Camino fácil', 'Camino sin salida'], respuesta: 0 },
            { japones: 'について', lectura: 'ni tsuite', opciones: ['Acerca de / Respecto a', 'A pesar de', 'Debido a', 'Junto con'], respuesta: 0 },
            { japones: '大学', lectura: 'daigaku', opciones: ['Universidad', 'Escuela primaria', 'Escuela secundaria', 'Trabajo'], respuesta: 0 },
            { japones: '手段', lectura: 'shudan', opciones: ['Medio / Método', 'Objetivo', 'Problema', 'Solución'], respuesta: 0 },
            { japones: '推薦', lectura: 'suisen', opciones: ['Recomendación', 'Rechazo', 'Examen', 'Entrevista'], respuesta: 0 },
            { japones: '貰う', lectura: 'morau', opciones: ['Recibir / Obtener', 'Dar', 'Perder', 'Ignorar'], respuesta: 0 },
            { japones: '一般入試', lectura: 'ippan nyūshi', opciones: ['Examen de ingreso general', 'Examen especial', 'Entrevista personal', 'Recomendación directa'], respuesta: 0 },
            { japones: '学力', lectura: 'gakuryoku', opciones: ['Capacidad académica / Nivel de estudios', 'Habilidad física', 'Habilidad social', 'Experiencia laboral'], respuesta: 0 },
            { japones: '太刀打ち', lectura: 'tachīuchi', opciones: ['Competir / Enfrentarse de igual a igual', 'Rendirse fácilmente', 'Ignorar la competencia', 'Cooperar con'], respuesta: 0 }
        ],
        
        // MAZO 2
        2: [
            { japones: '難しい', lectura: 'muzukashii', opciones: ['Difícil', 'Fácil', 'Interesante', 'Aburrido'], respuesta: 0 },
            { japones: 'せめて', lectura: 'semete', opciones: ['Al menos', 'Como máximo', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: '競争相手', lectura: 'kyōsō aite', opciones: ['Competidores / Rivales', 'Aliados', 'Amigos', 'Profesores'], respuesta: 0 },
            { japones: '絞って', lectura: 'shibotte', opciones: ['Reducir / Limitar', 'Aumentar', 'Ignorar', 'Expandir'], respuesta: 0 },
            { japones: '戦う', lectura: 'tatakau', opciones: ['Luchar / Pelear', 'Cooperar', 'Ignorar', 'Observar'], respuesta: 0 },
            { japones: '作戦', lectura: 'sakusen', opciones: ['Estrategia / Plan', 'Accidente', 'Improvisación', 'Error'], respuesta: 0 },
            { japones: '内申点', lectura: 'naishinten', opciones: ['Puntos internos / Calificaciones escolares', 'Puntos de examen', 'Puntos de conducta', 'Puntos extra'], respuesta: 0 },
            { japones: '重要', lectura: 'jūyō', opciones: ['Importante', 'Insignificante', 'Opcional', 'Secundario'], respuesta: 0 },
            { japones: '以上', lectura: 'ijō', opciones: ['Más que', 'Menos que', 'Igual que', 'Diferente a'], respuesta: 0 },
            { japones: '猛勉強', lectura: 'mō benkyō', opciones: ['Estudio intenso / Estudio feroz', 'Estudio casual', 'Sin estudio', 'Estudio en grupo'], respuesta: 0 }
        ],
        
        // MAZO 3
        3: [
            { japones: '励んだ', lectura: 'hagemi da', opciones: ['Me esforcé / Me dediqué', 'Me rendí', 'Ignoré', 'Postergué'], respuesta: 0 },
            { japones: 'しかし', lectura: 'shikashi', opciones: ['Sin embargo', 'Por lo tanto', 'Además', 'Por ejemplo'], respuesta: 0 },
            { japones: 'にとって', lectura: 'ni totte', opciones: ['Para mí', 'Contra mí', 'Junto a mí', 'Lejos de mí'], respuesta: 0 },
            { japones: '点', lectura: 'ten', opciones: ['Puntos / Calificación', 'Tiempo', 'Lugar', 'Persona'], respuesta: 0 },
            { japones: '点数', lectura: 'tensū', opciones: ['Puntuación / Número de puntos', 'Letras', 'Porcentajes', 'Calificaciones con letras'], respuesta: 0 },
            { japones: '足りて', lectura: 'tarite', opciones: ['Ser suficiente', 'Ser insuficiente', 'Ser excesivo', 'Ser exacto'], respuesta: 0 },
            { japones: 'おまけに', lectura: 'omake ni', opciones: ['Además / Por si fuera poco', 'Sin embargo', 'Por lo tanto', 'En cambio'], respuesta: 0 },
            { japones: '酷すぎて', lectura: 'hido sugite', opciones: ['Ser demasiado malo / Terrible', 'Ser muy bueno', 'Ser normal', 'Ser aceptable'], respuesta: 0 },
            { japones: '挽回', lectura: 'bankai', opciones: ['Recuperación / Remontada', 'Pérdida', 'Estancamiento', 'Regresión'], respuesta: 0 },
            { japones: '取ら', lectura: 'tora', opciones: ['Tomar / Obtener', 'Perder', 'Ignorar', 'Rechazar'], respuesta: 0 }
        ],
        
        // MAZO 4
        4: [
            { japones: '焦らなく', lectura: 'aseranakaku', opciones: ['Sin apresurarse', 'Con prisa', 'Con ansiedad', 'Con calma forzada'], respuesta: 0 },
            { japones: '時期', lectura: 'jiki', opciones: ['Momento / Período', 'Lugar', 'Persona', 'Razón'], respuesta: 0 },
            { japones: '近づく', lectura: 'chikazuku', opciones: ['Acercarse', 'Alejarse', 'Quedarse', 'Ignorar'], respuesta: 0 },
            { japones: 'つれて', lectura: 'tsurete', opciones: ['A medida que', 'Antes de que', 'Después de que', 'A pesar de que'], respuesta: 0 },
            { japones: '焦燥感', lectura: 'shōsōkan', opciones: ['Sensación de ansiedad / Impaciencia', 'Sensación de calma', 'Sensación de felicidad', 'Sensación de tristeza'], respuesta: 0 },
            { japones: '大きく', lectura: 'ōkiku', opciones: ['Grande / Más grande', 'Pequeño / Más pequeño', 'Igual', 'Diferente'], respuesta: 0 },
            { japones: '諦めずに', lectura: 'akiramezu ni', opciones: ['Sin rendirse', 'Rindiéndose fácilmente', 'Dudando', 'Postergando'], respuesta: 0 },
            { japones: '体育', lectura: 'taiiku', opciones: ['Educación física / Gimnasia', 'Matemáticas', 'Ciencias', 'Historia'], respuesta: 0 },
            { japones: '成績', lectura: 'seiseki', opciones: ['Calificaciones / Rendimiento', 'Comportamiento', 'Asistencia', 'Participación'], respuesta: 0 },
            { japones: '元', lectura: 'moto', opciones: ['Origen / Base / Raíz', 'Resultado', 'Consecuencia', 'Extremo'], respuesta: 0 }
        ],
        
        // MAZO 5
        5: [
            { japones: '酷すぎる', lectura: 'hido sugiru', opciones: ['Ser demasiado malo / Terrible', 'Ser muy bueno', 'Ser normal', 'Ser excelente'], respuesta: 0 },
            { japones: 'やはり', lectura: 'yahari', opciones: ['Como era de esperar / Al final', 'Sorprendentemente', 'Afortunadamente', 'Desafortunadamente'], respuesta: 0 },
            { japones: '次第', lectura: 'shidai', opciones: ['Depende de', 'A pesar de', 'Además de', 'En vez de'], respuesta: 0 },
            { japones: '悪い', lectura: 'warui', opciones: ['Malo', 'Bueno', 'Regular', 'Excelente'], respuesta: 0 },
            { japones: '話', lectura: 'hanashi', opciones: ['Oferta / Propuesta', 'Rechazo', 'Pregunta', 'Queja'], respuesta: 0 },
            { japones: '提案', lectura: 'teian', opciones: ['Propuesta', 'Rechazo', 'Crítica', 'Elogio'], respuesta: 0 },
            { japones: '飲む', lectura: 'nomu', opciones: ['Aceptar (literal: beber/tragarse)', 'Rechazar', 'Ignorar', 'Considerar'], respuesta: 0 },
            { japones: '方', lectura: 'hō', opciones: ['Lado / Persona que', 'Lugar', 'Tiempo', 'Razón'], respuesta: 0 },
            { japones: 'おかしい', lectura: 'okashii', opciones: ['Extraño / Raro / Loco', 'Normal', 'Lógico', 'Obvio'], respuesta: 0 },
            { japones: '皆', lectura: 'minna', opciones: ['Todos', 'Nadie', 'Algunos', 'Pocos'], respuesta: 0 }
        ],
        
        // MAZO 6
        6: [
            { japones: '迷惑', lectura: 'meiwaku', opciones: ['Molestias / Problemas', 'Ayuda', 'Soporte', 'Placer'], respuesta: 0 },
            { japones: '生で', lectura: 'nama de', opciones: ['En persona / En vivo / Directamente', 'Grabado', 'Editado', 'Fingido'], respuesta: 0 },
            { japones: 'たまんねえ', lectura: 'taman nee', opciones: ['No aguanto / No resisto', 'Aguanto fácilmente', 'Me da igual', 'Disfruto'], respuesta: 0 },
            { japones: '股', lectura: 'mata', opciones: ['Entrepierna / Piernas (abiertas)', 'Brazos', 'Cabeza', 'Espalda'], respuesta: 0 },
            { japones: '思いっきり', lectura: 'omoikkiri', opciones: ['Al máximo / Con todas sus fuerzas', 'Suavemente', 'Lentamente', 'A medias'], respuesta: 0 },
            { japones: '広げろ', lectura: 'hirogero', opciones: ['Abre / Extiende (imperativo rudo)', 'Cierra', 'Cruza', 'Relaja'], respuesta: 0 },
            { japones: '下の', lectura: 'shita no', opciones: ['De abajo / La parte inferior', 'De arriba', 'Del centro', 'Del lado'], respuesta: 0 },
            { japones: '味合わせ', lectura: 'aji awase', opciones: ['Hacer probar / Dejar saborear', 'Esconder', 'Negar', 'Ignorar'], respuesta: 0 },
            { japones: '中身', lectura: 'nakami', opciones: ['Interior / El interior', 'Exterior', 'Superficie', 'Contenedor'], respuesta: 0 },
            { japones: '入口', lectura: 'iriguchi', opciones: ['Entrada / Abertura', 'Salida', 'Fondo', 'Centro'], respuesta: 0 }
        ],
        
        // MAZO 7
        7: [
            { japones: '攻めたら', lectura: 'semetara', opciones: ['Cuando ataqué / Si ataco', 'Cuando me defendí', 'Cuando ignoré', 'Cuando huí'], respuesta: 0 },
            { japones: '盛大に', lectura: 'seidai ni', opciones: ['De forma espectacular / Grandiosa', 'De forma discreta', 'De forma normal', 'De forma pobre'], respuesta: 0 },
            { japones: '濃厚', lectura: 'nōkō', opciones: ['Espeso / Concentrado', 'Diluido', 'Ligero', 'Acuoso'], respuesta: 0 },
            { japones: '糸引いてる', lectura: 'ito hiiteru', opciones: ['Formando hilos / Estirándose', 'Goteando', 'Chorreando', 'Seco'], respuesta: 0 },
            { japones: '自分で', lectura: 'jibun de', opciones: ['Sola / Por mí misma', 'Con ayuda', 'Forzada', 'Accidentalmente'], respuesta: 0 },
            { japones: '何倍も', lectura: 'nanbai mo', opciones: ['Muchas veces más', 'La misma cantidad', 'Menos', 'Nada'], respuesta: 0 },
            { japones: '溢れ返って', lectura: 'afure kaette', opciones: ['Rebosando / Desbordándose', 'Secándose', 'Conteniéndose', 'Evaporándose'], respuesta: 0 },
            { japones: '潮吹き', lectura: 'shio fuki', opciones: ['Squirting / Chorro', 'Orina', 'Sudor', 'Lágrimas'], respuesta: 0 },
            { japones: '濡れて', lectura: 'nurete', opciones: ['Mojándose / Humedeciéndose', 'Secándose', 'Limpiándose', 'Ensuciándose'], respuesta: 0 },
            { japones: 'ところで', lectura: 'tokoro de', opciones: ['Justo cuando / En el momento en que', 'Antes de que', 'Después de que', 'A pesar de que'], respuesta: 0 }
        ],
        
        // MAZO 8
        8: [
            { japones: 'っていうか', lectura: 'tte iu ka', opciones: ['Más bien / O sea', 'Por ejemplo', 'Además', 'Sin embargo'], respuesta: 0 },
            { japones: 'どれだけ', lectura: 'dore dake', opciones: ['Cuánto / Cuán', 'Dónde', 'Cuándo', 'Por qué'], respuesta: 0 },
            { japones: '入ってる', lectura: 'haitteru', opciones: ['Está dentro / Cabe', 'No cabe', 'Está fuera', 'Está a medias'], respuesta: 0 },
            { japones: '用意', lectura: 'yōi', opciones: ['Preparación / Tener listo', 'Improvisación', 'Negligencia', 'Olvido'], respuesta: 0 },
            { japones: 'あんなに', lectura: 'anna ni', opciones: ['Tanto / Así de', 'Poco', 'Nada', 'Demasiado'], respuesta: 0 },
            { japones: '脈打って', lectura: 'myaku utte', opciones: ['Latiendo / Palpitando', 'Quieto', 'Débil', 'Rápido'], respuesta: 0 },
            { japones: '挿入れる', lectura: 'irete', opciones: ['Meter / Insertar (penetrar)', 'Sacar', 'Tocar', 'Acariciar'], respuesta: 0 },
            { japones: '苦しい', lectura: 'kurushii', opciones: ['Duele / Es doloroso / Agobiante', 'Placentero', 'Neutro', 'Emocionante'], respuesta: 0 },
            { japones: 'お腹', lectura: 'onaka', opciones: ['Vientre / Estómago', 'Pecho', 'Espalda', 'Cabeza'], respuesta: 0 },
            { japones: '圧し潰されてる', lectura: 'oshitsubusareteru', opciones: ['Estoy siendo aplastada / Comprimida', 'Estoy siendo liberada', 'Estoy cómoda', 'Estoy sola'], respuesta: 0 }
        ],
        
        // MAZO 9
        9: [
            { japones: '中々', lectura: 'nakanaka', opciones: ['Bastante / De primera', 'Poco / Mediocre', 'Nada', 'Demasiado'], respuesta: 0 },
            { japones: '名器', lectura: 'meiki', opciones: ['Vagina excepcional / De gran calidad', 'Vagina normal', 'Vagina estrecha', 'Vagina ancha'], respuesta: 0 },
            { japones: '揺れる', lectura: 'yureru', opciones: ['Balancearse / Sacudirse', 'Quedarse quieto', 'Moverse lento', 'Girar'], respuesta: 0 },
            { japones: '爆乳', lectura: 'bakunyū', opciones: ['Pechos explosivos / Tetas enormes', 'Pechos pequeños', 'Pechos normales', 'Pechos planos'], respuesta: 0 },
            { japones: 'クソザコ', lectura: 'kuso zako', opciones: ['Perdedora absoluta / Débil de mierda', 'Ganadora', 'Competidora', 'Experta'], respuesta: 0 },
            { japones: 'ド変態', lectura: 'do hentai', opciones: ['Super pervertida / Pervertida extrema', 'Inocente', 'Normal', 'Tímida'], respuesta: 0 },
            { japones: '間違いなく', lectura: 'machigai naku', opciones: ['Sin duda / Definitivamente', 'Quizás', 'Nunca', 'Raramente'], respuesta: 0 },
            { japones: '過去', lectura: 'kako', opciones: ['Pasado', 'Presente', 'Futuro', 'Siempre'], respuesta: 0 },
            { japones: '一番', lectura: 'ichiban', opciones: ['El número uno / El más', 'El peor', 'El último', 'El promedio'], respuesta: 0 },
            { japones: '出た', lectura: 'deta', opciones: ['Salió / Eyaculó', 'Se contuvo', 'Ignoró', 'Evitó'], respuesta: 0 }
        ],
        
        // MAZO 10
        10: [
            { japones: 'めちゃくちゃ', lectura: 'mechakucha', opciones: ['Desastre / Revuelto / Destrozado', 'Ordenado', 'Normal', 'Perfecto'], respuesta: 0 },
            { japones: '2回目', lectura: 'nikaime', opciones: ['Segunda vez / Segunda ronda', 'Primera vez', 'Última vez', 'Muchas veces'], respuesta: 0 },
            { japones: '初々しい', lectura: 'ubu ubushii', opciones: ['Inocente / Fresca / Novata', 'Experimentada', 'Cínica', 'Arrogante'], respuesta: 0 },
            { japones: '奴', lectura: 'yatsu', opciones: ['Tipo / Persona (coloquial, despectivo)', 'Amigo', 'Señor', 'Desconocido'], respuesta: 0 },
            { japones: 'だが', lectura: 'daga', opciones: ['Pero', 'Y', 'Porque', 'Entonces'], respuesta: 0 },
            { japones: '1回', lectura: 'ikkai', opciones: ['Una vez', 'Dos veces', 'Muchas veces', 'Nunca'], respuesta: 0 },
            { japones: '気絶', lectura: 'kizetsu', opciones: ['Desmayo / Perder el conocimiento', 'Despertar', 'Alerta', 'Dormir'], respuesta: 0 },
            { japones: '十回', lectura: 'jikkai', opciones: ['Diez veces', 'Cinco veces', 'Veinte veces', 'Una vez'], respuesta: 0 },
            { japones: 'ひたすら', lectura: 'hitasura', opciones: ['Sin parar / Obsesivamente', 'Intermitentemente', 'Raramente', 'Nunca'], respuesta: 0 },
            { japones: 'おもちゃ', lectura: 'omocha', opciones: ['Juguete', 'Herramienta', 'Objeto serio', 'Instrumento'], respuesta: 0 }
        ],
        
        // MAZO 11
        11: [
            { japones: 'めちゃくちゃに', lectura: 'mechakucha ni', opciones: ['De forma brutal / Destrozándome', 'Suavemente', 'Cuidadosamente', 'Lentamente'], respuesta: 0 },
            { japones: '犯され', lectura: 'okasare', opciones: ['Ser violada / Ser abusada sexualmente', 'Consentir', 'Resistir', 'Ignorar'], respuesta: 0 },
            { japones: '続けました', lectura: 'tsuzukemashita', opciones: ['Continué siendo / Fui continuada', 'Paré', 'Empecé', 'Evité'], respuesta: 0 },
            { japones: '底なし', lectura: 'soko nashi', opciones: ['Sin fondo / Inagotable', 'Limitado', 'Poco profundo', 'Vací'], respuesta: 0 },
            { japones: '精力', lectura: 'seiryoku', opciones: ['Vigor sexual / Energía', 'Debilidad', 'Cansancio', 'Enfermedad'], respuesta: 0 },
            { japones: '凄まじく', lectura: 'susamajiku', opciones: ['Impresionante / Feroz / Aterrador', 'Suave', 'Normal', 'Aburrido'], respuesta: 0 },
            { japones: '角度', lectura: 'kakudo', opciones: ['Ángulo', 'Dirección', 'Velocidad', 'Fuerza'], respuesta: 0 },
            { japones: 'イかされ', lectura: 'ikasare', opciones: ['Ser hecha correrme', 'Contenerme', 'Evitarlo', 'Ignorarlo'], respuesta: 0 },
            { japones: '懇願', lectura: 'kongan', opciones: ['Suplicar / Rogar', 'Ordenar', 'Ignorar', 'Rechazar'], respuesta: 0 },
            { japones: '休ませて', lectura: 'yasumasete', opciones: ['Dejar descansar', 'Seguir trabajando', 'Acelerar', 'Detener por completo'], respuesta: 0 }
        ],
        
        // MAZO 12
        12: [
            { japones: '止まってぇい', lectura: 'tomatteee', opciones: ['¡Para…! (súplica)', '¡Sigue!', '¡Más rápido!', '¡Más lento!'], respuesta: 0 },
            { japones: 'どころか', lectura: 'dokoroka', opciones: ['Lejos de / En vez de', 'Además de', 'Junto con', 'A pesar de'], respuesta: 0 },
            { japones: 'さらに', lectura: 'sara ni', opciones: ['Aún más', 'Menos', 'Igual', 'Nada'], respuesta: 0 },
            { japones: '激しく', lectura: 'hageshiku', opciones: ['Intensamente / Violentamente', 'Suavemente', 'Lentamente', 'Rápidamente'], respuesta: 0 },
            { japones: 'つぶしちゃ', lectura: 'tsubushicha', opciones: ['Está aplastando / Va a aplastar', 'Está construyendo', 'Está ignorando', 'Está soltando'], respuesta: 0 },
            { japones: '赦して', lectura: 'yurushite', opciones: ['Perdona / Perdóname', 'Castígame', 'Ignórame', 'Ayúdame'], respuesta: 0 },
            { japones: '突く', lectura: 'tsuku', opciones: ['Embestir / Penetrar', 'Retirar', 'Acariciar', 'Tocar'], respuesta: 0 },
            { japones: '度に', lectura: 'tabi ni', opciones: ['Cada vez que', 'Aunque', 'Porque', 'Mientras'], respuesta: 0 },
            { japones: '締め付け', lectura: 'shimetsuke', opciones: ['Apretón / Contracción', 'Soltura', 'Relajación', 'Expansión'], respuesta: 0 },
            { japones: '強くなってる', lectura: 'tsuyoku natteru', opciones: ['Se está haciendo más fuerte', 'Se está debilitando', 'Se mantiene igual', 'Desaparece'], respuesta: 0 }
        ],
        
        // MAZO 13
        13: [
            { japones: '何言ってんだ', lectura: 'nani itten da', opciones: ['¿Qué estás diciendo?', 'No digas nada', 'Habla más claro', 'Cállate'], respuesta: 0 },
            { japones: '子宮', lectura: 'shikyū', opciones: ['Útero', 'Ovario', 'Vagina', 'Pene'], respuesta: 0 },
            { japones: 'も', lectura: 'mo', opciones: ['También', 'No', 'Solo', 'Nunca'], respuesta: 0 },
            { japones: '喜んでる', lectura: 'yorokonderu', opciones: ['Está feliz / Se alegra', 'Está triste', 'Está enojada', 'Está asustada'], respuesta: 0 },
            { japones: '弱々', lectura: 'yowayowa', opciones: ['Débil / Flojo / Frágil', 'Fuerte', 'Resistente', 'Sólido'], respuesta: 0 },
            { japones: '豚', lectura: 'buta', opciones: ['Cerda / Puerca (insulto degradante)', 'Ángel', 'Princesa', 'Reina'], respuesta: 0 },
            { japones: '痙攣', lectura: 'keiren', opciones: ['Convulsiones / Espasmos', 'Relajación', 'Calma', 'Rigidez'], respuesta: 0 },
            { japones: '潮吹いたら', lectura: 'shio fuitara', opciones: ['Si squirteas', 'Si te contienes', 'Si te excitas', 'Si te duermes'], respuesta: 0 },
            { japones: '脱水症状', lectura: 'dassui shōjō', opciones: ['Deshidratación', 'Hidratación', 'Nutrición', 'Intoxicación'], respuesta: 0 },
            { japones: 'へばってんじゃねえ', lectura: 'hebat ten ja nee', opciones: ['No te derrumbes', 'Derrúmbate', 'Relájate', 'Duerme'], respuesta: 0 }
        ],
        
        // MAZO 14
        14: [
            { japones: 'このまま', lectura: 'kono mama', opciones: ['Así como está / De esta forma', 'Cambiando', 'Mejorando', 'Empeorando'], respuesta: 0 },
            { japones: 'おかしく', lectura: 'okashiku', opciones: ['Loco / Extraño', 'Normal', 'Lógico', 'Obvio'], respuesta: 0 },
            { japones: '漏れてる', lectura: 'moreteru', opciones: ['Se está escapando / Goteando', 'Está contenido', 'Está seco', 'Está limpio'], respuesta: 0 },
            { japones: '聞いてんだ', lectura: 'kiitenda', opciones: ['Estoy preguntando', 'No estoy preguntando', 'Estoy ignorando', 'Estoy afirmando'], respuesta: 0 },
            { japones: 'つべこべ', lectura: 'tsubekobe', opciones: ['Tonterías / Excusas', 'Verdades', 'Órdenes', 'Preguntas'], respuesta: 0 },
            { japones: '言ってないで', lectura: 'ittenai de', opciones: ['Sin decir / Sin pretextos', 'Diciendo mucho', 'Gritando', 'Cantando'], respuesta: 0 },
            { japones: '明日', lectura: 'ashita', opciones: ['Mañana', 'Hoy', 'Ayer', 'Pasado mañana'], respuesta: 0 },
            { japones: '職員会議', lectura: 'shokuin kaigi', opciones: ['Reunión del personal / Junta de profesores', 'Reunión de estudiantes', 'Fiesta', 'Clase'], respuesta: 0 },
            { japones: '推薦者', lectura: 'suishensha', opciones: ['Persona recomendada / Candidato recomendado', 'Persona rechazada', 'Persona ignorada', 'Persona aleatoria'], respuesta: 0 },
            { japones: '名簿', lectura: 'meibo', opciones: ['Lista / Registro de nombres', 'Carta', 'Libro', 'Contrato'], respuesta: 0 }
        ],
        
        // MAZO 15
        15: [
            { japones: '出しといて', lectura: 'dashitoite', opciones: ['Prepara y deja listo', 'Esconde', 'Destruye', 'Ignora'], respuesta: 0 },
            { japones: '追加', lectura: 'tsuika', opciones: ['Adición / Agregar', 'Eliminación', 'Sustitución', 'División'], respuesta: 0 },
            { japones: '頼んだ', lectura: 'tanonda', opciones: ['Te encargo / Cuento contigo', 'Te rechazo', 'Te ignoro', 'Te cuestiono'], respuesta: 0 },
            { japones: 'とことん', lectura: 'tokoton', opciones: ['Hasta el fondo / Completamente', 'Superficialmente', 'A medias', 'Nunca'], respuesta: 0 },
            { japones: '楽しませろ', lectura: 'tanoshimase ro', opciones: ['Diviérteme / Hazme disfrutar', 'Abúrreme', 'Asústame', 'Enójame'], respuesta: 0 },
            { japones: '出せ', lectura: 'dase', opciones: ['Sácalo / Hazlo salir', 'Guárdalo', 'Conténlo', 'Ignóralo'], respuesta: 0 },
            { japones: 'カエル', lectura: 'kaeru', opciones: ['Rana', 'Sapo', 'Pez', 'Pájaro'], respuesta: 0 },
            { japones: 'ヒクついて', lectura: 'hikutsuite', opciones: ['Temblando / Contrayéndose', 'Quieto', 'Relajado', 'Rígido'], respuesta: 0 },
            { japones: 'ないで', lectura: 'naide', opciones: ['Sin / En vez de', 'Con', 'A pesar de', 'Debido a'], respuesta: 0 },
            { japones: '呆れた', lectura: 'akireta', opciones: ['Me quedé atónita / No puedo creerlo', 'Me alegré', 'Me entristecí', 'Me enojé'], respuesta: 0 }
        ],
        
        // MAZO 16
        16: [
            { japones: '熱く', lectura: 'atsuku', opciones: ['Más caliente', 'Más frío', 'Igual', 'Tibio'], respuesta: 0 },
            { japones: '生で', lectura: 'nama de', opciones: ['Sin condón / Crudo', 'Con protección', 'Con cuidado', 'Con miedo'], respuesta: 0 },
            { japones: 'やらせろ', lectura: 'yarase ro', opciones: ['Déjame hacerlo', 'No me dejes', 'Ayúdame', 'Detente'], respuesta: 0 },
            { japones: '妊娠', lectura: 'ninshin', opciones: ['Embarazo', 'Menstruación', 'Ovulación', 'Menopausia'], respuesta: 0 },
            { japones: 'ゆっくり', lectura: 'yukkuri', opciones: ['Despacio / Lentamente', 'Rápidamente', 'De repente', 'Nunca'], respuesta: 0 },
            { japones: '引いて', lectura: 'hiite', opciones: ['Sacar / Retirar', 'Meter', 'Presionar', 'Girar'], respuesta: 0 },
            { japones: 'ぶっ刺す', lectura: 'buttsasu', opciones: ['Clavar / Perforar (intenso)', 'Acariciar', 'Tocar', 'Lamer'], respuesta: 0 },
            { japones: '思いっきり', lectura: 'omoikkiri', opciones: ['Con todas mis fuerzas / Al máximo', 'Suavemente', 'A medias', 'Sin esfuerzo'], respuesta: 0 },
            { japones: '膨れてる', lectura: 'fukureteru', opciones: ['Se está hinchando / Expandéndose', 'Se está desinflando', 'Se mantiene igual', 'Se está encogiendo'], respuesta: 0 },
            { japones: '怖いっ', lectura: 'kowaiっ', opciones: ['¡Tengo miedo!', '¡Estoy feliz!', '¡Estoy enojada!', '¡Estoy sorprendida!'], respuesta: 0 }
        ],
        
        // MAZO 17
        17: [
            { japones: 'みっちり', lectura: 'micchiri', opciones: ['Bien apretado / Relleno al máximo', 'Flojo', 'Vacío', 'Medio lleno'], respuesta: 0 },
            { japones: 'ぶち込む', lectura: 'buchi komu', opciones: ['Clavar / Meter con fuerza', 'Sacar suavemente', 'Tocar ligeramente', 'Ignorar'], respuesta: 0 },
            { japones: '意識', lectura: 'ishiki', opciones: ['Conciencia / Enfócate en', 'Inconsciencia', 'Distracción', 'Olvido'], respuesta: 0 },
            { japones: 'のぼって', lectura: 'nobotte', opciones: ['Subiendo / Ascendiendo', 'Bajando', 'Estancado', 'Desapareciendo'], respuesta: 0 },
            { japones: 'バカ面', lectura: 'baka men', opciones: ['Cara de idiota / Expresión tonta', 'Cara inteligente', 'Cara seria', 'Cara feliz'], respuesta: 0 },
            { japones: '将来', lectura: 'shōrai', opciones: ['Futuro', 'Pasado', 'Presente', 'Ayer'], respuesta: 0 },
            { japones: '尿道', lectura: 'nyōdō', opciones: ['Uretra', 'Vagina', 'Ano', 'Vejiga'], respuesta: 0 },
            { japones: '一滴', lectura: 'itteki', opciones: ['Una gota', 'Un chorro', 'Un litro', 'Nada'], respuesta: 0 },
            { japones: '残らず', lectura: 'nokorazu', opciones: ['Sin dejar rastro / Sin dejar ninguna', 'Dejando algunas', 'Dejando muchas', 'Dejando todas'], respuesta: 0 },
            { japones: '飲め', lectura: 'nome', opciones: ['Bebe (imperativo)', 'Escupe', 'Guarda', 'Tira'], respuesta: 0 }
        ],
        
        // MAZO 18
        18: [
            { japones: 'ぶっとくて', lectura: 'buttokute', opciones: ['Gruesa / Gorda', 'Delgada', 'Normal', 'Pequeña'], respuesta: 0 },
            { japones: 'たくましい', lectura: 'takumashii', opciones: ['Robusta / Fuerte', 'Débil', 'Floja', 'Delicada'], respuesta: 0 },
            { japones: '考えられない', lectura: 'kangaerarenai', opciones: ['No puedo pensar en otra cosa', 'Puedo pensar en otras cosas', 'No pienso en nada', 'Pienso demasiado'], respuesta: 0 },
            { japones: 'きったねえ', lectura: 'kittanee', opciones: ['Asqueroso / Sucio', 'Limpio', 'Fragante', 'Inodoro'], respuesta: 0 },
            { japones: 'ゲップ', lectura: 'geppu', opciones: ['Eructo', 'Suspiro', 'Grito', 'Risa'], respuesta: 0 },
            { japones: '受かった', lectura: 'ukatta', opciones: ['Aprobaste / Pasaste', 'Reprobaste', 'Ignoraste', 'Evitaste'], respuesta: 0 },
            { japones: '筆記', lectura: 'hikki', opciones: ['Examen escrito', 'Examen oral', 'Entrevista', 'Práctica'], respuesta: 0 },
            { japones: '面接', lectura: 'mensetsu', opciones: ['Entrevista', 'Examen', 'Charla', 'Discusión'], respuesta: 0 },
            { japones: 'バッチリ', lectura: 'bacchiri', opciones: ['Perfecto / Impecable', 'Terrible', 'Regular', 'Incompleto'], respuesta: 0 },
            { japones: '行かないと', lectura: 'ikanai to', opciones: ['Tengo que ir', 'Puedo quedarme', 'No debo ir', 'Quiero ir'], respuesta: 0 }
        ],
        
        // MAZO 19
        19: [
            { japones: '呼ばれてる', lectura: 'yobareteru', opciones: ['Me están llamando', 'Me están ignorando', 'Me están elogiando', 'Me están criticando'], respuesta: 0 },
            { japones: 'べっとり', lectura: 'bettori', opciones: ['Pegajoso / Viscoso', 'Seco', 'Ligero', 'Acuoso'], respuesta: 0 },
            { japones: '絡ませろ', lectura: 'karamasero', opciones: ['Enreda / Enlaza', 'Separa', 'Suelta', 'Ignora'], respuesta: 0 },
            { japones: '嫌々', lectura: 'iya iya', opciones: ['De mala gana / Diciendo que no', 'Con gusto', 'Sin quejarse', 'Con entusiasmo'], respuesta: 0 },
            { japones: '言いながら', lectura: 'iinagara', opciones: ['Mientras dices', 'Después de decir', 'Antes de decir', 'Sin decir'], respuesta: 0 },
            { japones: 'マン汁', lectura: 'man jiru', opciones: ['Jugos vaginales / Flujo', 'Semen', 'Sudor', 'Saliva'], respuesta: 0 },
            { japones: 'ダバダバ', lectura: 'daba daba', opciones: ['Chorreando / Goteando abundantemente', 'Goteando poco', 'Seco', 'Espeso'], respuesta: 0 },
            { japones: '孕め', lectura: 'harame', opciones: ['Embaraízate', 'Evita el embarazo', 'Aborta', 'Da a luz'], respuesta: 0 },
            { japones: '飽きねぇわ', lectura: 'akinee wa', opciones: ['No me canso', 'Me aburro rápido', 'Me da igual', 'Me molesta'], respuesta: 0 },
            { japones: '吸盤みてぇ', lectura: 'kyūban mitē', opciones: ['Como una ventosa', 'Como un imán', 'Como un pegamento', 'Como un resorte'], respuesta: 0 }
        ],
        
        // MAZO 20
        20: [
            { japones: '密着してやがる', lectura: 'micchaku shite yagaru', opciones: ['Se está pegando completamente', 'Se está separando', 'Se está ignorando', 'Se está moviendo'], respuesta: 0 },
            { japones: '腰振', lectura: 'koshi buri', opciones: ['Movimiento de caderas', 'Movimiento de piernas', 'Movimiento de brazos', 'Movimiento de cabeza'], respuesta: 0 },
            { japones: '角度', lectura: 'kakudo', opciones: ['Ángulo', 'Velocidad', 'Fuerza', 'Dirección'], respuesta: 0 },
            { japones: '振ってくれよ', lectura: 'futte kure yo', opciones: ['Muévela por mí / Hazlo', 'Detente', 'Suaviza', 'Acelera'], respuesta: 0 },
            { japones: '聞いてんのか?', lectura: 'kiiten no ka?', opciones: ['¿Me estás escuchando?', '¿No me escuchas?', '¿Me ignoras?', '¿Me entiendes?'], respuesta: 0 },
            { japones: '完全に', lectura: 'kanzen ni', opciones: ['Completamente', 'Parcialmente', 'Nada', 'Casi'], respuesta: 0 },
            { japones: '頭', lectura: 'atama', opciones: ['Cabeza', 'Corazón', 'Estómago', 'Mano'], respuesta: 0 },
            { japones: 'の方', lectura: 'no hō', opciones: ['En cuanto a, la parte de', 'Lejos de', 'Junto con', 'A pesar de'], respuesta: 0 },
            { japones: 'お粗末', lectura: 'osomatsu', opciones: ['Pobre, mediocre, cutre', 'Excelente, lujoso', 'Normal, regular', 'Simple, básico'], respuesta: 0 },
            { japones: '体', lectura: 'karada', opciones: ['Cuerpo', 'Mente', 'Alma', 'Espíritu'], respuesta: 0 }
        ],
        
        // MAZO 21
        21: [
            { japones: '超', lectura: 'chō', opciones: ['Super, hiper, jodidamente', 'Un poco', 'Normalmente', 'Nunca'], respuesta: 0 },
            { japones: '優秀', lectura: 'yūshū', opciones: ['Excelente, sobresaliente', 'Pésimo, terrible', 'Normal, promedio', 'Deficiente, bajo'], respuesta: 0 },
            { japones: '門', lectura: 'mon', opciones: ['Puerta (grande, entrada)', 'Ventana', 'Pared', 'Techo'], respuesta: 0 },
            { japones: 'が', lectura: 'ga', opciones: ['Partícula sujeto', 'Partícula objeto', 'Partícula posesiva', 'Partícula dirección'], respuesta: 0 },
            { japones: '閉まる', lectura: 'shimaru', opciones: ['Cerrarse', 'Abrirse', 'Romperse', 'Moverse'], respuesta: 0 },
            { japones: '前', lectura: 'mae', opciones: ['Antes', 'Después', 'Durante', 'Mientras'], respuesta: 0 },
            { japones: '帰れ', lectura: 'kaere', opciones: ['Vuelve (imperativo)', 'Quédate', 'Ve', 'Espera'], respuesta: 0 },
            { japones: '遅れたら', lectura: 'okuretara', opciones: ['Si llegas tarde / Si te retrasas', 'Si llegas temprano', 'Si llegas a tiempo', 'Si no llegas'], respuesta: 0 },
            { japones: '失神', lectura: 'shisshin', opciones: ['Desmayo, pérdida del conocimiento', 'Despertar', 'Alerta', 'Sueño'], respuesta: 0 },
            { japones: 'ガチ', lectura: 'gachi', opciones: ['En serio, de verdad, sin bromas', 'En broma', 'Quizás', 'Nunca'], respuesta: 0 }
        ],
        
        // MAZO 22
        22: [
            { japones: 'ありがたく', lectura: 'arigataku', opciones: ['Con gratitud', 'Con resentimiento', 'Con indiferencia', 'Con enojo'], respuesta: 0 },
            { japones: 'ぶち犯して', lectura: 'buchi okashite', opciones: ['Follar a lo bestia / Violar violentamente', 'Hacerlo suavemente', 'Ignorar', 'Respetar'], respuesta: 0 },
            { japones: '使ってやる', lectura: 'tsukatte yaru', opciones: ['Te voy a usar (arrogante)', 'Te voy a ayudar', 'Te voy a ignorar', 'Te voy a proteger'], respuesta: 0 },
            { japones: '感謝しながら', lectura: 'kansha shinagara', opciones: ['Mientras agradeces', 'Mientras te quejas', 'Mientras ignoras', 'Mientras lloras'], respuesta: 0 },
            { japones: '密着', lectura: 'micchaku', opciones: ['Adhesión / Pegado completamente', 'Separación', 'Distancia', 'Libertad'], respuesta: 0 },
            { japones: '聞こえてねぇ', lectura: 'kikoetenee', opciones: ['No se escucha / No oye', 'Se escucha claro', 'Se escucha poco', 'Se escucha mucho'], respuesta: 0 }
        ],

  "D1": [
    { "japones": "進路", "lectura": "しんろ", "opciones": ["Camino profesional", "Regreso", "Atajo", "Desvío"], "respuesta": 0 },
    { "japones": "内申点", "lectura": "ないしんてん", "opciones": ["Calificaciones internas", "Puntos de bonificación", "Nota final", "Puntuación de asistencia"], "respuesta": 0 },
    { "japones": "重要", "lectura": "じゅうよう", "opciones": ["Importante", "Secundario", "Olvidable", "Común"], "respuesta": 0 },
    { "japones": "点数", "lectura": "てんすう", "opciones": ["Puntuación", "Dinero", "Tiempo", "Esfuerzo"], "respuesta": 0 },
    { "japones": "挽回", "lectura": "ばんかい", "opciones": ["Recuperación", "Abandono", "Celebración", "Crítica"], "respuesta": 0 },
    { "japones": "成績", "lectura": "せいせき", "opciones": ["Rendimiento académico", "Personalidad", "Salud", "Economía"], "respuesta": 0 },
    { "japones": "提案", "lectura": "ていあん", "opciones": ["Propuesta", "Rechazo", "Queja", "Orden"], "respuesta": 0 },
    { "japones": "推薦者", "lectura": "すいせんしゃ", "opciones": ["Persona que recomienda", "Persona que juzga", "Persona que critica", "Persona que observa"], "respuesta": 0 },
    { "japones": "名簿", "lectura": "めいぼ", "opciones": ["Lista de nombres", "Libro de texto", "Contrato", "Diario"], "respuesta": 0 },
    { "japones": "将来", "lectura": "しょうらい", "opciones": ["Futuro", "Pasado", "Presente", "Oportunidad"], "respuesta": 0 }
  ],
  "D2": [
    { "japones": "太刀打ち", "lectura": "たちうち", "opciones": ["Poder competir", "Golpear con espada", "Esquivar", "Rendirse"], "respuesta": 0 },
    { "japones": "絞って", "lectura": "しぼって", "opciones": ["Exprimir", "Aflojar", "Romper", "Untar"], "respuesta": 0 },
    { "japones": "励んだ", "lectura": "はげんだ", "opciones": ["Esforzarse", "Descansar", "Abandonar", "Observar"], "respuesta": 0 },
    { "japones": "取ら", "lectura": "とら", "opciones": ["Forma de 'tomar'", "Forma de 'dar'", "Forma de 'ver'", "Forma de 'oir'"], "respuesta": 0 },
    { "japones": "攻めたら", "lectura": "せめたら", "opciones": ["Si atacas", "Si defiendes", "Si huyes", "Si negocias"], "respuesta": 0 },
    { "japones": "盛大に", "lectura": "せいだいに", "opciones": ["Espléndidamente", "Modestamente", "Tristemente", "Rápidamente"], "respuesta": 0 },
    { "japones": "用意", "lectura": "ようい", "opciones": ["Preparación", "Descuidado", "Improvisación", "Memorización"], "respuesta": 0 },
    { "japones": "筆記", "lectura": "ひっき", "opciones": ["Escrito", "Oral", "Práctico", "Visual"], "respuesta": 0 },
    { "japones": "面接", "lectura": "めんせつ", "opciones": ["Entrevista", "Examen", "Charla", "Debate"], "respuesta": 0 },
    { "japones": "追加", "lectura": "ついか", "opciones": ["Adición", "Eliminación", "Modificación", "División"], "respuesta": 0 }
  ],
  "D3": [
    { "japones": "焦燥感", "lectura": "しょうそうかん", "opciones": ["Sensación de ansiedad", "Sensación de paz", "Sensación de frío", "Sensación de alegría"], "respuesta": 0 },
    { "japones": "焦らなく", "lectura": "あせらなく", "opciones": ["Sin prisas", "Con urgencia", "Con ira", "Con tristeza"], "respuesta": 0 },
    { "japones": "圧し潰されてる", "lectura": "おしつぶされてる", "opciones": ["Estar aplastado", "Estar elevado", "Estar liberado", "Estar construido"], "respuesta": 0 },
    { "japones": "底なし", "lectura": "そこなし", "opciones": ["Sin fondo", "Poco profundo", "Transparente", "Sólido"], "respuesta": 0 },
    { "japones": "呆れた", "lectura": "あきれた", "opciones": ["Exasperado", "Emocionado", "Asustado", "Hambriento"], "respuesta": 0 },
    { "japones": "膨れてる", "lectura": "ふくれてる", "opciones": ["Hinchado", "Encogido", "Mojado", "Seco"], "respuesta": 0 },
    { "japones": "嫌々", "lectura": "いやいや", "opciones": ["De mala gana", "Con entusiasmo", "Rápidamente", "Lentamente"], "respuesta": 0 },
    { "japones": "優秀", "lectura": "ゆうしゅう", "opciones": ["Excelente", "Mediocre", "Novato", "Experto"], "respuesta": 0 },
    { "japones": "閉まる", "lectura": "しまる", "opciones": ["Cerrarse", "Abrirse", "Romperse", "Moverse"], "respuesta": 0 },
    { "japones": "門", "lectura": "もん", "opciones": ["Puerta grande", "Ventana", "Camino", "Jardín"], "respuesta": 0 }
  ],
  "D4": [
    { "japones": "股", "lectura": "また", "opciones": ["Ingle", "Hombro", "Codo", "Rodilla"], "respuesta": 0 },
    { "japones": "潮吹き", "lectura": "しおふき", "opciones": ["Eyaculación femenina", "Géiser", "Vómito", "Sudor"], "respuesta": 0 },
    { "japones": "爆乳", "lectura": "ばくにゅう", "opciones": ["Pechos enormes", "Leche explosiva", "Coraje", "Noticia"], "respuesta": 0 },
    { "japones": "奴", "lectura": "やつ", "opciones": ["Tipo/Individuo", "Objeto", "Lugar", "Idea"], "respuesta": 0 },
    { "japones": "精力", "lectura": "せいりょく", "opciones": ["Energía sexual", "Debilidad", "Paciencia", "Inteligencia"], "respuesta": 0 },
    { "japones": "尿道", "lectura": "にょうどう", "opciones": ["Uretra", "Vejiga", "Riñón", "Intestino"], "respuesta": 0 },
    { "japones": "痙攣", "lectura": "けいれん", "opciones": ["Espasmo", "Relajación", "Sudoración", "Hormigueo"], "respuesta": 0 },
    { "japones": "一滴残らず", "lectura": "いってきのこらず", "opciones": ["Hasta la última gota", "Solo un poco", "La mitad", "Casi todo"], "respuesta": 0 },
    { "japones": "妊娠", "lectura": "にんしん", "opciones": ["Embarazo", "Menstruación", "Menopausia", "Enfermedad"], "respuesta": 0 },
    { "japones": "失神", "lectura": "しっしん", "opciones": ["Pérdida del conocimiento", "Grito", "Risa", "Alerta"], "respuesta": 0 }
  ],
  "D5": [
    { "japones": "潮吹いたら", "lectura": "しおふいたら", "opciones": ["Si eyacula", "Si sube la marea", "Si llueve", "Si suda"], "respuesta": 0 },
    { "japones": "脱水症状", "lectura": "だっすいしょうじょう", "opciones": ["Deshidratación", "Intoxicación", "Alergia", "Gripe"], "respuesta": 0 },
    { "japones": "漏れてる", "lectura": "もれてる", "opciones": ["Estar goteando", "Estar bloqueado", "Estar lleno", "Estar seco"], "respuesta": 0 },
    { "japones": "ヒクついて", "lectura": "ひくついて", "opciones": ["Con espasmos", "Riendo", "Cantando", "Durmiendo"], "respuesta": 0 },
    { "japones": "ダバダバ", "lectura": "だばだば", "opciones": ["Sonido de líquido copioso", "Sonido de pasos", "Sonido de risa", "Sonido de golpes"], "respuesta": 0 },
    { "japones": "吸盤みてぇ", "lectura": "きゅうばんみてぇ", "opciones": ["Como una ventosa", "Como un imán", "Como un cepillo", "Como un cuchillo"], "respuesta": 0 },
    { "japones": "密着してやがる", "lectura": "みっちゃくしてやがる", "opciones": ["Se está pegando", "Se está separando", "Se está limpiando", "Se está rompiendo"], "respuesta": 0 },
    { "japones": "腰振ってくれよ", "lectura": "こしふってくれよ", "opciones": ["¡Mueve las caderas!", "¡Siéntate!", "¡Levántate!", "¡Corre!"], "respuesta": 0 },
    { "japones": "飽きねぇわ", "lectura": "あきねぇわ", "opciones": ["No me canso", "Estoy aburrido", "Tengo miedo", "Tengo hambre"], "respuesta": 0 },
    { "japones": "お粗末", "lectura": "おそまつ", "opciones": ["Algo humilde", "Algo lujoso", "Algo peligroso", "Algo delicioso"], "respuesta": 0 }
  ]

        
    },

    // Sub-contenedor 1.9
    'sub1_9': {
        // MAZO 1
        1: [
            { japones: '適当に', lectura: 'tekitou ni', opciones: ['de cualquier manera', 'vena', 'lo que has visto', 'coño'], respuesta: 0 },
            { japones: '演技', lectura: 'engi', opciones: ['actuación', 'rechazado', 'mierda débil', 'caer'], respuesta: 0 },
            { japones: 'さっさと', lectura: 'sassato', opciones: ['rápido', 'amo', 'mierda débil', 'terminar'], respuesta: 0 },
            { japones: '終わらせ', lectura: 'owarase', opciones: ['terminar', 'rápido', 'coño', 'vena'], respuesta: 0 },
            { japones: '抱かれる', lectura: 'dakareru', opciones: ['ser abrazado', 'nos separamos', 'insertar', 'actuación'], respuesta: 0 },
            { japones: '子供', lectura: 'kodomo', opciones: ['niño', 'rápido', 'rápido', 'actuación'], respuesta: 0 },
            { japones: '相手', lectura: 'aite', opciones: ['pareja', 'rechazado', 'ser abrazado', 'tranquilidad'], respuesta: 0 },
            { japones: '堕ちる', lectura: 'ochiru', opciones: ['caer', 'rechazado', 'mierda débil', 'lo que has visto'], respuesta: 0 },
            { japones: '安心', lectura: 'anshin', opciones: ['tranquilidad', 'destruir', 'actuación', 'terminar'], respuesta: 0 },
            { japones: '見たこと', lectura: 'mita koto', opciones: ['lo que has visto', 'onahole', 'insertar', 'coño'], respuesta: 0 },
        ],

        // MAZO 2
        2: [
            { japones: '血管', lectura: 'kekkan', opciones: ['vena', 'ser abrazado', 'polla', 'pareja'], respuesta: 0 },
            { japones: 'バキバキ', lectura: 'bakibaki', opciones: ['duro como piedra', 'embarazo', 'destruir', 'coño'], respuesta: 0 },
            { japones: '子宮', lectura: 'shikyuu', opciones: ['útero', 'rechazado', 'ser abrazado', 'onahole'], respuesta: 0 },
            { japones: '早く', lectura: 'hayaku', opciones: ['rápido', 'pene corto y pequeño', 'onahole', 'perdedor'], respuesta: 0 },
            { japones: 'ハメ', lectura: 'hame', opciones: ['insertar', 'exclusivo', 'patéticamente', 'coño'], respuesta: 0 },
            { japones: 'イケメン', lectura: 'ikemen', opciones: ['guapo', 'onahole', 'ser abrazado', 'pene corto y pequeño'], respuesta: 0 },
            { japones: 'チンポ', lectura: 'chinpo', opciones: ['polla', 'ser abrazado', 'terminar', 'amo'], respuesta: 0 },
            { japones: 'おマンコ', lectura: 'oman ko', opciones: ['coño', 'pareja', 'mierda débil', 'exclusivo'], respuesta: 0 },
            { japones: 'ぶっ壊す', lectura: 'bukkowasu', opciones: ['destruir', 'tranquilidad', 'nos separamos', 'ser abrazado'], respuesta: 0 },
            { japones: '旦那様', lectura: 'danna-sama', opciones: ['amo', 'patéticamente', 'vena', 'pareja'], respuesta: 0 },
        ],

        // MAZO 3
        3: [
            { japones: '専用', lectura: 'senyou', opciones: ['exclusivo', 'caer', 'terminar', 'de cualquier manera'], respuesta: 0 },
            { japones: '孕み', lectura: 'harami', opciones: ['embarazo', 'lo que has visto', 'coño', 'tranquilidad'], respuesta: 0 },
            { japones: 'オナホ', lectura: 'onaho', opciones: ['onahole', 'útero', 'patéticamente', 'mierda débil'], respuesta: 0 },
            { japones: 'クソ雑魚', lectura: 'kuso zako', opciones: ['mierda débil', 'amo', 'actuación', 'guapo'], respuesta: 0 },
            { japones: '短小', lectura: 'tanshou', opciones: ['pene corto y pequeño', 'caer', 'destruir', 'coño'], respuesta: 0 },
            { japones: '別れます', lectura: 'wakarimasu', opciones: ['nos separamos', 'exclusivo', 'pene corto y pequeño', 'masturbarse'], respuesta: 0 },
            { japones: '負け組', lectura: 'makegumi', opciones: ['perdedor', 'mierda débil', 'actuación', 'rápido'], respuesta: 0 },
            { japones: '情けなく', lectura: 'nasakenaku', opciones: ['patéticamente', 'embarazo', 'terminar', 'onahole'], respuesta: 0 },
            { japones: 'シコって', lectura: 'shikotte', opciones: ['masturbarse', 'exclusivo', 'coño', 'rechazado'], respuesta: 0 },
            { japones: 'お断り', lectura: 'okotowari', opciones: ['rechazado', 'lo que has visto', 'pene corto y pequeño', 'mierda débil'], respuesta: 0 },
        ],

    },

    // Sub-contenedor 1.10
    'sub1_10': {
        // MAZO 1
        1: [
            { japones: '二人きり', lectura: 'futari kiri', opciones: ['a solas', 'agujero hembra', 'usando', 'ir a meter'], respuesta: 0 },
            { japones: 'うらやましい', lectura: 'urayamashii', opciones: ['envidiable', '¿puedo recibir?', 'justo a tiempo', 'inmediatamente'], respuesta: 0 },
            { japones: 'けしからん', lectura: 'keshikaran', opciones: ['indecente', 'usando', 'como puedes ver', 'meterse'], respuesta: 0 },
            { japones: 'ちょっかい', lectura: 'chokkai', opciones: ['meterse', 'agujero hembra', 'como puedes ver', 'ir a meter'], respuesta: 0 },
            { japones: '出しに', lectura: 'dashi ni', opciones: ['ir a meter', 'cayó', 'inmediatamente', '¿puedo recibir?'], respuesta: 0 },
            { japones: 'ちょうどいい', lectura: 'choudo ii', opciones: ['justo a tiempo', 'déjame usar', 'agujero hembra', 'cayó'], respuesta: 0 },
            { japones: '見ての通り', lectura: 'mite no toori', opciones: ['como puedes ver', 'indecente', 'cayó', 'usando'], respuesta: 0 },
            { japones: '使って', lectura: 'tsukatte', opciones: ['usando', 'déjame usar', '¿puedo recibir?', 'envidiable'], respuesta: 0 },
            { japones: '落ちた', lectura: 'ochita', opciones: ['cayó', 'a solas', 'agujero hembra', 'inmediatamente'], respuesta: 0 },
            { japones: '早速', lectura: 'sassoku', opciones: ['inmediatamente', 'a solas', 'justo a tiempo', 'cayó'], respuesta: 0 },
        ],

        // MAZO 2
        2: [
            { japones: '悪い', lectura: 'warui', opciones: ['malo', 'meterse', 'ir a meter', 'cayó'], respuesta: 0 },
            { japones: 'メス穴', lectura: 'mesu ana', opciones: ['agujero hembra', 'ir a meter', '¿puedo recibir?', 'inmediatamente'], respuesta: 0 },
            { japones: '使わせて', lectura: 'tsukawasete', opciones: ['déjame usar', '¿puedo recibir?', 'cayó', 'agujero hembra'], respuesta: 0 },
            { japones: 'もらえるか', lectura: 'moraeru ka', opciones: ['¿puedo recibir?', 'usando', 'ir a meter', 'déjame usar'], respuesta: 0 },
        ],

    },

    // Sub-contenedor 1.11
    'sub1_11': {
        // MAZO 1
        1: [
            { japones: '息', lectura: 'iki', opciones: ['respiración', 'chupar', 'fácil', 'hipnosis'], respuesta: 0 },
            { japones: '荒い', lectura: 'arai', opciones: ['agitada', 'fácil de engañar', 'cayó bajo', 'chupar'], respuesta: 0 },
            { japones: '無理', lectura: 'muri', opciones: ['imposible', 'chúpamela ya" o "hazlo ya', 'involucrarse', 'malas palabras'], respuesta: 0 },
            { japones: 'オナホ', lectura: 'onaho', opciones: ['onahole', 'absolutamente', 'eyaculación', 'hipnosis'], respuesta: 0 },
            { japones: 'やっば', lectura: 'yabba', opciones: ['joder', 'fácil de engañar', 'malas palabras', 'inmediatamente'], respuesta: 0 },
            { japones: '関わる', lectura: 'kakawaru', opciones: ['involucrarse', 'molesto', 'chúpamela ya" o "hazlo ya', 'cayó bajo'], respuesta: 0 },
            { japones: 'めんどくさい', lectura: 'mendokusai', opciones: ['molesto', 'usar hasta romper', 'desprecio', 'joder'], respuesta: 0 },
            { japones: '絶対', lectura: 'zettai', opciones: ['absolutamente', 'molesto', 'un disparo', 'malas palabras'], respuesta: 0 },
            { japones: '催眠', lectura: 'saimin', opciones: ['hipnosis', 'siguiente', 'desprecio', 'bien'], respuesta: 0 },
            { japones: 'かかった', lectura: 'kakatta', opciones: ['cayó bajo', 'fácil de engañar', 'un disparo', 'agitada'], respuesta: 0 },
        ],

        // MAZO 2
        2: [
            { japones: 'いちょろ', lectura: 'ichoro', opciones: ['fácil de engañar', 'bien', 'por ahora', 'molesto'], respuesta: 0 },
            { japones: '蔑み', lectura: 'sutemi', opciones: ['desprecio', 'chupar', 'respiración', 'chúpamela ya" o "hazlo ya'], respuesta: 0 },
            { japones: 'ぶち犯す', lectura: 'buchi okasu', opciones: ['follar a la fuerza', 'fácil de engañar', 'chúpamela ya" o "hazlo ya', 'onahole'], respuesta: 0 },
            { japones: '使い潰す', lectura: 'tsukai tsukusu', opciones: ['usar hasta romper', 'cayó bajo', 'hipnosis', 'imposible'], respuesta: 0 },
            { japones: '散々', lectura: 'sanzan', opciones: ['repetidamente', 'ven', 'siguiente', 'follar a la fuerza'], respuesta: 0 },
            { japones: 'じょぶもう', lectura: 'jobu mou', opciones: ['chúpamela ya" o "hazlo ya', 'joder', 'agitada', 'eyaculación'], respuesta: 0 },
            { japones: 'お手軽', lectura: 'otegaru', opciones: ['fácil', 'imposible', 'absolutamente', 'joder'], respuesta: 0 },
            { japones: '便所', lectura: 'benjo', opciones: ['baño', 'agitada', 'usar hasta romper', 'absolutamente'], respuesta: 0 },
            { japones: '呼んだら', lectura: 'yondara', opciones: ['si te llamo', 'molesto', 'bien', 'fácil de engañar'], respuesta: 0 },
            { japones: 'すぐ', lectura: 'sugu', opciones: ['inmediatamente', 'malas palabras', 'onahole', 'terminó'], respuesta: 0 },
        ],

        // MAZO 3
        3: [
            { japones: '来い', lectura: 'koi', opciones: ['ven', 'por ahora', 'repetidamente', 'si te llamo'], respuesta: 0 },
            { japones: 'とりあえず', lectura: 'toriaezu', opciones: ['por ahora', 'terminó', 'usar hasta romper', 'malas palabras'], respuesta: 0 },
            { japones: '一発', lectura: 'ippatsu', opciones: ['un disparo', 'follar a la fuerza', 'terminó', 'molesto'], respuesta: 0 },
            { japones: '射精', lectura: 'shasei', opciones: ['eyaculación', 'onahole', 'respiración', 'ven'], respuesta: 0 },
            { japones: 'フィニッシュ', lectura: 'finisshu', opciones: ['finish', 'chúpamela ya" o "hazlo ya', 'involucrarse', 'usar hasta romper'], respuesta: 0 },
            { japones: '最っ高', lectura: 'saikkou', opciones: ['lo máximo', 'eyaculación', 'baño', 'absolutamente'], respuesta: 0 },
            { japones: '味見', lectura: 'ajimi', opciones: ['probar', 'involucrarse', 'inmediatamente', 'absolutamente'], respuesta: 0 },
            { japones: '済んだ', lectura: 'sunda', opciones: ['terminó', 'finish', 'desprecio', 'absolutamente'], respuesta: 0 },
            { japones: '次', lectura: 'tsugi', opciones: ['siguiente', 'finish', 'fácil de engañar', 'imposible'], respuesta: 0 },
            { japones: '悪態', lectura: 'akutai', opciones: ['malas palabras', 'hipnosis', 'fácil de engañar', 'respiración'], respuesta: 0 },
        ],

        // MAZO 4
        4: [
            { japones: 'ついてた', lectura: 'tsuiteta', opciones: ['estaba diciendo', 'molesto', 'usar hasta romper', 'desprecio'], respuesta: 0 },
            { japones: 'しっかり', lectura: 'shikkari', opciones: ['bien', 'baño', 'chúpamela ya" o "hazlo ya', 'siguiente'], respuesta: 0 },
            { japones: '気持ちよく', lectura: 'kimochi yoku', opciones: ['hacer sentir bien', 'eyaculación', 'follar a la fuerza', 'lo máximo'], respuesta: 0 },
            { japones: 'じょぶる', lectura: 'joburu', opciones: ['chupar', 'involucrarse', 'siguiente', 'baño'], respuesta: 0 },
        ],

    },

    // Sub-contenedor 1.12
    'sub1_12': {
        // MAZO 1
        1: [
            { japones: 'いいだろ', lectura: 'iidaro', opciones: ['¿está bien?', 'te gusta', 'has salpicado', 'sumisa'], respuesta: 0 },
            { japones: '俺の部屋', lectura: 'orenoheya', opciones: ['mi habitación', 'todavía no me satisface', 'nada más meterla un poco', 'no desobedecer'], respuesta: 0 },
            { japones: '可愛がって', lectura: 'kawaigatte', opciones: ['tratar con cariño', 'hembra', 'con una voz tan sucia', 'coño'], respuesta: 0 },
            { japones: 'ちょっと', lectura: 'chotto', opciones: ['un momento', 'de antes', 'resistiéndose', 'hermana mayor'], respuesta: 0 },
            { japones: 'その娘', lectura: 'sonomusume', opciones: ['esa chica', 'todavía no me satisface', '¿está bien?', 'chupito'], respuesta: 0 },
            { japones: '嫌がってる', lectura: 'iyagatteru', opciones: ['resistiéndose', 'te enseñaré', 'nada más meterla un poco', 'mi habitación'], respuesta: 0 },
            { japones: 'お前', lectura: 'omae', opciones: ['tú', 'vacío', 'mira, fíjate', 'demasiado fácil jajaja'], respuesta: 0 },
            { japones: 'さっさと', lectura: 'sassato', opciones: ['¡vamos!', 'tú', '¿quién es el dueño de ustedes?', 'de antes'], respuesta: 0 },
            { japones: '消えなさい', lectura: 'kienasai', opciones: ['desaparece', 'cerebro', 'valentía', 'no desobedecer'], respuesta: 0 },
            { japones: 'チョロすぎw', lectura: 'chorosugiw', opciones: ['demasiado fácil jajaja', 'resistiéndose', 'chupito', 'hembra'], respuesta: 0 },
        ],

        // MAZO 2
        2: [
            { japones: 'ハメたら', lectura: 'hametara', opciones: ['nada más meterla un poco', '¿quién es el dueño de ustedes?', 'desaparece', 'sumisa'], respuesta: 0 },
            { japones: '従順', lectura: 'juujun', opciones: ['sumisa', 'masoquista', 'hermana mayor', 'con una voz tan sucia'], respuesta: 0 },
            { japones: 'メス', lectura: 'mesu', opciones: ['hembra', 'coño', 'amo, dueño', '¡vamos!'], respuesta: 0 },
            { japones: 'バカ', lectura: 'baka', opciones: ['tonta', 'que te toquen', 'esa chica', 'de antes'], respuesta: 0 },
            { japones: 'まだ物足りねー', lectura: 'madamonotarinee', opciones: ['todavía no me satisface', '¡vamos!', 'que te toquen', 'esa chica'], respuesta: 0 },
            { japones: 'マンコ', lectura: 'manko', opciones: ['coño', 'nada más meterla un poco', 'te gusta', '¿quién es el dueño de ustedes?'], respuesta: 0 },
            { japones: 'チポップ', lectura: 'chipoppu', opciones: ['chupito', 'cerebro', 'de antes', 'te gusta'], respuesta: 0 },
            { japones: '誰がお前らの所有者', lectura: 'daregaomaeranoshoyuusha', opciones: ['¿quién es el dueño de ustedes?', 'todavía no me satisface', 'coño', 'un momento'], respuesta: 0 },
            { japones: 'スカスカ', lectura: 'sukasuka', opciones: ['vacío', '¿está bien?', 'no desobedecer', '¿quién es el dueño de ustedes?'], respuesta: 0 },
            { japones: '脳みそ', lectura: 'noumiso', opciones: ['cerebro', 'tratar con cariño', 'de antes', 'chupito'], respuesta: 0 },
        ],

        // MAZO 3
        3: [
            { japones: 'お姉ちゃん', lectura: 'oneechan', opciones: ['hermana mayor', 'cerebro', 'mira, fíjate', 'zorra, concha de pescado'], respuesta: 0 },
            { japones: 'イキ潮', lectura: 'ikishio', opciones: ['correrse, eyaculación femenina', 'vacío', 'esa chica', 'resistiéndose'], respuesta: 0 },
            { japones: 'ぶっかけてんじゃん', lectura: 'bukkaketenjan', opciones: ['has salpicado', 'desaparece', 'esa chica', '¿quién es el dueño de ustedes?'], respuesta: 0 },
            { japones: 'おとなしいてせ', lectura: 'otonashiitese', opciones: ['con una voz tan sucia', 'has salpicado', 'amo, dueño', '¿está bien?'], respuesta: 0 },
            { japones: 'マゾメス', lectura: 'mazomesu', opciones: ['masoquista', 'no desobedecer', 'chupito', 'esa chica'], respuesta: 0 },
            { japones: 'どうだ', lectura: 'douda', opciones: ['¿cómo te sientes?', 'tú', 'te enseñaré', 'amo, dueño'], respuesta: 0 },
            { japones: '雑魚マンコ', lectura: 'zatsugyomanko', opciones: ['zorra, concha de pescado', '¿está bien?', 'con una voz tan sucia', 'desaparece'], respuesta: 0 },
            { japones: 'ほじられる', lectura: 'hojirareru', opciones: ['que te toquen', 'mira, fíjate', 'masoquista', 'con una voz tan sucia'], respuesta: 0 },
            { japones: '好きし', lectura: 'sukishi', opciones: ['te gusta', 'desaparece', 'de antes', 'cerebro'], respuesta: 0 },
            { japones: 'オラッ', lectura: 'oratsu', opciones: ['mira, fíjate', 'nada más meterla un poco', 'coño', 'amo, dueño'], respuesta: 0 },
        ],

        // MAZO 4
        4: [
            { japones: 'さっきまでの', lectura: 'sakkimadeno', opciones: ['de antes', 'esa chica', 'que te toquen', 'masoquista'], respuesta: 0 },
            { japones: '威勢', lectura: 'isei', opciones: ['valentía', 'que te toquen', 'te enseñaré', 'te gusta'], respuesta: 0 },
            { japones: 'オス様', lectura: 'osusama', opciones: ['amo, dueño', 'mira, fíjate', 'te gusta', '¿cómo te sientes?'], respuesta: 0 },
            { japones: '逆らえない', lectura: 'sakaraenai', opciones: ['no desobedecer', 'esa chica', 'valentía', 'resistiéndose'], respuesta: 0 },
            { japones: '教え込んでやるよ', lectura: 'oshiekondeyaruyo', opciones: ['te enseñaré', 'mi habitación', 'masoquista', 'te gusta'], respuesta: 0 },
        ],

    },

    // Sub-contenedor 1.13
    'sub1_13': {
        // MAZO 1
        1: [
            { japones: '久しぶり風太郎♥', lectura: 'hisashiburifuutarou♥', opciones: ['Hace tiempo, Fūtarō', 'cada día, nuestro amo nos hace sufrir', 'y lo pasamos bien', 'le enviaremos'], respuesta: 0 },
            { japones: '私たちを寝取らせてから', lectura: 'watashitachiwonetorasetekara', opciones: ['desde que nos permitiste que te engañáramos', 'cada día, nuestro amo nos hace sufrir', 'Gracias, Fūtarō, eres un masoquista inútil', 'presentado a alguien tan maravilloso'], respuesta: 0 },
            { japones: '一か月経ったのかな', lectura: 'ichikagekkeittanokana', opciones: ['¿ha pasado un mes?', 'el señor Fū, que disfruta siendo engañado', 'Gracias, Fūtarō, te estoy agradecida', 'se alegrará cuando le enviemos el video más tarde'], respuesta: 0 },
            { japones: '風太郎には感謝してるよ♥', lectura: 'fuutarounihakanshashiteruyo♥', opciones: ['Gracias, Fūtarō, te estoy agradecida', '¿ha pasado un mes?', 'Gracias, Fūtarō, eres un masoquista inútil', 'Hace tiempo, Fūtarō'], respuesta: 0 },
            { japones: '私たち姉妹にこんな', lectura: 'watashitachishimainikonna', opciones: ['nosotras, las hermanas, nos has', 'se alegrará cuando le enviemos el video más tarde', 'desde que nos permitiste que te engañáramos', 'le enviaremos'], respuesta: 0 },
            { japones: '素晴らしい方を紹介してくれて▶', lectura: 'subarashiihouwoshoukaishitekurete▶', opciones: ['presentado a alguien tan maravilloso', '¿ha pasado un mes?', 'el señor Fū, que disfruta siendo engañado', 'Gracias, Fūtarō, eres un masoquista inútil'], respuesta: 0 },
            { japones: 'ありがとう♥雑魚マゾ風太郎▶', lectura: 'arigatou♥zatsugyomazofuutarou▶', opciones: ['Gracias, Fūtarō, eres un masoquista inútil', 'le enviaremos', 'Gracias, Fūtarō, te estoy agradecida', '¿ha pasado un mes?'], respuesta: 0 },
            { japones: '楽しく過ごしてるよ●', lectura: 'tanoshikusugoshiteruyo●', opciones: ['y lo pasamos bien', 'Gracias, Fūtarō, te estoy agradecida', 'Gracias, Fūtarō, eres un masoquista inútil', 'desde que nos permitiste que te engañáramos'], respuesta: 0 },
            { japones: '寝取られマゾのフー君が', lectura: 'netoraremazonofuukunga', opciones: ['el señor Fū, que disfruta siendo engañado', 'nosotras, las hermanas, nos has', 'Gracias, Fūtarō, te estoy agradecida', 'y lo pasamos bien'], respuesta: 0 },
            { japones: '喜べるように動画を後で', lectura: 'yorokoberuyounidougawoatode', opciones: ['se alegrará cuando le enviemos el video más tarde', 'nosotras, las hermanas, nos has', 'Gracias, Fūtarō, te estoy agradecida', 'presentado a alguien tan maravilloso'], respuesta: 0 },
        ],

        // MAZO 2
        2: [
            { japones: '送るね▶', lectura: 'okurune▶', opciones: ['le enviaremos', 'se alegrará cuando le enviemos el video más tarde', 'nosotras, las hermanas, nos has', 'Gracias, Fūtarō, eres un masoquista inútil'], respuesta: 0 },
            { japones: '毎日ご主人様にハメ漬られて', lectura: 'mainichigoshujinsamanihameshirarete', opciones: ['cada día, nuestro amo nos hace sufrir', 'nosotras, las hermanas, nos has', 'el señor Fū, que disfruta siendo engañado', '¿ha pasado un mes?'], respuesta: 0 },
        ],

    },

  
 

 
    

  
  

   // ================================================
    // CONTENEDOR 2 (sub2_1 a sub2_5)
    // ================================================

    'sub2_1': {
        1: [
            { japones: '小説', lectura: 'shousetsu', opciones: ['Novela', 'Poesía', 'Ensayo', 'Teatro'], respuesta: 0 },
            { japones: '現代の', lectura: 'gendai no', opciones: ['Contemporáneo/moderno', 'Antiguo', 'Futurista', 'Medieval'], respuesta: 0 },
            { japones: '正社員', lectura: 'seishain', opciones: ['Empleado fijo', 'Empleado temporal', 'Freelance', 'Desempleado'], respuesta: 0 },
            { japones: '通して', lectura: 'tooshite', opciones: ['A través de/por medio de', 'A pesar de', 'Debido a', 'Antes de'], respuesta: 0 },
            { japones: '疑問に思いました', lectura: 'gimon ni omoimashita', opciones: ['Me pregunté/tuve dudas', 'Estaba seguro', 'Me emocioné', 'Me asusté'], respuesta: 0 },
            { japones: '共感できる', lectura: 'kyoukan dekiru', opciones: ['Poder identificarse con', 'No entender', 'Discrepar', 'Ignorar'], respuesta: 0 },
            { japones: '扱っている', lectura: 'atsukatteiru', opciones: ['Tratando/manejando', 'Ignorando', 'Destruyendo', 'Creando'], respuesta: 0 },
            { japones: '挟まれ', lectura: 'hasamare', opciones: ['Estar atrapado entre', 'Ser liberado de', 'Elevarse por encima', 'Separarse de'], respuesta: 0 },
            { japones: '性夜', lectura: 'seiya', opciones: ['Noche sexual', 'Día de trabajo', 'Mañana tranquila', 'Tarde lluviosa'], respuesta: 0 },
            { japones: '様々な', lectura: 'samazama na', opciones: ['Varios/diversos', 'Único', 'Pocos', 'Similares'], respuesta: 0 }
        ],
        2: [
            { japones: '新刊', lectura: 'shinkan', opciones: ['Nueva publicación', 'Libro antiguo', 'Artículo usado', 'Borrador'], respuesta: 0 },
            { japones: 'かなり', lectura: 'kanari', opciones: ['Bastante / Muy', 'Un poco', 'Casi no', 'Absolutamente'], respuesta: 0 },
            { japones: '厳しい', lectura: 'kibishii', opciones: ['Estricto / Difícil / Ajustado', 'Fácil', 'Flexible', 'Generoso'], respuesta: 0 },
            { japones: '間に', lectura: 'mani', opciones: ['A tiempo', 'Tarde', 'Demasiado pronto', 'Fuera de plazo'], respuesta: 0 },
            { japones: '合わなかった', lectura: 'awanakatta', opciones: ['No llegó / No coincidió', 'Llegó perfecto', 'Se retrasó', 'Se canceló'], respuesta: 0 },
            { japones: '場合', lectura: 'baai', opciones: ['Caso / Situación', 'Excepción', 'Regla', 'Problema'], respuesta: 0 },
            { japones: 'マシ', lectura: 'mashi', opciones: ['Mejor (que nada)', 'Peor', 'Igual', 'Inaceptable'], respuesta: 0 },
            { japones: '現状', lectura: 'genjō', opciones: ['Situación actual', 'Situación pasada', 'Expectativas futuras', 'Plan ideal'], respuesta: 0 },
            { japones: 'お見せ', lectura: 'o mise', opciones: ['Mostrar (honorífico)', 'Esconder', 'Regalar', 'Vender'], respuesta: 0 },
            { japones: '準備本', lectura: 'junbi bon', opciones: ['Libro de preparación', 'Libro final', 'Libro de muestra', 'Libro digital'], respuesta: 0 }
        ],
        3: [
            { japones: '部数', lectura: 'busū', opciones: ['Número de copias', 'Número de páginas', 'Número de capítulos', 'Número de autores'], respuesta: 0 },
            { japones: '少なめ', lectura: 'sukuname', opciones: ['Pocas / En cantidad reducida', 'Abundante', 'Exacto', 'Limitado'], respuesta: 0 },
            { japones: '持っていきます', lectura: 'motte ikimasu', opciones: ['Llevaré / Iré llevando', 'Dejaré', 'Olvidaré', 'Enviaré'], respuesta: 0 },
            { japones: '完成', lectura: 'kansei', opciones: ['Completado / Terminado', 'Empezado', 'Cancelado', 'Pospuesto'], respuesta: 0 },
            { japones: '通販', lectura: 'tsūhan', opciones: ['Venta por correo / Online', 'Venta en tienda', 'Subasta', 'Alquiler'], respuesta: 0 },
            { japones: 'お求め', lectura: 'o motome', opciones: ['Buscar / Querer comprar (honorífico)', 'Regatear', 'Devolver', 'Reservar'], respuesta: 0 },
            { japones: 'そちら', lectura: 'sochira', opciones: ['Eso / Allí', 'Aquí / Esto', 'Más allá', 'En todas partes'], respuesta: 0 },
            { japones: 'ご利用', lectura: 'go riyō', opciones: ['Usar (honorífico)', 'Descartar', 'Compartir', 'Guardar'], respuesta: 0 }
        ],
        4: [
            { japones: 'モテモテ', lectura: 'motemote', opciones: ['Muy popular (con el sexo opuesto)', 'Impopular', 'Promedio', 'Famoso profesionalmente'], respuesta: 0 },
            { japones: '帰省', lectura: 'kisei', opciones: ['Regreso a casa (por vacaciones)', 'Viaje de negocios', 'Viaje al extranjero', 'Excursión'], respuesta: 0 },
            { japones: '更新', lectura: 'kōshin', opciones: ['Actualización', 'Cancelación', 'Suspensión', 'Creación inicial'], respuesta: 0 },
            { japones: '概念', lectura: 'gainen', opciones: ['Concepto', 'Detalle', 'Ejemplo', 'Realidad concreta'], respuesta: 0 },
            { japones: '会場', lectura: 'kaijō', opciones: ['Recinto / Lugar del evento', 'Oficina', 'Casa', 'Tienda'], respuesta: 0 },
            { japones: '頒布', lectura: 'hanpu', opciones: ['Distribución (especialmente doujinshi)', 'Venta minorista', 'Alquiler', 'Subasta'], respuesta: 0 },
            { japones: '脱稿', lectura: 'dakkō', opciones: ['Finalización del manuscrito', 'Comienzo del manuscrito', 'Corrección de pruebas', 'Publicación'], respuesta: 0 },
            { japones: '正月', lectura: 'shōgatsu', opciones: ['Año Nuevo japonés', 'Navidad', 'Verano', 'Otoño'], respuesta: 0 },
            { japones: '返上', lectura: 'henjō', opciones: ['Renunciar a / Sacrificar', 'Aceptar', 'Aumentar', 'Mantener'], respuesta: 0 },
            { japones: '報告', lectura: 'hōkoku', opciones: ['Reporte / Informe', 'Propuesta', 'Pregunta', 'Queja'], respuesta: 0 }
        ],
        5: [
            { japones: '表紙', lectura: 'hyōshi', opciones: ['Portada', 'Contraportada', 'Página interior', 'Sobrecubierta'], respuesta: 0 },
            { japones: '雰囲気', lectura: 'fun\'iki', opciones: ['Atmósfera / Ambiente', 'Estructura', 'Contenido', 'Precio'], respuesta: 0 },
            { japones: '人気', lectura: 'ninki', opciones: ['Popularidad', 'Odio', 'Indiferencia', 'Controversia'], respuesta: 0 },
            { japones: '締切', lectura: 'shimekiri', opciones: ['Fecha límite', 'Fecha de inicio', 'Fecha de publicación', 'Fecha de revisión'], respuesta: 0 },
            { japones: '同人誌', lectura: 'dōjinshi', opciones: ['Doujinshi (publicación amateur)', 'Revista comercial', 'Libro de texto', 'Periódico'], respuesta: 0 },
            { japones: '即売会', lectura: 'sokubaikai', opciones: ['Venta directa en evento', 'Venta online', 'Venta por catálogo', 'Subasta'], respuesta: 0 },
            { japones: '原稿', lectura: 'genkō', opciones: ['Manuscrito original', 'Copia impresa', 'Versión digital', 'Borrador'], respuesta: 0 },
            { japones: '出版社', lectura: 'shuppansha', opciones: ['Editorial', 'Librería', 'Biblioteca', 'Impresora'], respuesta: 0 },
            { japones: '読者', lectura: 'dokusha', opciones: ['Lector', 'Autor', 'Editor', 'Crítico'], respuesta: 0 },
            { japones: '評価', lectura: 'hyōka', opciones: ['Evaluación / Crítica', 'Venta', 'Producción', 'Distribución'], respuesta: 0 }
        ],
        6: [
            { japones: '校了', lectura: 'kōryō', opciones: ['Finalización de correcciones', 'Inicio de escritura', 'Primer borrador', 'Distribución'], respuesta: 0 },
            { japones: '初版', lectura: 'shohan', opciones: ['Primera edición', 'Reimpresión', 'Edición especial', 'Edición digital'], respuesta: 0 },
            { japones: '重版', lectura: 'jūhan', opciones: ['Reimpresión', 'Primera edición', 'Edición agotada', 'Cancelación'], respuesta: 0 },
            { japones: '帯', lectura: 'obi', opciones: ['Faja del libro', 'Portada', 'Lomo', 'Contraportada'], respuesta: 0 },
            { japones: '宣伝', lectura: 'senden', opciones: ['Publicidad / Promoción', 'Producción', 'Distribución', 'Venta'], respuesta: 0 },
            { japones: '印税', lectura: 'inzei', opciones: ['Regalías (del autor)', 'Salario fijo', 'Pago por proyecto', 'Donación'], respuesta: 0 },
            { japones: '文庫', lectura: 'bunko', opciones: ['Edición de bolsillo', 'Edición de lujo', 'Edición digital', 'Edición limitada'], respuesta: 0 },
            { japones: '新書', lectura: 'shinsho', opciones: ['Libro nuevo / Formato específico', 'Libro usado', 'Revista', 'Periódico'], respuesta: 0 },
            { japones: '単行本', lectura: 'tankōbon', opciones: ['Volumen individual', 'Serie completa', 'Revista', 'E-book'], respuesta: 0 },
            { japones: '書店', lectura: 'shoten', opciones: ['Librería', 'Biblioteca', 'Editorial', 'Imprenta'], respuesta: 0 }
        ],
        'D1': [],
        'D2': []
    },

    'sub2_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub2_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub2_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub2_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },

    // ================================================
    // CONTENEDOR 3 (sub3_1 a sub3_5)
    // ================================================

    'sub3_1': {
        1: [
            { japones: 'アビドス', lectura: 'Abidosu', opciones: ['Abydos', 'Otro lugar', 'Ficción', 'Universidad'], respuesta: 0 },
            { japones: '全員', lectura: 'zen\'in', opciones: ['todos / el grupo completo', 'algunos', 'ninguno', 'uno solo'], respuesta: 0 },
            { japones: '関係を持ってしまった', lectura: 'kankei o motte shimatta', opciones: ['terminó teniendo relaciones / se involucró íntimamente', 'evitó el contacto', 'solo habló', 'se separó'], respuesta: 0 },
            { japones: '見境なく', lectura: 'misekigenaku', opciones: ['sin distinción / indiscriminadamente', 'cuidadosamente', 'selectivamente', 'nunca'], respuesta: 0 },
            { japones: '全員と', lectura: 'zen\'in to', opciones: ['con todas', 'con algunas', 'con nadie', 'solo'], respuesta: 0 },
            { japones: 'もたない', lectura: 'motanai', opciones: ['no aguantará / no resistirá', 'aguantará', 'mejorará', 'empeorará'], respuesta: 0 },
            { japones: '対策委員会', lectura: 'taisaku iinkai', opciones: ['Comité de Contramedidas', 'Club de deportes', 'Grupo de estudio', 'Consejo escolar'], respuesta: 0 },
            { japones: '定例会', lectura: 'teireikai', opciones: ['reunión regular / junta periódica', 'reunión especial', 'evento único', 'fiesta'], respuesta: 0 },
            { japones: '委員', lectura: 'iin', opciones: ['miembro del comité', 'estudiante', 'profesor', 'visitante'], respuesta: 0 },
            { japones: '順番', lectura: 'junban', opciones: ['turno / orden', 'desorden', 'azar', 'simultáneo'], respuesta: 0 }
        ],
        2: [
            { japones: '週ごとに', lectura: 'shū goto ni', opciones: ['cada semana / por semanas', 'cada día', 'cada mes', 'una vez'], respuesta: 0 },
            { japones: '順番を決める', lectura: 'junban o kimeru', opciones: ['decidir el orden / establecer turnos', 'ignorar el orden', 'romper la secuencia', 'dejar al azar'], respuesta: 0 },
            { japones: '当番もかねて', lectura: 'tōban mo kanete', opciones: ['también cumpliendo como turno/de guardia', 'evitando el turno', 'ignorando la responsabilidad', 'dejando para después'], respuesta: 0 },
            { japones: '先生と過ごす', lectura: 'sensei to sugosu', opciones: ['pasar tiempo con el Sensei', 'evitar al Sensei', 'ignorar al Sensei', 'criticar al Sensei'], respuesta: 0 },
            { japones: 'ルールを作る', lectura: 'rūru o tsukuru', opciones: ['crear una regla', 'romper una regla', 'ignorar las reglas', 'seguir reglas'], respuesta: 0 },
            { japones: 'というわけで', lectura: 'to iu wake de', opciones: ['por lo tanto / así que', 'sin embargo', 'además', 'por ejemplo'], respuesta: 0 },
            { japones: '今週', lectura: 'konshū', opciones: ['esta semana', 'la semana pasada', 'la próxima semana', 'hoy'], respuesta: 0 },
            { japones: 'お手伝い', lectura: 'otetsudai', opciones: ['ayuda / colaborar', 'obstaculizar', 'ignorar', 'criticar'], respuesta: 0 },
            { japones: '精一杯', lectura: 'seiippai', opciones: ['al máximo / con todas mis fuerzas', 'mínimamente', 'normalmente', 'sin esfuerzo'], respuesta: 0 },
            { japones: '頑張っちゃいます', lectura: 'ganbacchaimasu', opciones: ['¡haré lo mejor que pueda! (forma cute)', 'no lo intentaré', 'me rendiré', 'lo pospondré'], respuesta: 0 }
        ],
        3: [
            { japones: '先週', lectura: 'senshū', opciones: ['la semana pasada', 'esta semana', 'la próxima semana', 'hoy'], respuesta: 0 },
            { japones: '当番だった', lectura: 'tōban datta', opciones: ['era la del turno / era la encargada', 'no tenía turno', 'era libre', 'estaba ausente'], respuesta: 0 },
            { japones: 'シロコ', lectura: 'Shiroko', opciones: ['Shiroko (nombre del personaje)', 'Ayane', 'Hoshino', 'Nonomi'], respuesta: 0 },
            { japones: '搾られて', lectura: 'shiborarete', opciones: ['ser exprimido / ser ordeñado / ser drenado (sentido sexual)', 'ser alimentado', 'ser ignorado', 'ser liberado'], respuesta: 0 },
            { japones: '精一杯', lectura: 'seiippai', opciones: ['con todas mis fuerzas / al máximo', 'mínimamente', 'sin esfuerzo', 'normalmente'], respuesta: 0 },
            { japones: '今回の', lectura: 'konkai no', opciones: ['de esta vez / para esta ocasión', 'de la última vez', 'del futuro', 'del pasado'], respuesta: 0 },
            { japones: '当番', lectura: 'tōban', opciones: ['turno / guardia / responsable del turno', 'vacaciones', 'descanso', 'ausencia'], respuesta: 0 },
            { japones: 'お預け', lectura: 'o-azuke', opciones: ['pospuesto / en espera / aplazado', 'inmediato', 'cancelado', 'olvidado'], respuesta: 0 },
            { japones: 'そのつもり', lectura: 'sono tsumori', opciones: ['con esa intención / planeando eso', 'sin planes', 'improvisando', 'evitando'], respuesta: 0 },
            { japones: '無理をさせたくは', lectura: 'muri o sasetaku wa', opciones: ['no quiero forzar / no quiero hacerle esforzar', 'quiero forzar', 'no me importa', 'es inevitable'], respuesta: 0 }
        ],
        4: [
            { japones: 'そういえば', lectura: 'sō ieba', opciones: ['por cierto / hablando de eso', 'sin relación', 'olvidando', 'ignorando'], respuesta: 0 },
            { japones: '以前', lectura: 'izen', opciones: ['antes / anteriormente', 'ahora', 'después', 'nunca'], respuesta: 0 },
            { japones: 'こんなもの', lectura: 'konna mono', opciones: ['algo como esto / esta cosa', 'nada', 'algo diferente', 'todo'], respuesta: 0 },
            { japones: '見つけた', lectura: 'mitsuketa', opciones: ['encontré', 'perdí', 'ignoré', 'escondí'], respuesta: 0 },
            { japones: '負担', lectura: 'futan', opciones: ['carga / esfuerzo / burden', 'alivio', 'ayuda', 'soporte'], respuesta: 0 },
            { japones: '少ない', lectura: 'sukunai', opciones: ['menor / poco', 'mucho', 'excesivo', 'suficiente'], respuesta: 0 },
            { japones: 'ポリネシアン', lectura: 'Porineshian', opciones: ['Polynesian / Polinesio', 'Europeo', 'Asiático', 'Africano'], respuesta: 0 },
            { japones: '難しく', lectura: 'muzukashiku', opciones: ['complicado / difícil', 'fácil', 'simple', 'aburrido'], respuesta: 0 },
            { japones: '考えずに', lectura: 'kangaesu ni', opciones: ['sin pensar', 'pensando mucho', 'considerando', 'analizando'], respuesta: 0 },
            { japones: '私達なりに', lectura: 'watashitachi nari ni', opciones: ['a nuestra manera / a nuestro estilo', 'a la manera de otros', 'sin método', 'igual que todos'], respuesta: 0 }
        ],
        5: [
            { japones: 'ゆるーく', lectura: 'yurūku', opciones: ['relajadamente / de forma loose (cute)', 'tensamente', 'estrictamente', 'rápidamente'], respuesta: 0 },
            { japones: '出来れば', lectura: 'dekireba', opciones: ['si pudiéramos hacerlo', 'si no pudiéramos', 'definitivamente', 'nunca'], respuesta: 0 },
            { japones: '5日間', lectura: 'itsuka-kan', opciones: ['durante 5 días', 'un día', 'una semana', 'un mes'], respuesta: 0 },
            { japones: 'かけて', lectura: 'kakete', opciones: ['tomando / durante (tiempo)', 'apresurando', 'terminando', 'comenzando'], respuesta: 0 },
            { japones: '感覚', lectura: 'kankaku', opciones: ['sensibilidad / sensación', 'insensibilidad', 'pensamiento', 'acción'], respuesta: 0 },
            { japones: 'を高めていく', lectura: 'o takamete iku', opciones: ['ir aumentando / ir elevando', 'ir disminuyendo', 'mantener', 'ignorar'], respuesta: 0 },
            { japones: 'セックス方法', lectura: 'sekkusu hōhō', opciones: ['método de sexo', 'método de estudio', 'método de trabajo', 'método de cocina'], respuesta: 0 },
            { japones: '手順', lectura: 'tejun', opciones: ['procedimiento / pasos / secuencia', 'desorden', 'azar', 'improvisación'], respuesta: 0 },
            { japones: '決まった', lectura: 'kimatta', opciones: ['decidido / fijo / establecido', 'indeciso', 'cambiante', 'improvisado'], respuesta: 0 },
            { japones: 'ゆるく', lectura: 'yuruku', opciones: ['relajadamente / de forma loose', 'tensamente', 'estrictamente', 'intensamente'], respuesta: 0 }
        ],
        6: [
            { japones: 'やってみよう', lectura: 'yatte miyō', opciones: ['probémoslo / intentémoslo', 'no lo intentemos', 'olvidémoslo', 'pospongámoslo'], respuesta: 0 },
            { japones: 'それでは', lectura: 'sore de wa', opciones: ['muy bien / entonces / bien pues', 'sin embargo', 'además', 'por ejemplo'], respuesta: 0 },
            { japones: '日間', lectura: 'nichi-kan', opciones: ['días (duración)', 'horas', 'semanas', 'meses'], respuesta: 0 },
            { japones: '性的な', lectura: 'seiteki na', opciones: ['sexual', 'platónico', 'familiar', 'amistoso'], respuesta: 0 },
            { japones: '接触', lectura: 'sesshoku', opciones: ['contacto / toque', 'separación', 'distancia', 'evitación'], respuesta: 0 },
            { japones: '禁止', lectura: 'kinshi', opciones: ['prohibido', 'permitido', 'recomendado', 'obligatorio'], respuesta: 0 },
            { japones: '裸で', lectura: 'hadaka de', opciones: ['desnudo', 'vestido', 'semi-vestido', 'disfrazado'], respuesta: 0 },
            { japones: '見つめ', lectura: 'mitsume', opciones: ['mirar fijamente', 'evitar la mirada', 'ignorar', 'observar brevemente'], respuesta: 0 },
            { japones: 'あったり', lectura: 'attari', opciones: ['uno al otro (forma enumerativa)', 'solo uno', 'ninguno', 'todos juntos'], respuesta: 0 },
            { japones: '抱き合う', lectura: 'dakiau', opciones: ['abrazarse mutuamente', 'separarse', 'ignorarse', 'pelearse'], respuesta: 0 }
        ],
        'D1': [],
        'D2': []
    },

    'sub3_2': {
        1: [
            { japones: '部活', lectura: 'bukatsu', opciones: ['Club de actividades extracurriculares', 'Clase principal', 'Tiempo libre', 'Reunión familiar'], respuesta: 0 },
            { japones: '余った', lectura: 'amatta', opciones: ['Sobró', 'Faltó', 'Se perdió', 'Se compró'], respuesta: 0 },
            { japones: '毎回', lectura: 'maikai', opciones: ['Cada vez', 'A veces', 'La primera vez', 'La última vez'], respuesta: 0 },
            { japones: '貰って', lectura: 'moratte', opciones: ['Recibiendo', 'Dando', 'Vendiendo', 'Buscando'], respuesta: 0 },
            { japones: '申し訳ない', lectura: 'mōshiwakenai', opciones: ['Lo siento / Inexcusable', 'Gracias', 'Hola', 'Adiós'], respuesta: 0 },
            { japones: '残念', lectura: 'zannen', opciones: ['Lamentable / Desafortunado', 'Feliz', 'Aburrido', 'Interesante'], respuesta: 0 },
            { japones: 'ながら', lectura: 'nagara', opciones: ['Aunque / Mientras', 'Después', 'Antes', 'Porque'], respuesta: 0 },
            { japones: 'お菓子', lectura: 'okashi', opciones: ['Dulces / Snacks', 'Comida principal', 'Bebidas', 'Fruta'], respuesta: 0 },
            { japones: '渡す', lectura: 'watasu', opciones: ['Entregar / Pasar', 'Recibir', 'Esconder', 'Romper'], respuesta: 0 },
            { japones: '口実', lectura: 'kōjitsu', opciones: ['Pretexto / Excusa', 'Verdad', 'Promesa', 'Secreto'], respuesta: 0 }
        ],
        2: [
            { japones: '週末', lectura: 'shūmatsu', opciones: ['Fin de semana', 'Día de semana', 'Mañana', 'Noche'], respuesta: 0 },
            { japones: '会い', lectura: 'ai', opciones: ['Encontrarse', 'Separarse', 'Ignorar', 'Esperar'], respuesta: 0 },
            { japones: 'ほぼ', lectura: 'hobo', opciones: ['Casi', 'Completamente', 'Apenas', 'Nunca'], respuesta: 0 },
            { japones: '邪魔', lectura: 'jama', opciones: ['Molestia / Estorbo', 'Ayuda', 'Bendición', 'Sorpresa'], respuesta: 0 },
            { japones: 'とんでもない', lectura: 'tondemonai', opciones: ['¡Ni hablar! / ¡De ninguna manera!', 'Por supuesto', 'Quizás', 'Lo siento'], respuesta: 0 },
            { japones: 'そろそろ', lectura: 'sorosoro', opciones: ['Poco a poco / Ya es hora', 'De repente', 'Más tarde', 'Nunca'], respuesta: 0 },
            { japones: 'お暇', lectura: 'o-hima', opciones: ['Retirarse (educado)', 'Llegar', 'Quedarse', 'Hablar'], respuesta: 0 },
            { japones: 'おいで', lectura: 'oide', opciones: ['Ven (imperativo educado)', 'Vete', 'Espera', 'Siéntate'], respuesta: 0 },
            { japones: 'オカズ', lectura: 'okazu', opciones: ['Acompañamiento (eufemismo erótico)', 'Comida principal', 'Postre', 'Bebida'], respuesta: 0 },
            { japones: 'なっちゃった', lectura: 'natchatta', opciones: ['Se convirtió en (lamentación)', 'Se evitó', 'Se planeó', 'Se olvidó'], respuesta: 0 }
        ],
        3: [
            { japones: '治らない', lectura: 'naoranai', opciones: ['No se cura', 'Se cura', 'Empeora', 'Mejora'], respuesta: 0 },
            { japones: '恋心', lectura: 'koigokoro', opciones: ['Sentimientos de amor', 'Odio', 'Indiferencia', 'Amistad'], respuesta: 0 },
            { japones: '発情期', lectura: 'hatsujōki', opciones: ['Período de celo / Heat', 'Período de calma', 'Enfermedad', 'Vacaciones'], respuesta: 0 },
            { japones: '段々と', lectura: 'dandan', opciones: ['Progresivamente', 'De repente', 'Rápidamente', 'Lentamente'], respuesta: 0 },
            { japones: '悪化', lectura: 'akka', opciones: ['Empeorar', 'Mejorar', 'Estancarse', 'Curarse'], respuesta: 0 },
            { japones: '面倒くさい', lectura: 'mendōkusai', opciones: ['Molesto / Fastidioso', 'Fácil', 'Divertido', 'Interesante'], respuesta: 0 },
            { japones: '状態', lectura: 'jōtai', opciones: ['Estado', 'Causa', 'Resultado', 'Solución'], respuesta: 0 },
            { japones: '会えない', lectura: 'aenai', opciones: ['No poder encontrarse', 'Poder encontrarse', 'Evitar', 'Buscar'], respuesta: 0 },
            { japones: '襲い', lectura: 'osoi', opciones: ['Atacar / Abalanzarse', 'Defender', 'Ignorar', 'Saludar'], respuesta: 0 },
            { japones: 'トリニティ', lectura: 'Toriniti', opciones: ['Trinity (nombre propio)', 'Unidad', 'Dualidad', 'Escuela'], respuesta: 0 }
        ],
        4: [
            { japones: '用事', lectura: 'yōji', opciones: ['Asunto / Recado', 'Ocio', 'Juego', 'Descanso'], respuesta: 0 },
            { japones: 'より', lectura: 'yori', opciones: ['Más que / En lugar de', 'Menos que', 'Igual que', 'Junto con'], respuesta: 0 },
            { japones: '体調', lectura: 'taichō', opciones: ['Condición física', 'Estado mental', 'Ropa', 'Comida'], respuesta: 0 },
            { japones: '悪そう', lectura: 'warusō', opciones: ['Parece malo', 'Parece bueno', 'Parece normal', 'Parece extraño'], respuesta: 0 },
            { japones: '盛り上がって', lectura: 'mori agatte', opciones: ['Intensificarse / Excitarse', 'Calmarse', 'Empezar', 'Terminar'], respuesta: 0 },
            { japones: '送って', lectura: 'okutte', opciones: ['Acompañar / Llevar', 'Dejar', 'Recoger', 'Esperar'], respuesta: 0 },
            { japones: '貰っちゃった', lectura: 'moratchatta', opciones: ['Recibir (lamentación casual)', 'Dar', 'Perder', 'Rechazar'], respuesta: 0 },
            { japones: '二人きり', lectura: 'futari kiri', opciones: ['A solas (dos personas)', 'En grupo', 'Solo', 'Con muchos'], respuesta: 0 },
            { japones: '倒し', lectura: 'taoshi', opciones: ['Derribar / Tirar', 'Levantar', 'Ayudar', 'Ignorar'], respuesta: 0 },
            { japones: '落ち着け', lectura: 'ochitsuke', opciones: ['Cálmate (imperativo)', 'Excítate', 'Corre', 'Duerme'], respuesta: 0 }
        ],
        5: [
            { japones: '追い討ち', lectura: 'oiuchi', opciones: ['Remate / Golpe final', 'Primer golpe', 'Ayuda', 'Defensa'], respuesta: 0 },
            { japones: '遠慮', lectura: 'enryo', opciones: ['Contención / Reserva', 'Descaro', 'Ataque', 'Confesión'], respuesta: 0 },
            { japones: '勢い', lectura: 'ikioi', opciones: ['Impulso / Momentum', 'Debilidad', 'Pausa', 'Calma'], respuesta: 0 },
            { japones: '凄い', lectura: 'sugoi', opciones: ['Increíble / Intenso', 'Débil', 'Aburrido', 'Normal'], respuesta: 0 },
            { japones: '頼ん', lectura: 'tanon', opciones: ['Pedir', 'Rechazar', 'Ofrecer', 'Ignorar'], respuesta: 0 },
            { japones: '弄り', lectura: 'ijiri', opciones: ['Toquetear / Jugar con', 'Respetar', 'Observar', 'Evitar'], respuesta: 0 },
            { japones: '勝手に', lectura: 'katte ni', opciones: ['Por mi cuenta / Arbitrariamente', 'Con permiso', 'Junto con otros', 'Nunca'], respuesta: 0 },
            { japones: '物欲しそう', lectura: 'monohoshisō', opciones: ['Parecer hambriento / Deseoso', 'Satisfecho', 'Indiferente', 'Enojado'], respuesta: 0 },
            { japones: '察し', lectura: 'sasshi', opciones: ['Intuición / Leer entre líneas', 'Ignorancia', 'Pregunta', 'Afirmación'], respuesta: 0 },
            { japones: '手慣れてる', lectura: 'tenareteru', opciones: ['Estar acostumbrado / Tener experiencia', 'Ser nuevo', 'Ser torpe', 'Ser joven'], respuesta: 0 }
        ],
        6: [
            { japones: '甘~い', lectura: 'amai~', opciones: ['Dulce / Suave (alargado)', 'Amargo', 'Salado', 'Picante'], respuesta: 0 },
            { japones: '低刺激', lectura: 'tei shigeki', opciones: ['Estímulo bajo / Suave', 'Estímulo fuerte', 'Sin estímulo', 'Estímulo doloroso'], respuesta: 0 },
            { japones: 'ガシマン', lectura: 'gashiman', opciones: ['Estímulo fuerte y directo', 'Caricia suave', 'Ignorar', 'Observar'], respuesta: 0 },
            { japones: '緩急', lectura: 'kankyū', opciones: ['Cambio de ritmo (suave-fuerte)', 'Ritmo constante', 'Solo rápido', 'Solo lento'], respuesta: 0 },
            { japones: 'アクメ', lectura: 'akume', opciones: ['Orgasmo / Clímax', 'Inicio', 'Pausa', 'Frustración'], respuesta: 0 },
            { japones: '誘い', lectura: 'sasoi', opciones: ['Provocar / Inducir', 'Rechazar', 'Ignorar', 'Temer'], respuesta: 0 },
            { japones: '潮', lectura: 'shio', opciones: ['Marea / Squirt', 'Sequía', 'Lluvia', 'Viento'], respuesta: 0 },
            { japones: 'お預け', lectura: 'oazuke', opciones: ['Suspenso / Dejar en espera', 'Permiso inmediato', 'Rechazo total', 'Sorpresa'], respuesta: 0 },
            { japones: '折角', lectura: 'sekka', opciones: ['Por fin / Con tanto esfuerzo', 'Fácilmente', 'Sin esfuerzo', 'Por accidente'], respuesta: 0 },
            { japones: '仕上がってる', lectura: 'shiagatteru', opciones: ['Estar perfectamente preparado/excitado', 'Estar crudo', 'Estar frío', 'Estar indiferente'], respuesta: 0 }
        ],
        'D1': [],
        'D2': []
    },

    'sub3_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub3_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub3_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },

    // ================================================
    // CONTENEDOR 4 (sub4_1 a sub4_5)
    // ================================================

    'sub4_1': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub4_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub4_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub4_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub4_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },

    // ================================================
    // CONTENEDOR 5 (sub5_1 a sub5_5)
    // ================================================

    'sub5_1': {
        1: [
            { japones: '今はちょうど', lectura: 'ima wa choudo', opciones: ['Justo ahora', 'Ya terminó', 'Hace mucho', 'Más tarde'], respuesta: 0 },
            { japones: '芸能', lectura: 'geinou', opciones: ['Entretenimiento', 'Deporte', 'Política', 'Academia'], respuesta: 0 },
            { japones: '活動', lectura: 'katsudou', opciones: ['Actividad', 'Descanso', 'Pausa', 'Inactividad'], respuesta: 0 },
            { japones: '時期', lectura: 'jikan', opciones: ['Período/Época', 'Lugar', 'Persona', 'Razón'], respuesta: 0 },
            { japones: 'せっかく 来れたのに', lectura: 'sekkaku korareta noni', opciones: ['Aunque vine con dificultad...', 'Porque fue fácil venir', 'Ya que no pude venir', 'Como no tenía planes'], respuesta: 0 },
            { japones: '水の泡', lectura: 'mizu no awa', opciones: ['En vano/Agua pasada', 'Gran éxito', 'Sorpresa', 'Ceremonia'], respuesta: 0 },
            { japones: 'そうなったら', lectura: 'sou nattara', opciones: ['Si eso sucede', 'Antes de que suceda', 'Aunque no suceda', 'Porque sucedió'], respuesta: 0 },
            { japones: 'すればいい', lectura: 'sureba ii', opciones: ['Deberías hacer (sugerencia)', 'No deberías hacer', 'Es imposible hacer', 'Es obligatorio hacer'], respuesta: 0 },
            { japones: '未来の明るい', lectura: 'mirai no akarui', opciones: ['Con un futuro brillante', 'Con un futuro oscuro', 'Sin futuro', 'Con un futuro incierto'], respuesta: 0 },
            { japones: '元女優が', lectura: 'moto joyuu ga', opciones: ['Una ex actriz', 'Una actriz principiante', 'Una actriz famosa', 'Una directora'], respuesta: 0 }
        ],
        2: [
            { japones: '引退になって', lectura: 'intai ni natte', opciones: ['Haberse retirado', 'Haberse unido', 'Haberse graduado', 'Haberse mudado'], respuesta: 0 },
            { japones: 'しまいに', lectura: 'shimai ni', opciones: ['Al final/ Finalmente', 'Al principio', 'De repente', 'Raramente'], respuesta: 0 },
            { japones: '業界', lectura: 'gyoukai', opciones: ['Industria/Rubio', 'País', 'Escuela', 'Familia'], respuesta: 0 },
            { japones: '華麗', lectura: 'karei', opciones: ['Elegante/Espléndido', 'Simple', 'Ordinario', 'Feo'], respuesta: 0 },
            { japones: 'これはいける', lectura: 'kore wa ikeru', opciones: ['Esto puede funcionar/Es prometedor', 'Esto es imposible', 'Esto es peligroso', 'Esto es aburrido'], respuesta: 0 },
            { japones: '初出演', lectura: 'hatsu shutsuen', opciones: ['Primera aparición', 'Última aparición', 'Aparición especial', 'Aparición casual'], respuesta: 0 },
            { japones: '元芸能人', lectura: 'moto geinoujin', opciones: ['Ex celebridad', 'Nueva celebridad', 'Periodista', 'Fan'], respuesta: 0 },
            { japones: '世にも珍しい', lectura: 'yo ni mo mezurashii', opciones: ['Extraño en el mundo/Inaudito', 'Muy común', 'Muy aburrido', 'Muy caro'], respuesta: 0 },
            { japones: '話題になる', lectura: 'wadai ni naru', opciones: ['Convertirse en tema de conversación', 'Ser olvidado', 'Ser criticado', 'Ser ignorado'], respuesta: 0 },
            { japones: '革命', lectura: 'kakumei', opciones: ['Revolución', 'Evolución', 'Tradición', 'Estancamiento'], respuesta: 0 }
        ],
        3: [
            { japones: '起こせる', lectura: 'okoseru', opciones: ['Poder causar/Lograr', 'Poder prevenir', 'Poder olvidar', 'Poder ignorar'], respuesta: 0 },
            { japones: '活躍さえ', lectura: 'katsuyaku sae', opciones: ['Incluso la actividad exitosa', 'Fracaso constante', 'Primer intento', 'Sin esfuerzo'], respuesta: 0 },
            { japones: '調理学校', lectura: 'chouri gakkou', opciones: ['Escuela de cocina', 'Escuela de arte', 'Escuela de negocios', 'Escuela de idiomas'], respuesta: 0 },
            { japones: 'きつい', lectura: 'kitsui', opciones: ['Difícil/Duro', 'Fácil', 'Relajado', 'Lento'], respuesta: 0 },
            { japones: '他の道を', lectura: 'hoka no michi wo', opciones: ['Otro camino', 'El mismo camino', 'Un atajo', 'Un callejón sin salida'], respuesta: 0 },
            { japones: '毎日', lectura: 'mainichi', opciones: ['Todos los días', 'Rara vez', 'A veces', 'Nunca'], respuesta: 0 },
            { japones: '試作', lectura: 'shisaku', opciones: ['Prototipo/Prueba de fabricación', 'Producto final', 'Venta', 'Consumo'], respuesta: 0 },
            { japones: 'お菓子', lectura: 'okashi', opciones: ['Dulces/Golosinas', 'Plato principal', 'Bebida', 'Sopa'], respuesta: 0 },
            { japones: 'お腹', lectura: 'onaka', opciones: ['Estómago', 'Cabeza', 'Mano', 'Corazón'], respuesta: 0 },
            { japones: '試食', lectura: 'shishoku', opciones: ['Degustación', 'Cocción', 'Compra', 'Desperdicio'], respuesta: 0 }
        ],
        4: [
            { japones: '将来', lectura: 'shourai', opciones: ['Futuro', 'Pasado', 'Presente', 'Ayer'], respuesta: 0 },
            { japones: '喫茶店', lectura: 'kissaten', opciones: ['Cafetería', 'Hospital', 'Tienda', 'Estación'], respuesta: 0 },
            { japones: '写真', lectura: 'shashin', opciones: ['Fotografía', 'Pintura', 'Escultura', 'Película'], respuesta: 0 },
            { japones: '写っている', lectura: 'utsu tte iru', opciones: ['Estar salido (en una foto)', 'Estar escondido', 'Estar borrado', 'Estar pintado'], respuesta: 0 },
            { japones: '報酬', lectura: 'houshuu', opciones: ['Recompensa/Pago', 'Castigo', 'Regalo', 'Deuda'], respuesta: 0 },
            { japones: '今後', lectura: 'kongo', opciones: ['De ahora en adelante', 'Hasta ahora', 'Recientemente', 'En el pasado lejano'], respuesta: 0 },
            { japones: '食レポ', lectura: 'shoku repo', opciones: ['Reportaje gastronómico', 'Reportaje deportivo', 'Reportaje político', 'Crítica literaria'], respuesta: 0 },
            { japones: '代わって', lectura: 'kawatte', opciones: ['En lugar de/Como sustituto', 'Junto con', 'En contra de', 'A pesar de'], respuesta: 0 },
            { japones: '真剣に', lectura: 'shinken ni', opciones: ['En serio', 'En broma', 'Despreocupadamente', 'Tristemente'], respuesta: 0 },
            { japones: '大食い系', lectura: 'oogui kei', opciones: ['Tipo comedor abundante', 'Tipo que come poco', 'Vegetariano', 'Gourmet'], respuesta: 0 }
        ],
        5: [
            { japones: '企画', lectura: 'kikaku', opciones: ['Plan/Proyecto', 'Accidente', 'Rutina', 'Error'], respuesta: 0 },
            { japones: 'いい加減', lectura: 'ii kagen', opciones: ['Ya basta/De una vez', 'Con cuidado', 'Por primera vez', 'Sin prisa'], respuesta: 0 },
            { japones: '傳説', lectura: 'densetsu', opciones: ['Leyenda', 'Historia real', 'Noticia', 'Chisme'], respuesta: 0 },
            { japones: 'もんかな', lectura: 'mon ka na', opciones: ['¿De verdad? (coloquial, duda)', '¡Claro que sí!', 'Absolutamente no', 'Tal vez'], respuesta: 0 },
            { japones: '今夜', lectura: 'kon\'ya', opciones: ['Esta noche', 'Esta mañana', 'Ayer', 'Mañana'], respuesta: 0 },
            { japones: '完璧', lectura: 'kanpeki', opciones: ['Perfección', 'Desastre', 'Normalidad', 'Mediocridad'], respuesta: 0 },
            { japones: '任務', lectura: 'ninmu', opciones: ['Misión/Tarea', 'Juego', 'Vacación', 'Sueño'], respuesta: 0 },
            { japones: '遂行', lectura: 'suikou', opciones: ['Cumplimiento', 'Abandono', 'Retraso', 'Planificación'], respuesta: 0 },
            { japones: '初体験と', lectura: 'hatsu taiken to', opciones: ['Con la primera experiencia', 'Con la última experiencia', 'Sin experiencia', 'Con mucha experiencia'], respuesta: 0 },
            { japones: 'いうことで', lectura: 'iu koto de', opciones: ['Así que... / Por lo tanto', 'Sin embargo', 'Además', 'Por ejemplo'], respuesta: 0 }
        ],
        6: [
            { japones: '最終日', lectura: 'saishuu bi', opciones: ['Día final', 'Primer día', 'Día festivo', 'Día ordinario'], respuesta: 0 },
            { japones: '両等分', lectura: 'ryoutou bun', opciones: ['División en dos partes iguales', 'División desigual', 'Unificación', 'Multiplicación'], respuesta: 0 }
        ],
        'D1': [],
        'D2': []
    },

    'sub5_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub5_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub5_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub5_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },

    // ================================================
    // CONTENEDOR 6 (sub6_1 a sub6_5)
    // ================================================

    'sub6_1': {
        1: [
            { japones: '公園', lectura: 'kōen', opciones: ['Parque', 'Escuela', 'Oficina', 'Estación'], respuesta: 0 },
            { japones: 'ヌイッチ2', lectura: 'nuicchi 2', opciones: ['Switch 2 :v', 'PlayStation', 'PC Gamer', 'Teléfono'], respuesta: 0 },
            { japones: '置きっぱ', lectura: 'oki ppa', opciones: ['Dejado olvidado', 'Bien guardado', 'Regalado', 'Comprado nuevo'], respuesta: 0 },
            { japones: 'だった', lectura: 'datta', opciones: ['Fue / Estaba', 'Es', 'Será', 'No fue'], respuesta: 0 },
            { japones: 'アンケート', lectura: 'ankēto', opciones: ['Encuesta', 'Examen', 'Entrevista', 'Cuestionario médico'], respuesta: 0 },
            { japones: '募集', lectura: 'boshū', opciones: ['Reclutando / Buscando participantes', 'Vendiendo', 'Regalando', 'Ocultando'], respuesta: 0 },
            { japones: 'してます', lectura: 'shitemasu', opciones: ['Estoy haciendo', 'No hago', 'Haré', 'Hice'], respuesta: 0 },
            { japones: 'よろしければ', lectura: 'yoroshikereba', opciones: ['Si te parece bien', 'Está prohibido', 'No quiero', 'Tal vez no'], respuesta: 0 },
            { japones: 'パンフレット', lectura: 'panfuretto', opciones: ['Folleto / Panfleto', 'Libro', 'Revista', 'Periódico'], respuesta: 0 },
            { japones: 'どうぞー', lectura: 'dōzo~', opciones: ['¡Toma! / ¡Adelante!', '¡Vete!', '¡Espera!', '¡Cuidado!'], respuesta: 0 }
        ],
        2: [
            { japones: '勧誘', lectura: 'kan\'yū', opciones: ['Promoción / Invitación', 'Rechazo', 'Ignorancia', 'Prohibición'], respuesta: 0 },
            { japones: ':', lectura: ':', opciones: ['Dos puntos (separador)', 'Punto y coma', 'Coma', 'Punto'], respuesta: 0 },
            { japones: 'アンケート', lectura: 'ankēto', opciones: ['Encuesta', 'Entrevista', 'Test', 'Formulario médico'], respuesta: 0 },
            { japones: '回答者', lectura: 'kaitōsha', opciones: ['Quien responde / Participante', 'Entrevistador', 'Organizador', 'Espectador'], respuesta: 0 },
            { japones: 'の', lectura: 'no', opciones: ['Partícula posesiva', 'Partícula de sujeto', 'Partícula de objeto', 'Partícula de dirección'], respuesta: 0 },
            { japones: '方', lectura: 'kata', opciones: ['Persona (educado)', 'Lugar', 'Tiempo', 'Razón'], respuesta: 0 },
            { japones: 'には', lectura: 'ni wa', opciones: ['Para / A', 'Desde', 'Con', 'Sin'], respuesta: 0 },
            { japones: 'お礼', lectura: 'orei', opciones: ['Agradecimiento / Regalo de gracias', 'Castigo', 'Crítica', 'Deuda'], respuesta: 0 },
            { japones: 'も', lectura: 'mo', opciones: ['También', 'Solo', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: 'させて', lectura: 'sasete', opciones: ['Haré que / Dejaré que', 'Prohibiré que', 'Evitaré que', 'Ignoraré'], respuesta: 0 }
        ],
        3: [
            { japones: 'ただきます', lectura: 'itadakimasu', opciones: ['Recibiré (forma humilde)', 'Daré', 'Prestaré', 'Venderé'], respuesta: 0 },
            { japones: 'ので', lectura: 'node', opciones: ['Porque / Así que', 'Aunque', 'Pero', 'Si'], respuesta: 0 },
            { japones: '是非', lectura: 'zehi', opciones: ['Por favor / Sin falta', 'Nunca', 'Tal vez', 'Rara vez'], respuesta: 0 },
            { japones: '下', lectura: 'shita', opciones: ['Abajo', 'Arriba', 'Derecha', 'Izquierda'], respuesta: 0 },
            { japones: 'か', lectura: 'ka', opciones: ['O (opción)', 'Y', 'Pero', 'Porque'], respuesta: 0 },
            { japones: '横', lectura: 'yoko', opciones: ['Al lado / Horizontal', 'Arriba', 'Centro', 'Diagonal'], respuesta: 0 },
            { japones: 'か', lectura: 'ka', opciones: ['O (opción)', 'Y', 'Pero', 'Porque'], respuesta: 0 },
            { japones: 'お選び', lectura: 'o-erabi', opciones: ['Elige (forma educada)', 'Rechaza', 'Ignora', 'Compra'], respuesta: 0 },
            { japones: 'ください', lectura: 'kudasai', opciones: ['Por favor (imperativo educado)', 'No', 'Gracias', 'Adiós'], respuesta: 0 },
            { japones: 'あのっ', lectura: 'ano tsu', opciones: ['Eh / Umm (nervioso)', 'Hola', 'Adiós', 'Gracias'], respuesta: 0 }
        ],
        4: [
            { japones: 'やっぱ', lectura: 'yappa', opciones: ['Al final / Después de todo', 'Al principio', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: '返します', lectura: 'kaeshimasu', opciones: ['Devuelvo', 'Presto', 'Vendo', 'Compro'], respuesta: 0 },
            { japones: 'っ', lectura: 'tsu', opciones: ['Énfasis (tensión o nervios)', 'Silencio', 'Risa', 'Grito'], respuesta: 0 },
            { japones: 'それでは', lectura: 'sore de wa', opciones: ['Entonces / Bien', 'Sin embargo', 'Además', 'Por ejemplo'], respuesta: 0 },
            { japones: '別室', lectura: 'besshitsu', opciones: ['Sala aparte / Privado', 'Baño', 'Cocina', 'Entrada'], respuesta: 0 },
            { japones: 'へ', lectura: 'e', opciones: ['Hacia (dirección)', 'Desde', 'En', 'Con'], respuesta: 0 },
            { japones: 'ご案内', lectura: 'go-annai', opciones: ['Guiar / Acompañar', 'Ignorar', 'Expulsar', 'Esperar'], respuesta: 0 },
            { japones: 'いたします', lectura: 'itashimasu', opciones: ['Haré (forma humilde)', 'No haré', 'Podría hacer', 'Debería hacer'], respuesta: 0 },
            { japones: 'その', lectura: 'sono', opciones: ['Ese', 'Este', 'Aquél', 'Mi'], respuesta: 0 },
            { japones: '必要', lectura: 'hitsuyō', opciones: ['Necesidad', 'Opción', 'Lujo', 'Accidente'], respuesta: 0 }
        ],
        5: [
            { japones: 'は', lectura: 'wa', opciones: ['Partícula de tema', 'Partícula de objeto', 'Partícula de dirección', 'Partícula posesiva'], respuesta: 0 },
            { japones: 'ございません', lectura: 'gozaimasen', opciones: ['No hay / No existe', 'Sí hay', 'Tal vez', 'Nunca'], respuesta: 0 },
            { japones: '怖がらず', lectura: 'kowagarazu', opciones: ['Sin tener miedo', 'Con miedo', 'Llorando', 'Gritando'], respuesta: 0 },
            { japones: 'とも', lectura: 'tomo', opciones: ['Aunque / Incluso si', 'Porque', 'Si', 'Cuando'], respuesta: 0 },
            { japones: '回答', lectura: 'kaitō', opciones: ['Respuesta / Contestar', 'Pregunta', 'Duda', 'Silencio'], respuesta: 0 },
            { japones: 'を', lectura: 'o', opciones: ['Partícula de objeto', 'Partícula de sujeto', 'Partícula de tema', 'Partícula de posesión'], respuesta: 0 },
            { japones: 'して', lectura: 'shite', opciones: ['Haciendo', 'No haciendo', 'Pensando', 'Viendo'], respuesta: 0 },
            { japones: 'いただければ', lectura: 'itadakereba', opciones: ['Si me haces el favor de', 'Si no me ayudas', 'Si me ignoras', 'Si me rechazas'], respuesta: 0 },
            { japones: 'お礼', lectura: 'orei', opciones: ['Regalo de agradecimiento', 'Castigo', 'Deuda', 'Multa'], respuesta: 0 },
            { japones: 'を', lectura: 'o', opciones: ['Partícula de objeto', 'Partícula de sujeto', 'Partícula de tema', 'Partícula de posesión'], respuesta: 0 }
        ],
        6: [
            { japones: 'すぐに', lectura: 'sugu ni', opciones: ['Inmediatamente', 'Después', 'Nunca', 'Lentamente'], respuesta: 0 },
            { japones: 'お渡しして', lectura: 'owatashi shite', opciones: ['Entregar (forma humilde)', 'Recibir', 'Esconder', 'Guardar'], respuesta: 0 },
            { japones: '終了', lectura: 'shūryō', opciones: ['Final / Terminación', 'Inicio', 'Pausa', 'Continuación'], respuesta: 0 },
            { japones: 'と', lectura: 'to', opciones: ['Que (citativa)', 'Y', 'Pero', 'Porque'], respuesta: 0 },
            { japones: 'なります', lectura: 'narimasu', opciones: ['Se convierte / Termina', 'Empieza', 'Cambia', 'Pausa'], respuesta: 0 },
            { japones: 'プロジェクト', lectura: 'purojekuto', opciones: ['Proyecto', 'Tarea', 'Trabajo', 'Misión'], respuesta: 0 },
            { japones: '「R・O」', lectura: 'R・O', opciones: ['“R・O” (acrónimo)', '“RO” (siglas)', '“R y O”', '“RO” (nombre)'], respuesta: 0 },
            { japones: 'アンケート', lectura: 'ankēto', opciones: ['Encuesta', 'Examen', 'Entrevista', 'Formulario'], respuesta: 0 },
            { japones: '参加', lectura: 'sanka', opciones: ['Participación', 'Ausencia', 'Rechazo', 'Ignorancia'], respuesta: 0 },
            { japones: 'していただき', lectura: 'shite itadaki', opciones: ['Por haber hecho (humilde)', 'Por no haber hecho', 'Por evitar', 'Por negar'], respuesta: 0 }
        ],
        'D1': [],
        'D2': []
    },

    'sub6_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub6_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub6_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub6_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },

    // ================================================
    // CONTENEDOR 7 (sub7_1 a sub7_5)
    // ================================================
    'sub7_1': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub7_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub7_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub7_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub7_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },

    // ================================================
    // CONTENEDOR 8 (sub8_1 a sub8_5)
    // ================================================
    'sub8_1': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub8_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub8_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub8_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub8_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },

    // ================================================
    // CONTENEDOR 9 (sub9_1 a sub9_5)
    // ================================================
    'sub9_1': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub9_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub9_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub9_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub9_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },

    // Sub-contenedor 9.6
    'sub9_6': {
        // MAZO 1
        1: [
            { japones: 'お近づきになりたい', lectura: 'ochikazuki ni naritai', opciones: ['querer acercarse o conocer mejor', 'novio', 'ese rostro', 'novia'], respuesta: 0 },
            { japones: '相手にされない', lectura: 'aite ni sarenai', opciones: ['no ser correspondido o ignorado', 'es mi objetivo', 'cuerpo', 'tipo carnívoro'], respuesta: 0 },
            { japones: '彼氏', lectura: 'kareshi', opciones: ['novio', '¡maldición!', 'quería', 'insípido'], respuesta: 0 },
            { japones: '一花ちゃん', lectura: 'ichika-chan', opciones: ['Ichika', 'insípido', 'tipo carnívoro', 'quería'], respuesta: 0 },
            { japones: '可愛すぎる', lectura: 'kawaisugiru', opciones: ['demasiado linda', 'chica', 'para ser honesto', 'solo busca sexo'], respuesta: 0 },
            { japones: '凶悪な', lectura: 'kyouaku na', opciones: ['feroz o impresionante', '¡imposible!', 'para ser honesto', 'insípido'], respuesta: 0 },
            { japones: 'ボディ', lectura: 'bodi', opciones: ['cuerpo', 'para ser honesto', '¡maldición!', 'demasiado linda'], respuesta: 0 },
            { japones: 'あの顔', lectura: 'ano kao', opciones: ['ese rostro', 'quería', 'insípido', 'no ser correspondido o ignorado'], respuesta: 0 },
            { japones: 'スキがなさすぎる', lectura: 'suki ga nasasugiru', opciones: ['demasiado perfecta o sin puntos débiles', 'con toda la intención', 'novio', '¡maldición!'], respuesta: 0 },
            { japones: 'まさか', lectura: 'masaka', opciones: ['¡imposible!', 'que me invitara', 'es mi objetivo', 'insípido'], respuesta: 0 },
        ],

        // MAZO 2
        2: [
            { japones: '街宮さん', lectura: 'Machimiya-san', opciones: ['Sra.', 'pechos enormes', 'novio', 'que me invitara'], respuesta: 0 },
            { japones: '誘ってくるとは', lectura: 'sasotte kuru to wa', opciones: ['que me invitara', 'chica', '¡maldición!', 'feroz o impresionante'], respuesta: 0 },
            { japones: '女の子', lectura: 'onna no ko', opciones: ['chica', 'tipo carnívoro', 'ese rostro', 'solo busca sexo'], respuesta: 0 },
            { japones: 'しまった', lectura: 'shimatta', opciones: ['¡maldición!', 'para ser honesto', 'novia', 'insípido'], respuesta: 0 },
            { japones: 'ホテル', lectura: 'hoteru', opciones: ['hotel', '¿se había descubierto?', 'Ichika', 'es mi objetivo'], respuesta: 0 },
            { japones: '気満々', lectura: 'ki manman', opciones: ['con toda la intención', 'novio', 'ese rostro', 'insípido'], respuesta: 0 },
            { japones: 'バレてたか', lectura: 'barete ta ka', opciones: ['¿se había descubierto?', 'Sra.', 'solo busca sexo', 'hacer match'], respuesta: 0 },
            { japones: '肉食系', lectura: 'nikushokukei', opciones: ['tipo carnívoro', 'Ichika', 'novio', 'demasiado linda'], respuesta: 0 },
            { japones: 'はっきり言って', lectura: 'hakkiri itte', opciones: ['para ser honesto', '¡imposible!', 'novio', 'feroz o impresionante'], respuesta: 0 },
            { japones: 'デカパイ', lectura: 'dekapai', opciones: ['pechos enormes', 'para ser honesto', '¡maldición!', 'hotel'], respuesta: 0 },
        ],

        // MAZO 3
        3: [
            { japones: '狙いだ', lectura: 'nerai da', opciones: ['es mi objetivo', 'chica', '¡maldición!', 'con toda la intención'], respuesta: 0 },
            { japones: 'ヤリモク', lectura: 'yarimoku', opciones: ['solo busca sexo', 'quería', 'ese rostro', 'Ichika'], respuesta: 0 },
            { japones: '味気なくて', lectura: 'ajikenakute', opciones: ['insípido', 'ese rostro', 'no ser correspondido o ignorado', 'querer acercarse o conocer mejor'], respuesta: 0 },
            { japones: '彼女', lectura: 'kanojo', opciones: ['novia', '¿se había descubierto?', 'que me invitara', 'con toda la intención'], respuesta: 0 },
            { japones: '欲しかった', lectura: 'hoshikatta', opciones: ['quería', 'querer acercarse o conocer mejor', 'que me invitara', 'chica'], respuesta: 0 },
            { japones: 'マッチする', lectura: 'matchi suru', opciones: ['hacer match', '¿se había descubierto?', 'tipo carnívoro', 'insípido'], respuesta: 0 },
        ],

    },

    // Sub-contenedor 9.7
    'sub9_7': {
        // MAZO 1
        1: [
            { japones: '成人向け', lectura: 'seijin muke', opciones: ['para adultos', 'se profundizó', 'molestias', 'salir juntos'], respuesta: 0 },
            { japones: '18歳未満の', lectura: 'jūhassai miman no', opciones: ['de menores de 18 años', 'difícil', 'para adultos', 'pensar'], respuesta: 0 },
            { japones: '購入・閲覧禁止', lectura: 'kōnyū etsuran kinshi', opciones: ['prohibida la compra y visualización', 'para adultos', 'sentimientos', 'difícil'], respuesta: 0 },
            { japones: 'いいんじゃ', lectura: 'ii n ja', opciones: ['¿no está bien?', 'relación', 'dos personas', 'difícil'], respuesta: 0 },
            { japones: 'ないかな', lectura: 'nai ka na', opciones: ['¿no será?', 'hombre y mujer', 'nosotros', 'difícil'], respuesta: 0 },
            { japones: 'どうかな', lectura: 'dou ka na', opciones: ['¿qué te parece?', 'aquel día', 'sin contratiempos', 'curso'], respuesta: 0 },
            { japones: 'この服', lectura: 'kono fuku', opciones: ['esta ropa', 'prohibida la compra y visualización', 'de menores de 18 años', 'gusto'], respuesta: 0 },
            { japones: '好み', lectura: 'konomi', opciones: ['gusto', 'relación', 'primera experiencia', '¿no está bien?'], respuesta: 0 },
            { japones: '山田', lectura: 'Yamada', opciones: ['Yamada', 'relación', '¿qué te parece?', '¿no está bien?'], respuesta: 0 },
            { japones: 'お前', lectura: 'omae', opciones: ['tú', 'gusto', 'esta ropa', 'salir juntos'], respuesta: 0 },
        ],

        // MAZO 2
        2: [
            { japones: '交際', lectura: 'kousai', opciones: ['relación sentimental', 'para adultos', '¿no está bien?', 'primera experiencia'], respuesta: 0 },
            { japones: 'ちょっかい', lectura: 'chokkai', opciones: ['molestias', 'se profundizó', 'de menores de 18 años', 'pensar'], respuesta: 0 },
            { japones: '厄介ごと', lectura: 'yakkaigoto', opciones: ['problemas', 'salir juntos', 'se profundizó', '¿qué te parece?'], respuesta: 0 },
            { japones: '大変', lectura: 'taihen', opciones: ['difícil', 'relación sentimental', 'se profundizó', 'primera experiencia'], respuesta: 0 },
            { japones: 'お互い', lectura: 'otagai', opciones: ['mutuamente', 'molestias', 'relación sentimental', 'Yamada'], respuesta: 0 },
            { japones: '初体験', lectura: 'hatsutaiken', opciones: ['primera experiencia', '¿qué te parece?', 'por qué', 'gusto'], respuesta: 0 },
            { japones: 'どうして', lectura: 'doushite', opciones: ['por qué', 'éxito', 'pensar', 'nosotros'], respuesta: 0 },
            { japones: '順調', lectura: 'junchou', opciones: ['sin contratiempos', 'difícil', 'problemas', 'sin problemas'], respuesta: 0 },
            { japones: '成功', lectura: 'seikou', opciones: ['éxito', 'gusto', '¿no será?', 'esta ropa'], respuesta: 0 },
            { japones: '俺達', lectura: 'oretachi', opciones: ['nosotros', 'relación sentimental', 'problemas', 'sin contratiempos'], respuesta: 0 },
        ],

        // MAZO 3
        3: [
            { japones: 'あの日', lectura: 'ano hi', opciones: ['aquel día', 'sentimientos', 'mutuamente', 'molestias'], respuesta: 0 },
            { japones: 'それから', lectura: 'sorekara', opciones: ['después de eso', 'nosotros', 'mutuamente', '¿no será?'], respuesta: 0 },
            { japones: '男女', lectura: 'danjo', opciones: ['hombre y mujer', 'Yamada', 'para adultos', 'tú'], respuesta: 0 },
            { japones: '気持ち', lectura: 'kimochi', opciones: ['sentimientos', 'gusto', 'nosotros', 'Yamada'], respuesta: 0 },
            { japones: '無事', lectura: 'buji', opciones: ['sin problemas', 'nosotros', 'después de eso', 'dos personas'], respuesta: 0 },
            { japones: '付き合う', lectura: 'tsukiau', opciones: ['salir juntos', 'molestias', 'éxito', 'hombre y mujer'], respuesta: 0 },
            { japones: '流れ', lectura: 'nagare', opciones: ['curso', 'para adultos', 'esta ropa', '¿no está bien?'], respuesta: 0 },
            { japones: '二人', lectura: 'futari', opciones: ['dos personas', 'mutuamente', 'pensar', 'hombre y mujer'], respuesta: 0 },
            { japones: '仲', lectura: 'naka', opciones: ['relación', 'sin contratiempos', 'difícil', 'aquel día'], respuesta: 0 },
            { japones: '更に', lectura: 'sarani', opciones: ['aún más', 'para adultos', 'curso', 'sin problemas'], respuesta: 0 },
        ],

        // MAZO 4
        4: [
            { japones: '深まった', lectura: 'fukamatta', opciones: ['se profundizó', 'gusto', 'éxito', 'dos personas'], respuesta: 0 },
            { japones: '思う', lectura: 'omou', opciones: ['pensar', 'molestias', 'hombre y mujer', 'Yamada'], respuesta: 0 },
        ],

    },

    // ================================================
    // CONTENEDOR 10 (sub10_1 a sub10_5)
    // ================================================
    'sub10_1': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub10_2': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub10_3': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub10_4': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] },
    'sub10_5': { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 'D1': [], 'D2': [] }
};

// ================================================
// FIN DE LA BASE DE DATOS COMPLETADA
// ================================================


// Función para obtener vocabulario (modificada para manejar mazos difíciles)
function obtenerVocabulario(contenedor, subcontenedor, mazo) {
    const key = `sub${contenedor}_${subcontenedor}`;
    
    // Si es un mazo difícil (comienza con 'D')
    if (typeof mazo === 'string' && mazo.startsWith('D')) {
        if (vocabularioDatabase[key] && vocabularioDatabase[key][mazo]) {
            return vocabularioDatabase[key][mazo];
        }
    }
    // Si es un mazo normal (número)
    else if (vocabularioDatabase[key] && vocabularioDatabase[key][mazo]) {
        return vocabularioDatabase[key][mazo];
    }
    
    return []; // Retorna array vacío si no existe
}

// Función especial para obtener solo mazos difíciles de un subcontenedor
function obtenerMazosDificilesSubcontenedor(contenedor, subcontenedor) {
    const key = `sub${contenedor}_${subcontenedor}`;
    const mazosDificiles = [];
    
    if (vocabularioDatabase[key]) {
        Object.keys(vocabularioDatabase[key]).forEach(mazoKey => {
            if (typeof mazoKey === 'string' && mazoKey.startsWith('D')) {
                mazosDificiles.push({
                    id: mazoKey,
                    nombre: `Mazo Difícil ${mazoKey.substring(1)}`,
                    palabras: vocabularioDatabase[key][mazoKey]
                });
            }
        });
    }
    
    return mazosDificiles;
}

// Función para verificar si existe vocabulario disponible
function verificarVocabularioDisponible(contenedor, subcontenedor, mazo) {
    const vocabulario = obtenerVocabulario(contenedor, subcontenedor, mazo);
    return vocabulario && vocabulario.length > 0;
}
