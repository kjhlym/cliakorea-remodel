const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');

async function seedData() {
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

    // 1. 관리자 사용자 생성
    const adminEmail = 'admin@cliakorea.kr';
    const userRes = await client.query('SELECT id FROM users WHERE email = $1', [adminEmail]);
    let adminId;

    if (userRes.rowCount === 0) {
      adminId = uuidv4();
      // TypeORM은 컬럼명을 그대로 사용하므로 대소문자 주의 (큰따옴표 사용)
      await client.query(
        'INSERT INTO users (id, email, "fullName", role, provider, "providerId") VALUES ($1, $2, $3, $4, $5, $6)',
        [adminId, adminEmail, '관리자', 'admin', 'google', 'admin_legacy']
      );
      console.log('관리자 계정이 생성되었습니다.');
    } else {
      adminId = userRes.rows[0].id;
      console.log('기존 관리자 계정을 사용합니다.');
    }

    // 2. 공지사항 데이터
    const notices = [
      { title: "어린이리더십강사협회 교육 안내문", author: "관리자", date: "2024-03-20", views: 450, category: 'notice' },
      { title: "제17차 어린이리더십강사협회 정기총회 안내", author: "사무국", date: "2024-02-15", views: 320, category: 'notice' },
      { title: "제16차 어린이리더십강사협회 정기총회 결과 보고", author: "사무국", date: "2023-02-20", views: 280, category: 'notice' },
      { title: "제15차 어린이리더십강사협회 정기총회 개최", author: "관리자", date: "2022-02-18", views: 210, category: 'notice' },
      { title: "제14차 정기총회 및 신년 하례식 안내", author: "관리자", date: "2021-01-15", views: 190, category: 'notice' },
      { title: "[성북구지원] 어린이리더십강사과정 수강생 모집", author: "교육팀", date: "2020-03-10", views: 560, category: 'notice' },
    ];

    for (const notice of notices) {
      const exists = await client.query('SELECT 1 FROM boards WHERE title = $1', [notice.title]);
      if (exists.rowCount === 0) {
        await client.query(
          'INSERT INTO boards (id, title, content, category, "viewCount", "authorId", "authorName", "createdAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [uuidv4(), notice.title, `${notice.title}에 대한 상세 공지 내용입니다. 원활한 교육 진행을 위해 확인 부탁드립니다.`, notice.category, notice.views, adminId, notice.author, new Date(notice.date)]
        );
      }
    }
    console.log('공지사항 데이터 마이그레이션 완료.');

    // 3. 프로그램 데이터
    const programs = [
      { name: "어린이 리더십", desc: "올바른 인성과 리더십의 기초를 다지는 초등학생 맞춤 교육" },
      { name: "청소년 리더십", desc: "꿈과 비전을 구체화하고 주도적인 삶을 설계하는 성장 교육" },
      { name: "부모 리더십", desc: "자녀의 거울이 되는 부모를 위한 코칭 및 소통 전문 교육" },
      { name: "특화 프로그램", desc: "창의적 사고와 문제 해결력을 키우는 맞춤형 심화 과정" },
    ];

    for (const prog of programs) {
      const exists = await client.query('SELECT 1 FROM boards WHERE title = $1', [prog.name]);
      if (exists.rowCount === 0) {
        await client.query(
          'INSERT INTO boards (id, title, content, category, "authorId", "authorName") VALUES ($1, $2, $3, $4, $5, $6)',
          [uuidv4(), prog.name, prog.desc, 'education', adminId, '관리자']
        );
      }
    }
    console.log('프로그램 데이터 마이그레이션 완료.');

    // 4. 교육 일정
    const today = new Date();
    const schedules = [
      { title: "어린이 리더십 지도사 1급 과정", start: new Date(today.getFullYear(), today.getMonth(), 15), end: new Date(today.getFullYear(), today.getMonth(), 16) },
      { title: "청소년 비전 설계 워크샵", start: new Date(today.getFullYear(), today.getMonth(), 22), end: new Date(today.getFullYear(), today.getMonth(), 22) },
      { title: "부모 코칭 전문가 심화 교육", start: new Date(today.getFullYear(), today.getMonth() + 1, 5), end: new Date(today.getFullYear(), today.getMonth() + 1, 7) },
      { title: "2024 하반기 정기 강사 세미나", start: new Date(today.getFullYear(), today.getMonth() + 1, 12), end: new Date(today.getFullYear(), today.getMonth() + 1, 12) },
    ];

    for (const sch of schedules) {
      const exists = await client.query('SELECT 1 FROM schedules WHERE title = $1 AND "startDate" = $2', [sch.title, sch.start]);
      if (exists.rowCount === 0) {
        await client.query(
          'INSERT INTO schedules (title, "startDate", "endDate", description, type) VALUES ($1, $2, $3, $4, $5)',
          [sch.title, sch.start, sch.end, sch.title, 'EDUCATION']
        );
      }
    }
    console.log('교육 일정 데이터 마이그레이션 완료.');

  } catch (err) {
    console.error('마이그레이션 중 오류 발생:', err.message);
    if (err.stack) console.error(err.stack);
  } finally {
    await client.end();
  }
}

seedData();
