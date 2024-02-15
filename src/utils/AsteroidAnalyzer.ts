export default class AsteroidAnalyzer {
  private asteroids: any[]

  constructor(asteroids: any[]) {
    this.asteroids = asteroids
  }

  getNumberOfPotentiallyHazardousAsteroids(): number {
    return this.asteroids.filter(
      asteroid => asteroid.is_potentially_hazardous_asteroid === true,
    ).length
  }

  getClosestAsteroid(): string {
    const asteroidsNotOrbitingEarth = this.asteroids.filter(
      asteroid => asteroid.close_approach_data[0].orbiting_body !== 'Earth',
    )

    if (asteroidsNotOrbitingEarth.length === 0) {
      return this.findClosest(this.asteroids)
    } else {
      return this.findClosest(asteroidsNotOrbitingEarth)
    }
  }

  private findClosest(asteroids: any[]) {
    return asteroids.reduce((closest, current) => {
      const closestDistance = parseFloat(
        closest.close_approach_data[0].miss_distance.kilometers,
      )
      const currentDistance = parseFloat(
        current.close_approach_data[0].miss_distance.kilometers,
      )

      return closestDistance < currentDistance ? closest : current
    })
  }
}
