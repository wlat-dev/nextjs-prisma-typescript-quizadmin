import * as z from "zod"
import { CompleteEnrollment, RelatedEnrollmentModel } from "./index"

export const CourseModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  instructor_id: z.string().nullish(),
  course_title: z.string(),
  author: z.string().nullish(),
})

export interface CompleteCourse extends z.infer<typeof CourseModel> {
  enrollment: CompleteEnrollment[]
}

/**
 * RelatedCourseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseModel: z.ZodSchema<CompleteCourse> = z.lazy(() => CourseModel.extend({
  enrollment: RelatedEnrollmentModel.array(),
}))
