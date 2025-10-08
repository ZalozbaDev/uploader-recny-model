import { axiosInstanceTranscript } from '../lib/axios'

export const getModels = async (): Promise<LanguageModel[]> => {
  try {
    const response = await axiosInstanceTranscript.get('/models')
    return response.data
  } catch (error) {
    return []
  }
}
