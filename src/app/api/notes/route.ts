import { createClient } from '@vercel/postgres';



// response data
interface Note {
  id: number;
  character_id: number;
  note: string;
  created_at: Date;
}

export async function POST(
  request: Request
) {

  const formData = await request.formData()
  const characterId = formData.get('characterId')
  const note = formData.get('note')

  const client = createClient({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    // SQL statement to create the "notes" table if it doesn't exist
    const createTableText = `
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        character_id INTEGER NOT NULL,
        note TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Execute the CREATE TABLE statement
    await client.query(createTableText);

    // Insert the new note
    const queryText = 'INSERT INTO notes(character_id, note) VALUES($1, $2) RETURNING *';
    const values = [characterId, note];
    const response = await client.query<Note>(queryText, values);

    await client.end();

    if (response.rows.length > 0) {
      return Response.json(response.rows[0]);
    } else {
      throw new Error('Failed to insert note');
    }
  } catch (error) {
    console.error('Error saving note or creating table:', error);
    await client.end();
    return Response.json({ error: 'Failed to save note or create table' });
  }
}

