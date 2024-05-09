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
      console.log("Element hidden successfully");
    }
  })
}

// Run the function when the page has fully loaded
window.onload = function() {
  hideDashboard();
};
