// ================================================
// GALERÍA - MOTOR (FUNCIONES)
// No contiene datos, solo lógica.
// ================================================

// galeriaDatabase se construye desde los archivos galeria_data_*.js
const galeriaDatabase = {};

// Variables para el carrusel automático
let intervaloCarrusel = null;
let imagenesRestantes = [];
let esPrimeraImagenPrincipal = true;

// ================================================
// FUNCIONES DE ACCESO A CONTENEDORES
// ================================================

function obtenerContenedorGaleria(numero) {
    return contenedoresGaleria[numero] || {
        nombre: `GALERÍA ${numero}`,
        imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        descripcion: '5 sub-contenedores con galerías de imágenes',
        categoria: 'General'
    };
}

function obtenerSubcontenedorGaleria(contenedor, subcontenedor) {
    // Para los contenedores 9-13 que usan nombres en lugar de números
    if (contenedor >= 9) {
        const key = `${contenedor}_${subcontenedor}`;
        return galeriaDatabase[key] || {
            titulo: `Galería ${subcontenedor}`,
            descripcion: 'Colección de imágenes',
            categoria: 'General',
            imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
            imagenes: []
        };
    } else {
        const key = `${contenedor}_${subcontenedor}`;
        return galeriaDatabase[key] || {
            titulo: `Galería ${subcontenedor}`,
            descripcion: 'Colección de imágenes',
            categoria: 'General',
            imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
            imagenes: []
        };
    }
}

function obtenerContenedoresGaleriaDisponibles() {
    const contenedores = {};
    
    // Almacenaremos las claves ORIGINALES para preservar el orden
    Object.keys(galeriaDatabase).forEach(key => {
        const partes = key.split('_');
        const contenedor = partes[0];
        
        if (!contenedores[contenedor]) {
            contenedores[contenedor] = [];
        }
        
        // Guardamos el nombre completo del subcontenedor (join para casos como '9_Nino_Ichika')
        contenedores[contenedor].push(partes.slice(1).join('_'));
    });
    
    // Opcional: Ordenar los subcontenedores de los contenedores 1-8 numéricamente,
    // pero DEJAR SIN ORDENAR los de los contenedores 9+ para mantener el orden de definición.
    Object.keys(contenedores).forEach(key => {
        // Si el contenedor es del 1 al 8, ordenamos numéricamente sus subcontenedores
        if (parseInt(key) <= 8) {
            contenedores[key].sort((a, b) => {
                // Intentar ordenar numéricamente si son números
                if (!isNaN(a) && !isNaN(b)) {
                    return parseInt(a) - parseInt(b);
                }
                // Ordenar alfabéticamente para los que tienen nombres (por si acaso)
                return a.localeCompare(b);
            });
        }
        // Para contenedores 9 y superiores, NO HACEMOS NINGÚN SORT
        // Esto preservará el orden en que las claves fueron insertadas en galeriaDatabase
        // (Nota: El orden de inserción en objetos modernos se mantiene para claves que no son números)
    });
    
    return contenedores;
}
function obtenerGaleria(contenedor, subcontenedor) {
    const key = `${contenedor}_${subcontenedor}`;
    return galeriaDatabase[key] || null;
}

function existeGaleria(contenedor, subcontenedor) {
    const key = `${contenedor}_${subcontenedor}`;
    return !!galeriaDatabase[key];
}

// ================================================
// FUNCIONES PARA LA UI (para usar en main.js)
// ================================================

// 1. Función para cargar la página principal de galerías
function cargarPaginaGaleria() {
    modoActual = 'galeria';
    modoMazoDificil = false;
    
    // Detener cualquier rotación al volver a la página principal de galerías
    if (intervaloRotacionPortada) {
        clearInterval(intervaloRotacionPortada);
        intervaloRotacionPortada = null;
    }
    
    ocultarHeader();
    
    const mangaSection = document.getElementById('manga-section');
    mangaSection.style.display = 'block';
    mangaSection.innerHTML = crearContenedoresGaleria();
    
    const botonVolver = crearBotonVolver(volverAlInicio);
    mangaSection.insertBefore(botonVolver, mangaSection.firstChild);
}

