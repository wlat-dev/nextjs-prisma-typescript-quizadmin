const {
  createQuestion,
} = require("../../../../__test-utils/question-functions");
const { prismaMock } = require("../../../../singleton");

test("should create new question ", async () => {
  const getRandomDate = () => {
    function randomDate(start: Date, end: Date) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    }
    return randomDate(new Date(2012, 0, 1), new Date());
  };

  const date1 = getRandomDate();
  const date2 = getRandomDate();
  const question = {
    id: "asdfkjhasdfkjhasdf",
    created_at: date1,
    updated_at: date2,
    author: "Joe Smith",
    difficulty: 1,
    image_url: "image_url here",
    equation: "question equation here",
    question_text: "question text here",
    answer_formula: "answer formula here",
  };

  prismaMock.question.create.mockResolvedValue(question);

  await expect(createQuestion(question)).resolves.toEqual({
    id: "asdfkjhasdfkjhasdf",
    created_at: date1,
    updated_at: date2,
    author: "Joe Smith",
    difficulty: 1,
    image_url: "image_url here",
    equation: "question equation here",
    question_text: "question text here",
    answer_formula: "answer formula here",
  });
});

export {};
