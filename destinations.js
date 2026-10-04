const destinationsGrid =
  document.querySelector("#destinations-grid");


destinations.forEach((destination, index) => {

  const projectCount = projects.filter(
    project => project.country === destination.country
  ).length;


  /*
    Si todavía no tenemos ningún proyecto
    de ese país, no lo mostramos.
  */

  if (projectCount === 0) {
    return;
  }


  const article = document.createElement("article");

  article.classList.add("destination-card");


  article.innerHTML = `

    <a
      class="destination-card-link"
      href="index.html?country=${encodeURIComponent(destination.country)}#places"
    >

      <div class="destination-image">

        <img
          src="${destination.image}"
          alt="${destination.country}"
          loading="lazy"
        >

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
            ${projectCount === 1 ? "project" : "projects"}
          </span>

        </div>

      </div>

    </a>

  `;


  destinationsGrid.appendChild(article);

});
