import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../src/utils/prisma";
import { Quiz, Question } from "@prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  const newQuestions = req.body;

  //TODO: resolve createMany issue

  // if (token?.userRole === "ADMIN") {
  //   const newQuiz: Quiz = !!newQuestions
  //     ? await prisma.quiz.create({
  //         data: {
  //           author: token?.name,
  //           questions: {
  //             createMany: {
  //               data: newQuestions,
  //             }
  //           },
  //         },
  //       })
  //     : await prisma.quiz.create({
  //         data: {
  //           author: token?.name,
  //         },
  //       });
  //   res.json(newQuiz);
  // } else {
  //   res.status(401).send({ message: "Unauthorized " });
  // }
}
