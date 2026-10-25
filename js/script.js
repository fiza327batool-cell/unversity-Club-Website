const registrationForm = document.getElementById("registrationForm");
const confirmationMessage = document.getElementById("confirmationMessage");
const registrationList = document.getElementById("registrationList");
const clearAllButton = document.getElementById("clearAll");
// Get saved registrations from localStorage
let registrations = JSON.parse(
    localStorage.getItem("registrations")
) || [];

// Display saved registrations
function displayRegistrations() {
    registrationList.innerHTML = "";

    if (registrations.length === 0) {
        registrationList.innerHTML =
            "<li>No registrations saved yet.</li>";
        return;
    }

    registrations.forEach(function (registration) {
        const listItem = document.createElement("li");

        listItem.textContent =
            registration.name + " - " +
            registration.email + " - " +
            registration.event;

        registrationList.appendChild(listItem);
    });
}

// Handle form submission
registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const registration = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        event: document.getElementById("event").value,
        heardAbout: document.querySelector(
            'input[name="heardAbout"]:checked'
        )?.value || ""
    };

    registrations.push(registration);

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );

    confirmationMessage.textContent =
        "Registration successful! Thank you for registering.";

    registrationForm.reset();

    displayRegistrations();
});

// Clear all saved registrations
clearAllButton.addEventListener("click", function () {
    registrations = [];

    localStorage.removeItem("registrations");

    confirmationMessage.textContent =
        "All registrations have been cleared.";

    displayRegistrations();
});

// Display registrations when page loads
displayRegistrations();