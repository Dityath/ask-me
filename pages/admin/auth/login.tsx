import Layout from "@/components/layout";
import { FormEventHandler, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "@/lib/jotai/authAtoms";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import Router from "next/router";

type ResSignType = {
  error: string;
  ok: boolean;
  status: number;
  url: string | number;
};

const Login = () => {
  const [authLocal, setAuthLocal] = useLocalStorage("token", "");
  const [auth, setAuth] = useAtom(authAtom);

  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [resSign, setResSign] = useState({} as ResSignType);
  const [modal, setModal] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await res.json();
      setResSign(data);

      if (res.ok) {
        console.log(data);

        setAuth(true);
        setAuthLocal(data.data.token);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.log(error);
      setModal(true);
    }
  };

  useEffect(() => {
    console.log(resSign);
  }, [resSign]);

  useEffect(() => {
    if (auth) Router.replace("/admin");
  });

  return (
    <Layout>
      {modal ? (
        <>
          <div className="absolute z-10 bg-black/50 h-screen w-screen left-0 top-0 flex justify-center items-center">
            <div className="modal-box">
              <h2 className="font-bold text-lg capitalize">{resSign?.error}</h2>
              <p className="py-4">Please check your username or password</p>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setModal(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-center">Login to admin</h1>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered"
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </Layout>
  );
};

export default Login;
