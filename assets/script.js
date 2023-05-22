let cityInputElement = document.querySelector('#city-input');
let weatherContainerElement = document.querySelector('#weater-container');
let weatherTodayElement = document.querySelector('#weather-today');
let searchButton = document.querySelector('#search-btn');
let buttonContainer = document.querySelector('#button-container');
let recientButton;

let fiveDayContainerElement = document.querySelector('#five-day-container');
let fiveDayForcastElement = document.querySelector('#five-day-forcast');
let dayOneContainerElement = document.querySelector('#day-one');
let dayTwoContainerElement = document.querySelector('#day-two');
let dayThreeContainerElement = document.querySelector('#day-three');
let dayFourContainerElement = document.querySelector('#day-four');
let dayFiveContainerElement = document.querySelector('#day-five');

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
let todayIconURL;
let todayTemp;
let todayWind;
let todayHumidity;

let dayOneDate;
let dayOneIcon;
let dayOneIconURL;
let dayOneTemp;
let dayOneWind;
let dayOneHumidity;

let dayTwoDate;
let dayTwoIcon;
let dayTwoIconURL;
let dayTwoTemp;
let dayTwoWind;
let dayTwoHumidity;

let dayThreeDate;
let dayThreeIcon;
let dayThreeIconURL;
let dayThreeTemp;
let dayThreeWind;
let dayThreeHumidity;

let dayFourDate;
let dayFourIcon;
let dayFourIconURL;
let dayFourTemp;
let dayFourWind;
let dayFourHumidity;

let dayFiveDate;
let dayFiveIcon;
let dayFiveIconURL;
let dayFiveTemp;
let dayFiveWind;
let dayFiveHumidity;

previousCityButtton()


searchButton.addEventListener("click", searchCitySubmit);
recientButton.addEventListener("click", cityReSubmit);

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

function cityReSubmit(event) {
    event.preventDefault();
    city = recientButton.textContent;
    if (!city) {
      alert('This did not work... reload please!');
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

        let cityButton = document.createElement("button");
        
        cityButton.className = "py-1 my-2 btn recient-btn";
        cityButton.textContent = localStorage.key(0);
        buttonContainer.appendChild(cityButton);

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
        todayIconURL = "http://openweathermap.org/img/w/" + todayIcon + ".png";
        console.log(todayIconURL)
        todayTemp = "Temperature: " + cityWeatherNow["main"]["temp"] + "° F";
        console.log(todayTemp);
        todayWind = "Wind: " + cityWeatherNow["wind"]["speed"] + " MPH";
        console.log(todayWind);
        todayHumidity = "Humidity: " + cityWeatherNow["main"]["humidity"] + "%";
        console.log(todayHumidity);
        searchWeatherFiveDaysApi();
        applyCityInformation()
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
        dayOneIconURL = "http://openweathermap.org/img/w/" + dayOneIcon + ".png";
        console.log(dayOneIconURL);
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
        dayTwoIconURL = "http://openweathermap.org/img/w/" + dayTwoIcon + ".png";
        console.log(dayTwoIconURL);
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
        dayThreeIconURL = "http://openweathermap.org/img/w/" + dayThreeIcon + ".png";
        console.log(dayThreeIconURL);
        dayThreeTemp = "Temp: " + cityWeatherFiveDays["list"][18]["main"]["temp"] + "° F";
        console.log(dayThreeTemp);
        dayThreeWind = "Wind: " + cityWeatherFiveDays["list"][18]["wind"]["speed"] + " MPH";
        console.log(dayThreeWind);
        dayThreeHumidity = "Humidity: " + cityWeatherFiveDays["list"][18]["main"]["humidity"] + "%";
        console.log(dayThreeHumidity);

        dayFourDate = dayjs(cityWeatherFiveDays["list"][26]["dt_txt"]).format("M/D/YYYY");
        console.log(dayFourDate);
        dayFourIcon = cityWeatherFiveDays["list"][26]["weather"][0]["icon"];
        console.log(dayFourIcon);
        dayFourIconURL = "http://openweathermap.org/img/w/" + dayFourIcon + ".png";
        console.log(dayFourIconURL);
        dayFourTemp = "Temp: " + cityWeatherFiveDays["list"][26]["main"]["temp"] + "° F";
        console.log(dayFourTemp);
        dayFourWind = "Wind: " + cityWeatherFiveDays["list"][26]["wind"]["speed"] + " MPH";
        console.log(dayFourWind);
        dayFourHumidity = "Humidity: " + cityWeatherFiveDays["list"][26]["main"]["humidity"] + "%";
        console.log(dayFourHumidity);

        dayFiveDate = dayjs(cityWeatherFiveDays["list"][34]["dt_txt"]).format("M/D/YYYY");
        console.log(dayFiveDate);
        dayFiveIcon = cityWeatherFiveDays["list"][34]["weather"][0]["icon"];
        console.log(dayFiveIcon);
        dayFiveIconURL = "http://openweathermap.org/img/w/" + dayFiveIcon + ".png";
        console.log(dayFiveIconURL);
        dayFiveTemp = "Temp: " + cityWeatherFiveDays["list"][34]["main"]["temp"] + "° F";
        console.log(dayFiveTemp);
        dayFiveWind = "Wind: " + cityWeatherFiveDays["list"][34]["wind"]["speed"] + " MPH";
        console.log(dayFiveWind);
        dayFiveHumidity = "Humidity: " + cityWeatherFiveDays["list"][34]["main"]["humidity"] + "%";
        console.log(dayFiveHumidity);

        applyCityInformationFiveDay();
    })

