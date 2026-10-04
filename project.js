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


const params = new URLSearchParams(window.location.search);

const projectId = params.get("id");

const project = projects.find(item => item.id === projectId);

const detail = document.querySelector("#project-detail");


if (!project) {

  detail.innerHTML = `
    <section class="project-not-found">
      Project not found.
    </section>
  `;

} else {

  document.title = `ARCHIVE — ${project.title}`;

  detail.innerHTML = `

    <section class="project-hero">

      <div class="project-page-top">

        <span>${project.type}</span>

        <span>ARCHIVE / ${project.id}</span>

      </div>


      <h1>${project.title}</h1>


      <div class="project-page-meta">

        <div>
          <span class="meta-label">Architect</span>
          <span>${project.architect}</span>
        </div>

        <div>
          <span class="meta-label">Location</span>
          <span>${project.city}, ${project.country}</span>
        </div>

        <div>
          <span class="meta-label">Year</span>
          <span>${project.year}</span>
        </div>

      </div>

    </section>


    <section class="project-main-image">

      <img
        src="${project.image}"
        alt="${project.title}"
      >

    </section>


    <section class="project-data">

      <div>

        <span class="meta-label">Architect</span>

        <p>${project.architect}</p>

      </div>


      <div>

        <span class="meta-label">Destination</span>

        <p>${project.country}</p>

      </div>


      <div>

        <span class="meta-label">Type</span>

        <p>${project.type}</p>

      </div>


      <div>

        <span class="meta-label">Year</span>

        <p>${project.year}</p>

      </div>

    </section>

  `;

}
