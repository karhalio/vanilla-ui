// Theme Toggle Functionality 
class ThemeManager {
  constructor(options = {}) {
    this.STORAGE_KEY = options.storageKey || 'theme';
    this.themeToggle = document.getElementById(options.toggleId || 'theme-toggle');
    this.theme = this.getInitialTheme(); // 'light' | 'dark'
    this.init();
  }

   getInitialTheme() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) {}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  init() {
    this.setTheme(this.theme);
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
   
    window.addEventListener('storage', (e) => {
      if (e.key === this.STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        this.setTheme(e.newValue);
      }
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme = theme;
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (e) {}
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// Mobile Menu
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobile-toggle');
        this.menu = document.getElementById('nav-menu');
        this.links = this.menu.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.toggle.addEventListener('click', () => this.toggleMenu());
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    
    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.menu.classList.toggle('active');
    }
    
    closeMenu() {
        this.toggle.classList.remove('active');
        this.menu.classList.remove('active');
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        
        this.elements.forEach(el => this.observer.observe(el));
    }
}


// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || href.length === 1) return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }
    
    init() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                this.navbar.style.background = this.navbar.style.background.replace('0.8', '0.95');
            } else {
                this.navbar.style.background = this.navbar.style.background.replace('0.95', '0.8');
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileMenu();
    new ScrollAnimations();
    new SmoothScroll();
    new NavbarScroll();
    
    // Add loading animation for hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroActions = document.querySelector('.hero-actions');
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
    }, 600);
    
    setTimeout(() => {
        heroActions.style.opacity = '1';
        heroActions.style.transform = 'translateY(0)';
    }, 900);
});

// Initial styles for hero animations
document.querySelector('.hero-title').style.cssText = 'opacity: 0; transform: translateY(30px); transition: all 0.6s ease;';
document.querySelector('.hero-subtitle').style.cssText = 'opacity: 0; transform: translateY(30px); transition: all 0.6s ease;';
document.querySelector('.hero-actions').style.cssText = 'opacity: 0; transform: translateY(30px); transition: all 0.6s ease;';

document.addEventListener('DOMContentLoaded', () => {
  const faq = document.querySelector('#faq .faq-accordion');
  if (!faq) return;

  faq.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;

    const item = btn.closest('.faq-item');
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    // Режим «один открыт»
    faq.querySelectorAll('.faq-item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('open', !expanded);
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});
