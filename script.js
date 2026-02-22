// Navigation scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Set active link based on current page
function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        
        // Handle root path / as index.html
        const isIndex = (currentPath === 'index.html' || currentPath === '') && (linkPath === 'index.html');
        const isMatch = linkPath === currentPath;

        if (isMatch || isIndex) {
            link.classList.add('active');
        } else {
            // Only remove if it's not a hash link (handled by scroll logic)
            if (!link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
            }
        }
    });
}

// Initialize active link on load
window.addEventListener('load', setActiveLink);

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');

const dishes = [
    'Jollof Rice & Chicken',
    'Egusi Soup & Pounded Yam',
    'Pepper Soup & Catfish',
    'Plantain & Beans',
    'Fried Rice & Turkey',
    'Afang Soup & Fufu',
    'Banga Soup & Starch',
    'Efo Riro & Amala',
    'Ogbono Soup & Eba',
    'Edikang Ikong Soup',
    'Nkwobi',
    'Suya',
    'Pounded Yam',
    'Moi Moi',
    'Akara & Pap',
    'Ofada Rice & Stew'
];

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm.length === 0) {
        searchSuggestions.classList.remove('active');
        searchSuggestions.innerHTML = '';
        return;
    }

    const filtered = dishes.filter(dish => 
        dish.toLowerCase().includes(searchTerm)
    );

    if (filtered.length > 0) {
        searchSuggestions.innerHTML = filtered
            .slice(0, 5)
            .map(dish => `
                <div class="suggestion-item" data-dish="${dish}">
                    ${highlightMatch(dish, searchTerm)}
                </div>
            `)
            .join('');
        searchSuggestions.classList.add('active');
        
        // Add click handlers to suggestions
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                searchInput.value = item.dataset.dish;
                searchSuggestions.classList.remove('active');
                showToast(`Searching for: ${item.dataset.dish}`);
            });
        });
    } else {
        searchSuggestions.innerHTML = `
            <div class="suggestion-item" style="color: var(--text-light);">
                No dishes found
            </div>
        `;
        searchSuggestions.classList.add('active');
    }
});

// Highlight matching text in suggestions
function highlightMatch(text, search) {
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<strong style="color: var(--primary);">$1</strong>');
}

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.remove('active');
    }
});

// Handle search submit
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchSuggestions.classList.remove('active');
            showToast(`Searching for: ${searchTerm}`);
        }
    }
});


// category grid toggle
 const btn = document.getElementById("seeMoreBtn");
  const grid = document.getElementById("categoryGrid");

  btn.addEventListener("click", () => {
    grid.classList.toggle("show-all");

    btn.textContent = 
      grid.classList.contains("show-all") 
      ? "See less" 
      : "See more";
  });


//   chefs special toggle
  const specialsBtn = document.getElementById("specialsBtn");
  const specialsGrid = document.getElementById("specialsGrid");

  specialsBtn.addEventListener("click", () => {
    specialsGrid.classList.toggle("show-all");

    specialsBtn.textContent =
      specialsGrid.classList.contains("show-all")
        ? "See less"
        : "See more";
  });


  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });





    // Fix SVG paths (need stroke not fill for + icon)
    document.querySelectorAll('.add-btn svg path').forEach(p => {
      p.setAttribute('stroke', 'white');
      p.setAttribute('stroke-width', '2.5');
      p.setAttribute('stroke-linecap', 'round');
      p.removeAttribute('fill');
    });
    document.querySelectorAll('.add-btn svg').forEach(s => {
      s.setAttribute('fill', 'none');
    });

       // Add to cart interaction
    document.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        this.style.transform = 'scale(1.3)';
        this.style.background = '#16a34a';
        setTimeout(() => {
          this.style.transform = '';
          this.style.background = '';
        }, 400);
      });
    });