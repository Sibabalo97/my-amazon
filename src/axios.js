import axios from "axios";

// Axios instance with the correct base URL for your Firebase function
const instance = axios.create({
  baseURL: 'http://localhost:5001/challenge-4b2b2/us-central1/api', // Local Firebase function URL for development
  // In production, you should change this to the live endpoint:
  // baseURL: 'https://us-central1-challenge-4b2b2.cloudfunctions.net/api'
});

export default instance;
