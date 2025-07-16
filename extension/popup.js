document.getElementById("download").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    const url = new URL(tab.url);
    const isShorts = url.pathname.startsWith("/shorts/");
    const videoId = url.pathname.split("/")[2];

    if (!isShorts || !videoId) {
      alert("❌ This is not a valid YouTube Shorts URL.");
      return;
    }

    // 🔗 Replace with your actual backend URL later
    const apiUrl = `https://your-backend-url/api/download?id=${videoId}`;

    chrome.downloads.download({ url: apiUrl });
  } catch (err) {
    console.error("Error extracting video ID:", err);
    alert("Failed to extract Shorts ID.");
  }
});
