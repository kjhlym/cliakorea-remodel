// provider 컬럼을 NOT NULL로 변경하는 스크립트
// 먼저 모든 null 값을 기본값으로 업데이트한 후 실행
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

async function makeProviderNotNull() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'cliakorea',
  });

  try {
    await client.connect();
    console.log('데이터베이스 연결 성공');

    // 1. 먼저 모든 null 값을 기본값으로 업데이트
    const updateResult = await client.query(`
      UPDATE users 
      SET provider = 'google' 
      WHERE provider IS NULL
    `);
    console.log(`${updateResult.rowCount}개의 null 값이 업데이트되었습니다.`);

    // 2. provider 컬럼을 NOT NULL로 변경
    try {
      await client.query(`
        ALTER TABLE users 
        ALTER COLUMN provider SET NOT NULL
      `);
      console.log('provider 컬럼이 NOT NULL로 변경되었습니다.');
    } catch (alterError) {
      if (alterError.code === '23502') {
        console.log('여전히 null 값이 있습니다. 다시 확인해주세요.');
      } else {
        throw alterError;
      }
    }

    await client.end();
    console.log('작업 완료');
  } catch (error) {
    console.error('에러 발생:', error.message);
    await client.end();
    process.exit(1);
  }
}

makeProviderNotNull();


