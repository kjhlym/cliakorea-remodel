import { Client } from 'pg';

async function checkDb() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '6371',
    database: 'cliakorea',
  });

  try {
    await client.connect();
    
    const countRes = await client.query('SELECT count(*) FROM boards');
    console.log('Total Boards:', countRes.rows[0].count);

    console.log('--- Latest 3 Boards ---');
    const latestRes = await client.query('SELECT title, category, "createdAt" FROM boards ORDER BY "createdAt" DESC LIMIT 3');
    console.log(JSON.stringify(latestRes.rows, null, 2));

    await client.end();
  } catch (err) {
    console.error(err.message);
  }
}

checkDb();
