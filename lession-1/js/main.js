const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const img = 'http://placehold.it/200x150'; // добавляем картинку

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <img src = ${img}>
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price)).join(''); // с помощью join() убираем запятые из нашего массива
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);