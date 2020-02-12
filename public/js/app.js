const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const searchButton = document.querySelector("#search-location");
const sendLocationButton = document.querySelector("#send-location");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const messageThree = document.getElementById("message-3");
const messageFour = document.getElementById("message-4");
const messageFive = document.getElementById("message-5");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
    searchButton.setAttribute('disabled', 'disabled');
    const location = search.value;

  // fetch is browser based function, it is not a javascript func

  messageOne.textContent = "Loading Forecast.....";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  messageFour.textContent = "";
  messageFive.textContent = "";

  fetch("/weather?address=" + location).then(response => {
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
    searchButton.removeAttribute('disabled');
  });

  console.log("testing");
});


