// Use environment variable first, then fallback to production link or localhost
export const BASE_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname !== 'localhost' ? 'https://anil-ayroor.onrender.com' : 'http://localhost:5000');
const API_URL = `${BASE_URL}/api/v1`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return res.json();
    },
    signup: async (userData) => {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return res.json();
    }
  },
  blogs: {
    getAll: async (limit) => {
      const url = limit ? `${API_URL}/blogs?limit=${limit}` : `${API_URL}/blogs`;
      const res = await fetch(url);
      return res.json();
    },
    getOne: async (id) => {
      const res = await fetch(`${API_URL}/blogs/${id}`);
      return res.json();
    },
    create: async (blogData) => {
      const res = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(blogData)
      });
      return res.json();
    },
    update: async (id, blogData) => {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(blogData)
      });
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.status === 204) return { status: 'success' };
      return res.json();
    },
    uploadImage: async (formData) => {
      const res = await fetch(`${API_URL}/blogs/upload`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });
      return res.json();
    }
  }
};
