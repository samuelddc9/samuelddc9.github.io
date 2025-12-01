// Dynamically detect all carousels and create slide indexes
let slideContainers = document.querySelectorAll('.slides');
let slideIndexes = Array(slideContainers.length).fill(0); // Initialize array with zeros for all carousels

// Create a map of carousel elements to their indices for easy lookup
let carouselMap = new Map();
slideContainers.forEach((container, index) => {
  carouselMap.set(container, index);
});

function getCarouselIndex(carouselElement) {
  // Find the carousel index by looking up the slides container
  let slidesContainer = carouselElement.closest('.carousel')?.querySelector('.slides');
  if (slidesContainer && carouselMap.has(slidesContainer)) {
    return carouselMap.get(slidesContainer);
  }
  // Fallback: find by carousel ID
  let carouselId = carouselElement.closest('.carousel')?.id;
  if (carouselId) {
    let match = carouselId.match(/carousel(\d+)/);
    if (match) {
      return parseInt(match[1]) - 1; // Convert carousel1 -> 0, carousel2 -> 1, etc.
    }
  }
  // Last resort: find index in NodeList
  return Array.from(slideContainers).indexOf(slidesContainer);
}

function plusSlides(n, carouselIndexOrElement) {
  let carouselIndex;
  if (typeof carouselIndexOrElement === 'number') {
    carouselIndex = carouselIndexOrElement;
  } else {
    // If it's an element (button), find its carousel index
    let carousel = carouselIndexOrElement.closest('.carousel');
    if (!carousel) {
      console.error('Could not find carousel element');
      return;
    }
    let slidesContainer = carousel.querySelector('.slides');
    if (!slidesContainer) {
      console.error('Could not find slides container');
      return;
    }
    
    // Try to find in map first
    carouselIndex = carouselMap.get(slidesContainer);
    
    // If not in map, find by position in NodeList
    if (carouselIndex === undefined) {
      slideContainers = document.querySelectorAll('.slides');
      carouselIndex = Array.from(slideContainers).indexOf(slidesContainer);
      if (carouselIndex >= 0) {
        carouselMap.set(slidesContainer, carouselIndex);
      }
    }
    
    // Last fallback: try to find by ID
    if (carouselIndex === undefined || carouselIndex < 0) {
      let carouselId = carousel.id;
      if (carouselId) {
        let match = carouselId.match(/carousel(\d+)/);
        if (match) {
          let idNum = parseInt(match[1]);
          // Find the actual index by counting carousels before this one
          slideContainers = document.querySelectorAll('.slides');
          let allCarousels = document.querySelectorAll('.carousel');
          let targetCarousel = Array.from(allCarousels).find(c => c.id === carouselId);
          if (targetCarousel) {
            let targetSlides = targetCarousel.querySelector('.slides');
            carouselIndex = Array.from(slideContainers).indexOf(targetSlides);
            if (carouselIndex >= 0) {
              carouselMap.set(targetSlides, carouselIndex);
            }
          }
        }
      }
    }
  }
  
  if (carouselIndex === undefined || carouselIndex < 0 || carouselIndex >= slideIndexes.length) {
    console.error('Invalid carousel index:', carouselIndex, 'Total carousels:', slideIndexes.length);
    return;
  }
  
  showSlides(slideIndexes[carouselIndex] += n, carouselIndex);
}

