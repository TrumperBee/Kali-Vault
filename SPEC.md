# KaliVault - Kali Linux Tools Reference

## Concept & Vision

KaliVault is a sleek, educational reference website designed as the ultimate companion for cybersecurity learners and professionals studying Kali Linux tools. The experience evokes the feel of a high-tech terminal interface merged with modern web design—dark, neon-accented, and powerful. It should feel like accessing a classified database of penetration testing knowledge, where every tool is a weapon for ethical defense.

The site celebrates the Kali Linux aesthetic: a hacker-inspired dark theme with purple and green neon glows, monospace typography, and smooth cyberpunk animations that make browsing feel like piloting a futuristic interface.

## Design Language

### Aesthetic Direction
Cyberpunk terminal meets modern dashboard. Think: Kali Linux's official vibe, Matrix-inspired green glows, with a polished SaaS-quality interface. Glowing borders, subtle scan-line effects, and pulsing neon accents.

### Color Palette
- `--bg-primary: #0a0a0f` - Deep void black
- `--bg-secondary: #12121a` - Card backgrounds
- `--bg-tertiary: #1a1a25` - Hover states, inputs
- `--accent-purple: #8b5cf6` - Primary accent (Kali purple)
- `--accent-green: #22c55e` - Secondary accent (terminal green)
- `--accent-cyan: #06b6d4` - Tertiary highlights
- `--text-primary: #e4e4e7` - Main text
- `--text-secondary: #a1a1aa` - Muted text
- `--border-glow: rgba(139, 92, 246, 0.3)` - Glowing borders
- `--success: #22c55e`
- `--warning: #f59e0b`
- `--error: #ef4444`

### Typography
- **Primary Font**: 'JetBrains Mono' - Monospace for all code/commands
- **Secondary Font**: 'Inter' - Clean sans-serif for descriptions
- **Display Font**: 'Orbitron' - For headings and the logo (sci-fi feel)

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Border radius: 4px (sharp), 8px (default), 12px (cards), 16px (modals)
- Max content width: 1400px

### Motion Philosophy
- **Entrance**: Elements fade-slide up with 300ms ease-out, staggered 50ms
- **Hover**: 200ms scale(1.02) with glow intensification
- **Focus**: 150ms ring expansion with purple glow
- **Page transitions**: Smooth 400ms crossfade between sections
- **Ambient**: Subtle pulse on neon elements (2s infinite), typing cursor blink
- **Search**: Instant filter with 150ms fade for results

### Visual Assets
- **Icons**: Lucide Icons (consistent stroke weight)
- **Logo**: Custom SVG Kali dragon silhouette
- **Decorative**: Grid pattern overlay, scan-line effect, corner brackets on cards
- **Code blocks**: Syntax highlighting with Prism.js style

## Layout & Structure

### Overall Architecture
Single-page application with:
1. **Fixed Header** - Logo, global search, theme toggle, random tool button
2. **Sidebar Navigation** - Collapsible categories with tool counts, sticky on desktop
3. **Main Content Area** - Tool cards, detailed views, search results
4. **Footer** - Links, disclaimer, Kali official resources

### Visual Pacing
- Header: Minimal height (64px), highly functional
- Sidebar: 280px width, dense but organized, scrollable
- Content: Generous whitespace between tool cards, breathing room
- Each section: Clear visual separation with gradient dividers

### Responsive Strategy
- **Desktop (>1024px)**: Full sidebar + content layout
- **Tablet (768-1024px)**: Collapsible sidebar, overlay on toggle
- **Mobile (<768px)**: Bottom navigation, full-width cards, hamburger menu

## Features & Interactions

### Global Search (Primary Feature)
- Prominent search bar in header, always visible
- Real-time filtering as user types (debounced 150ms)
- Searches tool names, descriptions, commands, and categories
- Results highlighted with matching term emphasized
- Empty state: "No tools found" with suggestion to browse categories
- Keyboard shortcut: Ctrl/Cmd + K to focus

### Random Tool Button
- Dice icon button in header
- Click reveals a random tool card with celebration animation
- Useful for discovery and learning

### Dark/Light Theme Toggle
- Toggle switch with smooth transition
- Light theme: White background, dark text, purple accents
- Dark theme: Black background, neon glows
- Preference saved to localStorage

### Sidebar Navigation
- Categories as expandable accordion sections
- Tool count badge on each category
- Active tool highlighted with purple glow
- Smooth scroll to tool on click
- Collapse state remembered in session

### Tool Cards
- Tool name with category badge
- Brief description (2 lines max, expandable)
- Quick command preview
- "View Details" and "Copy Command" buttons
- Hover: Card lifts with enhanced glow

