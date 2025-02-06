document.addEventListener("DOMContentLoaded", () => {
  fetch('/header.html') // Adjust the path if needed
      .then(response => {
          if (!response.ok) throw new Error(`Failed to fetch header: ${response.statusText}`);
          return response.text();
      })
      .then(data => {
          const container = document.getElementById('header-container');
          if (!container) {
              console.error("Error: #header-container not found in the DOM.");
              return;
          }
          container.innerHTML = data;

          console.log("Header successfully loaded.");

          // Attach dropdown menu event listeners
          if (typeof attachDropdownMenuListeners === 'function') {
              attachDropdownMenuListeners();
          } else {
              console.error("attachDropdownMenuListeners is not defined.");
          }
      })
      .catch(error => console.error("Error loading header:", error));
});

// Check if the required elements exist on the page
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('.tab-c3293482jdfsdfsdfss');
  const codeBlocks = document.querySelectorAll('.code-block-c3293482jdfsdfsdfss');

  if (tabs.length > 0 && codeBlocks.length > 0) {
      tabs.forEach(tab => {
          tab.addEventListener('click', () => {
              // Remove 'active' class from all tabs and blocks
              tabs.forEach(t => t.classList.remove('active'));
              codeBlocks.forEach(block => block.classList.remove('active'));

              // Activate the clicked tab and corresponding code block
              tab.classList.add('active');
              const activeBlock = document.getElementById(tab.dataset.tab);
              if (activeBlock) {
                  activeBlock.classList.add('active');
              }
          });
      });
  }
});

/* code for language coding pages */
function toggleChapter(chapterId) {
  const chapter = document.getElementById(chapterId);

  // Explicitly check computed style for visibility
  if (window.getComputedStyle(chapter).display === "none") {
    chapter.style.display = "block"; // Open the section
  } else {
    chapter.style.display = "none"; // Close the section
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Fetch and insert the footer
  fetch('/footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch footer: ${response.statusText}`);
      }
      return response.text();
    })
    .then(data => {
      const container = document.getElementById('footer-container');
      if (!container) {
        console.error("Error: #footer-container not found in the DOM.");
        return;
      }
      container.innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading footer:", error);
    });
});

// Contact us message handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
      contactForm.addEventListener("submit", async function (event) {
          event.preventDefault(); // Prevent form reload

          const name = document.getElementById("name").value.trim();
          const email = document.getElementById("email").value.trim();
          const message = document.getElementById("message").value.trim();
          const statusMessage = document.getElementById("status-message");

          if (!name || !email || !message) {
              statusMessage.textContent = "Please fill out all fields.";
              return;
          }

          // Send data to Airtable
          try {
              const dateValue = new Date().toISOString().split("T")[0]; // Sends only the date (YYYY-MM-DD)

              const response = await fetch("https://api.airtable.com/v0/app81xchmVjhSK7KP/Table%201", {
                  method: "POST",
                  headers: {
                      Authorization: "Bearer patg88SANt9E8IXPo.3df06e2bb52809a794cd4a4d21aa42295c39f58f0c9d3ce8dbea83f07368dd0b",
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      fields: {
                          Name: name,
                          Email: email,
                          Message: message,
                          "Date Submitted": dateValue, // Match Airtable's format for the Date field
                      },
                  }),
              });

              if (response.ok) {
                  statusMessage.textContent = "Your message has been sent successfully!";
                  contactForm.reset(); // Clear the form
              } else {
                  const errorData = await response.json();
                  console.error("Error from Airtable:", errorData);
                  statusMessage.textContent = "An error occurred. Please try again.";
              }
          } catch (error) {
              console.error("Error:", error);
              statusMessage.textContent = "An error occurred. Please try again.";
          }
      });
  }
});

// smooth scrolling 
document.addEventListener("DOMContentLoaded", () => {
  // Get all anchor links
  const anchorLinks = document.querySelectorAll("a[href^='#']");

  // Add click event listener to each anchor link
  anchorLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Get the target element
      const targetId = this.getAttribute("href").substring(1); // Remove the '#' symbol
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Adjust scroll position for sticky header
        const offset = document.querySelector("#header-container").offsetHeight; // Get sticky header height
        const targetPosition = targetElement.offsetTop - offset;

        // Smooth scroll to the target position
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});

// smooth scrolling for topic stuffs
document.addEventListener("DOMContentLoaded", () => {
  const adjustScroll = () => {
    // Get the hash from the URL (e.g., #topic1)
    const hash = window.location.hash.substring(1);

    if (hash) {
      const targetElement = document.getElementById(hash);

      if (targetElement) {
        // Total offset: header + language bar + margin
        const totalOffset = 122.95;

        // Use setTimeout to ensure all layout calculations are complete
        setTimeout(() => {
          const targetPosition = targetElement.offsetTop - totalOffset;

          // Smooth scroll to the adjusted position
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }, 100); // Delay in milliseconds (adjust if needed)
      }
    }
  };

  // Adjust scroll on page load
  window.onload = adjustScroll;

  // Adjust scroll on hash change (e.g., user clicks a link)
  window.addEventListener("hashchange", adjustScroll);
});

