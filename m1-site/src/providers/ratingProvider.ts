import axios from "axios";
import { Rating } from "../models/Rating";

const API_URL = "http://localhost:3001"; // Local server

export const getRatingsByBookId = async (id: string): Promise<Rating[]> => {
  try {
    const response = await axios.get<Rating[]>(`${API_URL}/ratings/book/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ratings for book with id ${id}:`, error);
    throw error;
  }
};

export const createRating = async (ratingData: {
  stars: number;
  comment?: string;
  bookId: string;
}): Promise<Rating> => {
  try {
    const response = await axios.post(`${API_URL}/ratings`, ratingData);
    return response.data; // Return the created rating
  } catch (error) {
    console.error("Error creating rating:", error);
    throw error;
  }
};
