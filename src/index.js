fetch('https://raw.githubusercontent.com/reaganmunene/phase-1-indepent-project/main/src/db.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

fetch('https://raw.githubusercontent.com/reaganmunene/phase-1-indepent-project/main/src/db.json')
  .then(response => response.json())
  .then(data => {
    // Get an array of all the cities in the JSON data
    const cities = Object.keys(data);

    // Loop through each city and fetch its hotel details
    cities.forEach(city => {
      const Hotels = data[city].destinations;
      console.log(`Hotels in ${city}:`, destinations);
    });
  })
  .catch(error => console.error(error));
