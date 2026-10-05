/* =========================================
   ARCHIVE — OUTBOUND LINK TRACKING
========================================= */


/* =========================================
   ADD ARCHIVE REFERRAL PARAMETERS
========================================= */

function buildTrackedUrl(
  originalUrl,
  projectId = ""
) {

  if (!originalUrl) {
    return "";
  }


  try {

    const url =
      new URL(
        originalUrl,
        window.location.href
      );


    /*
      Do not overwrite existing UTM values
      if a partner has supplied specific ones.
    */

    if (
      !url.searchParams.has(
        "utm_source"
      )
    ) {

      url.searchParams.set(
        "utm_source",
        "archive"
      );

    }


    if (
      !url.searchParams.has(
        "utm_medium"
      )
    ) {

      url.searchParams.set(
        "utm_medium",
        "referral"
      );

    }


    if (
      !url.searchParams.has(
        "utm_campaign"
      )
    ) {

      url.searchParams.set(
        "utm_campaign",
        "booking"
      );

    }


    if (
      projectId &&
      !url.searchParams.has(
        "utm_content"
      )
    ) {

      url.searchParams.set(
        "utm_content",
        projectId
      );

    }


    return url.toString();


  } catch (error) {

    console.warn(
      "ARCHIVE — Could not track URL:",
      originalUrl
    );


    return originalUrl;

  }

}


/* =========================================
   APPLY TRACKING TO BOOKING LINKS
========================================= */

function applyBookingTracking() {

  const bookingLinks =
    document.querySelectorAll(
      "[data-booking-url]"
    );


  bookingLinks.forEach(
    link => {

      const originalUrl =
        link.dataset.bookingUrl;

      const projectId =
        link.dataset.projectId || "";


      link.href =
        buildTrackedUrl(
          originalUrl,
          projectId
        );

    }
  );

}


/* =========================================
   INITIALISE
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    applyBookingTracking();

  }
);
