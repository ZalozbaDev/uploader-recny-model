import axios from 'axios'

// axiosInstance.defaults.headers['Content-Type'] = 'application/json'

export const axiosInstanceTranscript = axios.create({
  baseURL: process.env.REACT_APP_API_URL_TRANSCRIPT
})

export const axiosInstanceSlownik = axios.create({
  baseURL: process.env.REACT_APP_API_URL_SLOWNIK
})

export const axiosInstanceDubbing = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DUBBING
})
