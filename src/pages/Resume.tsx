import { Link } from 'react-router';
import { TextLink } from '../components/TextLink';
import { about, capabilities, career, tools } from '../data/about';
import { site } from '../data/site';
import { usePage } from '../lib/usePage';
import { Contact } from '../sections/Contact';

const H2 = 'border-t border-fg pt-4 text-[0.9375rem] font-semibold md:col-span-3';
const ROW = 'grid gap-x-10 gap-y-5 py-10 md:grid-cols-12 md:py-14';

/** Resume: 이력서처럼 한 장으로 읽는 페이지. 내용은 관리자 화면의 Settings 에서 고친다. */
export default function Resume() {
  usePage();
  return (
    <>
      <div className="shell pt-14 md:pt-24">
        <p className="meta text-muted">{site.role}</p>
        <h1 className="mt-3 text-display leading-none font-bold tracking-[-0.05em]">Resume</h1>

        <section aria-labelledby="profile-title" className={`${ROW} mt-6 md:mt-10`}>
          <h2 id="profile-title" className={H2}>
            Profile
          </h2>
          <div className="max-w-[44rem] md:col-span-9">
            <p className="text-lead leading-[1.45] font-semibold tracking-[-0.02em]">{about.paragraphs[0]}</p>
            <div className="mt-5 space-y-3 text-[1.0625rem] leading-[1.7]">
              {about.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="career-title" className={ROW}>
          <h2 id="career-title" className={H2}>
            Career Timeline
          </h2>
          <ol className="md:col-span-9">
            {career.map((job) => (
              <li key={job.organization} className="grid gap-x-8 gap-y-3 border-b border-rule py-6 first:border-t first:border-fg sm:grid-cols-[11rem_1fr]">
                <p className="font-mono text-[0.875rem] text-muted sm:pt-1.5">{job.period}</p>
                <div>
                  <h3 className="text-2xl leading-tight font-semibold tracking-[-0.03em]">{job.organization}</h3>
                  <p className="mt-0.5 text-muted">{job.role}</p>
                  <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-[0.9375rem] sm:grid-cols-2">
                    {job.tasks.map((task) => (
                      <li key={task} className="border-l border-rule pl-3 leading-snug">
                        {task}
                      </li>
                    ))}
                  </ul>
                  {job.link && (
                    <p className="mt-4 text-[0.9375rem]">
                      <TextLink link={job.link} />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="competency-title" className={ROW}>
          <h2 id="competency-title" className={H2}>
            Core Competencies
          </h2>
          <ul className="grid gap-x-10 md:col-span-9 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.en} className="border-b border-rule py-4">
                <Link to={c.to} className="group block">
                  <span className="block text-xl leading-snug font-semibold tracking-[-0.02em]">
                    <span className="bg-[linear-gradient(#c8ff5f,#c8ff5f)] bg-[length:0%_100%] bg-no-repeat transition-[background-size,color] duration-500 ease-out-soft group-hover:bg-[length:100%_100%] group-hover:text-ink">
                      {c.en}
                    </span>
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-muted">{c.ko}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {tools.length > 0 && (
          <section aria-labelledby="tools-title" className={ROW}>
            <h2 id="tools-title" className={H2}>
              Tools &amp; Skills
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-medium md:col-span-9">
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <Contact />
    </>
  );
}
