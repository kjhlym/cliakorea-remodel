// 기존 users 테이블의 provider null 값을 업데이트하는 스크립트
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// .env 파일 읽기
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

async function fixProviderNull() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USERNAME || 'postgres', // pg 라이브러리는 'user' 사용
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'cliakorea',
  });

  try {
    await client.connect();
    console.log('데이터베이스 연결 성공');

    // provider 컬럼이 존재하는지 확인
    const columnCheck = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'provider'
    `);

    if (columnCheck.rows.length === 0) {
      console.log('provider 컬럼이 아직 존재하지 않습니다. 엔티티 동기화 후 다시 실행하세요.');
      await client.end();
      return;
    }

    // provider가 null인 행의 개수 확인
    const nullCount = await client.query(`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE provider IS NULL
    `);

    console.log(`provider가 null인 행: ${nullCount.rows[0].count}개`);

    if (parseInt(nullCount.rows[0].count) > 0) {
      // provider가 null인 행들을 기본값으로 업데이트
      const result = await client.query(`
        UPDATE users 
        SET provider = 'google' 
        WHERE provider IS NULL
      `);

      console.log(`${result.rowCount}개의 행이 업데이트되었습니다.`);
    } else {
      console.log('업데이트할 null 값이 없습니다.');
    }

    await client.end();
    console.log('작업 완료');
  } catch (error) {
    console.error('에러 발생:', error.message);
    await client.end();
    process.exit(1);
  }
}

fixProviderNull();

