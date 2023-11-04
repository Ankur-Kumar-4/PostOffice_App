const btnGetStarted = document.getElementById("getStarted");
var data_postOffices;
const search = document.getElementById("search");
btnGetStarted.addEventListener("click", () => {
  var homePage = document.getElementById("homepage");
  var mainPage = document.getElementById("main");

  homePage.classList.add("hide");
  mainPage.classList.remove("hide");
});
let ipOfUser;
function getIPAddress() {
  fetch("https://api64.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      const ipAddress = data.ip;
      ipOfUser = data.ip;
      document.getElementById("ip-address").textContent = ipAddress;
      document.getElementById("ip-detail").textContent = ipAddress;
      getinfoFromIp();
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("ip-address").textContent =
        "Unable to fetch IP address";
    });
}

let lat;
let long;
function getinfoFromIp() {
  fetch(`https://ipapi.co/49.37.73.10/json/ `)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      document.getElementById("lat").innerHTML = data.latitude;

      let lat = data.latitude;
      let long = data.longitude;
      mapRender(lat, long);

      document.getElementById("city").innerHTML = data.city;
      document.getElementById("Long").innerHTML = data.longitude;
      document.getElementById("region").innerHTML = data.region;
      document.getElementById("Organisation").innerHTML = data.org;

      document.getElementById("timeZone").innerHTML = data.timezone;
      let timezone = data.timezone;
      document.getElementById("pincode").innerHTML = data.postal;

      let chicago_datetime_str = new Date().toLocaleString("en-US", {
        timeZone: `${timezone}`,
      });

      document.getElementById("date&time").innerHTML = chicago_datetime_str;
      let pincode = data.postal;
      getPincodeDetail(pincode);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function mapRender(lat, long) {
  const mapContainer = document.getElementById("mapContainer");
  mapContainer.innerHTML = `
    <iframe src="https://maps.google.com/maps?q=${lat}, ${long}&output=embed" frameborder="0" style="border:0"></iframe>
    `;
}
let numberOfPostOffice; 
function getPincodeDetail(pincode) {
  fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then((response) => response.json())
    .then((data) => {
      numberOfPostOffice = data[0].PostOffice.length;
      document.getElementById("message").innerHTML = data[0].Message;
      console.log(data);

      // Clear the cardContainer
      cardContainer.innerHTML = "";

      
      data_postOffices = data[0].PostOffice;

      renderCards(data_postOffices);
      
      

     
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function renderCards(data) {
  const cardContainer = document.getElementById("cardContainer");

  cardContainer.innerHTML=""
  
  for (let i = 0; i <data.length ; i++) {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <span>Name : ${data[i].Name}</span>
      <span>Branch Type : ${data[i].BranchType}</span>
      <span>Delivery Status : ${data[i].DeliveryStatus}</span>
      <span>District : ${data[i].District}</span>
      <span>Division : ${data[i].Division}</span>
  
      `;
    cardContainer.appendChild(card);
  }
 
}




search.addEventListener("keyup",(ev)=>{
 document.getElementById("cardContainer").innerHTML = "";

 let inpval = ev.target.value;

 let filterData = data_postOffices.filter((val) => {
    if (val.Name.toLowerCase().includes(inpval)) {
        return val;
      } else if (val.BranchType.toLowerCase().includes(inpval)) {
        return val;
      }else{

      }

 });
  
 renderCards(filterData);


});





window.onload = getIPAddress;
