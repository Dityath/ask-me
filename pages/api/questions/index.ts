import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/lib/type/apiResponse";
import authMiddleware from "@/lib/middleware/authMiddleware";

type RequestBody = {
  message: string;
  social?: "tw" | "fb" | "ig";
};

export default async function questions(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  if (req.method === "POST") {
    try {
      const { message, social } = req.body as RequestBody;

      if (!message) {
        return res.status(400).json({ status: 400, error: "Invalid message" });
      }

      if (message.length > 400) {
        return res.status(400).json({
          status: 400,
          error: "Message size exceeds 500 characters",
        });
      }

      const createdMessage = await prisma.question.create({
        data: {
          content: message,
          social: social,
        },
      });

      res
        .status(201)
        .json({ status: 201, msg: "Message Sent", data: createdMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Internal Server Error",
      });
    }
  } else if (req.method === "GET") {
    authMiddleware(req, res, async () => {
      try {
        const { social, answered, page, perpage } = req.query;

        const currentPage = parseInt(page as string) || 1;
        const itemsPerPage = parseInt(perpage as string) || 10;

        const answeredBool = answered === "true";

        const totalQuestions = await prisma.question.count({
          where: {
            social: (social as string) || undefined,
            answered: (answeredBool as boolean) || undefined,
          },
        });

        const totalPages = Math.ceil(totalQuestions / itemsPerPage);

        const questions = await prisma.question.findMany({
          where: {
            social: (social as string) || undefined,
            answered: (answeredBool as boolean) || undefined,
          },
          skip: (currentPage - 1) * itemsPerPage,
          take: itemsPerPage,
        });

        res.status(200).json({
          status: 200,
          msg: "Ok",
          data: questions,
          index: {
            page: currentPage,
            perpage: itemsPerPage,
            total: totalPages,
          },
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      }
    });
  } else if (req.method === "DELETE") {
    authMiddleware(req, res, async () => {
      try {
        await prisma.question.deleteMany();

        res.status(200).json({
          status: 200,
          msg: "All questions deleted successfully.",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status: 500,
          error: "Internal Server Error",
        });
      }
    });
  } else {
    res.status(405).json({ status: 405, error: "Method Not Allowed" });
  }
}
