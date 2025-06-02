import { generateRandomString } from '../utils/helpers';

interface ApiKey {
  key: string;
  createdAt: string;
  lastUsed: string;
}

// Simulate localStorage for API key storage
const API_KEY_STORAGE_KEY = 'performancetrack_api_key';

export const apiService = {
  generateApiKey: (): ApiKey => {
    const newKey = {
      key: generateRandomString(32),
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };
    localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(newKey));
    return newKey;
  },

  getApiKey: (): ApiKey | null => {
    const stored = localStorage.getItem(API_KEY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  revokeApiKey: () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
};