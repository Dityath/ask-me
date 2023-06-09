import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";
import { ApiResponse } from "@/lib/type/apiResponse";
import bcrypt from "bcrypt";

type Credentials = {
  username: string;
  password: string;
};

const tokenExpiry = "1h";

const login = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) => {
  if (req.method === "POST") {
    const { username, password }: Credentials = req.body;

    // const usernameLogic = await bcrypt.compare(
    //   username,
    //   process.env.ADMIN_USERNAME as string
    // );
    // const passwordLogic = await bcrypt.compare(
    //   password,
    //   process.env.ADMIN_PASSWORD as string
    // );

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ username }, process.env.SECRET_KEY as Secret, {
        expiresIn: tokenExpiry,
      });

      res.status(200).json({
        status: 200,
        msg: "Success Login Into Superadmin",
        data: {
          username: process.env.ADMIN_USERNAME,
          role: "superadmin",
          token: token,
          expire: tokenExpiry,
        },
      });
    } else {
      res.status(401).json({ status: 401, error: "Invalid Credentials" });
    }
  } else {
    res.status(405).json({ status: 405, error: "Method Not Allowed" });
  }
};

export default login;
