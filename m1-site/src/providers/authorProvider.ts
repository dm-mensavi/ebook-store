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

export const getAuthorById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}?includeBooks=true`);
    return response.data;
  } catch (error: any) {
    console.error("API error fetching author:", error.response?.data || error);
    throw error;
  }
};

// ✅ Update an author
export const updateAuthor = async (
  id: string,
  updatedData: {
    name?: string;
    biography?: string;
    photo?: string;
  }
): Promise<Author> => {
  const cleanPayload: Record<string, any> = {};

  if (updatedData.name !== undefined) cleanPayload.name = updatedData.name;
  if (updatedData.biography !== undefined)
    cleanPayload.biography = updatedData.biography;
  if (updatedData.photo !== undefined) cleanPayload.photo = updatedData.photo;

  try {
    const response = await axios.patch(`${API_URL}/${id}`, cleanPayload);
    return response.data;
  } catch (error: any) {
    console.error("Error updating author:", error?.response?.data || error);
    throw error;
  }
};

// ✅ Delete an author
export const deleteAuthor = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting author:", error);
    throw error;
  }
};
