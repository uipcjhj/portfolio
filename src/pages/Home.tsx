import { usePage } from '../lib/usePage';
import { Contact } from '../sections/Contact';
import { FeaturedProjects } from '../sections/FeaturedProjects';
import { Hero } from '../sections/Hero';
import { ResumeSnapshot } from '../sections/ResumeSnapshot';
import { WorkCategories } from '../sections/WorkCategories';

/** 홈: 누구인지(Hero) → 어떤 경력인지 → 어떤 분야의 일을 하는지 → 무엇을 만들었는지 → 연락처 */
export default function Home() {
  usePage();
  return (
    <>
      <Hero />
      <ResumeSnapshot />
      <WorkCategories />
      <FeaturedProjects />
      <Contact />
    </>
  );
}
