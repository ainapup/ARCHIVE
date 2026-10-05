/* =========================================
   ARCHIVE — BOOKING TRACKING
========================================= */


/* =========================================
   BUILD TRACKED URL
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

    console.error(
      "ARCHIVE — Invalid booking URL",
      error
    );


    return originalUrl;

  }

}


/* =========================================
   TRACK BOOKING CLICK
========================================= */

function trackBookingClick(link) {

  window.dataLayer =
    window.dataLayer || [];


  const bookingEvent = {

    event:
      "booking_click",

    project_id:
      link.dataset.projectId || "",

    project_name:
      link.dataset.projectName || "",

    architect:
      link.dataset.architect || "",

    country:
      link.dataset.country || "",

    booking_url:
      link.href || ""

  };


  window.dataLayer.push(
    bookingEvent
  );


  console.log(
    "ARCHIVE booking_click",
    bookingEvent
  );

}


/* =========================================
   GLOBAL CLICK LISTENER
========================================= */

document.addEventListener(
  "click",
  event => {

    const bookingLink =
      event.target.closest(
        "[data-booking-url]"
      );


    if (!bookingLink) {
      return;
    }


    trackBookingClick(
      bookingLink
    );

  }
);


/* =========================================
   APPLY UTM PARAMETERS
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
