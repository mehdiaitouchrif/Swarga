const ui = () => {
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
	
	// MODAL
	const modal = document.querySelector('#modal')
	const modalBtn = document.querySelector('#open')
	const closeBtn = document.querySelector('#close')
	
	// Events
	modalBtn.addEventListener('click', openModal)
	closeBtn.addEventListener('click', closeModal)
	window.addEventListener('click', outsideClick)
	
	// Open
	function openModal() {
		modal.style.display = 'block'
	}
	
	// Close
	function closeModal() {
		modal.style.display = 'none'
	}
	
	// Close If Outside Click
	function outsideClick(e) {
		if (e.target == modal) {
			modal.style.display = 'none'
		}
	}
}

export default ui