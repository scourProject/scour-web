import { api } from './api'

import { Post } from '../types'

export const getPosts = () => api.get('/posts')
