document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const notifications = Array.from(document.querySelectorAll(".notification-box"));
  const details = document.querySelector(".details");
  const topicCard = details.querySelector(".topic-card");
  const contentCard = details.querySelector(".content-card");
  const tabs = document.querySelectorAll(".tab");

  let emptyMessage = document.createElement("div");
  emptyMessage.textContent = "There are no archived notifications.";
  emptyMessage.style.color = "#555";
  emptyMessage.style.fontStyle = "italic";
  emptyMessage.style.textAlign = "center";
  emptyMessage.style.marginTop = "20px";
  emptyMessage.style.display = "none";
  sidebar.appendChild(emptyMessage);

  function resetSelection() {
    notifications.forEach(n => n.classList.remove("active"));
    topicCard.style.display = "none";
    contentCard.style.display = "none";
    details.style.display = "none";
  }

  function updateUnreadCount() {
    const unreadCount = notifications.filter(n => n.getAttribute("data-status") === "unread").length;
    tabs.forEach(tab => {
      if (tab.textContent.toLowerCase().includes("unread")) {
        const lines = tab.innerHTML.split("<br>");
        tab.innerHTML = `UNREAD<br>(${unreadCount})`;
      }
    });
  }

  function filterNotifications(statusFilter) {
    let anyVisible = false;

    notifications.forEach(n => {
      const status = n.getAttribute("data-status");
      n.classList.remove("hidden");

      if (statusFilter === "all") {
        anyVisible = true;
      } else if (statusFilter === "inbox" && status !== "archived") {
        anyVisible = true;
      } else if (statusFilter === "unread" && status === "unread") {
        anyVisible = true;
      } else if (statusFilter === "archived" && status === "archived") {
        anyVisible = true;
      } else {
        n.classList.add("hidden");
      }
    });

    if (anyVisible) {
      sidebar.classList.add("expanded");
      emptyMessage.style.display = "none";
    } else {
      sidebar.classList.add("expanded");
      emptyMessage.style.display = statusFilter === "archived" ? "block" : "none";
    }

    resetSelection();
  }

  // Initial load
  filterNotifications("all");
  updateUnreadCount();

  notifications.forEach(box => {
  box.addEventListener("click", () => {
    if (sidebar.classList.contains("expanded")) {
      sidebar.classList.remove("expanded");
      details.style.display = "flex";
    }

    notifications.forEach(n => n.classList.remove("active"));
    box.classList.add("active");

    const topic = box.getAttribute("data-topic") || "No Topic";
    const content = box.getAttribute("data-content") || "No details available.";

    topicCard.textContent = `Topic: ${topic}`;
    contentCard.textContent = content;
    topicCard.style.display = "block";
    contentCard.style.display = "block";

    // Mark as read if it was unread
    if (box.getAttribute("data-status") === "unread") {
      box.setAttribute("data-status", "read");
      box.classList.remove("unread");
      updateUnreadCount();
    }

    // Check if this is a birthday notification
    if (topic.toLowerCase().includes("birthday")) {
      // Trigger confetti effect for 3 seconds
      triggerConfetti();
    }
  });
});

function triggerConfetti() {
  const duration = 3 * 1000; // 3 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Since confetti uses canvas, you can tweak origin to sprinkle confetti all over horizontally
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: Math.random(), y: Math.random() * 0.6 }
    }));
  }, 250);
}

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabText = tab.textContent.toLowerCase();

      if (tabText.includes("all")) {
        filterNotifications("all");
      } else if (tabText.includes("inbox")) {
        filterNotifications("inbox");
      } else if (tabText.includes("unread")) {
        filterNotifications("unread");
      } else if (tabText.includes("archived")) {
        filterNotifications("archived");
      }
    });
  });
});
