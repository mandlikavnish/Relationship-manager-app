document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Retrieve stored credentials
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (!storedUsername || !storedEmail || !storedPassword) {
            errorMessage.textContent = "No account found. Please sign up first.";
            return;
        }

        if (username === storedUsername && email === storedEmail && password === storedPassword) {
            localStorage.setItem("loggedInUser", username);
            // Store email type for contacts display
            if (email.toLowerCase().includes('rohit')) {
                localStorage.setItem("contactsType", "rohit");
            } else if (email.toLowerCase().includes('hema')) {
                localStorage.setItem("contactsType", "hema");
            } else {
                localStorage.setItem("contactsType", "default");
            }
            window.location.href = "details.html";
        } else {
            errorMessage.textContent = "Invalid credentials. Please try again.";
        }
    });
});