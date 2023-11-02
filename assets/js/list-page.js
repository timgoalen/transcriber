const listPageContainer = document.querySelector(".list-page-main");

function addNoteToListView(id, note) {
    const noteHtml = `
    <div class="list-page-item">
        <div class="item-text">
            <p>${note}</p>
        </div>
        <div class="item-tools">
            <i class="fa-regular fa-trash-can" id="${id}"></i>
        </div>
    </div>
    `
    listPageContainer.innerHTML += noteHtml;
}

for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage.key(i);
    const note = localStorage.getItem(id);
    addNoteToListView(id, note);
}