
const iconElement=document.querySelector(".weather-icon");
const tempElement=document.querySelector(".temperature-value h2");
const descElement=document.querySelector(".temperature-description h3");
const locationElement=document.querySelector(".location h3");
const notificationElement=document.querySelector(".notification");

const weather={};
weather.temperature={
    unit:"celsius"
}

const kelvin=273;
const key="82005d27a116c2880c8f0fcb866998a0";
if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition,showError);

}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser doesn't support geolocation</p>";

}
function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    getWeather(latitude,longitude);
}
function showError(error){
    notificationElement.style.display="block";
    
    notificationElement.innerHTML='<h2>User denied location</h2>';
}
function getWeather(latitude,longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
    .then(function(response){
        let data=response.json();
        return data;
    })
    .then(function(data){
weather.temperature.value=Math.floor(data.main.temp - kelvin);
weather.description=data.weather[0].description;
weather.iconId=data.weather[0].icon;
weather.city=data.name;
weather.country=data.sys.country;
    })
    .then (function(){
        displayWeather();
    });
}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city} , ${weather.country}`;

}
