import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../src/utils/prisma";

const secret = process.env.SECRET;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });

  if (token?.role === "ADMIN") {
    const students = await prisma.student.findMany();
    res.json(students);
  } else {
    res.status(401).send({ message: "Unauthorized " });
  }
}
