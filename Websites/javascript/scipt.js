window.addEventListener('scroll', function() {
    const mainHeader = document.getElementById('main-header');
    const stickyHeader = document.getElementById('sticky-header');

    if (window.scrollY > 106) { // Adjust threshold as needed
        mainHeader.classList.add('hide-main');
        stickyHeader.classList.add('show-sticky');
    } else {
        mainHeader.classList.remove('hide-main');
        stickyHeader.classList.remove('show-sticky');
    }
});

const scrollAmount = 250; // Adjust based on the width of each article

function scrollRight() {
    const container = document.querySelector('.articles-grid');
    container.scrollLeft += scrollAmount;
}

function scrollLeft() {
    const container = document.querySelector('.articles-grid');
    container.scrollLeft -= scrollAmount;
}
