import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import type { GalleryItem } from '../data/gallery';
import { asset } from '../lib/asset';
import { Cover } from './Cover';
import { MetaLine } from './MetaLine';

const TITLE =
  'bg-[linear-gradient(#c8ff5f,#c8ff5f)] bg-[length:0%_100%] bg-no-repeat transition-[background-size,color] duration-500 ease-out-soft group-hover:bg-[length:100%_100%] group-hover:text-ink';

interface Props {
  item: GalleryItem;
  /** 작업물을 눌렀을 때 (상세 창 열기). 프로젝트는 상세 페이지로 이동한다. */
  onOpen: () => void;
  /** 카테고리를 함께 적을지 (전체 보기에서만) */
  showArea?: boolean;
  priority?: boolean;
}

/**
 * Works 갤러리 카드. 모든 카드의 비율은 16:10 으로 같다.
 * 프로젝트와 썸네일이 있는 작업물에 쓴다 (이미지 없는 작업물은 Works 의 글 목록에 나온다).
 * 썸네일을 불러오지 못하면 제목만 적은 카드로 바뀐다.
 */
export function GalleryCard({ item, onOpen, showArea = true, priority = false }: Props) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth === 0) setFailed(true);
  }, []);

  const caption = (
    <span className="mt-3 block">
      <span className="line-clamp-2 block leading-snug font-semibold tracking-[-0.01em]">
        <span className={TITLE}>{item.title}</span>
      </span>
      <MetaLine items={[showArea ? item.area : undefined, item.organization, ...(item.tags ?? [])]} className="mt-1.5" />
    </span>
  );

  if (item.project) {
    return (
      <Link to={`/work/${item.project.slug}/`} className="group block focus-visible:outline-offset-4">
        <Cover cover={item.project.cover} ratio="16 / 10" zoom priority={priority} />
        {caption}
      </Link>
    );
  }

  const work = item.work!;
  const thumb = failed ? undefined : item.thumb;
  const first = work.media?.[0];
  const isVideo = first?.kind === 'youtube' || first?.kind === 'video';
  const count = work.media?.length ?? 0;
  return (
    <button type="button" onClick={onOpen} aria-haspopup="dialog" className="group block w-full cursor-pointer text-left focus-visible:outline-offset-4">
      {thumb ? (
        <span className="relative block aspect-[16/10] overflow-hidden bg-wash">
          <img
            ref={img}
            src={asset(thumb)}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
          <span className="meta absolute right-0 bottom-0 bg-accent px-2.5 py-1.5 font-medium text-ink">
            {isVideo ? 'Play' : count > 1 ? `${count} images` : 'View'}
          </span>
        </span>
      ) : (
        <span className="flex aspect-[16/10] items-end bg-wash p-4 transition-colors duration-300 group-hover:bg-accent group-hover:text-ink [container-type:inline-size] sm:p-5">
          <span className="line-clamp-3 text-[clamp(1.125rem,8.5cqw,2.25rem)] leading-[1.1] font-bold tracking-[-0.045em] text-balance">{work.title}</span>
        </span>
      )}
      {/* 타이포그래피 카드는 제목이 이미 크게 있으므로 아래에는 분류만 적는다 */}
      {thumb ? caption : <MetaLine items={[showArea ? item.area : undefined, item.organization, ...(item.tags ?? [])]} className="mt-3" />}
    </button>
  );
}
