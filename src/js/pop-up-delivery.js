// // //POP UP DELIVERY//

// document.addEventListener('DOMContentLoaded', () => {
//     // Открытие поп-ап формы
//     const checkoutButton = document.getElementById('cart-checkout');
//     const popupOverlay = document.getElementById('popup-overlay');
//     const popupClose = document.getElementById('popup-close');
//     const popupForm = document.querySelector('.popup-form'); // Получаем форму

//     if (checkoutButton && popupOverlay && popupClose && popupForm) {
//         checkoutButton.addEventListener('click', () => {
//             popupOverlay.style.display = 'flex';
//         });

//         popupClose.addEventListener('click', () => {
//             popupOverlay.style.display = 'none';
//         });

//         popupOverlay.addEventListener('click', (e) => {
//             if (e.target === popupOverlay) {
//                 popupOverlay.style.display = 'none';
//             }
//         });

//         // Обработка отправки формы
//         popupForm.addEventListener('submit', (event) => {
//             event.preventDefault(); // Предотвращаем стандартное поведение формы

//             // Получаем данные из формы
//             const name = document.getElementById('name').value;
//             const phone = document.getElementById('phone').value;
//             const delivery = document.querySelector('input[name="delivery"]:checked')?.value || 'Не выбрано';
//             const address = document.getElementById('address').value;
//             const floor = document.getElementById('floor').value;
//             const intercom = document.getElementById('intercom').value;

//             // Вывод данных в консоль
//             console.log({
//                 name,
//                 phone,
//                 delivery,
//                 address,
//                 floor,
//                 intercom
//             });

//             // Скрываем поп-ап после отправки
//             popupOverlay.style.display = 'none';

//             // Можно добавить логику для отправки данных на сервер здесь
//             // Например, используя fetch() или XMLHttpRequest
//         });
//     } else {
//         console.error('Не найдены элементы для обработки событий');
//     }
// });