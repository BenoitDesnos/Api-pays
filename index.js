const results = document.querySelector("body > div.countries-container");
const range = document.querySelector("#inputRange");
const input = document.querySelector("#inputSearch");
const rangeValue = document.querySelector("#rangeValue");
let countries = [];
let countriesCounter = "";
let countedCountries = [];
let rangeCounter = 24;
let countriesSorted = [];
let countriesSearch = [];

async function fetchCountries() {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
    .then((data) => (countries = data));
  countries.sort(decreaseSort);
  countriesDisplay();
}
fetchCountries();

const countriesDisplay = (search) => {
  countriesSearch = countries;

  if (search) {
    countriesSearch = countries.filter((country) => {
      let countryLowerCased = country.translations.fra.common;
      countryLowerCased = countryLowerCased.toLowerCase();
      return countryLowerCased.includes(search);
    });
    console.log(countriesSearch);
  }
  countriesSorted = countriesSearch.slice(0, rangeCounter);

  results.innerHTML = countriesSorted.map((country) => {
    if (
      country.capital &&
      country.population &&
      country.translations.fra.common
    ) {
      return `
        <div class="card">            
        <img src="${country.flags.svg}" alt="drapeau ${
        country.translations.fra.common
      }">
        <h2>${country.translations.fra.common} </h2>
        <h4>${country.capital[0]}</h4>
        <p>Population : ${country.population.toLocaleString()}</p>
        </div>
        `;
    } else if (country.capital !== true) {
      return `
        <div class="card">            
        <img src="${country.flags.svg}" alt="drapeau ${country.name.common}">
        <h2>${country.name.common} </h2>
        <h4>Undefined</h4>
        <p>Population : ${country.population}</p>
        </div>
        `;
    }
  });
};
function decreaseSort(a, b) {
  return b.population - a.population;
}
function increaseSort(a, b) {
  return a.population - b.population;
}
function compare(a, b) {
  if (a.translations.fra.common < b.translations.fra.common) {
    return -1;
  }
  if (a.translations.fra.common > b.translations.fra.common) {
    return 1;
  }
  return 0;
}

input.addEventListener("input", (e) => {
  let string = e.target.value;
  let stringToLowerCase = string.toLowerCase();
  countriesDisplay(stringToLowerCase);
});
range.addEventListener("input", () => {
  rangeValue.innerHTML = range.value;
  rangeCounter = range.value;

  countriesDisplay();
});
maxToMin.addEventListener("click", () => {
  countries.sort(decreaseSort);
  countriesDisplay();
});
minToMax.addEventListener("click", () => {
  countries.sort(increaseSort);
  countriesDisplay();
});
alpha.addEventListener("click", () => {
  countries.sort(compare);
  countriesDisplay();
});
