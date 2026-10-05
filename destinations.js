/* =========================================
   ARCHIVE — DESTINATIONS INDEX
========================================= */

const continentFilters =
  document.querySelector(
    "#continent-filters"
  );

const countrySelect =
  document.querySelector(
    "#country-select"
  );

const destinationsGrid =
  document.querySelector(
    "#destinations-grid"
  );


let projects = [];

let activeContinent = "ALL";


/* =========================================
   CONTINENT ORDER
========================================= */

const continentOrder = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania"
];


/* =========================================
   INITIALISE
========================================= */

async function initDestinations() {

  projects =
    await loadProjects();


  renderContinentFilters();

  renderDestinations();

}


initDestinations();


/* =========================================
   CONTINENT FILTERS
========================================= */

function renderContinentFilters() {

  continentFilters.innerHTML = "";


  const filters = [
    "ALL",
    ...continentOrder
  ];


  filters.forEach(
    continent => {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "destination-filter";


      if (
        continent ===
        activeContinent
      ) {

        button.classList.add(
          "active"
        );

      }


      button.textContent =
        continent;


      button.addEventListener(
        "click",
        () => {

          activeContinent =
            continent;


          renderContinentFilters();

          renderDestinations();

        }
      );


      continentFilters.appendChild(
        button
      );

    }
  );

}


/* =========================================
   CREATE DESTINATIONS
========================================= */

function getDestinations() {

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

          projects: [],

          image:
            project.images &&
            project.images.length > 0
              ? project.images[0]
              : ""

        };

      }


      destinationMap[
        project.country
      ].projects.push(
        project
      );

    }
  );


  return Object.values(
    destinationMap
  )
    .sort(
      (a, b) => {

        const continentA =
          continentOrder.indexOf(
            a.continent
          );

        const continentB =
          continentOrder.indexOf(
            b.continent
          );


        if (
          continentA !==
          continentB
        ) {

          return (
            continentA -
            continentB
          );

        }


        return a.country.localeCompare(
          b.country
        );

      }
    );

}


/* =========================================
   RENDER
========================================= */

function renderDestinations() {

  const destinations =
    getDestinations();


  const filtered =
    activeContinent === "ALL"

      ? destinations

      : destinations.filter(
          destination =>
            destination.continent ===
            activeContinent
        );


  renderCountrySelector(
    filtered
  );


  destinationsGrid.innerHTML =
    "";


  if (
    filtered.length === 0
  ) {

    destinationsGrid.innerHTML = `

      <div class="destinations-empty">

        No destinations yet.

      </div>

    `;

    return;

  }


  filtered.forEach(
    destination => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "destination-card";


      card.innerHTML = `

        <a
          href="destination.html?country=${encodeURIComponent(destination.country)}"
          class="destination-card-link"
        >

          <div class="destination-card-image">

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

          </div>


          <div class="destination-card-info">

            <h2>
              ${destination.country}
            </h2>


            <div class="destination-card-meta">

              <span>
                ${destination.continent}
              </span>

              <span>
                ${String(destination.projects.length).padStart(2, "0")}
                ${
                  destination.projects.length === 1
                    ? "place"
                    : "places"
                }
              </span>

            </div>

          </div>

        </a>

      `;


      destinationsGrid.appendChild(
        card
      );

    }
  );

}


/* =========================================
   COUNTRY SELECTOR
========================================= */

function renderCountrySelector(
  destinations
) {

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
   COUNTRY CHANGE
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
