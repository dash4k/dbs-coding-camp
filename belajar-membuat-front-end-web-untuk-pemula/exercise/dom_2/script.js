const dicoding = document.getElementById('dicodingLink');
dicoding.innerHTML = '<i>Belajar Programming di Dicoding</i>';

const google = document.getElementById('googleLink');
google.innerText = 'Mencari sesuatu di Google';

const buttons = document.getElementsByClassName('button');
for (const button of buttons) {
    button.children[0].style.borderRadius = '6px';
}