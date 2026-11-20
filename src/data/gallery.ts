import { AREAS, areaByName, type AreaName } from './areas';
import { projects } from './projects';
import type { Project } from './types';
import { thumbnailOf, works, type Work } from './works';

/** Works 갤러리의 한 칸. 대표 프로젝트(상세 페이지로 이동)와 작업물(상세 창)을 한 목록으로 다룬다. */
export interface GalleryItem {
  key: string;
  title: string;
  area: AreaName;
  organization?: string;
  /** 짧은 표시용 태그 (예: 공모전) */
  tags?: string[];
  /** 실제 이미지·영상 썸네일 주소 (없으면 타이포그래피 카드) */
  thumb?: string;
  project?: Project;
  work?: Work;
}

const projectThumb = (p: Project) => (p.cover.kind === 'type' ? p.cover.backdrop?.src : p.cover.kind === 'image' ? p.cover.src : p.cover.poster);
/** 카테고리가 비었거나 목록에 없는 값이면 마지막 카테고리로 보낸다 (항목이 화면에서 사라지지 않도록) */
const areaOf = (name?: string): AreaName => areaByName(name)?.name ?? AREAS[AREAS.length - 1].name;

const projectItems: GalleryItem[] = projects.map((p) => ({
  key: `project-${p.slug}`,
  title: p.title,
  area: areaOf(p.area),
  organization: p.organization ?? p.type,
  thumb: projectThumb(p),
  project: p,
}));
const workItems: GalleryItem[] = works.map((w) => ({
  key: `work-${w.id}`,
  title: w.title,
  area: areaOf(w.area),
  organization: w.organization,
  tags: w.tags,
  thumb: thumbnailOf(w),
  work: w,
}));

/** 순서: 대표 프로젝트 → 썸네일이 있는 작업물 → 나머지 */
export const gallery: GalleryItem[] = [...projectItems, ...workItems.filter((i) => i.thumb), ...workItems.filter((i) => !i.thumb)];

/**
 * 큰 카드로 보여 줄 항목인지. 대표 프로젝트(전용 커버가 있다)와 실제 이미지·영상이 있는 작업물이 해당한다.
 * 나머지는 글 목록으로 보여 주고, 관리자 화면에서 이미지를 등록하면 자동으로 큰 카드가 된다.
 */
export const isVisual = (item: GalleryItem) => Boolean(item.project || item.thumb);

export const itemsIn = (area: AreaName) => gallery.filter((i) => i.area === area);
