const controls = document.getElementById("controls");
const microphoneContainer = document.getElementById("microphone-container");
const microphoneIcon = document.getElementById("microphone-icon");
const textContainer = document.getElementById("text-container");
const textArea = document.getElementById("text-area");
const modalContainer = document.getElementById("modal-container");
const modalContent = document.getElementById("modal-content");
const deleteBtn = document.getElementById("delete-btn");
const saveBtn = document.getElementById("save-btn");

// Inititalize speach recognition
try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
} catch (e) {
    alert("Your browser doesn't support speech recognition. Try using Chrome or Firefox.")
}

// Initialize variables
let recognising = false;
let recognition = new SpeechRecognition();
let paragraph = document.createElement("p");

// Set recognition settings
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-UK";

recognition.onresult = function (event) {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript;
        }
        // textArea.value += transcript;

    }


    if (interimTranscript) {
        // textArea.value = interimTranscript;
    }

    // Create a new <p> element for each final transcript
    if (finalTranscript) {
        // const pElement = document.createElement("p");
        // pElement.textContent = finalTranscript;
        // textArea.appendChild(pElement);
        let interimText = textArea.value;
        textArea.value = interimText + finalTranscript;
        // readOutLoud(finalTranscript);
    }

    // Append interim transcript to the existing content
    // textArea.innerHTML += "<span style='color: gray;'>" + transcript + "</span>";

};


// Click event handler for the microphone button
microphoneIcon.addEventListener("click", function () {
    if (recognising) {
        recognition.stop();
        microphoneContainer.style.color = "var(--orange)";
        microphoneContainer.style.border = "1px solid var(--orange)";
        textArea.style.border = "1px solid var(--grey)";
        // const paragraphs = document.querySelectorAll("p");
        // for (let para of paragraphs) {
        //     readOutLoud(para.innerHTML);
        // }
        let para = document.querySelector("p");
        // readOutLoud(para.innerHTML);
    } else {
        recognition.start();
        microphoneContainer.style.color = "var(--red)";
        microphoneContainer.style.border = "1px solid var(--red)";
        textArea.style.border = "1px solid var(--red)";
    }

    recognising = !recognising;
});

// Handle errors
recognition.onerror = function (event) {
    console.error("Speech recognition error: " + event.error);
};

function clearText() {
    textArea.value = "";
}

// function readOutLoud(message) {
//     var speech = new SpeechSynthesisUtterance();

//     // Set the text and voice attributes.
//     speech.text = message;
//     speech.volume = 1;
//     speech.rate = 1;
//     speech.pitch = 1;

//     window.speechSynthesis.speak(speech);
// }

// if (textArea.value == "") {
//     saveBtn.disabled = true;
// }

function saveBtnClickHandler() {
    if (textArea.value !== "") {
        saveToLocalStorage();
        saveNoteSuccessMessage();
        // clearText();
        window.location.href = "list-page.html";
    }
}

function generateTimestamp() {
    return Date.now().toString();
}

function saveToLocalStorage() {
    const currentNote = textArea.value;
    localStorage.setItem(generateTimestamp(), currentNote);
}

function saveNoteSuccessMessage() {
    modalContainer.style.display = "grid";
    setTimeout(() => {
        modalContainer.style.display = "none";
    }, 700);
}

// 1. Retrieve all items from local storage.
function getAllSavedNotes() {
    const notes = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const note = JSON.parse(localStorage.getItem(key));
        notes.push(note);
    }
    return notes;
}

// 2. Iterate through the items.
// const notes = getAllItemsFromLocalStorage();

// 3. Create HTML elements to display each item.
function createListItem(item) {
    const listItem = document.createElement("div");
    listItem.textContent = item.content;

    // You can add more HTML elements and styles as needed.
    return listItem;
}

// 4. Append the HTML elements to the container.
// const container = document.querySelector("list-page-main");
// items.forEach((item) => {
//     const listItem = createListItem(item);
//     container.appendChild(listItem);
// });

if (deleteBtn) {
    deleteBtn.addEventListener("click", clearText);
}

if (saveBtn) {
    saveBtn.addEventListener("click", saveBtnClickHandler);
}
