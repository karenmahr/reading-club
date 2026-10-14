import { loadHeaderFooter, clickNav, setCurrentYear } from '../js/utils.mjs';
import { Model } from "survey-core";
import { Survey } from "survey-js-ui";

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

      updateSurvey(books);
  }
   function showResult(book) {
    const imageUrl = book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
      : "https://via.placeholder.com/150x200?text=No+Cover";

    searchResults.innerHTML = `
      <article class="book-card">
        <img src="${imageUrl}" alt="${book.title}">
        <p>${book.title}</p>

        <button class="add">Propose</button>
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

function updateSurvey(booksList) {
  const surveyContainer = document.getElementById("surveyContainer");
  if (!surveyContainer) return;

  if (booksList.length === 0) {
    surveyContainer.innerHTML = "<p>Add books above to generate the poll choices.</p>";
    return;
  }

  surveyContainer.innerHTML = "";

const surveyJson = {
  elements: [
    {
      type: "radiogroup",
      name: "bookPoll",
      title: "What shall our reading club read?",
      choices: booksList.map((b) => b.title),
      isRequired: true
    }
  ]
};

const survey = new Model(surveyJson);

survey.onComplete.add(function (sender) {
  const userVote = sender.data; 
  console.log("Voto registrado:", userVote);
});

survey.render(surveyContainer);
}
