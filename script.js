// Datos de ejemplo - En la práctica, estos datos se cargarían desde un archivo JSON
const actividades = [
    { 
        id: 1, 
        fecha: "2023-10-15", 
        titulo: "Feria de Arte Local", 
        descripcion: "Exposición de artistas locales en el centro cultural. Ven a disfrutar de obras de pintura, escultura y fotografía.", 
        categoria: "cultura",
        ubicacion: "Centro Cultural Municipal",
        imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: 2, 
        fecha: "2023-10-22", 
        titulo: "Maratón Ciudad", 
        descripcion: "Carrera de 10k por el centro de la ciudad. Inscripciones abiertas para todas las edades.", 
        categoria: "deportes",
        ubicacion: "Parque Central",
        imagen: "https://images.unsplash.com/photo-1530137073520-2a7b4c1c38c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: 3, 
        fecha: "2023-11-05", 
        titulo: "Taller de Fotografía", 
        descripcion: "Aprende técnicas profesionales de fotografía con nuestro instructor certificado.", 
        categoria: "educacion",
        ubicacion: "Aula Magna, Universidad",
        imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: 4, 
        fecha: "2023-11-12", 
        titulo: "Concierto de Otoño", 
        descripcion: "Disfruta de la banda local en el anfiteatro. Música en vivo para todos los gustos.", 
        categoria: "cultura",
        ubicacion: "Anfiteatro Municipal",
        imagen: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: 5, 
        fecha: "2023-11-20", 
        titulo: "Feria de Empleo", 
        descripcion: "Conecta con empresas locales y encuentra oportunidades laborales. Trae tu CV.", 
        categoria: "social",
        ubicacion: "Centro de Convenciones",
        imagen: "https://images.unsplash.com/photo-1581578021517-5d8ad8597852?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: 6, 
        fecha: "2023-12-03", 
        titulo: "Torneo de Voleibol", 
        descripcion: "Competencia abierta para todos los niveles. Premios para los primeros lugares.", 
        categoria: "deportes",
        ubicacion: "Polideportivo Municipal",
        imagen: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: 7, 
        fecha: "2023-12-10", 
        titulo: "Charla sobre Sostenibilidad", 
        descripcion: "Aprende cómo vivir de manera más sostenible y reducir tu huella ecológica.", 
        categoria: "educacion",
        ubicacion: "Biblioteca Central",
        imagen: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: 8, 
        fecha: "2023-12-15", 
        titulo: "Mercado Navideño", 
        descripcion: "Productos artesanales y comida para las fiestas. Ideal para compras navideñas.", 
        categoria: "social",
        ubicacion: "Plaza Principal",
        imagen: "https://images.unsplash.com/photo-1574359173084-bfcee66c2c2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar la fecha de actualización
    document.getElementById('fecha-actualizacion').textContent = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Inicializar el calendario
    inicializarCalendario();
    
    // Configurar el modo oscuro
    configurarModoOscuro();
    
    // Configurar el botón de scroll to top
    configurarScrollTop();
});

// Función para formatear fechas
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para inicializar el calendario
function inicializarCalendario() {
    // Mostrar todas las actividades al cargar
    mostrarActividades(actividades);
    
    // Configurar filtros de categorías
    configurarFiltros();
    
    // Configurar buscador
    configurarBuscador();
}

