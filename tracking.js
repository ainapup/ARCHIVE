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
   DATA LAYER EVENT
========================================= */

function trackBookingClick(link) {

  window.dataLayer =
    window.dataLayer || [];


  window.dataLayer.push({

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

  });

}


/* =========================================
   APPLY BOOKING TRACKING
========================================= */

function applyBookingTracking() {

  const bookingLinks =
    document.querySelectorAll(
      "[data-booking-url]"
    );


  bookingLinks.forEach(
    link => {

      if (
        link.dataset.trackingReady ===
        "true"
      ) {

        return;

      }


      const originalUrl =
        link.dataset.bookingUrl;

      const projectId =
        link.dataset.projectId || "";


      link.href =
        buildTrackedUrl(
          originalUrl,
          projectId
        );


      link.addEventListener(
        "click",
        () => {

          trackBookingClick(link);

        }
      );


      link.dataset.trackingReady =
        "true";

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
