/* ================================================
   LOÏC KOEHLY-DELGADO — Portfolio JavaScript
   ================================================ */

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
}

// Sticky Navigation Active Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    if (counter.dataset.animated) return;
    
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counter.dataset.animated = 'true';
      
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + suffix;
        }
      };
      
      updateCounter();
    }
  });
}

// Skill Bar Animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    if (bar.dataset.animated) return;
    
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      bar.dataset.animated = 'true';
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;
    }
  });
}

// Reveal on Scroll (for timeline, certs, veille)
function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal');
  
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}

// Mobile Navigation Toggle
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('active');
      });
    });
  }
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Show success message (in production, this would send to a backend)
      const submitBtn = form.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message envoyé !';
      submitBtn.style.background = '#22c55e';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        form.reset();
      }, 3000);
    });
  }
}

// Typing Effect
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.borderRight = '2px solid var(--accent)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      } else {
        setTimeout(() => {
          typingElement.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start after a short delay
    setTimeout(typeWriter, 1000);
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
  initSmoothScroll();
  initTypingEffect();
  
  // Initial animations for elements already in view
  animateCounters();
  animateSkillBars();
  revealOnScroll();
});

// Scroll event listener (throttled)
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollProgress();
      updateActiveNavLink();
      animateCounters();
      animateSkillBars();
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Initialize on page load
window.addEventListener('load', () => {
  updateScrollProgress();
  updateActiveNavLink();
});