// coding language nav link active button thing
function activateNavLink() {
  console.log("Checking active nav link...");

  // Define the mapping between parent languages and their pages
  const languageMapping = {
    html: [ "html-introduction", "html-structure", "html-elements", "html-attributes", "html-headings", "html-paragraphs", "html-formatting", "html-comments", "html-links", "html-images", "html-lists", "html-tables", "html-forms", "html-divs", "html-classes", "html-ids", "html-iframe", "html-css", "html-javascript", "html-file-paths", "html-head"],
    css: [ "css-introduction", "css-syntax", "css-selectors", "css-in-html", "css-adv-selectors", "css-colors", "css-backgrounds", "css-borders", "css-margins", "css-padding", "css-box-model", "css-width-height", "css-units", "css-fonts", "css-text", "css-links", "css-lists", "css-position", "css-display", "css-float-clear", "css-overflow", "css-flexbox", "css-grid", "css-flex", "css-media-queries", "css-responsive", "css-transitions", "css-animations", "css-transform", "css-shadows", "css-variables", "css-z-index", "css-clipping", "css-masking", "css-filters", "css-shapes"],
    javascript: [ "js-introduction", "js-setting-up", "js-syntax", "js-output", "js-comments", "js-variables", "js-let-const-var", "js-data-types", "js-type-conversion", "js-arithmetic-operators", "js-assignment-operators", "js-comparison-operators", "js-logical-operators", "js-bitwise-operators", "js-if-else", "js-switch", "js-ternary-operator", "js-loops-introduction", "js-for-loops", "js-while-loops", "js-do-while-loops", "js-break-continue", "js-introduction-objects", "js-creating-objects", "js-accessing-properties", "js-modifying-properties", "js-object-methods", "js-object-constructors", "js-object-prototypes", "js-classes-inheritance", "js-introduction-arrays", "js-creating-modifying-arrays", "js-array-methods", "js-iterating-arrays", "js-sorting-searching-arrays", "js-multidimensional-arrays", "js-this-keyword", "js-es6-modules", "js-destructuring", "js-spread-rest-operators", "js-default-parameters", "js-template-literals", "js-error-handling", "js-strict-mode", "js-json", "js-regex", "js-date-time"],
  };

  const navLinks = document.querySelectorAll(".coding-languages-list-9321pookie li a");
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop().split('.')[0];

  navLinks.forEach(link => {
    const hrefFile = link.getAttribute("href").split('/').pop().split('.')[0];
    let isActive = false;

    for (const [language, pages] of Object.entries(languageMapping)) {
      if (pages.includes(currentFile) && pages.includes(hrefFile)) {
        isActive = true;
        break;
      }
    }

    if (isActive) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  console.log("Active nav link check complete.");
}

// exercise reveal/hide answer button 
document.addEventListener("DOMContentLoaded", () => {
  // Find all buttons with the class 'reveal-answer-btn'
  const revealButtons = document.querySelectorAll(".reveal-answer-btn");

  // If no buttons exist, exit to prevent errors
  if (revealButtons.length === 0) return;

  // Add click event listener to each button
  revealButtons.forEach(button => {
      button.addEventListener("click", () => {
          const answerId = button.getAttribute("data-answer-id");
          const answerDiv = document.getElementById(answerId);

          // Check if the corresponding answer exists
          if (answerDiv) {
              if (answerDiv.classList.contains("blurred-answer")) {
                  // Unblur the answer and change button text to "Hide Answer"
                  answerDiv.classList.remove("blurred-answer");
                  button.textContent = "Hide Answer";
              } else {
                  // Blur the answer again and change button text to "Reveal Answer"
                  answerDiv.classList.add("blurred-answer");
                  button.textContent = "Reveal Answer";
              }
          }
      });
  });
});

// HTML Quick Menu Loader
document.addEventListener('DOMContentLoaded', () => {
  fetch('/html/html-quick-menu.html') // Adjust based on your folder structure
      .then(response => {
          if (!response.ok) {
              throw new Error(`Failed to fetch HTML Quick Menu: ${response.statusText}`);
          }
          return response.text();
      })
      .then(data => {
          const container = document.getElementById('html-quick-menu');
          if (!container) {
              console.error("Error: #html-quick-menu not found in the DOM.");
              return;
          }
          container.innerHTML = data;

          // 🟢 Initialize previous ranking system AFTER loading menu
          initializeTopicRankingSystem();

          // 🟢 Attach event listeners for the hamburger menu AFTER menu loads
          initializeHamburgerMenu();
      })
      .catch(error => console.error("Error loading HTML Quick Menu:", error));
});

// CSS Quick Menu Loader
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the CSS Quick Menu content
  fetch('/css/css-quick-menu.html') // Adjust the path based on your folder structure
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch CSS Quick Menu: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      const container = document.getElementById('css-quick-menu');
      if (!container) {
        console.error("Error: #css-quick-menu not found in the DOM.");
        return;
      }
      container.innerHTML = data;

      // Initialize topic ranking system after menu is loaded
      initializeTopicRankingSystem();
    })
    .catch((error) => console.error('Error loading CSS Quick Menu:', error));
});

