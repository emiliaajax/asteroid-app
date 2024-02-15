import StatisticsBoard from '../components/StatisticsBoard'

const Home = () => {
  return (
    <>
      <div className='flex flex-col h-full w-full items-center justify-center -m-10'>
        <div className='text-white flex flex-col items-center'>
          <p className='text-5xl'>Hello, I'm an Asteroid ☄️</p>
          <p className='text-xl mt-3'>
            Today is a great day, because I'm at my closest to Earth.
            <br></br>
            If you are lucky, you might spot me 👋
            <br></br>
            <br></br>
            <br></br>
            Either way, here are some interesting facts about me:
          </p>
        </div>
        <div className='pt-10'>
          <StatisticsBoard />
        </div>
      </div>
    </>
  )
}

export default Home
