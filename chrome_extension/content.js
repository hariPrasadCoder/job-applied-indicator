let targetJobIds = []; // Array to store target job IDs

function highlightJobs() {
  const jobItems = document.querySelectorAll('li[data-occludable-job-id]');
  
  jobItems.forEach(item => {
    const jobId = item.getAttribute('data-occludable-job-id');
    console.log("Processing job ID:", jobId); // Add this line
    console.log("Processing job ID:", targetJobIds);
    if (targetJobIds.includes(jobId)) {
      item.style.border = '3px solid red';
      item.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
    } else {
      item.style.border = '3px solid green';
      item.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
    }
  });
}

function observeJobListChanges() {
  const targetNode = document.querySelector('ul.scaffold-layout__list-container');
  if (!targetNode) {
    // If the target node is not found, retry after a short delay
    setTimeout(observeJobListChanges, 1000);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    highlightJobs();
  });

  observer.observe(targetNode, { childList: true, subtree: true });
  
  // Initial highlighting
  highlightJobs();
}

// Start observing as soon as the script runs
observeJobListChanges();


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'highlightJobs') {
    console.log("Received job IDs:", request.jobIds);  // Add this line
    targetJobIds = request.jobIds;
    highlightJobs();
  }
});