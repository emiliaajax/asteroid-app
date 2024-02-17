/**
 * Represents an Asteroid Analyzer.
 */
export default class AsteroidAnalyzer {
  /**
   * The array of asteroids.
   */
  private asteroids: any[]

  /**
   * Constructs a new AsteroidAnalyzer object.
   * 
   * @param asteroids - An array of asteroids.
   */
  constructor(asteroids: any[]) {
    this.asteroids = asteroids
  }

  /**
   * Finds the closest asteroid.
   * 
   * @returns The closest asteroid.
   */
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

  /**
   * Finds the closest asteroid among the given array.
   * 
   * @param asteroids - An array of asteroids.
   * @returns The closest asteroid.
   */
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
