const login = () => {
	const form = document.getElementById('login')

	form.addEventListener('submit', async (e) => {
		e.preventDefault()

		// Reset
		const errPs = document.querySelectorAll('.error')
		errPs.forEach((err) => (err.innerHTML = ''))

		const email = form.email.value
		const password = form.password.value

		const res = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const { errors, success } = await res.json()
		console.log(errors, success)

		if (success) {
			window.location.replace('/')
		} else {
			errors.forEach(
				(error) =>
					(document.querySelector(
						`.${error.field}`
					).innerHTML = `<div class="alert alert--danger">${error.message}</div>`)
			)
		}
	})
}

export default login
