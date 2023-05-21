let cityInputElement = document.querySelector('#city-input');
let weatherContainerElement = document.querySelector('#weater-container');
let weatherTodayElement = document.querySelector('#weater-today');
let fiveDayContainerElement = document.querySelector('#five-day-container');
let searchButton = document.querySelector('#search-btn');

let cityName = document.querySelector('.weather-city-name');
let cityTemperature = document.querySelector('.weather-info');
let cityWind = document.querySelector('.weather-info');
let cityHumidity = document.querySelector('.weather-info');

let weatherAPIKey = "a95ea5d3ddbfadaa4adff8073064743f";
let city;
let cityInfo;
let cityInfoParse;
let latatude;
let longitude;

let todayDate = dayjs().format("M/D/YYYY");
let todayIcon;
let todayTemp;
let todayWind;
let todayHumidity;

let dayOneDate;
let dayOneIcon;
let dayOneTemp;
let dayOneWind;
let dayOneHumidity;

let dayTwoDate;
let dayTwoIcon;
let dayTwoTemp;
let dayTwoWind;
let dayTwoHumidity;

let dayThreeDate;
let dayThreeIcon;
let dayThreeTemp;
let dayThreeWind;
let dayThreeHumidity;

let dayFourDate;
let dayFourIcon;
let dayFourTemp;
let dayFourWind;
let dayFourHumidity;

let dayFiveDate;
let dayFiveIcon;
let dayFiveTemp;
let dayFiveWind;
let dayFiveHumidity;

searchButton.addEventListener("click", searchCitySubmit);

function searchCitySubmit(event) {
    event.preventDefault();
    city = document.querySelector('#city-input').value;
    if (!city) {
      alert('Please enter the name of a city.');
      return;
    }
    console.log(city);
    searchCityApi(city);
};

function searchCityApi() {
    fetch ("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&units=imperial&appid=" + weatherAPIKey)
    .then(response => response.json())
    .then(data => {
        cityInfo = data;
    })
    .then(() => {
        console.log(cityInfo);
        localStorage.setItem(city, JSON.stringify(cityInfo));
        latatude = cityInfo[0]["lat"];
        longitude = cityInfo[0]["lon"];
        console.log(latatude);
        console.log(longitude);

        searchWeatherNowApi();
    })

    .catch(err => alert("Please enter the name of a city."))
    
};

function searchWeatherNowApi() {
    fetch ("https://api.openweathermap.org/data/2.5/weather?lat=" + latatude + "&lon=" + longitude + "&units=imperial&appid=" + weatherAPIKey)
    .then(response => response.json())
    .then(data => {
        cityWeatherNow = data;
    })
    .then(() => {
        console.log(cityWeatherNow);
        // localStorage.setItem(city, JSON.stringify(cityWeatherNow));

        console.log(todayDate);
        todayIcon = cityWeatherNow["weather"][0]["icon"];
        console.log(todayIcon);
        todayTemp = "Temperature: " + cityWeatherNow["main"]["temp"] + "° F";
        console.log(todayTemp);
        todayWind = "Wind: " + cityWeatherNow["wind"]["speed"] + " MPH";
        console.log(todayWind);
        todayHumidity = "Humidity: " + cityWeatherNow["main"]["humidity"] + "%";
        console.log(todayHumidity);
        searchWeatherFiveDaysApi();
    })

.catch(err => alert("Welp this didn't work. Please refresh."))
};

