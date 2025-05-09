// === Toggle between light and dark mode ===
const toggleBtn = document.getElementById("dark-toggle"); // Get the toggle button from the page

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark"); // Add/remove the "dark" class on the body
  // Change button text depending on mode
  toggleBtn.textContent = isDark ? "☀️ Light View Mode" : "🌙 Dark View Mode";
});

// // === Get all the main buttons and visual area ===
const startBtn = document.getElementById("start-btn");       // "Start" button
const resetBtn = document.getElementById("reset-btn");       // "Reset" button
const algoSelect = document.getElementById("algo-select");   // Dropdown to choose sorting algorithm
const visualizer = document.getElementById("visualizer");    // Where bars appear

// Get popup elements
const popup = document.getElementById("algo-popup");
const popupText = document.getElementById("popup-text");
const closePopup = document.getElementById("close-popup");

// === Generate random bars to visualize ===
function generateBars(num = 12) {                      // Generate '24' bars
  visualizer.innerHTML = '';                           // Clear any old bars before making new ones

  for (let i = 0; i < num; i++) {
    const value = Math.floor(Math.random() * 100) + 1; // Pick a number between 1 and 100
    const bar = document.createElement("div");         // Create a new bar element
    bar.classList.add("bar");                          // Give it the class for styling
    bar.dataset.value = value;                         // Store the value inside the bar as data
    bar.style.height = `${value * 3.95}px`;            // Set the height visually (multiplied for better size)
    bar.textContent = value;                           // Show the number on the bar
    visualizer.appendChild(bar);                       // Add it to the visualizer area
  }
}

// Run the bar creation when the page loads
generateBars();

// === Turn off buttons during animation to avoid bugs ===
function disableControls(){
  // Disable Start button
  startBtn.disabled = true;   
  startBtn.classList.add("disabled-color"); 

  resetBtn.disabled = true;
  resetBtn.classList.add("disabled-color");     

  algoSelect.disabled = true; 
  algoSelect.classList.add("disabled-color");
}

// === Re-enable buttons when animation is done ===
function enableControls() {
  // Enable Start button
  startBtn.disabled = false;   
  startBtn.classList.remove("disabled-color"); 

  resetBtn.disabled = false;
  resetBtn.classList.remove("disabled-color");     

  algoSelect.disabled = false; 
  algoSelect.classList.remove("disabled-color");
}

// === Swap two bars in the DOM to move them left/right ===
function swapBars(bar1, bar2) {
  const temp = bar2.nextSibling;                 // Save the bar after bar2
  visualizer.insertBefore(bar2, bar1);           // Move bar2 before bar1
  if (temp) visualizer.insertBefore(bar1, temp); // Put bar1 where bar2 used to be
  else visualizer.appendChild(bar1);             // If bar2 was last, put bar1 at the end
}

// === Pause for a certain time (to animate steps) ===
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); // Wait for ms milliseconds
}

// Show popup with explanation text
function showExplanation(algorithm) {
  if (algorithm === "bubble") {
    popupText.textContent = "Bubble Sort compares two bars at a time and pushes the biggest to the end in each round. Repeats until sorted.";
  } else {
    popupText.textContent = "This algorithm explanation will appear once implemented.";
  }

  popup.classList.remove("hidden");  // Hide the popup again
}

// === Bubble Sort Algorithm with animation ===
async function bubbleSort() {
  const delay = 300; // Time to pause between steps (in milliseconds)
  
  disableControls(); // Turn off buttons so user can’t interfere

  let bars = visualizer.querySelectorAll(".bar"); // Get all bars currently shown

  // Outer loop: how many total passes we need
  for (let i = 0; i < bars.length - 1; i++) {
    // Inner loop: compare each pair of bars
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].style.background = "#f39c12";     // Highlight first bar (orange)
      bars[j + 1].style.background = "#f39c12"; // Highlight second bar (orange)

      await sleep(delay);                       // Wait before continuing so we can see it

      const val1 = parseInt(bars[j].dataset.value);       // Get value of first bar
      const val2 = parseInt(bars[j + 1].dataset.value);   // Get value of second bar

      // If the first number is bigger than the second, swap them
      if (val1 > val2) {
        swapBars(bars[j], bars[j + 1]); // Move bars in the DOM visually

        bars = visualizer.querySelectorAll(".bar"); // Refresh the list of bars since their order changed
      }

      bars[j].style.background = "#5cb85c";        // Turn bar back to green after comparison
      bars[j + 1].style.background = "#5cb85c";
    }
  }

  enableControls();           // Turn buttons back on when done
  showExplanation("bubble");  // Show popup explanation
}

// Close popup when user clicks "I got it"
closePopup.addEventListener("click", () => {
  console.log("Popup closed");
  popup.classList.add("hidden");
});

// === When the "Start" button is clicked ===
startBtn.addEventListener("click", () => {
  const algo = algoSelect.value; // Get the selected algorithm from dropdown
  console.log("You pressed 'Start btn");
  console.log("> Algo : ", algo); // Log it in the console for debugging

  if (algo === "bubble") {
    bubbleSort(); // Run Bubble Sort if selected
  } else {
    showExplanation("TBA")
    // TODO: Add the rest of the algorithm
  }
});

// === When the "Reset" button is clicked ===
resetBtn.addEventListener("click", () => {
  console.log("You pressed 'Reset btn");
  generateBars(); // Create a new set of random bars
});

// === Run bar generation again just to ensure reset if necessary ===
// generateBars();

// (Optional Enhancements Later)
// - Add smooth movement when swapping bars
// - Show final sorted state using color (e.g., blue)
// - Display narration or steps ("Comparing 35 and 20... Swapping!")
