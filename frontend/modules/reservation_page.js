import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let res = await fetch(config.backendEndpoint + "/reservations/")
    let data = await res.json();
    return data;
  }
  catch(err){
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);
  if(reservations.length){
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
    let table=document.getElementById("reservation-table");
    reservations.forEach((key) => {
      let rlist=document.createElement("tr");
      rlist.innerHTML = `<th>${key.id}</th>
       <td>${key.name}</td>
       <td>${key.adventureName}</td>
       <td>${key.person}</td>    
       <td>${new Date(key.date).toLocaleDateString("en-IN")}</td> 
       <td>${key.price}</td>
       <td>${new Date(key.time).toLocaleString("en-IN", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        }).replace(" at",",")}</td>
        <td id=${key.id}>
        <a href="/frontend/pages/adventures/detail/?adventure=${key.adventure}" class="reservation-visit-button" id="${key.adventure}">Visit Adventure</a></td>`;
      table.appendChild(rlist);
  })}
  else{
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
      }
}

export { fetchReservations, addReservationToTable };