.catch(err => alert("Can't believe it stopped here. Please reset."))
}

function previousCityButtton() {
    for (let i = 0; i < localStorage.length; i++) {

        let cityButton = document.createElement("button");
        recientButton = document.querySelector('.recient-btn');
        
        cityButton.className = "py-1 my-2 btn recient-btn";
        cityButton.textContent = localStorage.key(i);
        buttonContainer.appendChild(cityButton);
    }
}

function applyCityInformation() {
    weatherTodayElement.classList.remove("hide");

    let cityTodayName = document.createElement("h2");
    cityTodayName.className = "weather-city-name dark-text";
    cityTodayName.textContent = city + "    -   " + todayDate;

    let cityTodayIcon = document.createElement("img");
    cityTodayIcon.setAttribute("id", "icon")
    cityTodayIcon.setAttribute("src", todayIconURL);

    let cityTodayInfo = document.createElement("h3")
    cityTodayInfo.className = "weather-info";
    cityTodayInfo.textContent = todayTemp + "    -    " + todayWind + "    -    " + todayHumidity;
    
    // weatherContainerElement.appendChild(cityToday);
    weatherTodayElement.appendChild(cityTodayName);
    weatherTodayElement.appendChild(cityTodayIcon);
    weatherTodayElement.appendChild(cityTodayInfo);
    
}

