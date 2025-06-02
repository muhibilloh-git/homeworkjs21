const countryContainer = document.getElementById("countryContainer");
const capitalSelect = document.getElementById("capitalSelect");
const searchInput = document.getElementById("searchInput");
const likedCount = document.getElementById("likedCount");
const savedCount = document.getElementById("savedCount");

// Capital dropdown to'ldirish
function populateCapitalOptions() {
  const capitals = [...new Set(countries.map((c) => c.capital))];
  capitals.forEach((cap) => {
    const option = document.createElement("option");
    option.value = cap;
    option.textContent = cap;
    capitalSelect.appendChild(option);
  });
}

// Davlat card render
function renderCountries(list) {
  countryContainer.innerHTML = "";
  list.forEach((country) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md p-4";
    card.innerHTML = `
      <img src="${country.flag}" class="w-full h-40 object-cover rounded" />
      <h2 class="text-lg font-bold mt-2">${country.name}</h2>
      <p>${country.population.toLocaleString()}</p>
      <p>${country.capital}</p>
      <div class="flex gap-2 mt-2">
        <button class="like-btn px-3 py-1 border rounded ${
          country.isLiked ? "bg-blue-100" : ""
        }" data-id="${country.id}">Like</button>
        <button class="save-btn px-3 py-1 border rounded ${
          country.isBasket ? "bg-green-100" : ""
        }" data-id="${country.id}">Save</button>
      </div>
    `;
    countryContainer.appendChild(card);
  });
}

// Like/Save funktsiyasi
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("like-btn")) {
    const id = +e.target.dataset.id;
    const country = countries.find((c) => c.id === id);
    country.isLiked = !country.isLiked;
    updateCounts();
    renderCountries(getFilteredCountries());
  }
  if (e.target.classList.contains("save-btn")) {
    const id = +e.target.dataset.id;
    const country = countries.find((c) => c.id === id);
    country.isBasket = !country.isBasket;
    updateCounts();
    renderCountries(getFilteredCountries());
  }
});

// Filter
capitalSelect.addEventListener("change", () => {
  renderCountries(getFilteredCountries());
});

searchInput.addEventListener("input", () => {
  renderCountries(getFilteredCountries());
});

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

function updateCounts() {
  likedCount.textContent = countries.filter((c) => c.isLiked).length;
  savedCount.textContent = countries.filter((c) => c.isBasket).length;
}

// Boshlanish
populateCapitalOptions();
renderCountries(countries);
updateCounts();
