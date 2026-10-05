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

      <section class="architect-not-found">
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
        project.architect === architect.name
    );


  const isStudio =
    architect.category === "Architecture studio" ||
    architect.category === "Design studio";


  /* =========================================
     DATES / FOUNDERS
  ========================================= */

  const dateRows = [];


  if (isStudio) {

    if (architect.foundedYear) {

      dateRows.push(`
        <div class="architect-fact">
          <span class="architect-fact-label">
            Founded
          </span>

          <span>
            ${architect.foundedYear}
          </span>
        </div>
      `);

    }


    if (architect.closedYear) {

      dateRows.push(`
        <div class="architect-fact">
          <span class="architect-fact-label">
            Closed
          </span>

          <span>
            ${architect.closedYear}
          </span>
        </div>
      `);

    }

  } else {

    if (architect.birthYear) {

      dateRows.push(`
        <div class="architect-fact">
          <span class="architect-fact-label">
            Born
          </span>

          <span>
            ${architect.birthYear}
          </span>
        </div>
      `);

    }


    if (architect.deathYear) {

      dateRows.push(`
        <div class="architect-fact">
          <span class="architect-fact-label">
            Died
          </span>

          <span>
            ${architect.deathYear}
          </span>
        </div>
      `);

    }

  }


  if (architect.location) {

    dateRows.push(`
      <div class="architect-fact">
        <span class="architect-fact-label">
          Based in
        </span>

        <span>
          ${architect.location}
        </span>
      </div>
    `);

  }


  if (
    Array.isArray(architect.founders) &&
    architect.founders.length > 0
  ) {

    dateRows.push(`
      <div class="architect-fact">
        <span class="architect-fact-label">
          Founders
        </span>

        <span>
          ${architect.founders.join(", ")}
        </span>
      </div>
    `);

  }


  /* =========================================
     AWARDS
  ========================================= */

  let awardsMarkup = "";


  if (
    Array.isArray(architect.awards) &&
    architect.awards.length > 0
  ) {

    const sortedAwards =
      [...architect.awards]
        .sort(
          (a, b) =>
            Number(b.year || 0) -
            Number(a.year || 0)
        );


    const awardRows =
      sortedAwards
        .map(
          award => {

            const awardContent = `

              <span class="architect-award-year">
                ${award.year || "—"}
              </span>

              <span class="architect-award-name">
                ${award.name}
              </span>

              <span class="architect-award-recognition">
                ${award.recognition || ""}
              </span>

            `;


            if (award.url) {

              return `

                <a
                  class="architect-award-row"
                  href="${award.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${awardContent}
                </a>

              `;

            }


            return `

              <div class="architect-award-row">
                ${awardContent}
              </div>

            `;

          }
        )
        .join("");


    awardsMarkup = `

      <section class="architect-awards">

        <div class="architect-section-header">

          <h2>
            Awards & Recognition
          </h2>

          <span>
            ${String(architect.awards.length).padStart(2, "0")}
          </span>

        </div>


        <div class="architect-awards-list">
          ${awardRows}
        </div>

      </section>

    `;

  }


  /* =========================================
     RELATED PROJECTS
  ========================================= */

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


  /* =========================================
     PAGE OUTPUT
  ========================================= */

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


      <div class="architect-detail-content">

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

        </div>


        ${
          dateRows.length > 0
            ? `
              <div class="architect-facts">
                ${dateRows.join("")}
              </div>
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


    ${awardsMarkup}


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
