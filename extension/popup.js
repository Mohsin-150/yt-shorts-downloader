const downloadButton = document.getElementById("download");

async function extractVideoId(tab) {
  if (!tab || !tab.url) {
    throw new Error("Unable to access the current tab");
  }

  const url = new URL(tab.url);
  
  if (!url.hostname.includes("youtube.com") && !url.hostname.includes("youtu.be")) {
    throw new Error("Please navigate to a YouTube page first");
  }

  const isShorts = url.pathname.startsWith("/shorts/");
  if (!isShorts) {
    throw new Error("This is not a YouTube Shorts URL.\nPlease open a Shorts video (URL must contain /shorts/)");
  }

  const pathParts = url.pathname.split("/").filter(part => part.length > 0);
  const videoId = pathParts[1];

  if (!videoId || videoId.length < 10) {
    throw new Error("Could not extract a valid video ID from the URL");
  }

  return videoId;
}

async function downloadViaBackend(videoId) {
  const backendUrl = "https://your-backend-url/api/download";
  const apiUrl = `${backendUrl}?id=${videoId}`;
  
  return new Promise((resolve, reject) => {
    chrome.downloads.download(
      { 
        url: apiUrl,
        filename: `youtube-shorts-${videoId}.mp4`
      },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(downloadId);
        }
      }
    );
  });
}

async function openDownloadHelper(videoId) {
  const downloadUrl = `https://www.y2mate.com/youtube/${videoId}`;
  await chrome.tabs.create({ url: downloadUrl });
}

downloadButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    downloadButton.disabled = true;
    downloadButton.textContent = "Processing...";

    const videoId = await extractVideoId(tab);
    
    alert(`📹 Video ID: ${videoId}\n\n` +
          `Due to YouTube's restrictions, this extension will open a download helper website.\n\n` +
          `Click OK to continue to the download page.`);
    
    await openDownloadHelper(videoId);
    
    downloadButton.disabled = false;
    downloadButton.textContent = "Download Shorts in HD";
    
  } catch (err) {
    console.error("Error processing download:", err);
    alert("❌ " + err.message);
    downloadButton.disabled = false;
    downloadButton.textContent = "Download Shorts in HD";
  }
});
