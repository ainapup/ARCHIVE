/* =========================================
   ARCHIVE — PLACES
========================================= */

const projectGrid =
  document.querySelector(
    ".project-grid"
  );

const filterButtons =
  document.querySelectorAll(
    ".filter-button"
  );


let allProjects = [];
let activeType = "ALL";


/* =========================================
   URL FILTERS
========================================= */

const params =
  new URLSearchParams(
    window.location.search
  );

const architectFilter =
  params.get("architect");

const countryFilter =
  params.get("country");


/* =========================================
   INITIALISE
========================================= */

async function initPlaces() {

  allProjects =
    await loadProjects();


  renderProjects();

}


initPlaces();


/* =========================================
   FILTER BUTTONS
========================================= */

filterButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        activeType =
          button.dataset.filter ||
          button.textContent
            .trim()
            .toUpperCase();


        filterButtons.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );


        renderProjects();

      }
    );

  }
);


/* =========================================
   RENDER
========================================= */

function renderProjects() {

  if (!projectGrid) {
    return;
  }


  projectGrid.innerHTML = "";


  let projects =
    [...allProjects];


  /* TYPE */

  if (
    activeType !== "ALL"
  ) {

    projects =
      projects.filter(
        project =>
          project.type ===
          activeType
      );

  }


  /* ARCHITECT */

  if (architectFilter) {

    projects =
      projects.filter(
        project =>

          getProjectArchitects(
            project
          )
            .some(
              architect =>
                architect.name ===
                architectFilter
            )
      );

  }


  /* COUNTRY */

  if (countryFilter) {

    projects =
      projects.filter(
        project =>
          project.country ===
          countryFilter
      );

  }


  projects.forEach(
    (project, index) => {

      const image =
        project.images &&
        project.images.length > 0
          ? project.images[0]
          : "";


      const architectNames =
        getProjectArchitectNames(
          project
        );


      const article =
        document.createElement(
          "article"
        );


      article.className =
        "project";


      article.innerHTML = `

        <a
          class="project-link"
          href="project.html?id=${encodeURIComponent(project.id)}"
        >

          <div class="project-image">

            ${
              image
                ? `
                  <img
                    src="${image}"
                    alt="${project.title}"
                    loading="lazy"
                  >
                `
                : ""
            }


            <span class="project-number">
              ${String(index + 1).padStart(2, "0")}
            </span>

          </div>


          <div class="project-info">

            <h2>
              ${project.title}
            </h2>

            <p>
              ${architectNames}
            </p>

            <div class="project-meta">

              <span>
                ${project.city},
                ${project.country}
              </span>

              <span>
                ${project.type}
              </span>

            </div>

          </div>

        </a>

      `;


      projectGrid.appendChild(
        article
      );

    }
  );

}
