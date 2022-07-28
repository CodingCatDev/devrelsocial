import { useTwitter } from "@/hooks/useTwitter";
import { useEffect, useState } from "react";
import { ProfileBannerSizeV1 } from "twitter-api-v2";
import Image from "next/image";
import { RealTimeBannerSelector } from "@/components/Twitter/Dashboard/RealTimeBannerSelector";
import { RealTimeBannerForm } from "@/components/Twitter/Dashboard/RealTimeBannerForm";

export const RealTimeBanner = ({
  drsAccount,
}: {
  drsAccount: {
    deleteSessions: () => Promise<null | undefined>;
    createSession: () => Promise<void>;
    jwt: string | undefined;
  };
}) => {
  const [profileBanner, setProfileBanner] = useState<
    ProfileBannerSizeV1 | undefined
  >();
  const { getProfileBanner } = useTwitter({ jwt: drsAccount.jwt });
  const [activeTab, setActiveTab] = useState(1);
  useEffect(() => {
    if (!drsAccount) return;
    getProfileBanner().then((b) => setProfileBanner(b));
  }, []);

  if (!profileBanner) {
    <> Loading...</>;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {profileBanner?.sizes?.["1500x500"]?.url && (
          <div className="flex flex-col">
            <h2>Current Banner</h2>
            <div className="overflow-hidden shadow bg-base-200">
              <Image
                src={profileBanner?.sizes["1500x500"].url}
                width={profileBanner?.sizes["1500x500"].w}
                height={profileBanner?.sizes["1500x500"].h}
                alt="profile banner image"
              />
            </div>
          </div>
        )}

        <RealTimeBannerForm />
        <div>
          <h2 className="mb-2 text-2xl text-center">
            Select a banner template below{" "}
          </h2>
          <p className="mb-4 text-center">
            You can customize everything later (layout, colors, text, etc.)
          </p>
        </div>
        <div className="tabs">
          <a
            onClick={() => setActiveTab(1)}
            className={`tab tab-lg tab-lifted ${
              activeTab === 1 ? "tab-active" : ""
            }`}
          >
            Popular
          </a>
          <a
            onClick={() => setActiveTab(2)}
            className={`tab tab-lg tab-lifted ${
              activeTab === 2 ? "tab-active" : ""
            }`}
          >
            Static
          </a>
          <a
            onClick={() => setActiveTab(3)}
            className={`tab tab-lg tab-lifted ${
              activeTab === 3 ? "tab-active" : ""
            }`}
          >
            Dynamic
          </a>
          <a
            onClick={() => setActiveTab(4)}
            className={`tab tab-lg tab-lifted ${
              activeTab === 4 ? "tab-active" : ""
            }`}
          >
            Followers
          </a>
          <a
            onClick={() => setActiveTab(5)}
            className={`tab tab-lg tab-lifted ${
              activeTab === 5 ? "tab-active" : ""
            }`}
          >
            Countdown
          </a>
        </div>
        {activeTab === 1 && (
          <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
            <RealTimeBannerSelector
              title="Static Center"
              src="/assets/realtime-banner/static-center.png"
            />
            <RealTimeBannerSelector
              title="Left Vertical"
              src="/assets/realtime-banner/left-vertical.png"
            />
            <RealTimeBannerSelector
              title="Followers Vertical"
              src="/assets/realtime-banner/followers-vertical.png"
            />
            <RealTimeBannerSelector
              title="Combo 1"
              src="/assets/realtime-banner/combo-1.png"
            />
          </div>
        )}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
            <RealTimeBannerSelector
              title="Static Left"
              src="/assets/realtime-banner/static-left.png"
            />
            <RealTimeBannerSelector
              title="Static Right"
              src="/assets/realtime-banner/static-right.png"
            />
            <RealTimeBannerSelector
              title="Static Minimal"
              src="/assets/realtime-banner/static-minimal.png"
            />
            <RealTimeBannerSelector
              title="Static Center"
              src="/assets/realtime-banner/static-center.png"
            />
          </div>
        )}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
            <RealTimeBannerSelector
              title="Simple Center"
              src="/assets/realtime-banner/simple-center.png"
            />
            <RealTimeBannerSelector
              title="Left Right"
              src="/assets/realtime-banner/left-right.png"
            />
            <RealTimeBannerSelector
              title="Left Vertical"
              src="/assets/realtime-banner/left-vertical.png"
            />
            <RealTimeBannerSelector
              title="Right Right"
              src="/assets/realtime-banner/right-right.png"
            />
          </div>
        )}
        {activeTab === 4 && (
          <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
            <RealTimeBannerSelector
              title="Followers Center"
              src="/assets/realtime-banner/followers-center.png"
            />
            <RealTimeBannerSelector
              title="Followers Vertical"
              src="/assets/realtime-banner/followers-vertical.png"
            />
            <RealTimeBannerSelector
              title="Combo 1"
              src="/assets/realtime-banner/combo-1.png"
            />
            <RealTimeBannerSelector
              title="Combo 2"
              src="/assets/realtime-banner/combo-2.png"
            />
          </div>
        )}
        {activeTab === 5 && (
          <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
            <RealTimeBannerSelector
              title="Countdown 1"
              src="/assets/realtime-banner/countdown1.png"
            />
            <RealTimeBannerSelector
              title="Countdown 2"
              src="/assets/realtime-banner/countdown2.png"
            />
            <RealTimeBannerSelector
              title="Timer 1"
              src="/assets/realtime-banner/timer1.png"
            />
            <RealTimeBannerSelector
              title="Timer 2"
              src="/assets/realtime-banner/timer2.png"
            />
          </div>
        )}
      </div>
    </>
  );
};
