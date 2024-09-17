// MENU

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-menu-food');
    const sections = document.querySelectorAll('.food-section');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Удаляем класс активности у всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));

            // Добавляем класс активности к нажатой кнопке
            button.classList.add('active');

            // Скрыть все секции
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Показать секцию, соответствующую выбранной категории
            const activeSection = document.getElementById(category);
            if (activeSection) {
                activeSection.style.display = 'block';
            }
        });
    });
});

// POP UP DELIVERY//

document.addEventListener('DOMContentLoaded', () => {
    // Открытие поп-ап формы
    const checkoutButton = document.getElementById('cart-checkout');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupClose = document.getElementById('popup-close');
    const popupForm = document.querySelector('.popup-form'); // Получаем форму

    if (checkoutButton && popupOverlay && popupClose && popupForm) {
        checkoutButton.addEventListener('click', () => {
            popupOverlay.style.display = 'flex';
        });

        popupClose.addEventListener('click', () => {
            popupOverlay.style.display = 'none';
        });

        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });

        // Обработка отправки формы
        popupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение формы

            // Получаем данные из формы
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const delivery = document.querySelector('input[name="delivery"]:checked')?.value || 'Не выбрано';
            const address = document.getElementById('address').value;
            const floor = document.getElementById('floor').value;
            const intercom = document.getElementById('intercom').value;

            // Вывод данных в консоль
            console.log({
                name,
                phone,
                delivery,
                address,
                floor,
                intercom
            });

            // Скрываем поп-ап после отправки
            popupOverlay.style.display = 'none';

            // Можно добавить логику для отправки данных на сервер здесь
            // Например, используя fetch() или XMLHttpRequest
        });
    } else {
        console.error('Не найдены элементы для обработки событий');
    }
});

// <!-- Поп-ап Карта товара -->

document.addEventListener('DOMContentLoaded', () => {
    // Элементы попапа
    const popupOverlay = document.getElementById('popup-overlay-card');
    const popupClose = document.getElementById('popup-close-card');
    const foodNameElement = document.querySelector('.popup-content .food-name');
    const foodImageElement = document.querySelector('.popup-content .food-image img');
    const foodWeightElement = document.querySelector('.popup-content .food-weight');
    const itemQuantityElement = document.querySelector('.popup-content .item-quantity');
    const popupTotalPrice = document.getElementById('popup-total-price');
    const popupAddToCart = document.getElementById('popup-button-card');
    
    let quantity = 1; // Начальное значение количества товара
    let price = 0; // Начальная цена

    // Функция для обновления общего количества и цены в попапе
    function updatePopupPrice() {
        popupTotalPrice.innerText = `${price * quantity}₴`;
    }

    // Закрытие поп-апа
    function closePopup() {
        popupOverlay.style.display = 'none';
        quantity = 1; // Сбрасываем количество при закрытии попапа
        itemQuantityElement.innerText = quantity;
    }

    popupClose.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Обработка кликов на карточках и кнопки добавления
    document.addEventListener('click', (e) => {
        const target = e.target;
        const card = target.closest('.food-card');

        if (target.dataset.action === 'add-to-cart') {
            // Обработка добавления в корзину
            const name = card.querySelector('.food-name').innerText;
            price = parseInt(card.querySelector('.food-price').innerText.replace('₴', ''));
            const image = card.querySelector('img').src;
            const weight = card.querySelector('.food-weight').innerText;

            addToCart(name, price, image, weight);
        } else if (card && !target.classList.contains('food-button')) {
            // Открытие попапа только если не нажата кнопка "Добавить"
            const name = card.querySelector('.food-name').innerText;
            const image = card.querySelector('img').src;
            const weight = card.querySelector('.food-weight').innerText;

            // Вставка данных в попап
            foodNameElement.innerText = name;
            foodImageElement.src = image;
            foodImageElement.alt = name;
            foodWeightElement.innerText = weight;
            quantity = 1; // Устанавливаем начальное количество
            itemQuantityElement.innerText = quantity;
            price = parseInt(card.querySelector('.food-price').innerText.replace('₴', '')); // Устанавливаем цену

            updatePopupPrice(); // Обновляем цену в попапе

            popupOverlay.style.display = 'flex';
        }
    });

    // Функция добавления в корзину
    function addToCart(name, price, image, weight) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity; // Добавляем выбранное количество
        } else {
            cart.push({ name, price, image, weight, quantity });
        }
        updateCartCount();
        updateCartItems();
    }

    // Функции для увеличения и уменьшения количества товара
    function increaseQuantity() {
        quantity++;
        itemQuantityElement.innerText = quantity;
        updatePopupPrice();
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            quantity--;
            itemQuantityElement.innerText = quantity;
            updatePopupPrice();
        }
    }

    // Обработчики событий для кнопок увеличения и уменьшения количества
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-plus')) {
            increaseQuantity();
        } else if (e.target.classList.contains('quantity-minus')) {
            decreaseQuantity();
        } else if (e.target === popupAddToCart) {
            const name = foodNameElement.innerText;
            const image = foodImageElement.src;
            const weight = foodWeightElement.innerText;
            addToCart(name, price, image, weight);
            closePopup(); // Закрываем попап после добавления в корзину
        }
    });
});


