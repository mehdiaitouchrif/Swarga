import ui from './_ui.js'
import join from './_join.js'
import login from './_login.js'
import { upload, deletePhoto } from './_photos.js'

// Current page
const pathname = window.location.pathname
console.log(pathname)

// DOM  & Auth
if (!pathname.includes('auth')) {
	ui()
} else {
	if (pathname.includes('join')) {
		join()
	} else {
		login()
	}
}

// PHOTOS
upload()

if (pathname.includes('/user')) {
	deletePhoto()
}
