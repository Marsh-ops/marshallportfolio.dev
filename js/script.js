// Example: Display an alert when the page loads
window.onload = function () {
    // Check if the alert has been shown in this session
    if (!sessionStorage.getItem('welcomeAlertShown')) {
        // Show the alert
        alert("Welcome to My Personal Portfolio!");
        
        // Set the flag in sessionStorage
        sessionStorage.setItem('welcomeAlertShown', 'true');
    }
};

// Example: Handle a button click
document.querySelector("home").addEventListener("click", function () {
    alert("You clicked in the main content area!");
});