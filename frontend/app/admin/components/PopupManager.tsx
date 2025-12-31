'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/lib/context/AuthContext';
import { Plus, Trash2, Edit2, Calendar, Link as LinkIcon, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

const fetcher = async (url: string, token: string | null) => {
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  return res.json();
};

export default function PopupManager() {
  const { token } = useAuth();
  const { data: popups, error, mutate } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/popups`, token] : null,
    ([url, t]) => fetcher(url, t)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    linkUrl: '',
    startDate: '',
    endDate: '',
    isActive: true,
    priority: 0,
    type: 'IMAGE' as 'IMAGE' | 'HTML' | 'PRESET',
    content: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      imageUrl: '',
      linkUrl: '',
      startDate: '',
      endDate: '',
      isActive: true,
      priority: 0,
      type: 'IMAGE',
      content: ''
    });
    setEditingPopup(null);
  };

  const handleEdit = (popup: any) => {
    setEditingPopup(popup);
    setFormData({
      title: popup.title,
      imageUrl: popup.imageUrl || '',
      linkUrl: popup.linkUrl || '',
      startDate: popup.startDate ? new Date(popup.startDate).toISOString().slice(0, 16) : '',
      endDate: popup.endDate ? new Date(popup.endDate).toISOString().slice(0, 16) : '',
      isActive: popup.isActive,
      priority: popup.priority || 0,
      type: popup.type || 'IMAGE',
      content: popup.content || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/popups${editingPopup ? `/${editingPopup.id}` : ''}`;
    const method = editingPopup ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
           ...formData,
           startDate: formData.startDate ? new Date(formData.startDate) : null,
           endDate: formData.endDate ? new Date(formData.endDate) : null,
        })
      });

      if (res.ok) {
        toast.success(editingPopup ? '팝업이 수정되었습니다.' : '팝업이 생성되었습니다.');
        setIsModalOpen(false);
        resetForm();
        mutate();
      }
    } catch (e) {
      toast.error('오류가 발생했습니다.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/popups/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        toast.success('삭제되었습니다.');
        mutate();
      }
    } catch (e) {
      toast.error('삭제 실패');
    }
  };

  const toggleActive = async (popup: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/popups/${popup.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !popup.isActive })
      });
      if (res.ok) {
        mutate();
      }
    } catch (e) {}
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const loader = toast.loading('이미지 업로드 중...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      if (res.ok) {
        const { url } = await res.json();
        setFormData(prev => ({ ...prev, imageUrl: url }));
        toast.success('이미지가 업로드되었습니다.', { id: loader });
      } else {
        toast.error('업로드에 실패했습니다.', { id: loader });
      }
    } catch (e) {
      toast.error('오류가 발생했습니다.', { id: loader });
    }
  };

  if (error) return <div className="p-8 text-red-500">데이터를 불러오는데 실패했습니다.</div>;
  if (!popups) return <div className="p-8 text-gray-500">로딩 중...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900">팝업 관리</h1>
          <p className="text-sm text-gray-500 font-medium">메인 페이지에 노출될 팝업 광고를 관리합니다.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus className="w-5 h-5" />
          새 팝업 추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popups.map((popup: any) => (
          <div key={popup.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
            <div className="relative h-48 bg-gray-50">
              {popup.imageUrl ? (
                <img src={popup.imageUrl} alt={popup.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => toggleActive(popup)}
                  className={`p-2 rounded-xl shadow-lg transition-all ${popup.isActive ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
                >
                  {popup.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="p-6 flex-grow">
              <h3 className="font-bold text-gray-900 mb-2 truncate">{popup.title}</h3>
              <div className="space-y-2 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{popup.startDate ? new Date(popup.startDate).toLocaleDateString() : '즉시'} ~ {popup.endDate ? new Date(popup.endDate).toLocaleDateString() : '종료일 없음'}</span>
                </div>
                {popup.linkUrl && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span className="truncate">{popup.linkUrl}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <button 
                onClick={() => handleEdit(popup)}
                className="flex-grow flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all"
              >
                <Edit2 className="w-4 h-4" />
                수정
              </button>
              <button 
                onClick={() => handleDelete(popup.id)}
                className="p-2 bg-white border border-gray-200 text-red-500 rounded-xl hover:bg-red-50 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {popups.length === 0 && (
        <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center text-gray-400">
          등록된 팝업이 없습니다.
        </div>
      )}

      {/* 생성/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-black text-gray-900">{editingPopup ? '팝업 수정' : '새 팝업 등록'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex flex-col lg:flex-row h-[70vh]">
              {/* 왼쪽: 입력 폼 */}
              <form onSubmit={handleSubmit} className="flex-grow p-8 space-y-4 overflow-y-auto border-r border-gray-50">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
                  <input 
                    type="text" required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="관리용 제목 (예: 1월 신규 팝업)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">시작일</label>
                    <input 
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={e => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">종료일</label>
                    <input 
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={e => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">전시 우선순위</label>
                  <input 
                    type="number"
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
                    placeholder="높을수록 먼저 노출 (예: 10)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">팝업 유형</label>
                  <div className="flex gap-4 p-1 bg-gray-50 rounded-2xl">
                    {[
                      { id: 'IMAGE', label: '이미지 업로드' },
                      { id: 'HTML', label: '텍스트/HTML 편집' },
                      { id: 'PRESET', label: '기본 이미지(프리셋)' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type.id as any })}
                        className={`flex-grow py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                          formData.type === type.id 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.type === 'IMAGE' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">팝업 이미지</label>
                    <div className="space-y-3">
                      {formData.imageUrl && (
                        <div className="relative rounded-2xl overflow-hidden border border-gray-100 aspect-video bg-gray-50">
                          <img src={formData.imageUrl} alt="공지 이미지" className="w-full h-full object-contain" />
                          <button 
                            type="button"
                            onClick={() => setFormData({...formData, imageUrl: ''})}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <div className="flex-grow">
                          <input 
                            type="text" 
                            value={formData.imageUrl}
                            onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-600 transition-all text-xs"
                            placeholder="이미지 주소를 입력하거나 파일을 선택하세요"
                          />
                        </div>
                        <label className="shrink-0 cursor-pointer">
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                          <div className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            파일 선택
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {formData.type === 'HTML' && (
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-sm font-bold text-gray-700">팝업 내용 (HTML 지원)</label>
                      <div className="flex gap-1">
                         <button 
                          type="button" 
                          onClick={() => setFormData({...formData, content: formData.content + '<b>굵게</b>'})}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold"
                         >B</button>
                         <button 
                          type="button" 
                          onClick={() => setFormData({...formData, content: formData.content + '<span style="color:red">빨강</span>'})}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-red-500"
                         >A</button>
                         <button 
                          type="button" 
                          onClick={() => setFormData({...formData, content: formData.content + '<h2 style="font-size:1.5rem;font-weight:bold;margin-bottom:1rem">제목</h2>'})}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold"
                         >H</button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 p-2 bg-blue-50 rounded-xl mb-3">
                      <span className="text-[10px] font-black text-blue-600 uppercase pt-1 px-1">Templates</span>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, content: '<div style="padding:32px;text-align:center;"><div style="font-size:14px;color:#3b82f6;font-weight:900;margin-bottom:8px;letter-spacing:0.05em;">ANNOUNCEMENT</div><h2 style="font-size:24px;font-weight:900;color:#111827;line-height:1.2;margin-bottom:16px;">새로운 공지사항 안내</h2><p style="font-size:15px;color:#6b7280;line-height:1.6;">클리아 코리아의 새로운 소식을 확인해보세요. 상세 내용은 아래 링크에서 확인 가능합니다.</p></div>'})}
                        className="px-3 py-1 bg-white border border-blue-100 text-[11px] font-bold text-blue-600 rounded-lg hover:shadow-sm transition-all"
                      >알림형</button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, content: '<div style="padding:40px 32px;background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);color:white;text-align:center;"><h2 style="font-size:28px;font-weight:900;margin-bottom:16px;">SEASON EVENT</h2><div style="width:40px;height:4px;background:rgba(255,255,255,0.3);margin:0 auto 20px;"></div><p style="font-size:16px;opacity:0.9;margin-bottom:24px;">최대 50% 할인 혜택을 놓치지 마세요!</p><div style="display:inline-block;padding:10px 24px;background:white;color:#3b82f6;border-radius:12px;font-weight:900;font-size:14px;">지금 확인하기</div></div>'})}
                        className="px-3 py-1 bg-white border border-blue-100 text-[11px] font-bold text-blue-600 rounded-lg hover:shadow-sm transition-all"
                      >이벤트형</button>
                    </div>

                    <textarea
                      value={formData.content}
                      onChange={e => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-600 transition-all min-h-[250px] text-sm font-mono"
                      placeholder="내용을 입력하거나 위의 템플릿을 선택하세요."
                    />
                    <p className="mt-2 text-xs text-gray-400">간단한 HTML 태그와 인라인 스타일을 사용할 수 있습니다.</p>
                  </div>
                )}

                {formData.type === 'PRESET' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">기본 이미지 선택</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'notice', label: '공지사항', url: 'https://images.unsplash.com/photo-1544717297-fa154da09f9d?w=400&auto=format' },
                        { id: 'event', label: '이벤트', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&auto=format' },
                        { id: 'maintenance', label: '시스템 점검', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&auto=format' },
                        { id: 'recruit', label: '채용공고', url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&auto=format' },
                        { id: 'welcome', label: '신규가입', url: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=400&auto=format' },
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                          className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                            formData.imageUrl === preset.url ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                            <span className="text-[10px] text-white font-bold">{preset.label}</span>
                          </div>
                          {formData.imageUrl === preset.url && (
                            <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">링크 URL (선택)</label>
                  <input 
                    type="url"
                    value={formData.linkUrl}
                    onChange={e => setFormData({...formData, linkUrl: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input 
                    type="checkbox" id="popupActive"
                    checked={formData.isActive}
                    onChange={e => setFormData({...formData, isActive: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="popupActive" className="text-sm font-bold text-gray-700">활성화 (즉시 노출)</label>
                </div>

                <div className="sticky bottom-0 pt-4 bg-white">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                  >
                    {editingPopup ? '기능 수정하기' : '팝업 활성화하기'}
                  </button>
                </div>
              </form>

              {/* 오른쪽: 실시간 미리보기 */}
              <div className="hidden lg:block w-[400px] bg-gray-50 p-8 overflow-y-auto">
                <div className="sticky top-0">
                  <h3 className="text-xs font-black text-gray-400 mb-6 uppercase tracking-wider">실시간 미리보기 (Live Preview)</h3>
                  
                  <div className="relative w-full max-w-[340px] mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 scale-90 origin-top">
                    <div className="relative min-h-[180px] bg-white">
                      {formData.type === 'HTML' ? (
                        <div 
                          className="w-full h-full p-6 prose prose-sm text-sm"
                          dangerouslySetInnerHTML={{ __html: formData.content || '<p style="color:#999;text-align:center;padding:40px;">내용을 입력해주세요.</p>' }}
                        />
                      ) : (
                        <div className="relative aspect-[4/5]">
                          {formData.imageUrl ? (
                            <img src={formData.imageUrl} alt="미리보기" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-8 text-center text-gray-200 bg-gray-50">
                              <ImageIcon className="w-12 h-12" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex items-center justify-between border-t border-gray-50 bg-white">
                      <div className="flex items-center gap-1.5 opacity-40">
                        <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm"></div>
                        <span className="text-[10px] font-bold text-gray-500">오늘 하루 보지 않기</span>
                      </div>
                      <span className="text-[10px] font-black text-gray-400">닫기</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                     <p className="text-[11px] text-gray-400 font-medium text-center italic">실제 팝업 크기는 이보다 조금 더 큽니다.<br/>(가로 너비 450px 기준)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
