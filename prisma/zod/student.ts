import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteEnrollment, RelatedEnrollmentModel, CompleteQuizAttempt, RelatedQuizAttemptModel } from "./index"

export const StudentModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  grade_at_account_creation: z.number().int().nullish(),
  user_id: z.string(),
})

export interface CompleteStudent extends z.infer<typeof StudentModel> {
  user: CompleteUser
  enrollments: CompleteEnrollment[]
  quiz_attempts: CompleteQuizAttempt[]
}

/**
 * RelatedStudentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStudentModel: z.ZodSchema<CompleteStudent> = z.lazy(() => StudentModel.extend({
  user: RelatedUserModel,
  enrollments: RelatedEnrollmentModel.array(),
  quiz_attempts: RelatedQuizAttemptModel.array(),
}))
