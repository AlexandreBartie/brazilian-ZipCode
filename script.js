document.getElementById("zipButton").addEventListener("click", zipData);

async function zipData() {
    const zipcode = document.getElementById("zipcode").value.trim();

    // Validate the zipcode
    if (!validateZipCode(zipcode)) {
        alert("Please enter a valid ZIP code with exactly 8 digits.");
        return;
    }

    const url = `https://viacep.com.br/ws/${zipcode}/json/`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to zip data");
        }

        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("concerts").innerHTML = "Error zip data";
    }
}

function validateZipCode(zipcode) {
    return /^\d{8}$/.test(zipcode);
}

function displayData(data) {
    const keys = Object.keys(data);
    const elements = keys.map(key => `<li><strong>${key}:</strong> ${data[key]}</li>`);
    document.getElementById("concerts").innerHTML = `<ul>${elements.join('')}</ul>`;
}
