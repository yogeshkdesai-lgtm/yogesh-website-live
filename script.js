const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

const quoteNode = document.querySelector("#testimonial-quote");
const authorNode = document.querySelector("#testimonial-author");
const dotsNode = document.querySelector(".testimonial-dots");
const controls = document.querySelectorAll(".carousel-button");
const yearNode = document.querySelector("#year");
const metricsGrid = document.querySelector("#metrics-grid");
const servicesGrid = document.querySelector("#services-grid");
const consultationList = document.querySelector("#consultation-list");
const aboutNotes = document.querySelector("#about-notes");

let testimonials = window.DEFAULT_SITE_CONTENT?.testimonialsSection?.items || [];

let activeTestimonial = 0;

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node && typeof value === "string") {
    node.textContent = value;
  }
}

function setLink(selector, config) {
  const node = document.querySelector(selector);
  if (!node || !config) {
    return;
  }

  if (config.label) {
    node.textContent = config.label;
  }

  if (config.href) {
    node.href = config.href;
  }
}

function setImage(selector, image) {
  const node = document.querySelector(selector);
  if (!node || !image) {
    return;
  }

  if (image.url) {
    node.src = image.url;
  }

  if (image.alt) {
    node.alt = image.alt;
  }
}

function renderMetrics(items) {
  if (!metricsGrid) {
    return;
  }

  metricsGrid.innerHTML = "";

  items.forEach((item) => {
    const article = document.createElement("article");
    article.innerHTML = `
      <p class="metric-value">${item.value || ""}</p>
      <p class="metric-label">${item.label || ""}</p>
    `;
    metricsGrid.appendChild(article);
  });
}

function renderServices(items) {
  if (!servicesGrid) {
    return;
  }

  servicesGrid.innerHTML = "";

  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "service-card";

    if (index === 1) {
      article.id = "training";
    }

    const bullets = (item.bullets || [])
      .map((bullet) => `<li>${bullet}</li>`)
      .join("");

    article.innerHTML = `
      <p class="service-index">${item.index || String(index + 1).padStart(2, "0")}</p>
      <h3>${item.title || ""}</h3>
      <p>${item.description || ""}</p>
      <ul>${bullets}</ul>
    `;

    servicesGrid.appendChild(article);
  });
}

function renderConsultationOptions(items) {
  if (!consultationList) {
    return;
  }

  consultationList.innerHTML = "";

  items.forEach((item) => {
    const block = document.createElement("div");
    block.innerHTML = `
      <strong>${item.title || ""}</strong>
      <span>${item.description || ""}</span>
    `;
    consultationList.appendChild(block);
  });
}

function renderAboutNotes(items) {
  if (!aboutNotes) {
    return;
  }

  aboutNotes.innerHTML = "";

  items.forEach((item) => {
    const article = document.createElement("article");
    article.innerHTML = `
      <h3>${item.title || ""}</h3>
      <p>${item.body || ""}</p>
    `;
    aboutNotes.appendChild(article);
  });
}

function renderHeroHighlights(items) {
  const first = items?.[0] || {};
  const second = items?.[1] || {};

  setText("#hero-highlight-one-title", first.title || "");
  setText("#hero-highlight-one-text", first.text || "");
  setText("#hero-highlight-two-title", second.title || "");
  setText("#hero-highlight-two-text", second.text || "");
}

function renderPage(content) {
  setText("#brand-name", content.brandName);
  setText("#footer-brand", content.brandName);
  setText("#footer-tagline", content.footerTagline);

  setText("#hero-eyebrow", content.hero?.eyebrow);
  setText("#hero-title-prefix", content.hero?.titlePrefix);
  setText("#hero-title-accent", content.hero?.titleAccent);
  setText("#hero-title-suffix", content.hero?.titleSuffix);
  setText("#hero-text", content.hero?.text);
  setLink("#hero-primary-cta", content.hero?.primaryCta);
  setLink("#hero-secondary-cta", content.hero?.secondaryCta);
  setImage("#hero-image", {
    url: content.hero?.imageUrl,
    alt: content.hero?.imageAlt,
  });
  renderHeroHighlights(content.hero?.highlights || []);

  renderMetrics(content.stats || []);

  setText("#services-eyebrow", content.servicesSection?.eyebrow);
  setText("#services-title", content.servicesSection?.title);
  setText("#services-text", content.servicesSection?.text);
  renderServices(content.servicesSection?.services || []);

  setText("#consultation-eyebrow", content.consultation?.eyebrow);
  setText("#consultation-title", content.consultation?.title);
  setText("#consultation-text", content.consultation?.text);
  renderConsultationOptions(content.consultation?.options || []);
  setText("#booking-kicker", content.consultation?.booking?.kicker);
  setText("#booking-title", content.consultation?.booking?.title);
  setText("#booking-text", content.consultation?.booking?.text);
  setText("#booking-link-label", content.consultation?.booking?.label);
  const bookingLink = document.querySelector("#booking-link");
  if (bookingLink && content.consultation?.booking?.href) {
    bookingLink.href = content.consultation.booking.href;
  }

  setText("#testimonials-eyebrow", content.testimonialsSection?.eyebrow);
  setText("#testimonials-title", content.testimonialsSection?.title);
  testimonials = content.testimonialsSection?.items || [];
  activeTestimonial = 0;
  renderTestimonial();

  setText("#about-eyebrow", content.about?.eyebrow);
  setText("#about-title", content.about?.title);
  setText("#about-text", content.about?.text);
  renderAboutNotes(content.about?.notes || []);

  setText("#contact-eyebrow", content.contact?.eyebrow);
  setText("#contact-title", content.contact?.title);
  setText("#contact-text", content.contact?.text);
  setText("#contact-location", content.contact?.location);
  setText("#footer-location", content.contact?.location);

  const email = content.contact?.email || "";
  const emailHref = email ? `mailto:${email}` : "#";
  setText("#contact-email-link", email);
  setText("#footer-email-link", email);

  const contactEmailLink = document.querySelector("#contact-email-link");
  const footerEmailLink = document.querySelector("#footer-email-link");

  if (contactEmailLink) {
    contactEmailLink.href = emailHref;
  }

  if (footerEmailLink) {
    footerEmailLink.href = emailHref;
  }

  setLink("#contact-primary-link", content.contact?.primaryAction);
  setLink("#contact-secondary-link", content.contact?.secondaryAction);
}

