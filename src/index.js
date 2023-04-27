const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/116545/time';



async function getCityTime(cityName) {
	const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityName}&limit=1`;
	const options = {
	  method: "GET",
	  headers: {
		"X-RapidAPI-Key": "176292f381mshd6f13728b6fc08ep19c054jsn89063ef17c83",
		"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
	  },
	};
  
	try {
	  const response = await fetch(url, options);
	  const data = await response.json();
  
	  if (!data.data.length) {
		throw new Error("City not found");
	  }
  
	  const city = data.data[0];
  
	  const { latitude, longitude } = city.coordinates;
  
	  const timeUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${city.id}/time`;
	  const timeResponse = await fetch(timeUrl, options);
	  const timeData = await timeResponse.json();
  
	  const cityTime = new Date(timeData.data.time);
  
	  if (isNaN(cityTime)) {
		throw new Error("Invalid date");
	  }
  
	  return cityTime;
	} catch (error) {
	  console.error(error);
	  return null;
	}
  }
  
  

// call the async function when the button is clicked
document.getElementById('get-time-btn').addEventListener('click', getCityTime);


/*document.getElementById('get-time-button').addEventListener('click', getCityTime);
try {
	const response = await fetch(url, options);
	const result = await response.json();
	if (!result.data || !result.data.time) {
	  throw new Error('Invalid response from server');
	}
	const cityTime = new Date(result.data.time);
	document.getElementById('city-time').textContent = `The current time in ${result.data.city} is ${cityTime.toLocaleTimeString()}.`;
  } catch (error) {
	console.error(error);
	document.getElementById('city-time').textContent = 'An error occurred while fetching the city time. Please try again later.';
  }
  





/*const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/%7Bcityid%7D/time';
const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': '176292f381mshd6f13728b6fc08ep19c054jsn89063ef17c83',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}*/ // => most recent code



/*
// First, fetch the API endpoint and get the data in JSON format
fetch('https://api.opentripmap.com/0.1/en/places/radius', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    radius: 5000, // the search radius in meters
    lon: 2.3522, // longitude of the center point of the search
    lat: 48.8566, // latitude of the center point of the search
    format: 'json',
    limit: 10, // the maximum number of results to return
    apikey: 'your_api_key_here' // replace with your actual API key
  })
})
.then(response => response.json())
.then(data => {
  // Do something with the data, such as display it on your website
  console.log(data)
})
.catch(error => console.error(error))
*/
