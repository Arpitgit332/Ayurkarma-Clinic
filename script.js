const services = [
  ['stethoscope', 'General Consultation', 'Personalised Ayurvedic guidance for your concern.'],
  ['waves', 'Panchakarma', 'Traditional cleansing and rejuvenation therapies.'],
  ['hand', 'Abhyanga', 'Restorative therapeutic oil massage.'],
  ['brain', 'Shirodhara', 'Calming therapy for stress and balance.'],
  ['droplets', 'Basti', 'Ayurvedic therapy for Vata balance.'],
  ['wind', 'Vamana', 'Classical purification therapy.'],
  ['sprout', 'Virechana', 'Gentle therapeutic cleansing.'],
  ['wind', 'Nasya', 'Nasal therapy for head and neck wellness.'],
  ['heart-pulse', 'Raktamokshana', 'Traditional blood purification care.'],
  ['pill', 'Herbal Medicine', 'Natural formulations selected for you.'],
  ['salad', 'Diet Consultation', 'Practical food guidance for your constitution.'],
  ['refresh-cw', 'Lifestyle Correction', 'Sustainable habits for better health.'],
  ['person-standing', 'Yoga Therapy', 'Movement and breath for holistic healing.'],
  ['sparkles', 'Stress Management', 'Natural support for a calmer mind.'],
  ['bone', 'Joint Pain', 'Support for mobility and daily comfort.'],
  ['activity', 'Arthritis', 'Ayurvedic support for joint wellbeing.'],
  ['flower-2', 'Skin Disorders', 'Root-focused skin wellness care.'],
  ['scan-face', 'Hair Problems', 'Natural care for healthier hair.'],
  ['circle-gauge', 'Digestive Disorders', 'Restore comfort and digestive balance.'],
  ['heart', 'Diabetes Management', 'Lifestyle-led supportive care.'],
  ['venus-and-mars', "Women's Health", 'Compassionate care at every stage.'],
  ['baby', 'Child Care', 'Gentle Ayurvedic guidance for little ones.'],
  ['scale', 'Weight Management', 'Balanced, sustainable wellness plans.'],
  ['shield-plus', 'Immunity Boosting', "Support your body's natural resilience."],
  ['cross', 'Chronic Disease Management', 'Long-term support for better living.'],
];

const previewIndexes = [0, 1, 9, 10, 11, 12];
const icon = (name) => `<i data-lucide="${name}"></i>`;

const previewRoot = document.querySelector('#servicePreview');
const servicesRoot = document.querySelector('#allServices');

if (previewRoot) {
  previewRoot.innerHTML = previewIndexes.map((index) => {
    const [name, title, description] = services[index];
    return `<article class="service-card"><div class="icon-box">${icon(name)}</div><h3>${title}</h3><p>${description}</p><a class="text-link" href="contact.html">Learn more ${icon('arrow-right')}</a></article>`;
  }).join('');
}

if (servicesRoot) {
  servicesRoot.innerHTML = services.map(([name, title, description]) => (
    `<article class="treatment">${icon(name)}<h3>${title}</h3><p>${description}</p><a href="contact.html">Learn More ${icon('arrow-right')}</a></article>`
  )).join('');
}

const faqs = [
  ['What is Ayurveda?', 'Ayurveda is a traditional system of wellbeing that helps restore balance in body and mind through personalised lifestyle, diet, herbs, and therapies.'],
  ['What is Panchakarma?', 'Panchakarma is a set of traditional Ayurvedic purification therapies selected only after a careful consultation.'],
  ['How long is treatment?', 'Every journey is unique. Your doctor will recommend a practical timeline based on your concern and constitution.'],
  ['Do I need an appointment?', 'Appointments are recommended so we can offer you unrushed, dedicated consultation time.'],
  ['Is Ayurveda safe?', 'When tailored by a qualified practitioner, Ayurveda is a thoughtful and gentle approach to wellbeing. Please share your complete health history during consultation.'],
];

const faqRoot = document.querySelector('#faqList');
if (faqRoot) {
  faqRoot.innerHTML = faqs.map(([question, answer], index) => `
    <div class="faq-item ${index === 0 ? 'open' : ''}">
      <button class="faq-question" aria-expanded="${index === 0}" aria-controls="faq-answer-${index}">
        ${question} ${icon('plus')}
      </button>
      <div class="faq-answer" id="faq-answer-${index}"><p>${answer}</p></div>
    </div>
  `).join('');
}

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    document.querySelectorAll('.faq-item').forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });
    item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(item.classList.contains('open')));
  });
});

if (window.lucide) window.lucide.createIcons();

const menuButton = document.querySelector('.menu-btn');
const navigationLinks = document.querySelector('.nav-links');
if (menuButton && navigationLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigationLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  navigationLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigationLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const backToTop = document.querySelector('.back-top');
const navigation = document.querySelector('.nav');
const progressBar = document.querySelector('.progress i');
let scrollTicking = false;

function updateScrollUi() {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.width = `${scrollableHeight ? (scrollTop / scrollableHeight) * 100 : 0}%`;
  if (navigation) navigation.classList.toggle('scrolled', scrollTop > 20);
  if (backToTop) backToTop.classList.toggle('show', scrollTop > 500);
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollUi);
    scrollTicking = true;
  }
}, { passive: true });
updateScrollUi();

if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const statsElement = document.querySelector('.stats');
if (statsElement && 'IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-count]').forEach((element) => {
        const target = Number(element.dataset.count);
        let current = 0;
        const tick = () => {
          current = Math.min(target, current + Math.ceil(target / 45));
          element.textContent = current;
          if (current < target) window.requestAnimationFrame(tick);
        };
        tick();
      });
      statsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  statsObserver.observe(statsElement);
}

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const message = `Hello Ayurkarma Clinic, I would like to enquire.\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email') || 'Not provided'}\nSubject: ${data.get('subject')}\nMessage: ${data.get('message')}`;
    window.open(`https://wa.me/918299250126?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
}

window.addEventListener('load', () => document.querySelector('.page-loader')?.classList.add('done'));
