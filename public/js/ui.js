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

// NAVBAR SCROLL TRANSITION
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
	if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
		navbar.classList.add('transition')
	} else {
		navbar.classList.remove('transition')
	}
})
