import type { NextPage } from "next";

const LinkedIn: NextPage = () => {
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

export default LinkedIn;