// JS Quick Menu Loader
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the JavaScript Quick Menu content
  fetch('/javascript/js-quick-menu.html') // Adjust the path based on your folder structure
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch JavaScript Quick Menu: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      const container = document.getElementById('js-quick-menu');
      if (!container) {
        console.error("Error: #js-quick-menu not found in the DOM.");
        return;
      }
      container.innerHTML = data;

      // Initialize topic ranking system after menu is loaded
      initializeTopicRankingSystem();
    })
    .catch((error) => console.error('Error loading JavaScript Quick Menu:', error));
});

// Universal Ranking System Initialization
function initializeTopicRankingSystem() {
  const statuses = ["neutral", "green", "amber", "red"]; // Define all statuses
  const allQuickMenus = document.querySelectorAll(".quick-plan-list-klm123");

  allQuickMenus.forEach(menu => {
      const menuItems = menu.querySelectorAll(".menu-item");

      menuItems.forEach(menuItem => {
          const link = menuItem.querySelector(".menu-link");
          const statusButton = menuItem.querySelector(".status-button");
          const hrefKey = link.getAttribute("href");

          // Load saved status from localStorage
          const savedStatus = localStorage.getItem(hrefKey);
          if (savedStatus) {
              link.className = `menu-link ${savedStatus}`; // Apply the saved status
          }

          // Add click listener to the status button
          statusButton.addEventListener("click", () => {
              const currentStatus = statuses.find(status =>
                  link.classList.contains(status)
              );
              const currentIndex = statuses.indexOf(currentStatus);
              const nextIndex = (currentIndex + 1) % statuses.length;
              const nextStatus = statuses[nextIndex];

              // Update the link's class
              link.className = `menu-link ${nextStatus}`;

              // Save the updated status in localStorage
              localStorage.setItem(hrefKey, nextStatus);
          });
      });
  });
}

// Select all navigation links
const navLinks = document.querySelectorAll('.nav-link');
const contentContainer = document.getElementById('content');

// Add event listeners to links
navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault(); // Prevent full page reload

    const url = link.href;

    // Fetch the new page content
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching ${url}`);
        }
        return response.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#content').innerHTML;

        contentContainer.innerHTML = newContent;
        history.pushState(null, '', url);

        // Reinitialize scripts for dynamically loaded content
        reinitializeScripts();
      })
      .catch(error => {
        console.error('Error loading page:', error);
      });
  });
});

// Handle browser navigation (back/forward buttons)
window.addEventListener('popstate', () => {
  fetch(location.href)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newContent = doc.querySelector('#content').innerHTML;
      contentContainer.innerHTML = newContent;
      reinitializeScripts();
    });
});

// i think its the nav links, not sure
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link'); // All navigation links
  const contentContainer = document.getElementById('content'); // Main content container

  navLinks.forEach(link => {
      link.addEventListener('click', event => {
          event.preventDefault(); // Prevent full page reload

          const url = link.getAttribute('href'); // Get the href of the clicked link

          // Fetch the new content
          fetch(url)
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`Failed to fetch ${url}`);
                  }
                  return response.text();
              })
              .then(html => {
                  const parser = new DOMParser();
                  const doc = parser.parseFromString(html, 'text/html');
                  const newContent = doc.querySelector('#content').innerHTML;

                  // Replace the current content
                  contentContainer.innerHTML = newContent;

                  // Update the browser's history
                  history.pushState(null, '', url);
              })
              .catch(error => console.error('Error loading content:', error));
      });
  });

  // Handle browser navigation (back/forward buttons)
  window.addEventListener('popstate', () => {
      fetch(location.href)
          .then(response => response.text())
          .then(html => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const newContent = doc.querySelector('#content').innerHTML;
              contentContainer.innerHTML = newContent;
          });
  });
});

// Select all chapter titles
const chapterTitles = document.querySelectorAll(".chapter-title-unique-004");

// Add click event listeners to toggle chapters
chapterTitles.forEach((title) => {
  title.addEventListener("click", () => {
    const chapterNumber = title.dataset.chapter; // Get chapter number
    const topicsList = document.getElementById(`chapter-${chapterNumber}-topics-unique-006`);

    // Toggle visibility of the topics
    if (topicsList.style.display === "block") {
      topicsList.style.display = "none"; // Collapse
    } else {
      topicsList.style.display = "block"; // Expand
    }
  });
});

// Add functionality for topic buttons
const topicButtons = document.querySelectorAll(".topic-button-unique-007");

topicButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    alert(`You clicked on: ${e.target.textContent}`);
    // Replace the alert with actual functionality as needed
  });
});

// Toggle chapters open/close
document.querySelectorAll('.unique-chapter-button').forEach(button => {
  button.addEventListener('click', () => {
      const chapterId = button.getAttribute('data-chapter');
      const topicsContainer = document.querySelector(`#unique-${chapterId}-topics`);
      topicsContainer.classList.toggle('open');
      topicsContainer.style.display = topicsContainer.style.display === 'block' ? 'none' : 'block';
  });
});

