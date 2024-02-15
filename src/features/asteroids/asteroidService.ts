import axios from 'axios'

const API_URL: string = import.meta.env.VITE_ASTEROIDS_API
const API_KEY: string = import.meta.env.VITE_API_KEY

/**
 * Retrieves information about asteroids available for browsing.
 *
 * @returns A promise that resolves with data about asteroids available for browsing.
 */
const getAsteroids = async (): Promise<any> => {
  const response = await axios.get(API_URL + `/browse?api_key=${API_KEY}`)

  return response.data
}

type AsteroidData = {
  element_count: number
  links: Object
  near_earth_objects: {
    [date: string]: any[]
  } | null
}

/**
 * Retrieves information about nearby asteroids within the specified date range. If only the start date is provided, the function defaults to fetching data for the subsequent 7 days.
 *
 * @param startDate Start date in format YYYY-MM-DD
 * @param endDate End date in format YYYY-MM-DD (optional)
 *
 * @returns A promise that resolves with data about nearby asteroids within the specified date range.
 */
const getAsteroidsByDate = async (
  startDate: string,
  endDate?: string,
): Promise<AsteroidData> => {
  let url = API_URL + `feed?start_date=${startDate}`

  if (endDate) {
    url += `&end_date=${endDate}`
  }

  const response = await axios.get(url + `&api_key=${API_KEY}`)

  return response.data
}

const asteroidService = {
  getAsteroids,
  getAsteroidsByDate,
}

export default asteroidService
