import AdminLayout from "@/components/admin/adminLayout";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useState } from "react";

const Settings = () => {
  const [auth, setAuth] = useLocalStorage("token", "");
  const route = useRouter();

  const [loading, setLoading] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleBtnDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/questions", {
        method: "DELETE",
        headers: {
          AUTHORIZATION: `Bearer ${auth}`,
        },
      });

      if (res.ok) {
        route.push("/admin");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout className="max-w-xl m-auto">
      {modalDelete ? (
        <>
          <div className="absolute z-10 bg-black/50 h-screen w-screen left-0 top-0 flex justify-center items-center">
            <div className="modal-box">
              {loading ? (
                <div className="flex justify-center items-center h-10">
                  <span className="loading loading-dots loading-md" />
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-lg capitalize">Delete Msgs?</h2>
                  <p className="py-4">
                    Are you sure have to delete all the messages? <br /> You
                    cant undo this process
                  </p>
                  <div className="modal-action">
                    <button
                      type="button"
                      className="btn btn-error"
                      onClick={handleBtnDelete}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setModalDelete(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <h2>Settings</h2>

      <h3 className="mt-10 font-bold">Change Username or Password</h3>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <p>
            If you want to change your username or your password, you need to
            change the setting on your .env file. <br />
            <br /> If you use vercel you can easily change the environtment
            variable on the menu settings of your development.
          </p>
        </div>
      </div>
      <h3 className="mt-10 font-bold">Reset</h3>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <p>You can delete all the messages. You can not undo this process</p>
          <div className="card-actions justify-end mt-3">
            <button
              className="btn btn-error"
              onClick={() => setModalDelete(true)}
            >
              Delete All
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
