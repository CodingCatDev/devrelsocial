import Image from "next/image";
import { UserV1 } from "twitter-api-v2";

export const Home = ({
  settings,
  drsAccount,
}: {
  settings: UserV1;
  drsAccount: {
    deleteSessions: () => Promise<null | undefined>;
    createSession: () => Promise<void>;
    jwt: string | undefined;
  };
}) => {
  return (
    <div className="overflow-hidden rounded-lg shadow bg-base-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="py-10 overflow-hidden">
          <main className="max-w-4xl mx-auto">
            <h1 className="text-2xl text-center">
              Welcome, <b>{settings?.name}</b>!
            </h1>
            <div className="flex flex-col items-center justify-center my-4">
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={"https://twitter.com/" + settings?.screen_name}
                className="relative inline-flex items-center justify-center p-4 space-x-2 text-lg font-semibold rounded-xl bg-neutral btn-ghost"
              >
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
                <div className="flex-shrink-0 block text-base font-semibold cursor-pointer h-14 w-14 hover:underline">
                  {settings?.profile_image_url_https && (
                    <Image
                      width={48}
                      height={48}
                      className="w-48 h-48 overflow-hidden rounded-full bg-primary"
                      src={settings?.profile_image_url_https?.replace(
                        "_normal",
                        ""
                      )}
                      alt="twitter profile image"
                      unoptimized={true}
                    />
                  )}
                </div>

                <div>
                  <span className="max-w-xs truncate" style={{ maxWidth: 200 }}>
                    Alex Patterson 🥑
                  </span>
                  <div className="flex items-center justify-start space-x-4 text-sm">
                    <div>
                      <div className="font-semibold cursor-default">
                        {settings?.friends_count}
                      </div>
                      <div>Following</div>
                    </div>
                    <div>
                      <div className="font-semibold cursor-default">
                        {settings?.followers_count}
                      </div>
                      <div>Followers</div>
                    </div>
                    <div>
                      <div className="font-semibold cursor-default">
                        {settings?.statuses_count}
                      </div>
                      <div>Tweets</div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <section className="my-10 text-center">
              <div className="my-10 text-center">
                <h2 className="mt-10 mb-4 text-xl text-center">
                  To view <b>Twitter Analytics</b> and <b>CRM</b>:
                </h2>
                <a href="/sidebar" className="btn btn-primary">
                  Install Browser Extension / Mobile App
                </a>
              </div>
              <div className="my-10 text-center">
                <h2 className="mt-10 mb-4 text-xl text-center">
                  To set up daily and weekly email reports:
                </h2>
                <a href="/dashboard/preferences" className="btn btn-primary">
                  Set up Daily/Weekly Reports
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
