/**
 * NEXUS // OS - Interactive Controller
 * Dynamic features, realtime simulations, and micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTiltEffect();
  initMouseSpotlights();
  initAboutPillars();
  initInteractiveSwarm();
  initLatencyMeter();
  initCipherStream();
  initGlobalClocks();
  initContactForm();
  initNewsletter();
  initScrollAnimations();
  initDemoModal();
});

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `;

  if (type === 'success') {
    icon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  }

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navLinksList = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Sticky header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('mobile-active');
      const isExpanded = navLinksList.classList.contains('mobile-active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close on link click
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('mobile-active');
      });
    });
  }

  // Active section spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(`.nav-link[href*="${sectionId}"]`).forEach(el => {
          links.forEach(l => l.classList.remove('active'));
          el.classList.add('active');
        });
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3D Tilt Effect on Hero Showcase Card
   ========================================================================== */
function initTiltEffect() {
  const card = document.getElementById('hero-showcase-card');
  const wrapper = document.querySelector('.hero-showcase-wrapper');

  if (!card || !wrapper) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -7; // max 7 deg
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    card.style.transition = 'transform 0.5s ease';
  });

  wrapper.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
}

/* ==========================================================================
   Mouse Radial Spotlight Effect on Bento Cards
   ========================================================================== */
function initMouseSpotlights() {
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   Interactive Agent Swarm Simulation
   ========================================================================== */
function initInteractiveSwarm() {
  const buttons = document.querySelectorAll('.swarm-task-btn');
  const terminal = document.getElementById('swarm-terminal');
  if (!terminal) return;

  const workflows = {
    code: [
      "[SYSTEM] Allocating Agent Cluster: 12 workers ready",
      "[SYNAPSE] Parsing AST and inferring dependency graph...",
      "[WORKER-04] Generating optimized Rust zero-copy parser...",
      "✔ Build successful: compiled in 118ms (0 warnings)"
    ],
    audit: [
      "[SECURITY] Initiating automated bytecode verification...",
      "[AGENT-09] Scanning memory bounds & concurrency primitives...",
      "[AGENT-02] Formal verification proof validated against ISO-27001",
      "✔ Audit report generated: 0 vulnerabilities found"
    ],
    vector: [
      "[INDEXER] Sharding 50M embeddings across HNSW graph...",
      "[STORAGE] Replicating shards to Tokyo & Frankfurt enclaves...",
      "[CACHE] Pre-warming GPU caches for sub-10ms retrieval...",
      "✔ Vector index deployed & synced globally"
    ]
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const action = btn.getAttribute('data-task');
      runSwarmTerminal(workflows[action] || workflows.code);
    });
  });

  function runSwarmTerminal(lines) {
    terminal.innerHTML = '';
    lines.forEach((line, index) => {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'terminal-line';
        if (line.startsWith('✔')) {
          p.style.color = '#10b981';
          p.style.fontWeight = 'bold';
        } else if (line.startsWith('[SECURITY]')) {
          p.style.color = '#ec4899';
        } else if (line.startsWith('[INDEXER]')) {
          p.style.color = '#f59e0b';
        }
        p.textContent = line;
        terminal.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;
      }, index * 260);
    });
  }
}

/* ==========================================================================
   Interactive Latency Meter
   ========================================================================== */
function initLatencyMeter() {
  const pingBtn = document.getElementById('ping-edge-btn');
  const latencyDisplay = document.getElementById('latency-val');
  const bars = document.querySelectorAll('.lat-bar');

  if (!pingBtn || !latencyDisplay) return;

  pingBtn.addEventListener('click', () => {
    pingBtn.disabled = true;
    latencyDisplay.textContent = '...';
    
    // Simulate ping sweep
    bars.forEach(bar => {
      bar.style.height = `${Math.floor(Math.random() * 20 + 10)}%`;
    });

    setTimeout(() => {
      const simulatedLatency = Math.floor(Math.random() * 6 + 9); // 9ms - 14ms
      latencyDisplay.textContent = simulatedLatency;
      
      bars.forEach((bar, i) => {
        const heights = [simulatedLatency * 4, (simulatedLatency + 2) * 4, (simulatedLatency - 1) * 4, simulatedLatency * 4];
        bar.style.height = `${Math.min(heights[i] || 60, 95)}%`;
        bar.classList.add('active');
      });

      showToast(`Global Edge ping confirmed: ${simulatedLatency}ms round-trip`, 'success');
      pingBtn.disabled = false;
    }, 450);
  });
}

/* ==========================================================================
   Realtime Quantum Cipher Scrambler
   ========================================================================== */
