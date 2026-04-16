/**
 * KaliVault - Tools Data
 * Educational reference for Kali Linux tools
 * This data is for learning and ethical cybersecurity purposes only
 */

const KALIVAULT_DATA = {
    meta: {
        version: "1.0.0",
        lastUpdated: "2026-04-16",
        totalTools: 0,
        totalCategories: 11
    },
    categories: [
        {
            id: "information-gathering",
            name: "Information Gathering",
            icon: "search",
            color: "#9f00ff",
            description: "Collect data about targets using passive and active reconnaissance techniques"
        },
        {
            id: "vulnerability-analysis",
            name: "Vulnerability Analysis", 
            icon: "shield",
            color: "#ff9f00",
            description: "Identify and analyze security weaknesses in systems and applications"
        },
        {
            id: "web-application",
            name: "Web Application Analysis",
            icon: "globe",
            color: "#00ff9f",
            description: "Test and audit web applications for security vulnerabilities"
        },
        {
            id: "database-assessment",
            name: "Database Assessment",
            icon: "database",
            color: "#00ffff",
            description: "Evaluate database security and test for SQL injection vulnerabilities"
        },
        {
            id: "password-attacks",
            name: "Password Attacks",
            icon: "key",
            color: "#ff00ff",
            description: "Test password strength and crack hashed credentials ethically"
        },
        {
            id: "wireless-attacks",
            name: "Wireless Attacks",
            icon: "wifi",
            color: "#ffff00",
            description: "Assess wireless network security and test WiFi encryption"
        },
        {
            id: "exploitation-tools",
            name: "Exploitation Tools",
            icon: "terminal",
            color: "#ff6b6b",
            description: "Leverage known vulnerabilities to gain authorized access to systems"
        },
        {
            id: "sniffing-spoofing",
            name: "Sniffing & Spoofing",
            icon: "eye",
            color: "#00ff00",
            description: "Monitor network traffic and test for man-in-the-middle vulnerabilities"
        },
        {
            id: "post-exploitation",
            name: "Post Exploitation",
            icon: "rocket",
            color: "#ff00ff",
            description: "Maintain access and gather additional information after initial compromise"
        },
        {
            id: "forensics",
            name: "Forensics",
            icon: "file-search",
            color: "#9f00ff",
            description: "Analyze digital evidence and recover data for investigation purposes"
        },
        {
            id: "reverse-engineering",
            name: "Reverse Engineering",
            icon: "code",
            color: "#ff9f00",
            description: "Analyze binary executables and understand program functionality"
        }
    ],
    tools: []
};

