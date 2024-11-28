const canvas = document.getElementById("paintCanvas");
const context = canvas.getContext("2d");

let backgroundColor = "#ffffff"; // Default background color
let isDrawing = false;
let brushColor = "#000000";
let brushSize = 5;
let isBucketActive = false;
let tempCanvas = document.createElement("canvas"); // Temporary canvas to hold drawings
let tempContext = tempCanvas.getContext("2d"); // Drawing context for tempCanvas

// Function to resize the canvas
function resizeCanvas() {
  // Save current content (drawings) on a temporary canvas
  const tempWidth = canvas.width;
  const tempHeight = canvas.height;

  // Resize the main canvas
  canvas.width = window.innerWidth * 0.9; // 90% of screen width
  canvas.height = window.innerHeight * 0.7; // 70% of screen height

  // Resize the temporary canvas to match the new main canvas size
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Reapply the background color to the canvas
  setCanvasBackgroundColor(backgroundColor);

  // Redraw the content (drawings) from the temporary canvas
  context.drawImage(tempCanvas, 0, 0);
}

// Function to get mouse position relative to the canvas
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
  tempContext.beginPath();
  tempContext.moveTo(pos.x, pos.y);
}

function draw(event) {
  if (!isDrawing) return;
  const pos = getMousePosition(event);
  tempContext.lineWidth = brushSize;
  tempContext.lineCap = "round";
  tempContext.strokeStyle = brushColor;
  tempContext.lineTo(pos.x, pos.y);
  tempContext.stroke();
  context.drawImage(tempCanvas, 0, 0); // Redraw the temporary canvas content over the main canvas
}

function stopDrawing() {
  isDrawing = false;
  tempContext.closePath();
}

// Utility Functions

// Function to set the canvas background color
function setCanvasBackgroundColor(color) {
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with the selected color
  backgroundColor = color; // Store the selected background color
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  setCanvasBackgroundColor(backgroundColor); // Keep the background color when clearing
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


// Set the background color
document.getElementById("backgroundColorBtn").addEventListener("click", () => {
  const picker = document.getElementById("backgroundColorPicker");
  picker.click(); // Open the hidden color picker
});

document.getElementById("backgroundColorPicker").addEventListener("input", (e) => {
  setCanvasBackgroundColor(e.target.value);
});
