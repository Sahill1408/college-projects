async function getWeather() {
    const locationInput = document.getElementById('location');
    const location = locationInput.value;
    const apiKey = '6ce665a4d6b84d5d271bd5b8c306f12c'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.cod === 200) {
        const locationName = document.getElementById('location-name');
        const temperature = document.getElementById('temperature');
        const weatherDescription = document.getElementById('weather-description');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('wind-speed');
        const weatherIcon = document.getElementById('weather-icon');
  
        locationName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        weatherDescription.textContent = `Weather: ${data.weather[0].main}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        if (data.weather[0].icon) {
          const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
          weatherIcon.src = iconUrl;
          weatherIcon.alt = data.weather[0].description;
          weatherIcon.style.display = 'inline'; 
        } else {
          weatherIcon.style.display = 'none'; 
        }
  
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.classList.remove('hidden'); 
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      const weatherInfo = document.getElementById('weather-info');
      weatherInfo.classList.add('hidden'); 
      alert('Failed to fetch weather data. Please try again.');
    }
  }
  
  document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    getWeather();
  });
  