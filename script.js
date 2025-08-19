const elementy = document.querySelectorAll("li");
const nowy = document.getElementById("text-box");
const lista = document.getElementById("lista");
const krzyzyki = document.getElementsByClassName("fa-xmark");
const przycisk = document.getElementById("delete");


function odznacz(elem)
{
    if (!elem.target.className)
    {
        elem.target.className = "kupione";
    }
    else
    {
        elem.target.className = "";
    }
}

elementy.forEach((produkt) => {
    produkt.addEventListener("click", odznacz);
});

Array.from(krzyzyki).forEach((krzyz => {
    krzyz.addEventListener("click", usun);
}))


const zapisane = JSON.parse(localStorage.getItem("mojaLista")) || [];
zapisane.forEach(item => dodajDoListy(item));

nowy.addEventListener("keydown", function(event) {
    if(event.key === "Enter" && nowy.value.trim() !== "")
    {
        wartosc = nowy.value.trim();

        dodajDoListy(wartosc);


        zapisane.push(wartosc);
        localStorage.setItem("mojaLista", JSON.stringify(zapisane));

        nowy.value = "";
    }
});

function dodajDoListy(text) {
    const li = document.createElement("li");
    li.textContent = text;
    
    const cross = document.createElement("i");
    cross.className = "fa-solid fa-xmark";

    li.appendChild(cross);
    lista.appendChild(li);
    li.addEventListener("click", odznacz);
    cross.addEventListener("click", usun);
}

function usun(event) {
    const li = event.target.closest("li");
    const text = li.childNodes[0].nodeValue.trim();

    const index = zapisane.indexOf(text);
    if (index > -1) {
        zapisane.splice(index, 1);
        localStorage.setItem("mojaLista", JSON.stringify(zapisane));
    }
    li.remove();
}

function wymaz() {
    const items = document.querySelectorAll("li");
    items.forEach(el => el.remove());
    zapisane.length = 0;
    localStorage.removeItem("mojaLista");

}

przycisk.addEventListener("click", wymaz)