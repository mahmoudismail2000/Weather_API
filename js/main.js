var search=document.getElementById('searchId')
var searchFind=document.getElementById('findID')
var home=document.getElementById('home')
var news=document.getElementById('news')
var cameras=document.getElementById('cameras')
var photo=document.getElementById('photo')
var contact=document.getElementById('contact')
var contactId=document.getElementById('contactId')
var homePage=document.getElementById('homePage')
var h1Id=document.getElementById('h1Id')
var contactHome=document.getElementById('contactHome')
var loadingId=document.getElementById('loadingId')

search.addEventListener('keyup',function(){
  var country= search.value
  weather(country)
})
searchFind.addEventListener('click',function(){
  var country= search.value
  weather(country)
})


var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var date = new Date();
var options = { month: "long" };
var formattedDate = date.toLocaleDateString("en-US", options);

function countryLocation() {
  navigator.geolocation.getCurrentPosition( async function (position) {
    var lati = position.coords.latitude;
    var long = position.coords.longitude;
    
    var city=await getCountryName(lati, long)
       weather(city)
       
    
})
}
loadingId.style.display='block'
async function weather(nameOfCity) {
  
  var data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=bb2b8064aa9d4bd6a0c145738240201&q=${nameOfCity}&days=3&aqi=no&alerts=no`
  );
  var response = await data.json();
  theNameCity=(response.location.name).split(' ')[0]
  loadingId.style.display='none'
  var tomorrowTempMax=response.forecast.forecastday[1].day.maxtemp_c
  var tomorrowTempMin=response.forecast.forecastday[1].day.mintemp_c
  var tomorrowCondition=response.forecast.forecastday[1].day.condition.text
  var tomorrowIcon=response.forecast.forecastday[1].day.condition.icon
  var afterTomorrowTempMax=response.forecast.forecastday[2].day.maxtemp_c
  var afterTomorrowTempMin=response.forecast.forecastday[2].day.mintemp_c
  var afterTomorrowCondition=response.forecast.forecastday[2].day.condition.text
  var afterTomorrowIcon=response.forecast.forecastday[2].day.condition.icon
  displayDate(theNameCity,response.current.temp_c,response.current.condition.icon,response.current.condition.text,tomorrowTempMax,tomorrowTempMin,tomorrowCondition,tomorrowIcon,afterTomorrowTempMax,afterTomorrowTempMin,afterTomorrowCondition,afterTomorrowIcon)
  
  
}

async function getCountryName(latitude, longitude) {

  var data = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  var response = await data.json();
  return response.address.city
  
}

countryLocation()

function displayDate(cityName,temp,iconImage,weatherCondition,tomorrowTempMax,tomorrowTempMin,tomorrowCondition,tomorrowIcon,afterTomorrowTempMax,afterTomorrowTempMin,afterTomorrowCondition,afterTomorrowIcon) {
  cartona = `
    <div class="col-md-4 bg-danger px-0 rounded-start-4 overflow-hidden h-100 coll1">
            <div class="d-flex justify-content-between p-2 countryDate ">
              <span>${days[date.getDay()]}</span>
              <span>${date.getDay() + formattedDate}</span>
            </div>
            <div class="d-flex flex-column p-4 countryWeather">
              <span class="text-capitalize">${cityName}</span>
              <h2 class="percentage text-white">${temp}<sup>o</sup>C</h2>
            
            <img src="https:${iconImage}" alt="" class="sunImage">
            <span class="my-3 text-info">"${weatherCondition}"</span>
            <div class="d-flex ">
              <div>
                <img src="img/icon-umberella.png" alt="">
                <span class="me-3">20%</span>

              </div>
              <div>
                <img src="img/icon-wind.png" alt="">
                <span class="me-3">18km/h</span>
              </div>
              <div>
                <img src="img/icon-compass.png" alt="">
                <span class="me-3">East</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 px-0 h-100">
          <div class="d-flex justify-content-center p-2 countryDate2 ">
            <span>${days[date.getDay() + 1]}</span>
            
          </div>
          <div class="d-flex flex-column align-items-center p-5 countryWeather2">
            <img src="https:${tomorrowIcon}" alt="" class="sunImage2">
            
            <h2 class=" text-white my-3">${tomorrowTempMax}<sup>o</sup>C</h2>
            <span class="upSunny">${tomorrowTempMin}</span>
          
          
          <span class="my-3 text-info">${tomorrowCondition}</span>
          
        </div>
      </div>
      <div class="col-md-4 px-0 h-100 rounded-end-4 overflow-hidden coll2">
        <div class="d-flex justify-content-center p-2 countryDate3 ">
          <span>${days[date.getDay() + 2]}</span>
          
        </div>
        <div class="d-flex flex-column align-items-center p-5 countryWeather3">
          <img src="https:${afterTomorrowIcon}" alt="" class="sunImage2">
          
          <h2 class=" text-white my-3">${afterTomorrowTempMax}<sup>o</sup>C</h2>
          <span class="upSunny">${afterTomorrowTempMin}</span>
        
        
        <span class="my-3 text-info">${afterTomorrowCondition}</span>
        
      </div>
    </div>
    `;
  document.getElementById("rowId").innerHTML = cartona;
}

contact.addEventListener('click',function(){
  contact.classList.add('active')
  home.classList.remove('active')
  contactId.classList.replace('contactId','block')
  homePage.classList.replace('block','none')
  h1Id.innerHTML='Company Name'

})
home.addEventListener('click',function(){
  home.classList.add('active')
  contact.classList.remove('active')
  contactId.classList.replace('block','contactId')
  homePage.classList.add('block')
  h1Id.innerHTML='Weather'


})
contactHome.addEventListener('click',function(){
  homePage.classList.add('block')
  contactId.classList.replace('block','contactId')
  home.classList.add('active')
  contact.classList.remove('active')
  h1Id.innerHTML='Weather'
})