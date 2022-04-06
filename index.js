const ApiKey = `ee1acb6433cc02ae271c36476be1234a`;

// spinner js
function spinnerControl(remove, add) {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove(remove);
  spinner.classList.add(add);
}

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const callError = num => {
  const error = document.getElementById('error');
  let div = document.createElement('div');
  div.classList.add('error-div');
  if (num == 1) {
    div.innerHTML = `
            <p>No data found. Enter a proper name</p>
            <video class="mt-3" src="vid/yt1s.com - Carregando 99   Error  Gato Gif XD XD XD_360p.mp4"
            autoplay loop muted></video>
        `
  }
  error.appendChild(div);
}
const getResult = async () => {
  spinnerControl("d-none", "d-block");
  const searchText = ((document.getElementById('search-input')).value).toLowerCase();
  const clearSearchText = document.getElementById('search-input');
  clearSearchText.value = "";
  const error = document.getElementById('error');
  error.innerHTML = "";

  const showMoreDay = document.getElementById('show-more-day');
  showMoreDay.innerHTML = "";

  const dataShow = document.getElementById('show-more');
  dataShow.innerHTML = "";

  const showMoreBtn = document.getElementById('show-more-btn');
  showMoreBtn.innerHTML = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${ApiKey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    showResult(data);
  }
  catch (error) {
    callError(1);
  }
}

const showResult = data => {
  // console.log(data);
  spinnerControl("d-block", "d-none");
  console.log(data);
  const showResultDiv = document.getElementById('show-result');
  showResultDiv.innerHTML = "";
  let div = document.createElement('div');
  let icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  console.log(icon);
  var d = new Date(data.dt * 1000);
  var dayName = days[d.getDay()];
  console.log(dayName);
  div.classList.add('showResultDiv');
  div.innerHTML = `
        <p><span class="data-values">${data.name}</span></p>
        <p><span class="data-values">${dayName}</span></p>  
        <img src="${icon}">
        <p><span class="data-values">${data.weather[0].main}</span></p>
        <p>Temp: <span class="data-values">${data.main.temp}°C</span></p>
        <p>Feels Like: <span class="data-values">${data.main.feels_like}°C</span></p>
        <p>Min Temp: <span class="data-values">${data.main.temp_min}°C</span> & Max Temp: <span class="data-values">${data.main.temp_max}°C</span></p>
        <p>Humidity: <span class="data-values">${data.main.humidity}</span></p>
        <p>Wind Speed: <span class="data-values">${data.wind.speed}</span></p>
    `
  showResultDiv.appendChild(div);

  const showMoreBtn = document.getElementById('show-more-btn');
  showMoreBtn.innerHTML = "";
  let div1 = document.createElement('div');
  div1.classList.add('showMoreBtnDiv');
  div1.innerHTML = `
    <button id="button-33" class="mx-auto" onClick="showMoreFunction(${data.coord.lat}, ${data.coord.lon})">Show More</button>
    `
  showMoreBtn.appendChild(div1);
}

