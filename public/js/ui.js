// TOGGLE NAV USER MENU
const avatar = document.querySelector('.navbar__avatar img')
const hidden = document.querySelector('.navbar__hidden')

avatar.addEventListener('click', () => {
	hidden.classList.toggle('block')
})

window.addEventListener('click', (e) => {
	if (e.target !== avatar) {
		hidden.classList.remove('block')
	}
})
