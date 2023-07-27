// API credentials
const apiKey = 'fdd866ab888116ae211293e5a329e01d&units=imperial';

// Function to make a GET request to the server endpoint
async function fetchServerData() {
  const response = await fetch('/data');
  const data = await response.json();
  return data;
}

// Function to make a POST request to the server endpoint
async function postDataToServer(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData); // Optionally log the response from the server
    return newData;
  } catch (error) {
    console.log('Error posting data to server:', error);
  }
}

// Function to update the UI with the weather information
function updateWeatherUI(weatherData) {
  const temperatureElement = document.getElementById('temperature');
  const dateElement = document.getElementById('date');
  const userResponseElement = document.getElementById('user-response');

  temperatureElement.textContent = `Temperature: ${weatherData.main.temp} °F`;
  dateElement.textContent = `Date: ${new Date().toLocaleDateString()}`;
  userResponseElement.textContent = `User Response: ${getUserResponse()}`;
}

// Function to get user input from a form (you can customize this based on your UI)
function getUserResponse() {
  // For example, if you have a form with an input field with id "user-input"
  const userInput = document.getElementById('zip').value;
  return userInput;
}

// Event listener for the button click
const button = document.getElementById('generate');
button.addEventListener('click', async () => {
  const zipCode = getUserResponse(); // Get user input (zip code)

  // Fetch weather data from the OpenWeatherMap API
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;
  const weatherData = await fetch(url).then(response => response.json());

  // Fetch data from the server endpoint
  const serverData = await fetchServerData();

  // Combine API data and user response to send to the server endpoint
  const dataToSend = {
    temperature: weatherData.main.temp,
    date: new Date().toLocaleDateString(),
    userResponse: getUserResponse(),
    ...serverData, // Optionally include existing data from the server
  };

  // POST data to the server endpoint
  const postUrl = '/data';
  postDataToServer(postUrl, dataToSend);

  // Update the UI with the fetched data
  updateWeatherUI(weatherData);
});

// Function to GET Project Data and update the UI
const retrieveData = async () => {
  const request = await fetch('/data');
  try {
    const allData = await request.json();
    console.log(allData);

    // Update existing DOM elements with the fetched data
    document.getElementById('temperature').innerHTML = `Temperature: ${Math.round(allData.temperature)} °F`;
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('user-response').innerHTML = `User Response: ${allData.userResponse}`;
  } catch (error) {
    console.log('Error fetching project data:', error);
    // Handle the error accordingly
  }
};

// Call retrieveData to update the UI with the initial data
retrieveData();
