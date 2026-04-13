// ============================================================
//  PROMPTS Y CONFIGURACIÓN DEL SISTEMA DE RESUMEN
//  Separado de quintillizas.js para organización
// ============================================================

// ——— Umbrales del sistema de resumen ———
const QUINT_HISTORIAL_MAX    = 16;   // Mensajes raw a mantener antes de resumir
const QUINT_RECENT_KEEP      = 6;    // Mensajes recientes SIN resumir (siempre se envían completos)

// ——— System prompt mínimo para fallback ———
const QUINT_SYSTEM_MINIMO = `Eres el narrador de un roleplay con las Quintillizas Nakano. Responde SOLO con JSON valido.

REGLA ABSOLUTA: UNICAMENTE JSON. Sin texto antes ni despues.

Formato:
{
  "chicasQueHablan": [
    {
      "nombre": "Yotsuba",
      "imagen_tag": "normal",
      "dialogo": "tu respuesta aqui con *acciones entre asteriscos*"
    }
  ],
  "nuevasChicasQueAparecen": []
}`;

// ——— Prompts de reintentos por fase ———
const QUINT_FASE1 = [
    "Responde SOLO con JSON valido. Sin texto fuera del JSON. Empieza con { y termina con }",
    'SOLO JSON. Formato: {"chicasQueHablan":[{"nombre":"...","imagen_tag":"normal","dialogo":"..."}],"nuevasChicasQueAparecen":[]}',
    "Tu respuesta anterior no fue JSON valido. Intenta de nuevo. SOLO el JSON, nada mas.",
    "JSON VALIDO UNICAMENTE. Empieza con { — no con texto, no con explicaciones.",
];

const QUINT_FASE2 = [
    'Responde en JSON. {"chicasQueHablan":[{"nombre":"...","imagen_tag":"normal","dialogo":"respuesta aqui"}],"nuevasChicasQueAparecen":[]}',
    "SOLO JSON valido. Sin markdown. Sin texto extra. Empieza con {",
    "Por favor responde unicamente con el JSON solicitado. Nada de texto adicional.",
    "JSON. Solo JSON. Empieza con { termina con }",
];

const QUINT_FASE3 = ["responde", "continua", "ok"];

const QUINT_FASE4 = [
    'JSON solo: {"chicasQueHablan":[{"nombre":"...","imagen_tag":"normal","dialogo":"..."}],"nuevasChicasQueAparecen":[]}',
    '{"chicasQueHablan":[{"nombre":"Yotsuba","imagen_tag":"normal","dialogo":"tu respuesta"}],"nuevasChicasQueAparecen":[]}',
];

// ——— Patrones para detectar rechazos del modelo ———
const PATRONES_RECHAZO = [
    /i'?m\s+(very\s+)?sorry/i,
    /i\s+can'?t\s+(continue|help|do\s+that|assist|fulfill)/i,
    /i\s+cannot\s+(continue|help|do\s+that|assist|fulfill)/i,
    /i'?m\s+unable\s+to/i,
    /i\s+don'?t\s+(feel\s+)?comfortable/i,
    /i'?m\s+not\s+(comfortable|able|going\s+to)/i,
    /that\s+would\s+be\s+(inappropriate|unethical)/i,
    /i\s+can'?t\s+write\s+(that|content|stories)/i,
    /i\s+won'?t\s+(be\s+able\s+to|do\s+that)/i,
    /as\s+an?\s+(ai|assistant|language\s+model)/i,
    /i'?m\s+programmed\s+to/i,
    /i\s+don'?t\s+have\s+(the\s+)?ability/i,
    /i\s+am\s+(sorry|unable)/i,
    /unfortunately\s+i\s+(can'?t|cannot|am\s+not)/i,
    /i'?m\s+afraid\s+i\s+can'?t/i,
    /that\s+goes\s+beyond\s+what\s+i\s+can/i,
    /i\s+must\s+decline/i,
    /i\s+can'?t\s+produce/i,
    /i\s+don'?t\s+generate/i,
    /content\s+policy/i,
    /safety\s+(policy|guideline)/i,
    /inappropriate\s+content/i,
    /nsfw\s+content/i,
    /explicit\s+content/i,
    /sexual\s+content/i,
];

// ——— Prompts del sistema de resumen ———
const QUINT_PROMPT_RESUMEN = `Resume la siguiente conversación de roleplay con las Quintillizas Nakano. 
{resumenPrevio}
CONVERSACIÓN A RESUMIR:
{mensajes}

Genera un resumen narrativo compacto en 3-5 oraciones que capture:
- Qué pasó en la conversación
- Qué chicas participaron y cómo reaccionaron
- Cualquier evento o acción importante
- El tono emocional de la escena

Solo el resumen, nada más. En español.`;

const QUINT_PROMPT_HECHOS = `Extrae HECHOS IMPORTANTES de esta conversación de roleplay.
{hechosPrevios}
CONVERSACIÓN:
{mensajes}

Extrae hechos como lista breve (máximo 10). Un hecho es:
- Información personal del usuario (nombre, preferencias, relaciones)
- Eventos importantes que cambiaron algo
- Decisiones tomadas por los personajes
- Estados emocionales relevantes persistentes
- Cambios en relaciones o situaciones

Formato: un hecho por línea. Solo la lista, nada más. En español.`;
