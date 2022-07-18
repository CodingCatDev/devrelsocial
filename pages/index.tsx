import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <section className="grid justify-center">
        <button
          className=" btn btn-accent"
          onClick={() => (window.location.href = "/api/twitter")}
        >
          Add Twitter Access
        </button>
      </section>
    </>
  );
};

export default Home;