// CART 

// Корзина
let cart = [];
let cartVisible = false;

// Функция добавления в корзину
function addToCartFromButton(event) {
    const button = event.target;
    const card = button.closest('.food-card'); // Находим ближайшую карточку
    const name = card.querySelector('.food-name').innerText;
    const price = parseInt(card.querySelector('.food-price').innerText.replace('₴', ''));
    const image = card.querySelector('img').src;
    const weight = card.querySelector('.food-weight').innerText;

    addToCart(name, price, image, weight);
}

// Добавление продукта в корзину
function addToCart(name, price, image, weight) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, weight, quantity: 1 });
    }
    updateCartCount();
    updateCartItems();
}

// Обновление количества товаров в корзине
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Обновление содержимого корзины
function updateCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-container">
                <div class="inner-cart">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-weight">${item.weight}</span>
                        <span class="cart-item-price">${item.price}₴</span>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-plus">+</button>
                </div>
            </div>
        `;



        cartItems.appendChild(cartItem);

        // Добавляем функционал для кнопок "+" и "-"
        cartItem.querySelector('.quantity-plus').addEventListener('click', () => increaseQuantity(item.name));
        cartItem.querySelector('.quantity-minus').addEventListener('click', () => decreaseQuantity(item.name));
    });
    updateTotalPrice();
}

// Увеличение количества товара
function increaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    item.quantity++;
    updateCartItems();
}

// Уменьшение количества товара
function decreaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(item => item.name !== name);
    }
    updateCartItems();
}

// Обновление общей суммы
function updateTotalPrice() {
    const totalPrice = document.getElementById('cart-total-price');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.innerText = `${total}₴`;
}
// Обновление общей суммы
function updateTotalPrice() {
    const totalPrice = document.getElementById('cart-total-price');
    const deliveryText = document.getElementById('cart-delivery-text');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.innerText = `${total}₴`;

    // Обновляем текст доставки в зависимости от суммы
    if (total >= 499) {
        deliveryText.innerText = 'Бесплатная доставка';
    } else {
        deliveryText.innerText = 'Доставка от 89₴';
    }
}

// Показ и скрытие корзины
document.getElementById('cart-button').addEventListener('click', () => {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartVisible = !cartVisible;
    cartDropdown.style.display = cartVisible ? 'block' : 'none';
});

// Свернуть корзину
document.getElementById('cart-collapse').addEventListener('click', () => {
    document.getElementById('cart-dropdown').style.display = 'none';
    cartVisible = false;
});

// Добавляем событие на все кнопки "Добавить"
document.querySelectorAll('.food-button').forEach(button => {
    button.addEventListener('click', addToCartFromButton);
});