// Projects Grid Dynamic render from json
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#projects-container");

  fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
      let projectHTML = "";

      projects.forEach((project) => {
        projectHTML += `
          <div class="grid-item ${project.filterClass}">
            <article data-bs-target="#modal-${project.id}" data-bs-toggle="modal">
              <img class="img-item" src="${project.image}" alt="${project.title}">
              <h6 class="title text-center pt-4 fs-5">${project.title}</h6>
            </article>
            <div class="text-center">
              <a class="ver-proyecto" data-bs-target="#modal-${project.id}" data-bs-toggle="modal">
                Ver proyecto
              </a>
            </div>
          </div>

          <!-- Modal -->
          <div class="modal fade" id="modal-${project.id}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-fullscreen">
              <div class="modal-content pt-100 bkg-grey">
                <div class="modal-body">
                  <div class="custom-container pt-5 pb-5">
                    <div class="d-flex justify-content-end">
                      <button type="button" class="close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="row pt-3">
                      <div class="col-12 col-xl-6 pr-50">
                        <h2 class="title negro-branding">${project.title}</h2>
                        <h2 class="subtitle rojo-branding mb-5 mt-3">${project.subtitle}</h2>
                        <p class="modal-description blue-branding">${project.description}</p>
                      </div>
                      <div class="col-12 col-xl-6">
                        <div class="swiper mySwiper" id="swiper-${project.id}">
                          <div class="swiper-wrapper">
                            ${project.sliderImages.map(image => `
                              <div class="swiper-slide">
                                <img class="img-sliders rounded" src="${image}" alt="${project.title}">
                              </div>`).join("")}
                          </div>
                          <div class="swiper-pagination"></div>
                          <div class="swiper-button-next"></div>
                          <div class="swiper-button-prev"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      });

      container.innerHTML = projectHTML; // Insertamos todo de una vez

      // Asegurarse de que todas las tarjetas sean visibles por defecto
      const items = document.querySelectorAll(".grid-item");
      items.forEach((item) => item.classList.add("show"));

      // Inicializar Swiper para cada modal después de renderizar
      projects.forEach(project => {
        new Swiper(`#swiper-${project.id}`, {
          loop: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      });

      // Filtrado con Vanilla JS
      const filterButtons = document.querySelectorAll(".filter-button-group button");
      filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const filterValue = this.getAttribute("data-filter");
          const items = document.querySelectorAll(".grid-item");

          items.forEach((item) => {
            if (filterValue === "*" || item.classList.contains(filterValue.substring(1))) {
              item.classList.remove("hide");
              setTimeout(() => item.classList.add("show"), 10); // Agregar clase `show` con un pequeño retraso
            } else {
              item.classList.remove("show");
              setTimeout(() => item.classList.add("hide"), 300); // Agregar clase `hide` después de la transición
            }
          });

          // Actualizar la clase activa en los botones
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          this.classList.add("active");
        });
      });
    })
    .catch((error) => console.error("Error loading projects:", error));
});


// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
  // Obtener el botón del menú hamburguesa
  var navbarToggler = document.querySelector('.navbar-toggler');

  // Obtener todos los enlaces del menú
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  // Agregar un controlador de eventos clic a cada enlace del menú
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Verificar si el menú hamburguesa está abierto
      if (navbarToggler.getAttribute('aria-expanded') === 'true') {
        // Cerrar el menú hamburguesa
        navbarToggler.click();
      }
    });
  });

});


// Función para cambiar el elemento activo en el menú
function setActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navbarItems = document.querySelectorAll(".navbar-nav .nav-item");

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (window.scrollY >= sectionTop - sectionHeight / 4) {
      navbarItems.forEach(item => {
        item.classList.remove("active");
      });

      const activeItem = document.querySelector(`.navbar-nav .nav-item a[href="#${sectionId}"]`);
      if (activeItem) {
        activeItem.parentElement.classList.add("active");
      }
    }
  });
}

// Evento de desplazamiento para cambiar el elemento activo en el menú
window.addEventListener("scroll", setActiveNav);
window.addEventListener("DOMContentLoaded", setActiveNav);
