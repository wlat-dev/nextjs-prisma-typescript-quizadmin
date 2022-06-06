import * as z from "zod"
import { CompleteTopic, RelatedTopicModel } from "./index"

export const TopicCategoryModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  title: z.string(),
})

export interface CompleteTopicCategory extends z.infer<typeof TopicCategoryModel> {
  topics: CompleteTopic[]
}

/**
 * RelatedTopicCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTopicCategoryModel: z.ZodSchema<CompleteTopicCategory> = z.lazy(() => TopicCategoryModel.extend({
  topics: RelatedTopicModel.array(),
}))
