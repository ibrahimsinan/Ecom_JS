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
                <h5 class="card-title">${resim.price}</h5>    
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
const littleBox = document.querySelector(".little-box");
function ekle(e) {
    if(e.target.id.includes("addBtn")) {
        const parentDiv = e.target.parentElement.parentElement;
        console.log(parentDiv);
        // const littleBox = document.querySelector(".little-box");
        littleBox.innerHTML++;
        sepeteEkle(parentDiv);
    } 
}

// events within cart modal
function sepeteEkle(parentDiv) {
    const li = document.querySelector(".modal-li");
    const price = parentDiv.children[1].children[1].innerHTML;
    console.log(price);
    const urunAdi = parentDiv.children[1].children[0].innerHTML;

    li.innerHTML += `

    <div class="urun-bilgisi d-flex justify-content-around">
        <div class="fotograf">
            <img id="urun-img" height="100px" width="150px" src="${parentDiv.children[0].src}" alt="">
        </div>
         <div class="baslik">${urunAdi}</div>
        <div class="butonlar">
            <button id="arttir" type="button">+</button>
            <span class="adet">1</span>
            <button id="azalt" type="button">-</button>
        </div>
        <div class="fiyat">${price}</div>
        <div class="toplamFiyat">${price}</div>  
        <button type="button" class="btn-close" aria-label="Close"></button>     
    </div>
    `

    const arttirButton = document.querySelector("#arttir");
    const azaltButton = document.querySelector("#azalt");
    const adet = document.querySelector(".adet");
    const toplamFiyat = document.querySelector(".toplamFiyat");
    

    //button increment item number event
    arttirButton.addEventListener("click", function() {
        adet.innerHTML++;
        //console.log(adet.innerHTML);
        // console.log(typeof toplamFiyat);
        // console.log(typeof adet);
        // console.log(typeof price);
        //console.log(adet.innerHTML * price);
        // NaN SOLUTION BELOW
        // let priceValue = parseFloat(price.replace('$', ''));
        // console.log(priceValue);
        // let adetValue = parseInt(adet.innerHTML);
        // console.log(adetValue);
        // let toplamFiyatValue = priceValue * adetValue;
        // console.log(toplamFiyatValue);
        // toplamFiyat.innerHTML = `$${toplamFiyatValue.toFixed(2)}`;
        toplamFiyat.innerHTML = Math.round(adet.innerHTML * parseFloat(price));
        console.log(toplamFiyat.innerHTML);
    });
    
    azaltButton.addEventListener("click", function() {
        if(adet.innerHTML > 0) {
            adet.innerHTML--;
            toplamFiyat.innerHTML = Math.round(adet.innerHTML * parseFloat(price));
        }

    });  
}

//Delete items from modal 
    document.addEventListener("click", function(e) {
        //whatever I've clicked on the document is specified with e.target
        const clickedElement = e.target;
        if(clickedElement.classList.contains("btn-close")) {
            const productElement = clickedElement.parentElement;
            productElement.remove();
            littleBox.innerHTML--;
        }
    })