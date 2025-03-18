import axios from "axios";
import { Author } from "../models/Author";

// Local backend API URL
const API_URL = "http://localhost:3001/authors";

// Function to get all authors
export const getAuthors = async (): Promise<Author[]> => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data; // Assuming API returns an array of authors directly
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

// POST - Add a new author
export const addAuthor = async (authorData: {
  name: string;
  photo?: string;
  biography?: string;
}) => {
  try {
    const response = await axios.post(API_URL, authorData);
    return response.data;
  } catch (error) {
    console.error("Failed to add author:", error);
    throw error;
  }
};
