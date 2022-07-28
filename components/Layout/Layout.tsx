import Link from "next/link";
import { Models } from "node-appwrite";
import { Footer } from "./Footer";

export const Layout = ({
  children,
  user,
  drsAccount,
}: {
  children: JSX.Element;
  user: Models.User<any> | null;
  drsAccount: {
    deleteSessions: () => Promise<null | undefined>;
    createSession: () => Promise<void>;
    jwt: string | undefined;
  };
}) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        <header>
          <div className="navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 ">
              <Link href="/">
                <a className="text-xl normal-case btn btn-ghost">
                  Dev Rel Social
                </a>
              </Link>
            </div>
            <div className="flex-1 hidden lg:block">
              <ul className="p-0 menu menu-horizontal">
                <li className="hidden lg:block">
                  <Link href="/twitter">
                    <a className="text-xl normal-case">Twitter</a>
                  </Link>
                </li>
                <li className="hidden lg:block">
                  <Link href="/linkedin">
                    <a className="text-xl normal-case">LinkedIn</a>
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
            <div className="flex-none hidden lg:block">
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
        <main className="flex-1">
          <>{children}</>
        </main>
        <Footer />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