// Toggle completion for topics and chapters
document.querySelectorAll('.completion-button').forEach(button => {
  button.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent triggering the topic link
      const circle = button.querySelector('.completion-circle');
      circle.classList.toggle('completed');
  });
});

// Load in the course VSP quick menu and header
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded. Attempting to fetch quick menu...");

  fetch("vsp-quick-menu.html")
      .then((response) => {
          if (!response || !response.ok) {
              throw new Error(`HTTP error! status: ${response ? response.status : "undefined response"}`);
          }
          return response.text();
      })
      .then((html) => {
          // Insert the quick menu HTML into the placeholder
          const quickMenuContainer = document.getElementById("vsp-quick-menu");
          if (quickMenuContainer) {
              quickMenuContainer.innerHTML = html;
              console.log("Quick menu loaded successfully.");

              // Add event listeners after content injection
              const hamburgerButton = document.getElementById("hamburger-menu-toggle");
              const menuContainer = document.getElementById("unique-quick-menu-container");

              if (hamburgerButton && menuContainer) {
                  hamburgerButton.addEventListener("click", () => {
                      menuContainer.classList.toggle("hidden");
                  });
                  console.log("Hamburger menu event listener attached.");
              } else {
                  console.error("Hamburger button or menu container not found.");
              }
          } else {
              console.error("Quick menu placeholder not found.");
          }
      })
      .catch((error) => {
          console.error("Error fetching quick menu:", error);
      });
});

// code for course topic section revealing stuff 
document.addEventListener("DOMContentLoaded", () => {
  // Select all completion buttons
  const completionButtons = document.querySelectorAll(".unique-completion-button-001");

  completionButtons.forEach((button) => {
      button.addEventListener("click", () => {
          // Get the current section and next section ID
          const currentSection = button.parentElement;
          const nextSectionId = currentSection.nextElementSibling?.id;

          // If there's a next section, show it and scroll into view with offset
          if (nextSectionId) {
              const nextSection = document.getElementById(nextSectionId);
              if (nextSection) {
                  nextSection.style.display = "block"; // Make it visible

                // Adjust scrolling for fixed header and custom offset
const headerHeight = document.querySelector('header')?.offsetHeight || 0;
const customOffset = 95; // Customize this value for additional spacing
const sectionPosition = nextSection.offsetTop - headerHeight - customOffset;

window.scrollTo({
    top: sectionPosition,
    behavior: "smooth",
});
              }
          }

          // Check if all sections in the main container are visible
          const parentMain = button.closest("main");
          const allSections = parentMain.querySelectorAll(".unique-section-container-001");
          const allCompleted = Array.from(allSections).every(
              (section) => section.style.display === "block"
          );

          // If all sections are completed, mark the chapter as complete
          if (allCompleted) {
              const chapterButton = document.querySelector(
                  `[data-chapter="${parentMain.getAttribute("data-chapter")}"]`
              );
              if (chapterButton) {
                  const completionCircle = chapterButton.querySelector(".completion-circle");
                  if (completionCircle) {
                      completionCircle.style.backgroundColor = "green"; // Mark chapter complete
                  }
              }
          }
      });
  });
});

