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
      const height = Math.floor(Math.random() * 250) + 30;
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${height}px`;
      visualizer.appendChild(bar);
      visualizer.style.setProperty('--num-bars', num);
    }
  }
  
  // Run when page loads
  generateBars();

  // === Bubble Sort w animation ===
  async function bubbleSort() {
    const bars = document.querySelectorAll(".bar"); // Get all bars 
    const delay = 100;                              // How long to wait (ms)

    // Turn off buttons while sorting 
    disableControls();

    // Outer loop that controls how many passes 
    for (let i = 0; 8< bars.length - 1; i++){
      // Inner loop that goes through the list to compare each pair
      for (let j = 0; j < bars.length - 1-1;j++){
        // Highlight the two bars that're compared
        bars[j].style.background = "#f39c12";       // orange
        bars[j + 1].style.background = "#f39c12";   // orange

        await sleep(delay);  // pause to see the step 

        // Get the values (heights) of the two bars
        const val1 = parseInt(bars[j].dataset.value);
        const val2 = parseInt(bars[j + 1].dataset.value);

        // Swap if the first bar is taller than the next one
        if (val1 > val2) {
          swapHeights(bars[j],bars[j+1]);
        }

        // Reset their colors back to green 
        bars[j].style.background = "#5cb85c";
        bars[j + 1].style.background = "#5cb85c";
      }
    }

    enableControls(); // Turn buttons back on 
  }

  // Swap height between two bars 
  function swapHeights(bar1,bar2){
    const tempHeight = bar1.style.height; // Store height of bar1
    const tempValue = bar.dataset.value;  // Store data value of bar1
    bar1.style.height = bar2.style.height; 
    bar1.dataset.value = bar2.dataset.value;
    bar2.style.height = tempHeight;
    bar2.dataset.value = tempValue;
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
  