import Link from "next/link";
import { useRouter } from "next/router";
export const Navigation = () => {
  const router = useRouter();
  return (
    <nav aria-label="Sidebar" className="sticky divide-y divide-gray-300 top-4">
      <div className="my-2 space-y-1">
        <Link href="/twitter">
          <a
            className={`flex justify-between btn ${
              router.asPath.split("/").at(-1) === "twitter"
                ? "btn-active"
                : "btn-ghost"
            }`}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 mr-3 -ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="truncate">Home</span>
            </span>
          </a>
        </Link>
        <Link href="/twitter/real-time-banner">
          <a
            className={`flex justify-between btn ${
              router.asPath.split("/").at(-1) === "real-time-banner"
                ? "btn-active"
                : "btn-ghost"
            }`}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-base-content group-hover:text-base-100"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm11 9-3-3-6 6h16l-5-5-2 2zm4-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                />
              </svg>
              <span className="truncate">Real Time Banner</span>
            </span>
          </a>
        </Link>
        <Link href="/twitter/public">
          <a
            className={`flex justify-between btn ${
              router.asPath.split("/").at(-1) === "public"
                ? "btn-active"
                : "btn-ghost"
            }`}
          >
            {" "}
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-base-content group-hover:text-base-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="truncate">Public Dashboard</span>
            </span>
          </a>
        </Link>
      </div>
      <div className="py-2 my-2 space-y-1">
        <Link href="/twitter/dashboard/preferences">
          <a className="flex justify-between btn btn-ghost">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-base-content group-hover:text-base-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="truncate">Preferences</span>
            </span>
          </a>
        </Link>
        <Link href="/twitter/dashboard/integrations">
          <a className="flex justify-between btn btn-ghost">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-base-content group-hover:text-base-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
              <span className="truncate">Integrations</span>
            </span>
          </a>
        </Link>
        <Link href="/twitter/dashboard/emails">
          <a className="flex justify-between btn btn-ghost">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-base-content group-hover:text-base-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="truncate">Emails Archive</span>
            </span>
          </a>
        </Link>
        <Link href="/twitter/dashboard/team">
          <a className="flex justify-between btn btn-ghost">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-base-content group-hover:text-base-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="truncate">Team</span>
            </span>
          </a>
        </Link>
        <Link href="/twitter/dashboard/account">
          <a className="flex justify-between btn btn-ghost">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-base-content group-hover:text-base-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="truncate">Account</span>
            </span>
          </a>
        </Link>
      </div>
      <div>
        <a
          href="https://discord.com/invite/vM2bagU"
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className="flex justify-between my-2 btn btn-ghost">
            <div>Need help?</div>

            <span className="sr-only jsx-633572ab5a3ed95d">discord</span>
            <svg
              className="block w-8 h-8"
              width={71}
              height={55}
              viewBox="0 0 71 55"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2047_16741)">
                <path
                  d="M59.82 5.31733C67.7318 16.9774 71.6421 30.1098 70.2081 45.2262C64.2853 49.5587 58.548 52.2124 52.8871 53.9827C51.6639 52.2663 50.5468 50.4648 49.5574 48.5802C51.4114 47.8635 53.1804 47.0141 54.8854 46.0174C55.3424 45.7506 55.3606 45.1116 54.9515 44.807L54.9513 44.8069C54.5836 44.5334 54.2179 44.2456 53.8682 43.9573L53.8682 43.9573L53.8619 43.9522C53.6526 43.7853 53.3605 43.7414 53.1052 43.8625C41.7573 49.1044 29.3313 49.1049 17.8439 43.8601L17.8403 43.8585C17.5948 43.7488 17.3024 43.7835 17.0886 43.9602C16.7405 44.2472 16.3746 44.5325 16.0076 44.8075C15.5897 45.1192 15.6304 45.7566 16.077 46.0175L16.0805 46.0194C17.7824 46.9953 19.5513 47.862 21.4063 48.5838C20.4366 50.4688 19.3201 52.2687 18.0761 53.9835C12.4414 52.2133 6.70357 49.5595 0.78032 45.2267C-0.418934 32.1445 2.08142 18.9066 11.1562 5.31998C15.5684 3.30106 20.2903 1.80811 25.2219 0.941504C25.8175 2.01079 26.477 3.33086 26.9276 4.41358L27.0779 4.77486L27.4647 4.71574C32.7595 3.90647 38.1382 3.90624 43.5469 4.71597L43.9296 4.77326L44.081 4.41717C44.535 3.34987 45.1731 2.00769 45.7608 0.941698C50.6927 1.81062 55.4124 3.30258 59.82 5.31733ZM0.791565 45.3483L0.791242 45.3448L0.791565 45.3483ZM16.8451 30.1692C16.8451 34.3352 19.9 37.8252 23.7259 37.8252C27.6092 37.8252 30.6049 34.3342 30.6066 30.1727C30.6641 26.0298 27.6338 22.5132 23.7259 22.5132C19.8414 22.5132 16.8451 26.0062 16.8451 30.1692ZM40.4371 30.1692C40.4371 34.3352 43.492 37.8252 47.3178 37.8252C51.2305 37.8252 54.1969 34.3327 54.1986 30.1728C54.256 26.0299 51.2259 22.5132 47.3178 22.5132C43.4333 22.5132 40.4371 26.0062 40.4371 30.1692Z"
                  fill="currentColor"
                  stroke="none"
                />
              </g>
              <defs>
                <clipPath id="clip0_2047_16741">
                  <rect width={71} height={55} fill="currentColor" />
                </clipPath>
              </defs>
            </svg>
            <div className="relative inline-block w-12 h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="absolute w-4 h-4 top-2 right-2"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </nav>
  );
};
