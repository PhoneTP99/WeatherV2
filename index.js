import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const apiKey = "c4WCfjxbWAwj3tHgZkO5zIKUrf7ZuwGw";

const setTimeAndDate = () => {
  const today = dayjs().format("DD.MM.YYYY");
  const time = dayjs().format("HH:mm");
  const greeting = dayjs().format("HH:mm");
  document.querySelector(".today").innerHTML = today;
  document.querySelector(".time").innerHTML = time;

  if (greeting >= "5:00" && greeting <= "12:00") {
    document.querySelector(".greet").innerHTML = "Good Morning";
  } else if (greeting >= "12:01" && greeting <= "6:00") {
    document.querySelector(".greet").innerHTML = "Good Afternoon";
  } else {
    document.querySelector(".greet").innerHTML = "Good Evening";
  }
};

const showInput = () => {
  document.querySelector(".name").classList.add("display-none");
  document.querySelector(".input").classList.remove("display-none");
  document.querySelector(".save").classList.remove("display-none");
  document.querySelector(".search").classList.add("display-none");
};

const showCityName = () => {
  document.querySelector(".name").classList.remove("display-none");
  document.querySelector(".input").classList.add("display-none");
  document.querySelector(".save").classList.add("display-none");
  document.querySelector(".search").classList.remove("display-none");
};

const getLocationIdAndWeather = (cityName, apiKey) => {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`
  )
    .then((data) => data.json())
    .then((data) => {
      if ( data.length === 0) {
        return alert('City Not Found!')
      }
      const { Key } = data[0];
      return fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${apiKey}&details=true`
      );
    })
    .then((data) => data.json())
    .then((data) => {
      document.querySelector(
        ".degree"
      ).innerHTML = `${data[0].ApparentTemperature.Metric.Value}&deg;`;
      document.querySelector(
        ".wind"
      ).innerHTML = `${data[0].Wind.Speed.Metric.Value} km/h`;
      document.querySelector(
        ".humidity"
      ).innerHTML = `${data[0].RelativeHumidity} %`;
      document.querySelector(".UVindex").innerHTML = `${data[0].UVIndex}`;
      document.querySelector(
        ".description"
      ).innerHTML = `${data[0].WeatherText}`;

      document.querySelector(
        ".mini-degree-unit"
      ).innerHTML = `${data[0].ApparentTemperature.Metric.Value}&deg;`;
      document.querySelector(
        ".mini-wind"
      ).innerHTML = `${data[0].Wind.Speed.Metric.Value} km/h`;
      document.querySelector(
        ".mini-humidity"
      ).innerHTML = `${data[0].RelativeHumidity} %`;
      document.querySelector(".mini-UV").innerHTML = `${data[0].UVIndex}`;
      document.querySelector(".mini-desc").innerHTML = `${data[0].WeatherText}`;
      document.querySelector(
        ".feellike"
      ).innerHTML = `Real-Feel : ${data[0].RealFeelTemperature.Metric.Value}&deg;`;

      document.querySelector(".input").value = "";
    });
};

const getLocationIdAndWeatherBylatlong = (lat, long,apiKey) => {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?
    apikey=c4WCfjxbWAwj3tHgZkO5zIKUrf7ZuwGw&q=${lat}%20%2C%20${long}&toplevel=true`
  )
    .then((data) => data.json())
    .then((data) => {
      if ( data.length === 0) {
        return alert('City Not Found!')
      }
      const { Key } = data[0];
      document.querySelector('.name').innerHTML =`${data[0].LocalizedName}`;
      return fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${apiKey}&details=true`
      );
    })
    .then((data) => data.json())
    .then((data) => {

      document.querySelector(
        ".degree"
      ).innerHTML = `${data[0].ApparentTemperature.Metric.Value}&deg;`;
      document.querySelector(
        ".wind"
      ).innerHTML = `${data[0].Wind.Speed.Metric.Value} km/h`;
      document.querySelector(
        ".humidity"
      ).innerHTML = `${data[0].RelativeHumidity} %`;
      document.querySelector(".UVindex").innerHTML = `${data[0].UVIndex}`;
      document.querySelector(
        ".description"
      ).innerHTML = `${data[0].WeatherText}`;

      document.querySelector(
        ".mini-degree-unit"
      ).innerHTML = `${data[0].ApparentTemperature.Metric.Value}&deg;`;
      document.querySelector(
        ".mini-wind"
      ).innerHTML = `${data[0].Wind.Speed.Metric.Value} km/h`;
      document.querySelector(
        ".mini-humidity"
      ).innerHTML = `${data[0].RelativeHumidity} %`;
      document.querySelector(".mini-UV").innerHTML = `${data[0].UVIndex}`;
      document.querySelector(".mini-desc").innerHTML = `${data[0].WeatherText}`;
      document.querySelector(
        ".feellike"
      ).innerHTML = `Real-Feel : ${data[0].RealFeelTemperature.Metric.Value}&deg;`;

      document.querySelector(".input").value = "";
    });
};

