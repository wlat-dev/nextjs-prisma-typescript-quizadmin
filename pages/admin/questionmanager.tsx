import { NextPageContext } from "next/types";
import prisma from "../../src/utils/prisma";

export default function QuestionManager() {

}

export async function getStaticProps(context: NextPageContext) {
  const questions = await prisma.question.findMany({
    include: {
      topics: true,
      quizzes: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}
