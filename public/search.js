const citySearch = document.getElementById("search-bar");
const dropdown = document.getElementById("search-dropdown");

const API_KEY = "CS6Lxw9hGRYvRGbvsAl9knIO3SpHccIn";

citySearch.addEventListener("input", async (e) => {
    const query = e.target.value;

    if (query.length < 3) {
        dropdown.classList.add("hidden");
        return; 
    };

    const url = `https://api.geocodify.com/v2/geocode?api_key=${API_KEY}&q=${query}&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

       
        dropdown.innerHTML = "";

        if (data.response && data.response.features) {
            data.response.features.forEach((feature) => {
                const city = feature.properties.locality || feature.properties.name;
                const country = feature.properties.country_a;
                const state = feature.properties.region_a;;

                const dropdownItem = document.createElement("div");
                dropdownItem.className = "dropdown-item";
                dropdownItem.textContent = `${city}, ${state}, ${country}`;
                dropdownItem.addEventListener("click", () => {
                    console.log(feature);
                    citySearch.value = `${city}, ${state}, ${country}`;
                    dropdown.classList.add("hidden");
                });

                dropdown.appendChild(dropdownItem);
            });
            dropdown.classList.remove("hidden");
        } else {
            dropdown.classList.add("hidden");
        }
    } catch (error) {
        console.error("Error fetching city data:", error);
        dropdown.classList.add("hidden");
    }
});



function populateDropdown(cities) {
    dropdown.innerHTML = ""; 

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

let debounceTimeout;
function debounce(func, delay) {
    return (...args) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func(...args), delay);
    };
}


dropdown.addEventListener("click", () => {
    dropdown.classList.add("hidden");
});

