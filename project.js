/* =========================================
   ARCHIVE — PROJECT PAGE
========================================= */

const params =
  new URLSearchParams(
    window.location.search
  );

const projectId =
  params.get("id");

const detail =
  document.querySelector(
    "#project-detail"
  );


/* =========================================
   INITIALISE
========================================= */

async function initProject() {

  const projects =
    await loadProjects();

  const architects =
    await loadArchitects();


  const project =
    projects.find(
      item =>
        item.id === projectId
    );


  if (!project) {

    detail.innerHTML = `

      <section class="project-not-found">
        Project not found.
      </section>

    `;

    return;

  }


  document.title =
    `ARCHIVE — ${project.title}`;


  /* =========================================
     ARCHITECTS
  ========================================= */

  const projectArchitects =
    getProjectArchitects(
      project
    );


  const architectMarkup =
    projectArchitects
      .map(
        projectArchitect => {

          const architect =
            architects.find(
              item => {

                if (
                  projectArchitect.id
                ) {

                  return (
                    item.id ===
                    projectArchitect.id
                  );

                }


                return (
                  item.name ===
                  projectArchitect.name
                );

              }
            );


          if (architect) {

            return `

              <a
                href="architect.html?id=${encodeURIComponent(architect.id)}"
              >
                ${architect.name}
              </a>

            `;

          }


          return `

            <span>
              ${projectArchitect.name}
            </span>

          `;

        }
      )
      .join(
        '<span class="project-architect-separator"> · </span>'
      );


  const architectNames =
    getProjectArchitectNames(
      project
    );


  /* =========================================
     PLACE INFO
  ========================================= */

  const placeInfoItems = [];


  if (project.placeType) {

    placeInfoItems.push(
      project.placeType
    );

  }


  if (project.serviceMode) {

    placeInfoItems.push(
      project.serviceMode
    );

  }


  if (project.capacity) {

    placeInfoItems.push(
      project.capacity
    );

  }


  const hasPrice =
    project.priceFrom !== null &&
    project.priceFrom !== "" &&
    project.priceFrom !== undefined;


  if (hasPrice) {

    let price =
      `From ${project.currency || ""}${project.priceFrom}`;


    if (project.priceNote) {

      price +=
        ` / ${project.priceNote}`;

    }


    placeInfoItems.push(
      price
    );

  } else if (
    project.priceLevel
  ) {

    placeInfoItems.push(
      project.priceLevel
    );

  }


  /* =========================================
     ACTION
  ========================================= */

  let actionUrl = "";
  let actionLabel = "";


  if (project.type === "STAY") {

    actionUrl =
      project.bookingUrl || "";

    actionLabel =
      "Book here ↗";

  }


  if (
    project.type === "EAT" ||
    project.type === "DRINK"
  ) {

    actionUrl =
      project.bookingUrl || "";

    actionLabel =
      "Reserve ↗";

  }


  if (project.type === "VISIT") {

    actionUrl =
      project.visitUrl ||
      project.bookingUrl ||
      "";

    actionLabel =
      "Visit / Tickets ↗";

  }


  const actionLink =
    actionUrl
      ? `

        <a
          href="${actionUrl}"

          ${
            project.type !== "VISIT"
              ? `
                data-booking-url="${actionUrl}"
                data-project-id="${project.id}"
                data-project-name="${project.title}"
                data-architect="${architectNames}"
                data-country="${project.country}"
              `
              : ""
          }

          target="_blank"
          rel="noopener noreferrer"
          class="project-place-action"
        >
          ${actionLabel}
        </a>

      `
      : "";


  /* =========================================
     ARCHITECTURE WEBSITE
  ========================================= */

  const architectureWebsite =
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
      : "—";


  /* =========================================
     AWARDS
  ========================================= */

  let awardsMarkup = "";


  if (
    Array.isArray(project.awards) &&
    project.awards.length > 0
  ) {

    const sortedAwards =
      [...project.awards]
        .sort(
          (a, b) =>
            Number(b.year || 0) -
            Number(a.year || 0)
        );


    const rows =
      sortedAwards
        .map(
          award => {

            const content = `

              <span class="project-award-year">
                ${award.year || "—"}
              </span>

              <span class="project-award-name">
                ${award.name}
              </span>

              <span class="project-award-recognition">
                ${award.recognition || ""}
              </span>

            `;


            if (award.url) {

              return `

                <a
                  class="project-award-row"
                  href="${award.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${content}
                </a>

              `;

            }


            return `

              <div class="project-award-row">
                ${content}
              </div>

            `;

          }
        )
        .join("");


    awardsMarkup = `

      <section class="project-awards">

        <div class="project-awards-header">

          <h2>
            Awards
          </h2>

          <span>
            ${String(project.awards.length).padStart(2, "0")}
          </span>

        </div>

        <div class="project-awards-list">
          ${rows}
        </div>

      </section>

    `;

  }


  /* =========================================
     GALLERY
  ========================================= */

  const uniqueImages =
    Array.isArray(
      project.images
    )
      ? [
          ...new Set(
            project.images.filter(Boolean)
          )
        ]
      : [];


  const galleryMarkup =
    uniqueImages
      .map(
        (image, index) => `

          <figure
            class="
              project-gallery-item
              ${
                index === 0
                  ? "project-gallery-main"
                  : ""
              }
            "
          >

            <img
              src="${image}"
              alt="${project.title} — ${index + 1}"
              loading="${index === 0 ? "eager" : "lazy"}"
            >

          </figure>

        `
      )
      .join("");


  /* =========================================
     OUTPUT
  ========================================= */

  detail.innerHTML = `


    <section class="project-hero">


      <div class="project-page-top">

        <span>
          ${project.type || ""}
        </span>

        <span>
          ARCHIVE / ${project.id}
        </span>

      </div>


      <h1>
        ${project.title}
      </h1>


      <div class="project-facts">


        <div class="project-fact">

          <span class="project-fact-label">
            ${
              projectArchitects.length > 1
                ? "Architects"
                : "Architect"
            }
          </span>

          <div class="project-fact-value">
            ${architectMarkup || "—"}
          </div>

        </div>


        <div class="project-fact">

          <span class="project-fact-label">
            Location
          </span>

          <a
            class="project-fact-value"
            href="destination.html?country=${encodeURIComponent(project.country)}"
          >
            ${project.city},
            ${project.country}
          </a>

        </div>


        <div class="project-fact">

          <span class="project-fact-label">
            Year
          </span>

          <span class="project-fact-value">
            ${project.year || "—"}
          </span>

        </div>


        <div class="project-fact">

          <span class="project-fact-label">
            Website
          </span>

          <div class="project-fact-value">
            ${architectureWebsite}
          </div>

        </div>


      </div>


      <div class="project-place-strip">


        <div class="project-place-details">

          <span class="project-place-main-type">
            ${project.type || ""}
          </span>


          ${
            placeInfoItems
              .map(
                item => `
                  <span>
                    ${item}
                  </span>
                `
              )
              .join("")
          }

        </div>


        ${
          actionLink
            ? `
              <div class="project-place-book">
                ${actionLink}
              </div>
            `
            : ""
        }


      </div>


    </section>


    ${
      project.description
        ? `

          <section class="project-description-section">

            <div class="project-description">

              <p>
                ${project.description}
              </p>

            </div>

          </section>

        `
        : ""
    }


    ${awardsMarkup}


    ${
      uniqueImages.length > 0
        ? `

          <section
            class="
              project-gallery
              project-gallery-count-${Math.min(uniqueImages.length, 4)}
            "
          >

            ${galleryMarkup}

          </section>

        `
        : ""
    }

  `;


  if (
    typeof applyBookingTracking ===
    "function"
  ) {

    applyBookingTracking();

  }

}


initProject();
