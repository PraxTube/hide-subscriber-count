function hideSubs() {
  const elementsToHide = [
    '#subscriber-count',
    '#owner-sub-count',
    '#page-header > yt-page-header-renderer > yt-page-header-view-model > div > div.page-header-view-model-wiz__page-header-headline > div > yt-content-metadata-view-model > div:nth-child(3) > span:nth-child(1)',
    '#video-count',
  ]
  elementsToHide.forEach((elementString) => {
    const element = document.querySelector(elementString);
    if (element) {
      element.style.display = 'none';
    };
  })
}

function hideDashboard() {
  const elementsToHide = [
    '#menu-paper-icon-item-0',
    '#menu-paper-icon-item-1',
    '#menu-paper-icon-item-2',
    '#menu-paper-icon-item-4',
    '#menu-paper-icon-item-5',
    '#menu-paper-icon-item-6',
    '#menu-paper-icon-item-8',
    '#channel-dashboard-section > div.main.style-scope.ytcd-channel-dashboard',
  ]
  elementsToHide.forEach((elementString) => {
    const element = document.querySelector(elementString);
    if (element) {
      element.style.display = 'none';
    }
  })
}

function hideSubsInNewElements(mutationsList, _observer) {
  hideSubs();
  hideDashboard();
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

// Create a new MutationObserver instance
const observer = new MutationObserver(hideSubsInNewElements);
// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });

// Run the function when the page has fully loaded
window.onload = function() {
  hideSubs();
  hideDashboard();
};
