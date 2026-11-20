/**
 * 공통 카테고리 7개. 대표 프로젝트와 Creative Archive 작업물이 같은 체계를 쓴다.
 * 각 항목의 area 값(관리자 화면의 "카테고리")이 여기의 name 과 같아야 한다.
 * slug 는 Works 주소(/work/?category=slug)에 쓰인다.
 */
export const AREAS = [
  { slug: 'video-motion', name: 'Video & Motion', ko: '영상 기획·촬영·편집, 모션그래픽' },
  { slug: 'design-branding', name: 'Design & Branding', ko: '광고, 인쇄물, 카드뉴스 등 브랜드 디자인' },
  { slug: 'digital-web', name: 'Digital & Web', ko: '홈페이지, SEO, 상세페이지, 웹디자인' },
  { slug: 'b2b-marketing', name: 'B2B Marketing', ko: '글로벌 채널 운영, 전시 마케팅, 리드 확보' },
  { slug: 'strategy-research', name: 'Strategy & Research', ko: '시장·경쟁사 동향 조사와 분석' },
  { slug: 'editorial-pr', name: 'Editorial & PR', ko: '기사, 기획안, 보도자료' },
  { slug: 'ai-creative', name: 'AI & Creative', ko: 'AI 도구로 구현한 서비스와 개인 프로젝트' },
] as const;

export type AreaName = (typeof AREAS)[number]['name'];
export type AreaSlug = (typeof AREAS)[number]['slug'];
export const areaBySlug = (slug?: string | null) => AREAS.find((a) => a.slug === slug);
export const areaByName = (name?: string) => AREAS.find((a) => a.name === name);