// completion button status thing 
document.addEventListener("DOMContentLoaded", () => {

  const finalCompletionButton = document.getElementById("final-completion-button");

  // Load progress from localStorage
  const savedProgress = JSON.parse(localStorage.getItem("topicProgress")) || {};

  const topicLinks = document.querySelectorAll(".unique-topic-link");

  let isAnyUnmarked = false; // Initialize the flag
  const currentUrl = window.location.href; // Initialize the current URL

  if (finalCompletionButton) {
      finalCompletionButton.addEventListener("click", () => {
          console.log("Final completion button clicked.");

          // Get the current URL
          const currentUrl = window.location.href;

          // Find the corresponding completion-circle based on the current URL
          const topicLinks = document.querySelectorAll(".unique-topic-link");
          let isAnyUnmarked; // Flag to track if any section is unmarked

          topicLinks.forEach((link) => {
              const linkHref = new URL(link.getAttribute("href"), window.location.origin).href; // Absolute URL
              console.log("Checking link:", linkHref);

              if (currentUrl === linkHref) {
                  console.log("Match found for link:", linkHref);

                  // Find the completion-circle and toggle its state
                  const completionCircle = link.querySelector(".completion-circle");
                  if (completionCircle) {
                      const isCompleted = completionCircle.classList.contains("completed");
                      if (isCompleted) {
                          // Mark as complete
                          completionCircle.classList.add("completed");
                          console.log("Marked as completed.");
                          savedProgress[linkHref] = true;
                      } else {
                          // Mark as complete
                          completionCircle.classList.add("completed");
                          console.log("Marked as completed.");
                          savedProgress[linkHref] = true;
                      }
                  }
              }
          });


            // Save progress to localStorage
if (!isAnyUnmarked) {
  savedProgress[currentUrl] = true; // Save the current URL as completed
} else {
  delete savedProgress[currentUrl]; // Remove the current URL from completed
}
      });
  } else {
      console.error("Final completion button not found.");
  }

localStorage.setItem("topicProgress", JSON.stringify(savedProgress));
console.log("Updated progress saved to localStorage:", savedProgress);

  // Restore progress
  document.addEventListener("DOMContentLoaded", () => {
    restoreProgress(); 
  });
    const restoreProgress = () => {
        console.log("Restoring progress from localStorage...");
        const savedProgress = JSON.parse(localStorage.getItem("topicProgress")) || {};
console.log("Retrieved progress from localStorage:", savedProgress);

        const topicLinks = document.querySelectorAll(".unique-topic-link");
        topicLinks.forEach((link) => {
            const completionCircle = link.querySelector(".completion-circle");
            if (completionCircle) {
                const linkHref = new URL(link.getAttribute("href"), window.location.origin).href;
                if (savedProgress[linkHref]) {
                    completionCircle.classList.add("completed");
                    console.log(`Restored ${linkHref} as completed.`);
                }
            }
        });
    };

    // If the menu is dynamically loaded, call restoreProgress after it's loaded
    const quickMenu = document.getElementById("vsp-quick-menu");
    if (quickMenu && quickMenu.innerHTML.trim() === "") {
        const observer = new MutationObserver(() => {
            restoreProgress();
            observer.disconnect(); // Stop observing once progress is restored
        });
        observer.observe(quickMenu, { childList: true, subtree: true });
    } else {
        restoreProgress();
    }
  
  // Call the function immediately to set the button text on page load

// Handle the final completion button click
if (finalCompletionButton) {
  finalCompletionButton.addEventListener("click", () => {
      let isAnyUnmarked = false;

      topicLinks.forEach((link) => {
          const linkHref = new URL(link.getAttribute("href"), window.location.origin).href;
          const completionCircle = link.querySelector(".completion-circle");

          if (completionCircle) {
              const isCompleted = completionCircle.classList.contains("completed");

              if (isCompleted) {
                  // Unmark as complete
                  completionCircle.classList.remove("completed");
                  delete savedProgress[linkHref];
                  isAnyUnmarked = true;
              } else {
                  // Mark as complete
                  completionCircle.classList.add("completed");
                  savedProgress[linkHref] = true;
              }
          }
      });


// Save updated progress to localStorage
localStorage.setItem("topicProgress", JSON.stringify(savedProgress));
console.log("Updated progress saved to localStorage:", savedProgress);

// Update the text of the final-completion-button
});
} else {
console.error("Final completion button not found.");
}
});

// progress bar styling 
document.addEventListener("DOMContentLoaded", () => {
  const progressBarContainerId = "topic-progress-bar"; // ID of the progress bar container
  const progressBarFillId = "topic-progress-bar-fill"; // ID of the progress bar fill element
  const sectionsClass = ".unique-section-container-001"; // Class for each section
  const completionButtonClass = ".unique-completion-button-001"; // Class for each button

  let completedSections = 0; // Counter for completed sections
  let totalSections = 0; // Total sections on the page

  const initializeProgressBar = () => {
      const progressBarFill = document.getElementById(progressBarFillId);
      const sections = document.querySelectorAll(sectionsClass);
      totalSections = sections.length;

      if (!progressBarFill) {
          console.error(`Progress bar fill element (#${progressBarFillId}) not found.`);
          return;
      }

      // Function to update the progress bar
      const updateProgressBar = () => {
          const progressPercentage = (completedSections / totalSections) * 100;
          console.log(`Updating progress bar: ${completedSections}/${totalSections} (${progressPercentage}%)`);
          progressBarFill.style.width = `${progressPercentage}%`;
      };

      // Add click event listeners to the section completion buttons
      sections.forEach((section) => {
          const button = section.querySelector(completionButtonClass);
          if (button) {
              button.addEventListener("click", () => {
                  if (!section.classList.contains("completed")) {
                      section.classList.add("completed");
                      completedSections++;
                      updateProgressBar();
                  }
              });
          }
      });

      // Initialize the progress bar
      updateProgressBar();
  };

  // Wait for the dynamically loaded progress bar to appear
  const progressBarContainer = document.getElementById(progressBarContainerId);
  if (!progressBarContainer) {
      console.log(`Waiting for progress bar (#${progressBarContainerId}) to load...`);
      const observer = new MutationObserver(() => {
          if (document.getElementById(progressBarFillId)) {
              console.log("Progress bar loaded. Initializing...");
              initializeProgressBar();
              observer.disconnect(); // Stop observing
          }
      });
      observer.observe(document.body, { childList: true, subtree: true });
  } else {
      initializeProgressBar();
  }
});

