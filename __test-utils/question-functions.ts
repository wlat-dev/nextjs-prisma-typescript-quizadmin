import prisma from "../client";

interface CreateQuestion {
  difficulty: number;
  image_url: string;
  equation: string;
  question_text: string;
  answer_formula: string;
}

export async function createQuestion(question: CreateQuestion) {
  return await prisma.question.create({
    data: question,
  });
}

interface UpdateQuestion {
  id: string;
  difficulty: number;
  image_url: string;
  equation: string;
  question_text: string;
  answer_formula: string;
}

export async function updateQuestion(question: UpdateQuestion) {
  return await prisma.user.update({
    where: { id: question.id },
    data: question,
  });
}
