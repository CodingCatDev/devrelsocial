import { useTwitter } from "@/hooks/useTwitter";

export const RealTimeBanner = ({
  drsAccount,
}: {
  drsAccount: {
    deleteSessions: () => Promise<null | undefined>;
    createSession: () => Promise<void>;
    jwt: string | undefined;
  };
}) => {
  const { getProfileBanner } = useTwitter({ jwt: drsAccount.jwt });
  return (
    <div className="overflow-hidden rounded-lg shadow bg-base-200">
      <button className="btn" onClick={() => getProfileBanner()}>
        Get Banner
      </button>
    </div>
  );
};
