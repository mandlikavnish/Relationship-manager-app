document.addEventListener("DOMContentLoaded", function () {
    // Show stored username or fallback to guest
    const usernameDisplay = document.getElementById("username");
    const loggedInUser = localStorage.getItem("loggedInUser");
    usernameDisplay.textContent = loggedInUser ? loggedInUser : "Guest";

    // Restore profile picture if the user saved one earlier
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
        const profileImg = document.getElementById("profile-pic");
        if (profileImg) profileImg.src = storedProfilePic;
    }

    // Rotate through a few offline quotes (no external API)
    const quoteBox = document.getElementById("quote-box");
    const quotes = [
        { text: "Believe in yourself and all that you are.", author: "Christian D. Larson" },
        { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
        { text: "Do what you love, and you'll never work a day in your life.", author: "Confucius" },
        { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" }
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    quoteBox.textContent = `"${selectedQuote.text}" - ${selectedQuote.author}`;

    // Small hover animation for feature cards
    document.querySelectorAll(".feature-box").forEach(box => {
        box.addEventListener("mouseenter", () => box.classList.add("pop-animation"));
        box.addEventListener("mouseleave", () => box.classList.remove("pop-animation"));
    });

    // Navigate to the settings page
    const menuIcon = document.getElementById("menu-icon");
    if (menuIcon) {
        menuIcon.addEventListener("click", () => window.location.href = "settings.html");
    }

    // Feature tiles route to their respective pages
    const featureLinks = {
        "love": "contacts.html",
        "imp-date": "calendar.html",
        "notif": "notification.html",
        "surveys": "surveys.html"
    };
    Object.keys(featureLinks).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("click", () => window.location.href = featureLinks[id]);
        }
    });

    // Bottom navigation shortcuts
    const notesBtn = document.getElementById("notes-btn");
    const giftBtn = document.getElementById("gift-btn");
    if (notesBtn) notesBtn.addEventListener("click", () => window.location.href = "notes.html");
    if (giftBtn) giftBtn.addEventListener("click", () => window.location.href = "gift.html");
});
