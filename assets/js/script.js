const microphoneContainer = document.getElementById("microphone-container");
const microphoneIcon = document.getElementById("microphone-icon");
const textArea = document.getElementById("text-area");
const modalContainer = document.getElementById("modal-container");
const clearBtn = document.getElementById("clear-btn");
const saveBtn = document.getElementById("save-btn");
const canvasContainer = document.getElementById("canvas-container");

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

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitaliseNewSentence(string) {
    return string.charAt(1).toUpperCase() + string.slice(2);
}

function punctuate(string) {
    string = string.replace(/(?:\s+|^)full stop(?:\s+|$)/g, '. ');
    string = string.replace(/(?:\s+|^)comma(?:\s+|$)/g, ', ');
    string = string.replace(/(?:\s+|^)queation mark(?:\s+|$)/g, '? ');
    string = string.replace(/(?:\s+|^)exclamation mark(?:\s+|$)/g, '! ');
    string = string.replace("new paragraph", "\n\n");
    string = string.replace("hyphen", "-");
    // string = string.replace("colon", ":");
    // string = string.replace("semi colon", ";");
    // string = string.replace("underscore", "_");

    return string;
}

// -- RECOGNITION FUNCTIONALITY --

recognition.onresult = (event) => {
    let currentTranscript = "";
    const capitaliseAfterThese = [".", "!", "?"];
    console.log(capitaliseAfterThese);

    for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript = event.results[i][0].transcript;
    }

    if (currentTranscript) {
        const previousTranscript = textArea.value;
        const punctuatedTranscript = punctuate(currentTranscript);

        if (previousTranscript === "") {
            textArea.value = capitalise(punctuatedTranscript);
        } else {
            console.log({previousTranscript});
            console.log({currentTranscript});
            let lastCharacter = previousTranscript.charAt(previousTranscript.length - 2);
            console.log(lastCharacter);
            if (capitaliseAfterThese.includes(lastCharacter)) {
                textArea.value = previousTranscript + capitaliseNewSentence(punctuatedTranscript);
            } else {
                textArea.value = previousTranscript + punctuatedTranscript;
            }
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
        // For audio visualizer
        stopVisualizer();
        canvasContainer.style.display = "none";
        updateUiRecordingStopped();
    } else {
        recognition.start();
        // For audio visualizer
        initVisualizer();
        updateUiRecordingStarted();
        canvasContainer.style.display = "block";
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