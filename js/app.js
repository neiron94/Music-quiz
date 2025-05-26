const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main > section');

function showSection(id) {
    sections.forEach(section => {
        section.hidden = section.id !== id;
    });
}

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        showSection(sectionId);
    });
});
