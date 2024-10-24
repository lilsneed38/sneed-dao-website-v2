// Mobile Navigation Toggle Function
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');

    navbar.classList.toggle('show');
    menuToggle.classList.toggle('active');
}

// Smooth Scrolling for Dropdown Menu Links
document.querySelectorAll('.dropdown-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            // Close the menu after clicking
            const navbar = document.getElementById('navbar');
            navbar.classList.remove('show');
            document.querySelector('.menu-toggle').classList.remove('active');
        }
    });
});

// Close the menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInside = document.querySelector('header').contains(event.target);
    if (!isClickInside) {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    }
});

// Fetch data for the ticker
function fetchTickerData() {
    fetch('https://suemn-5aaaa-aaaap-qb62q-cai.icp0.io/sneed-lock')
        .then(response => response.json())
        .then(data => {
            // Assuming the data contains 'icpTreasury', 'tvlSneedLock', and 'projectsSneedLocked' fields
            document.getElementById('icpTreasury').textContent = data.icpTreasury || 'N/A';
            document.getElementById('tvlSneedLock').textContent = data.tvlSneedLock || 'N/A';
            document.getElementById('projectsSneedLocked').textContent = data.projectsSneedLocked || 'N/A';
        })
        .catch(error => {
            console.error('Error fetching ticker data:', error);
            document.getElementById('ticker').innerHTML = 'Unable to load data at this time.';
        });
}

// Call the function to fetch data when the page loads
window.onload = function() {
    fetchTickerData();
    startAnimation();
};
