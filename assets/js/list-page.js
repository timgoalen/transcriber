const listPageContainer = document.querySelector(".list-page-main");
const timestampIDs = Object.keys(localStorage);

// Sort the array into reverse chronological order
timestampIDs.sort((a, b) => {
    return parseInt(b) - parseInt(a);
});


function addNoteToListView(id, note) {
    const noteHtml = `
    <div class="list-page-item">
        <div class="item-text">
            <p>${note}</p>
        </div>
        <div class="item-tools">
            <i class="fa-regular fa-trash-can" data-id="${id}"></i>
        </div>
    </div>
    `
    listPageContainer.innerHTML += noteHtml;
}




// Iterate through sorted keys and display the corresponding values


function displaySavedNotes() {
    if (timestampIDs.length > 0) {
        timestampIDs.forEach(id => {
            const note = localStorage.getItem(id);
            addNoteToListView(id, note);
        });
    } else {
        const noNotesHtml = `
        <div class="list-page-item">
            <div class="item-text">
                <p>Save some notes to see them here!</p>
            </div>
        </div>
        `
        listPageContainer.innerHTML += noNotesHtml;
    }
}

displaySavedNotes();

function handleDeleteBtnClick() {
    id = this.dataset.id.toString();
    localStorage.removeItem(id);
    window.location.reload();
}

const deleteBtns = Array.from(document.getElementsByClassName("fa-trash-can"));

for (btn of deleteBtns) {
    btn.addEventListener("click", handleDeleteBtnClick)
}