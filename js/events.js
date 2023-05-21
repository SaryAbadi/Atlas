export const declareEvents = (goHome, doApi) => {
    let search_btn = document.querySelector("#btn_search");
    let home = document.querySelector("#id_home");
    let israel = document.querySelector("#id_israel");
    let usa = document.querySelector("#id_usa");
    let france = document.querySelector("#id_france");
    let thailand = document.querySelector("#id_thailand");
    let burger_btn = document.querySelector("#burger_btn");
    let nav_open = document.querySelector("#nav_open");
    let close_btn = document.querySelector("#close_btn");

    home.addEventListener("click", function () {
        goHome();
    })

    israel.addEventListener("click", function () {
        doApi("israel");
    })

    france.addEventListener("click", function () {
        doApi("france");
    })

    usa.addEventListener("click", function () {
        doApi("United States");
    })

    thailand.addEventListener("click", function () {
        doApi("thailand");
    })

    search_btn.addEventListener("click", function () {
        let id_input = document.querySelector("#id_input").value;
        doApi(id_input);
    })
    document.addEventListener("keydown", function (e) {
        let id_input = document.querySelector("#id_input").value;
        if (e.key == "Enter") {
            doApi(id_input);
        }
    })

    burger_btn.addEventListener("click", function () {
        nav_open.style.display = "block";
        burger_btn.style.display = "none";
        close_btn.style.display = "block";
    })

    close_btn.addEventListener("click", function () {
        nav_open.style.display = "none";
        burger_btn.style.display = "block";
        close_btn.style.display = "none";
    })
}