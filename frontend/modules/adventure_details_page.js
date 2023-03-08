import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let ans=search.substring(11);
  return ans;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res= await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
    let data= await res.json();
    return data;
  } catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById("adventure-name").innerHTML= `${adventure.name}`;
  document.getElementById("adventure-subtitle").innerHTML= `${adventure.subtitle}`;
  let x=document.getElementById("photo-gallery");
  for(let i=0;i<adventure.images.length;i++){
  let y=document.createElement("div");
  y.innerHTML=`
  <img class="activity-card-image" src=${adventure.images[i]}/>
  `;
  x.appendChild(y);
  }
  document.getElementById("adventure-content").innerHTML= `${adventure.content}`;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let x=document.getElementById("photo-gallery");
  let carouselIndicator = '';
  let carouselInner = '';
  for(let i=0;i<images.length;i++){
    carouselIndicator+=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ${i===0 ? `class="active" aria-current="true" `:"" } aria-label="Slide+ ${(i+1)}+"}></button>`;
    carouselInner+=`<div class="carousel-item ${i == 0? 'active':''}">
    <img src="${images[i]}" class="d-block activity-card-image" alt="...">
    </div>`
  }
  x.innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
  ${carouselIndicator};
  </div>
  <div class="carousel-inner">
  ${carouselInner}; 
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML=`${adventure.costPerHead}`;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let x=document.getElementById("reservation-cost");
  x.innerHTML=adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(padventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = form.elements["name"].value;
    const date = form.elements["date"].value;
    const person = form.elements["person"].value;
    const adventure = padventure.id;
    const col = { name, date, person, adventure };
    const jsonData = JSON.stringify(col);
    const url = config.backendEndpoint + "/reservations/new";
    // console.log(url);
     try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",},
          body: jsonData,});
          console.log(response);
    if (response.ok) {
      alert("Success!");
      location.reload();
    } else {
      alert("Failed!");
    }}catch (error) {
      console.error(error);
      alert("Failed!");
    } 
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let x=document.getElementById("reserved-banner");
  if(adventure.reserved){
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
