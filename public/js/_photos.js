// UPLOAD NEW IMAGE
const upload = () => {
	// GET FILE
	const fileInput = document.getElementById('image')
	if (fileInput) {
		fileInput.addEventListener('change', (e) => {
			const file = e.target.files[0]
			if (file == null) {
				return alert('No file selected.')
			}
			getSignedRequest(file)
			document.getElementById('preview').innerHTML =
				'<p class="text-lg uppercase text-center">Uploading...</p>'
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

	let imgUrl
	// UPLOAD FILE & UPDATE UI
	function uploadFile(file, signedRequest, url) {
		const xhr = new XMLHttpRequest()
		xhr.open('PUT', signedRequest)
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					imgUrl = url
					// Let's create an image tag
					document.getElementById(
						'preview'
					).innerHTML = `<img src=${url} alt=${file}  />`
					document.querySelector('.submit-form').classList.remove('hidden')
				} else {
					alert('Could not upload file.')
				}
			}
		}
		xhr.send(file)
	}

	// SUBMIT FORM TO SERVER
	const uploadForm = document.getElementById('upload-form')
	if (uploadForm) {
		uploadForm.addEventListener('submit', async (e) => {
			e.preventDefault()
			const photo = {
				user: uploadForm.user && uploadForm.user.value,
				google: uploadForm.google && uploadForm.google.value,
				name: uploadForm.name.value,
				url: imgUrl,
			}
			const res = await fetch('/photos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(photo),
			})

			const { success, errors } = await res.json()

			if (success) {
				document.getElementById('preview').innerHTML = ''
				document.querySelector('.submit-form').classList.add('hidden')
				document.querySelector('.alert__placeholder').innerHTML =
					'<div class="alert alert--success">Image submitted succesfully</div>'

				setTimeout(() => {
					document.querySelector('.alert__placeholder').innerHTML = ''
				}, 3000)
			} else {
				document.querySelector('.alert__placeholder').innerHTML =
					"<div class='alert alert--danger'>Couldn't upload image</div>"
			}
			console.log('success?', success)
			console.log('errors?', errors)
		})
	}
}

// Delete photo
function deletePhoto() {
	const deleteRef = document.querySelector('.delete')
	deleteRef.addEventListener('click', async (e) => {
		const id = e.target.getAttribute('data-id')
		const res = await fetch(`/photos/${id}`, {
			method: 'DELETE',
		})
		const { success } = await res.json()
		if (success) {
			window.location.reload()
		}
	})
}

export { upload, deletePhoto }
