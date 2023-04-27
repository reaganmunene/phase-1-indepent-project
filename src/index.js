fetch('https://raw.githubusercontent.com/reaganmunene/phase-1-indepent-project/main/src/db.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

  async function getData() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/reaganmunene/phase-1-indepent-project/main/src/db.json');
      const data = await response.json();
  
      // Loop through the destinations array and display each city and its hotels
      data.destinations.forEach(destination => {
        const city = destination.city;
        const hotels = destination.hotels;
  
        // Create an HTML element for the city and append it to the body
        const cityEl = document.createElement('h2');
        cityEl.textContent = city;
        document.body.appendChild(cityEl);
  
        // Loop through the hotels array and display each hotel's name, rating, and image
        hotels.forEach(hotel => {
          const name = hotel.name;
          const rating = hotel.rating;
          const img = hotel.img;
  
          // Create an HTML element for the hotel and append it to the body
          const hotelEl = document.createElement('div');
          hotelEl.innerHTML = `
            <h3>${name}</h3>
            <p>Rating: ${rating}</p>
            <img src="${img}" alt="${name}">
          `;
          document.body.appendChild(hotelEl);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  getData();