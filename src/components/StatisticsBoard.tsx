import { useDispatch, useSelector } from 'react-redux'
import StatisticsCard from './StatisticsCard'
import { AppDispatch, RootState } from '../app/store'
import { useEffect, useState } from 'react'
import { getAsteroidsByDate } from '../features/asteroids/asteroidSlice'
import AsteroidAnalyzer from '../utils/AsteroidAnalyzer'
import CircularProgress from '@mui/material/CircularProgress'

const StatisticsBoard = () => {
  const dispatch: AppDispatch = useDispatch()
  const { asteroidData, isPending } = useSelector(
    (state: RootState) => state.asteroids,
  )

  const [potentiallyHazard, setPotentiallyHazard] = useState<boolean>(false)
  const [distanceFromEarth, setDistanceFromEarth] = useState<string>('')
  const [orbiting, setOrbiting] = useState<string>('')
  const [estimatedDiameter, setEstimatedDiameter] = useState<string>('')
  const [relativeVelocity, setRelativeVelocity] = useState<string>('')
  const [name, setName] = useState<string>('')

  useEffect(() => {
    var todayDate = new Date().toISOString().slice(0, 10)

    dispatch(getAsteroidsByDate({ startDate: todayDate, endDate: todayDate }))
  }, [])

  useEffect(() => {
    if (asteroidData) {
      if (asteroidData.near_earth_objects) {
        const asteroids = Object.values(asteroidData.near_earth_objects).reduce(
          (acc, curr) => acc.concat(curr),
          [],
        )
        const analyzer = new AsteroidAnalyzer(asteroids)

        const closestAsteroid: any = analyzer.getClosestAsteroid()

        setPotentiallyHazard(closestAsteroid.is_potentially_hazardous_asteroid)
        setDistanceFromEarth(
          Math.round(
            parseFloat(
              closestAsteroid.close_approach_data[0].miss_distance.kilometers,
            ),
          ).toFixed(0),
        )
        setOrbiting(closestAsteroid.close_approach_data[0].orbiting_body)
        setEstimatedDiameter(
          `${parseFloat(closestAsteroid.estimated_diameter.meters.estimated_diameter_min).toFixed(2)} - ${parseFloat(closestAsteroid.estimated_diameter.meters.estimated_diameter_max).toFixed(2)}`,
        )
        setRelativeVelocity(
          parseFloat(
            closestAsteroid.close_approach_data[0].relative_velocity
              .kilometers_per_second,
          ).toFixed(0),
        )
        setName(closestAsteroid.name)
      }
    }
  }, [asteroidData])

  return (
    <>
      {!isPending ? (
        <div className='flex flex-col space-y-5'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <StatisticsCard header='Name' stats={name} />
            <StatisticsCard
              header='Distance from Earth (km)'
              stats={distanceFromEarth}
            />
            <StatisticsCard header='Orbiting' stats={orbiting} />
            <StatisticsCard header='Diameter (m)' stats={estimatedDiameter} />
            <StatisticsCard
              header='Relative velocity (km/s)'
              stats={relativeVelocity}
            />
            <StatisticsCard
              header='Potentially hazardous'
              stats={potentiallyHazard ? 'Yes' : 'No'}
            />
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
