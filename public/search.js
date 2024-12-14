// app.js

const citySearch = document.getElementById("search-bar");
const dropdown = document.getElementById("search-dropdown");

// Fetch city data from GeoNames API
async function fetchCities(query) {
    if (!query) return [];
    
    const username = 'ofearghail'; // Replace with your GeoNames username
    const apiUrl = `http://api.geonames.org/searchJSON?q=${query}&maxRows=10&featureClass=P&username=${username}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.geonames) {

            console.log("Data:", data);
            return data.geonames.map(city => ({
                name: `${city.name}, ${city.adminCode1}, ${city.countryCode}`,
                lat: city.lat,
                lng: city.lng
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching cities:", error);
        return [];
    }
}

// Populate dropdown with city suggestions
function populateDropdown(cities) {
    dropdown.innerHTML = ""; // Clear previous results

    if (cities.length === 0) {
        dropdown.classList.add("hidden");
        return;
    }

    cities.forEach(city => {
        const item = document.createElement("div");
        item.textContent = city.name;
        item.classList.add("dropdown-item");
        item.addEventListener("click", () => {
            citySearch.value = city.name;
            dropdown.classList.add("hidden");
            console.log("Selected City:", city);
        });
        dropdown.appendChild(item);
    });

    dropdown.classList.remove("hidden");
}

// Debounce function to limit API calls
let debounceTimeout;
function debounce(func, delay) {
    return (...args) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func(...args), delay);
    };
}

// Event listener for the input field
citySearch.addEventListener(
    "input",
    debounce(async (event) => {
        const query = event.target.value.trim();
        console.log("Query:", query);
        if (!query) {
            dropdown.classList.add("hidden");
            return;
        }

        const cities = await fetchCities(query);
        populateDropdown(cities);
    }, 300)
);

dropdown.addEventListener("click", () => {
    dropdown.classList.add("hidden");
});