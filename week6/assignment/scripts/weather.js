// import the convertTemp.js and getDaylight.js scripts with their default export
import localTemp from "./convertTemp.js ";
import blueBlack from "./getDayight.js"

// declare any variables needed
let data, cityName;
const temp = document.querySelector('#tempData');
const humidity = document.querySelector('#humidData');
const conditions = document.querySelector('#conditionsData');


// create an event listener for the click of the goBttn that calls a function to fetch the weather data
document.querySelector('#goBttn').addEventListener('click', () => {
    cityName = document.getElementById('city').value;
    queryAPI(cityName);
});


// create a function that calls the function that queries the api 
// and then creates promises that will call a function to write the weather data to the HTML page        
function queryAPI(city) {
    fetchData(city)
        .then(function(data) {
            toLocal(data);
        })
        .catch(function(err) {
            console.warn(err);
        })
}

// use an asynchronous call to fetches the current weather for the specified city, awaits it, 
// and returns the resulting data
const fetchData = async(city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f87830813104c56de0182a4a84c22054`);
    data = await response.json();
    return data;
}

// create a function that writes the temperature (using local units), humidity, and conditions
// this function should also change the background color of the weather app to blue during the daylight
// hours at the specified city
function toLocal(data) {
    temp.innerText = localTemp(data.main.temp, data);
    humidity.innerText = `${data.main.humidity}%`;
    conditions.innerText = data.weather[0].main;
    document.querySelector('.weatherWrapper').style.backgroundColor = blueBlack(data);
}