// exercise sections in courses
document.addEventListener("DOMContentLoaded", () => {
  // Define correct answers
  const correctAnswers = {
    "html-intro-q1": "HyperText Markup Language",
    "html-tags-elements-q1": "&lt;/p&gt;",
    "html-paragraph-q1": "&lt;p&gt;CodeItClear has taught me how to create a paragraph.&lt;/p&gt;",
  };


  // Track attempts for each question
  const attempts = {};

  // Add event listener to each submit button
  document.querySelectorAll(".exercise-question .submit-answers").forEach((submitButton) => {
    submitButton.addEventListener("click", () => {
      // Get the parent container of the question
      const questionContainer = submitButton.closest(".exercise-question");
      const userInput = questionContainer.querySelector(".user-answer");
      const questionId = userInput?.id; // Ensure questionId is retrieved safely
      const feedback = questionContainer.querySelector(".feedback");
      const displayAnswer = questionContainer.querySelector(".answer-display");
      const nextButton = questionContainer.querySelector(".unique-completion-button-001");

      // Log for debugging
      console.log("Question ID:", questionId);
      console.log("Correct Answers Object:", correctAnswers);

      // Check if questionId exists in correctAnswers
      if (!questionId || !(questionId in correctAnswers)) {
        console.error(`No correct answer found for question ID: ${questionId}`);
        feedback.textContent = "Error: Question not configured properly.";
        feedback.style.color = "red";
        return;
      }

      if (!attempts[questionId]) attempts[questionId] = 0; // Initialize attempts

      const userAnswer = userInput.value.trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
      attempts[questionId]++; // Increment attempts

      console.log("User answer:", userAnswer);
      console.log("Correct answer:", correctAnswers[questionId]);

      if (userAnswer.toLowerCase() === correctAnswers[questionId].toLowerCase()) {
        // Correct answer
        userInput.classList.add("correct");
        userInput.classList.remove("incorrect");
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        // Remove check button and show the next button
        submitButton.style.display = "none";
        nextButton.style.display = "block";
      } else {
        // Incorrect answer
        userInput.classList.add("incorrect");
        userInput.classList.remove("correct");

        if (attempts[questionId] === 1) {
          feedback.textContent = "Double check your answer!";
          feedback.style.color = "orange";
          feedback.style.fontWeight = "bold";
        } else if (attempts[questionId] === 2) {
          feedback.textContent = "Incorrect!";
          feedback.style.color = "red";
          feedback.style.fontWeight = "bold";

          // Remove check button and show the next button
          submitButton.style.display = "none";
          nextButton.style.display = "block";

          // Show feedback with user and correct answers
          displayAnswer.innerHTML = `
            <div style="color: red; border-radius: 10px; background: #ffe6e6; padding: 10px; margin-top: 5px;">
              Your Answer: ${userAnswer}
            </div>
            <div style="color: green; border-radius: 10px; background: #e6ffe6; padding: 10px; margin-top: 5px;">
              Correct Answer: ${correctAnswers[questionId]}
            </div>`;
        }
      }
    });
  });
});

// mcq section in courses 
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener to each submit button for multiple-choice questions
  document.querySelectorAll(".mcq-question .submit-answers").forEach((submitButton) => {
      submitButton.addEventListener("click", () => {
          // Get the parent container of the question
          const questionContainer = submitButton.closest(".mcq-question");
          const feedback = questionContainer.querySelector(".feedback");
          const displayAnswer = questionContainer.querySelector(".answer-display");
          const nextButton = questionContainer.querySelector(".unique-completion-button-001");

          // Get the selected option
          const selectedOption = questionContainer.querySelector('input[name="mcq"]:checked');

          if (!selectedOption) {
              feedback.textContent = "Please select an option!";
              feedback.style.color = "orange";
              return;
          }

          const userAnswer = selectedOption.value;
          const correctAnswer = selectedOption.getAttribute("data-correct-answer");

          if (userAnswer === correctAnswer) {
              // Correct answer
              feedback.textContent = "Correct!";
              feedback.style.color = "green";

              displayAnswer.innerHTML = `<div style="color: green; border: 1px solid green; background: #e6ffe6; padding: 10px; margin-top: 5px;">
                  Correct Answer: ${correctAnswer}
              </div>`;
          } else {
              // Incorrect answer
              feedback.textContent = "Incorrect!";
              feedback.style.color = "red";

              displayAnswer.innerHTML = `
              <div style="color: red; border: 1px solid red; background: #ffe6e6; padding: 10px; margin-top: 5px;">
                  Your Answer: ${userAnswer}
              </div>
              <div style="color: green; border: 1px solid green; background: #e6ffe6; padding: 10px; margin-top: 5px;">
                  Correct Answer: ${correctAnswer}
              </div>`;
          }

          // Remove check button and show the next button
          submitButton.style.display = "none";
          nextButton.style.display = "block"; // Show the Next button
          console.log("Next button displayed.");
      });
  });
});

