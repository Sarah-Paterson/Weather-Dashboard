let cityInputElement = document.querySelector('#city-input');
// let cityInputElement = $('#city-input');
let weatherContainerElement = document.querySelector('#weater-container');
// let weatherContainerElement = $('#weater-container');
let weatherTodayElement = document.querySelector('#weater-today');
// let weatherTodayElement = $('#weater-today');
let fiveDayContainerElement = document.querySelector('#five-day-container');
// let fiveDayContainerElement = $('#five-day-container');
let searchButton = document.querySelector('#search-btn');

let cityName = document.querySelector('.weather-city-name');
let cityTemperature = document.querySelector('.weather-info');
let cityWind = document.querySelector('.weather-info');
let cityHumidity = document.querySelector('.weather-info');

let weatherAPIKey = "a95ea5d3ddbfadaa4adff8073064743f";
let city;
let cityInfo;
let latatude;
let longitude;

searchButton.addEventListener("click", searchCitySubmit);

function searchCitySubmit(event) {
    event.preventDefault();
    city = document.querySelector('#city-input').value;
    if (!city) {
      alert('Please enter the name of a city.');
      return;
    }
    // weatherFetch();
    console.log(city);
    searchCityApi(city);
};

function searchCityApi() {
    fetch ("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + weatherAPIKey)
    .then(response => response.json())
    .then(data => {
        cityInfo = data;
    })
    .then(() => {
        console.log(cityInfo);
        localStorage.setItem(city, JSON.stringify(cityInfo))
    })

    .catch(err => alert("Please enter the name of a city."))

    latatude = cityInfo[0];
    // longitude = cityInfo[0][lon];
    testing();
    
};

function testing() {
    console.log(latatude);
    console.log(longitude);
}

function searchWeatherApi() {
    fetch ("https://api.openweathermap.org/data/2.5/weather?lat=" + latatude + "&lon=" + longitude + "&appid=" + weatherAPIKey)
    .then(response => response.json())
    .then(data => console.log(data))

.catch(err => alert("Please enter the name of a city."))
};

// function searchCityApi() {
  
//     fetch(weatherQueryURL)
//       .then(function (response) {
//         if (!response.ok) {
//           throw response.json();
//         }
  
//         return response.json();
//       })
//       .then(function (locRes) {
//         // write query to page so user knows what they are viewing
//         resultTextEl.textContent = locRes.search.query;
  
//         console.log(locRes);
  
//         if (!locRes.results.length) {
//           console.log('No results found!');
//         //   resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
//         } else {
//           resultContentEl.textContent = '';
//           for (let i = 0; i < locRes.results.length; i++) {
//             printResults(locRes.results[i]);
//           }
//         }
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   }

// function weatherFetch() {
//     fetch(weatherQueryURL)
//     .then(function (response) {
//         if (!response.ok) {
//         throw response.json();
//         }

//         return response.json();
//     })
//     .then(function (locRes) {
//         // write query to page so user knows what they are viewing
//         weatherContainerElement.textContent = locRes.search.query;

//         console.log(locRes);

//         // if (!locRes.results.length) {
//         //   console.log('No results found!');
//         //   resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
//         // } else {
//         //   resultContentEl.textContent = '';
//         //   for (let i = 0; i < locRes.results.length; i++) {
//         //     printResults(locRes.results[i]);
//         //   }
//         // }
//     })
//     // .catch(function (error) {
//     //     console.error(error);
//     // });
// }
