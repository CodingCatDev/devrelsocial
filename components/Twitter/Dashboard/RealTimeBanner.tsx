import { useTwitter } from "@/hooks/useTwitter";
import { useEffect, useState } from "react";
import { ProfileBannerSizeV1 } from "twitter-api-v2";
import Image from "next/image";
import { RealTimeBannerSelector } from "@/components/Twitter/Dashboard/RealTimeBannerSelector";
import { RealTimeBannerForm } from "@/components/Twitter/Dashboard/RealTimeBannerForm";
import { useForm } from "react-hook-form";
import { rgbToHex } from "@/utils/general";
import { useColorPicker } from "@/hooks/useColorPicker";

interface IFormInput {
  showWaterMark: boolean;
  title: string;
  subtitle: string;
  followText: string;
  imagePreview?: string;
  background?: string;
}

interface IBanner {
  cloudinaryImage: string;
  style: {
    background: string;
  };
}

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
  const [selectedBanner, setSelectedBanner] = useState<IBanner>();
  const { register, handleSubmit, watch, setValue } = useForm<IFormInput>();
  const formUpdates = watch();
  useEffect(() => {
    if (!drsAccount) return;
    getProfileBanner().then((b) => setProfileBanner(b));
  }, []);

  const colorPicker = useColorPicker();

  useEffect(() => {
    console.log(selectedBanner?.style?.background);
    if (selectedBanner?.cloudinaryImage && formUpdates) {
      let imagePreview = "";
      const image = selectedBanner.cloudinaryImage
        .split("https://media.codingcat.dev/image/upload/")
        ?.at(1);
      if (image) {
        imagePreview =
          "https://media.codingcat.dev/image/upload/" +
          (colorPicker?.color &&
            `b_rgb:${rgbToHex(
              colorPicker?.color?.r || 0,
              colorPicker?.color?.g || 0,
              colorPicker?.color?.b || 0
            )},`) +
          "w_1500,h_500,c_fill,q_auto,f_auto/w_1200" +
          ",c_fit,co_rgb:ffffff,g_center,x_0,y_0,l_text:Source%20Sans%20Pro_52_line_spacing_10_semibold:" +
          (formUpdates.title || " ") +
          "/w_600,c_fit,co_rgb:ffffff,g_center,x_0,y_90,l_text:Source%20Sans%20Pro_48_line_spacing_-10_regular:" +
          (formUpdates.subtitle || " ") +
          "/w_400,c_fit,co_rgb:ffffff,g_south_east,x_110,y_80,l_text:Source%20Sans%20Pro_36_line_spacing_-10_semibold:" +
          (formUpdates.followText || " ") +
          "/" +
          image;
      }
      if (imagePreview !== formUpdates?.imagePreview) {
        setValue("imagePreview", imagePreview);
        setValue("background", selectedBanner?.style?.background);
      }
    }
  }, [formUpdates, selectedBanner]);

  const mySubmit = (data: IFormInput) => alert(JSON.stringify(data));

  return (
    <>
      <div className="flex flex-col gap-4">
        {profileBanner?.sizes?.["1500x500"]?.url && (
          <div className="flex flex-col">
            <h2 className="p-2 text-3xl text-primary-content bg-primary">
              Showing on Twitter
            </h2>
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
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Static Center"
              src="/assets/realtime-banner/static-center.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Left Vertical"
              src="/assets/realtime-banner/left-vertical.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Followers Vertical"
              src="/assets/realtime-banner/followers-vertical.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Combo 1"
              src="/assets/realtime-banner/combo-1.png"
            />
          </div>
        )}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Static Left"
              src="/assets/realtime-banner/static-left.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Static Right"
              src="/assets/realtime-banner/static-right.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Static Minimal"
              src="/assets/realtime-banner/static-minimal.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Static Center"
              src="/assets/realtime-banner/static-center.png"
            />
          </div>
        )}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Simple Center"
              src="/assets/realtime-banner/simple-center.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Left Right"
              src="/assets/realtime-banner/left-right.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Left Vertical"
              src="/assets/realtime-banner/left-vertical.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Right Right"
              src="/assets/realtime-banner/right-right.png"
            />
          </div>
        )}
        {activeTab === 4 && (
          <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Followers Center"
              src="/assets/realtime-banner/followers-center.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Followers Vertical"
              src="/assets/realtime-banner/followers-vertical.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Combo 1"
              src="/assets/realtime-banner/combo-1.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Combo 2"
              src="/assets/realtime-banner/combo-2.png"
            />
          </div>
        )}
        {activeTab === 5 && (
          <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Countdown 1"
              src="/assets/realtime-banner/countdown1.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Countdown 2"
              src="/assets/realtime-banner/countdown2.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Timer 1"
              src="/assets/realtime-banner/timer1.png"
            />
            <RealTimeBannerSelector
              setSelectedBanner={setSelectedBanner}
              colorPicker={colorPicker}
              cloudinaryImage="https://media.codingcat.dev/image/upload/devrelsocial/templates/static.png"
              title="Timer 2"
              src="/assets/realtime-banner/timer2.png"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <h2 className="p-2 text-3xl text-primary-content bg-primary">
          New Banner
        </h2>
        <div className="overflow-hidden shadow bg-base-200">
          {selectedBanner && formUpdates?.imagePreview ? (
            <a
              href={formUpdates.imagePreview}
              className="flex break-all hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={formUpdates.imagePreview}
                width="1500"
                height="500"
                alt="profile banner image"
              />
            </a>
          ) : (
            <Image
              src="/assets/select-a-banner.png"
              width="1500"
              height="500"
              alt="profile banner image"
            />
          )}
          {formUpdates.imagePreview}
        </div>
      </div>

      <RealTimeBannerForm
        register={register}
        handleSubmit={handleSubmit(mySubmit)}
        colorPicker={colorPicker}
      />
    </>
  );
};
