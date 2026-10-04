/* =========================================
   ARCHIVE — DESTINATIONS
========================================= */

const destinationsGrid =
  document.querySelector("#destinations-grid");

const continentFilters =
  document.querySelector("#continent-filters");

const countrySelect =
  document.querySelector("#country-select");


let allDestinations = [];

let activeContinent = "ALL";


const continentOrder = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania"
];


/* =========================================
   LOAD DESTINATIONS
========================================= */

async function initDestinations() {

  const projects =
    await loadProjects();


  const destinationsMap = {};


  projects.forEach((project) => {

    if (!destinationsMap[project.country]) {

      destinationsMap[project.country] = {

        country:
          project.country,

        continent:
          project.continent,

        projects: [],

        image:
          project.images &&
          project.images.length > 0
            ? project.images[0]
            : ""

      };

    }


    destinationsMap[
      project.country
    ].projects.push(project);

  });


  allDestinations =
    Object.values(destinationsMap);


  allDestinations.sort(
    (a, b) =>
      a.country.localeCompare(b.country)
  );


  renderContinentFilters();

  renderCountrySelect();

  renderDestinations();

}


initDestinations();


/* =========================================
   CONTINENT FILTERS
========================================= */

function renderContinentFilters() {

  const availableContinents =
    continentOrder.filter(
      continent =>
        allDestinations.some(
          destination =>
            destination.continent === continent
        )
    );


  const filters = [
    "ALL",
    ...availableContinents
  ];


  continentFilters.innerHTML =
    filters
      .map((continent) => {

        const activeClass =
          continent === activeContinent
            ? "active"
            : "";


        return `

          <button
            class="continent-filter ${activeClass}"
            data-continent="${continent}"
          >
            ${continent}
          </button>

        `;

      })
      .join("");


  document
    .querySelectorAll(".continent-filter")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          activeContinent =
            button.dataset.continent;


          renderContinentFilters();

          renderCountrySelect();

          renderDestinations();

        }
      );

    });

}


/* =========================================
   COUNTRY SELECTOR
========================================= */

function renderCountrySelect() {

  let destinations =
    [...allDestinations];


  if (activeContinent !== "ALL") {

    destinations =
      destinations.filter(
        destination =>
          destination.continent === activeContinent
      );

  }


  countrySelect.innerHTML = `

    <option value="">
      Select destination
    </option>

    ${

      destinations
        .map(
          destination => `

            <option
              value="${destination.country}"
            >
              ${destination.country}
            </option>

          `
        )
        .join("")

    }

  `;

}


/* =========================================
   COUNTRY NAVIGATION
========================================= */

countrySelect.addEventListener(
  "change",
  () => {

    const country =
      countrySelect.value;


    if (!country) {
      return;
    }


    window.location.href =
      `destination.html?country=${encodeURIComponent(country)}`;

  }
);


/* =========================================
   RENDER DESTINATIONS GRID
========================================= */

function renderDestinations() {

  destinationsGrid.innerHTML = "";


  let destinations =
    [...allDestinations];


  if (activeContinent !== "ALL") {

    destinations =
      destinations.filter(
        destination =>
          destination.continent === activeContinent
      );

  }


  destinations.forEach(
    (destination, index) => {

      const projectCount =
        destination.projects.length;


      const article =
        document.createElement("article");


      article.classList.add(
        "destination-card"
      );


      article.innerHTML = `

        <a
          class="destination-card-link"
          href="destination.html?country=${encodeURIComponent(destination.country)}"
        >

          <div class="destination-image">

            ${
              destination.image
                ? `
                  <img
                    src="${destination.image}"
                    alt="${destination.country}"
                    loading="lazy"
                  >
                `
                : ""
            }

            <span class="destination-number">

              ${String(index + 1).padStart(2, "0")}

            </span>

          </div>


          <div class="destination-info">

            <h2>
              ${destination.country}
            </h2>


            <div class="destination-meta">

              <span>
                ${destination.continent}
              </span>

              <span>

                ${String(projectCount).padStart(2, "0")}

                ${
                  projectCount === 1
                    ? "project"
                    : "projects"
                }

              </span>

            </div>

          </div>

        </a>

      `;


      destinationsGrid.appendChild(
        article
      );

    }
  );

}
