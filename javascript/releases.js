
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
    { name: "iPhone 16 Pro", date: "2024-12-01", description: "Apple's next-gen flagship." },
    { name: "PS5 Slim", date: "2024-12-05", description: "Sony's compact PlayStation model." },
    { name: "Google Pixel Watch 2", date: "2024-12-10", description: "Google's new smartwatch." },
    { name: "AMD Radeon 8000", date: "2024-12-15", description: "Next-gen graphics card." },
  
    { name: "Tesla Cybertruck", date: "2025-01-05", description: "Tesla's futuristic truck." },
    { name: "Meta Quest 4", date: "2025-01-10", description: "Meta's new VR headset." },
    { name: "Galaxy S25 Ultra", date: "2025-01-20", description: "Samsung's premium smartphone." },
    { name: "Dell XPS 15 OLED", date: "2025-01-25", description: "Next-gen ultrabook." },
  
    { name: "Nintendo Switch 2", date: "2025-02-01", description: "Nintendo's console refresh." },
    { name: "Apple AR Glasses", date: "2025-02-10", description: "Apple's augmented reality glasses." },
    { name: "Intel Core i15", date: "2025-02-15", description: "Intel's next-gen processor." },
    { name: "Sony A7R VI", date: "2025-02-20", description: "Sony's professional camera upgrade." },
  
    { name: "OnePlus 13 Pro", date: "2025-03-01", description: "Flagship killer smartphone." },
    { name: "Surface Studio 3", date: "2025-03-10", description: "Microsoft's desktop powerhouse." },
    { name: "Razer Blade 18", date: "2025-03-20", description: "High-performance gaming laptop." },
    { name: "Google Nest Hub 4", date: "2025-03-15", description: "Next-gen smart display." }
   
  
  ];
  
  const missedReleases = [
    { name: "MacBook Pro M3", date: "2024-11-01", description: "Released earlier this month." },
    { name: "Samsung Galaxy Fold 5", date: "2024-10-20", description: "The latest foldable." },
    { name: "DJI Mini 5 Drone", date: "2024-10-10", description: "Compact and powerful drone." },
    { name: "iPad Air 6", date: "2024-09-25", description: "Apple's mid-range tablet." },
  
    { name: "NVIDIA RTX 5090", date: "2024-09-10", description: "Ultimate graphics card." },
    { name: "Sony WH-1000XM6", date: "2024-08-30", description: "Industry-leading headphones." },
    { name: "Asus ROG Phone 7", date: "2024-08-15", description: "Gaming powerhouse smartphone." },
    { name: "Microsoft Surface Duo 3", date: "2024-08-01", description: "Dual-screen smartphone." },
  
    { name: "Pixel 9", date: "2024-07-20", description: "Google's flagship smartphone." },
    { name: "Apple Watch Series 10", date: "2024-07-10", description: "10th anniversary edition." },
    { name: "Bose Smart Soundbar 900", date: "2024-06-25", description: "High-quality sound system." },
    { name: "Alienware Aurora R16", date: "2024-06-15", description: "Next-gen gaming desktop." },
  
    { name: "Huawei MatePad Pro 14", date: "2024-06-01", description: "Premium Android tablet." },
    { name: "Xiaomi Mi 14 Ultra", date: "2024-05-20", description: "Cutting-edge smartphone." },
    { name: "Logitech MX Master 4", date: "2024-05-10", description: "The ultimate productivity mouse." },
    { name: "HTC Vive XR Elite", date: "2024-05-01", description: "Next-gen VR experience." }
  
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