// exercise box styling
document.querySelectorAll(".inline-code-input").forEach((input) => {
  input.addEventListener("input", (e) => {
      const target = e.target;
      target.style.width = `${target.value.length + 1}ch`; // Dynamically set width
  });
});

// lesson folder vsp quick menu thing 
document.addEventListener("DOMContentLoaded", () => {
  // Add toggle functionality for folders
  document.querySelectorAll(".unique-topic-folder").forEach((folder) => {
      folder.addEventListener("click", () => {
          const targetId = folder.getAttribute("data-toggle");
          const targetContainer = document.getElementById(`${targetId}-subtopics`);

          if (targetContainer) {
              // Toggle visibility
              if (targetContainer.style.display === "block") {
                  targetContainer.style.display = "none";
              } else {
                  targetContainer.style.display = "block";
              }
          } else {
              console.error(`No element found with ID ${targetId}-subtopics`);
          }
      });
  });

  // Update folder-circle completion status dynamically
  const updateFolderCompletion = () => {
      document.querySelectorAll(".unique-topic-folder").forEach((folder) => {
          const targetId = folder.getAttribute("data-toggle");
          const subtopics = document.querySelectorAll(`#${targetId}-subtopics .unique-topic-link .completion-circle`);
          const allCompleted = Array.from(subtopics).every((circle) =>
              circle.style.backgroundColor === "green"
          );

          const folderCircle = folder.querySelector(".folder-circle");
          if (folderCircle) {
              folderCircle.style.backgroundColor = allCompleted ? "green" : "lightgrey";
          }
      });
  };

  // Initialize folder completion status
  updateFolderCompletion();

  // Add event listeners to subtopic circles to update folder circles dynamically
  document.querySelectorAll(".completion-circle").forEach((circle) => {
      circle.addEventListener("click", () => {
          updateFolderCompletion();
      });
  });
});

// sub topic and topic completion thing 
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, starting fetch operations...");

  // Fetch the header file
  fetch('/header.html')
    .then(response => {
      if (!response.ok) throw new Error(`Failed to fetch header: ${response.statusText}`);
      return response.text();
    })
    .then(headerData => {
      const headerContainer = document.getElementById('header-container');
      if (headerContainer) {
        headerContainer.innerHTML = headerData;
        console.log("Header loaded successfully.");

        // Run nav link activation **after** header is inserted
        setTimeout(() => {
          activateNavLink();
        }, 100);
      } else {
        console.error("Header container not found.");
      }

      // Detect which type of page this is
      const isHTMLPage = document.getElementById('html-quick-menu') !== null;
      const isCSSPage = document.getElementById('css-quick-menu') !== null;
      const isJSPage = document.getElementById('js-quick-menu') !== null;

      // Fetch the correct quick menu
      let menuFetches = [];
      let menuOrder = [];

      if (isHTMLPage) {
        console.log("Detected HTML Page. Loading HTML Quick Menu...");
        menuFetches.push(fetch('/html/html-quick-menu.html').then(res => res.ok ? res.text() : Promise.reject("HTML Quick Menu failed")));
        menuOrder.push("html");
      }
      if (isCSSPage) {
        console.log("Detected CSS Page. Loading CSS Quick Menu...");
        menuFetches.push(fetch('/css/css-quick-menu.html').then(res => res.ok ? res.text() : Promise.reject("CSS Quick Menu failed")));
        menuOrder.push("css");
      }
      if (isJSPage) {
        console.log("Detected JavaScript Page. Loading JS Quick Menu...");
        menuFetches.push(fetch('/javascript/js-quick-menu.html').then(res => res.ok ? res.text() : Promise.reject("JS Quick Menu failed")));
        menuOrder.push("js");
      }

      return Promise.all(menuFetches).then((menuData) => {
        menuOrder.forEach((menuType, index) => {
          if (menuType === "html") {
            document.getElementById('html-quick-menu').innerHTML = menuData[index];
            console.log("HTML Quick Menu loaded.");
          } else if (menuType === "css") {
            document.getElementById('css-quick-menu').innerHTML = menuData[index];
            console.log("CSS Quick Menu loaded.");
          } else if (menuType === "js") {
            document.getElementById('js-quick-menu').innerHTML = menuData[index];
            console.log("JS Quick Menu loaded.");
          }
        });

        // **Run ranking system & hamburger menu after quick menus are loaded**
        setTimeout(() => {
          initializeHamburgerMenu();
          initializeTopicRankingSystem(); // Fix: Reinitialize ranking system after loading
        }, 300);
      });
    })
    .catch(error => console.error("Error during fetch operations:", error));
});

