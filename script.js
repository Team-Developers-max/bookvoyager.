// Custom Cursor
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  if (cursor && cursorRing) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
      }, 80);
    });
    document.querySelectorAll('a, button, .genre-card, .book-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px'; cursor.style.height = '20px';
        cursorRing.style.width = '55px'; cursorRing.style.height = '55px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px'; cursor.style.height = '12px';
        cursorRing.style.width = '36px'; cursorRing.style.height = '36px';
      });
    });
  }

  // Generate stars
  const starsContainer = document.getElementById('stars');
  if (starsContainer) {
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2.5 + 0.5;
      star.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${Math.random()*4+2}s;--delay:${Math.random()*5}s;--min-op:${Math.random()*0.2+0.05};--max-op:${Math.random()*0.6+0.3};`;
      starsContainer.appendChild(star);
    }
  }

  // Particles
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `left:${20+Math.random()*60}%;top:${50+Math.random()*40}%;--dur:${Math.random()*3+2}s;--delay:${Math.random()*3}s;--dx:${(Math.random()-0.5)*60}px;`;
      particlesContainer.appendChild(p);
    }
  }

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Parallax stars
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    starsContainer.style.transform = `translate(${x*0.3}px,${y*0.3}px)`;
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Contact form handling
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-feedback');
    if (!form || !feedback) return;

    function showMessage(msg, ok = true) {
      feedback.style.display = 'block';
      feedback.textContent = msg;
      feedback.style.color = ok ? '#2e7d32' : '#c62828';
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const subject = form.querySelector('input[placeholder="What brings you to the void?"]').value.trim();
      const message = form.querySelector('textarea').value.trim();

      const emailRe = /^\S+@\S+\.\S+$/;
      if (name.length < 2) { showMessage('Please enter your name.', false); return; }
      if (!emailRe.test(email)) { showMessage('Please enter a valid email address.', false); return; }
      if (subject.length === 0) { showMessage('Please add a subject.', false); return; }
      if (message.length < 10) { showMessage('Please enter a longer message (10+ chars).', false); return; }

      // Build mailto link for user's email client (optional)
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto = `mailto:signal@galaxy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      showMessage('Message ready. Click the link to send via your email client.');

      // create temporary link for user to click
      let a = document.getElementById('contact-mailto-link');
      if (!a) {
        a = document.createElement('a');
        a.id = 'contact-mailto-link';
        a.textContent = 'Open email client to send';
        a.className = 'btn-primary';
        a.style.marginTop = '0.5rem';
        a.style.display = 'inline-block';
        a.style.textDecoration = 'none';
        feedback.appendChild(document.createElement('br'));
        feedback.appendChild(a);
      }
      a.href = mailto;

      form.reset();
    });
  });