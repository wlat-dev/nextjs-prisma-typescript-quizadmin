import * as z from "zod"
import { CompleteModule, RelatedModuleModel, CompleteQuiz, RelatedQuizModel } from "./index"

export const LessonModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  author: z.string().nullish(),
  title: z.string(),
  lesson_module_name: z.string().nullish(),
  order_in_module: z.number().int(),
})

export interface CompleteLesson extends z.infer<typeof LessonModel> {
  module?: CompleteModule | null
  quizzes: CompleteQuiz[]
}

/**
 * RelatedLessonModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLessonModel: z.ZodSchema<CompleteLesson> = z.lazy(() => LessonModel.extend({
  module: RelatedModuleModel.nullish(),
  quizzes: RelatedQuizModel.array(),
}))
