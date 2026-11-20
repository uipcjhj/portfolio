import { Link } from 'react-router';
import { about, capabilities, career, tools } from '../data/about';
import { site } from '../data/site';
import { usePage } from '../lib/usePage';
import { Contact } from '../sections/Contact';

const LABEL = 'meta text-muted md:col-span-2 md:pt-1';
const ROW = 'grid gap-x-8 gap-y-3 border-t border-rule py-7 md:grid-cols-12 md:py-9';

/** Resume: 이력서 한 장처럼 읽는 페이지. 내용은 관리자 화면의 Settings 에서 고친다. */
export default function Resume() {
  usePage();
  return (
    <>
      <div className="shell pt-14 md:pt-24">
        <header className="pb-8 md:pb-12">
          <h1 className="text-display leading-none font-bold tracking-[-0.05em]">Resume</h1>
          <p className="mt-4 text-lg font-semibold tracking-[-0.01em]">{site.role}</p>
          <p className="mt-2 max-w-[42rem] text-muted">{about.paragraphs[0]}</p>
        </header>

        <section aria-labelledby="career-title" className={`${ROW} border-fg`}>
          <h2 id="career-title" className={LABEL}>
            Experience
          </h2>
          <ol className="md:col-span-10">
            {career.map((job) => (
              <li key={job.organization} className="grid gap-x-8 gap-y-1 border-b border-rule py-4 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[10.5rem_1fr]">
                <p className="font-mono text-[0.8125rem] text-muted sm:pt-1">{job.period}</p>
                <div>
                  <h3 className="flex flex-wrap items-baseline gap-x-3 leading-snug">
                    <span className="text-xl font-semibold tracking-[-0.02em]">{job.organization}</span>
                    <span className="text-[0.9375rem] text-muted">{job.role}</span>
                  </h3>
                  <p className="mt-1.5 max-w-[46rem] text-[0.9375rem] leading-[1.65]">{job.tasks.join(' · ')}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="competency-title" className={ROW}>
          <h2 id="competency-title" className={LABEL}>
            Core Competencies
          </h2>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 md:col-span-10 lg:grid-cols-3">
            {capabilities.map((c) => (
              <li key={c.en}>
                <Link to={c.to} className="group block">
                  <span className="block leading-snug font-semibold tracking-[-0.01em]">
                    <span className="bg-[linear-gradient(#c8ff5f,#c8ff5f)] bg-[length:0%_100%] bg-no-repeat transition-[background-size,color] duration-500 ease-out-soft group-hover:bg-[length:100%_100%] group-hover:text-ink">
                      {c.en}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[0.875rem] leading-snug text-muted">{c.ko}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {tools.length > 0 && (
          <section aria-labelledby="tools-title" className={ROW}>
            <h2 id="tools-title" className={LABEL}>
              Tools
            </h2>
            <p className="text-[0.9375rem] md:col-span-10">{tools.join(' · ')}</p>
          </section>
        )}

        <p className="border-t border-rule py-7 text-[0.9375rem] md:py-9">
          <Link to="/work/" className="link font-medium">
            작업물 보기 (Works)
          </Link>
        </p>
      </div>
      <Contact />
    </>
  );
}
