/**
 * Animator
 * @constructor
 * @param
 */

export default class Animator {
	constructor(option = {}){

		this._canvas = option.canvas || document.createElement('canvas')

		this.width = option.width ? option.width : this.canvas.width
		this.height = option.height ? option.height : this.canvas.height

		this._setContext()

		this._paused = true
		this.requestID = null

		this._tick = this._tick.bind(this)
	}


	render(){
		if(this.renderer && this._hasCanvas()){
			this.renderer(this._canvas, this._context)
		}
	}

	start(){
		if(!this.paused) return
		this.requestID = requestAnimationFrame(this._tick)
		this._paused = false
	}

	stop(){
		if(this.paused) return

		cancelAnimationFrame(this.requestID)
		this.requestID = null
		this._paused = true
	}

	_setContext(){
		if(!this._hasCanvas()) return
		this._context = this.canvas.getContext('2d')
	}

	_hasCanvas(){
		return this._canvas && this._canvas.nodeName === 'CANVAS' ? true : false
	}

	_tick(){
		if(this.paused) return
		if(!this._hasCanvas()) {
			this.paused = true
			return
		}
		this.render()
		this.requestID = requestAnimationFrame(this._tick)
	}

	get paused(){
		return this._paused
	}

	get width(){
		return this._width
	}

	set width(width){
		this._width = width
		if(!this._hasCanvas()) return
		this.canvas.width = width
		this._setContext()
	}


	get height(){
		return this._height
	}

	set height(height){
		this._height = height
		if(!this._hasCanvas()) return
		this.canvas.height = height
		this._setContext()
	}


	get canvas(){
		return this._canvas
	}

	set canvas(canvas){
		this._canvas = canvas

		if(!this._hasCanvas()) return

		this.canvas.width = this._width
		this.canvas.height = this._height
		this._setContext()
	}
}