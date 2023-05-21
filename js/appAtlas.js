import Country from "./countryClass.js";
import { declareEvents } from "./events.js";

let ar_countries = [];

const init = () => {
    allCountries();
    goHome();
    declareEvents(goHome, doApi);
}

const goHome = () => {
    doApi("israel");
}

const allCountries = async () => {
    let url = `https://restcountries.com/v3.1/all`;
    let resp = await fetch(url);
    let data = await resp.json();
    ar_countries = data.map(item => item.name.common);
    createSelect(ar_countries);
}

const createSelect = (ar_countries) => {
    ar_countries.forEach(item => {
        document.querySelector("datalist").innerHTML += `<option>${item}</option>`;
    })
}

export const doApi = async (_searchQ) => {

    document.querySelector("#view").innerHTML = `
    <div class="text-center mt-5 w-100">
      <img src="images/loading.gif" alt="loading" width="300">
    </div>`;

    if (_searchQ == "") {
        document.querySelector("#view").innerHTML = `<div class="text-center">
    <h1 class="p-24" style="background-color: rgba(255, 255, 255, 0.549);">Please enter a country name.</h1>`;
    } else {
        let url = `https://restcountries.com/v3.1/name/${_searchQ}`;
        let resp = await fetch(url);
        let data = await resp.json();
        createCountry(data);
    }
}

const createCountry = (ar_countries) => {

    if (ar_countries.status != "404") {
        if (ar_countries.length == 1) {
            let country = new Country("#view", ar_countries[0]);
            country.render();
        } else {
            document.querySelector("#view").innerHTML = `<div id="cards" class="row row-cols-lg-4 g-3 justify-content-center" data-aos="zoom-in" data-aos-duration="1000"   data-aos-offset="300"></div>`;
            ar_countries.forEach(item => {
                let country = new Country("#view", item);
                country.card();
            })
        }

    } else {
        document.querySelector("#view").innerHTML = `<div class="text-center">
        <h1 class="p-24" style="background-color: rgba(255, 255, 255, 0.549);">The page not found 😕</h1>`;
    }
}

export const createBordersToCountry = async (country) => {
    let url = `https://restcountries.com/v3.1/alpha/${country}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data[0].name.common;
}

init();


