import { useAppwrite } from "@/hooks/useAppwriteAccount";
import { useTwitter } from "@/hooks/useTwitter";
import type { NextPage } from "next";
import { Navigation } from "@/components/Twitter/Dashboard/Navigation";
import { Layout } from "@/components/Layout/Layout";
import { RealTimeBanner } from "@/components/Twitter/Dashboard/RealTimeBanner";

const Twitter: NextPage = () => {
  const { user, drsAccount } = useAppwrite();
  const { settings } = useTwitter({ jwt: drsAccount.jwt });

  return (
    <Layout user={user} drsAccount={drsAccount}>
      <div className="min-h-full">
        <div className="py-10">
          <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Navigation />
            </div>
            <main className="py-2 lg:col-span-9">
              <RealTimeBanner drsAccount={drsAccount} />
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Twitter;
function showAuthTwitter(): import("react").ReactNode {
  throw new Error("Function not implemented.");
}
