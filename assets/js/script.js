try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
} catch (e) {
    alert("Your browser doesn't support speech recognition. Try using Chrome or Firefox.")
}

const controls = document.getElementById("controls");
const microphoneContainer = document.getElementById("microphone-container");
const microphoneIcon = document.getElementById("microphone-icon");
const textContainer = document.getElementById("text-container");
const textArea = document.getElementById("text-area");
const decreaseFontBtn = document.querySelector(".font-decrease");
const increaseFontBtn = document.querySelector(".font-increase");
const trashCan = document.querySelector(".fa-trash-can");
const saveBtn = document.getElementById("save-btn");

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

// Initial font size
let fontSize = 1.4;

// Function to increase font size
function increaseFontSize() {
    fontSize += 0.2;
    textArea.style.fontSize = fontSize + "rem";
}

function decreaseFontSize() {
    fontSize -= 0.2;
    textArea.style.fontSize = fontSize + "rem";
}

function clearText() {
    textArea.innerHTML = "";
}

function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance();

    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

function generateUniqueId() {
    return Date.now().toString(); // Using a timestamp as a simple unique ID.
}

function saveToLocalStorage() {
    const currentNote = textArea.value;
    localStorage.setItem(generateUniqueId(), JSON.stringify(currentNote));
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

decreaseFontBtn.addEventListener("click", decreaseFontSize);

increaseFontBtn.addEventListener("click", increaseFontSize);

trashCan.addEventListener("click", clearText);

saveBtn.addEventListener("click", saveToLocalStorage)