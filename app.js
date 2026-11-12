const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  filterButtons.forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  projects.forEach((project) => {
    project.hidden = filter !== 'all' && !project.dataset.category.split(' ').includes(filter);
  });
}));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxLabel = lightbox.querySelector('p');
projects.forEach((project) => project.addEventListener('click', () => {
  const image = project.querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxLabel.textContent = project.dataset.label;
  lightbox.showModal();
}));
lightbox.querySelector('.close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});


const reviewForm = document.querySelector('#review-form');
if (reviewForm) {
  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!reviewForm.reportValidity()) return;
    const fields = new FormData(reviewForm);
    const name = String(fields.get('name') || '').trim();
    const service = String(fields.get('service') || '');
    const rating = String(fields.get('rating') || '');
    const review = String(fields.get('review') || '').trim();
    if (!name || !service || !rating || !review) return;
    const subject = encodeURIComponent('Lagos Flooring customer review - ' + name);
    const body = encodeURIComponent('Lagos Flooring customer review\n\nName: ' + name + '\nService: ' + service + '\nRating: ' + rating + ' out of 5 stars\n\nReview:\n' + review + '\n\nPlease contact me for permission before publishing.');
    document.querySelector('#review-status').textContent = 'Your email app should open now. Press Send there to submit your review. It will not post automatically.';
    window.location.href = 'mailto:lagosderek9@gmail.com?subject=' + subject + '&body=' + body;
  });
}
