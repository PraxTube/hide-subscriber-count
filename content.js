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

function toggleLikesVisibility(isHidden) {
  const element = document.querySelector('#top-level-buttons-computed > segmented-like-dislike-button-view-model');
  if (element) {
    element.style.display = isHidden ? 'none' : '';
  }
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'toggleLikes') {
    toggleLikesVisibility(request.hide);
    sendResponse({status: 'success'});
  }
});

function checkLikeState() {
  chrome.storage.sync.get(['hideLikes'], function(result) {
    const isHidden = result.hideLikes;
    if (isHidden == null) {
      return
    }
    toggleLikesVisibility(isHidden);
  });
}
