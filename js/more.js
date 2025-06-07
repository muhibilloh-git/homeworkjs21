const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

const country = JSON.parse(localStorage.getItem("selectedCountry"));

if (country) {
  document.getElementById("flag").src = country.flag;
  document.getElementById("name").textContent = country.name;
  document.getElementById("nativeName").textContent = country.nativeName || "-";
  document.getElementById("population").textContent =
    country.population.toLocaleString();
  document.getElementById("region").textContent = country.region;
  document.getElementById("subregion").textContent = country.subregion || "-";
  document.getElementById("capital").textContent = country.capital;
  document.getElementById("tld").textContent =
    country.topLevelDomain?.join(", ") || "-";
  document.getElementById("currencies").textContent =
    country.currencies?.join(", ") || "-";
  document.getElementById("languages").textContent =
    country.languages?.join(", ") || "-";

  const bordersContainer = document.getElementById("borders");
  bordersContainer.innerHTML = "";
  if (country.borders && country.borders.length > 0) {
    country.borders.slice(0, 3).forEach((border) => {
      const span = document.createElement("span");
      span.className =
        "px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm shadow";
      span.textContent = border;
      bordersContainer.appendChild(span);
    });
  } else {
    bordersContainer.innerHTML = "<span>No border countries</span>";
  }
}
