/* =========================================
   ARCHIVE — GLOBAL SEARCH
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const searchInput =
  document.querySelector(
    "#global-search-input"
  );


const searchResults =
  document.querySelector(
    "#search-results"
  );


const searchResultTotal =
  document.querySelector(
    "#search-result-total"
  );


const searchClear =
  document.querySelector(
    "#search-clear"
  );



/* =========================================
   DATA
========================================= */

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

    updateClearButton();

    performSearch();

  }
);



/* =========================================
   CLEAR SEARCH
========================================= */

searchClear.addEventListener(
  "click",
  () => {

    searchInput.value = "";

    searchInput.focus();

    updateClearButton();

    resetSearch();

  }
);



/* =========================================
   CLEAR BUTTON STATE
========================================= */

function updateClearButton() {

  if (
    searchInput.value.trim()
  ) {

    searchClear.classList.add(
      "visible"
    );

  } else {

    searchClear.classList.remove(
      "visible"
    );

  }

}



/* =========================================
   PERFORM SEARCH
========================================= */

function performSearch() {

  const query =
    searchInput
      .value
      .trim()
      .toLowerCase();


  if (!query) {

    resetSearch();

    return;

  }


  renderResults(
    query
  );

}



/* =========================================
   RESET
========================================= */

function resetSearch() {

  searchResultTotal.textContent =
    "00 RESULTS";


  searchResults.innerHTML = `

    <div class="search-empty-state">

      Search the archive by place,
      architect or destination.

    </div>

  `;

}



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

      if (!project.country) {
        return;
      }


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

          count: 0

        };

      }


      destinationMap[
        project.country
      ].count++;

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


  const totalResults =
    matchingProjects.length +
    matchingArchitects.length +
    matchingDestinations.length;


  searchResultTotal.textContent =
    `${String(totalResults).padStart(2, "0")} ${
      totalResults === 1
        ? "RESULT"
        : "RESULTS"
    }`;


  if (
    totalResults === 0
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
        (project, index) => {

          const image =
            Array.isArray(
              project.images
            ) &&
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
                class="search-place-link"
              >

                <div class="search-place-image">

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


                  <span class="search-place-number">
                    ${String(index + 1).padStart(2, "0")}
                  </span>

                </div>


                <div class="search-place-info">

                  <h3>
                    ${project.title}
                  </h3>


                  <p>
                    ${architectNames}
                  </p>


                  <div class="search-place-meta">

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

            <span class="search-text-name">
              ${architect.name}
            </span>


            <span class="search-text-meta">
              ${architect.location || architect.category || ""}
            </span>


            <span class="search-text-arrow">
              ↗
            </span>

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


      <div class="search-text-list">

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

            <span class="search-text-name">
              ${destination.country}
            </span>


            <span class="search-text-meta">

              ${destination.continent}

              ·

              ${String(destination.count).padStart(2, "0")}

              ${
                destination.count === 1
                  ? "place"
                  : "places"
              }

            </span>


            <span class="search-text-arrow">
              ↗
            </span>

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


      <div class="search-text-list">

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
