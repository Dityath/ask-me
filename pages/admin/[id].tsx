import AdminLayout from "@/components/admin/adminLayout";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

type DataType = {
  content: string;
  createdAt: string;
  id: number;
  answered: boolean;
  social?: string;
  updatedAt: string;
};

const MessageDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [auth, setAuth] = useLocalStorage("token", "");

  const [data, setData] = useState<DataType>();
  const [modalAnswer, setModalAnswer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/questions/${id}`, {
          method: "GET",
          headers: {
            AUTHORIZATION: `Bearer ${auth}`,
          },
        });

        const resData = await res.json();
        console.log(resData);
        setData(resData.data as DataType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [auth, id]);

  const handleBtnModal = async () => {
    try {
      const res = await fetch(`/api/questions/${id}`, {
        method: "PUT",
        headers: {
          AUTHORIZATION: `Bearer ${auth}`,
        },
      });

      const resData = await res.json();
      if (res.ok) {
        console.log(resData);
        setData(resData.data as DataType);
        setModalAnswer(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const converted = data?.content?.replace(/\n/g, "<br />");

  const exportToPNG = async () => {
    const element = document.getElementById("message-card");

    if (element instanceof HTMLElement) {
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: null,
        });
        canvas.toBlob((blob) => {
          if (blob)
            saveAs(
              blob,
              `question-${
                dayjs(data?.createdAt).format(
                  "HH:mm-DD-MMM-YYYY"
                ) as unknown as string
              }.png`
            );
        });
      } catch (error) {
        console.error("An error occured while capturing the element", error);
      }
    }
  };

  return (
    <AdminLayout className="max-w-xl m-auto">
      {modalAnswer ? (
        <>
          <div className="absolute z-10 bg-black/50 h-screen w-screen left-0 top-0 flex justify-center items-center">
            <div className="modal-box">
              <h2 className="font-bold text-lg capitalize">
                Mark As {!data?.answered ? "Answered" : "Unanswered"}?
              </h2>
              <p className="py-4">
                Are you sure have {!data?.answered ? "Answered" : "Unanswered"}{" "}
                this question?
              </p>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleBtnModal}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => setModalAnswer(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <h2 className="mb-5">Message</h2>
      <div
        className="card bg-base-100 shadow-xl w-full relative"
        id="message-card"
      >
        <div className="card-body">
          {converted !== undefined ? (
            <p
              className="mt-5 text-2xl font-bold mb-3"
              dangerouslySetInnerHTML={{ __html: converted }}
            />
          ) : null}
          <p className="mb-7">
            {
              dayjs(data?.createdAt).format(
                "HH:mm DD MMM, YYYY"
              ) as unknown as string
            }{" "}
            {data?.social ? `from ${data.social}` : null}
          </p>
        </div>
        <p className="text-xs absolute bottom-4 right-4 text-base-content/20">
          ask-me.dityath.dev
        </p>
      </div>
      <div className="flex items-center gap-2 my-5">
        {data?.answered ? (
          <div className="badge badge-outline badge-accent">Answered</div>
        ) : null}
      </div>
      <div className="my-5 flex items-center gap-5">
        <button
          className="btn btn-primary"
          onClick={() => setModalAnswer(true)}
        >
          Mark As {!data?.answered ? "Answered" : "Unanswered"}
        </button>
        <button className="btn btn-primary btn-outline" onClick={exportToPNG}>
          Export As PNG
        </button>
      </div>
    </AdminLayout>
  );
};

export default MessageDetail;
