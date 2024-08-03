document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    document.getElementById('country-filter').addEventListener('change', filterPlacesByCountry);
});

function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
}

function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');

    if (!token) {
        loginLink.style.display = 'block';
    } else {
        loginLink.style.display = 'none';
        fetchPlaces(token);
    }
}

async function fetchPlaces(token) {
    try {
        const response = await fetch('http://127.0.0.1:5000/places', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const places = await response.json();
            console.log('Fetched places:', places); // Debug: log fetched places data
            displayPlaces(places);
            populateCountryFilter(places);
        } else {
            console.error('Failed to fetch places:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

function displayPlaces(places) {
    const placesList = document.getElementById('places-list');
    placesList.innerHTML = '';

    places.forEach(place => {
        console.log('Place object:', place); // Debug: log place object

        const placeCard = document.createElement('div');
        placeCard.classList.add('card');

        // Fetch city and country information dynamically (assuming you have endpoints for these)
        // You can modify the code if you have the city and country data already in the place object
        const city = getCityNameById(place.city_id); // Implement this function according to your setup
        const country = 'Country Name'; // Replace with static or fetched country name if needed

        placeCard.innerHTML = `
            <h2>${place.name}</h2>
            <p>Price per night: $${place.price_per_night}</p>
            <p>Location: ${city}, ${country}</p>
            <p>Number of rooms: ${place.number_of_rooms}</p>
            <p>Number of bathrooms: ${place.number_of_bathrooms}</p>
            <p>Max guests: ${place.max_guests}</p>
            <a href="places.html?place_id=${place.id}" class="card-button">View Details</a>
        `;

        placesList.appendChild(placeCard);
    });
}

function populateCountryFilter(places) {
    const countryFilter = document.getElementById('country-filter');
    const countries = [...new Set(places.map(place => 'Country Name'))]; // Replace with actual country names if available

    countryFilter.innerHTML = '<option value="">Select a country</option>'; // Add default option

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryFilter.appendChild(option);
    });
}

function filterPlacesByCountry(event) {
    const selectedCountry = event.target.value;
    const placeCards = document.querySelectorAll('#places-list .card');

    placeCards.forEach(card => {
        const location = card.querySelector('p:nth-child(4)').textContent;
        if (location.includes(selectedCountry) || selectedCountry === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

async function getCityNameById(city_id) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/cities/${city_id}`);
        if (response.ok) {
            const city = await response.json();
            return city.name; // Adjust according to your API response
        } else {
            console.error('Failed to fetch city:', response.statusText);
            return 'Unknown City';
        }
    } catch (error) {
        console.error('Error fetching city:', error);
        return 'Unknown City';
    }
}
