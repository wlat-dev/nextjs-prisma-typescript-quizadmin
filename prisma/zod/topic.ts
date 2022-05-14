import * as z from "zod"
import { CompleteTopicCategory, RelatedTopicCategoryModel, CompleteQuestion, RelatedQuestionModel } from "./index"

export const TopicModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
  topic_title: z.string(),
})

export interface CompleteTopic extends z.infer<typeof TopicModel> {
  topic_category: CompleteTopicCategory[]
  questions: CompleteQuestion[]
}

/**
 * RelatedTopicModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTopicModel: z.ZodSchema<CompleteTopic> = z.lazy(() => TopicModel.extend({
  topic_category: RelatedTopicCategoryModel.array(),
  questions: RelatedQuestionModel.array(),
}))
