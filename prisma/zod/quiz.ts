import * as z from "zod"
import { CompleteQuizAttempt, RelatedQuizAttemptModel, CompleteQuestion, RelatedQuestionModel, CompleteLesson, RelatedLessonModel } from "./index"

export const QuizModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  author: z.string().nullish(),
  title: z.string(),
})

export interface CompleteQuiz extends z.infer<typeof QuizModel> {
  attempts: CompleteQuizAttempt[]
  questions: CompleteQuestion[]
  lessons: CompleteLesson[]
}

/**
 * RelatedQuizModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizModel: z.ZodSchema<CompleteQuiz> = z.lazy(() => QuizModel.extend({
  attempts: RelatedQuizAttemptModel.array(),
  questions: RelatedQuestionModel.array(),
  lessons: RelatedLessonModel.array(),
}))
