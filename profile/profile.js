
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("blurred");

    const viewBtn = document.getElementById("viewBtn");
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popupMessage");
    const sound = document.getElementById("notifSound");
    const notificationLink = document.getElementById("notificationLink");

    let showSecondNotif = true;

    viewBtn.addEventListener("click", () => {
        // Remove blur and overlay
        document.body.classList.remove("blurred");
        overlay.style.display = "none";

        // First notification is scheduled after 5 seconds
        setTimeout(() => {
            // Wait until blur is gone
            waitUntilNotBlurred(() => {
                showPopup("You have an unread notification!", sound);

                // Hide after 4s
                setTimeout(() => {
                    popup.classList.remove("show");

                    // Wait another 6s before second
                    setTimeout(() => {
                        // Again, wait until unblurred
                        if (showSecondNotif) {
                            waitUntilNotBlurred(() => {
                                showPopup("Please check your notifications!", sound);

                                // Hide second popup after 4s
                                setTimeout(() => {
                                    popup.classList.remove("show");
                                }, 4000);
                            });
                        }
                    }, 6000);
                }, 4000);
            });
        }, 5000);
    });

    // Helper to show popup with sound
    function showPopup(message, sound) {
        const popup = document.getElementById("popupMessage");
        popup.textContent = message;
        popup.classList.add("show");
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }

    // Helper to wait until blur is gone
    function waitUntilNotBlurred(callback) {
        const check = () => {
            if (!document.body.classList.contains("blurred")) {
                callback();
            } else {
                setTimeout(check, 200); // Keep checking every 200ms
            }
        };
        check();
    }
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

