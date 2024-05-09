// Hide subscriber count
function hideSubs() {
  const subscriberCountElements = document.querySelectorAll(
    'yt-formatted-string',
  );
  subscriberCountElements.forEach((element) => {
    if (element.textContent.includes("subscriber")) {
      element.style.display = "none";
    } else {
      console.log("No subs hidden");
    }
  });
}

// Function to be called when new elements are added to the page
function handleNewElements(mutationsList, observer) {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'YT-FORMATTED-STRING') {
          if (node.textContent.includes("subscriber")) {
            node.style.display = "none";
            console.log("Subscriber count hidden:", node.textContent);
          } else {
            console.log("No subs hidden in the newly added node");
          }
        }
      });
    }
  });
}

// Create a new MutationObserver instance
const observer = new MutationObserver(handleNewElements);

// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });
//
// // Run the function when the page has fully loaded
// window.onload = function() {
//   hideSubs();
// };
