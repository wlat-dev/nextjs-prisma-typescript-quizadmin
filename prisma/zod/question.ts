import * as z from "zod"
import { CompleteTopic, RelatedTopicModel, CompleteQuiz, RelatedQuizModel } from "./index"

export const QuestionModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  difficulty: z.number().int().nullish(),
  image_url: z.string().nullish(),
  equation: z.string().nullish(),
  question_text: z.string().nullish(),
  answer_formula: z.string().nullish(),
  author: z.string().nullish(),
})

export interface CompleteQuestion extends z.infer<typeof QuestionModel> {
  topics: CompleteTopic[]
  quizzes: CompleteQuiz[]
}

/**
 * RelatedQuestionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuestionModel: z.ZodSchema<CompleteQuestion> = z.lazy(() => QuestionModel.extend({
  topics: RelatedTopicModel.array(),
  quizzes: RelatedQuizModel.array(),
}))
