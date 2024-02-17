/**
 * Interface for defining properties of a star.
 */
interface StarProps {
  /**
   * The x-coordinate of the star.
   */
  x: number
  /**
   * The y-coordinate of the star.
   */
  y: number
  /**
   * The radius of the star.
   */
  r: number
  /**
   * The color of the star.
   */
  color: string
}

/**
 * Represents a star object.
 */
export default class Star {
  /**
   * The x-coordinate of the star.
   */
  x: number
  /**
   * The y-coordinate of the star.
   */
  y: number
  /**
   * The radius of the star.
   */
  r: number
  /**
   * The rate of change of the radius.
   */
  rChange: number
  /**
   * The color of the star.
   */
  color: string

  /**
   * Constructs a new star object.
   *
   * @param props - The properties of the star.
   */
  constructor({ x, y, r, color }: StarProps) {
    /**
     * The x-coordinate of the star.
     */
    this.x = x
    /**
     * The y-coordinate of the star.
     */
    this.y = y
    /**
     * The radius of the star.
     */
    this.r = r
    /**
     * The rate of change of the radius.
     */
    this.rChange = 0.01
    /**
     * The color of the star.
     */
    this.color = color
  }

  /**
   * Renders the star on a canvas context.
   *
   * @param context - The canvas rendering context.
   */
  render(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    context.shadowBlur = 8
    context.shadowColor = 'white'
    context.fillStyle = this.color
    context.fill()
  }

  /**
   * Updates the star properties.
   */
  update() {
    if (this.r > 2 || this.r < 0.8) {
      this.rChange = -this.rChange
    }
    this.r += this.rChange
  }
}
