type Props = {
  header: string
  stats: number | null
  description?: string
}

const StatisticsCard = ({ header, stats, description }: Props) => {
  return (
    <>
      <div className='flex flex-col w-[12rem] h-[10rem] p-5 rounded-md items-center justify-center bg-blue-950 text-white'>
        <h1 className='font-extralight pb-2'>{header}</h1>
        <p className=' text-2xl'>{stats}</p>
        <p>{description ? description : ''}</p>
      </div>
    </>
  )
}

export default StatisticsCard
