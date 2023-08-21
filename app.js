let url = 'https://fakestoreapi.com/products';

document.addEventListener("DOMContentLoaded", () => {
    fetch(url)
    .then(function(response) {
        return response.json(); //this returns a promise in json format from the URL
    })
    .then(function(data) {
        console.log(data);
        data.forEach(resim => {
            ekranaYazdir(resim);
        });
    })
});


// display data coming from API to screen
const row = document.querySelector(".row");

function ekranaYazdir(resim) {
    row.innerHTML += `
    <div class="col-4">
        <div class="card">
            <img src=${resim.image} alt="" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${resim.title}</h5>
                <h5 class="card-title">$ ${resim.price.toFixed(2)}</h5>
                <a id="addBtn" href="#" class="btn btn-success">Add to cart</a>
            </div>
        </div>
    </div> 
    `
}


// Search function for products
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput")

searchBtn.addEventListener("click", aramaYap);

function aramaYap() {
    let searchText = searchInput.value.toLowerCase();
    searchInput.value = "";

    let cards = document.querySelectorAll(".col-4");
    cards.forEach(function(card) {
        let title = card.querySelector(".card-title");
        if(title.innerHTML.toLowerCase().includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    })
}

//cart icon incrementation 
row.addEventListener("click", ekle);

function ekle(e) {
    if(e.target.id.includes("addBtn")) {
        const parentDiv = e.target.parentElement.parentElement;
        console.log(parentDiv);
        const littleBox = document.querySelector(".little-box");
        littleBox.innerHTML++;
        sepeteEkle(parentDiv);
    } 
}

// events within cart modal
function sepeteEkle(parentDiv) {
    const li = document.querySelector(".modal-li");
    const price = parentDiv.children[1].children[1].innerHTML;
    console.log(price);
    document.querySelector(".fiyat").innerHTML = price;
}

1:20