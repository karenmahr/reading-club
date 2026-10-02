const navButton = document.querySelector('#nav-button');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

const navBar = document.querySelector('#nav-bar');

const today = new Date();

const currentYearSpan = document.querySelector("#currentyear");
currentYearSpan.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last modified: ${document.lastModified}`;