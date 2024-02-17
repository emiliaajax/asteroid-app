import { useEffect, useRef } from 'react'
import Star from '../utils/Star'

const NUM_STARS = 400
const NUM_COLORS = 3

type Props = {
  children: React.ReactNode
}

const StarrySkyLayout = ({ children }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    /**
     * Generates a random color from a predefined set of colors.
     *
     * @returns Random color.
     */
    const randomColor = (): string => {
      const arrColors = ['#ffffff', '#ffecd3', '#bfcfff']
      return arrColors[Math.floor(Math.random() * NUM_COLORS)]
    }

    /**
     * Resizes the canvas to match the window size.
     */
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    /**
     * Updates the positions of stars.
     *
     * @param stars - Array of stars to update.
     */
    const updateStars = (stars: Star[]) => {
      for (let i = 0; i < stars.length; i++) {
        stars[i].update()
      }
    }

    /**
     * Renders stars on the canvas.
     * 
     * @param context - Canvas rendering context.
     * @param stars - Array of stars to render.
     */
    const renderStars = (
      context: CanvasRenderingContext2D | null,
      stars: Star[],
    ) => {
      if (context) {
        const canvasWidth = window.innerWidth
        const canvasHeight = window.innerHeight
        context.clearRect(0, 0, canvasWidth, canvasHeight)

        for (let i = 0; i < stars.length; i++) {
          stars[i].render(context)
        }
      }
    }

    /**
     * Animates the starry sky by updating and rendering stars.
     */
    const animate = () => {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      if (!canvas || !context) return

      updateStars(stars)
      renderStars(context, stars)
      animationRef.current = requestAnimationFrame(animate)
    }

    // Create initial stars
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => {
      const randX = Math.floor(Math.random() * window.innerWidth) + 1
      const randY = Math.floor(Math.random() * window.innerHeight) + 1
      const randR = Math.random() * 1.7 + 0.5

      return new Star({
        x: randX,
        y: randY,
        r: randR,
        color: randomColor(),
      })
    })

    // Initialize canvas and animation
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()

    // Clean up event listeners and animation frame
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className='flex w-full h-full'>
      <canvas ref={canvasRef} className='bg-black absolute top-0 left-0 z-0' />
      <div className='w-full h-full z-10'>{children}</div>
    </div>
  )
}

export default StarrySkyLayout
