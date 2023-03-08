import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init()");
  let cities = await fetchCities();
  console.log(cities);
  console.log(config);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res= await fetch(config.backendEndpoint+"/cities");
    let data= await res.json();
    return data;
  } catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
    let st=document.getElementById("data");
    let tiles=document.createElement("div");
    tiles.setAttribute("class","tile col-sm-6 col-lg-3 mb-4");
    tiles.innerHTML=`
    <a href="pages/adventures/?city=${id}" id=${id}>
    <img src=${image}/>
    <h5 class="tile-text">${city}</h5>
    <p class="tile-text1">${description}</p>
    </a>
    `;
    st.append(tiles);
}

export { init, fetchCities, addCityToDOM };
