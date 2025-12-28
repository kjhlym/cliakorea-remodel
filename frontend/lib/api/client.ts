// API 클라이언트 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// 공통 fetch 함수
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// 게시판 API
export const boardAPI = {
  // 게시글 목록 조회
  getBoards: async (category?: string, page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (category) params.append('category', category);
    return fetchAPI(`/boards?${params.toString()}`);
  },

  // 게시글 상세 조회
  getBoard: async (id: string) => {
    return fetchAPI(`/boards/${id}`);
  },

  // 게시글 생성
  createBoard: async (data: {
    title: string;
    content: string;
    category: string;
    authorId?: string;
    authorName?: string;
  }) => {
    return fetchAPI('/boards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// 교육 신청 API
export const applicationAPI = {
  // 교육 신청 생성
  createApplication: async (data: {
    programType: string;
    programName: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    message?: string;
  }) => {
    return fetchAPI('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// 온라인 상담 API
export const consultationAPI = {
  // 상담 생성
  createConsultation: async (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => {
    return fetchAPI('/consultations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

