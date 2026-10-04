/* =========================================
   ARCHIVE — MAP
========================================= */

const map = L.map(
  "archive-map",
  {
    zoomControl: true,
    scrollWheelZoom: true
  }
).setView(
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
).addTo(map);


/* =========================================
   LOAD PROJECTS
========================================= */

async function initMap() {

  const projects =
    await loadProjects();


  projects.forEach((project) => {

    const latitude =
      Number(project.latitude);

    const longitude =
      Number(project.longitude);


    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {

      return;

    }


    const marker =
      L.circleMarker(
        [
          latitude,
          longitude
        ],
        {
          radius: 6,
          weight: 1,
          fillOpacity: 1
        }
      )
      .addTo(map);


    const image =
      project.images &&
      project.images.length > 0
        ? project.images[0]
        : "";


    marker.bindPopup(`

      <a
        class="map-popup-link"
        href="project.html?id=${encodeURIComponent(project.id)}"
      >

        ${
          image
            ? `
              <img
                class="map-popup-image"
                src="${image}"
                alt="${project.title}"
              >
            `
            : ""
        }


        <div class="map-popup-content">

          <strong>
            ${project.title}
          </strong>

          <span>
            ${project.architect}
          </span>

          <span>
            ${project.city}, ${project.country}
          </span>

        </div>

      </a>

    `);

  });

}


initMap();
