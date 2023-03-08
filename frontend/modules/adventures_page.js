
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
let ans=search.substring(6);
return ans;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res= await fetch(config.backendEndpoint+"/adventures?city="+city);
    let data= await res.json();
    return data;
  } catch(err) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  adventures.forEach(act => {
    let dt=document.getElementById("data");
    let adv=document.createElement("div");

    adv.setAttribute("class","col-6 col-lg-3 mb-3");
    adv.innerHTML=`
    <a href="detail/?adventure=${act.id}" id=${act.id}>
    <div id=${act.id} class="card activity-card">
    <img src=${act.image} class="card-img-top" alt="..." />
    <div class="category-banner">${act.category}</div>
    <div class="card-body d-md-flex justify-content-between" style="width:100%">
    <p class="card-title fw-normal">${act.name}</p>
    <p class="card-text fw-normal">₹${act.costPerHead}</p>
    </div>
    <div class="card-body d-md-flex justify-content-between" style="width:100%">
    <p class="card-title fw-normal">Duration</p>
    <p class="card-text fw-normal">${act.duration} Hours</p>
    </div>
    </div>
    </a>
    `;
    dt.appendChild(adv);
    return dt;
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(list);
  let x=[];
  for(let i=0;i<list.length;i++){
    if(list[i].duration>=low && list[i].duration<=high) x.push(list[i]);
  }
  return x;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let x = [];
  for(let i=0;i<list.length;i++){
    if(categoryList.includes(list[i].category)) x.push(list[i]);
  }
  return x;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    console.log(filters);
    let list1=list;
    if(filters.category.length){
      list1=filterByCategory(list,filters.category);
    }
    list=list1;
    if(filters.duration.length){
      let x=filters.duration;
      let dur=x.split('-');
      let low=dur[0];
      let high=dur[1];
      list1=filterByDuration(list,low,high);
    }
    list=list1;
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  return localStorage.setItem("filters",JSON.stringify(filters));

}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
    if(filters.category.length){
      for(let i=0;i<filters.category.length;i++){
        let cl=document.getElementById("category-list");
        let x=document.createElement("p");
        x.setAttribute("class","category-filter");
        x.innerHTML=`
        ${filters.category[i]}
         `;
        cl.appendChild(x);
      }
    }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
