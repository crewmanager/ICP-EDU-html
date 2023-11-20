// <!-- Your HTML remains unchanged -->

// <!-- index?.js -->
// import { hell0_backend } from "../../declarations/hell0_backend/index";
import { hell0_backend } from "../../declarations/hell0_backend/index"; // Assuming hell0_backend is correctly exported from the declarations

window.addEventListener("load", async function() {
    await update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(document.getElementById("input-amount").value) || 0;
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value) || 0;

    button.setAttribute("disabled", true);

    if (inputAmount > 0) {
        await hell0_backend.topUp(inputAmount);
    }

    if (outputAmount > 0) {
        await hell0_backend.withdraw(outputAmount);
    }

    await hell0_backend.compound();

    await update();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";

    button.removeAttribute("disabled");
});

async function update() {
    const currentAmount = await hell0_backend.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}

// document.getElementById("contact-form").addEventListener("submit", async function(event) {
//     event.preventDefault();

//     var name = document.getElementById("name").value;
//     var email = document.getElementById("email").value;
//     var message = document.getElementById("message").value;

//     var formData = {
//         name: name,
//         email: email,
//         message: message
//     };

//     try {
//         const response = await hell0_backend.saveData(formData);
//         if (response.status) {
//             document.getElementById("success-message").innerText = response.message;
//         } else {
//             document.getElementById("success-message").innerText = response.message;
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// });
