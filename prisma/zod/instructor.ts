import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const InstructorModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  user_id: z.string().nullish(),
})

export interface CompleteInstructor extends z.infer<typeof InstructorModel> {
  User?: CompleteUser | null
}

/**
 * RelatedInstructorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedInstructorModel: z.ZodSchema<CompleteInstructor> = z.lazy(() => InstructorModel.extend({
  User: RelatedUserModel.nullish(),
}))
