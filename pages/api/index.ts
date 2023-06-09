// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/lib/type/apiResponse";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  res.status(200).json({ status: 200, msg: "ok" });
}
