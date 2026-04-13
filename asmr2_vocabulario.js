// ================================================
// ASMR2 - VOCABULARIO (Mazos para cada Track)
// LOS MAZOS SE DETECTAN AUTOMÁTICAMENTE
// ================================================

const asmr2Vocabulario = {
    // ============ TRACK 1.1.1 (Presentación) ============
    "1_1_1": {
        1: [
            { japones: '開いてた', lectura: 'hiraiteta', opciones: ['Estaba abierto', 'Estaba cerrado', 'Estaba roto', 'Estaba sucio'], respuesta: 0 },
            { japones: 'ごめんください', lectura: 'gomen kudasai', opciones: ['¿Hay alguien? / Disculpe', 'Lo siento mucho', 'Buenos días', 'Gracias'], respuesta: 0 },
            { japones: '誰もいない', lectura: 'dare mo inai', opciones: ['No hay nadie', 'Hay alguien', 'Hay mucha gente', 'Está vacío'], respuesta: 0 },
            { japones: '今日', lectura: 'kyō', opciones: ['Hoy', 'Ayer', 'Mañana', 'Esta noche'], respuesta: 0 },
            { japones: '合ってる', lectura: 'atteru', opciones: ['Estar en lo cierto', 'Estar equivocado', 'Coincidir', 'Diferir'], respuesta: 0 },
            { japones: 'いた', lectura: 'ita', opciones: ['Estaba / Había', 'No estaba', 'Se fue', 'Vino'], respuesta: 0 },
            { japones: '久しぶり', lectura: 'hisashiburi', opciones: ['Después de mucho tiempo', 'Buenos días', 'Mucho gusto', 'Lo siento'], respuesta: 0 },
            { japones: '背', lectura: 'se', opciones: ['Estatura', 'Espalda', 'Cabeza', 'Cara'], respuesta: 0 },
            { japones: 'おっきくなった', lectura: 'okku natta', opciones: ['Creciste / Te hiciste grande', 'Te encogiste', 'Te debilitaste', 'Cambiaste'], respuesta: 0 },
            { japones: '成長期', lectura: 'seichōki', opciones: ['Período de crecimiento', 'Edad adulta', 'Infancia', 'Vejez'], respuesta: 0 }
        ],
        
        // MAZO 2 - Recuerdos (palabras 11-20)
        2: [
            { japones: '当たり前', lectura: 'atarimae', opciones: ['Obvio / Normal', 'Raro', 'Extraño', 'Diferente'], respuesta: 0 },
            { japones: 'いくつ', lectura: 'ikutsu', opciones: ['¿Cuántos años?', '¿Cuántos?', '¿Dónde?', '¿Cuándo?'], respuesta: 0 },
            { japones: 'そんなに', lectura: 'sonna ni', opciones: ['Tanto / Tan', 'Poco', 'Nada', 'Algo'], respuesta: 0 },
            { japones: '会ってなかった', lectura: 'attenakatta', opciones: ['No nos habíamos visto', 'Nos veíamos seguido', 'Nos encontramos', 'Nos separamos'], respuesta: 0 },
            { japones: '懐かしい', lectura: 'natsukashii', opciones: ['Nostálgico / Querido recuerdo', 'Nuevo', 'Aburrido', 'Triste'], respuesta: 0 },
            { japones: 'お母さん', lectura: 'okāsan', opciones: ['Mamá', 'Papá', 'Hermana', 'Abuela'], respuesta: 0 },
            { japones: '聞いてる', lectura: 'kiiteru', opciones: ['Escuchaste / Te enteraste', 'No escuchaste', 'Preguntaste', 'Dijiste'], respuesta: 0 },
            { japones: 'しばらく', lectura: 'shibaraku', opciones: ['Por un tiempo', 'Para siempre', 'Nunca', 'Rápidamente'], respuesta: 0 },
            { japones: '一緒に', lectura: 'issho ni', opciones: ['Juntos', 'Separados', 'Solo', 'Lejos'], respuesta: 0 },
            { japones: '暮らす', lectura: 'kurasu', opciones: ['Vivir / Pasar la vida', 'Trabajar', 'Estudiar', 'Viajar'], respuesta: 0 }
        ],
        
        // MAZO 3 - Cuidado y casa (palabras 21-30)
        3: [
            { japones: 'お父さん', lectura: 'otōsan', opciones: ['Papá', 'Mamá', 'Hermano', 'Abuelo'], respuesta: 0 },
            { japones: '法事', lectura: 'hōji', opciones: ['Ceremonia budista', 'Fiesta', 'Reunión familiar', 'Viaje'], respuesta: 0 },
            { japones: '帰ってくる', lectura: 'kaette kuru', opciones: ['Volver / Regresar', 'Irse', 'Salir', 'Quedarse'], respuesta: 0 },
            { japones: 'お世話', lectura: 'osewa', opciones: ['Cuidado / Ayuda', 'Molestia', 'Trabajo', 'Estudio'], respuesta: 0 },
            { japones: '頼まれた', lectura: 'tanomareta', opciones: ['Me pidieron / Me encargaron', 'Rechacé', 'Ignoré', 'Olvidé'], respuesta: 0 },
            { japones: 'よろしく', lectura: 'yoroshiku', opciones: ['Un placer / Cuento contigo', 'Adiós', 'Lo siento', 'Gracias'], respuesta: 0 },
            { japones: 'お邪魔します', lectura: 'ojama shimasu', opciones: ['Disculpe la molestia', 'Bienvenido', 'Adiós', 'Lo siento'], respuesta: 0 },
            { japones: 'おうち', lectura: 'ouchi', opciones: ['Casa (cariñoso)', 'Escuela', 'Trabajo', 'Parque'], respuesta: 0 },
            { japones: '床', lectura: 'yuka', opciones: ['Suelo', 'Techo', 'Pared', 'Ventana'], respuesta: 0 },
            { japones: '感触', lectura: 'kanshoku', opciones: ['Sensación / Tacto', 'Olor', 'Sonido', 'Sabor'], respuesta: 0 }
        ],
        
        // MAZO 4 - Comida y habitación (palabras 31-40)
        4: [
            { japones: 'ご飯', lectura: 'gohan', opciones: ['Comida / Arroz', 'Desayuno', 'Cena', 'Almuerzo'], respuesta: 0 },
            { japones: '作る', lectura: 'tsukuru', opciones: ['Hacer / Cocinar', 'Destruir', 'Comprar', 'Comer'], respuesta: 0 },
            { japones: '早すぎる', lectura: 'hayasugiru', opciones: ['Demasiado temprano', 'Demasiado tarde', 'Justo a tiempo', 'Nunca'], respuesta: 0 },
            { japones: 'とりあえず', lectura: 'toriaezu', opciones: ['Por ahora / De momento', 'Definitivamente', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: 'お部屋', lectura: 'oheya', opciones: ['Habitación (cariñoso)', 'Cocina', 'Baño', 'Sala'], respuesta: 0 },
            { japones: '勉強', lectura: 'benkyō', opciones: ['Estudiar', 'Trabajar', 'Jugar', 'Descansar'], respuesta: 0 },
            { japones: '教えて', lectura: 'oshiete', opciones: ['Enséñame', 'Aprende', 'Olvida', 'Ignora'], respuesta: 0 },
            { japones: '夏休み', lectura: 'natsuyasumi', opciones: ['Vacaciones de verano', 'Vacaciones de invierno', 'Fin de semana', 'Día festivo'], respuesta: 0 },
            { japones: '宿題', lectura: 'shukudai', opciones: ['Tarea', 'Examen', 'Proyecto', 'Trabajo'], respuesta: 0 },
            { japones: '大丈夫', lectura: 'daijōbu', opciones: ['Está bien / No hay problema', 'Está mal', 'Peligro', 'Cuidado'], respuesta: 0 }
        ],
        
        // MAZO 5 - Actividades y TV (palabras 41-50)
        5: [
            { japones: 'もう', lectura: 'mō', opciones: ['Ya / Más', 'Todavía', 'Nunca', 'Pronto'], respuesta: 0 },
            { japones: '勉強とか', lectura: 'benkyō toka', opciones: ['Estudiar o algo así', 'Trabajar', 'Jugar', 'Descansar'], respuesta: 0 },
            { japones: 'してない', lectura: 'shitenai', opciones: ['No he hecho', 'He hecho', 'Voy a hacer', 'Debo hacer'], respuesta: 0 },
            { japones: 'ここ最近', lectura: 'koko saikin', opciones: ['Últimamente / Recientemente', 'Hace mucho', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: '活動', lectura: 'katsudō', opciones: ['Actividad', 'Descanso', 'Pausa', 'Inactividad'], respuesta: 0 },
            { japones: '忙しかった', lectura: 'isogashikatta', opciones: ['Estuve ocupado', 'Estuve libre', 'Estuve aburrido', 'Estuve feliz'], respuesta: 0 },
            { japones: 'この前', lectura: 'kono mae', opciones: ['La otra vez / Hace poco', 'Hace mucho', 'Ahora', 'Después'], respuesta: 0 },
            { japones: 'テレビ', lectura: 'terebi', opciones: ['Televisión', 'Radio', 'Periódico', 'Revista'], respuesta: 0 },
            { japones: '出てる', lectura: 'deteru', opciones: ['Aparecer (en TV)', 'Salir', 'Entrar', 'Esconderse'], respuesta: 0 },
            { japones: '見た', lectura: 'mita', opciones: ['Vi', 'No vi', 'Miré', 'Observé'], respuesta: 0 }
        ],
        
        // MAZO 6 - Timidez y casa nueva (palabras 51-60)
        6: [
            { japones: 'ほんと', lectura: 'honto', opciones: ['De verdad', 'Mentira', 'Quizás', 'Nunca'], respuesta: 0 },
            { japones: '恥ずかしい', lectura: 'hazukashii', opciones: ['Vergonzoso', 'Orgulloso', 'Feliz', 'Triste'], respuesta: 0 },
            { japones: 'まだまだ', lectura: 'madamada', opciones: ['Todavía / Aún no', 'Ya', 'Suficiente', 'Demasiado'], respuesta: 0 },
            { japones: '全然', lectura: 'zenzen', opciones: ['Para nada / Completamente', 'Un poco', 'Bastante', 'Mucho'], respuesta: 0 },
            { japones: '大したこと', lectura: 'taishita koto', opciones: ['Algo importante / La gran cosa', 'Algo pequeño', 'Nada', 'Todo'], respuesta: 0 },
            { japones: '広い', lectura: 'hiroi', opciones: ['Ancho / Amplio', 'Estrecho', 'Pequeño', 'Corto'], respuesta: 0 },
            { japones: '田舎', lectura: 'inaka', opciones: ['Campo / Pueblo', 'Ciudad', 'Extranjero', 'Costa'], respuesta: 0 },
            { japones: 'のびのび', lectura: 'nobinobi', opciones: ['Libre / Despreocupado', 'Estresado', 'Ocupado', 'Triste'], respuesta: 0 },
            { japones: 'ちょうど', lectura: 'chōdo', opciones: ['Justo / Exactamente', 'Casi', 'Aproximadamente', 'Más o menos'], respuesta: 0 },
            { japones: '宿題してた', lectura: 'shukudai shiteta', opciones: ['Estaba haciendo la tarea', 'Terminé la tarea', 'No hice la tarea', 'Olvidé la tarea'], respuesta: 0 }
        ],
        
        // MAZO 7 - Elogios y estudio (palabras 61-70)
        7: [
            { japones: 'えらい', lectura: 'erai', opciones: ['Admirable / Excelente', 'Malo', 'Perezoso', 'Triste'], respuesta: 0 },
            { japones: 'どれどれ', lectura: 'dore dore', opciones: ['A ver / Déjame ver', 'No mires', 'Dónde', 'Cuál'], respuesta: 0 },
            { japones: '学年', lectura: 'gakunen', opciones: ['Grado escolar', 'Edad', 'Curso', 'Materia'], respuesta: 0 },
            { japones: 'くらい', lectura: 'kurai', opciones: ['Aproximadamente / Alrededor de', 'Exactamente', 'Más', 'Menos'], respuesta: 0 },
            { japones: 'やってんだ', lectura: 'yatten da', opciones: ['¿Qué estás haciendo?', 'No hago nada', 'Ya terminé', 'Estoy ocupado'], respuesta: 0 },
            { japones: 'なんとか', lectura: 'nantoka', opciones: ['De alguna manera', 'Definitivamente', 'Nada', 'Claramente'], respuesta: 0 },
            { japones: '問題', lectura: 'mondai', opciones: ['Problema / Pregunta', 'Solución', 'Respuesta', 'Ejemplo'], respuesta: 0 },
            { japones: 'わかんない', lectura: 'wakannai', opciones: ['No entiendo', 'Entiendo', 'Sé', 'Ignoro'], respuesta: 0 },
            { japones: 'さっそく', lectura: 'sassoku', opciones: ['De inmediato', 'Más tarde', 'Nunca', 'Despacio'], respuesta: 0 },
            { japones: '始めよっか', lectura: 'hajime yokka', opciones: ['¿Empezamos?', '¿Terminamos?', '¿Continuamos?', '¿Paramos?'], respuesta: 0 }
        ],
        
        // MAZO 8 - Materiales y matemáticas (palabras 71-80)
        8: [
            { japones: 'えんぴつ', lectura: 'enpitsu', opciones: ['Lápiz', 'Bolígrafo', 'Borrador', 'Cuaderno'], respuesta: 0 },
            { japones: 'ありがと', lectura: 'arigato', opciones: ['Gracias', 'De nada', 'Lo siento', 'Por favor'], respuesta: 0 },
            { japones: '待ってね', lectura: 'matte ne', opciones: ['Espera un momento', 'No esperes', 'Vamos', 'Date prisa'], respuesta: 0 },
            { japones: '思い出す', lectura: 'omoidasu', opciones: ['Recordar', 'Olvidar', 'Pensar', 'Imaginar'], respuesta: 0 },
            { japones: '手', lectura: 'te', opciones: ['Mano', 'Brazo', 'Dedo', 'Muñeca'], respuesta: 0 },
            { japones: '方程式', lectura: 'hōteishiki', opciones: ['Ecuación', 'Fórmula', 'Operación', 'Cálculo'], respuesta: 0 },
            { japones: '使える', lectura: 'tsukaeru', opciones: ['Poder usar', 'No poder usar', 'Querer usar', 'Debo usar'], respuesta: 0 },
            { japones: 'なるほど', lectura: 'naruhodo', opciones: ['Ya veo / Claro', 'No entiendo', 'Qué raro', 'Imposible'], respuesta: 0 },
            { japones: '置き換える', lectura: 'okikaeru', opciones: ['Reemplazar / Sustituir', 'Guardar', 'Cambiar', 'Mover'], respuesta: 0 },
            { japones: 'こんな感じ', lectura: 'konna kanji', opciones: ['Así / De esta forma', 'De otra forma', 'Cómo', 'Cuándo'], respuesta: 0 }
        ],
        
        // MAZO 9 - Resolución y explicación (palabras 81-90)
        9: [
            { japones: 'たぶん', lectura: 'tabun', opciones: ['Quizás / Probablemente', 'Seguro', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: '合ってる', lectura: 'atteru', opciones: ['Está correcto', 'Está equivocado', 'Está cerca', 'Está lejos'], respuesta: 0 },
            { japones: 'ふぅ', lectura: 'fū', opciones: ['Suspiro', 'Risa', 'Grito', 'Silencio'], respuesta: 0 },
            { japones: '思い出しながら', lectura: 'omoidashinagara', opciones: ['Mientras recuerdo', 'Después de recordar', 'Antes de recordar', 'Sin recordar'], respuesta: 0 },
            { japones: 'けっこう', lectura: 'kekkō', opciones: ['Bastante', 'Poco', 'Nada', 'Demasiado'], respuesta: 0 },
            { japones: '大変', lectura: 'taihen', opciones: ['Duro / Difícil', 'Fácil', 'Simple', 'Normal'], respuesta: 0 },
            { japones: '一問', lectura: 'ichimon', opciones: ['Una pregunta', 'Muchas preguntas', 'Todas las preguntas', 'Ninguna pregunta'], respuesta: 0 },
            { japones: '解いてみた', lectura: 'toite mita', opciones: ['Intenté resolver', 'No resolví', 'Terminé de resolver', 'Empecé a resolver'], respuesta: 0 },
            { japones: '説明', lectura: 'setsumei', opciones: ['Explicación', 'Pregunta', 'Respuesta', 'Duda'], respuesta: 0 },
            { japones: 'どしたの', lectura: 'doshita no', opciones: ['¿Qué pasó?', '¿Qué haces?', '¿Dónde vas?', '¿Cómo estás?'], respuesta: 0 }
        ],
        
        // MAZO 10 - Olor y cabello (palabras 91-100)
        10: [
            { japones: 'イイ匂い', lectura: 'ii nioi', opciones: ['Buen olor', 'Mal olor', 'Sin olor', 'Olor fuerte'], respuesta: 0 },
            { japones: 'する', lectura: 'suru', opciones: ['Hacer / Oler', 'No hacer', 'Ser', 'Estar'], respuesta: 0 },
            { japones: '髪の毛', lectura: 'kaminoke', opciones: ['Cabello', 'Piel', 'Ojos', 'Manos'], respuesta: 0 },
            { japones: '何言ってんの', lectura: 'nani itten no', opciones: ['¿Qué dices?', '¿Qué haces?', '¿Qué ves?', '¿Qué escuchas?'], respuesta: 0 },
            { japones: 'ちゃんと', lectura: 'chanto', opciones: ['Bien / Correctamente', 'Mal', 'A medias', 'Sin cuidado'], respuesta: 0 },
            { japones: '見てた', lectura: 'miteta', opciones: ['Estabas mirando', 'No mirabas', 'Miramos', 'Veremos'], respuesta: 0 },
            { japones: 'お姉ちゃん', lectura: 'oneechan', opciones: ['Hermana mayor', 'Hermana menor', 'Madre', 'Amiga'], respuesta: 0 },
            { japones: '見とれる', lectura: 'mitoreru', opciones: ['Quedar embelesado', 'Ignorar', 'Mirar rápido', 'Desviar la mirada'], respuesta: 0 },
            { japones: '怒ってない', lectura: 'okottenai', opciones: ['No estoy enojado', 'Estoy enojado', 'Estoy triste', 'Estoy feliz'], respuesta: 0 },
            { japones: 'ありがとね', lectura: 'arigato ne', opciones: ['Gracias (cariñoso)', 'De nada', 'Lo siento', 'Por favor'], respuesta: 0 }
        ],
        
        // MAZO 11 - Elogios y recuerdos (palabras 101-110)
        11: [
            { japones: '嬉しい', lectura: 'ureshii', opciones: ['Feliz / Alegre', 'Triste', 'Enojado', 'Aburrido'], respuesta: 0 },
            { japones: 'グラビア', lectura: 'gurabia', opciones: ['Gravure / Fotos', 'Actuación', 'Canto', 'Baile'], respuesta: 0 },
            { japones: 'やってから', lectura: 'yatte kara', opciones: ['Después de hacer', 'Antes de hacer', 'Mientras hago', 'Sin hacer'], respuesta: 0 },
            { japones: '色んな人', lectura: 'ironna hito', opciones: ['Mucha gente / Varias personas', 'Una persona', 'Nadie', 'Todos'], respuesta: 0 },
            { japones: '会って', lectura: 'atte', opciones: ['Conociendo / Encontrando', 'Separando', 'Ignorando', 'Evitando'], respuesta: 0 },
            { japones: '褒められる', lectura: 'homerareru', opciones: ['Ser elogiado', 'Ser criticado', 'Ser ignorado', 'Ser regañado'], respuesta: 0 },
            { japones: 'だんだん', lectura: 'dandan', opciones: ['Poco a poco', 'De repente', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: '増えた', lectura: 'fueta', opciones: ['Aumentó', 'Disminuyó', 'Se mantuvo', 'Desapareció'], respuesta: 0 },
            { japones: 'なんでもない', lectura: 'nandemo nai', opciones: ['No es nada', 'Es algo', 'Es importante', 'Es grave'], respuesta: 0 },
            { japones: 'そういえば', lectura: 'sō ieba', opciones: ['Hablando de eso / Por cierto', 'Por eso', 'Sin embargo', 'Además'], respuesta: 0 }
        ],
        
        // MAZO 12 - Recuerdos de infancia (palabras 111-120)
        12: [
            { japones: '覚えてる', lectura: 'oboeteru', opciones: ['Recordar', 'Olvidar', 'Saber', 'Ignorar'], respuesta: 0 },
            { japones: 'ずいぶん', lectura: 'zuibun', opciones: ['Bastante / Considerablemente', 'Poco', 'Nada', 'Justo'], respuesta: 0 },
            { japones: '昔', lectura: 'mukashi', opciones: ['Antiguamente / Hace tiempo', 'Ahora', 'Mañana', 'Pronto'], respuesta: 0 },
            { japones: 'よく', lectura: 'yoku', opciones: ['A menudo / Bien', 'Poco', 'Mal', 'Nunca'], respuesta: 0 },
            { japones: '来てた', lectura: 'kiteta', opciones: ['Venía / Solía venir', 'No venía', 'Iba', 'Se iba'], respuesta: 0 },
            { japones: '頃', lectura: 'koro', opciones: ['Época / Cuando', 'Lugar', 'Persona', 'Razón'], respuesta: 0 },
            { japones: '結婚', lectura: 'kekkon', opciones: ['Matrimonio / Casarse', 'Divorcio', 'Noviazgo', 'Amistad'], respuesta: 0 },
            { japones: 'する', lectura: 'suru', opciones: ['Hacer', 'No hacer', 'Ser', 'Estar'], respuesta: 0 },
            { japones: 'なんて', lectura: 'nante', opciones: ['Algo como... (cita)', 'Nada', 'Todo', 'Algo'], respuesta: 0 },
            { japones: '言ってた', lectura: 'itteta', opciones: ['Decías', 'No decías', 'Pensabas', 'Sabías'], respuesta: 0 }
        ],
        
        // MAZO 13 - Timidez y negación (palabras 121-130)
        13: [
            { japones: 'くすくす', lectura: 'kusukusu', opciones: ['Risa suave', 'Risa fuerte', 'Llanto', 'Suspiro'], respuesta: 0 },
            { japones: '恥ずかしがってる', lectura: 'hazukashigatteru', opciones: ['Está tímido', 'Está enojado', 'Está feliz', 'Está triste'], respuesta: 0 },
            { japones: '本当に', lectura: 'hontō ni', opciones: ['De verdad', 'Mentira', 'Quizás', 'Nunca'], respuesta: 0 },
            { japones: '覚えてない', lectura: 'oboetenai', opciones: ['No recuerdo', 'Recuerdo', 'Olvido', 'Sé'], respuesta: 0 },
            { japones: '残念', lectura: 'zannen', opciones: ['Lamentable / Qué pena', 'Qué bien', 'Qué suerte', 'Qué alegría'], respuesta: 0 },
            { japones: 'もし', lectura: 'moshi', opciones: ['Si', 'Cuando', 'Aunque', 'Porque'], respuesta: 0 },
            { japones: '今', lectura: 'ima', opciones: ['Ahora', 'Antes', 'Después', 'Nunca'], respuesta: 0 },
            { japones: '思ってくれてた', lectura: 'omotte kureteta', opciones: ['Pensabas así por mí', 'No pensabas', 'Olvidaste', 'Ignoraste'], respuesta: 0 },
            { japones: 'なら', lectura: 'nara', opciones: ['Si / En caso de', 'Porque', 'Aunque', 'Mientras'], respuesta: 0 },
            { japones: '私', lectura: 'watashi', opciones: ['Yo', 'Tú', 'Él', 'Ella'], respuesta: 0 }
        ],
        
        // MAZO 14 - Propuesta (palabras 131-140)
        14: [
            { japones: 'してもイイ', lectura: 'shite mo ii', opciones: ['Está bien hacer', 'No está bien hacer', 'Debo hacer', 'Evito hacer'], respuesta: 0 },
            { japones: 'かな', lectura: 'kana', opciones: ['Quizás / Tal vez', 'Seguro', 'Nunca', 'Siempre'], respuesta: 0 },
            { japones: 'なんて', lectura: 'nante', opciones: ['Pensé que...', 'Dije que...', 'Supe que...', 'Vi que...'], respuesta: 0 },
            { japones: '思ってた', lectura: 'omotteta', opciones: ['Pensaba / Creía', 'Sabía', 'Dudaba', 'Ignoraba'], respuesta: 0 },
            { japones: 'どうせ', lectura: 'dōse', opciones: ['De todos modos', 'Por casualidad', 'Especialmente', 'Raramente'], respuesta: 0 },
            { japones: '冗談', lectura: 'jōdan', opciones: ['Broma', 'Verdad', 'Mentira', 'Serio'], respuesta: 0 },
            { japones: 'でしょ', lectura: 'desho', opciones: ['¿Verdad? / ¿No?', 'Sí', 'No', 'Quizás'], respuesta: 0 },
            { japones: 'そう思う', lectura: 'sō omou', opciones: ['Pensar eso', 'No pensar eso', 'Dudar', 'Saber'], respuesta: 0 },
            { japones: 'どうしたの', lectura: 'dō shita no', opciones: ['¿Qué pasó?', '¿Qué haces?', '¿Dónde vas?', '¿Cómo estás?'], respuesta: 0 },
            { japones: 'もぞもぞ', lectura: 'mozomozo', opciones: ['Moverse inquieto', 'Estar quieto', 'Dormir', 'Correr'], respuesta: 0 }
        ],
        
        // MAZO 15 - Reacción física (palabras 141-150)
        15: [
            { japones: 'ズボン', lectura: 'zubon', opciones: ['Pantalón', 'Camisa', 'Chaqueta', 'Sombrero'], respuesta: 0 },
            { japones: '膨らんでる', lectura: 'fukuramderu', opciones: ['Está hinchado / Abultado', 'Está encogido', 'Está plano', 'Está vacío'], respuesta: 0 },
            { japones: 'どうしちゃった', lectura: 'dō shichatta', opciones: ['¿Qué te pasó?', '¿Qué hiciste?', '¿Qué viste?', '¿Qué oíste?'], respuesta: 0 },
            { japones: 'だいじょうぶ', lectura: 'daijōbu', opciones: ['Está bien', 'Está mal', 'Peligro', 'Cuidado'], respuesta: 0 },
            { japones: '隠さなくても', lectura: 'kakusanakute mo', opciones: ['Aunque no escondas', 'Si escondes', 'Porque escondes', 'Cuando escondes'], respuesta: 0 },
            { japones: '男の子', lectura: 'otokonoko', opciones: ['Niño / Chico', 'Hombre adulto', 'Anciano', 'Bebé'], respuesta: 0 },
            { japones: '自然', lectura: 'shizen', opciones: ['Natural', 'Forzado', 'Artificial', 'Extraño'], respuesta: 0 },
            { japones: 'こと', lectura: 'koto', opciones: ['Cosa / Asunto', 'Persona', 'Lugar', 'Tiempo'], respuesta: 0 },
            { japones: 'くっついてたら', lectura: 'kuttsuite tara', opciones: ['Si estamos pegados', 'Si nos separamos', 'Si nos alejamos', 'Si nos ignoramos'], respuesta: 0 },
            { japones: 'ムズムズ', lectura: 'muzumuzu', opciones: ['Cosquilleo / Picazón', 'Dolor', 'Frío', 'Calor'], respuesta: 0 }
        ],
        
        // MAZO 16 - Adultos (palabras 151-160)
        16: [
            { japones: '大人', lectura: 'otona', opciones: ['Adulto', 'Niño', 'Joven', 'Anciano'], respuesta: 0 },
            { japones: 'だって', lectura: 'datte', opciones: ['Porque / Pero', 'Y', 'Además', 'Sin embargo'], respuesta: 0 },
            { japones: 'そう', lectura: 'sō', opciones: ['Así / Eso', 'No', 'Quizás', 'Siempre'], respuesta: 0 },
            { japones: 'ほら', lectura: 'hora', opciones: ['Mira / Ves', 'No mires', 'Escucha', 'Calla'], respuesta: 0 },
            { japones: 'すごい', lectura: 'sugoi', opciones: ['Increíble', 'Normal', 'Aburrido', 'Feo'], respuesta: 0 },
            { japones: 'はぁはぁ', lectura: 'haa haa', opciones: ['Jadeo / Respiración agitada', 'Suspiro', 'Risa', 'Grito'], respuesta: 0 },
            { japones: 'かっちかち', lectura: 'katchikachi', opciones: ['Duro como piedra', 'Blando', 'Flexible', 'Suave'], respuesta: 0 },
            { japones: '順調', lectura: 'junchō', opciones: ['Sin problemas / Bien', 'Con dificultades', 'Mal', 'Lento'], respuesta: 0 },
            { japones: 'おっきくなってる', lectura: 'okku natteru', opciones: ['Se está haciendo grande', 'Se está encogiendo', 'Se mantiene igual', 'Desaparece'], respuesta: 0 },
            { japones: 'ココ', lectura: 'koko', opciones: ['Aquí (parte íntima)', 'Allí', 'Ahí', 'Acá'], respuesta: 0 }
        ],
        
        // MAZO 17 - Explicación (palabras 161-170)
        17: [
            { japones: 'ところで', lectura: 'tokoro de', opciones: ['Por cierto', 'Sin embargo', 'Además', 'Entonces'], respuesta: 0 },
            { japones: 'もし', lectura: 'moshi', opciones: ['Si', 'Cuando', 'Aunque', 'Porque'], respuesta: 0 },
            { japones: 'コレ', lectura: 'kore', opciones: ['Esto', 'Eso', 'Aquello', 'Nada'], respuesta: 0 },
            { japones: 'おちんちん', lectura: 'ochinchin', opciones: ['Pene (infantil)', 'Vagina', 'Pecho', 'Trasero'], respuesta: 0 },
            { japones: 'おっきくなっちゃったら', lectura: 'okku natchattara', opciones: ['Si se pone grande', 'Si se encoge', 'Si se mantiene', 'Si desaparece'], respuesta: 0 },
            { japones: 'れろぉん', lectura: 'rerōn', opciones: ['Onomatopeya de lamer', 'Sonido de besar', 'Sonido de chupar', 'Sonido de morder'], respuesta: 0 },
            { japones: 'ちゅぱぁ', lectura: 'chupā', opciones: ['Onomatopeya de chupar', 'Sonido de besar', 'Sonido de morder', 'Sonido de lamer'], respuesta: 0 },
            { japones: 'どうするのか', lectura: 'dō suru no ka', opciones: ['Qué hacer', 'Dónde ir', 'Cuándo ir', 'Por qué'], respuesta: 0 },
            { japones: '知ってる', lectura: 'shitteru', opciones: ['Saber / Conocer', 'No saber', 'Ignorar', 'Olvidar'], respuesta: 0 },
            { japones: 'そろそろ', lectura: 'sorosoro', opciones: ['Ya es hora / Poco a poco', 'De repente', 'Más tarde', 'Nunca'], respuesta: 0 }
        ],
        
        // MAZO 18 - Escuela y propuesta (palabras 171-180)
        18: [
            { japones: '学校', lectura: 'gakkō', opciones: ['Escuela', 'Trabajo', 'Casa', 'Parque'], respuesta: 0 },
            { japones: 'お勉強', lectura: 'obenkyō', opciones: ['Estudio (cariñoso)', 'Trabajo', 'Juego', 'Descanso'], respuesta: 0 },
            { japones: 'だけじゃなくて', lectura: 'dake janakute', opciones: ['No solo', 'Solo', 'Además', 'También'], respuesta: 0 },
            { japones: 'そういうこと', lectura: 'sō iu koto', opciones: ['Esa clase de cosas / Eso', 'Otra cosa', 'Algo diferente', 'Nada'], respuesta: 0 },
            { japones: '覚えたほうが', lectura: 'oboeta hō ga', opciones: ['Es mejor aprender', 'Es mejor olvidar', 'Es mejor ignorar', 'Es mejor saber'], respuesta: 0 },
            { japones: 'イイかも', lectura: 'ii kamo', opciones: ['Puede que sea bueno', 'Seguro que es malo', 'Definitivamente no', 'Quizás no'], respuesta: 0 },
            { japones: 'んふ', lectura: 'nfu', opciones: ['Gemido / Suspiro', 'Risa', 'Grito', 'Silencio'], respuesta: 0 },
            { japones: 'んッ', lectura: 'n', opciones: ['Sonido de afirmación', 'Negación', 'Duda', 'Sorpresa'], respuesta: 0 },
            { japones: 'お耳', lectura: 'omimi', opciones: ['Oído (cariñoso)', 'Ojo', 'Nariz', 'Boca'], respuesta: 0 },
            { japones: '熱くなってる', lectura: 'atsuku natteru', opciones: ['Se está calentando', 'Se está enfriando', 'Se mantiene tibio', 'Se congela'], respuesta: 0 }
        ],
        
        // MAZO 19 - Calor y firmeza (palabras 181-190)
        19: [
            { japones: '今日', lectura: 'kyō', opciones: ['Hoy', 'Ayer', 'Mañana', 'Esta noche'], respuesta: 0 },
            { japones: '暑い', lectura: 'atsui', opciones: ['Caluroso', 'Frío', 'Templado', 'Fresco'], respuesta: 0 },
            { japones: 'それだけじゃない', lectura: 'sore dake janai', opciones: ['No solo eso', 'Solo eso', 'Además', 'También'], respuesta: 0 },
            { japones: '熱い', lectura: 'atsui', opciones: ['Caliente', 'Frío', 'Tibio', 'Helado'], respuesta: 0 },
            { japones: 'どんどん', lectura: 'dondon', opciones: ['Cada vez más', 'De repente', 'Lentamente', 'Nunca'], respuesta: 0 },
            { japones: '固く', lectura: 'kataku', opciones: ['Duro', 'Blando', 'Suave', 'Flexible'], respuesta: 0 },
            { japones: 'なってってる', lectura: 'nattetteru', opciones: ['Se está volviendo', 'Deja de ser', 'Sigue igual', 'Desaparece'], respuesta: 0 },
            { japones: 'せっかく', lectura: 'sekkaku', opciones: ['Con tanto esfuerzo / Aprovechando', 'Por casualidad', 'Por suerte', 'Por desgracia'], respuesta: 0 },
            { japones: 'ここで', lectura: 'koko de', opciones: ['Aquí', 'Allí', 'Ahí', 'En otro lugar'], respuesta: 0 },
            { japones: '暮らす間', lectura: 'kurasu aida', opciones: ['Mientras vivamos', 'Cuando nos vayamos', 'Antes de vivir', 'Después de vivir'], respuesta: 0 }
        ],
        
        // MAZO 20 - Final (palabras 191-200)
        20: [
            { japones: 'お姉ちゃんと', lectura: 'oneechan to', opciones: ['Con la hermana mayor', 'Sin la hermana', 'Lejos de la hermana', 'Contra la hermana'], respuesta: 0 },
            { japones: 'してみよっか', lectura: 'shite miyokka', opciones: ['¿Lo intentamos?', 'No lo hagamos', 'Ya lo hicimos', 'Olvídalo'], respuesta: 0 },
            { japones: 'れろッ', lectura: 'rero', opciones: ['Onomatopeya de lamer', 'Sonido de besar', 'Sonido de chupar', 'Sonido de morder'], respuesta: 0 },
            { japones: 'じゅるッ', lectura: 'juru', opciones: ['Onomatopeya de succionar', 'Sonido de lamer', 'Sonido de besar', 'Sonido de morder'], respuesta: 0 },
            { japones: 'れろれろれろぉ', lectura: 'rerorerorero', opciones: ['Lamer repetidamente', 'Besar repetidamente', 'Chupar repetidamente', 'Morder repetidamente'], respuesta: 0 },
            { japones: 'はぁぁ', lectura: 'haa', opciones: ['Jadeo prolongado', 'Suspiro', 'Risa', 'Grito'], respuesta: 0 },
            { japones: 'れりゅ', lectura: 'reryu', opciones: ['Onomatopeya de lamer con lengua', 'Sonido de besar', 'Sonido de chupar', 'Sonido de morder'], respuesta: 0 },
            { japones: 'じゅるるるぅ', lectura: 'jurururu', opciones: ['Onomatopeya de succionar prolongada', 'Sonido de lamer', 'Sonido de besar', 'Sonido de morder'], respuesta: 0 },
            { japones: 'ちゅぱぁぁ', lectura: 'chupā', opciones: ['Onomatopeya de chupar fuerte', 'Sonido de besar', 'Sonido de morder', 'Sonido de lamer'], respuesta: 0 },
            { japones: 'ん', lectura: 'n', opciones: ['Sonido de afirmación / Gemido', 'Negación', 'Duda', 'Sorpresa'], respuesta: 0 }
        ]
    },
    
    // ============ TRACK 1.1.2 (Susurros) ============
    "1_1_2": {
        3: [
            { japones: '耳', lectura: 'mimi', opciones: ['Oído', 'Ojo', 'Nariz', 'Boca'], respuesta: 0 },
            { japones: '左', lectura: 'hidari', opciones: ['Izquierda', 'Derecha', 'Arriba', 'Abajo'], respuesta: 0 },
            { japones: '右', lectura: 'migi', opciones: ['Derecha', 'Izquierda', 'Centro', 'Lado'], respuesta: 0 },
            { japones: 'そっと', lectura: 'sotto', opciones: ['Suavemente', 'Fuerte', 'Rápido', 'Lento'], respuesta: 0 },
            { japones: '優しく', lectura: 'yasashiku', opciones: ['Suavemente', 'Brutalmente', 'Rápidamente', 'Fuerte'], respuesta: 0 },
            { japones: '心地よい', lectura: 'kokochiyoi', opciones: ['Agradable', 'Desagradable', 'Doloroso', 'Incómodo'], respuesta: 0 },
            { japones: 'リラックス', lectura: 'rirakkusu', opciones: ['Relajarse', 'Estresarse', 'Correr', 'Saltar'], respuesta: 0 },
            { japones: '眠い', lectura: 'nemui', opciones: ['Tener sueño', 'Estar despierto', 'Estar enérgico', 'Estar cansado'], respuesta: 0 },
            { japones: '閉じる', lectura: 'tojiru', opciones: ['Cerrar', 'Abrir', 'Mirar', 'Tocar'], respuesta: 0 },
            { japones: '目', lectura: 'me', opciones: ['Ojos', 'Oídos', 'Nariz', 'Boca'], respuesta: 0 }
        ],
        4: [
            { japones: '耳かき', lectura: 'mimikaki', opciones: ['Limpieza de oídos', 'Masaje de cabeza', 'Acariciar mejillas', 'Susurrar'], respuesta: 0 },
            { japones: '綿棒', lectura: 'menbō', opciones: ['Hisopo / Cotonete', 'Cepillo', 'Peine', 'Tijeras'], respuesta: 0 },
            { japones: 'くすぐったい', lectura: 'kusuguttai', opciones: ['Cosquilloso', 'Doloroso', 'Tranquilo', 'Aburrido'], respuesta: 0 },
            { japones: '気持ちいい', lectura: 'kimochi ii', opciones: ['Se siente bien', 'Duele', 'Es molesto', 'Es aburrido'], respuesta: 0 },
            { japones: '深く', lectura: 'fukaku', opciones: ['Profundamente', 'Superficialmente', 'Rápidamente', 'Lentamente'], respuesta: 0 },
            { japones: '優しい', lectura: 'yasashii', opciones: ['Amable', 'Cruel', 'Duro', 'Fuerte'], respuesta: 0 },
            { japones: '触れる', lectura: 'fureru', opciones: ['Tocar', 'Golpear', 'Empujar', 'Ignorar'], respuesta: 0 },
            { japones: '音', lectura: 'oto', opciones: ['Sonido', 'Silencio', 'Música', 'Ruido'], respuesta: 0 },
            { japones: '静か', lectura: 'shizuka', opciones: ['Tranquilo', 'Ruidoso', 'Rápido', 'Lento'], respuesta: 0 },
            { japones: '安らぐ', lectura: 'yasuraga', opciones: ['Calmarse', 'Preocuparse', 'Enojarse', 'Asustarse'], respuesta: 0 }
        ]
    },
    
    // ============ TRACK 1.1.3 (Limpieza de oídos) ============
    "1_1_3": {
        5: [
            { japones: '耳掃除', lectura: 'mimi sōji', opciones: ['Limpieza de oídos', 'Lavado de cara', 'Corte de pelo', 'Masaje'], respuesta: 0 },
            { japones: '竹', lectura: 'take', opciones: ['Bambú', 'Metal', 'Plástico', 'Madera'], respuesta: 0 },
            { japones: '優しい', lectura: 'yasashii', opciones: ['Suave', 'Fuerte', 'Rápido', 'Duro'], respuesta: 0 },
            { japones: '気持ちいい', lectura: 'kimochi ii', opciones: ['Se siente bien', 'Duele', 'Molesta', 'Aburre'], respuesta: 0 },
            { japones: '眠くなる', lectura: 'nemuku naru', opciones: ['Tener sueño', 'Despertarse', 'Energizarse', 'Estresarse'], respuesta: 0 }
        ],
        6: [
            { japones: '癒し', lectura: 'iyashi', opciones: ['Sanación', 'Dolor', 'Enfermedad', 'Estrés'], respuesta: 0 },
            { japones: 'リラックス', lectura: 'rirakkusu', opciones: ['Relajarse', 'Tensarse', 'Correr', 'Saltar'], respuesta: 0 },
            { japones: '安らぎ', lectura: 'yasura', opciones: ['Paz', 'Ansiedad', 'Miedo', 'Enojo'], respuesta: 0 },
            { japones: '心地よい', lectura: 'kokochiyoi', opciones: ['Agradable', 'Desagradable', 'Doloroso', 'Incómodo'], respuesta: 0 },
            { japones: '至福', lectura: 'shifuku', opciones: ['Felicidad suprema', 'Tristeza', 'Aburrimiento', 'Dolor'], respuesta: 0 }
        ]
    },
    
    // ============ TRACK 1.1.4 (Masaje) ============
    "1_1_4": {
        7: [
            { japones: 'マッサージ', lectura: 'massāji', opciones: ['Masaje', 'Golpe', 'Pellizco', 'Frotar'], respuesta: 0 },
            { japones: '肩', lectura: 'kata', opciones: ['Hombro', 'Espalda', 'Cuello', 'Brazo'], respuesta: 0 },
            { japones: '揉む', lectura: 'mommu', opciones: ['Amasar', 'Golpear', 'Estirar', 'Tirar'], respuesta: 0 },
            { japones: '疲れ', lectura: 'tsukare', opciones: ['Cansancio', 'Energía', 'Fuerza', 'Salud'], respuesta: 0 },
            { japones: '解消', lectura: 'kaishō', opciones: ['Aliviar', 'Aumentar', 'Empeorar', 'Ignorar'], respuesta: 0 }
        ]
    },
    
    // ============ TRACK 1.1.5 (Arropando) ============
    "1_1_5": {
        8: [
            { japones: '布団', lectura: 'futon', opciones: ['Futón', 'Cama', 'Almohada', 'Manta'], respuesta: 0 },
            { japones: 'おやすみ', lectura: 'oyasumi', opciones: ['Buenas noches', 'Buenos días', 'Hola', 'Adiós'], respuesta: 0 },
            { japones: '寝る', lectura: 'neru', opciones: ['Dormir', 'Despertar', 'Soñar', 'Descansar'], respuesta: 0 },
            { japones: '温かい', lectura: 'atatakai', opciones: ['Cálido', 'Frío', 'Tibio', 'Helado'], respuesta: 0 },
            { japones: '安心', lectura: 'anshin', opciones: ['Tranquilidad', 'Preocupación', 'Miedo', 'Enojo'], respuesta: 0 }
        ],
        9: [
            { japones: '子守唄', lectura: 'komoriuta', opciones: ['Canción de cuna', 'Canción triste', 'Canción alegre', 'Silencio'], respuesta: 0 },
            { japones: '優しい声', lectura: 'yasashii koe', opciones: ['Voz suave', 'Voz fuerte', 'Grito', 'Silencio'], respuesta: 0 },
            { japones: '眠り', lectura: 'nemuri', opciones: ['Sueño', 'Insomnio', 'Vigilia', 'Desvelo'], respuesta: 0 },
            { japones: '夢', lectura: 'yume', opciones: ['Sueño', 'Realidad', 'Pesadilla', 'Fantasía'], respuesta: 0 },
            { japones: 'おやすみなさい', lectura: 'oyasuminasai', opciones: ['Buenas noches', 'Buenos días', 'Hola', 'Adiós'], respuesta: 0 }
        ]
    },
    
    // ============ TRACK 1.1.6 (Acariciando cabello) ============
    "1_1_6": {
        10: [
            { japones: '髪', lectura: 'kami', opciones: ['Cabello', 'Piel', 'Ojos', 'Manos'], respuesta: 0 },
            { japones: '撫でる', lectura: 'naderu', opciones: ['Acariciar', 'Golpear', 'Tirar', 'Cortar'], respuesta: 0 },
            { japones: '優しい', lectura: 'yasashii', opciones: ['Suave', 'Duro', 'Rápido', 'Fuerte'], respuesta: 0 },
            { japones: 'リラックス', lectura: 'rirakkusu', opciones: ['Relajarse', 'Tensarse', 'Estresarse', 'Enojarse'], respuesta: 0 },
            { japones: '幸せ', lectura: 'shiawase', opciones: ['Felicidad', 'Tristeza', 'Enojo', 'Miedo'], respuesta: 0 }
        ]
    }
    "1_1_7": {
        // Mazos aquí
    },
};

console.log('✅ ASMR2 - Vocabulario cargado');
console.log('📚 Tracks con vocabulario:', Object.keys(asmr2Vocabulario).length);
