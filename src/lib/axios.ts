import axios from 'axios'
import { BACKEND_URL_RECOG,BACKEND_URL_DICT,BACKEND_URL_DUBBING } from "../config";

// axiosInstance.defaults.headers['Content-Type'] = 'application/json'

export const axiosInstanceTranscript = axios.create({
  baseURL: BACKEND_URL_RECOG
})

export const axiosInstanceSlownik = axios.create({
  baseURL: BACKEND_URL_DICT
})

export const axiosInstanceDubbing = axios.create({
  baseURL: BACKEND_URL_DUBBING
})
