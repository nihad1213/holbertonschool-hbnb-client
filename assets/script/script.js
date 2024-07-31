document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await loginUser(email, password);

                if (response.ok) {
                    const data = await response.json();
                    document.cookie = `token=${data.access_token}; path=/`;
                    alert('Login successful!');
                    window.location.href = 'index.html';
                } else {
                    const errorText = await response.json();  // Parse JSON error message
                    alert('Login failed: ' + errorText.error);
                }
            } catch (error) {
                alert('Login failed: ' + error.message);
            }
        });
    }
});

async function loginUser(email, password) {
    try {
        return await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}
