import Untitled from './Untitled'

document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.createElement('canvas')
	document.body.appendChild(canvas)

	const width = document.documentElement.clientWidth * window.devicePixelRatio
	const height = document.documentElement.clientHeight * window.devicePixelRatio

	const animator = new Untitled({canvas, width, height})
	animator.start()

	window.addEventListener('resize', () => {
		animator.width = document.documentElement.clientWidth * window.devicePixelRatio
		animator.height = document.documentElement.clientHeight * window.devicePixelRatio
		animator.render()
	})

	// const reset = () => {
	// 	animator.points = Array.apply(null, Array(25)).map((v, i) => new Point(i))
	// 	setTimeout(reset, Math.floor(Math.random() * 500))
	// }
	// reset()

	window.addEventListener('keydown', (e) => {
		if(e.code !== 'Enter' || e.shiftKey || e.metaKey || e.altKey || e.ctrlKey) return

		const fullscreenElement = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
		const requestFullscreen = Element.prototype.requestFullscreen || Element.prototype.msRequestFullscreen || Element.prototype.mozRequestFullScreen || Element.prototype.webkitRequestFullscreen
		const exitFullscreen = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen

		fullscreenElement ? exitFullscreen.apply(document) : requestFullscreen.apply(document.documentElement)
	})

	document.addEventListener('touchstart', (e) => e.preventDefault())
})