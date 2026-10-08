import { loadHeaderFooter, clickNav, setCurrentYear } from '../js/utils.mjs';


async function init() {
  await loadHeaderFooter();
  clickNav();
  setCurrentYear();
}

init();

const surveyForm = document.querySelector('#survey-form');

if (surveyForm) {
surveyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.checkValidity()) {
    window.location.href = './success.html';
  } else {
    e.target.reportValidity();
  }
});
}

