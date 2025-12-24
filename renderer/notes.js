function saveNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText) {
        let notes = JSON.parse(localStorage.getItem('memolinkNotes')) || [];
        notes.push(noteText);
        localStorage.setItem('memolinkNotes', JSON.stringify(notes));
        noteInput.value = '';
        displayNotes();
    } else {
        alert("Please write something before saving! 😊");
    }
}

function displayNotes() {
    const notesList = document.getElementById('noteItems');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('memolinkNotes')) || [];

    if (notes.length === 0) {
        showMessage("✨ No notes yet! Start by writing something.");
    }

    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerText = note;
        li.className = "note-item";
        li.onclick = () => {
            if (confirm("Delete this note?")) {
                notes.splice(index, 1);
                localStorage.setItem('memolinkNotes', JSON.stringify(notes));
                displayNotes();
            }
        };
        notesList.appendChild(li);
    });
}

// Feedback message function
function showMessage(msg) {
    let msgBox = document.getElementById('messageBox');
    if (!msgBox) {
        msgBox = document.createElement('div');
        msgBox.id = 'messageBox';
        msgBox.style.position = 'fixed';
        msgBox.style.bottom = '20px';
        msgBox.style.left = '50%';
        msgBox.style.transform = 'translateX(-50%)';
        msgBox.style.background = '#f48fb1';
        msgBox.style.color = '#fff';
        msgBox.style.padding = '10px 20px';
        msgBox.style.borderRadius = '8px';
        msgBox.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
        msgBox.style.zIndex = '1000';
        document.body.appendChild(msgBox);
    }
    msgBox.textContent = msg;
    msgBox.style.display = 'block';

    setTimeout(() => {
        msgBox.style.display = 'none';
    }, 2000);
}

window.onload = function() {
    displayNotes();
};

document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backHomeBtn');
    backBtn.addEventListener('click', () => {
        // Show homepage elements
        document.getElementById('profile-section').style.display = 'block';
        document.getElementById('features').style.display = 'grid';
        document.getElementById('bottom-nav').style.display = 'flex';
        document.querySelector('.quote-container').style.display = 'block';
        document.getElementById('profile-section').style.justifyContent = "flex-start"; // Align left
        // Clear dynamic content
        document.getElementById('dynamic-content').innerHTML = '';
    });
});
