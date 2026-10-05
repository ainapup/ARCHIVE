/* =========================================
   ARCHIVE — ARCHITECTS INDEX
========================================= */

const architectsIndex =
  document.querySelector(
    "#architects-index"
  );

const architectSearch =
  document.querySelector(
    "#architect-search"
  );


let architects = [];
let projects = [];


/* =========================================
   INITIALISE
========================================= */

async function initArchitects() {

  architects =
    await loadArchitects();

  projects =
    await loadProjects();


  architects.sort(
    (a, b) =>
      a.name.localeCompare(b.name)
  );


  renderArchitects(
    architects
  );

}


initArchitects();


/* =========================================
   SEARCH
========================================= */

architectSearch.addEventListener(
  "input",
  () => {

    const searchTerm =
      architectSearch
        .value
        .trim()
        .toLowerCase();


    const filtered =
      architects.filter(
        architect => {

          const searchable = `
            ${architect.name || ""}
            ${architect.location || ""}
            ${architect.category || ""}
          `
          .toLowerCase();


          return searchable.includes(
            searchTerm
          );

        }
      );


    renderArchitects(
      filtered
    );

  }
);


/* =========================================
   RENDER
========================================= */

function renderArchitects(
  architectList
) {

  architectsIndex.innerHTML = "";


  if (
    architectList.length === 0
  ) {

    architectsIndex.innerHTML = `

      <div class="empty-results">
        No architects found.
      </div>

    `;

    return;

  }


  const grouped = {};


  architectList.forEach(
    architect => {

      const letter =
        architect.name
          .charAt(0)
          .toUpperCase();


      if (!grouped[letter]) {

        grouped[letter] = [];

      }


      grouped[letter].push(
        architect
      );

    }
  );


  Object.keys(grouped)
    .sort()
    .forEach(
      letter => {

        const section =
          document.createElement(
            "section"
          );


        section.classList.add(
          "architect-letter-group"
        );


        const rows =
          grouped[letter]
            .map(
              architect => {

                const projectCount =
                  projects.filter(
                    project =>
                      project.architectId === architect.id ||

                      (
                        !project.architectId &&
                        project.architect === architect.name
                      )
                  ).length;


                return `

                  <a
                    class="architect-row"
                    href="architect.html?id=${encodeURIComponent(architect.id)}"
                  >

                    <span class="architect-name">
                      ${architect.name}
                    </span>


                    <span class="architect-row-location">
                      ${architect.location || ""}
                    </span>


                    <span class="architect-count">
                      ${String(projectCount).padStart(2, "0")}
                    </span>

                  </a>

                `;

              }
            )
            .join("");


        section.innerHTML = `

          <div class="architect-letter">
            ${letter}
          </div>

          <div class="architect-names">
            ${rows}
          </div>

        `;


        architectsIndex.appendChild(
          section
        );

      }
    );

}
