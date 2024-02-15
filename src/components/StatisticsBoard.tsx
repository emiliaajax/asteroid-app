import { useDispatch, useSelector } from 'react-redux'
import StatisticsCard from './StatisticsCard'
import { AppDispatch, RootState } from '../app/store'
import { useEffect, useState } from 'react'
import { getAsteroidsByDate } from '../features/asteroids/asteroidSlice'
import AsteroidAnalyzer from '../utils/AsteroidAnalyzer'

const StatisticsBoard = () => {
  const dispatch: AppDispatch = useDispatch()
  const { asteroidData } = useSelector((state: RootState) => state.asteroids)

  const [potentiallyHazard, setPotentiallyHazard] = useState<number | null>(
    null,
  )

  useEffect(() => {
    dispatch(
      getAsteroidsByDate({ startDate: '2024-02-15', endDate: '2024-02-17' }),
    )
  }, [])

  useEffect(() => {
    if (asteroidData) {
      if (asteroidData.near_earth_objects) {
        const asteroids = Object.values(asteroidData.near_earth_objects).reduce(
          (acc, curr) => acc.concat(curr),
          [],
        )
        const analyzer = new AsteroidAnalyzer(asteroids)

        setPotentiallyHazard(
          analyzer.getNumberOfPotentiallyHazardousAsteroids(),
        )
      }
    }
  }, [asteroidData])

  return (
    <>
      <StatisticsCard header='Potentially hazard' stats={potentiallyHazard} />
    </>
  )
}

export default StatisticsBoard
