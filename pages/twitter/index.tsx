import { useAppwrite } from "@/hooks/useAppwriteAccount";
import type { NextPage } from "next";

const Twitter: NextPage = () => {
  const { drsFunctions, drsAccount } = useAppwrite();

  const redirect = async () => {
    const res = await drsAccount.createJWT();
    if (res?.jwt) {
      window.location.href = `/api/twitter?jwt=${res?.jwt}`;
    } else {
      alert("no jwt");
    }
  };

  return (
    <>
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
    </>
  );
};

export default Twitter;
