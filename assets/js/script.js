try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  }
  catch(e) {
    alert("Your browser doesn't support speech recognition. Try on Chrome or Firefox.")
  }

const controls = document.getElementById("controls");
const microphoneLink = document.getElementById("microphone-link");
const microphoneIcon = document.getElementById("microphone-icon");
const textContainer = document.getElementById("text-container");
const textArea = document.getElementById("text-area");
const decreaseFontBtn = document.querySelector(".font-decrease");
const increaseFontBtn = document.querySelector(".font-increase");


// Initialize variables
let recognising = false;
let recognition = new SpeechRecognition();
let paragraph = document.createElement('p');

// Set recognition settings
recognition.continuous = true;
recognition.interimResults = true;

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
    }

    // Append interim transcript to the existing content
    textArea.innerHTML += "<span style='color: gray;'>" + transcript + "</span>";
};


// Click event handler for the microphone button
microphoneIcon.addEventListener("click", function () {
    if (recognising) {
        recognition.stop();
        microphoneIcon.style.color = "#15c415";
    } else {
        recognition.start();
        microphoneIcon.style.color = "#e40000";
    }

    recognising = !recognising;
});

// Handle errors
recognition.onerror = function (event) {
    console.error("Speech recognition error: " + event.error);
};

// Initial font size
let fontSize = 3; // You can set your desired initial font size here

// Function to increase font size
function increaseFontSize() {
    fontSize += 1; // Increase the font size by 2 pixels (you can adjust this value)
    textArea.style.fontSize = fontSize + "rem";
}

function decreaseFontSize() {
    fontSize -= 1; // decrease the font size by 2 pixels (you can adjust this value)
    textArea.style.fontSize = fontSize + "rem";
}

decreaseFontBtn.addEventListener("click", decreaseFontSize);

increaseFontBtn.addEventListener("click", increaseFontSize);