function applyGravityToAllElements() {

  const resetButton = document.createElement("button");
  const themeToggle = document.createElement("themeToggle");
  resetButton.textContent = "Reset";
  resetButton.id = "resetButton";
  let timer = Date.now() + 60000;
  resetButton.classList.add(
    "bottom-5",
    "right-5",
    "bg-red-500",
    "text-white",
    "px-4",
    "py-2",
    "rounded-md",
    "shadow-2xl",
    "custom-pointer",
    "shadow-outline"
  );
  resetButton.style.bottom = "5px";
  resetButton.style.left = "5px";
  document.body.appendChild(resetButton);

  let width = 230;
  let height = 50;
  resetButton.classList.add('fixed');
  resetButton.addEventListener('click', () => {
    resetEverything();
  })
  const resizeInterval = setInterval(() => {
    width += 0.01;
    height += 0.01;
    resetButton.innerText = `${Math.floor((timer - Date.now()) / 1000)}sec to Press And Cancel !`
    resetButton.style.width = `${width}px`;
    resetButton.style.height = `${height}px`;
  }, 1);

  const elements = document.querySelectorAll(
    "*:not(html):not(body):not(head):not(head *)"
  )
  themeToggle.style.position = 'fixed';
  elements.forEach((element) => {
    const horizontalDrift = (Math.random() - 0.5) * 25;
    const rotation = (Math.random() - 0.5) * 50;

    element.style.transition = "transform 60s ease-in-out";

    element.style.transform = `translateY(100vh) translateX(${horizontalDrift}vw) rotate(${rotation}deg)`;
    resetButton.style.transform = '';

    themeToggle.style.transform = '';

    element.addEventListener(
      "transitionend",
      () => {
        element.remove();
        document.documentElement.innerHTML =
          `<html><body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color:black;">
            <div style="color:white; font-size: 100px;">
              BOOOOOOOOOOOOOM!
            </div>
          </body></html>`
      },
      { once: true }
    );
  });

  function resetEverything() {
    clearInterval(resizeInterval);
    location.reload();
  }
}
