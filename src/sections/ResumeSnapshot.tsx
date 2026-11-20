import { Link } from 'react-router';
import { capabilities, career } from '../data/about';

/** 홈의 이력 요약: 경력 네 줄과 핵심 역량. 자세한 내용은 Resume 페이지에 있다. */
export function ResumeSnapshot() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="shell pb-16 md:pb-28">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-fg pt-5">
        <h2 id="resume-title" className="text-title leading-none font-bold tracking-[-0.04em]">
          Experience &amp; Expertise
        </h2>
        <Link to="/resume/" className="link meta mb-1">
          Resume 전체 보기
        </Link>
      </div>

      <div className="mt-8 grid gap-x-16 gap-y-10 md:mt-12 lg:grid-cols-12">
        <ol className="lg:col-span-7">
          {career.map((job) => (
            <li key={job.organization} className="grid grid-cols-[1fr] gap-x-6 gap-y-0.5 border-b border-rule py-3.5 first:border-t sm:grid-cols-[10.5rem_1fr]">
              <span className="font-mono text-[0.8125rem] text-muted sm:pt-1">{job.period}</span>
              <span>
                <span className="block text-lg leading-snug font-semibold tracking-[-0.02em]">{job.organization}</span>
                <span className="block text-[0.9375rem] text-muted">{job.role}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="lg:col-span-5">
          <h3 className="meta border-b border-fg pb-3 text-muted">Core competencies</h3>
          <ul>
            {capabilities.map((c) => (
              <li key={c.en} className="border-b border-rule py-2.5 leading-snug font-semibold tracking-[-0.01em]">
                {c.en}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
