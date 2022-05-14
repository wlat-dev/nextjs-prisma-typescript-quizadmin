import * as z from "zod"
import { CompleteModule, RelatedModuleModel } from "./index"

export const SubjectModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
})

export interface CompleteSubject extends z.infer<typeof SubjectModel> {
  modules: CompleteModule[]
}

/**
 * RelatedSubjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSubjectModel: z.ZodSchema<CompleteSubject> = z.lazy(() => SubjectModel.extend({
  modules: RelatedModuleModel.array(),
}))
