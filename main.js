const APIKEY = "c96ffc770f17f0c79c3f81914f8c3c7d";

// const url = (city) =>
// `https://api.openweathermap.org/data/2.5/weather?q=${city}
// &appid=${APIKEY}`;

const url = (city) =>
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${APIKEY}`;


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {origin: 'cors'});
    const respData = await resp.json();
    console.log(respData);
    console.log(respData.list[0].dt)
    addWeatherToPage(respData);
}
getWeatherByLocation('Tashkent');

function addWeatherToPage(data) {
    const temp = KtoC(data.list[0].main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2><img class="weather-img" src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"/> ${temp}°C <img class="weather-img" src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"/></h2>
        <small>${data.list[0].weather[0].main}</small>
    `;
    main.innerHTML = "";
    main.appendChild(weather)

}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;
    
    if(city) {
        getWeatherByLocation(city);
    }
})