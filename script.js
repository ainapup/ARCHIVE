const projects = [
  {
    id: "casa-wabi",
    title: "Casa Wabi",
    architect: "Tadao Ando",
    city: "Puerto Escondido",
    country: "Mexico",
    continent: "North America",
    type: "STAY",
    year: "2014",

    image: "images/casa-wabi.jpg",

    website: "",
    booking: ""
  }
];


const projectGrid = document.querySelector(".project-grid");
const filterButtons = document.querySelectorAll(".filters button");


function renderProjects(filter = "ALL") {

  projectGrid.innerHTML = "";

  const filteredProjects =
    filter === "ALL"
      ? projects
      : projects.filter(project => project.type === filter);


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

    const filter = button.textContent.trim().toUpperCase();

    renderProjects(filter);

  });

});


renderProjects();
