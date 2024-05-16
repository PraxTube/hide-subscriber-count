console.log("LOADING HIDE SUB FILE");

function hideSubscriberTexts(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'YT-FORMATTED-STRING') {
          if (node.textContent.includes("subscriber")) {
            node.style.display = "none";
          };
        }
      });
    }
  });
}

function newElementsAdded(mutationsList, _observer) {
  hideSubscriberTexts(mutationsList);
}

// Create a new MutationObserver instance
const observer = new MutationObserver(newElementsAdded);
// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });

// Run the function when the page has fully loaded
window.onload = function() {
  console.log("SUBS ARE HIDDEN NOW");
};
