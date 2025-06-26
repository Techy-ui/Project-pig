window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const overlayContent = document.getElementById("overlayContent");
    const viewBtn = document.getElementById("viewBtn");

    // Blur initially and show View Profile button
    document.body.classList.add("blurred");
    overlay.style.display = "flex";

    viewBtn.addEventListener("click", () => {
        // Remove blur and overlay
        overlay.style.display = "none";
        document.body.classList.remove("blurred");
    });
});

// ✅ Updated popup function with no sound and message in center
function showMatches() {
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlayContent");
  const sound = document.getElementById("notifSound");

  document.body.classList.add("blurred");
  overlay.style.display = "flex";

  // Step 1: Show initial "Searching..." message
  overlayContent.innerHTML = `<div class="popup-messages show">🔍 Searching...</div>`;

  // Optional sound
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }

  // Step 2: After 2 seconds, update message
  setTimeout(() => {
    overlayContent.innerHTML = `<div class="popup-messages show">🔍 Oops! No one is ready to marry you 😜</div>`;
  }, 2000);

  // Step 3: Hide popup after total 4 seconds
  setTimeout(() => {
    overlay.style.display = "none";
    document.body.classList.remove("blurred");

    // Restore View Profile button
    overlayContent.innerHTML = `<button id="viewBtn">👁 View Profile</button>`;
    overlayContent.querySelector("#viewBtn").addEventListener("click", () => {
      overlay.style.display = "none";
      document.body.classList.remove("blurred");
    });
  }, 4000);
}

function viewRequests() {
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlayContent");
  const sound = document.getElementById("notifSound");

  document.body.classList.add("blurred");
  overlay.style.display = "flex";

  overlayContent.innerHTML = `<div class="popup-messages show">📩 Fetching requests...</div>`;

  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }

  setTimeout(() => {
    overlayContent.innerHTML = `<div class="popup-messages show">📩 2 Requests Found:<br>1. Michael 😏<br>2. A Pig 🐷</div>`;
  }, 2000);

  setTimeout(() => {
    overlay.style.display = "none";
    document.body.classList.remove("blurred");

    overlayContent.innerHTML = `<button id="viewBtn">👁 View Profile</button>`;
    overlayContent.querySelector("#viewBtn").addEventListener("click", () => {
      overlay.style.display = "none";
      document.body.classList.remove("blurred");
    });
  }, 4000);
}

