const listPageContainer = document.querySelector(".list-page-main");

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

function displaySavedNotes() {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            const id = localStorage.key(i);
            const note = localStorage.getItem(id);
            addNoteToListView(id, note);
        }
    } else {
        const noNotesHtml = `
        <div class="list-page-item">
            <div class="item-text">
                <p>Create some notes to see them here!</p>
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

