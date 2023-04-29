const form = document.querySelector('form');
const errorDiv = document.querySelector('.error');
const errorText = document.querySelector('.error-text');
const input = document.querySelector('input');

form.addEventListener('submit', e => {
  e.preventDefault();
  const ipaddress = input.value;

  if (ipaddress.trim() === '') {
    displayError('Enter a valid IP address');
    return;
  }

  console.log('first');
  httpHandler(false);
});

function renderMap() {
  var map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  var marker = L.marker([51.5, -0.09]).addTo(map);
  var circle = L.circle([51.5, -0.09], {
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
  return data;
}

renderMap();
