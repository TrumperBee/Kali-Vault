# KaliVault

A comprehensive, production-ready educational website serving as the ultimate Kali Linux tools reference hub. Strictly for **educational, learning, and ethical cybersecurity purposes only**.

## Features

### Core Features
- **110+ Kali Linux Tools** - Complete database of security tools organized by category
- **13 Categories** - Information Gathering, Vulnerability Analysis, Web Application Analysis, and more
- **Live Search** - Instant search across all tools and commands
- **Advanced Filtering** - Filter by category, difficulty level, and favorites
- **Detailed Tool Modals** - Comprehensive information including commands, flags, and examples

### Advanced Features
- **Favorites System** - Save tools for quick access (persisted in localStorage)
- **Recently Viewed** - Track the last 5 tools you've explored
- **Random Tool** - Discover random tools with one click
- **Terminal Simulator** - Practice typing commands in a safe environment
- **PDF Export** - Export tools list for offline reference
- **Progress Tracking** - Visual progress bar showing exploration completion
- **Feedback System** - Submit corrections, bug reports, or feature requests
- **Changelog Modal** - Track project updates and additions

### User Experience
- **Dark/Light Theme** - Toggle between themes (persisted preference)
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **PWA Support** - Installable as a progressive web app
- **Copy to Clipboard** - One-click command copying with toast notifications
- **Keyboard Accessible** - Full keyboard navigation support

## Quick Start

### Option 1: Simple HTTP Server

```bash
# Python 3
python -m http.server 8000

# Node.js (if npx available)
npx serve .

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: VS Code Live Server

If using VS Code, install the "Live Server" extension and click "Go Live" in the status bar.

### Option 3: Direct File Access

You can also open `index.html` directly in your browser, though some features may be limited due to CORS restrictions with local file access.

## Project Structure

```
Kalivault/
├── index.html              # Homepage with hero, categories, featured tool
├── tools.html              # Full tools listing with advanced filtering
├── favorites.html          # Saved tools and recently viewed
├── manifest.json           # PWA manifest for installation
├── service-worker.js       # Offline support
├── README.md               # This file
├── SPEC.md                 # Detailed specifications
│
└── assets/
    ├── css/
    │   └── style.css       # All styles (dark/light themes)
    │
    ├── data/
    │   └── tools-data.json  # 110+ tools database
    │
    ├── js/
    │   └── app.js          # All functionality
    │
    └── images/
        └── icon.svg        # Dragon logo
```

## Adding New Tools

To add a new tool to the database, edit `assets/data/tools-data.json`:

```json
{
  "id": "unique-tool-id",
  "name": "Tool Name",
  "command": "toolname",
  "category": "Category Name",
  "description": "Brief description of the tool",
  "difficulty": "Easy|Medium|Hard",
  "examples": [
    {
      "command": "toolname -flag target",
      "description": "Example description"
    }
  ],
  "flags": [
    {
      "flag": "-h",
      "description": "Show help"
    }
  ],
  "useCases": "Common use cases for this tool",
  "safetyNote": "Safety considerations when using this tool"
}
```

### Category Options
- Information Gathering
- Vulnerability Analysis
- Web Application Analysis
- Database Assessment
- Password Attacks
- Wireless Attacks
- Reverse Engineering
- Exploitation Tools
- Sniffing & Spoofing
- Post Exploitation
- Forensics
- Reporting Tools

### Difficulty Levels
- Easy - Beginner-friendly tools
- Medium - Intermediate tools requiring some experience
- Hard - Advanced tools for experienced users

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **JavaScript (ES6+)** - Modern vanilla JS, no frameworks
- **localStorage** - Data persistence for favorites and preferences
- **Service Workers** - PWA offline support
- **Google Fonts** - Inter (sans) and Fira Code (monospace)

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome for Android)

### Performance
- Lazy loading of tool data
- Optimized SVG icons
- Minimal CSS with custom properties
- No external JavaScript dependencies

## Legal Disclaimer

**IMPORTANT**: KaliVault is intended for:

1. **Authorized Security Testing** - Only use on systems you have explicit permission to test
2. **Educational Purposes** - Learning about cybersecurity concepts and tools
3. **CTF and Lab Environments** - Practice in controlled environments

**UNAUTHORIZED ACCESS IS ILLEGAL**. Always obtain proper authorization before using any security tools.

## Contributing

When adding features or fixing bugs:

1. Test thoroughly across multiple browsers
2. Ensure accessibility (keyboard navigation, screen reader friendly)
3. Maintain code style consistency
4. Update documentation accordingly

## License

This project is for educational purposes only. All tool information is sourced from publicly available Kali Linux documentation.

---

Built with for the cybersecurity learning community.
