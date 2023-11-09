const params = new URLSearchParams(window.location.search);
const passedData = params.get("data");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");

const note = localStorage.getItem(passedData);
textArea.value = note;

cancelBtn.addEventListener("click", () => {
    window.location.href = "list-page.html";
})

function updateNote() {
    id = passedData;
    const updatedNote = textArea.value;
    localStorage.setItem(id, updatedNote);
    saveNoteSuccessMessage();
    window.location.href = "list-page.html";
}

updateBtn.addEventListener("click", updateNote)