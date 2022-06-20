import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // let quizArray = [];
  // let numQuizzes = 20;
  // while (numQuizzes > 0) {
  //   quizArray.push({ title: Math.random().toString() });
  //   numQuizzes--;
  // }
  // const createQuizzes = await prisma.quiz.createMany({ data: quizArray });

  // let topicArray = [];
  // let numTopics = 20;
  // while (numTopics > 0) {
  //   topicArray.push({ title: Math.random().toString() });
  //   numTopics--;
  // }
  // const createTopics = await prisma.topic.createMany({ data: topicArray });

  const createCourse = async (
    courseTitle: string,
    moduleName: string,
    lessonTitle: string,
    quizTitle: string
  ) => {
    await prisma.course.create({
      data: {
        title: courseTitle,
        modules: {
          create: [
            {
              module_name: moduleName + "1",
              lessons: {
                create: [
                  {
                    title: lessonTitle + "1",
                    quizzes: {
                      create: [
                        {
                          title: quizTitle + "1",
                        },
                        {
                          title: quizTitle + "2",
                        },
                        {
                          title: quizTitle + "3",
                        },
                      ],
                    },
                  },
                  {
                    title: lessonTitle + "2",
                    quizzes: {
                      create: [
                        {
                          title: quizTitle + "4",
                        },
                        {
                          title: quizTitle + "5",
                        },
                        {
                          title: quizTitle + "6",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              module_name: moduleName + "2",
              lessons: {
                create: [
                  {
                    title: lessonTitle + "3",
                    quizzes: {
                      create: [
                        {
                          title: quizTitle + "7",
                        },
                        {
                          title: quizTitle + "8",
                        },
                        {
                          title: quizTitle + "9",
                        },
                      ],
                    },
                  },
                  {
                    title: lessonTitle + "4",
                    quizzes: {
                      create: [
                        {
                          title: quizTitle + "10",
                        },
                        {
                          title: quizTitle + "11",
                        },
                        {
                          title: quizTitle + "12",
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
  createCourse("algebra1", "alg1module", "alg1lesson", "alg1quiz");
  createCourse("algebra2", "alg2module", "alg2lesson", "alg2quiz");
  createCourse("geometry", "geometrymodule", "geometrylesson", "geometryquiz");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
