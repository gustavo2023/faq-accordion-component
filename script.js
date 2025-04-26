const accordionElements = document.querySelectorAll(".accordion");

accordionElements.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    accordion.classList.toggle("active");
    const panel = accordion.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});
