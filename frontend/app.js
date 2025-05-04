// Toggle dark mode
const toggleBtn = document.getElementById("dark-toggle");

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  toggleBtn.textContent = isDark ? "☀️ Light View Mode" : "🌙 Dark View Mode";
});

  // Visualization (basic sample for bars)
  const visualizer = document.getElementById("visualizer");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  const algoSelect = document.getElementById("algo-select");

  function generateBars(num = 30) {
    visualizer.innerHTML = '';
  
    for (let i = 0; i < num; i++) {
      const value = Math.floor(Math.random() * 100) + 1;
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.dataset.value = value;
      bar.style.height = `${value * 3}px`; // Scale for visibility
      bar.textContent = value; // Show value inside the bar
      visualizer.appendChild(bar);
    }
  }
  
  
  // Run when page loads
  generateBars();

  // === Bubble Sort w animation ===
  async function bubbleSort() {
    const delay = 100;
    disableControls();
  
    let bars = visualizer.querySelectorAll(".bar");
  
    for (let i = 0; i < bars.length - 1; i++) {
      for (let j = 0; j < bars.length - i - 1; j++) {
        bars[j].style.background = "#f39c12";
        bars[j + 1].style.background = "#f39c12";
  
        await sleep(delay);
  
        const val1 = parseInt(bars[j].dataset.value);
        const val2 = parseInt(bars[j + 1].dataset.value);
  
        if (val1 > val2) {
          swapBars(bars[j], bars[j + 1]);
  
          // After swap, reselect bars (DOM changed!)
          bars = visualizer.querySelectorAll(".bar");
        }
  
        bars[j].style.background = "#5cb85c";
        bars[j + 1].style.background = "#5cb85c";
      }
    }
  
    enableControls();
  }

  // Swap height between two bars 
  function swapBars(bar1, bar2) {
    const temp = bar2.nextSibling;
    visualizer.insertBefore(bar2, bar1);
    if (temp) visualizer.insertBefore(bar1, temp);
    else visualizer.appendChild(bar1);
  }
  

  // Helper to pause process 
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms)); // wait for ms
  }

  // Disable buttons so user can't break animation
  function disableControls(){
    startBtn.disabled = true; 
    resetBtn.disabled = true;
    algoSelect.disable = true; 
  }

  // Re-enable buttons after sorting finishes
  function enableControls() {
    startBtn.disabled = false;
    resetBtn.disabled = false;
    algoSelect.disabled = false;
  }
  
  startBtn.addEventListener("click", () => {
    const algo = algoSelect.value; // Get selected algorithm
    console.log("> Algo : ", algo);
    if (algo === "bubble"){
      bubbleSort();    // call the function when selected
    } else {
      alert("Algorithm will animate soon! For now, just relax and see bars.");
    }
  });
  
  resetBtn.addEventListener("click", () => {
    generateBars();
  });
  
  // Init
  generateBars();
  
// (Optional Enhancements Later)
// Smooth horizontal transitions with transform or animation
// Highlight sorted bars at the end
// Add step counter or narration ("Comparing 35 and 20... Swapping!")