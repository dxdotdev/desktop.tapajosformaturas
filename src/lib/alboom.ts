import axios from 'axios'

export const alboom = axios.create({
  // biome-ignore lint/style/useNamingConvention:
  baseURL: 'https://proof-api.alboompro.com/api',
  headers: {
    'App-Code': 'proof',
    // biome-ignore lint/style/useNamingConvention:
    Authorization: localStorage.getItem('alboomAuthorizationToken'),
  },
})
