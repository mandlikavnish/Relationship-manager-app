const PIN = "1234"; // Change this PIN as needed

function unlockVault() {
    const inputPin = document.getElementById('pinInput').value;
    const pinFeedback = document.getElementById('pinFeedback');

    if (inputPin === PIN) {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('vault-content').style.display = 'block';
        pinFeedback.style.display = 'none';
        loadSecretNotes();
    } else {
        pinFeedback.style.display = 'block';
    }
}

function lockVault() {
    document.getElementById('vault-content').style.display = 'none';
    document.getElementById('lock-screen').style.display = 'block';
    document.getElementById('pinInput').value = '';
}

function saveSecretNote() {
    const noteInput = document.getElementById('secretNoteInput');
    const noteText = noteInput.value.trim();
    if (!noteText) return;

    let secretNotes = JSON.parse(localStorage.getItem('heartlock_notes')) || [];
    secretNotes.push(noteText);
    localStorage.setItem('heartlock_notes', JSON.stringify(secretNotes));

    noteInput.value = '';
    loadSecretNotes();
}

function loadSecretNotes() {
    const noteList = document.getElementById('secretNoteList');
    noteList.innerHTML = '';

    let secretNotes = JSON.parse(localStorage.getItem('heartlock_notes')) || [];
    secretNotes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;
        li.onclick = () => {
            if (confirm("Delete this note?")) {
                secretNotes.splice(index, 1);
                localStorage.setItem('heartlock_notes', JSON.stringify(secretNotes));
                loadSecretNotes();
            }
        };
        noteList.appendChild(li);
    });
}

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
        document.getElementById('profile-section').style.justifyContent = "flex-start"; // Align left
    });
});

