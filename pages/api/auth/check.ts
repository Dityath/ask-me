import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/lib/type/apiResponse";
import authMiddleware from "@/lib/middleware/authMiddleware";

const check = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) => {
  authMiddleware(req, res, () => {
    res.status(200).json({
      status: 200,
      msg: "Logged In",
      data: {
        role: "superadmin",
        username: process.env.ADMIN_USERNAME,
      },
    });
  });
};

export default check;