// Función para mostrar actividades en el calendario
function mostrarActividades(actividadesMostrar) {
    const contenedor = document.getElementById('contenedor-actividades');
    contenedor.innerHTML = '';
    
    if (actividadesMostrar.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-calendar-times fa-3x mb-3"></i>
                <h3>No hay actividades que coincidan con tu búsqueda</h3>
                <p>Intenta con otros términos o reinicia los filtros</p>
            </div>
        `;
        return;
    }
    
    // Ordenar actividades por fecha
    actividadesMostrar.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    // Crear elementos HTML para cada actividad
    actividadesMostrar.forEach(actividad => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        
        col.innerHTML = `
            <div class="tarjeta-actividad" data-categoria="${actividad.categoria}">
                <div class="categoria">${actividad.categoria}</div>
                <h3 class="h5">${actividad.titulo}</h3>
                <div class="fecha">
                    <i class="fas fa-calendar-day"></i>
                    ${formatearFecha(actividad.fecha)}
                </div>
                <div class="ubicacion">
                    <i class="fas fa-map-marker-alt"></i>
                    ${actividad.ubicacion}
                </div>
                <p class="mt-2">${actividad.descripcion}</p>
                <div class="text-center">
                    <img src="${actividad.imagen}" alt="${actividad.titulo}" class="img-fluid rounded">
                </div>
            </div>
        `;
        
        contenedor.appendChild(col);
    });
}

// Configurar los filtros por categoría
function configurarFiltros() {
    const contenedorFiltros = document.getElementById('filtros-categorias');
    
    // Obtener todas las categorías únicas
    const categorias = [...new Set(actividades.map(actividad => actividad.categoria))];
    
    // Añadir el botón "Todas"
    const btnTodas = document.createElement('button');
    btnTodas.className = 'btn-filtro activo';
    btnTodas.textContent = 'Todas';
    btnTodas.dataset.categoria = 'todas';
    contenedorFiltros.appendChild(btnTodas);
    
    // Crear botones para cada categoría
    categorias.forEach(categoria => {
        const boton = document.createElement('button');
        boton.className = 'btn-filtro';
        boton.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        boton.dataset.categoria = categoria;
        contenedorFiltros.appendChild(boton);
    });
    
    // Añadir event listeners a los botones
    document.querySelectorAll('.btn-filtro').forEach(boton => {
        boton.addEventListener('click', function() {
            // Quitar clase activa de todos los botones
            document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('activo'));
            // Añadir clase activa al botón clickeado
            this.classList.add('activo');
            
            const categoria = this.dataset.categoria;
            
            if (categoria === 'todas') {
                mostrarActividades(actividades);
            } else {
                const actividadesFiltradas = actividades.filter(act => act.categoria === categoria);
                mostrarActividades(actividadesFiltradas);
            }
        });
    });
}

// Configurar el buscador
function configurarBuscador() {
    const buscador = document.getElementById('buscador');
    
    buscador.addEventListener('input', function() {
        const texto = this.value.toLowerCase();
        
        if (texto.length === 0) {
            // Si no hay texto, mostrar todas las actividades
            const filtroActivo = document.querySelector('.btn-filtro.activo');
            if (filtroActivo.dataset.categoria === 'todas') {
                mostrarActividades(actividades);
            } else {
                const actividadesFiltradas = actividades.filter(act => 
                    act.categoria === filtroActivo.dataset.categoria
                );
                mostrarActividades(actividadesFiltradas);
            }
        } else {
            // Filtrar actividades por texto de búsqueda
            const actividadesFiltradas = actividades.filter(actividad => 
                actividad.titulo.toLowerCase().includes(texto) ||
                actividad.descripcion.toLowerCase().includes(texto) ||
                actividad.categoria.toLowerCase().includes(texto) ||
                actividad.ubicacion.toLowerCase().includes(texto)
            );
            
            mostrarActividades(actividadesFiltradas);
        }
    });
}

// Configurar el modo oscuro
function configurarModoOscuro() {
    const toggleOscuro = document.getElementById('modoOscuro');
    const body = document.body;
    
    // Comprobar preferencia del usuario
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefiereOscuro) {
        body.setAttribute('data-tema', 'oscuro');
        toggleOscuro.checked = true;
    }
    
    // Alternar modo oscuro al cambiar el toggle
    toggleOscuro.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-tema', 'oscuro');
        } else {
            body.removeAttribute('data-tema');
        }
    });
}

// Configurar el botón de scroll to top
function configurarScrollTop() {
    const btnScrollTop = document.getElementById('btnScrollTop');
    
    // Mostrar u ocultar el botón según la posición de scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            btnScrollTop.style.display = 'block';
        } else {
            btnScrollTop.style.display = 'none';
        }
    });
    
    // Scroll suave al hacer clic en el botón
    btnScrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}