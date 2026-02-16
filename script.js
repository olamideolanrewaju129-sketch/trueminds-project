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
