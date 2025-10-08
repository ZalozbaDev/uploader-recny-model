import { generateId } from './random'

const TOKEN_STORAGE_KEY = 'uploader_token'

/**
 * Get token from localStorage or generate a new one if none exists
 */
export const getStoredToken = (): string => {
  const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (storedToken) {
    return storedToken
  }

  // Generate new token if none exists
  const newToken = generateId(32)
  localStorage.setItem(TOKEN_STORAGE_KEY, newToken)
  return newToken
}

/**
 * Generate and store a new token in localStorage
 */
export const generateAndStoreNewToken = (): string => {
  const newToken = generateId(32)
  localStorage.setItem(TOKEN_STORAGE_KEY, newToken)
  return newToken
}

/**
 * Clear token from localStorage
 */
export const clearStoredToken = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}
