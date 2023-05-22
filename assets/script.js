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
    clean()
    event.preventDefault();
    city = document.querySelector('#city-input').value;
    if (!city) {
      alert('Please enter the name of a city.');
      return;
    }
    searchCityApi(city);
};

function cityReSubmit(event) {
    clean();
    event.preventDefault();
    city = recientButton.textContent;
    if (!city) {
      alert('This did not work... reload please!');
      return;
    }
    searchCityApi(city);
};

function searchCityApi() {
    fetch ("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&units=imperial&appid=" + weatherAPIKey)
    .then(response => response.json())
    .then(data => {
        cityInfo = data;
    })
    .then(() => {
        localStorage.setItem(city, JSON.stringify(cityInfo));
        latatude = cityInfo[0]["lat"];
        longitude = cityInfo[0]["lon"];

        // let cityButton = document.createElement("button");
        
        // cityButton.className = "py-1 my-2 btn recient-btn";
        // cityButton.textContent = localStorage.key(0);
        // buttonContainer.appendChild(cityButton);

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

        todayIcon = cityWeatherNow["weather"][0]["icon"];
        todayIconURL = "http://openweathermap.org/img/w/" + todayIcon + ".png";
        todayTemp = "Temperature: " + cityWeatherNow["main"]["temp"] + "° F";
        todayWind = "Wind: " + cityWeatherNow["wind"]["speed"] + " MPH";
        todayHumidity = "Humidity: " + cityWeatherNow["main"]["humidity"] + "%";

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
        // localStorage.setItem(city, JSON.stringify(cityWeatherFiveDays));

        dayOneDate = dayjs(cityWeatherFiveDays["list"][2]["dt_txt"]).format("M/D/YYYY");
        dayOneIcon = cityWeatherFiveDays["list"][2]["weather"][0]["icon"];
        dayOneIconURL = "http://openweathermap.org/img/w/" + dayOneIcon + ".png";
        dayOneTemp = "Temp: " + cityWeatherFiveDays["list"][2]["main"]["temp"] + "° F";
        dayOneWind = "Wind: " + cityWeatherFiveDays["list"][2]["wind"]["speed"] + " MPH";
        dayOneHumidity = "Humidity: " + cityWeatherFiveDays["list"][2]["main"]["humidity"] + "%";

        dayTwoDate = dayjs(cityWeatherFiveDays["list"][10]["dt_txt"]).format("M/D/YYYY");
        dayTwoIcon = cityWeatherFiveDays["list"][10]["weather"][0]["icon"];
        dayTwoIconURL = "http://openweathermap.org/img/w/" + dayTwoIcon + ".png";
        dayTwoTemp = "Temp: " + cityWeatherFiveDays["list"][10]["main"]["temp"] + "° F";
        dayTwoWind = "Wind: " + cityWeatherFiveDays["list"][10]["wind"]["speed"] + " MPH";
        dayTwoHumidity = "Humidity: " + cityWeatherFiveDays["list"][10]["main"]["humidity"] + "%";

        dayThreeDate = dayjs(cityWeatherFiveDays["list"][18]["dt_txt"]).format("M/D/YYYY");
        dayThreeIcon = cityWeatherFiveDays["list"][18]["weather"][0]["icon"];
        dayThreeIconURL = "http://openweathermap.org/img/w/" + dayThreeIcon + ".png";
        dayThreeTemp = "Temp: " + cityWeatherFiveDays["list"][18]["main"]["temp"] + "° F";
        dayThreeWind = "Wind: " + cityWeatherFiveDays["list"][18]["wind"]["speed"] + " MPH";
        dayThreeHumidity = "Humidity: " + cityWeatherFiveDays["list"][18]["main"]["humidity"] + "%";

        dayFourDate = dayjs(cityWeatherFiveDays["list"][26]["dt_txt"]).format("M/D/YYYY");
        dayFourIcon = cityWeatherFiveDays["list"][26]["weather"][0]["icon"];
        dayFourIconURL = "http://openweathermap.org/img/w/" + dayFourIcon + ".png";
        dayFourTemp = "Temp: " + cityWeatherFiveDays["list"][26]["main"]["temp"] + "° F";
        dayFourWind = "Wind: " + cityWeatherFiveDays["list"][26]["wind"]["speed"] + " MPH";
        dayFourHumidity = "Humidity: " + cityWeatherFiveDays["list"][26]["main"]["humidity"] + "%";

        dayFiveDate = dayjs(cityWeatherFiveDays["list"][34]["dt_txt"]).format("M/D/YYYY");
        dayFiveIcon = cityWeatherFiveDays["list"][34]["weather"][0]["icon"];
        dayFiveIconURL = "http://openweathermap.org/img/w/" + dayFiveIcon + ".png";
        dayFiveTemp = "Temp: " + cityWeatherFiveDays["list"][34]["main"]["temp"] + "° F";
        dayFiveWind = "Wind: " + cityWeatherFiveDays["list"][34]["wind"]["speed"] + " MPH";
        dayFiveHumidity = "Humidity: " + cityWeatherFiveDays["list"][34]["main"]["humidity"] + "%";

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

function clean(){
    weatherTodayElement.innerHTML='';
    dayOneContainerElement.innerHTML='';
    dayTwoContainerElement.innerHTML='';
    dayThreeContainerElement.innerHTML='';
    dayFourContainerElement.innerHTML='';
    dayFiveContainerElement.innerHTML='';
  }