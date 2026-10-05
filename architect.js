/* =========================================
   ARCHIVE — ARCHITECT DETAIL
========================================= */


const params =
  new URLSearchParams(
    window.location.search
  );


const architectId =
  params.get("id");


const detail =
  document.querySelector(
    "#architect-detail"
  );



/* =========================================
   INITIALISE
========================================= */

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

    detail.innerHTML = `

      <section class="architect-not-found">
        Architect not found.
      </section>

    `;

    return;

  }


  document.title =
    `ARCHIVE — ${architect.name}`;



  /* =========================================
     RELATED PROJECTS
  ========================================= */

  const relatedProjects =
    projects.filter(
      project => {

        const projectArchitects =
          getProjectArchitects(
            project
          );


        return projectArchitects.some(
          item =>
            item.id === architect.id ||
            item.name === architect.name
        );

      }
    );



  /* =========================================
     FACTS
  ========================================= */

  const facts = [];


  const isStudio =
    architect.category === "Architecture studio" ||
    architect.category === "Design studio";


  if (isStudio) {

    if (architect.foundedYear) {

      facts.push({
        label: "Founded",
        value: architect.foundedYear
      });

    }


    if (architect.closedYear) {

      facts.push({
        label: "Closed",
        value: architect.closedYear
      });

    }


    if (
      Array.isArray(
        architect.founders
      ) &&
      architect.founders.length > 0
    ) {

      facts.push({
        label: "Founders",
        value:
          architect.founders.join(", ")
      });

    }

  } else {

    if (architect.birthYear) {

      facts.push({
        label: "Born",
        value: architect.birthYear
      });

    }


    if (architect.deathYear) {

      facts.push({
        label: "Died",
        value: architect.deathYear
      });

    }

  }


  if (architect.location) {

    facts.push({
      label: "Based in",
      value: architect.location
    });

  }



  /* =========================================
     FACTS MARKUP
  ========================================= */

  const factsMarkup =
    facts
      .map(
        fact => `

          <div class="architect-fact">

            <span>
              ${fact.label}
            </span>

            <strong>
              ${fact.value}
            </strong>

          </div>

        `
      )
      .join("");



  /* =========================================
     WEBSITE
  ========================================= */

  const websiteMarkup =
    architect.website
      ? `

        <a
          class="architect-website"
          href="${architect.website}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official website ↗
        </a>

      `
      : "";



  /* =========================================
     IMAGE
  ========================================= */

  const imageMarkup =
    architect.image
      ? `

        <div class="architect-portrait">

          <img
            src="${architect.image}"
            alt="${architect.name}"
          >

        </div>

      `
      : `

        <div class="architect-portrait architect-portrait-empty">

          <span>
            Image
          </span>

        </div>

      `;



  /* =========================================
     AWARDS
  ========================================= */

  let awardsMarkup = "";


  if (
    Array.isArray(
      architect.awards
    ) &&
    architect.awards.length > 0
  ) {

    const sortedAwards =
      [...architect.awards]
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

              <span class="architect-award-year">
                ${award.year || "—"}
              </span>

              <span class="architect-award-name">
                ${award.name || ""}
              </span>

              <span class="architect-award-recognition">
                ${award.recognition || ""}
              </span>

            `;


            if (award.url) {

              return `

                <a
                  href="${award.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="architect-award-row"
                >
                  ${content}
                </a>

              `;

            }


            return `

              <div class="architect-award-row">
                ${content}
              </div>

            `;

          }
        )
        .join("");


    awardsMarkup = `

      <section class="architect-awards">

        <div class="architect-section-header">

          <span>
            Awards & Recognition
          </span>

          <span>
            ${String(architect.awards.length).padStart(2, "0")}
          </span>

        </div>


        <div class="architect-awards-list">
          ${rows}
        </div>

      </section>

    `;

  }



  /* =========================================
     RELATED PLACES
  ========================================= */

  let relatedMarkup = "";


  if (
    relatedProjects.length > 0
  ) {

    const cards =
      relatedProjects
        .map(
          (project, index) => {

            const image =
              Array.isArray(
                project.images
              ) &&
              project.images.length > 0

                ? project.images[0]

                : "";


            return `

              <article class="architect-related-card">

                <a
                  href="project.html?id=${encodeURIComponent(project.id)}"
                  class="architect-related-link"
                >

                  <div class="architect-related-image">

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


                    <span>
                      ${String(index + 1).padStart(2, "0")}
                    </span>

                  </div>


                  <div class="architect-related-info">

                    <h3>
                      ${project.title}
                    </h3>


                    <p>
                      ${project.city},
                      ${project.country}
                    </p>


                    <p class="architect-related-type">
                      ${project.type || ""}
                    </p>

                  </div>

                </a>

              </article>

            `;

          }
        )
        .join("");


    relatedMarkup = `

      <section class="architect-related">

        <div class="architect-section-header">

          <span>
            Related places
          </span>

          <span>
            ${String(relatedProjects.length).padStart(2, "0")}
          </span>

        </div>


        <div class="architect-related-grid">

          ${cards}

        </div>

      </section>

    `;

  }



  /* =========================================
     OUTPUT
  ========================================= */

  detail.innerHTML = `


    <!-- =====================================
         HERO
    ====================================== -->

    <section class="architect-detail-hero">


      <div class="architect-detail-kicker">

        <span>
          ARCHIVE / ARCHITECT
        </span>

      </div>


      <h1>
        ${architect.name}
      </h1>


      <div class="architect-summary">

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



    <!-- =====================================
         ABOUT
    ====================================== -->

    <section class="architect-about">


      <div class="architect-about-text">


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
          facts.length > 0
            ? `

              <div class="architect-facts">
                ${factsMarkup}
              </div>

            `
            : ""
        }


        ${websiteMarkup}


      </div>


      ${imageMarkup}


    </section>



    ${awardsMarkup}


    ${relatedMarkup}


  `;

}


initArchitect();
