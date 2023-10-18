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
const copyBtn = document.getElementById("copy-to-clipboard");
const trashCan = document.querySelector(".fa-trash-can");

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
        const pElement = document.createElement("p");
        pElement.textContent = finalTranscript;
        textArea.appendChild(pElement);
        // readOutLoud(finalTranscript);
    }

    // Append interim transcript to the existing content
    // textArea.innerHTML += "<span style='color: gray;'>" + transcript + "</span>";
};


// Click event handler for the microphone button
microphoneIcon.addEventListener("click", function () {
    if (recognising) {
        recognition.stop();
        microphoneIcon.style.color = "#15c415";
        textArea.style.border = "1px solid black";
        // const paragraphs = document.querySelectorAll("p");
        // for (let para of paragraphs) {
        //     readOutLoud(para.innerHTML);
        // }
        let para = document.querySelector("p");
        // readOutLoud(para.innerHTML);
    } else {
        recognition.start();
        microphoneIcon.style.color = "#e40000";
        textArea.style.border = "1px solid #e40000";
    }

    recognising = !recognising;
});

// Handle errors
recognition.onerror = function (event) {
    console.error("Speech recognition error: " + event.error);
};

// Initial font size
let fontSize = 3;

// Function to increase font size
function increaseFontSize() {
    fontSize += 1; // Increase the font size by 2 pixels (you can adjust this value)
    textArea.style.fontSize = fontSize + "rem";
}

function decreaseFontSize() {
    fontSize -= 1; // decrease the font size by 2 pixels (you can adjust this value)
    textArea.style.fontSize = fontSize + "rem";
}

async function copyToClipboard() {
    let text = textArea.textContent;
    try {
        await navigator.clipboard.writeText(text);
        alert("Copied to the clipboard");
    } catch (err) {
        alert("Error: Failed to copy: " + err);
    }
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

decreaseFontBtn.addEventListener("click", decreaseFontSize);

increaseFontBtn.addEventListener("click", increaseFontSize);

copyBtn.addEventListener("click", copyToClipboard);

trashCan.addEventListener("click", clearText);