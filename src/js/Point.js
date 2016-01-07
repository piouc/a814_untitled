function f(start, end, progress){
	return {
		x: (end.x - start.x) * progress + start.x,
		y: (end.y - start.y) * progress + start.y
	}
}

function bejier(points, progress){
	if(points.length <= 1) { //pointsが1点になった時点で終了
		return points[0]
	}

	var result = []
	for(var i = points.length - 1; i > 0; i--) {
		result.push(f(points[i-1], points[i], progress))
	}
	return bejier(result.reverse(), progress)
}

export default class Paint{
	constructor(name){
		this.name = name
		this.duration = 50000 + Math.floor(Math.random() * 50000)
		this.startTime = Date.now() - Math.floor(Math.random() * this.duration) - 1
		this.points = this.randomPoints(4)
	}

	pos(){
		return bejier(this.points, this.progress())
	}

	progress(){
		const now = Date.now()
		const passed = now - this.startTime

		if(this.startTime + this.duration < now){
			this.resetPoints()
			this.startTime = now - ((this.startTime - now) % this.duration)
		}

		return passed / this.duration
	}

	resetPoints(){
		this.points = Array.prototype.concat(this.points[this.points.length-1],{
			x: -(this.points[this.points.length-2].x - this.points[this.points.length-1].x) + this.points[this.points.length-1].x,
			y: -(this.points[this.points.length-2].y - this.points[this.points.length-1].y) + this.points[this.points.length-1].y
		}, this.randomPoints(this.points.length - 2))
	}

	randomPoints(count){
		return Array.apply(null, Array(Number(count))).map(() => {
			return {
				x: Math.random(),
				y: Math.random()
			}
		})
	}
}