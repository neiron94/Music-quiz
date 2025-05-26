export function setUpNavigation() {
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

const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main > section');

function showSection(id) {
    sections.forEach(section => {
        section.hidden = section.id !== id;
    });
}
