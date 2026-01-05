import { Client } from 'pg';

async function seedFreeBoard() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '6371',
    database: 'cliakorea',
  });

  try {
    await client.connect();
    
    // Check if there are already general posts
    const checkRes = await client.query("SELECT count(*) FROM boards WHERE category = 'general'");
    if (parseInt(checkRes.rows[0].count) > 0) {
      console.log('General posts already exist. Skipping seed.');
    } else {
      console.log('Seeding free board data...');
      const posts = [
        {
          title: '우리 아이가 캠프 다녀와서 정말 많이 변했어요!',
          content: '협회 캠프에 참여한 뒤로 아이가 자신감이 많이 생겼습니다. 좋은 기회 주셔서 감사합니다.',
          category: 'general',
          authorName: '행복맘'
        },
        {
          title: '자유롭게 소통하는 게시판입니다.',
          content: '협회 활동에 대해 궁금한 점이나 나누고 싶은 이야기를 여기서 공유해주세요.',
          category: 'general',
          authorName: '관리자'
        },
        {
          title: '리더십 교육 후기 공유합니다.',
          content: '지난 주말에 있었던 부모 리더십 교육이 정말 유익했습니다. 다음에도 꼭 참석하고 싶네요.',
          category: 'general',
          authorName: '박민준'
        }
      ];

      for (const post of posts) {
        await client.query(
          'INSERT INTO boards (id, title, content, category, "authorName", "viewCount", "createdAt", "updatedAt") VALUES (gen_random_uuid(), $1, $2, $3, $4, 0, NOW(), NOW())',
          [post.title, post.content, post.category, post.authorName]
        );
      }
      console.log('Seeding completed.');
    }

    await client.end();
  } catch (err) {
    console.error('Error seeding data:', err.message);
  }
}

seedFreeBoard();
