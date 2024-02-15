// Define interface for StarProps
interface StarProps {
  x: number // x-coordinate of the star
  y: number // y-coordinate of the star
  r: number // radius of the star
  color: string // color of the star
}

// Define a class for a Star
export default class Star {
  x: number
  y: number
  r: number
  rChange: number
  color: string

  constructor({ x, y, r, color }: StarProps) {
    this.x = x // x-coordinate of the star
    this.y = y // y-coordinate of the star
    this.r = r // radius of the star
    this.rChange = 0.015 // rate of change of radius
    this.color = color // color of the star
  }

  // Method to render the star on canvas
  render(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    context.shadowBlur = 8
    context.shadowColor = 'white'
    context.fillStyle = this.color
    context.fill()
  }

  // Method to update the star's properties
  update() {
    if (this.r > 2 || this.r < 0.8) {
      this.rChange = -this.rChange
    }
    this.r += this.rChange
  }
}