const getFiveDaysForecast = (cityName, apiKey) => {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`
  )
    .then((data) => data.json())
    .then((data) => {
      const { Key } = data[0];
      return fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${apiKey}&metric=true`
      );
    })
    .then((data) => data.json())
    .then((data) => {
      const today = dayjs();
      console.log(data);

      document.querySelector(".seven-days").innerHTML = `
      <div class="days-container">
            <div class="day">
              <p class="dayone">${today.format("ddd")}</p>
              <p>${
                data.DailyForecasts[1 - 1].Temperature.Minimum.Value
              }&deg;</p>
              <p>${
                data.DailyForecasts[1 - 1].Temperature.Maximum.Value
              }&deg;</p>
            </div>
            <div class="day">
              <p class="daytwo">${today.add(1, "day").format("ddd")}</p>
              <p>${data.DailyForecasts[1].Temperature.Minimum.Value}&deg;</p>
              <p>${data.DailyForecasts[1].Temperature.Maximum.Value}&deg;</p>
            </div>
            <div class="day">
              <p class="daythree">${today.add(2, "day").format("ddd")}</p>
              <p>${data.DailyForecasts[2].Temperature.Minimum.Value}&deg;</p>
              <p>${data.DailyForecasts[2].Temperature.Maximum.Value}&deg;</p>
            </div>
            <div class="day">
              <p class="dayfour">${today.add(3, "day").format("ddd")}</p>
              <p>${data.DailyForecasts[3].Temperature.Minimum.Value}&deg;</p>
              <p>${data.DailyForecasts[3].Temperature.Maximum.Value}&deg;</p>
            </div>
            <div class="day">
              <p class="dayfive">${today.add(4, "day").format("ddd")}</p>
              <p>${data.DailyForecasts[4].Temperature.Minimum.Value}&deg;</p>
              <p>${data.DailyForecasts[4].Temperature.Maximum.Value}&deg;</p>
            </div>
          </div>
      `;
    });
};

const getFiveDaysForecastBylatlong = (lat, long,apiKey) => {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?
    apikey=c4WCfjxbWAwj3tHgZkO5zIKUrf7ZuwGw&q=${lat}%20%2C%20${long}&toplevel=true`
  )
    .then((data) => data.json())
    .then((data) => {
      const { Key } = data[0];
      return fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${apiKey}&metric=true`
      );
    })
    .then((data) => data.json())
    .then((data) => {
      const today = dayjs();
      console.log(data);

      document.querySelector(".seven-days").innerHTML = `
      <div class="days-container">
            <div class="day">
              <p class="dayone">${today.format("ddd")}</p>
              <p>${
                data.DailyForecasts[1 - 1].Temperature.Minimum.Value
              }&deg;</p>
              <p>${
                data.DailyForecasts[1 - 1].Temperature.Maximum.Value
              }&deg;</p>
            </div>
            <div class="day">
              <p class="daytwo">${today.add(1, "day").format("ddd")}</p>
              <p>${data.DailyForecasts[1].Temperature.Minimum.Value}&deg;</p>
              <p>${data.DailyForecasts[1].Temperature.Maximum.Value}&deg;</p>
            </div>
            <div class="day">
              <p class="daythree">${today.add(2, "day").format("ddd")}</p>
              <p>${data.DailyForecasts[2].Temperature.Minimum.Value}&deg;</p>
              <p>${data.DailyForecasts[2].Temperature.Maximum.Value}&deg;</p>
            </div>
            <div class="day">
              <p class="dayfour">${today.add(3, "day").format("ddd")}</p>
              <p>${data.DailyForecasts[3].Temperature.Minimum.Value}&deg;</p>
              <p>${data.DailyForecasts[3].Temperature.Maximum.Value}&deg;</p>
            </div>
            <div class="day">
              <p class="dayfive">${today.add(4, "day").format("ddd")}</p>
              <p>${data.DailyForecasts[4].Temperature.Minimum.Value}&deg;</p>
              <p>${data.DailyForecasts[4].Temperature.Maximum.Value}&deg;</p>
            </div>
          </div>
      `;
    });
};

