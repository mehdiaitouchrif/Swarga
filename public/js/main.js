import ui from './_ui.js'
import join from './_join.js'
import login from './_login.js'

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
