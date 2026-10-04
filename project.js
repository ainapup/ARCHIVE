const params = new URLSearchParams(window.location.search);

const projectId = params.get("id");

const project = projects.find(
  item => item.id === projectId
);

const detail = document.querySelector("#project-detail");


if (!project) {

  detail.innerHTML = `
    <section class="project-not-found">
      Project not found.
    </section>
  `;

} else {

  document.title = `ARCHIVE — ${project.title}`;


  const gallery = project.images
    .map((image, index) => {

      return `

        <figure class="project-gallery-item">

          <img
            src="${image}"
            alt="${project.title} — ${index + 1}"
            loading="lazy"
          >

        </figure>

      `;

    })
    .join("");


  const websiteLink = project.website
    ? `
      <a
        href="${project.website}"
        target="_blank"
        rel="noopener"
        class="project-external-link"
      >
        Website ↗
      </a>
    `
    : "";


  const bookingLink = project.booking
    ? `
      <a
        href="${project.booking}"
        target="_blank"
        rel="noopener"
        class="project-external-link"
      >
        Book ↗
      </a>
    `
    : "";


  detail.innerHTML = `

    <section class="project-hero">

      <div class="project-page-top">

        <span>
          ${project.type}
        </span>

        <span>
          ARCHIVE / ${project.id}
        </span>

      </div>


      <h1>
        ${project.title}
      </h1>


      <div class="project-page-meta">

        <div>

          <span class="meta-label">
            Architect
          </span>

          <a
            href="index.html?architect=${encodeURIComponent(project.architect)}#places"
          >
            ${project.architect}
          </a>

        </div>


        <div>

          <span class="meta-label">
            Location
          </span>

          <a
            href="index.html?country=${encodeURIComponent(project.country)}#places"
          >
            ${project.city}, ${project.country}
          </a>

        </div>


        <div>

          <span class="meta-label">
            Year
          </span>

          <span>
            ${project.year}
          </span>

        </div>

      </div>

    </section>


    <section class="project-intro">

      <div class="project-description">

        <p>
          ${project.description}
        </p>

      </div>


      <div class="project-links">

        ${websiteLink}

        ${bookingLink}

      </div>

    </section>


    <section class="project-gallery">

      ${gallery}

    </section>


    <section class="project-data">

      <div>

        <span class="meta-label">
          Architect
        </span>

        <p>
          ${project.architect}
        </p>

      </div>


      <div>

        <span class="meta-label">
          Destination
        </span>

        <p>
          ${project.country}
        </p>

      </div>


      <div>

        <span class="meta-label">
          Type
        </span>

        <p>
          ${project.type}
        </p>

      </div>


      <div>

        <span class="meta-label">
          Year
        </span>

        <p>
          ${project.year}
        </p>

      </div>

    </section>

  `;

}
