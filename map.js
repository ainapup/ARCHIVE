/* =========================================
   ARCHIVE — MAP
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const architectSelect =
  document.querySelector(
    "#map-architect-select"
  );


const typeButtons =
  document.querySelectorAll(
    ".map-type-filter"
  );


const resultCount =
  document.querySelector(
    "#map-result-count"
  );



/* =========================================
   STATE
========================================= */

let projects = [];

let map = null;

let markerLayer = null;

let activeType = "ALL";

let activeArchitect = "ALL";



/* =========================================
   INITIALISE
========================================= */

async function initMap() {

  projects =
    await loadProjects();


  createMap();

  populateArchitectFilter();

  bindTypeFilters();

  bindArchitectFilter();

  renderMarkers();

}


initMap();



/* =========================================
   CREATE MAP
========================================= */

function createMap() {

  map = L.map(
    "archive-map",
    {
      zoomControl: true,
      scrollWheelZoom: true
    }
  )
  .setView(
    [20, 0],
    2
  );


  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        "&copy; OpenStreetMap contributors"
    }
  )
  .addTo(map);


  markerLayer =
    L.layerGroup()
      .addTo(map);

}



/* =========================================
   ARCHITECT FILTER
========================================= */

function populateArchitectFilter() {

  const architectMap =
    new Map();


  projects.forEach(
    project => {

      const projectArchitects =
        getProjectArchitects(
          project
        );


      projectArchitects.forEach(
        architect => {

          if (
            architect.id ||
            architect.name
          ) {

            const key =
              architect.id ||
              architect.name;


            if (
              !architectMap.has(key)
            ) {

              architectMap.set(
                key,
                {
                  id:
                    architect.id ||
                    architect.name,

                  name:
                    architect.name ||
                    architect.id
                }
              );

            }

          }

        }
      );

    }
  );


  const architects =
    Array.from(
      architectMap.values()
    )
    .sort(
      (a, b) =>
        a.name.localeCompare(
          b.name
        )
    );


  architectSelect.innerHTML = `

    <option value="ALL">
      All architects
    </option>

    ${
      architects
        .map(
          architect => `

            <option
              value="${architect.id}"
            >
              ${architect.name}
            </option>

          `
        )
        .join("")
    }

  `;

}



/* =========================================
   TYPE FILTER EVENTS
========================================= */

function bindTypeFilters() {

  typeButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          activeType =
            button.dataset.type;


          typeButtons.forEach(
            item =>
              item.classList.remove(
                "active"
              )
          );


          button.classList.add(
            "active"
          );


          renderMarkers();

        }
      );

    }
  );

}



/* =========================================
   ARCHITECT FILTER EVENT
========================================= */

function bindArchitectFilter() {

  architectSelect.addEventListener(
    "change",
    () => {

      activeArchitect =
        architectSelect.value;


      renderMarkers();

    }
  );

}



/* =========================================
   FILTER PROJECTS
========================================= */

function getFilteredProjects() {

  return projects.filter(
    project => {


      const latitude =
        Number(
          project.latitude
        );


      const longitude =
        Number(
          project.longitude
        );


      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {

        return false;

      }


      if (
        activeType !== "ALL" &&
        project.type !== activeType
      ) {

        return false;

      }


      if (
        activeArchitect !== "ALL"
      ) {

        const matchesArchitect =
          getProjectArchitects(
            project
          )
          .some(
            architect => {

              return (
                architect.id ===
                  activeArchitect ||

                architect.name ===
                  activeArchitect
              );

            }
          );


        if (!matchesArchitect) {

          return false;

        }

      }


      return true;

    }
  );

}



/* =========================================
   RENDER MARKERS
========================================= */

function renderMarkers() {

  markerLayer.clearLayers();


  const filteredProjects =
    getFilteredProjects();


  const bounds = [];


  filteredProjects.forEach(
    project => {

      const latitude =
        Number(
          project.latitude
        );


      const longitude =
        Number(
          project.longitude
        );


      const marker =
        createMarker(
          project,
          latitude,
          longitude
        );


      marker.addTo(
        markerLayer
      );


      bounds.push(
        [
          latitude,
          longitude
        ]
      );

    }
  );


  updateResultCount(
    filteredProjects.length
  );


  if (
    bounds.length === 1
  ) {

    map.setView(
      bounds[0],
      6
    );

  } else if (
    bounds.length > 1
  ) {

    map.fitBounds(
      bounds,
      {
        padding:
          [
            50,
            50
          ],

        maxZoom: 7
      }
    );

  } else {

    map.setView(
      [20, 0],
      2
    );

  }

}



/* =========================================
   CREATE MARKER
========================================= */

function createMarker(
  project,
  latitude,
  longitude
) {

  const marker =
    L.circleMarker(
      [
        latitude,
        longitude
      ],
      {
        radius: 6,
        weight: 1.5,

        color: "#111",

        fillColor: "#111",

        opacity: 1,

        fillOpacity: 1
      }
    );


  marker.bindPopup(
    createPopup(
      project
    ),
    {
      maxWidth: 320,
      minWidth: 260
    }
  );


  return marker;

}



/* =========================================
   POPUP
========================================= */

function createPopup(
  project
) {

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


  const imageMarkup =
    image

      ? `

        <div class="map-popup-image-wrap">

          <img
            class="map-popup-image"
            src="${image}"
            alt="${project.title}"
          >

        </div>

      `

      : "";


  return `

    <a
      class="map-popup-link"
      href="project.html?id=${encodeURIComponent(project.id)}"
    >

      ${imageMarkup}


      <div class="map-popup-content">


        <div class="map-popup-type">
          ${project.type || ""}
        </div>


        <strong>
          ${project.title}
        </strong>


        ${
          architectNames
            ? `
              <span class="map-popup-architect">
                ${architectNames}
              </span>
            `
            : ""
        }


        <span class="map-popup-location">
          ${project.city || ""},
          ${project.country || ""}
        </span>


        <span class="map-popup-view">
          View project ↗
        </span>


      </div>

    </a>

  `;

}



/* =========================================
   RESULT COUNT
========================================= */

function updateResultCount(
  number
) {

  resultCount.textContent = `

    ${String(number).padStart(2, "0")}
    ${
      number === 1
        ? "place"
        : "places"
    }

  `;

}
