const button = document.querySelector('.comments-button');
const comments = document.querySelector('.comments');
const img = document.querySelector('.comments-arrow');

const comment1 = document.querySelector('.comment-1');
const comment2 = document.querySelector('.comment-2');
const comment3 = document.querySelector('.comment-3');

comment1.style.transition = 'opacity 0.3s ease-in-out';
comment2.style.transition = 'opacity 0.5s ease-in-out';
comment3.style.transition = 'opacity 0.7s ease-in-out';

button.addEventListener('click', () => {
    comments.style.display = comments.style.display === 'block' ? 'none' : 'block';
    comments.style.opacity = comments.style.opacity === '1' ? '0' : '1';

    img.style.transform = img.style.transform === 'rotate(90deg)' ? 'rotate(0deg)' : 'rotate(90deg)';
});