function currentSlide(n, carouselIndexOrElement) {
  let carouselIndex;
  if (typeof carouselIndexOrElement === 'number') {
    carouselIndex = carouselIndexOrElement;
  } else {
    // If it's an element (dot), find its carousel index
    let carousel = carouselIndexOrElement.closest('.carousel');
    if (!carousel) {
      console.error('Could not find carousel element');
      return;
    }
    let slidesContainer = carousel.querySelector('.slides');
    if (!slidesContainer) {
      console.error('Could not find slides container');
      return;
    }
    
    // Try to find in map first
    carouselIndex = carouselMap.get(slidesContainer);
    
    // If not in map, find by position in NodeList
    if (carouselIndex === undefined) {
      slideContainers = document.querySelectorAll('.slides');
      carouselIndex = Array.from(slideContainers).indexOf(slidesContainer);
      if (carouselIndex >= 0) {
        carouselMap.set(slidesContainer, carouselIndex);
      }
    }
    
    // Last fallback: try to find by ID
    if (carouselIndex === undefined || carouselIndex < 0) {
      let carouselId = carousel.id;
      if (carouselId) {
        let match = carouselId.match(/carousel(\d+)/);
        if (match) {
          let allCarousels = document.querySelectorAll('.carousel');
          let targetCarousel = Array.from(allCarousels).find(c => c.id === carouselId);
          if (targetCarousel) {
            let targetSlides = targetCarousel.querySelector('.slides');
            slideContainers = document.querySelectorAll('.slides');
            carouselIndex = Array.from(slideContainers).indexOf(targetSlides);
            if (carouselIndex >= 0) {
              carouselMap.set(targetSlides, carouselIndex);
            }
          }
        }
      }
    }
  }
  
  if (carouselIndex === undefined || carouselIndex < 0 || carouselIndex >= slideIndexes.length) {
    console.error('Invalid carousel index:', carouselIndex, 'Total carousels:', slideIndexes.length);
    return;
  }
  
  showSlides(slideIndexes[carouselIndex] = n - 1, carouselIndex);
}

function showSlides(n, carouselIndex) {
  if (carouselIndex < 0 || carouselIndex >= slideContainers.length) {
    console.error('Invalid carousel index:', carouselIndex);
    return;
  }
  
  let slides = slideContainers[carouselIndex].querySelectorAll('img');
  let carousel = slideContainers[carouselIndex].closest('.carousel');
  let dots = carousel?.querySelectorAll('.dot');

  if (n >= slides.length) { slideIndexes[carouselIndex] = 0; }
  if (n < 0) { slideIndexes[carouselIndex] = slides.length - 1; }

  slides.forEach((slide, i) => {
    slide.style.display = (i === slideIndexes[carouselIndex]) ? 'block' : 'none';
  });

  if (dots) {
    dots.forEach(dot => dot.classList.remove("active-dot"));
    if (dots.length > slideIndexes[carouselIndex]) {
      dots[slideIndexes[carouselIndex]].classList.add("active-dot");
    }
  }
}

// Initialize all carousels dynamically
document.addEventListener('DOMContentLoaded', function() {
  slideContainers = document.querySelectorAll('.slides');
  slideIndexes = Array(slideContainers.length).fill(0);
  
  // Rebuild the map
  carouselMap.clear();
  slideContainers.forEach((container, index) => {
    carouselMap.set(container, index);
  });
  
  // Initialize the first slide for all carousels
  for (let i = 0; i < slideContainers.length; i++) {
    showSlides(0, i);
  }
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  // DOM is still loading, wait for DOMContentLoaded
} else {
  // DOM is already loaded
  slideContainers = document.querySelectorAll('.slides');
  slideIndexes = Array(slideContainers.length).fill(0);
  carouselMap.clear();
  slideContainers.forEach((container, index) => {
    carouselMap.set(container, index);
  });
  for (let i = 0; i < slideContainers.length; i++) {
    showSlides(0, i);
  }
}

// Filter functionality
function filterItems(section, filter) {
  const sectionElement = document.getElementById(section);
  const items = sectionElement.querySelectorAll('.game-item');
  const filterButtons = sectionElement.querySelectorAll('.filter-btn');
  
  // Update active button
  filterButtons.forEach(btn => {
    if (btn.getAttribute('data-filter') === filter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Filter items
  items.forEach(item => {
    if (filter === 'all') {
      item.style.display = 'block';
    } else {
      const tags = item.getAttribute('data-tags');
      if (tags && tags.includes(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    }
  });
}






document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submit action

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  fetch(this.action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        alert('Thank you for your message. We will get back to you soon!');
        this.reset(); // Optionally reset the form after successful submission
      } else {
        alert('Sorry, Error when sending message.');
      }
    })
    .catch(error => {
      console.error('Error sending message:', error);
      alert('There was a problem sending your message. Please try again.');
    });
});

