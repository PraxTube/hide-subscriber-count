document.addEventListener('DOMContentLoaded', function() {
  const likeToggle = document.getElementById('hide-likes');
  if (!likeToggle) {
    return
  }

  chrome.storage.sync.get(['hideLikes'], function(result) {
    likeToggle.checked = result.hideLikes || false;
  });

  likeToggle.addEventListener('change', function() {
    chrome.storage.sync.set({ hideLikes: likeToggle.checked }, function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleLikes',
          hide: likeToggle.checked
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
