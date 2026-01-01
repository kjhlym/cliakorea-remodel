const { Client } = require('pg');

async function checkTables() {
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

    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('생성된 테이블 목록:');
    res.rows.forEach(row => console.log(`- ${row.table_name}`));

  } catch (err) {
    console.error('오류 발생:', err.message);
  } finally {
    await client.end();
  }
}

checkTables();
