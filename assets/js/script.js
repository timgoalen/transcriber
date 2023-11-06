const microphoneContainer = document.getElementById("microphone-container");
const microphoneIcon = document.getElementById("microphone-icon");
const textArea = document.getElementById("text-area");
const modalContainer = document.getElementById("modal-container");
const clearBtn = document.getElementById("clear-btn");
const saveBtn = document.getElementById("save-btn");

// Inititalize speach recognition
try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
} catch (e) {
    alert("Your browser doesn't support speech recognition. Try using Chrome or Firefox.");
}

// Global variables
let recognising = false;
let recognition = new SpeechRecognition();

// Recognition settings
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-UK";

// -- UTILITY FUNCTIONS --

function clearText() {
    textArea.value = "";
}

function generateTimestamp() {
    return Date.now().toString();
}

function updateUiRecordingStarted() {
    microphoneContainer.style.color = "var(--red)";
    microphoneContainer.style.border = "1px solid var(--red)";
    textArea.style.border = "1px solid var(--red)";
}

function updateUiRecordingStopped() {
    microphoneContainer.style.color = "var(--orange)";
    microphoneContainer.style.border = "1px solid var(--orange)";
    textArea.style.border = "1px solid var(--grey)";
}

// -- RECOGNITION FUNCTIONALITY --

recognition.onresult = function (event) {
    let currentTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript = event.results[i][0].transcript;
    }

    if (currentTranscript) {
        const previousTranscript = textArea.value;
        console.log(previousTranscript);
        textArea.value = previousTranscript + currentTranscript;
    }
};

// Handle errors
recognition.onerror = function (event) {
    console.error("Speech recognition error: " + event.error);
};

// -- MAIN FUNCTIONS --

function handleMicrophoneClick() {
    if (recognising) {
        recognition.stop();
        updateUiRecordingStopped();
    } else {
        recognition.start();
        updateUiRecordingStarted();
    }

    recognising = !recognising;
}

function saveToLocalStorage() {
    const currentNote = textArea.value;
    localStorage.setItem(generateTimestamp(), currentNote);
}

function saveBtnClickHandler() {
    if (textArea.value !== "") {
        saveToLocalStorage();
        saveNoteSuccessMessage();
        window.location.href = "list-page.html";
    }
}

function saveNoteSuccessMessage() {
    modalContainer.style.display = "grid";
    setTimeout(() => {
        modalContainer.style.display = "none";
    }, 700);
}

// -- EVENT LISTENERS --

microphoneIcon.addEventListener("click", handleMicrophoneClick);

if (saveBtn) {
    saveBtn.addEventListener("click", saveBtnClickHandler);
}

if (clearBtn) {
    clearBtn.addEventListener("click", clearText);
}