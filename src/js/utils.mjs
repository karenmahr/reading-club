export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function renderWithTemplate(template, parentElement) {
  if (!parentElement) {
    throw new Error('Unable to render template: parent element was not found.');
  }
  parentElement.innerHTML = template;
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load template "${path}": ${response.status} ${response.statusText}`);
  }
  return response.text();
}

export async function loadHeaderFooter() {
  const headerElement = qs('#main-header');
  const footerElement = qs('#main-footer');
  if (!headerElement || !footerElement) {
    throw new Error('Header and footer placeholders are required.');
  }

  const [header, footer] = await Promise.all([
    loadTemplate('/partials/header.html'),
    loadTemplate('/partials/footer.html'),
  ]);
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}

export function clickNav(){

const navButton = document.querySelector('#nav-button');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

const navBar = document.querySelector('#nav-bar');

}

export function setCurrentYear() {
const today = new Date();

const currentYearSpan = document.querySelector("#currentyear");
currentYearSpan.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last modified: ${document.lastModified}`;


}
