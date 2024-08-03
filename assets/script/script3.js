// Function to get a cookie value by its name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to extract place ID from the URL
function getPlaceIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const placeId = params.get('place_id');
    if (!placeId) {
        console.error('Place ID not found in URL');
    }
    return placeId;
}

// Function to check user authentication and fetch place details
function checkAuthentication() {
    const token = getCookie('token');
    const addReviewSection = document.getElementById('add-review');
    const placeId = getPlaceIdFromURL();

    if (!placeId) {
        console.error('Place ID is missing');
        return;
    }

    if (!token) {
        const loginLink = document.getElementById('login-link');
        loginLink.style.display = 'block';
        addReviewSection.style.display = 'none';
    } else {
        const loginLink = document.getElementById('login-link');
        loginLink.style.display = 'none';
        addReviewSection.style.display = 'block';
        fetchPlaceDetails(token, placeId);
    }
}

// Function to fetch place details from the API
async function fetchPlaceDetails(token, placeId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/places/${placeId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const place = await response.json();
            displayPlaceDetails(place);
            fetchReviews(token, placeId);
        } else {
            console.error('Failed to fetch place details:', response.statusText);
            console.error('Response status:', response.status);
            console.error('Response URL:', response.url);
        }
    } catch (error) {
        console.error('Error fetching place details:', error);
    }
}

// Function to display place details
function displayPlaceDetails(place) {
    const placeDetails = document.getElementById('place-details');
    placeDetails.innerHTML = `
        <h1>${place.name}</h1>
        <div class="place-detail">
            <div class="data-column">
                <h5>Host:</h5>
                <p>${place.host_id}</p>
            </div>
            <div class="data-column">
                <h5>Price Per Night:</h5>
                <p>$${place.price_per_night}</p>
            </div>
            <div class="data-column">
                <h5>Location:</h5>
                <p>${place.address}, ${place.city_id}</p>
            </div>
            <div class="data-column">
                <h5>Description:</h5>
                <p>${place.description}</p>
            </div>
            <div class="data-column">
                <h5>Amenities:</h5>
                <p>${place.amenity_ids.join(', ')}</p>
            </div>
        </div>
    `;
}

// Function to fetch reviews for the place
async function fetchReviews(token, placeId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/places/${placeId}/reviews`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const reviews = await response.json();
            displayReviews(reviews);
        } else {
            console.error('Failed to fetch reviews:', response.statusText);
            console.error('Response status:', response.status);
            console.error('Response URL:', response.url);
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

// Function to display reviews
function displayReviews(reviews) {
    const reviewsSection = document.getElementById('reviews');
    reviewsSection.innerHTML = reviews.map(review => `
        <div class="review-card">
            <h3>User ${review.user_id}:</h3>
            <p>${review.comment}</p>
            <h3>Rating:</h3>
            <p>${review.rating} stars</p>
        </div>
    `).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', checkAuthentication);