### Tool Detail Modal/Expanded View
- Full description and use cases
- Command syntax with copy button
- Common flags table with descriptions
- Step-by-step usage examples
- Safety notes and ethical considerations
- Related tools section

### Command Copy
- One-click copy with visual feedback
- Button changes to checkmark for 2 seconds
- Toast notification: "Command copied!"
- Fallback for older browsers

### Keyboard Navigation
- Tab through interactive elements
- Escape to close modals
- Arrow keys to navigate search results

## Component Inventory

### Header
- **Default**: Fixed, semi-transparent backdrop blur, border-bottom glow
- **Scrolled**: Enhanced shadow, slightly more opaque background

### Search Input
- **Default**: Dark input, subtle border, search icon
- **Focus**: Purple glow border, expanded width
- **Filled**: Clear button appears
- **Loading**: Spinner replaces search icon during debounce

### Category Accordion
- **Collapsed**: Category name, tool count, chevron right
- **Expanded**: Chevron rotates down, tools list slides in
- **Hover**: Background highlight, slight indent

### Tool Card
- **Default**: Dark card, subtle border, tool icon
- **Hover**: Lift transform, purple glow border, shadow expansion
- **Active/Selected**: Solid purple border, checkmark badge
- **Disabled**: Reduced opacity (not used but defined)

### Command Block
- **Default**: Monospace text, line numbers, dark background
- **Hover**: Copy button appears (always visible on mobile)
- **Copied**: Green checkmark, "Copied!" text

### Copy Button
- **Default**: Clipboard icon, transparent background
- **Hover**: Purple background
- **Active/Click**: Scale down, flash
- **Success**: Checkmark icon, green color, 2s duration

### Toast Notification
- **Appearance**: Slide in from bottom-right
- **Duration**: 3 seconds
- **Dismiss**: Slide out on click or timeout

### Modal
- **Backdrop**: Dark overlay with blur
- **Content**: Centered card, max-width 800px, scrollable
- **Close**: X button top-right, click outside, Escape key

### Theme Toggle
- **Off (Dark)**: Moon icon, purple glow
- **On (Light)**: Sun icon, yellow accent
- **Transition**: Smooth icon morph, color scheme transition

## Tool Data Structure

Each tool entry contains:
```
{
  id: string,
  name: string,
  category: string,
  description: string,
  detailedDescription: string,
  command: string,
  flags: [{ flag: string, description: string, example: string }],
  examples: [{ title: string, description: string, command: string }],
  useCases: string[],
  safetyNotes: string[],
  relatedTools: string[],
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  officialDocs: string
}
```

## Categories & Tools

### Information Gathering
nmap, theharvester, maltego, recon-ng, sherlock, subfinder, amass, dnsenum, dnsrecon, whatweb

### Vulnerability Analysis
nikto, openvas, nuclei, wpscan, lynis

### Web Application Analysis
burpsuite, sqlmap, zap, wfuzz, gobuster, dirsearch, ffuf, xsstrike

### Database Assessment
sqlmap, sqlninja, sqlitebrowser

### Password Attacks
john, hashcat, hydra, medusa, crunch, cewl

### Wireless Attacks
aircrack-ng, airmon-ng, airodump-ng, aireplay-ng, aircrack-ng (suite), kismet, wifite, airgeddon, wifiphisher, reaver

### Exploitation Tools
metasploit-framework, msfconsole, msfvenom, exploitdb, searchsploit

### Sniffing and Spoofing
wireshark, tcpdump, bettercap, ettercap, responder, dsniff

### Post Exploitation
meterpreter, mimikatz, empire

### Forensics
autopsy, volatility, sleuthkit, binwalk, foremost

### Reverse Engineering
ghidra, radare2, gdb, strings, objdump

## Technical Approach

### Stack
- Pure HTML5, CSS3, JavaScript (Vanilla ES6+)
- No framework dependencies for maximum portability
- Single HTML file with embedded styles and scripts for easy deployment

### Architecture
- Module pattern for JavaScript organization
- Event delegation for performance
- CSS custom properties for theming
- IntersectionObserver for scroll animations
- localStorage for preferences

### Key Implementation Details
- Debounced search with fuzzy matching
- CSS Grid for responsive layouts
- CSS transitions for all animations
- Semantic HTML with ARIA labels for accessibility
- Prefers-reduced-motion media query support

### External Dependencies (CDN)
- Google Fonts: JetBrains Mono, Inter, Orbitron
- Lucide Icons: SVG icons
- Prism.js: Syntax highlighting (optional, for code blocks)
