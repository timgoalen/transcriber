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

try {
    var recognition = new SpeechRecognition();
} catch (e) {
    alert("Your browser doesn't support speech recognition. Try using Chrome or Firefox.");
}

// const recognition = new SpeechRecognition();
let recognising = false;

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

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lineBreak(string) {
    return "\n" + string;
}

function punctuate(string) {
    string = string.replace("full stop", ". ");
    string = string.replace("comma", ", ");
    // string = string.replace("new line", "\n");
    return string;
}

function capitalizeAfterFullStop(string) {
    const parts = string.split(". ");

    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length >= 2) {
            parts[i] = parts[i].substring(0, 1) + parts[i][1].toUpperCase() + parts[i].substring(2);
        }
    }

    return parts.join(". ");
}

// -- RECOGNITION FUNCTIONALITY --

recognition.onresult = (event) => {
    let currentTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript = event.results[i][0].transcript;
        console.log(currentTranscript);

    }

    if (currentTranscript) {
        const previousTranscript = textArea.value;

        // textArea.value = previousTranscript + capitalize(currentTranscript);
        const punctuatedTranscript = punctuate(currentTranscript);
        if (previousTranscript === "") {
            textArea.value = previousTranscript + capitalize(punctuatedTranscript);
        } else {
            textArea.value = previousTranscript + capitalizeAfterFullStop(capitalize(punctuatedTranscript));
        }
        
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