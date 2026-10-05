/* =========================================
   ARCHIVE — PROJECT DATA LOADER
========================================= */

async function loadProjects() {

  try {

    const response =
      await fetch(
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


    const projects =
      await response.json();


    return projects;


  } catch (error) {

    console.error(
      "ARCHIVE — Error loading projects:",
      error
    );


    return [];

  }

}



/* =========================================
   PROJECT ARCHITECTS
   Supports new + legacy data
========================================= */

function getProjectArchitects(project) {

  /*
    NEW FORMAT
  */

  if (
    Array.isArray(project.architects) &&
    project.architects.length > 0
  ) {

    return project.architects
      .filter(
        architect =>
          architect &&
          (
            architect.name ||
            architect.id
          )
      )
      .map(
        architect => ({

          name:
            architect.name || "",

          id:
            architect.id || ""

        })
      );

  }


  /*
    LEGACY FORMAT
  */

  if (
    project.architect ||
    project.architectId
  ) {

    return [
      {

        name:
          project.architect || "",

        id:
          project.architectId || ""

      }
    ];

  }


  return [];

}



/* =========================================
   DISPLAY ARCHITECT NAMES
========================================= */

function getProjectArchitectNames(
  project
) {

  return getProjectArchitects(
    project
  )
    .map(
      architect =>
        architect.name
    )
    .filter(Boolean)
    .join(" · ");

}



/* =========================================
   PROJECT BELONGS TO ARCHITECT
========================================= */

function projectHasArchitect(
  project,
  architect
) {

  const projectArchitects =
    getProjectArchitects(
      project
    );


  return projectArchitects.some(
    item => {

      if (
        item.id &&
        architect.id
      ) {

        return (
          item.id ===
          architect.id
        );

      }


      return (
        item.name ===
        architect.name
      );

    }
  );

}
