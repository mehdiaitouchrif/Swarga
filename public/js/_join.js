const join = () => {
	const form = document.getElementById('join')

	form.addEventListener('submit', async (e) => {
		e.preventDefault()

		// Reset
		const errPs = document.querySelectorAll('.error')
		errPs.forEach((err) => (err.innerHTML = ''))

		const firstName = form.firstName.value
		const lastName = form.lastName.value
		const email = form.email.value
		const username = form.username.value
		const password = form.password.value

		const res = await fetch('/auth/join', {
			method: 'POST',
			body: JSON.stringify({ firstName, lastName, email, username, password }),
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

export default join
