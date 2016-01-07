import Animator from './Animator'
import Point from './Point'

import name from '../data/name'

function euclideanDistance(a, b){
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

export default class Untitled extends Animator{
	constructor(option){
		super(option)
		this.points = name.slice(0, 25).map((name) => new Point(name))
	}
	renderer(canvas, context){

		const {width, height} = canvas
		const pixelRatio = window.devicePixelRatio

		const pointRadius = 3 * pixelRatio
		const area = 0.5
		const fontSize = 12 * pixelRatio
		const lineWidth = 0.75 * pixelRatio


		const points = this.points.map((point) => {
			const pos = point.pos()
			return {
				x: pos.x * width * area + (width * (1 - area) / 2),
				y: pos.y * height * area + (height * (1 - area) / 2),
				name: point.name
			}
		})


		// render process
		
		context.clearRect(0, 0, width, height)

		// render lines
		const lines = []
		context.beginPath()
		points.forEach((point, index) => {
			points.map((p, i) => Object.assign({}, p, {distance: euclideanDistance(p, point), index: i}))
				.sort((a, b) => a.distance - b.distance)
				.slice(1, 5)
				.forEach((p) => {
					if(lines.some(i => i[0] === index && i[1] === p.index || i[0] === p.index && i[1] === index)) return
					lines.push([index, p.index])
					context.moveTo(point.x, point.y)
					context.lineTo(p.x, p.y)
				})
		})
		context.lineWidth = lineWidth
		context.strokeStyle = '#fff'
		context.stroke()


		// render points
		context.beginPath()
		points.forEach((point) => {
			context.moveTo(point.x - pointRadius / 2, point.y)
			context.arc(point.x, point.y, pointRadius, 0, Math.PI * 2)
		})
		context.fillStyle = '#fff'
		context.fill()


		// render text
		context.beginPath()
		context.font = `${fontSize}px 'courier'`
		points.forEach((p) => {
			context.fillStyle = '#fff'
			context.fillText(`${p.name}`, p.x + pointRadius * 2, p.y + pointRadius)
		})
	}
}