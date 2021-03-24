import s from './Link.module.css';
import NextLink from 'next/link';

export default function Link({ passHref = true, href, children }) {
  return (
    <NextLink passHref href={href}>
      <span tabIndex="0" className={s.link}>
        {children}
      </span>
    </NextLink>
  );
}
