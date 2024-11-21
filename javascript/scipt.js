const scrollAmount = 250; // Adjust based on the width of each article

function scrollRight() {
    const container = document.querySelector('.articles-grid');
    container.scrollLeft += scrollAmount;
}

function scrollLeft() {
    const container = document.querySelector('.articles-grid');
    container.scrollLeft -= scrollAmount;
}


function switchTab(tabName) {
  // Hide all tabs
  const tabs = document.querySelectorAll('.code-tab');
  tabs.forEach(tab => {
      tab.classList.remove('active-tab');
  });

  // Deactivate all tab buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
      button.classList.remove('active');
  });

  // Show the selected tab and activate the button
  document.getElementById(tabName).classList.add('active-tab');
  const activeButton = document.querySelector(`.tab-button[onclick="switchTab('${tabName}')"]`);
  activeButton.classList.add('active');
}

document.getElementById("submitProjectBtn").addEventListener("click", function() {
  this.classList.toggle("active");

  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files;

  // Check if files are selected
  if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
          console.log(files[i].name);  // Log the name of each file
      }
  } else {
      console.log("No files or folders selected.");
  }
});


// Check if the user is already subscribed
function checkSubscriptionStatus() {
  return localStorage.getItem("subscribed") === "true";
}

// Hide subscription prompt if already subscribed
function hideSubscriptionPrompt() {
  const subscribeSection = document.getElementById("subscribe-section");
  if (checkSubscriptionStatus() && subscribeSection) {
    subscribeSection.style.display = "none"; // Hide the subscription section
  }
}

// Set subscription status in localStorage
function setSubscriptionStatus() {
  localStorage.setItem("subscribed", "true");
}

// Handle form submission
document.getElementById("subscription-form")?.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from reloading the page
  setSubscriptionStatus(); // Set the subscription status to true
  alert("Thank you for subscribing!"); // Show a confirmation message
  document.getElementById("subscribe-section").style.display = "none"; // Hide the subscription form
});

// Call this function on page load to check subscription status
window.onload = hideSubscriptionPrompt;

// Ensure that the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function() {
  // Handle Unsubscribe
  const unsubscribeLink = document.getElementById("unsubscribe-link");
  
  // Check if unsubscribeLink exists
  if (unsubscribeLink) {
      unsubscribeLink.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent the default link behavior
          
          // Remove subscription status from localStorage
          localStorage.removeItem("subscribed");
          
          // Optionally, show a message
          alert("You have been unsubscribed successfully.");
          
          // Show the subscription section again if unsubscribed
          const subscribeSection = document.getElementById("subscribe-section");
          if (subscribeSection) {
              subscribeSection.style.display = "block";
          }
      });
  } else {
      console.log("Unsubscribe link not found.");
  }
});

function openInNewWindow(event) {
  event.preventDefault(); // Prevent default link behavior
  window.open(
      event.currentTarget.href, 
      '_blank', 
      'noopener,noreferrer,width=800,height=600'
  );
}

// Example Data for Releases
const upcomingReleases = [
  { name: "New iPhone", date: "2024-12-01", description: "The latest iPhone release." },
  { name: "PS5 Pro", date: "2024-12-15", description: "Enhanced PlayStation 5." }
];

const missedReleases = [
  { name: "MacBook Pro M3", date: "2024-11-01", description: "Released earlier this month." },
  { name: "Samsung Galaxy Fold 5", date: "2024-10-20", description: "The latest foldable." }
];

const releasesContainer = document.getElementById("releases");
const upcomingBtn = document.getElementById("upcoming-btn");
const missedBtn = document.getElementById("missed-btn");

// Function to Render Releases
function renderReleases(releases) {
  releasesContainer.innerHTML = ""; // Clear previous content
  releases.forEach(release => {
    const card = document.createElement("div");
    card.classList.add("release-card");
    card.innerHTML = `
      <h3>${release.name}</h3>
      <p><strong>Date:</strong> ${release.date}</p>
      <p>${release.description}</p>
    `;
    releasesContainer.appendChild(card);
  });
}

// Event Listeners for Switch Buttons
upcomingBtn.addEventListener("click", () => {
  renderReleases(upcomingReleases);
  upcomingBtn.classList.add("active");
  missedBtn.classList.remove("active");
  missedBtn.classList.add("inactive");
});

missedBtn.addEventListener("click", () => {
  renderReleases(missedReleases);
  missedBtn.classList.add("active");
  upcomingBtn.classList.remove("active");
  upcomingBtn.classList.add("inactive");
});

// Initial Load: Show Upcoming Releases
renderReleases(upcomingReleases);