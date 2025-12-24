document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const errorMessage = document.getElementById("signup-error-message");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("signup-username").value.trim();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;

        // Validate username
        if (username.length < 6 || username.startsWith(" ")) {
            alert("Username must be at least 6 characters and not start with a space.");
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Validate password strength (optional)
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Save credentials
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        // Show success popup
        alert("Account created successfully! You can now log in.");
        
        // Redirect to login page
        window.location.href = "index.html";
    });
}); 