// Tool data - each tool follows this structure
const toolsData = [
    // ==================== INFORMATION GATHERING ====================
    {
        id: "nmap",
        name: "Nmap",
        category: "information-gathering",
        description: "Industry-standard network discovery and security auditing tool. Maps networks and identifies open ports, services, and operating systems.",
        detailedDescription: "Nmap (Network Mapper) is the gold standard for network scanning. It uses raw IP packets to discover hosts on a network, identify running services, detect operating systems, and enumerate security configurations. Essential for network inventory and vulnerability assessment.",
        command: "nmap -sV -sC -O target.com",
        difficulty: "beginner",
        officialDocs: "https://nmap.org/docs.html",
        safetyNote: "Only scan networks you own or have explicit written permission to test. Unauthorized scanning is illegal in most jurisdictions.",
        flags: [
            { flag: "-sV", description: "Probe open ports to determine service/version info" },
            { flag: "-sC", description: "Run default script scan using NSE" },
            { flag: "-O", description: "Enable OS detection" },
            { flag: "-p-", description: "Scan all 65,535 ports" },
            { flag: "-A", description: "Enable OS detection, version detection, script scanning, and traceroute" },
            { flag: "-oA", description: "Output in all major formats (normal, XML, grepable)" },
            { flag: "-T4", description: "Set timing template (0-5, higher is faster)" },
            { flag: "-v", description: "Increase verbosity level" },
            { flag: "-iL", description: "Scan targets from input file" }
        ],
        examples: [
            { title: "Basic Port Scan", command: "nmap 192.168.1.1", description: "Scan common ports on target" },
            { title: "Service Version Detection", command: "nmap -sV 10.0.0.1", description: "Identify services and versions" },
            { title: "Aggressive Scan", command: "nmap -A -T4 target.com", description: "All advanced options at once" },
            { title: "Save Output", command: "nmap -oA results target.com", description: "Save to all formats" }
        ],
        useCases: ["Network inventory", "Port scanning", "Service enumeration", "OS fingerprinting", "Vulnerability discovery"],
        relatedTools: ["masscan", "zenmap", "autorecon"]
    },
    {
        id: "theharvester",
        name: "theHarvester",
        category: "information-gathering",
        description: "E-mail, subdomain, and personnel harvester using OSINT techniques from public sources.",
        detailedDescription: "theHarvester is a powerful open-source tool used for gathering emails, subdomains, virtual hosts, open ports, and employee names from different public sources like search engines, PGP key servers, and SHODAN.",
        command: "theHarvester -d example.com -b google",
        difficulty: "beginner",
        officialDocs: "https://github.com/laramies/theHarvester",
        safetyNote: "Legal for passive OSINT reconnaissance. Do not use harvested data unethically. Respect rate limits.",
        flags: [
            { flag: "-d", description: "Domain to search" },
            { flag: "-b", description: "Data source (google, bing, linkedin, etc.)" },
            { flag: "-l", description: "Limit number of results" },
            { flag: "-f", description: "Save results to HTML and XML files" },
            { flag: "-v", description: "Verify hostnames via DNS lookup" }
        ],
        examples: [
            { title: "Google Search", command: "theHarvester -d target.com -b google -l 500", description: "Gather emails from Google" },
            { title: "Multiple Sources", command: "theHarvester -d target.com -b \"google,bing\"", description: "Search across sources" }
        ],
        useCases: ["Email harvesting", "Subdomain discovery", "Employee enumeration", "OSINT research", "Penetration testing recon"],
        relatedTools: ["maltego", "recon-ng", "hunter.io"]
    },
    {
        id: "maltego",
        name: "Maltego",
        category: "information-gathering",
        description: "Interactive data mining tool for link analysis and OSINT visualization with intuitive graph views.",
        detailedDescription: "Maltego is a comprehensive tool for open-source and link analysis. It transforms data into actionable information by showing relationships between people, companies, domains, IP addresses, and more through intuitive visual graphs.",
        command: "maltegoce -d target.com --transform peoplefinders",
        difficulty: "intermediate",
        officialDocs: "https://docs.maltego.com/",
        safetyNote: "Requires Maltego client. Some transforms require paid API keys. Legal for OSINT purposes.",
        flags: [
            { flag: "-d", description: "Domain to investigate" },
            { flag: "--transform", description: "Specific transform to run" },
            { flag: "-o", description: "Output file" }
        ],
        examples: [
            { title: "Company Investigation", command: "maltegoce -d company.com --transform \"Company Stalking\"", description: "Map digital footprint" },
            { title: "Email Investigation", command: "maltegoce -d john@company.com --transform \"Email to Domain\"", description: "Find connections" }
        ],
        useCases: ["Link analysis", "Social network investigation", "Digital footprint analysis", "Threat intelligence"],
        relatedTools: ["theHarvester", "recon-ng", "spiderfoot"]
    },
    {
        id: "recon-ng",
        name: "Recon-ng",
        category: "information-gathering",
        description: "Full-featured web reconnaissance framework written in Python with modular architecture.",
        detailedDescription: "Recon-ng is a modular web reconnaissance framework highly useful for OSINT gathering. It provides a powerful environment similar to Metasploit but focused purely on information gathering with a wide variety of modules.",
        command: "recon-ng",
        difficulty: "intermediate",
        officialDocs: "https://readthedocs.io/projects/recon-ng",
        safetyNote: "Install API keys for full functionality. Respect usage limits. Use for OSINT only.",
        flags: [
            { flag: "-r", description: "Load a workspace" },
            { flag: "-w", description: "Create new workspace" },
            { flag: "--no-analytics", description: "Disable analytics" }
        ],
        examples: [
            { title: "Start Framework", command: "recon-ng", description: "Launch the framework" },
            { title: "Add Domain", command: "recon-ng -w myworkspace", description: "Create workspace" }
        ],
        useCases: ["Automated reconnaissance", "Data harvesting", "Vulnerability research", "OSINT automation"],
        relatedTools: ["theHarvester", "maltego", "ospint"]
    },
    {
        id: "sherlock",
        name: "Sherlock",
        category: "information-gathering",
        description: "Hunt down social media accounts by username across hundreds of platforms.",
        detailedDescription: "Sherlock is a powerful username search tool that can find social media accounts across hundreds of platforms. Extremely useful for OSINT investigations and digital footprint analysis.",
        command: "python3 sherlock username",
        difficulty: "beginner",
        officialDocs: "https://github.com/sherlock-project/sherlock",
        safetyNote: "Use responsibly. Do not use for stalking or harassment. Check platform Terms of Service.",
        flags: [
            { flag: "--verbose", description: "Enable verbose output" },
            { flag: "--tor", description: "Use Tor for requests" },
            { flag: "-o", description: "Export results to file" },
            { flag: "-t", description: "Number of threads" }
        ],
        examples: [
            { title: "Single Search", command: "python3 sherlock johndoe", description: "Find accounts for username" },
            { title: "Export JSON", command: "python3 sherlock johndoe -o results.json", description: "Save to JSON" }
        ],
        useCases: ["Username OSINT", "Account discovery", "Digital investigations", "Social engineering awareness"],
        relatedTools: ["whatsmyname", "namechk", "social-searcher"]
    },
    {
        id: "subfinder",
        name: "Subfinder",
        category: "information-gathering",
        description: "Fast subdomain discovery tool using passive sources for fast enumeration.",
        detailedDescription: "Subfinder is a fast subdomain enumeration tool that discovers valid subdomains for websites by using passive online sources. It has a simple and modular architecture optimized for speed and efficiency.",
        command: "subfinder -d example.com",
        difficulty: "beginner",
        officialDocs: "https://github.com/projectdiscovery/subfinder",
        safetyNote: "Uses passive sources only - safe to use. Legal for authorized testing.",
        flags: [
            { flag: "-d", description: "Domain to enumerate subdomains" },
            { flag: "-dL", description: "Domains from file" },
            { flag: "-o", description: "Output file" },
            { flag: "-oJ", description: "Output in JSON format" },
            { flag: "-silent", description: "Show only results" }
        ],
        examples: [
            { title: "Basic Enumeration", command: "subfinder -d target.com", description: "Find subdomains" },
            { title: "Save Results", command: "subfinder -d target.com -o subdomains.txt", description: "Save to file" }
        ],
        useCases: ["Subdomain enumeration", "Attack surface mapping", "Bug bounty reconnaissance", "Asset discovery"],
        relatedTools: ["amass", "assetfinder", "findomain"]
    },
    {
        id: "amass",
        name: "Amass",
        category: "information-gathering",
        description: "In-depth subdomain enumeration using OSINT and active techniques.",
        detailedDescription: "Amass performs network mapping of attack surfaces and external asset discovery by using OSINT and active reconnaissance techniques. It's one of the most comprehensive subdomain enumeration tools available with extensive source integration.",
        command: "amass enum -d example.com",
        difficulty: "intermediate",
        officialDocs: "https://github.com/OWASP/Amass",
        safetyNote: "Active mode may generate network traffic. Use passive mode for stealth reconnaissance.",
        flags: [
            { flag: "enum", description: "Run enumeration mode" },
            { flag: "-d", description: "Target domain" },
            { flag: "-v", description: "Show verbose output" },
            { flag: "-brute", description: "Use brute forcing" },
            { flag: "-active", description: "Enable active reconnaissance" }
        ],
        examples: [
            { title: "Passive Enum", command: "amass enum -passive -d target.com", description: "Passive subdomains" },
            { title: "Active Enum", command: "amass enum -active -d target.com", description: "Include active techniques" }
        ],
        useCases: ["Subdomain enumeration", "Attack surface analysis", "Asset discovery", "DNS reconnaissance"],
        relatedTools: ["subfinder", "dnsenum", "assetfinder"]
    },
    {
        id: "dnsenum",
        name: "DNSenum",
        category: "information-gathering",
        description: "Multithreaded DNS enumeration tool for gathering comprehensive DNS information.",
        detailedDescription: "DNSenum is a perl script designed to analyze the DNS information of a domain. It discovers non-contiguous IP blocks, DNS names, subdomains, performs zone transfers when possible, and more.",
        command: "dnsenum target.com",
        difficulty: "beginner",
        officialDocs: "https://github.com/fwaeytens/dnsenum",
        safetyNote: "Zone transfers may be blocked by modern DNS servers. Use for authorized testing only.",
        flags: [
            { flag: "-o", description: "Output to XML file" },
            { flag: "-f", description: "Wordlist for brute forcing" },
            { flag: "--threads", description: "Number of parallel threads" }
        ],
        examples: [
            { title: "Basic Scan", command: "dnsenum target.com", description: "Enumerate DNS records" },
            { title: "With Wordlist", command: "dnsenum -f wordlist.txt target.com", description: "Brute force subdomains" }
        ],
        useCases: ["DNS enumeration", "Zone transfer testing", "Subdomain discovery", "DNS reconnaissance"],
        relatedTools: ["dnsrecon", "fierce", "amass"]
    },
    {
        id: "dnsrecon",
        name: "DNSrecon",
        category: "information-gathering",
        description: "DNS enumeration Swiss Army knife with comprehensive reconnaissance capabilities.",
        detailedDescription: "DNSrecon is a powerful DNS enumeration script written in Python. It can perform various DNS record collections, zone transfers, reverse lookups, and Google filtering for comprehensive DNS reconnaissance.",
        command: "dnsrecon -d target.com -t std",
        difficulty: "beginner",
        officialDocs: "https://github.com/darkoperator/dnsrecon",
        safetyNote: "Legal for authorized testing. Some checks may trigger security alerts.",
        flags: [
            { flag: "-d", description: "Target domain" },
            { flag: "-t", description: "Type of enumeration (std, axfr, srv, etc.)" },
            { flag: "-D", description: "Dictionary file for brute force" },
            { flag: "-xml", description: "XML output file" }
        ],
        examples: [
            { title: "Standard Enum", command: "dnsrecon -d target.com -t std", description: "Standard DNS records" },
            { title: "Zone Transfer", command: "dnsrecon -d target.com -t axfr", description: "Attempt AXFR" }
        ],
        useCases: ["DNS reconnaissance", "Zone transfer testing", "Subdomain enumeration", "DNS data mining"],
        relatedTools: ["dnsenum", "fierce", "amass"]
    },
    {
        id: "whatweb",
        name: "WhatWeb",
        category: "information-gathering",
        description: "Next generation web scanner that identifies web technologies with 1800+ plugins.",
        detailedDescription: "WhatWeb identifies websites including content management systems, blogging platforms, statistic/analytics packages, JavaScript libraries, web servers, and more. It recognizes over 1800 plugins with customizable aggression levels.",
        command: "whatweb -a 3 target.com",
        difficulty: "beginner",
        officialDocs: "https://github.com/urbanadventurer/WhatWeb",
        safetyNote: "Passive reconnaissance tool. Legal for authorized testing.",
        flags: [
            { flag: "-a", description: "Aggression level (1-4)" },
            { flag: "-v", description: "Verbose output" },
            { flag: "-o", description: "Output file" },
            { flag: "-i", description: "Input file with targets" }
        ],
        examples: [
            { title: "Quick Scan", command: "whatweb target.com", description: "Basic detection" },
            { title: "Aggressive", command: "whatweb -a 4 target.com", description: "Deep inspection" }
        ],
        useCases: ["Web technology fingerprinting", "CMS identification", "Server detection", "Component analysis"],
        relatedTools: ["wappalyzer", "builtwith", "netcraft"]
    },

    // ==================== VULNERABILITY ANALYSIS ====================
    {
        id: "nikto",
        name: "Nikto",
        category: "vulnerability-analysis",
        description: "Web server scanner for vulnerabilities, dangerous files, outdated software, and misconfigurations.",
        detailedDescription: "Nikto is an open-source web server scanner that performs comprehensive tests against web servers for multiple items including dangerous files/CGIs, outdated server versions, default files, and other security issues.",
        command: "nikto -h target.com",
        difficulty: "beginner",
        officialDocs: "https://github.com/sullo/nikto",
        safetyNote: "Can trigger IDS alerts. Use on authorized targets only. Loud scan - will be detected.",
        flags: [
            { flag: "-h", description: "Target host" },
            { flag: "-p", description: "Port number" },
            { flag: "-ssl", description: "Force SSL/TLS" },
            { flag: "-o", description: "Output file" },
            { flag: "-Format", description: "Output format (csv, html, xml)" }
        ],
        examples: [
            { title: "Basic Scan", command: "nikto -h 192.168.1.100", description: "Scan web server" },
            { title: "SSL Scan", command: "nikto -h https://target.com -ssl", description: "Scan HTTPS site" }
        ],
        useCases: ["Web server auditing", "Vulnerability scanning", "Security configuration checks", "Compliance testing"],
        relatedTools: ["openvas", "nuclei", "wapiti"]
    },
    {
        id: "openvas",
        name: "OpenVAS",
        category: "vulnerability-analysis",
        description: "Comprehensive vulnerability scanner with up to 50,000 vulnerability tests.",
        detailedDescription: "OpenVAS (Open Vulnerability Assessment System) is a full-featured vulnerability scanner. It's the open-source version of Nessus and provides an extensive database of vulnerability tests (NVTs) with daily updates.",
        command: "omp -u admin -w password -h localhost",
        difficulty: "advanced",
        officialDocs: "https://greenbone.github.io/docs/",
        safetyNote: "Resource intensive and may disrupt target systems. Requires proper authorization and careful configuration.",
        flags: [
            { flag: "-u", description: "Username" },
            { flag: "-w", description: "Password" },
            { flag: "-h", description: "Host" },
            { flag: "-T", description: "Target ID" }
        ],
        examples: [
            { title: "Start Scanner", command: "openvas-start", description: "Initialize OpenVAS" },
            { title: "Create Target", command: "omp -u admin -w pass -c create_target", description: "Add scan target" }
        ],
        useCases: ["Enterprise vulnerability scanning", "Compliance auditing", "Security monitoring", "Risk assessment"],
        relatedTools: ["nessus", "nuclei", "nexpose"]
    },
    {
        id: "nuclei",
        name: "Nuclei",
        category: "vulnerability-analysis",
        description: "Fast template-based vulnerability scanner with community-driven templates.",
        detailedDescription: "Nuclei is a fast template-based vulnerability scanner that uses YAML-based templates for detecting vulnerabilities. It excels at mass scanning and supports custom template development for specific vulnerabilities.",
        command: "nuclei -u https://target.com",
        difficulty: "beginner",
        officialDocs: "https://docs.nuclei.sh/",
        safetyNote: "Templates can be intrusive. Use responsibly and only on authorized targets.",
        flags: [
            { flag: "-u", description: "Target URL" },
            { flag: "-l", description: "List of URLs from file" },
            { flag: "-t", description: "Templates to use" },
            { flag: "-severity", description: "Filter by severity (critical,high,medium,low)" },
            { flag: "-o", description: "Output file" }
        ],
        examples: [
            { title: "Basic Scan", command: "nuclei -u https://target.com", description: "Scan with all templates" },
            { title: "Specific Templates", command: "nuclei -u https://target.com -t cves/", description: "Use CVE templates" }
        ],
        useCases: ["Vulnerability scanning", "Bug bounty hunting", "Security research", "Continuous security testing"],
        relatedTools: ["nikto", "openvas", "sslyze"]
    },
    {
        id: "wpscan",
        name: "WPScan",
        category: "vulnerability-analysis",
        description: "WordPress security scanner for vulnerabilities and misconfigurations.",
        detailedDescription: "WPScan is a black-box WordPress security scanner that can scan WordPress installations for vulnerabilities, enumerate installed plugins/themes, and identify security misconfigurations.",
        command: "wpscan --url https://target.com --enumerate vp",
        difficulty: "beginner",
        officialDocs: "https://wpscan.com/documentation",
        safetyNote: "Can be detected by WAFs and security plugins. Use ethically on sites you own or have permission to test.",
        flags: [
            { flag: "--url", description: "Target WordPress site URL" },
            { flag: "--enumerate", description: "What to enumerate (vp, vt, u)" },
            { flag: "--api-token", description: "WPScan API token for vulnerability data" }
        ],
        examples: [
            { title: "Basic Scan", command: "wpscan --url https://target.com", description: "Scan for vulnerabilities" },
            { title: "Enumerate Plugins", command: "wpscan --url https://target.com --enumerate vp", description: "Find vulnerable plugins" }
        ],
        useCases: ["WordPress auditing", "Plugin vulnerability scanning", "Theme enumeration", "WordPress hardening"],
        relatedTools: ["cmsmap", "droopescan", "wpseku"]
    },
    {
        id: "lynis",
        name: "Lynis",
        category: "vulnerability-analysis",
        description: "Security auditing tool for Unix/Linux systems with hardening recommendations.",
        detailedDescription: "Lynis is a battle-tested security tool for systems running Linux, macOS, or Unix. It performs an extensive health scan of your systems to support system hardening and compliance testing.",
        command: "lynis audit system",
        difficulty: "beginner",
        officialDocs: "https://cisofy.com/documentation/lynis/",
        safetyNote: "Read-only tool - safe to run on any system. Does not make changes.",
        flags: [
            { flag: "audit", description: "Run audit" },
            { flag: "system", description: "Audit system" },
            { flag: "--quick", description: "Quick scan mode" },
            { flag: "-Q", description: "Quiet mode" },
            { flag: "--pentest", description: "Include pentest categories" }
        ],
        examples: [
            { title: "Full Audit", command: "lynis audit system", description: "Complete system scan" },
            { title: "Quick Scan", command: "lynis audit system --quick", description: "Fast security check" }
        ],
        useCases: ["System hardening", "Compliance auditing", "Security configuration review", "Security health check"],
        relatedTools: ["rkhunter", "chkrootkit", "aide"]
    },

    // ==================== WEB APPLICATION ANALYSIS ====================
    {
        id: "burpsuite",
        name: "Burp Suite",
        category: "web-application",
        description: "Integrated platform for web application security testing with proxy, scanner, and tools.",
        detailedDescription: "Burp Suite is the leading software for web security testing. It provides tools for mapping and analyzing attack surfaces, finding vulnerabilities, and facilitating manual testing with its proxy, repeater, intruder, and scanner modules.",
        command: "burpsuite &",
        difficulty: "intermediate",
        officialDocs: "https://portswigger.net/burp/documentation",
        safetyNote: "Proxy intercepts all traffic. Configure browser proxy to localhost:8080. Use on authorized targets only.",
        flags: [
            { flag: "--project-file", description: "Load existing project" },
            { flag: "--config-file", description: "Load configuration" }
        ],
        examples: [
            { title: "Start Burp", command: "burpsuite &", description: "Launch the application" },
            { title: "Proxy Setup", command: "Configure browser: 127.0.0.1:8080", description: "Set proxy" }
        ],
        useCases: ["Web vulnerability testing", "API security testing", "Mobile app testing", "Manual testing"],
        relatedTools: ["zap", "owasp-zap", "webscarab"]
    },
    {
        id: "sqlmap",
        name: "SQLMap",
        category: "web-application",
        description: "Automatic SQL injection and database takeover tool with extensive features.",
        detailedDescription: "SQLMap is an open-source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over of database servers. It includes a powerful detection engine and many niche features.",
        command: "sqlmap -u \"https://target.com/page?id=1\" --dbs",
        difficulty: "intermediate",
        officialDocs: "http://sqlmap.org/",
        safetyNote: "Can cause data corruption. Use only on authorized targets with written permission. Destructive by default.",
        flags: [
            { flag: "-u", description: "Target URL" },
            { flag: "--dbs", description: "Enumerate databases" },
            { flag: "--tables", description: "Enumerate tables" },
            { flag: "--columns", description: "Enumerate columns" },
            { flag: "--dump", description: "Dump table data" },
            { flag: "--os-shell", description: "Attempt OS command shell" },
            { flag: "--risk", description: "Risk level (1-3)" },
            { flag: "--level", description: "Level of tests (1-5)" }
        ],
        examples: [
            { title: "Basic SQLi Test", command: "sqlmap -u \"https://target.com/?id=1\"", description: "Test URL for SQL injection" },
            { title: "Get Databases", command: "sqlmap -u \"https://target.com/?id=1\" --dbs", description: "List all databases" },
            { title: "Dump Table", command: "sqlmap -u \"https://target.com/?id=1\" -D dbname -T users --dump", description: "Extract table data" }
        ],
        useCases: ["SQL injection testing", "Database enumeration", "Data extraction", "Authentication bypass"],
        relatedTools: ["havij", "dsss", "manual-sql-injection"]
    },
    {
        id: "zap",
        name: "OWASP ZAP",
        category: "web-application",
        description: "Free, open-source web app security scanner maintained by OWASP.",
        detailedDescription: "OWASP Zed Attack Proxy (ZAP) is one of the world's most popular free security tools. It helps automatically find security vulnerabilities in web applications during development and testing.",
        command: "zap-cli quick-scan https://target.com",
        difficulty: "beginner",
        officialDocs: "https://www.zaproxy.org/docs/",
        safetyNote: "Active scan is intrusive and will send many requests. Use responsibly on authorized targets.",
        flags: [
            { flag: "quick-scan", description: "Run quick scan" },
            { flag: "full-scan", description: "Run comprehensive scan" },
            { flag: "spider", description: "Spider the target" },
            { flag: "active-scan", description: "Run active scan" }
        ],
        examples: [
            { title: "Quick Scan", command: "zap-cli quick-scan https://target.com", description: "Fast vulnerability scan" },
            { title: "Spider Scan", command: "zap-cli spider https://target.com", description: "Crawl the application" }
        ],
        useCases: ["Automated vulnerability scanning", "Manual testing aid", "CI/CD integration", "DevSecOps"],
        relatedTools: ["burpsuite", "nikto", "w3af"]
    },
    {
        id: "wfuzz",
        name: "Wfuzz",
        category: "web-application",
        description: "Flexible web application fuzzer for bruteforcing directories, parameters, and more.",
        detailedDescription: "Wfuzz is a web application bruteforcer that allows you to perform brute force attacks on various components. It can fuzz any part of an HTTP request including headers, authentication, forms, and hidden parameters.",
        command: "wfuzz -c -z file,wordlist.txt https://target.com/FUZZ",
        difficulty: "intermediate",
        officialDocs: "https://wfuzz.readthedocs.io/",
        safetyNote: "Can generate many requests. Use rate limiting and respect target resources.",
        flags: [
            { flag: "-c", description: "Color output" },
            { flag: "-z", description: "Payload specification" },
            { flag: "-d", description: "Post data" },
            { flag: "-H", description: "Headers (e.g., -H \"Cookie: foo=bar\")" },
            { flag: "--hc", description: "Hide responses with these HTTP codes" },
            { flag: "--hw", description: "Hide responses by word count" }
        ],
        examples: [
            { title: "Directory Fuzzing", command: "wfuzz -c -z file,dirs.txt https://target.com/FUZZ/", description: "Find hidden directories" },
            { title: "Login Bruteforce", command: "wfuzz -c -z file,users.txt -z file,pass.txt -d \"user=FUZZ&pass=FUZ2Z\" http://target.com/login", description: "Brute force login" }
        ],
        useCases: ["Directory discovery", "Parameter fuzzing", "Authentication testing", "API testing"],
        relatedTools: ["ffuf", "gobuster", "dirbuster"]
    },
    {
        id: "gobuster",
        name: "Gobuster",
        category: "web-application",
        description: "Fast directory and DNS busting tool written in Go for high performance.",
        detailedDescription: "Gobuster is a tool used to brute force URIs including directories and files in web servers, DNS subdomains, virtual host names, and more. It's known for its speed due to Go's concurrency capabilities.",
        command: "gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt",
        difficulty: "beginner",
        officialDocs: "https://github.com/OJ/gobuster",
        safetyNote: "High request rate may trigger rate limits or blocks. Use responsibly.",
        flags: [
            { flag: "dir", description: "Directory/file mode" },
            { flag: "-u", description: "Target URL" },
            { flag: "-w", description: "Wordlist path" },
            { flag: "-x", description: "File extensions (e.g., php,html,js)" },
            { flag: "-t", description: "Number of threads" },
            { flag: "dns", description: "DNS mode for subdomain enumeration" }
        ],
        examples: [
            { title: "Directory Discovery", command: "gobuster dir -u https://target.com -w wordlist.txt", description: "Find directories" },
            { title: "With Extensions", command: "gobuster dir -u https://target.com -w wordlist.txt -x php,html,js", description: "Find files with extensions" },
            { title: "DNS Subdomains", command: "gobuster dns -d target.com -w subdomains.txt", description: "Find subdomains" }
        ],
        useCases: ["Directory enumeration", "File discovery", "DNS subdomain bruteforcing", "Virtual host enumeration"],
        relatedTools: ["dirb", "dirbuster", "ffuf"]
    },
    {
        id: "dirsearch",
        name: "Dirsearch",
        category: "web-application",
        description: "Advanced command-line web path scanner with extensive features.",
        detailedDescription: "Dirsearch is a mature, command-line tool designed to brute force directories and files in web servers. It features multiprocessing, recursive scanning, and extensive customization options.",
        command: "dirsearch -u https://target.com -e php,html,js",
        difficulty: "beginner",
        officialDocs: "https://github.com/maurosoria/dirsearch",
        safetyNote: "Respect robots.txt. Use appropriate rate limiting to avoid overwhelming targets.",
        flags: [
            { flag: "-u", description: "Target URL" },
            { flag: "-e", description: "Extensions (comma separated)" },
            { flag: "-w", description: "Custom wordlist" },
            { flag: "-r", description: "Recursive scanning" },
            { flag: "-t", description: "Threads" }
        ],
        examples: [
            { title: "Basic Scan", command: "dirsearch -u https://target.com -e php,html,js", description: "Scan with common extensions" },
            { title: "Recursive Scan", command: "dirsearch -u https://target.com -e php -r", description: "Scan recursively" }
        ],
        useCases: ["Web path discovery", "Directory enumeration", "File finding", "Hidden resource discovery"],
        relatedTools: ["gobuster", "dirb", "ffuf"]
    },
    {
        id: "ffuf",
        name: "FFUF",
        category: "web-application",
        description: "Fast web fuzzer written in Go for high-speed fuzzing applications.",
        detailedDescription: "FFUF (Fuzz Faster U Fool) is an extremely fast web fuzzer written in Go, used for fuzzing web applications. It's highly efficient and perfect for bug bounty hunting and penetration testing.",
        command: "ffuf -u https://target.com/FUZZ -w wordlist.txt",
        difficulty: "beginner",
        officialDocs: "https://github.com/ffuf/ffuf",
        safetyNote: "Can generate high traffic. Use responsibly with appropriate rate limiting.",
        flags: [
            { flag: "-u", description: "Target URL with FUZZ keyword" },
            { flag: "-w", description: "Wordlist path" },
            { flag: "-c", description: "Colorize output" },
            { flag: "-t", description: "Threads" },
            { flag: "-recursion", description: "Recursive fuzzing" },
            { flag: "-mc", description: "Match HTTP codes" },
            { flag: "-fc", description: "Filter HTTP codes" }
        ],
        examples: [
            { title: "Directory Fuzzing", command: "ffuf -u https://target.com/FUZZ -w wordlist.txt", description: "Find directories" },
            { title: "VHost Discovery", command: "ffuf -u https://target.com -H \"Host: FUZZ.target.com\" -w wordlist.txt", description: "Find virtual hosts" }
        ],
        useCases: ["Web fuzzing", "Bug bounty hunting", "Directory discovery", "Parameter fuzzing"],
        relatedTools: ["wfuzz", "gobuster", "dirsearch"]
    },
    {
        id: "xsstrike",
        name: "XSStrike",
        category: "web-application",
        description: "Advanced XSS detection suite with context-aware payload generation.",
        detailedDescription: "XSStrike is a Cross-Site Scripting detection suite equipped with a powerful fuzzing engine. Unlike other scanners, it does not inject payloads but generates unique payloads based on context analysis.",
        command: "python3 xsstrike.py -u \"https://target.com/?param=test\"",
        difficulty: "intermediate",
        officialDocs: "https://github.com/s0md3v/XSStrike",
        safetyNote: "Use on authorized targets only. XSS testing can have unintended consequences.",
        flags: [
            { flag: "-u", description: "Target URL" },
            { flag: "--data", description: "POST data" },
            { flag: "--crawl", description: "Crawl the target" },
            { flag: "--json", description: "Treat body as JSON" },
            { flag: "--blind", description: "Enable blind XSS testing" }
        ],
        examples: [
            { title: "Basic Scan", command: "python3 xsstrike.py -u \"https://target.com/?q=test\"", description: "Scan for XSS" },
            { title: "Crawl Mode", command: "python3 xsstrike.py -u \"https://target.com\" --crawl", description: "Crawl and test all links" }
        ],
        useCases: ["XSS vulnerability detection", "DOM-based XSS testing", "Blind XSS testing", "Reflected XSS discovery"],
        relatedTools: ["dalfox", "xsser", "xssing"]
    },

    // ==================== DATABASE ASSESSMENT ====================
    {
        id: "sqlninja",
        name: "SQLNinja",
        category: "database-assessment",
        description: "SQL injection exploitation tool focused on Microsoft SQL Server.",
        detailedDescription: "SQLNinja is an SQL injection exploitation tool that targets web applications using MS SQL Server as the back-end database. It focuses on gaining interactive OS shell access through SQL injection.",
        command: "./sqlninja -f sqlninja.conf",
        difficulty: "advanced",
        officialDocs: "http://sqlninja.sourceforge.net/",
        safetyNote: "Offensive exploitation tool. Use only with explicit authorization.",
        flags: [
            { flag: "-f", description: "Configuration file" },
            { flag: "-m", description: "Mode (test, vuln, fingerprint, etc.)" },
            { flag: "-p", description: "Pivot connection" }
        ],
        examples: [
            { title: "Test Mode", command: "sqlninja -f myconfig.conf -m test", description: "Test for SQLi" },
            { title: "Shell Mode", command: "sqlninja -f myconfig.conf -m shell", description: "Attempt OS shell" }
        ],
        useCases: ["SQL Server exploitation", "OS shell via SQLi", "Database takeover", "Privilege escalation"],
        relatedTools: ["sqlmap", "pangolin", "havij"]
    },
    {
        id: "sqlitebrowser",
        name: "DB Browser for SQLite",
        category: "database-assessment",
        description: "Visual tool for creating, browsing, and editing SQLite databases.",
        detailedDescription: "DB Browser for SQLite (DB4S) is a high-quality, visual, open-source tool created for developers to create, search, design, and edit SQLite databases with a spreadsheet-like interface.",
        command: "sqlitebrowser database.db",
        difficulty: "beginner",
        officialDocs: "https://sqlitebrowser.org/",
        safetyNote: "GUI application for database analysis. Safe for forensic examination.",
        flags: [
            { flag: "--new", description: "Create new database" },
            { flag: "--sql", description: "Execute SQL on startup" }
        ],
        examples: [
            { title: "Open Database", command: "sqlitebrowser app.db", description: "Open existing database" },
            { title: "Create New", command: "sqlitebrowser --new newdb.db", description: "Create new database" }
        ],
        useCases: ["Database inspection", "SQLite analysis", "Forensics", "Data recovery"],
        relatedTools: ["sqlite3", "dbeaver", "adminer"]
    },

    // ==================== PASSWORD ATTACKS ====================
    {
        id: "john",
        name: "John the Ripper",
        category: "password-attacks",
        description: "Fast password cracker supporting hundreds of hash and cipher types.",
        detailedDescription: "John the Ripper is one of the most popular password cracking tools. It can automatically detect hash types, perform dictionary attacks, brute force, and hybrid attacks. Essential for password auditing.",
        command: "john --wordlist=rockyou.txt hashes.txt",
        difficulty: "beginner",
        officialDocs: "https://www.openwall.com/john/doc/",
        safetyNote: "Legal for authorized password auditing only. Never use for unauthorized access.",
        flags: [
            { flag: "--wordlist", description: "Use wordlist" },
            { flag: "--rules", description: "Enable wordlist mangling rules" },
            { flag: "--show", description: "Show cracked passwords" },
            { flag: "--format", description: "Specify hash format" },
            { flag: "--fork", description: "Number of parallel processes" }
        ],
        examples: [
            { title: "Dictionary Attack", command: "john --wordlist=rockyou.txt hashes.txt", description: "Crack with wordlist" },
            { title: "Show Cracked", command: "john --show hashes.txt", description: "Display results" }
        ],
        useCases: ["Password auditing", "Hash cracking", "Security testing", "Credential recovery"],
        relatedTools: ["hashcat", "hydra", "hashid"]
    },
    {
        id: "hashcat",
        name: "Hashcat",
        category: "password-attacks",
        description: "World's fastest GPU-accelerated password recovery utility.",
        detailedDescription: "Hashcat is the world's fastest CPU-based password recovery tool. It utilizes GPU acceleration for dramatically faster cracking speeds and supports hundreds of hash algorithms.",
        command: "hashcat -m 0 -a 0 hashes.txt wordlist.txt",
        difficulty: "intermediate",
        officialDocs: "https://hashcat.net/wiki/",
        safetyNote: "GPU intensive. Legal only for authorized password auditing.",
        flags: [
            { flag: "-m", description: "Hash type number (0=MD5, 1000=NTLM, etc.)" },
            { flag: "-a", description: "Attack mode (0=straight, 3=brute-force)" },
            { flag: "-o", description: "Output file for recovered hashes" },
            { flag: "--show", description: "Show cracked hashes" },
            { flag: "-r", description: "Rules file for mangling" }
        ],
        examples: [
            { title: "Dictionary Attack", command: "hashcat -m 0 -a 0 hashes.txt wordlist.txt", description: "Crack MD5 hashes" },
            { title: "Brute Force", command: "hashcat -m 0 -a 3 hashes.txt ?a?a?a?a?a?a", description: "Try all combinations" }
        ],
        useCases: ["Password cracking", "Hash recovery", "Security auditing", "GPU-accelerated recovery"],
        relatedTools: ["john", "oclHashcat", "maskprocessor"]
    },
    {
        id: "hydra",
        name: "Hydra",
        category: "password-attacks",
        description: "Parallelized login cracker supporting numerous protocols.",
        detailedDescription: "Hydra is a parallelized login cracker which supports numerous protocols to attack. It can perform rapid dictionary attacks against more than 50 protocols including telnet, FTP, HTTP, SMB, and SSH.",
        command: "hydra -l admin -P passwords.txt ssh://target.com",
        difficulty: "beginner",
        officialDocs: "https://github.com/vanhauser-thc/thc-hydra",
        safetyNote: "High impact on targets - can cause account lockouts. Use only with authorization.",
        flags: [
            { flag: "-l", description: "Single username" },
            { flag: "-L", description: "Username list file" },
            { flag: "-p", description: "Single password" },
            { flag: "-P", description: "Password list file" },
            { flag: "-t", description: "Number of parallel tasks" },
            { flag: "-V", description: "Verbose output" }
        ],
        examples: [
            { title: "SSH Attack", command: "hydra -l admin -P passwords.txt ssh://target.com", description: "Brute force SSH" },
            { title: "HTTP Form", command: "hydra -l admin -P passwords.txt target.com http-post-form \"/login:user=^USER^&pass=^PASS^:Invalid\"", description: "Brute force web login" }
        ],
        useCases: ["Service bruteforcing", "Authentication testing", "Credential stuffing", "Password spraying"],
        relatedTools: ["medusa", "patator", "crowbar"]
    },
    {
        id: "medusa",
        name: "Medusa",
        category: "password-attacks",
        description: "Speedy, parallel, modular login brute-forcer with threaded design.",
        detailedDescription: "Medusa is a speedy, parallel, modular login brute-forcer. It supports many protocols including HTTP, IMAP, SSH, SMB, and more. Known for its threaded design for parallel attacks.",
        command: "medusa -h target.com -u admin -P passwords.txt -M ssh",
        difficulty: "beginner",
        officialDocs: "https://github.com/jmk-foofus/medusa",
        safetyNote: "Can cause account lockouts. Use responsibly on authorized targets.",
        flags: [
            { flag: "-h", description: "Target host" },
            { flag: "-u", description: "Username" },
            { flag: "-U", description: "Username file" },
            { flag: "-P", description: "Password file" },
            { flag: "-M", description: "Module to use (ssh, ftp, http, etc.)" },
            { flag: "-t", description: "Number of threads" }
        ],
        examples: [
            { title: "SSH Attack", command: "medusa -h target.com -u admin -P passwords.txt -M ssh", description: "Brute SSH" },
            { title: "Multiple Users", command: "medusa -h target.com -U users.txt -P passwords.txt -M ssh", description: "Multiple usernames" }
        ],
        useCases: ["Service bruteforcing", "Authentication testing", "Parallel login testing"],
        relatedTools: ["hydra", "ncrack", "patator"]
    },
    {
        id: "crunch",
        name: "Crunch",
        category: "password-attacks",
        description: "Wordlist generator for custom character sets and patterns.",
        detailedDescription: "Crunch is a wordlist generator where you can specify a character set or a minimum and maximum length. Essential for creating targeted wordlists for password cracking.",
        command: "crunch 8 12 abcdefghijklmnopqrstuvwxyz -o wordlist.txt",
        difficulty: "beginner",
        officialDocs: "https://sourceforge.net/projects/crunch-wordlist/",
        safetyNote: "Can generate extremely large files. Check disk space before generating.",
        flags: [
            { flag: "min max", description: "Minimum and maximum length" },
            { flag: "-o", description: "Output file" },
            { flag: "-t", description: "Pattern (e.g., @^% for specific chars)" },
            { flag: "-c", description: "Output file size in bytes" },
            { flag: "-z", description: "Compress output (gzip, bzip2, lzma)" }
        ],
        examples: [
            { title: "Basic Wordlist", command: "crunch 6 8 abc123 -o wordlist.txt", description: "Generate alphanumeric wordlist" },
            { title: "Pattern Based", command: "crunch 10 10 -t \"Password%%!\"", description: "Use pattern" }
        ],
        useCases: ["Custom wordlist generation", "Pattern-based lists", "Targeted attacks", "Policy compliance testing"],
        relatedTools: ["cewl", "wordlistctl", "pwdump"]
    },
    {
        id: "cewl",
        name: "CeWL",
        category: "password-attacks",
        description: "Custom word list generator that spiders websites for content.",
        detailedDescription: "CeWL (Custom Word List generator) spiders websites to create word lists based on the content found. Perfect for creating targeted wordlists from organization-specific content.",
        command: "cewl -w wordlist.txt -d 2 https://target.com",
        difficulty: "beginner",
        officialDocs: "https://digi.ninja/projects/cewl.php",
        safetyNote: "Respect robots.txt. Spidering may be logged. Use ethically.",
        flags: [
            { flag: "-w", description: "Output wordlist file" },
            { flag: "-d", description: "Spider depth" },
            { flag: "-m", description: "Minimum word length" },
            { flag: "-x", description: "Maximum word length" },
            { flag: "--email", description: "Extract emails" }
        ],
        examples: [
            { title: "Basic Spidering", command: "cewl -w wordlist.txt -d 2 https://target.com", description: "Create wordlist from site" },
            { title: "Min/Max Length", command: "cewl -w wordlist.txt -m 6 -x 12 https://target.com", description: "Custom word size" }
        ],
        useCases: ["Targeted wordlist creation", "OSINT wordlists", "Organization-specific lists", "Password policy testing"],
        relatedTools: ["crunch", "wordhound", "wilt"]
    },

    // ==================== WIRELESS ATTACKS ====================
    {
        id: "aircrack-ng",
        name: "Aircrack-ng Suite",
        category: "wireless-attacks",
        description: "Complete suite for WiFi security assessment including all aircrack-ng tools.",
        detailedDescription: "Aircrack-ng is a complete suite of tools for wireless network security assessment. It includes airmon-ng for monitor mode, airodump-ng for packet capture, aireplay-ng for injection, and aircrack-ng for WEP/WPA cracking.",
        command: "airmon-ng start wlan0 && airodump-ng wlan0mon",
        difficulty: "intermediate",
        officialDocs: "https://www.aircrack-ng.org/",
        safetyNote: "Legal only on your own networks or with explicit written permission. Monitor mode may violate local laws in some jurisdictions.",
        flags: [
            { flag: "start", description: "Start monitor mode" },
            { flag: "stop", description: "Stop monitor mode" },
            { flag: "check", description: "Check for interfering processes" },
            { flag: "-w", description: "Output capture file" },
            { flag: "--bssid", description: "Filter by BSSID" },
            { flag: "-c", description: "Channel number" }
        ],
        examples: [
            { title: "Enable Monitor Mode", command: "airmon-ng start wlan0", description: "Put card in monitor mode" },
            { title: "Capture Handshake", command: "airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon", description: "Capture WPA handshake" },
            { title: "Crack WPA", command: "aircrack-ng -w wordlist.txt -b AA:BB:CC:DD:EE:FF capture.cap", description: "Crack with handshake" }
        ],
        useCases: ["WEP/WPA cracking", "Packet injection", "Wireless auditing", "Handshake capture", "Wardriving"],
        relatedTools: ["wireshark", "kismet", "wifite"]
    },
    {
        id: "airmon-ng",
        name: "Airmon-ng",
        category: "wireless-attacks",
        description: "Enable monitor mode on wireless interfaces for packet capture.",
        detailedDescription: "Airmon-ng is a script used to enable monitor mode on wireless interfaces. It can also check for processes that might interfere and put the interface back into managed mode.",
        command: "airmon-ng start wlan0",
        difficulty: "beginner",
        officialDocs: "https://www.aircrack-ng.org/doku.php?id=airmon-ng",
        safetyNote: "Requires compatible wireless card with monitor mode support. Check your hardware compatibility.",
        flags: [
            { flag: "start", description: "Enable monitor mode" },
            { flag: "stop", description: "Disable monitor mode" },
            { flag: "check", description: "List conflicting processes" },
            { flag: "check kill", description: "Kill conflicting processes" }
        ],
        examples: [
            { title: "Start Monitor", command: "airmon-ng start wlan0", description: "Enable on wlan0" },
            { title: "Kill Conflicts", command: "airmon-ng check kill", description: "Kill interfering processes" }
        ],
        useCases: ["Monitor mode setup", "Wireless interface management", "Packet capture preparation"],
        relatedTools: ["aircrack-ng", "airodump-ng", "aireplay-ng"]
    },
    {
        id: "airodump-ng",
        name: "Airodump-ng",
        category: "wireless-attacks",
        description: "Packet capture tool for wireless networks with AP and client discovery.",
        detailedDescription: "Airodump-ng is used for packet capture of raw 802.11 frames. It's primarily used to capture WPA/WPA2 handshakes and for wardriving. Shows detected APs and connected clients in real-time.",
        command: "airodump-ng -w capture -c 6 --bssid AA:BB:CC:DD:EE:FF wlan0mon",
        difficulty: "beginner",
        officialDocs: "https://www.aircrack-ng.org/doku.php?id=airodump-ng",
        safetyNote: "Legal on authorized networks only. Capture files can become very large.",
        flags: [
            { flag: "-w", description: "Prefix for output files" },
            { flag: "-c", description: "Channel to listen on" },
            { flag: "--bssid", description: "Filter by AP MAC address" },
            { flag: "-o", description: "Output format (csv, kismet, netxml)" }
        ],
        examples: [
            { title: "Capture All", command: "airodump-ng wlan0mon", description: "Capture all networks" },
            { title: "Targeted Capture", command: "airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon", description: "Capture specific AP" }
        ],
        useCases: ["Handshake capture", "Network discovery", "Wardriving", "AP enumeration"],
        relatedTools: ["aircrack-ng", "aireplay-ng", "kismet"]
    },
    {
        id: "aireplay-ng",
        name: "Aireplay-ng",
        category: "wireless-attacks",
        description: "Packet injection tool for generating traffic in wireless attacks.",
        detailedDescription: "Aireplay-ng is primarily used to inject frames for generating traffic. This traffic can then be used for cracking with aircrack-ng. Various attacks include deauthentication, fake authentication, and ARP request injection.",
        command: "aireplay-ng -0 5 -a AA:BB:CC:DD:EE:FF wlan0mon",
        difficulty: "intermediate",
        officialDocs: "https://www.aircrack-ng.org/doku.php?id=aireplay-ng",
        safetyNote: "Can disrupt wireless networks. Legal only with authorization. Use deauthentication ethically.",
        flags: [
            { flag: "-0", description: "Deauth attack (specify count)" },
            { flag: "-1", description: "Fake authentication attack" },
            { flag: "-3", description: "ARP replay attack" },
            { flag: "-9", description: "Injection test" },
            { flag: "-a", description: "AP MAC address" },
            { flag: "-c", description: "Client MAC address" }
        ],
        examples: [
            { title: "Deauth Attack", command: "aireplay-ng -0 5 -a AA:BB:CC:DD:EE:FF -c CLIENT_MAC wlan0mon", description: "Disconnect client" },
            { title: "Injection Test", command: "aireplay-ng -9 wlan0mon", description: "Test injection capability" }
        ],
        useCases: ["Traffic generation", "Deauth attacks", "Handshake capture acceleration", "Client disconnection"],
        relatedTools: ["aircrack-ng", "airodump-ng", "mdk3"]
    },
    {
        id: "kismet",
        name: "Kismet",
        category: "wireless-attacks",
        description: "Wireless network detector, sniffer, and intrusion detection system.",
        detailedDescription: "Kismet is an 802.11 wireless network detector, sniffer, and intrusion detection system. It works with any wireless card which supports raw monitoring mode and can sniff 802.11b, 802.11a, 802.11g, and 802.11n traffic.",
        command: "kismet -c wlan0",
        difficulty: "intermediate",
        officialDocs: "https://www.kismetwireless.net/docs/",
        safetyNote: "Monitor mode required. Use responsibly and only on authorized networks.",
        flags: [
            { flag: "-c", description: "Source interface" },
            { flag: "--no-ncurses", description: "Disable ncurses UI" },
            { flag: "-p", description: "Non-promiscuous mode" }
        ],
        examples: [
            { title: "Start Kismet", command: "kismet -c wlan0", description: "Begin wireless detection" }
        ],
        useCases: ["Wireless wardriving", "Network detection", "Spectrum analysis", "AP mapping"],
        relatedTools: ["aircrack-ng", "wireshark", "wash"]
    },
    {
        id: "wifite",
        name: "Wifite2",
        category: "wireless-attacks",
        description: "Automated wireless attack tool that simplifies the aircrack-ng process.",
        detailedDescription: "Wifite2 is a wireless network auditing tool designed to be automated. It automatically launches appropriate attacks based on detected networks, making it much easier than manual aircrack-ng commands.",
        command: "wifite",
        difficulty: "beginner",
        officialDocs: "https://github.com/derv82/wifite2",
        safetyNote: "Use only on authorized networks. Automated nature requires caution.",
        flags: [
            { flag: "-i", description: "Interface to use" },
            { flag: "--dict", description: "Wordlist for WPA cracking" },
            { flag: "--wpa", description: "WPA only mode" },
            { flag: "--wep", description: "WEP only mode" },
            { flag: "--pmkid", description: "Use PMKID attack" }
        ],
        examples: [
            { title: "Automated Attack", command: "wifite", description: "Run automated tool" },
            { title: "WPA Only", command: "wifite --wpa", description: "Target only WPA networks" }
        ],
        useCases: ["Automated WiFi attacks", "Quick assessments", "Beginner-friendly wireless testing"],
        relatedTools: ["aircrack-ng", "airgeddon", "reaver"]
    },
    {
        id: "airgeddon",
        name: "Airgeddon",
        category: "wireless-attacks",
        description: "Multi-purpose bash script for comprehensive wireless attacks.",
        detailedDescription: "Airgeddon is a multi-use bash script for Linux systems to audit wireless networks. It offers an interactive menu-based interface with many wireless attack capabilities including WEP, WPA/WPA2, Evil Twin, and more.",
        command: "sudo bash airgeddon.sh",
        difficulty: "intermediate",
        officialDocs: "https://github.com/v1s1t0r1sh3r3/airgeddon",
        safetyNote: "Requires root privileges. Use responsibly and legally.",
        flags: [
            { flag: "-e", description: "Interface" },
            { flag: "-7", description: "Force WEP mode" },
            { flag: "-8", description: "Force WPA/WPA2 mode" }
        ],
        examples: [
            { title: "Start Interface", command: "sudo bash airgeddon.sh -e wlan0", description: "Launch with interface" }
        ],
        useCases: ["Evil Twin attacks", "WPA handshake capture", "Wireless auditing", "WEP cracking"],
        relatedTools: ["wifite", "aircrack-ng", "hostapd"]
    },
    {
        id: "wifiphisher",
        name: "Wifiphisher",
        category: "wireless-attacks",
        description: "Rogue access point attack tool for automated phishing attacks.",
        detailedDescription: "Wifiphisher is a security tool that mounts automated phishing attacks against WiFi networks in order to obtain secret passphrases or other credentials. It's a social engineering attack that tricks users into connecting to a fake AP.",
        command: "sudo wifiphisher",
        difficulty: "intermediate",
        officialDocs: "https://github.com/wifiphisher/wifiphisher",
        safetyNote: "Social engineering tool. Legal only in authorized penetration testing scenarios with explicit permission.",
        flags: [
            { flag: "-e", description: "ESSID (fake AP name)" },
            { flag: "-p", description: "Phishing scenario" },
            { flag: "-pK", description: "Pre-shared key" },
            { flag: "-i", description: "Interface" }
        ],
        examples: [
            { title: "Basic Run", command: "sudo wifiphisher", description: "Launch with menu" },
            { title: "Direct Attack", command: "sudo wifiphisher -e \"Free WiFi\" -p firmware_upgrade", description: "Skip menu" }
        ],
        useCases: ["Phishing attacks", "Credential harvesting", "Social engineering", "Security awareness training"],
        relatedTools: ["airgeddon", "setoolkit", "hostapd-wpe"]
    },
    {
        id: "reaver",
        name: "Reaver",
        category: "wireless-attacks",
        description: "Brute force attack against WiFi Protected Setup (WPS) PINs.",
        detailedDescription: "Reaver performs a brute force attack against WiFi Protected Setup (WPS) registrar PINs to recover WPA/WPA2 passphrases. It's highly effective against many APs that have WPS enabled.",
        command: "reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv",
        difficulty: "intermediate",
        officialDocs: "https://github.com/t6x/reaver-wps-fork-t6x",
        safetyNote: "Takes significant time to complete. Legal only with authorization.",
        flags: [
            { flag: "-i", description: "Monitor interface" },
            { flag: "-b", description: "Target BSSID" },
            { flag: "-c", description: "Channel" },
            { flag: "-vv", description: "Very verbose output" },
            { flag: "-w", description: "Use WPS hex format" }
        ],
        examples: [
            { title: "Basic Attack", command: "reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv", description: "Brute force WPS" },
            { title: "With Channel", command: "reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -c 6 -vv", description: "Specify channel" }
        ],
        useCases: ["WPS PIN cracking", "WPA/WPA2 recovery", "Router security testing"],
        relatedTools: ["wash", "bully", "pixiewps"]
    },

    // ==================== EXPLOITATION TOOLS ====================
    {
        id: "metasploit-framework",
        name: "Metasploit Framework",
        category: "exploitation-tools",
        description: "The world's most used penetration testing and exploitation framework.",
        detailedDescription: "The Metasploit Framework is the most widely used penetration testing and exploitation framework. It provides information about vulnerabilities, aids in penetration testing, and helps develop exploit code.",
        command: "msfconsole",
        difficulty: "intermediate",
        officialDocs: "https://docs.metasploit.com/",
        safetyNote: "Powerful offensive tool. Use only with explicit written authorization.",
        flags: [
            { flag: "-q", description: "Quiet mode (no banner)" },
            { flag: "-r", description: "Resource script file" },
            { flag: "-x", description: "Execute specific commands" }
        ],
        examples: [
            { title: "Start Console", command: "msfconsole", description: "Launch msfconsole" },
            { title: "Search Exploit", command: "search type:exploit name:smb", description: "Find exploits" },
            { title: "Use Exploit", command: "use exploit/windows/smb/ms17_010_eternalblue", description: "Select exploit" }
        ],
        useCases: ["Exploitation", "Post-exploitation", "Vulnerability research", "Penetration testing"],
        relatedTools: ["msfvenom", "msfconsole", "searchsploit"]
    },
    {
        id: "msfvenom",
        name: "Msfvenom",
        category: "exploitation-tools",
        description: "Payload generator and encoder for Metasploit Framework.",
        detailedDescription: "Msfvenom is used to generate and encode payloads for use with the Metasploit Framework. It replaces the older msfpayload and msfencode tools and supports multiple output formats and encoders.",
        command: "msfvenom -p windows/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f exe -o payload.exe",
        difficulty: "intermediate",
        officialDocs: "https://docs.metasploit.com/docs/using-metasploit/basics/how-to-use-msfvenom.html",
        safetyNote: "Malicious tool generation capability. Legal only for authorized security testing with proper documentation.",
        flags: [
            { flag: "-p", description: "Payload to use" },
            { flag: "-f", description: "Output format (exe, elf, php, etc.)" },
            { flag: "-o", description: "Output filename" },
            { flag: "-e", description: "Encoder to use" },
            { flag: "-i", description: "Number of encoding iterations" },
            { flag: "-x", description: "Template executable to inject into" }
        ],
        examples: [
            { title: "Windows Payload", command: "msfvenom -p windows/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f exe -o shell.exe", description: "Generate reverse TCP" },
            { title: "Linux Payload", command: "msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=IP -f elf -o shell.elf", description: "Generate Linux binary" }
        ],
        useCases: ["Payload generation", "Backdoor creation", "Virus construction", "Penetration testing"],
        relatedTools: ["metasploit-framework", "veil", "unicorn"]
    },
    {
        id: "exploitdb",
        name: "Exploit-DB",
        category: "exploitation-tools",
        description: "Archive of public exploits and corresponding software.",
        detailedDescription: "Exploit-DB is an archive of public exploits and corresponding software, provided by Offensive Security. It's updated daily and is an essential resource for penetration testers and security researchers.",
        command: "searchsploit apache 2.4",
        difficulty: "beginner",
        officialDocs: "https://www.exploit-db.com/",
        safetyNote: "For research only. Verify and test exploits before use in any environment.",
        flags: [
            { flag: "-u", description: "Update database" },
            { flag: "-c", description: "Search in exploit title" },
            { flag: "-t", description: "Search by type" }
        ],
        examples: [
            { title: "Search Exploits", command: "searchsploit apache 2.4", description: "Find Apache exploits" },
            { title: "Copy Exploit", command: "searchsploit -m 12345", description: "Copy to current directory" }
        ],
        useCases: ["Exploit research", "Vulnerability hunting", "Security research", "CTF competitions"],
        relatedTools: ["searchsploit", "metasploit-framework", "pompem"]
    },
    {
        id: "searchsploit",
        name: "SearchSploit",
        category: "exploitation-tools",
        description: "Command-line search tool for Exploit-DB archive.",
        detailedDescription: "SearchSploit is the command-line utility for searching through the Exploit-DB archive offline. It allows you to search for exploits and copy them to your working directory.",
        command: "searchsploit remote code execution",
        difficulty: "beginner",
        officialDocs: "https://www.exploit-db.com/searchsploit",
        safetyNote: "Verify exploits before running. Test in isolated environments first.",
        flags: [
            { flag: "-u", description: "Update database" },
            { flag: "-c", description: "Search in titles only" },
            { flag: "-m", description: "Mirror (copy) exploit file" },
            { flag: "-p", description: "Show full path" }
        ],
        examples: [
            { title: "Basic Search", command: "searchsploit windows smb", description: "Find exploits" },
            { title: "Copy Exploit", command: "searchsploit -m 12345.py", description: "Get exploit file" }
        ],
        useCases: ["Exploit discovery", "Vulnerability research", "CTF challenges", "Security research"],
        relatedTools: ["exploitdb", "msfconsole", "packetstorm"]
    },

    // ==================== SNIFFING & SPOOFING ====================
    {
        id: "wireshark",
        name: "Wireshark",
        category: "sniffing-spoofing",
        description: "Industry-standard network protocol analyzer for packet capture and analysis.",
        detailedDescription: "Wireshark is the world's foremost and widely-used network protocol analyzer. It lets you see what's happening on your network at a microscopic level, essential for network troubleshooting and security analysis.",
        command: "wireshark",
        difficulty: "beginner",
        officialDocs: "https://www.wireshark.org/docs/",
        safetyNote: "Promiscuous mode may require elevated privileges. Capture only on networks you own or have permission to monitor.",
        flags: [
            { flag: "-i", description: "Capture interface" },
            { flag: "-k", description: "Start capturing immediately" },
            { flag: "-f", description: "Capture filter" },
            { flag: "-w", description: "Write to file" },
            { flag: "-r", description: "Read from file (pcap)" }
        ],
        examples: [
            { title: "Capture Interface", command: "wireshark -i eth0 -k", description: "Start capturing" },
            { title: "Read Capture", command: "wireshark capture.pcap", description: "Open pcap file" }
        ],
        useCases: ["Packet analysis", "Network troubleshooting", "Security auditing", "Protocol education"],
        relatedTools: ["tcpdump", "tshark", "ettercap"]
    },
    {
        id: "tcpdump",
        name: "Tcpdump",
        category: "sniffing-spoofing",
        description: "Powerful command-line packet analyzer for network traffic capture.",
        detailedDescription: "Tcpdump is a powerful command-line packet analyzer. It allows you to capture or filter TCP/IP and other packets being transmitted or received over a network connection.",
        command: "tcpdump -i eth0 -nn -s0 -v",
        difficulty: "beginner",
        officialDocs: "https://www.tcpdump.org/manpages/tcpdump.1.html",
        safetyNote: "Requires root for raw packet capture. Use responsibly on authorized networks.",
        flags: [
            { flag: "-i", description: "Interface" },
            { flag: "-nn", description: "Don't resolve hostnames or ports" },
            { flag: "-s", description: "Snaplen (packet size)" },
            { flag: "-v", description: "Verbose output" },
            { flag: "-w", description: "Write to file" },
            { flag: "-r", description: "Read from file" }
        ],
        examples: [
            { title: "Basic Capture", command: "tcpdump -i eth0", description: "Capture on interface" },
            { title: "Save Capture", command: "tcpdump -i eth0 -w capture.pcap", description: "Save to file" }
        ],
        useCases: ["Network troubleshooting", "Packet capture", "Security monitoring", "Traffic analysis"],
        relatedTools: ["wireshark", "tshark", "dumpcap"]
    },
    {
        id: "bettercap",
        name: "Bettercap",
        category: "sniffing-spoofing",
        description: "Swiss Army knife for network attacks and monitoring with modular design.",
        detailedDescription: "Bettercap is a powerful, flexible and portable tool created to perform various types of MITM attacks against a network. It can intercept traffic, sniff credentials, and perform spoofing attacks.",
        command: "bettercap -iface eth0",
        difficulty: "intermediate",
        officialDocs: "https://www.bettercap.org/",
        safetyNote: "Offensive MITM tool. Use only with explicit authorization.",
        flags: [
            { flag: "-iface", description: "Network interface" },
            { flag: "-caplet", description: "Run caplet script" },
            { flag: "-eval", description: "Run commands on startup" },
            { flag: "-gateway", description: "Specify gateway" }
        ],
        examples: [
            { title: "Interactive Mode", command: "bettercap -iface eth0", description: "Start interactive" },
            { title: "ARP Spoof", command: "bettercap -eval \"set arp.spoof.internal true; arp.spoof on\"", description: "Enable ARP spoofing" }
        ],
        useCases: ["MITM attacks", "Network spoofing", "Credential sniffing", "Traffic manipulation"],
        relatedTools: ["ettercap", "dsniff", "sslstrip"]
    },
    {
        id: "ettercap",
        name: "Ettercap",
        category: "sniffing-spoofing",
        description: "Comprehensive suite for man-in-the-middle attacks on LAN.",
        detailedDescription: "Ettercap is a comprehensive suite for man-in-the-middle attacks. It features sniffing of live connections, content filtering on the fly, and many other tricks. It supports active and passive dissection of many protocols.",
        command: "ettercap -T -M arp:remote /192.168.1.1// /192.168.1.100//",
        difficulty: "intermediate",
        officialDocs: "https://www.ettercap-project.org/",
        safetyNote: "Offensive MITM tool. Can intercept all traffic on the network segment. Use ethically.",
        flags: [
            { flag: "-T", description: "Text interface" },
            { flag: "-G", description: "Graphical interface" },
            { flag: "-M", description: "MITM method" },
            { flag: "-i", description: "Interface" },
            { flag: "-w", description: "Write capture file" }
        ],
        examples: [
            { title: "ARP Spoof", command: "ettercap -T -M arp /router// /target//", description: "ARP poisoning" },
            { title: "GUI Mode", command: "ettercap -G", description: "Launch graphical" }
        ],
        useCases: ["ARP spoofing", "Password sniffing", "Session hijacking", "MITM testing"],
        relatedTools: ["bettercap", "dsniff", "sslstrip"]
    },
    {
        id: "responder",
        name: "Responder",
        category: "sniffing-spoofing",
        description: "LLMNR, NBT-NS and MDNS poisoner for credential harvesting.",
        detailedDescription: "Responder is a NBT-NS/LLMNR/mDNS poisoner that responds to NBT-NS Packet broadcasts on the local network. It listens for NBT-NS, LLMNR, and mDNS queries and poisons them with fake responses.",
        command: "responder -I eth0",
        difficulty: "intermediate",
        officialDocs: "https://github.com/SpiderLabs/Responder",
        safetyNote: "Offensive credential harvesting tool. Use only during authorized penetration tests.",
        flags: [
            { flag: "-I", description: "Interface" },
            { flag: "-b", description: "Force Basic authentication" },
            { flag: "-F", description: "Force WRED" },
            { flag: "-v", description: "Verbose output" }
        ],
        examples: [
            { title: "Start Responder", command: "responder -I eth0", description: "Begin poisoning" },
            { title: "With Logging", command: "responder -I eth0 -v", description: "Verbose logging" }
        ],
        useCases: ["LLMNR poisoning", "NBT-NS spoofing", "Hash harvesting", "Credential capture"],
        relatedTools: ["impacket", "metasploit-framework", "multi-relay"]
    },
    {
        id: "dsniff",
        name: "Dsniff",
        category: "sniffing-spoofing",
        description: "Collection of network password sniffing and analysis tools.",
        detailedDescription: "Dsniff is a collection of tools for network auditing and penetration testing. It includes dsniff, filesnarf, mailsnarf, msgsnarf, urlsnarf, and webspy - all designed for sniffing various types of traffic.",
        command: "dsniff -i eth0",
        difficulty: "intermediate",
        officialDocs: "https://www.monkey.org/~dugsong/dsniff/",
        safetyNote: "Passive sniffing tool. Use only on networks you own or have permission to monitor.",
        flags: [
            { flag: "-i", description: "Interface" },
            { flag: "-m", description: "Auto-detect protocol" },
            { flag: "-c", description: "Half-duplex cisco style" }
        ],
        examples: [
            { title: "Sniff Traffic", command: "dsniff -i eth0", description: "Capture passwords" },
            { title: "Auto Detect", command: "dsniff -i eth0 -m", description: "Auto-detect protocols" }
        ],
        useCases: ["Password sniffing", "Network analysis", "Traffic capture", "Protocol analysis"],
        relatedTools: ["ettercap", "wireshark", "tcpdump"]
    },

    // ==================== POST EXPLOITATION ====================
    {
        id: "meterpreter",
        name: "Meterpreter",
        category: "post-exploitation",
        description: "Advanced dynamically extensible payload for post-exploitation activities.",
        detailedDescription: "Meterpreter is an advanced, dynamically extensible payload that uses DLL injection to stay resident in memory. It provides extensive post-exploitation capabilities including file system access, process manipulation, and keylogging.",
        command: "use post/multi/manage/shell_to_meterpreter",
        difficulty: "advanced",
        officialDocs: "https://docs.metasploit.com/docs/using-metasploit/basics/meterpreter.html",
        safetyNote: "Post-exploitation framework module. Use only in authorized penetration testing.",
        flags: [
            { flag: "sysinfo", description: "Get system information" },
            { flag: "getuid", description: "Get current user" },
            { flag: "shell", description: "Open shell session" },
            { flag: "hashdump", description: "Dump password hashes" },
            { flag: "screenshot", description: "Capture screenshot" },
            { flag: "keyscan_start", description: "Start keylogger" }
        ],
        examples: [
            { title: "Get System Info", command: "sysinfo", description: "Gather system information" },
            { title: "Dump Hashes", command: "hashdump", description: "Get password hashes" },
            { title: "Screenshot", command: "screenshot", description: "Capture screen" }
        ],
        useCases: ["Post-exploitation", "System control", "Lateral movement", "Privilege escalation"],
        relatedTools: ["mimikatz", "empire", "Cobalt Strike"]
    },
    {
        id: "mimikatz",
        name: "Mimikatz",
        category: "post-exploitation",
        description: "Extract plaintext passwords, hashes, and Kerberos tickets from memory.",
        detailedDescription: "Mimikatz is a tool to extract plaintext passwords, hashes, PIN codes, and Kerberos tickets from memory. It can also perform pass-the-hash, pass-the-ticket, and build Golden Tickets.",
        command: "mimikatz.exe privilege::debug sekurlsa::logonpasswords",
        difficulty: "advanced",
        officialDocs: "https://github.com/gentilkiwi/mimikatz",
        safetyNote: "Powerful credential theft tool. Use only with proper authorization in authorized testing.",
        flags: [
            { flag: "privilege::debug", description: "Enable debug privilege" },
            { flag: "sekurlsa::logonpasswords", description: "Dump logon passwords" },
            { flag: "sekurlsa::tickets", description: "Dump Kerberos tickets" },
            { flag: "lsadump::sam", description: "Dump SAM database" },
            { flag: "lsadump::lsa", description: "Dump LSA secrets" }
        ],
        examples: [
            { title: "Dump Passwords", command: "mimikatz.exe privilege::debug sekurlsa::logonpasswords", description: "Extract from memory" },
            { title: "Dump Tickets", command: "mimikatz.exe sekurlsa::tickets", description: "Extract Kerberos tickets" }
        ],
        useCases: ["Credential dumping", "Kerberos attacks", "Pass-the-Hash", "Golden Ticket attacks"],
        relatedTools: ["meterpreter", "empire", "pwdump"]
    },
    {
        id: "empire",
        name: "PowerShell Empire",
        category: "post-exploitation",
        description: "Post-exploitation framework featuring pure PowerShell agents.",
        detailedDescription: "PowerShell Empire is a post-exploitation framework that combines the power of PowerShell with agents built in Python. It enables persistent access, lateral movement, and comprehensive reconnaissance.",
        command: "empire",
        difficulty: "advanced",
        officialDocs: "https://bc-security.github.io/empire-wiki/",
        safetyNote: "Offensive post-exploitation framework. Use only in authorized penetration testing.",
        flags: [
            { flag: "listeners", description: "Manage listeners" },
            { flag: "agents", description: "List active agents" },
            { flag: "usestager", description: "Use stager module" }
        ],
        examples: [
            { title: "Start Empire", command: "empire", description: "Launch the framework" },
            { title: "List Agents", command: "listeners", description: "View active listeners" }
        ],
        useCases: ["Post-exploitation", "Lateral movement", "Persistence", "Defense evasion"],
        relatedTools: ["meterpreter", "mimikatz", "covenant"]
    },

    // ==================== FORENSICS ====================
    {
        id: "autopsy",
        name: "Autopsy",
        category: "forensics",
        description: "Digital forensics platform with graphical interface to The Sleuth Kit.",
        detailedDescription: "Autopsy is a digital forensics platform and graphical interface to The Sleuth Kit. It provides a user-friendly interface for disk image analysis, file recovery, timeline analysis, and reporting.",
        command: "autopsy",
        difficulty: "intermediate",
        officialDocs: "https://www.sleuthkit.org/autopsy/docs.php",
        safetyNote: "Forensics and analysis tool. Safe to use for digital investigation and evidence examination.",
        flags: [
            { flag: "--nosleep", description: "Prevent sleep mode" },
            { flag: "--debug", description: "Enable debug logging" }
        ],
        examples: [
            { title: "Start GUI", command: "autopsy", description: "Launch GUI" },
            { title: "Create Case", command: "autopsy newcase", description: "Create new case" }
        ],
        useCases: ["Digital forensics", "Disk analysis", "File recovery", "Evidence examination"],
        relatedTools: ["volatility", "sleuthkit", "ftkimager"]
    },
    {
        id: "volatility",
        name: "Volatility",
        category: "forensics",
        description: "Advanced memory forensics framework for incident response and malware analysis.",
        detailedDescription: "Volatility is an advanced memory forensics framework for incident response and malware analysis. It can extract digital artifacts from volatile memory (RAM) dumps.",
        command: "volatility -f memory.dmp --profile=Win10x64 pslist",
        difficulty: "advanced",
        officialDocs: "https://volatility3.readthedocs.io/",
        safetyNote: "Forensics analysis tool. Use for incident response and legitimate investigations.",
        flags: [
            { flag: "-f", description: "Memory dump file" },
            { flag: "--profile", description: "OS profile (Win10x64, Win7x64, etc.)" },
            { flag: "pslist", description: "List processes" },
            { flag: "netscan", description: "Scan network connections" },
            { flag: "hashdump", description: "Dump password hashes" }
        ],
        examples: [
            { title: "Process List", command: "volatility -f mem.dmp --profile=Win10x64 pslist", description: "List processes" },
            { title: "Network Scan", command: "volatility -f mem.dmp --profile=Win10x64 netscan", description: "Net connections" }
        ],
        useCases: ["Memory forensics", "Incident response", "Malware analysis", "Digital forensics"],
        relatedTools: ["autopsy", "sleuthkit", "rekall"]
    },
    {
        id: "sleuthkit",
        name: "Sleuth Kit",
        category: "forensics",
        description: "Collection of UNIX-based command-line digital forensics tools.",
        detailedDescription: "The Sleuth Kit is a collection of UNIX-based command-line digital forensics tools. It allows you to investigate disk images and recover files including deleted data.",
        command: "fls -r -d image.raw",
        difficulty: "intermediate",
        officialDocs: "https://www.sleuthkit.org/sleuthkit/docs.php",
        safetyNote: "Forensics tool for analysis and investigation. Safe to use on evidence images.",
        flags: [
            { flag: "fls", description: "List files and directories" },
            { flag: "ils", description: "List inodes" },
            { flag: "icat", description: "Extract file content" },
            { flag: "-r", description: "Recursive" },
            { flag: "-d", description: "Only deleted files" }
        ],
        examples: [
            { title: "List Files", command: "fls -r -d image.raw", description: "List all files" },
            { title: "Extract File", command: "icat -r image.raw inode_number", description: "Extract file" }
        ],
        useCases: ["Disk forensics", "File recovery", "Timeline analysis", "Deleted file recovery"],
        relatedTools: ["autopsy", "volatility", "foremost"]
    },
    {
        id: "binwalk",
        name: "Binwalk",
        category: "forensics",
        description: "Fast tool for analyzing, reverse engineering, and extracting firmware images.",
        detailedDescription: "Binwalk is a fast, easy tool for analyzing, reverse engineering, and extracting firmware images. It uses signature scanning to find embedded files and executable code.",
        command: "binwalk firmware.bin",
        difficulty: "beginner",
        officialDocs: "https://github.com/ReFirmLabs/binwalk",
        safetyNote: "Analysis and reverse engineering tool. Use for legitimate firmware analysis and security research.",
        flags: [
            { flag: "-e", description: "Extract embedded files" },
            { flag: "-M", description: "Recursive extraction" },
            { flag: "-d", description: "Deep extract (carve)" },
            { flag: "-B", description: "Signature scan only" },
            { flag: "-r", description: "Remove extracted files after extraction" }
        ],
        examples: [
            { title: "Scan Firmware", command: "binwalk firmware.bin", description: "Find signatures" },
            { title: "Extract Files", command: "binwalk -e firmware.bin", description: "Extract embedded data" }
        ],
        useCases: ["Firmware analysis", "Embedded extraction", "Reverse engineering", "Binary analysis"],
        relatedTools: ["firmwalker", "firmware-mod-kit", "foremost"]
    },
    {
        id: "foremost",
        name: "Foremost",
        category: "forensics",
        description: "Console program to recover files based on headers and footers (carving).",
        detailedDescription: "Foremost is a console program that recovers files based on their headers, footers, and internal data structures. It's excellent for file carving from disk images and raw devices.",
        command: "foremost -i disk.img -o output",
        difficulty: "beginner",
        officialDocs: "https://foremost.sourceforge.net/",
        safetyNote: "File recovery and forensics tool. Safe for data recovery and investigation.",
        flags: [
            { flag: "-i", description: "Input file or device" },
            { flag: "-o", description: "Output directory" },
            { flag: "-t", description: "File types (jpg, png, pdf, etc.)" },
            { flag: "-v", description: "Verbose mode" },
            { flag: "-q", description: "Quiet mode" }
        ],
        examples: [
            { title: "Basic Recovery", command: "foremost -i disk.img -o output", description: "Recover all files" },
            { title: "Specific Types", command: "foremost -t jpg,gif,png -i disk.img -o output", description: "Only images" }
        ],
        useCases: ["File carving", "Data recovery", "Forensics", "Deleted file recovery"],
        relatedTools: ["scalpel", "photorec", "testdisk"]
    },

    // ==================== REVERSE ENGINEERING ====================
    {
        id: "ghidra",
        name: "Ghidra",
        category: "reverse-engineering",
        description: "Software reverse engineering framework developed by NSA's Research Directorate.",
        detailedDescription: "Ghidra is a software reverse engineering framework developed by NSA's Research Directorate. It includes a decompiler for many architectures and supports interactive analysis of binary executables.",
        command: "ghidraRun",
        difficulty: "advanced",
        officialDocs: "https://ghidra-sre.org/",
        safetyNote: "Legitimate reverse engineering tool. Use for malware analysis, security research, and interoperability.",
        flags: [
            { flag: "-p", description: "Project directory" },
            { flag: "-scriptpath", description: "Additional script paths" },
            { flag: "-analysisTimeout", description: "Analysis timeout" }
        ],
        examples: [
            { title: "Start GUI", command: "ghidraRun", description: "Launch GUI" },
            { title: "Headless Mode", command: "analyzeHeadless /project -import binary", description: "Batch analysis" }
        ],
        useCases: ["Binary analysis", "Malware reverse engineering", "Vulnerability discovery", "Code understanding"],
        relatedTools: ["IDA Pro", "radare2", "Binary Ninja"]
    },
    {
        id: "radare2",
        name: "Radare2",
        category: "reverse-engineering",
        description: "Portable, command-line reverse engineering framework with hex editor.",
        detailedDescription: "Radare2 is a portable, command-line reverse engineering framework. It provides a hex editor, disassembler, debugger, and many other utilities in a modular architecture.",
        command: "r2 binary",
        difficulty: "advanced",
        officialDocs: "https://book.rada.re/",
        safetyNote: "Reverse engineering tool. Use for legitimate security research and malware analysis.",
        flags: [
            { flag: "-w", description: "Write mode" },
            { flag: "-d", description: "Debug mode" },
            { flag: "-A", description: "Analyze all (aaa)" }
        ],
        examples: [
            { title: "Open Binary", command: "r2 binary", description: "Open for analysis" },
            { title: "Analyze", command: "r2 -A binary", description: "Auto-analyze" }
        ],
        useCases: ["Binary reverse engineering", "Debugging", "Vulnerability analysis", "Malware analysis"],
        relatedTools: ["ghidra", "IDA", "Binary Ninja"]
    },
    {
        id: "gdb",
        name: "GDB",
        category: "reverse-engineering",
        description: "GNU Debugger for runtime analysis, debugging, and reverse engineering.",
        detailedDescription: "GDB (GNU Debugger) is a powerful debugger for runtime analysis. It allows you to see what a program is doing, step through code, examine variables, and understand program flow.",
        command: "gdb ./binary",
        difficulty: "intermediate",
        officialDocs: "https://www.sourceware.org/gdb/documentation/",
        safetyNote: "Debugging tool for legitimate software development and reverse engineering.",
        flags: [
            { flag: "run", description: "Start program" },
            { flag: "break", description: "Set breakpoint" },
            { flag: "next", description: "Next line (step over)" },
            { flag: "step", description: "Step into function" },
            { flag: "print", description: "Print variable" },
            { flag: "x", description: "Examine memory" }
        ],
        examples: [
            { title: "Start Debug", command: "gdb ./binary", description: "Debug binary" },
            { title: "Set Breakpoint", command: "break main", description: "Break at main" },
            { title: "Examine Memory", command: "x/100x &variable", description: "Hex dump" }
        ],
        useCases: ["Debugging", "Reverse engineering", "Vulnerability analysis", "Software development"],
        relatedTools: ["radare2", "lldb", "windbg"]
    },
    {
        id: "strings",
        name: "Strings",
        category: "reverse-engineering",
        description: "Find printable strings in binary files for quick analysis.",
        detailedDescription: "Strings is a simple tool that finds and prints printable strings in binary files. It's often the first step in binary analysis to quickly identify potential functionality, URLs, or embedded data.",
        command: "strings binary | grep password",
        difficulty: "beginner",
        officialDocs: "https://www.gnu.org/software/binutils/manual/html_node/Strings.html",
        safetyNote: "Analysis tool. Use for legitimate software analysis and reverse engineering.",
        flags: [
            { flag: "-n", description: "Minimum string length" },
            { flag: "-e", description: "Encoding (s=UTF-8, etc.)" },
            { flag: "-o", description: "Print offset in decimal" },
            { flag: "-a", description: "Scan entire file" }
        ],
        examples: [
            { title: "Basic Strings", command: "strings binary", description: "Find all strings" },
            { title: "Min Length", command: "strings -n 8 binary", description: "Longer strings only" }
        ],
        useCases: ["Binary analysis", "Malware triage", "Credential finding", "Quick forensics"],
        relatedTools: ["binwalk", "radare2", "objdump"]
    },
    {
        id: "objdump",
        name: "Objdump",
        category: "reverse-engineering",
        description: "Display information from object files including disassembly.",
        detailedDescription: "Objdump is part of GNU binutils. It displays various information from object files including headers, sections, symbols, and disassembly.",
        command: "objdump -d binary",
        difficulty: "intermediate",
        officialDocs: "https://man7.org/linux/man-pages/man1/objdump.1.html",
        safetyNote: "Analysis tool for reverse engineering and debugging.",
        flags: [
            { flag: "-d", description: "Disassemble executable sections" },
            { flag: "-D", description: "Disassemble all sections" },
            { flag: "-h", description: "Display section headers" },
            { flag: "-t", description: "Display symbol table" },
            { flag: "-x", description: "Display all headers" },
            { flag: "-M intel", description: "Intel syntax (instead of AT&T)" }
        ],
        examples: [
            { title: "Disassemble", command: "objdump -d binary", description: "Assembly code" },
            { title: "Headers", command: "objdump -h binary", description: "Section headers" },
            { title: "Symbols", command: "objdump -t binary", description: "Symbol table" }
        ],
        useCases: ["Binary analysis", "Disassembly", "Header inspection", "Executable examination"],
        relatedTools: ["radare2", "ghidra", "readelf"]
    }
];

// Initialize data
KALIVAULT_DATA.tools = toolsData;
KALIVAULT_DATA.meta.totalTools = toolsData.length;

// Helper functions
function getToolsByCategory(categoryId) {
    return toolsData.filter(tool => tool.category === categoryId);
}

function getToolById(toolId) {
    return toolsData.find(tool => tool.id === toolId);
}

function searchTools(query) {
    const q = query.toLowerCase();
    return toolsData.filter(tool => 
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q)
    );
}

function getRandomTool() {
    return toolsData[Math.floor(Math.random() * toolsData.length)];
}

function getFeaturedTool() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return toolsData[seed % toolsData.length];
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KALIVAULT_DATA, toolsData, getToolsByCategory, getToolById, searchTools, getRandomTool, getFeaturedTool };
}
