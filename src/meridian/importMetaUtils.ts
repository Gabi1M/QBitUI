export const getVersion = () => import.meta.env.VITE_VERSION;
export const getIsDevEnv = () => import.meta.env.DEV;
export const getIsMockEnabled = () => import.meta.env.VITE_MOCK_ENABLED === 'true';
export const getApiUrl = () => import.meta.env.VITE_API_URL;
