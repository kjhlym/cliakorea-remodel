const { Client } = require('pg');

async function checkColumns() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '6371',
    database: 'cliakorea',
  });

  try {
    await client.connect();
    console.log('PostgreSQL에 연결되었습니다.');

    const tables = ['users', 'boards', 'schedules'];
    for (const table of tables) {
      const res = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = $1
      `, [table]);
      
      console.log(`\n[${table}] 테이블 컬럼:`);
      res.rows.forEach(row => console.log(`- ${row.column_name} (${row.data_type})`));
    }

  } catch (err) {
    console.error('오류 발생:', err.message);
  } finally {
    await client.end();
  }
}

checkColumns();
