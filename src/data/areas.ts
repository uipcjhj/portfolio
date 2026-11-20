/**
 * 공통 카테고리 6개. 대표 프로젝트와 Creative Archive 작업물이 같은 체계를 쓴다.
 * 각 항목의 area 값(관리자 화면의 "카테고리")이 여기의 name 과 같아야 한다.
 * slug 는 Works 주소(/work/?category=slug)에 쓰인다.
 */
export const AREAS = [
  { slug: 'video-content', name: 'Video & Content', ko: '영상 기획·촬영·편집과 콘텐츠 제작' },
  { slug: 'design-branding', name: 'Design & Branding', ko: '광고, 인쇄물, 카드뉴스 등 브랜드 디자인' },
  { slug: 'digital-web', name: 'Digital & Web', ko: '홈페이지, SEO, 상세페이지, 웹디자인' },
  { slug: 'b2b-marketing', name: 'B2B Marketing', ko: '글로벌 채널 운영, 전시 마케팅, 리드 확보' },
  { slug: 'strategy-research', name: 'Strategy & Research', ko: '시장·경쟁사 분석과 자료 기반 커뮤니케이션' },
  { slug: 'ai-creative', name: 'AI & Creative', ko: 'AI 도구로 구현한 서비스와 개인 창작 실험' },
] as const;

export type AreaName = (typeof AREAS)[number]['name'];
export type AreaSlug = (typeof AREAS)[number]['slug'];
export const areaBySlug = (slug?: string | null) => AREAS.find((a) => a.slug === slug);
export const areaByName = (name?: string) => AREAS.find((a) => a.name === name);
