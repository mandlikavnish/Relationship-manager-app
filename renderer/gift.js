// gift.js
function saveGift() {
    const giftInput = document.getElementById('giftInput');
    const giftText = giftInput.value.trim();

    if (giftText === "") return;

    let gifts = JSON.parse(localStorage.getItem('memolink_gifts')) || [];
    gifts.push(giftText);
    localStorage.setItem('memolink_gifts', JSON.stringify(gifts));

    // Show feedback
    const feedback = document.getElementById('giftFeedback');
    feedback.style.display = 'block';
    setTimeout(() => { feedback.style.display = 'none'; }, 2000);

    // Clear input
    giftInput.value = "";

    // Reload gift list
    loadGifts();
}

function loadGifts() {
    const giftItems = document.getElementById('giftItems');
    giftItems.innerHTML = "";

    let gifts = JSON.parse(localStorage.getItem('memolink_gifts')) || [];
    gifts.forEach(gift => {
        const li = document.createElement('li');
        li.textContent = gift;
        giftItems.appendChild(li);
    });
}

// Automatically load gifts on page load
window.onload = loadGifts;


// Back to Home Button Logic
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backHomeBtn');
    backBtn.addEventListener('click', () => {
        // Show homepage elements
        document.getElementById('profile-section').style.display = 'block';
        document.getElementById('features').style.display = 'grid';
        document.getElementById('bottom-nav').style.display = 'flex';
        document.querySelector('.quote-container').style.display = 'block';

        // Clear dynamic content
        document.getElementById('dynamic-content').innerHTML = '';
    });
});
