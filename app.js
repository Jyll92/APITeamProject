// Declaring Variables
const URL = `https://openlibrary.org/search.json?q=`;
const subjectURL = `https://openlibrary.org/subjects/`;
const searchButton = document.querySelector(`#search_bar button`);
const searchInput = document.querySelector(`#search_bar input`);
const contentDiv = document.querySelector(`#search_field`);
const autoFilled = document.querySelectorAll(`.autoFilled`);
let fadeBack = document.querySelectorAll(`.fade`);
const autofillResults = document.querySelector(`#autofillResults`);
const searchResultsDiv = document.querySelector(`#searchResults`);

const subjectResultLimit = 8;

const subjects = {
  r: `romance`,
  f: `fantasy`,
  sf: `science_fiction`,
  h: `horror`,
  hf: `historical_fiction`,
  c: `crime`,
  t: `thriller`,
  m: `mystery`,
  hl: `health`,
};

let searchTerms;
let searchResults;

autoPopulate();

searchInput.addEventListener(`keyup`, (event) => {
  if (event.keyCode === 13) {
    SearchBook();
  }
})

const homeButton = document.querySelector(`a.navbar-brand`);
homeButton.addEventListener(`click`, ()=> {
  home();
});

function home() {
  autofillResults.classList.remove(`hidden`);
  searchResultsDiv.classList.add(`hidden`);
}


// Function that runs via button onclick="SearchBook()"
async function SearchBook() {
  // for (filledDiv of autoFilled) {
  //   filledDiv.innerHTML = ``;
  // }
  autofillResults.classList.add(`hidden`);
  searchResultsDiv.classList.remove(`hidden`);

  contentDiv.innerHTML = `<h1 id="loadingAnim">Loading Results</h1>`;
  const loadAnim = document.querySelector(`#loadingAnim`)
  const loadingResults = setInterval(() => {
    loadAnim.innerText = `Loading Results`;
    setTimeout(() => {
      loadAnim.innerText = `Loading Results .`;
    }, 200);
    setTimeout(() => {
      loadAnim.innerText = `Loading Results ..`;
    }, 400);
    setTimeout(() => {
      loadAnim.innerText = `Loading Results ...`;
    }, 600);
  }, 800);
  // Sets searchTerms to the value of searchInput
  // searchInput was set to our text input field, the user input is the value
  searchTerms = searchInput.value;

  // try {this code} catch(errors){display errors for troubleshooting}

  try {
    // Try searching by combining URL with the user set searchTerms
    searchResults = await axios.get(`${URL}${searchTerms}`);
    // console.log(searchResults.data);
    clearInterval(loadingResults);
    // loadingAnim.remove();

    // if the get() is successful, we should clear out old results in preperation for displaying something new.
    // This clears out any previous content in the space we plan to use
    contentDiv.innerHTML = ``;

    // Add "No Results Found" Feedback
    // Before we convert searchResults, we check if there are 0 results.
    if (searchResults.data.numFound == 0) {
      // Add desired html and message
      contentDiv.innerHTML = `<div class="noResults">
      <h2>Sorry, no results found for your search of: "${searchTerms}"</2h>
      </div>`;
      return;
    }

    // set searchResults to searchResults.data, because thats how axios gets us back our info. This just makes it easier to work with.
    // also added .docs, because when I ran a console.log(searchResults.data), I observed the results are in an array, under the key of "docs"
    searchResults = searchResults.data.docs;
    // console.log(searchResults);

    // Now we have to go through the array and display each result
    // Target each result of the array with a for loop
    // added && i < 20 to also not display more than 20 results at once.
    for (let i = 0; i < searchResults.length && i < 20; i++) {
      // First, I check if it has an associated cover or not, to know if I can display the image
      if (searchResults[i].cover_edition_key != undefined) {
        // inserAdjacentHTML allows us to add html to the page.
        // by using contentDiv.insertAdjacentHTML we can add desired html to the page. In this case we target `beforeend` to insert each new iteration before the ending tag.
        contentDiv.insertAdjacentHTML(
          `beforeend`,
          `<div class="result fade">
            <h3 class="resultTitle">${searchResults[i].title}</h3>
            <h4 class="resultAuthor">Author: ${searchResults[i].author_name}</h4>
            <div class="coverContainer">
              <img class="resultCover" src="https://covers.openlibrary.org/b/olid/${searchResults[i].cover_edition_key}.jpg" alt="Cover of ${searchResults[i].title}">
            </div>
          </div>`
        );
        // The template literal allows us to add the html and text at once
      }
    }
    fadeIn();
  } catch (err) {
    // This is meant to tell us what went wrong, if the code in our try{} doesn't run successfully.
    console.log(`Search Failed: ${err}`);
  }
}

// Lets us fill a div by calling subject we want and the target container
async function getSubject(subject, targetDiv) {
  try {
    subjectResults = await axios.get(
      `${subjectURL}${subject}.json?limit=${subjectResultLimit * 4}`
    );
    // Searches subject with limit of 1.5 * desired show limit, incase of missing covers

    // Make data easier to access
    subjectResults = subjectResults.data.works;

    // Set Target Container
    const target = document.querySelector(`#${targetDiv}`);

    for (let i = 0; i < subjectResultLimit; i++) {
      let work = Math.round(subjectResults.length * Math.random());
      work = subjectResults.splice(work, 1);
      
      while (work.length == 0) {
        // console.log(`it was empty`)
        work = Math.round(subjectResults.length * Math.random());
        work = subjectResults.splice(work, 1);
      }

        while (work[0].cover_edition_key == undefined || work[0].title === `Works (Adventures of Sherlock Holmes / Case-Book of Sherlock Holmes / His Last Bow / Hound of the Baskervilles / Memoirs of Sherlock Holmes / Return of Sherlock Holmes / Sign of Four / Study in Scarlet / Valley of Fear)`) {
        work = Math.round(subjectResults.length * Math.random());
        work = subjectResults.splice(work, 1);
        };

          target.insertAdjacentHTML(
            `beforeend`,
            `<div class="result fade">
                <h3 class="resultTitle">${work[0].title}</h3>
                <h4 class="resultAuthor">Author: ${work[0].authors[0].name}</h4>
                <div class="coverContainer">
                  <img class="resultCover" src="https://covers.openlibrary.org/b/olid/${work[0].cover_edition_key}.jpg" alt="Cover of ${work[0].title}">
                </div>
              </div>`
          );
    }

  } catch (err) {
    console.log(`getsubject failed: ${err}`);
  }
}

async function autoPopulate(){
  
  autofillResults.classList.remove(`hidden`);
  searchResultsDiv.classList.add(`hidden`);
  // Run Function to fill our auto-divs
  await getSubject(subjects.c, `crime`);
    // fadeIn();
  await getSubject(subjects.f, `fantasy`);
  await fadeIn();
  await getSubject(subjects.hl, `health`);
  await getSubject(subjects.hf, `historical_fiction`);
  await getSubject(subjects.h, `horror`);
  await fadeIn();
  await getSubject(subjects.m, `mystery`);
  await getSubject(subjects.r, `romance`);
  await fadeIn();
  await getSubject(subjects.sf, `science_fiction`);
  await getSubject(subjects.t, `thriller`);
  fadeIn();

}

async function fadeIn() {
   fadeBack = document.querySelectorAll(`.fade`);
  for (let i = 0; i < fadeBack.length; i++) {
    wait(i);
  }
}

function wait(i) {
  setTimeout(() => {
    fadeBack[i].classList.remove(`fade`);
  }, 220 * i)
}