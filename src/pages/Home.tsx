import StatisticsCard from '../components/StatisticsCard'

const Home = () => {
  return (
    <>
      <div className='flex h-full w-full'>
        <StatisticsCard header='Hello' stats={12} />
        <StatisticsCard header='Hello' stats={12} />
      </div>
    </>
  )
}

export default Home
