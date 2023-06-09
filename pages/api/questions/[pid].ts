import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/lib/type/apiResponse";
import authMiddleware from "@/lib/middleware/authMiddleware";

export default async function question(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  if (req.method === "GET") {
    authMiddleware(req, res, async () => {
      try {
        const { pid } = req.query;

        const question = await prisma.question.findUnique({
          where: {
            id: parseInt(pid as string),
          },
        });

        if (!question) {
          return res
            .status(404)
            .json({ status: 404, error: "Question Not Found" });
        }

        res.status(200).json({ status: 200, msg: "ok", data: question });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      }
    });
  } else if (req.method === "PUT") {
    authMiddleware(req, res, async () => {
      try {
        const { pid } = req.query;

        const question = await prisma.question.findUnique({
          where: {
            id: parseInt(pid as string),
          },
        });

        if (!question) {
          return res
            .status(404)
            .json({ status: 404, error: "Question Not Found" });
        }

        const updatedQuestion = await prisma.question.update({
          where: {
            id: parseInt(pid as string),
          },
          data: { answered: !question.answered, updatedAt: new Date() },
        });

        res
          .status(200)
          .json({
            status: 200,
            msg: "Question Updated Successfully",
            data: updatedQuestion,
          });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      }
    });
  } else {
    res.status(405).json({ status: 405, error: "Method Not Allowed" });
  }
}
