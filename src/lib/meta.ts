import { site } from '../data/site';
import { findProject, projects } from '../data/projects';

export interface PageMeta {
  title: string;
  description: string;
}

/** 경로(베이스 제외, 예: '/work/project-a/')에 해당하는 제목·설명 */
export function getMeta(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { title: `${site.name} — ${site.role}`, description: site.description };
  if (path === '/work' || path === '/archive') {
    return { title: `Works — ${site.name}`, description: '영상·콘텐츠, 디자인, 웹, B2B 마케팅, 리서치, AI 프로젝트까지 분야별 작업물 갤러리.' };
  }
  if (path === '/resume') {
    return { title: `Resume — ${site.name}`, description: '경력, 담당 업무, 핵심 역량, 사용 도구.' };
  }
  const project = findProject(path.match(/^\/work\/([^/]+)$/)?.[1]);
  if (project) return { title: `${project.title} — ${site.name}`, description: project.summary };
  return { title: `페이지를 찾을 수 없습니다 — ${site.name}`, description: site.description };
}

/** 정적 HTML 로 미리 만들어 둘 경로 목록 */
export const staticPaths = ['/', '/resume/', '/work/', '/archive/', ...projects.map((p) => `/work/${p.slug}/`)];

/** 미리 만드는 HTML 의 초기 테마 (다크 상세 페이지가 밝게 깜빡이지 않도록) */
export function getTheme(pathname: string): 'dark' | undefined {
  return findProject(pathname.replace(/\/+$/, '').match(/^\/work\/([^/]+)$/)?.[1])?.theme;
}
