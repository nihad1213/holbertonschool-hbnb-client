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
Task 1: Implementation - Login

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
