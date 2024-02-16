import { createClient } from '@vercel/postgres';



// Function to handle GET requests for fetching notes of a single character
export async function GET(request: Request) {
    // Extract the character ID from the query parameters
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const characterId = pathSegments[pathSegments.length - 1];
    

    if (!characterId) {
        return new Response(JSON.stringify({ error: 'Character ID is required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const client = createClient({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();

        // Query to select notes for the given character ID
        const queryText = 'SELECT * FROM notes WHERE character_id = $1';
        const values = [characterId];
        const response = await client.query(queryText, values);

        await client.end();

        // Return the notes in the response
        
        return new Response(JSON.stringify(response.rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        await client.end();
        return new Response(JSON.stringify({ error: 'Failed to fetch notes' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
