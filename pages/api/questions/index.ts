import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../src/utils/prisma";

const secret = process.env.SECRET;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    updated_at,
    difficulty,
    image_url,
    equation,
    question_text,
    answer_formula,
  } = req.body;

  const token = await getToken({ req, secret });

  if (token?.userRole === "ADMIN") {
    const result = await prisma.question.create({
      data: {
        updated_at: updated_at,
        author: token?.name,
        difficulty: difficulty,
        image_url: image_url,
        equation: equation,
        question_text: question_text,
        answer_formula: answer_formula,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized " });
  }
}
