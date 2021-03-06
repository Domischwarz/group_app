import createContainer, {fetchAPI, get, getAll, resetPages} from './javascript/helpFunctions.js';
import addToStorageList from './javascript/localStorage.js';
import codeBuddiesSection from './javascript/codeBuddies.js';
import teamsSection from './javascript/codeTeams.js';

/////////////////////////////////////////////
// NAVIGATION SINGLE PAGE

const home = get('.js-home');
const codeBuddy = get('.js-buddy');
const team = get('.js-team');
const energy = get('.js-energy');
const journal = get('.js-journal');
const detail = get('.js-detail')

// list of every page
const pagesList = getAll("body > section")

// journal detail
const rateTodayForm = get(".journaldetail")

// head title of each page
const headTitle = get(".head__title")

// button to journal detail page
const detailButton = get('.detail-btn');

// button to save form
const detailSaveButton = get(".journaldetail__savebutton")
const detailCancelButton = get(".journaldetail__cancelbutton")

//stars and rectangles
const starContainer = getAll(".journaldetail__starcontainer > img")
const rectangleContainer = getAll(".journaldetail__rectanglecontainer > img")
//navbuttons
const navigationList = getAll(".nav-bar > a")


// navigation logic
navigationList.forEach((anchor, index) => {
  anchor.addEventListener("click", () => {
    resetPages(pagesList);
    // home page
    if(index === 0){
      home.classList.remove("hidden");
      headTitle.innerText="Dashboard";
    }
    // code buddy page
    else if(index === 1){
      codeBuddy.classList.remove("hidden");
      headTitle.innerText="Code Buddy"
    }
    // team page
    else if(index === 2){
      team.classList.remove("hidden");
      headTitle.innerText="Teams"
    }
    // energy page
    else if(index === 3){
      energy.classList.remove("hidden");
      headTitle.innerText="Energy"
    }
    // journal page
    else if(index === 4){
      journal.classList.remove("hidden");
      headTitle.innerText="Journal"
    }
  })
})


// GO TO JOURNAL DETAIL PAGE

detailButton.addEventListener('click', () => {
  resetPages(pagesList);
  detail.classList.remove('hidden');
})

// RESET THE FORMULAR ON JOURNAL DETAIL

detailSaveButton.addEventListener("click", () => {
  rateTodayForm.reset();
  starContainer.forEach(star => star.src = "img/starGrey.png");
  rectangleContainer.forEach(rectangle => rectangle.src = "img/rectangleGrey.png");
  resetPages(pagesList)
  journal.classList.remove("hidden");
  headTitle.innerText="Journal"
})


// CANCEL THE FORMULAR ON JOURNAL DETAIL

detailCancelButton.addEventListener("click", () => {

  rateTodayForm.reset();
  starContainer.forEach(star => star.src = "img/starGrey.png");
  rectangleContainer.forEach(rectangle => rectangle.src = "img/rectangleGrey.png");
  resetPages(pagesList)
  journal.classList.remove("hidden");
  headTitle.innerText="Journal"
})

// JOURNAL DETAIL RATE STARS LOGIC

starContainer.forEach((img, index) =>{
  img.addEventListener("click", () => {
    starContainer.forEach(star => star.src = "img/starGrey.png");
    for (let i = 0; i <= index; i++){
      starContainer[i].src="img/starBlue.png"; 
    }
  })
})


// JOURNAL DETAIL RATE RECTANGLES LOGIC

rectangleContainer.forEach((img, index) =>{
  img.addEventListener("click", () => {
    rectangleContainer.forEach(rectangle => rectangle.src = "img/rectangleGrey.png");
    for (let i = 0; i <= index; i++){
      rectangleContainer[i].src="img/rectangleBlue.png"; 
    }
  })
})


// RESET THE FORMULAR ON JOURNAL DETAIL

detailSaveButton.addEventListener("click", () => {
  rateTodayForm.reset();
})

///////////////
//LOCALSTORAGE

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const motto = form.motto.value;
    const notes = form.notes.value;
    addToStorageList(motto, notes);
    form.reset()
});

///////////////////
///CODE BUDDES API

const codeBuddiesAPI = 'https://muc-2020-w1-student-api.vercel.app/api/buddies'

fetchAPI(codeBuddiesAPI, codeBuddiesSection)

/////////////////////////////
//CODE TEAMS API

const teamsAPI = 'https://muc-2020-w1-student-api.vercel.app/api/teams'

fetchAPI(teamsAPI, teamsSection)

///////////////////
///JOURNALS API

const journalsAPI = 'https://muc-2020-w1-student-api.vercel.app/api/journals'

fetchAPI(journalsAPI, journalsSection)

function journalsSection(inputAPI, index) {
  const elDiv = createContainer('.journal__container', 'card')
  const stars = ratingIcons(5, starHTML)
  const rectangles = ratingIcons(10, rectangleHTML)
  elDiv.innerHTML += `
    <h3 class="card__date card-grid">YESTERDAY</h3>
    <h4 class="card__startitle card-grid card-title">Rating:</h4>
    <div class="card__starcontainer">
      ${stars}
    </div>
    <h4 class="card__rectangletitle card-grid card-title">Comprehension:</h4>
    <div class="card__rectanglecontainer card-grid ">
    ${rectangles}
    </div>
    <h4 class="card__mottotitle card-grid card-title">Motto:</h4>
    <h3 class="card__motto card-grid ">${inputAPI.motto}</h3>
    <h4 class="card__notetitle card-grid card-title">Notes:</h4>
    <p class="card__note card-grid ">${inputAPI.notes}
    </p>
  `
}

const starHTML = '<img class="card__star--img" src="img/starBlue.png" alt="Black star" />'
const rectangleHTML = '<img class="card__rectangle--img" src="img/rectangleGrey.png" alt="" />'

function ratingIcons(amount, icon) {
  let returnValue = '';
  for (let i = 0; i < amount; i++) {
    returnValue+= icon
  }
  return returnValue
}

/*
<img class="card__star--img" src="img/starBlue.png" alt="Black star" />
    <img class="card__star--img" src="img/starBlue.png" alt="Black star" />
    
    <img class="card__star--img" src="img/starBlue.png" alt="Black star" />
    <img class="card__star--img" src="img/starGrey.png" alt="Grey star" />
    <img class="card__star--img" src="img/starGrey.png" alt="Grey star" />*/

//function html container creator
/*function createContainer(target, className) {
  const element = get(target);
  const elDiv = document.createElement('div');
  element.appendChild(elDiv);
  elDiv.classList.add(className);
  
  return elDiv
}*/
