import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID l_BPN5GlIOBLy7wFFuwgVTWN_tQYIDtKiAvH5B9oKDI',
    'Accept-Version': 'v1',
  },
})

export default api
