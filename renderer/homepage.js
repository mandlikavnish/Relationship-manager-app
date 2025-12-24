document.addEventListener("DOMContentLoaded", function () {
    // Update username display
    const usernameDisplay = document.getElementById("username");
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        usernameDisplay.textContent = loggedInUser;
    } else {
        usernameDisplay.textContent = "Guest";
    }

    // --- Random Quote ---
    const quoteBox = document.getElementById("quote-box");
    const quotes = [
        { text: "Believe in yourself and all that you are.", author: "Christian D. Larson" },
        { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
        { text: "Do what you love, and you'll never work a day in your life.", author: "Confucius" },
        { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" }
    ];
    
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        quoteBox.textContent = `"${selectedQuote.text}" - ${selectedQuote.author}`;
    }
    displayRandomQuote();

    // --- Feature Boxes Animation ---
    document.querySelectorAll(".feature-box").forEach(box => {
        box.addEventListener("mouseenter", () => {
            box.classList.add("pop-animation");
        });
        box.addEventListener("mouseleave", () => {
            box.classList.remove("pop-animation");
        });
    });

    // --- Menu Icon Click ---
    document.getElementById("menu-icon").addEventListener("click", () => {
        window.location.href = "settings.html";
    });

    // --- Feature Boxes Clicks ---
    const featureLinks = {
        "love": "contacts.html",
        "imp-date": "calendar.html",
        "notif": "notification.html",
        "surveys": "surveys.html"
    };

    Object.keys(featureLinks).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("click", () => {
                window.location.href = featureLinks[id];
            });
        }
    });

    // --- Bottom Nav Button Clicks ---
    const hideHomepageSections = () => {
        document.getElementById("profile-section").style.display = "none";
        document.getElementById("features").style.display = "none";
        document.getElementById("bottom-nav").style.display = "none";
        document.querySelector(".quote-container").style.display = "none";
    };

    const showHomepageSections = () => {
        document.getElementById("profile-section").style.display = "block";
        document.getElementById("features").style.display = "grid";
        document.getElementById("bottom-nav").style.display = "flex";
        document.querySelector(".quote-container").style.display = "block";
        document.getElementById("dynamic-content").innerHTML = '';
    };

    const loadContent = (htmlFile, jsFile = null) => {
        hideHomepageSections();
        fetch(htmlFile)
            .then(res => res.text())
            .then(html => {
                const dynamicContent = document.getElementById("dynamic-content");
                dynamicContent.innerHTML = html;

                // Add event listener for back button
                const backBtn = dynamicContent.querySelector("#backHomeBtn");
                if (backBtn) {
                    backBtn.addEventListener("click", () => {
                        showHomepageSections();
                    });
                }

                if (jsFile) {
                    const script = document.createElement("script");
                    script.src = jsFile;
                    document.body.appendChild(script);
                }
            })
            .catch(err => console.error(`Error loading ${htmlFile}:`, err));
    };

    // Add event listeners for bottom nav buttons
    const bottomNavButtons = {
        "notes-btn": { html: "notes.html" },
        "gift-btn": { html: "gift.html" },
        "music-btn": null // This is handled by the music modal
    };

    Object.entries(bottomNavButtons).forEach(([id, config]) => {
        const element = document.getElementById(id);
        if (element && config) {
            element.addEventListener("click", () => {
                loadContent(config.html);
            });
        }
    });
});
