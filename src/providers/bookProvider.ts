import axios from "axios";
import { Book } from "../models/Book";

//local server url
const API_URL = "http://localhost:3001"; // Local server

//getting the list of books
export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

//fetch the book by id
export const getBookById = async (id: string): Promise<Book> => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};

//created a book with some required fields(from the backend expectations idk for now )
export const createBook = async (bookData: {
  title: string;
  publishedYear: number;
  price: number;
  authorId: string;
}): Promise<Book> => {
  try {
    const response = await axios.post(`${API_URL}/books`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

//to delete the book by ID
export const deleteBook = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/books/${id}`);
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};

//i added an optional feature to update the book
export const updateBook = async (
  id: number,
  bookData: Partial<Book>
): Promise<Book> => {
  try {
    const response = await axios.put(`${API_URL}/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

//get the books by author id

export const getBooksByAuthorId = async (authorId: string): Promise<Book[]> => {
  const response = await axios.get(`${API_URL}?authorId=${authorId}`);
  return response.data;
};
