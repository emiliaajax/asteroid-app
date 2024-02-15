export default class AsteroidAnalyzer {
  private asteroids: any[]

  constructor(asteroids: any[]) {
    this.asteroids = asteroids;
  }

  // Example analysis method
  getNumberOfPotentiallyHazardousAsteroids() {
    return this.asteroids.filter(asteroid => asteroid.is_potentially_hazardous_asteroid === true).length
  }
}
