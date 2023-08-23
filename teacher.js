let url = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", function(){
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        data.forEach(function(resim){
            ekranaYazdir(resim)
        })
    })
})

// ! Apiden gelen verileri ekrana bastırmak için kullanılan kodlar
const row = document.querySelector(".row");
function ekranaYazdir(resim){

    row.innerHTML += `
    <div class="col-4">
                <div class="card">
                <img src=${resim.image} alt="" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${resim.title}</h5>
                    <h5 class="card-title">${resim.price} TL</h5>
                    <a id="addBtn" href="#" class="btn btn-success">Sepete Ekle</a>
                </div>
            </div>
        </div>
    `
}


// ! Ürünlerin içerisinde arama algoritması

const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

searchBtn.addEventListener("click", aramaYap)
function aramaYap(){
    let searchText = searchInput.value.toLowerCase();
    searchInput.value = ""

    let cards = document.querySelectorAll(".col-4");

    cards.forEach(function(card){
        let title = card.querySelector(".card-title");
        if(title.innerHTML.toLowerCase().includes(searchText)){
            card.style.display = "block"
        }else{
            card.style.display = "none"
        }
    })
}

// ! Sepete ekleye bastığımda sepet ikonunu artıran kodları yazalım
row.addEventListener("click", ekle)
function ekle(e){
    if(e.target.id.includes("addBtn")){
        const parentDiv = e.target.parentElement.parentElement;
        console.log(parentDiv)
        const littleBox = document.querySelector(".little-box");
        littleBox.innerHTML++;

        sepeteEkle(parentDiv)
    }
}


// ! Sepet İçerisindeki İşlemler İçin;

function sepeteEkle(parentDiv){
    const li = document.querySelector(".modal-li");
    const price = parentDiv.children[1].children[1].innerHTML
    console.log(price)
    const urunAdi = parentDiv.children[1].children[0].innerHTML

    li.innerHTML += `
        <div class="ürün-bilgisi d-flex justify-content-around">
            <div class="fotograf">
                <img id="ürün-img" height="100px" width="150px" src=${parentDiv.children[0].src} alt="">
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
        const arttirButon = document.querySelector("#arttir");
        const azaltButon = document.querySelector("#azalt");
        const adet = document.querySelector(".adet");
        const toplamFiyat = document.querySelector(".toplamFiyat");

        // ! Arttırma Butona Basıldığında Çalışacak Kodlar

        arttirButon.addEventListener("click", function(){
            adet.innerHTML++
            toplamFiyat.innerHTML = Math.round(adet.innerHTML * parseFloat(price)) + "TL"
        })

        azaltButon.addEventListener("click", function(){
            if(adet.innerHTML > 1){
                adet.innerHTML--
                toplamFiyat.innerHTML =  Math.round(adet.innerHTML * parseFloat(price)) + "TL"
            }
        })



}