function normalizeSanityContent(result) {
  if (!result) {
    return null;
  }

  return {
    brandName: result.brandName,
    footerTagline: result.footerTagline,
    hero: {
      eyebrow: result.hero?.eyebrow,
      titlePrefix: result.hero?.titlePrefix,
      titleAccent: result.hero?.titleAccent,
      titleSuffix: result.hero?.titleSuffix,
      text: result.hero?.text,
      imageUrl: result.hero?.image?.asset?.url,
      imageAlt: result.hero?.imageAlt,
      primaryCta: result.hero?.primaryCta,
      secondaryCta: result.hero?.secondaryCta,
      highlights: result.hero?.highlights || [],
    },
    stats: result.stats || [],
    servicesSection: {
      eyebrow: result.servicesSection?.eyebrow,
      title: result.servicesSection?.title,
      text: result.servicesSection?.text,
      services: result.servicesSection?.services || [],
    },
    consultation: {
      eyebrow: result.consultation?.eyebrow,
      title: result.consultation?.title,
      text: result.consultation?.text,
      options: result.consultation?.options || [],
      booking: result.consultation?.booking || {},
    },
    testimonialsSection: {
      eyebrow: result.testimonialsSection?.eyebrow,
      title: result.testimonialsSection?.title,
      items: result.testimonialsSection?.items || [],
    },
    about: {
      eyebrow: result.about?.eyebrow,
      title: result.about?.title,
      text: result.about?.text,
      notes: result.about?.notes || [],
    },
    contact: {
      eyebrow: result.contact?.eyebrow,
      title: result.contact?.title,
      text: result.contact?.text,
      email: result.contact?.email,
      location: result.contact?.location,
      primaryAction: result.contact?.primaryAction,
      secondaryAction: result.contact?.secondaryAction,
    },
  };
}

async function loadSanityContent() {
  const config = window.SITE_CMS_CONFIG || {};

  if (!config.projectId || !config.dataset) {
    return null;
  }

  const groq = `*[_type == "siteSettings"][0]{
    brandName,
    footerTagline,
    hero{
      eyebrow,
      titlePrefix,
      titleAccent,
      titleSuffix,
      text,
      imageAlt,
      image{
        asset->{
          url
        }
      },
      primaryCta,
      secondaryCta,
      highlights
    },
    stats,
    servicesSection,
    consultation,
    testimonialsSection,
    about,
    contact
  }`;

  const url =
    `https://${config.projectId}.api.sanity.io/v${config.apiVersion}/data/query/` +
    `${config.dataset}?query=${encodeURIComponent(groq)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sanity request failed with ${response.status}`);
  }

  const payload = await response.json();
  return normalizeSanityContent(payload.result);
}

function renderDots() {
  if (!dotsNode) {
    return;
  }

  dotsNode.innerHTML = "";

  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
    dot.setAttribute("aria-current", String(index === activeTestimonial));
    dot.addEventListener("click", () => {
      activeTestimonial = index;
      renderTestimonial();
    });
    dotsNode.appendChild(dot);
  });
}

function renderTestimonial() {
  if (!quoteNode || !authorNode || testimonials.length === 0) {
    return;
  }

  quoteNode.textContent = testimonials[activeTestimonial].quote;
  authorNode.textContent = testimonials[activeTestimonial].author;
  renderDots();
}

controls.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction;
    activeTestimonial =
      direction === "next"
        ? (activeTestimonial + 1) % testimonials.length
        : (activeTestimonial - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  });
});

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

renderPage(window.DEFAULT_SITE_CONTENT);

loadSanityContent()
  .then((content) => {
    if (content) {
      renderPage(content);
    }
  })
  .catch((error) => {
    console.warn("Using local fallback content because Sanity is not configured yet.", error);
  });
