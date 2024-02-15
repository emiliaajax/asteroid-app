import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import asteroidService from './asteroidService.ts'

interface AsteroidState {
  isError: boolean
  isSuccess: boolean
  isPending: boolean
  message: string
  asteroidData: AsteroidData | null
}

type AsteroidData = {
  element_count: number
  links: Object
  near_earth_objects: {
    [date: string]: any[]
  } | null
}

export const initialState: AsteroidState = {
  isError: false,
  isSuccess: false,
  isPending: false,
  message: '',
  asteroidData: null,
}

interface AsteroidDateRange {
  startDate: string
  endDate?: string
}

export const getAsteroidsByDate = createAsyncThunk(
  'asteroids',
  async ({ startDate, endDate }: AsteroidDateRange, thunkAPI) => {
    try {
      return await asteroidService.getAsteroidsByDate(startDate, endDate)
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const asteroidSlice = createSlice({
  name: 'asteroids',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false
      state.isSuccess = false
      state.isPending = false
      state.message = ''
      state.asteroidData = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAsteroidsByDate.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.asteroidData = action.payload
      })
      .addCase(getAsteroidsByDate.rejected, state => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.asteroidData = null
      })
      .addCase(getAsteroidsByDate.pending, state => {
        state.isPending = true
      })
  },
})

export const { reset } = asteroidSlice.actions
export default asteroidSlice.reducer
