/* =========================================
   ARCHIVE — ARCHITECT DETAIL
========================================= */

const params =
  new URLSearchParams(
    window.location.search
  );

const architectId =
  params.get("id");

const architectDetail =
  document.querySelector(
    "#architect-detail"
  );


async function initArchitect() {

  const architects =
    await loadArchitects();

  const projects =
    await loadProjects();


  const architect =
    architects.find(
      item =>
        item.id === architectId
    );


  if (!architect) {

    architectDetail.innerHTML = `

      <section
        class="architect-not-found"
      >
        Architect not found.
      </section>

    `;

    return;

  }


  document.title =
    `ARCHIVE — ${architect.name}`;


  const relatedProjects =
    projects.filter(
      project =>
        project.architect ===
        architect.name
    );


  const relatedGrid =
    relatedProjects
      .map(
        (project, index) => {

          const image =
            project.images &&
            project.images.length > 0
              ? project.images[0]
              : "";


          return `

            <article class="project">

              <a
                class="project-link"
                href="project.html?id=${encodeURIComponent(project.id)}"
              >

                <div class="project-image">

                  ${
                    image
                      ? `
                        <img
                          src="${image}"
                          alt="${project.title}"
                          loading="lazy"
                        >
                      `
                      : ""
                  }

                  <span class="project-number">
                    ${String(index + 1).padStart(2, "0")}
                  </span>

                </div>


                <div class="project-info">

                  <h3>
                    ${project.title}
                  </h3>

                  <p>
                    ${project.city},
                    ${project.country}
                  </p>

                  <span class="project-type">
                    ${project.type}
                  </span>

                </div>

              </a>

            </article>

          `;

        }
      )
      .join("");


  architectDetail.innerHTML = `

    <section class="architect-detail-hero">

      <div class="architect-detail-kicker">
        ARCHIVE / ARCHITECT
      </div>


      <h1>
        ${architect.name}
      </h1>


      <div class="architect-detail-meta">

        <span>
          ${architect.category || ""}
        </span>

        <span>
          ${architect.location || ""}
        </span>

        <span>
          ${String(relatedProjects.length).padStart(2, "0")}
          ${
            relatedProjects.length === 1
              ? "place"
              : "places"
          }
        </span>

      </div>

    </section>


    <section class="architect-detail-intro">

      <div class="architect-detail-label">
        ABOUT
      </div>


      <div class="architect-detail-description">

        ${
          architect.description
            ? `
              <p>
                ${architect.description}
              </p>
            `
            : ""
        }


        ${
          architect.website
            ? `
              <a
                href="${architect.website}"
                target="_blank"
                rel="noopener noreferrer"
                class="architect-website"
              >
                Official website ↗
              </a>
            `
            : ""
        }

      </div>


      <div class="architect-detail-image">

        ${
          architect.image
            ? `
              <img
                src="${architect.image}"
                alt="${architect.name}"
              >
            `
            : `
              <div class="architect-image-placeholder">
                IMAGE
              </div>
            `
        }

      </div>

    </section>


    <section class="architect-related">

      <div class="architect-related-header">

        <h2>
          Related places
        </h2>

        <span>
          ${String(relatedProjects.length).padStart(2, "0")}
        </span>

      </div>


      ${
        relatedProjects.length > 0
          ? `
            <div class="project-grid">
              ${relatedGrid}
            </div>
          `
          : `
            <div class="empty-results">
              No related projects yet.
            </div>
          `
      }

    </section>

  `;

}


initArchitect();
