const destinationsGrid =
  document.querySelector("#destinations-grid");


/*
=========================================
CREATE DESTINATIONS FROM PROJECTS
=========================================
*/

const destinationsMap = {};


projects.forEach((project) => {

  /*
    If the country does not exist yet,
    create it using this project's data.
  */

  if (!destinationsMap[project.country]) {

    destinationsMap[project.country] = {

      country: project.country,

      continent: project.continent,

      projects: [],

      image:
        project.images &&
        project.images.length > 0
          ? project.images[0]
          : ""

    };

  }


  /*
    Add project to its country.
  */

  destinationsMap[project.country].projects.push(project);

});


/*
=========================================
CONVERT TO ARRAY
=========================================
*/

const destinations =
  Object.values(destinationsMap);


/*
=========================================
SORT COUNTRIES ALPHABETICALLY
=========================================
*/

destinations.sort((a, b) =>
  a.country.localeCompare(b.country)
);


/*
=========================================
RENDER DESTINATIONS
=========================================
*/

destinations.forEach((destination, index) => {

  const projectCount =
    destination.projects.length;


  const article =
    document.createElement("article");

  article.classList.add(
    "destination-card"
  );


  article.innerHTML = `

    <a
      class="destination-card-link"
      href="index.html?country=${encodeURIComponent(destination.country)}#places"
    >

      <div class="destination-image">

        ${
          destination.image
            ? `
              <img
                src="${destination.image}"
                alt="${destination.country}"
                loading="lazy"
              >
            `
            : ""
        }

        <span class="destination-number">
          ${String(index + 1).padStart(2, "0")}
        </span>

      </div>


      <div class="destination-info">

        <h2>
          ${destination.country}
        </h2>


        <div class="destination-meta">

          <span>
            ${destination.continent}
          </span>

          <span>

            ${String(projectCount).padStart(2, "0")}

            ${
              projectCount === 1
                ? "project"
                : "projects"
            }

          </span>

        </div>

      </div>

    </a>

  `;


  destinationsGrid.appendChild(article);

});
