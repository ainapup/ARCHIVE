/* =========================================
   ARCHIVE — DESTINATION DETAIL
========================================= */

const params =
  new URLSearchParams(
    window.location.search
  );

const country =
  params.get("country");


const titleElement =
  document.querySelector(
    "#destination-title"
  );

const continentElement =
  document.querySelector(
    "#destination-continent"
  );

const countElement =
  document.querySelector(
    "#destination-count"
  );

const projectsContainer =
  document.querySelector(
    "#destination-projects"
  );


async function initDestination() {

  const projects =
    await loadProjects();


  const filteredProjects =
    projects.filter(
      project =>
        project.country === country
    );


  if (filteredProjects.length === 0) {

    titleElement.textContent =
      country || "Destination";

    continentElement.textContent =
      "No projects";

    countElement.textContent =
      "00 places";

    projectsContainer.innerHTML = `

      <div class="destination-empty">
        No projects found.
      </div>

    `;

    return;

  }


  const continent =
    filteredProjects[0].continent;


  titleElement.textContent =
    country;

  continentElement.textContent =
    continent;

  countElement.textContent =
    `${String(filteredProjects.length).padStart(2, "0")} ${
      filteredProjects.length === 1
        ? "place"
        : "places"
    }`;


  document.title =
    `ARCHIVE — ${country}`;


  filteredProjects.forEach(
    (project, index) => {

      const projectSection =
        document.createElement(
          "section"
        );

      projectSection.classList.add(
        "destination-project"
      );


      const images =
        project.images || [];


      const image1 =
        images[0] || "";

      const image2 =
        images[1] || images[0] || "";

      const image3 =
        images[2] || images[1] || images[0] || "";


      const priceLine =
        project.priceFrom !== null &&
        project.priceFrom !== "" &&
        project.priceFrom !== undefined
          ? `
            <span class="destination-price">
              FROM ${project.currency || ""}${project.priceFrom}${
                project.priceNote
                  ? ` / ${project.priceNote.toUpperCase()}`
                  : ""
              }
            </span>
          `
          : "";


      const bookingLink =
        project.bookingUrl
          ? `
            <a
              href="${project.bookingUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book here ↗
            </a>
          `
          : "";


      const architectureLink =
        project.architectureWebsite
          ? `
            <a
              href="${project.architectureWebsite}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Architecture website ↗
            </a>
          `
          : "";


      projectSection.innerHTML = `

        <div class="destination-project-top">

          <div class="destination-project-index">

            ${String(index + 1).padStart(2, "0")}
            /
            ${String(filteredProjects.length).padStart(2, "0")}

          </div>


          <div class="destination-project-heading">

            <a
              href="project.html?id=${encodeURIComponent(project.id)}"
              class="destination-project-title"
            >
              ${project.title}
            </a>

            <div class="destination-project-meta">

              <span>
                ${project.architect}
              </span>

              <span>
                ${project.city}, ${project.country}
              </span>

              <span>
                ${project.type}
                ${priceLine ? " · " : ""}
                ${priceLine}
              </span>

            </div>


            <div class="destination-project-links">

              ${bookingLink}

              ${architectureLink}

              <a
                href="project.html?id=${encodeURIComponent(project.id)}"
              >
                View project ↗
              </a>

            </div>

          </div>

        </div>


        <div class="destination-project-gallery">

          <a
            href="project.html?id=${encodeURIComponent(project.id)}"
            class="destination-project-image"
          >

            ${
              image1
                ? `
                  <img
                    src="${image1}"
                    alt="${project.title} 1"
                    loading="lazy"
                  >
                `
                : ""
            }

          </a>


          <a
            href="project.html?id=${encodeURIComponent(project.id)}"
            class="destination-project-image"
          >

            ${
              image2
                ? `
                  <img
                    src="${image2}"
                    alt="${project.title} 2"
                    loading="lazy"
                  >
                `
                : ""
            }

          </a>


          <a
            href="project.html?id=${encodeURIComponent(project.id)}"
            class="destination-project-image"
          >

            ${
              image3
                ? `
                  <img
                    src="${image3}"
                    alt="${project.title} 3"
                    loading="lazy"
                  >
                `
                : ""
            }

          </a>

        </div>

      `;


      projectsContainer.appendChild(
        projectSection
      );

    }
  );

}


initDestination();
