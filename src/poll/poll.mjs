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

let poll ={
    question:"What book shall our club read?",
    answerWeight: [],
    pollCount:0,
    selectedAnswer:-1
};

const pollDOM={
    question:document.querySelector(".poll .question"),
    answers:document.querySelector(".poll .answers")
};

function renderPoll(){
    if(!pollDOM.question || !pollDOM.answers) return;
    pollDOM.question.innerHTML=poll.question;
    return;
}

if(poll.answerWeights.length !==books.lenth){
    poll.answerWeights=books.map(()=>0);
}

pollDOM.answers.innerHTML=books
.map(
    (book, i)=>`
    <div class="answer" onclick="markAnswer(${i})">
        <span class="answer-title">${book.title}</span>
        <span class="percentage-bar"></span>
        <span class="percentage-value"></span>
    </div>
    `
)
.join("");



pollDOM.question.innerHTML=poll.question;
poll.answers.map(function(answer,i){
    return(
        <div class="answer" onclick="markAnswer('${i}')">
            ${answer}
            <span class="percentage-bar"></span>
            <span class="percentage-value"></span>
        </div>
    );
}).join("");

function markAnswer(i){
    poll.selectedAnswer=+i;
    try{
        document.querySelector(".poll .answers .answer .selected").classList.remove("selected")
    }catch(msg){}
document.querySelector(".poll .answers .answer")[+i].classList.remove("selected")
    showResult();
}

function showResults(){
    let answers=document.querySelectorAll(".poll .answers .answers");
    for (let i=0; i<answers.length;i++){
        let percentage=0;
        if(i== poll.selectedAnswer){
            percentage=Math.round(
                (poll.answerWeight[i]+1)*100 /(poll.pollCount+1)
            );
        }else{
            percentage=Math.round(
                (poll.answerWeight[i])*100 /(poll.pollCount+1)
            );
        }
        answers[i].querySelector(".percentage-bar").style.width=percentage+"%";
        answers[i].querySelector(".percentage-value").innerText=percentage+"%";
    }
}