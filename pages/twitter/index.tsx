import { useAppwrite } from "@/hooks/useAppwriteAccount";
import { useTwitter } from "@/hooks/useTwitter";
import type { NextPage } from "next";
import { Navigation } from "@/components/Twitter/Dashboard/Navigation";
import { Home } from "@/components/Twitter/Dashboard/Home";
import { Layout } from "@/components/Layout/Layout";

const Twitter: NextPage = () => {
  const { user, drsAccount } = useAppwrite();
  const { settings } = useTwitter({ jwt: drsAccount.jwt });

  const redirect = async () => {
    if (drsAccount?.jwt) {
      window.location.href = `/api/twitter?jwt=${drsAccount.jwt}`;
    } else {
      alert("no jwt, user not set");
    }
  };

  const showAuthTwitter = () => {
    return (
      <section className="grid justify-center">
        <button
          className=" btn btn-accent"
          onClick={() =>
            // drsFunctions.createExecution("twitter-oauth-request-token", undefined, false)
            redirect()
          }
        >
          Add Twitter Access
        </button>
      </section>
    );
  };
  return (
    <Layout user={user} drsAccount={drsAccount}>
      <div className="min-h-full">
        <div className="py-10">
          <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Navigation />
            </div>
            <main className="py-2 lg:col-span-9">
              {!settings?.screen_name ? (
                showAuthTwitter()
              ) : (
                <Home settings={settings} drsAccount={drsAccount} />
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Twitter;
