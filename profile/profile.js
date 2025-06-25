window.addEventListener("DOMContentLoaded", () => {
    // Add blur initially
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

        // First notification after 5 seconds
        setTimeout(() => {
            popup.textContent = "You have an unread notification!";
            popup.classList.add("show");
            if (sound) {
                sound.currentTime = 0;
                sound.play();
            }

            // Hide first notification after 4 seconds
            setTimeout(() => {
                popup.classList.remove("show");

                // Wait 4 MORE seconds, then show second only if not clicked
                setTimeout(() => {
                    if (showSecondNotif) {
                        popup.textContent = "Please check your notifications!";
                        popup.classList.add("show");
                        if (sound) {
                            sound.currentTime = 0;
                            sound.play();
                        }

                        // Hide second after 4s
                        setTimeout(() => {
                            popup.classList.remove("show");
                        }, 4000);
                    }
                }, 6000); // Wait after first hides

            }, 4000); // First notification duration

        }, 5000); // Delay after View Profile click
    });

    // Cancel second   if user clicks
    if (notificationLink) {
        notificationLink.addEventListener("click", () => {
            showSecondNotif = false;
        });
    }
});
