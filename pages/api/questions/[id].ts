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
  } = req.body;

  console.log("getting putting or deleting...")
  const questionId = req.query.id.toString();
  const token = await getToken({ req, secret });

  return new Promise(() => {
    if (token) {
      if (req.method === "GET") {
        handleGET(questionId, res);
      } else if (req.method === "DELETE" && token.userRole === "ADMIN") {
        handleDELETE(questionId, res);
      } else if (req.method === "PUT" && token.userRole === "ADMIN") {
        handlePUT(questionId, res);
      } else {
        throw new Error(
          `The HTTP ${req.method} method is not supported at this route.`
        );
      }
    } else {
      res.status(401).send({ message: "Unauthorized " });
    }
  });

  async function handleGET(questionId: string, res: NextApiResponse) {
    try {
      const _question = await prisma.question.findUnique({
        where: { id: questionId },
        include: {
          topics: true,
        },
      });
      res.json(_question);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async function handleDELETE(questionId: string, res: NextApiResponse) {
    try {
      const _question = await prisma.question.delete({
        where: { id: questionId },
      });
      res.json(_question);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async function handlePUT(questionId: string, res: NextApiResponse) {
    try {
      const _question = await prisma.question.update({
        where: { id: questionId },
        data: {
          updated_at: new Date().toISOString(),
          difficulty: difficulty,
          image_url: image_url,
          equation: equation,
          question_text: question_text,
          answer_formula: answer_formula,
        },
      });
      res.json(_question);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
