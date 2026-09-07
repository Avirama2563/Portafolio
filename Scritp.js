// Todas las interacciones respetan prefers-reduced-motion a través del CSS.

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Barra de progreso de lectura */
  const barraLectura = document.getElementById('progresoLectura');

  function actualizarProgresoLectura() {
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const avance = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
    barraLectura.style.width = avance + '%';
  }

  window.addEventListener('scroll', actualizarProgresoLectura, { passive: true });
  actualizarProgresoLectura();

  /* 2. Menú móvil */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const abierto = navLinks.classList.toggle('nav__links--abierto');
    navToggle.setAttribute('aria-expanded', abierto);
  });

  navLinks.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--abierto');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* 3. Resaltar el enlace de navegación según la sección visible */
  const secciones = document.querySelectorAll('main section[id]');
  const enlacesNav = document.querySelectorAll('.nav__links a');

  const observadorSecciones = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const id = entrada.target.getAttribute('id');
          enlacesNav.forEach((enlace) => {
            enlace.classList.toggle('activo', enlace.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  secciones.forEach((seccion) => observadorSecciones.observe(seccion));

  /* 4. Animar las barras de habilidades al entrar en pantalla */
  const barrasHabilidad = document.querySelectorAll('.skill__barra');

  const observadorHabilidades = new IntersectionObserver(
    (entradas, observador) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const barra = entrada.target;
          const porcentaje = barra.getAttribute('data-pct') || '0';
          barra.style.width = porcentaje + '%';
          observador.unobserve(barra);
        }
      });
    },
    { threshold: 0.4 }
  );

  barrasHabilidad.forEach((barra) => observadorHabilidades.observe(barra));

  /* 5. Revelar suavemente el encabezado de cada sección la primera vez que aparece */
  const encabezados = document.querySelectorAll('.bloque h2, .acerca h2');

  const observadorEncabezados = new IntersectionObserver(
    (entradas, observador) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('titulo--visible');
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  encabezados.forEach((titulo) => observadorEncabezados.observe(titulo));

});