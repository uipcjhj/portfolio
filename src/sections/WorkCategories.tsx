import { Link } from 'react-router';
import { AREAS } from '../data/areas';
import { gallery, itemsIn } from '../data/gallery';
import { asset } from '../lib/asset';

const featuredThumbs = new Set(gallery.filter((i) => i.project?.placement === 'selected').map((i) => i.thumb));

/** 홈의 카테고리 여섯 칸. 누르면 Works 가 그 카테고리로 열린다. */
export function WorkCategories() {
  return (
    <section id="work" aria-labelledby="categories-title" className="shell py-16 md:py-28">
      <h2 id="categories-title" className="border-t border-fg pt-5 text-display leading-none font-bold tracking-[-0.05em]">
        Explore My Work.
      </h2>

      <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {AREAS.map((area) => {
          const items = itemsIn(area.name);
          // 홈의 대표 프로젝트와 같은 그림이 반복되지 않도록, 대표 프로젝트 커버로 쓰이지 않은 썸네일을 먼저 고른다
          const thumb = (items.find((i) => i.thumb && !featuredThumbs.has(i.thumb)) ?? items.find((i) => i.thumb))?.thumb;
          return (
            <li key={area.slug} className="border-t border-rule">
              <Link to={`/work/?category=${area.slug}`} className="group grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-4 py-5 sm:block sm:py-6">
                {/* 대표 썸네일이 있으면 이미지, 없으면 작업물 수를 크게 적는다 (좁은 화면에서는 오른쪽 작은 칸) */}
                <span className="relative col-start-2 row-span-2 block aspect-[16/10] w-28 overflow-hidden bg-wash sm:mb-5 sm:w-full">
                  {thumb ? (
                    <img
                      src={asset(thumb)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span aria-hidden="true" className="absolute right-3 bottom-1 font-mono text-[2.5rem] leading-none font-medium tracking-[-0.06em] text-muted/50 sm:right-5 sm:bottom-3 sm:text-[5.5rem]">
                      {String(items.length).padStart(2, '0')}
                    </span>
                  )}
                </span>
                <span className="col-start-1 row-start-1 flex items-baseline justify-between gap-4">
                  <span className="text-[1.375rem] leading-tight font-bold tracking-[-0.03em] sm:text-2xl">
                    <span className="bg-[linear-gradient(#c8ff5f,#c8ff5f)] bg-[length:0%_100%] bg-no-repeat transition-[background-size,color] duration-500 ease-out-soft group-hover:bg-[length:100%_100%] group-hover:text-ink">
                      {area.name}
                    </span>
                  </span>
                  <span className="meta shrink-0 text-muted max-sm:hidden">
                    {items.length} works <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </span>
                <span className="col-start-1 row-start-2 block text-[0.9375rem] leading-snug text-muted sm:mt-1.5">
                  {area.ko}
                  <span className="meta mt-1.5 block sm:hidden">{items.length} works</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
