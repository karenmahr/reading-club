import { loadHeaderFooter, clickNav, setCurrentYear } from '../js/utils.mjs';

async function init() {
  await loadHeaderFooter();
  clickNav();
  setCurrentYear();
}

init();

document.querySelectorAll(".read-block").forEach((block) => {
  const searchForm = block.querySelector(".search-form");
  const searchInput = block.querySelector(".search-input");
  const searchResults = block.querySelector(".search-results");
  const readBooksContainer = block.querySelector(".read-books-container");

  const storageKey = block.dataset.key;
  let books = JSON.parse(localStorage.getItem(storageKey)) || [];

  function renderReadBooks() {
    readBooksContainer.innerHTML = books
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

        <button class="add">Add</button>
        <button class="remove">Remove</button>

      </article>
    `;

    searchResults.querySelector(".add").addEventListener("click", () => {
      books.push({ title: book.title, image: imageUrl });
      localStorage.setItem(storageKey, JSON.stringify(books));
      renderReadBooks();
      searchResults.innerHTML = "";
      searchInput.value = "";
    });

      searchResults.querySelector(".remove").addEventListener("click", () => {
      books = books.filter((b) => b.title !== book.title);
      localStorage.setItem(storageKey, JSON.stringify(books));
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
});