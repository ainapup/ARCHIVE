const destinationsIndex = document.querySelector("#destinations-index");


const continentOrder = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania"
];


const groupedDestinations = {};


projects.forEach((project) => {

  if (!groupedDestinations[project.continent]) {
    groupedDestinations[project.continent] = {};
  }

  if (!groupedDestinations[project.continent][project.country]) {
    groupedDestinations[project.continent][project.country] = 0;
  }

  groupedDestinations[project.continent][project.country]++;

});


continentOrder.forEach((continent) => {

  const countries = groupedDestinations[continent];

  if (!countries) {
    return;
  }

  const section = document.createElement("section");

  section.classList.add("continent-section");


  const sortedCountries = Object.keys(countries).sort(
    (a, b) => a.localeCompare(b)
  );


  const countryRows = sortedCountries
    .map((country) => {

      const count = countries[country];

      return `

        <a
          class="destination-row"
          href="index.html?country=${encodeURIComponent(country)}#places"
        >

          <span class="destination-name">
            ${country}
          </span>

          <span class="destination-count">
            ${String(count).padStart(2, "0")}
          </span>

        </a>

      `;

    })
    .join("");


  section.innerHTML = `

    <div class="continent-name">
      ${continent}
    </div>

    <div class="country-list">
      ${countryRows}
    </div>

  `;


  destinationsIndex.appendChild(section);

});
