// // // <!-- Поп-ап Карта товара -->

// document.addEventListener('DOMContentLoaded', () => {
//     // Элементы попапа
//     const popupOverlay = document.getElementById('popup-overlay-card');
//     const popupClose = document.getElementById('popup-close-card');
//     const foodNameElement = document.querySelector('.popup-content .food-name');
//     const foodImageElement = document.querySelector('.popup-content .food-image img');
//     const foodWeightElement = document.querySelector('.popup-content .food-weight');
//     const itemQuantityElement = document.querySelector('.popup-content .item-quantity');
//     const popupTotalPrice = document.getElementById('popup-total-price');
//     const popupAddToCart = document.getElementById('popup-button-card');
    
//     let quantity = 1; // Начальное значение количества товара
//     let price = 0; // Начальная цена

//     // Функция для обновления общего количества и цены в попапе
//     function updatePopupPrice() {
//         popupTotalPrice.innerText = `${price * quantity}₴`;
//     }

//     // Закрытие поп-апа
//     function closePopup() {
//         popupOverlay.style.display = 'none';
//         quantity = 1; // Сбрасываем количество при закрытии попапа
//         itemQuantityElement.innerText = quantity;
//     }

//     popupClose.addEventListener('click', closePopup);

//     popupOverlay.addEventListener('click', (e) => {
//         if (e.target === popupOverlay) {
//             closePopup();
//         }
//     });

//     // Обработка кликов на карточках и кнопки добавления
//     document.addEventListener('click', (e) => {
//         const target = e.target;
//         const card = target.closest('.food-card');

//         if (target.dataset.action === 'add-to-cart') {
//             // Обработка добавления в корзину
//             const name = card.querySelector('.food-name').innerText;
//             price = parseInt(card.querySelector('.food-price').innerText.replace('₴', ''));
//             const image = card.querySelector('img').src;
//             const weight = card.querySelector('.food-weight').innerText;

//             addToCart(name, price, image, weight);
//         } else if (card && !target.classList.contains('food-button')) {
//             // Открытие попапа только если не нажата кнопка "Добавить"
//             const name = card.querySelector('.food-name').innerText;
//             const image = card.querySelector('img').src;
//             const weight = card.querySelector('.food-weight').innerText;

//             // Вставка данных в попап
//             foodNameElement.innerText = name;
//             foodImageElement.src = image;
//             foodImageElement.alt = name;
//             foodWeightElement.innerText = weight;
//             quantity = 1; // Устанавливаем начальное количество
//             itemQuantityElement.innerText = quantity;
//             price = parseInt(card.querySelector('.food-price').innerText.replace('₴', '')); // Устанавливаем цену

//             updatePopupPrice(); // Обновляем цену в попапе

//             popupOverlay.style.display = 'flex';
//         }
//     });

//     // Функция добавления в корзину
//     function addToCart(name, price, image, weight) {
//         const existingItem = cart.find(item => item.name === name);
//         if (existingItem) {
//             existingItem.quantity += quantity; // Добавляем выбранное количество
//         } else {
//             cart.push({ name, price, image, weight, quantity });
//         }
//         updateCartCount();
//         updateCartItems();
//     }

//     // Функции для увеличения и уменьшения количества товара
//     function increaseQuantity() {
//         quantity++;
//         itemQuantityElement.innerText = quantity;
//         updatePopupPrice();
//     }

//     function decreaseQuantity() {
//         if (quantity > 1) {
//             quantity--;
//             itemQuantityElement.innerText = quantity;
//             updatePopupPrice();
//         }
//     }

//     // Обработчики событий для кнопок увеличения и уменьшения количества
//     document.addEventListener('click', (e) => {
//         if (e.target.classList.contains('quantity-plus')) {
//             increaseQuantity();
//         } else if (e.target.classList.contains('quantity-minus')) {
//             decreaseQuantity();
//         } else if (e.target === popupAddToCart) {
//             const name = foodNameElement.innerText;
//             const image = foodImageElement.src;
//             const weight = foodWeightElement.innerText;
//             addToCart(name, price, image, weight);
//             closePopup(); // Закрываем попап после добавления в корзину
//         }
//     });
// });