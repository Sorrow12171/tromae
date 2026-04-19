# QuintiCulonas 🔥

Una aplicación web interactiva para practicar y mejorar habilidades en múltiples idiomas con contenido variado y sistemas de aprendizaje gamificados.

## 📋 Descripción

QuintiCulonas es una plataforma educativa que combina el aprendizaje de idiomas con entretenimiento. Ofrece diversas herramientas de práctica incluyendo:

- **Manga/Doujinshi**: Lectura y aprendizaje con cómics japoneses
- **Videos**: Contenido en video con timestamps interactivos
- **Galería**: Colección de imágenes organizadas
- **Vocabulario**: Sistemas de práctica de vocabulario en múltiples idiomas
- **RPG**: Elementos de juego de rol para aprendizaje gamificado
- **Eventos Diarios**: Misiones y actividades diarias
- **Sistema SRS**: Repetición espaciada para memorización efectiva

## 🌍 Idiomas Soportados

- Japonés (incluyendo alfabeto)
- Coreano (incluyendo alfabeto Hangul)
- Portugués (incluyendo alfabeto)
- Ruso (incluyendo alfabeto Cirílico)
- Español

## 🚀 Características Principales

### Sistema de Navegación
- Interfaz intuitiva con tarjetas interactivas
- Botón de inicio accesible desde cualquier sección
- Navegación fluida entre diferentes modos de aprendizaje

### Modos de Aprendizaje
1. **Manga**: Exploración de doujinshi y cómics
2. **Videos**: Biblioteca de videos con navegación por timestamps
3. **Imágenes**: Galerías organizadas temáticamente
4. **Vocabulario**: Práctica de palabras y frases
5. **Audio**: Ejercicios de comprensión auditiva
6. **ASMR**: Contenido relajante para práctica
7. **RPG**: Aventuras interactivas de aprendizaje
8. **Misiones**: Eventos diarios y desafíos
9. **Fantasía**: Escenarios imaginativos para práctica
10. **SRS**: Sistema de repetición espaciada

### Sistema de Progreso
- Guardado automático del progreso en Supabase
- Seguimiento de aciertos y errores
- Mazos de palabras difíciles
- Estadísticas de aprendizaje

## 📁 Estructura del Proyecto

```
/workspace
├── index.html                 # Página principal
├── 1_style.css               # Estilos principales
├── 1_main.js                 # Lógica principal y navegación
├── 1_vocabulario.js          # Sistema de vocabulario
├── 1_videos.js               # Sistema de videos
├── 1_imagenes.js             # Galería de imágenes
├── 1_audios.js               # Sistema de audio
├── 1_asmr.js                 # Contenido ASMR
├── 1_animes.js               # Sección de animes
├── 1_rpg.js                  # Juego RPG educativo
├── 1_eventos_diarios.js      # Eventos y misiones diarias
├── 1_sistemas.js             # Sistemas auxiliares
├── coreano.js                # Módulo de coreano
├── portugues.js              # Módulo de portugués
├── ruso.js                   # Módulo de ruso
├── fantasia.js               # Modo fantasía
├── lectormanga.js            # Lector de manga
├── personajes_y_dialogos.js  # Sistema de personajes
├── galeria/                  # Directorio de imágenes
└── README.md                 # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con gradientes y animaciones
- **JavaScript (ES6+)**: Lógica de la aplicación
- **Supabase**: Backend para almacenamiento de progreso
- **Fetch API**: Comunicación asíncrona

## 💻 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para recursos externos y Supabase)

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Abrir el archivo `index.html` en un navegador web:
```bash
# Opción 1: Abrir directamente
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows

