const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const searchButton = document.querySelector("#search-location");
const currentLocationButton = document.querySelector("#currentLocation");
const locationForm = document.querySelector('current-location-button')
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const messageThree = document.getElementById("message-3");
const messageFour = document.getElementById("message-4");
const messageFive = document.getElementById("message-5");
var lat, long;

function submit() {
 document.querySelector("#search-input-location").reset();
}

const loading = () => {
  messageOne.textContent = "Loading Forecast.....";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  messageFour.textContent = "";
  messageFive.textContent = "";
};

const showForecast = response => {
  response.json().then(data => {
    if (data.error) {
      messageOne.textContent = data.error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast.summary;
      messageThree.textContent = data.forecast.minTemperature;
      messageFour.textContent = data.forecast.maxTemperature;
      messageFive.textContent = data.forecast.rainProbability;
    }
  });
};

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  searchButton.setAttribute("disabled", "disabled");
  const location = search.value;

  // fetch is browser based function, it is not a javascript func

  loading();

  fetch("/weather?address=" + location).then(response => {
    showForecast(response);
    searchButton.removeAttribute("disabled");
  });
  console.log("testing");
});

currentLocationButton.addEventListener("click", e => {
  e.preventDefault();
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  searchButton.setAttribute("disabled", "disabled");
  currentLocationButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    // fetch is browser based function, it is not a javascript func

    loading();

    fetch(`/weather?lat=${lat}&long=${long}`).then(response => {
      showForecast(response);
      searchButton.removeAttribute("disabled");
      currentLocationButton.removeAttribute("disabled");
    });
    console.log("testing");
  });
});
