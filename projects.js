/* =========================================
   ARCHIVE — PROJECT DATA LOADER
========================================= */

async function loadProjects() {

  try {

    const response = await fetch(
      "data/projects.json",
      {
        cache: "no-store"
      }
    );


    if (!response.ok) {

      throw new Error(
        `Could not load projects: ${response.status}`
      );

    }


    const projects = await response.json();


    return projects;


  } catch (error) {

    console.error(
      "ARCHIVE — Error loading projects:",
      error
    );


    return [];

  }

}