// 2. Crear UI de contenedores de galería
function crearContenedoresGaleria() {
    let html = '<h2 style="text-align: center; margin-bottom: 30px; color: #FFD166;">📦 CONTENEDORES DE GALERÍA</h2>';
    html += '<div class="manga-contenedores">';
    
    const totalContenedores = Object.keys(contenedoresGaleria).length;
    
    for (let i = 1; i <= totalContenedores; i++) {
        const contenedorData = obtenerContenedorGaleria(i);
        const nombre = contenedorData.nombre || `GALERÍA ${i}`;
        const desc = contenedorData.descripcion || 'Sub-contenedores con imágenes';
        
        html += `
            <div class="contenedor-item" onclick="cargarSubcontenedoresGaleria(${i})">
                <div class="contenedor-img" style="background-image: url('${contenedorData.imagen}')"></div>
                <div class="contenedor-numero">${nombre}</div>
                <p>${desc}</p>
                <div class="card-button" style="background: linear-gradient(135deg, #FF1493, #FF69B4);">
                    Ver Galerías
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

function cargarSubcontenedoresGaleria(contenedor) {
    contenedorActual = contenedor;
    subcontenedorActual = null; // Resetear subcontenedor
    modoActual = 'galeria';
    modoMazoDificil = false;
    
    // Detener cualquier rotación al cambiar de vista
    if (intervaloRotacionPortada) {
        clearInterval(intervaloRotacionPortada);
        intervaloRotacionPortada = null;
    }
    
    const mangaSection = document.getElementById('manga-section');
    mangaSection.innerHTML = crearSubcontenedoresGaleriaUI(contenedor);
    
    const botonVolver = crearBotonVolver(cargarPaginaGaleria);
    mangaSection.insertBefore(botonVolver, mangaSection.firstChild);
    
    // Log para verificar qué subcontenedores se cargaron
    const disponibles = obtenerContenedoresGaleriaDisponibles();
    console.log(`📂 Subcontenedores para contenedor ${contenedor}:`, disponibles[contenedor] || []);
}

// 4. Crear UI de subcontenedores (CORREGIDO - muestra nombres originales en TODAS las galerías)
function crearSubcontenedoresGaleriaUI(contenedor) {
    let html = `<h2 style="text-align: center; margin-bottom: 30px; color: #FFD166;">
        📦 ${obtenerContenedorGaleria(contenedor).nombre} - SUB-GALERÍAS
    </h2>`;
    html += '<div class="subcontenedores-grid">';
    
    // Obtener TODOS los subcontenedores disponibles para este contenedor
    const contenedores = obtenerContenedoresGaleriaDisponibles();
    const subcontenedoresDisponibles = contenedores[contenedor] || [];
    
    // Si no hay subcontenedores, mostrar mensaje
    if (subcontenedoresDisponibles.length === 0) {
        html += `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; background: rgba(255,255,255,0.1); border-radius: 20px;">
                <p style="color: #FFD166; font-size: 1.2rem;">No hay subgalerías disponibles para este contenedor</p>
            </div>
        `;
    } else {
        // Recorrer SOLO los subcontenedores que existen
        subcontenedoresDisponibles.forEach(subKey => {
            const galeriaInfo = obtenerGaleria(contenedor, subKey);
            if (galeriaInfo) {
                // CORREGIDO: Usar el título original SIEMPRE
                let tituloMostrar = galeriaInfo.titulo;
                
                if (!tituloMostrar || tituloMostrar.trim() === '') {
                    tituloMostrar = `Galería ${subKey}`;
                }
                
                // DETERMINAR IMAGEN INICIAL DE PORTADA
                let imagenInicial = galeriaInfo.imagen;
                
                // Si tiene imagenes_rotacion, usar la primera
                if (galeriaInfo.imagenes_rotacion && galeriaInfo.imagenes_rotacion.length > 0) {
                    imagenInicial = galeriaInfo.imagenes_rotacion[0];
                } 
                // Si NO tiene imagenes_rotacion pero tiene imagenes, usar la primera del array imagenes
                else if (galeriaInfo.imagenes && galeriaInfo.imagenes.length > 0) {
                    imagenInicial = galeriaInfo.imagenes[0].url;
                }
                
                html += `
                    <div class="subcontenedor-item" onclick="cargarGaleria(${contenedor}, '${subKey}')" data-key="${contenedor}_${subKey}">
                        <div class="subcontenedor-img" style="background-image: url('${imagenInicial}')" data-key="${contenedor}_${subKey}"></div>
                        <h3>${tituloMostrar}</h3>
                        <p style="font-size: 0.85rem; opacity: 0.8;">${galeriaInfo.categoria} • ${galeriaInfo.imagenes.length} imágenes</p>
                        <div class="card-button" style="margin-top: 10px; padding: 10px 20px; font-size: 0.9rem; background: linear-gradient(135deg, #FF1493, #FF69B4);">
                            📦 Ver Galería
                        </div>
                    </div>
                `;
            }
        });
    }
    
    html += '</div>';
    
    // IMPORTANTE: Iniciar rotación después de un pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => iniciarRotacionPortadas(contenedor), 100);
    
    return html;
}

// NUEVA FUNCIÓN: Iniciar rotación de portadas en las subgalerías
function iniciarRotacionPortadas(contenedor) {
    // Detener cualquier rotación previa
    if (intervaloRotacionPortada) {
        clearInterval(intervaloRotacionPortada);
        intervaloRotacionPortada = null;
    }
    
    const contenedores = obtenerContenedoresGaleriaDisponibles();
    const subcontenedoresDisponibles = contenedores[contenedor] || [];
    
    if (subcontenedoresDisponibles.length === 0) return;
    
    // Recopilar todas las galerías con imágenes para rotar
    const galeriasConRotacion = [];
    
    subcontenedoresDisponibles.forEach(subKey => {
        const galeriaInfo = obtenerGaleria(contenedor, subKey);
        if (!galeriaInfo) return;
        
        let imagenesParaRotar = [];
        
        // SOLO usar imagenes_rotacion personalizada (NO hacer fallback a imagenes)
        if (galeriaInfo.imagenes_rotacion && galeriaInfo.imagenes_rotacion.length > 0) {
            imagenesParaRotar = galeriaInfo.imagenes_rotacion;
        }
        
        // Solo agregar si hay más de 1 imagen para rotar
        if (imagenesParaRotar.length > 1) {
            galeriasConRotacion.push({
                key: `${contenedor}_${subKey}`,
                imagenes: imagenesParaRotar,
                indice: 0
            });
        }
    });
    
    if (galeriasConRotacion.length === 0) return;
    
    // Rotar todas las portadas cada 2.5 segundos
    intervaloRotacionPortada = setInterval(() => {
        galeriasConRotacion.forEach(galeria => {
            // Avanzar al siguiente índice
            galeria.indice = (galeria.indice + 1) % galeria.imagenes.length;
            
            // Actualizar la imagen de portada
            const imgElement = document.querySelector(`.subcontenedor-img[data-key="${galeria.key}"]`);
            if (imgElement) {
                imgElement.style.backgroundImage = `url('${galeria.imagenes[galeria.indice]}')`;
            }
        });
    }, 2500);
}
// 5. Cargar galería específica
let intervaloRotacionPortada = null;

function cargarGaleria(contenedor, subcontenedor) {
    contenedorActual = contenedor;
    subcontenedorActual = subcontenedor;
    
    const galeriaInfo = obtenerGaleria(contenedor, subcontenedor);
    if (!galeriaInfo || !galeriaInfo.imagenes || galeriaInfo.imagenes.length === 0) {
        alert('No hay imágenes disponibles en esta galería');
        return;
    }
    
    // Detener cualquier rotación anterior
    if (intervaloRotacionPortada) {
        clearInterval(intervaloRotacionPortada);
        intervaloRotacionPortada = null;
    }
    
    // Determinar qué imágenes usar para rotación
    let imagenesParaRotacion = [];
    
    // Verificar si tiene imagenes_rotacion personalizada
    const tieneRotacionPersonalizada = galeriaInfo && 
                                       galeriaInfo.imagenes_rotacion && 
                                       Array.isArray(galeriaInfo.imagenes_rotacion) && 
                                       galeriaInfo.imagenes_rotacion.length > 0;
    
    if (tieneRotacionPersonalizada) {
        // Usar las imágenes de rotación personalizadas
        imagenesParaRotacion = galeriaInfo.imagenes_rotacion;
    } else if (galeriaInfo && galeriaInfo.imagenes && Array.isArray(galeriaInfo.imagenes) && galeriaInfo.imagenes.length > 1) {
        // Si no tiene rotación personalizada, usar las primeras imágenes del array imagenes
        // Usamos hasta 5 imágenes o menos si hay menos disponibles
        const maxImagenesRotacion = Math.min(5, galeriaInfo.imagenes.length);
        for (let i = 0; i < maxImagenesRotacion; i++) {
            imagenesParaRotacion.push(galeriaInfo.imagenes[i].url);
        }
    }
    
    // Iniciar rotación automática si hay imágenes para rotar
    if (imagenesParaRotacion.length > 1) {
        let indiceRotacion = 0;
        const imagenPortadaOriginal = galeriaInfo.imagen;
        
        // Mostrar la primera imagen de rotación inmediatamente
        actualizarImagenPortada(imagenesParaRotacion[0]);
        
        // Rotar cada 2.5 segundos
        intervaloRotacionPortada = setInterval(() => {
            indiceRotacion = (indiceRotacion + 1) % imagenesParaRotacion.length;
            actualizarImagenPortada(imagenesParaRotacion[indiceRotacion]);
        }, 2500);
    }
    
    const mangaSection = document.getElementById('manga-section');
    mangaSection.innerHTML = crearGaleriaUI(galeriaInfo);
    
    const botonVolver = crearBotonVolver(() => {
        // Detener rotación al salir de la galería
        if (intervaloRotacionPortada) {
            clearInterval(intervaloRotacionPortada);
            intervaloRotacionPortada = null;
        }
        cargarSubcontenedoresGaleria(contenedor);
    });
    mangaSection.insertBefore(botonVolver, mangaSection.firstChild);
}

function actualizarImagenPortada(nuevaUrl) {
    // Buscar la imagen de portada de la galería actual usando el data-key
    const claveBusqueda = contenedorActual + '_' + subcontenedorActual;
    const imgElement = document.querySelector(`.subcontenedor-img[data-key="${claveBusqueda}"]`);
    if (imgElement) {
        imgElement.style.backgroundImage = `url('${nuevaUrl}')`;
    }
}

// 6. Crear UI de la galería con vista en grande
function crearGaleriaUI(galeriaInfo) {
    let html = `
        <div class="galeria-container" style="max-width: 1200px; margin: 0 auto; padding: 20px;">
            <h2 style="text-align: center; color: #FFD166; margin-bottom: 10px;">${galeriaInfo.titulo}</h2>
            <p style="text-align: center; opacity: 0.8; margin-bottom: 30px;">${galeriaInfo.descripcion}</p>
            
            <div style="background: rgba(255, 20, 147, 0.1); border-radius: 15px; padding: 20px; margin-bottom: 30px; border-left: 5px solid #FF1493;">
                <p style="text-align: center; color: #FFD166; font-size: 1.1rem;">
                    📦 ${galeriaInfo.imagenes.length} imágenes • Categoría: ${galeriaInfo.categoria}
                </p>
                <p style="text-align: center; opacity: 0.8; margin-top: 10px; font-size: 0.9rem;">
                    Haz clic en cualquier imagen para verla en tamaño completo
                </p>
            </div>
            
            <!-- GALERÍA DE IMÁGENES -->
            <div id="galeria-grid" class="galeria-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
    `;
    
    // Miniaturas
    galeriaInfo.imagenes.forEach((img, index) => {
        html += `
            <div class="galeria-item" onclick="mostrarImagenGrande(${index})" style="cursor: pointer; overflow: hidden; border-radius: 12px; border: 3px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease;">
                <img src="${img.url}" alt="Imagen ${img.id}" style="width: 100%; height: 200px; object-fit: cover; transition: transform 0.3s ease;">
                <div style="padding: 10px; text-align: center; background: rgba(0, 0, 0, 0.5);">
                    <p style="color: #FFD166; font-size: 0.9rem;">Imagen ${img.id}</p>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
            
            <!-- VISOR DE IMAGEN GRANDE (OCULTO INICIALMENTE) -->
            <div id="visor-grande" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); z-index: 9999; align-items: center; justify-content: center; flex-direction: column;">
                <button onclick="cerrarVisor()" style="position: absolute; top: 20px; right: 20px; background: #FF1493; color: white; border: none; padding: 12px 25px; border-radius: 50px; font-size: 1.1rem; cursor: pointer; z-index: 10001; border: 2px solid white;">
                    ✕ Cerrar
                </button>
                
                <div style="max-width: 90%; max-height: 80%; margin-top: 60px;">
                    <img id="imagen-grande" src="" style="max-width: 100%; max-height: 100%; border-radius: 15px; box-shadow: 0 20px 50px rgba(0,0,0,0.7); border: 5px solid #FF1493;">
                </div>
                
                <div style="margin-top: 30px; display: flex; gap: 20px; align-items: center;">
                    <button onclick="imagenAnterior()" class="control-btn" style="background: #5864F5; padding: 12px 25px; border-radius: 50px; border: none; color: white; font-size: 1rem; cursor: pointer;">
                        ◀ Anterior
                    </button>
                    
                    <div id="contador-imagen" style="color: #FFD166; font-size: 1.2rem; font-weight: bold; min-width: 100px; text-align: center;">
                        1 / ${galeriaInfo.imagenes.length}
                    </div>
                    
                    <button onclick="imagenSiguiente()" class="control-btn" style="background: #FF1493; padding: 12px 25px; border-radius: 50px; border: none; color: white; font-size: 1rem; cursor: pointer;">
                        Siguiente ▶
                    </button>
                </div>
            </div>
            
            <style>
                .galeria-item:hover {
                    transform: translateY(-8px) scale(1.05);
                    border-color: #FF1493 !important;
                    box-shadow: 0 15px 30px rgba(255, 20, 147, 0.3) !important;
                }
                
                .galeria-item:hover img {
                    transform: scale(1.1);
                }
            </style>
        </div>
    `;
    
    return html;
}

// ================================================
// FUNCIONES PARA EL VISOR DE IMAGEN GRANDE
// ================================================

let galeriaActual = null;
let indiceImagenActual = 0;

function mostrarImagenGrande(indice) {
    const galeriaInfo = obtenerGaleria(contenedorActual, subcontenedorActual);
    if (!galeriaInfo) return;
    
    galeriaActual = galeriaInfo.imagenes;
    indiceImagenActual = indice;
    
    const visor = document.getElementById('visor-grande');
    const imagenGrande = document.getElementById('imagen-grande');
    const contador = document.getElementById('contador-imagen');
    
    if (visor && imagenGrande && contador) {
        imagenGrande.src = galeriaActual[indice].url;
        contador.textContent = `${indice + 1} / ${galeriaActual.length}`;
        visor.style.display = 'flex';
        
        // NO iniciar carrusel automático - solo mostrar la imagen estática
        // El carrusel automático ahora solo funciona en la portada de la galería
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
}

function cerrarVisor() {
    const visor = document.getElementById('visor-grande');
    if (visor) {
        visor.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Detener carrusel al cerrar
        detenerCarruselAutomatico();
    }
}

// ================================================
// CARRUSEL AUTOMÁTICO CON ORDEN ALEATORIO
// ================================================

function iniciarCarruselAutomatico() {
    if (!galeriaActual || galeriaActual.length < 2) return;
    
    // Obtener la galería completa para verificar si tiene imagenes_rotacion
    const galeriaInfo = obtenerGaleria(contenedorActual, subcontenedorActual);
    
    // Verificar si hay imágenes de rotación personalizadas
    const tieneRotacionPersonalizada = galeriaInfo && 
                                       galeriaInfo.imagenes_rotacion && 
                                       Array.isArray(galeriaInfo.imagenes_rotacion) && 
                                       galeriaInfo.imagenes_rotacion.length > 0;
    
    // Determinar qué imágenes usar para el carrusel
    let imagenesParaCarrusel = [];
    let usaRotacionPersonalizada = false;
    
    if (tieneRotacionPersonalizada) {
        // Usar las imágenes de rotación personalizadas
        for (let i = 0; i < galeriaInfo.imagenes_rotacion.length; i++) {
            imagenesParaCarrusel.push({
                url: galeriaInfo.imagenes_rotacion[i],
                esPersonalizada: true
            });
        }
        usaRotacionPersonalizada = true;
    } else {
        // Si no tiene rotación personalizada, usar las imágenes secundarias de la galería
        for (let i = 1; i < galeriaActual.length; i++) {
            imagenesParaCarrusel.push({
                url: galeriaActual[i].url,
                indice: i,
                esPersonalizada: false
            });
        }
        usaRotacionPersonalizada = false;
    }
    
    // Detener cualquier intervalo existente
    detenerCarruselAutomatico();
    
    // Reiniciar estado
    esPrimeraImagenPrincipal = true;
    imagenesRestantes = [...imagenesParaCarrusel]; // Copiar el array
    
    // Esperar 2.5 segundos en la imagen principal antes de empezar el carrusel
    setTimeout(() => {
        if (document.getElementById('visor-grande')?.style.display !== 'flex') return;
        
        // Función para cambiar imagen
        const cambiarImagen = () => {
            if (document.getElementById('visor-grande')?.style.display !== 'flex') {
                detenerCarruselAutomatico();
                return;
            }
            
            if (esPrimeraImagenPrincipal && imagenesRestantes.length > 0) {
                // Primera transición: salir de la imagen principal
                esPrimeraImagenPrincipal = false;
                seleccionarYMostrarImagenAleatoria(usaRotacionPersonalizada);
            } else if (imagenesRestantes.length > 0) {
                // Mostrar siguiente imagen aleatoria
                seleccionarYMostrarImagenAleatoria(usaRotacionPersonalizada);
            } else {
                // Todas las imágenes mostradas, volver a la principal y reiniciar
                esPrimeraImagenPrincipal = true;
                indiceImagenActual = 0;
                actualizarVisor();
                
                // Reiniciar lista de imágenes restantes
                imagenesRestantes = [...imagenesParaCarrusel];
            }
        };
        
        // Ejecutar el primer cambio después del tiempo inicial
        cambiarImagen();
        
        // Luego continuar cambiando cada 2-3 segundos (aleatorio entre 2000 y 3000 ms)
        const programarSiguienteCambio = () => {
            if (document.getElementById('visor-grande')?.style.display !== 'flex') {
                detenerCarruselAutomatico();
                return;
            }
            const tiempoAleatorio = Math.floor(Math.random() * 1000) + 2000;
            intervaloCarrusel = setTimeout(() => {
                cambiarImagen();
                programarSiguienteCambio();
            }, tiempoAleatorio);
        };
        
        programarSiguienteCambio();
    }, 2500); // Esperar 2.5 segundos iniciales en la imagen principal
}

function seleccionarYMostrarImagenAleatoria(tieneRotacionPersonalizada) {
    if (imagenesRestantes.length === 0) return;
    
    // Seleccionar índice aleatorio de la lista restante
    const indiceAleatorio = Math.floor(Math.random() * imagenesRestantes.length);
    const imagenSeleccionada = imagenesRestantes[indiceAleatorio];
    
    // Remover la imagen seleccionada de la lista de restantes
    imagenesRestantes.splice(indiceAleatorio, 1);
    
    // Actualizar el visor
    const imagenGrande = document.getElementById('imagen-grande');
    const contador = document.getElementById('contador-imagen');
    
    if (imagenGrande && contador && galeriaActual) {
        if (tieneRotacionPersonalizada) {
            // Usar URL personalizada directamente
            imagenGrande.src = imagenSeleccionada.url;
            contador.textContent = `Rotación / ${galeriaActual.length}`;
        } else {
            // Usar índice del array original
            indiceImagenActual = imagenSeleccionada.indice;
            imagenGrande.src = galeriaActual[indiceImagenActual].url;
            contador.textContent = `${indiceImagenActual + 1} / ${galeriaActual.length}`;
        }
    }
}

function actualizarVisor() {
    const imagenGrande = document.getElementById('imagen-grande');
    const contador = document.getElementById('contador-imagen');
    
    if (imagenGrande && contador && galeriaActual) {
        imagenGrande.src = galeriaActual[indiceImagenActual].url;
        contador.textContent = `${indiceImagenActual + 1} / ${galeriaActual.length}`;
    }
}

function detenerCarruselAutomatico() {
    if (intervaloCarrusel) {
        clearTimeout(intervaloCarrusel);
        intervaloCarrusel = null;
    }
}

function imagenAnterior() {
    // Detener carrusel cuando el usuario interactúa manualmente
    detenerCarruselAutomatico();
    
    if (!galeriaActual || galeriaActual.length === 0) return;
    
    indiceImagenActual--;
    if (indiceImagenActual < 0) {
        indiceImagenActual = galeriaActual.length - 1;
    }
    
    const imagenGrande = document.getElementById('imagen-grande');
    const contador = document.getElementById('contador-imagen');
    
    if (imagenGrande && contador) {
        imagenGrande.src = galeriaActual[indiceImagenActual].url;
        contador.textContent = `${indiceImagenActual + 1} / ${galeriaActual.length}`;
    }
}

function imagenSiguiente() {
    // Detener carrusel cuando el usuario interactúa manualmente
    detenerCarruselAutomatico();
    
    if (!galeriaActual || galeriaActual.length === 0) return;
    
    indiceImagenActual++;
    if (indiceImagenActual >= galeriaActual.length) {
        indiceImagenActual = 0;
    }
    
    const imagenGrande = document.getElementById('imagen-grande');
    const contador = document.getElementById('contador-imagen');
    
    if (imagenGrande && contador) {
        imagenGrande.src = galeriaActual[indiceImagenActual].url;
        contador.textContent = `${indiceImagenActual + 1} / ${galeriaActual.length}`;
    }
}

// ================================================
// FUNCIÓN AUXILIAR PARA CREAR BOTÓN VOLVER
// ================================================

function crearBotonVolver(funcionVolver) {
    const boton = document.createElement('button');
    boton.textContent = '← Volver';
    boton.style.cssText = `
        background: linear-gradient(135deg, #FF1493, #FF69B4);
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 50px;
        font-size: 1rem;
        cursor: pointer;
        margin: 20px;
        font-weight: bold;
        border: 2px solid white;
        transition: transform 0.3s ease;
    `;
    boton.onmouseover = () => boton.style.transform = 'scale(1.05)';
    boton.onmouseout = () => boton.style.transform = 'scale(1)';
    boton.onclick = funcionVolver;
    return boton;
}

// ================================================
// INICIALIZACIÓN
// ================================================

console.log('📦 Sistema de Galería cargado correctamente');
console.log('📁 Contenedores disponibles: 13');
console.log('📂 Sub-galerías disponibles: ' + Object.keys(galeriaDatabase).length);

