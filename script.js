const projectGrid = document.querySelector(".project-grid");
const filterButtons = document.querySelectorAll(".filters button");


const params = new URLSearchParams(window.location.search);

const architectFilter = params.get("architect");
const countryFilter = params.get("country");


function renderProjects(typeFilter = "ALL") {

  projectGrid.innerHTML = "";


  let filteredProjects = [...projects];


  if (architectFilter) {

    filteredProjects = filteredProjects.filter(
      project => project.architect === architectFilter
    );

  }


  if (countryFilter) {

    filteredProjects = filteredProjects.filter(
      project => project.country === countryFilter
    );

  }


  if (typeFilter !== "ALL") {

    filteredProjects = filteredProjects.filter(
      project => project.type === typeFilter
    );

  }


  if (filteredProjects.length === 0) {

    projectGrid.innerHTML = `

      <div class="empty-results">
        No projects found.
      </div>

    `;

    return;

  }


  filteredProjects.forEach((project, index) => {

    const article = document.createElement("article");

    article.classList.add("project");

    article.innerHTML = `

      <a class="project-link" href="project.html?id=${project.id}">

        <div class="project-image">

          <img
            src="${project.image}"
            alt="${project.title}"
            loading="lazy"
          >

          <span class="project-number">
            ${String(index + 1).padStart(2, "0")}
          </span>

        </div>

        <div class="project-info">

          <h3>${project.title}</h3>

          <p>${project.architect}</p>

          <p>${project.city}, ${project.country}</p>

          <span class="project-type">
            ${project.type}
          </span>

        </div>

      </a>

    `;

    projectGrid.appendChild(article);

  });

}


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const filter =
      button.textContent.trim().toUpperCase();

    renderProjects(filter);

  });

});


renderProjects();
