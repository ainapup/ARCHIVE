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


/* =========================================
   INITIALISE
========================================= */

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
          .map(
            project =>
              project.country
          )
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
     FILTER PROJECTS
  ========================================= */

  const filteredProjects =
    projects.filter(
      project =>
        project.country === country
    );


  if (
    filteredProjects.length === 0
  ) {

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


  /* =========================================
     DESTINATION HEADER
  ========================================= */

  const continent =
    filteredProjects[0]
      .continent;


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


  projectsContainer.innerHTML =
    "";


  /* =========================================
     PROJECTS
  ========================================= */

  filteredProjects.forEach(
    (project, index) => {


      /* -----------------------------------------
         ARCHITECTS
      ----------------------------------------- */

      const architectNames =
        typeof getProjectArchitectNames === "function"

          ? getProjectArchitectNames(
              project
            )

          : (
              project.architect ||
              ""
            );


      /* -----------------------------------------
         UNIQUE IMAGES
      ----------------------------------------- */

      const projectImages =
        Array.isArray(
          project.images
        )
          ? project.images.filter(Boolean)
          : [];


      /*
        Remove duplicated URLs.

        ARCHIVE never repeats an image
        just to fill the 3-column gallery.
      */

      const uniqueImages =
        [
          ...new Set(
            projectImages
          )
        ]
        .slice(0, 3);


      /* -----------------------------------------
         PRICE
      ----------------------------------------- */

      const hasPrice =
        project.priceFrom !== null &&
        project.priceFrom !== "" &&
        project.priceFrom !== undefined;


      const priceText =
        hasPrice
          ? `

            <strong class="destination-project-price">

              FROM
              ${project.currency || ""}
              ${project.priceFrom}

              ${
                project.priceNote
                  ? ` / ${project.priceNote.toUpperCase()}`
                  : ""
              }

            </strong>

          `
          : "";


      /* -----------------------------------------
         BOOKING
      ----------------------------------------- */

      const bookingLink =
        project.bookingUrl
          ? `

            <a
              href="${project.bookingUrl}"
              data-booking-url="${project.bookingUrl}"
              data-project-id="${project.id}"
              data-project-name="${project.title}"
              data-architect="${architectNames}"
              data-country="${project.country}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book here ↗
            </a>

          `
          : "";


      /* -----------------------------------------
         ARCHITECTURE WEBSITE
      ----------------------------------------- */

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


      /* -----------------------------------------
         IMAGE GALLERY
      ----------------------------------------- */

      const galleryMarkup =
        uniqueImages
          .map(
            (image, imageIndex) => `

              <a
                href="project.html?id=${encodeURIComponent(project.id)}"
                class="destination-project-image"
              >

                <img
                  src="${image}"
                  alt="${project.title} ${imageIndex + 1}"
                  loading="lazy"
                >

              </a>

            `
          )
          .join("");


      /* -----------------------------------------
         PROJECT SECTION
      ----------------------------------------- */

      const projectSection =
        document.createElement(
          "section"
        );


      projectSection.classList.add(
        "destination-project"
      );


      projectSection.innerHTML = `

        <div class="destination-project-info">


          <div class="destination-project-index">

            ${String(index + 1).padStart(2, "0")}
            /
            ${String(filteredProjects.length).padStart(2, "0")}

          </div>


          <a
            href="project.html?id=${encodeURIComponent(project.id)}"
            class="destination-project-title"
          >
            ${project.title}
          </a>


          <div class="destination-project-secondary">

            ${
              architectNames
                ? `
                  <span>
                    ${architectNames}
                  </span>
                `
                : ""
            }


            <span>
              ${project.city},
              ${project.country}
            </span>

          </div>


          <div class="destination-project-type-price">

            <span>
              ${project.type}
            </span>

            ${priceText}

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


        ${
          uniqueImages.length > 0
            ? `

              <div class="destination-project-gallery">

                ${galleryMarkup}

              </div>

            `
            : ""
        }

      `;


      projectsContainer.appendChild(
        projectSection
      );

    }
  );


  /* =========================================
     BOOKING TRACKING
  ========================================= */

  if (
    typeof applyBookingTracking ===
    "function"
  ) {

    applyBookingTracking();

  }

}


initDestination();
