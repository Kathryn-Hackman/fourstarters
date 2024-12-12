import { sql } from '@vercel/postgres';
import {
  User,
  Story,
  Square
} from './definitions';

// Fetch today's story
export async function fetchTodaysStory() {
    try {
      const data = await sql<Story>`SELECT * FROM stories WHERE date == "12-03-2024"`;
      console.log('story: data dot rows: ', data.rows)
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch story data.');
    }
  }

// Fetch today's square
export async function fetchTodaysSquare() {
  try {
    const data = await sql<Square>`SELECT * FROM squares WHERE date == "12-03-2024"`;
    console.log('square: data dot rows: ', data.rows)
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch square data.');
  }
}