import { useAppwrite } from "@/hooks/useAppwriteAccount";
import Link from "next/link";
export const Layout = ({ children }: { children: JSX.Element }) => {
  const { user, drsAccount } = useAppwrite();
  console.log(user);
  return (
    <div className="grid gap-1 m-1 lg:m-4 lg:gap-4">
      <header>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="text-xl normal-case btn btn-ghost">Dev Rel Social</a>
          </div>
          <div className="flex-1">
            <ul className="p-0 menu menu-horizontal">
              <li className="hidden lg:block">
                <Link href="/twitter">
                  <a className="text-xl normal-case btn btn-ghost">Twitter</a>
                </Link>
              </li>
              <li className="hidden lg:block">
                <Link href="/linkedin">
                  <a className="text-xl normal-case btn btn-ghost">LinkedIn</a>
                </Link>
              </li>
              <li key="0" className="block lg:hidden">
                <a>
                  Socials
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link href="/twitter">
                      <a>Twitter</a>
                    </Link>
                    <Link href="/linkedin">
                      <a>LinkedIn</a>
                    </Link>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex-none">
            {user ? (
              <div className="dropdown dropdown-end dropdown-hover">
                <label tabIndex={0} className="m-1 btn btn-primary">
                  {user.name}
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 shadow dropdown-content menu bg-primary rounded-box w-52"
                >
                  <li>
                    <a onClick={() => drsAccount.deleteSessions()}>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <a
                className="btn btn-primary"
                onClick={() => drsAccount.createSession()}
              >
                Login
              </a>
            )}
          </div>
        </div>
      </header>
      <main className="">
        <>{children}</>
      </main>
      <footer className="p-10 footer bg-neutral text-neutral-content">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </div>
  );
};
