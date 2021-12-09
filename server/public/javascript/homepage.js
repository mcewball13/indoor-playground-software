// Nav Menu

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }

}

showMenu('nav-toggle', 'nav-menu')

const navLink = document.querySelectorAll('.nav-link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click', linkAction))


// ScrollReveal
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

// Register Form
sr.reveal('.register-form', {});
sr.reveal('.form-title', {});
sr.reveal('.form-input', { delay: 400, origin: 'left', distance: '150px' });
sr.reveal('.form-button', { delay: 600, origin: 'right' });
sr.reveal('.form-signin', { delay: 800, origin: 'bottom' });

// Login Form
sr.reveal('.login-form', {});
sr.reveal('.form-signup', { delay: 800, origin: 'bottom' });

// Hero
sr.reveal('.hero-title', {});
sr.reveal('.hero-sub', { delay: 200, origin: 'right' });
sr.reveal('.hero-button', { delay: 400, origin: 'bottom' });

// Exercise-info
sr.reveal('.card', { interval: 200 });