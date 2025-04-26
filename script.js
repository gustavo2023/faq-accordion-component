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
  const wasActive = button.classList.contains("active"); // Check state *before* toggling

  // Toggle the current button's state
  button.classList.toggle("active");
  const isNowActive = !wasActive; // Determine the new state

  button.setAttribute("aria-expanded", isNowActive);

  if (panel) {
    togglePanelVisibility(panel, isNowActive);
  }
};

// Renamed and refactored function to set initial states
const initializeAccordionStates = () => {
  const initiallyActiveButton = document.querySelector(".accordion.active");

  // Initialize the initially active button/panel first (if any)
  if (initiallyActiveButton) {
    const panel = initiallyActiveButton.nextElementSibling;
    if (panel) {
      // Temporarily disable transition for immediate height setting
      panel.style.transition = "none";
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.setAttribute("aria-hidden", "false");
      // Force reflow to apply height before re-enabling transition
      panel.offsetHeight;
      // Re-enable transition
      panel.style.transition = "";
      // Set aria-expanded correctly
      initiallyActiveButton.setAttribute("aria-expanded", "true");
    } else {
      // Active button without a panel shouldn't be expanded
      initiallyActiveButton.setAttribute("aria-expanded", "false");
    }
  }

  // Ensure all other buttons/panels are correctly initialized
  accordionButtons.forEach((button) => {
    // Skip the one we might have already initialized above
    if (button === initiallyActiveButton) return;

    const panel = button.nextElementSibling;
    button.setAttribute("aria-expanded", "false"); // Not initially active
    if (panel) {
      panel.style.maxHeight = null;
      panel.setAttribute("aria-hidden", "true");
    }
  });
};

// Use the renamed initialization function
document.addEventListener("DOMContentLoaded", initializeAccordionStates);

accordionButtons.forEach((button, index, allButtons) => {
  button.addEventListener("click", () => {
    // Pass the specific button that was clicked
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
        allButtons[allButtons.length - 1].focus(); // Wrap to last
      }
    } else if (isDown) {
      const nextButton = allButtons[index + 1];
      if (nextButton) {
        nextButton.focus();
      } else {
        allButtons[0].focus(); // Wrap to first
      }
    } else if (isHome) {
      allButtons[0].focus();
    } else if (isEnd) {
      allButtons[allButtons.length - 1].focus();
    }
  });
});
