import * as z from "zod"
import { CompleteSubject, RelatedSubjectModel, CompleteCourse, RelatedCourseModel, CompleteLesson, RelatedLessonModel } from "./index"

export const ModuleModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  author: z.string().nullish(),
  module_name: z.string(),
  module_subject_id: z.string().nullish(),
  module_course_title: z.string().nullish(),
})

export interface CompleteModule extends z.infer<typeof ModuleModel> {
  subject?: CompleteSubject | null
  course?: CompleteCourse | null
  lessons: CompleteLesson[]
}

/**
 * RelatedModuleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedModuleModel: z.ZodSchema<CompleteModule> = z.lazy(() => ModuleModel.extend({
  subject: RelatedSubjectModel.nullish(),
  course: RelatedCourseModel.nullish(),
  lessons: RelatedLessonModel.array(),
}))
