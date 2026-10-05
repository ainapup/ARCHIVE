/* =========================================
   ARCHIVE — GOOGLE TAG MANAGER
========================================= */

(function () {

  const GTM_ID = "GTM-P384GMLB";


  /* GTM SCRIPT */

  window.dataLayer =
    window.dataLayer || [];

  window.dataLayer.push({
    "gtm.start":
      new Date().getTime(),
    event:
      "gtm.js"
  });


  const firstScript =
    document.getElementsByTagName(
      "script"
    )[0];


  const gtmScript =
    document.createElement(
      "script"
    );


  gtmScript.async = true;

  gtmScript.src =
    "https://www.googletagmanager.com/gtm.js?id=" +
    GTM_ID;


  firstScript.parentNode.insertBefore(
    gtmScript,
    firstScript
  );


  /* GTM NOSCRIPT FALLBACK */

  const noscript =
    document.createElement(
      "noscript"
    );


  noscript.innerHTML = `

    <iframe
      src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0"
      width="0"
      style="display:none;visibility:hidden"
    ></iframe>

  `;


  document.addEventListener(
    "DOMContentLoaded",
    () => {

      document.body.insertBefore(
        noscript,
        document.body.firstChild
      );

    }
  );

})();



/* =========================================
   ARCHIVE — GLOBAL NAVIGATION
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


    /* -----------------------------------------
       HEADER
    ----------------------------------------- */

    const header =
      document.querySelector(
        ".site-header"
      );


    if (header) {

      header.innerHTML = `

        <a
          class="logo"
          href="index.html"
        >
          ARCHIVE
        </a>


        <button
          class="mobile-menu-button"
          type="button"
          aria-label="Open menu"
          aria-expanded="false"
        >
          MENU
        </button>


        <nav class="main-nav">

          <a
            href="index.html#places"
            data-page="index"
          >
            Places
          </a>

          <a
            href="architects.html"
            data-page="architects"
          >
            Architects
          </a>

          <a
            href="destinations.html"
            data-page="destinations"
          >
            Destinations
          </a>

          <a
            href="map.html"
            data-page="map"
          >
            Map
          </a>

          <a
            href="search.html"
            data-page="search"
          >
            Search
          </a>

          <a
            href="about.html"
            data-page="about"
          >
            About
          </a>

        </nav>

      `;

    }



    /* -----------------------------------------
       MOBILE MENU
    ----------------------------------------- */

    const mobileMenu =
      document.createElement(
        "div"
      );


    mobileMenu.className =
      "mobile-menu";


    mobileMenu.innerHTML = `

      <div class="mobile-menu-top">

        <a
          class="mobile-logo"
          href="index.html"
        >
          ARCHIVE
        </a>

        <button
          class="mobile-menu-close"
          type="button"
          aria-label="Close menu"
        >
          CLOSE
        </button>

      </div>


      <nav class="mobile-menu-nav">

        <a href="index.html#places">
          Places
        </a>

        <a href="architects.html">
          Architects
        </a>

        <a href="destinations.html">
          Destinations
        </a>

        <a href="map.html">
          Map
        </a>

        <a href="search.html">
          Search
        </a>

        <a href="about.html">
          About
        </a>

        <a href="submit.html">
          Submit a place
        </a>

        <a href="contact.html">
          Contact
        </a>

      </nav>

    `;


    document.body.appendChild(
      mobileMenu
    );


    const menuButton =
      document.querySelector(
        ".mobile-menu-button"
      );

    const closeButton =
      document.querySelector(
        ".mobile-menu-close"
      );


    function openMenu() {

      mobileMenu.classList.add(
        "is-open"
      );

      document.body.classList.add(
        "menu-open"
      );


      if (menuButton) {

        menuButton.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    }


    function closeMenu() {

      mobileMenu.classList.remove(
        "is-open"
      );

      document.body.classList.remove(
        "menu-open"
      );


      if (menuButton) {

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }


    if (menuButton) {

      menuButton.addEventListener(
        "click",
        openMenu
      );

    }


    if (closeButton) {

      closeButton.addEventListener(
        "click",
        closeMenu
      );

    }


    document
      .querySelectorAll(
        ".mobile-menu-nav a"
      )
      .forEach(
        link => {

          link.addEventListener(
            "click",
            closeMenu
          );

        }
      );


    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape"
        ) {

          closeMenu();

        }

      }
    );



    /* -----------------------------------------
       ACTIVE NAVIGATION
    ----------------------------------------- */

    const currentFile =
      window.location.pathname
        .split("/")
        .pop() ||
      "index.html";


    const pageMap = {

      "index.html":
        "index",

      "architects.html":
        "architects",

      "architect.html":
        "architects",

      "destinations.html":
        "destinations",

      "destination.html":
        "destinations",

      "map.html":
        "map",

      "search.html":
        "search",

      "about.html":
        "about"

    };


    const activePage =
      pageMap[currentFile];


    if (activePage) {

      document
        .querySelectorAll(
          `.main-nav a[data-page="${activePage}"]`
        )
        .forEach(
          link => {

            link.classList.add(
              "nav-active"
            );

          }
        );

    }



    /* -----------------------------------------
       FOOTER
    ----------------------------------------- */

    const footer =
      document.createElement(
        "footer"
      );


    footer.className =
      "site-footer";


    footer.innerHTML = `

      <div class="footer-top">


        <div class="footer-brand">

          <a href="index.html">
            ARCHIVE
          </a>

          <p>
            Places shaped by architecture.
          </p>

        </div>


        <div class="footer-column">

          <span class="footer-label">
            Explore
          </span>

          <a href="index.html#places">
            Places
          </a>

          <a href="architects.html">
            Architects
          </a>

          <a href="destinations.html">
            Destinations
          </a>

          <a href="map.html">
            Map
          </a>

          <a href="search.html">
            Search
          </a>

        </div>


        <div class="footer-column">

          <span class="footer-label">
            Archive
          </span>

          <a href="about.html">
            About
          </a>

          <a href="submit.html">
            Submit a place
          </a>

          <a href="contact.html">
            Contact
          </a>

        </div>


        <div class="footer-column">

          <span class="footer-label">
            Follow
          </span>

          <span class="footer-muted">
            Instagram
          </span>

        </div>

      </div>


      <div class="footer-bottom">

        <span>
          © ARCHIVE
          ${new Date().getFullYear()}
        </span>

        <span>
          Curated architecture for travel.
        </span>

      </div>

    `;


    document.body.appendChild(
      footer
    );

  }
);
