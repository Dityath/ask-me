import AdminLayout from "@/components/admin/adminLayout";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { ApiResponse } from "@/lib/type/apiResponse";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

type ArrayType = {
  content: string;
  createdAt: string;
  id: number;
  answered: boolean;
  social?: string;
  updatedAt: string;
}[];

const Admin = () => {
  const [auth, setAuth] = useLocalStorage("token", "");

  const [data, setData] = useState<ApiResponse<ArrayType>>();
  const [social, setSocial] = useState("");
  const [answered, setAnswered] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/questions?page=${page}&perpage=${perPage}${
            social ? `&social=${social}` : ""
          }${answered ? `&answered=${answered}` : ""}`,
          {
            method: "GET",
            headers: {
              AUTHORIZATION: `Bearer ${auth}`,
            },
          }
        );

        const resData = await res.json();
        console.log(resData);
        setData(resData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth, page, social, perPage, answered]);

  return (
    <AdminLayout className="max-w-xl m-auto">
      <div className="flex flex-col gap-3">
        <h2>See all the message</h2>
        <div className="flex w-full items-center gap-5">
          <select
            value={social}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setPage(1);
              setSocial(e.target.value);
            }}
            className="select select-bordered"
          >
            <option value="">All Source</option>
            <option value="ig">Instagram</option>
            <option value="tw">Twitter</option>
            <option value="fb">Facebook</option>
          </select>
          <select
            value={answered}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setPage(1);
              setAnswered(e.target.value);
            }}
            className="select select-bordered"
          >
            <option value="">All</option>
            <option value="false">Not Answered</option>
            <option value="true">Answered</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-10 my-5">
        {data?.data?.map((items) => {
          const converted = items.content.replace(/\n/g, "<br />");

          return (
            <div key={items.id} className="card bg-base-100 shadow-xl w-full">
              <div className="card-body">
                <p
                  className="mt-5"
                  dangerouslySetInnerHTML={{ __html: converted }}
                />
                <div className="divider" />
                <p className="">
                  {
                    dayjs(items.createdAt).format(
                      "HH:mm DD MMM, YYYY"
                    ) as unknown as string
                  }{" "}
                  {items.social ? `from ${items.social}` : null}
                </p>
                <div className="flex items-center gap-2 mb-5">
                  {items.answered ? (
                    <div className="badge badge-outline badge-accent">
                      Answered
                    </div>
                  ) : null}
                </div>
                <div className="card-actions">
                  <Link href={`/admin/${items.id}`} className="btn btn-primary">
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center w-full my-5">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => {
              if (page <= 1) {
                setPage(1);
              } else setPage(page - 1);
            }}
          >
            «
          </button>
          <div className="join-item btn">Page {page}</div>
          <button
            className="join-item btn"
            onClick={() => {
              if (
                data?.index?.total !== undefined &&
                page >= data.index.total
              ) {
                setPage(page);
              } else {
                setPage(page + 1);
              }
            }}
          >
            »
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
