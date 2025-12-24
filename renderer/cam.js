document.addEventListener("DOMContentLoaded", function () {
    // Back button logic
    document.getElementById("back-btn").addEventListener("click", () => {
        window.location.href = "homepage.html";
    });

    // Save button logic
    document.getElementById("save-profile-btn").addEventListener("click", () => {
        const userName = document.getElementById("user-name").value;
        const userRelationship = document.getElementById("user-relationship").value;
        const userContact = document.getElementById("user-contact").value;
        const lovedOneName = document.getElementById("lovedone-name").value;
        const lovedOneRelationship = document.getElementById("lovedone-relationship").value;
        const lovedOneContact = document.getElementById("lovedone-contact").value;

        localStorage.setItem("userProfile", JSON.stringify({
            userName, userRelationship, userContact, lovedOneName, lovedOneRelationship, lovedOneContact
        }));

        alert("Profile saved successfully!");
    });

    // Add loved one logic (optional)
    document.getElementById("add-lovedone-btn").addEventListener("click", () => {
        alert("Feature to add multiple loved ones coming soon!");
    });
});
