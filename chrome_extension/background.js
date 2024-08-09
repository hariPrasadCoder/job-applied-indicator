chrome.action.onClicked.addListener((tab) => {
  fetch('http://localhost:5000/job_ids')
    .then(response => response.json())
    .then(jobIds => {
      console.log("Fetched job IDs:", jobIds);  // Add this line for debugging
      chrome.tabs.sendMessage(tab.id, {
        action: 'highlightJobs',
        jobIds: jobIds
      });
    })
    .catch(error => console.error('Error fetching job IDs:', error));
});