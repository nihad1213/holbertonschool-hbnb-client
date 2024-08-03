# HBnB Evolution Project: Part 3 - Front-end Web Development

## Overview

This project involves developing the front-end of the HBnB application using HTML5, CSS3, and JavaScript ES6. The main tasks include designing the UI, implementing client-side functionality to interact with the back-end API, and managing user sessions.

## Objectives

- Develop a user-friendly interface following provided design specifications.
- Implement client-side functionality to interact with the back-end API.
- Ensure secure and efficient data handling using JavaScript.
- Apply modern web development practices to create a dynamic web application.

## Setup

Clone the repository:
```bash
git clone https://github.com/yourusername/holbertonschool-hbnb-client.git
cd holbertonschool-hbnb-client
```
## Task 0: Design
Complete the provided HTML and CSS files to match the design specifications.
## Task 1: Implementation - Login

Add event listener for the login form:
```bash
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            // Handle form submission
        });
    }
});
```
Make the AJAX request to the API:
```bash
async function loginUser(email, password) {
    const response = await fetch('https://your-api-url/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    // Handle the response
}
```
Handle the API response and store the token in a cookie:
```bash
if (response.ok) {
    const data = await response.json();
    document.cookie = `token=${data.access_token}; path=/`;
    window.location.href = 'index.html';
} else {
    alert('Login failed: ' + response.statusText);
}
```

## Task 2
Check user authentication:
```bash
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
function getCookie(name) {
    // Function to get a cookie value by its name
}
```
Fetch places data:
```bash
async function fetchPlaces(token) {
    const response = await fetch('https://your-api-url/places', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const places = await response.json();
    displayPlaces(places);
}
```
Populate places list:
```bash
function displayPlaces(places) {
    const placesList = document.getElementById('places-list');
    placesList.innerHTML = '';
    places.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.className = 'place-card';
        placeCard.innerHTML = `
            <img src="${place.image_url}" class="place-image">
            <h2>${place.name}</h2>
            <p>${place.price_per_night}</p>
            <p>${place.location}</p>
            <button class="details-button">View Details</button>
        `;
        placesList.appendChild(placeCard);
    });
}
````
Implement client-side filtering:
```bash
document.getElementById('country-filter').addEventListener('change', (event) => {
    const selectedCountry = event.target.value;
    const places = document.querySelectorAll('.place-card');
    places.forEach(place => {
        if (place.dataset.country === selectedCountry || selectedCountry === 'all') {
            place.style.display = 'block';
        } else {
            place.style.display = 'none';
        }
    });
});
```
## Task 3: Implementation - Place Details
Get place ID from URL:
```bash
function getPlaceIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
```
Fetch place details:
```bash
async function fetchPlaceDetails(token, placeId) {
    const response = await fetch(`https://your-api-url/places/${placeId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const place = await response.json();
    displayPlaceDetails(place);
}
```
Display place details:
```bash
function displayPlaceDetails(place) {
    const placeDetails = document.getElementById('place-details');
    placeDetails.innerHTML = `
        <img src="${place.image_url}" class="place-image-large">
        <h1>${place.name}</h1>
        <p>${place.description}</p>
        <p>${place.location}</p>
        <p>${place.price_per_night}</p>
    `;
}
```

## Task 4: Implementation - Add Review
Check user authentication and redirect if not authenticated:
```bash
function checkAuthentication() {
    const token = getCookie('token');
    if (!token) {
        window.location.href = 'index.html';
    }
    return token;
}
```
Setup event listener for review form:
```bash
document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const token = checkAuthentication();
    const placeId = getPlaceIdFromURL();

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const reviewText = document.getElementById('review-text').value;
            await submitReview(token, placeId, reviewText);
        });
    }
});
```

Submit review:
```bash
async function submitReview(token, placeId, reviewText) {
    const response = await fetch('https://your-api-url/reviews', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ place_id: placeId, review: reviewText })
    });
    if (response.ok) {
        alert('Review submitted successfully!');
        document.getElementById('review-form').reset();
    } else {
        alert('Failed to submit review');
    }
}
```
