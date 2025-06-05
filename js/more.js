const country = JSON.parse(localStorage.getItem("selectedCountry"));
const container = document.getElementById("countryDetails");

const borderExamples = ["France", "Germany", "Belgium"]; // misol uchun

if (country) {
  container.innerHTML = `
        <img src="${country.flag}" class="w-[560px] h-[400px] " />
        <h2 class="text-2xl font-bold">${country.name}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Liked:</strong> ${country.isLiked ? "Yes" : "No"}</p>
        <p><strong>Saved to Basket:</strong> ${
          country.isBasket ? "Yes" : "No"
        }</p>
        <div>
          <strong>Border Countries:</strong>
          <div class="flex gap-2 mt-2">
            ${borderExamples
              .map(
                (name) =>
                  `<span class="px-3 py-1 border rounded">${name}</span>`
              )
              .join("")}
          </div>
        </div>
      `;
}
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
