import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { GalleryCard } from '../components/GalleryCard';
import { WorkModal } from '../components/WorkModal';
import { AREAS, areaBySlug, type AreaSlug } from '../data/areas';
import { gallery, itemsIn } from '../data/gallery';
import { works } from '../data/works';
import { usePage } from '../lib/usePage';

type Filter = 'all' | AreaSlug;
const FILTERS: { slug: Filter; name: string; count: number }[] = [
  { slug: 'all', name: 'All', count: gallery.length },
  ...AREAS.map((a) => ({ slug: a.slug as Filter, name: a.name as string, count: itemsIn(a.name).length })),
];

/**
 * Works: 대표 프로젝트와 작업물을 한 갤러리에서 본다.
 * 주소의 ?category=<slug> 로 카테고리를, ?work=<id> 로 열린 작업물을 기억한다.
 * 예전 주소(/archive/)도 이 화면을 연다.
 */
export default function Works() {
  usePage();
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  // 미리 만든 HTML 과 어긋나지 않도록 마운트 뒤에 주소를 읽는다
  const fromCategory = params.get('category');
  const fromWork = params.get('work');
  useEffect(() => {
    setFilter(areaBySlug(fromCategory)?.slug ?? 'all');
    setOpenId(fromWork);
  }, [fromCategory, fromWork]);

  const update = (next: { category?: Filter; work?: string | null }) => {
    const category = next.category ?? filter;
    const work = next.work === undefined ? openId : next.work;
    setFilter(category);
    setOpenId(work);
    const q: Record<string, string> = {};
    if (category !== 'all') q.category = category;
    if (work) q.work = work;
    setParams(q, { replace: true, preventScrollReset: true });
  };

  const area = areaBySlug(filter);
  const list = area ? itemsIn(area.name) : gallery;
  const open = works.find((w) => w.id === openId) ?? null;

  return (
    <div className="shell pt-14 pb-24 md:pt-24 md:pb-32">
      <h1 className="text-display leading-none font-bold tracking-[-0.05em]">Works</h1>
      <p className="mt-5 max-w-[38rem] text-muted">
        {area ? area.ko : '회사에서 수행한 프로젝트와 직접 만든 작업물을 분야별로 모았습니다.'}
      </p>

      <div role="group" aria-label="카테고리" className="mt-10 flex flex-wrap gap-x-1 gap-y-1 border-t border-fg pt-4 md:mt-14">
        {FILTERS.map((f) => (
          <button
            key={f.slug}
            type="button"
            aria-pressed={filter === f.slug}
            onClick={() => update({ category: f.slug })}
            className={`flex cursor-pointer items-baseline gap-1.5 px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-300 ${
              filter === f.slug ? 'bg-fg text-bg' : 'hover:bg-wash'
            }`}
          >
            {f.name}
            <span className="meta opacity-70">{String(f.count).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
      <p className="meta mt-4 text-muted" role="status">
        {list.length} works
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 md:mt-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14 max-[359px]:grid-cols-1">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((item, i) => (
            <motion.li
              key={item.key}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <GalleryCard item={item} showArea={!area} priority={i < 3} onOpen={() => item.work && update({ work: item.work.id })} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <WorkModal work={open} onClose={() => update({ work: null })} />
    </div>
  );
}
