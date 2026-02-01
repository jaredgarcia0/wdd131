
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Menu button
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');


menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});



// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
    const img = e.target.closest('img'); // find nearest img

    if (!img) return; // stop if we didn't click an image

    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');

    const full = src.replace('sm', 'full');

    modalImage.src = full;
    modalImage.alt = alt;

    modal.showModal();
}

// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
          