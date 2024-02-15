import StatisticsBoard from '../components/StatisticsBoard'

const Home = () => {
  return (
    <>
      <div className='flex flex-col h-full w-full items-center justify-center'>
        <div className='text-white'>Todays Asteroid Data</div>
        <StatisticsBoard />
      </div>
    </>
  )
}

export default Home
