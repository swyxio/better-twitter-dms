import Link from 'next/link';
import Logo from '../../icons/Logo';
import GitHub from '../../icons/GitHub';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-8xl px-6 bg-primary-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accents-2 py-12 text-primary transition-colors duration-150 bg-primary-2">
        <div className="col-span-1 lg:col-span-2">
          <Link href="/">
            <a className="flex flex-initial items-center font-bold md:mr-24">
              <span className="rounded-full border border-gray-700 mr-2">
                <Logo />
              </span>
              <span>Plz DM Me</span>
            </a>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                  Home
                </a>
              </Link>
            </li>

            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/pricing">
                <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                  Pricing
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="https://twitter.com/messages/compose?recipient_id=291449508&welcome_message_id=1380201827296280580">
                <a
                  target="_blank"
                  className="text-primary hover:text-accents-6 transition ease-in-out duration-150"
                >
                  Demo
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="https://plzdm.me/blog">
                <a
                  target="_blank"
                  className="text-primary hover:text-accents-6 transition ease-in-out duration-150"
                >
                  Blog
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="https://twitter.com/messages/compose?recipient_id=291449508&welcome_message_id=1380199803041251342">
                <a
                  target="_blank"
                  className="text-primary hover:text-accents-6 transition ease-in-out duration-150"
                >
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="hidden flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="text-primary font-bold hover:text-accents-6 transition ease-in-out duration-150">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                  Privacy Policy
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                  Terms of Use
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-primary">
          <div className="flex space-x-6 items-center h-10">
            <a
              aria-label="Github Repository"
              href="https://github.com/vercel/nextjs-subscription-payments"
              className={s.link}
            >
              <GitHub />
            </a>
          </div>
        </div>
      </div>
      <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4 bg-primary-2">
        <div>
          <span>
            &copy; 2021{' '}
            <a
              className="underline"
              href="https://twitter.com/messages/compose?recipient_id=291449508&welcome_message_id=1380199803041251342"
            >
              Drew Bredvick
            </a>
            . All rights reserved.
          </span>
        </div>
        <div className="hidden items-center">
          <span className="text-primary">Crafted by</span>
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img
              src="/vercel.svg"
              alt="Vercel.com Logo"
              className="inline-block h-6 ml-4 text-primary"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
