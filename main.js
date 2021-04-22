let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer b6b74314a19ecc97eec9d50c48f57e0550299413");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "admin_ip_verify=d41d8cd98f00b204e9800998ecf8427e");
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append("Control-Allow-Headers", "Content-Type");
let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};


const productsList = document.getElementById('products-list')

let productsArr = []

const loadProducts = async () => {
    try {
        const res = await fetch("https://cors-anywhere.herokuapp.com/https://devshop-376948.shoparena.pl/webapi/rest/products?limit=16", requestOptions)
        productsArr = await res.json()
        productsArr = productsArr.list
        displayProducts(productsArr)
        isPopup()
    } catch (err) {
        console.error(err)
    }
}


const $sortHighLow = document.getElementById('sort-high-low')

$sortHighLow.addEventListener('click', (e) => {
    let sortProductsArr = productsArr.sort(function (a, b) {
        a = a.translations.pl_PL.name
        b = b.translations.pl_PL.name
        return sortString(a, b)

    })
    displayProducts(sortProductsArr)
})


function sortString(a, b) {
    if (a > b) return 1
    if (a < b) return -1
    return 0
}

const displayProducts = (products) => {
    console.log("products",products)
    let getHTML = products.map((product) => {
        let gfxId = product.main_image.gfx_id
        let srcImgSmall = `https://devshop-376948.shoparena.pl/environment/cache/images/300_300_productGfx_${gfxId}.jpg`
        let srcImgBig = `https://devshop-376948.shoparena.pl/environment/cache/images/500_500_productGfx_${gfxId}.jpg`
        return `
            <div class="product">
                <div class="product-card">
                    <h2 class="name">${product.translations.pl_PL.name}</h2>
                    <span class="price">${product.stock.price} zł</span>
                    <a class="popup-btn">Więcej</a>
                    <img src="${srcImgSmall}" alt="${product.main_image.name}" class="product-img">
                </div>
                <div class="popup-view">
                    <div class="popup-card">
                        <a class="close-btn">+</a>
                        <div class="product-img">
                            <img src="${srcImgBig}" alt="${product.main_image.name}">
                        </div>
                        <div class="info">
                            <h2>${product.translations.pl_PL.name}</h2>
                            <p>${product.translations.pl_PL.short_description}</p>
                            <div class="custom-fields">
                                <div>ID kategorii: <strong>${product.category_id}</strong></div>
                                <div>ID produktu: <strong>${product.product_id}</strong></div>
                                <div>Data: <strong>${product.add_date}</strong></div>
                            </div>
                            <span class="price">${product.stock.price} zł</span>
                            <a href="#" class="add-cart-btn">Add to Cart</a>
                        </div>
                    </div>
                </div>
            </div>
                `
    }).join('')
    productsList.innerHTML = getHTML
}
loadProducts()


const isPopup = () => {
    let popupViews = document.querySelectorAll('.popup-view')
    let popupBtns = document.querySelectorAll('.popup-btn')
    let closeBtns = document.querySelectorAll('.close-btn')


    let popup = function (popupClick) {
        popupViews[popupClick].classList.add('active')
    }
    popupBtns.forEach((popupBtn, i) => {
        popupBtn.addEventListener("click", () => {
            popup(i);
        })
    })
    closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
            popupViews.forEach((popupView) => {
                popupView.classList.remove('active')
            })
        })
    })

}