import { useEffect, useRef } from 'react'
import Star from '../utils/Star'

const NUM_STARS: number = 400
const NUM_COLORS: number = 3

type Props = {
  children: React.ReactNode
}

const StarrySkyLayout = ({ children }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) return

    function randomColor(): string {
      const arrColors = ['#ffffff', '#ffecd3', '#bfcfff']
      return arrColors[Math.floor(Math.random() * NUM_COLORS)]
    }

    let canvasWidth: number = window.innerWidth
    let canvasHeight: number = window.innerHeight

    const resizeCanvas = () => {
      canvasWidth = canvas.width = window.innerWidth
      canvasHeight = canvas.height = window.innerHeight
    }

    // Initialize canvas size
    resizeCanvas()

    window.addEventListener('resize', resizeCanvas)

    const stars: Star[] = []

    for (let i = 0; i < NUM_STARS; i++) {
      const randX = Math.floor(Math.random() * canvasWidth) + 1
      const randY = Math.floor(Math.random() * canvasHeight) + 1
      const randR = Math.random() * 1.7 + 0.5

      const star = new Star({
        x: randX,
        y: randY,
        r: randR,
        color: randomColor(),
      })

      stars.push(star)
    }

    // Function to update the stars' properties
    function update() {
      for (let i = 0; i < stars.length; i++) {
        stars[i].update()
      }
    }

    // Function to animate the stars
    function animate() {
      update()

      if (context) {
        context.clearRect(0, 0, canvasWidth, canvasHeight)

        for (let i = 0; i < stars.length; i++) {
          stars[i].render(context)
        }
      }

      animationRef.current = requestAnimationFrame(animate) // Request next animation frame
    }

    animate()

    // Clean-up function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current) // Cancel animation frame when component unmounts
      }
      window.removeEventListener('resize', resizeCanvas) // Remove resize listener
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
