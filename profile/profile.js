window.addEventListener("DOMContentLoaded", () => {
    // Add blur initially
    document.body.classList.add("blurred");

    const viewBtn = document.getElementById("viewBtn");
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popupMessage");
    const sound = document.getElementById("notifSound");

    viewBtn.addEventListener("click", () => {
        // Remove blur and overlay
        document.body.classList.remove("blurred");
        overlay.style.display = "none";

        // Play popup + sound after 5 seconds
        setTimeout(() => {
            popup.classList.add("show");
            if (sound) sound.play();

            setTimeout(() => {
                popup.classList.remove("show");
            }, 4000);
        }, 5000);
    });
});
