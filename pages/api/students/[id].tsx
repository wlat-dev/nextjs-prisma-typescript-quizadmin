import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../src/utils/prisma";

const secret = process.env.SECRET;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    role,
    name,
    email,
    emailVerified,
    image,
    gradeAtAccountCreation,
    ...enrollments
  } = req.body;

  const studentId = req.query.id.toString();
  const token = await getToken({ req, secret });

  return new Promise(() => {
    if (token) {
      if (req.method === "GET" ) {
        handleGET(studentId, res);
      } else if (req.method === "DELETE" ) {
        handleDELETE(studentId, res);
      } else if (req.method === "PUT" ) {
        handlePUT(studentId, res);
      } else {
        throw new Error(
          `The HTTP ${req.method} method is not supported at this route.`
        );
      }
    } else {
      res.status(401).send({ message: "Unauthorized " });
    }
  });

  async function handleGET(studentId: string, res: NextApiResponse) {
    try {
      const _student = await prisma.student.findUnique({
        where: {
          id: studentId,
        },
        include: {
          enrollments: {
            include: {
              course: {
                select: {
                  course_title: true,
                },
              },
            },
          },
          quiz_attempts: {
            select: {
              created_at: true,
              total_points: true,
              points_scored: true,
              answer_data: true,
              question_answered_count: true,
              question_unanswered_count: true,
            },
            include: {
              quiz: {
                include: {
                  questions: {
                    select: {
                      difficulty: true,
                    },
                    include: {
                      topics: {
                        select: {
                          topic_title: true,
                        },
                        include: {
                          topic_category: {
                            select: {
                              topic_category_title: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      res.json(_student);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async function handleDELETE(studentId: string, res: NextApiResponse) {
    try {
      const _student = await prisma.student.delete({
        where: { id: studentId },
      });
      res.json(_student);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async function handlePUT(studentId: string, res: NextApiResponse) {
    try {
      const _student = await prisma.student.update({
        where: { id: studentId },
        data: {
          updated_at: new Date().toISOString(),
          grade_at_account_creation: gradeAtAccountCreation,
          enrollments: {
            createMany: {
              data: {
                ...enrollments,
              },
            },
          },
        },
      });
      res.json(_student);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
