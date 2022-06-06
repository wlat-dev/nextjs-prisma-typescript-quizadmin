import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let quizArray = [];
  let numQuizzes = 20;
  while (numQuizzes > 0) {
    quizArray.push({ title: Math.random().toString() });
    numQuizzes--;
  }
  const createQuizzes = await prisma.quiz.createMany({ data: quizArray });

  let topicArray = [];
  let numTopics = 20;
  while (numTopics > 0) {
    topicArray.push({ title: Math.random().toString() });
    numTopics--;
  }
  const createTopics = await prisma.topic.createMany({ data: topicArray });
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