const showMoreFunction = async (lat, lon) => {
  console.log(lat, lon);
  const url_hourly = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${ApiKey}&units=metric`;
  const res = await fetch(url_hourly);
  const data = await res.json();
  showMore(data);
}

const showMore = async data => {
  console.log(data);
  const url_hours = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${data.lat}&lon=${data.lon}&dt=${data.current.dt}&appid=${ApiKey}&units=metric`
  const res = await fetch(url_hours);
  const daata = await res.json();

  const url_5days = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${ApiKey}&units=metric`

  const res1 = await fetch(url_5days);
  const daaata = await res1.json();
  showData(daata, daaata);
}

const showData = (data, data5) => {
  const showMoreBtn = document.getElementById('show-more-btn');
  showMoreBtn.innerHTML = "";

  console.log(data);
  const dataShow = document.getElementById('show-more');
  dataShow.innerHTML = "";
  let div = document.createElement('div');
  div.classList.add('showMorediv');
  div.innerHTML = `
  <p class="mt-5 d-flex justify-content-center forecast-heading">Hourly Forecast</p>
  <div id="caroseldiv" class="col-sm-12 col-md-12 col-lg-9 mx-auto">
    <div id="carouselExampleCaptions1" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="d-flex justify-content-center">
            <div class="row g-3">
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data.hourly[0].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data.hourly[0].temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data.hourly[0].feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data.hourly[0].humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data.hourly[0].wind_speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data.hourly[1].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data.hourly[1].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data.hourly[1].temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data.hourly[1].feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data.hourly[1].humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data.hourly[1].wind_speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data.hourly[2].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data.hourly[2].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data.hourly[2].temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data.hourly[2].feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data.hourly[2].humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data.hourly[2].wind_speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data.hourly[3].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data.hourly[3].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data.hourly[3].temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data.hourly[3].feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data.hourly[3].humidity}</span> </p>
                   <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data.hourly[3].wind_speed}</span> </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="d-flex justify-content-center">
            <div class="row g-3">
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data.hourly[4].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data.hourly[4].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data.hourly[4].temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data.hourly[4].feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data.hourly[4].humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data.hourly[4].wind_speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data.hourly[5].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data.hourly[5].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data.hourly[5].temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data.hourly[5].feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data.hourly[5].humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data.hourly[5].wind_speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data.hourly[6].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data.hourly[6].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data.hourly[6].temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data.hourly[6].feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data.hourly[6].humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data.hourly[6].wind_speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data.hourly[7].weather[0].icon}@2x.png">
                      <p class="card-title text-center"><span class="data-values-carosel">${data.hourly[7].weather[0].description}</span> </p>
                      <p class="card-title text-center">Temp: <span class="data-values-carosel">${data.hourly[7].temp}</span> </p>
                      <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data.hourly[7].feels_like}</span> </p>
                      <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data.hourly[7].humidity}</span> </p>
                      <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data.hourly[7].wind_speed}</span> </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions1"
        data-bs-slide="prev">
          <span class="carousel-control-prev-icon me-auto d-flex" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions1"
        data-bs-slide="next">
          <span class="carousel-control-next-icon ms-auto" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    `
  dataShow.appendChild(div);

  console.log(data5);
  const showMoreDay = document.getElementById('show-more-day');
  var d1 = new Date(data5.list[1].dt * 1000);
  var d2 = new Date(data5.list[8].dt * 1000);
  var dayName1 = days[d1.getDay()];
  var dayName2 = days[d2.getDay()];
  console.log(dayName1);
  console.log(dayName2);
  showMoreDay.innerHTML = "";
  let div1 = document.createElement('div');
  div1.classList.add('showMorediv');
  div1.innerHTML = `
  <p class="mt-5 d-flex justify-content-center forecast-heading">2 Days Forecast</p>
  <div id="caroseldiv" class="col-sm-12 col-md-12 col-lg-9 mx-auto">
    <div id="carouselExampleCaptions2" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="d-flex justify-content-center flex-column">
            <p class="mt-5 d-flex justify-content-center forecast-heading-carosel">${dayName1} with 8 hours forecast</p>
            <div class="row g-3">
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[0].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data5.list[0].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[0].main.temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[0].main.feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[0].main.humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[0].wind.speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[1].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data5.list[1].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[1].main.temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[1].main.feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[1].main.humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[1].wind.speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[2].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data5.list[2].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[2].main.temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[2].main.feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[2].main.humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[2].wind.speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[3].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data5.list[3].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[3].main.temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[3].main.feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[3].main.humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[3].wind.speed}</span> </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-3">
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[4].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data5.list[4].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[4].main.temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[4].main.feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[4].main.humidity}</span> </p>
                   <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[4].wind.speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[5].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data5.list[5].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[5].main.temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[5].main.feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[5].main.humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[5].wind.speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[6].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data5.list[6].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[6].main.temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[6].main.feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[6].main.humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[6].wind.speed}</span> </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
                <div class="card mx-auto" style="width: 18rem;">
                  <div class="card-body">
                    <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[7].weather[0].icon}@2x.png">
                    <p class="card-title text-center"><span class="data-values-carosel">${data5.list[7].weather[0].description}</span> </p>
                    <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[7].main.temp}</span> </p>
                    <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[7].main.feels_like}</span> </p>
                    <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[7].main.humidity}</span> </p>
                    <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[7].wind.speed}</span> </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="d-flex justify-content-center flex-column">
          <p class="mt-5 d-flex justify-content-center forecast-heading-carosel">${dayName2} with 8 hours forcast</p>
          <div class="row g-3">
          <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
          <div class="card mx-auto" style="width: 18rem;">
            <div class="card-body">
              <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[8].weather[0].icon}@2x.png">
              <p class="card-title text-center"><span class="data-values-carosel">${data5.list[8].weather[0].description}</span> </p>
              <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[8].main.temp}</span> </p>
              <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[8].main.feels_like}</span> </p>
              <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[8].main.humidity}</span> </p>
             <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[8].wind.speed}</span> </p>
            </div>
          </div>
        </div>
            <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
              <div class="card mx-auto" style="width: 18rem;">
                <div class="card-body">
                  <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[9].weather[0].icon}@2x.png">
                  <p class="card-title text-center"><span class="data-values-carosel">${data5.list[9].weather[0].description}</  span> </p>
                  <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[9].main.temp}</span> </p>
                  <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[9].main.feels_like}</  span> </p>
                  <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[9].main.humidity}</  span> </p>
                  <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[9].wind.speed}</  span> </p>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
              <div class="card mx-auto" style="width: 18rem;">
                <div class="card-body">
                  <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[10].weather[0].icon}@2x.png">
                  <p class="card-title text-center"><span class="data-values-carosel">${data5.list[10].weather[0].description}</  span> </p>
                  <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[10].main.temp}</span> </p>
                  <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[10].main.feels_like}</  span> </p>
                  <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[10].main.humidity}</  span> </p>
                  <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[10].wind.speed}</  span> </p>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
              <div class="card mx-auto" style="width: 18rem;">
                <div class="card-body">
                  <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[11].weather[0].icon}@2x.png">
                  <p class="card-title text-center"><span class="data-values-carosel">${data5.list[11].weather[0].description}</  span> </p>
                  <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[11].main.temp}</span> </p>
                  <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[11].main.feels_like}</  span> </p>
                  <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[11].main.humidity}</  span> </p>
                  <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[11].wind.speed}</  span> </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row g-3">
            <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
              <div class="card mx-auto" style="width: 18rem;">
                <div class="card-body">
                  <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[12].weather[0].icon}@2x.png">
                  <p class="card-title text-center"><span class="data-values-carosel">${data5.list[12].weather[0].description}</  span> </p>
                  <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[12].main.temp}</span> </p>
                  <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[12].main.feels_like}</  span> </p>
                  <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[12].main.humidity}</  span> </p>
                 <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[12].wind.speed}</ span> </p>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
              <div class="card mx-auto" style="width: 18rem;">
                <div class="card-body">
                  <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[13].weather[0].icon}@2x.png">
                  <p class="card-title text-center"><span class="data-values-carosel">${data5.list[13].weather[0].description}</  span> </p>
                  <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[13].main.temp}</span> </p>
                  <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[13].main.feels_like}</  span> </p>
                  <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[13].main.humidity}</  span> </p>
                  <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[13].wind.speed}</  span> </p>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
              <div class="card mx-auto" style="width: 18rem;">
                <div class="card-body">
                  <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[14].weather[0].icon}@2x.png">
                  <p class="card-title text-center"><span class="data-values-carosel">${data5.list[14].weather[0].description}</  span> </p>
                  <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[14].main.temp}</span> </p>
                  <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[14].main.feels_like}</  span> </p>
                  <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[14].main.humidity}</  span> </p>
                  <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[14].wind.speed}</  span> </p>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 sec-3-col2">
              <div class="card mx-auto" style="width: 18rem;">
                <div class="card-body">
                  <img class="mx-auto d-flex" src="http://openweathermap.org/img/wn/${data5.list[15].weather[0].icon}@2x.png">
                  <p class="card-title text-center"><span class="data-values-carosel">${data5.list[15].weather[0].description}</  span> </p>
                  <p class="card-title text-center">Temp: <span class="data-values-carosel">${data5.list[15].main.temp}</span> </p>
                  <p class="card-title text-center">Feels Like: <span class="data-values-carosel">${data5.list[15].main.feels_like}</  span> </p>
                  <p class="card-title text-center">Humidity: <span class="data-values-carosel">${data5.list[15].main.humidity}</  span> </p>
                  <p class="card-title text-center">Wind Speed: <span class="data-values-carosel">${data5.list[15].wind.
      speed}</  span> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions2"
      data-bs-slide="prev">
        <span class="carousel-control-prev-icon me-auto d-flex" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions2"
      data-bs-slide="next">
        <span class="carousel-control-next-icon ms-auto" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
`
  showMoreDay.appendChild(div1);
}
