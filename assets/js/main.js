const APIKEY = "c96ffc770f17f0c79c3f81914f8c3c7d";


const url1 = (city) =>
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&appid=${APIKEY}`;

const url2 = (lat, lon) =>
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&appid=${APIKEY}`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const locationBtn = document.getElementById('changeLocation');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, errorFunction);
}
function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getWeatherByGeoLocation(lat, lon);

    async function getWeatherByGeoLocation(lat, lon) {
        const resp = await fetch(url2(lat, lon), {origin: 'cors'});
        const respData = await resp.json();
        console.log(respData);
        addWeatherToPage(respData);
    }
    
    form.classList.add('hidden');
    locationBtn.classList.remove('hidden');

}
 function errorFunction() {
     async function getWeatherByLocation(city) {
         const resp = await fetch(url1(city), {origin: 'cors'});
         const respData = await resp.json();
         console.log(respData);
         addWeatherToPage(respData);
     }
}

function addWeatherToPage(data) {
    const temp = KtoC(data.list[0].main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <div class="filter"></div>
        <p>${data.city.name}</p>
        <h2><img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"/> 
        ${temp}° <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"/></h2>
        <small>${data.list[0].weather[0].main}</small>
    `;
    main.innerHTML = ``;
    main.appendChild(weather);

    const weather5days = document.createElement('div');
    weather5days.classList.add('weather5days');

    main.appendChild(weather5days);

    for(let i = 1; i < data.list.length; i++) {
        const weatherDay = document.createElement('div');
        weatherDay.classList.add('day');
        weatherDay.innerHTML = `
            <p>${findingDays(today + i)}</p>
            <div class="tempandicon">
                <span>${KtoC(data.list[i].main.temp)}°</span>
                <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>
            </div>
        `;
        weather5days.appendChild(weatherDay);
    }
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}


const date = new Date;
const today = date.getDay();


function findingDays(day) {
    if(day == 0 || day == 7) return "Sunday";
    if(day == 1 || day == 8) return "Monday";
    if(day == 2 || day == 9) return 'Tuesday';
    if(day == 3 || day == 10) return 'Wednesday';
    if(day == 4 || day == 11) return 'Thurday';
    if(day == 5 || day == 12) return 'Friday';
    if(day == 6 || day == 13) return 'Saturday';
}
locationBtn.classList.add('hidden');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    

    const city = search.value;
    locationBtn.classList.remove('hidden');
    
    if(city) {
        getWeatherByLocation(city);
    }
    if(!form.classList.contains('hidden')) {
        form.classList.add('hidden');
    }
})

locationBtn.addEventListener('click', () => {
    main.innerHTML = "";
    locationBtn.classList.add('hidden');
    form.classList.remove('hidden');
})