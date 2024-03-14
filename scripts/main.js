"use strict"

// TASKS:
// 1. Фильтр - по категории, по скидке, по цене
// 2. Поиск

// 3. Добавление в корзину
// 4. Отображение на карточке, сколько именно этого товара в корзине
// 5. Покупка с очищением корзины, выводом сообщения в модальном окне и списанием с остатков (т.е. POST в БД - изменения количества)
// 6. Если количество 0 - неактивная кнопка добавления в корзину, текст в карточке - Нет в наличии (возможно, управление количеством вывести нужно будет в отдельную функцию)

const catalog = document.getElementById('catalog');

// ФУНКЦИЯ СОЗДАНИЯ КАТАЛОГА
function createCatalog(goods) {
    goods.forEach((goodsItem) => {
        const card = document.createElement('div');
        card.classList.add('goodsCard');
        const cardTags = document.createElement('div');
        cardTags.classList.add('cardTags');
        card.insertAdjacentHTML('beforeend', `
            <img src="../images/good.jpg" alt="goodsImg" class="cardImg">
            <div class="cardTitle">
                <h3>${goodsItem.title}</h3>
            </div>
            <p><b>${goodsItem.price}</b> руб.</p>
            <p><i>Категория: ${goodsItem.category}</i></p>
            <p>На складе: ${goodsItem.quantity}</p>
            `)  
        const sale = document.createElement('div');
        if (goodsItem.sale) {
            sale.classList.add('sale');
            sale.innerText = 'Скидка';
            cardTags.appendChild(sale);
        }
        card.appendChild(cardTags);
        catalog.appendChild(card);
    })
};

async function getData() {
    return fetch(`https://wm-js-fb-default-rtdb.firebaseio.com/goods.json`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log('Ошибка');
        }
    });
};


// XMLHttpRequest
function getRequest(method, url) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            const data = xhr.response;
            createCatalog(data);
        };
        xhr.send();
};

function getCatalogData() {
    getData()
    .then((data) => {
        catalog.innerHTML = '';
        createCatalog(data);
    })
}

// ЗАГРУЗКА КАТАЛОГА С ПОМОЩЬЮ getData() и FETCH
const catalogBtn = document.getElementById('catalogBtn');
catalogBtn.addEventListener('click', () => {
    loading()
})

function loading() {
    catalog.innerHTML = 'Загрузка...';
    setTimeout(() => {
        getCatalogData()
    }, 1000);
}

loading();
