const projects = [
  {
    id: 1,
    title: "Casa Wabi",
    architect: "Tadao Ando",
    location: "Puerto Escondido, Mexico",
    country: "Mexico",
    continent: "North America",
    type: "STAY",
    image: "images/casa-wabi.jpg"
  },

  {
    id: 2,
    title: "Juvet Landscape Hotel",
    architect: "Jensen & Skodvin",
    location: "Valldal, Norway",
    country: "Norway",
    continent: "Europe",
    type: "STAY",
    image: "images/juvet.jpg"
  },

  {
    id: 3,
    title: "Shiroiya Hotel",
    architect: "Sou Fujimoto",
    location: "Maebashi, Japan",
    country: "Japan",
    continent: "Asia",
    type: "STAY",
    image: "images/shiroiya.jpg"
  },

  {
    id: 4,
    title: "Benesse House",
    architect: "Tadao Ando",
    location: "Naoshima, Japan",
    country: "Japan",
    continent: "Asia",
    type: "STAY",
    image: "images/benesse.jpg"
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

        <p>${project.location}</p>

        <span class="project-type">
          ${project.type}
        </span>

      </div>

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
