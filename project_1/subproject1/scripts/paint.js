const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let brushColor = "#000000";
let brushSize = 5;

// Event Listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

document.getElementById("colorPicker").addEventListener("input", (e) => {
    brushColor = e.target.value;
});

document.getElementById("brushSize").addEventListener("input", (e) => {
    brushSize = e.target.value;
});

document.getElementById("clearCanvas").addEventListener("click", clearCanvas);
document.getElementById("downloadCanvas").addEventListener("click", downloadCanvas);
