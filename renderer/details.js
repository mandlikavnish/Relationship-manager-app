document.addEventListener("DOMContentLoaded", function () {
    const detailsForm = document.getElementById("details-form");

    detailsForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const dob = document.getElementById("dob").value;
        const city = document.getElementById("city").value;
        const language = document.getElementById("language").value;

        if (!dob || !city.trim() || !language) {
            alert("Please fill in all details.");
            return;
        }

        // Store user details in localStorage for later use
        localStorage.setItem("dob", dob);
        localStorage.setItem("city", city.trim());
        localStorage.setItem("language", language);

        console.log("Details Saved:", { dob, city, language });

        // Redirect to homepage
        window.location.href = "homepage.html";
    });
});
