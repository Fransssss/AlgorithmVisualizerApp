// Toggle dark mode
document.getElementById("dark-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  
  // Visualization (basic sample for bars)
  const visualizer = document.getElementById("visualizer");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  
  function generateBars(num = 30) {
    visualizer.innerHTML = '';
    for (let i = 0; i < num; i++) {
      const height = Math.floor(Math.random() * 250) + 30;
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${height}px`;
      visualizer.appendChild(bar);
    }
  }
  
  startBtn.addEventListener("click", () => {
    alert("Algorithm will animate soon! For now, just relax and see bars.");
    // In real: Call sort algorithm here
  });
  
  resetBtn.addEventListener("click", () => {
    generateBars();
  });
  
  // Init
  generateBars();
  