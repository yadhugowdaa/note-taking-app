import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

// === Auth Service ===

export const sendOtp = async (email: string) => {
  try {
    const response = await axios.post(API_URL + 'auth/send-otp', { email });
    return response.data;
  } catch (error: any) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return Promise.reject({ message });
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(API_URL + 'auth/register', userData);
    return response.data;
  } catch (error: any) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return Promise.reject({ message });
  }
};

// --- NEW: Login User Function ---
export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(API_URL + 'auth/login', userData);
    return response.data;
  } catch (error: any) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return Promise.reject({ message });
  }
};


// === Notes Service ===
const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getNotes = async (token: string) => {
  const response = await axios.get(API_URL + 'notes', getAuthHeaders(token));
  return response.data;
};

export const createNote = async (noteData: { title: string; content: string }, token: string) => {
  const response = await axios.post(API_URL + 'notes', noteData, getAuthHeaders(token));
  return response.data;
};

export const deleteNote = async (noteId: string, token: string) => {
  const response = await axios.delete(API_URL + 'notes/' + noteId, getAuthHeaders(token));
  return response.data;
};

// --- NEW: Update Note ---
export const updateNote = async (noteId: string, noteData: { title: string; content: string }, token: string) => {
  const response = await axios.put(API_URL + 'notes/' + noteId, noteData, getAuthHeaders(token));
  return response.data;
};
