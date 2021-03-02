/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navbarList = document.querySelector("#navbar__list");

const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * Inspired by:
 * https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
 *
 */

const isInViewport = (element) => {
  const { top, left, right } = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  /**
   * we consider it to be near top of viewport
   * if it's in the top 1/10 of the screen
   */
  const topViewport = viewportHeight * 0.1;

  return (
    top >= -topViewport &&
    top < topViewport &&
    left >= 0 &&
    right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const addSections = (sections) => {
  const fragment = document.createDocumentFragment();

  for (const element of sections) {
    const listItem = document.createElement("li");
    const linkElement = document.createElement("a");
    linkElement.innerText = element.getAttribute("data-nav");
    linkElement.setAttribute("href", `#${element.getAttribute("id")}`);
    linkElement.setAttribute("class", "menu__link");
    listItem.appendChild(linkElement);
    fragment.appendChild(listItem);
  }

  navbarList.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport
const getSectionInViewport = (sections) => {
  const main = document.querySelector("main");
  const sectionInViewport = main.querySelector(".your-active-class");

  for (const element of sections) {
    const isSectionInViewport = isInViewport(element);
    if (isSectionInViewport && sectionInViewport !== element) {
      // to reduce number of reflows
      main.style.display = "none";

      if (sectionInViewport) {
        sectionInViewport.classList.remove("your-active-class");
      }

      element.classList.add("your-active-class");
      // to reduce number of reflows
      main.style.display = "block";
      break;
    }
  }
};

// Scroll to anchor ID using scrollTO event

const scrollToSection = (e) => {
  if (e.target.nodeName === "A") {
    e.preventDefault();
    const section = e.target.getAttribute("href");
    const { top } = document.querySelector(section).getBoundingClientRect();
    window.scrollTo({ top: top + window.pageYOffset, behavior: "smooth" });
  }
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
addSections(sections);

// Scroll to section on link click
navbarList.addEventListener("click", scrollToSection);

// Set sections as active
document.addEventListener("scroll", () => getSectionInViewport(sections));
