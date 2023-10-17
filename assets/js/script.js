try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  }
  catch(e) {
    alert("Your browser doesn't support speech recognition. Try on Chrome or Firefox.")
  }

const controls = document.getElementById("controls");
const microphone = document.getElementById("microphone-icon");
const textContainer = document.getElementById("text-container");
const textArea = document.getElementById("text-area");


// Initialize variables
let recognising = false;
let recognition = new SpeechRecognition();

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

    textArea.innerHTML = finalTranscript + "<p style='color: gray;'>" + interimTranscript + "</p>";
};

// Click event handler for the microphone button
microphone.addEventListener("click", function () {
    if (recognising) {
        recognition.stop();
        microphone.textContent = "Start Recognition";
    } else {
        recognition.start();
        microphone.textContent = "Stop Recognition";
    }

    recognising = !recognising;
});

// Handle errors
recognition.onerror = function (event) {
    console.error("Speech recognition error: " + event.error);
};