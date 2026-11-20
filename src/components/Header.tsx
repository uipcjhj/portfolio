import { Link, useLocation } from 'react-router';
import { site } from '../data/site';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/resume/', label: 'Resume' },
  { to: '/work/', label: 'Works' },
];

export function Header() {
  const { pathname } = useLocation();
  // 예전 주소(/archive)도 Works 로 표시한다
  const isCurrent = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to.replace(/\/$/, '')) || (to === '/work/' && pathname.startsWith('/archive')));

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/85 backdrop-blur-md transition-colors duration-700 [-webkit-backdrop-filter:blur(12px)]">
      <div className="shell flex h-14 items-center justify-between gap-2 pt-[env(safe-area-inset-top)] md:h-16">
        <Link to="/" aria-label={`${site.name} 홈`} className="text-lg font-bold tracking-[-0.04em] md:text-xl">
          {site.wordmark}
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="flex items-center gap-1 text-[0.9375rem] font-medium sm:gap-3">
            {NAV.map((item) => {
              const current = isCurrent(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={current ? 'page' : undefined}
                    className={`block px-2.5 py-1.5 whitespace-nowrap transition-colors duration-300 ${current ? 'bg-accent text-ink' : 'hover:bg-wash'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
