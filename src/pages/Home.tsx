import StatisticsBoard from '../components/StatisticsBoard'

const Home = () => {
  return (
    <>
      <div className='flex flex-col h-full w-full items-center justify-center -m-10'>
        <div className='text-white text-3xl'>The Closest Asteroid Today</div>
        <div className=' pt-20'>
          <StatisticsBoard />
        </div>
      </div>
    </>
  )
}

export default Home
