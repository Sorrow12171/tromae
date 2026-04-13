// ================================================
// SISTEMA COREANO QUINTILLIZAS - Frases de Anime
// Palabras individuales extraídas de frases de anime
// ================================================

const coreanoQuintillizas = (() => {

    // ─────────────────────────────────────────────
    // DATOS - MAZOS DE QUINTILLIZAS
    // ─────────────────────────────────────────────

    const MAZOS = [
        {
            id: 1,
            titulo: "Mazo 1 - Palabras de '내가 반드시…' (Yo definitivamente...)",
            palabras: "내가 반드시 구해주",
            cartas: [
                { coreano: "내가", pronunciacion: "/naega/", como: "Yo (sujeto)", ejemplo: "내가 할게", traduccion: "Yo lo haré", opciones: ["Yo (sujeto)", "Tú", "Nosotros", "Ellos"], respuesta: 0 },
                { coreano: "반드시", pronunciacion: "/bandeusi/", como: "Definitivamente, sin falta", ejemplo: "반드시 성공할 거야", traduccion: "Definitivamente tendrás éxito", opciones: ["Definitivamente/sin falta", "Tal vez/quizás", "Nunca/jamás", "A veces/en ocasiones"], respuesta: 0 },
                { coreano: "구해주", pronunciacion: "/guhaeju/", como: "Salvar/rescatar (hacer por alguien)", ejemplo: "도와줘! 구해주!", traduccion: "¡Ayúdame! ¡Sálvame!", opciones: ["Salvar/rescatar (por alguien)", "Encontrar/buscar", "Proteger/cuidar", "Llevar/traer"], respuesta: 0 },
                { coreano: "테니까", pronunciacion: "/tenikka/", como: "Porque haré... (conector de razón)", ejemplo: "기다려 줄 테니까", traduccion: "Porque esperaré...", opciones: ["Porque haré... (razón)", "Pero no haré...", "Y también haré...", "O quizás haré..."], respuesta: 0 }
            ]
        },
        {
            id: 2,
            titulo: "Mazo 2 - Palabras de '니노, 미쿠' (Nombres)",
            palabras: "니노 미쿠 어디 있어",
            cartas: [
                { coreano: "니노", pronunciacion: "/Nino/", como: "Nino (nombre propio)", ejemplo: "니노 어디 있어?", traduccion: "¿Nino, dónde estás?", opciones: ["Nino (nombre)", "Miku (nombre)", "Ichika (nombre)", "Yotsuba (nombre)"], respuesta: 0 },
                { coreano: "미쿠", pronunciacion: "/Miku/", como: "Miku (nombre propio)", ejemplo: "미쿠, 빨리 와!", traduccion: "¡Miku, ven rápido!", opciones: ["Miku (nombre)", "Nino (nombre)", "Itsuki (nombre)", "Raiha (nombre)"], respuesta: 0 },
                { coreano: "어디", pronunciacion: "/eodi/", como: "¿Dónde? / ¿Qué lugar?", ejemplo: "어디 있어?", traduccion: "¿Dónde estás?", opciones: ["¿Dónde?/¿Qué lugar?", "¿Cuándo?/¿Qué hora?", "¿Quién?/¿Qué persona?", "¿Qué?/¿Qué cosa?"], respuesta: 0 },
                { coreano: "있어", pronunciacion: "/isseo/", como: "Estar / Haber / Tener", ejemplo: "집에 있어", traduccion: "Estoy en casa", opciones: ["Estar/Haber/Tener", "Ir/Venir", "Comer/Beber", "Ver/Mirar"], respuesta: 0 }
            ]
        },
        {
            id: 3,
            titulo: "Mazo 3 - Palabras de '어떠신 가요?' (¿Qué te parece?)",
            palabras: "어떠신 가요 이 옷",
            cartas: [
                { coreano: "어떠신", pronunciacion: "/eotteosin/", como: "¿Cómo es? / ¿Qué te parece? (formal)", ejemplo: "이 옷 어떠신 가요?", traduccion: "¿Qué te parece esta ropa?", opciones: ["¿Cómo es?/¿Qué te parece?", "¿Dónde está?", "¿Quién es?", "¿Cuándo es?"], respuesta: 0 },
                { coreano: "가요", pronunciacion: "/gayo/", como: "¿Va? / ¿Es? (terminación formal)", ejemplo: "어떻게 가요?", traduccion: "¿Cómo va?", opciones: ["¿Va?/¿Es? (formal)", "¿Viene?/¿Llega?", "¿Tiene?/¿Posee?", "¿Ve?/¿Mira?"], respuesta: 0 },
                { coreano: "이", pronunciacion: "/i/", como: "Este/esta (demostrativo cercano)", ejemplo: "이 사람", traduccion: "Esta persona", opciones: ["Este/esta (cercano)", "Ese/esa (distante)", "Aquel/aquella (lejano)", "El/la (artículo)"], respuesta: 0 },
                { coreano: "옷", pronunciacion: "/ot/", como: "Ropa / Vestimenta", ejemplo: "새 옷", traduccion: "Ropa nueva", opciones: ["Ropa/vestimenta", "Comida/alimento", "Casa/hogar", "Libro/lectura"], respuesta: 0 }
            ]
        },
        {
            id: 4,
            titulo: "Mazo 4 - Palabras de '오래 기다리셨습니다' (Gracias por esperar)",
            palabras: "오래 기다리셨습니다",
            cartas: [
                { coreano: "오래", pronunciacion: "/orae/", como: "Largo tiempo / Mucho tiempo", ejemplo: "오래 기다렸어", traduccion: "Esperé mucho tiempo", opciones: ["Largo tiempo/mucho tiempo", "Poco tiempo/rápido", "Ahora/mismo", "Siempre/nunca"], respuesta: 0 },
                { coreano: "기다리", pronunciacion: "/gidari/", como: "Esperar (raíz del verbo)", ejemplo: "기다려 주세요", traduccion: "Por favor, espere", opciones: ["Esperar (raíz)", "Buscar/encontrar", "Llamar/contactar", "Ver/mirar"], respuesta: 0 },
                { coreano: "셨습니다", pronunciacion: "/syeotseumnida/", como: "Terminación formal de respeto pasado", ejemplo: "오래 기다리셨습니다", traduccion: "Ha esperado mucho tiempo (formal)", opciones: ["Terminación formal de respeto", "Terminación informal casual", "Terminación negativa", "Terminación interrogativa"], respuesta: 0 }
            ]
        },
        {
            id: 5,
            titulo: "Mazo 5 - Palabras de '역시 이 의상이 정답이었네' (Este traje era correcto)",
            palabras: "역시 의상 정답",
            cartas: [
                { coreano: "역시", pronunciacion: "/yeoksi/", como: "Como pensé / Tal como esperaba", ejemplo: "역시 너야!", traduccion: "¡Como pensé, eres tú!", opciones: ["Como pensé/tal como esperaba", "Sin embargo/pero", "Además/también", "Aunque/a pesar de"], respuesta: 0 },
                { coreano: "의상", pronunciacion: "/uisang/", como: "Traje / Vestimenta / Atuendo", ejemplo: "이 의상 예뻐", traduccion: "Este traje es bonito", opciones: ["Traje/vestimenta/atuendo", "Comida/plato", "Casa/habitación", "Libro/historia"], respuesta: 0 },
                { coreano: "정답", pronunciacion: "/jeongdap/", como: "Respuesta correcta", ejemplo: "정답이에요!", traduccion: "¡Es la respuesta correcta!", opciones: ["Respuesta correcta", "Pregunta difícil", "Examen duro", "Libro texto"], respuesta: 0 },
                { coreano: "이었네", pronunciacion: "/ieotne/", como: "Era... (confirmación)", ejemplo: "맞았어, 이었네", traduccion: "Correcto, era...", opciones: ["Era... (confirmación)", "Será... (futuro)", "Es... (presente)", "Fue... (pasado remoto)"], respuesta: 0 }
            ]
        },
        {
            id: 6,
            titulo: "Mazo 6 - Palabras de '이 남자 한테서…' (De este hombre...)",
            palabras: "이 남자 한테서 편지",
            cartas: [
                { coreano: "남자", pronunciacion: "/namja/", como: "Hombre / Varón", ejemplo: "그 남자 누구야?", traduccion: "¿Quién es ese hombre?", opciones: ["Hombre/varón", "Mujer/dama", "Niño/niña", "Persona/gente"], respuesta: 0 },
                { coreano: "한테서", pronunciacion: "/hantesseo/", como: "De / Desde (persona)", ejemplo: "친구한테서 편지 왔어", traduccion: "Llegó carta del amigo", opciones: ["De/desde (persona)", "A/hacia (dirección)", "En/dentro (lugar)", "Con/junto (compañía)"], respuesta: 0 },
                { coreano: "편지", pronunciacion: "/pyeonji/", como: "Carta / Misiva", ejemplo: "편지 받았어?", traduccion: "¿Recibiste la carta?", opciones: ["Carta/misiva", "Email/mensaje", "Llamada/telefoneo", "Regalo/presente"], respuesta: 0 },
                { coreano: "왔어", pronunciacion: "/wasseo/", como: "Vino / Llegó (pasado)", ejemplo: "소포가 왔어", traduccion: "Llegó un paquete", opciones: ["Vino/llegó (pasado)", "Va/irá (futuro)", "Tiene/posee (presente)", "Ve/mira (acción)"], respuesta: 0 }
            ]
        },
        {
            id: 7,
            titulo: "Mazo 7 - Palabras de '음음' (Asentimiento)",
            palabras: "음음 그렇군요",
            cartas: [
                { coreano: "음음", pronunciacion: "/eumeum/", como: "Hmm / Sí sí (asentimiento)", ejemplo: "음음… 알겠어", traduccion: "Hmm... ya entiendo", opciones: ["Hmm/Sí sí (asentimiento)", "No/Nunca (negación)", "¡Increíble! (sorpresa)", "¡Adiós! (despedida)"], respuesta: 0 },
                { coreano: "그렇군요", pronunciacion: "/geureohgunyo/", como: "Ya veo / Entiendo", ejemplo: "아, 그렇군요!", traduccion: "¡Ah, ya veo!", opciones: ["Ya veo/entiendo", "No entiendo", "¿Qué dices?", "¡Increíble!"], respuesta: 0 },
                { coreano: "알겠어", pronunciacion: "/algess-eo/", como: "Entiendo / Comprendo", ejemplo: "알겠어, 도와줄게", traduccion: "Entiendo, te ayudaré", opciones: ["Entiendo/comprendo", "No sé/no entiendo", "Tal vez/quizás", "Olvidé/perdí"], respuesta: 0 },
                { coreano: "도와줄게", pronunciacion: "/do wajulge/", como: "Te ayudaré / Te voy a ayudar", ejemplo: "걱정 마, 도와줄게", traduccion: "No te preocupes, te ayudaré", opciones: ["Te ayudaré", "Te dejaré", "Te buscaré", "Te llamaré"], respuesta: 0 }
            ]
        }
    ];

    // ─────────────────────────────────────────────
    // ESTADO
    // ─────────────────────────────────────────────

    let mazoActualId = null;
    let cartasActuales = [];
    let indiceActual = 0;
    let aciertos = 0;
    let errores = 0;
    let esperando = false;
    let progreso = JSON.parse(localStorage.getItem('coreanoQuintillizasProgreso') || '{}');

    function guardarProgreso() {
        localStorage.setItem('coreanoQuintillizasProgreso', JSON.stringify(progreso));
    }

    // ─────────────────────────────────────────────
    // ESTILOS
    // ─────────────────────────────────────────────

    function inyectarEstilos() {
        if (document.getElementById('coreanoQuint-styles')) return;

        const style = document.createElement('style');
        style.id = 'coreanoQuint-styles';
        style.textContent = `
            .cq-wrap { max-width: 900px; margin: 0 auto; padding: 30px 20px; color: #fff; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
            .cq-titulo { text-align: center; font-size: 2.2rem; font-weight: bold; margin-bottom: 8px; background: linear-gradient(135deg, #FF69B4, #FF1493); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .cq-sub { text-align: center; opacity: 0.7; margin-bottom: 30px; font-size: 0.95rem; }
            
            .cq-mazos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
            .cq-mazo-card { 
                background: linear-gradient(135deg, rgba(255, 105, 180, 0.15), rgba(255, 20, 147, 0.1)); 
                border: 2px solid rgba(255, 105, 180, 0.3);
                border-radius: 16px; 
                padding: 20px; 
                cursor: pointer; 
                transition: all 0.3s;
            }
            .cq-mazo-card:hover { 
                transform: translateY(-5px); 
                background: linear-gradient(135deg, rgba(255, 105, 180, 0.25), rgba(255, 20, 147, 0.2));
                border-color: rgba(255, 105, 180, 0.6);
                box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
            }
            .cq-mazo-card.completado { 
                border-color: #4CAF50; 
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1));
            }
            .cq-mazo-letras { font-size: 1.3rem; font-weight: bold; margin-bottom: 8px; letter-spacing: 3px; color: #FFD166; }
            .cq-mazo-nombre { font-size: 0.9rem; opacity: 0.9; line-height: 1.4; }
            .cq-badge { 
                display: inline-block; 
                background: linear-gradient(135deg, #4CAF50, #45a049); 
                color: #fff; 
                padding: 4px 12px; 
                border-radius: 12px; 
                font-size: 0.75rem; 
                margin-top: 10px;
            }
            
            .cq-carta { 
                background: linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(255, 20, 147, 0.08));
                border: 2px solid rgba(255, 105, 180, 0.3);
                border-radius: 20px; 
                padding: 40px 20px; 
                text-align: center; 
                margin: 20px 0;
            }
            .cq-letra-grande { font-size: 5rem; font-weight: bold; margin-bottom: 10px; }
            .cq-letra-info { opacity: 0.6; font-size: 0.85rem; }
            
            .cq-opciones { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
            .cq-opcion { 
                padding: 15px; 
                background: rgba(255, 105, 180, 0.1); 
                border: 2px solid rgba(255, 105, 180, 0.2); 
                border-radius: 12px; 
                color: #fff; 
                cursor: pointer; 
                font-size: 0.95rem; 
                transition: all 0.2s;
            }
            .cq-opcion:hover { 
                background: rgba(255, 105, 180, 0.2); 
                border-color: rgba(255, 105, 180, 0.5);
            }
            .cq-opcion.correcta { 
                background: rgba(76,175,80,0.4); 
                border-color: #4CAF50; 
            }
            .cq-opcion.incorrecta { 
                background: rgba(244,67,54,0.4); 
                border-color: #f44336; 
            }
            .cq-opcion.deshabilitada { 
                pointer-events: none; 
                opacity: 0.5; 
            }
            
            .cq-feedback { 
                background: rgba(255, 105, 180, 0.08); 
                border-radius: 12px; 
                padding: 20px; 
                margin: 20px 0; 
                text-align: center; 
                display: none; 
            }
            .cq-feedback.visible { display: block; }
            .cq-feedback-pron { font-size: 1.2rem; font-weight: bold; margin-bottom: 8px; color: #FFD166; }
            .cq-feedback-ej { opacity: 0.8; font-size: 0.9rem; }
            
            .cq-barra-wrap { margin: 20px 0; }
            .cq-barra-bg { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
            .cq-barra-fill { height: 100%; background: linear-gradient(90deg, #FF69B4, #FF1493); transition: width 0.3s; }
            .cq-barra-txt { text-align: center; margin-top: 6px; opacity: 0.7; font-size: 0.85rem; }
            
            .cq-btn-siguiente { 
                display: block; 
                width: 100%; 
                padding: 15px; 
                background: linear-gradient(135deg, #FF69B4, #FF1493); 
                border: none; 
                border-radius: 12px; 
                color: #fff; 
                font-size: 1.1rem; 
                font-weight: bold; 
                cursor: pointer; 
                margin-top: 20px; 
                transition: all 0.2s; 
            }
            .cq-btn-siguiente:hover { transform: translateY(-2px); }
            
            .cq-resultado { text-align: center; padding: 40px 20px; }
            .cq-resultado-emoji { font-size: 60px; margin-bottom: 15px; }
            .cq-resultado-titulo { font-size: 1.6rem; font-weight: bold; margin-bottom: 8px; }
            .cq-stats { display: flex; gap: 15px; justify-content: center; margin: 20px 0; }
            .cq-stat { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px 25px; text-align: center; }
            .cq-stat-num { font-size: 1.8rem; font-weight: bold; color: #FFD166; }
            .cq-stat-label { font-size: 0.8rem; opacity: 0.7; margin-top: 4px; }
            .cq-btn-menu { 
                display: inline-block; 
                padding: 12px 30px; 
                margin-top: 10px; 
                background: linear-gradient(135deg, #FF69B4, #FF1493); 
                border: none; 
                border-radius: 12px; 
                color: #fff; 
                font-size: 1rem; 
                font-weight: bold; 
                cursor: pointer; 
                transition: all 0.2s; 
            }
            .cq-btn-menu:hover { transform: translateY(-2px); }
            
            .cq-btn-volver { 
                display: inline-block; 
                padding: 10px 20px; 
                background: rgba(255,255,255,0.1); 
                border: 1px solid rgba(255,255,255,0.2); 
                border-radius: 8px; 
                color: #fff; 
                cursor: pointer; 
                margin-bottom: 20px; 
                font-size: 0.9rem; 
                transition: all 0.2s; 
            }
            .cq-btn-volver:hover { background: rgba(255,255,255,0.15); }
        `;
        document.head.appendChild(style);
    }

    // ─────────────────────────────────────────────
    // PANTALLAS
    // ─────────────────────────────────────────────

    function cargarPagina() {
        inyectarEstilos();
        const section = document.getElementById('manga-section');
        section.style.display = 'block';
        section.innerHTML = renderMenu();
    }

    function renderMenu() {
        const cards = MAZOS.map(m => {
            const hecho = progreso[m.id];
            return `
                <div class="cq-mazo-card ${hecho ? 'completado' : ''}" onclick="coreanoQuintillizas._iniciarMazo(${m.id})">
                    <div class="cq-mazo-letras">${m.palabras}</div>
                    <div class="cq-mazo-nombre">${m.titulo}</div>
                    ${hecho ? '<span class="cq-badge">✓ Completado</span>' : ''}
                </div>
            `;
        }).join('');

        return `
            <div class="cq-wrap">
                <button class="cq-btn-volver" onclick="volverAlInicio()">← Volver</button>
                <h2 class="cq-titulo">🌸 MAZOS QUINTILLIZAS</h2>
                <p class="cq-sub">Palabras individuales de frases de anime - Las Quintillizas Nakano</p>
                <div class="cq-mazos-grid">${cards}</div>
            </div>
        `;
    }

    function _iniciarMazo(id) {
        const mazo = MAZOS.find(m => m.id === id);
        if (!mazo) return;
        mazoActualId = id;
        cartasActuales = [...mazo.cartas].sort(() => Math.random() - 0.5);
        indiceActual = 0;
        aciertos = 0;
        errores = 0;
        esperando = false;
        _renderQuiz();
    }

    function _renderQuiz() {
        const section = document.getElementById('manga-section');
        section.innerHTML = `<div class="cq-wrap" id="cq-quiz-wrap"></div>`;
        _mostrarCarta();
    }

    function _mostrarCarta() {
        const carta = cartasActuales[indiceActual];
        const total = cartasActuales.length;
        const pct = Math.round((indiceActual / total) * 100);

        document.getElementById('cq-quiz-wrap').innerHTML = `
            <div class="cq-barra-wrap">
                <div class="cq-barra-bg"><div class="cq-barra-fill" style="width:${pct}%"></div></div>
                <div class="cq-barra-txt">${indiceActual} / ${total}</div>
            </div>

            <div class="cq-carta">
                <div class="cq-letra-grande">${carta.coreano}</div>
                <div class="cq-letra-info">Palabra coreana</div>
            </div>

            <div class="cq-opciones" id="cq-opciones">
                ${carta.opciones.map((op, i) => `
                    <button class="cq-opcion" onclick="coreanoQuintillizas._verificar(${i})">${op}</button>
                `).join('')}
            </div>

            <div class="cq-feedback" id="cq-feedback">
                <div class="cq-feedback-pron" id="cq-fb-pron"></div>
                <div class="cq-feedback-ej" id="cq-fb-ej"></div>
            </div>

            <button class="cq-btn-siguiente" id="cq-btn-sig" style="display:none" onclick="coreanoQuintillizas._siguiente()">Siguiente →</button>
        `;
    }

    function _verificar(indice) {
        if (esperando) return;
        esperando = true;

        const carta = cartasActuales[indiceActual];
        const correcta = indice === carta.respuesta;
        const opciones = document.querySelectorAll('.cq-opcion');

        opciones.forEach((op, i) => {
            op.classList.add('deshabilitada');
            if (i === carta.respuesta) op.classList.add('correcta');
            if (i === indice && !correcta) op.classList.add('incorrecta');
        });

        if (correcta) {
            aciertos++;
        } else {
            errores++;
        }

        document.getElementById('cq-fb-pron').textContent = `Pronunciación: ${carta.pronunciacion}`;
        document.getElementById('cq-fb-ej').textContent = `Ejemplo: ${carta.ejemplo} — ${carta.traduccion}`;
        document.getElementById('cq-feedback').classList.add('visible');
        document.getElementById('cq-btn-sig').style.display = 'block';

        // Auto-advance después de 1 segundo si respondió correctamente
        if (correcta) {
            setTimeout(() => {
                _siguiente();
            }, 1000);
        }
    }

    function _siguiente() {
        indiceActual++;
        esperando = false;

        if (indiceActual >= cartasActuales.length) {
            _mostrarResultado();
        } else {
            _mostrarCarta();
        }
    }

    function _mostrarResultado() {
        const section = document.getElementById('manga-section');
        const total = cartasActuales.length;
        const pct = Math.round((aciertos / total) * 100);
        const emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪';

        progreso[mazoActualId] = true;
        guardarProgreso();

        const mazo = MAZOS.find(m => m.id === mazoActualId);

        section.innerHTML = `
            <div class="cq-wrap">
                <div class="cq-resultado">
                    <div class="cq-resultado-emoji">${emoji}</div>
                    <div class="cq-resultado-titulo">¡Mazo completado!</div>
                    <p style="opacity:0.7">${mazo.titulo}</p>
                    
                    <div class="cq-stats">
                        <div class="cq-stat">
                            <div class="cq-stat-num">${aciertos}</div>
                            <div class="cq-stat-label">Aciertos</div>
                        </div>
                        <div class="cq-stat">
                            <div class="cq-stat-num">${errores}</div>
                            <div class="cq-stat-label">Errores</div>
                        </div>
                        <div class="cq-stat">
                            <div class="cq-stat-num">${pct}%</div>
                            <div class="cq-stat-label">Precisión</div>
                        </div>
                    </div>
                    
                    <button class="cq-btn-menu" onclick="coreanoQuintillizas._iniciarMazo(${mazoActualId})">🔄 Repetir mazo</button>
                    <button class="cq-btn-menu" onclick="coreanoQuintillizas.cargarPagina()" style="margin-left:10px">📋 Volver al menú</button>
                </div>
            </div>
        `;
    }

    // ─────────────────────────────────────────────
    // API PÚBLICA
    // ─────────────────────────────────────────────

    return {
        cargarPagina,
        _iniciarMazo,
        _verificar,
        _siguiente
    };

})();

// ─────────────────────────────────────────────
// FUNCIÓN GLOBAL — se llama desde el index.html
// ─────────────────────────────────────────────

function cargarPaginaQuintillizasCoreano() {
    if (typeof ocultarHeader === 'function') ocultarHeader();
    if (typeof modoActual !== 'undefined') modoActual = 'coreanoQuintillizas';

    coreanoQuintillizas.cargarPagina();

    if (typeof crearBotonVolver === 'function' && typeof volverAlInicio === 'function') {
        const mangaSection = document.getElementById('manga-section');
        const botonVolver = crearBotonVolver(volverAlInicio);
        mangaSection.insertBefore(botonVolver, mangaSection.firstChild);
    }
}
