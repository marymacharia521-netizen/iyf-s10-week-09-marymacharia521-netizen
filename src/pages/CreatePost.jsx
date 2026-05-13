import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../api'

function CreatePost() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!formData.title.trim() || !formData.body.trim()) {
      setError('Please fill in both the title and content.')
      return
    }

    setIsSubmitting(true)

    try {
      await createPost(formData)
      navigate('/posts')
    } catch (err) {
      setError('Failed to publish your post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-card">
      <p className="section-label">Create Post</p>
      <h2>Create a New Post</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Post Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter a title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="body"
          rows="6"
          placeholder="Write your post here"
          value={formData.body}
          onChange={handleChange}
        />

        {error && <p>{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </section>
  )
}

export default CreatePost
