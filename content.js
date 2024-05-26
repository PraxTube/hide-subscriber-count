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
  checkLikeState();
}

// Create a new MutationObserver instance
const observer = new MutationObserver(newElementsAdded);
// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });

// Function to toggle element visibility based on the state
function toggleElementVisibility(isHidden) {
  const element = document.querySelector('#top-level-buttons-computed > segmented-like-dislike-button-view-model');
  if (element) {
    element.style.display = isHidden ? 'none' : '';
    return true;
  } else {
    console.warn('like/dislike element not found');
    return false;
  }
}

// Listen for messages from the popup to toggle the element
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'toggleElement') {
    toggleElementVisibility(request.hide);
    sendResponse({status: 'success'});
  }
});

let initial_toggle_complete = false;
function checkLikeState() {
  if (initial_toggle_complete) {
    return
  }

  chrome.storage.sync.get(['toggleState'], function(result) {
    const isHidden = result.toggleState || false;
    if (toggleElementVisibility(isHidden)) {
      initial_toggle_complete = true;
    }
  });
}
