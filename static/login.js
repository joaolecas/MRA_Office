document.addEventListener("DOMContentLoaded", function () {
    const pinForm = document.getElementById("pinForm");
    const responseMessage = document.getElementById("responseMessage");

    pinForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        const user = document.getElementById("userSelect").value;
        const pin = document.getElementById("pinInput").value;

        try {
            const response = await fetch("/verify-pin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user, pin }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    // Redirect to the form page using the redirect_url from the response (This effectively redirects the user to the new URL.)
                    window.location.href = result.redirect_url;
                } else {
                    // Display error message if success is false
                    responseMessage.textContent = result.message;
                    responseMessage.style.color = "red";
                }
            } else {
                const result = await response.json();
                responseMessage.textContent = result.message;
                responseMessage.style.color = "red";
            }
        } catch (error) {
            // Handle any errors
            responseMessage.textContent = "An error occurred. Please try again.";
            responseMessage.style.color = "red";
            console.error("Error:", error);
        }
    });
});
