const countryContainer = document.getElementById("countryContainer");
const capitalSelect = document.getElementById("capitalSelect");
const searchInput = document.getElementById("searchInput");
const likedBtn = document.getElementById("likedBtn");
const savedBtn = document.getElementById("savedBtn");
const darkToggle = document.getElementById("darkToggle");

function populateCapitalOptions() {
  const capitals = [...new Set(countries.map((c) => c.capital))];
  capitals.forEach((cap) => {
    const option = document.createElement("option");
    option.value = cap;
    option.textContent = cap;
    capitalSelect.appendChild(option);
  });
}

// Render country cards
function renderCountries(list) {
  countryContainer.innerHTML = "";
  list.forEach((country) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300";
    card.innerHTML = `
      <img src="${country.flag}" class="w-full h-40 object-cover rounded" />
      <h2 class="text-lg font-bold mt-2">${country.name}</h2>
      <p>Population: ${country.population.toLocaleString()}</p>
      <p>Capital: ${country.capital}</p>
      <div class="flex gap-2 mt-2">
        <button class="like-btn px-3 py-1 border rounded ${
          country.isLiked ? "bg-blue-100" : ""
        }" data-id="${country.id}">Like</button>
        <button class="save-btn px-3 py-1 border rounded ${
          country.isBasket ? "bg-green-100" : ""
        }" data-id="${country.id}">Save</button>
        <button class="more-btn px-3 py-1 border rounded" data-id="${
          country.id
        }">More</button>
      </div>
    `;
    countryContainer.appendChild(card);
  });
}

// Like / Save buttons
document.addEventListener("click", (e) => {
  const id = +e.target.dataset.id;
  const country = countries.find((c) => c.id === id);

  if (e.target.classList.contains("like-btn")) {
    country.isLiked = !country.isLiked;
  }

  if (e.target.classList.contains("save-btn")) {
    country.isBasket = !country.isBasket;
  }

  if (
    e.target.classList.contains("like-btn") ||
    e.target.classList.contains("save-btn")
  ) {
    updateCounts();
    renderCountries(getFilteredCountries());
  }

  if (e.target.classList.contains("more-btn")) {
    localStorage.setItem("selectedCountry", JSON.stringify(country));
    window.location.href = "./more.html";
  }
});

// Filters
capitalSelect.addEventListener("change", () => {
  renderCountries(getFilteredCountries());
});

searchInput.addEventListener("input", () => {
  renderCountries(getFilteredCountries());
});

// Filtering function
function getFilteredCountries() {
  const selectedCapital = capitalSelect.value;
  const keyword = searchInput.value.toLowerCase();
  return countries.filter((c) => {
    const matchCapital =
      selectedCapital === "All" || c.capital === selectedCapital;
    const matchSearch = c.name.toLowerCase().includes(keyword);
    return matchCapital && matchSearch;
  });
}

// Update liked/saved counts
function updateCounts() {
  likedBtn.textContent = `Liked (${countries.filter((c) => c.isLiked).length})`;
  savedBtn.textContent = `Saved (${
    countries.filter((c) => c.isBasket).length
  })`;
}

// Dark mode toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkToggle.style.cursor = "pointer";
});

// Start
populateCapitalOptions();
renderCountries(countries);
updateCounts();
