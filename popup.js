document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggle');
  if (!toggle) {
    return
  }

  chrome.storage.sync.get(['toggleState'], function(result) {
    toggle.checked = result.toggleState || false;
  });

  toggle.addEventListener('change', function() {
    chrome.storage.sync.set({ toggleState: toggle.checked }, function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleElement',
          hide: toggle.checked
        }, function(response) {
          if (response.status === 'success') {
            console.log('Element visibility toggled');
          } else {
            console.log('Failed to toggle element visibility:', response.status);
          }
        });
      });
    });
  });
});
