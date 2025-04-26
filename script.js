const accordionButtons = document.querySelectorAll(".accordion");

const togglePanelVisibility = (panel, isExpanding) => {
  if (isExpanding) {
    panel.style.maxHeight = panel.scrollHeight + "px";
    panel.setAttribute("aria-hidden", "false");
  } else {
    panel.style.maxHeight = null;
    panel.setAttribute("aria-hidden", "true");
  }
};

const handleAccordionClick = (button) => {
  const panel = button.nextElementSibling;
  const wasActive = button.classList.contains("active");

  button.classList.toggle("active");
  const isNowActive = !wasActive;

  button.setAttribute("aria-expanded", isNowActive);

  if (panel) {
    togglePanelVisibility(panel, isNowActive);
  }
};

const initializeAccordionStates = () => {
  const initiallyActiveButton = document.querySelector(".accordion.active");

  if (initiallyActiveButton) {
    const panel = initiallyActiveButton.nextElementSibling;

    if (panel) {
      panel.style.transition = "none";
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.setAttribute("aria-hidden", "false");
      panel.offsetHeight;
      panel.style.transition = "";
      initiallyActiveButton.setAttribute("aria-expanded", "true");
    } else {
      initiallyActiveButton.setAttribute("aria-expanded", "false");
    }
  }

  accordionButtons.forEach((button) => {
    if (button === initiallyActiveButton) return;

    const panel = button.nextElementSibling;
    button.setAttribute("aria-expanded", "false");
    if (panel) {
      panel.style.maxHeight = null;
      panel.setAttribute("aria-hidden", "true");
    }
  });
};

document.addEventListener("DOMContentLoaded", initializeAccordionStates);

accordionButtons.forEach((button, index, allButtons) => {
  button.addEventListener("click", () => {
    handleAccordionClick(button);
  });

  button.addEventListener("keydown", (event) => {
    const isUp = event.key === "ArrowUp" || event.key === "Up";
    const isDown = event.key === "ArrowDown" || event.key === "Down";
    const isHome = event.key === "Home";
    const isEnd = event.key === "End";

    if (isUp || isDown || isHome || isEnd) {
      event.preventDefault();
    }

    if (isUp) {
      const prevButton = allButtons[index - 1];
      if (prevButton) {
        prevButton.focus();
      } else {
        allButtons[allButtons.length - 1].focus();
      }
    } else if (isDown) {
      const nextButton = allButtons[index + 1];
      if (nextButton) {
        nextButton.focus();
      } else {
        allButtons[0].focus();
      }
    } else if (isHome) {
      allButtons[0].focus();
    } else if (isEnd) {
      allButtons[allButtons.length - 1].focus();
    }
  });
});
