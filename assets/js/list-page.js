const listPageContainer = document.querySelector(".list-page-main");


const timestampIDs = Object.keys(localStorage);
// Sort the array into reverse chronological order
timestampIDs.sort((a, b) => {
    return parseInt(b) - parseInt(a);
});

// TODO: try without <p> for multi line elipses??..
function addNoteToListView(id, note) {
    const noteHtml = `
    <div class="list-page-item" data-id="${id}">
        <div class="item-text">
            <p>${note}</p>
        </div>
        <div class="item-tools">
            <i class="fa-solid fa-expand"></i>
        </div>
    </div>
    `
    listPageContainer.innerHTML += noteHtml;
}

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

// Display the notes before getting the btn html elements
displaySavedNotes();

// **these need to be here, could combine into some sort of Callback later...
const listPageItems = Array.from(document.getElementsByClassName("list-page-item"));
const editNoteModal = document.getElementById("edit-note-modal-container");
const detailViewModalContent = document.getElementById("edit-note-modal-content");
const editNoteModalText = document.getElementById("edit-note-modal-text");

function showNoteDetailModal() {
    editNoteModal.style.display = "grid";
}

function handleItemClick() {
    id = this.dataset.id.toString();
    const note = localStorage.getItem(id);
    const detailViewHtml = `
        <div id="edit-note-modal-text">
            ${note}
        </div>
        <div id="edit-note-modal-tools-container">
            <div id="back-btn-modal">
                <i class="fa-solid fa-arrow-left"></i>
                <div>Back</div>
            </div>
            <div id="edit-btn-modal" data-id="${id}">
                <i class="fa-solid fa-pen"></i>
                <div>Edit</div>
            </div>
            <div id="delete-btn-modal" data-id="${id}">
                <i class="fa-regular fa-trash-can"></i>
                <div>Delete</div>
            </div>
        </div>
    `
    detailViewModalContent.innerHTML = detailViewHtml;
    showNoteDetailModal();
    // localStorage.removeItem(id);
    // window.location.reload();
    getDetailViewToolElements()
}

function handleDetailViewDeleteBtn() {
    const id = this.dataset.id;
    localStorage.removeItem(id);
    window.location.reload();
}

function handleDetailViewEditBtn() {
    const id = this.dataset.id;
    // var passIdData = id;
    // var editPageUrl = "edit-page.html?data=" + encodeURIComponent(passIdData);
    // window.location.href = editPageUrl;
    // Your JavaScript code on page1.html
    var noteIdToPass = id;
    var url = "edit-page.html?data=" + encodeURIComponent(noteIdToPass);
    window.location.href = url;
}

function getDetailViewToolElements() {
    const backBtn = document.getElementById("back-btn-modal");
    const editBtn = document.getElementById("edit-btn-modal");
    const deleteBtn = document.getElementById("delete-btn-modal");

    backBtn.addEventListener("click", () => {
        editNoteModal.style.display = "none";
    })
    editBtn.addEventListener("click", handleDetailViewEditBtn)
    deleteBtn.addEventListener("click", handleDetailViewDeleteBtn)
}

// id = this.dataset.id.toString();



// const deleteBtns = Array.from(document.getElementsByClassName("fa-trash-can"));

// for (const btn of deleteBtns) {
//     btn.addEventListener("click", handleDeleteBtnClick)
// }

for (const item of listPageItems) {
    item.addEventListener("click", handleItemClick)
}