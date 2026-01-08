# YT Shorts HD Downloader

A Chrome extension that allows you to download YouTube Shorts videos in high definition with audio.

## Features

- 🎥 Download YouTube Shorts in HD quality
- 🔊 Full audio included
- ⚡ Simple one-click download
- 🎯 Works directly from YouTube Shorts pages
- 🛡️ Manifest V3 compatible

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd yt-shorts-downloader
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in the top right)

4. Click "Load unpacked" and select the `extension` folder

5. The extension icon should now appear in your Chrome toolbar

## Usage

1. Navigate to any YouTube Shorts video (URL should contain `/shorts/`)

2. Click the extension icon in your Chrome toolbar

3. Click the "Download Shorts in HD" button

4. The extension will open a download helper website in a new tab

5. On the helper website, follow the instructions to download your video

### Why does it open a website?

Due to YouTube's technical restrictions and terms of service, Chrome extensions cannot directly download YouTube videos. This extension extracts the video ID and opens a trusted third-party download service that handles the actual video processing and download.

## Configuration

### Using Your Own Backend (Optional)

If you want to use your own backend instead of the helper website:

1. Set up a backend server that can fetch YouTube Shorts videos
2. Update the `openDownloadHelper` function in `extension/popup.js` to use your backend URL
3. Uncomment the `downloadViaBackend` function call

Example backend endpoint format:
```
https://your-backend-url/api/download?id={videoId}
```

The backend should:
- Accept an `id` parameter with the YouTube video ID
- Return the video file as a downloadable response with proper CORS headers
- Handle YouTube video extraction (e.g., using yt-dlp or similar tools)

## Development

### Project Structure

```
yt-shorts-downloader/
├── extension/
│   ├── manifest.json    # Extension configuration
│   ├── popup.html       # Extension popup UI
│   ├── popup.js         # Main download logic
│   ├── content.js       # Content script for YouTube pages
│   ├── config.js        # Configuration options
│   └── icon.png         # Extension icon
├── .gitignore          # Git ignore file
└── README.md           # Documentation
```

### Technical Details

- **Manifest Version**: 3
- **Permissions**: 
  - `scripting`: For tab interaction
  - `activeTab`: To access current tab information
  - `tabs`: To open new tabs with download helper
- **Content Scripts**: Injected into YouTube pages for video data extraction

### Modifying the Extension

1. Make changes to files in the `extension/` folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## Limitations

- Only works on YouTube Shorts URLs (URLs containing `/shorts/`)
- Opens a third-party download helper website (cannot download directly due to YouTube restrictions)
- Subject to YouTube's Terms of Service
- Download quality depends on the helper service used

## Troubleshooting

### "0 bytes" or "Connection Error"

This issue occurs if:
1. The extension is trying to use a non-existent backend URL
2. The current version opens a helper website instead, which solves this issue
3. If you configured a custom backend, ensure it's running and accessible

### Extension Not Working

1. Make sure you're on a YouTube Shorts page (URL must contain `/shorts/`)
2. Reload the extension from `chrome://extensions/`
3. Check the browser console for error messages
4. Ensure you granted all required permissions

## License

This project is provided as-is for educational purposes.

## Disclaimer

This tool is for personal use only. Please respect YouTube's Terms of Service and copyright laws. Always ensure you have permission to download content.
