import axios from 'axios';

const API_URL = 'http://localhost:5000/api';



// Fetch all machinery
export const getAllMachinery = async () => {
  try {
    const response = await fetch(`${API_URL}/machinery`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching machinery data:', error);
    throw error;
  }
};

// Fetch machinery by ID
export const getMachineryById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/machinery/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching machinery with id ${id}:`, error);
    throw error;
  }
};

// Fetch machinery with filters
export const getFilteredMachinery = async (filters) => {
  try {
    // Convert filters object to query string
    const queryParams = Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    const response = await fetch(`${API_URL}/machinery/filter?${queryParams}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching filtered machinery data:', error);
    throw error;
  }
};

// Submit contact form
export const submitContact = async (contactData) => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};



export const fetchNewMachinery = async () => {
    try {
        const response = await axios.get(`${API_URL}/machinery/new`);
        return response.data;
    } catch (error) {
        console.error('Error fetching new machinery:', error);
        throw error;
    }
};

export const fetchUsedMachinery = async () => {
    try {
        const response = await axios.get(`${API_URL}/machinery/used`);
        return response.data;
    } catch (error) {
        console.error('Error fetching used machinery:', error);
        throw error;
    }
};

export const fetchOffers = async () => {
    try {
        const response = await axios.get(`${API_URL}/machinery/offers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching offers:', error);
        throw error;
    }
};

