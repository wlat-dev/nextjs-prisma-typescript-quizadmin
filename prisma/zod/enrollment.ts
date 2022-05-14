import * as z from "zod"
import { CompleteCourse, RelatedCourseModel, CompleteStudent, RelatedStudentModel } from "./index"

export const EnrollmentModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  student_id: z.string().nullish(),
  course_id: z.string().nullish(),
  current_grade_level: z.string().nullish(),
})

export interface CompleteEnrollment extends z.infer<typeof EnrollmentModel> {
  course?: CompleteCourse | null
  student?: CompleteStudent | null
}

/**
 * RelatedEnrollmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEnrollmentModel: z.ZodSchema<CompleteEnrollment> = z.lazy(() => EnrollmentModel.extend({
  course: RelatedCourseModel.nullish(),
  student: RelatedStudentModel.nullish(),
}))
