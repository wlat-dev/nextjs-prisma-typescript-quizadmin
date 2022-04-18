import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../src/utils/prisma";

const secret = process.env.SECRET;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    gradeAtAccountCreation,
    userEmail,
    userRole,
    coursesWithIdsToEnroll,
  } = req.body;

  const token = await getToken({ req, secret });

  if (token?.userRole === "ADMIN") {
    const result = await prisma.student.create({
      data: {
        grade_at_account_creation: gradeAtAccountCreation,
        enrollments: {
          createMany: {
            data: [...coursesWithIdsToEnroll],
          },
        },
        user: {
          connectOrCreate: {
            where: {
              email: userEmail,
            },
            create: {
              email: userEmail,
              role: userRole,
            },
          },
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized " });
  }
}
