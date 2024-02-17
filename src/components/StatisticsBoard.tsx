import { useDispatch, useSelector } from 'react-redux'
import StatisticsCard from './StatisticsCard'
import { AppDispatch, RootState } from '../app/store'
import { useEffect, useState } from 'react'
import { getAsteroidsByDate } from '../features/asteroids/asteroidSlice'
import AsteroidAnalyzer from '../utils/AsteroidAnalyzer'
import CircularProgress from '@mui/material/CircularProgress'

type Asteroid = {
  potentiallyHazardous: string
  distanceFromEarth: string
  orbiting: string
  estimatedDiameter: string
  relativeVelocity: string
  name: string
}

const StatisticsBoard = () => {
  const dispatch: AppDispatch = useDispatch()

  const { asteroidData, isPending } = useSelector((state: RootState) => state.asteroids)
  const [asteroidOfTheDay, setAsterodOfTheDay] = useState<Asteroid>({
    potentiallyHazardous: '',
    distanceFromEarth: '',
    orbiting: '',
    estimatedDiameter: '',
    relativeVelocity: '',
    name: '',
  })

  useEffect(() => {
    const todaysDate = new Date().toISOString().slice(0, 10)

    dispatch(getAsteroidsByDate({ startDate: todaysDate, endDate: todaysDate }))
  }, [])

  useEffect(() => {
    if (asteroidData) {
      if (asteroidData.near_earth_objects) {
        const asteroids = Object.values(asteroidData.near_earth_objects).reduce((acc, curr) => acc.concat(curr), [])
        const analyzer = new AsteroidAnalyzer(asteroids)

        const closestAsteroid: any = analyzer.getClosestAsteroid()

        const name = closestAsteroid.name
        const potentiallyHazardous = closestAsteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'
        const distanceFromEarth = parseFloat(closestAsteroid.close_approach_data[0].miss_distance.kilometers).toFixed(0)
        const orbiting = closestAsteroid.close_approach_data[0].orbiting_body
        const diameterMin = parseFloat(closestAsteroid.estimated_diameter.meters.estimated_diameter_min).toFixed(2)
        const diameterMax = parseFloat(closestAsteroid.estimated_diameter.meters.estimated_diameter_max).toFixed(2)
        const relativeVelocity = parseFloat(
          closestAsteroid.close_approach_data[0].relative_velocity.kilometers_per_second,
        ).toFixed(0)

        setAsterodOfTheDay({
          potentiallyHazardous,
          distanceFromEarth,
          orbiting,
          estimatedDiameter: `${diameterMin} - ${diameterMax}`,
          relativeVelocity,
          name,
        })
      }
    }
  }, [asteroidData])

  return (
    <>
      {!isPending ? (
        <div className='flex flex-col space-y-5'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <StatisticsCard header='Name' stats={asteroidOfTheDay.name} />
            <StatisticsCard header='Distance from Earth (km)' stats={asteroidOfTheDay.distanceFromEarth} />
            <StatisticsCard header='Orbiting' stats={asteroidOfTheDay.orbiting} />
            <StatisticsCard header='Diameter (m)' stats={asteroidOfTheDay.estimatedDiameter} />
            <StatisticsCard header='Relative velocity (km/s)' stats={asteroidOfTheDay.relativeVelocity} />
            <StatisticsCard header='Potentially hazardous' stats={asteroidOfTheDay.potentiallyHazardous} />
          </div>
        </div>
      ) : (
        <div className='text-white flex h-[18rem] justify-center items-center'>
          <CircularProgress color='inherit' />
        </div>
      )}
    </>
  )
}

export default StatisticsBoard
