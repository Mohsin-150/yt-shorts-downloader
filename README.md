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

4. The video will be downloaded to your default downloads folder

## Configuration

### Backend Setup

This extension requires a backend API to process and serve the video downloads. You need to:

1. Set up a backend server that can fetch YouTube Shorts videos
2. Update the `apiUrl` in `extension/popup.js` (line 15) with your backend URL

Example backend endpoint format:
```
https://your-backend-url/api/download?id={videoId}
```

The backend should:
- Accept a `id` parameter with the YouTube video ID
- Return the video file as a downloadable response
- Handle YouTube API authentication and video extraction

## Development

### Project Structure

```
yt-shorts-downloader/
├── extension/
│   ├── manifest.json    # Extension configuration
│   ├── popup.html       # Extension popup UI
│   ├── popup.js         # Download logic
│   └── icon.png         # Extension icon
└── README.md
```

### Technical Details

- **Manifest Version**: 3
- **Permissions**: 
  - `scripting`: For tab interaction
  - `activeTab`: To access current tab information
  - `downloads`: To trigger file downloads

### Modifying the Extension

1. Make changes to files in the `extension/` folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## Limitations

- Only works on YouTube Shorts URLs (URLs containing `/shorts/`)
- Requires a backend API for video processing
- Subject to YouTube's Terms of Service

## License

This project is provided as-is for educational purposes.

## Disclaimer

This tool is for personal use only. Please respect YouTube's Terms of Service and copyright laws. Always ensure you have permission to download content.