const getHourlyForecastBylatlong = (lat, long , apiKey) => {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?
    apikey=c4WCfjxbWAwj3tHgZkO5zIKUrf7ZuwGw&q=${lat}%20%2C%20${long}&toplevel=true`
  )
    .then((data) => data.json())
    .then((data) => {
      const { Key } = data[0];
      return fetch(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${Key}?apikey=${apiKey}&metric=true`
      );
    })
    .then((data) => data.json())
    .then((data) => {
      const today = dayjs();
      document.querySelector(
        ".hourly"
      ).innerHTML = `<div class="hourly-container">
      <div class="eachhour">
        <div class="hour">${today.add(1,'hour').format("HH")}:00</div>
        <div class="hour-temp">${data[1].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(2, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[2].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(3, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[3].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(4, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[4].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(5, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[5].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(6, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[6].Temperature.Value}&deg;</div>
      </div>
    </div>`;
    });
};

const getHourlyForecast = (cityName, apiKey) => {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`
  )
    .then((data) => data.json())
    .then((data) => {
      const { Key } = data[0];
      return fetch(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${Key}?apikey=${apiKey}&metric=true`
      );
    })
    .then((data) => data.json())
    .then((data) => {
      const today = dayjs();
      document.querySelector(
        ".hourly"
      ).innerHTML = `<div class="hourly-container">
      <div class="eachhour">
        <div class="hour">${today.add(1,'hour').format("HH")}:00</div>
        <div class="hour-temp">${data[1].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(2, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[2].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(3, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[3].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(4, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[4].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(5, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[5].Temperature.Value}&deg;</div>
      </div>
      <div class="eachhour">
        <div class="hour">${today.add(6, "hour").format("HH")}:00</div>
        <div class="hour-temp">${data[6].Temperature.Value}&deg;</div>
      </div>
    </div>`;
    });
};

window.addEventListener("load", () => {
  setTimeAndDate();
  let lat;
  let long;
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat,long)
    getLocationIdAndWeatherBylatlong(lat,long,apiKey);
    getFiveDaysForecastBylatlong(lat,long,apiKey);
    getHourlyForecastBylatlong(lat,long,apiKey);
  })
});

document.querySelector(".search").addEventListener("click", () => {
  showInput();
});

document.querySelector(".save").addEventListener("click", () => {
  showCityName();

  const name = document.querySelector(".input").value;
  const captilizedName = name.charAt(0).toUpperCase() + name.slice(1);

  document.querySelector(".name").innerHTML = captilizedName;
});

document.querySelector(".save").addEventListener("click", () => {
  const cityName = document.querySelector(".input").value;
  if ( cityName === '') {
    return alert('Enter City Name')
  }
  getLocationIdAndWeather(cityName, apiKey);
  getFiveDaysForecast(cityName, apiKey);
  getHourlyForecast(cityName, apiKey);
});

document.querySelector(".input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const cityName = document.querySelector(".input").value;
    if ( cityName === '') {
      return alert('Enter City Name')
    }
    
    getLocationIdAndWeather(cityName, apiKey);
    getFiveDaysForecast(cityName, apiKey);
    getHourlyForecast(cityName, apiKey);
    const captilizedName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    
    document.querySelector(".name").innerHTML = captilizedName;
    showCityName()
  }
});
