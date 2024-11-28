const canvas = document.getElementById("paintCanvas");
const context = canvas.getContext("2d");

let isDrawing = false;
let brushColor = "#000000";
let brushSize = 5;
let isBucketActive = false;

// Function to resize the canvas
function resizeCanvas() {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCtx.drawImage(canvas, 0, 0);

  canvas.width = window.innerWidth * 1; // 100% of screen width
  canvas.height = window.innerHeight * 0.7; // 70% of screen height

  context.drawImage(tempCanvas, 0, 0);
}

// Function to get mouse position on the canvas
function getMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
}

// Drawing functions
function startDrawing(event) {
  isDrawing = true;
  const pos = getMousePosition(event);
  context.beginPath();
  context.moveTo(pos.x, pos.y);
}

function draw(event) {
  if (!isDrawing) return;
  const pos = getMousePosition(event);
  context.lineWidth = brushSize;
  context.lineCap = "flat";
  context.strokeStyle = brushColor;

  context.lineTo(pos.x, pos.y);
  context.stroke();
}

function stopDrawing() {
  isDrawing = false;
  context.closePath();
}

// Utility Functions
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
  const link = document.createElement("a");
  link.download = "my-drawing.png";
  link.href = canvas.toDataURL();
  link.click();
}

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

// Show the popup when the bucket tool is clicked
document.getElementById("bucketTool").addEventListener("click", () => {
  isBucketActive = !isBucketActive; // Toggle the bucket tool
  const bucketButton = document.getElementById("bucketTool");

  // Toggle the active class on the button to change the icon color
  if (isBucketActive) {
    bucketButton.classList.add("active");
  } else {
    bucketButton.classList.remove("active");
  }

  // Show the popup modal
  document.getElementById("popup").style.display = "flex";
});

// Close the popup when the close button is clicked
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

document.getElementById("clearCanvas").addEventListener("click", clearCanvas);
document.getElementById("downloadCanvas").addEventListener("click", downloadCanvas);
// Resize canvas on window resize
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial setup
