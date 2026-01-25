export function initHeader() {
    
/* BURGER MENU */
const openCloseNavMenu = document.querySelector('#openCloseNavMenu')
const navBugerJs = document.querySelector('#navBugerJs')

openCloseNavMenu.addEventListener('click', toggleMenuOpenState)
navBugerJs.addEventListener('click', toggleMenuOpenState)

function toggleMenuOpenState() {
  openCloseNavMenu.classList.toggle('open')
  navBugerJs.classList.toggle('open')
}
}