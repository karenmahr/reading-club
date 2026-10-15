const booksContainer = document.querySelector("#books-container");

const bigBookKey ="38c1f392d09649e488095cad33038788"
const bookIds= ["16384516","24506526","27088072","17174416"]

async function apiFetchBook(id){
  const url= `https://api.bigbookapi.com/${id}?api-key=${bigBookKey}`;
  try{
    const response=await fetch(url);
    if(response.ok){
      const data=await response.json();
      displayResults(data);
    }else{
      throw Error(await response.text());
    }
  } catch (error){
    console.error(`Error with book ${id}:`, error);
  }
}

function displayResults(data) {
  booksContainer.innerHTML += `
    <article class="book-card">
    <div class="card-inner">

      <div class="card-front"> 
        <img src="${data.image}" alt="${data.title}">
        <p><strong>${data.title}</strong></p>
      </div>
      
        <div class="card-back">
          <p><strong>Author: </strong>${data.authors?.[0]?.name}</p>
          <p><strong>Genre: </strong>${data.genres?.[0]}</p>
          <p><strong>Description: </strong>${data.description}</p>
          <p><strong>Rating: </strong>${data.rating?.average?.toFixed(2)}</p>
          <p><strong>Similar book: </strong>${data.similar_books?.[0]?.title}</p>
          <p><strong>Publish year: </strong>${data["earliest-publish-year"]}</p>
          <p><strong>Number of pages: </strong>${data.number_of_pages}</p>
        </div>
    </div>
    </article>
  `;
}

function loadAllBooks() {
  booksContainer.innerHTML = ""; 
  for (const id of bookIds) {
    apiFetchBook(id);
  }
}

loadAllBooks();