import * as z from "zod"
import { CompleteModule, RelatedModuleModel } from "./index"

export const LessonModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  author: z.string().nullish(),
  module_id: z.string().nullish(),
  lesson_title: z.string().nullish(),
})

export interface CompleteLesson extends z.infer<typeof LessonModel> {
  module?: CompleteModule | null
}

/**
 * RelatedLessonModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLessonModel: z.ZodSchema<CompleteLesson> = z.lazy(() => LessonModel.extend({
  module: RelatedModuleModel.nullish(),
}))
