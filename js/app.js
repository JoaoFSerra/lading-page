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

    // add active to the menu link corresponding to section1
    if (element.id === "section1") {
      linkElement.setAttribute("class", "active");
    }

    linkElement.innerText = element.getAttribute("data-nav");
    linkElement.setAttribute("href", `#${element.getAttribute("id")}`);
    linkElement.classList.add("menu__link");
    listItem.appendChild(linkElement);
    fragment.appendChild(listItem);
  }

  navbarList.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport
const getSectionInViewport = (sections) => {
  const main = document.querySelector("main");
  //select the current active section
  const sectionInViewport = main.querySelector(".your-active-class");
  //select the menu link corresponding to the active section
  const activeMenuLink = navbarList.querySelector(".active");

  for (const element of sections) {
    const isSectionInViewport = isInViewport(element);
    if (isSectionInViewport && sectionInViewport !== element) {
      // to reduce number of reflows
      main.style.display = "none";
      navbarList.style.display = "none";

      if (sectionInViewport) {
        sectionInViewport.classList.remove("your-active-class");
        activeMenuLink.classList.remove("active");
      }

      // add active classes to the new section and menu link
      element.classList.add("your-active-class");
      const navLink = navbarList.querySelector(`a[href="#${element.id}"]`);
      navLink.classList.add("active");

      // to reduce number of reflows
      main.style.display = "block";
      navbarList.style.display = "block";
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
