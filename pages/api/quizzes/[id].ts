import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../src/utils/prisma";

const secret = process.env.SECRET;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const quizId = req.query.id.toString();
  const token = await getToken({ req, secret });

  return new Promise(() => {
    if (token) {
      if (req.method === "GET") {
        handleGET(quizId, res);
      } else if (req.method === "DELETE" && token.userRole === "ADMIN") {
        handleDELETE(quizId, res);
      } else if (req.method === "PUT" && token.userRole === "ADMIN") {
        handlePUT(quizId, res);
      } else {
        throw new Error(
          `The HTTP ${req.method} method is not supported at this route.`
        );
      }
    } else {
      res.status(401).send({ message: "Unauthorized " });
    }
  });

  async function handleGET(quizId: string, res: NextApiResponse) {
    try {
      const _quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
      });

      res.json(_quiz);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async function handleDELETE(quizId: string, res: NextApiResponse) {
    try {
      const _quiz = await prisma.quiz.delete({
        where: { id: quizId },
      });
      res.json(_quiz);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async function handlePUT(quizId: string, res: NextApiResponse) {
    try {
      const _quiz = await prisma.quiz.update({
        where: { id: quizId },
        data: {
          updated_at: new Date().toISOString(),
        },
      });
      res.json(_quiz);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
