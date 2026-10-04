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

      <section
        class="project-not-found"
      >
        Project not found.
      </section>

    `;

    return;

  }


  const architect =
    architects.find(
      item =>
        item.name ===
        project.architect
    );


  document.title =
    `ARCHIVE — ${project.title}`;


  const gallery =
    project.images &&
    project.images.length > 0

      ? project.images
          .map(
            (image, index) => `

              <figure
                class="project-gallery-item"
              >

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


  const hasPrice =
    project.priceFrom !== null &&
    project.priceFrom !== "" &&
    project.priceFrom !== undefined;


  const priceLine =
    hasPrice
      ? `
        ${project.type}
        · FROM
        ${project.currency || ""}${project.priceFrom}
        ${
          project.priceNote
            ? ` / ${project.priceNote.toUpperCase()}`
            : ""
        }
      `
      : project.type;


  const bookingLink =
    project.bookingUrl
      ? `
        <a
          href="${project.bookingUrl}"
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


  const architectMarkup =
    architect

      ? `
        <a
          href="architect.html?id=${encodeURIComponent(architect.id)}"
        >
          ${project.architect}
        </a>
      `

      : `
        <span>
          ${project.architect}
        </span>
      `;


  detail.innerHTML = `

    <section
      class="project-hero"
    >

      <div
        class="project-page-top"
      >

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


      <div
        class="project-page-meta"
      >

        <div>

          <span
            class="meta-label"
          >
            Architect
          </span>

          ${architectMarkup}

        </div>


        <div>

          <span
            class="meta-label"
          >
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

          <span
            class="meta-label"
          >
            Year
          </span>

          <span>
            ${project.year || "—"}
          </span>

        </div>

      </div>

    </section>


    <section
      class="project-intro"
    >

      <div
        class="project-description"
      >

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


      <div
        class="project-commerce"
      >

        <div
          class="project-links"
        >

          ${bookingLink}

          ${architectureLink}

        </div>

      </div>

    </section>


    ${
      gallery
        ? `
          <section
            class="project-gallery"
          >
            ${gallery}
          </section>
        `
        : ""
    }

  `;

}


initProject();
