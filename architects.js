const architectsIndex = document.querySelector("#architects-index");


const architects = [...new Set(
  projects.map(project => project.architect)
)];


architects.sort((a, b) => a.localeCompare(b));


const groupedArchitects = {};


architects.forEach((architect) => {

  const letter = architect.charAt(0).toUpperCase();

  if (!groupedArchitects[letter]) {
    groupedArchitects[letter] = [];
  }

  groupedArchitects[letter].push(architect);

});


Object.keys(groupedArchitects)
  .sort()
  .forEach((letter) => {

    const group = document.createElement("section");

    group.classList.add("architect-letter-group");

    const names = groupedArchitects[letter]
      .map((architect) => {

        const projectCount = projects.filter(
          project => project.architect === architect
        ).length;

        return `
          <a
            class="architect-row"
            href="index.html?architect=${encodeURIComponent(architect)}#places"
          >

            <span class="architect-name">
              ${architect}
            </span>

            <span class="architect-count">
              ${String(projectCount).padStart(2, "0")}
            </span>

          </a>
        `;

      })
      .join("");


    group.innerHTML = `

      <div class="architect-letter">
        ${letter}
      </div>

      <div class="architect-names">
        ${names}
      </div>

    `;


    architectsIndex.appendChild(group);

  });
