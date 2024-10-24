import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Fetch projects from the backend
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};
