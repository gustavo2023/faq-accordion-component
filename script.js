const accordionElements = document.querySelectorAll(".accordion");

const togglePanelVisibility = (panel) => {
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
};

const handleAccordionClick = (accordion) => {
  accordion.classList.toggle("active");

  const panel = accordion.nextElementSibling;

  if (panel) {
    togglePanelVisibility(panel);
  }
};

// Function to set initial state for the first accordion
const setInitialAccordionState = () => {
  const firstAccordion = document.querySelector(".accordion.active");

  if (firstAccordion) {
    const panel = firstAccordion.nextElementSibling;

    if (panel) {
      panel.style.transition = "none";
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.offsetHeight;
      panel.style.transition = "";
    }
  }
};

document.addEventListener("DOMContentLoaded", setInitialAccordionState);

accordionElements.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    handleAccordionClick(accordion);
  });
});
