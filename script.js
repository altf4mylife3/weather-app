// You'll need an API key from https://www.weatherapi.com

let debounce;
const API_CONFIG = {
    key: ''
}

function displayData(data) {
    const countryDisplay = document.getElementById('country');
    const weatherIcon = document.getElementById('weather-icon');

    const fahrenheit = document.getElementById('fahrenheit');
    const celsius = document.getElementById('celsius');

    const feelsF = document.getElementById('feels-fahrenheit');
    const feelsC = document.getElementById('feels-celsius');

    const windMph = document.getElementById('wind-mph');
    const windKph = document.getElementById('wind-kph');
    const windDir = document.getElementById('wind-dir');

    const humidity = document.getElementById('humidity');
    const cloud = document.getElementById('cloud');

    const location = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
    countryDisplay.textContent = location;

    weatherIcon.src = `http://${data.current.condition.icon}`;
    weatherIcon.alt = data.current.condition.text;

    fahrenheit.textContent = `${data.current.temp_f}°F`;
    celsius.textContent = `${data.current.temp_c}°C`;

    feelsF.textContent = `Feels like: ${data.current.feelslike_f}°F`;
    feelsC.textContent = `Feels like: ${data.current.feelslike_c}°C`;

    windMph.textContent = `MPH: ${data.current.wind_mph}`;
    windKph.textContent = `KPH: ${data.current.wind_kph}`;
    windDir.textContent = `Direction: ${data.current.wind_dir}`;

    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    cloud.textContent = `Cloud: ${data.current.cloud}%`;
}

function fetchData(postalcode) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_CONFIG.key}&q=${postalcode}&aqi=no`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        });
}

function citySearch() {
    clearTimeout(debounce);

    debounce = setTimeout(() => {
        const cityName = document.getElementById('searchbox').value;
        fetchData(cityName);
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData('90001');
});