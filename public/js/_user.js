const userUpdate = () => {
	const editForm = document.getElementById('edit__form')

	editForm &&
		editForm.addEventListener('submit', async (e) => {
			e.preventDefault()

			const formData = {
				firstName: editForm.firstName.value,
				lastName: editForm.lastName.value,
				email: editForm.email.value,
				bio: editForm.bio.value,
				photo: editForm.photo.value,
			}

			console.log(formData)

			const res = await fetch(`/user/${editForm.userId.value}/settings`, {
				method: 'PUT',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const { success, data } = await res.json()

			if (success) {
				window.location.replace(`/user/${editForm.userId.value}`)
			}
		})
}

const profilePic = () => {
	// Change profile pic
	const fileInput = document.getElementById('pic')
	if (fileInput) {
		fileInput.addEventListener('change', (e) => {
			console.log('photo change attempt')
			const file = e.target.files[0]
			if (file == null) {
				return alert('No file selected.')
			}
			getSignedRequest(file)
			document.querySelector('.loading').textContent = 'Uploading...'
		})
	}

	// GET SIGNED REQUEST
	function getSignedRequest(file) {
		const xhr = new XMLHttpRequest()
		xhr.open(
			'GET',
			`/photos/sign-s3?file-name=${file.name}&file-type=${file.type}`
		)
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					const response = JSON.parse(xhr.responseText)
					uploadFile(file, response.signedRequest, response.url)
				} else {
					alert('Could not get signed URL.')
				}
			}
		}
		xhr.send()
	}

	// UPLOAD FILE & UPDATE UI
	function uploadFile(file, signedRequest, url) {
		const xhr = new XMLHttpRequest()
		xhr.open('PUT', signedRequest)
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					document.querySelector('.loading').remove()
					document.getElementById('photo').value = url
					document.getElementById('user-photo').setAttribute('src', url)
				} else {
					alert('Could not upload file.')
				}
			}
		}
		xhr.send(file)
	}
}

export { userUpdate, profilePic }
