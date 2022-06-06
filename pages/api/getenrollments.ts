import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../src/utils/prisma";

const secret = process.env.SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });
  const userId = String(token?.userId);
  const _student = await prisma.student.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      enrollments: {
        include: {
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });
  const enrollments = _student?.enrollments;
  let enrolledCourses = [];
  // make utility function
  for (const property in enrollments) {
    enrolledCourses.push(enrollments[Number(property)].course?.title);
  }
  res.status(200).json({ enrolledCourses });
};
