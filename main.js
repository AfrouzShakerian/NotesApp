const title = document.getElementById('title');
const content = document.getElementById('content');
const list = document.getElementById('notes');
const button = document.getElementById('add-note');

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteToDOM(note.title, note.content);
    });
}

function addNoteToDOM(noteTitle, noteContent) {
    const item = document.createElement("li");
    const noteTitleElement = document.createElement("h2");
    const noteTextElement = document.createElement("p");
    const noteButton = document.createElement("button");

    noteTitleElement.textContent = noteTitle;
    noteTextElement.textContent = noteContent;
    noteButton.textContent = "x";

    noteButton.addEventListener("click", function () {
        list.removeChild(item);
        removeNoteFromStorage(noteTitle);
    });

    item.appendChild(noteTitleElement);
    item.appendChild(noteTextElement);
    item.appendChild(noteButton);

    list.appendChild(item);
}

function removeNoteFromStorage(noteTitle) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.title !== noteTitle);
    localStorage.setItem('notes', JSON.stringify(notes));
}

button.addEventListener('click', function () {
    const noteTitle = title.value.trim();
    const noteContent = content.value.trim();

    if (noteTitle === "" || noteContent === "") {
        alert("Both title and content are required!");
        return;
    }

    const note = {
        title: noteTitle,
        content: noteContent
    };

    addNoteToDOM(note.title, note.content);
    saveNoteToStorage(note);

    title.value = "";
    content.value = "";
    title.focus();
});

function saveNoteToStorage(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

window.onload = loadNotes;