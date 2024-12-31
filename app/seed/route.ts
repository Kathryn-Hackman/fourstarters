import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { stories, users } from '../lib/placeholder-data';
import { NextResponse } from 'next/server';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (user_id, name, email, password)
        VALUES (${user.user_id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (user_id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedStories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS stories (
      user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      story_text VARCHAR(1000) NOT NULL,
      status VARCHAR(255) NOT NULL, # Shared or Saved
      date DATE NOT NULL SECONDARY KEY
    );
  `;

  const insertedStories = await Promise.all(
    stories.map(
      (story) => client.sql`
        INSERT INTO stories (user_id, story_text, status, date)
        VALUES (${story.user_id}, ${story.story_text}, ${story.status}, ${story.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedStories;
}

// async function seedSquares() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS squares (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       user_id_1 VARCHAR(255) NOT NULL,
//       user_id_2 VARCHAR(255) NOT NULL,
//       user_id_3 VARCHAR(255) NOT NULL,
//       user_id_4 VARCHAR(255) NOT NULL,
//       square_story_text_1 VARCHAR(250),
//       square_story_text_2 VARCHAR(250),
//       square_story_text_3 VARCHAR(250),
//       square_story_text_4 VARCHAR(250),
//       date DATE NOT NULL,
//       status: VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedSquares = await Promise.all(
//     squares.map(
//       (square) => client.sql`
//         INSERT INTO squares (id, name, email, image_url)
//         VALUES (${square.id}, ${square.name}, ${square.email}, ${square.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedSquares;
// }

export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedUsers();
      await seedStories();
      // await seedSquares();
      await client.sql`COMMIT`;
  
      return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return NextResponse.json({ error }, { status: 500 });
    }
  }