// hamburger menu for quick menu 
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, starting fetch operations...");

  // Fetch the header file
  fetch('/header.html')
    .then(response => {
      if (!response.ok) throw new Error(`Failed to fetch header: ${response.statusText}`);
      return response.text();
    })
    .then(headerData => {
      const headerContainer = document.getElementById('header-container');
      if (headerContainer) {
        headerContainer.innerHTML = headerData;
        console.log("Header loaded successfully.");
      } else {
        console.error("Header container not found.");
      }

      // Detect which type of page this is
      const isHTMLPage = document.getElementById('html-quick-menu') !== null;
      const isCSSPage = document.getElementById('css-quick-menu') !== null;
      const isJSPage = document.getElementById('js-quick-menu') !== null;

      // Fetch the correct quick menu
      let menuFetches = [];

      if (isHTMLPage) {
        console.log("Detected HTML Page. Loading HTML Quick Menu...");
        menuFetches.push(fetch('/html/html-quick-menu.html').then(res => res.ok ? res.text() : Promise.reject("HTML Quick Menu failed")));
      }
      if (isCSSPage) {
        console.log("Detected CSS Page. Loading CSS Quick Menu...");
        menuFetches.push(fetch('/css/css-quick-menu.html').then(res => res.ok ? res.text() : Promise.reject("CSS Quick Menu failed")));
      }
      if (isJSPage) {
        console.log("Detected JavaScript Page. Loading JS Quick Menu...");
        menuFetches.push(fetch('/javascript/js-quick-menu.html').then(res => res.ok ? res.text() : Promise.reject("JS Quick Menu failed")));
      }

      return Promise.all(menuFetches);
    })
    .then((menuData) => {
      if (document.getElementById('html-quick-menu')) {
        document.getElementById('html-quick-menu').innerHTML = menuData[0];
        console.log("HTML Quick Menu loaded.");
      }
      if (document.getElementById('css-quick-menu')) {
        document.getElementById('css-quick-menu').innerHTML = menuData[0]; // If this is a CSS page, menuData[0] contains the CSS menu
        console.log("CSS Quick Menu loaded.");
      }
      if (document.getElementById('js-quick-menu')) {
        document.getElementById('js-quick-menu').innerHTML = menuData[0]; // If this is a JS page, menuData[0] contains the JS menu
        console.log("JS Quick Menu loaded.");
      }

      // Initialize the hamburger menu only after the relevant quick menu has loaded
      setTimeout(() => {
        initializeHamburgerMenu();
      }, 300);
    })
    .catch(error => console.error("Error during fetch operations:", error));
});
function initializeHamburgerMenu() {
  console.log("Initializing hamburger menu...");

  setTimeout(() => {
    const menuButton = document.getElementById("hamburger-menu");
    const htmlMenu = document.getElementById("html-quick-menu");
    const cssMenu = document.getElementById("css-quick-menu");
    const jsMenu = document.getElementById("js-quick-menu");

    if (menuButton && (htmlMenu || cssMenu || jsMenu)) {
      console.log("Hamburger menu button & relevant quick menu found.");

      // **Remove existing event listeners before adding new ones**
      menuButton.removeEventListener("click", toggleQuickMenu);
      menuButton.addEventListener("click", toggleQuickMenu);

      document.removeEventListener("click", closeQuickMenus);
      document.addEventListener("click", closeQuickMenus);
    } else {
      console.error("Hamburger menu button or one of the quick menus not found.");
    }
  }, 300); // Delay to ensure elements exist
}
function toggleQuickMenu(event) {
  console.log("Menu button clicked! Toggling menu...");
  const htmlMenu = document.getElementById("html-quick-menu");
  const cssMenu = document.getElementById("css-quick-menu");
  const jsMenu = document.getElementById("js-quick-menu");

  if (htmlMenu) htmlMenu.classList.toggle("show");
  if (cssMenu) cssMenu.classList.toggle("show");
  if (jsMenu) jsMenu.classList.toggle("show");

  event.stopPropagation();
}
function closeQuickMenus(event) {
  const menuButton = document.getElementById("hamburger-menu");
  const htmlMenu = document.getElementById("html-quick-menu");
  const cssMenu = document.getElementById("css-quick-menu");
  const jsMenu = document.getElementById("js-quick-menu");

  if (!menuButton.contains(event.target) && !htmlMenu?.contains(event.target) && !cssMenu?.contains(event.target) && !jsMenu?.contains(event.target)) {
    console.log("Clicked outside. Closing menu...");
    if (htmlMenu) htmlMenu.classList.remove("show");
    if (cssMenu) cssMenu.classList.remove("show");
    if (jsMenu) jsMenu.classList.remove("show");
  }
}
