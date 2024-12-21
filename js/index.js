// api key
// b4b79a462d5f49c6808222311241012

// request url
// https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=b4b79a462d5f49c6808222311241012


// http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=cairo&days=3



let searchInput = document.getElementById('findLocation');

searchInput.addEventListener('input', function (eventInfo) {
    getData(eventInfo.target.value);
})

async function getData(city) {
    if (city.length > 2) {
        let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=b4b79a462d5f49c6808222311241012`);

        let data = await result.json(); 
        console.log(data);
        displayData(data);
    }
}



function displayData(data) {
    // Today
    let date = new Date(data.current.last_updated);

    let todayName = document.getElementById('todayName');
    todayName.innerHTML = date.toLocaleString('en-us', { weekday: 'long' });

    let todayDate = document.getElementById('todayDate');
    todayDate.innerHTML = `${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })}`;

    let city = document.getElementById('city');
    city.innerHTML = data.location.name;

    let temp = document.getElementById('temperature');
    temp.innerHTML = data.current.temp_c + '<sup>o</sup>C';
    
    let tempIcon = document.getElementById('tempIcon');
    tempIcon.src = `${data.current.condition.icon}`;

    let tempText = document.getElementById('tempText');
    tempText.innerHTML = data.current.condition.text;

    let humidity = document.getElementById('humidity');
    humidity.innerHTML = ' ' + data.current.humidity + '%';
    
    let windSpeed = document.getElementById('wind-speed');
    windSpeed.innerHTML = ' ' + data.current.wind_kph + ' km/h';
    
    let windDirection = document.getElementById('wind-direction');
    windDirection.innerHTML = ' ' + data.current.wind_dir;

    // next two days
    let htmlCode = '';
    let nextDaysCard = document.querySelectorAll('#nextDaysCard');
    for (let i = 1; i < data.forecast.forecastday.length; i++){
      
        let nextDaysDate = new Date(data.forecast.forecastday[i].date);   
        
        htmlCode = `    
        <h5 class = 'nextDayName text-center position-absolute top-0 start-0 end-0 mt-1' id="todayName">${nextDaysDate.toLocaleString('en-us', {weekday:'long'})}</h5>
            <img class = "mx-auto" src = ${data.forecast.forecastday[i].day.condition.icon}></img>
            <h3 id = "nextMaxTemp" class="mt-4">${data.forecast.forecastday[i].day.maxtemp_c} <sup>o</sup>C</h3>
            <h5 id = "nextMinTemp" class="text-secondary mt-2">${data.forecast.forecastday[i].day.mintemp_c} <sup>o</sup>C</h5>
            <span id="nextTempText" class="mt-4">${data.forecast.forecastday[i].day.condition.text}</span>
        `
        nextDaysCard[i-1].innerHTML = htmlCode;
    }
    
}
