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

const destinationSelect =
  document.querySelector(
    "#destination-select"
  );


async function initDestination() {

  const projects =
    await loadProjects();


  /* =========================================
     DESTINATION SELECTOR
  ========================================= */

  const countries =
    [
      ...new Set(
        projects
          .map(project => project.country)
          .filter(Boolean)
      )
    ]
    .sort(
      (a, b) =>
        a.localeCompare(b)
    );


  destinationSelect.innerHTML = `

    <option value="">
      Select destination
    </option>

    ${
      countries
        .map(
          item => `

            <option
              value="${item}"
              ${
                item === country
                  ? "selected"
                  : ""
              }
            >
              ${item}
            </option>

          `
        )
        .join("")
    }

  `;


  destinationSelect.addEventListener(
    "change",
    () => {

      const selectedCountry =
        destinationSelect.value;


      if (!selectedCountry) {
        return;
      }


      window.location.href =
        `destination.html?country=${encodeURIComponent(selectedCountry)}`;

    }
  );


  /* =========================================
     COUNTRY PROJECTS
  ========================================= */

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


  /* =========================================
     PROJECTS
  ========================================= */

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


      const hasPrice =
        project.priceFrom !== null &&
        project.priceFrom !== "" &&
        project.priceFrom !== undefined;


      const priceText =
        hasPrice
          ? `FROM ${project.currency || ""}${project.priceFrom}${
              project.priceNote
                ? ` / ${project.priceNote.toUpperCase()}`
                : ""
            }`
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

            <div>

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

              </div>

            </div>


            <div class="destination-project-actions">

              <div class="destination-project-type-line">

                <span>
                  ${project.type}
                </span>

                ${
                  priceText
                    ? `
                      <span>
                        ${priceText}
                      </span>
                    `
                    : ""
                }

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

        </div>


        <div class="destination-project-gallery">

          ${createImageBlock(image1, project, 1)}

          ${createImageBlock(image2, project, 2)}

          ${createImageBlock(image3, project, 3)}

        </div>

      `;


      projectsContainer.appendChild(
        projectSection
      );

    }
  );

}


/* =========================================
   IMAGE BLOCK
========================================= */

function createImageBlock(
  image,
  project,
  number
) {

  return `

    <a
      href="project.html?id=${encodeURIComponent(project.id)}"
      class="destination-project-image"
    >

      ${
        image
          ? `
            <img
              src="${image}"
              alt="${project.title} ${number}"
              loading="lazy"
            >
          `
          : ""
      }

    </a>

  `;

}


initDestination();
