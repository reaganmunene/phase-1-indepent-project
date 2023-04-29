const form = document.querySelector('form');
const errorDiv = document.querySelector('.error');
const errorText = document.querySelector('.error-text');
const input = document.querySelector('input');

document.addEventListener('DOMContentLoaded', async () => {
  const data = await httpHandler(false);
  bindElements(data);
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const ipaddress = input.value;

  if (ipaddress.trim() === '') {
    displayError('Enter a valid IP address');
    return;
  }

  const data = await httpHandler(true, ipaddress);
  if (!data) {
    return;
  }
  bindElements(data);
  input.value = '';
});

document.querySelector('.reset-btn').addEventListener('click', async () => {
  const data = await httpHandler(false);
  bindElements(data);
});

function bindElements(data) {
  document.querySelector('#ip-address').textContent = data.ip;
  document.querySelector('#isp').textContent = data.connection.isp;
  document.querySelector('#country').textContent = data.location.country.name;
  document.querySelector('#city').textContent = data.location.city.name;
  renderMap(data.location.latitude, data.location.longitude);
}

function renderMap(lat, lng) {
  document.getElementById('map-container').innerHTML =
    "<div id='map' style='width: 100%; height: 100%;'></div>";
  var map = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  var marker = L.marker([lat, lng]).addTo(map);
  var circle = L.circle([lat, lng], {
    color: '#f87171',
    fillColor: '#fca5a5',
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
}

function displayError(message) {
  errorDiv.classList.add('show');
  errorText.textContent = message;

  setTimeout(() => {
    errorDiv.classList.remove('show');
  }, 3000);
}

async function httpHandler(isSearch, ipaddress = '') {
  let url = '';
  if (isSearch) {
    url = `https://api.ipbase.com/v2/info?ip=${ipaddress}&apikey=TvFfKg0Xj2lparECBfEZ5pjwrU7yMu6RoafBHohv`;
  } else {
    url =
      'https://api.ipbase.com/v2/info?apikey=TvFfKg0Xj2lparECBfEZ5pjwrU7yMu6RoafBHohv';
  }

  const response = await fetch(url);
  const { data } = await response.json();
  if (!response.ok) {
    displayError('The ip must be a valid IP address.');
    return;
  }
  return data;
}
  