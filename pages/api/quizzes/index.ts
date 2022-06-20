import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../src/utils/prisma";
import { Question, Module } from "@prisma/client";

const secret = process.env.SECRET;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });

  const { title, questions, modules } = JSON.parse(req.body);

  if (token?.userRole === "ADMIN") {
    const result = await prisma.quiz.create({
      data: {
        author: token?.name,
        title: title,
        questions: questions
          ? {
              connectOrCreate: questions.map((question: Question) => {
                return {
                  where: { id: question.id },
                  create: {
                    difficulty: question.difficulty,
                    image_url: question.image_url,
                    equation: question.equation,
                    question_text: question.question_text,
                    answer_formula: question.answer_formula,
                    author: token?.name,
                  },
                };
              }),
            }
          : undefined,
        modules: modules
          ? {
              connectOrCreate: modules.map((module: Module) => {
                return {
                  where: { id: module.id },
                  create: {
                    module_name: module.module_name,
                  },
                };
              }),
            }
          : undefined,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized " });
  }
}