# Opción 2: Usar un servidor local (recomendado)
python -m http.server 8000
# Luego navegar a http://localhost:8000
```

## 🎮 Cómo Jugar

1. **Inicio**: Al abrir la aplicación, verás una pantalla con tarjetas representando diferentes modos
2. **Seleccionar Modo**: Haz clic en cualquier tarjeta para entrar en ese modo de aprendizaje
3. **Practicar**: Sigue las instrucciones en pantalla para cada actividad
4. **Progreso**: Tu progreso se guarda automáticamente en la nube
5. **Misiones Diarias**: Completa eventos diarios para ganar recompensas

## 🔧 Configuración

### Variables de Entorno (Supabase)

El proyecto utiliza Supabase para el almacenamiento de datos. Las credenciales están configuradas en `1_main.js`:

- `_SB_URL`: URL de tu instancia de Supabase
- `_SB_KEY`: Clave API pública
- `_SB_USER`: Identificador de usuario

Para usar tu propia instancia de Supabase, modifica estas variables en el archivo `1_main.js`.

### Esquema de Base de Datos

La tabla `progreso` en Supabase debe tener la siguiente estructura:
- `user_id` (text): Identificador del usuario
- `clave` (text): Clave del dato guardado
- `valor` (text): Valor almacenado (JSON stringified)
- `actualizado_en` (timestamp): Fecha de última actualización

## 📝 Archivos Principales

### Módulos de Idiomas
- `coreano.js`, `coreano_quintillizas.js`: Módulos de aprendizaje de coreano
- `portugues.js`: Módulo de aprendizaje de portugués
- `ruso.js`: Módulo de aprendizaje de ruso

### Sistemas de Personajes
- `personajes_y_dialogos.js`: Sistema de diálogos y personajes
- `personajes_externos.js`: Personajes adicionales
- `quintillizas.js`: Sistema principal de chatbot con IA para las Quintillizas Nakano
- `quint_nuevas_funciones.js`: Funciones extendidas del sistema de chatbot
- `quint_prompts.js`: Prompts del sistema, configuración de IA y patrones de respuesta
- `quint_historias_escenarios.js`: Escenarios e historias para el chatbot

### Sistemas Especializados
- `SistemaHoraDelDia.js`: Sistema de hora del día
- `SistemaMensajesCelular.js`: Sistema de chatbot secundario para mensajes/llamadas celulares
- `eventos_aleatorios.js`: Eventos aleatorios del juego
- `locaciones.js`: Sistema de locaciones

## 🤖 Sistema de Chatbot con IA - Documentación Completa

El proyecto incluye un avanzado sistema de chatbot impulsado por inteligencia artificial que permite interactuar con las Quintillizas Nakano mediante conversaciones naturales. Este sistema está compuesto por **9 archivos JavaScript** que trabajan en conjunto para crear una experiencia inmersiva.

### 📂 Todos los Archivos del Sistema de Chatbot

#### 1. **`quintillizas.js`** - Motor Principal del Chatbot
- **Función**: Núcleo del sistema de conversación con IA
- **Características principales**:
  - Integración con Groq API usando modelo Llama-4 Scout
  - Sistema de historial con ventana deslizante (máx 16 mensajes, mantiene 6 recientes)
  - Resúmenes automáticos de conversaciones largas
  - Extracción de hechos clave para memoria persistente
  - Detección y manejo de rechazos del modelo con 24 patrones regex
  - Reintentos inteligentes en 4 fases progresivas
  - Soporte multi-personaje (conversaciones con varias quintillizas)
  - Integración con sistema de imágenes según acciones del personaje
  - Validación estricta de respuestas JSON

#### 2. **`SistemaMensajesCelular.js`** - Chatbot de Mensajes y Llamadas
- **Función**: Simula comunicaciones espontáneas vía celular
- **Características principales**:
  - Activación aleatoria (35% probabilidad tras 15-30 mensajes)
  - Generación automática de diálogos personalizados por personaje
  - Dos modos: llamada de voz o mensaje de texto
  - Reacciones de la chica actual ante interrupciones telefónicas
  - Frases de entrada únicas para cada una de las 5 quintillizas
  - Sistema de seguimiento de última interacción por personaje
  - Temporizadores para próximas llamadas/mensajes

#### 3. **`quint_prompts.js`** - Configuración de Prompts y System Messages
- **Función**: Define todos los prompts del sistema de IA
- **Contenido**:
  - Configuration object con umbrales del sistema
  - System prompts base para cada personaje (Ichika, Nino, Miku, Yotsuba, Itsuki)
  - Prompts de reintento en 4 fases (Fase 1-4) para recuperación de errores
  - 24 patrones regex para detección de rechazos del modelo
  - Prompts especializados para:
    - Resumen de conversación
    - Extracción de hechos clave
    - Continuación de conversación truncada
  - Templates de estructura JSON esperada

#### 4. **`quint_nuevas_funciones.js`** - Funciones Extendidas y Utilidades
- **Función**: Extiende capacidades del chatbot principal
- **Características**:
  - Funciones auxiliares para manejo de estado
  - Utilidades para procesamiento de respuestas
  - Helpers para gestión de contexto dinámico
  - Funciones de soporte para integración con otros sistemas
  - Métodos extendidos para personalización de diálogos

#### 5. **`personajes_y_dialogos.js`** - Gestión de Personajes Base
- **Función**: Define datos fundamentales de los personajes
- **Contenido**:
  - Perfiles base de las 5 quintillizas Nakano
  - Personalidades, estilos de habla y características únicas
  - Diálogos predefinidos y plantillas de respuesta
  - Datos de apariencia y expresiones faciales
  - Configuración de animaciones y estados emocionales

#### 6. **`personajes_externos.js`** - Personajes Personalizados
- **Función**: Permite incluir personajes no canon en las conversaciones
- **Características**:
  - Sistema para agregar personajes personalizados (ej: "Aldo", "profesor", etc.)
  - Definición de personalidades y estilos de conversación custom
  - Integración transparente con el motor principal de chatbot
  - Soporte para múltiples personajes externos simultáneos
  - Configuración de relaciones con las quintillizas

#### 7. **`locaciones.js`** - Sistema de Ubicaciones
- **Función**: Gestiona el contexto espacial de las conversaciones
- **Contenido**:
  - Catálogo de locaciones disponibles (escuela, casa, parque, etc.)
  - Descripciones detalladas de cada ubicación
  - Efectos de locación en diálogos y comportamiento de personajes
  - Sistema de transición entre ubicaciones
  - Contexto ambiental para enriquecer conversaciones

#### 8. **`eventos_aleatorios.js`** - Sistema de Eventos Dinámicos
- **Función**: Introduce elementos sorpresa en las conversaciones
- **Características**:
  - Generador de eventos contextuales aleatorios
  - Eventos basados en locación, hora del día y personajes presentes
  - Disparadores de mini-historias y situaciones especiales
  - Sistema de ponderación para frecuencia de eventos
  - Integración con el flujo normal de conversación

#### 9. **`QuintiImagenes.js`** - Sistema de Imágenes Dinámicas
- **Función**: Gestiona visualización de imágenes según contexto
- **Contenido**:
  - Mapeo de acciones/emociones a imágenes específicas
  - Sistema de carga y cacheo de imágenes
  - Transiciones suaves entre estados visuales
  - Soporte para múltiples sprites por personaje
  - Integración con sistema de expresiones faciales

#### 10. **`SistemaHoraDelDia.js`** - Ciclo Temporal
- **Función**: Implementa sistema de hora del día que afecta conversaciones
- **Características**:
  - Ciclo de 24 horas con mañana, tarde, noche y madrugada
  - Efectos en disponibilidad de personajes
  - Diálogos específicos según hora del día
  - Influencia en eventos aleatorios y locaciones disponibles
  - Sincronización con tiempo real o tiempo del juego

### 🔄 Flujo Completo del Sistema de Chatbot

```
┌─────────────────────────────────────────────────────────────┐
│                    ENTRADA DEL USUARIO                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  CONSTRUCCIÓN DE CONTEXTO                                   │
│  - Historial de conversación (quintillizas.js)              │
│  - Personaje activo (personajes_y_dialogos.js)              │
│  - Personajes externos (personajes_externos.js)             │
│  - Locación actual (locaciones.js)                          │
│  - Hora del día (SistemaHoraDelDia.js)                      │
│  - Eventos activos (eventos_aleatorios.js)                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  APLICACIÓN DE PROMPTS (quint_prompts.js)                   │
│  - System prompt según personaje                            │
│  - Contexto formateado                                      │
│  - Restricciones de salida JSON                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  LLAMADA A GROQ API (quintillizas.js)                       │
│  - Modelo: Llama-4 Scout                                    │
│  - Rotación de API keys si es necesario                     │
│  - Timeout y manejo de errores                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  VALIDACIÓN DE RESPUESTA                                    │
│  - Parseo de JSON                                           │
│  - Detección de rechazos (24 patrones regex)                │
│  - Verificación de estructura                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
            ┌───────────┴───────────┐
            │ ¿Válido?              │
            └───────────┬───────────┘
               No       │       Sí
                ↓       │        ↓
        ┌───────────────┘   ┌──────────────────┐
        │                   │ RENDERIZADO      │
        │ REINTENTOS        │ - Diálogo        │
        │ (4 fases)         │ - Imagen         │
        │ quint_prompts.js  │ (QuintiImagenes) │
        │                   │ - Animaciones    │
        └───────────────────┴──────────────────┘
                            ↓
        ┌───────────────────────────────────────┐
        │ GESTIÓN DE MEMORIA                    │
        │ - Actualizar historial                │
        │ - Resumir si > 16 mensajes            │
        │ - Extraer hechos clave                │
        │ - Guardar en Supabase                 │
        └───────────────────────────────────────┘
                            ↓
        ┌───────────────────────────────────────┐
        │ CHEQUEO EVENTOS ALEATORIOS            │
        │ - ¿Activar llamada/mensaje?           │
        │   (SistemaMensajesCelular.js)         │
        │ - ¿Evento contextual?                 │
        │   (eventos_aleatorios.js)             │
        └───────────────────────────────────────┘
