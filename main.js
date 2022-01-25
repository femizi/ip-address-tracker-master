const search = document.querySelector("#search");
const button = document.querySelector("#submit");
const ip_answer = document.querySelector("#ip-answer");
const location_answer = document.querySelector("#location-answer");
const timezone_answer = document.querySelector("#timezone-answer");
const isp_answer = document.querySelector("#isp-answer");

let ip_address = "";
const API_KEY = "at_iQDnTXOUFlCb3MScIlAQJQ6J73jzI";

URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip_address}`;


// instantiate map with default view of london
var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 13,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiZmVtaXppIiwiYSI6ImNreGFjZ3A3dDBhbHUyeHBndTZsNHRkOGgifQ.iBMSBcvJxbHz9ueALDhYMA",
  }
).addTo(map);
var marker
// even if the keyboard is used the button still clicks 
search.addEventListener("keyup", function(event){
    if (event.keyCode === 13){
        console.log(event)
        button.click()
    }
})
// add submit function to button 
button.addEventListener("click", getIpAddress);

// binds search input value to variable ip address then calls a fetch function
function getIpAddress() {
  ip_address = search.value;
  search.placeholder ="Please wait"
  getIpDetails()
}

// this changes inner text and navigates map
function displayResults(response) {
    console.log(response)
  ip_answer.innerText = `${response.ip}`;
  location_answer.innerText = `${response.location.city}, ${response.location.country}, ${response.location.postalCode}`;
  timezone_answer.innerText = ` UTC ${response.location.timezone}`;
  isp_answer.innerText = `${response.isp}`;
  map.flyTo([response.location.lat, response.location.lng])
  L.marker([response.location.lat, response.location.lng]).addTo(map);
 search.placeholder = "Search for any IP address or domain"

}

// checks ipify.org api for details
async function getIpDetails() {
  await fetch(URL)
    .then((response) => {
      return response.json();
      ;
    })
    .then(displayResults);
}

