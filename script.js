

const Widget=document.querySelector('.left-panel');
const City=document.querySelector('.city');
const date=document.querySelector('.date');
const cityInput=document.querySelector('.city-input');
const searchBtn=document.querySelector('.search-btn');
const searchSelf=document.querySelector('.search-self');
const errText=document.querySelector('.err-txt');
const cel = document.querySelector('.cel');
const winfo = document.querySelector('.w-info');
const Temps = document.querySelector('.temps');


const WeatherApi = '78e275fc168cc37cefcc1874e932fc0d';
const revGeoApi = 'pk.0e04b54883419407702c409bb8cc71b2';

const convertKelvin=function(temp) {
    const number = parseFloat(temp);
    return number - 273.15;
};

const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const today = new Date();  


const getCityWeather = async function(input) {
    errText.textContent = '';
    date.textContent = today.toLocaleDateString('en-UK', dateOptions);
    try {
        const base = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${WeatherApi}`; 
        const data = await fetch(base);
        if (data.status === 404) throw new Error('Invalid City');
        var dat = await data.json();
        //console.log(dat);

        Widget.style.display="block";
        document.querySelector(".humidity").innerHTML= dat.main.humidity + "%";
        document.querySelector(".wind").innerHTML = dat.wind.speed + "km/h";
        City.textContent = dat.name + ', ' + dat.sys['country'];
        cel.textContent = Math.floor(convertKelvin(dat.main['temp']));
        winfo.textContent = dat.weather[0]['description'];


        if (data.weather[0].main=="Clouds") {
            body_img.src='cloud.png'
        }
         else if (data.weather[0].main=='Clear') {
            body_img.src='clear.png'
        }
        else if (data.weather[0].main=='Rain') {
            body_img.src='rain.png'
        }
        else if (data.weather[0].main=='Drizzle') {
            body_img.src='drizzle.png'
        }
        else if (data.weather[0].main=='Mist') {
            body_img.src='mist.png'
        }
        else if (data.weather[0].main=='Haze') {
            body_img.src='haze.png'
        }
    

    }
    catch (err) { 
        errText.textContent = err.message;
    }
};

searchBtn.addEventListener('click',function(){
    const cityQuery =cityInput.value;

    getCityWeather(cityQuery);
});

cityInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      // console.log('enter pressed');
      searchBtn.click();
    }
  });
  
  const reverseGeo = async function (lat, lon) {
    //   console.log(lat, lon);
    const revgeo = `https://us1.locationiq.com/v1/reverse.php?key=${revGeoApi}&lat=${lat}&lon=${lon}&format=json`;
    console.log(revgeo);
    const res = await fetch(revgeo);
    const datas = await res.json();
    const town = datas.address.town;
    console.log(datas);
    getCityWeather(town);
  };
  
  searchSelf.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(pos => {
      cityInput.value = '';
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      reverseGeo(lat, lon);
    });
  });



