chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getVideoData") {
    try {
      const ytInitialPlayerResponse = window.ytInitialPlayerResponse;
      
      if (!ytInitialPlayerResponse) {
        sendResponse({ success: false, error: "Could not find video data on page" });
        return;
      }

      const videoDetails = ytInitialPlayerResponse.videoDetails;
      const streamingData = ytInitialPlayerResponse.streamingData;
      
      if (!streamingData || !streamingData.formats) {
        sendResponse({ success: false, error: "No streaming data available" });
        return;
      }

      const formats = streamingData.formats || [];
      const adaptiveFormats = streamingData.adaptiveFormats || [];
      const allFormats = [...formats, ...adaptiveFormats];

      const videoFormats = allFormats
        .filter(f => f.mimeType && f.mimeType.includes('video'))
        .sort((a, b) => (b.height || 0) - (a.height || 0));

      sendResponse({
        success: true,
        videoId: videoDetails.videoId,
        title: videoDetails.title,
        formats: videoFormats.map(f => ({
          url: f.url,
          quality: f.qualityLabel || `${f.height}p`,
          mimeType: f.mimeType,
          hasAudio: f.audioQuality !== undefined
        }))
      });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true;
});
