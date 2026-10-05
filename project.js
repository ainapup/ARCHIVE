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


  const projectArchitects =
    getProjectArchitects(
      project
    );


  document.title =
    `ARCHIVE — ${project.title}`;


  /* =========================================
     ARCHITECTS
  ========================================= */

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


  /* =========================================
     GALLERY
  ========================================= */

  const gallery =
    project.images &&
    project.images.length > 0

      ? project.images
          .map(
            (image, index) => `

              <figure class="project-gallery-item">

                <img
                  src="${image}"
                  alt="${project.title} — ${index + 1}"
                  loading="lazy"
                >

              </figure>

            `
          )
          .join("")

      : "";


  /* =========================================
     PRICE
  ========================================= */

  const hasPrice =
    project.priceFrom !== null &&
    project.priceFrom !== "" &&
    project.priceFrom !== undefined;


  const priceLine =
    hasPrice
      ? `
        ${project.type}
        ·
        <strong>
          FROM ${project.currency || ""}${project.priceFrom}
          ${
            project.priceNote
              ? ` / ${project.priceNote.toUpperCase()}`
              : ""
          }
        </strong>
      `
      : project.type;


  /* =========================================
     BOOKING
  ========================================= */

  const architectNames =
    getProjectArchitectNames(
      project
    );


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
          class="project-external-link project-book-link"
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
          class="project-external-link"
        >
          Architecture website ↗
        </a>

      `
      : "";


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
     OUTPUT
  ========================================= */

  detail.innerHTML = `

    <section class="project-hero">

      <div class="project-page-top">

        <span>
          ${priceLine}
        </span>

        <span>
          ARCHIVE / ${project.id}
        </span>

      </div>


      <h1>
        ${project.title}
      </h1>


      <div class="project-page-meta">

        <div>

          <span class="meta-label">
            ${
              projectArchitects.length > 1
                ? "Architects"
                : "Architect"
            }
          </span>

          <div class="project-architect-links">
            ${architectMarkup || "—"}
          </div>

        </div>


        <div>

          <span class="meta-label">
            Location
          </span>

          <a
            href="destination.html?country=${encodeURIComponent(project.country)}"
          >
            ${project.city},
            ${project.country}
          </a>

        </div>


        <div>

          <span class="meta-label">
            Year
          </span>

          <span>
            ${project.year || "—"}
          </span>

        </div>

      </div>

    </section>


    <section class="project-intro">

      <div class="project-description">

        ${
          project.description
            ? `
              <p>
                ${project.description}
              </p>
            `
            : ""
        }

      </div>


      <div class="project-commerce">

        <div class="project-links">

          ${bookingLink}

          ${architectureLink}

        </div>

      </div>

    </section>


    ${awardsMarkup}


    ${
      gallery
        ? `
          <section class="project-gallery">
            ${gallery}
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
