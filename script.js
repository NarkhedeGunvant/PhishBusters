// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    setupNavigation();
    
    // Blacklisted Sites
    populateBlacklistedSites();
    startBlacklistedSitesScroll();
    
    // Blog Posts
    populateBlogPosts();
    
    // Forms
    setupScanForms();
    setupEmailScanForm();
    setupReportForm();
    setupAuthForms();
    
    // Mobile Menu
    setupMobileMenu();
    
    // Modals
    setupModals();
    
});  

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Mobile Menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
}

// Modals
function setupModals() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const ctaSignupBtn = document.getElementById('cta-signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // Open login modal
    loginBtn.addEventListener('click', function() {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Open signup modal
    signupBtn.addEventListener('click', function() {
        signupModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // CTA signup button
    if (ctaSignupBtn) {
        ctaSignupBtn.addEventListener('click', function() {
            signupModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.classList.remove('active');
            signupModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === signupModal) {
            signupModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Switch between login and signup
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            signupModal.classList.add('active');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }
}


// Blacklisted Sites
const BLACKLISTED_SITES = [
    { url: "fake-paypa1.com", reportedAt: "2025-03-12", category: "Financial" },
    { url: "amaz0n-security-alert.net", reportedAt: "2025-03-11", category: "E-commerce" },
    { url: "g00gle-verify.com", reportedAt: "2025-03-10", category: "Tech" },
    { url: "bank0famerica-secure.com", reportedAt: "2025-03-09", category: "Banking" },
    { url: "netfl1x-account-update.com", reportedAt: "2025-03-08", category: "Entertainment" },
    { url: "apple-id-confirm.net", reportedAt: "2025-03-07", category: "Tech" },
    { url: "microsoft-365-verify.com", reportedAt: "2025-03-06", category: "Tech" },
    { url: "facebook-security-login.net", reportedAt: "2025-03-05", category: "Social" },
    { url: "verify-instagram-account.com", reportedAt: "2025-03-04", category: "Social" },
    { url: "chase-bank-alert.net", reportedAt: "2025-03-03", category: "Financial" },
];

function populateBlacklistedSites() {
    const container = document.getElementById('blacklisted-sites-container');
    
    if (!container) return;
    
    let html = '';
    
    BLACKLISTED_SITES.forEach(site => {
        // Determine category class
        let categoryClass = 'other';
        if (site.category === 'Financial' || site.category === 'Banking') {
            categoryClass = 'financial';
        } else if (site.category === 'E-commerce' || site.category === 'Entertainment') {
            categoryClass = 'ecommerce';
        } else if (site.category === 'Social' || site.category === 'Social Media') {
            categoryClass = 'social';
        }
        
        html += `
            <div class="blacklisted-site">
                <div>
                    <div class="blacklisted-site-url">${site.url}</div>
                    <div class="blacklisted-site-date">Reported: ${site.reportedAt}</div>
                </div>
                <div class="blacklisted-site-category ${categoryClass}">
                    ${site.category}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function startBlacklistedSitesScroll() {
    const container = document.getElementById('blacklisted-sites-container');
    
    if (!container) return;
    
    let startTime;
    
    function scroll(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // Slow scroll speed
        const scrollAmount = elapsed / 50;
        
        // Reset scroll position when we've scrolled through all items
        if (container.scrollTop >= (container.scrollHeight - container.clientHeight)) {
            container.scrollTop = 0;
            startTime = timestamp;
        } else {
            container.scrollTop = scrollAmount;
        }
        
        requestAnimationFrame(scroll);
    }
    
    requestAnimationFrame(scroll);
}

// Blog Posts
const BLOG_POSTS = [
    {
        id: "1",
        title: "10 Ways to Identify a Phishing Email",
        excerpt: "Learn the telltale signs of phishing emails and how to protect yourself from these common attacks.",
        date: "March 10, 2025",
        author: "Security Team",
        category: "Email Security",
        readTime: "5 min read"
    },
    {
        id: "2",
        title: "The Rise of AI in Phishing Detection",
        excerpt: "How artificial intelligence is revolutionizing the way we detect and prevent sophisticated phishing attacks.",
        date: "March 5, 2025",
        author: "Tech Analyst",
        category: "Technology",
        readTime: "8 min read"
    },
    {
        id: "3",
        title: "Protecting Your Business from Spear Phishing",
        excerpt: "Targeted attacks are on the rise. Learn how to safeguard your organization from sophisticated spear phishing attempts.",
        date: "February 28, 2025",
        author: "Business Security Expert",
        category: "Business",
        readTime: "10 min read"
    },
    {
        id: "4",
        title: "Mobile Phishing: The Growing Threat",
        excerpt: "As mobile usage increases, so do mobile-specific phishing attacks. Discover how to stay safe on your smartphone.",
        date: "February 20, 2025",
        author: "Mobile Security Specialist",
        category: "Mobile",
        readTime: "6 min read"
    },
    {
        id: "5",
        title: "The Psychology Behind Phishing Scams",
        excerpt: "Understanding the psychological tactics scammers use can help you avoid falling victim to their schemes.",
        date: "February 15, 2025",
        author: "Cybersecurity Psychologist",
        category: "Psychology",
        readTime: "7 min read"
    },
    {
        id: "6",
        title: "How to Create a Security-First Culture in Your Organization",
        excerpt: "Building a culture of security awareness is crucial for preventing phishing attacks in the workplace.",
        date: "February 8, 2025",
        author: "Corporate Trainer",
        category: "Workplace",
        readTime: "9 min read"
    }
];

function populateBlogPosts() {
    const container = document.getElementById('blog-grid');
    
    if (!container) return;
    
    let html = '';
    
    BLOG_POSTS.forEach(post => {
        html += `
            <div class="blog-card">
                <div class="blog-card-header">
                    <div class="blog-category">${post.category}</div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                </div>
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar"></i> ${post.date}</span>
                        <span><i class="fas fa-user"></i> ${post.author}</span>
                        <span><i class="fas fa-clock"></i> ${post.readTime}</span>
                    </div>
                </div>
                <div class="blog-card-footer">
                    <a href="#" class="blog-read-more">
                        Read more <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// URL Scanner
function setupScanForms() {
    const scanForm = document.getElementById('scan-form');
    
    if (scanForm) {
        scanForm.addEventListener('submit', handleScanSubmit);
    }
}

function handleScanSubmit(e) {
    e.preventDefault();
    const url = e.target.querySelector('input').value;
    const resultContainer = document.getElementById('scan-result');
    const scanButton = document.getElementById('scan-button');
    
    if (!url) return;
    
    // Show loading state
    scanButton.disabled = true;
    scanButton.textContent = 'Scanning...';
    resultContainer.innerHTML = `
        <div class="scanning-message">
            <p>Analyzing URL...</p>
            <div class="progress-container">
                <div class="progress-bar" style="width: 45%; background-color: var(--primary);"></div>
            </div>
        </div>
    `;
    
    // Simulate API call
    setTimeout(() => {
        // Generate random score
        const score = Math.random() * 100;
        const isSafe = score > 70;
        
        // Display result
        resultContainer.innerHTML = `
            <div class="result-box ${isSafe ? 'safe' : 'unsafe'}">
                <div class="result-header">
                    <i class="fas ${isSafe ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                    <h4 class="${isSafe ? 'safe' : 'unsafe'}">${isSafe ? 'Safe URL' : 'Potential Phishing'}</h4>
                </div>
                
                <div class="score-container">
                    <div class="score-label">Safety Score</div>
                    <div style="display: flex; align-items: center;">
                        <div class="progress-container" style="flex-grow: 1;">
                            <div class="progress-bar ${isSafe ? 'safe' : 'unsafe'}" style="width: ${score}%;"></div>
                        </div>
                        <span class="progress-value">${Math.round(score)}%</span>
                    </div>
                </div>
                
                <p>${isSafe 
                    ? 'This URL appears to be legitimate. No phishing indicators detected.' 
                    : 'This URL shows signs of being a phishing attempt. Proceed with caution.'}
                </p>
            </div>
        `;
        
        // Reset button
        scanButton.disabled = false;
        scanButton.textContent = 'Scan URL';
    }, 2000);
}

// Email Scanner
function setupEmailScanForm() {
    const emailScanForm = document.getElementById('email-scan-form');
    
    if (emailScanForm) {
        emailScanForm.addEventListener('submit', handleEmailScanSubmit);
    }
}

function handleEmailScanSubmit(e) {
    e.preventDefault();
    const emailContent = e.target.querySelector('textarea').value;
    const resultContainer = document.getElementById('email-scan-result');
    const scanButton = document.getElementById('email-scan-button');
    
    if (!emailContent) return;
    
    // Show loading state
    scanButton.disabled = true;
    scanButton.textContent = 'Analyzing...';
    resultContainer.innerHTML = `
        <div class="scanning-message">
            <p>Analyzing email content...</p>
            <div class="progress-container">
                <div class="progress-bar" style="width: 45%; background-color: var(--primary);"></div>
            </div>
        </div>
    `;
    
    // Simulate API call
    setTimeout(() => {
        // Analyze email content for common phishing indicators
        const indicators = analyzeEmailContent(emailContent);
        const score = 100 - (indicators.length * 15); // Each indicator reduces score
        const isSafe = score > 70;
        
        // Display result
        resultContainer.innerHTML = `
            <div class="result-box ${isSafe ? 'safe' : 'unsafe'}">
                <div class="result-header">
                    <i class="fas ${isSafe ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                    <h4 class="${isSafe ? 'safe' : 'unsafe'}">${isSafe ? 'Low Risk Email' : 'Potential Phishing Email'}</h4>
                </div>
                
                <div class="score-container">
                    <div class="score-label">Safety Score</div>
                    <div style="display: flex; align-items: center;">
                        <div class="progress-container" style="flex-grow: 1;">
                            <div class="progress-bar ${isSafe ? 'safe' : 'unsafe'}" style="width: ${score}%;"></div>
                        </div>
                        <span class="progress-value">${Math.round(score)}%</span>
                    </div>
                </div>
                
                <p>${isSafe 
                    ? 'This email appears to be legitimate with low risk indicators.' 
                    : 'This email shows multiple signs of being a phishing attempt. Proceed with caution.'}
                </p>
                
                ${indicators.length > 0 ? `
                <div style="margin-top: 1rem;">
                    <strong>Detected Indicators:</strong>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                        ${indicators.map(indicator => `<li>${indicator}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;
        
        // Reset button
        scanButton.disabled = false;
        scanButton.textContent = 'Analyze Email';
    }, 2000);
}

function analyzeEmailContent(content) {
    const indicators = [];
    const contentLower = content.toLowerCase();
    
    // Check for urgent language
    if (contentLower.includes('urgent') || 
        contentLower.includes('immediate action') || 
        contentLower.includes('act now') ||
        contentLower.includes('expires') ||
        contentLower.includes('immediately')) {
        indicators.push('Contains urgent language or time pressure tactics');
    }
    
    // Check for suspicious links
    if (content.includes('click here') || 
        contentLower.includes('verify your account') || 
        contentLower.includes('login to your account')) {
        indicators.push('Contains suspicious call-to-action links');
    }
    
    // Check for requests for personal information
    if (contentLower.includes('password') || 
        contentLower.includes('credit card') || 
        contentLower.includes('ssn') || 
        contentLower.includes('social security') ||
        contentLower.includes('bank account')) {
        indicators.push('Requests sensitive personal information');
    }
    
    // Check for poor grammar or spelling
    const grammarErrors = checkGrammarAndSpelling(content);
    if (grammarErrors) {
        indicators.push('Contains grammar or spelling errors');
    }
    
    // Check for generic greeting
    if (contentLower.includes('dear customer') || 
        contentLower.includes('dear user') || 
        contentLower.includes('valued customer')) {
        indicators.push('Uses generic greeting instead of your name');
    }
    
    // Check for threatening language
    if (contentLower.includes('suspended') || 
        contentLower.includes('terminated') || 
        contentLower.includes('blocked') ||
        contentLower.includes('unauthorized') ||
        contentLower.includes('security breach')) {
        indicators.push('Contains threatening language or consequences');
    }
    
    // Check for suspicious sender domains
    if (content.includes('@gmail') && 
        (contentLower.includes('bank') || 
         contentLower.includes('paypal') || 
         contentLower.includes('amazon'))) {
        indicators.push('Sender email domain doesn\'t match the claimed organization');
    }
    
    return indicators;
}

function checkGrammarAndSpelling(text) {
    // This is a simplified check - in a real app, you'd use a more sophisticated algorithm
    const commonErrors = [
        'recieve', 'seperate', 'definately', 'occured', 'untill', 'recieved',
        'beleive', 'wierd', 'freind', 'acheive', 'buisness', 'gaurd', 'garantee'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
    
    for (const error of commonErrors) {
        if (words.includes(error)) {
            return true;
        }
    }
    
    // Check for multiple exclamation marks
    if (text.includes('!!!')) {
        return true;
    }
    
    return false;
}

// Report Form
function setupReportForm() {
    const reportForm = document.getElementById('report-form');
    const reportButton = document.getElementById('report-button');
    const reportFormCard = document.getElementById('report-form-card');
    const reportSuccess = document.getElementById('report-success');
    const reportAnotherBtn = document.getElementById('report-another-btn');
    
    if (!reportForm || !reportSuccess) return;
    
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const url = document.getElementById('phishing-url').value;
        const category = document.getElementById('category').value;
        
        if (!url || !category) return;
        
        // Show loading state
        reportButton.disabled = true;
        reportButton.textContent = 'Submitting...';
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            reportFormCard.style.display = 'none';
            reportSuccess.style.display = 'block';
            
            // Reset form
            reportForm.reset();
            reportButton.disabled = false;
            reportButton.textContent = 'Submit Report';
        }, 1500);
    });
    
    if (reportAnotherBtn) {
        reportAnotherBtn.addEventListener('click', function() {
            reportSuccess.style.display = 'none';
            reportFormCard.style.display = 'block';
        });
    }
}

// Auth Forms
function setupAuthForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            loginButton.disabled = true;
            loginButton.textContent = 'Logging in...';
            
            // Simulate authentication
            setTimeout(() => {
                // Close modal and redirect to home
                document.getElementById('login-modal').classList.remove('active');
                document.body.style.overflow = 'auto';
                showSection('home');
                
                // Reset form and button
                loginForm.reset();
                loginButton.disabled = false;
                loginButton.textContent = 'Login';
            }, 1500);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            signupButton.disabled = true;
            signupButton.textContent = 'Creating Account...';
            
            // Simulate account creation
            setTimeout(() => {
                // Close modal and redirect to home
                document.getElementById('signup-modal').classList.remove('active');
                document.body.style.overflow = 'auto';
                showSection('home');
                
                // Reset form and button
                signupForm.reset();
                signupButton.disabled = false;
                signupButton.textContent = 'Create Account';
            }, 1500);
        });
    }
}