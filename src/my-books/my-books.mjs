import { loadHeaderFooter, clickNav, setCurrentYear } from '../js/utils.mjs';

async function init() {
  await loadHeaderFooter();
  clickNav();
  setCurrentYear();
}

init();