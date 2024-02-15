type Props = {
  header: string
  stats: number
  description?: string
}

const StatisticsCard = ({ header, stats, description }: Props) => {
  return (
    <>
      <div className='flex flex-col w-[10rem] h-[6rem] p-5 rounded-md items-center bg-blue-950 text-white'>
        <h1>{header}</h1>
        <p>{stats}</p>
        <p>{description ? description : ''}</p>
      </div>
    </>
  )
}

export default StatisticsCard
