import { Quiz, Topic } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../src/utils/prisma";

const secret = process.env.SECRET;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    difficulty,
    image_url,
    equation,
    question_text,
    answer_formula,
    topics,
    quizzes,
  } = JSON.parse(req.body);

  const token = await getToken({ req, secret });

  if (token?.userRole === "ADMIN") {
    const result = await prisma.question.create({
      data: {
        author: token?.name,
        difficulty: difficulty,
        image_url: image_url,
        equation: equation,
        question_text: question_text,
        answer_formula: answer_formula,
        topics: undefined,
        quizzes: undefined,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized " });
  }
}
