import jwt, { JwtPayload, Secret, TokenExpiredError } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "../type/apiResponse";

interface CustomNextApiRequest extends NextApiRequest {
  user?: JwtPayload;
}

const authMiddleware = async (
  req: CustomNextApiRequest,
  res: NextApiResponse<ApiResponse<any>>,
  next: () => void
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.SECRET_KEY as Secret
      ) as JwtPayload;
      req.user = decodedToken;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).json({ status: 401, error: "Token Expired" });
      } else {
        res.status(401).json({ status: 401, error: "Invalid Token" });
      }
    }
  } else {
    res.status(401).json({ status: 401, error: "Token not provided" });
  }
};

export default authMiddleware;
