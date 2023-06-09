import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Seo from "@/components/seo";

const Home = () => {
  const [number, setNumber] = useState(0);
  const [message, setMessage] = useState("");

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState("");

  const router = useRouter();

  const handleMessageChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setNumber(value.length);
    setMessage(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { social } = router.query;
    console.log(message);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message, social: social }),
      });

      const data = await response.json();
      setModal(true);
      setModalData(data.msg);
      console.log(data);
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  return (
    <>
      <Seo />
      <Layout className="flex flex-col gap-5">
        {modal ? (
          <>
            <div className="absolute z-10 bg-black/50 h-screen w-screen left-0 top-0 flex justify-center items-center">
              <div className="modal-box">
                <h2 className="font-bold text-lg capitalize">{modalData}</h2>
                <p className="py-4"></p>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setMessage("");
                      setNumber(0);
                      setModal(false);
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <h1 className="text-center text-2xl">
          Send a anonymous message to Ditya
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              placeholder="Your message here..."
              className="textarea textarea-bordered min-h-[200px] max-h-[300px] w-full text-sm"
              onChange={handleMessageChange}
              value={message}
            ></textarea>
            <p className="absolute right-5 bottom-5">{number}</p>
          </div>
          <button
            type="submit"
            className={`btn w-full mt-5 ${message ? "" : "btn-disabled"}`}
          >
            Submit
          </button>
        </form>
      </Layout>
    </>
  );
};

export default Home;
