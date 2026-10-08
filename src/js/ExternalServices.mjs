const booksContainer = document.querySelector("#books-container");

const bigBookKey ="161ce80eba8949129227564746a1e693"
const bookIds= ["16384516","24506526","27088072","28431882"]

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
      <img src="${data.image}" alt="${data.title}">
      <p><strong>${data.title}</strong></p>
      <p>${data.authors?.[0]?.name}</p>
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