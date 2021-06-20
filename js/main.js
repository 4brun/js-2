const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this.basket = []; // массив добавленых в корзину товаров товаров
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });

    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();

class ResultBasket {
    constructor(product = '.result') {
        this.product = product;
        this.basket = [];
        this.clickBaset();
        this.getBascet()
            .then(data => {
                this.basket = [...data.contents];
                this.render();
            });
    }
    getBascet() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
        // .catch(error => { console.log(error) })
    }
    clickBaset() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.product).classList.toggle('none');
        });
    }
    render() {
        const block = document.querySelector(this.product);
        for (let item of this.basket) {
            const obj = new BasketItem();
            block.insertAdjacentHTML('beforeend', obj.render(item));
        }
    }
}

class BasketItem {
    render(item) {
        return ` <div class="cart-item">
        <div class="product">
            <div class="product-info">
                <p class="product-tittle">${product.product_name}</p>
                <p class="product-quantity">Quantity: ${product.quantity}</p>
                <p class="product-single-price">$ ${product.price} </p>
            </div>
        </div>
    </div>`
    }
}
let bask = new ResultBasket();

