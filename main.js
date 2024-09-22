const title = document.getElementById('title');
const content = document.getElementById('content');
const list = document.getElementById('notes');
const button = document.getElementById('add-note');

button.addEventListener('click', function () {
    const noteTitle = title.value.trim();
    const noteContent = content.value.trim();

    if (noteTitle === "" || noteContent === "") {
        alert("Both title and content are required!");
        return;
    }

    const item = document.createElement("li");
    const noteTitleElement = document.createElement("h2");
    const noteTextElement = document.createElement("p");
    const noteButton = document.createElement("button");

    noteTitleElement.textContent = noteTitle;
    noteTextElement.textContent = noteContent;
    noteButton.textContent = "x";

    noteButton.addEventListener("click", function () {
        list.removeChild(item);
    });

    item.appendChild(noteTitleElement);
    item.appendChild(noteTextElement);
    item.appendChild(noteButton);

    list.appendChild(item);

    title.value = "";
    content.value = "";
});