function searchWeatherFiveDaysApi() {
    fetch ("https://api.openweathermap.org/data/2.5/forecast?lat=" + latatude + "&lon=" + longitude + "&units=imperial&appid=" + weatherAPIKey)
    .then(response => response.json())
    .then(data => {
        cityWeatherFiveDays = data;
    })
    .then(() => {
        console.log(cityWeatherFiveDays);
        // localStorage.setItem(city, JSON.stringify(cityWeatherFiveDays));

        dayOneDate = dayjs(cityWeatherFiveDays["list"][2]["dt_txt"]).format("M/D/YYYY");
        console.log(dayOneDate);
        dayOneIcon = cityWeatherFiveDays["list"][2]["weather"][0]["icon"];
        console.log(dayOneIcon);
        dayOneTemp = "Temp: " + cityWeatherFiveDays["list"][2]["main"]["temp"] + "° F";
        console.log(dayOneTemp);
        dayOneWind = "Wind: " + cityWeatherFiveDays["list"][2]["wind"]["speed"] + " MPH";
        console.log(dayOneWind);
        dayOneHumidity = "Humidity: " + cityWeatherFiveDays["list"][2]["main"]["humidity"] + "%";
        console.log(dayOneHumidity);

        dayTwoDate = dayjs(cityWeatherFiveDays["list"][10]["dt_txt"]).format("M/D/YYYY");
        console.log(dayTwoDate);
        dayTwoIcon = cityWeatherFiveDays["list"][10]["weather"][0]["icon"];
        console.log(dayTwoIcon);
        dayTwoTemp = "Temp: " + cityWeatherFiveDays["list"][10]["main"]["temp"] + "° F";
        console.log(dayTwoTemp);
        dayTwoWind = "Wind: " + cityWeatherFiveDays["list"][10]["wind"]["speed"] + " MPH";
        console.log(dayTwoWind);
        dayTwoHumidity = "Humidity: " + cityWeatherFiveDays["list"][10]["main"]["humidity"] + "%";
        console.log(dayTwoHumidity);

        dayThreeDate = dayjs(cityWeatherFiveDays["list"][18]["dt_txt"]).format("M/D/YYYY");
        console.log(dayThreeDate);
        dayThreeIcon = cityWeatherFiveDays["list"][18]["weather"][0]["icon"];
        console.log(dayThreeIcon);
        dayThreeTemp = "Temp: " + cityWeatherFiveDays["list"][18]["main"]["temp"] + "° F";
        console.log(dayThreeTemp);
        dayThreeWind = "Wind: " + cityWeatherFiveDays["list"][18]["wind"]["speed"] + " MPH";
        console.log(dayThreeWind);
        dayThreeHumidity = "Humidity: " + cityWeatherFiveDays["list"][18]["main"]["humidity"] + "%";
        console.log(dayThreeHumidity);

        dayFfourDate = dayjs(cityWeatherFiveDays["list"][26]["dt_txt"]).format("M/D/YYYY");
        console.log(dayFfourDate);
        dayFfourIcon = cityWeatherFiveDays["list"][26]["weather"][0]["icon"];
        console.log(dayFfourIcon);
        dayFfourTemp = "Temp: " + cityWeatherFiveDays["list"][26]["main"]["temp"] + "° F";
        console.log(dayFfourTemp);
        dayFfourWind = "Wind: " + cityWeatherFiveDays["list"][26]["wind"]["speed"] + " MPH";
        console.log(dayFfourWind);
        dayFfourHumidity = "Humidity: " + cityWeatherFiveDays["list"][26]["main"]["humidity"] + "%";
        console.log(dayFfourHumidity);

        dayFiveDate = dayjs(cityWeatherFiveDays["list"][34]["dt_txt"]).format("M/D/YYYY");
        console.log(dayFiveDate);
        dayFiveIcon = cityWeatherFiveDays["list"][34]["weather"][0]["icon"];
        console.log(dayFiveIcon);
        dayFiveTemp = "Temp: " + cityWeatherFiveDays["list"][34]["main"]["temp"] + "° F";
        console.log(dayFiveTemp);
        dayFiveWind = "Wind: " + cityWeatherFiveDays["list"][34]["wind"]["speed"] + " MPH";
        console.log(dayFiveWind);
        dayFiveHumidity = "Humidity: " + cityWeatherFiveDays["list"][34]["main"]["humidity"] + "%";
        console.log(dayFiveHumidity);
    })

.catch(err => alert("Can't believe it stopped here. Please reset."))
}