```

### 📊 Tabla Técnica de Componentes

| Archivo | Función Principal | Integra con |
|---------|------------------|-------------|
| `quintillizas.js` | Motor principal, API Groq, validación | Todos los demás |
| `SistemaMensajesCelular.js` | Llamadas/mensajes aleatorios | quintillizas.js, personajes_y_dialogos.js |
| `quint_prompts.js` | Prompts, config, patrones regex | quintillizas.js |
| `quint_nuevas_funciones.js` | Funciones extendidas | quintillizas.js |
| `personajes_y_dialogos.js` | Datos base de quintillizas | Todos |
| `personajes_externos.js` | Personajes custom | quintillizas.js, personajes_y_dialogos.js |
| `locaciones.js` | Sistema de ubicaciones | quintillizas.js, eventos_aleatorios.js |
| `eventos_aleatorios.js` | Eventos dinámicos | locaciones.js, SistemaHoraDelDia.js |
| `QuintiImagenes.js` | Gestión de imágenes/sprites | quintillizas.js, personajes_y_dialogos.js |
| `SistemaHoraDelDia.js` | Ciclo temporal | eventos_aleatorios.js, locaciones.js |

### 🎯 Características Avanzadas del Sistema

- **Memoria de Largo Plazo**: Hechos clave extraídos y persistidos entre sesiones
- **Resúmenes Automáticos**: Compresión inteligente de historial para mantener contexto
- **Multi-Personaje**: Conversaciones grupales con varias quintillizas
- **Personajes Externos**: Inclusión de OCs (Original Characters) en diálogos
- **Contexto Dinámico**: Integración de locación, hora, eventos y estado del juego
- **Manejo Robusto de Errores**: 4 fases de reintento con prompts especializados
- **Detección de Rechazos**: 24 patrones regex para identificar respuestas inválidas
- **Eventos Aleatorios**: Sorpresas contextuales durante conversaciones
- **Ciclo Temporal**: Diálogos y eventos que varían según hora del día
- **Sistema Visual**: Imágenes y expresiones que cambian según contexto emocional

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia personalizada. Contacta al autor para más información.

## 👤 Autor

**QuintiCulonas Development Team**

## 🙏 Agradecimientos

- Comunidad de aprendizaje de idiomas
- Contribuidores de código abierto
- Usuarios beta testers

## 📞 Contacto

Para preguntas o soporte, por favor abre un issue en el repositorio.

---

**¡Disfruta aprendiendo con QuintiCulonas! 🔥**
