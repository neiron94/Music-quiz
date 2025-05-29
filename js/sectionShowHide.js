const links = document.querySelectorAll('nav a');
const submitButton = document.getElementById('quiz-set-up-submit');
const sections = document.querySelectorAll('main > section');

export function setUpSectionShowHide() {
    setUpNavigation();
    setUpQuizShowHide();
}

function setUpNavigation() {
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);

            // history.pushState(null, '', `#${sectionId}`);
        });
    });

    // window.addEventListener('DOMContentLoaded', () => {
    //     const sectionId = location.hash.replace('#', '') || 'home';
    //     showSection(sectionId);
    // });
    //
    // window.addEventListener('popstate', () => {
    //     const sectionId = location.hash.replace('#', '') || 'home';
    //     showSection(sectionId);
    // });
}

function setUpQuizShowHide() {
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('quiz-section');
    })
}

export function showSection(id) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === id) {
            section.classList.add('active');
        }
    });
}