function applyCityInformationFiveDay() {
    fiveDayForcastElement.classList.remove("hide");

    // day one container and info
    dayOneContainerElement.classList.remove("hide");

    let citydayOneDate = document.createElement("p");
    citydayOneDate.textContent = dayOneDate;

    let citydayOneIcon = document.createElement("img");
    citydayOneIcon.setAttribute("src", dayOneIconURL);

    let cityDayOneTemp = document.createElement("p");
    cityDayOneTemp.textContent = dayOneTemp;

    let cityDayOneWind = document.createElement("p");
    cityDayOneWind.textContent = dayOneWind;

    let cityDayOneHumidity = document.createElement("p");
    cityDayOneHumidity.textContent = dayOneHumidity;

    dayOneContainerElement.appendChild(citydayOneDate);
    dayOneContainerElement.appendChild(citydayOneIcon);
    dayOneContainerElement.appendChild(cityDayOneTemp);
    dayOneContainerElement.appendChild(cityDayOneWind);
    dayOneContainerElement.appendChild(cityDayOneHumidity);

    // day two container and info
    dayTwoContainerElement.classList.remove("hide");

    let citydayTwoDate = document.createElement("p");
    citydayTwoDate.textContent = dayTwoDate;

    let citydayTwoIcon = document.createElement("img");
    citydayTwoIcon.setAttribute("src", dayTwoIconURL);

    let cityDayTwoTemp = document.createElement("p");
    cityDayTwoTemp.textContent = dayTwoTemp;

    let cityDayTwoWind = document.createElement("p");
    cityDayTwoWind.textContent = dayTwoWind;

    let cityDayTwoHumidity = document.createElement("p");
    cityDayTwoHumidity.textContent = dayTwoHumidity;

    dayTwoContainerElement.appendChild(citydayTwoDate);
    dayTwoContainerElement.appendChild(citydayTwoIcon);
    dayTwoContainerElement.appendChild(cityDayTwoTemp);
    dayTwoContainerElement.appendChild(cityDayTwoWind);
    dayTwoContainerElement.appendChild(cityDayTwoHumidity);

    // day three container and info
    dayThreeContainerElement.classList.remove("hide");

    let citydayThreeDate = document.createElement("p");
    citydayThreeDate.textContent = dayThreeDate;

    let citydayThreeIcon = document.createElement("img");
    citydayThreeIcon.setAttribute("src", dayThreeIconURL);

    let cityDayThreeTemp = document.createElement("p");
    cityDayThreeTemp.textContent = dayThreeTemp;

    let cityDayThreeWind = document.createElement("p");
    cityDayThreeWind.textContent = dayThreeWind;

    let cityDayThreeHumidity = document.createElement("p");
    cityDayThreeHumidity.textContent = dayThreeHumidity;

    dayThreeContainerElement.appendChild(citydayThreeDate);
    dayThreeContainerElement.appendChild(citydayThreeIcon);
    dayThreeContainerElement.appendChild(cityDayThreeTemp);
    dayThreeContainerElement.appendChild(cityDayThreeWind);
    dayThreeContainerElement.appendChild(cityDayThreeHumidity);

    // day four container and info
    dayFourContainerElement.classList.remove("hide");

    let citydayFourDate = document.createElement("p");
    citydayFourDate.textContent = dayFourDate;

    let citydayFourIcon = document.createElement("img");
    citydayFourIcon.setAttribute("src", dayFourIconURL);

    let cityDayFourTemp = document.createElement("p");
    cityDayFourTemp.textContent = dayFourTemp;

    let cityDayFourWind = document.createElement("p");
    cityDayFourWind.textContent = dayFourWind;

    let cityDayFourHumidity = document.createElement("p");
    cityDayFourHumidity.textContent = dayFourHumidity;

    dayFourContainerElement.appendChild(citydayFourDate);
    dayFourContainerElement.appendChild(citydayFourIcon);
    dayFourContainerElement.appendChild(cityDayFourTemp);
    dayFourContainerElement.appendChild(cityDayFourWind);
    dayFourContainerElement.appendChild(cityDayFourHumidity);

    // day five container and info
    dayFiveContainerElement.classList.remove("hide");

    let citydayFiveDate = document.createElement("p");
    citydayFiveDate.textContent = dayFiveDate;

    let citydayFiveIcon = document.createElement("img");
    citydayFiveIcon.setAttribute("src", dayFiveIconURL);

    let cityDayFiveTemp = document.createElement("p");
    cityDayFiveTemp.textContent = dayFiveTemp;

    let cityDayFiveWind = document.createElement("p");
    cityDayFiveWind.textContent = dayFiveWind;

    let cityDayFiveHumidity = document.createElement("p");
    cityDayFiveHumidity.textContent = dayFiveHumidity;

    dayFiveContainerElement.appendChild(citydayFiveDate);
    dayFiveContainerElement.appendChild(citydayFiveIcon);
    dayFiveContainerElement.appendChild(cityDayFiveTemp);
    dayFiveContainerElement.appendChild(cityDayFiveWind);
    dayFiveContainerElement.appendChild(cityDayFiveHumidity);
}
