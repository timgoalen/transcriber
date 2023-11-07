const listPageContainer = document.querySelector(".list-page-main");

// Get an array of the note keys (IDs)
const timestampIDs = Object.keys(localStorage);
// Sort the array into reverse chronological order
timestampIDs.sort((a, b) => {
    return parseInt(b) - parseInt(a);
});

function createNoteHtml(id, note) {
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

function displayNotesHtml() {
    if (timestampIDs.length > 0) {
        timestampIDs.forEach(id => {
            const note = localStorage.getItem(id);
            createNoteHtml(id, note);
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

// Display the notes before getting the detail view elements
displayNotesHtml();

// Now get the newly rendered detail view elements
const listPageItems = Array.from(document.getElementsByClassName("list-page-item"));
const detailViewModalContainer = document.getElementById("detail-view-modal-container");
const detailViewModalContent = document.getElementById("detail-view-modal-content");

for (const item of listPageItems) {
    item.addEventListener("click", handleItemClick)
}

function showDetailViewModal() {
    detailViewModalContainer.style.display = "grid";
}

function handleItemClick() {
    id = this.dataset.id.toString();
    const note = localStorage.getItem(id);
    const detailViewHtml = `
        <div id="detail-view-modal-text">
            ${note}
        </div>
        <div id="detail-view-modal-tools-container">
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
    showDetailViewModal();
    getDetailViewToolElements()
}

function handleDetailViewEditBtn() {
    const id = this.dataset.id;
    const dataForEditPage = id;
    const url = "edit-page.html?data=" + encodeURIComponent(dataForEditPage);
    window.location.href = url;
}

function handleDetailViewDeleteBtn() {
    const id = this.dataset.id;
    localStorage.removeItem(id);
    window.location.reload();
}

function getDetailViewToolElements() {
    const backBtn = document.getElementById("back-btn-modal");
    const editBtn = document.getElementById("edit-btn-modal");
    const deleteBtn = document.getElementById("delete-btn-modal");

    backBtn.addEventListener("click", () => {
        detailViewModalContainer.style.display = "none";
    })
    editBtn.addEventListener("click", handleDetailViewEditBtn)
    deleteBtn.addEventListener("click", handleDetailViewDeleteBtn)
}