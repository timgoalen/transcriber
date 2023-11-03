// Your JavaScript code on page2.html
var params = new URLSearchParams(window.location.search);
var passedData = params.get("data");

console.log({passedData}); // This will log the value of the "data" query parameter

const note = localStorage.getItem(passedData);
textArea.value = note;