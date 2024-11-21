// Save subscription status and email to localStorage
function setSubscriptionStatus(email) {
  localStorage.setItem("subscribed", "true"); // Store subscribed status
  localStorage.setItem("email", email); // Store the email address
}

// Check if the user is subscribed
function checkSubscriptionStatus() {
  return localStorage.getItem("subscribed") === "true"; // Returns true or false
}

// Clear subscription status and email from localStorage
function clearSubscriptionStatus() {
  localStorage.removeItem("subscribed"); // Remove subscribed status
  localStorage.removeItem("email"); // Remove the email address
}

// Hide subscription form if already subscribed
function hideSubscriptionPrompt() {
  const subscribeSection = document.getElementById("subscribe-section");
  if (checkSubscriptionStatus() && subscribeSection) {
      subscribeSection.style.display = "none"; // Hide subscription section
  }
}

// Update unsubscribe link visibility
function updateUnsubscribeLink() {
  const unsubscribeLink = document.getElementById("unsubscribe-link");
  if (checkSubscriptionStatus() && unsubscribeLink) {
      unsubscribeLink.style.display = "inline"; // Show unsubscribe link
  } else if (unsubscribeLink) {
      unsubscribeLink.style.display = "none"; // Hide unsubscribe link
  }
}

// Queue subscription/unsubscription actions locally
function queueAction(action, email) {
  const pendingActions = JSON.parse(localStorage.getItem("pendingActions") || "[]");
  pendingActions.push({ action, email, timestamp: new Date().toISOString() });
  localStorage.setItem("pendingActions", JSON.stringify(pendingActions));
  alert(`${action === "subscribe" ? "Subscription" : "Unsubscription"} queued.`);
}

// Sync queued actions with the server
async function syncPendingActions() {
  const pendingActions = JSON.parse(localStorage.getItem("pendingActions") || "[]");

  if (pendingActions.length === 0) {
      console.log("No pending actions to sync.");
      return;
  }

  try {
      const response = await fetch("http://127.0.0.1:3000/process-queue", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ actions: pendingActions }),
      });

      if (response.ok) {
          alert("Pending actions synced successfully!");
          localStorage.removeItem("pendingActions"); // Clear queue
      } else {
          alert("Failed to sync actions.");
      }
  } catch (error) {
      console.error("Error syncing actions:", error);
  }
}

// Handle form submission
document.getElementById("subscription-form")?.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page reload
  const email = document.getElementById("email").value; // Get email input
  if (!email) {
      alert("Please enter a valid email!");
      return;
  }
  setSubscriptionStatus(email); // Save subscription status and email
  queueAction("subscribe", email); // Queue subscription action
  alert(`Thank you for subscribing with ${email}!`); // Show confirmation
  document.getElementById("subscribe-section").style.display = "none"; // Hide form
  updateUnsubscribeLink(); // Update unsubscribe link visibility
});

// Handle unsubscribe
document.getElementById("unsubscribe-link")?.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent default link behavior
  const email = localStorage.getItem("email");
  if (!email) {
      alert("No email found to unsubscribe.");
      return;
  }
  clearSubscriptionStatus(); // Clear subscription data
  queueAction("unsubscribe", email); // Queue unsubscription action
  alert("You have been unsubscribed successfully."); // Show confirmation
  document.getElementById("subscribe-section").style.display = "block"; // Show subscription form
  updateUnsubscribeLink(); // Update unsubscribe link visibility
});

// Sync pending actions when server is online
syncPendingActions();

// Initialize on page load
window.onload = function() {
  hideSubscriptionPrompt(); // Hide form if subscribed
  updateUnsubscribeLink(); // Update unsubscribe link visibility
};

  function openInNewWindow(event) {
    event.preventDefault(); // Prevent default link behavior
    window.open(
        event.currentTarget.href, 
        '_blank', 
        'noopener,noreferrer,width=800,height=600'
    );
}