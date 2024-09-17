// //MENU

// document.addEventListener('DOMContentLoaded', () => {
//     const buttons = document.querySelectorAll('.btn-menu-food');
//     const sections = document.querySelectorAll('.food-section');

//     buttons.forEach(button => {
//         button.addEventListener('click', () => {
//             const category = button.getAttribute('data-category');

//             // Удаляем класс активности у всех кнопок
//             buttons.forEach(btn => btn.classList.remove('active'));

//             // Добавляем класс активности к нажатой кнопке
//             button.classList.add('active');

//             // Скрыть все секции
//             sections.forEach(section => {
//                 section.style.display = 'none';
//             });

//             // Показать секцию, соответствующую выбранной категории
//             const activeSection = document.getElementById(category);
//             if (activeSection) {
//                 activeSection.style.display = 'block';
//             }
//         });
//     });
// });

