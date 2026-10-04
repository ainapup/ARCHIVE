/* =========================================
   ARCHIVE — ARCHITECTS DATA LOADER
========================================= */

async function loadArchitects() {

  try {

    const response = await fetch(
      "data/architects.json",
      {
        cache: "no-store"
      }
    );


    if (!response.ok) {

      throw new Error(
        `Could not load architects: ${response.status}`
      );

    }


    const architects =
      await response.json();


    return architects;


  } catch (error) {

    console.error(
      "ARCHIVE — Error loading architects:",
      error
    );


    return [];

  }

}
