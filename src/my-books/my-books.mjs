import { loadHeaderFooter, clickNav, setCurrentYear } from '../js/utils.mjs';

async function init() {
  await loadHeaderFooter();
  clickNav();
  setCurrentYear();
}

init();

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const readBooksContainer = document.querySelector("#read-books-container");

let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

function renderReadBooks() {
  readBooksContainer.innerHTML = readBooks
    .map(
      (book) => `
      <article class="book-card">
        <img src="${book.image}" alt="${book.title}">
        <p>${book.title}</p>
      </article>
    `
    )
    .join("");
}

function showResult(book) {
  const imageUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
    : "https://via.placeholder.com/150x200?text=No+Cover";

  searchResults.innerHTML = `
    <article class="book-card">
      <img src="${imageUrl}" alt="${book.title}">
      <p>${book.title}</p>

      <button id="add">Add</button>
      <button id="remove">Remove</button>

    </article>
  `;

  document.querySelector("#add").addEventListener("click", () => {
    readBooks.push({ title: book.title, image: imageUrl });
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
    renderReadBooks();
    searchResults.innerHTML = "";
    searchInput.value = "";
  });

    document.querySelector("#remove").addEventListener("click", () => {
    readBooks = readBooks.filter((b) => b.title !== book.title);
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
    renderReadBooks();
    searchResults.innerHTML = "";
    searchInput.value = "";
  });
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchInput.value)}&limit=1`;  
  const response = await fetch(url);
  const data = await response.json();

  showResult(data.docs[0]);
});

renderReadBooks();