import { Layout } from "@/components/Layout/Layout";
import { useAppwrite } from "@/hooks/useAppwriteAccount";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { user, drsAccount } = useAppwrite();
  if (!user) {
    return <>Loading...</>;
  }
  return (
    <Layout user={user} drsAccount={drsAccount}>
      <section className="grid justify-center">
        Welcome to DevRel Social, your one stop shop for all things social!
      </section>
    </Layout>
  );
};

export default Home;
