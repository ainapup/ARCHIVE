/* =========================================
   ARCHIVE — GLOBAL SEARCH
========================================= */

const searchInput =
  document.querySelector(
    "#global-search-input"
  );

const searchResults =
  document.querySelector(
    "#search-results"
  );


let projects = [];
let architects = [];


/* =========================================
   INITIALISE
========================================= */

async function initSearch() {

  projects =
    await loadProjects();

  architects =
    await loadArchitects();

}


initSearch();


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
  "input",
  () => {

    const query =
      searchInput
        .value
        .trim()
        .toLowerCase();


    if (!query) {

      searchResults.innerHTML = `

        <div class="search-empty-state">

          Search the archive by place,
          architect or destination.

        </div>

      `;

      return;

    }


    renderResults(
      query
    );

  }
);


/* =========================================
   RESULTS
========================================= */

function renderResults(
  query
) {

  const matchingProjects =
    projects.filter(
      project => {

        const architectNames =
          getProjectArchitectNames(
            project
          );


        const searchableText = `

          ${project.title || ""}

          ${architectNames}

          ${project.city || ""}

          ${project.country || ""}

          ${project.continent || ""}

          ${project.type || ""}

          ${project.description || ""}

        `
        .toLowerCase();


        return searchableText.includes(
          query
        );

      }
    );


  const matchingArchitects =
    architects.filter(
      architect => {

        const searchableText = `

          ${architect.name || ""}

          ${architect.category || ""}

          ${architect.location || ""}

          ${architect.description || ""}

        `
        .toLowerCase();


        return searchableText.includes(
          query
        );

      }
    );


  const destinationMap = {};


  projects.forEach(
    project => {

      if (
        !destinationMap[
          project.country
        ]
      ) {

        destinationMap[
          project.country
        ] = {

          country:
            project.country,

          continent:
            project.continent,

          image:
            project.images &&
            project.images.length > 0
              ? project.images[0]
              : ""

        };

      }

    }
  );


  const matchingDestinations =
    Object.values(
      destinationMap
    )
      .filter(
        destination => {

          const searchableText = `

            ${destination.country || ""}

            ${destination.continent || ""}

          `
          .toLowerCase();


          return searchableText.includes(
            query
          );

        }
      );


  if (
    matchingProjects.length === 0 &&
    matchingArchitects.length === 0 &&
    matchingDestinations.length === 0
  ) {

    searchResults.innerHTML = `

      <div class="search-no-results">

        No results for
        “${escapeHtml(query)}”.

      </div>

    `;

    return;

  }


  searchResults.innerHTML = `

    ${
      matchingProjects.length > 0
        ? renderPlaces(
            matchingProjects
          )
        : ""
    }

    ${
      matchingArchitects.length > 0
        ? renderArchitectResults(
            matchingArchitects
          )
        : ""
    }

    ${
      matchingDestinations.length > 0
        ? renderDestinationResults(
            matchingDestinations
          )
        : ""
    }

  `;

}


/* =========================================
   PLACES
========================================= */

function renderPlaces(
  results
) {

  const cards =
    results
      .map(
        project => {

          const image =
            project.images &&
            project.images.length > 0
              ? project.images[0]
              : "";


          const architectNames =
            getProjectArchitectNames(
              project
            );


          return `

            <article class="search-place">

              <a
                href="project.html?id=${encodeURIComponent(project.id)}"
              >

                <div class="search-place-image">

                  ${
                    image
                      ? `
                        <img
                          src="${image}"
                          alt="${project.title}"
                        >
                      `
                      : ""
                  }

                </div>


                <div class="search-place-info">

                  <strong>
                    ${project.title}
                  </strong>

                  <span>
                    ${architectNames}
                  </span>

                  <span>
                    ${project.city},
                    ${project.country}
                  </span>

                </div>

              </a>

            </article>

          `;

        }
      )
      .join("");


  return `

    <section class="search-result-section">

      <div class="search-result-header">

        <h2>
          Places
        </h2>

        <span>
          ${String(results.length).padStart(2, "0")}
        </span>

      </div>


      <div class="search-places-grid">
        ${cards}
      </div>

    </section>

  `;

}


/* =========================================
   ARCHITECTS
========================================= */

function renderArchitectResults(
  results
) {

  const rows =
    results
      .map(
        architect => `

          <a
            class="search-text-row"
            href="architect.html?id=${encodeURIComponent(architect.id)}"
          >

            <span>
              ${architect.name}
            </span>

            <small>
              ${architect.location || ""}
            </small>

          </a>

        `
      )
      .join("");


  return `

    <section class="search-result-section">

      <div class="search-result-header">

        <h2>
          Architects
        </h2>

        <span>
          ${String(results.length).padStart(2, "0")}
        </span>

      </div>

      <div>
        ${rows}
      </div>

    </section>

  `;

}


/* =========================================
   DESTINATIONS
========================================= */

function renderDestinationResults(
  results
) {

  const rows =
    results
      .map(
        destination => `

          <a
            class="search-text-row"
            href="destination.html?country=${encodeURIComponent(destination.country)}"
          >

            <span>
              ${destination.country}
            </span>

            <small>
              ${destination.continent}
            </small>

          </a>

        `
      )
      .join("");


  return `

    <section class="search-result-section">

      <div class="search-result-header">

        <h2>
          Destinations
        </h2>

        <span>
          ${String(results.length).padStart(2, "0")}
        </span>

      </div>

      <div>
        ${rows}
      </div>

    </section>

  `;

}


/* =========================================
   SAFE TEXT
========================================= */

function escapeHtml(
  text
) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    text;

  return div.innerHTML;

}
