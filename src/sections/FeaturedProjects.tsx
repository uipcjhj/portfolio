import { Link } from 'react-router';
import { Cover } from '../components/Cover';
import { MetaLine } from '../components/MetaLine';
import { gallery } from '../data/gallery';
import { selectedWork } from '../data/projects';

/** 홈의 대표 프로젝트 네 개 (관리자 화면에서 "홈 대표 프로젝트"로 지정한 것) */
export function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-title" className="shell py-16 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-fg pt-5">
        <h2 id="featured-title" className="text-display leading-none font-bold tracking-[-0.05em]">
          Selected Projects.
        </h2>
        <Link to="/work/" className="link meta mb-2">
          All works ({String(gallery.length).padStart(2, '0')})
        </Link>
      </div>

      <ul className="mt-10 grid gap-x-8 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
        {selectedWork.slice(0, 4).map((project) => (
          <li key={project.slug}>
            <Link to={`/work/${project.slug}/`} className="group block focus-visible:outline-offset-8">
              <Cover cover={project.cover} ratio="16 / 10" zoom />
              <MetaLine items={[project.organization ?? project.type, project.area]} className="mt-4" />
              <h3 className="mt-2 text-[1.5rem] leading-tight font-semibold tracking-[-0.03em] md:text-[2rem]">
                <span className="bg-[linear-gradient(#c8ff5f,#c8ff5f)] bg-[length:0%_100%] bg-no-repeat transition-[background-size,color] duration-500 ease-out-soft group-hover:bg-[length:100%_100%] group-hover:text-ink">
                  {project.title}
                </span>
              </h3>
              <p className="mt-2 max-w-[36rem] text-[0.9375rem] text-muted">{project.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
