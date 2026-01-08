const downloadButton = document.getElementById("download");

downloadButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    if (!tab || !tab.url) {
      alert("❌ Unable to access the current tab.");
      return;
    }

    const url = new URL(tab.url);
    
    if (!url.hostname.includes("youtube.com") && !url.hostname.includes("youtu.be")) {
      alert("❌ Please navigate to a YouTube page first.");
      return;
    }

    const isShorts = url.pathname.startsWith("/shorts/");
    if (!isShorts) {
      alert("❌ This is not a YouTube Shorts URL.\nPlease open a Shorts video (URL must contain /shorts/).");
      return;
    }

    const pathParts = url.pathname.split("/").filter(part => part.length > 0);
    const videoId = pathParts[1];

    if (!videoId || videoId.length < 10) {
      alert("❌ Could not extract a valid video ID from the URL.");
      return;
    }

    downloadButton.disabled = true;
    downloadButton.textContent = "Downloading...";

    const apiUrl = `https://your-backend-url/api/download?id=${videoId}`;

    chrome.downloads.download(
      { 
        url: apiUrl,
        filename: `youtube-shorts-${videoId}.mp4`
      },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("Download error:", chrome.runtime.lastError);
          alert("❌ Download failed. Please configure a valid backend URL in popup.js");
        } else {
          console.log("Download started with ID:", downloadId);
        }
        downloadButton.disabled = false;
        downloadButton.textContent = "Download Shorts in HD";
      }
    );
  } catch (err) {
    console.error("Error processing download:", err);
    alert("❌ Failed to process download request.\nError: " + err.message);
    downloadButton.disabled = false;
    downloadButton.textContent = "Download Shorts in HD";
  }
});
