import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getDataFromToken = (request: NextRequest) => {
  try {
    if (!process.env.TOKEN_SECRET) {
      throw new Error("JSON WEB TOKEN IS NOT AVAILABLE");
    }

    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET
    );

    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error);
  }
};
