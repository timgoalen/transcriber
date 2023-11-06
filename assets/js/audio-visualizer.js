const canvas = document.getElementById("audio-visualizer");

// Get the browser microphone input
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(function (stream) {
    let context = canvas.getContext("2d");
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioContext.createAnalyser();
    analyser.fftSize = 128;

    let source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    let data = new Uint8Array(analyser.frequencyBinCount);
    requestAnimationFrame(loopingFunction);

    function loopingFunction() {
      requestAnimationFrame(loopingFunction);
      analyser.getByteFrequencyData(data);
      draw(data);
    }

    function draw(data) {
      data = [...data];
      context.clearRect(0, 0, canvas.width, canvas.height);
      let space = canvas.width / data.length;
      data.forEach((value, i) => {
        context.beginPath();
        context.moveTo(space * i, canvas.height);
        context.lineTo(space * i, canvas.height - value);
        // if (value < 20) {
        //     context.strokeStyle = "#989898";
            
        // } else if (value < 50) {
        //     context.strokeStyle = "#268CF2";
        // } else {
            
        //     context.strokeStyle = "#F28C26";
        // }
        context.strokeStyle = "#268CF2";
        context.stroke();
      });
    }
  })
  .catch(function (error) {
    console.error("Error accessing microphone:", error);
  });
