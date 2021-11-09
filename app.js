// Declaring Variables
const URL = `http://openlibrary.org/search.json?q=`;
const searchButton = document.querySelector(`button`);
const searchInput = document.querySelector(`input`);
const contentDiv = document.querySelector(`#content`);
let searchTerms;
let searchResults;

// Function that runs via button onclick="SearchBook()"
async function SearchBook() {
  // Sets searchTerms to the value of searchInput
  // searchInput was set to our text input field, the user input is the value
  searchTerms = searchInput.value;

  // try {this code} catch(errors){display errors for troubleshooting}

  try {
    // Try searching by combining URL with the user set searchTerms
    searchResults = await axios.get(`${URL}${searchTerms}`);
    
    console.log(searchResults.data);
    // set searchResults to searchResults.data, because thats how axios gets us back our info. This just makes it easier to work with. 
    // also added .docs, because when I ran a console.log(searchResults.data), I observed the results are in an array, under the key of "docs"
    searchResults = searchResults.data.docs;
    

    // Now we have to go through the array and display each result
    // Target each result of the array with a for loop
    // added && i < 20 to also not display more than 20 results at once.
    for (let i = 0; i < searchResults.length && i < 20; i++) {
      // inserAdjacentHTML allows us to add html to the page.
      // by using contentDiv.insertAdjacentHTML we can add desired html to the page. In this case we target `beforeend` to insert each new iteration before the ending tag.
      contentDiv.insertAdjacentHTML(`beforeend`, `<div id="r${i + 1}">
      <h3 class="resultTitle">${searchResults[i].title}</h3>
      <h4 class="resultAuthor">${searchResults[i].author_name}</h4>
      <img class="resultCover" src="https://covers.openlibrary.org/b/olid/${searchResults[i].cover_edition_key}.jpg" alt="Cover of ${searchResults[i].title}">
      </div>`);
      // The template literal allows us to add the html and text at once 
    }
    
    
    

  } catch(err) {
    // This is meant to tell us what went wrong, if the code in our try{} doesn't run successfully.
    console.log(`Search Failed: ${err}`);
  }
  

}