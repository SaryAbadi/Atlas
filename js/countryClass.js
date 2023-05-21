import { createBordersToCountry, doApi } from "./appAtlas.js";

export default class Country {
  constructor(_parent, _item) {
    this.parent = _parent;
    this.name = _item.name.common;
    this.population = Number(_item.population).toLocaleString("en-US");
    this.capital = _item.capital;
    this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
    this.flags = _item.flags.png;
    this.currencies = _item.currencies ? Object.keys(_item.currencies) : "none";
    this.borders = _item.borders;
    this.lat = _item.latlng[0];
    this.lon = _item.latlng[1];
    if (parseInt(_item.area).toString().length <= 3) {
      this.zoomMap = 13;
    } else {
      this.zoomMap = 10 - parseInt(_item.area).toString().length;
    }
  }

  render() {

    document.querySelector(this.parent).innerHTML = ``;
    let div = document.createElement("div");
    document.querySelector(this.parent).append(div);
    div.innerHTML = `
        <div class="card country h-100 shadow" data-aos="flip-down" data-aos-duration="1000">
          <div class="row">
            <div class="col-lg-5">
              <img class="img-fluid m-3" src="${this.flags}" alt="flag">
            </div>
            <div class="col-lg-7">
               <h2 class="card-title display-4">${this.name}</h2>
               <p class="card-text"><b>Population:</b> ${this.population} </p>
               <p class="card-text"><b>Languages:</b> ${this.languages} </p>
               <p class="card-text"><b>Capital:</b> ${this.capital} </p>
               <p class="card-text"><b>Coin:</b> ${this.currencies} </p>
            </div>    
          </div>
          <div id="border" class="d-flex px-3 flex-wrap"><b>Borders:</b> </div>
            <iframe class="m-3 responsive-map" style="border:0;" frameborder="0" scrolling="no" src="https://www.google.com/maps?q=${this.lat},${this.lon}&z=${this.zoomMap}&amp;output=embed"></iframe>
       </div>`;

    if (this.borders) {
      let i = 0;
      this.borders.forEach(async (item) => {
        let fullName = await createBordersToCountry(item);
        let a = document.createElement("a");
        let span = document.createElement("span");

        a.className = "link p-0 ps-2";
        a.style = "cursor:pointer; text-decoration:none;"
        a.innerHTML = `${fullName}`;
        if (i < this.borders.length - 1) {
          span.className = "pe-2";
          span.innerHTML = " ,";
          i++;

        } else {
          span.innerHTML = ".";

        }
        document.querySelector("#border").append(a);
        document.querySelector("#border").append(span);

        a.addEventListener("click", () => {
          doApi(fullName);
        })
      });

    } else {
      document.querySelector("#border").innerHTML += `<div class="px-2">None border.</div>`;
    }
  }

  card() {
    let card = document.createElement("div");
    card.className = "card flag h-150 shadow m-3";
    card.innerHTML += `
          <img class="img-fluid shadow" src="${this.flags}" >
          <div class="card-body">
            <h3 class="card-title">${this.name}</h3>
          </div>`;
    document.querySelector("#cards").append(card);
    card.addEventListener("click", () => {
      this.render();
    })
  }
}

