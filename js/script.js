// Hero Carousel
let currentSlide = 0
let slideInterval

function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide")
  const indicatorsContainer = document.querySelector(".carousel-indicators")

  if (!slides.length) return

  // Create indicators
  if (indicatorsContainer) {
    slides.forEach((_, index) => {
      const indicator = document.createElement("div")
      indicator.classList.add("indicator")
      if (index === 0) indicator.classList.add("active")
      indicator.addEventListener("click", () => goToSlide(index))
      indicatorsContainer.appendChild(indicator)
    })
  }

  startSlideShow()
}

function changeSlide(direction) {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".indicator")

  if (!slides.length) return

  slides[currentSlide].classList.remove("active")
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.remove("active")
  }

  currentSlide = (currentSlide + direction + slides.length) % slides.length

  slides[currentSlide].classList.add("active")
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.add("active")
  }

  resetSlideShow()
}

function goToSlide(index) {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".indicator")

  if (!slides.length) return

  slides[currentSlide].classList.remove("active")
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.remove("active")
  }

  currentSlide = index

  slides[currentSlide].classList.add("active")
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.add("active")
  }

  resetSlideShow()
}

function startSlideShow() {
  slideInterval = setInterval(() => changeSlide(1), 5000)
}

function resetSlideShow() {
  clearInterval(slideInterval)
  startSlideShow()
}

// Testimonials Slider
let currentTestimonial = 0

function changeTestimonial(direction) {
  const testimonials = document.querySelectorAll(".testimonial-card")

  if (!testimonials.length) return

  testimonials[currentTestimonial].classList.remove("active")
  currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length
  testimonials[currentTestimonial].classList.add("active")
}

// Operations Carousel
let currentOpsSlide = 0

function changeOpsSlide(direction) {
  const slides = document.querySelectorAll(".ops-slide")

  if (!slides.length) return

  slides[currentOpsSlide].classList.remove("active")
  currentOpsSlide = (currentOpsSlide + direction + slides.length) % slides.length
  slides[currentOpsSlide].classList.add("active")
}

// Lightbox
let currentLightboxImage = 0
let galleryImages = []

function openLightbox(index) {
  const lightbox = document.getElementById("lightbox")
  const galleryItems = document.querySelectorAll(".gallery-item img")

  galleryImages = Array.from(galleryItems).map((img) => img.src)
  currentLightboxImage = index

  const lightboxImage = document.getElementById("lightbox-image")
  lightboxImage.src = galleryImages[currentLightboxImage]

  lightbox.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox")
  lightbox.classList.remove("active")
  document.body.style.overflow = "auto"
}

function changeLightboxImage(direction) {
  currentLightboxImage = (currentLightboxImage + direction + galleryImages.length) % galleryImages.length
  const lightboxImage = document.getElementById("lightbox-image")
  lightboxImage.src = galleryImages[currentLightboxImage]
}

// Mobile Menu
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle")
  const nav = document.querySelector(".nav")
  const dropdowns = document.querySelectorAll(".dropdown > a")

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth <= 968) {
        e.preventDefault()
        dropdown.parentElement.classList.toggle("active")
      }
    })
  })
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault()
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
}

// Sticky Header
function initStickyHeader() {
  const header = document.querySelector(".header")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }

    lastScroll = currentScroll
  })
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const inputs = form.querySelectorAll("input[required], textarea[required], select[required]")
      let isValid = true

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.style.borderColor = "red"
        } else {
          input.style.borderColor = ""
        }

        if (input.type === "email" && input.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailPattern.test(input.value)) {
            isValid = false
            input.style.borderColor = "red"
          }
        }
      })

      if (isValid) {
        // Form is valid, you can submit it
        console.log("[v0] Form submitted successfully")
        alert("Thank you for your inquiry! We will contact you soon.")
        form.reset()
      } else {
        alert("Please fill in all required fields correctly.")
      }
    })
  })
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(".service-card, .fleet-item, .value-card, .methodology-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Keyboard Navigation for Lightbox
document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox")
  if (lightbox && lightbox.classList.contains("active")) {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") changeLightboxImage(-1)
    if (e.key === "ArrowRight") changeLightboxImage(1)
  }
})

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initHeroCarousel()
  initMobileMenu()
  initSmoothScroll()
  initStickyHeader()
  initFormValidation()
  initScrollAnimations()
})
