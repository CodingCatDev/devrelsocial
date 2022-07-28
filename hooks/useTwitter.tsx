import { useState, useEffect } from "react";
import { UserV1 } from "twitter-api-v2";

export const useTwitter = ({ jwt }: { jwt: string | undefined }) => {
  const [settings, setSettings] = useState<UserV1 | undefined>();

  useEffect(() => {
    if (!jwt) return;
    getSettings();
  }, [jwt]);

  const getSettings = async () => {
    const settings = (await (
      await fetch(`/api/twitter/v1/accountSettings?jwt=${jwt}`)
    ).json()) as unknown as UserV1;
    console.log(settings);
    setSettings(settings);
  };

  return { settings };
};
