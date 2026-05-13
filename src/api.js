import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

const LOCAL_POSTS_KEY = 'netizen-local-posts'

function readLocalPosts() {
  const savedPosts = localStorage.getItem(LOCAL_POSTS_KEY)
  return savedPosts ? JSON.parse(savedPosts) : []
}

function saveLocalPosts(posts) {
  localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(posts))
}

export async function fetchPosts() {
  const response = await api.get('/posts')
  return response.data
}

export async function fetchPostById(id) {
  const response = await api.get(`/posts/${id}`)
  return response.data
}

export async function createPost(postData) {
  const localPost = {
    ...postData,
    id: `local-${Date.now()}`,
  }

  try {
    await api.post('/posts', postData)
  } catch (error) {
    // Keep local creation working even if the demo API request fails.
  }

  const existingPosts = readLocalPosts()
  saveLocalPosts([localPost, ...existingPosts])

  return localPost
}

export function fetchLocalPosts() {
  return readLocalPosts()
}

export async function fetchPostByIdWithFallback(id) {
  const localPost = readLocalPosts().find((post) => String(post.id) === String(id))

  if (localPost) {
    return localPost
  }

  return fetchPostById(id)
}
