import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.SECRET;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  if (!!token) {
    // Signed in
    res.status(200).json({
      ...token,
    });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
