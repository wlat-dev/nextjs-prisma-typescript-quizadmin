import * as z from "zod"
import { CompleteQuiz, RelatedQuizModel, CompleteStudent, RelatedStudentModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const QuizAttemptModel = z.object({
  id: z.string(),
  created_at: z.date(),
  total_points: z.number().int().nullish(),
  points_scored: z.number().int().nullish(),
  enroll_id: z.string().nullish(),
  answer_data: jsonSchema,
  question_answered_count: z.number().int().nullish(),
  question_unanswered_count: z.number().int().nullish(),
  quiz_id: z.string(),
  student_id: z.string(),
})

export interface CompleteQuizAttempt extends z.infer<typeof QuizAttemptModel> {
  quiz: CompleteQuiz
  student: CompleteStudent
}

/**
 * RelatedQuizAttemptModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizAttemptModel: z.ZodSchema<CompleteQuizAttempt> = z.lazy(() => QuizAttemptModel.extend({
  quiz: RelatedQuizModel,
  student: RelatedStudentModel,
}))
