import * as z from "zod"
import { CompleteQuizAttempt, RelatedQuizAttemptModel, CompleteQuestion, RelatedQuestionModel, CompleteModule, RelatedModuleModel } from "./index"

export const QuizModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  author: z.string().nullish(),
  quiz_title: z.string(),
})

export interface CompleteQuiz extends z.infer<typeof QuizModel> {
  attempts: CompleteQuizAttempt[]
  questions: CompleteQuestion[]
  modules: CompleteModule[]
}

/**
 * RelatedQuizModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizModel: z.ZodSchema<CompleteQuiz> = z.lazy(() => QuizModel.extend({
  attempts: RelatedQuizAttemptModel.array(),
  questions: RelatedQuestionModel.array(),
  modules: RelatedModuleModel.array(),
}))
