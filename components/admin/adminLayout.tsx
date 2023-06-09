import { useEffect, useState } from "react";
import { authAtom } from "@/lib/jotai/authAtoms";
import { useAtom } from "jotai";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import AdminNavbar from "./adminNavbar";
import Router from "next/router";
import { ApiResponse } from "@/lib/type/apiResponse";

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AdminLayout = ({ children, className }: AdminLayoutProps) => {
  const [authLocal, setAuthLocal] = useLocalStorage("token", "");
  const [auth, setAuth] = useAtom(authAtom);

  const [modal, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<ApiResponse<any>>();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authLocal}`,
          },
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setAuth(true);
        } else {
          setErrorMsg(data);
          throw new Error("Login Failed");
        }
      } catch (error) {
        setModal(true);
        console.error(error);
      }
    };

    checkAuth();
  }, [authLocal, setAuth]);

  useEffect(() => {
    if (!auth) Router.replace("/admin/auth/login");
  });

  return (
    <>
      <AdminNavbar
        logout={() => {
          setAuthLocal("");
          setAuth(false);
        }}
      />
      {modal ? (
        <>
          <div className="absolute z-10 bg-black/50 h-screen w-screen left-0 top-0 flex justify-center items-center">
            <div className="modal-box">
              <h2 className="font-bold text-lg capitalize">Error</h2>
              <p className="py-4">{errorMsg?.error}</p>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setAuth(false)}
                >
                  Back To Login Page
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <main className={`px-5 pt-5 ${className}`}>{children}</main>
    </>
  );
};

export default AdminLayout;