function initCipherStream() {
  const cipherElement = document.getElementById('cipher-stream-text');
  const cipherBtn = document.getElementById('toggle-cipher-btn');
  if (!cipherElement || !cipherBtn) return;

  const sampleHex = () => {
    let result = '';
    const chars = '0123456789ABCDEF0123456789abcdef-:#$@!';
    for (let i = 0; i < 48; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  let interval = setInterval(() => {
    cipherElement.textContent = `0x${sampleHex()}`;
  }, 120);

  let isScrambling = true;

  cipherBtn.addEventListener('click', () => {
    if (isScrambling) {
      clearInterval(interval);
      cipherElement.textContent = "0x9F4B::ENCLAVE_VERIFIED::KEY_OK_AES256GCM";
      cipherElement.style.color = "#10b981";
      cipherBtn.textContent = "Re-randomize Stream";
      showToast("Hardware Enclave key pair locked and certified.", "success");
      isScrambling = false;
    } else {
      cipherElement.style.color = "var(--secondary)";
      interval = setInterval(() => {
        cipherElement.textContent = `0x${sampleHex()}`;
      }, 120);
      cipherBtn.textContent = "Lock Hardware Enclave";
      isScrambling = true;
    }
  });
}

/* ==========================================================================
   Realtime Global Clocks for Connect Section Hubs
   ========================================================================== */
function initGlobalClocks() {
  const sfTime = document.getElementById('clock-sf');
  const londonTime = document.getElementById('clock-london');
  const tokyoTime = document.getElementById('clock-tokyo');

  function updateClocks() {
    const now = new Date();

    if (sfTime) {
      sfTime.textContent = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' PST';
    }

    if (londonTime) {
      londonTime.textContent = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' GMT';
    }

    if (tokyoTime) {
      tokyoTime.textContent = now.toLocaleTimeString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' JST';
    }
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* ==========================================================================
   Contact / Connect Form Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('transmission-form');
  const successBanner = document.getElementById('form-success-banner');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields before transmission.', 'info');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please provide a valid email address.', 'info');
      return;
    }

    // Simulate sending state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spinSlow 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      Synthesizing Packet...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      const transmissionId = 'NX-' + Math.floor(1000 + Math.random() * 9000);
      if (successBanner) {
        successBanner.classList.add('active');
        const codeElement = successBanner.querySelector('.transmission-code');
        if (codeElement) {
          codeElement.textContent = `#${transmissionId}`;
        }
      }

      showToast(`Transmission #${transmissionId} acknowledged by Nexus Core.`, 'success');
      form.reset();
    }, 1200);
  });
}

/* ==========================================================================
   Newsletter Subscription
   ========================================================================== */
function initNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (!emailInput || !emailInput.value) return;

    showToast(`Subscribed ${emailInput.value} to Intelligence Dispatch!`, 'success');
    emailInput.value = '';
  });
}

/* ==========================================================================
   Scroll Animated Counters
   ========================================================================== */
function initScrollAnimations() {
  const statValues = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsBanner = document.querySelector('.hero-stats-banner');
  if (statsBanner) {
    observer.observe(statsBanner);
  }

  function animateCounters() {
    statValues.forEach(item => {
      const target = parseInt(item.getAttribute('data-target'), 10);
      const prefix = item.getAttribute('data-prefix') || '';
      const suffix = item.getAttribute('data-suffix') || '';
      const duration = 1600;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          item.textContent = prefix + target + suffix;
          clearInterval(timer);
        } else {
          item.textContent = prefix + Math.floor(current) + suffix;
        }
      }, stepTime);
    });
  }
}

/* ==========================================================================
   Demo Preview Modal
   ========================================================================== */
function initDemoModal() {
  const modal = document.getElementById('demo-modal');
  const openBtns = document.querySelectorAll('.open-demo-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   Interactive About Pillars
   ========================================================================== */
function initAboutPillars() {
  const pillars = document.querySelectorAll('.pillar-item');
  const statValues = document.querySelectorAll('.core-stat-val');

  const telemetryData = {
    'pillar-edge': ['1.4 PFLOPS', '99.999%', '2.8B'],
    'pillar-memory': ['50M Embeds', '100% Recall', '0 Drift'],
    'pillar-security': ['AES-256 GCM', 'ML-KEM 1024', 'Zero-Leak']
  };

  pillars.forEach(pillar => {
    pillar.addEventListener('click', () => {
      pillars.forEach(p => p.classList.remove('active'));
      pillar.classList.add('active');

      const id = pillar.id;
      const data = telemetryData[id] || telemetryData['pillar-edge'];

      if (statValues.length >= 3) {
        statValues[0].textContent = data[0];
        statValues[1].textContent = data[1];
        statValues[2].textContent = data[2];
      }

      const title = pillar.querySelector('h4') ? pillar.querySelector('h4').textContent : 'Architecture Layer';
      showToast(`Inspecting: ${title}`, 'info');
    });
  });
}

