/* =========================================
   ARCHIVE — COOKIE CONSENT
========================================= */

const ARCHIVE_GTM_ID =
  "GTM-P384GMLB";

const ARCHIVE_CONSENT_KEY =
  "archive_cookie_consent";



/* =========================================
   LOAD GOOGLE TAG MANAGER
========================================= */

function loadArchiveGTM() {

  if (
    window.archiveGtmLoaded
  ) {

    return;

  }


  window.archiveGtmLoaded =
    true;


  window.dataLayer =
    window.dataLayer || [];


  window.dataLayer.push({

    "gtm.start":
      new Date().getTime(),

    event:
      "gtm.js"

  });


  const script =
    document.createElement(
      "script"
    );


  script.async = true;


  script.src =
    "https://www.googletagmanager.com/gtm.js?id=" +
    ARCHIVE_GTM_ID;


  document.head.appendChild(
    script
  );

}



/* =========================================
   CONSENT VALUE
========================================= */

function getArchiveConsent() {

  return localStorage.getItem(
    ARCHIVE_CONSENT_KEY
  );

}


function saveArchiveConsent(
  value
) {

  localStorage.setItem(
    ARCHIVE_CONSENT_KEY,
    value
  );

}



/* =========================================
   REMOVE BANNER
========================================= */

function removeArchiveCookieBanner() {

  const banner =
    document.querySelector(
      ".archive-cookie-banner"
    );


  if (banner) {

    banner.remove();

  }

}



/* =========================================
   SHOW BANNER
========================================= */

function showArchiveCookieBanner() {

  removeArchiveCookieBanner();


  const banner =
    document.createElement(
      "div"
    );


  banner.className =
    "archive-cookie-banner";


  banner.innerHTML = `

    <div class="archive-cookie-copy">

      <p>
        ARCHIVE uses analytics cookies to understand
        how the site is used.
      </p>

      <a href="cookies.html">
        Privacy & cookies ↗
      </a>

    </div>


    <div class="archive-cookie-actions">

      <button
        type="button"
        class="archive-cookie-reject"
      >
        Reject
      </button>

      <button
        type="button"
        class="archive-cookie-accept"
      >
        Accept
      </button>

    </div>

  `;


  document.body.appendChild(
    banner
  );


  const rejectButton =
    banner.querySelector(
      ".archive-cookie-reject"
    );


  const acceptButton =
    banner.querySelector(
      ".archive-cookie-accept"
    );


  rejectButton.addEventListener(
    "click",
    () => {

      const previousConsent =
        getArchiveConsent();


      saveArchiveConsent(
        "denied"
      );


      removeArchiveCookieBanner();


      /*
        If Analytics had already been loaded
        during this page view, reload the page
        so it starts again without GTM.
      */

      if (
        previousConsent ===
        "granted"
      ) {

        window.location.reload();

      }

    }
  );


  acceptButton.addEventListener(
    "click",
    () => {

      saveArchiveConsent(
        "granted"
      );


      removeArchiveCookieBanner();


      loadArchiveGTM();

    }
  );

}



/* =========================================
   COOKIE SETTINGS
========================================= */

window.openArchiveCookieSettings =
  function () {

    showArchiveCookieBanner();

  };



/* =========================================
   INITIALISE
========================================= */

function initArchiveCookieConsent() {

  const consent =
    getArchiveConsent();


  /*
    Analytics is loaded ONLY after consent.
  */

  if (
    consent === "granted"
  ) {

    loadArchiveGTM();

  }


  if (
    consent !== "granted" &&
    consent !== "denied"
  ) {

    showArchiveCookieBanner();

  }


  /*
    Footer link:
    Cookie settings
  */

  const settingsLink =
    document.querySelector(
      "#cookie-settings-link"
    );


  if (settingsLink) {

    settingsLink.addEventListener(
      "click",
      event => {

        event.preventDefault();

        showArchiveCookieBanner();

      }
    );

  }

}



/* navigation.js loads this file after DOMContentLoaded */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initArchiveCookieConsent
  );

} else {

  initArchiveCookieConsent();

}
