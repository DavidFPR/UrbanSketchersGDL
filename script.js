document.addEventListener('DOMContentLoaded', function () {
  const heroe = document.querySelector('#hero');

  const ctaFlotante = document.querySelector('.btn-flotante');
  const formulario = document.querySelector('#formulario');
  const footer = document.querySelector('#footer');

  let heroeVisible = true;
  let ocultadoPorUsuario = false;

  // Declare observer variable globally so we can disconnect it
  let observador;

  function crearObservador() {
    observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          heroeVisible = entrada.isIntersecting;

          // Only show button automatically if it was not manually hidden
          if (heroeVisible || ocultadoPorUsuario) {
            ctaFlotante.classList.remove('show');
          } else {
            ctaFlotante.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroe) {
      observador.observe(heroe);
    }

    if (footer) {
      observador.observe(footer);
    }
  }

  crearObservador();

  // Handle button click
  ctaFlotante.addEventListener('click', () => {
    ocultadoPorUsuario = true;
    ctaFlotante.classList.remove('show');

    // Scroll to form
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth' });

      // Optionally reconnect observer after scroll finishes if needed
      setTimeout(() => {
        crearObservador();
      }, 50); // Adjust if needed based on scroll time
    }
  });

  window.addEventListener('scroll', () => {
    if (!heroeVisible) {
      ctaFlotante.classList.add('show');
    }
  });
});
