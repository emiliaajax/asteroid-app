import StatisticsBoard from '../components/StatisticsBoard'

const Home = () => {
  return (
    <>
      <div className='flex flex-col h-full overflow-scroll w-full items-center py-8 sm:py-20 md:py-20 lg:py-20'>
        <div className='text-white flex flex-col items-center pl-5 pr-5'>
          <p className='text-3xl lg:text-5xl md:text-5xl sm:text-5xl'>
            Hello, I'm an Asteroid ☄️
          </p>
          <p className='text-sm lg:text-3xl md:text-3xl sm:text-2xl mt-3'>
            Today is a great day, I'm at my closest to Earth.
            <br></br>
            If you are lucky, you might spot me 👋
            <br></br>
            <br></br>
            <br></br>
            Either way, here are some interesting facts about me:
          </p>
        </div>
        <div className='pt-5 md:pt-10 lg:pt-10'>
          <StatisticsBoard />
        </div>
      </div>
    </>
  )
}

export default Home
