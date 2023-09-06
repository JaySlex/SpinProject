const menu_toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const background = document.querySelector('.sidebar-background');
menu_toggle.addEventListener('click', () => {
  menu_toggle.classList.toggle('is-active');
  sidebar.classList.toggle('is-active');
  background.classList.toggle('is-active');
});
