const scrollButtons = document.querySelectorAll('[data-scroll-target]');
scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selector = button.getAttribute('data-scroll-target');
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const targetValue = Number(el.dataset.target) || 0;
      const duration = 1200;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const animate = () => {
        frame += 1;
        const progress = Math.min(frame / totalFrames, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = Math.floor(targetValue * eased);
        el.textContent = value.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
      observer.unobserve(el);
    });
  },
  { threshold: 0.3 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const accordion = document.querySelector('[data-accordion]');
if (accordion) {
  accordion.addEventListener('click', (event) => {
    const trigger = event.target.closest('.accordion__trigger');
    if (!trigger) return;

    const item = trigger.parentElement;
    const panel = item.querySelector('.accordion__panel');
    const isOpen = item.classList.contains('is-open');
    accordion
      .querySelectorAll('.accordion__item')
      .forEach((node) => node.classList.remove('is-open'));
    accordion
      .querySelectorAll('.accordion__panel')
      .forEach((node) => node.classList.remove('is-open'));

    if (!isOpen) {
      item.classList.add('is-open');
      panel.classList.add('is-open');
      trigger.querySelector('.accordion__icon').textContent = '–';
    } else {
      trigger.querySelector('.accordion__icon').textContent = '+';
    }

    accordion.querySelectorAll('.accordion__trigger').forEach((node) => {
      if (node !== trigger) {
        const icon = node.querySelector('.accordion__icon');
        if (icon) icon.textContent = '+';
      }
    });
  });
}

const yearEl = document.querySelector('[data-year]');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const modal = document.getElementById('video-modal');
const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
const closeModal = () => {
  modal.close();
  const iframe = modal.querySelector('iframe');
  if (iframe) {
    const src = iframe.src;
    iframe.src = src;
  }
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    modal.showModal();
  });
});

modal.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeModal();
});

const closeButton = modal.querySelector('[data-modal-close]');
closeButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const signupForm = document.querySelector('[data-signup]');
const feedback = document.querySelector('[data-signup-feedback]');
if (signupForm && feedback) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const email = formData.get('email');
    if (typeof email !== 'string') return;

    signupForm.classList.add('is-loading');
    feedback.textContent = 'Submitting...';
    feedback.style.color = '#fff';

    setTimeout(() => {
      signupForm.reset();
      signupForm.classList.remove('is-loading');
      feedback.textContent = 'Thanks! You are now on the early access list.';
      feedback.style.color = '#7de0c4';
    }, 1200);
  });
}
