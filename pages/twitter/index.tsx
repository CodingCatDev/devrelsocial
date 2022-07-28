import { useAppwrite } from "@/hooks/useAppwriteAccount";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { UserV1 } from "twitter-api-v2";
import { Navigation } from "@/components/Dashboard/Navigation";
import { Home } from "@/components/Dashboard/Home";

const Twitter: NextPage = () => {
  const { user, drsAccount } = useAppwrite();
  const [jwt, setJwt] = useState<string>();
  const [settings, setSettings] = useState<UserV1 | undefined>();
  useEffect(() => {
    if (user && drsAccount) {
      getJwt();
    }
  }, [user]);

  useEffect(() => {
    if (!jwt) return;
    getSettings();
  }, [jwt]);

  const getJwt = async () => {
    const res = await drsAccount.createJWT();
    setJwt(res?.jwt);
  };
  const getSettings = async () => {
    const settings = (await (
      await fetch(`/api/twitter/v1/accountSettings?jwt=${jwt}`)
    ).json()) as unknown as UserV1;
    console.log(settings);
    setSettings(settings);
  };
  const redirect = async () => {
    if (jwt) {
      window.location.href = `/api/twitter?jwt=${jwt}`;
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

  if (!settings) {
    return showAuthTwitter();
  }

  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Navigation />
            </div>
            <main className="py-2 lg:col-span-9">
              <Home settings={settings} />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Twitter;
